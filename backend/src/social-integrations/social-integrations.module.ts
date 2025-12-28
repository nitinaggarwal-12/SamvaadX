import { Module } from '@nestjs/common';
import { SocialIntegrationsController } from './social-integrations.controller';
import { SocialIntegrationsService } from './social-integrations.service';
import { FacebookService } from './providers/facebook.service';
import { TwitterService } from './providers/twitter.service';
import { InstagramService } from './providers/instagram.service';
import { LinkedInService } from './providers/linkedin.service';
import { YouTubeService } from './providers/youtube.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [SocialIntegrationsController],
  providers: [
    SocialIntegrationsService,
    FacebookService,
    TwitterService,
    InstagramService,
    LinkedInService,
    YouTubeService,
    PrismaService,
  ],
  exports: [SocialIntegrationsService],
})
export class SocialIntegrationsModule {}
