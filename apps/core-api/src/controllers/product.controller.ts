import { UpdateResult } from 'typeorm';
import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { DeleteProductParamsDto, GetProductsQueryDto } from '@dtos/products.dto';
import { ProductService } from '@core-api/services/product.service';
import { Product } from '@entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public getProducts(@Query() query: GetProductsQueryDto): Promise<[Product[], number]> {
    return this.productService.getProducts(query);
  }

  @Delete(':id')
  public deleteProduct(@Param() params: DeleteProductParamsDto): Promise<UpdateResult> {
    return this.productService.deleteProduct(params);
  }
}
