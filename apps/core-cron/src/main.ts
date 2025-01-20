import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CoreCronModule } from '@core-cron/modules/core-cron.module';

async function bootstrap() {
  const configService = new ConfigService();
  const port = configService.get<number>('CORE_CRON_PORT');

  if (!port) {
    throw new Error('Contentful port missing');
  }

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CoreCronModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port }
  });

  await app.listen();
}

bootstrap();
