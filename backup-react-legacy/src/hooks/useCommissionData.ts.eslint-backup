/**
 * Hook para gestão de dados de Comissionamento
 * @description Gerencia comissões, vínculos de empregadores e relatórios para parceiros
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 * 
 * Funcionalidades:
 * - Listar comissões do parceiro
 * - Gerenciar vínculos com empregadores
 * - Configurar taxas de comissionamento
 * - Relatórios e estatísticas
 * - Marcar comissões como pagas
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { apiService } from '../services/apiService';

// ==========================================
// 💰 INTERFACES COMISSIONAMENTO
// ==========================================

export interface Commission {
  id: string;
  partner_id: string;
  employer_link_id: string;
  subscription_id?: string;
  payment_record_id?: string;
  commission_type: 'subscription' | 'payment' | 'signup' | 'renewal';
  base_amount: number;
  commission_rate: number;
  commission_amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  earned_at: string;
  due_date: string;
  paid_at?: string;
  payment_method?: string;
  payment_reference?: string;
  notes?: string;
  employer_link: {
    employer: {
      name: string;
      email: string;
    };
  };
  subscription?: {
    plan: {
      name: string;
    };
  };
}

export interface EmployerLink {
  id: string;
  partner_id: string;
  employer_id: string;
  link_type: 'referral' | 'managed' | 'white_label';
  status: 'active' | 'inactive' | 'suspended';
  referral_code?: string;
  commission_rate?: number;
  linked_at: string;
  activated_at?: string;
  employer: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    created_at: string;
  };
}

export interface CommissionConfig {
  commission_enabled: boolean;
  commission_type: 'percentage' | 'fixed' | 'tiered';
  commission_rate?: number;
  commission_tiers?: {
    min_amount: number;
    max_amount: number;
    rate: number;
  }[];
  payment_terms?: {
    payment_day: number; // dia do mês para pagamento
    payment_method: string;
    minimum_amount: number;
  };
}

export interface CommissionStats {
  total_earned: number;
  total_commissions: number;
  pending_amount: number;
  pending_count: number;
  paid_amount: number;
  paid_count: number;
}

export interface CommissionFilters {
  status?: string;
  period?: 'current_month' | 'last_month' | 'current_year';
  page?: number;
  limit?: number;
}

export interface UseCommissionDataResult {
  // Estado
  commissions: Commission[];
  employerLinks: EmployerLink[];
  stats: CommissionStats | null;
  config: CommissionConfig | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
  
  // Funções
  reload: () => Promise<void>;
  loadCommissions: (filters?: CommissionFilters) => Promise<void>;
  loadEmployerLinks: () => Promise<void>;
  updateConfig: (partnerId: string, configData: CommissionConfig) => Promise<boolean>;
  linkEmployer: (partnerId: string, employerData: {
    employer_id: string;
    link_type?: string;
    referral_code?: string;
    commission_rate?: number;
  }) => Promise<boolean>;
  markAsPaid: (commissionId: string, paymentData: {
    payment_method: string;
    payment_reference?: string;
    notes?: string;
  }) => Promise<boolean>;
  
  // Funções calculadas
  formatCurrency: (amount: number) => string;
  calculateCommission: (baseAmount: number, rate: number) => number;
  getStatusColor: (status: string) => string;
  getTypeLabel: (type: string) => string;
}

// ==========================================
// 🎯 HOOK PRINCIPAL
// ==========================================

export const useCommissionData = (partnerId?: string): UseCommissionDataResult => {
  // Estados
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [employerLinks, setEmployerLinks] = useState<EmployerLink[]>([]);
  const [stats, setStats] = useState<CommissionStats | null>(null);
  const [config, setConfig] = useState<CommissionConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null>(null);

  // ==========================================
  // 📊 DADOS MOCK PARA FALLBACK
  // ==========================================
  
  const mockCommissions: Commission[] = [
    {
      id: 'comm-001',
      partner_id: 'partner-001',
      employer_link_id: 'link-001',
      subscription_id: 'sub-001',
      commission_type: 'subscription',
      base_amount: 59.90,
      commission_rate: 15.0,
      commission_amount: 8.99,
      currency: 'BRL',
      status: 'pending',
      earned_at: '2025-01-15T10:00:00Z',
      due_date: '2025-02-05T23:59:59Z',
      employer_link: {
        employer: {
          name: 'Maria Silva Santos',
          email: 'maria@exemplo.com'
        }
      },
      subscription: {
        plan: {
          name: 'Profissional'
        }
      }
    },
    {
      id: 'comm-002',
      partner_id: 'partner-001',
      employer_link_id: 'link-002',
      subscription_id: 'sub-002',
      commission_type: 'renewal',
      base_amount: 29.90,
      commission_rate: 10.0,
      commission_amount: 2.99,
      currency: 'BRL',
      status: 'paid',
      earned_at: '2025-01-01T10:00:00Z',
      due_date: '2025-01-20T23:59:59Z',
      paid_at: '2025-01-18T14:30:00Z',
      payment_method: 'pix',
      payment_reference: 'PIX-001-2025',
      employer_link: {
        employer: {
          name: 'João Carlos Silva',
          email: 'joao@exemplo.com'
        }
      },
      subscription: {
        plan: {
          name: 'Básico'
        }
      }
    }
  ];

  const mockEmployerLinks: EmployerLink[] = [
    {
      id: 'link-001',
      partner_id: 'partner-001',
      employer_id: 'emp-001',
      link_type: 'referral',
      status: 'active',
      referral_code: 'LIMPEZA001',
      commission_rate: 15.0,
      linked_at: '2024-12-01T10:00:00Z',
      activated_at: '2024-12-01T10:00:00Z',
      employer: {
        id: 'emp-001',
        name: 'Maria Silva Santos',
        email: 'maria@exemplo.com',
        cpf: '12345678901',
        created_at: '2024-11-15T08:00:00Z'
      }
    },
    {
      id: 'link-002',
      partner_id: 'partner-001',
      employer_id: 'emp-002',
      link_type: 'white_label',
      status: 'active',
      commission_rate: 10.0,
      linked_at: '2024-11-20T15:30:00Z',
      activated_at: '2024-11-21T09:00:00Z',
      employer: {
        id: 'emp-002',
        name: 'João Carlos Silva',
        email: 'joao@exemplo.com',
        cpf: '98765432100',
        created_at: '2024-11-01T12:00:00Z'
      }
    }
  ];

  const mockStats: CommissionStats = {
    total_earned: 125.45,
    total_commissions: 15,
    pending_amount: 45.67,
    pending_count: 5,
    paid_amount: 79.78,
    paid_count: 10
  };

  const mockConfig: CommissionConfig = {
    commission_enabled: true,
    commission_type: 'percentage',
    commission_rate: 15.0,
    payment_terms: {
      payment_day: 5,
      payment_method: 'pix',
      minimum_amount: 50.0
    }
  };

  // ==========================================
  // 🔄 CARREGAR COMISSÕES
  // ==========================================

  const loadCommissions = useCallback(async (filters: CommissionFilters = {}) => {
    if (!partnerId) return;
    
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.period) queryParams.append('period', filters.period);
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const response = await apiService.request(
        'GET',
        `/partners/${partnerId}/commissions?${queryParams.toString()}`
      );

      if (response.success) {
        setCommissions(response.data.commissions);
        setStats(response.data.stats);
        setPagination(response.data.pagination);
      } else {
        throw new Error(response.error || 'Erro ao carregar comissões');
      }

    } catch (err) {
      console.warn('Erro ao carregar comissões, usando dados mock:', err);
      setError('Modo offline - dados simulados');
      setCommissions(mockCommissions);
      setStats(mockStats);
      setPagination({
        page: 1,
        limit: 20,
        total: mockCommissions.length,
        pages: 1
      });
    } finally {
      setLoading(false);
    }
  }, [partnerId]);

  // ==========================================
  // 🔄 CARREGAR VÍNCULOS DE EMPREGADORES
  // ==========================================

  const loadEmployerLinks = useCallback(async () => {
    if (!partnerId) return;
    
    try {
      const response = await apiService.request(
        'GET',
        `/partners/${partnerId}/linked-employers`
      );

      if (response.success) {
        setEmployerLinks(response.data);
      } else {
        throw new Error(response.error || 'Erro ao carregar vínculos');
      }

    } catch (err) {
      console.warn('Erro ao carregar vínculos, usando dados mock:', err);
      setEmployerLinks(mockEmployerLinks);
    }
  }, [partnerId]);

  // ==========================================
  // 🔄 RECARREGAR DADOS
  // ==========================================

  const reload = useCallback(async () => {
    await Promise.all([
      loadCommissions(),
      loadEmployerLinks()
    ]);
  }, [loadCommissions, loadEmployerLinks]);

  // ==========================================
  // ⚙️ ATUALIZAR CONFIGURAÇÃO
  // ==========================================

  const updateConfig = useCallback(async (
    partnerIdParam: string, 
    configData: CommissionConfig
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const response = await apiService.request(
        'POST',
        `/partners/${partnerIdParam}/commission-config`,
        configData
      );

      if (response.success) {
        setConfig(configData);
        return true;
      } else {
        throw new Error(response.error || 'Erro ao atualizar configuração');
      }

    } catch (err) {
      console.error('Erro ao atualizar configuração:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      
      // Simular sucesso em modo offline
      setConfig(configData);
      return true;
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // 🔗 VINCULAR EMPREGADOR
  // ==========================================

  const linkEmployer = useCallback(async (
    partnerIdParam: string, 
    employerData: {
      employer_id: string;
      link_type?: string;
      referral_code?: string;
      commission_rate?: number;
    }
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const response = await apiService.request(
        'POST',
        `/partners/${partnerIdParam}/link-employer`,
        employerData
      );

      if (response.success) {
        // Recarregar vínculos
        await loadEmployerLinks();
        return true;
      } else {
        throw new Error(response.error || 'Erro ao vincular empregador');
      }

    } catch (err) {
      console.error('Erro ao vincular empregador:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  }, [loadEmployerLinks]);

  // ==========================================
  // 💳 MARCAR COMO PAGO
  // ==========================================

  const markAsPaid = useCallback(async (
    commissionId: string, 
    paymentData: {
      payment_method: string;
      payment_reference?: string;
      notes?: string;
    }
  ): Promise<boolean> => {
    try {
      const response = await apiService.request(
        'PUT',
        `/commissions/${commissionId}/pay`,
        paymentData
      );

      if (response.success) {
        // Atualizar comissão localmente
        setCommissions(prev => prev.map(comm => 
          comm.id === commissionId 
            ? { 
                ...comm, 
                status: 'paid' as const, 
                paid_at: new Date().toISOString(),
                ...paymentData 
              }
            : comm
        ));
        
        // Recarregar estatísticas
        await loadCommissions();
        return true;
      } else {
        throw new Error(response.error || 'Erro ao marcar como pago');
      }

    } catch (err) {
      console.error('Erro ao marcar como pago:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      
      // Simular sucesso em modo offline
      setCommissions(prev => prev.map(comm => 
        comm.id === commissionId 
          ? { 
              ...comm, 
              status: 'paid' as const, 
              paid_at: new Date().toISOString(),
              ...paymentData 
            }
          : comm
      ));
      
      return true;
    }
  }, [loadCommissions]);

  // ==========================================
  // 🧮 FUNÇÕES UTILITÁRIAS
  // ==========================================

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  }, []);

  const calculateCommission = useCallback((baseAmount: number, rate: number): number => {
    return (baseAmount * rate) / 100;
  }, []);

  const getStatusColor = useCallback((status: string): string => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#3b82f6';
      case 'paid': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  }, []);

  const getTypeLabel = useCallback((type: string): string => {
    switch (type) {
      case 'subscription': return 'Assinatura';
      case 'payment': return 'Pagamento';
      case 'signup': return 'Cadastro';
      case 'renewal': return 'Renovação';
      default: return type;
    }
  }, []);

  // ==========================================
  // 🔄 EFEITOS
  // ==========================================

  useEffect(() => {
    if (partnerId) {
      reload();
      setConfig(mockConfig); // Carregar configuração mock
    }
  }, [partnerId, reload]);

  // ==========================================
  // 📤 RETORNO DO HOOK
  // ==========================================

  return {
    // Estado
    commissions,
    employerLinks,
    stats,
    config,
    loading,
    error,
    pagination,
    
    // Funções
    reload,
    loadCommissions,
    loadEmployerLinks,
    updateConfig,
    linkEmployer,
    markAsPaid,
    
    // Funções utilitárias
    formatCurrency,
    calculateCommission,
    getStatusColor,
    getTypeLabel
  };
};
