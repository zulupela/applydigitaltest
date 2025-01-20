import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Product } from '@entities/product.entity';
import { GetProductsQueryDto } from '@dtos/products.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  getProducts(query: GetProductsQueryDto): Promise<[Product[], number]> {
    const { sort, filter, pagination } = query;
    console.log('FILTER', { filter });
    return this.productRepository.findAndCount({
      where: { ...filter },
      skip: pagination.offset,
      take: pagination.limit,
      order: sort
    });
  }
}
