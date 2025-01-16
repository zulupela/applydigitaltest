import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { datasource } from '../datasources/typeorm.datasource';

export const typeOrmFactory = (configService: ConfigService): TypeOrmModuleOptions => ({
  ...datasource(configService),
  autoLoadEntities: true,
  migrationsRun: configService.get<boolean>('DATABASE_MIGRATIONS_RUN')
});
