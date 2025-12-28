import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PinterestService {
  private readonly logger = new Logger(PinterestService.name);

  constructor(private configService: ConfigService) {}

  getAuthUrl(state: string): string {
    const clientId = this.configService.get<string>('PINTEREST_CLIENT_ID');
    const redirectUri = this.configService.get<string>('PINTEREST_REDIRECT_URI');
    
    const scopes = [
      'boards:read',
      'boards:write',
      'pins:read',
      'pins:write',
      'user_accounts:read',
    ];

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scopes.join(','),
      state,
    });

    return `https://www.pinterest.com/oauth/?${params.toString()}`;
  }

  async handleCallback(code: string): Promise<any> {
    const clientId = this.configService.get<string>('PINTEREST_CLIENT_ID');
    const clientSecret = this.configService.get<string>('PINTEREST_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('PINTEREST_REDIRECT_URI');

    try {
      // Exchange code for access token
      const tokenResponse = await axios.post(
        'https://api.pinterest.com/v5/oauth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
        }),
        {
          auth: {
            username: clientId,
            password: clientSecret,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token, refresh_token, expires_in } = tokenResponse.data;

      // Get user info
      const userResponse = await axios.get('https://api.pinterest.com/v5/user_account', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expiresAt,
        metadata: {
          userId: userResponse.data.id,
          username: userResponse.data.username,
          accountType: userResponse.data.account_type,
          profileUrl: userResponse.data.profile_image,
        },
      };
    } catch (error) {
      this.logger.error('Pinterest OAuth error:', error.response?.data || error.message);
      throw new Error(`Pinterest authentication failed: ${error.message}`);
    }
  }

  async createPin(accessToken: string, content: any): Promise<any> {
    try {
      const pinResponse = await axios.post(
        'https://api.pinterest.com/v5/pins',
        {
          board_id: content.boardId,
          title: content.title,
          description: content.description,
          link: content.link,
          media_source: {
            source_type: 'image_url',
            url: content.imageUrl,
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
        pinId: pinResponse.data.id,
        url: pinResponse.data.link,
      };
    } catch (error) {
      this.logger.error('Pinterest pin error:', error.response?.data || error.message);
      throw new Error(`Failed to create Pinterest pin: ${error.message}`);
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const clientId = this.configService.get<string>('PINTEREST_CLIENT_ID');
    const clientSecret = this.configService.get<string>('PINTEREST_CLIENT_SECRET');

    try {
      const response = await axios.post(
        'https://api.pinterest.com/v5/oauth/token',
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
        {
          auth: {
            username: clientId,
            password: clientSecret,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token, expires_in } = response.data;
      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

      return {
        accessToken: access_token,
        expiresAt: expiresAt,
      };
    } catch (error) {
      this.logger.error('Pinterest token refresh error:', error.response?.data || error.message);
      throw new Error(`Failed to refresh Pinterest token: ${error.message}`);
    }
  }
}
