import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createRespositoryMock, createServiceMock, Mock } from '@testing';
import { Between, EntityMetadata, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { DeletedProductsReport, NonDeletedProductsReport, ProductCategoryReport } from '@interfaces/report.interface';
import { ReportService } from '@core-api/services/report.service';
import { GetNonDeletedProductsReportQueryDto } from '@dtos/report.dto';
import { Product } from '@entities/product.entity';

describe('ReportService', () => {
  let service: ReportService;
  let productRepositoryMock: Mock<Repository<Product>>;

  const columnSelectFields: (keyof Product)[] = ['name', 'price'];

  beforeEach(async () => {
    const metadata = {
      columns: columnSelectFields.map((field) => ({ propertyName: field }))
    } as EntityMetadata;

    const module = await Test.createTestingModule({
      providers: [
        ReportService,
        {
          provide: Logger,
          useValue: createServiceMock(Logger)
        },
        {
          provide: getRepositoryToken(Product),
          useValue: createRespositoryMock<Product>({ metadata })
        }
      ]
    }).compile();

    service = module.get(ReportService);
    productRepositoryMock = module.get(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getDeletedProductsReport', () => {
    it('should get deleted products report', async () => {
      const nonDeletedProducts: Product[] = [
        {
          id: 'idTest',
          sku: 'skuTest',
          name: 'nameTest',
          brand: 'brandTest',
          model: 'modelTest',
          category: 'categoryTest',
          color: 'colorTest',
          price: 1.11,
          currency: 'currencyTest',
          stock: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }
      ];

      const deletedProducts: Product[] = [
        {
          id: 'idTest2',
          sku: 'skuTest2',
          name: 'nameTest2',
          brand: 'brandTest2',
          model: 'modelTest2',
          category: 'categoryTest2',
          color: 'colorTest2',
          price: 2.22,
          currency: 'currencyTest2',
          stock: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: new Date()
        }
      ];

      const products = [...nonDeletedProducts, ...deletedProducts];

      const deletedProductsReport: DeletedProductsReport = {
        totalProducts: products.length,
        totalDeletedProducts: deletedProducts.length,
        percentageOfDeletedProducts: deletedProducts.length / products.length,
        deletedProducts
      };

      productRepositoryMock.find.mockResolvedValueOnce(products);

      const result = await service.getDeletedProductsReport();

      expect(result).toMatchObject(deletedProductsReport);
      expect(productRepositoryMock.find).toHaveBeenCalledWith({ withDeleted: true });
    });

    it('should handle the errors', async () => {
      productRepositoryMock.find.mockImplementationOnce(() => {
        throw new Error('test');
      });

      await expect(service.getDeletedProductsReport()).rejects.toThrow('Failed to retrieve deleted products report');
    });
  });

  describe('getNonDeletedProductsReport', () => {
    const nonDeletedProducts: Product[] = [
      {
        id: 'idTest',
        sku: 'skuTest',
        name: 'nameTest',
        brand: 'brandTest',
        model: 'modelTest',
        category: 'categoryTest',
        color: 'colorTest',
        price: 1.11,
        currency: 'currencyTest',
        stock: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }
    ];

    const deletedProducts: Product[] = [
      {
        id: 'idTest2',
        sku: 'skuTest2',
        name: 'nameTest2',
        brand: 'brandTest2',
        model: 'modelTest2',
        category: 'categoryTest2',
        color: 'colorTest2',
        price: 2.22,
        currency: 'currencyTest2',
        stock: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      }
    ];

    const products = [...nonDeletedProducts, ...deletedProducts];

    const nonDeletedProductsReport: NonDeletedProductsReport = {
      totalProducts: products.length,
      totalNonDeletedProducts: nonDeletedProducts.length,
      percentageOfNonDeletedProducts: nonDeletedProducts.length / products.length,
      nonDeletedProducts
    };

    it('should get non-deleted products report with default query values', async () => {
      productRepositoryMock.find.mockResolvedValueOnce(products);

      const query = new GetNonDeletedProductsReportQueryDto();

      const result = await service.getNonDeletedProductsReport(query);

      expect(result).toMatchObject(nonDeletedProductsReport);
      expect(productRepositoryMock.find).toHaveBeenCalledWith({
        where: {},
        select: columnSelectFields,
        withDeleted: true
      });
    });

    it('should get non-deleted products report with start and end dates', async () => {
      productRepositoryMock.find.mockResolvedValueOnce(products);

      const query = new GetNonDeletedProductsReportQueryDto();
      query.startDate = new Date();
      query.endDate = new Date();

      const result = await service.getNonDeletedProductsReport(query);

      expect(result).toMatchObject(nonDeletedProductsReport);
      expect(productRepositoryMock.find).toHaveBeenCalledWith({
        where: { createdAt: Between(query.startDate, query.endDate) },
        select: columnSelectFields,
        withDeleted: true
      });
    });

    it('should get non-deleted products report with only start date', async () => {
      productRepositoryMock.find.mockResolvedValueOnce(products);

      const query = new GetNonDeletedProductsReportQueryDto();
      query.startDate = new Date();

      const result = await service.getNonDeletedProductsReport(query);

      expect(result).toMatchObject(nonDeletedProductsReport);
      expect(productRepositoryMock.find).toHaveBeenCalledWith({
        where: { createdAt: MoreThanOrEqual(query.startDate) },
        select: columnSelectFields,
        withDeleted: true
      });
    });

    it('should get non-deleted products report with only end date', async () => {
      productRepositoryMock.find.mockResolvedValueOnce(products);

      const query = new GetNonDeletedProductsReportQueryDto();
      query.endDate = new Date();

      const result = await service.getNonDeletedProductsReport(query);

      expect(result).toMatchObject(nonDeletedProductsReport);
      expect(productRepositoryMock.find).toHaveBeenCalledWith({
        where: { createdAt: LessThanOrEqual(query.endDate) },
        select: columnSelectFields,
        withDeleted: true
      });
    });

    it('should get non-deleted products report without prices', async () => {
      productRepositoryMock.find.mockResolvedValueOnce(products);

      const query = new GetNonDeletedProductsReportQueryDto();
      query.withPrice = false;

      const result = await service.getNonDeletedProductsReport(query);

      expect(result).toMatchObject(nonDeletedProductsReport);
      expect(productRepositoryMock.find).toHaveBeenCalledWith({
        where: {},
        select: columnSelectFields.filter((field) => field !== 'price'),
        withDeleted: true
      });
    });

    it('should handle the errors', async () => {
      productRepositoryMock.find.mockImplementationOnce(() => {
        throw new Error('test');
      });

      const query = new GetNonDeletedProductsReportQueryDto();

      await expect(service.getNonDeletedProductsReport(query)).rejects.toThrow(
        'Failed to retrieve non-deleted products report'
      );
    });
  });

  describe('getDeletedProductsReport', () => {
    it('should get deleted products report', async () => {
      const productCategoryReport: ProductCategoryReport = [
        {
          category: 'test',
          count: 1
        },
        {
          category: 'test2',
          count: 2
        }
      ];

      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(productCategoryReport)
      };

      productRepositoryMock.createQueryBuilder.mockReturnValueOnce(mockQueryBuilder);

      const result = await service.getProductCategoryReport();

      expect(result).toMatchObject(productCategoryReport);
      expect(productRepositoryMock.createQueryBuilder).toHaveBeenCalledWith('product');
    });

    it('should handle the errors', async () => {
      productRepositoryMock.createQueryBuilder.mockImplementationOnce(() => {
        throw new Error('test');
      });

      await expect(service.getProductCategoryReport()).rejects.toThrow('Failed to retrieve product category report');
    });
  });
});
