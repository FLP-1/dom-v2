/**
 * @fileoverview App principal do DOM v2
 * @directory frontend
 * @description Navegação entre Login, Dashboard e Tarefas
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import LoginScreen from './src/screens/login-screen';
import SimpleDashboard from './src/screens/simple-dashboard';
import { User } from './src/types/user';

type Screen = 'login' | 'dashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'login' ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <SimpleDashboard user={user!} onLogout={handleLogout} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
