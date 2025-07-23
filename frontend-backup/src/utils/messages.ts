/**
 * @fileoverview Sistema centralizado de mensagens para o DOM v2
 * @description Centraliza todas as mensagens do sistema para eliminar hardcode
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */

// Tipos de mensagem
export enum MessageType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  VALIDATION = 'validation'
}

// Categorias de mensagem
export enum MessageCategory {
  AUTH = 'auth',
  TASKS = 'tasks',
  NOTIFICATIONS = 'notifications',
  PAYMENTS = 'payments',
  PURCHASES = 'purchases',
  USERS = 'users',
  ORGANIZATIONS = 'organizations',
  SYSTEM = 'system',
  VALIDATION = 'validation'
}

// Interface para mensagens
export interface Message {
  id: string;
  type: MessageType;
  category: MessageCategory;
  title: string;
  message: string;
  description?: string;
}

// Sistema de mensagens centralizado
export class MessageSystem {
  private static messages: Map<string, Message> = new Map();

  // Inicializar mensagens do sistema
  static initialize(): void {
    this.loadAuthMessages();
    this.loadTaskMessages();
    this.loadNotificationMessages();
    this.loadPaymentMessages();
    this.loadPurchaseMessages();
    this.loadUserMessages();
    this.loadOrganizationMessages();
    this.loadSystemMessages();
    this.loadValidationMessages();
  }

  // Obter mensagem por ID
  static getMessage(id: string): Message | null {
    return this.messages.get(id) || null;
  }

  // Obter mensagens por categoria
  static getMessagesByCategory(category: MessageCategory): Message[] {
    return Array.from(this.messages.values()).filter(
      msg => msg.category === category
    );
  }

  // Obter mensagens por tipo
  static getMessagesByType(type: MessageType): Message[] {
    return Array.from(this.messages.values()).filter(
      msg => msg.type === type
    );
  }

  // Adicionar nova mensagem
  static addMessage(message: Message): void {
    this.messages.set(message.id, message);
  }

  // Atualizar mensagem existente
  static updateMessage(id: string, message: Partial<Message>): void {
    const existing = this.messages.get(id);
    if (existing) {
      this.messages.set(id, { ...existing, ...message });
    }
  }

  // Remover mensagem
  static removeMessage(id: string): void {
    this.messages.delete(id);
  }

  // Carregar mensagens de autenticação
  private static loadAuthMessages(): void {
    const authMessages: Message[] = [
      {
        id: 'auth.login.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.AUTH,
        title: 'Login realizado com sucesso',
        message: 'Bem-vindo ao DOM v2!',
        description: 'Usuário autenticado com sucesso'
      },
      {
        id: 'auth.login.error',
        type: MessageType.ERROR,
        category: MessageCategory.AUTH,
        title: 'Erro no login',
        message: 'Credenciais inválidas. Tente novamente.',
        description: 'Falha na autenticação do usuário'
      },
      {
        id: 'auth.logout.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.AUTH,
        title: 'Logout realizado',
        message: 'Você foi desconectado com sucesso.',
        description: 'Usuário desconectado do sistema'
      },
      {
        id: 'auth.session.expired',
        type: MessageType.WARNING,
        category: MessageCategory.AUTH,
        title: 'Sessão expirada',
        message: 'Sua sessão expirou. Faça login novamente.',
        description: 'Sessão do usuário expirou'
      }
    ];

    authMessages.forEach(msg => this.messages.set(msg.id, msg));
  }

