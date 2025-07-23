/**
 * @fileoverview Servidor Express principal do DOM v2
 * @directory backend/src
 * @description Servidor básico com validações e endpoints essenciais para MVP
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import cors from 'cors';
import express from 'express';
import { validateCPF, validatePassword } from './utils/validation';
import { prisma, connectDatabase, disconnectDatabase, checkDatabaseHealth } from './database';

// Importar rotas das lacunas críticas
import paymentsRouter from './routes/payments';
import purchasesRouter from './routes/purchases';
import employeesRouter from './routes/employees';
import budgetsRouter from './routes/budgets';
import payrollRouter from './routes/payroll';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware básico
app.use(cors());
app.use(express.json());

// Rotas das lacunas críticas
app.use('/api', paymentsRouter);
app.use('/api', purchasesRouter);
app.use('/api', employeesRouter);
app.use('/api/budgets', budgetsRouter);
app.use('/api/payroll', payrollRouter);

// Configuração do servidor

// Endpoint de saúde
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

// Endpoint de login (MVP simples com validações)
app.post('/api/auth/login', async (req, res) => {
  const { cpf, password } = req.body;

  // Validações básicas
  if (!cpf || !password) {
    return res.status(400).json({
      error: 'CPF e senha são obrigatórios',
      code: 'MISSING_FIELDS'
    });
  }

  // Validar CPF
  if (!validateCPF(cpf)) {
    return res.status(400).json({
      error: 'CPF inválido',
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
    // Buscar usuário por CPF (verificar em employer e employee)
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
        error: 'CPF não encontrado',
        code: 'USER_NOT_FOUND'
      });
    }

    // Por enquanto, senha fixa para MVP (será implementada autenticação real depois)
    if (password !== '123456') {
      return res.status(401).json({
        error: 'CPF ou senha incorretos',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Buscar organizações do usuário
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
    // Por enquanto, buscar dados da primeira organização (será implementado filtro por usuário depois)
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

    // Buscar estatísticas da organização
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
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Endpoints de tarefas (MVP)
app.get('/api/tasks', async (req, res) => {
  try {
    // Por enquanto, buscar tarefas da primeira organização
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
      error: 'Título é obrigatório',
      code: 'MISSING_TITLE'
    });
  }

  if (title.length < 3) {
    return res.status(400).json({
      error: 'Título deve ter pelo menos 3 caracteres',
      code: 'TITLE_TOO_SHORT'
    });
  }

  try {
    // Por enquanto, usar a primeira organização e o primeiro usuário
    const [organization, user] = await Promise.all([
      prisma.organization.findFirst({ where: { status: 'ACTIVE' } }),
      prisma.user.findFirst()
    ]);

    if (!organization || !user) {
      return res.status(400).json({
        error: 'Organização ou usuário não encontrado',
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
        error: 'Tarefa não encontrada',
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
        error: 'Tarefa não encontrada',
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
      console.log(`[${new Date().toISOString()}] ` + `🚀 DOM v2 Backend rodando na porta ${PORT}`);
      console.log(`[${new Date().toISOString()}] ` + `📊 Health check: http://localhost:${PORT}/health`);
      console.log(`[${new Date().toISOString()}] ` + `🧪 Test endpoint: http://localhost:${PORT}/api/test`);
      console.log(`[${new Date().toISOString()}] ` + `🔐 Login endpoint: http://localhost:${PORT}/api/auth/login`);
      console.log(`[${new Date().toISOString()}] ` + `📈 Dashboard stats: http://localhost:${PORT}/api/dashboard/stats`);
      console.log(`[${new Date().toISOString()}] ` + `📋 Tasks CRUD: http://localhost:${PORT}/api/tasks`);
      console.log(`[${new Date().toISOString()}] ` + `✅ Validações de CPF e senha ativadas`);
      console.log(`[${new Date().toISOString()}] ` + `🗄️ Banco de dados PostgreSQL conectado`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log(`[${new Date().toISOString()}] ` + '\n🛑 Encerrando servidor...');
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log(`[${new Date().toISOString()}] ` + '\n🛑 Encerrando servidor...');
  await disconnectDatabase();
  process.exit(0);
});

startServer();

export default app;
