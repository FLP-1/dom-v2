/**
 * @fileoverview Configuração de perfis de usuário - DOM v2
 * @description Sistema de personalização de telas por perfil
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 */

export type UserProfile = 'employer' | 'employee' | 'family' | 'admin' | 'partner' | 'supplier' | 'guest';

export interface ProfileFeatures {
  dashboard: {
    cards: string[];
    priority: string[];
    layout: 'grid' | 'list' | 'compact';
  };
  navigation: {
    sections: string[];
    order: string[];
    style: 'full' | 'compact' | 'minimal';
  };
  permissions: {
    create: boolean;
    edit: boolean;
    delete: boolean;
    admin: boolean;
    reports: boolean;
  };
  features: {
    finance: boolean;
    tasks: boolean;
    hr: boolean;
    timeclock: boolean;
    communication: boolean;
    gamification: boolean;
    reports: boolean;
    settings: boolean;
    users: boolean;
    notifications: boolean;
    budget: boolean;
    payments: boolean;
  };
  ui: {
    theme: 'light' | 'dark' | 'auto';
    density: 'comfortable' | 'compact' | 'spacious';
    language: 'pt-BR';
    region: 'BR';
  };
}

export const USER_PROFILES: Record<UserProfile, ProfileFeatures> = {
  employer: {
    dashboard: {
      cards: ['finance', 'hr', 'budget', 'payments', 'payroll', 'esocial', 'reports', 'tasks'],
      priority: ['finance', 'hr', 'budget'],
      layout: 'grid'
    },
    navigation: {
      sections: ['dashboard', 'finance', 'hr', 'budget', 'payments', 'payroll', 'esocial', 'reports', 'tasks', 'settings'],
              order: ['dashboard', 'finance', 'hr', 'budget', 'payments', 'payroll', 'esocial', 'reports', 'tasks', 'settings'],
      style: 'full'
    },
    permissions: {
      create: true,
      edit: true,
      delete: true,
      admin: false,
      reports: true
    },
    features: {
      finance: true,
      tasks: true,
      hr: true,
      timeclock: true,
      communication: true,
      gamification: false,
      reports: true,
      settings: true,
      users: false,
      notifications: true,
      budget: true,
      payments: true
    },
    ui: {
      theme: 'light',
      density: 'comfortable',
      language: 'pt-BR',
      region: 'BR'
    }
  },

  employee: {
    dashboard: {
      cards: ['tasks', 'timeclock', 'communication', 'gamification'],
      priority: ['tasks', 'timeclock'],
      layout: 'list'
    },
    navigation: {
      sections: ['dashboard', 'tasks', 'timeclock', 'communication', 'gamification', 'settings'],
      order: ['dashboard', 'tasks', 'timeclock', 'communication', 'gamification', 'settings'],
      style: 'compact'
    },
    permissions: {
      create: false,
      edit: false,
      delete: false,
      admin: false,
      reports: false
    },
    features: {
      finance: false,
      tasks: true,
      hr: false,
      timeclock: true,
      communication: true,
      gamification: true,
      reports: false,
      settings: true,
      users: false,
      notifications: true,
      budget: false,
      payments: false
    },
    ui: {
      theme: 'auto',
      density: 'comfortable',
      language: 'pt-BR',
      region: 'BR'
    }
  },

  family: {
    dashboard: {
      cards: ['tasks', 'budget', 'communication', 'gamification'],
      priority: ['tasks', 'budget'],
      layout: 'grid'
    },
    navigation: {
      sections: ['dashboard', 'tasks', 'budget', 'communication', 'gamification', 'settings'],
      order: ['dashboard', 'tasks', 'budget', 'communication', 'gamification', 'settings'],
      style: 'compact'
    },
    permissions: {
      create: false,
      edit: false,
      delete: false,
      admin: false,
      reports: false
    },
    features: {
      finance: false,
      tasks: true,
      hr: false,
      timeclock: false,
      communication: true,
      gamification: true,
      reports: false,
      settings: true,
      users: false,
      notifications: true,
      budget: true,
      payments: false
    },
    ui: {
      theme: 'light',
      density: 'spacious',
      language: 'pt-BR',
      region: 'BR'
    }
  },

  admin: {
    dashboard: {
      cards: ['users', 'reports', 'settings', 'finance', 'hr', 'tasks', 'notifications'],
      priority: ['users', 'reports', 'settings'],
      layout: 'grid'
    },
    navigation: {
      sections: ['dashboard', 'users', 'reports', 'settings', 'finance', 'hr', 'tasks', 'budget', 'payments', 'payroll', 'esocial', 'timeclock', 'communication', 'gamification', 'notifications'],
      order: ['dashboard', 'users', 'reports', 'settings', 'finance', 'hr', 'tasks', 'budget', 'payments', 'payroll', 'esocial', 'timeclock', 'communication', 'gamification', 'notifications'],
      style: 'full'
    },
    permissions: {
      create: true,
      edit: true,
      delete: true,
      admin: true,
      reports: true
    },
    features: {
      finance: true,
      tasks: true,
      hr: true,
      timeclock: true,
      communication: true,
      gamification: true,
      reports: true,
      settings: true,
      users: true,
      notifications: true,
      budget: true,
      payments: true
    },
    ui: {
      theme: 'dark',
      density: 'compact',
      language: 'pt-BR',
      region: 'BR'
    }
  },

  partner: {
    dashboard: {
      cards: ['services', 'bookings', 'reviews', 'communication', 'finance'],
      priority: ['bookings', 'services'],
      layout: 'grid'
    },
    navigation: {
      sections: ['dashboard', 'services', 'bookings', 'reviews', 'communication', 'finance', 'settings'],
      order: ['dashboard', 'services', 'bookings', 'reviews', 'communication', 'finance', 'settings'],
      style: 'compact'
    },
    permissions: {
      create: true,
      edit: true,
      delete: false,
      admin: false,
      reports: false
    },
    features: {
      finance: true,
      tasks: false,
      hr: false,
      timeclock: false,
      communication: true,
      gamification: false,
      reports: false,
      settings: true,
      users: false,
      notifications: true,
      budget: false,
      payments: true
    },
    ui: {
      theme: 'light',
      density: 'comfortable',
      language: 'pt-BR',
      region: 'BR'
    }
  },

  supplier: {
    dashboard: {
      cards: ['products', 'orders', 'inventory', 'communication', 'finance'],
      priority: ['orders', 'products'],
      layout: 'grid'
    },
    navigation: {
      sections: ['dashboard', 'products', 'orders', 'inventory', 'communication', 'finance', 'settings'],
      order: ['dashboard', 'products', 'orders', 'inventory', 'communication', 'finance', 'settings'],
      style: 'compact'
    },
    permissions: {
      create: true,
      edit: true,
      delete: false,
      admin: false,
      reports: false
    },
    features: {
      finance: true,
      tasks: false,
      hr: false,
      timeclock: false,
      communication: true,
      gamification: false,
      reports: false,
      settings: true,
      users: false,
      notifications: true,
      budget: false,
      payments: true
    },
    ui: {
      theme: 'light',
      density: 'comfortable',
      language: 'pt-BR',
      region: 'BR'
    }
  },

  guest: {
    dashboard: {
      cards: ['tasks', 'communication'],
      priority: ['tasks'],
      layout: 'list'
    },
    navigation: {
      sections: ['dashboard', 'tasks', 'communication'],
      order: ['dashboard', 'tasks', 'communication'],
      style: 'minimal'
    },
    permissions: {
      create: false,
      edit: false,
      delete: false,
      admin: false,
      reports: false
    },
    features: {
      finance: false,
      tasks: true,
      hr: false,
      timeclock: false,
      communication: true,
      gamification: false,
      reports: false,
      settings: false,
      users: false,
      notifications: false,
      budget: false,
      payments: false
    },
    ui: {
      theme: 'light',
      density: 'comfortable',
      language: 'pt-BR',
      region: 'BR'
    }
  }
};

