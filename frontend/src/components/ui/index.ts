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

// Componente Table
export { default as Table } from './Table';
export type { 
  TableProps, 
  TableColumn, 
  TableRowProps, 
  TableHeaderProps 
} from './Table';

// Componente Modal
export { 
  default as Modal, 
  ModalHeader, 
  ModalFooter 
} from './Modal';
export type { 
  ModalProps, 
  ModalHeaderProps, 
  ModalFooterProps 
} from './Modal';

// Componente CPFCNPJInput
export { default as CPFCNPJInput } from './CPFCNPJInput';
export type { CPFCNPJInputProps } from './CPFCNPJInput';

// Componente CEPInput
export { default as CEPInput } from './CEPInput';
export type { CEPInputProps, Address } from './CEPInput';

// Componente Chart
export { 
  default as Chart, 
  BarChart, 
  PieChart 
} from './Chart';
export type { 
  ChartProps, 
  ChartData, 
  BarChartProps, 
  PieChartProps 
} from './Chart';

// Componente Toast
export { default as Toast } from './Toast';
export type { 
  ToastProps, 
  ToastType, 
  ToastSize, 
  ToastPosition 
} from './Toast';

// Re-exportar todos os componentes
export * from './Button';
export * from './Input';
export * from './Card';
export * from './Table';
export * from './Modal';
export * from './CPFCNPJInput';
export * from './CEPInput';
export * from './Chart';
export * from './Toast'; 