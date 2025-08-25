/**
 * @fileoverview Style Types - Tipos para estilização
 * @version 2.0.0
 * @generated 2025-01-27T11:20:00.000Z
 */

export interface SpacingProps {
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export interface ColorProps {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

export interface TypographyProps {
  fontSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  fontFamily?: 'primary' | 'secondary' | 'mono';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
}

export interface BorderProps {
  borderWidth?: number;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  borderStyle?: 'solid' | 'dashed' | 'dotted';
}

export interface ShadowProps {
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  elevation?: number; // Para React Native
}
