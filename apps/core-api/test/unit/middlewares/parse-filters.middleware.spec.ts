import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response, NextFunction } from 'express';
import { setFilters } from '@core-api/utils/set-filters.util';
import { ParseFilterMiddleware } from '@core-api/middlewares/parse-filters.middleware';

jest.mock('@core-api/utils/set-filters.util');

describe('ParseFilterMiddleware', () => {
  let middleware: ParseFilterMiddleware;
  let mockRequest: Request;
  let mockResponse: Response;
  let mockNextFunction: NextFunction;

  beforeEach(async () => {
    mockRequest = {
      query: {
        filter: { name: { eq: 'John' }, age: { gt: 30 } }
      }
    } as unknown as Request;

    mockResponse = {} as unknown as Response;

    mockNextFunction = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [ParseFilterMiddleware]
    }).compile();

    middleware = module.get<ParseFilterMiddleware>(ParseFilterMiddleware);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should call setFilters with correct parameters', () => {
    middleware.use(mockRequest, mockResponse, mockNextFunction);
    expect(setFilters).toHaveBeenCalledWith(mockRequest.query?.filter, 10);
  });

  it('should call next function', () => {
    middleware.use(mockRequest, mockResponse, mockNextFunction);
    expect(mockNextFunction).toHaveBeenCalled();
  });

  it('should handle missing filter query parameter gracefully', () => {
    middleware.use({} as Request, mockResponse, mockNextFunction);
    expect(setFilters).toHaveBeenCalledWith(undefined, 10);
    expect(mockNextFunction).toHaveBeenCalled();
  });
});
