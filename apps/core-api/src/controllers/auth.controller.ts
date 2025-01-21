import { Controller, Get } from '@nestjs/common';
import { AuthService } from '@core-api/services/auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({
    summary: 'Get authentication token',
    description: 'Get a token with 1 hour expiration time, no payload is required'
  })
  public getToken(): Promise<string> {
    return this.authService.getToken();
  }
}
