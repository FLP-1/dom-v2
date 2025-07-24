/**
 * @fileoverview Polyfills aprimorados para React Native Web DOM v2
 * @description Resolve warnings de deprecação e problemas de compatibilidade
 * @created 2024-12-19
 * @author DOM Team v2
 */

console.log('🛡️ Carregando polyfills aprimorados...');

// Interceptar erros antes de qualquer coisa
window.addEventListener('error', function(event) {
  if (event.error && event.error.message && event.error.message.includes('DevSettings')) { 
    console.log('🛡️ Interceptando erro DevSettings - aplicando polyfill...');
    event.preventDefault();
    return false;
  }
});

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

// POLYFILL CRÍTICO: AsyncStorage para React Native Web
if (typeof window !== 'undefined') {
  // Mock do AsyncStorage usando localStorage
  const AsyncStorageMock = {
    getItem: async (key) => {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.warn('AsyncStorage getItem error:', error);
        return null;
      }
    },
    setItem: async (key, value) => {
      try {
        localStorage.setItem(key, value);
        return null;
      } catch (error) {
        console.warn('AsyncStorage setItem error:', error);
        throw error;
      }
    },
    removeItem: async (key) => {
      try {
        localStorage.removeItem(key);
        return null;
      } catch (error) {
        console.warn('AsyncStorage removeItem error:', error);
        throw error;
      }
    },
    clear: async () => {
      try {
        localStorage.clear();
        return null;
      } catch (error) {
        console.warn('AsyncStorage clear error:', error);
        throw error;
      }
    },
    getAllKeys: async () => {
      try {
        return Object.keys(localStorage);
      } catch (error) {
        console.warn('AsyncStorage getAllKeys error:', error);
        return [];
      }
    },
    multiGet: async (keys) => {
      try {
        return keys.map(key => [key, localStorage.getItem(key)]);
      } catch (error) {
        console.warn('AsyncStorage multiGet error:', error);
        return keys.map(key => [key, null]);
      }
    },
    multiSet: async (keyValuePairs) => {
      try {
        keyValuePairs.forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        return null;
      } catch (error) {
        console.warn('AsyncStorage multiSet error:', error);
        throw error;
      }
    },
    multiRemove: async (keys) => {
      try {
        keys.forEach(key => localStorage.removeItem(key));
        return null;
      } catch (error) {
        console.warn('AsyncStorage multiRemove error:', error);
        throw error;
      }
    }
  };

  // Substituir AsyncStorage globalmente
  if (window.ReactNative) {
    window.ReactNative.AsyncStorage = AsyncStorageMock;
  }

  // Mockar o módulo AsyncStorage
  window.AsyncStorage = AsyncStorageMock;

  // Interceptar require/import do AsyncStorage
  if (window.__REACT_NATIVE_ASYNC_STORAGE_MOCK__) {
    window.__REACT_NATIVE_ASYNC_STORAGE_MOCK__ = AsyncStorageMock;
  }

  // Mockar NativeModules.AsyncStorage
  if (window.NativeModules) {
    window.NativeModules.AsyncStorage = AsyncStorageMock;
  }

  // Mockar TurboModuleRegistry para AsyncStorage
  const originalGetEnforcing = window.TurboModuleRegistry.getEnforcing;
  const originalGet = window.TurboModuleRegistry.get;

  window.TurboModuleRegistry.getEnforcing = (name) => {
    if (name === 'AsyncStorage') {
      return AsyncStorageMock;
    }
    return originalGetEnforcing ? originalGetEnforcing(name) : {};
  };

  window.TurboModuleRegistry.get = (name) => {
    if (name === 'AsyncStorage') {
      return AsyncStorageMock;
    }
    return originalGet ? originalGet(name) : null;
  };

  console.log('✅ AsyncStorage polyfill aplicado');
}

// Polyfills para warnings de deprecação
if (typeof window !== 'undefined') {
  // Interceptar console.warn para suprimir warnings específicos
  const originalWarn = console.warn;
  console.warn = function(...args) {
    const message = args.join(' ');
    
    // Suprimir warnings específicos de deprecação
    if (message.includes('keyboardType is deprecated') ||
        message.includes('editable is deprecated') ||
        message.includes('TouchableOpacity is deprecated') ||
        message.includes('accessibilityDisabled is deprecated') ||
        message.includes('focusable is deprecated') ||
        message.includes('props.pointerEvents is deprecated') ||
        message.includes('useNativeDriver is not supported') ||
        message.includes('AsyncStorage is null')) {
      // Silenciar estes warnings específicos
      return;
    }
    
    // Manter outros warnings
    originalWarn.apply(console, args);
  };
}

// Polyfills para animações
if (typeof window !== 'undefined') {
  // Mockar módulos de animação
  window.RCTAnimation = {
    addListener: () => {},
    removeListeners: () => {}
  };
  
  // Configurar Animated para web
  if (window.Animated) {
    window.Animated.useNativeDriver = false;
  }
}

// Polyfills para TouchableOpacity (substituir por Pressable)
if (typeof window !== 'undefined' && window.ReactNative) {
  const originalTouchableOpacity = window.ReactNative.TouchableOpacity;
  if (originalTouchableOpacity) {
    // Substituir TouchableOpacity por uma versão compatível
    window.ReactNative.TouchableOpacity = function(props) {
      // Usar Pressable como fallback
      if (window.ReactNative.Pressable) {
        return window.ReactNative.Pressable(props);
      }
      return originalTouchableOpacity(props);
    };
  }
}

// Polyfills para TextInput
if (typeof window !== 'undefined' && window.ReactNative) {
  const originalTextInput = window.ReactNative.TextInput;
  if (originalTextInput) {
    // Interceptar props deprecated
    const TextInputWrapper = function(props) {
      const cleanProps = { ...props };
      
      // Converter keyboardType para inputMode
      if (cleanProps.keyboardType) {
        const keyboardTypeMap = {
          'default': 'text',
          'numeric': 'numeric',
          'email-address': 'email',
          'phone-pad': 'tel',
          'url': 'url'
        };
        cleanProps.inputMode = keyboardTypeMap[cleanProps.keyboardType] || 'text';
        delete cleanProps.keyboardType;
      }
      
      // Converter editable para readOnly
      if (cleanProps.editable !== undefined) {
        cleanProps.readOnly = !cleanProps.editable;
        delete cleanProps.editable;
      }
      
      return originalTextInput(cleanProps);
    };
    
    window.ReactNative.TextInput = TextInputWrapper;
  }
}

// Polyfills para View
if (typeof window !== 'undefined' && window.ReactNative) {
  const originalView = window.ReactNative.View;
  if (originalView) {
    const ViewWrapper = function(props) {
      const cleanProps = { ...props };
      
      // Converter focusable para style.pointerEvents
      if (cleanProps.focusable !== undefined) {
        if (!cleanProps.style) cleanProps.style = {};
        cleanProps.style.pointerEvents = cleanProps.focusable ? 'auto' : 'none';
        delete cleanProps.focusable;
      }
      
      // Converter accessibilityDisabled
      if (cleanProps.accessibilityDisabled !== undefined) {
        cleanProps.accessibilityState = {
          ...cleanProps.accessibilityState,
          disabled: cleanProps.accessibilityDisabled
        };
        delete cleanProps.accessibilityDisabled;
      }
      
      return originalView(cleanProps);
    };
    
    window.ReactNative.View = ViewWrapper;
  }
}

console.log('✅ Polyfills aprimorados carregados com sucesso'); 