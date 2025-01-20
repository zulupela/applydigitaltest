import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ContentfulController } from '@core-api/controllers/contentful.controller';
import { ContentfulService } from '@core-api/services/contentful.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'CRON_CORE_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: configService.get<number>('CORE_CRON_PORT')
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [ContentfulController],
  providers: [Logger, ContentfulService]
})
export class ContentfulModule {}
