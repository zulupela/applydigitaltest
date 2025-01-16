import { Module } from '@nestjs/common';
import { CoreCronController } from './core-cron.controller';
import { CoreCronService } from './core-cron.service';

@Module({
  imports: [],
  controllers: [CoreCronController],
  providers: [CoreCronService]
})
export class CoreCronModule {}
