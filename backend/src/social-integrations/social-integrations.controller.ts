import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SocialIntegrationsService } from './social-integrations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/social')
export class SocialIntegrationsController {
  constructor(
    private readonly socialIntegrationsService: SocialIntegrationsService,
  ) {}

  // ==================== FACEBOOK ====================

  @Get('facebook/auth')
  @UseGuards(JwtAuthGuard)
  async facebookAuth(@CurrentUser() user: any) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('facebook', user.id);
    return { authUrl };
  }

  @Get('auth/facebook/callback')
  async facebookCallback(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleOAuthCallback(
        'facebook',
        code,
        state,
      );
      return {
        success: true,
        message: 'Facebook account connected successfully',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to connect Facebook account',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ==================== TWITTER ====================

  @Get('twitter/auth')
  @UseGuards(JwtAuthGuard)
  async twitterAuth(@CurrentUser() user: any) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('twitter', user.id);
    return { authUrl };
  }

  @Get('auth/twitter/callback')
  async twitterCallback(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleOAuthCallback(
        'twitter',
        code,
        state,
      );
      return {
        success: true,
        message: 'Twitter account connected successfully',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to connect Twitter account',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ==================== LINKEDIN ====================

  @Get('linkedin/auth')
  @UseGuards(JwtAuthGuard)
  async linkedinAuth(@CurrentUser() user: any) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('linkedin', user.id);
    return { authUrl };
  }

  @Get('auth/linkedin/callback')
  async linkedinCallback(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleOAuthCallback(
        'linkedin',
        code,
        state,
      );
      return {
        success: true,
        message: 'LinkedIn account connected successfully',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to connect LinkedIn account',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ==================== YOUTUBE ====================

  @Get('youtube/auth')
  @UseGuards(JwtAuthGuard)
  async youtubeAuth(@CurrentUser() user: any) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('youtube', user.id);
    return { authUrl };
  }

  @Get('auth/youtube/callback')
  async youtubeCallback(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleOAuthCallback(
        'youtube',
        code,
        state,
      );
      return {
        success: true,
        message: 'YouTube account connected successfully',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to connect YouTube account',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ==================== INSTAGRAM ====================

  @Get('instagram/auth')
  @UseGuards(JwtAuthGuard)
  async instagramAuth(@CurrentUser() user: any) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('instagram', user.id);
    return { authUrl };
  }

  @Get('auth/instagram/callback')
  async instagramCallback(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleOAuthCallback(
        'instagram',
        code,
        state,
      );
      return {
        success: true,
        message: 'Instagram account connected successfully',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to connect Instagram account',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ==================== TIKTOK ====================

  @Get('tiktok/auth')
  @UseGuards(JwtAuthGuard)
  async tiktokAuth(@CurrentUser() user: any) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('tiktok', user.id);
    return { authUrl };
  }

  @Get('auth/tiktok/callback')
  async tiktokCallback(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleOAuthCallback(
        'tiktok',
        code,
        state,
      );
      return {
        success: true,
        message: 'TikTok account connected successfully',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to connect TikTok account',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ==================== PINTEREST ====================

  @Get('pinterest/auth')
  @UseGuards(JwtAuthGuard)
  async pinterestAuth(@CurrentUser() user: any) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('pinterest', user.id);
    return { authUrl };
  }

  @Get('auth/pinterest/callback')
  async pinterestCallback(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleOAuthCallback(
        'pinterest',
        code,
        state,
      );
      return {
        success: true,
        message: 'Pinterest account connected successfully',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to connect Pinterest account',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ==================== SNAPCHAT ====================

  @Get('snapchat/auth')
  @UseGuards(JwtAuthGuard)
  async snapchatAuth(@CurrentUser() user: any) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('snapchat', user.id);
    return { authUrl };
  }

  @Get('auth/snapchat/callback')
  async snapchatCallback(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleOAuthCallback(
        'snapchat',
        code,
        state,
      );
      return {
        success: true,
        message: 'Snapchat account connected successfully',
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Failed to connect Snapchat account',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ==================== GENERAL ENDPOINTS ====================

  @Get('connections')
  @UseGuards(JwtAuthGuard)
  async getUserConnections(@CurrentUser() user: any) {
    return this.socialIntegrationsService.getConnectedPlatforms(user.id);
  }

  @Delete('disconnect/:platform')
  @UseGuards(JwtAuthGuard)
  async disconnectPlatform(
    @CurrentUser() user: any,
    @Param('platform') platform: string,
  ) {
    await this.socialIntegrationsService.disconnectPlatform(user.id, platform);
    return {
      success: true,
      message: `${platform} account disconnected successfully`,
    };
  }

  @Post('publish')
  @UseGuards(JwtAuthGuard)
  async publishContent(
    @CurrentUser() user: any,
    @Body()
    body: {
      content: string;
      platforms: string[];
      mediaUrl?: string;
      scheduledTime?: Date;
    },
  ) {
    const results = await this.socialIntegrationsService.publishToMultiplePlatforms({
      userId: user.id,
      ...body,
    });
    return {
      success: true,
      results,
    };
  }
}
