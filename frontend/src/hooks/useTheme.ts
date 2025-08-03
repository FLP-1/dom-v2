import React, { createContext, useContext, useState } from 'react';

interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  error: string;
  warning: string;
  success: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
}

interface Theme {
  colors: Colors;
  isDark: boolean;
  toggleTheme: () => void;
}

const lightColors: Colors = {
  primary: '#1A237E',
  secondary: '#00C853',
  accent: '#FF6F00',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  error: '#D32F2F',
  warning: '#F57C00',
  success: '#388E3C',
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
  },
};

const darkColors: Colors = {
  primary: '#3F51B5',
  secondary: '#4CAF50',
  accent: '#FF9800',
  background: '#121212',
  surface: '#1E1E1E',
  error: '#F44336',
  warning: '#FF9800',
  success: '#4CAF50',
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    disabled: '#666666',
  },
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme: Theme = {
    colors: isDark ? darkColors : lightColors,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};