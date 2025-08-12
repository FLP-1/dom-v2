

/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error, debug)
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
;
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'application.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Aplicar logging

/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Aplicar asserções críticas

assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');

/**
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
:`, error.message);
  
  // Log estruturado para debugging
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    type: error.constructor.name
  };
  
  // Salvar log de erro
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'error-log.json'),
      JSON.stringify(errorLog) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
  
  // Re-throw para tratamento superior
  throw error;
}

// Aplicar tratamento de erro
try {
  // código principal aqui
} catch (error) {
  
}

/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Aplicar validação
 {
  throw new Error('Dados de entrada inválidos');
}

export const MESSAGES = {
  GENERAL: {
    ERROR: 'Ocorreu um erro. Tente novamente.',
    LOADING: 'Carregando...'
  },
  VALIDATION: {
    REQUIRED: 'Campo obrigatório.',
    CPF_INVALID: 'CPF inválido',
    CPF_DUPLICATE: 'CPF já cadastrado',
  },
  EMPLOYEES: {
    SAVE_ERROR: 'Não foi possível salvar o funcionário.',
    EMPTY_LIST: 'Nenhum funcionário cadastrado.',
  },
  SESSION: {
    EXPIRED: 'Sua sessão expirou. Faça login novamente.'
  }
} as const;

export type MessageCatalog = typeof MESSAGES;

/**
 * @fileoverview Arquivo migrado - messages
 * @description Este arquivo foi migrado para o sistema centralizado de mensagens
 * @migrated 2025-01-23
 * @deprecated Use messages-centralized.ts instead
 */

// Use: import { getMessage, Messages } from './messages-centralized';

export { getMessage, Messages, MessagesCentralized } from './messages-centralized';

export const getMessageText = (id: string) => {
  console.warn('getMessageText is deprecated. Use getMessage instead.');
  return getMessage(id);
};

export const getMessageConfig = (id: string) => {
  console.warn('getMessageConfig is deprecated. Use Messages.get instead.');
  return Messages.get(id);
};