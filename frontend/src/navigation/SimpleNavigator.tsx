import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { DashboardScreen } from '../screens/dashboard-screen';
import { UserProfileType } from '../utils/user-profiles';
import { UsersScreen } from '../screens/users-screen';
import { FinanceScreen } from '../screens/finance-screen';
import { HRScreen } from '../screens/hr-screen';
import { AdvancedTimeCardScreen } from '../screens/advanced-timecard-screen';
import { PaymentIntegrationsScreen } from '../screens/payment-integrations-screen';
import { ReportsScreen } from '../screens/reports-screen';
import { NotificationsScreen } from '../screens/notifications-screen';

interface User {
  id: string;
  name: string;
  cpf: string;
  profile: UserProfileType;
}

type Screen = 'dashboard' | 'tasks' | 'notifications' | 'payroll' | 'budget' | 'employees' | 'profile' | 'navigation' | 'users' | 'finance' | 'hr' | 'advancedTimeCard' | 'paymentIntegrations' | 'reports';

const SimpleNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [showMenu, setShowMenu] = useState(false);
  
  // Usuário mock para teste
  const [user] = useState<User>({
    id: '1',
    name: 'João Silva',
    cpf: '123.456.789-00',
    profile: 'EMPLOYER'
  });

  const handleLogout = () => {
    console.log('Logout realizado');
    // Aqui implementaria a lógica de logout
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
    setShowMenu(false);
  };

  const handleNavigateToTasks = () => handleNavigate('tasks');
  const handleNavigateToNotifications = () => handleNavigate('notifications');
  const handleNavigateToPayroll = () => handleNavigate('payroll');
  const handleNavigateToNavigation = () => handleNavigate('navigation');
  const handleNavigateToUsers = () => handleNavigate('users');
  const handleNavigateToFinance = () => handleNavigate('finance');
  const handleNavigateToHR = () => handleNavigate('hr');
  const handleNavigateToAdvancedTimeCard = () => handleNavigate('advancedTimeCard');
  const handleNavigateToPaymentIntegrations = () => handleNavigate('paymentIntegrations');
  const handleNavigateToReports = () => handleNavigate('reports');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <DashboardScreen
            user={user}
            onLogout={handleLogout}
            onNavigateToTasks={handleNavigateToTasks}
            onNavigateToNotifications={handleNavigateToNotifications}
            onNavigateToPayroll={handleNavigateToPayroll}
            onNavigateToNavigation={handleNavigateToNavigation}
            onNavigateToUsers={handleNavigateToUsers}
            onNavigateToFinance={handleNavigateToFinance}
            onNavigateToHR={handleNavigateToHR}
            onNavigateToAdvancedTimeCard={handleNavigateToAdvancedTimeCard}
            onNavigateToPaymentIntegrations={handleNavigateToPaymentIntegrations}
            onNavigateToReports={handleNavigateToReports}
          />
        );
      
      case 'tasks':
        return (
          <View style={styles.screen}>
            <View style={styles.header}>
              <Pressable style={styles.backButton} onPress={() => handleNavigate('dashboard')}>
                <Text style={styles.backButtonText}>← Voltar</Text>
              </Pressable>
              <Text style={styles.headerTitle}>📋 Tarefas</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.screenTitle}>Lista de Tarefas</Text>
              <Text style={styles.screenDescription}>
                Gerencie suas tarefas e atividades pendentes
              </Text>
              
              {/* Tarefas mock */}
              <View style={styles.taskList}>
                <View style={styles.taskItem}>
                  <Text style={styles.taskTitle}>Revisar orçamento mensal</Text>
                  <Text style={styles.taskStatus}>⏳ Pendente</Text>
                </View>
                <View style={styles.taskItem}>
                  <Text style={styles.taskTitle}>Aprovar pagamentos</Text>
                  <Text style={styles.taskStatus}>🔄 Em andamento</Text>
                </View>
                <View style={styles.taskItem}>
                  <Text style={styles.taskTitle}>Avaliar funcionários</Text>
                  <Text style={styles.taskStatus}>✅ Concluído</Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'notifications':
        return (
          <View style={styles.screen}>
            <View style={styles.header}>
              <Pressable style={styles.backButton} onPress={() => handleNavigate('dashboard')}>
                <Text style={styles.backButtonText}>← Voltar</Text>
              </Pressable>
              <Text style={styles.headerTitle}>🔔 Notificações</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.screenTitle}>Centro de Notificações</Text>
              <Text style={styles.screenDescription}>
                Todas as suas notificações e alertas
              </Text>
              
              {/* Notificações mock */}
              <View style={styles.notificationList}>
                <View style={styles.notificationItem}>
                  <Text style={styles.notificationTitle}>Pagamento aprovado</Text>
                  <Text style={styles.notificationMessage}>Pagamento do funcionário Maria foi aprovado</Text>
                  <Text style={styles.notificationTime}>Há 2 horas</Text>
                </View>
                <View style={styles.notificationItem}>
                  <Text style={styles.notificationTitle}>Orçamento atualizado</Text>
                  <Text style={styles.notificationMessage}>Orçamento de março foi atualizado com sucesso</Text>
                  <Text style={styles.notificationTime}>Há 1 dia</Text>
                </View>
                <View style={styles.notificationItem}>
                  <Text style={styles.notificationTitle}>Nova solicitação</Text>
                  <Text style={styles.notificationMessage}>Funcionário João solicitou férias</Text>
                  <Text style={styles.notificationTime}>Há 2 dias</Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'payroll':
        return (
          <View style={styles.screen}>
            <View style={styles.header}>
              <Pressable style={styles.backButton} onPress={() => handleNavigate('dashboard')}>
                <Text style={styles.backButtonText}>← Voltar</Text>
              </Pressable>
              <Text style={styles.headerTitle}>💰 Folha de Pagamento</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.screenTitle}>Gestão de Folha de Pagamento</Text>
              <Text style={styles.screenDescription}>
                Controle salários, benefícios e pagamentos
              </Text>
              
              {/* Dados da folha mock */}
              <View style={styles.payrollSummary}>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryTitle}>Total de Funcionários</Text>
                  <Text style={styles.summaryValue}>12</Text>
                </View>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryTitle}>Folha Total</Text>
                  <Text style={styles.summaryValue}>R$ 75.000,00</Text>
                </View>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryTitle}>Pendentes</Text>
                  <Text style={styles.summaryValue}>3</Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'navigation':
        return (
          <View style={styles.screen}>
            <View style={styles.header}>
              <Pressable style={styles.backButton} onPress={() => handleNavigate('dashboard')}>
                <Text style={styles.backButtonText}>← Voltar</Text>
              </Pressable>
              <Text style={styles.headerTitle}>🎯 Navegação</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.screenTitle}>Menu de Navegação</Text>
              <Text style={styles.screenDescription}>
                Acesse todas as funcionalidades do sistema
              </Text>
              
              <View style={styles.navigationMenu}>
                <Pressable style={styles.navButton} onPress={() => handleNavigate('tasks')}>
                  <Text style={styles.navButtonText}>📋 Tarefas</Text>
                </Pressable>
                <Pressable style={styles.navButton} onPress={() => handleNavigate('notifications')}>
                  <Text style={styles.navButtonText}>🔔 Notificações</Text>
                </Pressable>
                <Pressable style={styles.navButton} onPress={() => handleNavigate('payroll')}>
                  <Text style={styles.navButtonText}>💰 Folha de Pagamento</Text>
                </Pressable>
                <Pressable style={styles.navButton} onPress={() => handleNavigate('budget')}>
                  <Text style={styles.navButtonText}>📊 Orçamento</Text>
                </Pressable>
                <Pressable style={styles.navButton} onPress={() => handleNavigate('employees')}>
                  <Text style={styles.navButtonText}>👥 Funcionários</Text>
                </Pressable>
                <Pressable style={styles.navButton} onPress={() => handleNavigate('profile')}>
                  <Text style={styles.navButtonText}>👤 Meu Perfil</Text>
                </Pressable>
              </View>
            </View>
          </View>
        );

      case 'users':
        return (
          <UsersScreen onNavigateBack={() => handleNavigate('dashboard')} />
        );

      case 'finance':
        return (
          <FinanceScreen onNavigateBack={() => handleNavigate('dashboard')} />
        );

      case 'hr':
        return (
          <HRScreen onNavigateBack={() => handleNavigate('dashboard')} />
        );

      case 'advancedTimeCard':
        return (
          <AdvancedTimeCardScreen onNavigateBack={() => handleNavigate('dashboard')} />
        );

      case 'paymentIntegrations':
        return (
          <PaymentIntegrationsScreen onNavigateBack={() => handleNavigate('dashboard')} />
        );

      case 'reports':
        return (
          <ReportsScreen onNavigateBack={() => handleNavigate('dashboard')} />
        );

      case 'notifications':
        return (
          <NotificationsScreen onNavigateBack={() => handleNavigate('dashboard')} />
        );

      default:
        return (
          <View style={styles.screen}>
            <View style={styles.header}>
              <Pressable style={styles.backButton} onPress={() => handleNavigate('dashboard')}>
                <Text style={styles.backButtonText}>← Voltar</Text>
              </Pressable>
              <Text style={styles.headerTitle}>🚧 Em Construção</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.screenTitle}>Funcionalidade em Desenvolvimento</Text>
              <Text style={styles.screenDescription}>
                Esta tela está sendo implementada. Volte ao dashboard para acessar as funcionalidades disponíveis.
              </Text>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      
      {/* Menu flutuante */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMenu(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuContainer}>
            <Text style={styles.menuTitle}>Menu Principal</Text>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate('dashboard')}>
              <Text style={styles.menuItemText}>🏠 Dashboard</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate('tasks')}>
              <Text style={styles.menuItemText}>📋 Tarefas</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate('notifications')}>
              <Text style={styles.menuItemText}>🔔 Notificações</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate('payroll')}>
              <Text style={styles.menuItemText}>💰 Folha de Pagamento</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate('budget')}>
              <Text style={styles.menuItemText}>📊 Orçamento</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate('employees')}>
              <Text style={styles.menuItemText}>👥 Funcionários</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => handleNavigate('profile')}>
              <Text style={styles.menuItemText}>👤 Meu Perfil</Text>
            </Pressable>
            <Pressable style={styles.menuCloseButton} onPress={() => setShowMenu(false)}>
              <Text style={styles.menuCloseButtonText}>✕ Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    marginRight: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  screenDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  taskList: {
    gap: 15,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  taskStatus: {
    fontSize: 14,
    color: '#666',
  },
  notificationList: {
    gap: 15,
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  payrollSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  navigationMenu: {
    gap: 15,
  },
  navButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  menuCloseButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    alignItems: 'center',
  },
  menuCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SimpleNavigator; 