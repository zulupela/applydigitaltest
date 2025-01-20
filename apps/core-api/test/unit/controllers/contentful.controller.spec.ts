import { Test } from '@nestjs/testing';
import { createServiceMock } from '@testing';
import { Product } from '@entities/product.entity';
import { ContentfulController } from '@core-api/controllers/contentful.controller';
import { ContentfulService } from '@core-api/services/contentful.service';

describe('ContentfulController', () => {
  let controller: ContentfulController;
  let serviceMock: jest.Mocked<ContentfulService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ContentfulController],
      providers: [
        {
          provide: ContentfulService,
          useValue: createServiceMock(ContentfulService)
        }
      ]
    }).compile();

    controller = module.get(ContentfulController);
    serviceMock = module.get(ContentfulService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getProducts', () => {
    it('should get list of contentful products', async () => {
      const products: Product[] = [
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

      serviceMock.getContentfulProductsData.mockResolvedValue(products);

      const result = await controller.getContentfulProductsData();

      expect(result).toMatchObject(products);
      expect(serviceMock.getContentfulProductsData).toHaveBeenCalledTimes(1);
    });
  });
});
