import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class VimeoService {
  private readonly logger = new Logger(VimeoService.name);

  constructor(private configService: ConfigService) {}

  getAuthUrl(state: string): string {
    const clientId = this.configService.get<string>('VIMEO_CLIENT_ID');
    const redirectUri = this.configService.get<string>('VIMEO_REDIRECT_URI');
    
    const scopes = [
      'public',
      'private',
      'upload',
      'edit',
      'video_files',
    ];

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      state,
      scope: scopes.join(' '),
    });

    return `https://api.vimeo.com/oauth/authorize?${params.toString()}`;
  }

  async handleCallback(code: string): Promise<any> {
    const clientId = this.configService.get<string>('VIMEO_CLIENT_ID');
    const clientSecret = this.configService.get<string>('VIMEO_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('VIMEO_REDIRECT_URI');

    try {
      // Exchange code for access token
      const tokenResponse = await axios.post(
        'https://api.vimeo.com/oauth/access_token',
        {
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        },
        {
          auth: {
            username: clientId,
            password: clientSecret,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const { access_token, user } = tokenResponse.data;

      return {
        accessToken: access_token,
        refreshToken: null, // Vimeo doesn't provide refresh tokens for OAuth
        expiresAt: null, // Vimeo tokens don't expire
        metadata: {
          userId: user.uri.split('/').pop(),
          name: user.name,
          username: user.link.split('/').pop(),
          profileUrl: user.link,
          pictureUrl: user.pictures?.sizes?.[0]?.link,
        },
      };
    } catch (error) {
      this.logger.error('Vimeo OAuth error:', error.response?.data || error.message);
      throw new Error(`Vimeo authentication failed: ${error.message}`);
    }
  }

  async uploadVideo(accessToken: string, content: any): Promise<any> {
    try {
      // Create video
      const createResponse = await axios.post(
        'https://api.vimeo.com/me/videos',
        {
          upload: {
            approach: 'pull',
            link: content.videoUrl, // URL to video file
          },
          name: content.title,
          description: content.description,
          privacy: {
            view: content.privacy || 'anybody', // 'anybody', 'nobody', 'contacts', 'password'
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return {
        success: true,
        videoId: createResponse.data.uri.split('/').pop(),
        url: createResponse.data.link,
      };
    } catch (error) {
      this.logger.error('Vimeo upload error:', error.response?.data || error.message);
      throw new Error(`Failed to upload to Vimeo: ${error.message}`);
    }
  }

  async getVideo(accessToken: string, videoId: string): Promise<any> {
    try {
      const response = await axios.get(`https://api.vimeo.com/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        id: videoId,
        name: response.data.name,
        description: response.data.description,
        link: response.data.link,
        duration: response.data.duration,
        views: response.data.stats?.plays,
      };
    } catch (error) {
      this.logger.error('Vimeo get video error:', error.response?.data || error.message);
      throw new Error(`Failed to get Vimeo video: ${error.message}`);
    }
  }
}

