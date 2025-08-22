import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// =================== NOTIFICAÇÕES EM TEMPO REAL ===================

// GET /api/notifications - Listar notificações do usuário
router.get('/', async (req, res) => {
  try {
    const { user_id, status, limit = 50, page = 1 } = req.query;
    
    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: 'ID do usuário é obrigatório'
      });
    }

    const whereClause: any = {
      recipient_id: user_id as string
    };

    if (status) {
      whereClause.read = status === 'read';
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [notifications, total] = await Promise.all([
      prisma.notifications.findMany({
        where: whereClause,
        orderBy: {
          created_at: 'desc'
        },
        skip,
        take: parseInt(limit as string)
      }),
      prisma.notifications.count({
        where: whereClause
      })
    ]);

    res.json({
      success: true,
      data: {
        notifications,
        pagination: {
          total,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          pages: Math.ceil(total / parseInt(limit as string))
        }
      }
    });
  } catch (error) {
    console.error('Erro ao listar notificações:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao listar notificações: ' + error.message
    });
  }
});

// GET /api/notifications/unread - Contar notificações não lidas
router.get('/unread', async (req, res) => {
  try {
    const { user_id } = req.query;
    
    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: 'ID do usuário é obrigatório'
      });
    }

    const count = await prisma.notifications.count({
      where: {
        recipient_id: user_id as string,
        read: false
      }
    });

    res.json({
      success: true,
      data: {
        unread_count: count
      }
    });
  } catch (error) {
    console.error('Erro ao contar notificações não lidas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao contar notificações não lidas: ' + error.message
    });
  }
});

// POST /api/notifications - Criar nova notificação
router.post('/', async (req, res) => {
  try {
    const {
      user_id,
      title,
      message,
      type = 'info',
      priority = 'normal',
      action_url,
      metadata
    } = req.body;

    if (!user_id || !title || !message) {
      return res.status(400).json({
        success: false,
        error: 'ID do usuário, título e mensagem são obrigatórios'
      });
    }

    const notification = await prisma.notifications.create({
      data: {
        id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        recipient_id: user_id,
        title,
        message,
        type,
        priority,
        extra_data: metadata ? JSON.parse(JSON.stringify(metadata)) : null,
        read: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao criar notificação: ' + error.message
    });
  }
});

// PUT /api/notifications/:id/read - Marcar notificação como lida
router.put('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notifications.update({
      where: { id },
      data: {
        read: true,
        read_at: new Date(),
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao marcar notificação como lida: ' + error.message
    });
  }
});

// PUT /api/notifications/read-all - Marcar todas como lidas
router.put('/read-all', async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: 'ID do usuário é obrigatório'
      });
    }

    const result = await prisma.notifications.updateMany({
      where: {
        recipient_id: user_id,
        read: false
      },
      data: {
        read: true,
        read_at: new Date(),
        updated_at: new Date()
      }
    });

    res.json({
      success: true,
      data: {
        updated_count: result.count
      }
    });
  } catch (error) {
    console.error('Erro ao marcar todas como lidas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao marcar todas como lidas: ' + error.message
    });
  }
});

// DELETE /api/notifications/:id - Excluir notificação
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.notifications.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Notificação excluída com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir notificação:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao excluir notificação: ' + error.message
    });
  }
});

// =================== NOTIFICAÇÕES POR EMAIL ===================

