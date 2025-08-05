export const APP_CONSTANTS = {
  APP_NAME: 'DOM v2',
  VERSION: '2.0.0',
  BUILD_NUMBER: '1',
} as const;

export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:3001/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  DASHBOARD: {
    DATA: '/dashboard',
    STATS: '/dashboard/stats',
  },
  TASKS: {
    LIST: '/tasks',
    CREATE: '/tasks',
    UPDATE: '/tasks/:id',
    DELETE: '/tasks/:id',
  },
  EMPLOYEES: {
    LIST: '/employees',
    CREATE: '/employees',
    UPDATE: '/employees/:id',
    DELETE: '/employees/:id',
  },
  PAYMENTS: {
    LIST: '/payments',
    CREATE: '/payments',
    UPDATE: '/payments/:id',
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME_PREFERENCE: 'theme_preference',
  LANGUAGE: 'language',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique as informações.',
  SERVER_ERROR: 'Erro no servidor. Tente novamente.',
  UNKNOWN_ERROR: 'Erro desconhecido. Tente novamente.',
} as const;

export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Tarefa criada com sucesso!',
  TASK_UPDATED: 'Tarefa atualizada com sucesso!',
  TASK_DELETED: 'Tarefa removida com sucesso!',
  EMPLOYEE_CREATED: 'Funcionário adicionado com sucesso!',
  EMPLOYEE_UPDATED: 'Funcionário atualizado com sucesso!',
  PAYMENT_CREATED: 'Pagamento registrado com sucesso!',
} as const;