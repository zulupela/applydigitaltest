import { Type } from 'class-transformer';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { IsInt, IsOptional, IsPositive, Max, Min, ValidateNested } from 'class-validator';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset = 0;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Max(100)
  @Min(1)
  limit = 5;
}

export class QueryDto<T> {
  @ValidateNested()
  @Type(() => PaginationDto)
  @IsOptional()
  pagination? = new PaginationDto();

  @IsOptional()
  @Type(() => Object)
  sort?: FindOptionsOrder<T> = {};

  @IsOptional()
  @Type(() => Object)
  filter?: FindOptionsWhere<T> | FindOptionsWhere<T>[] = {};
}
