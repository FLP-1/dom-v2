/**
 * @fileoverview Provider de tema personalizado para React Native
 * @directory frontend/src/utils
 * @description Sistema de temas dinâmicos baseado em perfis de usuário
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { 
  getPersonalizationConfig, 
  UserProfile, 
  PersonalizationConfig,
  createUserProfile,
  UserProfileType 
} from './user-profiles';

// Contexto do tema
interface ThemeContextType {
  config: PersonalizationConfig;
  profile: UserProfile;
  updateProfile: (type: UserProfileType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props do provider
interface ThemeProviderProps {
  children: ReactNode;
  initialProfileType?: UserProfileType;
}

// Provider do tema
export function ThemeProvider({ children, initialProfileType = 'EMPLOYER' }: ThemeProviderProps) {
  const [profile, setProfile] = React.useState<UserProfile>(() => 
    createUserProfile(initialProfileType)
  );

  const config = React.useMemo(() => 
    getPersonalizationConfig(profile), 
    [profile]
  );

  const updateProfile = React.useCallback((type: UserProfileType) => {
    setProfile(createUserProfile(type));
  }, []);

  const value = React.useMemo(() => ({
    config,
    profile,
    updateProfile,
  }), [config, profile, updateProfile]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook para usar o tema
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
}

// Hook para obter apenas a configuração
export function useThemeConfig() {
  const { config } = useTheme();
  return config;
}

// Hook para obter apenas o perfil
export function useUserProfile() {
  const { profile } = useTheme();
  return profile;
}

// Utilitários de estilo baseados no tema
export function createStyleSheet(theme: PersonalizationConfig) {
  return {
    // Cores
    colors: theme.theme.colors,
    
    // Tipografia
    typography: {
      small: {
        fontSize: theme.theme.typography.fontSize.small,
        fontWeight: theme.theme.typography.fontWeight.normal,
        color: theme.theme.colors.text,
      },
      medium: {
        fontSize: theme.theme.typography.fontSize.medium,
        fontWeight: theme.theme.typography.fontWeight.normal,
        color: theme.theme.colors.text,
      },
      large: {
        fontSize: theme.theme.typography.fontSize.large,
        fontWeight: theme.theme.typography.fontWeight.medium,
        color: theme.theme.colors.text,
      },
      xlarge: {
        fontSize: theme.theme.typography.fontSize.xlarge,
        fontWeight: theme.theme.typography.fontWeight.bold,
        color: theme.theme.colors.text,
      },
      secondary: {
        fontSize: theme.theme.typography.fontSize.medium,
        fontWeight: theme.theme.typography.fontWeight.normal,
        color: theme.theme.colors.textSecondary,
      },
    },
    
    // Espaçamentos
    spacing: theme.theme.spacing,
    
    // Layout
    layout: {
      container: {
        flex: 1,
        backgroundColor: theme.theme.colors.background,
        padding: theme.theme.spacing.medium,
      },
      card: {
        backgroundColor: theme.theme.colors.surface,
        borderRadius: 8,
        padding: theme.theme.spacing.medium,
        marginVertical: theme.theme.spacing.small,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      button: {
        primary: {
          backgroundColor: theme.theme.colors.primary,
          paddingVertical: theme.theme.spacing.medium,
          paddingHorizontal: theme.theme.spacing.large,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        secondary: {
          backgroundColor: theme.theme.colors.surface,
          borderColor: theme.theme.colors.primary,
          borderWidth: 1,
          paddingVertical: theme.theme.spacing.medium,
          paddingHorizontal: theme.theme.spacing.large,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        },
        text: {
          color: theme.theme.colors.primary,
          fontSize: theme.theme.typography.fontSize.medium,
          fontWeight: theme.theme.typography.fontWeight.medium,
        },
      },
      input: {
        backgroundColor: theme.theme.colors.surface,
        borderColor: theme.theme.colors.textSecondary,
        borderWidth: 1,
        borderRadius: 8,
        padding: theme.theme.spacing.medium,
        fontSize: theme.theme.typography.fontSize.medium,
        color: theme.theme.colors.text,
      },
      header: {
        backgroundColor: theme.theme.colors.primary,
        paddingVertical: theme.theme.spacing.large,
        paddingHorizontal: theme.theme.spacing.medium,
        alignItems: 'center',
      },
      headerText: {
        color: '#FFFFFF',
        fontSize: theme.theme.typography.fontSize.large,
        fontWeight: theme.theme.typography.fontWeight.bold,
      },
    },
    
    // Ícones
    icons: {
      small: {
        width: theme.theme.icons.size.small,
        height: theme.theme.icons.size.small,
      },
      medium: {
        width: theme.theme.icons.size.medium,
        height: theme.theme.icons.size.medium,
      },
      large: {
        width: theme.theme.icons.size.large,
        height: theme.theme.icons.size.large,
      },
    },
  };
}

// Hook para obter estilos baseados no tema atual
export function useStyles() {
  const { config } = useTheme();
  return React.useMemo(() => createStyleSheet(config), [config]);
}

// Interfaces para os componentes temáticos
interface ThemedViewProps {
  children: ReactNode;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

interface ThemedTextProps {
  children: ReactNode;
  variant?: 'small' | 'medium' | 'large' | 'xlarge' | 'secondary';
  style?: React.CSSProperties;
  [key: string]: unknown;
}

interface ThemedButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  [key: string]: unknown;
}

// Componente de exemplo usando o tema
export function ThemedView({ children, style, ...props }: ThemedViewProps) {
  const styles = useStyles();
  
  return (
    <div style={[styles.layout.container, style]} {...props}>
      {children}
    </div>
  );
}

// Componente de texto temático
export function ThemedText({ children, variant = 'medium', style, ...props }: ThemedTextProps) {
  const styles = useStyles();
  
  return (
    <span style={[styles.typography[variant], style]} {...props}>
      {children}
    </span>
  );
}

// Componente de botão temático
export function ThemedButton({ 
  children, 
  variant = 'primary', 
  onPress, 
  style, 
  textStyle,
  ...props 
}: ThemedButtonProps) {
  const styles = useStyles();
  
  return (
    <button 
      style={[styles.layout.button[variant], style]} 
      onClick={onPress}
      {...props}
    >
      <span style={[styles.layout.button.text, textStyle]}>
        {children}
      </span>
    </button>
  );
} 