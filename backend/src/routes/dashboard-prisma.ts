/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: Rotas RESTful com Prisma ORM
 * - Alternativa 1: GraphQL para consultas complexas
 *   - Prós: Flexibilidade, consultas otimizadas
 *   - Contras: Complexidade adicional, curva de aprendizado
 * - Alternativa 2: REST simples sem ORM
 *   - Prós: Simplicidade, controle direto
 *   - Contras: Mais código boilerplate, menos type safety
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - Type safety com TypeScript + Prisma
 * - Performance otimizada com queries eficientes
 * - Manutenibilidade com código limpo
 * 
 * @trade-offs
 * - Performance vs Simplicidade: Otimização de queries
 * - Flexibilidade vs Complexidade: RESTful padronizado
 * - Segurança vs Usabilidade: Validação completa
 */

import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth-middleware';
import { logStructured } from '../utils/logging';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

/**
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error, context = 'unknown') {
  logStructured('error', `Dashboard error in ${context}`, {
    message: error.message,
    stack: error.stack,
    context
  });
  
  throw error;
}

// GET /api/dashboard/metrics - Obter métricas do dashboard
router.get('/metrics', authenticateToken, async (req, res) => {
  try {
    assertCritical(req.user, 'Usuário não autenticado');
    
    logStructured('info', 'Carregando métricas do dashboard', {
      userId: req.user.id,
      context: 'dashboard-metrics'
    });

    // Buscar métricas em paralelo para melhor performance
    const [
      usersCount,
      budgetData,
      tasksCount,
      documentsCount
    ] = await Promise.all([
      // Contar usuários ativos
      prisma.user.count({
        where: {
          status: 'ACTIVE'
        }
      }),
      
      // Buscar dados de orçamento
      prisma.budget.findFirst({
        where: {
          userId: req.user.id,
          status: 'ACTIVE'
        },
        select: {
          amount: true,
          spent: true,
          startDate: true,
          endDate: true
        }
      }),
      
      // Contar tarefas pendentes
      prisma.task.count({
        where: {
          userId: req.user.id,
          status: 'PENDING'
        }
      }),
      
      // Contar documentos
      prisma.document.count({
        where: {
          userId: req.user.id
        }
      })
    ]);

    // Calcular mudanças percentuais (mock por enquanto)
    const usersChange = 5; // +5% este mês
    const budgetChange = budgetData ? -2 : 0; // -2% este mês
    const tasksChange = 12; // +12% esta semana
    const documentsChange = 8; // +8% este mês

    const metrics = {
      usersCount,
      budgetAmount: budgetData?.amount || 0,
      budgetSpent: budgetData?.spent || 0,
      budgetRemaining: (budgetData?.amount || 0) - (budgetData?.spent || 0),
      tasksCount,
      documentsCount,
      usersChange,
      budgetChange,
      tasksChange,
      documentsChange,
      lastUpdated: new Date().toISOString()
    };

    logStructured('info', 'Métricas carregadas com sucesso', {
      userId: req.user.id,
      metrics: {
        usersCount,
        tasksCount,
        documentsCount
      }
    });

    res.json({
      success: true,
      data: metrics
    });

  } catch (error) {
    handleError(error, 'dashboard-metrics');
    res.status(500).json({
      success: false,
      error: 'Erro ao carregar métricas do dashboard'
    });
  }
});

// GET /api/dashboard/activity - Obter atividade recente
router.get('/activity', authenticateToken, async (req, res) => {
  try {
    assertCritical(req.user, 'Usuário não autenticado');
    
    logStructured('info', 'Carregando atividade recente', {
      userId: req.user.id,
      context: 'dashboard-activity'
    });

    // Buscar atividades recentes (últimas 24 horas)
    const recentActivities = await prisma.activity.findMany({
      where: {
        userId: req.user.id,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Últimas 24 horas
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Se não há atividades reais, criar mock data
    if (recentActivities.length === 0) {
      const mockActivities = [
        {
          id: 1,
          type: 'USER',
          description: 'Novo usuário registrado: João Silva',
          createdAt: new Date(Date.now() - 300000), // 5 minutos atrás
          userId: req.user.id
        },
        {
          id: 2,
          type: 'TASK',
          description: 'Tarefa concluída: Revisão de documentos',
          createdAt: new Date(Date.now() - 900000), // 15 minutos atrás
          userId: req.user.id
        },
        {
          id: 3,
          type: 'PAYMENT',
          description: 'Pagamento processado: R$ 2.500,00',
          createdAt: new Date(Date.now() - 1800000), // 30 minutos atrás
          userId: req.user.id
        },
        {
          id: 4,
          type: 'DOCUMENT',
          description: 'Documento enviado: Contrato de trabalho',
          createdAt: new Date(Date.now() - 3600000), // 1 hora atrás
          userId: req.user.id
        }
      ];

      logStructured('info', 'Usando dados mock para atividade', {
        userId: req.user.id,
        activityCount: mockActivities.length
      });

      return res.json({
        success: true,
        data: mockActivities.map(activity => ({
          id: activity.id,
          type: activity.type.toLowerCase(),
          description: activity.description,
          timestamp: activity.createdAt.toISOString()
        }))
      });
    }

    // Mapear atividades reais
    const mappedActivities = recentActivities.map(activity => ({
      id: activity.id,
      type: activity.type.toLowerCase(),
      description: activity.description,
      timestamp: activity.createdAt.toISOString()
    }));

    logStructured('info', 'Atividade carregada com sucesso', {
      userId: req.user.id,
      activityCount: mappedActivities.length
    });

    res.json({
      success: true,
      data: mappedActivities
    });

  } catch (error) {
    handleError(error, 'dashboard-activity');
    res.status(500).json({
      success: false,
      error: 'Erro ao carregar atividade recente'
    });
  }
});

// GET /api/dashboard/summary - Resumo geral do dashboard
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    assertCritical(req.user, 'Usuário não autenticado');
    
    logStructured('info', 'Carregando resumo do dashboard', {
      userId: req.user.id,
      context: 'dashboard-summary'
    });

    // Buscar dados de resumo
    const summary = await prisma.$transaction(async (tx) => {
      const [
        totalUsers,
        totalTasks,
        totalDocuments,
        totalPayments,
        recentPayments,
        pendingTasks
      ] = await Promise.all([
        tx.user.count({ where: { status: 'ACTIVE' } }),
        tx.task.count({ where: { userId: req.user.id } }),
        tx.document.count({ where: { userId: req.user.id } }),
        tx.payment.count({ where: { userId: req.user.id } }),
        tx.payment.findMany({
          where: { userId: req.user.id },
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: { amount: true, status: true, createdAt: true }
        }),
        tx.task.findMany({
          where: { 
            userId: req.user.id,
            status: 'PENDING'
          },
          orderBy: { dueDate: 'asc' },
          take: 5,
          select: { title: true, dueDate: true, priority: true }
        })
      ]);

      return {
        totalUsers,
        totalTasks,
        totalDocuments,
        totalPayments,
        recentPayments,
        pendingTasks
      };
    });

    logStructured('info', 'Resumo carregado com sucesso', {
      userId: req.user.id,
      summary: {
        totalUsers: summary.totalUsers,
        totalTasks: summary.totalTasks,
        totalDocuments: summary.totalDocuments
      }
    });

    res.json({
      success: true,
      data: summary
    });

  } catch (error) {
    handleError(error, 'dashboard-summary');
    res.status(500).json({
      success: false,
      error: 'Erro ao carregar resumo do dashboard'
    });
  }
});

// GET /api/dashboard/health - Verificar saúde do sistema
router.get('/health', authenticateToken, async (req, res) => {
  try {
    assertCritical(req.user, 'Usuário não autenticado');
    
    logStructured('info', 'Verificando saúde do sistema', {
      userId: req.user.id,
      context: 'dashboard-health'
    });

    // Verificar conectividade com banco de dados
    const dbHealth = await prisma.$queryRaw`SELECT 1 as health_check`;
    
    // Verificar performance básica
    const startTime = Date.now();
    await prisma.user.count();
    const responseTime = Date.now() - startTime;

    const health = {
      status: 'healthy',
      database: 'connected',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString(),
      version: '2.0.0'
    };

    logStructured('info', 'Saúde do sistema verificada', {
      userId: req.user.id,
      health
    });

    res.json({
      success: true,
      data: health
    });

  } catch (error) {
    handleError(error, 'dashboard-health');
    res.status(500).json({
      success: false,
      error: 'Erro ao verificar saúde do sistema',
      data: {
        status: 'unhealthy',
        database: 'disconnected',
        timestamp: new Date().toISOString()
      }
    });
  }
});

export default router;