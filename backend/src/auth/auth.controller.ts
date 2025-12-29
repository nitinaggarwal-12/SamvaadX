import { Controller, Post, Body, Get, UseGuards, HttpCode, HttpStatus, Res, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto, RegisterDto, RefreshTokenDto } from './dto';
import { ConfigService } from '@nestjs/config';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google')
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirects to Google OAuth' })
  async googleAuth(@Res() res: Response) {
    const GOOGLE_CLIENT_ID = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL') || 'https://samvaadx.up.railway.app';
    const redirectUri = `${this.configService.get<string>('BACKEND_URL') || 'https://samvaadx-production.up.railway.app'}/api/v1/auth/google/callback`;
    
    if (!GOOGLE_CLIENT_ID) {
      return res.redirect(`${FRONTEND_URL}/login?error=google_not_configured`);
    }

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
    
    return res.redirect(googleAuthUrl);
  }

  @Get('google/callback')
  @ApiOperation({ summary: 'Handle Google OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirects to frontend with auth result' })
  async googleAuthCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL') || 'https://samvaadx.up.railway.app';
    
    try {
      if (!code) {
        return res.redirect(`${FRONTEND_URL}/login?error=no_code`);
      }

      const result = await this.authService.googleLogin(code);
      
      // Redirect to frontend with tokens in URL (will be stored in localStorage)
      return res.redirect(`${FRONTEND_URL}/auth/callback?accessToken=${result.accessToken}&refreshToken=${result.refreshToken}&user=${encodeURIComponent(JSON.stringify(result.user))}`);
    } catch (error) {
      return res.redirect(`${FRONTEND_URL}/login?error=google_auth_failed&message=${encodeURIComponent(error.message)}`);
    }
  }

  @Get('github')
  @ApiOperation({ summary: 'Initiate GitHub OAuth login' })
  @ApiResponse({ status: 302, description: 'Redirects to GitHub OAuth' })
  async githubAuth(@Res() res: Response) {
    const GITHUB_CLIENT_ID = this.configService.get<string>('GITHUB_CLIENT_ID');
    const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL') || 'https://samvaadx.up.railway.app';
    const redirectUri = `${this.configService.get<string>('BACKEND_URL') || 'https://samvaadx-production.up.railway.app'}/api/v1/auth/github/callback`;
    
    if (!GITHUB_CLIENT_ID) {
      return res.redirect(`${FRONTEND_URL}/login?error=github_not_configured`);
    }

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;
    
    return res.redirect(githubAuthUrl);
  }

  @Get('github/callback')
  @ApiOperation({ summary: 'Handle GitHub OAuth callback' })
  @ApiResponse({ status: 302, description: 'Redirects to frontend with auth result' })
  async githubAuthCallback(
    @Query('code') code: string,
    @Res() res: Response,
  ) {
    const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL') || 'https://samvaadx.up.railway.app';
    
    try {
      if (!code) {
        return res.redirect(`${FRONTEND_URL}/login?error=no_code`);
      }

      const result = await this.authService.githubLogin(code);
      
      // Redirect to frontend with tokens
      return res.redirect(`${FRONTEND_URL}/auth/callback?accessToken=${result.accessToken}&refreshToken=${result.refreshToken}&user=${encodeURIComponent(JSON.stringify(result.user))}`);
    } catch (error) {
      return res.redirect(`${FRONTEND_URL}/login?error=github_auth_failed&message=${encodeURIComponent(error.message)}`);
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user and get JWT tokens' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@CurrentUser() user: any, @Body() body: { refreshToken: string }) {
    return this.authService.logout(body.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@CurrentUser() user: any) {
    return this.authService.getUserProfile(user.id);
  }
}