/**
 * Obter configuração do perfil do usuário
 */
export const getUserProfileConfig = (profile: UserProfile): ProfileFeatures => {
  return USER_PROFILES[profile] || USER_PROFILES.guest;
};

/**
 * Verificar se o usuário tem acesso a uma funcionalidade
 */
export const hasFeatureAccess = (profile: UserProfile, feature: keyof ProfileFeatures['features']): boolean => {
  const config = getUserProfileConfig(profile);
  return config.features[feature];
};

/**
 * Verificar se o usuário tem uma permissão específica
 */
export const hasPermission = (profile: UserProfile, permission: keyof ProfileFeatures['permissions']): boolean => {
  const config = getUserProfileConfig(profile);
  return config.permissions[permission];
};

/**
 * Obter cards do dashboard para o perfil
 */
export const getDashboardCards = (profile: UserProfile): string[] => {
  const config = getUserProfileConfig(profile);
  return config.dashboard.cards;
};

/**
 * Obter seções de navegação para o perfil
 */
export const getNavigationSections = (profile: UserProfile): string[] => {
  const config = getUserProfileConfig(profile);
  return config.navigation.sections;
};

/**
 * Obter configurações de UI para o perfil
 */
export const getUIConfig = (profile: UserProfile) => {
  const config = getUserProfileConfig(profile);
  return config.ui;
};

