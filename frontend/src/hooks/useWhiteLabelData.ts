/**
 * Hook para gestão de dados White-Label
 * @description Gerencia configurações de marca personalizada para parceiros
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 * 
 * Funcionalidades:
 * - Configurar white-label do parceiro
 * - Buscar configurações de marca
 * - Aplicar temas personalizados
 * - Gerenciar domínios customizados
 * - Fallback para dados offline
 */

import { useState, useEffect} from 'react';
import { apiService } from '../services/apiService';

// ==========================================
// 🎨 INTERFACES WHITE-LABEL
// ==========================================

export interface WhiteLabelConfig {
  id: string;
  white_label_enabled: boolean;
  brand_name: string | null;
  brand_logo_url: string | null;
  brand_colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  } | null;
  custom_domain: string | null;
  custom_subdomain: string | null;
  brand_settings: {
    fonts?: {
      primary: string;
      secondary: string;
    };
    custom_css?: string;
    header_config?: Record<string, unknown>;
    footer_config?: Record<string, unknown>;
    login_config?: Record<string, unknown>;
  } | null;
}

export interface WhiteLabelStats {
  total_configs: number;
  active_configs: number;
  custom_domains: number;
  linked_employers: number;
}

export interface UseWhiteLabelDataResult {
  // Estado
  config: WhiteLabelConfig | null;
  stats: WhiteLabelStats | null;
  loading: boolean;
  error: string | null;
  
  // Funções
  reload: () => Promise<void>;
  updateConfig: (partnerId: string, configData: Partial<WhiteLabelConfig>) => Promise<boolean>;
  applyTheme: (colors: WhiteLabelConfig['brand_colors']) => void;
  resetTheme: () => void;
  resolveByDomain: (domain: string) => Promise<WhiteLabelConfig | null>;
}

// ==========================================
// 🎯 HOOK PRINCIPAL
// ==========================================

