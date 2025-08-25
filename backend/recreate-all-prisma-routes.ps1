# Script para recriar todos os arquivos de rotas Prisma
Write-Host "Recriando todos os arquivos de rotas Prisma..." -ForegroundColor Cyan

# Função para criar arquivo tasks-prisma.ts
function Create-TasksPrisma {
    $content = @'
/**
 * Rotas de Tarefas - DOM v2
 * Gerencia operações CRUD para tarefas usando Prisma ORM
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
        message: 'Tarefa não encontrada'
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

    // Validações básicas
    if (!title || !assignedToId) {
      return res.status(400).json({
        success: false,
        message: 'Título e responsável são obrigatórios'
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
        createdById: 1 // TODO: Pegar do usuário logado
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

    // Remove campos que não devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    // Converte campos numéricos
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
'@
    Set-Content -Path "src/routes/tasks-prisma.ts" -Value $content -Encoding UTF8
    Write-Host "Arquivo tasks-prisma.ts criado" -ForegroundColor Green
}

# Função para criar arquivo documents-prisma.ts
function Create-DocumentsPrisma {
    $content = @'
/**
 * Rotas de Documentos - DOM v2
 * Gerencia operações CRUD para documentos usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /documents
 * Lista todos os documentos
 */
router.get('/', async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      include: {
        uploadedBy: true,
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: documents,
      count: documents.length
    });
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /documents/:id
 * Busca documento por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.document.findUnique({
      where: { id: parseInt(id) },
      include: {
        uploadedBy: true,
        category: true
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Documento não encontrado'
      });
    }

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Erro ao buscar documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /documents
 * Cria novo documento
 */
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      filePath,
      fileType,
      fileSize,
      categoryId,
      tags
    } = req.body;

    // Validações básicas
    if (!title || !filePath) {
      return res.status(400).json({
        success: false,
        message: 'Título e caminho do arquivo são obrigatórios'
      });
    }

    const document = await prisma.document.create({
      data: {
        title,
        description,
        filePath,
        fileType,
        fileSize: fileSize ? parseInt(fileSize) : null,
        categoryId: categoryId ? parseInt(categoryId) : null,
        tags: tags ? JSON.parse(tags) : [],
        uploadedById: 1 // TODO: Pegar do usuário logado
      },
      include: {
        uploadedBy: true,
        category: true
      }
    });

    res.status(201).json({
      success: true,
      data: document,
      message: 'Documento criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /documents/:id
 * Atualiza documento
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que não devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    // Converte campos numéricos
    if (updateData.categoryId) {
      updateData.categoryId = parseInt(updateData.categoryId);
    }
    if (updateData.fileSize) {
      updateData.fileSize = parseInt(updateData.fileSize);
    }
    if (updateData.tags) {
      updateData.tags = JSON.parse(updateData.tags);
    }

    const document = await prisma.document.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        uploadedBy: true,
        category: true
      }
    });

    res.json({
      success: true,
      data: document,
      message: 'Documento atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /documents/:id
 * Remove documento
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.document.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Documento removido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
'@
    Set-Content -Path "src/routes/documents-prisma.ts" -Value $content -Encoding UTF8
    Write-Host "Arquivo documents-prisma.ts criado" -ForegroundColor Green
}

# Função para criar arquivo notifications-prisma.ts
function Create-NotificationsPrisma {
    $content = @'
/**
 * Rotas de Notificações - DOM v2
 * Gerencia operações CRUD para notificações usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /notifications
 * Lista todas as notificações
 */
router.get('/', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      include: {
        recipient: true,
        sender: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: notifications,
      count: notifications.length
    });
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /notifications/:id
 * Busca notificação por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.findUnique({
      where: { id: parseInt(id) },
      include: {
        recipient: true,
        sender: true
      }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notificação não encontrada'
      });
    }

    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('Erro ao buscar notificação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /notifications
 * Cria nova notificação
 */
router.post('/', async (req, res) => {
  try {
    const {
      title,
      message,
      recipientId,
      type,
      priority
    } = req.body;

    // Validações básicas
    if (!title || !message || !recipientId) {
      return res.status(400).json({
        success: false,
        message: 'Título, mensagem e destinatário são obrigatórios'
      });
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        recipientId: parseInt(recipientId),
        type: type || 'INFO',
        priority: priority || 'NORMAL',
        senderId: 1, // TODO: Pegar do usuário logado
        read: false
      },
      include: {
        recipient: true,
        sender: true
      }
    });

    res.status(201).json({
      success: true,
      data: notification,
      message: 'Notificação criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /notifications/:id
 * Atualiza notificação
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que não devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    // Converte campos numéricos
    if (updateData.recipientId) {
      updateData.recipientId = parseInt(updateData.recipientId);
    }

    const notification = await prisma.notification.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        recipient: true,
        sender: true
      }
    });

    res.json({
      success: true,
      data: notification,
      message: 'Notificação atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar notificação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /notifications/:id
 * Remove notificação
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.notification.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Notificação removida com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover notificação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /notifications/:id/read
 * Marca notificação como lida
 */
router.put('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.update({
      where: { id: parseInt(id) },
      data: { read: true },
      include: {
        recipient: true,
        sender: true
      }
    });

    res.json({
      success: true,
      data: notification,
      message: 'Notificação marcada como lida'
    });
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
'@
    Set-Content -Path "src/routes/notifications-prisma.ts" -Value $content -Encoding UTF8
    Write-Host "Arquivo notifications-prisma.ts criado" -ForegroundColor Green
}

# Função para criar arquivo profiles-prisma.ts
function Create-ProfilesPrisma {
    $content = @'
/**
 * Rotas de Perfis - DOM v2
 * Gerencia operações CRUD para perfis usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /profiles
 * Lista todos os perfis
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        user: true,
        permissions: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: profiles,
      count: profiles.length
    });
  } catch (error) {
    console.error('Erro ao buscar perfis:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /profiles/:id
 * Busca perfil por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await prisma.profile.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        permissions: true
      }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil não encontrado'
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /profiles
 * Cria novo perfil
 */
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      userId,
      permissions
    } = req.body;

    // Validações básicas
    if (!name || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Nome e usuário são obrigatórios'
      });
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        description,
        userId: parseInt(userId),
        permissions: permissions ? JSON.parse(permissions) : []
      },
      include: {
        user: true,
        permissions: true
      }
    });

    res.status(201).json({
      success: true,
      data: profile,
      message: 'Perfil criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /profiles/:id
 * Atualiza perfil
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que não devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    // Converte campos numéricos
    if (updateData.userId) {
      updateData.userId = parseInt(updateData.userId);
    }
    if (updateData.permissions) {
      updateData.permissions = JSON.parse(updateData.permissions);
    }

    const profile = await prisma.profile.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        user: true,
        permissions: true
      }
    });

    res.json({
      success: true,
      data: profile,
      message: 'Perfil atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /profiles/:id
 * Remove perfil
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.profile.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Perfil removido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
'@
    Set-Content -Path "src/routes/profiles-prisma.ts" -Value $content -Encoding UTF8
    Write-Host "Arquivo profiles-prisma.ts criado" -ForegroundColor Green
}

# Função para criar arquivo settings-prisma.ts
function Create-SettingsPrisma {
    $content = @'
/**
 * Rotas de Configurações - DOM v2
 * Gerencia operações CRUD para configurações usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /settings
 * Lista todas as configurações
 */
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.setting.findMany({
      orderBy: {
        category: 'asc'
      }
    });

    res.json({
      success: true,
      data: settings,
      count: settings.length
    });
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /settings/:id
 * Busca configuração por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const setting = await prisma.setting.findUnique({
      where: { id: parseInt(id) }
    });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'Configuração não encontrada'
      });
    }

    res.json({
      success: true,
      data: setting
    });
  } catch (error) {
    console.error('Erro ao buscar configuração:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /settings
 * Cria nova configuração
 */
router.post('/', async (req, res) => {
  try {
    const {
      key,
      value,
      category,
      description
    } = req.body;

    // Validações básicas
    if (!key || !value) {
      return res.status(400).json({
        success: false,
        message: 'Chave e valor são obrigatórios'
      });
    }

    const setting = await prisma.setting.create({
      data: {
        key,
        value,
        category: category || 'GENERAL',
        description
      }
    });

    res.status(201).json({
      success: true,
      data: setting,
      message: 'Configuração criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar configuração:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /settings/:id
 * Atualiza configuração
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que não devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    const setting = await prisma.setting.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({
      success: true,
      data: setting,
      message: 'Configuração atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /settings/:id
 * Remove configuração
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.setting.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Configuração removida com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover configuração:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /settings/category/:category
 * Busca configurações por categoria
 */
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const settings = await prisma.setting.findMany({
      where: { category },
      orderBy: {
        key: 'asc'
      }
    });

    res.json({
      success: true,
      data: settings,
      count: settings.length
    });
  } catch (error) {
    console.error('Erro ao buscar configurações da categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
'@
    Set-Content -Path "src/routes/settings-prisma.ts" -Value $content -Encoding UTF8
    Write-Host "Arquivo settings-prisma.ts criado" -ForegroundColor Green
}

# Função para criar arquivo dashboard-prisma.ts
function Create-DashboardPrisma {
    $content = @'
/**
 * Rotas de Dashboard - DOM v2
 * Gerencia operações para dashboard usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /dashboard/stats
 * Retorna estatísticas gerais
 */
router.get('/stats', async (req, res) => {
  try {
    // Contar funcionários
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

    // Contar orçamentos
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
    console.error('Erro ao buscar estatísticas:', error);
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
 * Retorna dashboard específico do funcionário
 */
router.get('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employeeId = parseInt(id);

    // Buscar funcionário
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
        message: 'Funcionário não encontrado'
      });
    }

    // Buscar tarefas do funcionário
    const tasks = await prisma.task.findMany({
      where: { assignedToId: employeeId },
      include: {
        category: true
      },
      orderBy: { dueDate: 'asc' }
    });

    // Buscar pagamentos do funcionário
    const payments = await prisma.payment.findMany({
      where: { employeeId },
      orderBy: { paymentDate: 'desc' },
      take: 10
    });

    // Buscar notificações do funcionário
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
    console.error('Erro ao buscar dashboard do funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
'@
    Set-Content -Path "src/routes/dashboard-prisma.ts" -Value $content -Encoding UTF8
    Write-Host "Arquivo dashboard-prisma.ts criado" -ForegroundColor Green
}

# Executar criação de todos os arquivos
Write-Host "Criando arquivos de rotas Prisma..." -ForegroundColor Yellow

Create-TasksPrisma
Create-DocumentsPrisma
Create-NotificationsPrisma
Create-ProfilesPrisma
Create-SettingsPrisma
Create-DashboardPrisma

Write-Host "Todos os arquivos de rotas Prisma foram criados com sucesso!" -ForegroundColor Green
Write-Host "Testando o backend..." -ForegroundColor Cyan

# Testar se o backend inicia
try {
    $process = Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory (Get-Location) -PassThru -WindowStyle Hidden
    
    # Aguardar um pouco para o servidor inicializar
    Start-Sleep -Seconds 10
    
    # Verificar se está rodando na porta 3001
    $portCheck = netstat -ano | findstr ":3001"
    
    if ($portCheck) {
        Write-Host "Backend iniciado com sucesso na porta 3001!" -ForegroundColor Green
        Write-Host "Acesse: http://localhost:3001" -ForegroundColor Cyan
    }
    else {
        Write-Host "Backend pode não ter iniciado corretamente" -ForegroundColor Yellow
    }
    
}
catch {
    Write-Host "Erro ao iniciar backend: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Processo concluído!" -ForegroundColor Green
