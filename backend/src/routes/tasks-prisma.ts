import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// =================== ROTAS DE TAREFAS ===================

// GET /api/tasks - Listar tarefas
router.get('/', async (req, res) => {
  try {
    const { status, priority, responsible_id, creator_id, limit = 50 } = req.query;

    // Construir filtros
    const whereClause: any = {};

    if (status) {
      whereClause.status = status;
    }

    if (priority) {
      whereClause.priority = parseInt(priority);
    }

    if (responsible_id) {
      whereClause.responsible_id = responsible_id;
    }

    if (creator_id) {
      whereClause.creator_id = creator_id;
    }

    // Buscar tarefas
    const tasks = await prisma.tasks.findMany({
      where: whereClause,
      orderBy: [
        { priority: 'desc' },
        { due_date: 'asc' },
        { created_at: 'desc' }
      ],
      take: parseInt(limit)
    });

    // Calcular estatísticas
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const overdueTasks = tasks.filter(t => 
      t.status !== 'completed' && 
      t.due_date && 
      new Date(t.due_date) < new Date()
    ).length;

    res.json({
      success: true,
      data: {
        tasks,
        statistics: {
          total: totalTasks,
          pending: pendingTasks,
          inProgress: inProgressTasks,
          completed: completedTasks,
          overdue: overdueTasks
        }
      }
    });
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar tarefas: ' + error.message
    });
  }
});

// GET /api/tasks/:id - Detalhes da tarefa
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.tasks.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Tarefa não encontrada'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar tarefa: ' + error.message
    });
  }
});

// POST /api/tasks - Criar tarefa
router.post('/', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      priority, 
      due_date, 
      responsible_id, 
      creator_id,
      category
    } = req.body;

    // Validações básicas
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Título e descrição são obrigatórios'
      });
    }

    // Verificar se usuário existe (se fornecido)
    if (responsible_id) {
      const responsible = await prisma.users.findUnique({
        where: { id: responsible_id }
      });

      if (!responsible) {
        return res.status(404).json({
          success: false,
          error: 'Usuário responsável não encontrado'
        });
      }
    }

    if (creator_id) {
      const creator = await prisma.users.findUnique({
        where: { id: creator_id }
      });

      if (!creator) {
        return res.status(404).json({
          success: false,
          error: 'Usuário criador não encontrado'
        });
      }
    }

    // Criar tarefa
    const task = await prisma.tasks.create({
      data: {
        id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        title,
        description,
        priority: priority ? parseInt(priority) : 2, // 1=high, 2=medium, 3=low
        status: 'pending',
        due_date: due_date ? new Date(due_date) : null,
        responsible_id: responsible_id || null,
        creator_id: creator_id || null,
        category: category || 'general',
        active: true
      }
    });

    res.status(201).json({
      success: true,
      data: task,
      message: 'Tarefa criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao criar tarefa: ' + error.message
    });
  }
});

// PUT /api/tasks/:id - Atualizar tarefa
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      description, 
      priority, 
      status, 
      due_date, 
      responsible_id,
      category
    } = req.body;

    // Verificar se tarefa existe
    const existingTask = await prisma.tasks.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: 'Tarefa não encontrada'
      });
    }

    // Verificar se usuário existe (se fornecido)
    if (responsible_id) {
      const responsible = await prisma.users.findUnique({
        where: { id: responsible_id }
      });

      if (!responsible) {
        return res.status(404).json({
          success: false,
          error: 'Usuário responsável não encontrado'
        });
      }
    }

    // Atualizar tarefa
    const updatedTask = await prisma.tasks.update({
      where: { id },
      data: {
        title: title || undefined,
        description: description || undefined,
        priority: priority ? parseInt(priority) : undefined,
        status: status || undefined,
        due_date: due_date ? new Date(due_date) : undefined,
        responsible_id: responsible_id || undefined,
        category: category || undefined,
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      data: updatedTask,
      message: 'Tarefa atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar tarefa: ' + error.message
    });
  }
});

// DELETE /api/tasks/:id - Excluir tarefa
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se tarefa existe
    const existingTask = await prisma.tasks.findUnique({
      where: { id }
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: 'Tarefa não encontrada'
      });
    }

    // Excluir tarefa
    await prisma.tasks.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Tarefa excluída com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao excluir tarefa: ' + error.message
    });
  }
});

// =================== WORKFLOW E STATUS ===================

// PUT /api/tasks/:id/start - Iniciar tarefa
router.put('/:id/start', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.tasks.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Tarefa não encontrada'
      });
    }

    if (task.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: 'Tarefa não está pendente'
      });
    }

    const updatedTask = await prisma.tasks.update({
      where: { id },
      data: {
        status: 'in_progress',
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      data: updatedTask,
      message: 'Tarefa iniciada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao iniciar tarefa:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao iniciar tarefa: ' + error.message
    });
  }
});

