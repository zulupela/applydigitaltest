import { Product } from '@entities/product.entity';
import { QueryDto } from './query.dto';

export class GetProductsQueryDto extends QueryDto<Product> {}
