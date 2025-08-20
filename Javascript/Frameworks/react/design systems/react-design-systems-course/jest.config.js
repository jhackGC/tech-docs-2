/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@course/ui$': '<rootDir>/packages/ui/src',
    '^@course/ui/(.*)$': '<rootDir>/packages/ui/src/$1',
  },
  testMatch: [
    '<rootDir>/packages/*/src/**/*.test.{js,ts,tsx}',
  ],
  collectCoverageFrom: [
    'packages/*/src/**/*.{js,ts,tsx}',
    '!packages/*/src/**/*.stories.{js,ts,tsx}',
    '!packages/*/src/**/*.d.ts',
    '!packages/*/src/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/storybook-static/'],
};
