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
    resolverMainFields: ['react-native', 'browser', 'main'],
    resolveRequest: (context, moduleName, platform) => {
      // Intercepta o require problemático do ReactDevToolsSettingsManager
      if (moduleName.includes('ReactDevToolsSettingsManager')) {
        return {
          type: 'empty'
        };
      }
      
      // Para web, usar index.web.js como entry point
      if (platform === 'web' && moduleName === './index.js') {
        return {
          filePath: require.resolve('./index.web.js'),
          type: 'sourceFile'
        };
      }
      
      // Resolver problemas de React Native Web
      if (moduleName === 'react-native') {
        return {
          filePath: require.resolve('react-native-web'),
          type: 'sourceFile'
        };
      }
      
      // Mockar módulos nativos que não existem no web
      const nativeModulesToMock = [
        'DevSettings',
        'NativeModules',
        'NativeEventEmitter',
        'PlatformConstants'
      ];
      
      if (nativeModulesToMock.includes(moduleName)) {
        return {
          type: 'empty'
        };
      }
      
      // Interceptar TurboModuleRegistry para web - REMOVIDO
      // if (platform === 'web' && moduleName.includes('TurboModuleRegistry')) {
      //   return {
      //     type: 'sourceFile',
      //     filePath: require.resolve('./src/utils/turbo-module-mock.ts')
      //   };
      // }
      
      // Resolve normalmente outros módulos
      return context.resolveRequest(context, moduleName, platform);
    }
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
