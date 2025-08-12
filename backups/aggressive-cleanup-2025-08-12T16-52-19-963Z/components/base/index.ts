/**
 * @fileoverview Base Components Library - Index principal
 * @version 2.0.0
 * @generated 2025-01-27T11:20:00.000Z
 */

// Componentes Base
export { BaseScreen, type BaseScreenProps } from './BaseScreen';
export { BaseForm, type BaseFormProps } from './BaseForm';
export { BaseCard, type BaseCardProps } from './BaseCard';
export { BaseButton, type BaseButtonProps } from './BaseButton';
export { BaseModal, type BaseModalProps } from './BaseModal';
export { BaseInput, type BaseInputProps, type ValidationRule } from './BaseInput';
export { BaseTable, type TableProps, type TableColumn } from './BaseTable';
export { BaseNavigation, type BaseNavigationProps, type NavigationItem } from './BaseNavigation';
export { BaseTabs, type BaseTabsProps, type TabItem } from './BaseTabs';
export { BaseIcon, IconWithBadge, IconButton, ICON_LIBRARY, type BaseIconProps, type IconName } from './BaseIcon';

// Componentes de Performance
export { VirtualizedList, type VirtualizedListProps } from './VirtualizedList';
export { LazyComponent, type LazyComponentProps, withLazyLoading, useLazyComponent } from './LazyComponent';

// Componentes de Tema
export { ThemeSelector, type ThemeSelectorProps } from './ThemeSelector';
export { ThemeCustomizer, type ThemeCustomizerProps } from './ThemeCustomizer';

// Hook personalizado para componentes base
export const useBaseComponent = () => {
  return {
    // Utilitários compartilhados
  };
};
