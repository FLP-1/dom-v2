

/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Componente React/React Native para Toast
 * 
 * @dependencies
 * - React, React Native
 * 
 * @usage
 * <Toast message="Mensagem" type="success" />
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Componente React/React Native
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - React, React Native
 * 
 * @usage
 * <ComponentName prop={value} />
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  duration = 3000,
  onClose 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        onClose?.();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeAnim, duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#3b82f6';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: getBackgroundColor(),
        borderRadius: 8,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        opacity: fadeAnim,
        transform: [{
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
          }),
        }],
      }}
    >
      <Text style={{ fontSize: 20, marginRight: 12 }}>
        {getIcon()}
      </Text>
      <Text style={{ 
        flex: 1, 
        color: '#fff', 
        fontSize: 14,
        fontWeight: '500'
      }}>
        {message}
      </Text>
    </Animated.View>
  );
};

