import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste do dashboard com dados mock
app.get('/api/dashboard', async (req, res) => {
  try {
    // Dados mock para teste
    const dashboardData = {
      overview: {
        totalBudgets: 3,
        totalBudgetAmount: 15000.00,
        totalBudgetSpent: 8500.00,
        budgetUtilization: 56.67,
        totalPayrolls: 2,
        totalGrossSalary: 8000.00,
        totalNetSalary: 7200.00,
        totalEmployees: 2,
        totalEmployeeSalary: 4000.00,
        pendingPayments: 1,
        totalPaymentAmount: 2500.00,
        pendingPurchases: 2,
        totalPurchaseAmount: 1200.00,
        unreadNotifications: 3,
        pendingTasks: 5
      },
      recentData: {
        notifications: [
          {
            id: '1',
            title: 'Pagamento Pendente',
            message: 'Há um pagamento pendente para aprovação',
            type: 'warning',
            timestamp: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Orçamento Atualizado',
            message: 'O orçamento mensal foi atualizado',
            type: 'info',
            timestamp: new Date().toISOString()
          }
        ],
        tasks: [
          {
            id: '1',
            title: 'Limpeza da Casa',
            status: 'pending',
            priority: 'high'
          },
          {
            id: '2',
            title: 'Compras do Mês',
            status: 'in_progress',
            priority: 'medium'
          }
        ],
        recentPayrolls: [
          {
            id: '1',
            employeeName: 'Maria Silva',
            grossSalary: 4000.00,
            netSalary: 3600.00,
            month: 'Janeiro 2025'
          }
        ],
        recentPayments: [
          {
            id: '1',
            description: 'Pagamento de Conta',
            amount: 500.00,
            status: 'pending'
          }
        ],
        recentPurchases: [
          {
            id: '1',
            description: 'Produtos de Limpeza',
            amount: 150.00,
            status: 'completed'
          }
        ]
      },
      charts: {
        budgetByCategory: {
          'Limpeza': 3000,
          'Alimentação': 5000,
          'Transporte': 2000,
          'Outros': 5000
        },
        payrollByStatus: {
          'Pago': 1,
          'Pendente': 1
        },
        paymentsByStatus: {
          'Pago': 2,
          'Pendente': 1
        },
        purchasesByStatus: {
          'Concluído': 3,
          'Pendente': 2
        },
        tasksByStatus: {
          'Pendente': 5,
          'Em Progresso': 3,
          'Concluído': 8
        }
      }
    };

    res.json({
      success: true,
      data: dashboardData,
      message: 'Dados do dashboard recuperados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar dados do dashboard',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Servidor funcionando!',
    timestamp: new Date().toISOString(),
    status: 'online'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de teste rodando na porta ${PORT}`);
  console.log(`📈 Dashboard API: http://localhost:${PORT}/api/dashboard`);
  console.log(`🧪 Teste API: http://localhost:${PORT}/api/test`);
}); 