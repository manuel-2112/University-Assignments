module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  modulePaths: ['<rootDir>/src/'],
  testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
  },
};
