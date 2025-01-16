import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Module, Type } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmFactory } from '../factories/typeorm.factory';

export const databaseModuleImports: (Type<any> | DynamicModule)[] = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: typeOrmFactory
  })
];

@Module({
  imports: databaseModuleImports
})
export class DatabaseModule {}
