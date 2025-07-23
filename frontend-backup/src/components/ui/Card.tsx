/**
 * @fileoverview Componente Card reutilizável para o DOM v2
 * @description Card padronizado com diferentes variantes e layouts
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity
} from 'react-native';
import { getValue } from '../../utils/config';

// Tipos de card
export enum CardVariant {
  DEFAULT = 'default',
  ELEVATED = 'elevated',
  OUTLINED = 'outlined',
  FLAT = 'flat'
}

// Tamanhos de card
export enum CardSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

// Interface do componente
export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  onPress?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  contentStyle?: ViewStyle;
  testID?: string;
}

// Estilos dos cards
const cardStyles = {
  [CardVariant.DEFAULT]: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E1E5E9',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  [CardVariant.ELEVATED]: {
    backgroundColor: '#FFFFFF',
    borderColor: 'transparent',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8
  },
  [CardVariant.OUTLINED]: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E1E5E9',
    borderWidth: 2,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  },
  [CardVariant.FLAT]: {
    backgroundColor: '#F8F9FA',
    borderColor: 'transparent',
    borderWidth: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0
  }
};

// Tamanhos dos cards
const cardSizes = {
  [CardSize.SMALL]: {
    padding: 12,
    borderRadius: 6,
    titleFontSize: 16,
    subtitleFontSize: 14
  },
  [CardSize.MEDIUM]: {
    padding: 16,
    borderRadius: 8,
    titleFontSize: 18,
    subtitleFontSize: 16
  },
  [CardSize.LARGE]: {
    padding: 24,
    borderRadius: 12,
    titleFontSize: 20,
    subtitleFontSize: 18
  }
};

// Componente Card
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  variant = CardVariant.DEFAULT,
  size = CardSize.MEDIUM,
  onPress,
  disabled = false,
  fullWidth = false,
  style,
  titleStyle,
  subtitleStyle,
  contentStyle,
  testID
}) => {
  const cardStyle = cardStyles[variant];
  const sizeStyle = cardSizes[size];
  const animationDuration = getValue('ui.animation.duration') || 300;

  const containerStyle: ViewStyle = {
    width: fullWidth ? '100%' : 'auto',
    borderRadius: sizeStyle.borderRadius,
    padding: sizeStyle.padding,
    opacity: disabled ? 0.6 : 1,
    ...cardStyle,
    ...style
  };

  const titleStyleFinal: TextStyle = {
    fontSize: sizeStyle.titleFontSize,
    fontWeight: '600',
    color: '#212529',
    marginBottom: subtitle ? 4 : 8,
    ...titleStyle
  };

  const subtitleStyleFinal: TextStyle = {
    fontSize: sizeStyle.subtitleFontSize,
    fontWeight: '400',
    color: '#6C757D',
    marginBottom: 12,
    ...subtitleStyle
  };

  const contentStyleFinal: ViewStyle = {
    ...contentStyle
  };

  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      testID={testID}
    >
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && (
            <Text style={titleStyleFinal} numberOfLines={2}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={subtitleStyleFinal} numberOfLines={3}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
      
      <View style={contentStyleFinal}>
        {children}
      </View>
    </CardContainer>
  );
};

// Componente CardHeader
export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: CardSize;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  size = CardSize.MEDIUM,
  style,
  titleStyle,
  subtitleStyle
}) => {
  const sizeStyle = cardSizes[size];

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    ...style
  };

  const titleStyleFinal: TextStyle = {
    fontSize: sizeStyle.titleFontSize,
    fontWeight: '600',
    color: '#212529',
    flex: 1,
    ...titleStyle
  };

  const subtitleStyleFinal: TextStyle = {
    fontSize: sizeStyle.subtitleFontSize,
    fontWeight: '400',
    color: '#6C757D',
    marginTop: 2,
    ...subtitleStyle
  };

  return (
    <View style={headerStyle}>
      {leftIcon && (
        <View style={styles.iconContainer}>
          {leftIcon}
        </View>
      )}
      
      <View style={styles.headerContent}>
        <Text style={titleStyleFinal} numberOfLines={2}>
          {title}
        </Text>
        {subtitle && (
          <Text style={subtitleStyleFinal} numberOfLines={3}>
            {subtitle}
          </Text>
        )}
      </View>
      
      {rightIcon && (
        <View style={styles.iconContainer}>
          {rightIcon}
        </View>
      )}
    </View>
  );
};

// Componente CardContent
export interface CardContentProps {
  children: React.ReactNode;
  padding?: number;
  style?: ViewStyle;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  padding,
  style
}) => {
  const contentStyle: ViewStyle = {
    padding: padding,
    ...style
  };

  return (
    <View style={contentStyle}>
      {children}
    </View>
  );
};

// Componente CardFooter
export interface CardFooterProps {
  children: React.ReactNode;
  padding?: number;
  style?: ViewStyle;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  padding,
  style
}) => {
  const footerStyle: ViewStyle = {
    padding: padding,
    borderTopWidth: 1,
    borderTopColor: '#E1E5E9',
    marginTop: 16,
    paddingTop: 16,
    ...style
  };

  return (
    <View style={footerStyle}>
      {children}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  header: {
    marginBottom: 8
  },
  headerContent: {
    flex: 1,
    marginLeft: 8
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Card; 