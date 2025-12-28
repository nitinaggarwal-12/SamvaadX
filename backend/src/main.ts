import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const configService = app.get(ConfigService);

  // Security
  app.use(helmet({ contentSecurityPolicy: false }));
  app.enableCors({
    origin: configService.get('CORS_ORIGINS')?.split(',') || ['http://localhost:3001'],
    credentials: true,
  });

  // Compression
  app.use(compression());

  // Global prefix
  app.setGlobalPrefix('api');

  // API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Guddu-Project API')
    .setDescription(
      'Enterprise Social Media Marketing Platform - Government-grade API for managing international events',
    )
    .setVersion('1.0')
    .addTag('Authentication', 'User authentication and authorization')
    .addTag('Organizations', 'Organization management')
    .addTag('Users', 'User management')
    .addTag('Events', 'Event management')
    .addTag('Campaigns', 'Campaign management')
    .addTag('Content', 'Content creation and management')
    .addTag('Media', 'Media asset management')
    .addTag('Publishing', 'Social media publishing')
    .addTag('Analytics', 'Analytics and reporting')
    .addTag('Social Accounts', 'Social media account integration')
    .addTag('AI Services', 'AI-powered features')
    .addTag('Approvals', 'Content approval workflows')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Guddu-Project API Documentation',
    customfavIcon: 'https://cdn.guddu-project.com/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  // Health check endpoint
  app.getHttpAdapter().get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  console.log(`
  ╔══════════════════════════════════════════════════════════════╗
  ║                                                              ║
  ║   🚀 GUDDU-PROJECT BACKEND API                               ║
  ║   Enterprise Social Media Marketing Platform                 ║
  ║                                                              ║
  ║   🌍 Server running at: http://localhost:${port}                ║
  ║   📚 API Docs: http://localhost:${port}/api/docs               ║
  ║   ❤️  Health: http://localhost:${port}/health                  ║
  ║   🔒 Environment: ${configService.get('NODE_ENV') || 'development'}                        ║
  ║                                                              ║
  ║   Built for governments & international organizations        ║
  ║                                                              ║
  ╚══════════════════════════════════════════════════════════════╝
  `);
}

bootstrap();
