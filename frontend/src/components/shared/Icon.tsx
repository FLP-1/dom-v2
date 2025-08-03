import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 24, color = '#000' }: IconProps) {
  // Mapeamento simples de ícones para emojis/unicode
  const iconMap: { [key: string]: string } = {
    'shield': '🛡️',
    'home': '🏠',
    'check-square': '✅',
    'users': '👥',
    'shopping-cart': '🛒',
    'credit-card': '💳',
    'bell': '🔔',
    'menu': '☰',
    'pie-chart': '📊',
    'file-text': '📄',
    'layers': '📚',
    'check-circle': '✅',
    'clock': '⏰',
    'calendar': '📅',
    'check': '✓',
    'eye': '👁️',
    'code': '💻',
    'x': '✕',
    'shield-alert': '⚠️',
    'truck': '🚚',
    'gift': '🎁',
    'user': '👤',
    'utensils': '🍽️',
    'leaf': '🍃',
    'droplet': '💧',
    'star': '⭐',
    'alert-circle': '⚠️',
    'lock': '🔒',
    'shopping-bag': '🛍️',
    'settings': '⚙️',
    'archive': '📦',
    'more-vertical': '⋮',
    'moon': '🌙',
    'toggle-right': '▶️',
    'plus': '➕',
    'user-plus': '👤➕',
    'trending-up': '📈',
    'shield-check': '🛡️✓',
    'tag': '🏷️',
    'filter': '🔍',
    'broom': '🧹',
    'tshirt': '👕',
    'chat': '💬',
    'message-circle': '💬',
    'dollar-sign': '💰',
    'edit': '✏️',
    'download': '⬇️',
    'share': '📤',
    'repeat': '🔄',
    'bar-chart': '📊',
    'star': '⭐',
    'check-circle': '✅',
    'alert-triangle': '⚠️',
    'archive': '📦',
    'shield-alert': '⚠️',
    'check-square': '✅',
    'lock': '🔒',
  };

  const iconChar = iconMap[name] || '❓';

  return (
    <Text style={[styles.icon, { fontSize: size, color }]}>
      {iconChar}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
}); 