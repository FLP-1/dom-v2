/**
 * @fileoverview Hook de Notificações Simples - DOM v2
 * @directory frontend/src/hooks
 * @description Hook para gestão de notificações com priorização e persistência
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @author DOM v2 Team
 */

import { useState, useEffect, useCallback } from 'react';

// Tipos de notificação
export type NotificationType = 
  | 'TASK_REMINDER' 
  | 'PAYMENT_DUE' 
  | 'SYSTEM_UPDATE' 
  | 'HELP_TIP' 
  | 'SECURITY_ALERT'
  | 'PERFORMANCE_REPORT'
  | 'MAINTENANCE_NOTICE';

// Tipos de prioridade
export type NotificationPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

// Tipos de categoria
export type NotificationCategory = 
  | 'TASKS' 
  | 'FINANCE' 
  | 'SYSTEM' 
  | 'SECURITY' 
  | 'HELP' 
  | 'PERFORMANCE'
  | 'MAINTENANCE';

// Interface da notificação
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  category: NotificationCategory;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  expiresAt?: Date;
  data?: Record<string, any>;
}

// Interface para configurações de notificação
export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  showInApp: boolean;
  showSystem: boolean;
  autoDismiss: boolean;
  autoDismissDelay: number; // em segundos
  maxNotifications: number;
  categories: {
    [key in NotificationCategory]: boolean;
  };
  priorities: {
    [key in NotificationPriority]: boolean;
  };
}

// Interface para estatísticas
export interface NotificationStats {
  total: number;
  unread: number;
  byCategory: Record<NotificationCategory, number>;
  byPriority: Record<NotificationPriority, number>;
  byType: Record<NotificationType, number>;
}

// Configurações padrão
const defaultSettings: NotificationSettings = {
  enabled: true,
  sound: true,
  vibration: true,
  showInApp: true,
  showSystem: false,
  autoDismiss: true,
  autoDismissDelay: 5,
  maxNotifications: 50,
  categories: {
    TASKS: true,
    FINANCE: true,
    SYSTEM: true,
    SECURITY: true,
    HELP: true,
    PERFORMANCE: true,
    MAINTENANCE: true
  },
  priorities: {
    LOW: true,
    MEDIUM: true,
    HIGH: true,
    CRITICAL: true
  }
};

// Função para gerar ID único
const generateId = (): string => {
  return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Função para persistir no localStorage (com polyfill para web)
const storage = {
  get: (key: string): any => {
    try {
      if (typeof localStorage !== 'undefined') {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
    } catch (error) {
      console.warn('Erro ao ler do localStorage:', error);
    }
    return null;
  },
  set: (key: string, value: any): void => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn('Erro ao salvar no localStorage:', error);
    }
  }
};

