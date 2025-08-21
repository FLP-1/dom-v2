import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// =================== ROTAS DE ORÇAMENTOS ===================

// GET /api/financial/budgets - Listar orçamentos
router.get('/budgets', async (req, res) => {
  try {
    const { user_id, status, category } = req.query;

    // Construir filtros
    const whereClause: any = {};

    if (user_id) {
      whereClause.user_id = user_id;
    }

    if (status) {
      whereClause.status = status;
    }

    if (category) {
      whereClause.category = category;
    }

    // Buscar orçamentos
    const budgets = await prisma.budget.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc'
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Calcular estatísticas
    const totalBudgets = budgets.length;
    const totalAmount = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
    const totalRemaining = totalAmount - totalSpent;

    res.json({
      success: true,
      data: {
        budgets,
        statistics: {
          totalBudgets,
          totalAmount: Math.round(totalAmount * 100) / 100,
          totalSpent: Math.round(totalSpent * 100) / 100,
          totalRemaining: Math.round(totalRemaining * 100) / 100,
          percentageSpent: totalAmount > 0 ? Math.round((totalSpent / totalAmount) * 100) : 0
        }
      }
    });
  } catch (error) {
    console.error('Erro ao listar orçamentos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar orçamentos: ' + error.message
    });
  }
});

// POST /api/financial/budgets - Criar orçamento
router.post('/budgets', async (req, res) => {
  try {
    const { name, amount, category, start_date, end_date, user_id } = req.body;

    // Validações básicas
    if (!name || !amount || !category || !start_date || !end_date) {
      return res.status(400).json({
        success: false,
        error: 'Nome, valor, categoria, data inicial e final são obrigatórios'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'O valor do orçamento deve ser maior que zero'
      });
    }

    // Verificar se usuário existe (se fornecido)
    if (user_id) {
      const user = await prisma.users.findUnique({
        where: { id: user_id }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
    }

    // Criar orçamento
    const budget = await prisma.budget.create({
      data: {
        id: `budget_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name,
        amount: parseFloat(amount),
        category,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        user_id: user_id || null,
        spent: 0,
        status: 'active'
      },
      include: {
        users: user_id ? {
          select: {
            id: true,
            name: true,
            email: true
          }
        } : false
      }
    });

    res.status(201).json({
      success: true,
      data: budget,
      message: 'Orçamento criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao criar orçamento: ' + error.message
    });
  }
});

// PUT /api/financial/budgets/:id - Atualizar orçamento
router.put('/budgets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, category, start_date, end_date, status } = req.body;

    // Verificar se orçamento existe
    const existingBudget = await prisma.budget.findUnique({
      where: { id }
    });

    if (!existingBudget) {
      return res.status(404).json({
        success: false,
        error: 'Orçamento não encontrado'
      });
    }

    // Atualizar orçamento
    const updatedBudget = await prisma.budget.update({
      where: { id },
      data: {
        name: name || undefined,
        amount: amount ? parseFloat(amount) : undefined,
        category: category || undefined,
        start_date: start_date ? new Date(start_date) : undefined,
        end_date: end_date ? new Date(end_date) : undefined,
        status: status || undefined,
        updated_at: new Date()
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedBudget,
      message: 'Orçamento atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar orçamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar orçamento: ' + error.message
    });
  }
});

// DELETE /api/financial/budgets/:id - Excluir orçamento
router.delete('/budgets/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se orçamento existe
    const existingBudget = await prisma.budget.findUnique({
      where: { id }
    });

    if (!existingBudget) {
      return res.status(404).json({
        success: false,
        error: 'Orçamento não encontrado'
      });
    }

    // Excluir orçamento
    await prisma.budget.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Orçamento excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir orçamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao excluir orçamento: ' + error.message
    });
  }
});

// =================== ROTAS DE PAGAMENTOS ===================

// GET /api/financial/payments - Listar pagamentos
router.get('/payments', async (req, res) => {
  try {
    const { user_id, status, start_date, end_date } = req.query;

    // Construir filtros
    const whereClause: any = {};

    if (user_id) {
      whereClause.user_id = user_id;
    }

    if (status) {
      whereClause.status = status;
    }

    if (start_date && end_date) {
      whereClause.due_date = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }

    // Buscar pagamentos
    const payments = await prisma.payment.findMany({
      where: whereClause,
      orderBy: {
        due_date: 'desc'
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // Calcular estatísticas
    const totalPayments = payments.length;
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const pendingPayments = payments.filter(p => p.status === 'pending').length;
    const paidPayments = payments.filter(p => p.status === 'paid').length;
    const overduePayments = payments.filter(p => 
      p.status === 'pending' && new Date(p.due_date) < new Date()
    ).length;

    res.json({
      success: true,
      data: {
        payments,
        statistics: {
          totalPayments,
          totalAmount: Math.round(totalAmount * 100) / 100,
          pendingPayments,
          paidPayments,
          overduePayments
        }
      }
    });
  } catch (error) {
    console.error('Erro ao listar pagamentos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar pagamentos: ' + error.message
    });
  }
});

// POST /api/financial/payments - Criar pagamento
router.post('/payments', async (req, res) => {
  try {
    const { amount, description, due_date, user_id } = req.body;

    // Validações básicas
    if (!amount || !description || !due_date) {
      return res.status(400).json({
        success: false,
        error: 'Valor, descrição e data de vencimento são obrigatórios'
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'O valor do pagamento deve ser maior que zero'
      });
    }

    // Verificar se usuário existe (se fornecido)
    if (user_id) {
      const user = await prisma.users.findUnique({
        where: { id: user_id }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
    }

    // Criar pagamento
    const payment = await prisma.payment.create({
      data: {
        id: `payment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        amount: parseFloat(amount),
        description,
        due_date: new Date(due_date),
        user_id: user_id || null,
        status: 'pending'
      },
      include: {
        users: user_id ? {
          select: {
            id: true,
            name: true,
            email: true
          }
        } : false
      }
    });

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Pagamento criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao criar pagamento: ' + error.message
    });
  }
});

