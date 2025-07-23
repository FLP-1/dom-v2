/**
 * @fileoverview Índice de componentes UI reutilizáveis para o DOM v2
 * @description Exporta todos os componentes da biblioteca de UI
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */

// Componente Button
export { default as Button, ButtonVariant, ButtonSize } from './Button';
export type { ButtonProps } from './Button';

// Componente Input
export { default as Input, InputType, InputState, InputSize } from './Input';
export type { InputProps } from './Input';

// Componente Card
export { 
  default as Card, 
  CardVariant, 
  CardSize,
  CardHeader,
  CardContent,
  CardFooter
} from './Card';
export type { 
  CardProps, 
  CardHeaderProps, 
  CardContentProps, 
  CardFooterProps 
} from './Card';

// Re-exportar todos os componentes
export * from './Button';
export * from './Input';
export * from './Card'; 