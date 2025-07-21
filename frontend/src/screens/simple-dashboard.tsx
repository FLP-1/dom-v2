/**
 * @fileoverview Dashboard simplificado do DOM v2
 * @directory frontend/src/screens
 * @description Dashboard básico e funcional para MVP
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSimpleNotifications, SimpleNotificationType } from '../utils/simple-notifications';

interface User {
  id: string;
  name: string;
  cpf: string;
  profile: string;
}

interface SimpleDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigateToTasks: () => void;
  onNavigateToNotifications: () => void;
}

export const SimpleDashboard: React.FC<SimpleDashboardProps> = ({
  user,
  onLogout,
  onNavigateToTasks,
  onNavigateToNotifications,
}) => {
  const { notifications, unreadCount, addNotification } = useSimpleNotifications();

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
  const testNotification = (type: SimpleNotificationType) => {
    addNotification(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Bem-vindo!</Text>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userProfile}>{user.profile}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Tarefas Ativas</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{unreadCount}</Text>
            <Text style={styles.statLabel}>Notificações</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onNavigateToTasks}>
            <Text style={styles.actionButtonText}>Ver Tarefas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={onNavigateToNotifications}>
            <Text style={styles.actionButtonText}>Ver Notificações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Meu Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Informações do Sistema</Text>
          <Text style={styles.infoText}>• Versão: 2.0.0</Text>
          <Text style={styles.infoText}>• Perfil: {user.profile}</Text>
          <Text style={styles.infoText}>• Notificações: {notifications.length}</Text>
        </View>

        {/* Seção de Teste de Notificações */}
        <View style={styles.notificationsCard}>
          <Text style={styles.infoTitle}>Testar Notificações</Text>
          <View style={styles.notificationButtons}>
            <TouchableOpacity 
              style={styles.notificationButton} 
              onPress={() => testNotification('TASK_REMINDER')}
            >
              <Text style={styles.notificationButtonText}>Lembrete</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.notificationButton} 
              onPress={() => testNotification('PAYMENT_DUE')}
            >
              <Text style={styles.notificationButtonText}>Pagamento</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.notificationButton} 
              onPress={() => testNotification('HELP_TIP')}
            >
              <Text style={styles.notificationButtonText}>Dica</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Resumo de Notificações */}
        {notifications.length > 0 && (
          <View style={styles.notificationsList}>
            <Text style={styles.infoTitle}>Últimas Notificações</Text>
            {notifications.slice(0, 3).map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationPriority}>Prioridade: {notification.priority}</Text>
              </View>
            ))}
            {notifications.length > 3 && (
              <TouchableOpacity 
                style={styles.viewMoreButton}
                onPress={onNavigateToNotifications}
              >
                <Text style={styles.viewMoreButtonText}>Ver mais ({notifications.length - 3})</Text>
              </TouchableOpacity>
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
    marginBottom: 20,
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
  notificationPriority: {
    fontSize: 10,
    color: '#999',
    marginBottom: 8,
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