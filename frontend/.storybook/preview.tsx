/**
 * @fileoverview Configuração de preview do Storybook
 * @version 2.0.0
 * @generated 2025-01-27T11:50:00.000Z
 */

import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/components/base/utils/themeManager';
import { lightTheme, darkTheme, highContrastTheme } from '../src/components/base/utils/themeManager';
import './storybook.css';

// Configuração de viewports
const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  desktopLarge: {
    name: 'Desktop Large',
    styles: {
      width: '2560px',
      height: '1440px',
    },
  },
};

// Configuração de backgrounds
const backgrounds = {
  default: 'light',
  values: [
    {
      name: 'light',
      value: '#FFFFFF',
    },
    {
      name: 'dark',
      value: '#1A1A1A',
    },
    {
      name: 'gray',
      value: '#F5F5F5',
    },
  ],
};

// Decorator para temas
const withThemeProvider = (Story, context) => {
  const theme = context.globals.theme || 'light';
  
  return (
    <ThemeProvider initialTheme={theme}>
      <div style={{ 
        padding: '20px',
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <Story />
      </div>
    </ThemeProvider>
  );
};

// Decorator para layout responsivo
const withResponsiveLayout = (Story, context) => {
  const viewport = context.globals.viewport;
  const isMobile = viewport === 'mobile';
  
  return (
    <div style={{
      maxWidth: isMobile ? '100%' : '1200px',
      margin: '0 auto',
      padding: isMobile ? '10px' : '20px',
    }}>
      <Story />
    </div>
  );
};

// Preview configuration
const preview: Preview = {
  parameters: {
    // Controles
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      sort: 'alpha',
    },
    
    // Ações
    actions: { 
      argTypesRegex: '^on[A-Z].*' 
    },
    
    // Documentação
    docs: {
      extractComponentDescription: (component, { notes }) => {
        if (notes) {
          return typeof notes === 'string' ? notes : notes.markdown || notes.text;
        }
        return null;
      },
    },
    
    // Viewports
    viewport: {
      viewports: customViewports,
      defaultViewport: 'desktop',
    },
    
    // Backgrounds
    backgrounds,
    
    // Layout
    layout: 'centered',
    
    // Acessibilidade
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
            options: {
              noScroll: true,
            },
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
    
    // Opções do addon de backgrounds
    backgrounds: {
      grid: {
        cellSize: 20,
        opacity: 0.5,
        cellAmount: 5,
      },
    },
  },
  
  // Global types para controles globais
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'highContrast', title: 'High Contrast', icon: 'contrast' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'pt-BR',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'pt-BR', title: 'Português (Brasil)' },
          { value: 'en-US', title: 'English (US)' },
          { value: 'es-ES', title: 'Español' },
        ],
        showName: true,
      },
    },
  },
  
  // Decorators
  decorators: [
    withThemeProvider,
    withResponsiveLayout,
  ],
  
  // Tags para auto-docs
  tags: ['autodocs'],
};

export default preview;
