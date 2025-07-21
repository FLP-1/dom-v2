/**
 * @fileoverview Tela de Notificações do DOM v2
 * @directory frontend/src/screens
 * @description Tela para visualizar e gerenciar notificações
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NotificationList } from '../components/notification-list';
import { useSimpleNotifications, SimpleNotificationType } from '../utils/simple-notifications';

interface NotificationsScreenProps {
  onBack: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onBack,
}) => {
  const {
    notifications,
    loading,
    unreadCount,
    highPriorityCount,
    addNotification,
    markAsRead,
    removeNotification,
    clearNotifications,
  } = useSimpleNotifications();

  const handleTestNotification = (type: SimpleNotificationType) => {
    addNotification(type);
  };

  const handleBack = () => {
    if (unreadCount > 0) {
      Alert.alert(
        'Notificações não lidas',
        `Você tem ${unreadCount} notificação(ões) não lida(s). Deseja sair mesmo assim?`,
        [
          { text: 'Continuar lendo', style: 'cancel' },
          { text: 'Sair', onPress: onBack },
        ]
      );
    } else {
      onBack();
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notificações</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando notificações...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <TouchableOpacity style={styles.testButton} onPress={() => {
          Alert.alert(
            'Testar Notificação',
            'Escolha o tipo de notificação para testar:',
            [
              { text: 'Cancelar', style: 'cancel' },
              { 
                text: 'Lembrete de Tarefa', 
                onPress: () => handleTestNotification('TASK_REMINDER') 
              },
              { 
                text: 'Pagamento Vencendo', 
                onPress: () => handleTestNotification('PAYMENT_DUE') 
              },
              { 
                text: 'Atualização do Sistema', 
                onPress: () => handleTestNotification('SYSTEM_UPDATE') 
              },
              { 
                text: 'Dica de Ajuda', 
                onPress: () => handleTestNotification('HELP_TIP') 
              },
            ]
          );
        }}>
          <Text style={styles.testButtonText}>🧪</Text>
        </TouchableOpacity>
      </View>

      {/* Resumo das notificações */}
      {(unreadCount > 0 || highPriorityCount > 0) && (
        <View style={styles.summaryContainer}>
          {unreadCount > 0 && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Não lidas:</Text>
              <Text style={styles.summaryValue}>{unreadCount}</Text>
            </View>
          )}
          {highPriorityCount > 0 && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Alta prioridade:</Text>
              <Text style={[styles.summaryValue, styles.highPriorityValue]}>{highPriorityCount}</Text>
            </View>
          )}
        </View>
      )}

      <NotificationList
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onRemove={removeNotification}
        onClearAll={clearNotifications}
      />
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
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 60,
  },
  testButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  testButtonText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  highPriorityValue: {
    color: '#ff3b30',
  },
}); 