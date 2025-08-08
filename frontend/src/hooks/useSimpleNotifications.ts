
/**
 * 
 * @alternatives
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 */


/**
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 */


/**
 * @param {string} message - Mensagem de erro
 */
// Função removida - causava erros de referência no frontend`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Validação crítica removida - causava erro de referência


/**
 * @param {any} data - Dados a serem validados
 */
// Função removida - causava erros de referência no frontend

// Validação de input removida - causava erro de referência

/**
 * @directory frontend/src/hooks
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @author DOM v2 Team
  */

import { useState, useEffect, useCallback } from 'react';

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

export interface NotificationStats {
  total: number;
  unread: number;
  byCategory: Record<NotificationCategory, number>;
  byPriority: Record<NotificationPriority, number>;
  byType: Record<NotificationType, number>;
}

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

const generateId = (): string => {
  return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

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

  useEffect(() => {
    const savedNotifications = storage.get('dom_notifications') || [];
    const savedSettings = storage.get('dom_notification_settings') || defaultSettings;
    
    setNotifications(savedNotifications);
    setSettings(savedSettings);
  }, []);

  useEffect(() => {
    storage.set('dom_notifications', notifications);
    updateStats();
  }, [notifications]);

  useEffect(() => {
    storage.set('dom_notification_settings', settings);
  }, [settings]);

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
    }

    if (settings.vibration) {
    }

    return notification.id;
  }, [settings]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const clearReadNotifications = useCallback(() => {
    setNotifications(prev => prev.filter(n => !n.read));
  }, []);

  const getNotificationsByCategory = useCallback((category: NotificationCategory) => {
    return notifications.filter(n => n.category === category);
  }, [notifications]);

  const getNotificationsByPriority = useCallback((priority: NotificationPriority) => {
    return notifications.filter(n => n.priority === priority);
  }, [notifications]);

  const getUnreadNotifications = useCallback(() => {
    return notifications.filter(n => !n.read);
  }, [notifications]);

  const getRecentNotifications = useCallback((limit: number = 10) => {
    return notifications
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }, [notifications]);

  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const clearExpiredNotifications = useCallback(() => {
    const now = new Date();
    setNotifications(prev => 
      prev.filter(n => !n.expiresAt || n.expiresAt > now)
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(clearExpiredNotifications, 60000); // A cada minuto
    return () => clearInterval(interval);
  }, [clearExpiredNotifications]);

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
    
    updateSettings,
    
    addTaskReminder,
    addPaymentDue,
    addSystemUpdate,
    addSecurityAlert
  };
};

export default useSimpleNotifications; 