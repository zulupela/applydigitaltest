import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DeletedProductsReport, NonDeletedProductsReport, ProductCategoryReport } from '@interfaces/report.interface';
import { GetNonDeletedProductsReportQueryDto } from '@dtos/report.dto';
import { ReportService } from '@core-api/services/report.service';
import { JwtGuard } from '@core-api/guards/jwt.guard';

@Controller('report')
@UseGuards(JwtGuard)
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
