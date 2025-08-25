/**
 * Rotas de NotificaÃ§Ãµes - DOM v2
 * Gerencia operaÃ§Ãµes CRUD para notificaÃ§Ãµes usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /notifications
 * Lista todas as notificaÃ§Ãµes
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
    console.error('Erro ao buscar notificaÃ§Ãµes:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /notifications/:id
 * Busca notificaÃ§Ã£o por ID
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
        message: 'NotificaÃ§Ã£o nÃ£o encontrada'
      });
    }

    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('Erro ao buscar notificaÃ§Ã£o:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /notifications
 * Cria nova notificaÃ§Ã£o
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

    // ValidaÃ§Ãµes bÃ¡sicas
    if (!title || !message || !recipientId) {
      return res.status(400).json({
        success: false,
        message: 'TÃ­tulo, mensagem e destinatÃ¡rio sÃ£o obrigatÃ³rios'
      });
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        recipientId: parseInt(recipientId),
        type: type || 'INFO',
        priority: priority || 'NORMAL',
        senderId: 1, // TODO: Pegar do usuÃ¡rio logado
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
      message: 'NotificaÃ§Ã£o criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar notificaÃ§Ã£o:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /notifications/:id
 * Atualiza notificaÃ§Ã£o
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que nÃ£o devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    // Converte campos numÃ©ricos
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
      message: 'NotificaÃ§Ã£o atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar notificaÃ§Ã£o:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /notifications/:id
 * Remove notificaÃ§Ã£o
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.notification.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'NotificaÃ§Ã£o removida com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover notificaÃ§Ã£o:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /notifications/:id/read
 * Marca notificaÃ§Ã£o como lida
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
      message: 'NotificaÃ§Ã£o marcada como lida'
    });
  } catch (error) {
    console.error('Erro ao marcar notificaÃ§Ã£o como lida:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
