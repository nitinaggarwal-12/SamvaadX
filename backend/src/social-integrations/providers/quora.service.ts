import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class QuoraService {
  private readonly logger = new Logger(QuoraService.name);

  constructor(private configService: ConfigService) {}

  getAuthUrl(state: string): string {
    const clientId = this.configService.get<string>('QUORA_CLIENT_ID');
    const redirectUri = this.configService.get<string>('QUORA_REDIRECT_URI');
    
    const scopes = [
      'read',
      'write',
    ];

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      state,
      scope: scopes.join(' '),
    });

    return `https://www.quora.com/oauth/authorize?${params.toString()}`;
  }

  async handleCallback(code: string): Promise<any> {
    const clientId = this.configService.get<string>('QUORA_CLIENT_ID');
    const clientSecret = this.configService.get<string>('QUORA_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('QUORA_REDIRECT_URI');

    try {
      // Exchange code for access token
      const tokenResponse = await axios.post(
        'https://www.quora.com/oauth/token',
        {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const { access_token, refresh_token, expires_in } = tokenResponse.data;

      // Get user info
      const userResponse = await axios.get('https://api.quora.com/v1/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const expiresAt = expires_in ? new Date(Date.now() + expires_in * 1000) : null;

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expiresAt,
        metadata: {
          userId: userResponse.data.id,
          username: userResponse.data.username,
          name: userResponse.data.name,
          profileUrl: userResponse.data.profile_url,
        },
      };
    } catch (error) {
      this.logger.error('Quora OAuth error:', error.response?.data || error.message);
      throw new Error(`Quora authentication failed: ${error.message}`);
    }
  }

  async postAnswer(accessToken: string, content: any): Promise<any> {
    try {
      const answerResponse = await axios.post(
        'https://api.quora.com/v1/answers',
        {
          question_id: content.questionId,
          content: content.text,
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
        answerId: answerResponse.data.id,
        url: answerResponse.data.url,
      };
    } catch (error) {
      this.logger.error('Quora post error:', error.response?.data || error.message);
      throw new Error(`Failed to post to Quora: ${error.message}`);
    }
  }
}