/**
 * Mapeamento de ícones por funcionalidade
 */
export const FEATURE_ICONS: Record<string, string> = {
  dashboard: '🏠',
  finance: '💰',
  tasks: '📝',
  hr: '👥',
  budget: '📊',
  payments: '💳',
  payroll: '💰',
  esocial: '🏛️',
  timeclock: '⏰',
  communication: '💬',
  gamification: '🎮',
  reports: '📈',
  settings: '⚙️',
  users: '👤',
  notifications: '🔔',
  services: '🔧',
  bookings: '📅',
  reviews: '⭐',
  products: '📦',
  orders: '🛒',
  inventory: '📋'
};

/**
 * Mapeamento de títulos por funcionalidade
 */
export const FEATURE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  finance: 'Finanças',
  tasks: 'Tarefas',
  hr: 'Funcionários',
  budget: 'Orçamento',
  payments: 'Pagamentos',
  payroll: 'Folha de Pagamento',
  esocial: 'eSocial Doméstico',
  timeclock: 'Ponto Eletrônico',
  communication: 'Comunicação',
  gamification: 'Gamificação',
  reports: 'Relatórios',
  settings: 'Configurações',
  users: 'Usuários',
  notifications: 'Notificações',
  services: 'Serviços',
  bookings: 'Agendamentos',
  reviews: 'Avaliações',
  products: 'Produtos',
  orders: 'Pedidos',
  inventory: 'Estoque'
};

/**
 * Mapeamento de descrições por funcionalidade
 */
export const FEATURE_DESCRIPTIONS: Record<string, string> = {
  dashboard: 'Visão geral do sistema',
  finance: 'Controle financeiro completo',
  tasks: 'Gestão de tarefas domésticas',
  hr: 'Gestão de colaboradores',
  budget: 'Planejamento orçamentário',
  payments: 'Controle de pagamentos',
  payroll: 'Cálculo de salários e benefícios',
  esocial: 'Sistema de compliance legal',
  timeclock: 'Controle de ponto',
  communication: 'Sistema de mensagens',
  gamification: 'Pontos e conquistas',
  reports: 'Relatórios e análises',
  settings: 'Configurações do sistema',
  users: 'Gestão de usuários',
  notifications: 'Central de notificações',
  services: 'Gerenciar serviços oferecidos',
  bookings: 'Agendamentos de clientes',
  reviews: 'Avaliações e feedback',
  products: 'Catálogo de produtos',
  orders: 'Pedidos e vendas',
  inventory: 'Controle de estoque'
};

/**
 * Gerenciamento de tema do usuário
 */
export const updateUserTheme = (profile: UserProfile, theme: 'light' | 'dark' | 'auto') => {
  const config = getUserProfileConfig(profile);
  config.ui.theme = theme;
  
  // Salvar no localStorage
  localStorage.setItem('dom_user_theme', theme);
  localStorage.setItem('dom_user_profile_theme', JSON.stringify({ profile, theme }));
  
  return config.ui;
};

export const getUserTheme = (profile: UserProfile) => {
  const config = getUserProfileConfig(profile);
  return config.ui.theme;
};

export const getSystemTheme = () => {
  // Detectar tema do sistema
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const getCurrentTheme = (profile: UserProfile) => {
  const userTheme = getUserTheme(profile);
  
  if (userTheme === 'auto') {
    return getSystemTheme();
  }
  
  return userTheme;
};
