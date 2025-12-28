import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MediumService {
  private readonly logger = new Logger(MediumService.name);

  constructor(private configService: ConfigService) {}

  getAuthUrl(state: string): string {
    const clientId = this.configService.get<string>('MEDIUM_CLIENT_ID');
    const redirectUri = this.configService.get<string>('MEDIUM_REDIRECT_URI');
    
    const scopes = [
      'basicProfile',
      'publishPost',
      'listPublications',
    ];

    const params = new URLSearchParams({
      client_id: clientId,
      scope: scopes.join(','),
      state,
      response_type: 'code',
      redirect_uri: redirectUri,
    });

    return `https://medium.com/m/oauth/authorize?${params.toString()}`;
  }

  async handleCallback(code: string): Promise<any> {
    const clientId = this.configService.get<string>('MEDIUM_CLIENT_ID');
    const clientSecret = this.configService.get<string>('MEDIUM_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('MEDIUM_REDIRECT_URI');

    try {
      // Exchange code for access token
      const tokenResponse = await axios.post(
        'https://api.medium.com/v1/tokens',
        {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
        },
      );

      const { access_token, refresh_token } = tokenResponse.data;

      // Get user info
      const userResponse = await axios.get('https://api.medium.com/v1/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: null, // Medium tokens don't expire
        metadata: {
          userId: userResponse.data.data.id,
          username: userResponse.data.data.username,
          name: userResponse.data.data.name,
          imageUrl: userResponse.data.data.imageUrl,
          url: userResponse.data.data.url,
        },
      };
    } catch (error) {
      this.logger.error('Medium OAuth error:', error.response?.data || error.message);
      throw new Error(`Medium authentication failed: ${error.message}`);
    }
  }

  async publishPost(accessToken: string, content: any): Promise<any> {
    try {
      // Get user ID
      const userResponse = await axios.get('https://api.medium.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userId = userResponse.data.data.id;

      // Create post
      const postResponse = await axios.post(
        `https://api.medium.com/v1/users/${userId}/posts`,
        {
          title: content.title || 'Untitled',
          contentFormat: 'html',
          content: content.text || content.description,
          publishStatus: content.publishStatus || 'draft',
          tags: content.tags || [],
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
        postId: postResponse.data.data.id,
        url: postResponse.data.data.url,
      };
    } catch (error) {
      this.logger.error('Medium publish error:', error.response?.data || error.message);
      throw new Error(`Failed to publish to Medium: ${error.message}`);
    }
  }
}

