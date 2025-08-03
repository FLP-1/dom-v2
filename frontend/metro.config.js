/**
 * @fileoverview Configuração do Metro para o frontend React Native DOM v2
 * @directory frontend
 * @description Define configurações do bundler Metro para React Native
 * @created 2024-12-19
 * @lastModified 2025-07-25
 * @author DOM Team v2
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 * https://microsoft.github.io/react-native-windows/docs/next/metro-config-out-tree-platforms
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    platforms: ['ios', 'android', 'native', 'web'],
    resolverMainFields: ['react-native', 'browser', 'main'],
    alias: {
      'react-native$': 'react-native-web',
    },
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'ico'],
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json'],
    resolveRequest: (context, moduleName, platform) => {
      // Resolver problemas do React DevTools
      if (moduleName.includes('ReactDevToolsSettingsManager')) {
        return {
          type: 'empty'
        };
      }
      
      // Resolver problemas de módulos nativos no web
      const nativeModulesToMock = [
        'react-devtools-core',
        'react-devtools-inline',
        'react-devtools-shared',
        'DevSettings',
        'NativeModules',
        'NativeEventEmitter',
        'PlatformConstants',
        'TurboModuleRegistry',
        'AccessibilityInfo',
        'Alert',
        'Animated',
        'AppState',
        'AsyncStorage',
        'BackHandler',
        'Clipboard',
        'DeviceInfo',
        'Dimensions',
        'Easing',
        'InteractionManager',
        'Keyboard',
        'Linking',
        'NetInfo',
        'PanResponder',
        'PermissionsAndroid',
        'PixelRatio',
        'PushNotificationIOS',
        'Settings',
        'Share',
        'StatusBar',
        'StyleSheet',
        'Systrace',
        'TextInput',
        'ToastAndroid',
        'UIManager',
        'Vibration',
        'ViewPagerAndroid'
      ];
      
      if (nativeModulesToMock.includes(moduleName)) {
        return {
          type: 'empty'
        };
      }
      
      // Resolver normalmente outros módulos
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
    minifierConfig: {
      keep_fnames: true,
      mangle: {
        keep_fnames: true,
      },
    },
  },
  watchFolders: [
    // Incluir módulos hoisted se necessário
    path.resolve(__dirname, '../node_modules'),
  ],
  server: {
    port: 8081,
    enhanceMiddleware: (middleware, server) => {
      return (req, res, next) => {
        // Adicionar headers CORS para desenvolvimento
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        
        return middleware(req, res, next);
      };
    },
  },
  // Configurações de cache para melhor performance
  cacheStores: [
    {
      name: 'file',
      type: 'file',
      options: {
        root: path.join(__dirname, 'node_modules', '.cache', 'metro'),
      },
    },
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
