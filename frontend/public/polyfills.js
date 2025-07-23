/**
 * @fileoverview Polyfills para React Native Web
 * @description Resolve problemas de módulos nativos no ambiente web
 * @created 2024-12-19
 * @author DOM Team v2
 */

// Configurar React Native Web para web
window.__fbBatchedBridgeConfig = {
  remoteModuleConfig: [],
  localModuleConfig: []
};

// Polyfills necessários
if (typeof global === 'undefined') {
  window.global = window;
}

if (typeof process === 'undefined') {
  window.process = { env: { NODE_ENV: 'development' } };
}

// Mockar módulos nativos problemáticos
window.DevSettings = {
  addMenuItem: () => {},
  reload: () => {},
  setHotLoadingEnabled: () => {},
  setIsShakeToShowDevMenuEnabled: () => {}
};

window.NativeModules = {
  DevSettings: window.DevSettings
};

window.NativeEventEmitter = class {
  constructor() {}
  addListener() { return { remove: () => {} }; }
  removeAllListeners() {}
  emit() {}
};

// Configurar TurboModuleRegistry
window.TurboModuleRegistry = {
  getEnforcing: (name) => {
    if (name === 'DevSettings') {
      return window.DevSettings;
    }
    return {};
  },
  get: (name) => {
    if (name === 'DevSettings') {
      return window.DevSettings;
    }
    return null;
  }
};

console.log('✅ Polyfills carregados com sucesso'); 