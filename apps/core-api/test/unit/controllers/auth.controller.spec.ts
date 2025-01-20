import { Test } from '@nestjs/testing';
import { createServiceMock } from '@testing';
import { AuthService } from '@core-api/services/auth.service';
import { AuthController } from '@core-api/controllers/auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let serviceMock: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: createServiceMock(AuthService)
        }
      ]
    }).compile();

    controller = module.get(AuthController);
    serviceMock = module.get(AuthService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getToken', () => {
    it('should get authorization token', async () => {
      serviceMock.getToken.mockResolvedValueOnce('token');

      const result = await controller.getToken();

      expect(result).toBe('token');
      expect(serviceMock.getToken).toHaveBeenCalledTimes(1);
    });
  });
});
