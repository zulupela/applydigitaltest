import { Test } from '@nestjs/testing';
import { createServiceMock, Mock } from '@testing';
import { CoreCronController } from '@core-cron/controllers/core-cron.controller';
import { CoreCronService } from '@core-cron/services/core-cron.service';
import { Product } from '@entities/product.entity';

describe('CoreCronController', () => {
  let controller: CoreCronController;
  let serviceMock: Mock<CoreCronService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CoreCronController],
      providers: [
        {
          provide: CoreCronService,
          useValue: createServiceMock(CoreCronService)
        }
      ]
    }).compile();

    controller = module.get(CoreCronController);
    serviceMock = module.get(CoreCronService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getContentfulProductsData', () => {
    it('should get list of updated products', async () => {
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
          deletedAt: undefined
        }
      ];

      serviceMock.getContentfulProductsData.mockResolvedValue(products);

      const result = await controller.getContentfulProductsData();

      expect(result).toMatchObject(products);
      expect(serviceMock.getContentfulProductsData).toHaveBeenCalledTimes(1);
    });
  });
});
