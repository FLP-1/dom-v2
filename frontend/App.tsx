/**
 * @fileoverview App principal do DOM v2
 * @directory frontend
 * @description Navegação entre Login, Dashboard e Tarefas
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SimpleDashboard } from './src/screens/simple-dashboard';
import { LoginScreen } from './src/screens/login-screen';
import { TasksScreen } from './src/screens/tasks-screen';
import { NotificationsScreen } from './src/screens/notifications-screen';

// Definição dos 7 perfis de usuário do DOM v2
type UserProfile = 
  | 'EMPLOYER'    // Empregadores (mulheres 35-50 anos)
  | 'EMPLOYEE'    // Empregados Domésticos (mulheres 30-60 anos)
  | 'FAMILY'      // Familiares (15-70 anos)
  | 'PARTNER'     // Parceiros (donos de negócios)
  | 'SUBORDINATE' // Subordinados (funcionários dos parceiros)
  | 'ADMIN'       // Administradores (suporte técnico)
  | 'OWNER';      // Donos (fundadores)

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  profile: UserProfile;
}

type Screen = 'login' | 'dashboard' | 'tasks' | 'notifications';

function App() {
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

  const navigateToTasks = () => {
    setCurrentScreen('tasks');
  };

  const navigateToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const navigateToNotifications = () => {
    setCurrentScreen('notifications');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'dashboard':
        return (
          <SimpleDashboard
            user={user!}
            onLogout={handleLogout}
            onNavigateToTasks={navigateToTasks}
            onNavigateToNotifications={navigateToNotifications}
          />
        );
      case 'tasks':
        return <TasksScreen onBack={navigateToDashboard} />;
      case 'notifications':
        return <NotificationsScreen onBack={navigateToDashboard} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      {renderScreen()}
    </>
  );
}

export default App;
