import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de logging
const logPurchaseAction = (action: string, data: any) => {
  console.log(`[PURCHASE] ${action}:`, {
    timestamp: new Date().toISOString(),
    action,
    data: { ...data, password_hash: undefined }
  });
};

// GET /api/purchases/groups - Listar grupos de compras
router.get('/groups', async (req, res) => {
  try {
    const groups = await prisma.purchaseGroup.findMany({
      where: { isActive: true },
      include: {
        items: {
          orderBy: { created_at: 'desc' }
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    logPurchaseAction('LIST_GROUPS', { count: groups.length });
    res.json({
      success: true,
      data: groups,
      message: 'Grupos de compras listados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao listar grupos de compras:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/purchases/groups - Criar grupo de compras
router.post('/groups', async (req, res) => {
  try {
    const { name, description, responsible, user_ids } = req.body;

    if (!name || !responsible) {
      return res.status(400).json({
        success: false,
        message: 'Nome e responsável são obrigatórios'
      });
    }

    const group = await prisma.purchaseGroup.create({
      data: {
        name,
        description,
        responsible,
        users: {
          connect: user_ids ? user_ids.map((id: string) => ({ id })) : []
        }
      },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: true
          }
        }
      }
    });

    logPurchaseAction('CREATE_GROUP', { group_id: group.id, name });
    res.status(201).json({
      success: true,
      data: group,
      message: 'Grupo de compras criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar grupo de compras:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/purchases/items - Listar itens de compra
router.get('/items', async (req, res) => {
  try {
    const { group_id, status, priority, responsible } = req.query;
    
    const where: any = {};
    if (group_id) where.group_id = group_id as string;
    if (status) where.status = status as string;
    if (priority) where.priority = priority as string;
    if (responsible) where.responsible = responsible as string;

    const items = await prisma.purchaseItem.findMany({
      where,
      include: {
        group: {
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
      },
      orderBy: { created_at: 'desc' }
    });

    logPurchaseAction('LIST_ITEMS', { count: items.length, filters: req.query });
    res.json({
      success: true,
      data: items,
      message: 'Itens de compra listados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao listar itens de compra:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// POST /api/purchases/items - Criar item de compra
router.post('/items', async (req, res) => {
  try {
    const {
      group_id,
      description,
      quantity,
      unit,
      responsible,
      priority,
      price,
      supplier,
      notes,
      alert_recipients,
      created_by
    } = req.body;

    if (!group_id || !description || !quantity || !unit || !responsible || !created_by) {
      return res.status(400).json({
        success: false,
        message: 'Dados obrigatórios: grupo, descrição, quantidade, unidade, responsável e criador'
      });
    }

    // Verificar se o grupo existe
    const group = await prisma.purchaseGroup.findUnique({
      where: { id: group_id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Grupo de compras não encontrado'
      });
    }

    const item = await prisma.purchaseItem.create({
      data: {
        group_id,
        description,
        quantity: parseFloat(quantity),
        unit,
        responsible,
        priority: priority || 'medium',
        price: price ? parseFloat(price) : null,
        supplier,
        notes,
        alert_recipients: alert_recipients || [],
        created_by
      },
      include: {
        group: {
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

    // Simular envio de alerta (conforme especificado no PDF)
    const alertData = {
      type: 'purchase_item_added',
      item_id: item.id,
      description: item.description,
      group_name: group.name,
      responsible: item.responsible,
      recipients: alert_recipients || [group.responsible],
      timestamp: new Date().toISOString()
    };

    logPurchaseAction('CREATE_ITEM', { 
      item_id: item.id, 
      group_id, 
      description,
      alert_sent: true,
      alert_data: alertData
    });

    res.status(201).json({
      success: true,
      data: item,
      alert: alertData,
      message: 'Item de compra criado com sucesso. Alerta enviado para os responsáveis.'
    });
  } catch (error) {
    console.error('Erro ao criar item de compra:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// PUT /api/purchases/items/:id - Atualizar item de compra
router.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const item = await prisma.purchaseItem.update({
      where: { id },
      data: {
        ...updateData,
        quantity: updateData.quantity ? parseFloat(updateData.quantity) : undefined,
        price: updateData.price ? parseFloat(updateData.price) : undefined,
        updated_at: new Date()
      },
      include: {
        group: {
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

    logPurchaseAction('UPDATE_ITEM', { item_id: id, updates: updateData });
    res.json({
      success: true,
      data: item,
      message: 'Item de compra atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar item de compra:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// DELETE /api/purchases/items/:id - Excluir item de compra
router.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.purchaseItem.delete({
      where: { id }
    });

    logPurchaseAction('DELETE_ITEM', { item_id: id });
    res.json({
      success: true,
      message: 'Item de compra excluído com sucesso'
    });
  } catch (error) {
    console.error('Erro ao excluir item de compra:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// PUT /api/purchases/items/:id/status - Atualizar status do item
router.put('/items/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status é obrigatório'
      });
    }

    const validStatuses = ['pending', 'approved', 'purchased', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status inválido. Use: pending, approved, purchased, delivered'
      });
    }

    const item = await prisma.purchaseItem.update({
      where: { id },
      data: {
        status,
        notes: notes ? `${item?.notes || ''}\n${new Date().toISOString()}: ${notes}`.trim() : undefined,
        updated_at: new Date()
      },
      include: {
        group: {
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

    logPurchaseAction('UPDATE_STATUS', { item_id: id, status, notes });
    res.json({
      success: true,
      data: item,
      message: `Status do item atualizado para: ${status}`
    });
  } catch (error) {
    console.error('Erro ao atualizar status do item:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/purchases/analytics - Analytics de compras
router.get('/analytics', async (req, res) => {
  try {
    const { start_date, end_date, group_id } = req.query;

    const where: any = {};
    if (start_date && end_date) {
      where.created_at = {
        gte: new Date(start_date as string),
        lte: new Date(end_date as string)
      };
    }
    if (group_id) where.group_id = group_id as string;

    const [totalItems, pendingItems, purchasedItems, totalValue] = await Promise.all([
      prisma.purchaseItem.count({ where }),
      prisma.purchaseItem.count({ where: { ...where, status: 'pending' } }),
      prisma.purchaseItem.count({ where: { ...where, status: 'purchased' } }),
      prisma.purchaseItem.aggregate({
        where: { ...where, price: { not: null } },
        _sum: { price: true }
      })
    ]);

    const itemsByStatus = await prisma.purchaseItem.groupBy({
      by: ['status'],
      where,
      _count: { status: true }
    });

    const itemsByPriority = await prisma.purchaseItem.groupBy({
      by: ['priority'],
      where,
      _count: { priority: true }
    });

    logPurchaseAction('ANALYTICS', { filters: req.query });
    res.json({
      success: true,
      data: {
        total_items: totalItems,
        pending_items: pendingItems,
        purchased_items: purchasedItems,
        total_value: totalValue._sum.price || 0,
        items_by_status: itemsByStatus,
        items_by_priority: itemsByPriority
      },
      message: 'Analytics de compras gerados com sucesso'
    });
  } catch (error) {
    console.error('Erro ao gerar analytics de compras:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export default router;