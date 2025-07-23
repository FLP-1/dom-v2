// Controller Notification com Prisma - Controle de Notificações
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class NotificationControllerPrisma {
  // Listar todas as notificações
  static async getAllNotifications(req: Request, res: Response): Promise<void> {
    try {
      const notifications = await prisma.notification.findMany({
        where: { ativo: true },
        orderBy: { data_criacao: 'desc' }
      });

      res.json({
        success: true,
        data: notifications,
        message: 'Notificações listadas com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar notificações',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Obter notificação por ID
  static async getNotificationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const notification = await prisma.notification.findUnique({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar notificação',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Criar nova notificação
  static async createNotification(req: Request, res: Response): Promise<void> {
    try {
      const notificationData = req.body;
      
      const newNotification = await prisma.notification.create({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar notificação',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Marcar notificação como lida
  static async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const notification = await prisma.notification.update({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao marcar notificação como lida',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Deletar notificação
  static async deleteNotification(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      await prisma.notification.update({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar notificação',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Obter notificações não lidas
  static async getUnreadNotifications(req: Request, res: Response): Promise<void> {
    try {
      const notifications = await prisma.notification.findMany({
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
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar notificações não lidas',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 