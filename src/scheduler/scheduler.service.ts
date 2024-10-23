import { Injectable } from '@nestjs/common';
import { InjectCache, RedisCache } from 'src/config/redis.config';
import {
  convertDateTimeToUTCUsingTimeZone,
  IANA,
  ISO8601simple,
} from 'src/lib';
import { InjectMessageDispatcherQueue } from './decorators/inject-queue.decorator';
import { Queue } from 'bullmq';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectCache() private cache: RedisCache,
    @InjectMessageDispatcherQueue()
    private dispatcherQueue: Queue<{ time: Date }, void, 'dispatch'>,
  ) {}
  async convertToUTC(iso8601: ISO8601simple, timeZone: IANA) {
    const time = convertDateTimeToUTCUsingTimeZone(iso8601, timeZone);
    await this.cache.set(iso8601, JSON.stringify({ timeZone }));
    this.dispatcherQueue.add('dispatch', { time });
    return;
  }
}
