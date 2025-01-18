export const createServiceMock = <T>(type: { new (...args: any[]): T }): T => {
  const mock = {} as T;
  for (const key of Object.getOwnPropertyNames(type.prototype)) {
    mock[key] = jest.fn();
  }
  return mock;
};
