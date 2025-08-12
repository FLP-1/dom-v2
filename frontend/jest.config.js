/**
 * @fileoverview Configuração Jest para testes
 * @version 2.0.0
 * @generated 2025-01-27T11:45:00.000Z
 */

module.exports = {
  // Ambiente de teste
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Module name mapping para path aliases
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
  },
  
  // Extensões de arquivo
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Transformações
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // Padrões de teste
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}',
  ],
  
  // Arquivos a ignorar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/dist/',
  ],
  
  // Coleta de cobertura
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/setupTests.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
    '!src/**/*.mock.{ts,tsx}',
  ],
  
  // Thresholds de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    // Thresholds específicos para componentes base
    'src/components/base/**/*.{ts,tsx}': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  
  // Relatórios de cobertura
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'json',
  ],
  
  // Diretório de output da cobertura
  coverageDirectory: 'coverage',
  
  // Timeout para testes
  testTimeout: 10000,
  
  // Configurações de performance
  maxWorkers: '50%',
  
  // Verbose output
  verbose: true,
  
  // Configurações específicas por tipo de teste
  projects: [
    // Testes unitários
    {
      displayName: 'unit',
      testMatch: [
        '<rootDir>/src/**/*.test.{ts,tsx}',
      ],
      testEnvironment: 'jsdom',
    },
    
    // Testes de integração
    {
      displayName: 'integration',
      testMatch: [
        '<rootDir>/src/**/*.integration.test.{ts,tsx}',
      ],
      testEnvironment: 'jsdom',
    },
    
    // Testes de acessibilidade
    {
      displayName: 'accessibility',
      testMatch: [
        '<rootDir>/src/**/*.a11y.test.{ts,tsx}',
      ],
      testEnvironment: 'jsdom',
    },
    
    // Testes visuais
    {
      displayName: 'visual',
      testMatch: [
        '<rootDir>/src/**/*.visual.test.{ts,tsx}',
      ],
      testEnvironment: 'jsdom',
    },
  ],
  
  // Configurações de snapshot
  snapshotSerializers: [],
  
  // Ignorar warnings específicos
  filterConsole: (log) => {
    // Filtrar warnings conhecidos e não críticos
    return !log.includes('Warning: ReactDOM.render is deprecated');
  },
  
  // Cache
  cache: true,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  
  // Configurações de mock
  clearMocks: true,
  resetMocks: false,
  restoreMocks: true,
  
  // Configurações globais
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
