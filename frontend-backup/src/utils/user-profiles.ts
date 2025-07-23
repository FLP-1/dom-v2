/**
 * @fileoverview Utilitários para personalização baseada em perfis de usuário
 * @directory frontend/src/utils
 * @description Sistema de personalização dinâmica da interface
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

// Tipos de perfil de usuário
export type UserProfileType = 
  | 'EMPLOYER'    // Empregadores
  | 'EMPLOYEE'    // Empregados Domésticos
  | 'FAMILY'      // Familiares
  | 'PARTNER'     // Parceiros
  | 'SUBORDINATE' // Subordinados
  | 'ADMIN'       // Administradores
  | 'OWNER';      // Donos

// Níveis de experiência digital
export type DigitalExperience = 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';

// Dispositivos principais
export type DeviceType = 'MOBILE' | 'TABLET' | 'DESKTOP';

// Tempo disponível
export type TimeAvailable = 'LIMITED' | 'FLEXIBLE' | 'EXTENSIVE';

// Interface do perfil completo
export interface UserProfile {
  type: UserProfileType;
  experience: DigitalExperience;
  device: DeviceType;
  timeAvailable: TimeAvailable;
}

// Configuração de tema da interface
export interface UITheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
  typography: {
    fontSize: {
      small: number;
      medium: number;
      large: number;
      xlarge: number;
    };
    fontWeight: {
      normal: string;
      medium: string;
      bold: string;
    };
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
  icons: {
    size: {
      small: number;
      medium: number;
      large: number;
    };
    style: 'minimal' | 'colorful' | 'detailed';
  };
  layout: {
    density: 'compact' | 'comfortable' | 'spacious';
    navigation: 'linear' | 'hierarchical' | 'shortcut';
  };
}

// Configuração de conteúdo
export interface ContentConfig {
  language: 'SIMPLE' | 'STANDARD' | 'TECHNICAL';
  detail: 'MINIMAL' | 'STANDARD' | 'DETAILED';
  format: 'VISUAL' | 'MIXED' | 'TEXT';
  help: 'NONE' | 'BASIC' | 'EXTENSIVE';
}

// Configuração de notificações
export interface NotificationConfig {
  frequency: 'MINIMAL' | 'STANDARD' | 'FREQUENT';
  type: 'VISUAL' | 'SOUND' | 'BOTH';
  detail: 'SUMMARY' | 'STANDARD' | 'DETAILED';
}

// Configuração completa de personalização
export interface PersonalizationConfig {
  theme: UITheme;
  content: ContentConfig;
  notifications: NotificationConfig;
}

// Mapeamento de perfis para configurações padrão
const PROFILE_CONFIGS: Record<UserProfileType, PersonalizationConfig> = {
  EMPLOYER: {
    theme: {
      colors: {
        primary: '#1976D2',      // Azul profissional
        secondary: '#4CAF50',    // Verde sucesso
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#212121',
        textSecondary: '#757575',
        accent: '#FF9800',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      typography: {
        fontSize: { small: 12, medium: 14, large: 16, xlarge: 18 },
        fontWeight: { normal: '400', medium: '500', bold: '600' },
      },
      spacing: { small: 8, medium: 16, large: 24, xlarge: 32 },
      icons: {
        size: { small: 16, medium: 24, large: 32 },
        style: 'minimal',
      },
      layout: {
        density: 'comfortable',
        navigation: 'shortcut',
      },
    },
    content: {
      language: 'STANDARD',
      detail: 'MINIMAL',
      format: 'MIXED',
      help: 'BASIC',
    },
    notifications: {
      frequency: 'MINIMAL',
      type: 'VISUAL',
      detail: 'SUMMARY',
    },
  },

  EMPLOYEE: {
    theme: {
      colors: {
        primary: '#FF5722',      // Laranja vibrante
        secondary: '#9C27B0',    // Roxo amigável
        background: '#F5F5F5',
        surface: '#FFFFFF',
        text: '#212121',
        textSecondary: '#757575',
        accent: '#FFC107',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      typography: {
        fontSize: { small: 14, medium: 16, large: 18, xlarge: 20 },
        fontWeight: { normal: '400', medium: '500', bold: '600' },
      },
      spacing: { small: 12, medium: 20, large: 28, xlarge: 36 },
      icons: {
        size: { small: 20, medium: 28, large: 36 },
        style: 'colorful',
      },
      layout: {
        density: 'spacious',
        navigation: 'linear',
      },
    },
    content: {
      language: 'SIMPLE',
      detail: 'STANDARD',
      format: 'VISUAL',
      help: 'EXTENSIVE',
    },
    notifications: {
      frequency: 'FREQUENT',
      type: 'BOTH',
      detail: 'STANDARD',
    },
  },

  FAMILY: {
    theme: {
      colors: {
        primary: '#4CAF50',      // Verde acolhedor
        secondary: '#2196F3',    // Azul familiar
        background: '#F8F9FA',
        surface: '#FFFFFF',
        text: '#212121',
        textSecondary: '#757575',
        accent: '#FF9800',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      typography: {
        fontSize: { small: 13, medium: 15, large: 17, xlarge: 19 },
        fontWeight: { normal: '400', medium: '500', bold: '600' },
      },
      spacing: { small: 10, medium: 18, large: 26, xlarge: 34 },
      icons: {
        size: { small: 18, medium: 26, large: 34 },
        style: 'detailed',
      },
      layout: {
        density: 'comfortable',
        navigation: 'hierarchical',
      },
    },
    content: {
      language: 'STANDARD',
      detail: 'STANDARD',
      format: 'MIXED',
      help: 'BASIC',
    },
    notifications: {
      frequency: 'STANDARD',
      type: 'VISUAL',
      detail: 'STANDARD',
    },
  },

  PARTNER: {
    theme: {
      colors: {
        primary: '#424242',      // Cinza corporativo
        secondary: '#607D8B',    // Azul acinzentado
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#212121',
        textSecondary: '#757575',
        accent: '#FF9800',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      typography: {
        fontSize: { small: 11, medium: 13, large: 15, xlarge: 17 },
        fontWeight: { normal: '400', medium: '500', bold: '600' },
      },
      spacing: { small: 6, medium: 12, large: 18, xlarge: 24 },
      icons: {
        size: { small: 14, medium: 20, large: 26 },
        style: 'minimal',
      },
      layout: {
        density: 'compact',
        navigation: 'shortcut',
      },
    },
    content: {
      language: 'TECHNICAL',
      detail: 'DETAILED',
      format: 'TEXT',
      help: 'NONE',
    },
    notifications: {
      frequency: 'MINIMAL',
      type: 'VISUAL',
      detail: 'SUMMARY',
    },
  },

  SUBORDINATE: {
    theme: {
      colors: {
        primary: '#607D8B',      // Azul acinzentado
        secondary: '#757575',    // Cinza neutro
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#212121',
        textSecondary: '#757575',
        accent: '#FF9800',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      typography: {
        fontSize: { small: 12, medium: 14, large: 16, xlarge: 18 },
        fontWeight: { normal: '400', medium: '500', bold: '600' },
      },
      spacing: { small: 8, medium: 16, large: 24, xlarge: 32 },
      icons: {
        size: { small: 16, medium: 24, large: 32 },
        style: 'minimal',
      },
      layout: {
        density: 'comfortable',
        navigation: 'hierarchical',
      },
    },
    content: {
      language: 'STANDARD',
      detail: 'STANDARD',
      format: 'MIXED',
      help: 'BASIC',
    },
    notifications: {
      frequency: 'STANDARD',
      type: 'VISUAL',
      detail: 'STANDARD',
    },
  },

  ADMIN: {
    theme: {
      colors: {
        primary: '#212121',      // Preto técnico
        secondary: '#424242',    // Cinza escuro
        background: '#F5F5F5',
        surface: '#FFFFFF',
        text: '#212121',
        textSecondary: '#757575',
        accent: '#FF9800',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      typography: {
        fontSize: { small: 10, medium: 12, large: 14, xlarge: 16 },
        fontWeight: { normal: '400', medium: '500', bold: '600' },
      },
      spacing: { small: 4, medium: 8, large: 12, xlarge: 16 },
      icons: {
        size: { small: 12, medium: 16, large: 20 },
        style: 'minimal',
      },
      layout: {
        density: 'compact',
        navigation: 'shortcut',
      },
    },
    content: {
      language: 'TECHNICAL',
      detail: 'DETAILED',
      format: 'TEXT',
      help: 'NONE',
    },
    notifications: {
      frequency: 'FREQUENT',
      type: 'VISUAL',
      detail: 'DETAILED',
    },
  },

  OWNER: {
    theme: {
      colors: {
        primary: '#1A237E',      // Azul executivo
        secondary: '#2E7D32',    // Verde executivo
        background: '#FAFAFA',
        surface: '#FFFFFF',
        text: '#212121',
        textSecondary: '#757575',
        accent: '#FF9800',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
      },
      typography: {
        fontSize: { small: 12, medium: 14, large: 16, xlarge: 18 },
        fontWeight: { normal: '400', medium: '500', bold: '600' },
      },
      spacing: { small: 8, medium: 16, large: 24, xlarge: 32 },
      icons: {
        size: { small: 16, medium: 24, large: 32 },
        style: 'minimal',
      },
      layout: {
        density: 'comfortable',
        navigation: 'shortcut',
      },
    },
    content: {
      language: 'STANDARD',
      detail: 'MINIMAL',
      format: 'VISUAL',
      help: 'NONE',
    },
    notifications: {
      frequency: 'MINIMAL',
      type: 'VISUAL',
      detail: 'SUMMARY',
    },
  },
};

// Função para obter configuração de personalização
export function getPersonalizationConfig(profile: UserProfile): PersonalizationConfig {
  const baseConfig = PROFILE_CONFIGS[profile.type];
  
  // Ajustes baseados na experiência digital
  const experienceAdjustments = {
    BASIC: {
      typography: { fontSize: { small: 14, medium: 16, large: 18, xlarge: 20 } },
      icons: { size: { small: 20, medium: 28, large: 36 } },
      spacing: { small: 12, medium: 20, large: 28, xlarge: 36 },
      content: { help: 'EXTENSIVE' as const },
    },
    INTERMEDIATE: {
      typography: { fontSize: { small: 12, medium: 14, large: 16, xlarge: 18 } },
      icons: { size: { small: 16, medium: 24, large: 32 } },
      spacing: { small: 8, medium: 16, large: 24, xlarge: 32 },
      content: { help: 'BASIC' as const },
    },
    ADVANCED: {
      typography: { fontSize: { small: 10, medium: 12, large: 14, xlarge: 16 } },
      icons: { size: { small: 12, medium: 16, large: 20 } },
      spacing: { small: 4, medium: 8, large: 12, xlarge: 16 },
      content: { help: 'NONE' as const },
    },
  };

  // Ajustes baseados no tempo disponível
  const timeAdjustments = {
    LIMITED: {
      layout: { navigation: 'shortcut' as const },
      notifications: { frequency: 'MINIMAL' as const, detail: 'SUMMARY' as const },
      content: { detail: 'MINIMAL' as const },
    },
    FLEXIBLE: {
      layout: { navigation: 'hierarchical' as const },
      notifications: { frequency: 'STANDARD' as const, detail: 'STANDARD' as const },
      content: { detail: 'STANDARD' as const },
    },
    EXTENSIVE: {
      layout: { navigation: 'linear' as const },
      notifications: { frequency: 'FREQUENT' as const, detail: 'DETAILED' as const },
      content: { detail: 'DETAILED' as const },
    },
  };

  // Ajustes baseados no dispositivo
  const deviceAdjustments = {
    MOBILE: {
      typography: { fontSize: { small: 14, medium: 16, large: 18, xlarge: 20 } },
      icons: { size: { small: 20, medium: 28, large: 36 } },
      spacing: { small: 12, medium: 20, large: 28, xlarge: 36 },
      layout: { density: 'spacious' as const },
    },
    TABLET: {
      typography: { fontSize: { small: 12, medium: 14, large: 16, xlarge: 18 } },
      icons: { size: { small: 16, medium: 24, large: 32 } },
      spacing: { small: 8, medium: 16, large: 24, xlarge: 32 },
      layout: { density: 'comfortable' as const },
    },
    DESKTOP: {
      typography: { fontSize: { small: 10, medium: 12, large: 14, xlarge: 16 } },
      icons: { size: { small: 12, medium: 16, large: 20 } },
      spacing: { small: 4, medium: 8, large: 12, xlarge: 16 },
      layout: { density: 'compact' as const },
    },
  };

  // Aplicar ajustes
  const experienceAdjustment = experienceAdjustments[profile.experience];
  const timeAdjustment = timeAdjustments[profile.timeAvailable];
  const deviceAdjustment = deviceAdjustments[profile.device];

  return {
    theme: {
      ...baseConfig.theme,
      typography: { ...baseConfig.theme.typography, ...experienceAdjustment.typography, ...deviceAdjustment.typography },
      icons: { ...baseConfig.theme.icons, ...experienceAdjustment.icons, ...deviceAdjustment.icons },
      spacing: { ...baseConfig.theme.spacing, ...experienceAdjustment.spacing, ...deviceAdjustment.spacing },
      layout: { ...baseConfig.theme.layout, ...timeAdjustment.layout, ...deviceAdjustment.layout },
    },
    content: {
      ...baseConfig.content,
      ...experienceAdjustment.content,
      ...timeAdjustment.content,
    },
    notifications: {
      ...baseConfig.notifications,
      ...timeAdjustment.notifications,
    },
  };
}

// Função para obter texto adaptado ao perfil
export function getAdaptedText(profile: UserProfile, textKey: string, fallback: string): string {
  const config = getPersonalizationConfig(profile);
  
  // Aqui você pode implementar um sistema de tradução/adaptação
  // Por enquanto, retorna o texto padrão
  return fallback;
}

// Função para obter ícone adaptado ao perfil
export function getAdaptedIcon(profile: UserProfile, iconName: string): string {
  const config = getPersonalizationConfig(profile);
  
  // Aqui você pode implementar lógica para escolher ícones baseados no estilo
  // Por enquanto, retorna o nome do ícone
  return iconName;
}

// Função para detectar dispositivo
export function detectDevice(): DeviceType {
  // Implementar lógica de detecção de dispositivo
  // Por enquanto, assume mobile
  return 'MOBILE';
}

// Função para estimar experiência digital
export function estimateDigitalExperience(profile: UserProfileType): DigitalExperience {
  const experienceMap: Record<UserProfileType, DigitalExperience> = {
    EMPLOYER: 'ADVANCED',
    EMPLOYEE: 'BASIC',
    FAMILY: 'INTERMEDIATE',
    PARTNER: 'ADVANCED',
    SUBORDINATE: 'INTERMEDIATE',
    ADMIN: 'ADVANCED',
    OWNER: 'ADVANCED',
  };
  
  return experienceMap[profile];
}

// Função para estimar tempo disponível
export function estimateTimeAvailable(profile: UserProfileType): TimeAvailable {
  const timeMap: Record<UserProfileType, TimeAvailable> = {
    EMPLOYER: 'LIMITED',
    EMPLOYEE: 'EXTENSIVE',
    FAMILY: 'FLEXIBLE',
    PARTNER: 'LIMITED',
    SUBORDINATE: 'FLEXIBLE',
    ADMIN: 'EXTENSIVE',
    OWNER: 'LIMITED',
  };
  
  return timeMap[profile];
}

// Função para criar perfil completo
export function createUserProfile(type: UserProfileType): UserProfile {
  return {
    type,
    experience: estimateDigitalExperience(type),
    device: detectDevice(),
    timeAvailable: estimateTimeAvailable(type),
  };
} 