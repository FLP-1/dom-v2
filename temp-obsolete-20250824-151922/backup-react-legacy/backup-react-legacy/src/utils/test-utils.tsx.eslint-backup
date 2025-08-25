/**
 * @fileoverview Utilitários de teste - Wrappers e helpers
 * @version 2.0.0
 * @generated 2025-01-27T11:45:00.000Z
 */

import React, { ReactElement, ReactNode } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '../components/base/utils/themeManager';
import { defaultTheme } from '../components/base/utils/theme';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

// Estender Jest matchers
expect.extend(toHaveNoViolations);

// Props do AllTheProviders
interface AllTheProvidersProps {
  children?: ReactNode;
  initialTheme?: string;
}

// Wrapper com todos os providers necessários
const AllTheProviders: React.FC<AllTheProvidersProps> = ({ 
  children, 
  initialTheme = 'light' 
}) => {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      {children}
    </ThemeProvider>
  );
};

// Interface customizada para render options
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialTheme?: string;
  wrapper?: React.ComponentType<any>;
}

// Função de render customizada
const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
): RenderResult => {
  const { initialTheme, wrapper, ...renderOptions } = options;
  
  const Wrapper = wrapper || AllTheProviders;
  
  return render(ui, {
    wrapper: ({ children }) => (
      <Wrapper initialTheme={initialTheme}>
        {children}
      </Wrapper>
    ),
    ...renderOptions,
  });
};

// Função para criar user event com configurações padrão
const createUserEvent = () => {
  return userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });
};

// Helper para testes de acessibilidade
const testAccessibility = async (container: Element | Document = document.body) => {
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  return results;
};

// Helper para testar componentes com diferentes breakpoints
const renderWithBreakpoint = (
  ui: ReactElement,
  breakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop'
) => {
  const breakpoints = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
  };
  
  const dimensions = breakpoints[breakpoint];
  
  // Mock do Dimensions para React Native
  jest.spyOn(require('react-native'), 'Dimensions').mockImplementation(() => ({
    get: () => dimensions,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  
  // Mock do window para web
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: dimensions.width,
  });
  
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: dimensions.height,
  });
  
  return customRender(ui);
};

// Helper para testar temas
const renderWithTheme = (
  ui: ReactElement,
  theme: 'light' | 'dark' | 'highContrast' = 'light'
) => {
  return customRender(ui, { initialTheme: theme });
};

// Helper para mock de funções async
const createAsyncMock = <T extends (...args: any[]) => Promise<any>>(
  implementation?: T
): jest.MockedFunction<T> => {
  return jest.fn(implementation) as jest.MockedFunction<T>;
};

// Helper para aguardar re-renders
const waitForRerender = () => new Promise(resolve => setTimeout(resolve, 0));

// Helper para simular delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock de performance.now() para testes de performance
const mockPerformanceNow = () => {
  let mockTime = 0;
  jest.spyOn(performance, 'now').mockImplementation(() => {
    mockTime += 16.67; // Simula 60fps
    return mockTime;
  });
  return mockTime;
};

// Helper para testes de hooks
const renderHook = <T, P>(
  hook: (props: P) => T,
  options: {
    initialProps?: P;
    wrapper?: React.ComponentType<any>;
  } = {}
) => {
  const { initialProps, wrapper } = options;
  let result: { current: T };
  let rerender: (newProps?: P) => void;
  
  const TestComponent: React.FC<{ hookProps?: P }> = ({ hookProps }) => {
    result = { current: hook(hookProps || initialProps!) };
    return null;
  };
  
  const renderResult = customRender(<TestComponent hookProps={initialProps} />, {
    wrapper,
  });
  
  rerender = (newProps?: P) => {
    renderResult.rerender(<TestComponent hookProps={newProps || initialProps} />);
  };
  
  return {
    result: result!,
    rerender,
    unmount: renderResult.unmount,
  };
};

// Matchers customizados para Jest
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveStyle(style: Record<string, any>): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toHaveFocus(): R;
    }
  }
}

// Helper para debug de componentes
const debugComponent = (container: Element, options: { pretty?: boolean } = {}) => {
  const { pretty = true } = options;
  if (pretty) {
    console.log(container.innerHTML);
  } else {
    console.log(container.textContent);
  }
};

// Helper para criar dados de teste
const createTestData = {
  user: (overrides: any = {}) => ({
    id: '1',
    nome: 'João Silva',
    email: 'joao@example.com',
    perfil: 'empregador',
    ativo: true,
    ...overrides,
  }),
  
  tarefa: (overrides: any = {}) => ({
    id: '1',
    titulo: 'Lavar louça',
    descricao: 'Lavar toda a louça da cozinha',
    status: 'pendente',
    prioridade: 'media',
    ...overrides,
  }),
  
  familia: (overrides: any = {}) => ({
    id: '1',
    nome: 'Família Silva',
    endereco: 'Rua das Flores, 123',
    membros: [],
    ...overrides,
  }),
};

// Helper para simular eventos de touch (mobile)
const simulateTouchEvent = (element: Element, eventType: string) => {
  const touchEvent = new TouchEvent(eventType, {
    bubbles: true,
    cancelable: true,
    touches: [
      {
        identifier: 0,
        target: element,
        clientX: 100,
        clientY: 100,
        pageX: 100,
        pageY: 100,
        screenX: 100,
        screenY: 100,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1,
      } as Touch,
    ],
  });
  
  element.dispatchEvent(touchEvent);
};

// Exports
export {
  customRender as render,
  createUserEvent,
  testAccessibility,
  renderWithBreakpoint,
  renderWithTheme,
  createAsyncMock,
  waitForRerender,
  delay,
  mockPerformanceNow,
  renderHook,
  debugComponent,
  createTestData,
  simulateTouchEvent,
};

// Re-export tudo do testing library
export * from '@testing-library/react';
export { userEvent };
