import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from '@core-api/controllers/report.controller';
import { ReportService } from '@core-api/services/report.service';
import { Product } from '@entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ReportController],
  providers: [Logger, ReportService]
})
export class ReportModule {}
