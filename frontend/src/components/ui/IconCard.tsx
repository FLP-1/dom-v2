/**
 * @fileoverview IconCard Component - DOM v2
 * @created 2025-01-23
 * @lastModified 2025-01-23
 * @author DOM Team v2
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../../styles/design-tokens';

export interface IconCardProps {
  icon: string;
  title: string;
  description?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  badge?: string;
  badgeColor?: string;
  loading?: boolean;
  style?: any;
  iconStyle?: any;
  titleStyle?: any;
  descriptionStyle?: any;
}

export const IconCard: React.FC<IconCardProps> = ({
  icon,
  title,
  description,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  badge,
  badgeColor,
  loading = false,
  style,
  iconStyle,
  titleStyle,
  descriptionStyle
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: Colors.primary,
          borderColor: Colors.primary,
          iconColor: Colors.text.inverse,
          titleColor: Colors.text.inverse,
          descriptionColor: Colors.text.inverse
        };
      case 'secondary':
        return {
          backgroundColor: Colors.secondary,
          borderColor: Colors.secondary,
          iconColor: Colors.text.inverse,
          titleColor: Colors.text.inverse,
          descriptionColor: Colors.text.inverse
        };
      case 'success':
        return {
          backgroundColor: Colors.success,
          borderColor: Colors.success,
          iconColor: Colors.text.inverse,
          titleColor: Colors.text.inverse,
          descriptionColor: Colors.text.inverse
        };
      case 'warning':
        return {
          backgroundColor: Colors.warning,
          borderColor: Colors.warning,
          iconColor: Colors.text.inverse,
          titleColor: Colors.text.inverse,
          descriptionColor: Colors.text.inverse
        };
      case 'error':
        return {
          backgroundColor: Colors.error,
          borderColor: Colors.error,
          iconColor: Colors.text.inverse,
          titleColor: Colors.text.inverse,
          descriptionColor: Colors.text.inverse
        };
      case 'info':
        return {
          backgroundColor: Colors.info,
          borderColor: Colors.info,
          iconColor: Colors.text.inverse,
          titleColor: Colors.text.inverse,
          descriptionColor: Colors.text.inverse
        };
      default:
        return {
          backgroundColor: Colors.background.secondary,
          borderColor: Colors.border.medium,
          iconColor: Colors.text.primary,
          titleColor: Colors.text.primary,
          descriptionColor: Colors.text.secondary
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: Spacing.sm,
          iconSize: 24,
          titleSize: Typography.bodySmall.fontSize,
          descriptionSize: Typography.caption.fontSize,
          minHeight: 80
        };
      case 'large':
        return {
          padding: Spacing.lg,
          iconSize: 48,
          titleSize: Typography.h4.fontSize,
          descriptionSize: Typography.body.fontSize,
          minHeight: 140
        };
      default: // medium
        return {
          padding: Spacing.md,
          iconSize: 32,
          titleSize: Typography.h6.fontSize,
          descriptionSize: Typography.bodySmall.fontSize,
          minHeight: 100
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const cardStyles = [
    styles.card,
    {
      backgroundColor: variantStyles.backgroundColor,
      borderColor: variantStyles.borderColor,
      padding: sizeStyles.padding,
      minHeight: sizeStyles.minHeight,
      opacity: disabled ? 0.6 : 1
    },
    style
  ];

  const iconStyles = [
    styles.icon,
    {
      fontSize: sizeStyles.iconSize,
      color: variantStyles.iconColor
    },
    iconStyle
  ];

  const titleStyles = [
    styles.title,
    {
      fontSize: sizeStyles.titleSize,
      color: variantStyles.titleColor
    },
    titleStyle
  ];

  const descriptionStyles = [
    styles.description,
    {
      fontSize: sizeStyles.descriptionSize,
      color: variantStyles.descriptionColor
    },
    descriptionStyle
  ];

  return (
    <TouchableOpacity
      style={cardStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={iconStyles}>{icon}</Text>
          {badge && (
            <View style={[
              styles.badge,
              { backgroundColor: badgeColor || Colors.error }
            ]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={titleStyles} numberOfLines={2}>
            {title}
          </Text>
          {description && (
            <Text style={descriptionStyles} numberOfLines={3}>
              {description}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: Spacing.xs,
    flex: 1,
    minWidth: 120,
    maxWidth: 200
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    position: 'relative',
    marginBottom: Spacing.sm
  },
  icon: {
    textAlign: 'center'
  },
  textContainer: {
    alignItems: 'center',
    flex: 1
  },
  title: {
    fontWeight: Typography.h6.fontWeight,
    textAlign: 'center',
    marginBottom: Spacing.xs
  },
  description: {
    textAlign: 'center',
    lineHeight: Typography.bodySmall.lineHeight
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeText: {
    color: Colors.text.inverse,
    fontSize: 10,
    fontWeight: 'bold'
  }
});

export default IconCard;
