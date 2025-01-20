import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from '@app/database';
import { EnvironmentModule } from '@app/environment';
import { CoreCronController } from '@core-cron/controllers/core-cron.controller';
import { CoreCronService } from '@core-cron/services/core-cron.service';
import { Product } from '@entities/product.entity';

@Module({
  imports: [
    EnvironmentModule,
    DatabaseModule,
    HttpModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [CoreCronController],
  providers: [Logger, CoreCronService]
})
export class CoreCronModule {}
