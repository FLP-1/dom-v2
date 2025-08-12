/**
 * Constantes do Sistema DOM v2
 * 
 * Este arquivo contém todas as constantes utilizadas no sistema,
 * incluindo endpoints da API, chaves de storage, configurações
 * e outras constantes globais.
 */

// API Endpoints
export const API_ENDPOINTS = {
  // Autenticação
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  REGISTER: '/auth/register',
  
  // Usuários
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  USER_SETTINGS: '/users/settings',
  
  // Finanças
  BUDGETS: '/budgets',
  PAYMENTS: '/payments',
  EXPENSES: '/expenses',
  INCOMES: '/incomes',
  
  // Tarefas
  TASKS: '/tasks',
  TASK_CATEGORIES: '/tasks/categories',
  TASK_ASSIGNMENTS: '/tasks/assignments',
  
  // Funcionários
  EMPLOYEES: '/employees',
  EMPLOYEE_SCHEDULES: '/employees/schedules',
  EMPLOYEE_PAYMENTS: '/employees/payments',
  
  // Folha de Pagamento
  PAYROLL: '/payroll',
  PAYROLL_REPORTS: '/payroll/reports',
  PAYROLL_HISTORY: '/payroll/history',
  
  // eSocial
  ESOCIAL: '/esocial',
  ESOCIAL_EVENTS: '/esocial/events',
  ESOCIAL_REPORTS: '/esocial/reports',
  
  // Comunicação
  MESSAGES: '/messages',
  NOTIFICATIONS: '/notifications',
  AUDIO_MESSAGES: '/audio-messages',
  
  // Gamificação
  GAMIFICATION: '/gamification',
  POINTS: '/gamification/points',
  REWARDS: '/gamification/rewards',
  BADGES: '/gamification/badges',
  
  // Relatórios
  REPORTS: '/reports',
  ANALYTICS: '/analytics',
  DASHBOARD: '/dashboard',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  // Autenticação
  AUTH_TOKEN: 'dom_v2_auth_token',
  REFRESH_TOKEN: 'dom_v2_refresh_token',
  USER_DATA: 'dom_v2_user_data',
  
  // Configurações
  USER_SETTINGS: 'dom_v2_user_settings',
  THEME_PREFERENCE: 'dom_v2_theme_preference',
  LANGUAGE: 'dom_v2_language',
  
  // Cache
  CACHE_BUDGETS: 'dom_v2_cache_budgets',
  CACHE_TASKS: 'dom_v2_cache_tasks',
  CACHE_EMPLOYEES: 'dom_v2_cache_employees',
  
  // Gamificação
  GAMIFICATION_DATA: 'dom_v2_gamification_data',
  POINTS_HISTORY: 'dom_v2_points_history',
  REWARDS_CLAIMED: 'dom_v2_rewards_claimed',
  
  // Comunicação
  MESSAGES_CACHE: 'dom_v2_messages_cache',
  NOTIFICATIONS_SETTINGS: 'dom_v2_notifications_settings',
} as const;

// Configurações da Aplicação
export const APP_CONFIG = {
  // URLs
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  WEB_URL: process.env.REACT_APP_WEB_URL || 'http://localhost:3000',
  
  // Timeouts
  API_TIMEOUT: 30000, // 30 segundos
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 horas
  
  // Limites
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_MESSAGE_LENGTH: 1000,
  MAX_AUDIO_DURATION: 120, // 2 minutos
  
  // Paginação
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Perfis de Usuário
export const USER_PROFILES = {
  EMPLOYER: 'employer',
  EMPLOYEE: 'employee',
  FAMILY: 'family',
  ADMIN: 'admin',
  PARTNER: 'partner',
  SUPPLIER: 'supplier',
  GUEST: 'guest',
} as const;

// Status de Tarefas
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  OVERDUE: 'overdue',
} as const;

// Status de Pagamentos
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;

// Categorias de Orçamento
export const BUDGET_CATEGORIES = {
  FOOD: 'food',
  TRANSPORT: 'transport',
  HEALTH: 'health',
  EDUCATION: 'education',
  ENTERTAINMENT: 'entertainment',
  UTILITIES: 'utilities',
  MAINTENANCE: 'maintenance',
  OTHER: 'other',
} as const;

// Tipos de Notificação
export const NOTIFICATION_TYPES = {
  TASK_ASSIGNED: 'task_assigned',
  TASK_COMPLETED: 'task_completed',
  PAYMENT_DUE: 'payment_due',
  PAYMENT_RECEIVED: 'payment_received',
  BUDGET_ALERT: 'budget_alert',
  SYSTEM_UPDATE: 'system_update',
  EMERGENCY: 'emergency',
} as const;

