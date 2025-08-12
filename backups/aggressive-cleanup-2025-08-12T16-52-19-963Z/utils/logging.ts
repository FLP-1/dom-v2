/**
 * @fileoverview Logging Utils - Sistema de logging centralizado
 * @description Sistema de logging estruturado para todo o projeto
 * @version 2.0.0
 * @generated 2025-08-10T11:02:06.571Z
 */

import fs from 'fs';
import path from 'path';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  context?: string;
  userId?: string;
}

/**
 * Sistema de logging estruturado
 * @param {LogLevel} level - Nível do log
 * @param {string} message - Mensagem do log
 * @param {any} data - Dados adicionais
 * @param {string} context - Contexto da execução
 */
export function logStructured(
  level: LogLevel,
  message: string,
  data: any = {},
  context?: string
): void {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    context
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging (apenas em servidor)
  if (typeof window === 'undefined') {
    try {
      const logsDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      fs.appendFileSync(
        path.join(logsDir, 'application.log'),
        JSON.stringify(logEntry) + '\n'
      );
    } catch (logError) {
      console.error('Erro ao salvar log:', logError);
    }
  }
}

/**
 * Criar logger contextualizado
 * @param {string} context - Contexto do logger
 * @returns {object} - Logger contextualizado
 */
export function createLogger(context: string) {
  return {
    debug: (message: string, data?: any) => logStructured('debug', message, data, context),
    info: (message: string, data?: any) => logStructured('info', message, data, context),
    warn: (message: string, data?: any) => logStructured('warn', message, data, context),
    error: (message: string, data?: any) => logStructured('error', message, data, context)
  };
}