  // Carregar mensagens de tarefas
  private static loadTaskMessages(): void {
    const taskMessages: Message[] = [
      {
        id: 'task.create.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.TASKS,
        title: 'Tarefa criada',
        message: 'Tarefa criada com sucesso!',
        description: 'Nova tarefa adicionada ao sistema'
      },
      {
        id: 'task.create.error',
        type: MessageType.ERROR,
        category: MessageCategory.TASKS,
        title: 'Erro ao criar tarefa',
        message: 'Não foi possível criar a tarefa. Tente novamente.',
        description: 'Falha ao criar nova tarefa'
      },
      {
        id: 'task.update.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.TASKS,
        title: 'Tarefa atualizada',
        message: 'Tarefa atualizada com sucesso!',
        description: 'Tarefa modificada no sistema'
      },
      {
        id: 'task.delete.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.TASKS,
        title: 'Tarefa removida',
        message: 'Tarefa removida com sucesso!',
        description: 'Tarefa excluída do sistema'
      },
      {
        id: 'task.complete.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.TASKS,
        title: 'Tarefa concluída',
        message: 'Parabéns! Tarefa concluída com sucesso!',
        description: 'Tarefa marcada como concluída'
      }
    ];

    taskMessages.forEach(msg => this.messages.set(msg.id, msg));
  }

  // Carregar mensagens de notificações
  private static loadNotificationMessages(): void {
    const notificationMessages: Message[] = [
      {
        id: 'notification.sent.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.NOTIFICATIONS,
        title: 'Notificação enviada',
        message: 'Notificação enviada com sucesso!',
        description: 'Notificação entregue ao destinatário'
      },
      {
        id: 'notification.read.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.NOTIFICATIONS,
        title: 'Notificação marcada como lida',
        message: 'Notificação marcada como lida.',
        description: 'Status da notificação atualizado'
      }
    ];

    notificationMessages.forEach(msg => this.messages.set(msg.id, msg));
  }

  // Carregar mensagens de pagamentos
  private static loadPaymentMessages(): void {
    const paymentMessages: Message[] = [
      {
        id: 'payment.processed.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.PAYMENTS,
        title: 'Pagamento processado',
        message: 'Pagamento processado com sucesso!',
        description: 'Transação de pagamento concluída'
      },
      {
        id: 'payment.failed.error',
        type: MessageType.ERROR,
        category: MessageCategory.PAYMENTS,
        title: 'Pagamento falhou',
        message: 'Não foi possível processar o pagamento. Verifique os dados.',
        description: 'Falha no processamento do pagamento'
      },
      {
        id: 'payment.due.reminder',
        type: MessageType.WARNING,
        category: MessageCategory.PAYMENTS,
        title: 'Pagamento vencendo',
        message: 'Você tem um pagamento vencendo em breve.',
        description: 'Lembrete de pagamento pendente'
      }
    ];

    paymentMessages.forEach(msg => this.messages.set(msg.id, msg));
  }

  // Carregar mensagens de compras
  private static loadPurchaseMessages(): void {
    const purchaseMessages: Message[] = [
      {
        id: 'purchase.completed.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.PURCHASES,
        title: 'Compra realizada',
        message: 'Compra registrada com sucesso!',
        description: 'Nova compra adicionada ao sistema'
      },
      {
        id: 'purchase.reminder.info',
        type: MessageType.INFO,
        category: MessageCategory.PURCHASES,
        title: 'Lembrete de compras',
        message: 'Você tem itens na lista de compras.',
        description: 'Lembrete de itens pendentes'
      }
    ];

    purchaseMessages.forEach(msg => this.messages.set(msg.id, msg));
  }

  // Carregar mensagens de usuários
  private static loadUserMessages(): void {
    const userMessages: Message[] = [
      {
        id: 'user.create.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.USERS,
        title: 'Usuário criado',
        message: 'Usuário criado com sucesso!',
        description: 'Novo usuário adicionado ao sistema'
      },
      {
        id: 'user.update.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.USERS,
        title: 'Perfil atualizado',
        message: 'Perfil atualizado com sucesso!',
        description: 'Dados do usuário modificados'
      },
      {
        id: 'user.delete.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.USERS,
        title: 'Usuário removido',
        message: 'Usuário removido com sucesso!',
        description: 'Usuário excluído do sistema'
      }
    ];

    userMessages.forEach(msg => this.messages.set(msg.id, msg));
  }

