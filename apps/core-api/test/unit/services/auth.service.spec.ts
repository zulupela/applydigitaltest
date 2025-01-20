import { Test } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { createServiceMock } from '@testing';
import { AuthService } from '@core-api/services/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtServiceMock: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: Logger,
          useValue: createServiceMock(Logger)
        },
        {
          provide: JwtService,
          useValue: createServiceMock(JwtService)
        }
      ]
    }).compile();

    service = module.get(AuthService);
    jwtServiceMock = module.get(JwtService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getToken', () => {
    it('should get authorization token', async () => {
      jwtServiceMock.signAsync.mockResolvedValueOnce('token');
      const result = await service.getToken();

      expect(result).toBe('token');
      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({});
    });

    it('should handle the errors', async () => {
      jwtServiceMock.signAsync.mockImplementationOnce(() => {
        throw new Error('test');
      });

      await expect(service.getToken()).rejects.toThrow('Failed to get authorization token');
    });
  });

  describe('verifyToken', () => {
    it('should verify an authorization token', async () => {
      jwtServiceMock.verifyAsync.mockResolvedValueOnce({ success: true });
      const result = await service.verifyToken('token');

      expect(result).toMatchObject({ success: true });
      expect(jwtServiceMock.verifyAsync).toHaveBeenCalledWith('token');
    });

    it('should handle the errors', async () => {
      jwtServiceMock.verifyAsync.mockImplementationOnce(() => {
        throw new Error('test');
      });

      await expect(service.verifyToken('token')).rejects.toThrow('Failed to verify token');
    });
  });
});
