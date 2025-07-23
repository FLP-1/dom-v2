/**
 * @fileoverview Sistema de notificações inteligentes para DOM v2
 * @directory frontend/src/utils
 * @description Notificações adaptadas por perfil, região e dispositivo
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React from 'react';
import { UserProfileType } from './user-profiles';
import { BrazilianRegion } from './regional-adaptation';
import { DeviceType } from './device-optimization';

// Tipos de notificação
export type NotificationType = 
  | 'TASK_REMINDER'      // Lembrete de tarefa
  | 'PAYMENT_DUE'        // Pagamento vencendo
  | 'SYSTEM_UPDATE'      // Atualização do sistema
  | 'HELP_TIP'           // Dica de ajuda
  | 'SUCCESS_MESSAGE'    // Mensagem de sucesso
  | 'WARNING_MESSAGE';   // Mensagem de aviso

// Configuração de notificação
export interface NotificationConfig {
  type: NotificationType;
  title: string;
  message: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  timing: 'IMMEDIATE' | 'SCHEDULED' | 'BATCH';
  visual: 'MINIMAL' | 'STANDARD' | 'DETAILED';
  sound: boolean;
  vibration: boolean;
}

// Configurações por perfil
const PROFILE_NOTIFICATION_CONFIGS: Record<UserProfileType, {
  frequency: 'MINIMAL' | 'STANDARD' | 'FREQUENT';
  detail: 'SUMMARY' | 'STANDARD' | 'DETAILED';
  timing: 'WORK_HOURS' | 'FLEXIBLE' | 'ANYTIME';
  channels: ('PUSH' | 'IN_APP' | 'EMAIL')[];
}> = {
  EMPLOYER: {
    frequency: 'MINIMAL',
    detail: 'SUMMARY',
    timing: 'WORK_HOURS',
    channels: ['PUSH', 'IN_APP'],
  },
  EMPLOYEE: {
    frequency: 'FREQUENT',
    detail: 'STANDARD',
    timing: 'FLEXIBLE',
    channels: ['PUSH', 'IN_APP'],
  },
  FAMILY: {
    frequency: 'STANDARD',
    detail: 'STANDARD',
    timing: 'FLEXIBLE',
    channels: ['PUSH', 'IN_APP'],
  },
  PARTNER: {
    frequency: 'MINIMAL',
    detail: 'SUMMARY',
    timing: 'WORK_HOURS',
    channels: ['PUSH', 'IN_APP', 'EMAIL'],
  },
  SUBORDINATE: {
    frequency: 'STANDARD',
    detail: 'STANDARD',
    timing: 'WORK_HOURS',
    channels: ['PUSH', 'IN_APP'],
  },
  ADMIN: {
    frequency: 'FREQUENT',
    detail: 'DETAILED',
    timing: 'ANYTIME',
    channels: ['PUSH', 'IN_APP', 'EMAIL'],
  },
  OWNER: {
    frequency: 'MINIMAL',
    detail: 'SUMMARY',
    timing: 'WORK_HOURS',
    channels: ['PUSH', 'IN_APP', 'EMAIL'],
  },
};

// Mensagens por região
const REGIONAL_NOTIFICATION_MESSAGES = {
  SUDESTE: {
    TASK_REMINDER: 'Lembrete: Tarefa pendente',
    PAYMENT_DUE: 'Pagamento vence em breve',
    SYSTEM_UPDATE: 'Sistema atualizado',
    HELP_TIP: 'Dica: Use atalhos para agilizar',
    SUCCESS_MESSAGE: 'Operação realizada com sucesso',
    WARNING_MESSAGE: 'Atenção: Verifique os dados',
  },
  NORDESTE: {
    TASK_REMINDER: 'Oi! Tem uma tarefa pra fazer',
    PAYMENT_DUE: 'O pagamento tá vencendo',
    SYSTEM_UPDATE: 'O sistema foi atualizado',
    HELP_TIP: 'Dica: Tá precisando de ajuda?',
    SUCCESS_MESSAGE: 'Deu tudo certo!',
    WARNING_MESSAGE: 'Cuidado! Verifica aí',
  },
  SUL: {
    TASK_REMINDER: 'Lembrete: Tarefa pendente',
    PAYMENT_DUE: 'Pagamento vence em breve',
    SYSTEM_UPDATE: 'Sistema atualizado',
    HELP_TIP: 'Dica: Organize suas tarefas',
    SUCCESS_MESSAGE: 'Operação realizada com sucesso',
    WARNING_MESSAGE: 'Atenção: Verifique os dados',
  },
  CENTRO_OESTE: {
    TASK_REMINDER: 'Lembrete: Tarefa pendente',
    PAYMENT_DUE: 'Pagamento vence em breve',
    SYSTEM_UPDATE: 'Sistema atualizado',
    HELP_TIP: 'Dica: Use o sistema de forma prática',
    SUCCESS_MESSAGE: 'Operação realizada com sucesso',
    WARNING_MESSAGE: 'Atenção: Verifique os dados',
  },
  NORTE: {
    TASK_REMINDER: 'Oi! Tem uma tarefa pra fazer',
    PAYMENT_DUE: 'O pagamento tá vencendo',
    SYSTEM_UPDATE: 'O sistema foi atualizado',
    HELP_TIP: 'Dica: Precisa de ajuda?',
    SUCCESS_MESSAGE: 'Deu tudo certo!',
    WARNING_MESSAGE: 'Cuidado! Verifica aí',
  },
};

// Configurações por dispositivo
const DEVICE_NOTIFICATION_CONFIGS: Record<DeviceType, {
  visual: 'MINIMAL' | 'STANDARD' | 'DETAILED';
  sound: boolean;
  vibration: boolean;
  duration: number; // segundos
}> = {
  SMARTPHONE: {
    visual: 'STANDARD',
    sound: true,
    vibration: true,
    duration: 5,
  },
  TABLET: {
    visual: 'DETAILED',
    sound: true,
    vibration: false,
    duration: 8,
  },
  DESKTOP: {
    visual: 'MINIMAL',
    sound: false,
    vibration: false,
    duration: 3,
  },
};

// Função para criar notificação inteligente
export function createIntelligentNotification(
  type: NotificationType,
  profile: UserProfileType,
  region: BrazilianRegion,
  device: DeviceType,
  customMessage?: string
): NotificationConfig {
  const profileConfig = PROFILE_NOTIFICATION_CONFIGS[profile];
  const deviceConfig = DEVICE_NOTIFICATION_CONFIGS[device];
  const regionalMessages = REGIONAL_NOTIFICATION_MESSAGES[region];

  // Determinar prioridade baseada no tipo e perfil
  const priority = getNotificationPriority(type, profile);
  
  // Determinar timing baseado no perfil
  const timing = getNotificationTiming(type, profileConfig.timing);
  
  // Obter mensagem regional
  const message = customMessage || regionalMessages[type] || 'Notificação do sistema';

  return {
    type,
    title: getNotificationTitle(type, profile),
    message,
    priority,
    timing,
    visual: deviceConfig.visual,
    sound: deviceConfig.sound,
    vibration: deviceConfig.vibration,
  };
}

// Função para determinar prioridade
function getNotificationPriority(type: NotificationType, profile: UserProfileType): 'LOW' | 'MEDIUM' | 'HIGH' {
  // Empregadores: prioridade alta para pagamentos
  if (profile === 'EMPLOYER' && type === 'PAYMENT_DUE') {
    return 'HIGH';
  }
  
  // Empregados: prioridade alta para lembretes
  if (profile === 'EMPLOYEE' && type === 'TASK_REMINDER') {
    return 'HIGH';
  }
  
  // Admins: prioridade alta para tudo
  if (profile === 'ADMIN') {
    return 'HIGH';
  }
  
  // Padrão baseado no tipo
  switch (type) {
    case 'PAYMENT_DUE':
    case 'WARNING_MESSAGE':
      return 'HIGH';
    case 'TASK_REMINDER':
    case 'SYSTEM_UPDATE':
      return 'MEDIUM';
    case 'HELP_TIP':
    case 'SUCCESS_MESSAGE':
      return 'LOW';
  }
}

// Função para determinar timing
function getNotificationTiming(
  type: NotificationType, 
  profileTiming: 'WORK_HOURS' | 'FLEXIBLE' | 'ANYTIME'
): 'IMMEDIATE' | 'SCHEDULED' | 'BATCH' {
  
  // Pagamentos e avisos sempre imediatos
  if (type === 'PAYMENT_DUE' || type === 'WARNING_MESSAGE') {
    return 'IMMEDIATE';
  }
  
  // Dicas e sucessos podem ser em lote
  if (type === 'HELP_TIP' || type === 'SUCCESS_MESSAGE') {
    return 'BATCH';
  }
  
  // Outros baseados no perfil
  switch (profileTiming) {
    case 'WORK_HOURS':
      return 'SCHEDULED';
    case 'FLEXIBLE':
      return 'IMMEDIATE';
    case 'ANYTIME':
      return 'IMMEDIATE';
  }
}

// Função para obter título da notificação
function getNotificationTitle(type: NotificationType, profile: UserProfileType): string {
  const titles = {
    TASK_REMINDER: profile === 'EMPLOYER' ? 'Tarefa Pendente' : 'Lembrete de Tarefa',
    PAYMENT_DUE: 'Pagamento Vencendo',
    SYSTEM_UPDATE: 'Atualização do Sistema',
    HELP_TIP: 'Dica do Sistema',
    SUCCESS_MESSAGE: 'Sucesso!',
    WARNING_MESSAGE: 'Atenção!',
  };
  
  return titles[type];
}

// Hook para usar notificações inteligentes
export function useIntelligentNotifications() {
  const [notifications, setNotifications] = React.useState<NotificationConfig[]>([]);
  
  const addNotification = React.useCallback((
    type: NotificationType,
    profile: UserProfileType,
    region: BrazilianRegion,
    device: DeviceType,
    customMessage?: string
  ) => {
    const notification = createIntelligentNotification(type, profile, region, device, customMessage);
    setNotifications(prev => [...prev, notification]);
  }, []);
  
  const removeNotification = React.useCallback((index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  }, []);
  
  const clearNotifications = React.useCallback(() => {
    setNotifications([]);
  }, []);
  
  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
} 