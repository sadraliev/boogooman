import { Controller, Get } from '@nestjs/common';
import { SchedulerService } from './scheduler/scheduler.service';

@Controller()
export class AppController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Get()
  getHello(): string {
    const time = this.schedulerService.convertToUTC(
      new Date().toISOString(),
      'Asia/Bishkek',
    );
    return time as any;
  }
}
