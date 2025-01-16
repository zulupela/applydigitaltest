import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CoreCronModule } from './core-cron.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreCronModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('CORE_CRON_PORT');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port,
      host: 'localhost'
    }
  });

  await app.startAllMicroservices();
}

bootstrap();
