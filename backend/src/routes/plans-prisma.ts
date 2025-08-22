import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth-middleware';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de autenticação para todas as rotas (comentado para testes)
// router.use(authenticateToken);

// GET /api/plans - Listar todos os planos disponíveis
router.get('/', async (req, res) => {
  try {
    const plans = await prisma.subscriptionPlan.findMany({
      where: {
        active: true
      },
      orderBy: {
        price: 'asc'
      }
    });

    res.json({
      success: true,
      data: plans
    });
  } catch (error) {
    console.error('Erro ao listar planos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/plans/:id - Obter detalhes de um plano específico
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'Plano não encontrado'
      });
    }

    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    console.error('Erro ao buscar plano:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/plans/subscribe - Assinar um plano
router.post('/subscribe', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { plan_id, payment_method, auto_renew = false } = req.body;

    if (!plan_id || !payment_method) {
      return res.status(400).json({
        success: false,
        error: 'ID do plano e método de pagamento são obrigatórios'
      });
    }

    // Verificar se o plano existe
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: plan_id }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'Plano não encontrado'
      });
    }

    // Verificar se o usuário já tem uma assinatura ativa
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        user_id: user_id as string,
        status: 'active'
      }
    });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        error: 'Usuário já possui uma assinatura ativa'
      });
    }

    // Calcular datas de início e fim
    const start_date = new Date();
    const end_date = new Date();
    end_date.setDate(end_date.getDate() + plan.duration_days);

    // Criar assinatura pendente
    const subscription = await prisma.subscription.create({
      data: {
        user_id: user_id as string,
        plan_id,
        status: 'pending',
        current_period_start: start_date,
        current_period_end: end_date,
        payment_status: 'pending',
        payment_method,
        amount_paid: plan.price,
        currency: plan.currency,
        auto_renew
      },
      include: {
        plan: true,
        user: {
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
      data: subscription,
      message: 'Assinatura criada com sucesso. Aguardando confirmação do pagamento.'
    });
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/plans/confirm-payment - Confirmar pagamento
router.post('/confirm-payment', async (req, res) => {
  try {
    const { subscription_id, payment_id, payment_status = 'paid' } = req.body;

    if (!subscription_id || !payment_id) {
      return res.status(400).json({
        success: false,
        error: 'ID da assinatura e ID do pagamento são obrigatórios'
      });
    }

    // Buscar a assinatura
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscription_id },
      include: {
        plan: true
      }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Assinatura não encontrada'
      });
    }

    // Atualizar status da assinatura
    const updateData: any = {
      payment_status,
      payment_id,
      updated_at: new Date()
    };

    // Se o pagamento foi confirmado, ativar a assinatura
    if (payment_status === 'paid') {
      updateData.status = 'active';
    }

    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscription_id },
      data: updateData,
      include: {
        plan: true,
        user: {
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
      data: updatedSubscription,
      message: payment_status === 'paid' ? 'Pagamento confirmado e assinatura ativada!' : 'Status do pagamento atualizado.'
    });
  } catch (error) {
    console.error('Erro ao confirmar pagamento:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/plans/my-subscription - Obter assinatura atual do usuário
router.get('/my-subscription', async (req, res) => {
  try {
    const user_id = req.user?.id;

    const subscription = await prisma.subscription.findFirst({
      where: {
        user_id: user_id as string,
        status: 'active'
      },
      include: {
        plan: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    if (!subscription) {
      return res.json({
        success: true,
        data: null,
        message: 'Nenhuma assinatura ativa encontrada'
      });
    }

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('Erro ao buscar assinatura do usuário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/plans/subscription-history - Histórico de assinaturas do usuário
router.get('/subscription-history', async (req, res) => {
  try {
    const user_id = req.user?.id;

    const subscriptions = await prisma.subscription.findMany({
      where: {
        user_id: user_id as string
      },
      include: {
        plan: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('Erro ao buscar histórico de assinaturas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/plans/cancel-subscription - Cancelar assinatura
router.post('/cancel-subscription', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { subscription_id } = req.body;

    if (!subscription_id) {
      return res.status(400).json({
        success: false,
        error: 'ID da assinatura é obrigatório'
      });
    }

    // Verificar se a assinatura pertence ao usuário
    const subscription = await prisma.subscription.findFirst({
      where: {
        id: subscription_id,
        user_id: user_id as string
      }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Assinatura não encontrada'
      });
    }

    // Cancelar a assinatura
    const updatedSubscription = await prisma.subscription.update({
      where: { id: subscription_id },
      data: {
        status: 'cancelled',
        cancel_at_period_end: true,
        cancelled_at: new Date(),
        updated_at: new Date()
      },
      include: {
        plan: true
      }
    });

    res.json({
      success: true,
      data: updatedSubscription,
      message: 'Assinatura cancelada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/plans/features/:plan_id - Obter funcionalidades de um plano
router.get('/features/:plan_id', async (req, res) => {
  try {
    const { plan_id } = req.params;

    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: plan_id },
      select: {
        id: true,
        name: true,
        display_name: true,
        features: true,
        limits: true
      }
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        error: 'Plano não encontrado'
      });
    }

    res.json({
      success: true,
      data: {
        id: plan.id,
        name: plan.name,
        display_name: plan.display_name,
        features: plan.features,
        limits: plan.limits
      }
    });
  } catch (error) {
    console.error('Erro ao buscar funcionalidades do plano:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

export default router;
