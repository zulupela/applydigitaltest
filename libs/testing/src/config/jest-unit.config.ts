import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../../../../tsconfig.json';

const config: Config = {
  verbose: true,
  rootDir: '../../../../apps',
  passWithNoTests: true,
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.(t|j)s'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../'
  }),
  coveragePathIgnorePatterns: ['.*\\.module\\.ts$', 'main.ts$']
};

export default config;
