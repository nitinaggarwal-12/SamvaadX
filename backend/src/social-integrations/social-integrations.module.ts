import { Module } from '@nestjs/common';
import { SocialIntegrationsController } from './social-integrations.controller';
import { SocialIntegrationsService } from './social-integrations.service';
import { FacebookService } from './providers/facebook.service';
import { TwitterService } from './providers/twitter.service';
import { InstagramService } from './providers/instagram.service';
import { LinkedInService } from './providers/linkedin.service';
import { YouTubeService } from './providers/youtube.service';
import { MediumService } from './providers/medium.service';
import { RedditService } from './providers/reddit.service';
import { QuoraService } from './providers/quora.service';
import { PinterestService } from './providers/pinterest.service';
import { VimeoService } from './providers/vimeo.service';
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
    MediumService,
    RedditService,
    QuoraService,
    PinterestService,
    VimeoService,
    PrismaService,
  ],
  exports: [SocialIntegrationsService],
})
export class SocialIntegrationsModule {}
