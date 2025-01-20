import { Controller, Get } from '@nestjs/common';
import { AuthService } from '@core-api/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  public getToken(): Promise<string> {
    return this.authService.getToken();
  }
}
