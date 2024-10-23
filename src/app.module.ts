import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulerModule } from './scheduler/scheduler.module';
import { queueConfig } from './config/queue.config';
import { bullboardConfig } from './config/queue-board.config';
import { envConfig } from './config/env.config';
import { redisConfig } from './config/redis.config';

@Module({
  imports: [
    envConfig,
    redisConfig,
    queueConfig,
    bullboardConfig,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
