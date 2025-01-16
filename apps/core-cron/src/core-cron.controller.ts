import { Controller, Get } from '@nestjs/common';
import { CoreCronService } from './core-cron.service';

@Controller()
export class CoreCronController {
  constructor(private readonly coreCronService: CoreCronService) {}

  @Get()
  getHello(): string {
    return this.coreCronService.getHello();
  }
}
