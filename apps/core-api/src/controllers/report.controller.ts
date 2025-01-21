import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DeletedProductsReport, NonDeletedProductsReport, ProductCategoryReport } from '@interfaces/report.interface';
import { GetNonDeletedProductsReportQueryDto } from '@dtos/report.dto';
import { ReportService } from '@core-api/services/report.service';
import { JwtGuard } from '@core-api/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('report')
@UseGuards(JwtGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get('deleted-products')
  @ApiOperation({
    summary: 'Get deleted products report',
    description:
      'Get a report of deleted products, including the current deleted products and their proportion relative to the total list of products.',
    responses: { 200: { description: 'Deleted products report data object' } }
  })
  @ApiBearerAuth()
  public getDeletedProductsReport(): Promise<DeletedProductsReport> {
    return this.reportService.getDeletedProductsReport();
  }

  @Get('non-deleted-products')
  @ApiOperation({
    summary: 'Get non-deleted products report',
    description:
      'Get a report of non-deleted products, including the current active products and their proportion relative to the total list of products.',
    responses: { 200: { description: 'Non deleted products report data object' } }
  })
  @ApiBearerAuth()
  public getNonDeletedProductsReport(
    @Query() query: GetNonDeletedProductsReportQueryDto
  ): Promise<NonDeletedProductsReport> {
    return this.reportService.getNonDeletedProductsReport(query);
  }

  @Get('product-category')
  @ApiOperation({
    summary: 'Get product category report',
    description: 'Get a report of product categories, and the count of current products.',
    responses: { 200: { description: 'Product category report data object' } }
  })
  @ApiBearerAuth()
  public getProductCategoryReport(): Promise<ProductCategoryReport> {
    return this.reportService.getProductCategoryReport();
  }
}
