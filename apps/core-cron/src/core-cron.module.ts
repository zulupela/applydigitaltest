import { Module } from '@nestjs/common';
import { CoreCronController } from './core-cron.controller';
import { CoreCronService } from './core-cron.service';
import { EnvironmentModule } from '@app/environment';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [EnvironmentModule, HttpModule],
  controllers: [CoreCronController],
  providers: [CoreCronService]
})
export class CoreCronModule {}