// Níveis de Prioridade
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

// Temas da Aplicação
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const;

// Idiomas Suportados
export const LANGUAGES = {
  PT_BR: 'pt-BR',
  EN_US: 'en-US',
  ES_ES: 'es-ES',
} as const;

// Configurações de Gamificação
export const GAMIFICATION_CONFIG = {
  // Pontos por atividade
  POINTS_PER_TASK: 10,
  POINTS_PER_PAYMENT: 5,
  POINTS_PER_BUDGET_GOAL: 20,
  POINTS_PER_DAY_LOGIN: 1,
  
  // Multiplicadores
  STREAK_MULTIPLIER: 1.5,
  WEEKEND_MULTIPLIER: 2.0,
  
  // Limites
  MAX_DAILY_POINTS: 100,
  MAX_WEEKLY_POINTS: 500,
  MAX_MONTHLY_POINTS: 2000,
} as const;

// Configurações de Validação
export const VALIDATION_RULES = {
  // CPF
  CPF_LENGTH: 11,
  CPF_REGEX: /^\d{11}$/,
  
  // Email
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Senha
  MIN_PASSWORD_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  
  // Telefone
  PHONE_REGEX: /^\+?[\d\s\-()]+$/,
  
  // Nome
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
} as const;

// Mensagens de Erro
export const ERROR_MESSAGES = {
  // Autenticação
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  SESSION_EXPIRED: 'Sessão expirada',
  ACCESS_DENIED: 'Acesso negado',
  
  // Validação
  REQUIRED_FIELD: 'Campo obrigatório',
  INVALID_EMAIL: 'Email inválido',
  INVALID_CPF: 'CPF inválido',
  WEAK_PASSWORD: 'Senha muito fraca',
  
  // API
  NETWORK_ERROR: 'Erro de conexão',
  SERVER_ERROR: 'Erro do servidor',
  TIMEOUT_ERROR: 'Tempo limite excedido',
  
  // Geral
  UNKNOWN_ERROR: 'Erro desconhecido',
  TRY_AGAIN: 'Tente novamente',
} as const;

// Mensagens de Sucesso
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login realizado com sucesso',
  LOGOUT_SUCCESS: 'Logout realizado com sucesso',
  SAVE_SUCCESS: 'Salvo com sucesso',
  DELETE_SUCCESS: 'Excluído com sucesso',
  UPDATE_SUCCESS: 'Atualizado com sucesso',
  CREATE_SUCCESS: 'Criado com sucesso',
} as const;

// Configurações de Performance
export const PERFORMANCE_CONFIG = {
  // Debounce
  SEARCH_DEBOUNCE: 300,
  SCROLL_DEBOUNCE: 100,
  
  // Throttle
  API_THROTTLE: 1000,
  SCROLL_THROTTLE: 16, // ~60fps
  
  // Cache
  MEMORY_CACHE_SIZE: 100,
  DISK_CACHE_SIZE: 50 * 1024 * 1024, // 50MB
} as const;

// Configurações de Acessibilidade
export const ACCESSIBILITY_CONFIG = {
  // Tempos de leitura
  SCREEN_READER_DELAY: 1000,
  FOCUS_DELAY: 200,
  
  // Tamanhos mínimos
  MIN_TOUCH_TARGET: 44,
  MIN_FONT_SIZE: 16,
  
  // Contraste
  MIN_CONTRAST_RATIO: 4.5,
} as const;

// Configurações de Segurança
export const SECURITY_CONFIG = {
  // Tokens
  TOKEN_EXPIRY: 24 * 60 * 60, // 24 horas
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60, // 7 dias
  
  // Tentativas de login
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60, // 15 minutos
  
  // Senha
  PASSWORD_HISTORY_SIZE: 5,
  PASSWORD_EXPIRY_DAYS: 90,
} as const;

// Configurações de LGPD
export const LGPD_CONFIG = {
  // Retenção de dados
  DATA_RETENTION_DAYS: 365 * 2, // 2 anos
  
  // Consentimento
  CONSENT_EXPIRY_DAYS: 365,
  
  // Direitos do usuário
  DATA_PORTABILITY_FORMATS: ['json', 'csv', 'pdf'],
} as const;

export type UserProfile = typeof USER_PROFILES[keyof typeof USER_PROFILES];
export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
export type BudgetCategory = typeof BUDGET_CATEGORIES[keyof typeof BUDGET_CATEGORIES];
export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];
export type PriorityLevel = typeof PRIORITY_LEVELS[keyof typeof PRIORITY_LEVELS];
export type Theme = typeof THEMES[keyof typeof THEMES];
export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];