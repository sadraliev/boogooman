import { Injectable } from '@nestjs/common';
import {
  convertDateTimeToUTCUsingTimeZone,
  IANA,
  ISO8601simple,
} from 'src/lib';

@Injectable()
export class SchedulerService {
  convertToUTC(iso8601: ISO8601simple, timeZone: IANA) {
    return convertDateTimeToUTCUsingTimeZone(iso8601, timeZone);
  }
}
