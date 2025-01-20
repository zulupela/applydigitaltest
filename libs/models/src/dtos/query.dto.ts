import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max, Min, ValidateNested } from 'class-validator';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

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
