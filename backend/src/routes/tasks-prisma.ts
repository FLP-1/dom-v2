/**
 * Rotas de Tarefas - DOM v2
 * Gerencia operaÃ§Ãµes CRUD para tarefas usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /tasks
 * Lista todas as tarefas
 */
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        assignedTo: true,
        createdBy: true,
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /tasks/:id
 * Busca tarefa por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
      include: {
        assignedTo: true,
        createdBy: true,
        category: true,
        comments: true
      }
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarefa nÃ£o encontrada'
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
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /tasks
 * Cria nova tarefa
 */
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      assignedToId,
      categoryId,
      priority,
      dueDate,
      status
    } = req.body;

    // ValidaÃ§Ãµes bÃ¡sicas
    if (!title || !assignedToId) {
      return res.status(400).json({
        success: false,
        message: 'TÃ­tulo e responsÃ¡vel sÃ£o obrigatÃ³rios'
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        assignedToId: parseInt(assignedToId),
        categoryId: categoryId ? parseInt(categoryId) : null,
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        status: status || 'PENDING',
        createdById: 1 // TODO: Pegar do usuÃ¡rio logado
      },
      include: {
        assignedTo: true,
        createdBy: true,
        category: true
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
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /tasks/:id
 * Atualiza tarefa
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que nÃ£o devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    // Converte campos numÃ©ricos
    if (updateData.assignedToId) {
      updateData.assignedToId = parseInt(updateData.assignedToId);
    }
    if (updateData.categoryId) {
      updateData.categoryId = parseInt(updateData.categoryId);
    }
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        assignedTo: true,
        createdBy: true,
        category: true
      }
    });

    res.json({
      success: true,
      data: task,
      message: 'Tarefa atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /tasks/:id
 * Remove tarefa
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Tarefa removida com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover tarefa:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
