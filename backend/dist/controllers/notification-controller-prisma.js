"use strict";
// Controller Notification com Prisma - Controle de Notificações
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationControllerPrisma = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
class NotificationControllerPrisma {
    // Listar todas as notificações
    static getAllNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield prisma.notification.findMany({
                    where: { ativo: true },
                    orderBy: { data_criacao: 'desc' }
                });
                res.json({
                    success: true,
                    data: notifications,
                    message: 'Notificações listadas com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar notificações',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter notificação por ID
    static getNotificationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const notification = yield prisma.notification.findUnique({
                    where: { id }
                });
                if (!notification) {
                    res.status(404).json({
                        success: false,
                        message: 'Notificação não encontrada'
                    });
                    return;
                }
                res.json({
                    success: true,
                    data: notification,
                    message: 'Notificação encontrada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar notificação',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Criar nova notificação
    static createNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notificationData = req.body;
                const newNotification = yield prisma.notification.create({
                    data: {
                        tipo: notificationData.tipo,
                        titulo: notificationData.titulo,
                        mensagem: notificationData.mensagem,
                        destinatario_id: notificationData.destinatario_id,
                        remetente_id: notificationData.remetente_id,
                        lida: false,
                        prioridade: notificationData.prioridade || 'normal',
                        categoria: notificationData.categoria,
                        ativo: true,
                        data_criacao: new Date()
                    }
                });
                res.status(201).json({
                    success: true,
                    data: newNotification,
                    message: 'Notificação criada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao criar notificação',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Marcar notificação como lida
    static markAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const notification = yield prisma.notification.update({
                    where: { id },
                    data: {
                        lida: true,
                        data_leitura: new Date(),
                        data_atualizacao: new Date()
                    }
                });
                res.json({
                    success: true,
                    data: notification,
                    message: 'Notificação marcada como lida'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao marcar notificação como lida',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Deletar notificação
    static deleteNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.notification.update({
                    where: { id },
                    data: {
                        ativo: false,
                        data_atualizacao: new Date()
                    }
                });
                res.json({
                    success: true,
                    message: 'Notificação deletada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao deletar notificação',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter notificações não lidas
    static getUnreadNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield prisma.notification.findMany({
                    where: {
                        lida: false,
                        ativo: true
                    },
                    orderBy: { data_criacao: 'desc' }
                });
                res.json({
                    success: true,
                    data: notifications,
                    count: notifications.length,
                    message: 'Notificações não lidas recuperadas'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar notificações não lidas',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
}
exports.NotificationControllerPrisma = NotificationControllerPrisma;
