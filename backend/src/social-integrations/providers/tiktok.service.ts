import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface TikTokAuthConfig {
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
}

interface TikTokVideoUpload {
  videoUrl: string;
  title: string;
  caption: string;
  privacyLevel: 'PUBLIC' | 'FRIENDS' | 'SELF';
  disableComment?: boolean;
  disableDuet?: boolean;
  disableStitch?: boolean;
}

@Injectable()
export class TikTokService {
  private readonly logger = new Logger(TikTokService.name);
  private readonly baseUrl = 'https://open.tiktokapis.com/v2';
  private readonly authConfig: TikTokAuthConfig;

  constructor(private configService: ConfigService) {
    this.authConfig = {
      clientKey: this.configService.get<string>('TIKTOK_CLIENT_KEY'),
      clientSecret: this.configService.get<string>('TIKTOK_CLIENT_SECRET'),
      redirectUri: this.configService.get<string>('TIKTOK_REDIRECT_URI'),
    };
  }

  /**
   * Get TikTok OAuth authorization URL
   */
  getAuthorizationUrl(state: string): string {
    const scopes = [
      'user.info.basic',
      'video.list',
      'video.upload',
      'video.publish',
    ];

    const params = new URLSearchParams({
      client_key: this.authConfig.clientKey,
      scope: scopes.join(','),
      response_type: 'code',
      redirect_uri: this.authConfig.redirectUri,
      state,
    });

    return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async getAccessToken(code: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://open.tiktokapis.com/v2/oauth/token/',
        {
          client_key: this.authConfig.clientKey,
          client_secret: this.authConfig.clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.authConfig.redirectUri,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('Failed to get TikTok access token', error);
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://open.tiktokapis.com/v2/oauth/token/',
        {
          client_key: this.authConfig.clientKey,
          client_secret: this.authConfig.clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('Failed to refresh TikTok token', error);
      throw error;
    }
  }

  /**
   * Get user info
   */
  async getUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/user/info/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          fields: 'open_id,union_id,avatar_url,display_name,username',
        },
      });

      return response.data.data.user;
    } catch (error) {
      this.logger.error('Failed to get TikTok user info', error);
      throw error;
    }
  }

  /**
   * Initialize video upload
   */
  async initializeVideoUpload(
    accessToken: string,
    videoData: TikTokVideoUpload,
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/post/publish/video/init/`,
        {
          post_info: {
            title: videoData.title,
            description: videoData.caption,
            privacy_level: videoData.privacyLevel,
            disable_comment: videoData.disableComment || false,
            disable_duet: videoData.disableDuet || false,
            disable_stitch: videoData.disableStitch || false,
          },
          source_info: {
            source: 'FILE_UPLOAD',
            video_url: videoData.videoUrl,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.data;
    } catch (error) {
      this.logger.error('Failed to initialize TikTok video upload', error);
      throw error;
    }
  }

  /**
   * Publish video to TikTok
   */
  async publishVideo(
    accessToken: string,
    publishId: string,
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/post/publish/status/fetch/`,
        {
          publish_id: publishId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.data;
    } catch (error) {
      this.logger.error('Failed to publish TikTok video', error);
      throw error;
    }
  }

  /**
   * Get user's videos
   */
  async getUserVideos(
    accessToken: string,
    cursor?: string,
    maxCount: number = 20,
  ): Promise<any> {
    try {
      const params: any = {
        max_count: maxCount,
      };

      if (cursor) {
        params.cursor = cursor;
      }

      const response = await axios.post(
        `${this.baseUrl}/video/list/`,
        params,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.data;
    } catch (error) {
      this.logger.error('Failed to get TikTok videos', error);
      throw error;
    }
  }

  /**
   * Get video analytics
   */
  async getVideoAnalytics(
    accessToken: string,
    videoIds: string[],
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/video/query/`,
        {
          filters: {
            video_ids: videoIds,
          },
          fields: [
            'id',
            'title',
            'video_description',
            'create_time',
            'cover_image_url',
            'share_url',
            'view_count',
            'like_count',
            'comment_count',
            'share_count',
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.data.videos;
    } catch (error) {
      this.logger.error('Failed to get TikTok video analytics', error);
      throw error;
    }
  }
}

