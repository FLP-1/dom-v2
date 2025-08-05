







import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { UserProfileType } from '../utils/user-profiles';


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}


function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}


function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}


function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data || '');
}


function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    Pressable,
    View,
} from 'react-native';

// Perfis de usuário: EMPLOYER (empregador), EMPLOYEE (empregado doméstico), FAMILY, PARTNER, SUBORDINATE, ADMIN, OWNER

interface User {
  id: string;
  name: string;
  cpf: string;
  profile: UserProfileType;
}

interface DashboardScreenProps {
  user: User;
  onLogout: () => void;
  onNavigateToTasks: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToPayroll: () => void;
  onNavigateToNavigation: () => void;
  onNavigateToUsers: () => void;
  onNavigateToFinance: () => void;
  onNavigateToHR: () => void;
  onNavigateToAdvancedTimeCard: () => void;
  onNavigateToPaymentIntegrations: () => void;
  onNavigateToReports: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  onLogout,
  onNavigateToTasks,
  onNavigateToNotifications,
  onNavigateToPayroll,
  onNavigateToNavigation,
  onNavigateToUsers,
  onNavigateToFinance,
  onNavigateToHR,
  onNavigateToAdvancedTimeCard,
  onNavigateToPaymentIntegrations,
  onNavigateToReports
}) => {
  const { dashboardData, loading, error, lastRefresh, refreshDashboard } = useDashboard();
  const [notifications, setNotifications] = React.useState<Array<{id: string, title: string, message: string}>>([]);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [selectedProfile, setSelectedProfile] = React.useState<UserProfileType>(user.profile);
  
  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: onLogout, style: 'destructive' },
      ]
    );
  };

  // Função para testar notificações
  const testNotification = (type: string) => {
    const newNotification = {
      id: Date.now().toString(),
      title: `Notificação ${type}`,
      message: `Esta é uma notificação de teste do tipo ${type}`
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard DOM v2</Text>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {/* Status da Conexão */}
        <View style={styles.connectionStatus}>
          <Text style={styles.connectionTitle}>Status da Conexão</Text>
          <View style={styles.connectionInfo}>
            <Text style={styles.connectionText}>
              {loading ? '🔄 Conectando...' : error ? '❌ Erro de conexão' : '✅ Conectado ao backend'}
            </Text>
            {lastRefresh && (
              <Text style={styles.lastRefreshText}>
                Última atualização: {lastRefresh.toLocaleTimeString('pt-BR')}
              </Text>
            )}
            <Pressable style={styles.refreshButton} onPress={refreshDashboard}>
              <Text style={styles.refreshButtonText}>🔄 Atualizar</Text>
            </Pressable>
          </View>
        </View>

        {/* Seletor de Perfil */}
        <View style={styles.profileSelector}>
          <Text style={styles.profileSelectorTitle}>Perfil Atual:</Text>
          <View style={styles.profileButtons}>
            {(['EMPLOYER', 'EMPLOYEE', 'FAMILY', 'ADMIN'] as UserProfileType[]).map((profile) => (
              <Pressable
                key={profile}
                style={[
                  styles.profileButton,
                  selectedProfile === profile && styles.profileButtonActive
                ]}
                onPress={() => setSelectedProfile(profile)}
              >
                <Text style={[
                  styles.profileButtonText,
                  selectedProfile === profile && styles.profileButtonTextActive
                ]}>
                  {profile === 'EMPLOYER' && '👔 Empregador'}
                  {profile === 'EMPLOYEE' && '👷 Funcionário'}
                  {profile === 'FAMILY' && '👨‍👩‍👧‍👦 Família'}
                  {profile === 'ADMIN' && '⚙️ Administrador'}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Bem-vindo!</Text>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userProfile}>
            {selectedProfile === 'EMPLOYER' && '👔 Empregador'}
            {selectedProfile === 'EMPLOYEE' && '👷 Funcionário'}
            {selectedProfile === 'FAMILY' && '👨‍👩‍👧‍👦 Família'}
            {selectedProfile === 'ADMIN' && '⚙️ Administrador'}
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando dados do dashboard...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable style={styles.retryButton} onPress={refreshDashboard}>
              <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {dashboardData?.overview.pendingTasks || 0}
              </Text>
              <Text style={styles.statLabel}>Tarefas Pendentes</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {dashboardData?.overview.unreadNotifications || 0}
              </Text>
              <Text style={styles.statLabel}>Notificações</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {dashboardData?.overview.totalEmployees || 0}
              </Text>
              <Text style={styles.statLabel}>Funcionários</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {dashboardData?.overview.pendingPayments || 0}
              </Text>
              <Text style={styles.statLabel}>Pagamentos Pendentes</Text>
            </View>
          </View>
        )}

        <View style={styles.actionsContainer}>
          <Pressable style={styles.actionButton} onPress={onNavigateToTasks}>
            <Text style={styles.actionButtonText}>Ver Tarefas</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={onNavigateToNotifications}>
            <Text style={styles.actionButtonText}>Ver Notificações</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={onNavigateToPayroll}>
            <Text style={styles.actionButtonText}>Folha de Pagamento</Text>
          </Pressable>

          <Pressable style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Meu Perfil</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={onNavigateToNavigation}>
            <Text style={styles.actionButtonText}>🎯 Navegar Telas</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={onNavigateToUsers}>
            <Text style={styles.actionButtonText}>👥 Gestão de Usuários</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={onNavigateToFinance}>
            <Text style={styles.actionButtonText}>💰 Gestão Financeira</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={onNavigateToHR}>
            <Text style={styles.actionButtonText}>👥 Sistema de RH</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={onNavigateToAdvancedTimeCard}>
            <Text style={styles.actionButtonText}>⏰ Controle de Ponto Avançado</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={onNavigateToPaymentIntegrations}>
            <Text style={styles.actionButtonText}>💳 Integrações de Pagamento</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={onNavigateToReports}>
            <Text style={styles.actionButtonText}>📊 Relatórios</Text>
          </Pressable>
        </View>

        {dashboardData && (
          <>
            <View style={styles.financialCard}>
              <Text style={styles.infoTitle}>Resumo Financeiro</Text>
              <View style={styles.financialRow}>
                <Text style={styles.financialLabel}>Orçamento Total:</Text>
                <Text style={styles.financialValue}>
                  R$ {dashboardData.overview.totalBudgetAmount.toLocaleString('pt-BR')}
                </Text>
              </View>
              <View style={styles.financialRow}>
                <Text style={styles.financialLabel}>Gasto Total:</Text>
                <Text style={styles.financialValue}>
                  R$ {dashboardData.overview.totalBudgetSpent.toLocaleString('pt-BR')}
                </Text>
              </View>
              <View style={styles.financialRow}>
                <Text style={styles.financialLabel}>Utilização:</Text>
                <Text style={styles.financialValue}>
                  {dashboardData.overview.budgetUtilization.toFixed(1)}%
                </Text>
              </View>
              <View style={styles.financialRow}>
                <Text style={styles.financialLabel}>Folha de Pagamento:</Text>
                <Text style={styles.financialValue}>
                  R$ {dashboardData.overview.totalGrossSalary.toLocaleString('pt-BR')}
                </Text>
              </View>
            </View>

            {/* Notificações do Sistema */}
            {dashboardData.recentData.notifications.length > 0 && (
              <View style={styles.systemNotificationsCard}>
                <Text style={styles.infoTitle}>Notificações do Sistema</Text>
                {dashboardData.recentData.notifications.slice(0, 3).map((notification) => (
                  <View key={notification.id} style={styles.systemNotificationItem}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.notificationTitle}>{notification.title}</Text>
                      <View style={[
                        styles.notificationType,
                        notification.type === 'success' && styles.notificationTypeSuccess,
                        notification.type === 'warning' && styles.notificationTypeWarning,
                        notification.type === 'error' && styles.notificationTypeError,
                      ]}>
                        <Text style={styles.notificationTypeText}>
                          {notification.type === 'success' && '✅'}
                          {notification.type === 'warning' && '⚠️'}
                          {notification.type === 'error' && '❌'}
                          {notification.type === 'info' && 'ℹ️'}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                    <Text style={styles.notificationTime}>
                      {new Date(notification.timestamp).toLocaleString('pt-BR')}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Tarefas Recentes */}
            {dashboardData.recentData.tasks.length > 0 && (
              <View style={styles.tasksCard}>
                <Text style={styles.infoTitle}>Tarefas Recentes</Text>
                {dashboardData.recentData.tasks.slice(0, 3).map((task) => (
                  <View key={task.id} style={styles.taskItem}>
                    <View style={styles.taskHeader}>
                      <Text style={styles.taskTitle}>{task.title}</Text>
                      <View style={[
                        styles.taskPriority,
                        task.priority === 'high' && styles.taskPriorityHigh,
                        task.priority === 'medium' && styles.taskPriorityMedium,
                        task.priority === 'low' && styles.taskPriorityLow,
                      ]}>
                        <Text style={styles.taskPriorityText}>
                          {task.priority === 'high' && '🔴'}
                          {task.priority === 'medium' && '🟡'}
                          {task.priority === 'low' && '🟢'}
                        </Text>
                      </View>
                    </View>
                    <View style={[
                      styles.taskStatus,
                      task.status === 'completed' && styles.taskStatusCompleted,
                      task.status === 'in_progress' && styles.taskStatusInProgress,
                      task.status === 'pending' && styles.taskStatusPending,
                    ]}>
                      <Text style={styles.taskStatusText}>
                        {task.status === 'completed' && '✅ Concluído'}
                        {task.status === 'in_progress' && '🔄 Em andamento'}
                        {task.status === 'pending' && '⏳ Pendente'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Dados Detalhados do Backend */}
            <View style={styles.backendDataCard}>
              <Text style={styles.infoTitle}>📊 Dados do Backend</Text>
              
              <View style={styles.dataSection}>
                <Text style={styles.dataSectionTitle}>📋 Tarefas</Text>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Pendentes:</Text>
                  <Text style={styles.dataValue}>{dashboardData.overview.pendingTasks}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Total:</Text>
                  <Text style={styles.dataValue}>{dashboardData.overview.totalEmployees}</Text>
                </View>
              </View>

              <View style={styles.dataSection}>
                <Text style={styles.dataSectionTitle}>💰 Pagamentos</Text>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Pendentes:</Text>
                  <Text style={styles.dataValue}>{dashboardData.overview.pendingPayments}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Total:</Text>
                  <Text style={styles.dataValue}>R$ {dashboardData.overview.totalPaymentAmount.toLocaleString('pt-BR')}</Text>
                </View>
              </View>

              <View style={styles.dataSection}>
                <Text style={styles.dataSectionTitle}>🛒 Compras</Text>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Pendentes:</Text>
                  <Text style={styles.dataValue}>{dashboardData.overview.pendingPurchases}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Total:</Text>
                  <Text style={styles.dataValue}>R$ {dashboardData.overview.totalPurchaseAmount.toLocaleString('pt-BR')}</Text>
                </View>
              </View>

              <View style={styles.dataSection}>
                <Text style={styles.dataSectionTitle}>👥 Funcionários</Text>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Total:</Text>
                  <Text style={styles.dataValue}>{dashboardData.overview.totalEmployees}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Salário Total:</Text>
                  <Text style={styles.dataValue}>R$ {dashboardData.overview.totalEmployeeSalary.toLocaleString('pt-BR')}</Text>
                </View>
              </View>
            </View>
          </>
        )}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Informações do Sistema</Text>
          <Text style={styles.infoText}>Versão: 2.0.0</Text>
          <Text style={styles.infoText}>Perfil: {user.profile}</Text>
          <Text style={styles.infoText}>Região: Brasil</Text>
          <Text style={styles.infoText}>Dispositivo: Web</Text>
          <Text style={styles.infoText}>Notificações: {notifications.length}</Text>
        </View>

        {/* Seção de Teste de Notificações  */}
        <View style={styles.notificationsCard}>
          <Text style={styles.infoTitle}>Testar Notificações</Text>
          <View style={styles.notificationButtons}>
            <Pressable 
              style={styles.notificationButton} 
              onPress={() => testNotification('Lembrete')}
            >
              <Text style={styles.notificationButtonText}>Lembrete</Text>
            </Pressable>
            <Pressable 
              style={styles.notificationButton} 
              onPress={() => testNotification('Pagamento')}
            >
              <Text style={styles.notificationButtonText}>Pagamento</Text>
            </Pressable>
            <Pressable 
              style={styles.notificationButton} 
              onPress={() => testNotification('Dica')}
            >
              <Text style={styles.notificationButtonText}>Dica</Text>
            </Pressable>
          </View>
        </View>

        {/* Resumo de Notificações  */}
        {notifications.length > 0 && (
          <View style={styles.notificationsList}>
            <Text style={styles.infoTitle}>Últimas Notificações</Text>
            {notifications.slice(0, 3).map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
              </View>
            ))}
            {notifications.length > 3 && (
              <Pressable 
                style={styles.viewMoreButton}
                onPress={onNavigateToNotifications}
              >
                <Text style={styles.viewMoreButtonText}>Ver mais ({notifications.length - 3})</Text>
              </Pressable>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSelector: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  profileSelectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  profileButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  profileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  profileButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  profileButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  profileButtonTextActive: {
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ff3b30',
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userProfile: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  systemNotificationsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  systemNotificationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  notificationType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  notificationTypeSuccess: {
    backgroundColor: '#d4edda',
  },
  notificationTypeWarning: {
    backgroundColor: '#fff3cd',
  },
  notificationTypeError: {
    backgroundColor: '#f8d7da',
  },
  notificationTypeText: {
    fontSize: 12,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  tasksCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  taskItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  taskPriority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  taskPriorityHigh: {
    backgroundColor: '#f8d7da',
  },
  taskPriorityMedium: {
    backgroundColor: '#fff3cd',
  },
  taskPriorityLow: {
    backgroundColor: '#d4edda',
  },
  taskPriorityText: {
    fontSize: 12,
  },
  taskStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  taskStatusCompleted: {
    backgroundColor: '#d4edda',
  },
  taskStatusInProgress: {
    backgroundColor: '#cce5ff',
  },
  taskStatusPending: {
    backgroundColor: '#fff3cd',
  },
  taskStatusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  notificationsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  notificationButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  notificationButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  notificationsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  viewMoreButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  viewMoreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  financialCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  financialLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  financialValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    textAlign: 'right',
  },
  connectionStatus: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  connectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  connectionInfo: {
    alignItems: 'center',
  },
  connectionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lastRefreshText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  backendDataCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataSection: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dataSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  dataLabel: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  dataValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    textAlign: 'right',
  },
  viewMoreButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  viewMoreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});



Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */