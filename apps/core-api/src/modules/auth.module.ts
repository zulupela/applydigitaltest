import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '@core-api/services/auth.service';
import { AuthController } from '@core-api/controllers/auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_JWT_SECRET'),
        signOptions: { expiresIn: '1h' }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [Logger, ConfigService, AuthService],
  exports: [AuthService]
})
export class AuthModule {}
