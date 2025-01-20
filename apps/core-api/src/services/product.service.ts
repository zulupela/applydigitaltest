import { Equal, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Product } from '@entities/product.entity';
import { DeleteProductParamsDto, GetProductsQueryDto } from '@dtos/products.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  public getProducts(query: GetProductsQueryDto): Promise<[Product[], number]> {
    const { sort, filter, pagination } = query;
    return this.productRepository.findAndCount({
      where: { ...filter },
      skip: pagination.offset,
      take: pagination.limit,
      order: sort
    });
  }

  public deleteProduct(params: DeleteProductParamsDto): Promise<UpdateResult> {
    const { id } = params;
    return this.productRepository.softDelete({ id, deletedAt: Equal(null) });
  }
}
