import { ExecutionContext } from '@nestjs/common';

export const createExecutionContextMock = (authHeader: string | null): ExecutionContext => {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        headers: authHeader ? { authorization: authHeader } : {}
      })
    })
  } as unknown as ExecutionContext;
};
