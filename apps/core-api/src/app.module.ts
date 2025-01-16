import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from '@app/environment';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EnvironmentModule,
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
