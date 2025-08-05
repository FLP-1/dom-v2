const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de teste do dashboard
app.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    message: 'Dashboard funcionando!',
    data: {
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
      }
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de teste rodando na porta ${PORT}`);
  console.log(`📱 Dashboard: http://localhost:${PORT}`);
  console.log(`📊 API Test: http://localhost:${PORT}/dashboard`);
}); 