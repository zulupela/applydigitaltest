import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CoreCronModule } from './modules/core-cron.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get<number>('CORE_CRON_PORT');

  if (!port) {
    throw new Error('Microservice port missing');
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CoreCronModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port }
  });

  await app.listen();
}

bootstrap();
