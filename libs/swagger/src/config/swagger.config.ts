import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function useSwagger(app: INestApplication) {
  const config = new DocumentBuilder().setTitle('ApplyDigital Test').setVersion('1.0').addBearerAuth().build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, documentFactory);
}