// PUT /api/financial/payments/:id - Atualizar pagamento
router.put('/payments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, due_date, status } = req.body;

    // Verificar se pagamento existe
    const existingPayment = await prisma.payment.findUnique({
      where: { id }
    });

    if (!existingPayment) {
      return res.status(404).json({
        success: false,
        error: 'Pagamento não encontrado'
      });
    }

    // Atualizar pagamento
    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: {
        amount: amount ? parseFloat(amount) : undefined,
        description: description || undefined,
        due_date: due_date ? new Date(due_date) : undefined,
        status: status || undefined,
        updated_at: new Date()
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedPayment,
      message: 'Pagamento atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar pagamento: ' + error.message
    });
  }
});

// PUT /api/financial/payments/:id/pay - Marcar pagamento como pago
router.put('/payments/:id/pay', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se pagamento existe
    const existingPayment = await prisma.payment.findUnique({
      where: { id }
    });

    if (!existingPayment) {
      return res.status(404).json({
        success: false,
        error: 'Pagamento não encontrado'
      });
    }

    if (existingPayment.status === 'paid') {
      return res.status(400).json({
        success: false,
        error: 'Pagamento já foi marcado como pago'
      });
    }

    // Marcar como pago
    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: {
        status: 'paid',
        updated_at: new Date()
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedPayment,
      message: 'Pagamento marcado como pago'
    });
  } catch (error) {
    console.error('Erro ao marcar pagamento como pago:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao marcar pagamento como pago: ' + error.message
    });
  }
});

// DELETE /api/financial/payments/:id - Excluir pagamento
router.delete('/payments/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se pagamento existe
    const existingPayment = await prisma.payment.findUnique({
      where: { id }
    });

    if (!existingPayment) {
      return res.status(404).json({
        success: false,
        error: 'Pagamento não encontrado'
      });
    }

    // Excluir pagamento
    await prisma.payment.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Pagamento excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao excluir pagamento: ' + error.message
    });
  }
});

// =================== RELATÓRIOS FINANCEIROS ===================

