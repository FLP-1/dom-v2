import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simulação de banco de dados com dados mais realistas
class MockDatabase {
  private employees = [
    { id: 1, name: 'Maria Silva', salary: 4200.00, status: 'active', department: 'RH' },
    { id: 2, name: 'João Santos', salary: 3800.00, status: 'active', department: 'TI' },
    { id: 3, name: 'Ana Costa', salary: 3500.00, status: 'active', department: 'Financeiro' },
    { id: 4, name: 'Pedro Oliveira', salary: 4100.00, status: 'active', department: 'Vendas' },
    { id: 5, name: 'Lucia Ferreira', salary: 3900.00, status: 'active', department: 'Marketing' },
    { id: 6, name: 'Carlos Lima', salary: 3600.00, status: 'inactive', department: 'TI' },
    { id: 7, name: 'Fernanda Rocha', salary: 4400.00, status: 'active', department: 'RH' },
    { id: 8, name: 'Roberto Alves', salary: 4000.00, status: 'active', department: 'Financeiro' }
  ];

  private budgets = [
    { id: 1, category: 'Alimentação', amount: 3000.00, spent: 1800.00, month: '2024-01' },
    { id: 2, category: 'Transporte', amount: 2000.00, spent: 1200.00, month: '2024-01' },
    { id: 3, category: 'Moradia', amount: 8000.00, spent: 4500.00, month: '2024-01' },
    { id: 4, category: 'Lazer', amount: 2000.00, spent: 1000.00, month: '2024-01' },
    { id: 5, category: 'Tecnologia', amount: 5000.00, spent: 3200.00, month: '2024-01' }
  ];

  private payments = [
    { id: 1, description: 'Pagamento fornecedor ABC', amount: 800.00, status: 'completed', date: '2024-01-15' },
    { id: 2, description: 'Conta de luz', amount: 150.00, status: 'pending', date: '2024-01-16' },
    { id: 3, description: 'Internet', amount: 200.00, status: 'completed', date: '2024-01-14' },
    { id: 4, description: 'Aluguel escritório', amount: 2500.00, status: 'pending', date: '2024-01-20' },
    { id: 5, description: 'Material de limpeza', amount: 300.00, status: 'completed', date: '2024-01-13' }
  ];

  private payrolls = [
    { id: 1, employeeName: 'Maria Silva', grossSalary: 4200.00, netSalary: 3500.00, status: 'paid', date: '2024-01-05' },
    { id: 2, employeeName: 'João Santos', grossSalary: 3800.00, netSalary: 3100.00, status: 'pending', date: '2024-01-05' },
    { id: 3, employeeName: 'Ana Costa', grossSalary: 3500.00, netSalary: 2900.00, status: 'paid', date: '2024-01-05' },
    { id: 4, employeeName: 'Pedro Oliveira', grossSalary: 4100.00, netSalary: 3400.00, status: 'overdue', date: '2024-01-05' },
    { id: 5, employeeName: 'Lucia Ferreira', grossSalary: 3900.00, netSalary: 3200.00, status: 'paid', date: '2024-01-05' }
  ];

  private tasks = [
    { id: 1, title: 'Revisar orçamento mensal', status: 'pending', priority: 'high', assignee: 'Maria Silva' },
    { id: 2, title: 'Aprovar pagamentos pendentes', status: 'in_progress', priority: 'medium', assignee: 'João Santos' },
    { id: 3, title: 'Atualizar planilha de funcionários', status: 'completed', priority: 'low', assignee: 'Ana Costa' },
    { id: 4, title: 'Preparar relatório financeiro', status: 'pending', priority: 'high', assignee: 'Pedro Oliveira' },
    { id: 5, title: 'Organizar reunião de equipe', status: 'in_progress', priority: 'medium', assignee: 'Lucia Ferreira' }
  ];

  private notifications = [
    { id: 1, title: 'Pagamento aprovado', message: 'Pagamento do funcionário João foi aprovado', type: 'success', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, title: 'Orçamento atualizado', message: 'Orçamento de janeiro foi atualizado', type: 'info', timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: 3, title: 'Tarefa concluída', message: 'Relatório financeiro foi finalizado', type: 'success', timestamp: new Date(Date.now() - 10800000).toISOString() },
    { id: 4, title: 'Atenção: Pagamento atrasado', message: 'Pagamento do Pedro está atrasado', type: 'warning', timestamp: new Date(Date.now() - 14400000).toISOString() },
    { id: 5, title: 'Nova tarefa atribuída', message: 'Você tem uma nova tarefa de alta prioridade', type: 'info', timestamp: new Date(Date.now() - 18000000).toISOString() }
  ];

