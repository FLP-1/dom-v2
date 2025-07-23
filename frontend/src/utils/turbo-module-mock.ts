/**
 * @fileoverview Mock do TurboModuleRegistry para React Native Web
 * @description Resolve problemas de módulos nativos no ambiente web
 * @created 2024-12-19
 * @author DOM Team v2
 */

interface DevSettings {
  addMenuItem: () => void;
  reload: () => void;
  setHotLoadingEnabled: () => void;
  setIsShakeToShowDevMenuEnabled: () => void;
}

interface PermissionsAndroid {
  checkPermission: () => Promise<boolean>;
  requestPermission: () => Promise<boolean>;
}

interface PushNotificationManager {
  presentLocalNotification: () => void;
  scheduleLocalNotification: () => void;
  cancelAllLocalNotifications: () => void;
}

type TurboModule = DevSettings | PermissionsAndroid | PushNotificationManager | Record<string, any>;

// Mock do TurboModuleRegistry para web
const TurboModuleRegistry = {
  get: (name: string): TurboModule => {
    console.log(`🔧 TurboModuleRegistry.get('${name}') - Mockado para web`);
    
    // Retornar mocks específicos para módulos conhecidos
    if (name === 'DevSettings') {
      return {
        addMenuItem: () => {},
        reload: () => {},
        setHotLoadingEnabled: () => {},
        setIsShakeToShowDevMenuEnabled: () => {}
      } as DevSettings;
    }
    
    if (name === 'PermissionsAndroid') {
      return {
        checkPermission: () => Promise.resolve(false),
        requestPermission: () => Promise.resolve(false)
      } as PermissionsAndroid;
    }
    
    if (name === 'PushNotificationManager') {
      return {
        presentLocalNotification: () => {},
        scheduleLocalNotification: () => {},
        cancelAllLocalNotifications: () => {}
      } as PushNotificationManager;
    }
    
    // Para outros módulos, retornar objeto vazio
    return {};
  },
  
  getEnforcing: (name: string): TurboModule => {
    console.log(`🔧 TurboModuleRegistry.getEnforcing('${name}') - Mockado para web`);
    
    // Retornar mocks específicos para módulos conhecidos
    if (name === 'DevSettings') {
      return {
        addMenuItem: () => {},
        reload: () => {},
        setHotLoadingEnabled: () => {},
        setIsShakeToShowDevMenuEnabled: () => {}
      } as DevSettings;
    }
    
    if (name === 'PermissionsAndroid') {
      return {
        checkPermission: () => Promise.resolve(false),
        requestPermission: () => Promise.resolve(false)
      } as PermissionsAndroid;
    }
    
    if (name === 'PushNotificationManager') {
      return {
        presentLocalNotification: () => {},
        scheduleLocalNotification: () => {},
        cancelAllLocalNotifications: () => {}
      } as PushNotificationManager;
    }
    
    // Para outros módulos, retornar objeto vazio (não lançar erro)
    console.warn(`⚠️ TurboModuleRegistry.getEnforcing('${name}') - Módulo não encontrado, retornando mock`);
    return {};
  }
};

export default TurboModuleRegistry; 