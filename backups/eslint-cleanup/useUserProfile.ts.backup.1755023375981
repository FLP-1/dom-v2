import { useState, useEffect, useMemo } from 'react';
import { 
  UserProfile, 
  ProfileFeatures,
  getUserProfileConfig,
  hasFeatureAccess,
  hasPermission,
  getDashboardCards,
  getNavigationSections,
  getUIConfig,
  updateUserTheme,
  getUserTheme,
  getSystemTheme,
  getCurrentTheme,
  FEATURE_ICONS,
  FEATURE_TITLES,
  FEATURE_DESCRIPTIONS
} from '../utils/userProfileConfig.ts';

export const useUserProfile = (initialProfile: UserProfile = 'guest') => {
  // Estado do perfil atual
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(initialProfile);
  const [profileLoading, setProfileLoading] = useState(false);

  // Configuração do perfil atual
  const profileConfig = useMemo(() => {
    return getUserProfileConfig(currentProfile);
  }, [currentProfile]);

  // Cards do dashboard baseados no perfil
  const dashboardCards = useMemo(() => {
    const cards = getDashboardCards(currentProfile);
    return cards.map(cardId => ({
      id: cardId,
      title: FEATURE_TITLES[cardId] || cardId,
      description: FEATURE_DESCRIPTIONS[cardId] || '',
      icon: FEATURE_ICONS[cardId] || '📱',
      enabled: hasFeatureAccess(currentProfile, cardId as keyof ProfileFeatures['features'])
    })).filter(card => card.enabled);
  }, [currentProfile]);

  // Seções de navegação baseadas no perfil
  const navigationSections = useMemo(() => {
    const sections = getNavigationSections(currentProfile);
    return sections.map(sectionId => ({
      id: sectionId,
      title: FEATURE_TITLES[sectionId] || sectionId,
      icon: FEATURE_ICONS[sectionId] || '📱',
      enabled: hasFeatureAccess(currentProfile, sectionId as keyof ProfileFeatures['features']),
      order: sections.indexOf(sectionId)
    })).filter(section => section.enabled);
  }, [currentProfile]);

  // Configurações de UI
  const uiConfig = useMemo(() => {
    return getUIConfig(currentProfile);
  }, [currentProfile]);

  // Verificar acesso a funcionalidade
  const checkFeatureAccess = useCallback((feature: keyof ProfileFeatures['features']) => {
    return hasFeatureAccess(currentProfile, feature);
  }, [currentProfile]);

  // Verificar permissão
  const checkPermission = useCallback((permission: keyof ProfileFeatures['permissions']) => {
    return hasPermission(currentProfile, permission);
  }, [currentProfile]);

  // Alterar perfil
  const changeProfile = useCallback(async (newProfile: UserProfile) => {
    setProfileLoading(true);
    
    try {
      // Simular delay de carregamento (em produção, seria uma chamada de API)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCurrentProfile(newProfile);
      
      // Salvar no localStorage para persistência
      localStorage.setItem('dom_user_profile', newProfile);
      
      return true;
    } catch (error) {
      console.error('Erro ao alterar perfil:', error);
      return false;
    } finally {
      setProfileLoading(false);
    }
  }, []);

  // Carregar perfil do localStorage na inicialização
  useEffect(() => {
    const savedProfile = localStorage.getItem('dom_user_profile') as UserProfile;
    if (savedProfile && savedProfile !== currentProfile) {
      setCurrentProfile(savedProfile);
    }
  }, []);

  // Gerenciamento de tema
  const currentTheme = useMemo(() => {
    return getCurrentTheme(currentProfile);
  }, [currentProfile]);

  const userTheme = useMemo(() => {
    return getUserTheme(currentProfile);
  }, [currentProfile]);

  const systemTheme = useMemo(() => {
    return getSystemTheme();
  }, []);

  const updateTheme = useCallback(async (theme: 'light' | 'dark' | 'auto') => {
    try {
      updateUserTheme(currentProfile, theme);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar tema:', error);
      return false;
    }
  }, [currentProfile]);

  // Estatísticas do perfil
  const profileStats = useMemo(() => {
    const totalFeatures = Object.keys(profileConfig.features).length;
    const enabledFeatures = Object.values(profileConfig.features).filter(Boolean).length;
    const totalPermissions = Object.keys(profileConfig.permissions).length;
    const enabledPermissions = Object.values(profileConfig.permissions).filter(Boolean).length;

    return {
      totalFeatures,
      enabledFeatures,
      featureAccessPercentage: Math.round((enabledFeatures / totalFeatures) * 100),
      totalPermissions,
      enabledPermissions,
      permissionAccessPercentage: Math.round((enabledPermissions / totalPermissions) * 100),
      dashboardCardsCount: dashboardCards.length,
      navigationSectionsCount: navigationSections.length
    };
  }, [profileConfig, dashboardCards.length, navigationSections.length]);

  // Perfil formatado para exibição
  const profileDisplay = useMemo(() => {
    const profileNames: Record<UserProfile, string> = {
      employer: 'Empregador',
      employee: 'Empregado',
      family: 'Familiar',
      admin: 'Administrador',
      partner: 'Parceiro',
      supplier: 'Fornecedor',
      guest: 'Visitante'
    };

    const profileDescriptions: Record<UserProfile, string> = {
      employer: 'Controle total da gestão doméstica',
      employee: 'Foco em tarefas e ponto eletrônico',
      family: 'Visão familiar e orçamento doméstico',
      admin: 'Administração completa do sistema',
      partner: 'Acesso compartilhado ao sistema',
      supplier: 'Gestão de fornecedores e serviços',
      guest: 'Acesso limitado às funcionalidades'
    };

    const profileColors: Record<UserProfile, string> = {
      employer: '#007AFF',
      employee: '#34C759',
      family: '#FF9500',
      admin: '#FF3B30',
      partner: '#5856D6',
      supplier: '#FF2D92',
      guest: '#8E8E93'
    };

    return {
      id: currentProfile,
      name: profileNames[currentProfile],
      description: profileDescriptions[currentProfile],
      color: profileColors[currentProfile],
      icon: currentProfile === 'employer' ? '👔' :
            currentProfile === 'employee' ? '👨‍🔧' :
            currentProfile === 'family' ? '👨‍👩‍👧‍👦' :
            currentProfile === 'admin' ? '🔧' :
            currentProfile === 'partner' ? '🤝' :
            currentProfile === 'supplier' ? '📦' : '👤'
    };
  }, [currentProfile]);

  // Funcionalidades disponíveis para o perfil atual
  const availableFeatures = useMemo(() => {
    return Object.entries(profileConfig.features)
      .filter(([_, enabled]) => enabled)
      .map(([feature, _]) => ({
        id: feature,
        title: FEATURE_TITLES[feature] || feature,
        description: FEATURE_DESCRIPTIONS[feature] || '',
        icon: FEATURE_ICONS[feature] || '📱'
      }));
  }, [profileConfig.features]);

  // Permissões disponíveis para o perfil atual
  const availablePermissions = useMemo(() => {
    return Object.entries(profileConfig.permissions)
      .filter(([_, enabled]) => enabled)
      .map(([permission, _]) => permission);
  }, [profileConfig.permissions]);

  return {
    // Estado atual
    currentProfile,
    profileConfig,
    profileLoading,
    
    // Dados formatados
    dashboardCards,
    navigationSections,
    uiConfig,
    profileDisplay,
    profileStats,
    availableFeatures,
    availablePermissions,
    
    // Tema
    currentTheme,
    userTheme,
    systemTheme,
    updateTheme,
    
    // Métodos de verificação
    checkFeatureAccess,
    checkPermission,
    
    // Ações
    changeProfile,
    
    // Helpers
    isEmployer: currentProfile === 'employer',
    isEmployee: currentProfile === 'employee',
    isFamily: currentProfile === 'family',
    isAdmin: currentProfile === 'admin',
    isGuest: currentProfile === 'guest',
    
    // Verificações rápidas de permissão
    canCreate: checkPermission('create'),
    canEdit: checkPermission('edit'),
    canDelete: checkPermission('delete'),
    canAdmin: checkPermission('admin'),
    canViewReports: checkPermission('reports'),
    
    // Verificações rápidas de funcionalidades
    hasFinanceAccess: checkFeatureAccess('finance'),
    hasHRAccess: checkFeatureAccess('hr'),
    hasUsersAccess: checkFeatureAccess('users'),
    hasReportsAccess: checkFeatureAccess('reports'),
    hasSettingsAccess: checkFeatureAccess('settings')
  };
};
