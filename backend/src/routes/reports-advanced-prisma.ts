import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth-middleware';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de autenticação para todas as rotas
router.use(authenticateToken);

// GET /api/reports-advanced/reports - Listar relatórios do usuário
router.get('/reports', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { type, category, is_active } = req.query;

    const whereClause: any = {
      user_id: user_id as string
    };

    if (type) {
      whereClause.type = type;
    }

    if (category) {
      whereClause.category = category;
    }

    if (is_active !== undefined) {
      whereClause.is_active = is_active === 'true';
    }

    const reports = await prisma.report.findMany({
      where: whereClause,
      include: {
        executions: {
          orderBy: {
            started_at: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json({
      success: true,
      data: reports.map(report => ({
        id: report.id,
        name: report.name,
        description: report.description,
        type: report.type,
        category: report.category,
        is_public: report.is_public,
        is_active: report.is_active,
        last_execution: report.executions[0] ? {
          status: report.executions[0].status,
          started_at: report.executions[0].started_at,
          completed_at: report.executions[0].completed_at
        } : null,
        created_at: report.created_at,
        updated_at: report.updated_at
      }))
    });
  } catch (error) {
    console.error('Erro ao listar relatórios:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/reports-advanced/reports - Criar novo relatório
router.post('/reports', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { name, description, type, category, template, filters, parameters, schedule, is_public } = req.body;

    if (!name || !type || !category) {
      return res.status(400).json({
        success: false,
        error: 'Nome, tipo e categoria são obrigatórios'
      });
    }

    const report = await prisma.report.create({
      data: {
        user_id: user_id as string,
        name,
        description,
        type,
        category,
        template: template ? JSON.parse(JSON.stringify(template)) : null,
        filters: filters ? JSON.parse(JSON.stringify(filters)) : null,
        parameters: parameters ? JSON.parse(JSON.stringify(parameters)) : null,
        schedule: schedule ? JSON.parse(JSON.stringify(schedule)) : null,
        is_public: is_public || false
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: report.id,
        name: report.name,
        description: report.description,
        type: report.type,
        category: report.category,
        is_public: report.is_public,
        is_active: report.is_active,
        created_at: report.created_at
      }
    });
  } catch (error) {
    console.error('Erro ao criar relatório:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/reports-advanced/reports/:id - Obter detalhes do relatório
router.get('/reports/:id', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;

    const report = await prisma.report.findFirst({
      where: {
        id,
        user_id: user_id as string
      },
      include: {
        executions: {
          orderBy: {
            started_at: 'desc'
          },
          take: 10
        }
      }
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Relatório não encontrado'
      });
    }

    res.json({
      success: true,
      data: {
        id: report.id,
        name: report.name,
        description: report.description,
        type: report.type,
        category: report.category,
        template: report.template,
        filters: report.filters,
        parameters: report.parameters,
        schedule: report.schedule,
        is_public: report.is_public,
        is_active: report.is_active,
        executions: report.executions.map(exec => ({
          id: exec.id,
          status: exec.status,
          started_at: exec.started_at,
          completed_at: exec.completed_at,
          duration: exec.duration,
          error: exec.error
        })),
        created_at: report.created_at,
        updated_at: report.updated_at
      }
    });
  } catch (error) {
    console.error('Erro ao buscar relatório:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// PUT /api/reports-advanced/reports/:id - Atualizar relatório
router.put('/reports/:id', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;
    const { name, description, type, category, template, filters, parameters, schedule, is_public, is_active } = req.body;

    const report = await prisma.report.findFirst({
      where: {
        id,
        user_id: user_id as string
      }
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Relatório não encontrado'
      });
    }

    const updatedReport = await prisma.report.update({
      where: { id },
      data: {
        name,
        description,
        type,
        category,
        template: template ? JSON.parse(JSON.stringify(template)) : undefined,
        filters: filters ? JSON.parse(JSON.stringify(filters)) : undefined,
        parameters: parameters ? JSON.parse(JSON.stringify(parameters)) : undefined,
        schedule: schedule ? JSON.parse(JSON.stringify(schedule)) : undefined,
        is_public,
        is_active,
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      data: {
        id: updatedReport.id,
        name: updatedReport.name,
        description: updatedReport.description,
        type: updatedReport.type,
        category: updatedReport.category,
        is_public: updatedReport.is_public,
        is_active: updatedReport.is_active,
        updated_at: updatedReport.updated_at
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar relatório:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// DELETE /api/reports-advanced/reports/:id - Excluir relatório
router.delete('/reports/:id', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;

    const report = await prisma.report.findFirst({
      where: {
        id,
        user_id: user_id as string
      }
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Relatório não encontrado'
      });
    }

    await prisma.report.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Relatório excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir relatório:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/reports-advanced/reports/:id/execute - Executar relatório
router.post('/reports/:id/execute', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;
    const { parameters } = req.body;

    const report = await prisma.report.findFirst({
      where: {
        id,
        user_id: user_id as string
      }
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Relatório não encontrado'
      });
    }

    // Criar execução do relatório
    const execution = await prisma.reportExecution.create({
      data: {
        report_id: id,
        status: 'running',
        parameters: parameters ? JSON.parse(JSON.stringify(parameters)) : null,
        user_id: user_id as string
      }
    });

    // Simular execução do relatório (em produção, seria um job assíncrono)
    const result = await generateReportData(report, parameters);

    // Atualizar execução com resultado
    await prisma.reportExecution.update({
      where: { id: execution.id },
      data: {
        status: 'completed',
        completed_at: new Date(),
        duration: Math.floor((Date.now() - execution.started_at.getTime()) / 1000),
        result: JSON.parse(JSON.stringify(result))
      }
    });

    res.json({
      success: true,
      data: {
        execution_id: execution.id,
        status: 'completed',
        result
      }
    });
  } catch (error) {
    console.error('Erro ao executar relatório:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/reports-advanced/analytics/events - Listar eventos de analytics
router.get('/analytics/events', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { event_type, event_name, start_date, end_date, limit = 100 } = req.query;

    const whereClause: any = {
      user_id: user_id as string
    };

    if (event_type) {
      whereClause.event_type = event_type;
    }

    if (event_name) {
      whereClause.event_name = event_name;
    }

    if (start_date || end_date) {
      whereClause.created_at = {};
      if (start_date) {
        whereClause.created_at.gte = new Date(start_date as string);
      }
      if (end_date) {
        whereClause.created_at.lte = new Date(end_date as string);
      }
    }

    const events = await prisma.analyticsEvent.findMany({
      where: whereClause,
      orderBy: {
        created_at: 'desc'
      },
      take: parseInt(limit as string)
    });

    res.json({
      success: true,
      data: events.map(event => ({
        id: event.id,
        event_type: event.event_type,
        event_name: event.event_name,
        session_id: event.session_id,
        page_url: event.page_url,
        metadata: event.metadata,
        created_at: event.created_at
      }))
    });
  } catch (error) {
    console.error('Erro ao listar eventos de analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/reports-advanced/analytics/events - Registrar evento de analytics
router.post('/analytics/events', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { event_type, event_name, session_id, page_url, user_agent, ip_address, metadata } = req.body;

    if (!event_type || !event_name) {
      return res.status(400).json({
        success: false,
        error: 'Tipo e nome do evento são obrigatórios'
      });
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        user_id: user_id as string,
        event_type,
        event_name,
        session_id,
        page_url,
        user_agent,
        ip_address,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : null
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: event.id,
        event_type: event.event_type,
        event_name: event.event_name,
        created_at: event.created_at
      }
    });
  } catch (error) {
    console.error('Erro ao registrar evento de analytics:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/reports-advanced/dashboard/widgets - Listar widgets do dashboard
router.get('/dashboard/widgets', async (req, res) => {
  try {
    const user_id = req.user?.id;

    const widgets = await prisma.dashboardWidget.findMany({
      where: {
        user_id: user_id as string,
        is_active: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json({
      success: true,
      data: widgets.map(widget => ({
        id: widget.id,
        name: widget.name,
        type: widget.type,
        position: widget.position,
        config: widget.config,
        data_source: widget.data_source,
        refresh_interval: widget.refresh_interval,
        created_at: widget.created_at,
        updated_at: widget.updated_at
      }))
    });
  } catch (error) {
    console.error('Erro ao listar widgets:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/reports-advanced/dashboard/widgets - Criar widget
router.post('/dashboard/widgets', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { name, type, position, config, data_source, refresh_interval } = req.body;

    if (!name || !type || !position || !config) {
      return res.status(400).json({
        success: false,
        error: 'Nome, tipo, posição e configuração são obrigatórios'
      });
    }

    const widget = await prisma.dashboardWidget.create({
      data: {
        user_id: user_id as string,
        name,
        type,
        position: JSON.parse(JSON.stringify(position)),
        config: JSON.parse(JSON.stringify(config)),
        data_source,
        refresh_interval: refresh_interval ? parseInt(refresh_interval) : null
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: widget.id,
        name: widget.name,
        type: widget.type,
        position: widget.position,
        config: widget.config,
        data_source: widget.data_source,
        refresh_interval: widget.refresh_interval,
        created_at: widget.created_at
      }
    });
  } catch (error) {
    console.error('Erro ao criar widget:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/reports-advanced/statistics - Estatísticas gerais
router.get('/statistics', async (req, res) => {
  try {
    const user_id = req.user?.id;

    // Contar relatórios por tipo
    const reportsByType = await prisma.report.groupBy({
      by: ['type'],
      where: {
        user_id: user_id as string
      },
      _count: {
        type: true
      }
    });

    // Contar execuções por status
    const executionsByStatus = await prisma.reportExecution.groupBy({
      by: ['status'],
      where: {
        user_id: user_id as string
      },
      _count: {
        status: true
      }
    });

    // Contar eventos de analytics por tipo
    const eventsByType = await prisma.analyticsEvent.groupBy({
      by: ['event_type'],
      where: {
        user_id: user_id as string
      },
      _count: {
        event_type: true
      }
    });

    // Total de widgets ativos
    const activeWidgets = await prisma.dashboardWidget.count({
      where: {
        user_id: user_id as string,
        is_active: true
      }
    });

    res.json({
      success: true,
      data: {
        reports_by_type: reportsByType.map(item => ({
          type: item.type,
          count: item._count.type
        })),
        executions_by_status: executionsByStatus.map(item => ({
          status: item.status,
          count: item._count.status
        })),
        events_by_type: eventsByType.map(item => ({
          event_type: item.event_type,
          count: item._count.event_type
        })),
        active_widgets: activeWidgets
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Função auxiliar para gerar dados do relatório
async function generateReportData(report: any, parameters: any) {
  // Simular geração de dados baseada no tipo de relatório
  switch (report.type) {
    case 'financial':
      return await generateFinancialReport(parameters);
    case 'hr':
      return await generateHRReport(parameters);
    case 'productivity':
      return await generateProductivityReport(parameters);
    default:
      return {
        message: 'Tipo de relatório não suportado',
        data: []
      };
  }
}

async function generateFinancialReport(parameters: any) {
  // Simular dados financeiros
  return {
    title: 'Relatório Financeiro',
    period: parameters?.period || 'Último mês',
    data: {
      total_revenue: 150000,
      total_expenses: 120000,
      profit: 30000,
      profit_margin: 20,
      categories: [
        { name: 'Receitas', value: 150000, color: '#4CAF50' },
        { name: 'Despesas', value: 120000, color: '#F44336' }
      ],
      monthly_data: [
        { month: 'Jan', revenue: 45000, expenses: 38000 },
        { month: 'Fev', revenue: 52000, expenses: 41000 },
        { month: 'Mar', revenue: 53000, expenses: 41000 }
      ]
    }
  };
}

async function generateHRReport(parameters: any) {
  // Simular dados de RH
  return {
    title: 'Relatório de Recursos Humanos',
    period: parameters?.period || 'Último mês',
    data: {
      total_employees: 25,
      active_employees: 23,
      new_hires: 3,
      terminations: 1,
      turnover_rate: 4.3,
      departments: [
        { name: 'Administrativo', count: 8 },
        { name: 'Vendas', count: 6 },
        { name: 'Tecnologia', count: 5 },
        { name: 'Marketing', count: 4 },
        { name: 'RH', count: 2 }
      ],
      salary_distribution: [
        { range: 'R$ 1.500 - R$ 3.000', count: 8 },
        { range: 'R$ 3.000 - R$ 5.000', count: 10 },
        { range: 'R$ 5.000 - R$ 8.000', count: 5 },
        { range: 'R$ 8.000+', count: 2 }
      ]
    }
  };
}

async function generateProductivityReport(parameters: any) {
  // Simular dados de produtividade
  return {
    title: 'Relatório de Produtividade',
    period: parameters?.period || 'Último mês',
    data: {
      total_tasks: 150,
      completed_tasks: 135,
      completion_rate: 90,
      average_completion_time: 2.5,
      productivity_score: 85,
      top_performers: [
        { name: 'João Silva', tasks_completed: 25, score: 95 },
        { name: 'Maria Santos', tasks_completed: 22, score: 92 },
        { name: 'Pedro Costa', tasks_completed: 20, score: 88 }
      ],
      weekly_progress: [
        { week: 'Semana 1', completed: 35, total: 40 },
        { week: 'Semana 2', completed: 32, total: 38 },
        { week: 'Semana 3', completed: 38, total: 42 },
        { week: 'Semana 4', completed: 30, total: 30 }
      ]
    }
  };
}

export default router;