  // Métodos para calcular dados dinâmicos
  getDashboardData() {
    const activeEmployees = this.employees.filter(emp => emp.status === 'active');
    const totalGrossSalary = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0);
    const totalNetSalary = totalGrossSalary * 0.83; // Simulando descontos

    const totalBudgetAmount = this.budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const totalBudgetSpent = this.budgets.reduce((sum, budget) => sum + budget.spent, 0);
    const budgetUtilization = totalBudgetAmount > 0 ? (totalBudgetSpent / totalBudgetAmount) * 100 : 0;

    const pendingPayments = this.payments.filter(p => p.status === 'pending');
    const totalPaymentAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

    const pendingPayrolls = this.payrolls.filter(p => p.status === 'pending' || p.status === 'overdue');
    const totalPendingPayroll = pendingPayrolls.reduce((sum, p) => sum + p.netSalary, 0);

    const unreadNotifications = this.notifications.filter(n => n.type === 'info' || n.type === 'warning').length;
    const pendingTasks = this.tasks.filter(t => t.status === 'pending').length;

    return {
      overview: {
        totalBudgets: this.budgets.length,
        totalBudgetAmount: totalBudgetAmount,
        totalBudgetSpent: totalBudgetSpent,
        budgetUtilization: Math.round(budgetUtilization * 100) / 100,
        totalPayrolls: this.payrolls.length,
        totalGrossSalary: totalGrossSalary,
        totalNetSalary: Math.round(totalNetSalary * 100) / 100,
        totalEmployees: activeEmployees.length,
        totalEmployeeSalary: totalGrossSalary,
        pendingPayments: pendingPayments.length,
        totalPaymentAmount: totalPaymentAmount,
        pendingPurchases: 2, // Mock
        totalPurchaseAmount: 1200.00, // Mock
        unreadNotifications: unreadNotifications,
        pendingTasks: pendingTasks
      },
      recentData: {
        notifications: this.notifications.slice(0, 5),
        tasks: this.tasks.slice(0, 5),
        recentPayrolls: this.payrolls.slice(0, 5),
        recentPayments: this.payments.slice(0, 5),
        recentPurchases: [
          { id: 1, item: 'Material de escritório', amount: 200.00, status: 'approved' },
          { id: 2, item: 'Equipamentos de TI', amount: 1000.00, status: 'pending' }
        ]
      },
      charts: {
        budgetByCategory: this.budgets.reduce((acc, budget) => {
          acc[budget.category] = budget.spent;
          return acc;
        }, {} as Record<string, number>),
        payrollByStatus: this.payrolls.reduce((acc, payroll) => {
          acc[payroll.status] = (acc[payroll.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        paymentsByStatus: this.payments.reduce((acc, payment) => {
          acc[payment.status] = (acc[payment.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        purchasesByStatus: {
          'approved': 10,
          'pending': 2,
          'rejected': 1
        },
        tasksByStatus: this.tasks.reduce((acc, task) => {
          acc[task.status] = (acc[task.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      }
    };
  }

  getDashboardStats() {
    const totalItems = this.employees.length + this.budgets.length + this.payments.length + this.payrolls.length + this.tasks.length;
    const activeItems = this.employees.filter(emp => emp.status === 'active').length + 
                       this.payments.filter(p => p.status === 'completed').length +
                       this.payrolls.filter(p => p.status === 'paid').length +
                       this.tasks.filter(t => t.status === 'completed').length;
    const pendingItems = this.payments.filter(p => p.status === 'pending').length +
                        this.payrolls.filter(p => p.status === 'pending' || p.status === 'overdue').length +
                        this.tasks.filter(t => t.status === 'pending').length;
    const completedItems = this.payments.filter(p => p.status === 'completed').length +
                          this.payrolls.filter(p => p.status === 'paid').length +
                          this.tasks.filter(t => t.status === 'completed').length;

    return {
      totalItems,
      activeItems,
      pendingItems,
      completedItems
    };
  }
}

const db = new MockDatabase();

// Rota do dashboard
app.get('/api/dashboard', (req, res) => {
  try {
    const dashboardData = db.getDashboardData();
    res.json({
      success: true,
      data: dashboardData,
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
    const stats = db.getDashboardStats();
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