// POST /api/notifications/email - Enviar notificação por email
router.post('/email', async (req, res) => {
  try {
    const {
      user_id,
      subject,
      message,
      template = 'default',
      priority = 'normal'
    } = req.body;

    if (!user_id || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'ID do usuário, assunto e mensagem são obrigatórios'
      });
    }

    // Buscar dados do usuário
    const user = await prisma.users.findUnique({
      where: { id: user_id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    // Criar notificação de email
    const emailNotification = await prisma.notifications.create({
      data: {
        id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        recipient_id: user_id,
        title: subject,
        message,
        type: 'email',
        priority,
        extra_data: {
          template,
          email: user.email,
          sent_at: new Date().toISOString()
        },
        read: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    // Simular envio de email (em produção, usar serviço real)
    console.log(`📧 Email enviado para ${user.email}: ${subject}`);

    res.json({
      success: true,
      data: {
        notification: emailNotification,
        email_sent: true,
        recipient: user.email
      }
    });
  } catch (error) {
    console.error('Erro ao enviar notificação por email:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao enviar notificação por email: ' + error.message
    });
  }
});

// =================== PUSH NOTIFICATIONS ===================

// POST /api/notifications/push - Enviar push notification
router.post('/push', async (req, res) => {
  try {
    const {
      user_id,
      title,
      body,
      data,
      priority = 'normal'
    } = req.body;

    if (!user_id || !title || !body) {
      return res.status(400).json({
        success: false,
        error: 'ID do usuário, título e corpo são obrigatórios'
      });
    }

    // Buscar dados do usuário
    const user = await prisma.users.findUnique({
      where: { id: user_id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    // Criar notificação push
    const pushNotification = await prisma.notifications.create({
      data: {
        id: `push_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        recipient_id: user_id,
        title,
        message: body,
        type: 'push',
        priority,
        extra_data: {
          push_data: data || {},
          sent_at: new Date().toISOString()
        },
        read: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    });

    // Simular envio de push (em produção, usar FCM ou similar)
    console.log(`📱 Push notification enviado para ${user.name}: ${title}`);

    res.json({
      success: true,
      data: {
        notification: pushNotification,
        push_sent: true,
        recipient: user.name
      }
    });
  } catch (error) {
    console.error('Erro ao enviar push notification:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao enviar push notification: ' + error.message
    });
  }
});

// =================== CONFIGURAÇÕES DE NOTIFICAÇÃO ===================

// GET /api/notifications/settings/:user_id - Buscar configurações
router.get('/settings/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;

    // Simular configurações (em produção, criar tabela específica)
    const defaultSettings = {
      user_id,
      email_enabled: true,
      push_enabled: true,
      in_app_enabled: true,
      email_types: ['system', 'task', 'financial'],
      push_types: ['system', 'task'],
      quiet_hours_start: '22:00',
      quiet_hours_end: '08:00',
      created_at: new Date(),
      updated_at: new Date()
    };

    res.json({
      success: true,
      data: defaultSettings
    });
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar configurações: ' + error.message
    });
  }
});

// PUT /api/notifications/settings/:user_id - Atualizar configurações
router.put('/settings/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const {
      email_enabled,
      push_enabled,
      in_app_enabled,
      email_types,
      push_types,
      quiet_hours_start,
      quiet_hours_end
    } = req.body;

    // Simular salvamento (em produção, salvar em tabela específica)
    const settings = {
      user_id,
      email_enabled: email_enabled ?? true,
      push_enabled: push_enabled ?? true,
      in_app_enabled: in_app_enabled ?? true,
      email_types: email_types || ['system', 'task', 'financial'],
      push_types: push_types || ['system', 'task'],
      quiet_hours_start: quiet_hours_start || '22:00',
      quiet_hours_end: quiet_hours_end || '08:00',
      created_at: new Date(),
      updated_at: new Date()
    };

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar configurações: ' + error.message
    });
  }
});

// =================== HISTÓRICO DE NOTIFICAÇÕES ===================

// GET /api/notifications/history - Histórico de notificações
router.get('/history', async (req, res) => {
  try {
    const { user_id, type, start_date, end_date, limit = 100, page = 1 } = req.query;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        error: 'ID do usuário é obrigatório'
      });
    }

    const whereClause: any = {
      recipient_id: user_id as string
    };

    if (type) {
      whereClause.type = type;
    }

    if (start_date || end_date) {
      whereClause.created_at = {};
      if (start_date) whereClause.created_at.gte = new Date(start_date as string);
      if (end_date) whereClause.created_at.lte = new Date(end_date as string);
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [notifications, total] = await Promise.all([
      prisma.notifications.findMany({
        where: whereClause,
        orderBy: {
          created_at: 'desc'
        },
        skip,
        take: parseInt(limit as string)
      }),
      prisma.notifications.count({
        where: whereClause
      })
    ]);

    // Estatísticas
    const stats = await prisma.notifications.groupBy({
      by: ['type', 'read'],
      where: whereClause,
      _count: {
        id: true
      }
    });

    res.json({
      success: true,
      data: {
        notifications,
        pagination: {
          total,
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          pages: Math.ceil(total / parseInt(limit as string))
        },
        stats: stats.reduce((acc, stat) => {
          const key = `${stat.type}_${stat.read ? 'read' : 'unread'}`;
          acc[key] = stat._count.id;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar histórico: ' + error.message
    });
  }
});

export default router;