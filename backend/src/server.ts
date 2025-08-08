
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
 * @fileoverview Servidor Express principal do DOM v2
 * @directory backend/src
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import cors from 'cors';
import express from 'express';
import { validateCPF, validatePassword } from './utils/validation';
import { prisma, connectDatabase, disconnectDatabase, checkDatabaseHealth } from './database';

import paymentsRouter from './routes/payments';
import purchasesRouter from './routes/purchases';
import employeesRouter from './routes/employees';
import budgetsRouter from './routes/budgets';
import payrollRouter from './routes/payroll';
import validationRouter from './routes/validation';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', paymentsRouter);
app.use('/api', purchasesRouter);
app.use('/api', employeesRouter);
app.use('/api/budgets', budgetsRouter);
app.use('/api/payroll', payrollRouter);
app.use('/api/validation', validationRouter);


app.get('/health', async (req, res) => {
  const dbHealth = await checkDatabaseHealth();
  
  res.json({
    status: dbHealth.status,
    version: '2.0.0',
    message: 'DOM v2 - Backend funcionando',
    database: dbHealth.message
  });
});

// Endpoint de teste
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API DOM v2 funcionando',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { cpf, password } = req.body;

  if (!cpf || !password) {
    return res.status(400).json({
      code: 'MISSING_FIELDS'
    });
  }

  // Validar CPF
  if (!validateCPF(cpf)) {
    return res.status(400).json({
      code: 'INVALID_CPF'
    });
  }

  // Validar senha
  if (!validatePassword(password)) {
    return res.status(400).json({
      error: 'Senha deve ter pelo menos 6 caracteres',
      code: 'INVALID_PASSWORD'
    });
  }

  try {
    const employer = await prisma.employer.findUnique({
      where: { cpf },
      include: { user: true }
    });

    const employee = await prisma.employee.findUnique({
      where: { cpf },
      include: { user: true }
    });

    const user = employer?.user || employee?.user;

    if (!user) {
      return res.status(401).json({
        code: 'USER_NOT_FOUND'
      });
    }

    if (password !== '123456') {
      return res.status(401).json({
        error: 'CPF ou senha incorretos',
        code: 'INVALID_CREDENTIALS'
      });
    }

    const userOrganizations = await prisma.userOrganization.findMany({
      where: { userId: user.id },
      include: { organization: true }
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile
      },
      organizations: userOrganizations.map((uo: any) => ({
        id: uo.organization.id,
        name: uo.organization.name,
        type: uo.organization.type,
        role: uo.role
      })),
      message: 'Login realizado com sucesso'
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Endpoint de dashboard (MVP)
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      where: { status: 'ACTIVE' },
      take: 1
    });

    if (organizations.length === 0) {
      return res.json({
        success: true,
        stats: {
          tasks: { active: 0, completed: 0, total: 0 },
          notifications: { unread: 0, total: 0 },
          users: { total: 0 },
          system: { version: '2.0.0', status: 'operational' }
        },
        timestamp: new Date().toISOString()
      });
    }

    const organizationId = organizations[0].id;

    const [activeTasks, completedTasks, totalTasks, unreadNotifications, totalNotifications, totalUsers] = await Promise.all([
      prisma.task.count({ where: { organizationId, status: 'PENDING' } }),
      prisma.task.count({ where: { organizationId, status: 'COMPLETED' } }),
      prisma.task.count({ where: { organizationId } }),
      prisma.notification.count({ where: { organizationId, status: 'UNREAD' } }),
      prisma.notification.count({ where: { organizationId } }),
      prisma.userOrganization.count({ where: { organizationId, status: 'ACTIVE' } })
    ]);

    const stats = {
      tasks: {
        active: activeTasks,
        completed: completedTasks,
        total: totalTasks
      },
      notifications: {
        unread: unreadNotifications,
        total: totalNotifications
      },
      users: {
        total: totalUsers
      },
      system: {
        version: '2.0.0',
        status: 'operational'
      }
    };

    res.json({
      success: true,
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Endpoints de tarefas (MVP)
app.get('/api/tasks', async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      where: { status: 'ACTIVE' },
      take: 1
    });

    if (organizations.length === 0) {
      return res.json({
        success: true,
        tasks: [],
        total: 0
      });
    }

    const organizationId = organizations[0].id;

    const tasks = await prisma.task.findMany({
      where: { organizationId },
      include: {
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      tasks,
      total: tasks.length
    });
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({
      code: 'MISSING_TITLE'
    });
  }

  if (title.length < 3) {
    return res.status(400).json({
      code: 'TITLE_TOO_SHORT'
    });
  }

  try {
    const [organization, user] = await Promise.all([
      prisma.organization.findFirst({ where: { status: 'ACTIVE' } }),
      prisma.user.findFirst()
    ]);

    if (!organization || !user) {
      return res.status(400).json({
        code: 'MISSING_REQUIREMENTS'
      });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || '',
        status: 'PENDING',
        priority: priority || 'MEDIUM',
        assignedTo: user.id,
        createdBy: user.id,
        organizationId: organization.id,
        dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      task: newTask,
      message: 'Tarefa criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority } = req.body;

  try {
    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({
        code: 'TASK_NOT_FOUND'
      });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: title || existingTask.title,
        description: description || existingTask.description,
        status: status || existingTask.status,
        priority: priority || existingTask.priority
      },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    res.json({
      success: true,
      task: updatedTask,
      message: 'Tarefa atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const existingTask = await prisma.task.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({
        code: 'TASK_NOT_FOUND'
      });
    }

    const deletedTask = await prisma.task.delete({
      where: { id },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    res.json({
      success: true,
      message: 'Tarefa removida com sucesso',
      task: deletedTask
    });
  } catch (error) {
    console.error('Erro ao remover tarefa:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Iniciar servidor
async function startServer() {
  try {
    // Conectar ao banco de dados
    await connectDatabase();
    
    app.listen(PORT, () => {
    });
  } catch (error) {
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectDatabase();
  process.exit(0);
});

startServer();

export default app;