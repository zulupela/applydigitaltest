import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtGuard } from '@core-api/guards/jwt.guard';
import { AuthService } from '@core-api/services/auth.service';
import { createExecutionContextMock, createServiceMock } from '@testing';

describe('JwtGuard', () => {
  let guard: JwtGuard;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtGuard,
        {
          provide: Logger,
          useValue: createServiceMock(Logger)
        },
        {
          provide: AuthService,
          useValue: createServiceMock(AuthService)
        }
      ]
    }).compile();

    guard = module.get<JwtGuard>(JwtGuard);
    authServiceMock = module.get(AuthService);
  });

  it('should return false if no authorization header is present', async () => {
    const mockExecutionContext = createExecutionContextMock(null);

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(false);
  });

  it('should return false if the token is invalid', async () => {
    const mockExecutionContext = createExecutionContextMock('Bearer invalid-token');
    authServiceMock.verifyToken.mockRejectedValue(new Error('Invalid token'));

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(false);
  });

  it('should return true if the token is valid', async () => {
    const mockExecutionContext = createExecutionContextMock('Bearer valid-token');
    authServiceMock.verifyToken.mockResolvedValue(true);

    const result = await guard.canActivate(mockExecutionContext);

    expect(result).toBe(true);
  });
});
