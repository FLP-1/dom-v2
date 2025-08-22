import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth-middleware';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de autenticação para todas as rotas
router.use(authenticateToken);

// GET /api/quality/checks - Listar verificações de qualidade
router.get('/checks', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { category, status, priority, assigned_to } = req.query;

    const whereClause: any = {
      OR: [
        { user_id: user_id as string },
        { assigned_to: user_id as string }
      ]
    };

    if (category) {
      whereClause.category = category;
    }

    if (status) {
      whereClause.status = status;
    }

    if (priority) {
      whereClause.priority = priority;
    }

    if (assigned_to) {
      whereClause.assigned_to = assigned_to;
    }

    const checks = await prisma.qualityCheck.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        assigned_user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json({
      success: true,
      data: checks
    });
  } catch (error) {
    console.error('Erro ao listar verificações de qualidade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/quality/checks - Criar nova verificação de qualidade
router.post('/checks', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { name, description, category, priority, assigned_to, before_photo } = req.body;

    if (!name || !category || !priority) {
      return res.status(400).json({
        success: false,
        error: 'Nome, categoria e prioridade são obrigatórios'
      });
    }

    const check = await prisma.qualityCheck.create({
      data: {
        user_id: user_id as string,
        name,
        description,
        category,
        priority,
        assigned_to,
        before_photo,
        status: 'pending'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        assigned_user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: check
    });
  } catch (error) {
    console.error('Erro ao criar verificação de qualidade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/quality/checks/:id - Obter detalhes da verificação
router.get('/checks/:id', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;

    const check = await prisma.qualityCheck.findFirst({
      where: {
        id,
        OR: [
          { user_id: user_id as string },
          { assigned_to: user_id as string }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        assigned_user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!check) {
      return res.status(404).json({
        success: false,
        error: 'Verificação de qualidade não encontrada'
      });
    }

    res.json({
      success: true,
      data: check
    });
  } catch (error) {
    console.error('Erro ao buscar verificação de qualidade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// PUT /api/quality/checks/:id - Atualizar verificação de qualidade
router.put('/checks/:id', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;
    const { name, description, category, priority, status, score, notes, after_photo } = req.body;

    const check = await prisma.qualityCheck.findFirst({
      where: {
        id,
        OR: [
          { user_id: user_id as string },
          { assigned_to: user_id as string }
        ]
      }
    });

    if (!check) {
      return res.status(404).json({
        success: false,
        error: 'Verificação de qualidade não encontrada'
      });
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category) updateData.category = category;
    if (priority) updateData.priority = priority;
    if (status) updateData.status = status;
    if (score !== undefined) updateData.score = score;
    if (notes !== undefined) updateData.notes = notes;
    if (after_photo) updateData.after_photo = after_photo;
    
    // Se status for 'completed', definir completed_at
    if (status === 'completed') {
      updateData.completed_at = new Date();
    }

    updateData.updated_at = new Date();

    const updatedCheck = await prisma.qualityCheck.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        assigned_user: {
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
      data: updatedCheck
    });
  } catch (error) {
    console.error('Erro ao atualizar verificação de qualidade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// DELETE /api/quality/checks/:id - Excluir verificação de qualidade
router.delete('/checks/:id', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;

    const check = await prisma.qualityCheck.findFirst({
      where: {
        id,
        user_id: user_id as string
      }
    });

    if (!check) {
      return res.status(404).json({
        success: false,
        error: 'Verificação de qualidade não encontrada'
      });
    }

    await prisma.qualityCheck.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Verificação de qualidade excluída com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir verificação de qualidade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/quality/templates - Listar templates de qualidade
router.get('/templates', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { category, is_active } = req.query;

    const whereClause: any = {
      user_id: user_id as string
    };

    if (category) {
      whereClause.category = category;
    }

    if (is_active !== undefined) {
      whereClause.is_active = is_active === 'true';
    }

    const templates = await prisma.qualityTemplate.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json({
      success: true,
      data: templates
    });
  } catch (error) {
    console.error('Erro ao listar templates de qualidade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/quality/templates - Criar template de qualidade
router.post('/templates', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { name, description, category, items } = req.body;

    if (!name || !category || !items) {
      return res.status(400).json({
        success: false,
        error: 'Nome, categoria e itens são obrigatórios'
      });
    }

    const template = await prisma.qualityTemplate.create({
      data: {
        user_id: user_id as string,
        name,
        description,
        category,
        items: JSON.parse(JSON.stringify(items))
      }
    });

    res.status(201).json({
      success: true,
      data: template
    });
  } catch (error) {
    console.error('Erro ao criar template de qualidade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/quality/reports - Listar relatórios de qualidade
router.get('/reports', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { period, start_date, end_date } = req.query;

    const whereClause: any = {
      user_id: user_id as string
    };

    if (period) {
      whereClause.period = period;
    }

    if (start_date || end_date) {
      whereClause.start_date = {};
      if (start_date) {
        whereClause.start_date.gte = new Date(start_date as string);
      }
      if (end_date) {
        whereClause.end_date.lte = new Date(end_date as string);
      }
    }

    const reports = await prisma.qualityReport.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json({
      success: true,
      data: reports
    });
  } catch (error) {
    console.error('Erro ao listar relatórios de qualidade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/quality/reports - Gerar relatório de qualidade
router.post('/reports', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { title, description, period, start_date, end_date } = req.body;

    if (!title || !period || !start_date || !end_date) {
      return res.status(400).json({
        success: false,
        error: 'Título, período, data inicial e final são obrigatórios'
      });
    }

    // Buscar verificações no período
    const checks = await prisma.qualityCheck.findMany({
      where: {
        user_id: user_id as string,
        created_at: {
          gte: new Date(start_date),
          lte: new Date(end_date)
        }
      }
    });

    // Calcular estatísticas
    const total_checks = checks.length;
    const completed_checks = checks.filter(c => c.status === 'completed').length;
    const failed_checks = checks.filter(c => c.status === 'failed').length;
    const scores = checks.filter(c => c.score !== null).map(c => c.score!);
    const average_score = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;

    // Criar resumo
    const summary = {
      total_checks,
      completed_checks,
      failed_checks,
      pending_checks: total_checks - completed_checks - failed_checks,
      completion_rate: total_checks > 0 ? (completed_checks / total_checks) * 100 : 0,
      average_score,
      categories: checks.reduce((acc, check) => {
        acc[check.category] = (acc[check.category] || 0) + 1;
        return acc;
      }, {} as any)
    };

    const report = await prisma.qualityReport.create({
      data: {
        user_id: user_id as string,
        title,
        description,
        period,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        total_checks,
        completed_checks,
        failed_checks,
        average_score: average_score ? parseFloat(average_score.toFixed(2)) : null,
        summary: JSON.parse(JSON.stringify(summary))
      }
    });

    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Erro ao gerar relatório de qualidade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/quality/statistics - Estatísticas gerais
router.get('/statistics', async (req, res) => {
  try {
    const user_id = req.user?.id;

    // Contar verificações por status
    const checksByStatus = await prisma.qualityCheck.groupBy({
      by: ['status'],
      where: {
        OR: [
          { user_id: user_id as string },
          { assigned_to: user_id as string }
        ]
      },
      _count: {
        status: true
      }
    });

    // Contar verificações por categoria
    const checksByCategory = await prisma.qualityCheck.groupBy({
      by: ['category'],
      where: {
        OR: [
          { user_id: user_id as string },
          { assigned_to: user_id as string }
        ]
      },
      _count: {
        category: true
      }
    });

    // Contar verificações por prioridade
    const checksByPriority = await prisma.qualityCheck.groupBy({
      by: ['priority'],
      where: {
        OR: [
          { user_id: user_id as string },
          { assigned_to: user_id as string }
        ]
      },
      _count: {
        priority: true
      }
    });

    // Calcular pontuação média
    const averageScore = await prisma.qualityCheck.aggregate({
      where: {
        OR: [
          { user_id: user_id as string },
          { assigned_to: user_id as string }
        ],
        score: {
          not: null
        }
      },
      _avg: {
        score: true
      }
    });

    // Total de templates
    const totalTemplates = await prisma.qualityTemplate.count({
      where: {
        user_id: user_id as string,
        is_active: true
      }
    });

    res.json({
      success: true,
      data: {
        checks_by_status: checksByStatus.map(item => ({
          status: item.status,
          count: item._count.status
        })),
        checks_by_category: checksByCategory.map(item => ({
          category: item.category,
          count: item._count.category
        })),
        checks_by_priority: checksByPriority.map(item => ({
          priority: item.priority,
          count: item._count.priority
        })),
        average_score: averageScore._avg.score || 0,
        total_templates: totalTemplates
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas de qualidade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

export default router;
