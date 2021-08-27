const { pathsToModuleNameMapper } = require('ts-jest/utils');

const {
  compilerOptions: { paths: tsconfigPaths },
} = require('./tsconfig');

module.exports = {
  roots: ['<rootDir>/src/'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfigPaths, { prefix: '<rootDir>/src' }),
  },
  testRegex: '\\.(test|spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: ['/tests-related/', '.dto\\.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
