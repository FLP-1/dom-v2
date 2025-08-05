import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    Pressable,
    View,
} from 'react-native';
import { useDashboardMock } from '../hooks/useDashboardMock';
import { UserProfileType } from '../utils/user-profiles';

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
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  onLogout,
  onNavigateToTasks,
  onNavigateToNotifications,
  onNavigateToPayroll,
  onNavigateToNavigation
}) => {
  const [selectedProfile, setSelectedProfile] = useState<UserProfileType>(user.profile);
  const { dashboardData, loading, error, refreshDashboard } = useDashboardMock(selectedProfile);
  
  // Debug: verificar dados
  console.log('Dashboard Data:', dashboardData);
  console.log('Loading:', loading);
  console.log('Error:', error);
  const [notifications, setNotifications] = useState<Array<{id: string, title: string, message: string}>>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
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

  const testNotification = (type: string) => {
    const newNotification = {
      id: Date.now().toString(),
      title: `Notificação ${type}`,
      message: `Esta é uma notificação de teste do tipo ${type}`
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando dashboard...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard DOM v2</Text>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {/* Seletor de Perfil */}
        <View style={styles.profileSelector}>
          <Text style={styles.sectionTitle}>Perfil Atual: {selectedProfile}</Text>
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
                  {profile}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Informações do Usuário */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userCpf}>CPF: {user.cpf}</Text>
          <Text style={styles.userProfile}>Perfil: {selectedProfile}</Text>
        </View>

        {/* Estatísticas */}
        {dashboardData && dashboardData.overview && (
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Estatísticas</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{dashboardData.overview.totalEmployees || 0}</Text>
                <Text style={styles.statLabel}>Funcionários</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{dashboardData.overview.pendingTasks || 0}</Text>
                <Text style={styles.statLabel}>Tarefas Pendentes</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>R$ {(dashboardData.overview.totalBudgetAmount || 0).toLocaleString()}</Text>
                <Text style={styles.statLabel}>Orçamento Total</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{dashboardData.overview.unreadNotifications || 0}</Text>
                <Text style={styles.statLabel}>Notificações</Text>
              </View>
            </View>
          </View>
        )}

        {/* Navegação */}
        <View style={styles.navigationContainer}>
          <Text style={styles.sectionTitle}>Navegação</Text>
          <View style={styles.navButtons}>
            <Pressable style={styles.navButton} onPress={onNavigateToTasks}>
              <Text style={styles.navButtonText}>📋 Tarefas</Text>
            </Pressable>
            <Pressable style={styles.navButton} onPress={onNavigateToNotifications}>
              <Text style={styles.navButtonText}>🔔 Notificações</Text>
            </Pressable>
            <Pressable style={styles.navButton} onPress={onNavigateToPayroll}>
              <Text style={styles.navButtonText}>💰 Folha de Pagamento</Text>
            </Pressable>
            <Pressable style={styles.navButton} onPress={onNavigateToNavigation}>
              <Text style={styles.navButtonText}>🧭 Navegação</Text>
            </Pressable>
          </View>
        </View>

        {/* Teste de Notificações */}
        <View style={styles.testContainer}>
          <Text style={styles.sectionTitle}>Teste de Notificações</Text>
          <View style={styles.testButtons}>
            <Pressable style={[styles.testButton, styles.successButton]} onPress={() => testNotification('success')}>
              <Text style={styles.testButtonText}>✅ Sucesso</Text>
            </Pressable>
            <Pressable style={[styles.testButton, styles.warningButton]} onPress={() => testNotification('warning')}>
              <Text style={styles.testButtonText}>⚠️ Aviso</Text>
            </Pressable>
            <Pressable style={[styles.testButton, styles.errorButton]} onPress={() => testNotification('error')}>
              <Text style={styles.testButtonText}>❌ Erro</Text>
            </Pressable>
            <Pressable style={[styles.testButton, styles.infoButton]} onPress={() => testNotification('info')}>
              <Text style={styles.testButtonText}>ℹ️ Info</Text>
            </Pressable>
          </View>
        </View>

        {/* Notificações Recentes */}
        {notifications.length > 0 && (
          <View style={styles.notificationsContainer}>
            <Text style={styles.sectionTitle}>Notificações Recentes ({unreadCount} não lidas)</Text>
            {notifications.slice(0, 5).map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
              </View>
            ))}
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
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 50,
  },
  profileSelector: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  profileButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  profileButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  profileButtonActive: {
    backgroundColor: '#007AFF',
  },
  profileButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  profileButtonTextActive: {
    color: 'white',
  },
  userInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userCpf: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  userProfile: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  statCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  navigationContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  navButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  testContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  testButton: {
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  warningButton: {
    backgroundColor: '#ffc107',
  },
  errorButton: {
    backgroundColor: '#dc3545',
  },
  infoButton: {
    backgroundColor: '#17a2b8',
  },
  testButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  notificationsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
  },
}); 