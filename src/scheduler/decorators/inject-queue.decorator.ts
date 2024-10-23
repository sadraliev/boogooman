import { InjectQueue } from '@nestjs/bullmq';
import { MESSAGE_DISPATCHER } from '../constants/scheduler.contant';

export const InjectMessageDispatcherQueue = () =>
  InjectQueue(MESSAGE_DISPATCHER);
