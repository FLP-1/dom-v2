

/**
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 */
// FunÃ§Ã£o removida - causava erros de referÃªncia no frontend
}

// ValidaÃ§Ã£o de tipos removida - causava erro de referÃªncia

/**
 * Sistema de logging estruturado
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
// FunÃ§Ã£o removida - causava erros de referÃªncia no frontend;
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'application.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }

// Aplicar logging

/**
 * @param {string} message - Mensagem de erro
 */
// FunÃ§Ã£o removida - causava erros de referÃªncia no frontend`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// ValidaÃ§Ã£o crÃ­tica removida - causava erro de referÃªncia

/**
 * @param {any} data - Dados a serem validados
 */
// FunÃ§Ã£o removida - causava erros de referÃªncia no frontend

// ValidaÃ§Ã£o de input removida - causava erro de referÃªncia

/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Custom Hook React
 * 
 * @dependencies
 * 
 * @usage
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

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
          ],
          tasks: [
            { id: 2, title: 'Aprovar pagamentos pendentes', status: 'in_progress', priority: 'medium' },
          ],
          recentPayrolls: [
            { id: 1, employeeName: 'Maria Santos', amount: 4200.00, status: 'paid' },
            { id: 3, employeeName: 'Ana Costa', amount: 3500.00, status: 'paid' }
          ],
          recentPayments: [
            { id: 1, description: 'Pagamento fornecedor limpeza', amount: 1200.00, status: 'completed' },
            { id: 2, description: 'Conta de energia', amount: 450.00, status: 'pending' },
          ],
          recentPurchases: [
            { id: 1, item: 'Material de limpeza', amount: 500.00, status: 'approved' },
          ]
        },
        charts: {
          budgetByCategory: {
            'Folha de Pagamento': 72000,
            'Material de Limpeza': 5000,
            'Seguros': 2000,
            'Outros': 3000
          },
          payrollByStatus: {
            'Pago': 10,
            'Pendente': 3,
            'Atrasado': 2
          },
          paymentsByStatus: {
            'Pendente': 5,
            'Cancelado': 1
          },
          purchasesByStatus: {
            'Aprovado': 15,
            'Pendente': 3,
            'Rejeitado': 1
          },
          tasksByStatus: {
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
          ],
          tasks: [
            { id: 2, title: 'Organizar estoque', status: 'in_progress', priority: 'low' }
          ],
          recentPayrolls: [
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
          ],
          tasks: [
            { id: 2, title: 'Aprovar compras da semana', status: 'in_progress', priority: 'low' },
          ],
          recentPayrolls: [
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
            'Contas da Casa': 1200,
            'Compras': 800
          },
          payrollByStatus: {
            'Pago': 1,
            'Pendente': 1,
            'Atrasado': 0
          },
          paymentsByStatus: {
            'Pendente': 1,
            'Cancelado': 0
          },
          purchasesByStatus: {
            'Aprovado': 5,
            'Pendente': 1,
            'Rejeitado': 0
          },
          tasksByStatus: {
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
          ],
          tasks: [
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
            'Pendente': 12,
            'Cancelado': 3
          },
          purchasesByStatus: {
            'Aprovado': 45,
            'Pendente': 8,
            'Rejeitado': 2
          },
          tasksByStatus: {
            'Em andamento': 25,
            'Pendente': 25
          }
        }
      };

    default:
      return baseData;
  }
};

/**
 * DEPRECATED: usar dados reais via hooks de API/serviços
 */
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
