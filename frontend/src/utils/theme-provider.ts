/**
 * @fileoverview Sistema de Temas com Adaptação Regional - DOM v2
 * @directory frontend/src/utils
 * @description Provider de temas com adaptação regional e perfis de usuário
 * @created 2025-01-27
 * @lastModified 2025-01-27
 * @author DOM v2 Team
  */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos de região brasileira
export type Region = 'SUDESTE' | 'SUL' | 'NORDESTE' | 'CENTRO_OESTE' | 'NORTE';

// Tipos de perfil de usuário
export type UserProfile = 'EMPLOYER' | 'EMPLOYEE' | 'FAMILY' | 'ADMIN';

// Tipos de dispositivo
export type DeviceType = 'SMARTPHONE' | 'TABLET' | 'DESKTOP';

// Interface para cores do tema
interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

// Interface para tipografia
interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    title: number;
  };
  fontWeight: {
    light: string;
    normal: string;
    medium: string;
    bold: string;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

// Interface para espaçamentos
interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

// Interface para bordas
interface ThemeBorders {
  radius: {
    small: number;
    medium: number;
    large: number;
    round: number;
  };
  width: {
    thin: number;
    normal: number;
    thick: number;
  };
}

// Interface para sombras
interface ThemeShadows {
  small: string;
  medium: string;
  large: string;
  xlarge: string;
}

// Interface completa do tema
export interface Theme {
  name: string;
  region: Region;
  profile: UserProfile;
  device: DeviceType;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borders: ThemeBorders;
  shadows: ThemeShadows;
  isDark: boolean;
}

// Temas por região
const regionalThemes: Record<Region, Partial<Theme>> = {
  SUDESTE: {
    name: 'Sudeste',
    colors: {
      primary: '#1976D2',
      secondary: '#424242',
      accent: '#FF6B35',
      background: '#FAFAFA',
      surface: '#FFFFFF',
      text: '#212121',
      textSecondary: '#757575',
      border: '#E0E0E0',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3'
    }
  },
  SUL: {
    name: 'Sul',
    colors: {
      primary: '#2E7D32',
      secondary: '#424242',
      accent: '#FF6B35',
      background: '#F5F5F5',
      surface: '#FFFFFF',
      text: '#212121',
      textSecondary: '#757575',
      border: '#E0E0E0',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3'
    }
  },
  NORDESTE: {
    name: 'Nordeste',
    colors: {
      primary: '#FF6B35',
      secondary: '#424242',
      accent: '#FFC107',
      background: '#FFF8E1',
      surface: '#FFFFFF',
      text: '#212121',
      textSecondary: '#757575',
      border: '#E0E0E0',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3'
    }
  },
  CENTRO_OESTE: {
    name: 'Centro-Oeste',
    colors: {
      primary: '#8BC34A',
      secondary: '#424242',
      accent: '#FF9800',
      background: '#F1F8E9',
      surface: '#FFFFFF',
      text: '#212121',
      textSecondary: '#757575',
      border: '#E0E0E0',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3'
    }
  },
  NORTE: {
    name: 'Norte',
    colors: {
      primary: '#795548',
      secondary: '#424242',
      accent: '#FF5722',
      background: '#EFEBE9',
      surface: '#FFFFFF',
      text: '#212121',
      textSecondary: '#757575',
      border: '#E0E0E0',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3'
    }
  }
};

// Temas por perfil
const profileThemes: Record<UserProfile, Partial<Theme>> = {
  EMPLOYER: {
    name: 'Empregador',
    typography: {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      fontSize: {
        small: 12,
        medium: 14,
        large: 16,
        xlarge: 18,
        title: 24
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        bold: '700'
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.8
      }
    }
  },
  EMPLOYEE: {
    name: 'Funcionário',
    typography: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: {
        small: 14,
        medium: 16,
        large: 18,
        xlarge: 20,
        title: 26
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '600',
        bold: '700'
      },
      lineHeight: {
        tight: 1.3,
        normal: 1.6,
        relaxed: 1.9
      }
    }
  },
  FAMILY: {
    name: 'Família',
    typography: {
      fontFamily: 'Arial, sans-serif',
      fontSize: {
        small: 16,
        medium: 18,
        large: 20,
        xlarge: 22,
        title: 28
      },
      fontWeight: {
        light: '400',
        normal: '500',
        medium: '600',
        bold: '700'
      },
      lineHeight: {
        tight: 1.4,
        normal: 1.7,
        relaxed: 2.0
      }
    }
  },
  ADMIN: {
    name: 'Administrador',
    typography: {
      fontFamily: 'Consolas, Monaco, monospace',
      fontSize: {
        small: 11,
        medium: 13,
        large: 15,
        xlarge: 17,
        title: 22
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        bold: '600'
      },
      lineHeight: {
        tight: 1.1,
        normal: 1.4,
        relaxed: 1.7
      }
    }
  }
};

