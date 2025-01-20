import { NestFactory } from '@nestjs/core';
import { CoreCronModule } from './core-cron.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreCronModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
