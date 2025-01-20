import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly jwtService: JwtService
  ) {}

  public async getToken(): Promise<string> {
    try {
      this.logger.log(`${this.getToken.name}: started`);

      const token = await this.jwtService.signAsync({});

      this.logger.log(`${this.getToken.name}: success`);

      return token;
    } catch (error) {
      this.logger.error(`${this.getToken.name}: failed`, { error });
      throw new Error('Failed to get authorization token');
    }
  }

  public async verifyToken(token: string): Promise<any> {
    try {
      this.logger.log(`${this.verifyToken.name}: started`);

      const result = await this.jwtService.verifyAsync(token);

      this.logger.log(`${this.verifyToken.name}: success`);

      return result;
    } catch (error) {
      this.logger.error(`${this.verifyToken.name}: failed`, { error });
      throw new Error('Failed to verify token');
    }
  }
}
