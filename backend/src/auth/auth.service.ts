import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { PrismaService } from '../database/prisma.service';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, organizationSlug, organizationName, role = 'CONSUMER' } = registerDto;

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    let organization;

    // Find or create organization
    if (organizationSlug) {
      organization = await this.prisma.organization.findUnique({
        where: { slug: organizationSlug },
      });
      if (!organization) {
        throw new ConflictException('Organization not found');
      }
    } else {
      // Create new organization if name is provided
      const orgName = organizationName || `${firstName}'s Organization`;
      const slug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      
      organization = await this.prisma.organization.create({
        data: {
          name: orgName,
          slug: `${slug}-${Date.now()}`, // Add timestamp to ensure uniqueness
          status: 'active',
          subscriptionTier: 'enterprise',
        },
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        role: role as any,
        organizationId: organization.id,
        isActive: true,
        isVerified: true, // Auto-verify for now
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        organizationId: true,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.organizationId);

    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      message: 'Registration successful',
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.organizationId);

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Get user permissions (simplified - would be more complex in production)
    const permissions = this.getPermissionsForRole(user.role);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
        role: user.role,
        organization: user.organization,
        permissions,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    const token = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!token || token.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const accessToken = this.jwtService.sign({
      sub: token.user.id,
      email: token.user.email,
      organizationId: token.user.organizationId,
    });

    return {
      accessToken,
      expiresIn: 3600,
    };
  }

  async logout(refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });

    return { message: 'Logout successful' };
  }

  async getUserProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const permissions = this.getPermissionsForRole(user.role);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      role: user.role,
      permissions,
      organization: user.organization,
      lastLoginAt: user.lastLoginAt,
    };
  }

  private async generateTokens(userId: string, email: string, organizationId: string) {
    const payload = { sub: userId, email, organizationId };

    const accessToken = this.jwtService.sign(payload);

    // Generate refresh token
    const refreshToken = await this.prisma.refreshToken.create({
      data: {
        userId,
        token: this.generateRandomToken(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    return {
      accessToken,
      refreshToken: refreshToken.token,
      expiresIn: 3600,
    };
  }

  private generateRandomToken(): string {
    return require('crypto').randomBytes(32).toString('hex');
  }

  private getPermissionsForRole(role: string): string[] {
    // Simplified permission mapping - would be more sophisticated in production
    const rolePermissions = {
      ADMIN: ['*'],
      AUTHOR: [
        'content.create',
        'content.read',
        'content.update',
        'content.delete',
        'media.upload',
        'media.read',
        'campaigns.create',
        'campaigns.read',
      ],
      CONSUMER: [
        'content.read',
        'campaigns.read',
      ],
      super_admin: ['*'],
      org_admin: [
        'users.*',
        'organization.*',
        'events.*',
        'campaigns.*',
        'content.*',
        'media.*',
        'analytics.*',
        'approvals.*',
      ],
      strategy_lead: [
        'events.read',
        'campaigns.*',
        'content.*',
        'media.read',
        'analytics.read',
      ],
      content_creator: ['content.*', 'media.*', 'campaigns.read', 'events.read'],
      event_ops: ['content.*', 'media.*', 'events.read', 'approvals.request'],
      social_manager: ['content.*', 'publishing.*', 'analytics.read'],
      analytics_specialist: ['analytics.*', 'events.read', 'campaigns.read'],
      delegate_viewer: ['events.read', 'content.read', 'analytics.read'],
      approval_manager: ['approvals.*', 'content.read'],
      vendor: ['content.create', 'media.upload'],
    };

    return rolePermissions[role] || [];
  }

  async googleLogin(code: string) {
    try {
      // Exchange code for tokens
      const GOOGLE_CLIENT_ID = this.configService.get<string>('GOOGLE_CLIENT_ID');
      const GOOGLE_CLIENT_SECRET = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
      const redirectUri = `${this.configService.get<string>('BACKEND_URL') || 'https://samvaadx-production.up.railway.app'}/api/v1/auth/google/callback`;

      const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      });

      const { access_token } = tokenResponse.data;

      // Get user info from Google
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const googleUser = userInfoResponse.data;

      // Find or create user
      let user = await this.prisma.user.findUnique({
        where: { email: googleUser.email },
        include: { organization: true },
      });

      if (!user) {
        // Create organization for new user
        const orgName = `${googleUser.given_name}'s Organization`;
        const slug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        
        const organization = await this.prisma.organization.create({
          data: {
            name: orgName,
            slug: `${slug}-${Date.now()}`,
            status: 'active',
            subscriptionTier: 'enterprise',
          },
        });

        // Create user
        user = await this.prisma.user.create({
          data: {
            email: googleUser.email,
            firstName: googleUser.given_name || 'User',
            lastName: googleUser.family_name || '',
            avatarUrl: googleUser.picture,
            role: 'CONSUMER' as any,
            organizationId: organization.id,
            oauthProvider: 'google',
            oauthId: googleUser.id,
            isActive: true,
            isVerified: true,
            emailVerifiedAt: new Date(),
          },
          include: { organization: true },
        });
      }

      // Update last login
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      // Generate tokens
      const tokens = await this.generateTokens(user.id, user.email, user.organizationId);

      return {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
          role: user.role,
          organization: user.organization,
          permissions: this.getPermissionsForRole(user.role),
        },
      };
    } catch (error) {
      throw new UnauthorizedException(`Google authentication failed: ${error.message}`);
    }
  }

  async githubLogin(code: string) {
    try {
      // Exchange code for tokens
      const GITHUB_CLIENT_ID = this.configService.get<string>('GITHUB_CLIENT_ID');
      const GITHUB_CLIENT_SECRET = this.configService.get<string>('GITHUB_CLIENT_SECRET');
      const redirectUri = `${this.configService.get<string>('BACKEND_URL') || 'https://samvaadx-production.up.railway.app'}/api/v1/auth/github/callback`;

      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: redirectUri,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );

      const { access_token } = tokenResponse.data;

      // Get user info from GitHub
      const userInfoResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const githubUser = userInfoResponse.data;

      // Get user email if not public
      let email = githubUser.email;
      if (!email) {
        const emailsResponse = await axios.get('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const primaryEmail = emailsResponse.data.find((e: any) => e.primary);
        email = primaryEmail?.email || `${githubUser.login}@github.user`;
      }

      // Find or create user
      let user = await this.prisma.user.findUnique({
        where: { email },
        include: { organization: true },
      });

      if (!user) {
        // Create organization for new user
        const orgName = `${githubUser.name || githubUser.login}'s Organization`;
        const slug = orgName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        
        const organization = await this.prisma.organization.create({
          data: {
            name: orgName,
            slug: `${slug}-${Date.now()}`,
            status: 'active',
            subscriptionTier: 'enterprise',
          },
        });

        // Parse name
        const nameParts = (githubUser.name || githubUser.login).split(' ');
        const firstName = nameParts[0] || 'User';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Create user
        user = await this.prisma.user.create({
          data: {
            email,
            firstName,
            lastName,
            avatarUrl: githubUser.avatar_url,
            role: 'CONSUMER' as any,
            organizationId: organization.id,
            oauthProvider: 'github',
            oauthId: String(githubUser.id),
            isActive: true,
            isVerified: true,
            emailVerifiedAt: new Date(),
          },
          include: { organization: true },
        });
      }

      // Update last login
      await this.prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      // Generate tokens
      const tokens = await this.generateTokens(user.id, user.email, user.organizationId);

      return {
        ...tokens,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatarUrl: user.avatarUrl,
          role: user.role,
          organization: user.organization,
          permissions: this.getPermissionsForRole(user.role),
        },
      };
    } catch (error) {
      throw new UnauthorizedException(`GitHub authentication failed: ${error.message}`);
    }
  }
}

