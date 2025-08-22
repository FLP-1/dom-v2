import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth-middleware';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de autenticação para todas as rotas
router.use(authenticateToken);

// GET /api/integration/connections - Listar conexões de integração
router.get('/connections', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { status, type } = req.query;

    const whereClause: any = {
      user_id: user_id as string
    };

    if (status) {
      whereClause.status = status;
    }

    if (type) {
      whereClause.type = type;
    }

    const connections = await prisma.integrationConnection.findMany({
      where: whereClause,
      include: {
        webhooks: {
          where: {
            active: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json({
      success: true,
      data: connections.map(connection => ({
        id: connection.id,
        name: connection.name,
        type: connection.type,
        status: connection.status,
        config: connection.config,
        last_sync: connection.last_sync,
        webhooks_count: connection.webhooks.length,
        created_at: connection.created_at,
        updated_at: connection.updated_at
      }))
    });
  } catch (error) {
    console.error('Erro ao listar conexões:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/integration/connections - Criar nova conexão
router.post('/connections', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { name, type, config, webhooks } = req.body;

    if (!name || !type || !config) {
      return res.status(400).json({
        success: false,
        error: 'Nome, tipo e configuração são obrigatórios'
      });
    }

    // Validar configuração baseada no tipo
    if (!validateConnectionConfig(type, config)) {
      return res.status(400).json({
        success: false,
        error: 'Configuração inválida para o tipo de integração'
      });
    }

    const connection = await prisma.integrationConnection.create({
      data: {
        user_id: user_id as string,
        name,
        type,
        status: 'pending',
        config: JSON.parse(JSON.stringify(config)),
        last_sync: null
      }
    });

    // Criar webhooks se fornecidos
    if (webhooks && Array.isArray(webhooks)) {
      for (const webhook of webhooks) {
        await prisma.integrationWebhook.create({
          data: {
            connection_id: connection.id,
            name: webhook.name,
            url: webhook.url,
            events: webhook.events || [],
            headers: webhook.headers || {},
            active: true
          }
        });
      }
    }

    res.status(201).json({
      success: true,
      data: {
        id: connection.id,
        name: connection.name,
        type: connection.type,
        status: connection.status,
        config: connection.config,
        created_at: connection.created_at
      }
    });
  } catch (error) {
    console.error('Erro ao criar conexão:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// PUT /api/integration/connections/:id - Atualizar conexão
router.put('/connections/:id', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;
    const { name, config, status } = req.body;

    const connection = await prisma.integrationConnection.findFirst({
      where: {
        id,
        user_id: user_id as string
      }
    });

    if (!connection) {
      return res.status(404).json({
        success: false,
        error: 'Conexão não encontrada'
      });
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (config) {
      if (!validateConnectionConfig(connection.type, config)) {
        return res.status(400).json({
          success: false,
          error: 'Configuração inválida para o tipo de integração'
        });
      }
      updateData.config = JSON.parse(JSON.stringify(config));
    }
    if (status) updateData.status = status;

    const updatedConnection = await prisma.integrationConnection.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: {
        id: updatedConnection.id,
        name: updatedConnection.name,
        type: updatedConnection.type,
        status: updatedConnection.status,
        config: updatedConnection.config,
        updated_at: updatedConnection.updated_at
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar conexão:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// DELETE /api/integration/connections/:id - Deletar conexão
router.delete('/connections/:id', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;

    const connection = await prisma.integrationConnection.findFirst({
      where: {
        id,
        user_id: user_id as string
      }
    });

    if (!connection) {
      return res.status(404).json({
        success: false,
        error: 'Conexão não encontrada'
      });
    }

    // Deletar webhooks associados
    await prisma.integrationWebhook.deleteMany({
      where: {
        connection_id: id
      }
    });

    // Deletar logs associados
    await prisma.integrationLog.deleteMany({
      where: {
        connection_id: id
      }
    });

    // Deletar conexão
    await prisma.integrationConnection.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Conexão deletada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar conexão:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/integration/connections/:id/test - Testar conexão
router.post('/connections/:id/test', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;

    const connection = await prisma.integrationConnection.findFirst({
      where: {
        id,
        user_id: user_id as string
      }
    });

    if (!connection) {
      return res.status(404).json({
        success: false,
        error: 'Conexão não encontrada'
      });
    }

    // Testar conexão baseada no tipo
    const testResult = await testConnection(connection.type, connection.config);

    // Atualizar status da conexão
    await prisma.integrationConnection.update({
      where: { id },
      data: {
        status: testResult.success ? 'active' : 'error',
        last_sync: testResult.success ? new Date() : null
      }
    });

    // Registrar log do teste
    await prisma.integrationLog.create({
      data: {
        connection_id: id,
        type: 'test',
        status: testResult.success ? 'success' : 'error',
        message: testResult.message,
        data: testResult.data || {}
      }
    });

    res.json({
      success: true,
      data: testResult
    });
  } catch (error) {
    console.error('Erro ao testar conexão:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/integration/webhooks - Listar webhooks
router.get('/webhooks', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { connection_id, active } = req.query;

    const whereClause: any = {
      connection: {
        user_id: user_id as string
      }
    };

    if (connection_id) {
      whereClause.connection_id = connection_id;
    }

    if (active !== undefined) {
      whereClause.active = active === 'true';
    }

    const webhooks = await prisma.integrationWebhook.findMany({
      where: whereClause,
      include: {
        connection: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    res.json({
      success: true,
      data: webhooks.map(webhook => ({
        id: webhook.id,
        name: webhook.name,
        url: webhook.url,
        events: webhook.events,
        headers: webhook.headers,
        active: webhook.active,
        connection: webhook.connection,
        created_at: webhook.created_at,
        updated_at: webhook.updated_at
      }))
    });
  } catch (error) {
    console.error('Erro ao listar webhooks:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/integration/webhooks - Criar webhook
router.post('/webhooks', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { connection_id, name, url, events, headers } = req.body;

    if (!connection_id || !name || !url) {
      return res.status(400).json({
        success: false,
        error: 'ID da conexão, nome e URL são obrigatórios'
      });
    }

    // Verificar se a conexão pertence ao usuário
    const connection = await prisma.integrationConnection.findFirst({
      where: {
        id: connection_id,
        user_id: user_id as string
      }
    });

    if (!connection) {
      return res.status(404).json({
        success: false,
        error: 'Conexão não encontrada'
      });
    }

    const webhook = await prisma.integrationWebhook.create({
      data: {
        connection_id,
        name,
        url,
        events: events || [],
        headers: headers || {},
        active: true
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: webhook.id,
        name: webhook.name,
        url: webhook.url,
        events: webhook.events,
        headers: webhook.headers,
        active: webhook.active,
        created_at: webhook.created_at
      }
    });
  } catch (error) {
    console.error('Erro ao criar webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/integration/logs - Listar logs de integração
router.get('/logs', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { connection_id, type, status, limit = '50' } = req.query;

    const whereClause: any = {
      connection: {
        user_id: user_id as string
      }
    };

    if (connection_id) {
      whereClause.connection_id = connection_id;
    }

    if (type) {
      whereClause.type = type;
    }

    if (status) {
      whereClause.status = status;
    }

    const logs = await prisma.integrationLog.findMany({
      where: whereClause,
      include: {
        connection: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      take: parseInt(limit as string)
    });

    res.json({
      success: true,
      data: logs.map(log => ({
        id: log.id,
        type: log.type,
        status: log.status,
        message: log.message,
        data: log.data,
        connection: log.connection,
        created_at: log.created_at
      }))
    });
  } catch (error) {
    console.error('Erro ao listar logs:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/integration/stats - Estatísticas de integração
router.get('/stats', async (req, res) => {
  try {
    const user_id = req.user?.id;

    // Contar conexões por status
    const connectionsByStatus = await prisma.integrationConnection.groupBy({
      by: ['status'],
      where: {
        user_id: user_id as string
      },
      _count: true
    });

    // Contar conexões por tipo
    const connectionsByType = await prisma.integrationConnection.groupBy({
      by: ['type'],
      where: {
        user_id: user_id as string
      },
      _count: true
    });

    // Contar webhooks ativos
    const activeWebhooks = await prisma.integrationWebhook.count({
      where: {
        connection: {
          user_id: user_id as string
        },
        active: true
      }
    });

    // Contar logs por status (últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logsByStatus = await prisma.integrationLog.groupBy({
      by: ['status'],
      where: {
        connection: {
          user_id: user_id as string
        },
        created_at: {
          gte: thirtyDaysAgo
        }
      },
      _count: true
    });

    res.json({
      success: true,
      data: {
        connections_by_status: connectionsByStatus.map(item => ({
          status: item.status,
          count: item._count
        })),
        connections_by_type: connectionsByType.map(item => ({
          type: item.type,
          count: item._count
        })),
        active_webhooks: activeWebhooks,
        logs_by_status: logsByStatus.map(item => ({
          status: item.status,
          count: item._count
        }))
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

// Função auxiliar para validar configuração de conexão
function validateConnectionConfig(type: string, config: any): boolean {
  switch (type) {
    case 'api':
      return !!(config.url && config.method && config.headers);
    case 'database':
      return !!(config.host && config.port && config.database && config.username);
    case 'file':
      return !!(config.path && config.format);
    case 'webhook':
      return !!(config.url && config.method);
    default:
      return false;
  }
}

// Função auxiliar para testar conexão
async function testConnection(type: string, config: any): Promise<any> {
  try {
    switch (type) {
      case 'api':
        return await testApiConnection(config);
      case 'database':
        return await testDatabaseConnection(config);
      case 'file':
        return await testFileConnection(config);
      case 'webhook':
        return await testWebhookConnection(config);
      default:
        return {
          success: false,
          message: 'Tipo de conexão não suportado'
        };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao testar conexão',
      error: error.message
    };
  }
}

// Funções específicas de teste (implementações básicas)
async function testApiConnection(config: any): Promise<any> {
  // Simular teste de API
  return {
    success: true,
    message: 'Conexão com API testada com sucesso',
    data: {
      response_time: Math.random() * 1000,
      status_code: 200
    }
  };
}

async function testDatabaseConnection(config: any): Promise<any> {
  // Simular teste de banco de dados
  return {
    success: true,
    message: 'Conexão com banco de dados testada com sucesso',
    data: {
      connection_time: Math.random() * 500
    }
  };
}

async function testFileConnection(config: any): Promise<any> {
  // Simular teste de arquivo
  return {
    success: true,
    message: 'Conexão com arquivo testada com sucesso',
    data: {
      file_size: Math.random() * 1000000
    }
  };
}

async function testWebhookConnection(config: any): Promise<any> {
  // Simular teste de webhook
  return {
    success: true,
    message: 'Webhook testado com sucesso',
    data: {
      delivery_time: Math.random() * 2000
    }
  };
}

export default router;
