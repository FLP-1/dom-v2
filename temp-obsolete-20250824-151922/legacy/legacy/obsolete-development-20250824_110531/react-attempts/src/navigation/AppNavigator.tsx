/**
 * @fileoverview Navegador principal da aplicação
 * @description Gerencia a navegação entre telas e estados da aplicação
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-01-01
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Telas
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TasksScreen from '../screens/TasksScreen';
import EmployeesScreen from '../screens/EmployeesScreen';
import PayrollScreen from '../screens/PayrollScreen';
import BudgetScreen from '../screens/BudgetScreen';
import PurchasesScreen from '../screens/PurchasesScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import { DocumentsScreen } from '../screens/documents-screen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Componentes
import SideMenu from '../micro-frontends/shared/components/layout/SideMenu';
import Header from '../micro-frontends/shared/components/layout/Header';

// Hooks e serviços
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

// Tipos
type Screen = 'login' | 'dashboard' | 'tasks' | 'employees' | 'payroll' | 'budget' | 'purchases' | 'payments' | 'documents' | 'notifications' | 'profile' | 'settings';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  profile: string;
}

const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  const { isAuthenticated, login, logout } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentScreen('dashboard');
    } else {
      setCurrentScreen('login');
    }
  }, [isAuthenticated]);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setSideMenuVisible(false);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setCurrentScreen('login');
  };

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const userData = await login(credentials);
      setUser(userData);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      
      case 'dashboard':
        return (
          <DashboardScreen
            user={user!}
            onLogout={handleLogout}
            onNavigateToTasks={() => handleNavigate('tasks')}
            onNavigateToNotifications={() => handleNavigate('notifications')}
            onNavigateToPayroll={() => handleNavigate('payroll')}
            onNavigateToNavigation={() => setSideMenuVisible(true)}
            onNavigateToUsers={() => handleNavigate('employees')}
            onNavigateToFinance={() => handleNavigate('budget')}
            onNavigateToHR={() => handleNavigate('employees')}
            onNavigateToAdvancedTimeCard={() => handleNavigate('payroll')}
            onNavigateToPaymentIntegrations={() => handleNavigate('payments')}
            onNavigateToReports={() => handleNavigate('dashboard')}
            onNavigateToDocuments={() => handleNavigate('documents')}
          />
        );
      
      case 'tasks':
        return <TasksScreen />;
      
      case 'employees':
        return <EmployeesScreen />;
      
      case 'payroll':
        return <PayrollScreen />;
      
      case 'budget':
        return <BudgetScreen />;
      
      case 'purchases':
        return <PurchasesScreen />;
      
      case 'payments':
        return <PaymentsScreen />;
      
      case 'documents':
        return <DocumentsScreen />;
      
      case 'notifications':
        return <NotificationsScreen />;
      
      case 'profile':
        return <ProfileScreen />;
      
      case 'settings':
        return <SettingsScreen />;
      
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  if (currentScreen === 'login') {
    return (
      <SafeAreaProvider>
        {renderScreen()}
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Header
          title={getScreenTitle(currentScreen)}
          onMenuPress={() => setSideMenuVisible(true)}
          onBackPress={currentScreen !== 'dashboard' ? () => handleNavigate('dashboard') : undefined}
        />
        
        {renderScreen()}
        
        <SideMenu
          visible={sideMenuVisible}
          onClose={() => setSideMenuVisible(false)}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          user={user}
        />
      </View>
    </SafeAreaProvider>
  );
};

const getScreenTitle = (screen: Screen): string => {
  const titles: Record<Screen, string> = {
    login: 'Login',
    dashboard: 'Dashboard',
    tasks: 'Tarefas',
    employees: 'Funcionários',
    payroll: 'Folha de Pagamento',
    budget: 'Orçamento',
    purchases: 'Compras',
    payments: 'Pagamentos',
    documents: 'Documentos',
    notifications: 'Notificações',
    profile: 'Perfil',
    settings: 'Configurações'
  };
  
  return titles[screen];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator; 