import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ContentfulService {
  constructor(@Inject('CRON_CORE_SERVICE') private client: ClientProxy) {}

  async getContentfulProductsData(): Promise<string> {
    return firstValueFrom<string>(this.client.send({ cmd: 'getContentfulProductsData' }, {}));
  }
}
