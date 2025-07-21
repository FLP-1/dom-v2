/**
 * @fileoverview Configuração do Metro para o frontend React Native DOM v2
 * @directory frontend
 * @description Define configurações do bundler Metro para React Native
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    platforms: ['ios', 'android', 'native', 'web'],
    alias: {
      // Ignorar módulos problemáticos do React DevTools
      '../../src/private/devsupport/rndevtools/ReactDevToolsSettingsManager': false,
      'react-devtools-core': false,
      'react-devtools': false,
      'react-native/Libraries/Core/setUpReactDevTools': false,
    },
    blacklistRE: /node_modules\/react-native\/Libraries\/Core\/setUpReactDevTools\.js/,
    resolverMainFields: ['react-native', 'browser', 'main'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: [],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
