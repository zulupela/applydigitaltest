import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreCronService {
  getHello(): string {
    return 'Hello World from MicroService!';
  }
}
