import { Test } from '@nestjs/testing';
import { createServiceMock } from '@testing';
import { ReportController } from '@core-api/controllers/report.controller';
import { ReportService } from '@core-api/services/report.service';
import { DeletedProductsReport, NonDeletedProductsReport, ProductCategoryReport } from '@interfaces/report.interface';
import { GetNonDeletedProductsReportQueryDto } from '@dtos/report.dto';
import { Logger } from '@nestjs/common';
import { AuthService } from '@core-api/services/auth.service';

describe('ReportController', () => {
  let controller: ReportController;
  let serviceMock: jest.Mocked<ReportService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [
        {
          provide: Logger,
          useValue: createServiceMock(Logger)
        },
        {
          provide: ReportService,
          useValue: createServiceMock(ReportService)
        },
        {
          provide: AuthService,
          useValue: createServiceMock(AuthService)
        }
      ]
    }).compile();

    controller = module.get(ReportController);
    serviceMock = module.get(ReportService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getDeletedProductsReport', () => {
    it('should get deleted products report', async () => {
      const deletedProductsReport: DeletedProductsReport = {
        totalProducts: 1,
        totalDeletedProducts: 0,
        percentageOfDeletedProducts: 0,
        deletedProducts: [
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
        ]
      };

      serviceMock.getDeletedProductsReport.mockResolvedValue(deletedProductsReport);

      const result = await controller.getDeletedProductsReport();

      expect(result).toMatchObject(deletedProductsReport);
      expect(serviceMock.getDeletedProductsReport).toHaveBeenCalledTimes(1);
    });
  });

  describe('getNonDeletedProductsReport', () => {
    it('should get non-deleted products report', async () => {
      const nonDeletedProductsReport: NonDeletedProductsReport = {
        totalProducts: 1,
        totalNonDeletedProducts: 1,
        percentageOfNonDeletedProducts: 1,
        nonDeletedProducts: [
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
        ]
      };

      serviceMock.getNonDeletedProductsReport.mockResolvedValue(nonDeletedProductsReport);

      const query = new GetNonDeletedProductsReportQueryDto();

      const result = await controller.getNonDeletedProductsReport(query);

      expect(result).toMatchObject(nonDeletedProductsReport);
      expect(serviceMock.getNonDeletedProductsReport).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProductCategoryReport', () => {
    it('should get product category report', async () => {
      const productCategoryReport: ProductCategoryReport = [
        {
          category: 'test',
          count: 1
        }
      ];

      serviceMock.getProductCategoryReport.mockResolvedValue(productCategoryReport);

      const result = await controller.getProductCategoryReport();

      expect(result).toMatchObject(productCategoryReport);
      expect(serviceMock.getProductCategoryReport).toHaveBeenCalledTimes(1);
    });
  });
});
