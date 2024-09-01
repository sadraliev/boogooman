import { fromZonedTime } from 'date-fns-tz';
import { IANA, ISO8601simple } from '../types';
import { format } from 'date-fns/fp';

export const convertDateTimeToUTCUsingTimeZone = (
  iso8601: ISO8601simple,
  timeZone: IANA,
) => {
  return fromZonedTime(iso8601, timeZone);
};

export const makeDateTime = (date: string | number | Date) => {
  return format("yyyy-MM-dd'T'HH:mm:ss")(date);
};
