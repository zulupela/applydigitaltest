import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';

export class GetNonDeletedProductsReportQueryDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  withPrice: boolean = false;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate: Date;
}
