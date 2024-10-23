import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { QueueModule } from 'src/queue/queue.module';
import { MessageDispatcherProcessor } from './processors/message-dispatcher.processor';
import { MESSAGE_DISPATCHER } from './constants/scheduler.contant';

@Module({
  imports: [
    QueueModule.register({
      queues: [MESSAGE_DISPATCHER],
    }),
  ],
  providers: [SchedulerService, MessageDispatcherProcessor],
  exports: [SchedulerService],
})
export class SchedulerModule {}
