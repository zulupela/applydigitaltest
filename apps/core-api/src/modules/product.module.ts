import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '@core-api/controllers/product.controller';
import { ProductService } from '@core-api/services/product.service';
import { Product } from '@entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [Logger, ProductService]
})
export class ProductModule {}
