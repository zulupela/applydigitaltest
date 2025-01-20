import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EnvironmentModule } from '@app/environment';
import { DatabaseModule } from '@app/database';
import { ContentfulModule } from '@core-api/modules/contentful.module';
import { ProductModule } from '@core-api/modules/product.module';
import { ParseFilterMiddleware } from '@core-api/middlewares/parse-filters.middleware';

@Module({
  imports: [EnvironmentModule, DatabaseModule, ContentfulModule, ProductModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ParseFilterMiddleware).forRoutes('*');
  }
}
