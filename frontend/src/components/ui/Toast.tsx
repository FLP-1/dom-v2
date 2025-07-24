/**
 * @fileoverview Componente Toast para notificações do DOM v2
 * @description Sistema de notificações simples e eficiente
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// Tipos de toast
export type ToastType = 'success' | 'error' | 'warning' | 'info';

// Tamanhos disponíveis
export type ToastSize = 'small' | 'medium' | 'large';

// Posições disponíveis
export type ToastPosition = 'top' | 'bottom' | 'center';

// Interface das props
export interface ToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  size?: ToastSize;
  position?: ToastPosition;
  duration?: number;
  onClose?: () => void;
  onPress?: () => void;
  showCloseButton?: boolean;
  autoHide?: boolean;
}

// Componente Toast
const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  type = 'info',
  size = 'medium',
  position = 'top',
  duration = 3000,
  onClose,
  onPress,
  showCloseButton = true,
  autoHide = true,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  // Animar entrada
  const animateIn = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animar saída
  const animateOut = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  // Efeito para mostrar/esconder
  useEffect(() => {
    if (visible) {
      animateIn();
      
      if (autoHide) {
        const timer = setTimeout(() => {
          animateOut();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      animateOut();
    }
  }, [visible, duration, autoHide]);

  // Obter cores baseadas no tipo
  const getTypeColors = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          background: '#4CAF50',
          text: '#FFFFFF',
          border: '#45A049',
        };
      case 'error':
        return {
          background: '#F44336',
          text: '#FFFFFF',
          border: '#D32F2F',
        };
      case 'warning':
        return {
          background: '#FF9800',
          text: '#FFFFFF',
          border: '#F57C00',
        };
      case 'info':
      default:
        return {
          background: '#2196F3',
          text: '#FFFFFF',
          border: '#1976D2',
        };
    }
  };

  // Obter tamanhos
  const getSizeStyles = (size: ToastSize) => {
    switch (size) {
      case 'small':
        return {
          padding: 8,
          fontSize: 12,
          minHeight: 32,
        };
      case 'large':
        return {
          padding: 16,
          fontSize: 16,
          minHeight: 56,
        };
      case 'medium':
      default:
        return {
          padding: 12,
          fontSize: 14,
          minHeight: 44,
        };
    }
  };

  // Obter posição
  const getPositionStyles = (position: ToastPosition) => {
    switch (position) {
      case 'bottom':
        return {
          bottom: 20,
          top: undefined,
        };
      case 'center':
        return {
          top: '50%',
          transform: [{ translateY: -25 }],
        };
      case 'top':
      default:
        return {
          top: 20,
          bottom: undefined,
        };
    }
  };

  const colors = getTypeColors(type);
  const sizeStyles = getSizeStyles(size);
  const positionStyles = getPositionStyles(position);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          ...positionStyles,
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.toast,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
            padding: sizeStyles.padding,
            minHeight: sizeStyles.minHeight,
          },
        ]}
        onPress={onPress}
        activeOpacity={onPress ? 0.8 : 1}
      >
        <Text
          style={[
            styles.message,
            {
              color: colors.text,
              fontSize: sizeStyles.fontSize,
            },
          ]}
          numberOfLines={3}
        >
          {message}
        </Text>
        
        {showCloseButton && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={animateOut}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.closeText, { color: colors.text }]}>×</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toast: {
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    flex: 1,
    fontWeight: '500',
    textAlign: 'left',
  },
  closeButton: {
    marginLeft: 12,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});

export default Toast; 