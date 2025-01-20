import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Product } from '@entities/product.entity';

@Injectable()
export class CoreCronService {
  constructor(
    private readonly logger: Logger,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  public async getContentfulProductsData(): Promise<Product[]> {
    try {
      this.logger.log(`${this.getContentfulProductsData.name}: started`);

      const spaceId = this.configService.get<string>('CONTENTFUL_SPACE_ID');
      const environmentId = this.configService.get<string>('CONTENTFUL_ENVIRONMENT');
      const accessToken = this.configService.get<string>('CONTENTFUL_ACCESS_TOKEN');
      const contentType = this.configService.get<string>('CONTENTFUL_CONTENT_TYPE');

      const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries`;

      const {
        data: { items }
      } = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            access_token: accessToken,
            content_type: contentType
          }
        })
      );

      this.logger.debug(
        `${this.getContentfulProductsData.name}: contentful data retrieved: ${JSON.stringify({ length: items.length })}`
      );

      const products = this.productRepository.create(items.map((item) => ({ id: item.sys.id, ...item.fields })));
      const updateResults = await this.productRepository.save(products);

      this.logger.log(`${this.getContentfulProductsData.name}: products information successfully updated`);

      return updateResults;
    } catch (error) {
      this.logger.error(`${this.getContentfulProductsData.name}: failed`, { error });
      throw new Error('Failed to get products data');
    }
  }
}