// Hook principal
export const useSimpleNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [stats, setStats] = useState<NotificationStats>({
    total: 0,
    unread: 0,
    byCategory: {
      TASKS: 0,
      FINANCE: 0,
      SYSTEM: 0,
      SECURITY: 0,
      HELP: 0,
      PERFORMANCE: 0,
      MAINTENANCE: 0
    },
    byPriority: {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      CRITICAL: 0
    },
    byType: {
      TASK_REMINDER: 0,
      PAYMENT_DUE: 0,
      SYSTEM_UPDATE: 0,
      HELP_TIP: 0,
      SECURITY_ALERT: 0,
      PERFORMANCE_REPORT: 0,
      MAINTENANCE_NOTICE: 0
    }
  });

  // Carregar notificações do storage na inicialização
  useEffect(() => {
    const savedNotifications = storage.get('dom_notifications') || [];
    const savedSettings = storage.get('dom_notification_settings') || defaultSettings;
    
    setNotifications(savedNotifications);
    setSettings(savedSettings);
  }, []);

  // Salvar notificações no storage quando mudarem
  useEffect(() => {
    storage.set('dom_notifications', notifications);
    updateStats();
  }, [notifications]);

  // Salvar configurações no storage quando mudarem
  useEffect(() => {
    storage.set('dom_notification_settings', settings);
  }, [settings]);

  // Função para atualizar estatísticas
  const updateStats = useCallback(() => {
    const newStats: NotificationStats = {
      total: notifications.length,
      unread: notifications.filter(n => !n.read).length,
      byCategory: {
        TASKS: 0,
        FINANCE: 0,
        SYSTEM: 0,
        SECURITY: 0,
        HELP: 0,
        PERFORMANCE: 0,
        MAINTENANCE: 0
      },
      byPriority: {
        LOW: 0,
        MEDIUM: 0,
        HIGH: 0,
        CRITICAL: 0
      },
      byType: {
        TASK_REMINDER: 0,
        PAYMENT_DUE: 0,
        SYSTEM_UPDATE: 0,
        HELP_TIP: 0,
        SECURITY_ALERT: 0,
        PERFORMANCE_REPORT: 0,
        MAINTENANCE_NOTICE: 0
      }
    };

    notifications.forEach(notification => {
      newStats.byCategory[notification.category]++;
      newStats.byPriority[notification.priority]++;
      newStats.byType[notification.type]++;
    });

    setStats(newStats);
  }, [notifications]);

  // Função para adicionar notificação
  const addNotification = useCallback((
    type: NotificationType,
    title: string,
    message: string,
    priority: NotificationPriority = 'MEDIUM',
    category: NotificationCategory = 'SYSTEM',
    options?: {
      actionUrl?: string;
      actionText?: string;
      expiresAt?: Date;
      data?: Record<string, any>;
    }
  ) => {
    if (!settings.enabled) return;

    // Verificar se a categoria e prioridade estão habilitadas
    if (!settings.categories[category] || !settings.priorities[priority]) {
      return;
    }

    const notification: Notification = {
      id: generateId(),
      type,
      title,
      message,
      priority,
      category,
      timestamp: new Date(),
      read: false,
      actionUrl: options?.actionUrl,
      actionText: options?.actionText,
      expiresAt: options?.expiresAt,
      data: options?.data
    };

    setNotifications(prev => {
      const newNotifications = [notification, ...prev];
      
      // Limitar número máximo de notificações
      if (newNotifications.length > settings.maxNotifications) {
        return newNotifications.slice(0, settings.maxNotifications);
      }
      
      return newNotifications;
    });

    // Auto-dismiss se habilitado
    if (settings.autoDismiss && settings.autoDismissDelay > 0) {
      setTimeout(() => {
        removeNotification(notification.id);
      }, settings.autoDismissDelay * 1000);
    }

    // Efeitos visuais/auditivos
    if (settings.sound) {
      // Implementar som de notificação
      console.log('🔔 Som de notificação');
    }

    if (settings.vibration) {
      // Implementar vibração
      console.log('📳 Vibração de notificação');
    }

    return notification.id;
  }, [settings]);

  // Função para remover notificação
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Função para marcar como lida
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  // Função para marcar todas como lidas
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  }, []);

  // Função para limpar notificações
  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Função para limpar notificações lidas
  const clearReadNotifications = useCallback(() => {
    setNotifications(prev => prev.filter(n => !n.read));
  }, []);

  // Função para obter notificações por categoria
  const getNotificationsByCategory = useCallback((category: NotificationCategory) => {
    return notifications.filter(n => n.category === category);
  }, [notifications]);

  // Função para obter notificações por prioridade
  const getNotificationsByPriority = useCallback((priority: NotificationPriority) => {
    return notifications.filter(n => n.priority === priority);
  }, [notifications]);

  // Função para obter notificações não lidas
  const getUnreadNotifications = useCallback(() => {
    return notifications.filter(n => !n.read);
  }, [notifications]);

  // Função para obter notificações recentes
  const getRecentNotifications = useCallback((limit: number = 10) => {
    return notifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }, [notifications]);

  // Função para atualizar configurações
  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Função para limpar notificações expiradas
  const clearExpiredNotifications = useCallback(() => {
    const now = new Date();
    setNotifications(prev => 
      prev.filter(n => !n.expiresAt || n.expiresAt > now)
    );
  }, []);

  // Limpar notificações expiradas periodicamente
  useEffect(() => {
    const interval = setInterval(clearExpiredNotifications, 60000); // A cada minuto
    return () => clearInterval(interval);
  }, [clearExpiredNotifications]);

  // Funções de conveniência para tipos específicos
  const addTaskReminder = useCallback((
    title: string,
    message: string,
    priority: NotificationPriority = 'MEDIUM',
    options?: any
  ) => {
    return addNotification('TASK_REMINDER', title, message, priority, 'TASKS', options);
  }, [addNotification]);

  const addPaymentDue = useCallback((
    title: string,
    message: string,
    priority: NotificationPriority = 'HIGH',
    options?: any
  ) => {
    return addNotification('PAYMENT_DUE', title, message, priority, 'FINANCE', options);
  }, [addNotification]);

  const addSystemUpdate = useCallback((
    title: string,
    message: string,
    priority: NotificationPriority = 'MEDIUM',
    options?: any
  ) => {
    return addNotification('SYSTEM_UPDATE', title, message, priority, 'SYSTEM', options);
  }, [addNotification]);

  const addSecurityAlert = useCallback((
    title: string,
    message: string,
    priority: NotificationPriority = 'CRITICAL',
    options?: any
  ) => {
    return addNotification('SECURITY_ALERT', title, message, priority, 'SECURITY', options);
  }, [addNotification]);

  return {
    // Estado
    notifications,
    settings,
    stats,
    
    // Ações principais
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    clearReadNotifications,
    clearExpiredNotifications,
    
    // Consultas
    getNotificationsByCategory,
    getNotificationsByPriority,
    getUnreadNotifications,
    getRecentNotifications,
    
    // Configurações
    updateSettings,
    
    // Funções de conveniência
    addTaskReminder,
    addPaymentDue,
    addSystemUpdate,
    addSecurityAlert
  };
};

export default useSimpleNotifications; 