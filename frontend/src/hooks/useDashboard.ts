import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { API_ENDPOINTS } from '../utils/constants';

interface DashboardData {
  overview: {
    totalBudgets: number;
    totalBudgetAmount: number;
    totalBudgetSpent: number;
    budgetUtilization: number;
    totalPayrolls: number;
    totalGrossSalary: number;
    totalNetSalary: number;
    totalEmployees: number;
    totalEmployeeSalary: number;
    pendingPayments: number;
    totalPaymentAmount: number;
    pendingPurchases: number;
    totalPurchaseAmount: number;
    unreadNotifications: number;
    pendingTasks: number;
  };
  recentData: {
    notifications: Array<{
      id: number;
      title: string;
      message: string;
      timestamp: string;
      type: 'info' | 'warning' | 'success' | 'error';
    }>;
    tasks: Array<{
      id: number;
      title: string;
      status: 'pending' | 'in_progress' | 'completed';
      priority: 'low' | 'medium' | 'high';
    }>;
    recentPayrolls: Array<{
      id: number;
      employeeName: string;
      amount: number;
      status: 'paid' | 'pending' | 'overdue';
    }>;
    recentPayments: Array<{
      id: number;
      description: string;
      amount: number;
      status: 'completed' | 'pending' | 'cancelled';
    }>;
    recentPurchases: Array<{
      id: number;
      item: string;
      amount: number;
      status: 'approved' | 'pending' | 'rejected';
    }>;
  };
  charts: {
    budgetByCategory: Record<string, number>;
    payrollByStatus: Record<string, number>;
    paymentsByStatus: Record<string, number>;
    purchasesByStatus: Record<string, number>;
    tasksByStatus: Record<string, number>;
  };
}

interface DashboardStats {
  totalItems: number;
  activeItems: number;
  pendingItems: number;
  completedItems: number;
}

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Buscando dados do dashboard...');
      const response = await apiService.get<DashboardData>(API_ENDPOINTS.DASHBOARD.DATA);
      
      if (response.success) {
        console.log('✅ Dados do dashboard carregados:', response.data);
        setDashboardData(response.data);
        setLastRefresh(new Date());
      } else {
        console.error('❌ Erro na resposta da API:', response);
        setError('Erro ao carregar dados do dashboard');
      }
    } catch (err) {
      console.error('❌ Erro ao buscar dados do dashboard:', err);
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      console.log('📊 Buscando estatísticas do dashboard...');
      const response = await apiService.get<DashboardStats>(API_ENDPOINTS.DASHBOARD.STATS);
      
      if (response.success) {
        console.log('✅ Estatísticas carregadas:', response.data);
        setDashboardStats(response.data);
      } else {
        console.error('❌ Erro ao carregar estatísticas:', response);
      }
    } catch (err) {
      console.error('❌ Erro ao buscar estatísticas do dashboard:', err);
    }
  };

  const refreshDashboard = async () => {
    console.log('🔄 Atualizando dashboard...');
    await Promise.all([
      fetchDashboardData(),
      fetchDashboardStats()
    ]);
  };

  const refreshData = async () => {
    await fetchDashboardData();
  };

  const refreshStats = async () => {
    await fetchDashboardStats();
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  return {
    dashboardData,
    dashboardStats,
    loading,
    error,
    lastRefresh,
    refreshDashboard,
    refreshData,
    refreshStats,
    fetchDashboardData,
    fetchDashboardStats
  };
}; 