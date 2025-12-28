import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface PinterestAuthConfig {
  appId: string;
  appSecret: string;
  redirectUri: string;
}

interface PinterestPin {
  boardId: string;
  title: string;
  description?: string;
  link?: string;
  imageUrl: string;
  altText?: string;
}

@Injectable()
export class PinterestService {
  private readonly logger = new Logger(PinterestService.name);
  private readonly baseUrl = 'https://api.pinterest.com/v5';
  private readonly authConfig: PinterestAuthConfig;

  constructor(private configService: ConfigService) {
    this.authConfig = {
      appId: this.configService.get<string>('PINTEREST_APP_ID'),
      appSecret: this.configService.get<string>('PINTEREST_APP_SECRET'),
      redirectUri: this.configService.get<string>('PINTEREST_REDIRECT_URI'),
    };
  }

  /**
   * Get Pinterest OAuth authorization URL
   */
  getAuthorizationUrl(state: string): string {
    const scopes = [
      'boards:read',
      'boards:write',
      'pins:read',
      'pins:write',
      'user_accounts:read',
    ];

    const params = new URLSearchParams({
      client_id: this.authConfig.appId,
      redirect_uri: this.authConfig.redirectUri,
      response_type: 'code',
      scope: scopes.join(','),
      state,
    });

    return `https://www.pinterest.com/oauth/?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async getAccessToken(code: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://api.pinterest.com/v5/oauth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.authConfig.redirectUri,
        }),
        {
          auth: {
            username: this.authConfig.appId,
            password: this.authConfig.appSecret,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('Failed to get Pinterest access token', error);
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const response = await axios.post(
        'https://api.pinterest.com/v5/oauth/token',
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
        {
          auth: {
            username: this.authConfig.appId,
            password: this.authConfig.appSecret,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('Failed to refresh Pinterest token', error);
      throw error;
    }
  }

  /**
   * Get user info
   */
  async getUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/user_account`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      this.logger.error('Failed to get Pinterest user info', error);
      throw error;
    }
  }

  /**
   * Get user boards
   */
  async getUserBoards(
    accessToken: string,
    pageSize: number = 25,
  ): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/boards`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page_size: pageSize,
        },
      });

      return response.data.items;
    } catch (error) {
      this.logger.error('Failed to get Pinterest boards', error);
      throw error;
    }
  }

  /**
   * Create a new pin
   */
  async createPin(
    accessToken: string,
    pinData: PinterestPin,
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/pins`,
        {
          board_id: pinData.boardId,
          title: pinData.title,
          description: pinData.description,
          link: pinData.link,
          media_source: {
            source_type: 'image_url',
            url: pinData.imageUrl,
          },
          alt_text: pinData.altText,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('Failed to create Pinterest pin', error);
      throw error;
    }
  }

  /**
   * Get pin analytics
   */
  async getPinAnalytics(
    accessToken: string,
    pinId: string,
    startDate: string,
    endDate: string,
  ): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/pins/${pinId}/analytics`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            start_date: startDate,
            end_date: endDate,
            metric_types: 'IMPRESSION,SAVE,PIN_CLICK,OUTBOUND_CLICK',
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('Failed to get Pinterest pin analytics', error);
      throw error;
    }
  }

  /**
   * Get user pins
   */
  async getUserPins(
    accessToken: string,
    pageSize: number = 25,
  ): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/pins`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page_size: pageSize,
        },
      });

      return response.data.items;
    } catch (error) {
      this.logger.error('Failed to get Pinterest pins', error);
      throw error;
    }
  }

  /**
   * Create a new board
   */
  async createBoard(
    accessToken: string,
    name: string,
    description?: string,
    privacy: 'PUBLIC' | 'PROTECTED' | 'SECRET' = 'PUBLIC',
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/boards`,
        {
          name,
          description,
          privacy,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('Failed to create Pinterest board', error);
      throw error;
    }
  }
}

