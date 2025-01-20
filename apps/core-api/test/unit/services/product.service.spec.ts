import { Repository, UpdateResult } from 'typeorm';
import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createRespositoryMock, createServiceMock } from '@testing';
import { ProductService } from '@core-api/services/product.service';
import { Product } from '@entities/product.entity';
import { GetProductsQueryDto } from '@dtos/products.dto';

describe('ProductService', () => {
  let service: ProductService;
  let productRepositoryMock: jest.Mocked<Repository<Product>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: Logger,
          useValue: createServiceMock(Logger)
        },
        {
          provide: getRepositoryToken(Product),
          useValue: createRespositoryMock<Product>()
        }
      ]
    }).compile();

    service = module.get(ProductService);
    productRepositoryMock = module.get(getRepositoryToken(Product));
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
          deletedAt: undefined
        }
      ];

      productRepositoryMock.findAndCount.mockResolvedValueOnce([products, products.length]);

      const query = new GetProductsQueryDto();

      const result = await service.getProducts(query);

      expect(result).toMatchObject([products, products.length]);
      expect(productRepositoryMock.findAndCount).toHaveBeenCalledWith({
        where: { ...query.filter },
        skip: query.pagination.offset,
        take: query.pagination.limit,
        order: query.sort
      });
    });

    it('should handle the errors', async () => {
      productRepositoryMock.findAndCount.mockImplementationOnce(() => {
        throw new Error('test');
      });

      const query = new GetProductsQueryDto();

      await expect(service.getProducts(query)).rejects.toThrow('Failed to retrieve products');
    });
  });

  describe('deleteProduct', () => {
    it('should delete product', async () => {
      productRepositoryMock.softDelete.mockResolvedValueOnce({ affected: 1 } as UpdateResult);
      const result = await service.deleteProduct({ id: 'test' });

      expect(result).toMatchObject({ affected: 1 });
      expect(productRepositoryMock.softDelete).toHaveBeenCalledWith({ id: 'test' });
    });

    it('should handle the errors', async () => {
      productRepositoryMock.softDelete.mockImplementationOnce(() => {
        throw new Error('test');
      });

      await expect(service.deleteProduct({ id: 'test' })).rejects.toThrow('Failed to delete product');
    });
  });
});
