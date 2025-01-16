import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoreCronService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  public getHello(): string {
    return '';
  }
}
