import { Repository } from 'typeorm';

export const createRespositoryMock = <T>(overrides?: Partial<Repository<T>>): Repository<T> => {
  return {
    save: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findAndCount: jest.fn(),
    softDelete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockReturnThis()
    })),
    ...overrides
  } as unknown as Repository<T>;
};
