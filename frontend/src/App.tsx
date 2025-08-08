/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description Aplicação principal DOM v2
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeProvider } from './utils/theme-provider';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;