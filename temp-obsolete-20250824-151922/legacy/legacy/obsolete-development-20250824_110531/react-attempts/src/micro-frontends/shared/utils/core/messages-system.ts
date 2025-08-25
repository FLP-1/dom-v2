
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
 * @param {any} data - Dados a serem validados
  */
function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}

/**
 * Tratamento de erros centralizado
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
  */
function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}

/**
 * @param {string} message - Mensagem de erro
  */
function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}

/**
 * Sistema de logging estruturado
 * @param {string} message - Mensagem do log
 * @param {any} data - Dados adicionais
  */
function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}

/**
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
  */
function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}:`, error.message);
}/**
 * @fileoverview Sistema de Mensagens Centralizado - DOM v2
 * @directory frontend/src/utils
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
  */

// ===== TIPOS DE MENSAGEM =====
export type MessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type MessageCategory = 'auth' | 'task' | 'finance' | 'system' | 'notification';

export type UserProfile = 'employer' | 'employee' | 'family' | 'partner' | 'admin' | 'owner';

export type BrazilianRegion = 'southeast' | 'south' | 'northeast' | 'centerwest' | 'north';

// ===== INTERFACES =====
interface MessageConfig {
  type: MessageType;
  category: MessageCategory;
  title: string;
  message: string;
  description?: string;
  actionText?: string;
  icon?: string;
}

interface ProfileMessages {
  [key: string]: MessageConfig;
}

interface RegionalMessages {
  [key: string]: string;
}

// ===== MENSAGENS POR PERFIL =====
const profileMessages: Record<UserProfile, ProfileMessages> = {
  employer: {
    'auth.login.success': {
      type: 'success',
      category: 'auth',
      title: 'Bem-vindo de volta!',
      message: 'Login realizado com sucesso. Acesse seu dashboard para gerenciar sua casa.',
      actionText: 'Ir para Dashboard',
      icon: 'home',
    },
    'task.created': {
      type: 'success',
      category: 'task',
      title: 'Tarefa Criada',
      description: 'Acompanhe o progresso em tempo real',
      actionText: 'Ver Tarefas',
      icon: 'task',
    },
    'finance.alert': {
      type: 'warning',
      category: 'finance',
      title: 'Alerta Financeiro',
      description: 'Revise suas despesas para manter o controle',
      icon: 'money',
    },
  },
  
  employee: {
    'auth.login.success': {
      type: 'success',
      category: 'auth',
      message: 'Login realizado com sucesso. Veja suas tarefas do dia.',
      actionText: 'Ver Tarefas',
      icon: 'task',
    },
    'task.completed': {
      type: 'success',
      category: 'task',
      icon: 'task',
    },
    'notification.new': {
      type: 'info',
      category: 'notification',
      title: 'Nova Mensagem',
      actionText: 'Ler Mensagem',
      icon: 'notification',
    },
  },
  
  family: {
    'auth.login.success': {
      type: 'success',
      category: 'auth',
      message: 'Login realizado com sucesso. Participe das atividades familiares.',
      description: 'Ajude a manter a casa organizada',
      actionText: 'Ver Atividades',
      icon: 'family',
    },
    'task.participation': {
      type: 'info',
      category: 'task',
      title: 'Nova Atividade Familiar',
      description: 'Participe e ajude a manter a casa organizada',
      actionText: 'Participar',
      icon: 'family',
    },
    'achievement.unlocked': {
      type: 'success',
      category: 'system',
      title: 'Conquista Desbloqueada!',
      description: 'Continue assim para desbloquear mais conquistas',
      actionText: 'Ver Conquistas',
      icon: 'chart',
    },
  },
  
  partner: {
    'auth.login.success': {
      type: 'success',
      category: 'auth',
      title: 'Acesso ao Sistema',
      message: 'Login realizado com sucesso. Gerencie suas propriedades.',
      actionText: 'Dashboard Executivo',
      icon: 'chart',
    },
    'business.report': {
      type: 'info',
      category: 'system',
      description: 'Acompanhe o desempenho das suas propriedades',
      icon: 'chart',
    },
    'property.alert': {
      type: 'warning',
      category: 'system',
      title: 'Alerta de Propriedade',
      actionText: 'Ver Detalhes',
      icon: 'notification',
    },
  },
  
  admin: {
    'auth.login.success': {
      type: 'success',
      category: 'auth',
      title: 'Acesso Administrativo',
      actionText: 'Painel Admin',
      icon: 'admin',
    },
    'system.alert': {
      type: 'warning',
      category: 'system',
      title: 'Alerta do Sistema',
      message: 'Detectamos uma atividade incomum no sistema.',
      description: 'Verifique os logs para mais detalhes',
      actionText: 'Ver Logs',
      icon: 'admin',
    },
    'user.management': {
      type: 'info',
      category: 'system',
      icon: 'user',
    },
  },
  
  owner: {
    'auth.login.success': {
      type: 'success',
      category: 'auth',
      title: 'Acesso Executivo',
      actionText: 'Dashboard Executivo',
      icon: 'owner',
    },
    'business.metrics': {
      type: 'info',
      category: 'system',
      description: 'Acompanhe o crescimento e performance',
      icon: 'chart',
    },
    'strategic.alert': {
      type: 'warning',
      category: 'system',
      message: 'Oportunidade de crescimento identificada.',
      description: 'Analise e aproveite as oportunidades de mercado',
      actionText: 'Ver Oportunidades',
      icon: 'chart',
    },
  },
};

const regionalAdaptations: Record<BrazilianRegion, RegionalMessages> = {
  southeast: {
    welcome: 'Bem-vindo ao DOM v2!',
    success: 'Sucesso!',
    error: 'Ops! Algo deu errado.',
    loading: 'Carregando...',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Excluir',
    close: 'Fechar',
  },
  
  south: {
    greeting: 'Oi!',
    welcome: 'Bem-vindo ao DOM v2!',
    success: 'Deu certo!',
    error: 'Ops! Deu algum problema.',
    loading: 'Carregando...',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Excluir',
    close: 'Fechar',
  },
  
  northeast: {
    greeting: 'Oi, meu querido!',
    welcome: 'Bem-vindo ao DOM v2!',
    success: 'Deu bom!',
    error: 'Ops! Deu ruim.',
    loading: 'Carregando...',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Excluir',
    close: 'Fechar',
  },
  
  centerwest: {
    welcome: 'Bem-vindo ao DOM v2!',
    success: 'Funcionou!',
    loading: 'Carregando...',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Excluir',
    close: 'Fechar',
  },
  
  north: {
    greeting: 'Oi!',
    welcome: 'Bem-vindo ao DOM v2!',
    success: 'Deu certo!',
    error: 'Ops! Deu problema.',
    loading: 'Carregando...',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    save: 'Salvar',
    edit: 'Editar',
    delete: 'Excluir',
    close: 'Fechar',
  },
};


/**
  */
export const getProfileMessage = (
  profile: UserProfile,
  messageKey: string,
  region: BrazilianRegion = 'southeast'
): MessageConfig | null => {
  const profileMsg = profileMessages[profile]?.[messageKey];
  
  if (!profileMsg) {
    return null;
  }
  
  const regional = regionalAdaptations[region];
  
  return {
    ...profileMsg,
    title: regional[profileMsg.title.toLowerCase()] || profileMsg.title,
    message: regional[profileMsg.message.toLowerCase()] || profileMsg.message,
  };
};

/**
  */
export const getRegionalText = (
  key: string,
  region: BrazilianRegion = 'southeast'
): string => {
  return regionalAdaptations[region]?.[key] || key;
};

/**
 * Cria mensagem customizada
  */
export const createCustomMessage = (
  type: MessageType,
  category: MessageCategory,
  title: string,
  message: string,
  options: Partial<MessageConfig> = {}
): MessageConfig => {
  return {
    type,
    category,
    title,
    message,
    ...options,
  };
};

/**
  */
export const getProfileMessages = (profile: UserProfile): ProfileMessages => {
  return profileMessages[profile] || {};
};

/**
  */
export const getRegionalAdaptations = (region: BrazilianRegion): RegionalMessages => {
  return regionalAdaptations[region] || {};
};

export default {
  getProfileMessage,
  getRegionalText,
  createCustomMessage,
  getProfileMessages,
  getRegionalAdaptations,
  profileMessages,
  regionalAdaptations,
}; 

/**
 * 
/**
 * Alternativas consideradas:
  */
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */