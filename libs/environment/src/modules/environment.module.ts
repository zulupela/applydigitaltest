import { DynamicModule, Module, Type } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { environmentSchema } from '../schemas/environment.schema';

const configModuleOptions: ConfigModuleOptions = {
  validationSchema: environmentSchema,
  envFilePath: ['.env']
};

export const environmentModuleImports: (Type<any> | DynamicModule | Promise<DynamicModule>)[] = [
  ConfigModule.forRoot(configModuleOptions)
];

export const environmentModuleExports: (Type<any> | DynamicModule)[] = [ConfigModule];

@Module({
  imports: environmentModuleImports,
  exports: environmentModuleExports
})
export class EnvironmentModule {}
