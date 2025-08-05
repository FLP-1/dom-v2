import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma';

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste do dashboard
app.get('/api/dashboard', async (req, res) => {
  try {
    // Buscar dados básicos do banco
    const [budgets, payrolls, employees, payments, purchases] = await Promise.all([
      prisma.budget.findMany({ where: { status: 'active' } }),
      prisma.payroll.findMany(),
      prisma.employee.findMany({ where: { status: 'active' } }),
      prisma.payment.findMany(),
      prisma.purchase.findMany()
    ]);

    // Calcular estatísticas
    const totalBudgets = budgets.length;
    const totalBudgetAmount = budgets.reduce((sum, b) => sum + (b.amount || 0), 0);
    const totalBudgetSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
    const budgetUtilization = totalBudgetAmount > 0 ? (totalBudgetSpent / totalBudgetAmount) * 100 : 0;

    const totalPayrolls = payrolls.length;
    const totalGrossSalary = payrolls.reduce((sum, p) => sum + (p.grossSalary || 0), 0);
    const totalNetSalary = payrolls.reduce((sum, p) => sum + (p.netSalary || 0), 0);

    const totalEmployees = employees.length;
    const totalEmployeeSalary = employees.reduce((sum, e) => sum + (e.salary || 0), 0);

    const pendingPayments = payments.filter(p => p.status === 'pending').length;
    const totalPaymentAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

    const pendingPurchases = purchases.filter(p => p.status === 'pending').length;
    const totalPurchaseAmount = purchases.reduce((sum, p) => sum + (p.amount || 0), 0);

    const dashboardData = {
      overview: {
        totalBudgets,
        totalBudgetAmount,
        totalBudgetSpent,
        budgetUtilization: Math.round(budgetUtilization * 100) / 100,
        totalPayrolls,
        totalGrossSalary,
        totalNetSalary,
        totalEmployees,
        totalEmployeeSalary,
        pendingPayments,
        totalPaymentAmount,
        pendingPurchases,
        totalPurchaseAmount,
        unreadNotifications: 0,
        pendingTasks: 0
      },
      recentData: {
        notifications: [],
        tasks: [],
        recentPayrolls: payrolls.slice(0, 3),
        recentPayments: payments.slice(0, 3),
        recentPurchases: purchases.slice(0, 3)
      },
      charts: {
        budgetByCategory: {},
        payrollByStatus: {},
        paymentsByStatus: {},
        purchasesByStatus: {},
        tasksByStatus: {}
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
  res.json({ message: 'Servidor funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📈 Dashboard API: http://localhost:${PORT}/api/dashboard`);
  console.log(`🧪 Teste API: http://localhost:${PORT}/api/test`);
}); 