  // Carregar mensagens de organizações
  private static loadOrganizationMessages(): void {
    const organizationMessages: Message[] = [
      {
        id: 'organization.create.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.ORGANIZATIONS,
        title: 'Organização criada',
        message: 'Organização criada com sucesso!',
        description: 'Nova organização adicionada ao sistema'
      },
      {
        id: 'organization.join.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.ORGANIZATIONS,
        title: 'Membro adicionado',
        message: 'Membro adicionado à organização com sucesso!',
        description: 'Novo membro na organização'
      },
      {
        id: 'organization.leave.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.ORGANIZATIONS,
        title: 'Membro removido',
        message: 'Membro removido da organização.',
        description: 'Membro saiu da organização'
      }
    ];

    organizationMessages.forEach(msg => this.messages.set(msg.id, msg));
  }

  // Carregar mensagens do sistema
  private static loadSystemMessages(): void {
    const systemMessages: Message[] = [
      {
        id: 'system.error.general',
        type: MessageType.ERROR,
        category: MessageCategory.SYSTEM,
        title: 'Erro do sistema',
        message: 'Ocorreu um erro inesperado. Tente novamente.',
        description: 'Erro interno do sistema'
      },
      {
        id: 'system.maintenance.info',
        type: MessageType.INFO,
        category: MessageCategory.SYSTEM,
        title: 'Manutenção programada',
        message: 'O sistema estará em manutenção em breve.',
        description: 'Aviso de manutenção do sistema'
      },
      {
        id: 'system.update.success',
        type: MessageType.SUCCESS,
        category: MessageCategory.SYSTEM,
        title: 'Sistema atualizado',
        message: 'Sistema atualizado com sucesso!',
        description: 'Nova versão do sistema instalada'
      }
    ];

    systemMessages.forEach(msg => this.messages.set(msg.id, msg));
  }

  // Carregar mensagens de validação
  private static loadValidationMessages(): void {
    const validationMessages: Message[] = [
      {
        id: 'validation.required',
        type: MessageType.VALIDATION,
        category: MessageCategory.VALIDATION,
        title: 'Campo obrigatório',
        message: 'Este campo é obrigatório.',
        description: 'Validação de campo obrigatório'
      },
      {
        id: 'validation.email',
        type: MessageType.VALIDATION,
        category: MessageCategory.VALIDATION,
        title: 'Email inválido',
        message: 'Digite um email válido.',
        description: 'Validação de formato de email'
      },
      {
        id: 'validation.cpf',
        type: MessageType.VALIDATION,
        category: MessageCategory.VALIDATION,
        title: 'CPF inválido',
        message: 'Digite um CPF válido.',
        description: 'Validação de CPF'
      },
      {
        id: 'validation.password',
        type: MessageType.VALIDATION,
        category: MessageCategory.VALIDATION,
        title: 'Senha fraca',
        message: 'A senha deve ter pelo menos 8 caracteres.',
        description: 'Validação de força da senha'
      }
    ];

    validationMessages.forEach(msg => this.messages.set(msg.id, msg));
  }
}

// Inicializar sistema de mensagens
MessageSystem.initialize();

// Exportar funções utilitárias
export const getMessage = (id: string): Message | null => {
  return MessageSystem.getMessage(id);
};

export const getMessagesByCategory = (category: MessageCategory): Message[] => {
  return MessageSystem.getMessagesByCategory(category);
};

export const getMessagesByType = (type: MessageType): Message[] => {
  return MessageSystem.getMessagesByType(type);
};

export const addMessage = (message: Message): void => {
  MessageSystem.addMessage(message);
};

export const updateMessage = (id: string, message: Partial<Message>): void => {
  MessageSystem.updateMessage(id, message);
};

export const removeMessage = (id: string): void => {
  MessageSystem.removeMessage(id);
};

// Exportar sistema completo
export default MessageSystem; 