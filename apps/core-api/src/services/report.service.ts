import { Between, FindOptionsSelect, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Product } from '@entities/product.entity';
import { GetNonDeletedProductsReportQueryDto } from '@dtos/report.dto';
import {
  DeletedProductsReport,
  NonDeletedProductsReport,
  ProductCategoryReport,
  ProductCategoryReportItem
} from '@interfaces/report.interface';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

@Injectable()
export class ReportService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}

  public async getDeletedProductsReport(): Promise<DeletedProductsReport> {
    try {
      this.logger.log(`${this.getDeletedProductsReport.name}: started`);

      const products = await this.productRepository.find({ withDeleted: true });
      const deleted = products.filter((product) => product.deletedAt !== null);

      this.logger.log(
        `${this.getDeletedProductsReport.name}: deleted products report information successfully retrieved`
      );

      return {
        totalProducts: products.length,
        totalDeletedProducts: deleted.length,
        percentageOfDeletedProducts: deleted.length / products.length,
        deletedProducts: deleted
      };
    } catch (error) {
      this.logger.error(
        `${this.getDeletedProductsReport.name}: failed with ${JSON.stringify({ error: error.message })}`
      );
      throw new Error('Failed to retrieve deleted products report');
    }
  }

  public async getNonDeletedProductsReport(
    query: GetNonDeletedProductsReportQueryDto
  ): Promise<NonDeletedProductsReport> {
    try {
      this.logger.log(`${this.getNonDeletedProductsReport.name}: started`, { query });

      const { withPrice, startDate, endDate } = query;

      const whereConditions: FindOptionsWhere<Product> = {};

      if (startDate) {
        whereConditions.createdAt = MoreThanOrEqual(startDate);
      }

      if (endDate) {
        whereConditions.createdAt = whereConditions.createdAt ? Between(startDate, endDate) : LessThanOrEqual(endDate);
      }

      const keys = Object.values(this.productRepository.metadata.columns)
        .filter((column: ColumnMetadata) => {
          return withPrice || column.propertyName !== 'price';
        })
        .map((column) => column.propertyName) as unknown as FindOptionsSelect<Product>;

      const products = await this.productRepository.find({
        withDeleted: true,
        where: whereConditions,
        select: keys
      });

      const nonDeleted = products.filter((product) => product.deletedAt === null);

      this.logger.log(
        `${this.getNonDeletedProductsReport.name}: non-deleted products report information successfully retrieved`
      );

      return {
        totalProducts: products.length,
        totalNonDeletedProducts: nonDeleted.length,
        percentageOfNonDeletedProducts: nonDeleted.length / products.length,
        nonDeletedProducts: nonDeleted
      };
    } catch (error) {
      this.logger.error(
        `${this.getNonDeletedProductsReport.name}: failed with ${JSON.stringify({ error: error.message })}`
      );
      throw new Error('Failed to retrieve non-deleted products report');
    }
  }

  public async getProductCategoryReport(): Promise<ProductCategoryReport> {
    try {
      this.logger.log(`${this.getProductCategoryReport.name}: started`);

      const productsGroupedByCategory = await this.productRepository
        .createQueryBuilder('product')
        .select('product.category, COUNT(product.id)')
        .groupBy('product.category')
        .getRawMany<ProductCategoryReportItem>();

      this.logger.log(
        `${this.getProductCategoryReport.name}: product category report information successfully retrieved`
      );

      return productsGroupedByCategory;
    } catch (error) {
      this.logger.error(
        `${this.getProductCategoryReport.name}: failed with ${JSON.stringify({ error: error.message })}`
      );
      throw new Error('Failed to retrieve product category report');
    }
  }
}
