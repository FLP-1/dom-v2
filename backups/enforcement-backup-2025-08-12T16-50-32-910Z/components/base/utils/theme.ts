/**
 * @fileoverview Theme Utilities - Sistema de temas
 * @version 2.0.0
 * @generated 2025-01-27T11:20:00.000Z
 */

import { createContext, useContext } from 'react';
import { ViewStyle } from 'react-native';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    disabled: string;
  };
  
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
  
  typography: {
    fontSizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
    };
    
    fontWeights: {
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    
    lineHeights: {
      tight: number;
      normal: number;
      relaxed: number;
      loose: number;
    };
  };
  
  borderRadius: {
    none: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  
  shadows: {
    sm: ViewStyle;
    md: ViewStyle;
    lg: ViewStyle;
    xl: ViewStyle;
    '2xl': ViewStyle;
  };
}

export const defaultTheme: Theme = {
  colors: {
    primary: '#4CAF50',
    secondary: '#2196F3',
    success: '#8BC34A',
    warning: '#FF9800',
    error: '#F44336',
    info: '#00BCD4',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    disabled: '#BDBDBD'
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48
  },
  
  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30
    },
    
    fontWeights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2
    }
  },
  
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12
    },
    '2xl': {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.51,
      shadowRadius: 13.16,
      elevation: 20
    }
  }
};

export const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};

export const withTheme = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
};
