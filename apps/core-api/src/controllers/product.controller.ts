import { UpdateResult } from 'typeorm';
import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { DeleteProductParamsDto, GetProductsQueryDto } from '@dtos/products.dto';
import { ProductService } from '@core-api/services/product.service';
import { Product } from '@entities/product.entity';
import { ApiOperation } from '@nestjs/swagger';
import { ApiDynamicFilterSortAndPagination } from '@swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list of products',
    description: 'Get list of currently active products. Allows for paginating, sorting, and filtering.',
    responses: { 200: { description: 'Array of updated products' } }
  })
  @ApiDynamicFilterSortAndPagination<Product>('brand')
  public getProducts(@Query() query: GetProductsQueryDto): Promise<[Product[], number]> {
    return this.productService.getProducts(query);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete specific product',
    description: 'Delete product with the provided id',
    responses: { 200: { description: 'Delete results' } }
  })
  public deleteProduct(@Param() params: DeleteProductParamsDto): Promise<UpdateResult> {
    return this.productService.deleteProduct(params);
  }
}
