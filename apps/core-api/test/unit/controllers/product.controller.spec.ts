import { Test } from '@nestjs/testing';
import { createServiceMock, Mock } from '@testing';
import { ProductController } from '@core-api/controllers/product.controller';
import { ProductService } from '@core-api/services/product.service';
import { GetProductsQueryDto } from '@dtos/products.dto';
import { Product } from '@entities/product.entity';

describe('ProductController', () => {
  let controller: ProductController;
  let serviceMock: Mock<ProductService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: createServiceMock(ProductService)
        }
      ]
    }).compile();

    controller = module.get(ProductController);
    serviceMock = module.get(ProductService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getProducts', () => {
    it('should get list of products', async () => {
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

      serviceMock.getProducts.mockResolvedValue([products, products.length]);

      const query = new GetProductsQueryDto();

      const result = await controller.getProducts(query);

      expect(result).toMatchObject([products, products.length]);
      expect(serviceMock.getProducts).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      serviceMock.deleteProduct.mockResolvedValue({ affected: 1 });

      const result = await controller.deleteProduct({ id: 'test' });

      expect(result).toMatchObject({ affected: 1 });
      expect(serviceMock.deleteProduct).toHaveBeenCalledTimes(1);
    });
  });
});
