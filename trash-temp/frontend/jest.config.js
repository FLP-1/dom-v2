/**
 * @fileoverview Configuração do Jest para testes do frontend React Native DOM v2
 * @directory frontend
 * @description Define configurações de teste para React Native
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  // Configuração simples para React Native
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation)/)',
  ],
};
