







import React from 'react';


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}


function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}


function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}


function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}


function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}:`, error.message);
  // Implementar logging, notificação, etc.
}
import { View, Text, StyleSheet, Platform, Animated } from 'react-native';

// Detecção de plataforma
const isWeb = Platform.OS === 'web';

// ===== SISTEMA DE CORES =====
export const Colors = {
  // Cores base
  primary: '#2196F3',
  secondary: '#FF9800',
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#00BCD4',
  
  // Cores neutras
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Cores por perfil
  employer: {
    primary: '#1976D2',
    secondary: '#FF5722',
    accent: '#4CAF50',
  },
  employee: {
    primary: '#FF9800',
    secondary: '#2196F3',
    accent: '#9C27B0',
  },
  family: {
    primary: '#4CAF50',
    secondary: '#FF9800',
    accent: '#2196F3',
  },
  partner: {
    primary: '#673AB7',
    secondary: '#FF5722',
    accent: '#00BCD4',
  },
  admin: {
    primary: '#424242',
    secondary: '#FF9800',
    accent: '#4CAF50',
  },
};

// ===== SISTEMA DE TIPOGRAFIA =====
export const Typography = {
  // Tamanhos de fonte
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  // Pesos de fonte
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Famílias de fonte
  families: {
    primary: isWeb ? 'Roboto, sans-serif' : 'System',
    secondary: isWeb ? 'Open Sans, sans-serif' : 'System',
    mono: isWeb ? 'Roboto Mono, monospace' : 'System',
  },
};

// ===== SISTEMA DE ESPAÇAMENTO =====
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// ===== SISTEMA DE BORDAS =====
export const Borders = {
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  width: {
    none: 0,
    thin: 1,
    normal: 2,
    thick: 4,
  },
};

// ===== SISTEMA DE SOMBRAS =====
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

// ===== SISTEMA DE ÍCONES =====
export const Icons = {
  // Fallback para ícones quando react-native-vector-icons não estiver disponível
  getIcon: (name: string, size: number = 24, color: string = Colors.gray[600]) => {
    // Implementação de fallback com símbolos Unicode ou SVG
    const iconMap: { [key: string]: string } = {
      home: '🏠',
      user: '👤',
      settings: '⚙️',
      notification: '🔔',
      task: '📋',
      calendar: '📅',
      chart: '📊',
      money: '💰',
      family: '👨‍👩‍👧‍👦',
      employee: '👷',
      employer: '👔',
      partner: '🤝',
      admin: '🛠️',
      owner: '👑',
    };
    
    return (
      <Text style={[styles.iconFallback, { fontSize: size, color }]}>
        {iconMap[name] || '📱'}
      </Text>
    );
  },
};

// ===== SISTEMA DE ANIMAÇÕES =====
export const Animations = {
  // Fallback para animações quando react-native-reanimated não estiver disponível
  fadeIn: (duration: number = 300) => {
    const opacity = new Animated.Value(0);
    
    React.useEffect(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: !isWeb,
      }).start();
    }, []);
    
    return opacity;
  },
  
  slideIn: (direction: 'up' | 'down' | 'left' | 'right' = 'up', duration: number = 300) => {
    const translateY = new Animated.Value(direction === 'up' ? 50 : direction === 'down' ? -50 : 0);
    const translateX = new Animated.Value(direction === 'left' ? 50 : direction === 'right' ? -50 : 0);
    
    React.useEffect(() => {
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver: !isWeb,
      }).start();
      
      Animated.timing(translateX, {
        toValue: 0,
        duration,
        useNativeDriver: !isWeb,
      }).start();
    }, []);
    
    return { translateY, translateX };
  },
};

// ===== ESTILOS BASE =====
const styles = StyleSheet.create({
  iconFallback: {
    textAlign: 'center',
  },
});

// ===== EXPORTAÇÕES =====
export default {
  Colors,
  Typography,
  Spacing,
  Borders,
  Shadows,
  Icons,
  Animations,
  isWeb,
}; 


Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */