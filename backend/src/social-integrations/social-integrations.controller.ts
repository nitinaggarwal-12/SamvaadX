import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
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
  async facebookAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = this.socialIntegrationsService.getFacebookAuthUrl(user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/facebook/callback')
  async facebookCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleFacebookCallback(
        code,
        state,
      );
      // Redirect to frontend with success
      return res.redirect(
        `${process.env.FRONTEND_URL}/connections?success=facebook`,
      );
    } catch (error) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/connections?error=facebook_auth_failed`,
      );
    }
  }

  // ==================== TWITTER ====================

  @Get('twitter/auth')
  @UseGuards(JwtAuthGuard)
  async twitterAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = this.socialIntegrationsService.getTwitterAuthUrl(user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/twitter/callback')
  async twitterCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleTwitterCallback(
        code,
        state,
      );
      return res.redirect(
        `${process.env.FRONTEND_URL}/connections?success=twitter`,
      );
    } catch (error) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/connections?error=twitter_auth_failed`,
      );
    }
  }

  // ==================== LINKEDIN ====================

  @Get('linkedin/auth')
  @UseGuards(JwtAuthGuard)
  async linkedinAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = this.socialIntegrationsService.getLinkedInAuthUrl(user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/linkedin/callback')
  async linkedinCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleLinkedInCallback(
        code,
        state,
      );
      return res.redirect(
        `${process.env.FRONTEND_URL}/connections?success=linkedin`,
      );
    } catch (error) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/connections?error=linkedin_auth_failed`,
      );
    }
  }

  // ==================== YOUTUBE ====================

  @Get('youtube/auth')
  @UseGuards(JwtAuthGuard)
  async youtubeAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = this.socialIntegrationsService.getYouTubeAuthUrl(user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/youtube/callback')
  async youtubeCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleYouTubeCallback(
        code,
        state,
      );
      return res.redirect(
        `${process.env.FRONTEND_URL}/connections?success=youtube`,
      );
    } catch (error) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/connections?error=youtube_auth_failed`,
      );
    }
  }

  // ==================== INSTAGRAM ====================

  @Get('instagram/auth')
  @UseGuards(JwtAuthGuard)
  async instagramAuth(@CurrentUser() user: any, @Res() res: Response) {
    const authUrl = this.socialIntegrationsService.getInstagramAuthUrl(user.id);
    return res.redirect(authUrl);
  }

  @Get('auth/instagram/callback')
  async instagramCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.socialIntegrationsService.handleInstagramCallback(
        code,
        state,
      );
      return res.redirect(
        `${process.env.FRONTEND_URL}/connections?success=instagram`,
      );
    } catch (error) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/connections?error=instagram_auth_failed`,
      );
    }
  }

  // ==================== GET CONNECTIONS ====================

  @Get('connections')
  @UseGuards(JwtAuthGuard)
  async getConnections(@CurrentUser() user: any) {
    return this.socialIntegrationsService.getUserConnections(user.id);
  }

  // ==================== DISCONNECT ====================

  @Get('disconnect/:platform')
  @UseGuards(JwtAuthGuard)
  async disconnect(
    @CurrentUser() user: any,
    @Query('platform') platform: string,
  ) {
    await this.socialIntegrationsService.disconnect(user.id, platform);
    return { success: true, message: `Disconnected from ${platform}` };
  }
}
