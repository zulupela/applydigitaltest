import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const datasource = (configService: ConfigService): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: parseInt(configService.get<string>('DATABASE_PORT')),
  database: configService.get<string>('DATABASE_NAME'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  migrations: [join(__dirname, '/../migrations/*.{ts,js}')],
  entities: [join(__dirname, '/../../../models/src/entities/**/*.entity.{ts,js}')]
});
