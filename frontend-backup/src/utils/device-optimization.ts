/**
 * @fileoverview Otimização por dispositivo para DOM v2
 * @directory frontend/src/utils
 * @description Adaptação da interface Baseada no dispositivo do usuário
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React from 'react';
import { Dimensions, Platform } from 'react-native';

// Tipos de dispositivo
export type DeviceType = 'SMARTPHONE' | 'TABLET' | 'DESKTOP';

// Configuração de otimização por dispositivo
export interface DeviceOptimization {
  device: DeviceType;
  touchOptimized: boolean;
  buttonSize: 'SMALL' | 'MEDIUM' | 'LARGE';
  fontSize: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
  navigation: 'SWIPE' | 'TAP' | 'CLICK';
  features: {
    shortcuts: boolean;
    detailedInfo: boolean;
    helpText: boolean;
  };
}

// Detectar tipo de dispositivo
export function detectDeviceType(): DeviceType {
  const { width, height } = Dimensions.get('window');
  const screenWidth = Math.min(width, height);
  const screenHeight = Math.max(width, height);
  
  // Desktop (web)
  if (Platform.OS === 'web') {
    return 'DESKTOP';
  }
  
  // Tablet (diagonal > 7 polegadas)
  if (screenWidth >= 600 || screenHeight >= 900) {
    return 'TABLET';
  }
  
  // Smartphone (padrão)
  return 'SMARTPHONE';
}

// Configurações por dispositivo
const DEVICE_CONFIGS: Record<DeviceType, DeviceOptimization> = {
  SMARTPHONE: {
    device: 'SMARTPHONE',
    touchOptimized: true,
    buttonSize: 'LARGE',
    fontSize: {
      small: 14,
      medium: 16,
      large: 18,
      xlarge: 20,
    },
    spacing: {
      small: 12,
      medium: 20,
      large: 28,
      xlarge: 36,
    },
    navigation: 'TAP',
    features: {
      shortcuts: false,
      detailedInfo: false,
      helpText: true,
    },
  },

  TABLET: {
    device: 'TABLET',
    touchOptimized: true,
    buttonSize: 'MEDIUM',
    fontSize: {
      small: 12,
      medium: 14,
      large: 16,
      xlarge: 18,
    },
    spacing: {
      small: 8,
      medium: 16,
      large: 24,
      xlarge: 32,
    },
    navigation: 'TAP',
    features: {
      shortcuts: true,
      detailedInfo: true,
      helpText: true,
    },
  },

  DESKTOP: {
    device: 'DESKTOP',
    touchOptimized: false,
    buttonSize: 'SMALL',
    fontSize: {
      small: 10,
      medium: 12,
      large: 14,
      xlarge: 16,
    },
    spacing: {
      small: 4,
      medium: 8,
      large: 12,
      xlarge: 16,
    },
    navigation: 'CLICK',
    features: {
      shortcuts: true,
      detailedInfo: true,
      helpText: false,
    },
  },
};

// Hook para usar otimização de dispositivo
export function useDeviceOptimization() {
  const [deviceType, setDeviceType] = React.useState<DeviceType>('SMARTPHONE');
  
  React.useEffect(() => {
    const detectedDevice = detectDeviceType();
    setDeviceType(detectedDevice);
  }, []);

  const config = React.useMemo(() => DEVICE_CONFIGS[deviceType], [deviceType]);

  return {
    deviceType,
    config,
    setDeviceType,
  };
}

// Utilitários de otimização
export function getOptimizedButtonStyle(deviceType: DeviceType) {
  const config = DEVICE_CONFIGS[deviceType];
  
  switch (config.buttonSize) {
    case 'LARGE':
      return {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        minHeight: 56,
      };
    case 'MEDIUM':
      return {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        minHeight: 48,
      };
    case 'SMALL':
      return {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        minHeight: 40,
      };
  }
}

export function getOptimizedTextStyle(deviceType: DeviceType, size: 'small' | 'medium' | 'large' | 'xlarge') {
  const config = DEVICE_CONFIGS[deviceType];
  
  return {
    fontSize: config.fontSize[size],
    lineHeight: config.fontSize[size] * 1.4,
  };
}

export function getOptimizedSpacing(deviceType: DeviceType, size: 'small' | 'medium' | 'large' | 'xlarge') {
  const config = DEVICE_CONFIGS[deviceType];
  return config.spacing[size];
}

// Verificar se deve mostrar funcionalidade
export function shouldShowFeature(deviceType: DeviceType, feature: keyof DeviceOptimization['features']): boolean {
  const config = DEVICE_CONFIGS[deviceType];
  return config.features[feature];
}

// Otimizar navegação por dispositivo
export function getNavigationConfig(deviceType: DeviceType) {
  const config = DEVICE_CONFIGS[deviceType];
  
  switch (config.navigation) {
    case 'SWIPE':
      return {
        gestureEnabled: true,
        swipeEnabled: true,
        tapEnabled: true,
      };
    case 'TAP':
      return {
        gestureEnabled: false,
        swipeEnabled: false,
        tapEnabled: true,
      };
    case 'CLICK':
      return {
        gestureEnabled: false,
        swipeEnabled: false,
        tapEnabled: false,
        clickEnabled: true,
      };
  }
} 