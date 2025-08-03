
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
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
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */

/**
 * @fileoverview Componente Button Reutilizável - DOM v2
 * @directory frontend/src/components/ui
 * @description Botão adaptativo por perfil e dispositivo
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';

/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}

/**
 * Tratamento de erros centralizado
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}

/**
 * Asserções de validação
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 */
function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}

/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error)
 * @param {string} message - Mensagem do log
 * @param {any} data - Dados adicionais
 */
function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}

/**
 * Validação de tipos
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
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
  // Implementar logging, notificação, etc.
}
import { Colors, Typography, Spacing, Borders, Shadows, Icons } from './DesignSystem';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  profile?: 'employer' | 'employee' | 'family' | 'partner' | 'admin';
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: any;
  textStyle?: any;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  profile = 'employer',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const isWeb = Platform.OS === 'web';
  
  // Cores baseadas no perfil
  const profileColors = Colors[profile] || Colors.employer;
  
  // Estilos baseados na variante
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: profileColors.primary,
          borderWidth: 0,
          borderColor: 'transparent',
        };
      case 'secondary':
        return {
          backgroundColor: profileColors.secondary,
          borderWidth: 0,
          borderColor: 'transparent',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: Borders.width.normal,
          borderColor: profileColors.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderColor: 'transparent',
        };
      case 'danger':
        return {
          backgroundColor: Colors.error,
          borderWidth: 0,
          borderColor: 'transparent',
        };
      default:
        return {
          backgroundColor: profileColors.primary,
          borderWidth: 0,
          borderColor: 'transparent',
        };
    }
  };
  
  // Tamanhos baseados no size
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: Spacing.xs,
          paddingHorizontal: Spacing.sm,
          borderRadius: Borders.radius.sm,
          minHeight: 32,
        };
      case 'lg':
        return {
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.lg,
          borderRadius: Borders.radius.lg,
          minHeight: 56,
        };
      default:
        return {
          paddingVertical: Spacing.sm,
          paddingHorizontal: Spacing.md,
          borderRadius: Borders.radius.md,
          minHeight: 44,
        };
    }
  };
  
  // Tipografia baseada no size
  const getTypographyStyles = () => {
    switch (size) {
      case 'sm':
        return {
          fontSize: Typography.sizes.sm,
          fontWeight: Typography.weights.medium,
        };
      case 'lg':
        return {
          fontSize: Typography.sizes.lg,
          fontWeight: Typography.weights.semibold,
        };
      default:
        return {
          fontSize: Typography.sizes.md,
          fontWeight: Typography.weights.medium,
        };
    }
  };
  
  // Cores do texto baseadas na variante
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return Colors.white;
      case 'outline':
        return profileColors.primary;
      case 'ghost':
        return profileColors.primary;
      default:
        return Colors.white;
    }
  };
  
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const typography = getTypographyStyles();
  const textColor = getTextColor();
  
  const isDisabled = disabled || loading;
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        variantStyles,
        sizeStyles,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size={size === 'sm' ? 'small' : 'small'}
          color={textColor}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Text style={[styles.icon, { color: textColor, marginRight: Spacing.xs }]}>
              {Icons.getIcon(icon, typography.fontSize, textColor)}
            </Text>
          )}
          
          <Text
            style={[
              styles.text,
              typography,
              { color: textColor },
              textStyle,
            ]}
          >
            {title}
          </Text>
          
          {icon && iconPosition === 'right' && (
            <Text style={[styles.icon, { color: textColor, marginLeft: Spacing.xs }]}>
              {Icons.getIcon(icon, typography.fontSize, textColor)}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontFamily: Typography.families.primary,
  },
  icon: {
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button; 

/**
 * 
/**
 * Alternativas consideradas:
 * - Alternativa A: Descrição e motivo da rejeição
 * - Alternativa B: Descrição e motivo da rejeição
 * - Solução escolhida: Justificativa da escolha atual
 */
Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
 */