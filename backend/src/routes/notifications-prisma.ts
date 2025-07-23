// Rotas Notification com Prisma - Controle de Notificações
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Router } from 'express';
import { NotificationControllerPrisma } from '../controllers/notification-controller-prisma';

const router = Router();

// GET /api/notifications - Listar todas as notificações
router.get('/', NotificationControllerPrisma.getAllNotifications);

// GET /api/notifications/unread - Obter notificações não lidas
router.get('/unread', NotificationControllerPrisma.getUnreadNotifications);

// GET /api/notifications/:id - Obter notificação por ID
router.get('/:id', NotificationControllerPrisma.getNotificationById);

// POST /api/notifications - Criar nova notificação
router.post('/', NotificationControllerPrisma.createNotification);

// PUT /api/notifications/:id/read - Marcar como lida
router.put('/:id/read', NotificationControllerPrisma.markAsRead);

// DELETE /api/notifications/:id - Deletar notificação
router.delete('/:id', NotificationControllerPrisma.deleteNotification);

export default router; 