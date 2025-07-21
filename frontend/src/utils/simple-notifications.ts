/**
 * @fileoverview Sistema de notificações simples para DOM v2
 * @directory frontend/src/utils
 * @description Notificações básicas e funcionais para MVP
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos de notificação simples
export type SimpleNotificationType = 
  | 'TASK_REMINDER'    // Lembrete de tarefa
  | 'PAYMENT_DUE'      // Pagamento vencendo
  | 'SYSTEM_UPDATE'    // Atualização do sistema
  | 'HELP_TIP';        // Dica de ajuda

// Interface de notificação simples
export interface SimpleNotification {
  id: string;
  type: SimpleNotificationType;
  title: string;
  message: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  read: boolean;
}

// Mensagens padrão por tipo
const NOTIFICATION_MESSAGES = {
  TASK_REMINDER: {
    title: 'Lembrete de Tarefa',
    message: 'Você tem tarefas pendentes para hoje',
  },
  PAYMENT_DUE: {
    title: 'Pagamento Vencendo',
    message: 'Há pagamentos que vencem em breve',
  },
  SYSTEM_UPDATE: {
    title: 'Sistema Atualizado',
    message: 'O sistema foi atualizado com melhorias',
  },
  HELP_TIP: {
    title: 'Dica do Sistema',
    message: 'Use o botão + para criar novas tarefas rapidamente',
  },
} as const;

// Hook para notificações simples
export function useSimpleNotifications() {
  const [notifications, setNotifications] = React.useState<SimpleNotification[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Carregar notificações do storage
  const loadNotifications = React.useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('@dom_v2_notifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotifications(parsed);
      }
    } catch (error) {
      console.warn('Erro ao carregar notificações:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar notificações no storage
  const saveNotifications = React.useCallback(async (newNotifications: SimpleNotification[]) => {
    try {
      await AsyncStorage.setItem('@dom_v2_notifications', JSON.stringify(newNotifications));
    } catch (error) {
      console.warn('Erro ao salvar notificações:', error);
    }
  }, []);

  // Adicionar notificação
  const addNotification = React.useCallback(async (
    type: SimpleNotificationType,
    customMessage?: string
  ) => {
    const message = NOTIFICATION_MESSAGES[type];
    const notification: SimpleNotification = {
      id: Date.now().toString(),
      type,
      title: message.title,
      message: customMessage || message.message,
      priority: type === 'PAYMENT_DUE' ? 'HIGH' : type === 'TASK_REMINDER' ? 'MEDIUM' : 'LOW',
      createdAt: new Date().toISOString(),
      read: false,
    };

    const newNotifications = [notification, ...notifications];
    setNotifications(newNotifications);
    await saveNotifications(newNotifications);
  }, [notifications, saveNotifications]);

  // Marcar como lida
  const markAsRead = React.useCallback(async (id: string) => {
    const newNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(newNotifications);
    await saveNotifications(newNotifications);
  }, [notifications, saveNotifications]);

  // Remover notificação
  const removeNotification = React.useCallback(async (id: string) => {
    const newNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(newNotifications);
    await saveNotifications(newNotifications);
  }, [notifications, saveNotifications]);

  // Limpar todas as notificações
  const clearNotifications = React.useCallback(async () => {
    setNotifications([]);
    await AsyncStorage.removeItem('@dom_v2_notifications');
  }, []);

  // Carregar notificações ao inicializar
  React.useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Contadores
  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'HIGH' && !n.read).length;

  return {
    notifications,
    loading,
    unreadCount,
    highPriorityCount,
    addNotification,
    markAsRead,
    removeNotification,
    clearNotifications,
  };
} 