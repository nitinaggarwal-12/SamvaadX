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
  Res,
  Redirect,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SocialIntegrationsService } from './social-integrations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('social')
export class SocialIntegrationsController {
  private readonly frontendUrl: string;

  constructor(
    private readonly socialIntegrationsService: SocialIntegrationsService,
    private readonly config: ConfigService,
  ) {
    this.frontendUrl = this.config.get('FRONTEND_URL') || 'http://localhost:3001';
  }

  // ==================== FACEBOOK ====================

  @Get('facebook/auth')
  @UseGuards(JwtAuthGuard)
  async facebookAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('facebook', user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/facebook/callback')
  async facebookCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      await this.socialIntegrationsService.handleOAuthCallback(
        'facebook',
        code,
        state,
      );
      return res.redirect(`${this.frontendUrl}/connections?success=facebook`);
    } catch (error) {
      return res.redirect(`${this.frontendUrl}/connections?error=facebook_auth_failed`);
    }
  }

  // ==================== TWITTER ====================

  @Get('twitter/auth')
  @UseGuards(JwtAuthGuard)
  async twitterAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('twitter', user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/twitter/callback')
  async twitterCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      await this.socialIntegrationsService.handleOAuthCallback(
        'twitter',
        code,
        state,
      );
      return res.redirect(`${this.frontendUrl}/connections?success=twitter`);
    } catch (error) {
      return res.redirect(`${this.frontendUrl}/connections?error=twitter_auth_failed`);
    }
  }

  // ==================== LINKEDIN ====================

  @Get('linkedin/auth')
  @UseGuards(JwtAuthGuard)
  async linkedinAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('linkedin', user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/linkedin/callback')
  async linkedinCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      await this.socialIntegrationsService.handleOAuthCallback(
        'linkedin',
        code,
        state,
      );
      return res.redirect(`${this.frontendUrl}/connections?success=linkedin`);
    } catch (error) {
      return res.redirect(`${this.frontendUrl}/connections?error=linkedin_auth_failed`);
    }
  }

  // ==================== YOUTUBE ====================

  @Get('youtube/auth')
  @UseGuards(JwtAuthGuard)
  async youtubeAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('youtube', user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/youtube/callback')
  async youtubeCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      await this.socialIntegrationsService.handleOAuthCallback(
        'youtube',
        code,
        state,
      );
      return res.redirect(`${this.frontendUrl}/connections?success=youtube`);
    } catch (error) {
      return res.redirect(`${this.frontendUrl}/connections?error=youtube_auth_failed`);
    }
  }

  // ==================== INSTAGRAM ====================

  @Get('instagram/auth')
  @UseGuards(JwtAuthGuard)
  async instagramAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('instagram', user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/instagram/callback')
  async instagramCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      await this.socialIntegrationsService.handleOAuthCallback(
        'instagram',
        code,
        state,
      );
      return res.redirect(`${this.frontendUrl}/connections?success=instagram`);
    } catch (error) {
      return res.redirect(`${this.frontendUrl}/connections?error=instagram_auth_failed`);
    }
  }

  // ==================== TIKTOK ====================

  @Get('tiktok/auth')
  @UseGuards(JwtAuthGuard)
  async tiktokAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('tiktok', user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/tiktok/callback')
  async tiktokCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      await this.socialIntegrationsService.handleOAuthCallback(
        'tiktok',
        code,
        state,
      );
      return res.redirect(`${this.frontendUrl}/connections?success=tiktok`);
    } catch (error) {
      return res.redirect(`${this.frontendUrl}/connections?error=tiktok_auth_failed`);
    }
  }

  // ==================== PINTEREST ====================

  @Get('pinterest/auth')
  @UseGuards(JwtAuthGuard)
  async pinterestAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('pinterest', user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/pinterest/callback')
  async pinterestCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      await this.socialIntegrationsService.handleOAuthCallback(
        'pinterest',
        code,
        state,
      );
      return res.redirect(`${this.frontendUrl}/connections?success=pinterest`);
    } catch (error) {
      return res.redirect(`${this.frontendUrl}/connections?error=pinterest_auth_failed`);
    }
  }

  // ==================== SNAPCHAT ====================

  @Get('snapchat/auth')
  @UseGuards(JwtAuthGuard)
  async snapchatAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = await this.socialIntegrationsService.getOAuthUrl('snapchat', user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/snapchat/callback')
  async snapchatCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      await this.socialIntegrationsService.handleOAuthCallback(
        'snapchat',
        code,
        state,
      );
      return res.redirect(`${this.frontendUrl}/connections?success=snapchat`);
    } catch (error) {
      return res.redirect(`${this.frontendUrl}/connections?error=snapchat_auth_failed`);
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
