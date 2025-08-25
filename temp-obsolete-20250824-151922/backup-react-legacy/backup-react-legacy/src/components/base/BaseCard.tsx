/**
 * @fileoverview BaseCard - Componente card base
 * @version 2.0.0
 * @generated 2025-01-27T11:20:00.000Z
 */

import React, { memo, useMemo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useUserProfile } from '../../hooks/useUserProfile.ts';

export interface BaseCardProps {
  children?: React.ReactNode;
  onPress?: () => void;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  bordered?: boolean;
  hoverable?: boolean;
  style?: object;
  accessibilityLabel?: string;
  accessibilityRole?: string;
}

export const BaseCard: React.FC<BaseCardProps> = memo(({
  children,
  onPress,
  shadow = 'md',
  padding = 'md',
  margin = 'none',
  bordered = false,
  style,
  accessibilityLabel,
  accessibilityRole = 'button',
  ...props
}) => {
  const { currentTheme } = useUserProfile();

  const paddingValue = useMemo(() => {
    switch (padding) {
      case 'none': return 0;
      case 'sm': return 8;
      case 'md': return 16;
      case 'lg': return 24;
      case 'xl': return 32;
      default: return 16;
    }
  }, [padding]);

  const marginValue = useMemo(() => {
    switch (margin) {
      case 'none': return 0;
      case 'sm': return 8;
      case 'md': return 16;
      case 'lg': return 24;
      case 'xl': return 32;
      default: return 0;
    }
  }, [margin]);

  const shadowStyle = useMemo(() => {
    if (shadow === 'none') return { /* TODO: Implement error handling */ } ;
    return {
      shadowColor: currentTheme === 'dark' ? '#000' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: currentTheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    };
  }, [shadow, currentTheme]);

  const cardStyle = useMemo(() => [
    styles.card,
    {
      backgroundColor: currentTheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
      borderRadius: 12,
      padding: paddingValue,
      margin: marginValue,
      ...shadowStyle,
    },
    bordered && {
      borderWidth: 1,
      borderColor: currentTheme === 'dark' ? '#38383A' : '#E5E5EA',
    },
    style,
  ], [currentTheme, paddingValue, marginValue, shadowStyle, bordered, style]);

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={handlePress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View 
      style={cardStyle}
      accessibilityLabel={accessibilityLabel}
      {...props}
    >
      {children}
    </View>
  );
}); // React.memo

BaseCard.displayName = 'BaseCard';

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});

export default BaseCard;
