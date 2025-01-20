import { ProductService } from '@core-api/services/product.service';
import { GetProductsQueryDto } from '@dtos/products.dto';
import { Product } from '@entities/product.entity';
import { Controller, Get, Logger, Query } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(
    private readonly logger: Logger,
    private readonly productService: ProductService
  ) {}

  @Get()
  public getProducts(@Query() query: GetProductsQueryDto): Promise<[Product[], number]> {
    return this.productService.getProducts(query);
  }
}
