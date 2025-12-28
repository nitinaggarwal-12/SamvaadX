import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';

// Database
import { DatabaseModule } from './database/database.module';

// Core Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { EventsModule } from './events/events.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ContentModule } from './content/content.module';
import { MediaModule } from './media/media.module';
import { PublishingModule } from './publishing/publishing.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SocialIntegrationsModule } from './social-integrations/social-integrations.module';
import { AiModule } from './ai/ai.module';
import { WorkflowModule } from './workflow/workflow.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { SearchModule } from './search/search.module';
import { RealtimeModule } from './realtime/realtime.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ([{
        ttl: config.get('THROTTLE_TTL') || 60000,
        limit: config.get('THROTTLE_LIMIT') || 1000,
      }]),
    }),

    // Task Scheduling
    ScheduleModule.forRoot(),

    // Event System
    EventEmitterModule.forRoot(),

    // Queue Management (Bull/Redis)
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST') || 'localhost',
          port: config.get('REDIS_PORT') || 6379,
          password: config.get('REDIS_PASSWORD'),
        },
      }),
    }),

    // Database
    DatabaseModule,

    // Core Business Modules
    AuthModule,
    UsersModule,
    OrganizationsModule,
    EventsModule,
    CampaignsModule,
    ContentModule,
    MediaModule,
    PublishingModule,
    AnalyticsModule,
    SocialIntegrationsModule,
    AiModule,
    WorkflowModule,
    NotificationsModule,
    SchedulerModule,
    SearchModule,
    RealtimeModule,
    ReportsModule,
  ],
})
export class AppModule {}

