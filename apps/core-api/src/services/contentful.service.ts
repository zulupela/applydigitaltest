import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Product } from '@entities/product.entity';

@Injectable()
export class ContentfulService {
  constructor(
    private readonly logger: Logger,
    @Inject('CRON_CORE_SERVICE') private readonly client: ClientProxy
  ) {}

  public async getContentfulProductsData(): Promise<Product[]> {
    try {
      this.logger.log(`${this.getContentfulProductsData.name}: started`);

      const result = await firstValueFrom<Product[]>(this.client.send({ cmd: 'getContentfulProductsData' }, {}));

      this.logger.log(`${this.getContentfulProductsData.name}: contentful information successfully retrieved`);

      return result;
    } catch (error) {
      this.logger.error(
        `${this.getContentfulProductsData.name}: failed with ${JSON.stringify({ error: error.message })}`
      );
      throw new Error('Failed to get contentful products information');
    }
  }
}
