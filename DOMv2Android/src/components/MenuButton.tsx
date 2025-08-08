/**
 * @created 2025-01-23
 * @lastModified 2025-01-23
 * @author DOM Team v2
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../styles/design-tokens';

interface MenuButtonProps {
  onPress: () => void;
  badge?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'floating';
  disabled?: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  onPress,
  badge,
  size = 'medium',
  variant = 'primary',
  disabled = false
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: 40,
          height: 40,
          fontSize: 16,
        };
      case 'large':
        return {
          width: 56,
          height: 56,
          fontSize: 24,
        };
      default:
        return {
          width: 48,
          height: 48,
          fontSize: 20,
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: Colors.background.secondary,
          borderColor: Colors.border.medium,
          borderWidth: 1,
        };
      case 'floating':
        return {
          backgroundColor: Colors.primary,
          ...Shadows.large,
        };
      default:
        return {
          backgroundColor: Colors.primary,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          sizeStyles,
          variantStyles,
          disabled && styles.disabled
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.icon,
          { fontSize: sizeStyles.fontSize },
          variant === 'secondary' ? styles.iconSecondary : styles.iconPrimary
        ]}>
        </Text>
      </TouchableOpacity>
      
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    fontWeight: 'bold',
  },
  iconPrimary: {
    color: Colors.text.white,
  },
  iconSecondary: {
    color: Colors.text.primary,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  badgeText: {
    ...Typography.small,
    color: Colors.text.white,
    fontWeight: 'bold',
  },
});

export default MenuButton;