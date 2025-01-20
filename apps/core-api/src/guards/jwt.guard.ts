import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { AuthService } from '@core-api/services/auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log(`${this.canActivate.name}: jwt guard started`);

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      await this.authService.verifyToken(token);
      this.logger.log(`${this.canActivate.name}: jwt guard success`);
      return true;
    } catch (error) {
      this.logger.error(`${this.canActivate.name}: jwt guard failed`, { error });
      return false;
    }
  }
}
