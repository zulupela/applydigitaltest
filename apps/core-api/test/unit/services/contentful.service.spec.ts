import { of } from 'rxjs';
import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { createServiceMock, Mock } from '@testing';
import { ContentfulService } from '@core-api/services/contentful.service';
import { Product } from '@entities/product.entity';

describe('ContentfulService', () => {
  let service: ContentfulService;
  let clientProxyMock: Mock<ClientProxy>;

  beforeEach(async () => {
    clientProxyMock = {
      send: jest.fn()
    } as unknown as Mock<ClientProxy>;

    const module = await Test.createTestingModule({
      providers: [
        ContentfulService,
        {
          provide: Logger,
          useValue: createServiceMock(Logger)
        },
        {
          provide: 'CRON_CORE_SERVICE',
          useValue: clientProxyMock
        }
      ]
    }).compile();

    service = module.get(ContentfulService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getProducts', () => {
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
          deletedAt: null
        }
      ];

      clientProxyMock.send.mockReturnValueOnce(of(products));

      const result = await service.getContentfulProductsData();

      expect(result).toMatchObject(products);
      expect(clientProxyMock.send).toHaveBeenCalledWith({ cmd: 'getContentfulProductsData' }, {});
    });

    it('should handle the errors', async () => {
      clientProxyMock.send.mockImplementationOnce(() => {
        throw new Error('test');
      });

      await expect(service.getContentfulProductsData()).rejects.toThrow(
        'Failed to get contentful products information'
      );
    });
  });
});
