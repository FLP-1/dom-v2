/**
 * @fileoverview Setup de testes - Configuração global
 * @version 2.0.0
 * @generated 2025-01-27T11:45:00.000Z
 */

import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { configure } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

// Configurar Testing Library
configure({
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 5000,
});

// Estender Jest com jest-axe para testes de acessibilidade
expect.extend(toHaveNoViolations);

// Mock para React Native Web
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native-web');
  
  // Mock componentes específicos do React Native
  RN.Platform = {
    OS: 'web',
    select: (platforms: unknown) => platforms.web || platforms.default,
  };
  
  RN.Dimensions = {
    get: jest.fn(() => ({ width: 1024, height: 768 })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
  
  RN.BackHandler = {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
  
  return RN;
});

// Mock para AsyncStorage
const mockAsyncStorage = {
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock para APIs do navegador
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock para ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock para IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock para requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));
global.cancelAnimationFrame = jest.fn(id => clearTimeout(id));

// Mock para console em testes (evitar logs desnecessários)
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Limpar mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});

// Configurações globais para testes
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

export { /* TODO: Implement error handling */ } ;
