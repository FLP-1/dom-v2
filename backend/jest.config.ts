import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(test|spec).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts)$': ['ts-jest', { isolatedModules: true }],
  },
  transformIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  verbose: false,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/**/*.d.ts'
  ],
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: { branches: 85, functions: 85, lines: 85, statements: 85 },
  },
};

export default config;


