import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { calculateCosts } from './lib';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const currentExchangeRate = 87.5; // Текущий курс доллара
    const costs = calculateCosts(currentExchangeRate);
    console.log(costs);

    return costs as any;
  }
}
