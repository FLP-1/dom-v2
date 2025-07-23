"use strict";
// Rotas Notification com Prisma - Controle de Notificações
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_prisma_1 = require("../controllers/notification-controller-prisma");
const router = (0, express_1.Router)();
// GET /api/notifications - Listar todas as notificações
router.get('/', notification_controller_prisma_1.NotificationControllerPrisma.getAllNotifications);
// GET /api/notifications/unread - Obter notificações não lidas
router.get('/unread', notification_controller_prisma_1.NotificationControllerPrisma.getUnreadNotifications);
// GET /api/notifications/:id - Obter notificação por ID
router.get('/:id', notification_controller_prisma_1.NotificationControllerPrisma.getNotificationById);
// POST /api/notifications - Criar nova notificação
router.post('/', notification_controller_prisma_1.NotificationControllerPrisma.createNotification);
// PUT /api/notifications/:id/read - Marcar como lida
router.put('/:id/read', notification_controller_prisma_1.NotificationControllerPrisma.markAsRead);
// DELETE /api/notifications/:id - Deletar notificação
router.delete('/:id', notification_controller_prisma_1.NotificationControllerPrisma.deleteNotification);
exports.default = router;
