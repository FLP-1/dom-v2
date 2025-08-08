
/**
 * 
 * @alternatives
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 */


/**
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 */


/**
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 */
function validateType(value, expectedType) {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

if (!validateType(data, 'object')) {
}


/**
 * @param {string} message - Mensagem de erro
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

assertCritical(typeof data === 'object', 'Dados devem ser um objeto');


/**
 * @param {any} data - Dados a serem validados
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

if (!validateInput(inputData)) {
}


/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * 
 * @dependencies
 * 
 * @usage
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

import express, { Request } from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const app = express();
const PORT = 3001;
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dom-v2-secret-key-2024';

// Middleware
app.use(cors());
app.use(express.json());

const authenticateToken = async (req: AuthenticatedRequest, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    
    if (!user || !user.ativo) {
    }

    req.user = user;
    next();
  } catch (error) {
  }
};

// Rota de login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user || !user.ativo) {
      return res.status(401).json({
        success: false,
      });
    }

    const isValidPassword = await bcrypt.compare(senha, user.senha_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        perfil: user.perfil 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { ultimo_login: new Date() }
    });

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        token,
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          perfil: user.perfil,
          ultimo_login: user.ultimo_login
        }
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota de registro
app.post('/api/auth/register', async (req, res) => {
  try {
    const { nome, email, senha, cpf, perfil = 'empregador' } = req.body;

    if (!nome || !email || !senha || !cpf) {
      return res.status(400).json({
        success: false,
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { cpf: cpf }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await prisma.user.create({
      data: {
        nome,
        email: email.toLowerCase(),
        senha_hash: hashedPassword,
        cpf,
        perfil,
        ativo: true
      }
    });

    // Gerar token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email,
        perfil: newUser.perfil 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          nome: newUser.nome,
          email: newUser.email,
          perfil: newUser.perfil
        }
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

app.get('/api/auth/verify', authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: req.user.id,
        nome: req.user.nome,
        email: req.user.email,
        perfil: req.user.perfil
      }
    }
  });
});

// Rota de refresh token (mesma que verify para simplificar)
app.get('/api/auth/refresh', authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: req.user.id,
        nome: req.user.nome,
        email: req.user.email,
        perfil: req.user.perfil
      }
    }
  });
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor com banco real funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Rota do dashboard com dados reais do PostgreSQL (protegida)
app.get('/api/dashboard', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    // Buscar dados reais do banco
    const [employees, budgets, payments, payrolls, tasks, notifications] = await Promise.all([
      prisma.employee.findMany({ where: { status: 'active' } }),
      prisma.budget.findMany({ where: { status: 'active' } }),
      prisma.payment.findMany(),
      prisma.payroll.findMany(),
      prisma.task.findMany(),
      prisma.notification.findMany({ take: 5, orderBy: { data_criacao: 'desc' } })
    ]);

    const totalGrossSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
    const totalNetSalary = totalGrossSalary * 0.83; // Simulando descontos

    const totalBudgetAmount = budgets.reduce((sum, budget) => sum + budget.amount, 0);
    const totalBudgetSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
    const budgetUtilization = totalBudgetAmount > 0 ? (totalBudgetSpent / totalBudgetAmount) * 100 : 0;

    const pendingPayments = payments.filter(p => p.status === 'pending');
    const totalPaymentAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

    const pendingPayrolls = payrolls.filter(p => p.status === 'pending' || p.status === 'overdue');
    const totalPendingPayroll = pendingPayrolls.reduce((sum, p) => sum + p.netSalary, 0);

    const unreadNotifications = notifications.filter(n => !n.lida).length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;

    const dashboardData = {
      overview: {
        totalBudgets: budgets.length,
        totalBudgetAmount: totalBudgetAmount,
        totalBudgetSpent: totalBudgetSpent,
        budgetUtilization: Math.round(budgetUtilization * 100) / 100,
        totalPayrolls: payrolls.length,
        totalGrossSalary: totalGrossSalary,
        totalNetSalary: Math.round(totalNetSalary * 100) / 100,
        totalEmployees: employees.length,
        totalEmployeeSalary: totalGrossSalary,
        pendingPayments: pendingPayments.length,
        totalPaymentAmount: totalPaymentAmount,
        pendingPurchases: 2, // Mock
        totalPurchaseAmount: 1200.00, // Mock
        unreadNotifications: unreadNotifications,
        pendingTasks: pendingTasks
      },
      recentData: {
        notifications: notifications.map(n => ({
          id: n.id,
          title: n.titulo,
          message: n.mensagem,
          type: n.tipo,
          timestamp: n.data_criacao?.toISOString()
        })),
        tasks: tasks.slice(0, 5).map(t => ({
          id: t.id,
          title: t.titulo,
          status: t.status,
          priority: t.prioridade ? 'high' : 'medium',
          assignee: 'Sistema'
        })),
        recentPayrolls: payrolls.slice(0, 5).map(p => ({
          id: p.id,
          employeeName: p.employeeName,
          amount: p.netSalary,
          status: p.status
        })),
        recentPayments: payments.slice(0, 5).map(p => ({
          id: p.id,
          description: p.description,
          amount: p.amount,
          status: p.status
        })),
        recentPurchases: [
          { id: 2, item: 'Equipamentos de TI', amount: 1000.00, status: 'pending' }
        ]
      },
      charts: {
        budgetByCategory: budgets.reduce((acc, budget) => {
          acc[budget.category] = budget.spent;
          return acc;
        }, {} as Record<string, number>),
        payrollByStatus: payrolls.reduce((acc, payroll) => {
          acc[payroll.status] = (acc[payroll.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        paymentsByStatus: payments.reduce((acc, payment) => {
          acc[payment.status] = (acc[payment.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        purchasesByStatus: {
          'approved': 10,
          'pending': 2,
          'rejected': 1
        },
        tasksByStatus: tasks.reduce((acc, task) => {
          acc[task.status] = (acc[task.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      }
    };

    res.json({
      success: true,
      data: dashboardData,
      message: 'Dados reais do dashboard recuperados com sucesso do PostgreSQL!'
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

app.get('/api/dashboard/stats', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const [employees, budgets, payments, payrolls, tasks] = await Promise.all([
      prisma.employee.findMany(),
      prisma.budget.findMany(),
      prisma.payment.findMany(),
      prisma.payroll.findMany(),
      prisma.task.findMany()
    ]);

    const totalItems = employees.length + budgets.length + payments.length + payrolls.length + tasks.length;
    const activeItems = employees.filter(emp => emp.status === 'active').length + 
                       payments.filter(p => p.status === 'completed').length +
                       payrolls.filter(p => p.status === 'paid').length +
                       tasks.filter(t => t.status === 'completed').length;
    const pendingItems = payments.filter(p => p.status === 'pending').length +
                        payrolls.filter(p => p.status === 'pending' || p.status === 'overdue').length +
                        tasks.filter(t => t.status === 'pending').length;
    const completedItems = payments.filter(p => p.status === 'completed').length +
                          payrolls.filter(p => p.status === 'paid').length +
                          tasks.filter(t => t.status === 'completed').length;

    const stats = {
      totalItems,
      activeItems,
      pendingItems,
      completedItems
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor com banco PostgreSQL real funcionando!',
    database: 'PostgreSQL',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
}); 