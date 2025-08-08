/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description Constantes do sistema DOM v2
 */

// Configurações da API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:3001',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

// Configurações da aplicação
export const APP_CONFIG = {
  NAME: 'DOM v2',
  VERSION: '2.0.0',
  DESCRIPTION: 'Sistema de Gestão Doméstica e Empresarial',
  AUTHOR: 'Equipe DOM v2',
  SUPPORT_EMAIL: 'suporte@domv2.com'
};

// Configurações de sessão
export const SESSION_CONFIG = {
  TIMEOUT: 30 * 60 * 1000, // 30 minutos
  MAX_FILE_SIZE: 10 * 1024 * 1024 // 10MB
};

// Perfis de usuário
export const USER_PROFILES = {
  ADMIN: 'admin',
  EMPLOYER: 'employer',
  EMPLOYEE: 'employee',
  FAMILY: 'family',
  USER: 'user'
};

// Status de operações
export const STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading',
  IDLE: 'idle'
};

// Cores do tema
export const COLORS = {
  PRIMARY: '#6366f1',
  SECONDARY: '#8b5cf6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
  BACKGROUND: '#f8fafc',
  TEXT: '#1e293b'
};

// Mensagens do sistema
export const MESSAGES = {
  LOADING: 'Carregando DOM v2...',
  ERROR: 'Erro ao carregar aplicação',
  SUCCESS: 'Operação realizada com sucesso',
  VALIDATION_ERROR: 'Dados inválidos'
};