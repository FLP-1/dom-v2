/**
 * @fileoverview Componente Button reutilizável para o DOM v2
 * @description Botão padronizado com diferentes variantes e estados
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { getValue } from '../../utils/config';

// Tipos de botão
export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  OUTLINE = 'outline',
  GHOST = 'ghost'
}

// Tamanhos de botão
export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

// Interface do componente
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

// Cores dos botões
const buttonColors = {
  [ButtonVariant.PRIMARY]: {
    background: '#007AFF',
    text: '#FFFFFF',
    border: '#007AFF'
  },
  [ButtonVariant.SECONDARY]: {
    background: '#6C757D',
    text: '#FFFFFF',
    border: '#6C757D'
  },
  [ButtonVariant.SUCCESS]: {
    background: '#28A745',
    text: '#FFFFFF',
    border: '#28A745'
  },
  [ButtonVariant.DANGER]: {
    background: '#DC3545',
    text: '#FFFFFF',
    border: '#DC3545'
  },
  [ButtonVariant.WARNING]: {
    background: '#FFC107',
    text: '#212529',
    border: '#FFC107'
  },
  [ButtonVariant.INFO]: {
    background: '#17A2B8',
    text: '#FFFFFF',
    border: '#17A2B8'
  },
  [ButtonVariant.OUTLINE]: {
    background: 'transparent',
    text: '#007AFF',
    border: '#007AFF'
  },
  [ButtonVariant.GHOST]: {
    background: 'transparent',
    text: '#007AFF',
    border: 'transparent'
  }
};

// Tamanhos dos botões
const buttonSizes = {
  [ButtonSize.SMALL]: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    borderRadius: 4
  },
  [ButtonSize.MEDIUM]: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 6
  },
  [ButtonSize.LARGE]: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 18,
    borderRadius: 8
  }
};

// Componente Button
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = ButtonVariant.PRIMARY,
  size = ButtonSize.MEDIUM,
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  testID
}) => {
  const colors = buttonColors[variant];
  const sizes = buttonSizes[size];
  const animationDuration = getValue('ui.animation.duration') || 300;

  const buttonStyle: ViewStyle = {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: variant === ButtonVariant.OUTLINE || variant === ButtonVariant.GHOST ? 1 : 0,
    paddingVertical: sizes.paddingVertical,
    paddingHorizontal: sizes.paddingHorizontal,
    borderRadius: sizes.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    minHeight: sizes.paddingVertical * 2 + 20,
    ...style
  };

  const textStyleFinal: TextStyle = {
    color: colors.text,
    fontSize: sizes.fontSize,
    fontWeight: '600',
    textAlign: 'center',
    marginLeft: loading ? 8 : 0,
    ...textStyle
  };

  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      testID={testID}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={colors.text}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={textStyleFinal}>{title}</Text>
    </TouchableOpacity>
  );
};

// Estilos padrão
const styles = StyleSheet.create({
  container: {
    // Estilos base serão aplicados inline
  }
});

export default Button; 