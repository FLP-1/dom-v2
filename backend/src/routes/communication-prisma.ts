import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth-middleware';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de autenticação para todas as rotas
router.use(authenticateToken);

// GET /api/communication/messages - Listar mensagens de um grupo
router.get('/messages', async (req, res) => {
  try {
    const { group_id, limit = '50', offset = '0' } = req.query;
    const user_id = req.user?.id;

    if (!group_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'ID do grupo é obrigatório' 
      });
    }

    const messages = await prisma.message.findMany({
      where: {
        group_id: group_id as string,
        active: true
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        reads: {
          where: {
            user_id: user_id as string
          }
        },
        replies: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      take: parseInt(limit as string),
      skip: parseInt(offset as string)
    });

    res.json({
      success: true,
      data: messages.reverse() // Ordenar do mais antigo para o mais recente
    });
  } catch (error) {
    console.error('Erro ao listar mensagens:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/communication/messages - Enviar mensagem
router.post('/messages', async (req, res) => {
  try {
    const { group_id, content, type = 'text', reply_to_id, metadata } = req.body;
    const user_id = req.user?.id;

    if (!group_id || !content) {
      return res.status(400).json({
        success: false,
        error: 'ID do grupo e conteúdo são obrigatórios'
      });
    }

    // Verificar se o usuário pertence ao grupo
    const userGroup = await prisma.user_group_roles.findFirst({
      where: {
        user_id: user_id as string,
        group_id: group_id
      }
    });

    if (!userGroup) {
      return res.status(403).json({
        success: false,
        error: 'Usuário não tem permissão para enviar mensagens neste grupo'
      });
    }

    const message = await prisma.message.create({
      data: {
        content,
        type,
        sender_id: user_id as string,
        group_id,
        reply_to_id,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : null
      },
      include: {
        sender: {
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
      data: message
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// PUT /api/communication/messages/:id/read - Marcar mensagem como lida
router.put('/messages/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id;

    await prisma.messageRead.upsert({
      where: {
        message_id_user_id: {
          message_id: id,
          user_id: user_id as string
        }
      },
      update: {
        read_at: new Date()
      },
      create: {
        message_id: id,
        user_id: user_id as string
      }
    });

    res.json({
      success: true,
      message: 'Mensagem marcada como lida'
    });
  } catch (error) {
    console.error('Erro ao marcar mensagem como lida:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/communication/groups - Listar grupos do usuário
router.get('/groups', async (req, res) => {
  try {
    const user_id = req.user?.id;

    const groups = await prisma.user_group_roles.findMany({
      where: {
        user_id: user_id as string
      },
      include: {
        groups: {
          include: {
            messages: {
              orderBy: {
                created_at: 'desc'
              },
              take: 1,
              include: {
                sender: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            },
            user_group_roles: {
              include: {
                users: {
                  select: {
                    id: true,
                    name: true,
                    email: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        groups: {
          updated_at: 'desc'
        }
      }
    });

    res.json({
      success: true,
      data: groups.map(ugr => ({
        ...ugr.groups,
        role: ugr.role,
        members: ugr.groups.user_group_roles.map(member => ({
          id: member.users.id,
          name: member.users.name,
          email: member.users.email,
          role: member.role
        }))
      }))
    });
  } catch (error) {
    console.error('Erro ao listar grupos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/communication/groups - Criar novo grupo
router.post('/groups', async (req, res) => {
  try {
    const { name, description, type = 'family', member_ids } = req.body;
    const user_id = req.user?.id;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Nome do grupo é obrigatório'
      });
    }

    const group = await prisma.groups.create({
      data: {
        name,
        description,
        type,
        user_group_roles: {
          create: [
            {
              user_id: user_id as string,
              role: 'admin'
            },
            ...(member_ids || []).map((member_id: string) => ({
              user_id: member_id,
              role: 'member'
            }))
          ]
        }
      },
      include: {
        user_group_roles: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: {
        ...group,
        members: group.user_group_roles.map(ugr => ({
          id: ugr.users.id,
          name: ugr.users.name,
          email: ugr.users.email,
          role: ugr.role
        }))
      }
    });
  } catch (error) {
    console.error('Erro ao criar grupo:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/communication/online - Listar usuários online
router.get('/online', async (req, res) => {
  try {
    const user_id = req.user?.id;

    // Buscar usuários que tiveram atividade recente (últimos 5 minutos)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const onlineUsers = await prisma.user_sessions.findMany({
      where: {
        updated_at: {
          gte: fiveMinutesAgo
        }
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      distinct: ['user_id']
    });

    res.json({
      success: true,
      data: onlineUsers.map(session => ({
        id: session.users.id,
        name: session.users.name,
        email: session.users.email,
        last_activity: session.updated_at
      }))
    });
  } catch (error) {
    console.error('Erro ao listar usuários online:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/communication/unread - Contar mensagens não lidas
router.get('/unread', async (req, res) => {
  try {
    const user_id = req.user?.id;

    const unreadCount = await prisma.message.count({
      where: {
        active: true,
        sender_id: {
          not: user_id as string
        },
        reads: {
          none: {
            user_id: user_id as string
          }
        }
      }
    });

    res.json({
      success: true,
      data: {
        unread_count: unreadCount
      }
    });
  } catch (error) {
    console.error('Erro ao contar mensagens não lidas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// DELETE /api/communication/messages/:id - Deletar mensagem
router.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id;

    const message = await prisma.message.findUnique({
      where: { id }
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Mensagem não encontrada'
      });
    }

    if (message.sender_id !== user_id) {
      return res.status(403).json({
        success: false,
        error: 'Você só pode deletar suas próprias mensagens'
      });
    }

    await prisma.message.update({
      where: { id },
      data: { active: false }
    });

    res.json({
      success: true,
      message: 'Mensagem deletada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar mensagem:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

export default router;
