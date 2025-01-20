import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from '@core-api/services/report.service';
import { GetNonDeletedProductsReportQueryDto } from '@dtos/report.dto';
import { DeletedProductsReport, NonDeletedProductsReport, ProductCategoryReport } from '@interfaces/report.interface';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('deleted-products')
  public getDeletedProductsReport(): Promise<DeletedProductsReport> {
    return this.reportService.getDeletedProductsReport();
  }

  @Get('non-deleted-products')
  public getNonDeletedProductsReport(
    @Query() query: GetNonDeletedProductsReportQueryDto
  ): Promise<NonDeletedProductsReport> {
    return this.reportService.getNonDeletedProductsReport(query);
  }

  @Get('product-category')
  public getProductCategoryReport(): Promise<ProductCategoryReport> {
    return this.reportService.getProductCategoryReport();
  }
}
