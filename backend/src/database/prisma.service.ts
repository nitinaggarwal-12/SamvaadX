import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });
  }

  async onModuleInit() {
    // Log slow queries in development
    if (process.env.NODE_ENV === 'development') {
      // @ts-expect-error - Prisma event types
      this.$on('query', (e: any) => {
        if (e.duration > 100) {
          this.logger.warn(`Slow query detected: ${e.query} (${e.duration}ms)`);
        }
      });
    }

    // @ts-expect-error - Prisma event types
    this.$on('error', (e: any) => {
      this.logger.error('Prisma error:', e);
    });

    await this.$connect();
    this.logger.log('🔌 Database connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🔌 Database disconnected');
  }

  // Helper method for safe transactions
  async runTransaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    return this.$transaction(fn);
  }

  // Soft delete helper
  async softDelete(model: string, id: string) {
    return this[model].update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // Restore soft deleted record
  async restore(model: string, id: string) {
    return this[model].update({
      where: { id },
      data: { deletedAt: null },
    });
  }
}

