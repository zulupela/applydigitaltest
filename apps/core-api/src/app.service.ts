import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('CRON_CORE_SERVICE') private client: ClientProxy) {}

  async getHello(): Promise<string> {
    return firstValueFrom<string>(this.client.send({ cmd: 'getContentfulProductsData' }, {}));
  }
}
