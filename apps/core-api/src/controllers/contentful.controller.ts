import { Controller, Get } from '@nestjs/common';
import { ContentfulService } from '@core-api/services/contentful.service';
import { Product } from '@entities/product.entity';

@Controller('contentful')
export class ContentfulController {
  constructor(private readonly microserviceService: ContentfulService) {}

  @Get()
  public getContentfulProductsData(): Promise<Product[]> {
    return this.microserviceService.getContentfulProductsData();
  }
}
