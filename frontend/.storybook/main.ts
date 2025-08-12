/**
 * @fileoverview Configuração principal do Storybook
 * @version 2.0.0
 * @generated 2025-01-27T11:50:00.000Z
 */

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.story.@(js|jsx|ts|tsx)',
  ],
  
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
  ],
  
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  
  features: {
    buildStoriesJson: true,
    interactionsDebugger: true,
  },
  
  core: {
    disableTelemetry: true,
  },
  
  docs: {
    autodocs: 'tag',
  },
  
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  
  viteFinal: async (config) => {
    // Configurações específicas para React Native Web
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
    };
    
    // Configurar extensões
    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ];
    
    return config;
  },
  
  // Configurações de build
  env: (config) => ({
    ...config,
    STORYBOOK: 'true',
  }),
  
  // Pré-visualização estática
  staticDirs: ['../public'],
};

export default config;
