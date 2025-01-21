import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@core-api/modules/app.module';
import { useSwagger } from '@swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  useSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('CORE_API_PORT');

  await app.listen(port);
}

bootstrap();
