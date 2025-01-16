import { Module } from '@nestjs/common';
import { CoreCronController } from './core-cron.controller';
import { CoreCronService } from './core-cron.service';
import { EnvironmentModule } from '@app/environment';

@Module({
  imports: [EnvironmentModule],
  controllers: [CoreCronController],
  providers: [CoreCronService]
})
export class CoreCronModule {}