// PUT /api/tasks/:id/complete - Completar tarefa
router.put('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;

    const task = await prisma.tasks.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Tarefa não encontrada'
      });
    }

    if (task.status === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Tarefa já está concluída'
      });
    }

    const updatedTask = await prisma.tasks.update({
      where: { id },
      data: {
        status: 'completed',
        completed_at: new Date(),
        comments: comments ? JSON.stringify(comments) : task.comments,
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      data: updatedTask,
      message: 'Tarefa concluída com sucesso'
    });
  } catch (error) {
    console.error('Erro ao completar tarefa:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao completar tarefa: ' + error.message
    });
  }
});

// PUT /api/tasks/:id/pause - Pausar tarefa
router.put('/:id/pause', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.tasks.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Tarefa não encontrada'
      });
    }

    if (task.status !== 'in_progress') {
      return res.status(400).json({
        success: false,
        error: 'Tarefa não está em progresso'
      });
    }

    const updatedTask = await prisma.tasks.update({
      where: { id },
      data: {
        status: 'paused',
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      data: updatedTask,
      message: 'Tarefa pausada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao pausar tarefa:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao pausar tarefa: ' + error.message
    });
  }
});

// =================== DELEGAÇÃO ===================

// PUT /api/tasks/:id/assign - Delegar tarefa
router.put('/:id/assign', async (req, res) => {
  try {
    const { id } = req.params;
    const { responsible_id } = req.body;

    if (!responsible_id) {
      return res.status(400).json({
        success: false,
        error: 'ID do responsável é obrigatório'
      });
    }

    // Verificar se tarefa existe
    const task = await prisma.tasks.findUnique({
      where: { id }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Tarefa não encontrada'
      });
    }

    // Verificar se usuário existe
    const responsible = await prisma.users.findUnique({
      where: { id: responsible_id }
    });

    if (!responsible) {
      return res.status(404).json({
        success: false,
        error: 'Usuário responsável não encontrado'
      });
    }

    const updatedTask = await prisma.tasks.update({
      where: { id },
      data: {
        responsible_id,
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      data: updatedTask,
      message: 'Tarefa delegada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao delegar tarefa:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao delegar tarefa: ' + error.message
    });
  }
});

// =================== RELATÓRIOS E DASHBOARD ===================

// GET /api/tasks/reports/dashboard - Dashboard de tarefas
router.get('/reports/dashboard', async (req, res) => {
  try {
    const { user_id, start_date, end_date } = req.query;

    // Construir filtros
    const whereClause: any = {};

    if (user_id) {
      whereClause.OR = [
        { responsible_id: user_id },
        { creator_id: user_id }
      ];
    }

    if (start_date && end_date) {
      whereClause.created_at = {
        gte: new Date(start_date),
        lte: new Date(end_date)
      };
    }

    // Buscar tarefas
    const tasks = await prisma.tasks.findMany({
      where: whereClause
    });

    // Calcular métricas
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const overdueTasks = tasks.filter(t => 
      t.status !== 'completed' && 
      t.due_date && 
      new Date(t.due_date) < new Date()
    ).length;

    // Agrupar por prioridade
    const byPriority = {
      high: tasks.filter(t => t.priority === 1).length,
      medium: tasks.filter(t => t.priority === 2).length,
      low: tasks.filter(t => t.priority === 3).length
    };

    // Agrupar por categoria
    const byCategory = tasks.reduce((acc, task) => {
      const category = task.category || 'general';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        summary: {
          total: totalTasks,
          pending: pendingTasks,
          inProgress: inProgressTasks,
          completed: completedTasks,
          overdue: overdueTasks,
          completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
        },
        byPriority,
        byCategory
      }
    });
  } catch (error) {
    console.error('Erro ao gerar dashboard de tarefas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar dashboard de tarefas: ' + error.message
    });
  }
});

// GET /api/tasks/reports/kanban - Dados para Kanban board
router.get('/reports/kanban', async (req, res) => {
  try {
    const { user_id } = req.query;

    // Construir filtros
    const whereClause: any = {};
    if (user_id) {
      whereClause.responsible_id = user_id;
    }

    // Buscar tarefas
    const tasks = await prisma.tasks.findMany({
      where: whereClause,
      orderBy: [
        { priority: 'asc' },
        { due_date: 'asc' }
      ]
    });

    // Agrupar por status
    const kanbanData = {
      pending: tasks.filter(t => t.status === 'pending'),
      in_progress: tasks.filter(t => t.status === 'in_progress'),
      paused: tasks.filter(t => t.status === 'paused'),
      completed: tasks.filter(t => t.status === 'completed')
    };

    res.json({
      success: true,
      data: kanbanData
    });
  } catch (error) {
    console.error('Erro ao gerar dados do Kanban:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar dados do Kanban: ' + error.message
    });
  }
});

export default router;