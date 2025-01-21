import { Controller, Get } from '@nestjs/common';
import { ContentfulService } from '@core-api/services/contentful.service';
import { Product } from '@entities/product.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('contentful')
export class ContentfulController {
  constructor(private readonly microserviceService: ContentfulService) {}

  @Get()
  @ApiOperation({
    summary: 'Get contentful data',
    description: 'Get contentful products latest data and update references in database',
    responses: { 200: { description: 'Array of updated products' } }
  })
  public getContentfulProductsData(): Promise<Product[]> {
    return this.microserviceService.getContentfulProductsData();
  }
}
