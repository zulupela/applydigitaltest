import { Repository, UpdateResult } from 'typeorm';
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

  public async getProducts(query: GetProductsQueryDto): Promise<[Product[], number]> {
    try {
      this.logger.log(`${this.getProducts.name}: started`, { query });

      const { sort, filter, pagination } = query;
      const result = await this.productRepository.findAndCount({
        where: { ...filter },
        skip: pagination.offset,
        take: pagination.limit,
        order: sort
      });

      this.logger.log(`${this.getProducts.name}: products information successfully retrieved`, { length: result[1] });

      return result;
    } catch (error) {
      this.logger.error(`${this.getProducts.name}: failed`, { error });
      throw new Error('Failed to retrieve products');
    }
  }

  public async deleteProduct(params: DeleteProductParamsDto): Promise<UpdateResult> {
    try {
      this.logger.log(`${this.deleteProduct.name}: started`, { params });

      const { id } = params;
      const result = await this.productRepository.softDelete({ id });

      this.logger.log(`${this.deleteProduct.name}: product successfully deleted`, {
        affected: result.affected
      });

      return result;
    } catch (error) {
      this.logger.error(`${this.deleteProduct.name}: failed`, { error });
      throw new Error('Failed to delete product');
    }
  }
}
