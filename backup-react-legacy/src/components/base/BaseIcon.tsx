/**
 * @fileoverview BaseIcon - Sistema de ícones padronizado
 * @version 2.0.0
 * @generated 2025-01-27T11:35:00.000Z
 */

import React, { memo, useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { BaseComponentProps, AccessibilityProps, ThemeProps } from './types/ComponentProps';
import { useTheme } from './utils/theme';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';

// Biblioteca de ícones em emoji/Unicode
export const ICON_LIBRARY = {
  // Navegação
  home: '🏠',
  back: '←',
  forward: '→',
  up: '↑',
  down: '↓',
  menu: '☰',
  close: '✕',
  
  // Ações
  add: '+',
  remove: '−',
  edit: '✏️',
  delete: '🗑️',
  save: '💾',
  copy: '📋',
  paste: '📄',
  cut: '✂️',
  
  // Status
  check: '✓',
  error: '✕',
  warning: '⚠️',
  info: 'ℹ️',
  success: '✅',
  
  // Comunicação
  message: '💬',
  email: '📧',
  phone: '📞',
  notification: '🔔',
  chat: '💭',
  
  // Usuário
  user: '👤',
  users: '👥',
  profile: '👤',
  settings: '⚙️',
  logout: '🚪',
  
  // Família
  family: '👨‍👩‍👧‍👦',
  child: '👶',
  adult: '👤',
  elderly: '👴',
  
  // Tarefas domésticas
  cleaning: '🧹',
  cooking: '🍳',
  laundry: '👕',
  dishes: '🍽️',
  shopping: '🛒',
  garden: '🌱',
  
  // Gamificação
  star: '⭐',
  trophy: '🏆',
  medal: '🏅',
  crown: '👑',
  fire: '🔥',
  diamond: '💎',
  
  // Tempo
  clock: '🕐',
  calendar: '📅',
  timer: '⏱️',
  alarm: '⏰',
  
  // Mídia
  play: '▶️',
  pause: '⏸️',
  stop: '⏹️',
  record: '⏺️',
  volume: '🔊',
  
  // Arquivos
  file: '📄',
  folder: '📁',
  image: '🖼️',
  video: '🎥',
  audio: '🎵',
  
  // Sistema
  search: '🔍',
  filter: '🔽',
  sort: '↕️',
  refresh: '🔄',
  sync: '🔁',
  download: '⬇️',
  upload: '⬆️',
  
  // Estados
  loading: '⏳',
  offline: '📴',
  online: '🟢',
  error_circle: '❌',
  
  // Setas direcionais
  arrow_left: '←',
  arrow_right: '→',
  arrow_up: '↑',
  arrow_down: '↓',
  chevron_left: '‹',
  chevron_right: '›',
  chevron_up: '⌃',
  chevron_down: '⌄',
  
  // Financeiro
  money: '💰',
  card: '💳',
  bank: '🏦',
  chart: '📊',
  
  // Localização
  location: '📍',
  map: '🗺️',
  gps: '🧭',
  
  // Segurança
  lock: '🔒',
  unlock: '🔓',
  key: '🔑',
  shield: '🛡️',
  
  // Outros
  heart: '❤️',
  like: '👍',
  dislike: '👎',
  bookmark: '🔖',
  flag: '🚩',
  question: '❓',
  exclamation: '❗',
} as const;

export type IconName = keyof typeof ICON_LIBRARY;

export interface BaseIconProps extends BaseComponentProps, AccessibilityProps, ThemeProps {
  name?: IconName;
  icon?: string | React.ReactNode;
  color?: string;
  rotate?: number;
  flip?: 'horizontal' | 'vertical' | 'both';
  spin?: boolean;
  pulse?: boolean;
  bounce?: boolean;
  shake?: boolean;
}

export const BaseIcon: React.FC<BaseIconProps> = memo(({
  name,
  icon,
  size = 'md',
  color,
  rotate = 0,
  flip,
  spin = false,
  pulse = false,
  bounce = false,
  shake = false,
  style,
  accessibilityLabel,
  ...props
}) => {
  const theme = useTheme();
  const performanceData = usePerformanceMonitor('BaseIcon');

  // Get icon content
  const iconContent = useMemo(() => {
    if (icon) {
      return typeof icon === 'string' ? icon : icon;
    }
    if (name && ICON_LIBRARY[name]) {
      return ICON_LIBRARY[name];
    }
    return '❓'; // Default fallback icon
  }, [icon, name]);

  // Size styles
  const sizeStyles = useMemo(() => {
    switch (size) {
      case 'xs':
        return {
          fontSize: 12,
          width: 16,
          height: 16,
        };
      case 'sm':
        return {
          fontSize: 14,
          width: 20,
          height: 20,
        };
      case 'md':
        return {
          fontSize: 16,
          width: 24,
          height: 24,
        };
      case 'lg':
        return {
          fontSize: 20,
          width: 28,
          height: 28,
        };
      case 'xl':
        return {
          fontSize: 24,
          width: 32,
          height: 32,
        };
      default:
        return {
          fontSize: 16,
          width: 24,
          height: 24,
        };
    }
  }, [size]);

  // Transform styles
  const transformStyles = useMemo(() => {
    const transforms = [];

    if (rotate !== 0) {
      transforms.push({ rotate: `${rotate}deg` });
    }

    if (flip) {
      switch (flip) {
        case 'horizontal':
          transforms.push({ scaleX: -1 });
          break;
        case 'vertical':
          transforms.push({ scaleY: -1 });
          break;
        case 'both':
          transforms.push({ scaleX: -1 }, { scaleY: -1 });
          break;
      }
    }

    return transforms.length > 0 ? { transform: transforms } : { /* TODO: Implement error handling */ } ;
  }, [rotate, flip]);

  // Animation styles (simplified for React Native)
  const animationStyles = useMemo(() => {
    const styles: unknown = { /* TODO: Implement error handling */ } ;
    
    // Note: Complex animations would need Animated API
    if (spin || pulse || bounce || shake) {
      // These would be implemented with Animated.Value in a real scenario
      // For now, just marking them as animated
      styles.opacity = 1; // Placeholder
    }

    return styles;
  }, [spin, pulse, bounce, shake]);

  // Container styles
  const containerStyle = useMemo(() => [
    styles.container,
    {
      width: sizeStyles.width,
      height: sizeStyles.height,
      ...transformStyles,
      ...animationStyles,
    },
    style,
  ], [sizeStyles, transformStyles, animationStyles, style]);

  // Text styles
  const textStyle = useMemo(() => [
    styles.icon,
    {
      fontSize: sizeStyles.fontSize,
      color: color || theme.colors.text,
      lineHeight: sizeStyles.fontSize * 1.2,
    },
  ], [sizeStyles.fontSize, color, theme.colors.text]);

  // If icon is a React element, render it directly
  if (React.isValidElement(iconContent)) {
    return (
      <View 
        style={containerStyle}
        accessibilityLabel={accessibilityLabel || (name && `Ícone ${name}`)}
        accessibilityRole="image"
        {...props}
      >
        {iconContent}
      </View>
    );
  }

  // Render text/emoji icon
  return (
    <View 
      style={containerStyle}
      accessibilityLabel={accessibilityLabel || (name && `Ícone ${name}`)}
      accessibilityRole="image"
      {...props}
    >
      <Text style={textStyle}>
        {iconContent}
      </Text>
    </View>
  );
});

BaseIcon.displayName = 'BaseIcon';

// Helper component for common icon combinations
export const IconWithBadge: React.FC<BaseIconProps & { badge?: string | number; badgeColor?: string }> = memo(({
  badge,
  badgeColor,
  ...iconProps
}) => {
  const theme = useTheme();

  return (
    <View style={styles.iconWithBadge}>
      <BaseIcon {...iconProps} />
      {badge && (
        <View style={[
          styles.badge,
          { backgroundColor: badgeColor || theme.colors.error }
        ]}>
          <Text style={[styles.badgeText, { color: '#FFFFFF' }]}>
            {badge}
          </Text>
        </View>
      )}
    </View>
  );
});

IconWithBadge.displayName = 'IconWithBadge';

// Icon button component
export const IconButton: React.FC<BaseIconProps & { onPress?: () => void; disabled?: boolean }> = memo(({
  onPress,
  disabled = false,
  ...iconProps
}) => {
  const theme = useTheme();

  if (!onPress) {
    return <BaseIcon {...iconProps} />;
  }

  return (
    <View style={[
      styles.iconButton,
      { backgroundColor: disabled ? theme.colors.disabled : 'transparent' },
      disabled && styles.disabledButton,
    ]}>
      <BaseIcon {...iconProps} color={disabled ? theme.colors.textSecondary : iconProps.color} />
    </View>
  );
});

IconButton.displayName = 'IconButton';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  icon: {
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  
  iconWithBadge: {
    position: 'relative',
  },
  
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 12,
  },
  
  iconButton: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
  },
  
  disabledButton: {
    opacity: 0.5,
  },
});

export default BaseIcon;
