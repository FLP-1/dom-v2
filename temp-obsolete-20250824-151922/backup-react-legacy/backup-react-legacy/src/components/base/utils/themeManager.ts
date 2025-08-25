/**
 * @fileoverview Theme Manager - Gerenciador dinâmico de temas
 * @version 2.0.0
 * @generated 2025-01-27T11:25:00.000Z
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, ColorSchemeName } from 'react-native';
import { Theme, defaultTheme } from './theme';

// Definição de temas disponíveis
export type ThemeName = 'light' | 'dark' | 'highContrast' | 'custom';

export interface ThemeConfig extends Theme {
  name: ThemeName;
  displayName: string;
  description: string;
  category: 'system' | 'accessibility' | 'custom';
}

// Tema claro (padrão)
export const lightTheme: ThemeConfig = {
  ...defaultTheme,
  name: 'light',
  displayName: 'Claro',
  description: 'Tema claro padrão para uso diurno',
  category: 'system',
};

// Tema escuro
export const darkTheme: ThemeConfig = {
  ...defaultTheme,
  name: 'dark',
  displayName: 'Escuro',
  description: 'Tema escuro para uso noturno e economia de bateria',
  category: 'system',
  colors: {
    primary: '#4CAF50',
    secondary: '#2196F3',
    success: '#8BC34A',
    warning: '#FF9800',
    error: '#F44336',
    info: '#00BCD4',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    border: '#333333',
    disabled: '#666666'
  },
};

// Tema alto contraste
export const highContrastTheme: ThemeConfig = {
  ...defaultTheme,
  name: 'highContrast',
  displayName: 'Alto Contraste',
  description: 'Tema com alto contraste para melhor acessibilidade',
  category: 'accessibility',
  colors: {
    primary: '#0066CC',
    secondary: '#FF6600',
    success: '#008800',
    warning: '#FF8800',
    error: '#CC0000',
    info: '#0099CC',
    background: '#FFFFFF',
    surface: '#F8F8F8',
    text: '#000000',
    textSecondary: '#333333',
    border: '#000000',
    disabled: '#666666'
  },
};

// Registro de temas disponíveis
export const availableThemes: Record<ThemeName, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
  highContrast: highContrastTheme,
  custom: lightTheme, // Will be replaced by user custom theme
};

// Context para gerenciamento de temas
export interface ThemeContextType {
  currentTheme: ThemeConfig;
  themeName: ThemeName;
  availableThemes: Record<ThemeName, ThemeConfig>;
  setTheme: (themeName: ThemeName) => void;
  setCustomTheme: (theme: Partial<ThemeConfig>) => void;
  toggleTheme: () => void;
  isSystemTheme: boolean;
  systemColorScheme: ColorSchemeName;
  resetToSystemTheme: () => void;
  isTransitioning: boolean;
}

const ThemeManagerContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@dom_v2_theme_preference';
const CUSTOM_THEME_STORAGE_KEY = '@dom_v2_custom_theme';

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
  enableSystemTheme?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  enableSystemTheme = true,
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);
  const [customTheme, setCustomThemeState] = useState<ThemeConfig | null>(null);
  const [isSystemTheme, setIsSystemTheme] = useState(enableSystemTheme);
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Carregar preferências salvas
  useEffect(() => {
    loadSavedPreferences();
  }, []);

  // Listener para mudanças no tema do sistema
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemColorScheme(colorScheme);
      if (isSystemTheme) {
        const newTheme = colorScheme === 'dark' ? 'dark' : 'light';
        setThemeName(newTheme);
      }
    });

    return () => subscription?.remove();
  }, [isSystemTheme]);

  const loadSavedPreferences = async () => {
    try {
      // Carregar preferência de tema
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && savedTheme !== 'system') {
        setThemeName(savedTheme as ThemeName);
        setIsSystemTheme(false);
      } else if (savedTheme === 'system') {
        setIsSystemTheme(true);
        const systemTheme = systemColorScheme === 'dark' ? 'dark' : 'light';
        setThemeName(systemTheme);
      }

      // Carregar tema customizado
      const savedCustomTheme = await AsyncStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
      if (savedCustomTheme) {
        const customThemeData = JSON.parse(savedCustomTheme);
        setCustomThemeState(customThemeData);
        availableThemes.custom = customThemeData;
      }
    } catch (error) {
      console.warn('Erro ao carregar preferências de tema:', error);
    }
  };

  const saveThemePreference = async (theme: ThemeName | 'system') => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Erro ao salvar preferência de tema:', error);
    }
  };

  const saveCustomTheme = async (theme: ThemeConfig) => {
    try {
      await AsyncStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(theme));
    } catch (error) {
      console.warn('Erro ao salvar tema customizado:', error);
    }
  };

  const setTheme = async (newThemeName: ThemeName) => {
    setIsTransitioning(true);
    
    // Pequeno delay para efeito de transição suave
    setTimeout(() => {
      setThemeName(newThemeName);
      setIsSystemTheme(false);
      saveThemePreference(newThemeName);
      setIsTransitioning(false);
    }, 150);
  };

  const setCustomTheme = async (themePartial: Partial<ThemeConfig>) => {
    const newCustomTheme: ThemeConfig = {
      ...lightTheme,
      ...themePartial,
      name: 'custom',
      displayName: 'Personalizado',
      description: 'Tema personalizado pelo usuário',
      category: 'custom',
    };

    setCustomThemeState(newCustomTheme);
    availableThemes.custom = newCustomTheme;
    await saveCustomTheme(newCustomTheme);
    
    if (themeName === 'custom') {
      // Force re-render if already using custom theme
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }
  };

  const toggleTheme = () => {
    const themeOrder: ThemeName[] = ['light', 'dark', 'highContrast'];
    const currentIndex = themeOrder.indexOf(themeName);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  const resetToSystemTheme = () => {
    setIsSystemTheme(true);
    const systemTheme = systemColorScheme === 'dark' ? 'dark' : 'light';
    setThemeName(systemTheme);
    saveThemePreference('system');
  };

  const getCurrentTheme = (): ThemeConfig => {
    if (themeName === 'custom' && customTheme) {
      return customTheme;
    }
    return availableThemes[themeName] || lightTheme;
  };

  const contextValue: ThemeContextType = {
    currentTheme: getCurrentTheme(),
    themeName,
    availableThemes,
    setTheme,
    setCustomTheme,
    toggleTheme,
    isSystemTheme,
    systemColorScheme,
    resetToSystemTheme,
    isTransitioning,
  };

  return (
    <ThemeManagerContext.Provider value={contextValue}>
      {children}
    </ThemeManagerContext.Provider>
  );
};

export const useThemeManager = (): ThemeContextType => {
  const context = useContext(ThemeManagerContext);
  if (!context) {
    throw new Error('useThemeManager must be used within a ThemeProvider');
  }
  return context;
};

// Hook para usar apenas o tema atual (compatibilidade com useTheme existente)
export const useTheme = () => {
  const { currentTheme } = useThemeManager();
  return currentTheme;
};

// Hook para detectar preferência de tema do usuário
export const useSystemTheme = () => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme()
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => subscription?.remove();
  }, []);

  return {
    colorScheme,
    isDark: colorScheme === 'dark',
    isLight: colorScheme === 'light',
  };
};

// Utilitário para criar temas personalizados
export const createCustomTheme = (
  baseTheme: ThemeConfig,
  overrides: Partial<Theme>
): ThemeConfig => {
  return {
    ...baseTheme,
    ...overrides,
    name: 'custom',
    displayName: 'Personalizado',
    category: 'custom',
  };
};

// Utilitário para validar tema
export const validateTheme = (theme: unknown): theme is ThemeConfig => {
  return (
    theme &&
    typeof theme.name === 'string' &&
    typeof theme.displayName === 'string' &&
    theme.colors &&
    theme.spacing &&
    theme.typography &&
    theme.borderRadius &&
    theme.shadows
  );
};
