import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PublishResult } from '../social-integrations.service';
import * as crypto from 'crypto';

@Injectable()
export class TwitterService {
  private readonly logger = new Logger(TwitterService.name);
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly apiKey: string;
  private readonly apiSecretKey: string;

  constructor(private readonly config: ConfigService) {
    this.clientId = this.config.get('TWITTER_CLIENT_ID');
    this.clientSecret = this.config.get('TWITTER_CLIENT_SECRET');
    this.redirectUri = this.config.get('TWITTER_REDIRECT_URI');
    this.apiKey = this.config.get('TWITTER_API_KEY');
    this.apiSecretKey = this.config.get('TWITTER_API_SECRET_KEY');
  }

  getAuthUrl(userId: string): string {
    // Using OAuth 2.0 PKCE flow
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = this.generateCodeChallenge(codeVerifier);

    const scopes = ['tweet.read', 'tweet.write', 'users.read', 'offline.access'].join(' ');

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: scopes,
      state: userId,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    // Store code_verifier temporarily (in production, use Redis or session)
    // For now, we'll pass it in state
    return `https://twitter.com/i/oauth2/authorize?${params}`;
  }

  async handleCallback(code: string) {
    try {
      const tokenResponse = await axios.post(
        'https://api.twitter.com/2/oauth2/token',
        new URLSearchParams({
          code,
          grant_type: 'authorization_code',
          client_id: this.clientId,
          redirect_uri: this.redirectUri,
          code_verifier: 'STORED_CODE_VERIFIER', // Should be retrieved from storage
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: this.clientId,
            password: this.clientSecret,
          },
        },
      );

      const { access_token, refresh_token, expires_in } = tokenResponse.data;

      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt,
      };
    } catch (error) {
      this.logger.error('Twitter OAuth error:', error.response?.data || error.message);
      throw new Error('Failed to complete Twitter authentication');
    }
  }

  async publish(
    accessToken: string,
    accessTokenSecret: string,
    content: string,
    mediaUrl?: string,
  ): Promise<PublishResult> {
    try {
      const tweetData: any = {
        text: content,
      };

      // If media, upload it first
      if (mediaUrl) {
        // Media upload would require additional steps
        this.logger.warn('Media upload not yet implemented for Twitter');
      }

      const response = await axios.post('https://api.twitter.com/2/tweets', tweetData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return {
        platform: 'Twitter/X',
        success: true,
        postId: response.data.data.id,
        url: `https://twitter.com/i/status/${response.data.data.id}`,
      };
    } catch (error) {
      this.logger.error('Twitter publish error:', error.response?.data || error.message);
      return {
        platform: 'Twitter/X',
        success: false,
        error: error.response?.data?.detail || error.message,
      };
    }
  }

  private generateCodeVerifier(): string {
    return crypto.randomBytes(32).toString('base64url');
  }

  private generateCodeChallenge(verifier: string): string {
    return crypto.createHash('sha256').update(verifier).digest('base64url');
  }
}

