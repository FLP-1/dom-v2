import { UserProfile } from './userProfileConfig';

// Tipos de permissões
export type Permission = 
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'admin'
  | 'reports'
  | 'finance'
  | 'hr'
  | 'budget'
  | 'payments'
  | 'payroll'
  | 'esocial'
  | 'timeclock'
  | 'communication'
  | 'gamification'
  | 'settings'
  | 'users'
  | 'notifications';

// Mapeamento de permissões por perfil
const PERMISSIONS_BY_PROFILE: Record<UserProfile, Permission[]> = {
  employer: [
    'create', 'read', 'update', 'delete', 'reports',
    'finance', 'hr', 'budget', 'payments', 'payroll', 'esocial',
    'timeclock', 'communication', 'settings', 'notifications'
  ],
  employee: [
    'read', 'update',
    'tasks', 'timeclock', 'communication', 'gamification',
    'settings', 'notifications'
  ],
  family: [
    'read', 'update',
    'tasks', 'communication', 'gamification',
    'settings', 'notifications'
  ],
  admin: [
    'create', 'read', 'update', 'delete', 'admin', 'reports',
    'finance', 'hr', 'budget', 'payments', 'payroll', 'esocial',
    'timeclock', 'communication', 'gamification', 'settings',
    'users', 'notifications'
  ],
  partner: [
    'read', 'update',
    'finance', 'budget', 'payments',
    'communication', 'settings', 'notifications'
  ],
  supplier: [
    'read', 'update',
    'finance', 'payments',
    'communication', 'settings', 'notifications'
  ],
  guest: [
    'read',
    'communication', 'notifications'
  ]
};

/**
 * Verifica se um perfil tem uma determinada permissão
 */
export const hasPermission = (profile: UserProfile, permission: Permission): boolean => {
  const profilePermissions = PERMISSIONS_BY_PROFILE[profile] || [];
  return profilePermissions.includes(permission);
};

/**
 * Verifica se um perfil tem múltiplas permissões
 */
export const hasPermissions = (profile: UserProfile, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(profile, permission));
};

/**
 * Verifica se um perfil tem pelo menos uma das permissões
 */
export const hasAnyPermission = (profile: UserProfile, permissions: Permission[]): boolean => {
  return permissions.some(permission => hasPermission(profile, permission));
};

/**
 * Obtém todas as permissões de um perfil
 */
export const getProfilePermissions = (profile: UserProfile): Permission[] => {
  return PERMISSIONS_BY_PROFILE[profile] || [];
};

/**
 * Verifica se um perfil é administrador
 */
export const isAdmin = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'admin');
};

/**
 * Verifica se um perfil pode criar recursos
 */
export const canCreate = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'create');
};

/**
 * Verifica se um perfil pode ler recursos
 */
export const canRead = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'read');
};

/**
 * Verifica se um perfil pode atualizar recursos
 */
export const canUpdate = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'update');
};

/**
 * Verifica se um perfil pode excluir recursos
 */
export const canDelete = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'delete');
};

/**
 * Verifica se um perfil pode acessar relatórios
 */
export const canAccessReports = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'reports');
};

/**
 * Verifica se um perfil pode acessar funcionalidades financeiras
 */
export const canAccessFinance = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'finance');
};

/**
 * Verifica se um perfil pode acessar funcionalidades de RH
 */
export const canAccessHR = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'hr');
};

/**
 * Verifica se um perfil pode acessar orçamento
 */
export const canAccessBudget = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'budget');
};

/**
 * Verifica se um perfil pode acessar pagamentos
 */
export const canAccessPayments = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'payments');
};

/**
 * Verifica se um perfil pode acessar folha de pagamento
 */
export const canAccessPayroll = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'payroll');
};

/**
 * Verifica se um perfil pode acessar eSocial
 */
export const canAccessESocial = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'esocial');
};

/**
 * Verifica se um perfil pode acessar ponto eletrônico
 */
export const canAccessTimeClock = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'timeclock');
};

/**
 * Verifica se um perfil pode acessar comunicação
 */
export const canAccessCommunication = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'communication');
};

/**
 * Verifica se um perfil pode acessar gamificação
 */
export const canAccessGamification = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'gamification');
};

/**
 * Verifica se um perfil pode acessar configurações
 */
export const canAccessSettings = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'settings');
};

/**
 * Verifica se um perfil pode acessar gestão de usuários
 */
export const canAccessUsers = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'users');
};

/**
 * Verifica se um perfil pode acessar notificações
 */
export const canAccessNotifications = (profile: UserProfile): boolean => {
  return hasPermission(profile, 'notifications');
};


