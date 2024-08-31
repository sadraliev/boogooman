import { Test, TestingModule } from '@nestjs/testing';
import { SchedulerService } from './scheduler.service';
import { format } from 'date-fns';
import { IANA } from 'src/lib';

describe('SchedulerService', () => {
  let service: SchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulerService],
    }).compile();

    service = module.get<SchedulerService>(SchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should convert time from America/New_York to UTC', () => {
    const localDate = '2024-08-31T10:00:00'; // 10:00 AM in New York
    const expectedDate = '2024-08-31T14:00:00.000Z'; // 10:00 AM in New York is 2:00 PM UTC
    const date = new Date(localDate);
    const timeZone: IANA = 'America/New_York';

    const dateInUTC = service.convertToUTC(
      format(date, "yyyy-MM-dd'T'HH:mm:ss"),
      timeZone,
    );

    expect(dateInUTC.toISOString()).toBe(expectedDate);
  });

  it('should convert time from Asia/Bishkek to UTC', () => {
    const localDate = '2024-08-31T10:00:00'; // 10:00 AM in Bishkek
    const expectedDate = '2024-08-31T04:00:00.000Z'; // 10:00 AM in Bishkek is 4:00 AM UTC

    const date = new Date(localDate);
    const timeZone: IANA = 'Asia/Bishkek';

    const dateInUTC = service.convertToUTC(
      format(date, "yyyy-MM-dd'T'HH:mm:ss"),
      timeZone,
    );

    expect(dateInUTC.toISOString()).toBe(expectedDate);
  });
});
