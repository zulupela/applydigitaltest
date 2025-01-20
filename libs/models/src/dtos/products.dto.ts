import { Product } from '@entities/product.entity';
import { QueryDto } from './query.dto';
import { IsNotEmpty } from 'class-validator';

export class GetProductsQueryDto extends QueryDto<Product> {}

export class DeleteProductParamsDto {
  @IsNotEmpty()
  id: string;
}
