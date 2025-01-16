import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EnvironmentModule } from '@app/environment';
import { DatabaseModule } from '@app/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    EnvironmentModule,
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'CRON_CORE_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('CORE_CRON_PORT'),
            host: 'localhost'
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
