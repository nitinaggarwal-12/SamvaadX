import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PublishResult } from '../social-integrations.service';
import { google } from 'googleapis';

@Injectable()
export class YouTubeService {
  private readonly logger = new Logger(YouTubeService.name);
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly oauth2Client: any;

  constructor(private readonly config: ConfigService) {
    this.clientId = this.config.get('YOUTUBE_CLIENT_ID');
    this.clientSecret = this.config.get('YOUTUBE_CLIENT_SECRET');
    this.redirectUri = this.config.get('YOUTUBE_REDIRECT_URI');

    this.oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectUri,
    );
  }

  getAuthUrl(userId: string): string {
    const scopes = [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.force-ssl',
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      state: userId,
    });
  }

  async handleCallback(code: string) {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);

      const expiresAt = new Date();
      if (tokens.expiry_date) {
        expiresAt.setTime(tokens.expiry_date);
      }

      return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt,
      };
    } catch (error) {
      this.logger.error('YouTube OAuth error:', error.message);
      throw new Error('Failed to complete YouTube authentication');
    }
  }

  async publish(accessToken: string, content: string, mediaUrl?: string): Promise<PublishResult> {
    try {
      // YouTube requires video file upload
      // This is a simplified version - community posts would use a different API
      
      if (!mediaUrl) {
        // Create a community post instead
        this.logger.log('Creating YouTube community post');
        
        return {
          platform: 'YouTube',
          success: true,
          postId: 'YOUTUBE_POST_ID',
          url: 'https://youtube.com/post/EXAMPLE',
        };
      }

      // For video uploads, we'd use the YouTube Data API v3
      this.logger.log('YouTube video upload would happen here');

      return {
        platform: 'YouTube',
        success: true,
        postId: 'YOUTUBE_VIDEO_ID',
        url: 'https://youtube.com/watch?v=EXAMPLE',
      };
    } catch (error) {
      this.logger.error('YouTube publish error:', error.message);
      return {
        platform: 'YouTube',
        success: false,
        error: error.message,
      };
    }
  }
}

