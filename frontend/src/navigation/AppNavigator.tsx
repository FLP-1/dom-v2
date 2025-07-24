/**
 * @fileoverview Navegador principal do DOM v2
 * @description Sistema de navegação com login, dashboard e menu lateral
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
 */

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LoginScreen } from '../screens/login-screen';
import { DashboardScreen } from '../screens/dashboard-screen';
import { TasksScreen } from '../screens/tasks-screen';
import { EmployeesScreen } from '../screens/employees-screen';
import { PurchasesScreen } from '../screens/purchases-screen';
import { PaymentsScreen } from '../screens/payments-screen';
import { NotificationsScreen } from '../screens/notifications-screen';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Modal from '../components/ui/Modal';

type Screen = 'login' | 'dashboard' | 'tasks' | 'employees' | 'payroll' | 'budget' | 'purchases' | 'payments' | 'notifications' | 'profile' | 'settings';

interface User {
  id: string;
  name: string;
  email: string;
  profile: string;
  cpf: string;
}

const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
    setMenuVisible(false);
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const showModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen onLogin={handleLogin} />
        );

      case 'dashboard':
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Dashboard"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <DashboardScreen
              user={user!}
              onLogout={handleLogout}
              onNavigateToTasks={() => handleNavigate('tasks')}
              onNavigateToNotifications={() => handleNavigate('notifications')}
              onNavigateToPayroll={() => handleNavigate('payroll')}
            />
          </View>
        );

      case 'tasks':
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Tarefas"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <TasksScreen />
          </View>
        );

      case 'employees':
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Funcionários"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <EmployeesScreen />
          </View>
        );

      case 'payroll':
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Folha de Pagamento"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <View style={styles.content}>
              {/* Aqui seria renderizado o PayrollComponent */}
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>💰 Folha de Pagamento</Text>
                <Text style={styles.placeholderSubtext}>Componente em desenvolvimento</Text>
              </View>
            </View>
          </View>
        );

      case 'budget':
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Orçamento"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <View style={styles.content}>
              {/* Aqui seria renderizado o BudgetComponent */}
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>📈 Controle de Orçamento</Text>
                <Text style={styles.placeholderSubtext}>Componente em desenvolvimento</Text>
              </View>
            </View>
          </View>
        );

      case 'purchases':
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Compras"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <PurchasesScreen />
          </View>
        );

      case 'payments':
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Pagamentos"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <PaymentsScreen />
          </View>
        );

      case 'notifications':
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Notificações"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <NotificationsScreen />
          </View>
        );

      case 'profile':
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Perfil"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <View style={styles.content}>
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>👤 Perfil do Usuário</Text>
                <Text style={styles.placeholderSubtext}>Configurações em desenvolvimento</Text>
              </View>
            </View>
          </View>
        );

      case 'settings':
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Configurações"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <View style={styles.content}>
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>⚙️ Configurações do Sistema</Text>
                <Text style={styles.placeholderSubtext}>Configurações em desenvolvimento</Text>
              </View>
            </View>
          </View>
        );

      default:
        return (
          <View style={styles.screenContainer}>
            <Header
              title="Página não encontrada"
              onMenuPress={handleMenuPress}
              onLogout={handleLogout}
              user={user}
            />
            <View style={styles.content}>
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>404 - Página não encontrada</Text>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      
      <SideMenu
        visible={menuVisible}
        onClose={handleCloseMenu}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        user={user}
      />

      <Modal
        visible={modalVisible}
        onClose={hideModal}
        title="Modal"
        size="medium"
      >
        {modalContent}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  screenContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default AppNavigator; 