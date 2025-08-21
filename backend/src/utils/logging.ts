/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: Sistema de logging estruturado customizado
 * - Alternativa 1: Winston.js para logging avançado
 *   - Prós: Funcionalidades avançadas, múltiplos transports
 *   - Contras: Dependência adicional, complexidade
 * - Alternativa 2: Console.log simples
 *   - Prós: Simplicidade extrema
 *   - Contras: Sem estrutura, difícil de filtrar
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - Controle total sobre formato e estrutura
 * - Performance otimizada
 * - Integração com diretivas críticas
 * 
 * @trade-offs
 * - Funcionalidade vs Simplicidade: Logging estruturado
 * - Performance vs Features: Otimizado para produção
 * - Flexibilidade vs Padronização: Formato consistente
 */

import fs from 'fs';
import path from 'path';

/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error, debug)
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
export function logStructured(level: string, message: string, data: any = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    file: __filename,
    function: arguments.callee?.name || 'anonymous'
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, '..', '..', 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    const logFile = path.join(logsDir, 'application.log');
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

/**
 * Log de informações gerais
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
export function logInfo(message: string, data: any = {}) {
  logStructured('info', message, data);
}

/**
 * Log de avisos
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
export function logWarn(message: string, data: any = {}) {
  logStructured('warn', message, data);
}

/**
 * Log de erros
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
export function logError(message: string, data: any = {}) {
  logStructured('error', message, data);
}

/**
 * Log de debug
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
export function logDebug(message: string, data: any = {}) {
  if (process.env.NODE_ENV === 'development') {
    logStructured('debug', message, data);
  }
}

/**
 * Log de performance
 * @param {string} operation - Nome da operação
 * @param {number} duration - Duração em milissegundos
 * @param {object} data - Dados adicionais
 */
export function logPerformance(operation: string, duration: number, data: any = {}) {
  logStructured('info', `Performance: ${operation}`, {
    ...data,
    duration: `${duration}ms`,
    operation
  });
}

/**
 * Log de acesso à API
 * @param {string} method - Método HTTP
 * @param {string} path - Caminho da requisição
 * @param {number} statusCode - Código de status
 * @param {number} duration - Duração da requisição
 * @param {string} userId - ID do usuário (opcional)
 */
export function logApiAccess(method: string, path: string, statusCode: number, duration: number, userId?: string) {
  logStructured('info', 'API Access', {
    method,
    path,
    statusCode,
    duration: `${duration}ms`,
    userId: userId || 'anonymous'
  });
}

/**
 * Log de erro de API
 * @param {string} method - Método HTTP
 * @param {string} path - Caminho da requisição
 * @param {number} statusCode - Código de status
 * @param {string} error - Mensagem de erro
 * @param {string} userId - ID do usuário (opcional)
 */
export function logApiError(method: string, path: string, statusCode: number, error: string, userId?: string) {
  logStructured('error', 'API Error', {
    method,
    path,
    statusCode,
    error,
    userId: userId || 'anonymous'
  });
}

/**
 * Log de autenticação
 * @param {string} action - Ação (login, logout, token_refresh)
 * @param {string} userId - ID do usuário
 * @param {boolean} success - Se a operação foi bem-sucedida
 * @param {object} data - Dados adicionais
 */
export function logAuth(action: string, userId: string, success: boolean, data: any = {}) {
  logStructured(success ? 'info' : 'warn', `Auth: ${action}`, {
    userId,
    success,
    action,
    ...data
  });
}

/**
 * Log de operações de banco de dados
 * @param {string} operation - Operação (create, read, update, delete)
 * @param {string} table - Nome da tabela
 * @param {string} userId - ID do usuário
 * @param {number} duration - Duração da operação
 * @param {object} data - Dados adicionais
 */
export function logDatabase(operation: string, table: string, userId: string, duration: number, data: any = {}) {
  logStructured('info', `Database: ${operation}`, {
    operation,
    table,
    userId,
    duration: `${duration}ms`,
    ...data
  });
}

/**
 * Log de segurança
 * @param {string} event - Evento de segurança
 * @param {string} userId - ID do usuário (opcional)
 * @param {string} ip - IP do usuário (opcional)
 * @param {object} data - Dados adicionais
 */
export function logSecurity(event: string, userId?: string, ip?: string, data: any = {}) {
  logStructured('warn', `Security: ${event}`, {
    event,
    userId: userId || 'unknown',
    ip: ip || 'unknown',
    ...data
  });
}

/**
 * Log de métricas de negócio
 * @param {string} metric - Nome da métrica
 * @param {number} value - Valor da métrica
 * @param {string} userId - ID do usuário (opcional)
 * @param {object} data - Dados adicionais
 */
export function logBusinessMetric(metric: string, value: number, userId?: string, data: any = {}) {
  logStructured('info', `Business Metric: ${metric}`, {
    metric,
    value,
    userId: userId || 'system',
    ...data
  });
}

/**
 * Log de inicialização do sistema
 * @param {string} component - Nome do componente
 * @param {boolean} success - Se a inicialização foi bem-sucedida
 * @param {object} data - Dados adicionais
 */
export function logSystemInit(component: string, success: boolean, data: any = {}) {
  logStructured(success ? 'info' : 'error', `System Init: ${component}`, {
    component,
    success,
    ...data
  });
}

/**
 * Log de shutdown do sistema
 * @param {string} component - Nome do componente
 * @param {object} data - Dados adicionais
 */
export function logSystemShutdown(component: string, data: any = {}) {
  logStructured('info', `System Shutdown: ${component}`, {
    component,
    ...data
  });
}

/**
 * Log de configuração
 * @param {string} config - Nome da configuração
 * @param {any} value - Valor da configuração
 * @param {object} data - Dados adicionais
 */
export function logConfig(config: string, value: any, data: any = {}) {
  logStructured('info', `Config: ${config}`, {
    config,
    value,
    ...data
  });
}

/**
 * Log de cache
 * @param {string} operation - Operação (hit, miss, set, clear)
 * @param {string} key - Chave do cache
 * @param {number} duration - Duração da operação
 * @param {object} data - Dados adicionais
 */
export function logCache(operation: string, key: string, duration: number, data: any = {}) {
  logStructured('debug', `Cache: ${operation}`, {
    operation,
    key,
    duration: `${duration}ms`,
    ...data
  });
}

/**
 * Log de validação
 * @param {string} field - Campo validado
 * @param {boolean} valid - Se a validação passou
 * @param {string} rule - Regra de validação
 * @param {object} data - Dados adicionais
 */
export function logValidation(field: string, valid: boolean, rule: string, data: any = {}) {
  if (!valid) {
    logStructured('warn', `Validation Failed: ${field}`, {
      field,
      valid,
      rule,
      ...data
    });
  }
}

/**
 * Log de rate limiting
 * @param {string} ip - IP do usuário
 * @param {string} endpoint - Endpoint acessado
 * @param {number} limit - Limite de requisições
 * @param {number} remaining - Requisições restantes
 * @param {object} data - Dados adicionais
 */
export function logRateLimit(ip: string, endpoint: string, limit: number, remaining: number, data: any = {}) {
  if (remaining <= 0) {
    logStructured('warn', 'Rate Limit Exceeded', {
      ip,
      endpoint,
      limit,
      remaining,
      ...data
    });
  }
}

/**
 * Log de monitoramento de saúde
 * @param {string} component - Nome do componente
 * @param {string} status - Status (healthy, warning, error)
 * @param {object} metrics - Métricas de saúde
 * @param {object} data - Dados adicionais
 */
export function logHealth(component: string, status: string, metrics: any, data: any = {}) {
  const level = status === 'healthy' ? 'info' : status === 'warning' ? 'warn' : 'error';
  logStructured(level, `Health Check: ${component}`, {
    component,
    status,
    metrics,
    ...data
  });
}

/**
 * Log de backup
 * @param {string} operation - Operação (start, complete, error)
 * @param {string} type - Tipo de backup
 * @param {number} size - Tamanho do backup
 * @param {object} data - Dados adicionais
 */
export function logBackup(operation: string, type: string, size: number, data: any = {}) {
  logStructured('info', `Backup: ${operation}`, {
    operation,
    type,
    size: `${size} bytes`,
    ...data
  });
}

/**
 * Log de deploy
 * @param {string} environment - Ambiente (development, staging, production)
 * @param {string} version - Versão do deploy
 * @param {boolean} success - Se o deploy foi bem-sucedido
 * @param {object} data - Dados adicionais
 */
export function logDeploy(environment: string, version: string, success: boolean, data: any = {}) {
  logStructured(success ? 'info' : 'error', `Deploy: ${environment}`, {
    environment,
    version,
    success,
    ...data
  });
}

/**
 * Log de auditoria
 * @param {string} action - Ação auditada
 * @param {string} userId - ID do usuário
 * @param {string} resource - Recurso afetado
 * @param {object} changes - Mudanças realizadas
 * @param {object} data - Dados adicionais
 */
export function logAudit(action: string, userId: string, resource: string, changes: any, data: any = {}) {
  logStructured('info', `Audit: ${action}`, {
    action,
    userId,
    resource,
    changes,
    ...data
  });
}

export default {
  logStructured,
  logInfo,
  logWarn,
  logError,
  logDebug,
  logPerformance,
  logApiAccess,
  logApiError,
  logAuth,
  logDatabase,
  logSecurity,
  logBusinessMetric,
  logSystemInit,
  logSystemShutdown,
  logConfig,
  logCache,
  logValidation,
  logRateLimit,
  logHealth,
  logBackup,
  logDeploy,
  logAudit
};
