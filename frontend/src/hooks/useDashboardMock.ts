import { useState, useEffect } from 'react';
import { UserProfileType } from '../utils/user-profiles';

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

// Dados mock customizados por tipo de usuário
const getMockDataByProfile = (profileType: UserProfileType): DashboardData => {
  const baseData = {
    overview: {
      totalBudgets: 0,
      totalBudgetAmount: 0,
      totalBudgetSpent: 0,
      budgetUtilization: 0,
      totalPayrolls: 0,
      totalGrossSalary: 0,
      totalNetSalary: 0,
      totalEmployees: 0,
      totalEmployeeSalary: 0,
      pendingPayments: 0,
      totalPaymentAmount: 0,
      pendingPurchases: 0,
      totalPurchaseAmount: 0,
      unreadNotifications: 0,
      pendingTasks: 0
    },
    recentData: {
      notifications: [],
      tasks: [],
      recentPayrolls: [],
      recentPayments: [],
      recentPurchases: []
    },
    charts: {
      budgetByCategory: {},
      payrollByStatus: {},
      paymentsByStatus: {},
      purchasesByStatus: {},
      tasksByStatus: {}
    }
  };

  switch (profileType) {
    case 'EMPLOYER':
      return {
        overview: {
          totalBudgets: 8,
          totalBudgetAmount: 25000.00,
          totalBudgetSpent: 18000.00,
          budgetUtilization: 72.0,
          totalPayrolls: 15,
          totalGrossSalary: 75000.00,
          totalNetSalary: 65000.00,
          totalEmployees: 12,
          totalEmployeeSalary: 72000.00,
          pendingPayments: 5,
          totalPaymentAmount: 8500.00,
          pendingPurchases: 3,
          totalPurchaseAmount: 3200.00,
          unreadNotifications: 8,
          pendingTasks: 12
        },
        recentData: {
          notifications: [
            { id: 1, title: 'Pagamento aprovado', message: 'Pagamento do funcionário Maria foi aprovado', timestamp: new Date().toISOString(), type: 'success' },
            { id: 2, title: 'Orçamento atualizado', message: 'Orçamento de março foi atualizado com sucesso', timestamp: new Date().toISOString(), type: 'info' },
            { id: 3, title: 'Nova solicitação', message: 'Funcionário João solicitou férias', timestamp: new Date().toISOString(), type: 'warning' }
          ],
          tasks: [
            { id: 1, title: 'Revisar orçamento mensal', status: 'pending', priority: 'high' },
            { id: 2, title: 'Aprovar pagamentos pendentes', status: 'in_progress', priority: 'medium' },
            { id: 3, title: 'Avaliar solicitações de férias', status: 'pending', priority: 'medium' }
          ],
          recentPayrolls: [
            { id: 1, employeeName: 'Maria Santos', amount: 4200.00, status: 'paid' },
            { id: 2, employeeName: 'João Silva', amount: 3800.00, status: 'pending' },
            { id: 3, employeeName: 'Ana Costa', amount: 3500.00, status: 'paid' }
          ],
          recentPayments: [
            { id: 1, description: 'Pagamento fornecedor limpeza', amount: 1200.00, status: 'completed' },
            { id: 2, description: 'Conta de energia', amount: 450.00, status: 'pending' },
            { id: 3, description: 'Seguro dos funcionários', amount: 800.00, status: 'completed' }
          ],
          recentPurchases: [
            { id: 1, item: 'Material de limpeza', amount: 500.00, status: 'approved' },
            { id: 2, item: 'Equipamentos de segurança', amount: 1500.00, status: 'pending' },
            { id: 3, item: 'Uniforme dos funcionários', amount: 800.00, status: 'approved' }
          ]
        },
        charts: {
          budgetByCategory: {
            'Folha de Pagamento': 72000,
            'Material de Limpeza': 5000,
            'Manutenção': 3000,
            'Seguros': 2000,
            'Outros': 3000
          },
          payrollByStatus: {
            'Pago': 10,
            'Pendente': 3,
            'Atrasado': 2
          },
          paymentsByStatus: {
            'Concluído': 25,
            'Pendente': 5,
            'Cancelado': 1
          },
          purchasesByStatus: {
            'Aprovado': 15,
            'Pendente': 3,
            'Rejeitado': 1
          },
          tasksByStatus: {
            'Concluído': 20,
            'Em andamento': 8,
            'Pendente': 12
          }
        }
      };

    case 'EMPLOYEE':
      return {
        overview: {
          totalBudgets: 0,
          totalBudgetAmount: 0,
          totalBudgetSpent: 0,
          budgetUtilization: 0,
          totalPayrolls: 1,
          totalGrossSalary: 4200.00,
          totalNetSalary: 3800.00,
          totalEmployees: 1,
          totalEmployeeSalary: 4200.00,
          pendingPayments: 0,
          totalPaymentAmount: 0,
          pendingPurchases: 0,
          totalPurchaseAmount: 0,
          unreadNotifications: 3,
          pendingTasks: 2
        },
        recentData: {
          notifications: [
            { id: 1, title: 'Pagamento recebido', message: 'Seu pagamento foi processado com sucesso', timestamp: new Date().toISOString(), type: 'success' },
            { id: 2, title: 'Lembrete de férias', message: 'Você tem 15 dias de férias disponíveis', timestamp: new Date().toISOString(), type: 'info' },
            { id: 3, title: 'Nova tarefa', message: 'Nova tarefa atribuída: Limpeza da área externa', timestamp: new Date().toISOString(), type: 'warning' }
          ],
          tasks: [
            { id: 1, title: 'Limpeza da área externa', status: 'pending', priority: 'medium' },
            { id: 2, title: 'Organizar estoque', status: 'in_progress', priority: 'low' }
          ],
          recentPayrolls: [
            { id: 1, employeeName: 'Você', amount: 4200.00, status: 'paid' }
          ],
          recentPayments: [],
          recentPurchases: []
        },
        charts: {
          budgetByCategory: {},
          payrollByStatus: {
            'Pago': 1,
            'Pendente': 0,
            'Atrasado': 0
          },
          paymentsByStatus: {},
          purchasesByStatus: {},
          tasksByStatus: {
            'Concluído': 5,
            'Em andamento': 1,
            'Pendente': 2
          }
        }
      };

    case 'FAMILY':
      return {
        overview: {
          totalBudgets: 3,
          totalBudgetAmount: 8000.00,
          totalBudgetSpent: 5200.00,
          budgetUtilization: 65.0,
          totalPayrolls: 2,
          totalGrossSalary: 8000.00,
          totalNetSalary: 7200.00,
          totalEmployees: 2,
          totalEmployeeSalary: 8000.00,
          pendingPayments: 1,
          totalPaymentAmount: 500.00,
          pendingPurchases: 1,
          totalPurchaseAmount: 200.00,
          unreadNotifications: 4,
          pendingTasks: 3
        },
        recentData: {
          notifications: [
            { id: 1, title: 'Orçamento familiar', message: 'Orçamento familiar atualizado', timestamp: new Date().toISOString(), type: 'info' },
            { id: 2, title: 'Pagamento doméstica', message: 'Pagamento da doméstica foi processado', timestamp: new Date().toISOString(), type: 'success' },
            { id: 3, title: 'Lembrete de compras', message: 'Lista de compras da semana disponível', timestamp: new Date().toISOString(), type: 'warning' }
          ],
          tasks: [
            { id: 1, title: 'Revisar orçamento familiar', status: 'pending', priority: 'medium' },
            { id: 2, title: 'Aprovar compras da semana', status: 'in_progress', priority: 'low' },
            { id: 3, title: 'Agendar pagamento doméstica', status: 'pending', priority: 'high' }
          ],
          recentPayrolls: [
            { id: 1, employeeName: 'Maria Doméstica', amount: 1200.00, status: 'paid' },
            { id: 2, employeeName: 'João Jardineiro', amount: 800.00, status: 'pending' }
          ],
          recentPayments: [
            { id: 1, description: 'Conta de luz', amount: 150.00, status: 'completed' },
            { id: 2, description: 'Internet', amount: 120.00, status: 'pending' }
          ],
          recentPurchases: [
            { id: 1, item: 'Produtos de limpeza', amount: 80.00, status: 'approved' },
            { id: 2, item: 'Material de jardinagem', amount: 120.00, status: 'pending' }
          ]
        },
        charts: {
          budgetByCategory: {
            'Serviços Domésticos': 6000,
            'Contas da Casa': 1200,
            'Compras': 800
          },
          payrollByStatus: {
            'Pago': 1,
            'Pendente': 1,
            'Atrasado': 0
          },
          paymentsByStatus: {
            'Concluído': 8,
            'Pendente': 1,
            'Cancelado': 0
          },
          purchasesByStatus: {
            'Aprovado': 5,
            'Pendente': 1,
            'Rejeitado': 0
          },
          tasksByStatus: {
            'Concluído': 8,
            'Em andamento': 2,
            'Pendente': 3
          }
        }
      };

    case 'ADMIN':
      return {
        overview: {
          totalBudgets: 25,
          totalBudgetAmount: 150000.00,
          totalBudgetSpent: 120000.00,
          budgetUtilization: 80.0,
          totalPayrolls: 50,
          totalGrossSalary: 300000.00,
          totalNetSalary: 250000.00,
          totalEmployees: 35,
          totalEmployeeSalary: 280000.00,
          pendingPayments: 12,
          totalPaymentAmount: 25000.00,
          pendingPurchases: 8,
          totalPurchaseAmount: 15000.00,
          unreadNotifications: 15,
          pendingTasks: 25
        },
        recentData: {
          notifications: [
            { id: 1, title: 'Relatório mensal', message: 'Relatório de performance do mês disponível', timestamp: new Date().toISOString(), type: 'info' },
            { id: 2, title: 'Alerta de orçamento', message: 'Orçamento de RH atingiu 85% do limite', timestamp: new Date().toISOString(), type: 'warning' },
            { id: 3, title: 'Nova solicitação', message: 'Solicitação de contratação pendente', timestamp: new Date().toISOString(), type: 'warning' }
          ],
          tasks: [
            { id: 1, title: 'Revisar relatório mensal', status: 'pending', priority: 'high' },
            { id: 2, title: 'Aprovar contratações', status: 'in_progress', priority: 'high' },
            { id: 3, title: 'Analisar performance', status: 'pending', priority: 'medium' }
          ],
          recentPayrolls: [
            { id: 1, employeeName: 'Gerente RH', amount: 8500.00, status: 'paid' },
            { id: 2, employeeName: 'Analista Financeiro', amount: 6500.00, status: 'paid' },
            { id: 3, employeeName: 'Assistente Admin', amount: 4200.00, status: 'pending' }
          ],
          recentPayments: [
            { id: 1, description: 'Pagamento fornecedores', amount: 15000.00, status: 'completed' },
            { id: 2, description: 'Impostos', amount: 8000.00, status: 'pending' },
            { id: 3, description: 'Seguros', amount: 5000.00, status: 'completed' }
          ],
          recentPurchases: [
            { id: 1, item: 'Equipamentos TI', amount: 8000.00, status: 'approved' },
            { id: 2, item: 'Mobiliário', amount: 5000.00, status: 'pending' },
            { id: 3, item: 'Material de escritório', amount: 2000.00, status: 'approved' }
          ]
        },
        charts: {
          budgetByCategory: {
            'Folha de Pagamento': 280000,
            'Operacional': 45000,
            'TI': 25000,
            'Marketing': 15000,
            'Administrativo': 10000
          },
          payrollByStatus: {
            'Pago': 35,
            'Pendente': 10,
            'Atrasado': 5
          },
          paymentsByStatus: {
            'Concluído': 120,
            'Pendente': 12,
            'Cancelado': 3
          },
          purchasesByStatus: {
            'Aprovado': 45,
            'Pendente': 8,
            'Rejeitado': 2
          },
          tasksByStatus: {
            'Concluído': 80,
            'Em andamento': 25,
            'Pendente': 25
          }
        }
      };

    default:
      return baseData;
  }
};

export const useDashboardMock = (profileType: UserProfileType = 'EMPLOYER') => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = getMockDataByProfile(profileType);
      setDashboardData(mockData);
    } catch (err) {
      console.error('Erro ao buscar dados do dashboard:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  const refreshDashboard = async () => {
    await fetchDashboardData();
  };

  useEffect(() => {
    fetchDashboardData();
  }, [profileType]);

  return {
    dashboardData,
    loading,
    error,
    refreshDashboard,
    fetchDashboardData
  };
}; 