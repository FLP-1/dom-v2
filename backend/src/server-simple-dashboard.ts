import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Dados mock para o dashboard
const mockDashboardData = {
  overview: {
    totalBudgets: 5,
    totalBudgetAmount: 15000.00,
    totalBudgetSpent: 8500.00,
    budgetUtilization: 56.67,
    totalPayrolls: 12,
    totalGrossSalary: 45000.00,
    totalNetSalary: 38000.00,
    totalEmployees: 8,
    totalEmployeeSalary: 42000.00,
    pendingPayments: 3,
    totalPaymentAmount: 2500.00,
    pendingPurchases: 2,
    totalPurchaseAmount: 1200.00,
    unreadNotifications: 5,
    pendingTasks: 7
  },
  recentData: {
    notifications: [
      { id: 1, title: 'Pagamento aprovado', message: 'Pagamento do funcionário João foi aprovado', timestamp: new Date().toISOString() },
      { id: 2, title: 'Orçamento atualizado', message: 'Orçamento de março foi atualizado', timestamp: new Date().toISOString() }
    ],
    tasks: [
      { id: 1, title: 'Revisar orçamento', status: 'pending', priority: 'high' },
      { id: 2, title: 'Aprovar pagamentos', status: 'pending', priority: 'medium' }
    ],
    recentPayrolls: [
      { id: 1, employeeName: 'João Silva', amount: 3500.00, status: 'paid' },
      { id: 2, employeeName: 'Maria Santos', amount: 4200.00, status: 'pending' }
    ],
    recentPayments: [
      { id: 1, description: 'Pagamento fornecedor', amount: 800.00, status: 'completed' },
      { id: 2, description: 'Conta de luz', amount: 150.00, status: 'pending' }
    ],
    recentPurchases: [
      { id: 1, item: 'Material de escritório', amount: 200.00, status: 'approved' },
      { id: 2, item: 'Equipamentos', amount: 1000.00, status: 'pending' }
    ]
  },
  charts: {
    budgetByCategory: {
      'Alimentação': 3000,
      'Transporte': 2000,
      'Moradia': 8000,
      'Lazer': 2000
    },
    payrollByStatus: {
      'Pago': 8,
      'Pendente': 3,
      'Atrasado': 1
    },
    paymentsByStatus: {
      'Concluído': 15,
      'Pendente': 3,
      'Cancelado': 1
    },
    purchasesByStatus: {
      'Aprovado': 10,
      'Pendente': 2,
      'Rejeitado': 1
    },
    tasksByStatus: {
      'Concluído': 12,
      'Em andamento': 5,
      'Pendente': 7
    }
  }
};

// Rota do dashboard
app.get('/api/dashboard', (req, res) => {
  try {
    res.json({
      success: true,
      data: mockDashboardData,
      message: 'Dados do dashboard recuperados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar dados do dashboard'
    });
  }
});

// Rota de estatísticas
app.get('/api/dashboard/stats', (req, res) => {
  try {
    const stats = {
      totalItems: 45,
      activeItems: 28,
      pendingItems: 12,
      completedItems: 5
    };
    
    res.json({
      success: true,
      data: stats,
      message: 'Estatísticas do dashboard recuperadas com sucesso'
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas do dashboard'
    });
  }
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📈 Dashboard API: http://localhost:${PORT}/api/dashboard`);
  console.log(`📊 Stats API: http://localhost:${PORT}/api/dashboard/stats`);
  console.log(`🧪 Test API: http://localhost:${PORT}/api/test`);
}); 