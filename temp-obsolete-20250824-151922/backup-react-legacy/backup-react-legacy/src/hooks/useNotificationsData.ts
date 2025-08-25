/**
 * 🔔 HOOK PERSONALIZADO PARA DADOS DE NOTIFICAÇÕES
 * 
 * Seguindo as diretrizes do projeto:
 * - Separação de responsabilidades
 * - Reutilização de lógica
 * - Estado centralizado
 * - UX otimista para atualizações
 * - Padrão consistente com useFinanceData/useTasksData
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/api.ts';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  createdAt: string;
  category?: string;
}

export const useNotificationsData = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.getNotifications();
      
      const convertedNotifications: Notification[] = response.data?.map((notification: unknown) => ({
        id: notification.id,
        title: notification.title,
        message: notification.message,
        type: notification.type || 'info',
        priority: notification.priority || 'medium',
        read: notification.read || false,
        createdAt: notification.created_at,
        category: notification.category
      })) || [];

      setNotifications(convertedNotifications);
    } catch (err) {
      setError('Erro ao carregar notificações');
      console.error('Erro no useNotificationsData:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      // Otimistic update
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId ? { ...notification, read: true } : notification
      ));

      await apiService.markNotificationAsRead(notificationId);
    } catch (err) {
      // Rollback on error
      setNotifications(prev => prev.map(notification => 
        notification.id === notificationId ? { ...notification, read: false } : notification
      ));
      console.error('Erro ao marcar notificação como lida:', err);
    }
  };

  const removeNotification = async (notificationId: string) => {
    try {
      // Otimistic update
      setNotifications(prev => prev.filter(notification => notification.id !== notificationId));

      await apiService.deleteNotification(notificationId);
    } catch (err) {
      // Reload on error
      loadData();
      console.error('Erro ao remover notificação:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Otimistic update
      setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));

      // Marcar todas como lidas
      const unreadNotifications = notifications.filter(n => !n.read);
      await Promise.all(unreadNotifications.map(n => apiService.markNotificationAsRead(n.id)));
    } catch (err) {
      // Reload on error
      loadData();
      console.error('Erro ao marcar todas como lidas:', err);
    }
  };

  const reload = () => {
    loadData();
  };

  // Estatísticas calculadas
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    highPriority: notifications.filter(n => n.priority === 'high').length
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    notifications,
    loading,
    error,
    stats,
    reload,
    markAsRead,
    removeNotification,
    markAllAsRead
  };
};
