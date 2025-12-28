import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class RedditService {
  private readonly logger = new Logger(RedditService.name);

  constructor(private configService: ConfigService) {}

  getAuthUrl(state: string): string {
    const clientId = this.configService.get<string>('REDDIT_CLIENT_ID');
    const redirectUri = this.configService.get<string>('REDDIT_REDIRECT_URI');
    
    const scopes = [
      'identity',
      'read',
      'submit',
      'edit',
      'subscribe',
      'vote',
      'mysubreddits',
    ];

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      state,
      redirect_uri: redirectUri,
      duration: 'permanent', // Get refresh token
      scope: scopes.join(' '),
    });

    return `https://www.reddit.com/api/v1/authorize?${params.toString()}`;
  }

  async handleCallback(code: string): Promise<any> {
    const clientId = this.configService.get<string>('REDDIT_CLIENT_ID');
    const clientSecret = this.configService.get<string>('REDDIT_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('REDDIT_REDIRECT_URI');

    try {
      // Exchange code for access token
      const tokenResponse = await axios.post(
        'https://www.reddit.com/api/v1/access_token',
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
            'User-Agent': 'SamvaadX/1.0',
          },
        },
      );

      const { access_token, refresh_token, expires_in } = tokenResponse.data;

      // Get user info
      const userResponse = await axios.get('https://oauth.reddit.com/api/v1/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'User-Agent': 'SamvaadX/1.0',
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
          username: userResponse.data.name,
          karma: userResponse.data.total_karma,
          createdAt: new Date(userResponse.data.created_utc * 1000),
        },
      };
    } catch (error) {
      this.logger.error('Reddit OAuth error:', error.response?.data || error.message);
      throw new Error(`Reddit authentication failed: ${error.message}`);
    }
  }

  async submitPost(accessToken: string, content: any): Promise<any> {
    try {
      const postResponse = await axios.post(
        'https://oauth.reddit.com/api/submit',
        new URLSearchParams({
          sr: content.subreddit || 'test',
          kind: content.kind || 'self', // 'self' for text, 'link' for URL
          title: content.title,
          text: content.text || '',
          url: content.url || '',
          sendreplies: 'true',
        }),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'SamvaadX/1.0',
          },
        },
      );

      return {
        success: true,
        postId: postResponse.data.json.data.id,
        url: postResponse.data.json.data.url,
      };
    } catch (error) {
      this.logger.error('Reddit submit error:', error.response?.data || error.message);
      throw new Error(`Failed to submit to Reddit: ${error.message}`);
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const clientId = this.configService.get<string>('REDDIT_CLIENT_ID');
    const clientSecret = this.configService.get<string>('REDDIT_CLIENT_SECRET');

    try {
      const response = await axios.post(
        'https://www.reddit.com/api/v1/access_token',
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
            'User-Agent': 'SamvaadX/1.0',
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
      this.logger.error('Reddit token refresh error:', error.response?.data || error.message);
      throw new Error(`Failed to refresh Reddit token: ${error.message}`);
    }
  }
}

