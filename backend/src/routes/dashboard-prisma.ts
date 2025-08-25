/**
 * Rotas de Dashboard - DOM v2
 * Gerencia operaÃ§Ãµes para dashboard usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /dashboard/stats
 * Retorna estatÃ­sticas gerais
 */
router.get('/stats', async (req, res) => {
  try {
    // Contar funcionÃ¡rios
    const totalEmployees = await prisma.employee.count();
    const activeEmployees = await prisma.employee.count({
      where: { status: 'ACTIVE' }
    });

    // Contar tarefas
    const totalTasks = await prisma.task.count();
    const pendingTasks = await prisma.task.count({
      where: { status: 'PENDING' }
    });

    // Contar pagamentos
    const totalPayments = await prisma.payment.count();
    const totalPaymentAmount = await prisma.payment.aggregate({
      _sum: { amount: true }
    });

    // Contar orÃ§amentos
    const totalBudgets = await prisma.budget.count();
    const totalBudgetAmount = await prisma.budget.aggregate({
      _sum: { amount: true }
    });

    res.json({
      success: true,
      data: {
        employees: {
          total: totalEmployees,
          active: activeEmployees
        },
        tasks: {
          total: totalTasks,
          pending: pendingTasks
        },
        payments: {
          total: totalPayments,
          amount: totalPaymentAmount._sum.amount || 0
        },
        budgets: {
          total: totalBudgets,
          amount: totalBudgetAmount._sum.amount || 0
        }
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatÃ­sticas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /dashboard/recent-activities
 * Retorna atividades recentes
 */
router.get('/recent-activities', async (req, res) => {
  try {
    const recentTasks = await prisma.task.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        assignedTo: true,
        createdBy: true
      }
    });

    const recentPayments = await prisma.payment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        employee: true
      }
    });

    const recentNotifications = await prisma.notification.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        recipient: true,
        sender: true
      }
    });

    res.json({
      success: true,
      data: {
        tasks: recentTasks,
        payments: recentPayments,
        notifications: recentNotifications
      }
    });
  } catch (error) {
    console.error('Erro ao buscar atividades recentes:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /dashboard/employee/:id
 * Retorna dashboard especÃ­fico do funcionÃ¡rio
 */
router.get('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employeeId = parseInt(id);

    // Buscar funcionÃ¡rio
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        profile: true,
        department: true,
        position: true
      }
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'FuncionÃ¡rio nÃ£o encontrado'
      });
    }

    // Buscar tarefas do funcionÃ¡rio
    const tasks = await prisma.task.findMany({
      where: { assignedToId: employeeId },
      include: {
        category: true
      },
      orderBy: { dueDate: 'asc' }
    });

    // Buscar pagamentos do funcionÃ¡rio
    const payments = await prisma.payment.findMany({
      where: { employeeId },
      orderBy: { paymentDate: 'desc' },
      take: 10
    });

    // Buscar notificaÃ§Ãµes do funcionÃ¡rio
    const notifications = await prisma.notification.findMany({
      where: { recipientId: employeeId },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    res.json({
      success: true,
      data: {
        employee,
        tasks,
        payments,
        notifications
      }
    });
  } catch (error) {
    console.error('Erro ao buscar dashboard do funcionÃ¡rio:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
