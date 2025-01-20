import { Controller, Get } from '@nestjs/common';
import { ContentfulService } from '@core-api/services/contentful.service';

@Controller('contentful')
export class ContentfulController {
  constructor(private readonly microserviceService: ContentfulService) {}

  @Get()
  public getContentfulProductsData(): Promise<string> {
    return this.microserviceService.getContentfulProductsData();
  }
}
