import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PublishResult } from '../social-integrations.service';

@Injectable()
export class LinkedInService {
  private readonly logger = new Logger(LinkedInService.name);
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;

  constructor(private readonly config: ConfigService) {
    this.clientId = this.config.get('LINKEDIN_CLIENT_ID');
    this.clientSecret = this.config.get('LINKEDIN_CLIENT_SECRET');
    this.redirectUri = this.config.get('LINKEDIN_REDIRECT_URI');
  }

  getAuthUrl(userId: string): string {
    const scopes = ['r_liteprofile', 'r_emailaddress', 'w_member_social'].join('%20');

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state: userId,
      scope: scopes,
    });

    return `https://www.linkedin.com/oauth/v2/authorization?${params}`;
  }

  async handleCallback(code: string) {
    try {
      const tokenResponse = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.redirectUri,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token, expires_in } = tokenResponse.data;

      const expiresAt = new Date();
      expiresAt.setSeconds(expiresAt.getSeconds() + expires_in);

      return {
        accessToken: access_token,
        refreshToken: null,
        expiresAt,
      };
    } catch (error) {
      this.logger.error('LinkedIn OAuth error:', error.response?.data || error.message);
      throw new Error('Failed to complete LinkedIn authentication');
    }
  }

  async publish(accessToken: string, content: string, mediaUrl?: string): Promise<PublishResult> {
    try {
      // Get user's profile ID
      const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const authorId = `urn:li:person:${profileResponse.data.id}`;

      // Create share
      const shareData: any = {
        author: authorId,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content,
            },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };

      if (mediaUrl) {
        shareData.specificContent['com.linkedin.ugc.ShareContent'].shareMediaCategory = 'IMAGE';
        // Additional media handling would be needed
      }

      const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', shareData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
      });

      return {
        platform: 'LinkedIn',
        success: true,
        postId: response.data.id,
        url: `https://www.linkedin.com/feed/update/${response.data.id}`,
      };
    } catch (error) {
      this.logger.error('LinkedIn publish error:', error.response?.data || error.message);
      return {
        platform: 'LinkedIn',
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }
}

