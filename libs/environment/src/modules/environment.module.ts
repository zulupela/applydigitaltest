import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { environmentSchema } from '../schemas/environment.schema';

const configModuleOptions: ConfigModuleOptions = {
  validationSchema: environmentSchema,
  envFilePath: ['.env']
};

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions)],
  exports: [ConfigModule]
})
export class EnvironmentModule {}
