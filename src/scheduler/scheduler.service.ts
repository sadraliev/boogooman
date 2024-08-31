import { Injectable } from '@nestjs/common';
import { fromZonedTime } from 'date-fns-tz';
import { IANA } from 'src/lib';

@Injectable()
export class SchedulerService {
  convertToUTC(iso8601: string, timeZone: IANA) {
    return fromZonedTime(iso8601, timeZone);
  }
}
