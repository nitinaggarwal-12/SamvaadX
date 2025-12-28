import { Injectable, Logger } from '@nestjs/common';
import { FacebookService } from './providers/facebook.service';
import { TwitterService } from './providers/twitter.service';
import { InstagramService } from './providers/instagram.service';
import { LinkedInService } from './providers/linkedin.service';
import { YouTubeService } from './providers/youtube.service';
import { PrismaService } from '../database/prisma.service';

export interface PublishRequest {
  userId: string;
  content: string;
  platforms: string[];
  mediaUrl?: string;
  scheduledTime?: Date;
}

export interface PublishResult {
  platform: string;
  success: boolean;
  postId?: string;
  error?: string;
  url?: string;
}

@Injectable()
export class SocialIntegrationsService {
  private readonly logger = new Logger(SocialIntegrationsService.name);

  constructor(
    private readonly facebook: FacebookService,
    private readonly twitter: TwitterService,
    private readonly instagram: InstagramService,
    private readonly linkedin: LinkedInService,
    private readonly youtube: YouTubeService,
    private readonly prisma: PrismaService,
  ) {}

  async publishToMultiplePlatforms(request: PublishRequest): Promise<PublishResult[]> {
    this.logger.log(`Publishing to platforms: ${request.platforms.join(', ')}`);
    
    const results: PublishResult[] = [];

    // Get user's connected accounts
    const connections = await this.prisma.socialConnection.findMany({
      where: {
        userId: request.userId,
        platform: { in: request.platforms },
        isActive: true,
      },
    });

    // Publish to each platform in parallel
    const publishPromises = connections.map(async (connection) => {
      try {
        let result: PublishResult;

        switch (connection.platform.toLowerCase()) {
          case 'facebook':
            result = await this.facebook.publish(connection.accessToken, request.content, request.mediaUrl);
            break;
          case 'twitter':
          case 'twitter/x':
            result = await this.twitter.publish(connection.accessToken, connection.accessTokenSecret, request.content, request.mediaUrl);
            break;
          case 'instagram':
            result = await this.instagram.publish(connection.accessToken, request.content, request.mediaUrl);
            break;
          case 'linkedin':
            result = await this.linkedin.publish(connection.accessToken, request.content, request.mediaUrl);
            break;
          case 'youtube':
            result = await this.youtube.publish(connection.accessToken, request.content, request.mediaUrl);
            break;
          default:
            result = {
              platform: connection.platform,
              success: false,
              error: 'Unsupported platform',
            };
        }

        results.push(result);
        return result;
      } catch (error) {
        this.logger.error(`Failed to publish to ${connection.platform}:`, error);
        results.push({
          platform: connection.platform,
          success: false,
          error: error.message,
        });
      }
    });

    await Promise.allSettled(publishPromises);
    return results;
  }

  async getOAuthUrl(platform: string, userId: string): Promise<string> {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return this.facebook.getAuthUrl(userId);
      case 'twitter':
      case 'twitter/x':
        return this.twitter.getAuthUrl(userId);
      case 'instagram':
        return this.instagram.getAuthUrl(userId);
      case 'linkedin':
        return this.linkedin.getAuthUrl(userId);
      case 'youtube':
        return this.youtube.getAuthUrl(userId);
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  async handleOAuthCallback(
    platform: string,
    code: string,
    state: string,
  ): Promise<{ userId: string; success: boolean }> {
    this.logger.log(`Handling OAuth callback for ${platform}`);

    let tokenData: any;

    switch (platform.toLowerCase()) {
      case 'facebook':
        tokenData = await this.facebook.handleCallback(code);
        break;
      case 'twitter':
      case 'twitter/x':
        tokenData = await this.twitter.handleCallback(code);
        break;
      case 'instagram':
        tokenData = await this.instagram.handleCallback(code);
        break;
      case 'linkedin':
        tokenData = await this.linkedin.handleCallback(code);
        break;
      case 'youtube':
        tokenData = await this.youtube.handleCallback(code);
        break;
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }

    // Store the connection in database
    await this.prisma.socialConnection.upsert({
      where: {
        userId_platform: {
          userId: state, // state contains userId
          platform: platform,
        },
      },
      create: {
        userId: state,
        platform: platform,
        accessToken: tokenData.accessToken,
        accessTokenSecret: tokenData.accessTokenSecret,
        refreshToken: tokenData.refreshToken,
        expiresAt: tokenData.expiresAt,
        isActive: true,
      },
      update: {
        accessToken: tokenData.accessToken,
        accessTokenSecret: tokenData.accessTokenSecret,
        refreshToken: tokenData.refreshToken,
        expiresAt: tokenData.expiresAt,
        isActive: true,
      },
    });

    return { userId: state, success: true };
  }

  async disconnectPlatform(userId: string, platform: string): Promise<void> {
    await this.prisma.socialConnection.update({
      where: {
        userId_platform: {
          userId,
          platform,
        },
      },
      data: {
        isActive: false,
      },
    });
  }

  async getConnectedPlatforms(userId: string) {
    return this.prisma.socialConnection.findMany({
      where: {
        userId,
        isActive: true,
      },
      select: {
        platform: true,
        createdAt: true,
        expiresAt: true,
      },
    });
  }
}

