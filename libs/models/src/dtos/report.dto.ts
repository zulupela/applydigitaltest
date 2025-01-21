import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional } from 'class-validator';

export class GetNonDeletedProductsReportQueryDto {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @ApiProperty({ description: 'Sets if the product price should be included in the report.', example: true })
  withPrice: boolean = false;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: 'Defines a start date to retrieve all items that were created after that date.',
    example: '2025-01-01'
  })
  startDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: 'Defines an end date to retrieve all items that were created before that date.',
    example: '2025-01-30'
  })
  endDate: Date;
}