// GET /api/financial/reports/dashboard - Dashboard financeiro
router.get('/reports/dashboard', async (req, res) => {
  try {
    const { user_id } = req.query;

    // Construir filtros
    const whereClause: any = {};
    if (user_id) {
      whereClause.user_id = user_id;
    }

    // Buscar orçamentos
    const budgets = await prisma.budget.findMany({
      where: whereClause
    });

    // Buscar pagamentos
    const payments = await prisma.payment.findMany({
      where: whereClause
    });

    // Calcular métricas de orçamentos
    const totalBudgetAmount = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const totalBudgetSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
    const budgetRemaining = totalBudgetAmount - totalBudgetSpent;

    // Calcular métricas de pagamentos
    const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const pendingPayments = payments.filter(p => p.status === 'pending');
    const paidPayments = payments.filter(p => p.status === 'paid');
    const overduePayments = payments.filter(p => 
      p.status === 'pending' && new Date(p.due_date) < new Date()
    );

    // Calcular métricas por categoria de orçamento
    const budgetsByCategory = budgets.reduce((acc, budget) => {
      if (!acc[budget.category]) {
        acc[budget.category] = {
          category: budget.category,
          totalAmount: 0,
          totalSpent: 0,
          remaining: 0,
          count: 0
        };
      }
      acc[budget.category].totalAmount += budget.amount;
      acc[budget.category].totalSpent += budget.spent;
      acc[budget.category].remaining += (budget.amount - budget.spent);
      acc[budget.category].count += 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        budgets: {
          total: budgets.length,
          totalAmount: Math.round(totalBudgetAmount * 100) / 100,
          totalSpent: Math.round(totalBudgetSpent * 100) / 100,
          remaining: Math.round(budgetRemaining * 100) / 100,
          percentageSpent: totalBudgetAmount > 0 ? Math.round((totalBudgetSpent / totalBudgetAmount) * 100) : 0,
          byCategory: Object.values(budgetsByCategory)
        },
        payments: {
          total: payments.length,
          totalAmount: Math.round(totalPayments * 100) / 100,
          pending: {
            count: pendingPayments.length,
            amount: Math.round(pendingPayments.reduce((sum, p) => sum + p.amount, 0) * 100) / 100
          },
          paid: {
            count: paidPayments.length,
            amount: Math.round(paidPayments.reduce((sum, p) => sum + p.amount, 0) * 100) / 100
          },
          overdue: {
            count: overduePayments.length,
            amount: Math.round(overduePayments.reduce((sum, p) => sum + p.amount, 0) * 100) / 100
          }
        },
        summary: {
          totalIncome: Math.round(paidPayments.reduce((sum, p) => sum + p.amount, 0) * 100) / 100,
          totalExpenses: Math.round(totalBudgetSpent * 100) / 100,
          netBalance: Math.round((paidPayments.reduce((sum, p) => sum + p.amount, 0) - totalBudgetSpent) * 100) / 100
        }
      }
    });
  } catch (error) {
    console.error('Erro ao gerar dashboard financeiro:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar dashboard financeiro: ' + error.message
    });
  }
});

// GET /api/financial/reports/monthly - Relatório mensal
router.get('/reports/monthly', async (req, res) => {
  try {
    const { month, year, user_id } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        error: 'Mês e ano são obrigatórios'
      });
    }

    // Calcular período do mês
    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59);

    // Construir filtros
    const whereClause: any = {
      created_at: {
        gte: startDate,
        lte: endDate
      }
    };

    if (user_id) {
      whereClause.user_id = user_id;
    }

    // Buscar dados do período
    const budgets = await prisma.budget.findMany({
      where: whereClause
    });

    const payments = await prisma.payment.findMany({
      where: {
        ...whereClause,
        due_date: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    // Calcular métricas do mês
    const monthlyData = {
      period: {
        month: parseInt(month),
        year: parseInt(year),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      },
      budgets: {
        created: budgets.length,
        totalAmount: Math.round(budgets.reduce((sum, b) => sum + b.amount, 0) * 100) / 100,
        totalSpent: Math.round(budgets.reduce((sum, b) => sum + b.spent, 0) * 100) / 100
      },
      payments: {
        total: payments.length,
        totalAmount: Math.round(payments.reduce((sum, p) => sum + p.amount, 0) * 100) / 100,
        paid: payments.filter(p => p.status === 'paid').length,
        pending: payments.filter(p => p.status === 'pending').length
      }
    };

    res.json({
      success: true,
      data: monthlyData
    });
  } catch (error) {
    console.error('Erro ao gerar relatório mensal:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar relatório mensal: ' + error.message
    });
  }
});

export default router;
