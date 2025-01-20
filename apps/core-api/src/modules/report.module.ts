import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from '@core-api/controllers/report.controller';
import { ReportService } from '@core-api/services/report.service';
import { AuthModule } from '@core-api/modules/auth.module';
import { Product } from '@entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ReportController],
  providers: [Logger, ReportService]
})
export class ReportModule {}
