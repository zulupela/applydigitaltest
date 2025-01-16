import { Controller } from '@nestjs/common';
import { CoreCronService } from './core-cron.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CoreCronController {
  constructor(private readonly coreCronService: CoreCronService) {}

  @MessagePattern({ cmd: 'hello' })
  public getHello(): string {
    return this.coreCronService.getHello();
  }
}
