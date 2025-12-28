import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PublishResult } from '../social-integrations.service';

@Injectable()
export class FacebookService {
  private readonly logger = new Logger(FacebookService.name);
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;
  private readonly apiVersion = 'v18.0';

  constructor(private readonly config: ConfigService) {
    this.clientId = this.config.get('FACEBOOK_CLIENT_ID');
    this.clientSecret = this.config.get('FACEBOOK_CLIENT_SECRET');
    this.redirectUri = this.config.get('FACEBOOK_REDIRECT_URI');
  }

  getAuthUrl(userId: string): string {
    const scopes = [
      'pages_manage_posts',
      'pages_read_engagement',
      'pages_show_list',
      'public_profile',
    ].join(',');

    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: scopes,
      response_type: 'code',
      state: userId,
    });

    return `https://www.facebook.com/${this.apiVersion}/dialog/oauth?${params}`;
  }

  async handleCallback(code: string) {
    try {
      // Exchange code for access token
      const tokenResponse = await axios.get(
        `https://graph.facebook.com/${this.apiVersion}/oauth/access_token`,
        {
          params: {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            redirect_uri: this.redirectUri,
            code,
          },
        },
      );

      const { access_token, expires_in } = tokenResponse.data;

      // Get long-lived token
      const longLivedResponse = await axios.get(
        `https://graph.facebook.com/${this.apiVersion}/oauth/access_token`,
        {
          params: {
            grant_type: 'fb_exchange_token',
            client_id: this.clientId,
            client_secret: this.clientSecret,
            fb_exchange_token: access_token,
          },
        },
      );

      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + (expires_in || 5184000)); // 60 days default

      return {
        accessToken: longLivedResponse.data.access_token,
        refreshToken: null,
        expiresAt,
      };
    } catch (error) {
      this.logger.error('Facebook OAuth error:', error.response?.data || error.message);
      throw new Error('Failed to complete Facebook authentication');
    }
  }

  async publish(accessToken: string, content: string, mediaUrl?: string): Promise<PublishResult> {
    try {
      // Get user's pages
      const pagesResponse = await axios.get(
        `https://graph.facebook.com/${this.apiVersion}/me/accounts`,
        {
          params: { access_token: accessToken },
        },
      );

      if (!pagesResponse.data.data || pagesResponse.data.data.length === 0) {
        throw new Error('No Facebook Pages found');
      }

      // Use first page
      const page = pagesResponse.data.data[0];
      const pageAccessToken = page.access_token;
      const pageId = page.id;

      // Publish post
      const postData: any = {
        message: content,
        access_token: pageAccessToken,
      };

      if (mediaUrl) {
        postData.url = mediaUrl;
      }

      const postResponse = await axios.post(
        `https://graph.facebook.com/${this.apiVersion}/${pageId}/feed`,
        postData,
      );

      return {
        platform: 'Facebook',
        success: true,
        postId: postResponse.data.id,
        url: `https://facebook.com/${postResponse.data.id}`,
      };
    } catch (error) {
      this.logger.error('Facebook publish error:', error.response?.data || error.message);
      return {
        platform: 'Facebook',
        success: false,
        error: error.response?.data?.error?.message || error.message,
      };
    }
  }
}

