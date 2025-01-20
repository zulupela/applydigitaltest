import { Product } from '@entities/product.entity';

export interface DeletedProductsReport {
  totalProducts: number;
  totalDeletedProducts: number;
  percentageOfDeletedProducts: number;
  deletedProducts: Product[];
}

export interface NonDeletedProductsReport {
  totalProducts: number;
  totalNonDeletedProducts: number;
  percentageOfNonDeletedProducts: number;
  nonDeletedProducts: Product[];
}

export interface ProductCategoryReportItem {
  category: string;
  count: number;
}

export type ProductCategoryReport = ProductCategoryReportItem[];
