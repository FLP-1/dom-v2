import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  UserProfile, 
  ProfileFeatures,
  getUserProfileConfig,
  hasFeatureAccess,
  hasPermission,
  getDashboardCards,
  getNavigationSections,
  getUIConfig,
  FEATURE_ICONS,
  FEATURE_TITLES,
  FEATURE_DESCRIPTIONS
} from '../utils/userProfileConfig.ts';

export const useUserProfile = (initialProfile: UserProfile = 'employer') => {
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
      
      // Salvar no localStorage para persistência (se disponível)
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('dom_user_profile', newProfile);
        }
      } catch (error) {
        console.warn('localStorage not available:', error);
      }
      
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
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedProfile = localStorage.getItem('dom_user_profile') as UserProfile;
        if (savedProfile && savedProfile !== currentProfile) {
          setCurrentProfile(savedProfile);
        }
      }
    } catch (error) {
      console.warn('localStorage not available:', error);
    }
  }, []);

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

    return {
      id: currentProfile,
      name: profileNames[currentProfile],
      description: profileDescriptions[currentProfile],
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
      .filter(([, enabled]) => enabled)
      .map(([feature]) => ({
        id: feature,
        title: FEATURE_TITLES[feature] || feature,
        description: FEATURE_DESCRIPTIONS[feature] || '',
        icon: FEATURE_ICONS[feature] || '📱'
      }));
  }, [profileConfig.features]);

  // Permissões disponíveis para o perfil atual
  const availablePermissions = useMemo(() => {
    return Object.entries(profileConfig.permissions)
      .filter(([, enabled]) => enabled)
      .map(([permission]) => permission);
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
    availableFeatures,
    availablePermissions,
    
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
