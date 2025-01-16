import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { datasource } from './typeorm.datasource';

ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true });
const configService = new ConfigService();

export default new DataSource(datasource(configService));