export const useWhiteLabelData = (partnerId?: string): UseWhiteLabelDataResult => {
  // Estados
  const [config, setConfig] = useState<WhiteLabelConfig | null>(null);
  const [stats, setStats] = useState<WhiteLabelStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // 📊 DADOS MOCK PARA FALLBACK
  // ==========================================
  
  const mockConfig: WhiteLabelConfig = {
    id: 'mock-config-001',
    white_label_enabled: true,
    brand_name: 'Limpeza Total',
    brand_logo_url: '/assets/partner-logo.png',
    brand_colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      text: '#1f2937',
      background: '#ffffff'
    },
    custom_domain: 'limpezatotal.domv2.com.br',
    custom_subdomain: 'limpezatotal',
    brand_settings: {
      fonts: {
        primary: 'Inter',
        secondary: 'Roboto'
      },
      custom_css: '',
      header_config: {
        logo_position: 'left',
        show_navigation: true
      },
      footer_config: {
        show_copyright: true,
        custom_text: 'Powered by Limpeza Total'
      }
    }
  };

  const mockStats: WhiteLabelStats = {
    total_configs: 1,
    active_configs: 1,
    custom_domains: 1,
    linked_employers: 15
  };

  // ==========================================
  // 🔄 CARREGAR DADOS
  // ==========================================

  const loadConfig = useCallback(async (partnerIdParam?: string) => {
    if (!partnerIdParam && !partnerId) return;
    
    const targetPartnerId = partnerIdParam || partnerId;
    
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.request(
        `GET`,
        `/partners/${targetPartnerId}/white-label`
      );

      if (response.success) {
        setConfig(response.data);
      } else {
        throw new Error(response.error || 'Erro ao carregar configuração white-label');
      }

    } catch (err) {
      console.warn('Erro ao carregar white-label, usando dados mock:', err);
      setError('Modo offline - dados simulados');
      setConfig(mockConfig);
    } finally {
      setLoading(false);
    }
  }, [partnerId]);

  const loadStats = useCallback(async () => {
    try {
      // Simular carregamento de estatísticas
      await new Promise(resolve => setTimeout(resolve, 500));
      setStats(mockStats);
    } catch (err) {
      console.warn('Erro ao carregar estatísticas white-label:', err);
      setStats(mockStats);
    }
  }, []);

  // ==========================================
  // 🔄 RECARREGAR DADOS
  // ==========================================

  const reload = useCallback(async () => {
    await Promise.all([
      loadConfig(),
      loadStats()
    ]);
  }, [loadConfig, loadStats]);

  // ==========================================
  // ✏️ ATUALIZAR CONFIGURAÇÃO
  // ==========================================

  const updateConfig = useCallback(async (
    partnerIdParam: string, 
    configData: Partial<WhiteLabelConfig>
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const response = await apiService.request(
        'POST',
        `/partners/${partnerIdParam}/white-label`,
        configData
      );

      if (response.success) {
        // Atualizar estado local
        setConfig(prev => prev ? { ...prev, ...response.data } : response.data);
        return true;
      } else {
        throw new Error(response.error || 'Erro ao atualizar configuração');
      }

    } catch (err) {
      console.error('Erro ao atualizar white-label:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      
      // Simular sucesso em modo offline
      if (config) {
        setConfig(prev => prev ? { ...prev, ...configData } : null);
        return true;
      }
      
      return false;
    } finally {
      setLoading(false);
    }
  }, [config]);

  // ==========================================
  // 🎨 APLICAR TEMA
  // ==========================================

  const applyTheme = useCallback((colors: WhiteLabelConfig['brand_colors']) => {
    if (!colors) return;

    const root = document.documentElement;
    
    // Aplicar CSS custom properties
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-background', colors.background);

    // Salvar no localStorage
    localStorage.setItem('white-label-theme', JSON.stringify(colors));
  }, []);

  // ==========================================
  // 🔄 RESETAR TEMA
  // ==========================================

  const resetTheme = useCallback(() => {
    const root = document.documentElement;
    
    // Remover CSS custom properties
    root.style.removeProperty('--color-primary');
    root.style.removeProperty('--color-secondary');
    root.style.removeProperty('--color-accent');
    root.style.removeProperty('--color-text');
    root.style.removeProperty('--color-background');

    // Remover do localStorage
    localStorage.removeItem('white-label-theme');
  }, []);

  // ==========================================
  // 🔍 RESOLVER POR DOMÍNIO
  // ==========================================

  const resolveByDomain = useCallback(async (domain: string): Promise<WhiteLabelConfig | null> => {
    try {
      const response = await apiService.request(
        'GET',
        `/white-label/resolve/${domain}`
      );

      if (response.success) {
        return response.data;
      } else {
        return null;
      }

    } catch (err) {
      console.warn('Erro ao resolver domínio white-label:', err);
      
      // Fallback para configuração mock se o domínio corresponder
      if (domain.includes('limpezatotal')) {
        return mockConfig;
      }
      
      return null;
    }
  }, []);

  // ==========================================
  // 🔄 EFEITOS
  // ==========================================

  useEffect(() => {
    if (partnerId) {
      reload();
    }
  }, [partnerId, reload]);

  // Aplicar tema salvo ao carregar
  useEffect(() => {
    const savedTheme = localStorage.getItem('white-label-theme');
    if (savedTheme) {
      try {
        const colors = JSON.parse(savedTheme);
        applyTheme(colors);
      } catch (err) {
        console.warn('Erro ao aplicar tema salvo:', err);
      }
    }
  }, [applyTheme]);

  // ==========================================
  // 📤 RETORNO DO HOOK
  // ==========================================

  return {
    // Estado
    config,
    stats,
    loading,
    error,
    
    // Funções
    reload,
    updateConfig,
    applyTheme,
    resetTheme,
    resolveByDomain
  };
};

// ==========================================
// 🔧 UTILITÁRIOS
// ==========================================

/**
 * Verificar se white-label está habilitado
 */
export const isWhiteLabelEnabled = (config: WhiteLabelConfig | null): boolean => {
  return config?.white_label_enabled === true;
};

/**
 * Obter URL do logo ou fallback
 */
export const getLogoUrl = (config: WhiteLabelConfig | null, fallback = '/logo.png'): string => {
  return config?.brand_logo_url || fallback;
};

/**
 * Obter nome da marca ou fallback
 */
export const getBrandName = (config: WhiteLabelConfig | null, fallback = 'DOM v2'): string => {
  return config?.brand_name || fallback;
};

/**
 * Obter cores do tema ou fallback
 */
export const getThemeColors = (config: WhiteLabelConfig | null) => {
  return config?.brand_colors || {
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#60a5fa',
    text: '#1f2937',
    background: '#ffffff'
  };
};