// Configurações por dispositivo
const deviceConfigs: Record<DeviceType, Partial<Theme>> = {
  SMARTPHONE: {
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24
    },
    borders: {
      radius: {
        small: 4,
        medium: 8,
        large: 12,
        round: 50
      },
      width: {
        thin: 1,
        normal: 2,
        thick: 3
      }
    }
  },
  TABLET: {
    spacing: {
      xs: 6,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32
    },
    borders: {
      radius: {
        small: 6,
        medium: 10,
        large: 16,
        round: 50
      },
      width: {
        thin: 1,
        normal: 2,
        thick: 4
      }
    }
  },
  DESKTOP: {
    spacing: {
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32,
      xl: 40,
      xxl: 48
    },
    borders: {
      radius: {
        small: 8,
        medium: 12,
        large: 20,
        round: 50
      },
      width: {
        thin: 1,
        normal: 3,
        thick: 5
      }
    }
  }
};

// Tema padrão
const defaultTheme: Theme = {
  name: 'Padrão',
  region: 'SUDESTE',
  profile: 'EMPLOYER',
  device: 'DESKTOP',
  colors: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#FF6B35',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3'
  },
  typography: {
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    fontSize: {
      small: 12,
      medium: 14,
      large: 16,
      xlarge: 18,
      title: 24
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      bold: '700'
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8
    }
  },
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 48
  },
  borders: {
    radius: {
      small: 8,
      medium: 12,
      large: 20,
      round: 50
    },
    width: {
      thin: 1,
      normal: 3,
      thick: 5
    }
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.15)',
    large: '0 8px 16px rgba(0,0,0,0.2)',
    xlarge: '0 16px 32px rgba(0,0,0,0.25)'
  },
  isDark: false
};

// Contexto do tema
interface ThemeContextType {
  theme: Theme;
  setRegion: (region: Region) => void;
  setProfile: (profile: UserProfile) => void;
  setDevice: (device: DeviceType) => void;
  toggleDarkMode: () => void;
  getTheme: () => Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook para usar o tema
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

// Props do provider
interface ThemeProviderProps {
  children: ReactNode;
  initialRegion?: Region;
  initialProfile?: UserProfile;
  initialDevice?: DeviceType;
}

// Provider do tema
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialRegion = 'SUDESTE',
  initialProfile = 'EMPLOYER',
  initialDevice = 'DESKTOP'
}) => {
  const [region, setRegionState] = useState<Region>(initialRegion);
  const [profile, setProfileState] = useState<UserProfile>(initialProfile);
  const [device, setDeviceState] = useState<DeviceType>(initialDevice);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Função para criar tema combinado
  const createCombinedTheme = (): Theme => {
    const regionalTheme = regionalThemes[region] || {};
    const profileTheme = profileThemes[profile] || {};
    const deviceConfig = deviceConfigs[device] || {};

    return {
      ...defaultTheme,
      ...regionalTheme,
      ...profileTheme,
      ...deviceConfig,
      region,
      profile,
      device,
      isDark,
      name: `${regionalTheme.name || 'Padrão'} - ${profileTheme.name || 'Usuário'}`
    };
  };

  const [theme, setTheme] = useState<Theme>(createCombinedTheme());

  // Atualizar tema quando configurações mudarem
  useEffect(() => {
    setTheme(createCombinedTheme());
  }, [region, profile, device, isDark]);

  // Função para detectar dispositivo automaticamente
  const detectDevice = (): DeviceType => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) return 'SMARTPHONE';
      if (width < 1024) return 'TABLET';
      return 'DESKTOP';
    }
    return 'DESKTOP';
  };

  // Detectar dispositivo na inicialização
  useEffect(() => {
    const detectedDevice = detectDevice();
    setDeviceState(detectedDevice);
  }, []);

  // Funções para alterar configurações
  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
  };

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
  };

  const setDevice = (newDevice: DeviceType) => {
    setDeviceState(newDevice);
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const getTheme = (): Theme => {
    return theme;
  };

  const contextValue: ThemeContextType = {
    theme,
    setRegion,
    setProfile,
    setDevice,
    toggleDarkMode,
    getTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Função utilitária para criar estilos baseados no tema
export const createThemedStyles = <T extends Record<string, any>>(
  styleFactory: (theme: Theme) => T
) => {
  return styleFactory;
};

// Função para obter cor com opacidade
export const withOpacity = (color: string, opacity: number): string => {
  // Converter hex para rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default ThemeProvider; 