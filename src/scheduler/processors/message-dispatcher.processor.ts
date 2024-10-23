import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { WorkerHostProcessor } from 'src/queue/work-host.processor';
import { Processor } from '@nestjs/bullmq';
import { MESSAGE_DISPATCHER } from '../constants/scheduler.contant';

@Processor(MESSAGE_DISPATCHER)
export class MessageDispatcherProcessor extends WorkerHostProcessor {
  protected readonly logger = new Logger(MessageDispatcherProcessor.name);
  async process(job: Job): Promise<void> {
    this.logger.verbose('job name is', job.name);
    this.logger.log('Dispatcher is running...');
  }
}
