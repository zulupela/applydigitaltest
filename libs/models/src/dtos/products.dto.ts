import { Product } from '@entities/product.entity';
import { QueryDto } from './query.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetProductsQueryDto extends QueryDto<Product> {}

export class DeleteProductParamsDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Product identifier' })
  id: string;
}
