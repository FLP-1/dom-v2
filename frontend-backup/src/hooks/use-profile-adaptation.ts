/**
 * @fileoverview Hook personalizado para adaptação de perfil
 * @directory frontend/src/hooks
 * @description Hook para facilitar a adaptação de componentes por perfil
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import { useTheme } from '../utils/theme-provider';
import { getMessage } from '../utils/messages';

// Perfis de usuário suportados: EMPLOYER, EMPLOYEE, FAMILY, PARTNER, SUBORDINATE, ADMIN, OWNER
// Empregadores (mulheres 35-50 anos), Empregados Domésticos (mulheres 30-60 anos)

export function useProfileAdaptation() {
  const { profile, config } = useTheme();
  
  /**
   * Obtém mensagem adaptada ao perfil atual
   */
  const getMessage = (key: string, fallback: string): string => {
    return fallback;
  };
  
  /**
   * Obtém estilo baseado na configuração do perfil
   */
  const getStyle = (baseStyle: React.CSSProperties) => {
    return {
      ...baseStyle,
      fontSize: config.theme.typography.fontSize.medium,
      color: config.theme.colors.text,
    };
  };
  
  /**
   * Verifica se deve mostrar ajuda baseado no perfil
   */
  const shouldShowHelp = (): boolean => {
    return config.content.help !== 'NONE';
  };
  
  /**
   * Verifica se deve mostrar conteúdo detalhado
   */
  const shouldShowDetailedContent = (): boolean => {
    return config.content.detail === 'DETAILED';
  };
  
  /**
   * Verifica se deve mostrar notificações frequentes
   */
  const shouldShowFrequentNotifications = (): boolean => {
    return config.notifications.frequency === 'FREQUENT';
  };
  
  /**
   * Obtém tamanho de fonte baseado na experiência digital
   */
  const getFontSize = (size: 'small' | 'medium' | 'large' | 'xlarge'): number => {
    return config.theme.typography.fontSize[size];
  };
  
  /**
   * Obtém cor primária do tema atual
   */
  const getPrimaryColor = (): string => {
    return config.theme.colors.primary;
  };
  
  /**
   * Obtém espaçamento baseado na densidade do layout
   */
  const getSpacing = (size: 'small' | 'medium' | 'large' | 'xlarge'): number => {
    return config.theme.spacing[size];
  };
  
  /**
   * Verifica se o perfil tem experiência digital avançada
   */
  const isAdvancedUser = (): boolean => {
    return profile.experience === 'ADVANCED';
  };
  
  /**
   * Verifica se o perfil tem tempo limitado
   */
  const hasLimitedTime = (): boolean => {
    return profile.timeAvailable === 'LIMITED';
  };
  
  /**
   * Obtém configuração de navegação baseada no perfil
   */
  const getNavigationConfig = () => {
    return {
      useShortcuts: config.theme.layout.navigation === 'shortcut',
      useLinearNavigation: config.theme.layout.navigation === 'linear',
      useHierarchicalNavigation: config.theme.layout.navigation === 'hierarchical',
    };
  };
  
  /**
   * Obtém configuração de notificações baseada no perfil
   */
  const getNotificationConfig = () => {
    return {
      frequency: config.notifications.frequency,
      type: config.notifications.type,
      detail: config.notifications.detail,
    };
  };
  
  /**
   * Obtém configuração de conteúdo baseada no perfil
   */
  const getContentConfig = () => {
    return {
      language: config.content.language,
      detail: config.content.detail,
      format: config.content.format,
      help: config.content.help,
    };
  };
  
  return {
    // Dados do perfil
    profile,
    config,
    
    // Funções de mensagem
    getMessage,
    
    // Funções de estilo
    getStyle,
    getFontSize,
    getPrimaryColor,
    getSpacing,
    
    // Funções de verificação
    shouldShowHelp,
    shouldShowDetailedContent,
    shouldShowFrequentNotifications,
    isAdvancedUser,
    hasLimitedTime,
    
    // Funções de configuração
    getNavigationConfig,
    getNotificationConfig,
    getContentConfig,
  };
} 