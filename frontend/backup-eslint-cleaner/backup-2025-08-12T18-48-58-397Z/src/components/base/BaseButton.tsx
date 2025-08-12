/**
 * @fileoverview BaseButton - Componente button base
 * @version 2.0.0
 * @generated 2025-01-27T11:20:00.000Z
 */

import React, { memo, useMemo, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { useUserProfile } from '../../hooks/useUserProfile.ts';

export interface BaseButtonProps {
  title?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  style?: object;
  accessibilityLabel?: string;
  accessibilityRole?: string;
}

export const BaseButton: React.FC<BaseButtonProps> = memo(({
  title,
  children,
  icon,
  iconPosition = 'left',
  variant = 'solid',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onPress,
  style,
  accessibilityLabel,
  accessibilityRole = 'button',
  ...props
}) => {
  const { currentTheme } = useUserProfile();

  const sizeStyles = useMemo(() => {
    switch (size) {
      case 'xs':
        return {
          paddingVertical: 4,
          paddingHorizontal: 8,
          fontSize: 12,
        };
      case 'sm':
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
          fontSize: 14,
        };
      case 'md':
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontSize: 16,
        };
      case 'lg':
        return {
          paddingVertical: 16,
          paddingHorizontal: 20,
          fontSize: 18,
        };
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontSize: 16,
        };
    }
  }, [size]);

  const variantStyles = useMemo(() => {
    const primaryColor = currentTheme === 'dark' ? '#007AFF' : '#007AFF';
    const disabledColor = currentTheme === 'dark' ? '#8E8E93' : '#8E8E93';
    
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: disabled ? disabledColor : primaryColor,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? disabledColor : primaryColor,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      case 'link':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          paddingVertical: 0,
          paddingHorizontal: 0,
        };
      default:
        return {
          backgroundColor: disabled ? disabledColor : primaryColor,
          borderWidth: 0,
        };
    }
  }, [variant, disabled, currentTheme]);

  const textColor = useMemo(() => {
    if (disabled) return disabledColor;
    
    switch (variant) {
      case 'solid':
        return '#FFFFFF';
      case 'outline':
      case 'ghost':
      case 'link':
        return primaryColor;
      default:
        return '#FFFFFF';
    }
  }, [disabled, variant, currentTheme]);

  const buttonStyle = useMemo(() => [
    styles.button,
    {
      borderRadius: 8,
      ...sizeStyles,
      ...variantStyles,
    },
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ], [sizeStyles, variantStyles, fullWidth, disabled, style]);

  const textStyle = useMemo(() => [
    styles.text,
    {
      fontSize: sizeStyles.fontSize,
      color: textColor,
      fontWeight: '600',
    },
  ], [sizeStyles.fontSize, textColor]);

  const handlePress = useCallback(() => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  }, [disabled, loading, onPress]);

  const renderContent = useCallback(() => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={textColor} 
            style={styles.loadingIndicator}
          />
          {title && <Text style={[textStyle, styles.loadingText]}>{title}</Text>}
        </View>
      );
    }

    const content = [];
    
    if (icon && iconPosition === 'left') {
      content.push(
        <View key="icon-left" style={styles.iconLeft}>
          {icon}
        </View>
      );
    }
    
    if (title) {
      content.push(
        <Text key="text" style={textStyle}>
          {title}
        </Text>
      );
    }
    
    if (children) {
      content.push(children);
    }
    
    if (icon && iconPosition === 'right') {
      content.push(
        <View key="icon-right" style={styles.iconRight}>
          {icon}
        </View>
      );
    }

    return content.length === 1 ? content[0] : (
      <View style={styles.contentContainer}>
        {content}
      </View>
    );
  }, [loading, icon, iconPosition, title, children, textStyle, textColor]);

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}); // React.memo

BaseButton.displayName = 'BaseButton';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // Acessibilidade - tamanho mínimo de toque
  },
  
  fullWidth: {
    width: '100%',
  },
  
  disabled: {
    opacity: 0.6,
  },
  
  text: {
    textAlign: 'center',
  },
  
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  iconLeft: {
    marginRight: 8,
  },
  
  iconRight: {
    marginLeft: 8,
  },
  
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loadingIndicator: {
    marginRight: 8,
  },
  
  loadingText: {
    opacity: 0.8,
  },
});

export default BaseButton;
