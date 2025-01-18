import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Product } from '@entities/product.entity';
import { CoreCronService } from '@core-cron/services/core-cron.service';

@Controller()
export class CoreCronController {
  constructor(private readonly coreCronService: CoreCronService) {}

  @MessagePattern({ cmd: 'getContentfulProductsData' })
  public getContentfulProductsData(): Promise<Product[]> {
    return this.coreCronService.getContentfulProductsData();
  }
}
