import { of } from 'rxjs';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createRespositoryMock, createServiceMock, Mock } from '@testing';
import { CoreCronService } from '@core-cron/services/core-cron.service';
import { Product } from '@entities/product.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

jest.mock('@nestjs/schedule', () => {
  const originalConfigModule = jest.requireActual('@nestjs/schedule');
  return { ...originalConfigModule, Cron: jest.fn(() => jest.fn) };
});

describe('CoreCronService', () => {
  let service: CoreCronService;
  let httpServiceMock: Mock<HttpService>;
  let configServiceMock: Mock<ConfigService>;
  let productRepositoryMock: Mock<Repository<Product>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CoreCronService,
        {
          provide: Logger,
          useValue: createServiceMock(Logger)
        },
        {
          provide: HttpService,
          useValue: createServiceMock(HttpService)
        },
        {
          provide: ConfigService,
          useValue: createServiceMock(ConfigService)
        },
        {
          provide: getRepositoryToken(Product),
          useValue: createRespositoryMock<Product>()
        }
      ]
    }).compile();

    service = module.get(CoreCronService);
    httpServiceMock = module.get(HttpService);
    configServiceMock = module.get(ConfigService);
    productRepositoryMock = module.get(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getContentfulProductsData', () => {
    it('should get list of updated products', async () => {
      const mockContentfulProducts = [
        {
          sys: {
            id: 'idTest'
          },
          fields: {
            sku: 'skuTest',
            name: 'nameTest',
            brand: 'brandTest',
            model: 'modelTest',
            category: 'categoryTest',
            color: 'colorTest',
            price: 1.11,
            currency: 'currencyTest',
            stock: 1
          }
        }
      ];

      const mockContentfulResponse = {
        data: {
          items: mockContentfulProducts
        }
      };

      const mockFormatedContentfulProducts = mockContentfulProducts.map((product) => ({
        id: product.sys.id,
        ...product.fields
      }));

      const mockProducts = mockFormatedContentfulProducts.map((product) => ({
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      }));

      const spaceIdTest = 'spaceIdTest';
      const environmentTest = 'environmentTest';
      const accessTokenTest = 'accessTokenTest';
      const contentTypeTest = 'contentTypeTest';

      configServiceMock.get.mockReturnValueOnce(spaceIdTest);
      configServiceMock.get.mockReturnValueOnce(environmentTest);
      configServiceMock.get.mockReturnValueOnce(accessTokenTest);
      configServiceMock.get.mockReturnValueOnce(contentTypeTest);

      httpServiceMock.get.mockReturnValueOnce(of(mockContentfulResponse));

      productRepositoryMock.create.mockReturnValueOnce(mockProducts);
      productRepositoryMock.save.mockResolvedValueOnce(mockProducts);

      const result = await service.getContentfulProductsData();

      expect(result).toMatchObject(mockProducts);
      expect(configServiceMock.get).toHaveBeenCalledTimes(4);
      expect(configServiceMock.get).toHaveBeenNthCalledWith(1, 'CONTENTFUL_SPACE_ID');
      expect(configServiceMock.get).toHaveBeenNthCalledWith(2, 'CONTENTFUL_ENVIRONMENT');
      expect(configServiceMock.get).toHaveBeenNthCalledWith(3, 'CONTENTFUL_ACCESS_TOKEN');
      expect(configServiceMock.get).toHaveBeenNthCalledWith(4, 'CONTENTFUL_CONTENT_TYPE');
      expect(httpServiceMock.get).toHaveBeenCalledWith(
        expect.stringContaining(`/spaces/${spaceIdTest}/environments/${environmentTest}`),
        { params: { access_token: accessTokenTest, content_type: contentTypeTest } }
      );
      expect(productRepositoryMock.create).toHaveBeenCalledWith(mockFormatedContentfulProducts);
      expect(productRepositoryMock.save).toHaveBeenCalledWith(mockProducts);
    });

    it('should handle the errors', async () => {
      configServiceMock.get.mockImplementationOnce(() => {
        throw new Error('test');
      });

      await expect(service.getContentfulProductsData()).rejects.toThrow('Failed to get products data');
    });

    it('should have @Cron decorator with correct expression', () => {
      expect(Cron).toHaveBeenCalledWith(CronExpression.EVERY_HOUR);
    });
  });
});
