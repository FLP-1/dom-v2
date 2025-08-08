
/**
 * 
 * @alternatives
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 */


/**
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 */


/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Componente React/React Native
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









import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}


function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}


function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}


function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}


function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}:`, error.message);
}
import { Colors, Typography, Spacing, Borders, Shadows, Icons, Animations } from './DesignSystem';

interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  profile?: 'employer' | 'employee' | 'family' | 'partner' | 'admin';
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  disabled?: boolean;
  style?: any;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  onPress,
  variant = 'default',
  size = 'md',
  profile = 'employer',
  icon,
  iconColor,
  iconSize = 24,
  disabled = false,
  style,
}) => {
  const isWeb = Platform.OS === 'web';
  
  // Cores baseadas no perfil
  const profileColors = Colors[profile] || Colors.employer;
  
  // Estilos baseados na variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          ...Shadows.md,
          backgroundColor: Colors.white,
        };
      case 'outlined':
        return {
          borderWidth: Borders.width.normal,
          borderColor: profileColors.primary,
          backgroundColor: Colors.white,
        };
      case 'filled':
        return {
          backgroundColor: profileColors.primary + '10', // 10% opacity
          borderWidth: Borders.width.thin,
          borderColor: profileColors.primary + '20',
        };
      default:
        return {
          backgroundColor: Colors.white,
          ...Shadows.sm,
        };
    }
  };
  
  // Tamanhos baseados no size
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: Spacing.sm,
          borderRadius: Borders.radius.sm,
        };
      case 'lg':
        return {
          padding: Spacing.lg,
          borderRadius: Borders.radius.lg,
        };
      default:
        return {
          padding: Spacing.md,
          borderRadius: Borders.radius.md,
        };
    }
  };
  
  // Tipografia baseada no perfil
  const getTypographyStyles = () => {
    const baseSize = Typography.sizes[size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'];
    
    return {
      title: {
        fontSize: baseSize + 2,
        fontWeight: Typography.weights.semibold,
        color: profileColors.primary,
        fontFamily: Typography.families.primary,
      },
      subtitle: {
        fontSize: baseSize - 2,
        fontWeight: Typography.weights.normal,
        color: Colors.gray[600],
        fontFamily: Typography.families.secondary,
      },
    };
  };
  
  const typography = getTypographyStyles();
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  
  const CardContainer = onPress ? TouchableOpacity : View;
  
  return (
    <CardContainer
      style={[
        styles.container,
        variantStyles,
        sizeStyles,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {(title || icon) && (
        <View style={styles.header}>
          {icon && (
            <View style={styles.iconContainer}>
              {Icons.getIcon(icon, iconSize, iconColor || profileColors.primary)}
            </View>
          )}
          <View style={styles.titleContainer}>
            {title && (
              <Text style={[styles.title, typography.title]}>
                {title}
              </Text>
            )}
            {subtitle && (
              <Text style={[styles.subtitle, typography.subtitle]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      )}
      
      {children && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
    marginHorizontal: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    marginRight: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    marginBottom: Spacing.xs / 2,
  },
  subtitle: {
    lineHeight: Typography.sizes.sm * 1.4,
  },
  content: {
    flex: 1,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Card; 


 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */