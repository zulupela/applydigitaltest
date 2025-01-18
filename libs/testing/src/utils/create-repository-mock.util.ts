import { Repository } from 'typeorm';

export const createRespositoryMock = <T>(): Repository<T> => {
  return {
    save: jest.fn(),
    create: jest.fn()
  } as unknown as Repository<T>;
};
