/**
 * @fileoverview Componente de lista de notificações para DOM v2
 * @directory frontend/src/components
 * @description Lista simples e funcional de notificações
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
  ScrollView,
  Alert,
} from 'react-native';
import { SimpleNotification } from '../utils/simple-notifications';

interface NotificationListProps {
  notifications: SimpleNotification[];
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onRemove,
  onClearAll,
}) => {
  const handleRemove = (id: string, title: string) => {
    Alert.alert(
      'Remover Notificação',
      `Deseja remover "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', onPress: () => onRemove(id), style: 'destructive' },
      ]
    );
  };

  const handleClearAll = () => {
    if (notifications.length === 0) return;
    
    Alert.alert(
      'Limpar Notificações',
      'Deseja remover todas as notificações?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', onPress: onClearAll, style: 'destructive' },
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return '#ff3b30';
      case 'MEDIUM':
        return '#ff9500';
      case 'LOW':
        return '#007AFF';
      default:
        return '#007AFF';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Agora mesmo';
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d atrás`;
    }
  };

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhuma notificação</Text>
        <Text style={styles.emptySubtext}>Você está em dia!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notificações ({notifications.length})</Text>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
          <Text style={styles.clearButtonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        {notifications.map((notification) => (
          <View
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.read && styles.unreadItem,
            ]}
          >
            <View style={styles.notificationHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <View
                  style={[
                    styles.priorityIndicator,
                    { backgroundColor: getPriorityColor(notification.priority) },
                  ]}
                />
              </View>
              <Text style={styles.timestamp}>{formatDate(notification.createdAt)}</Text>
            </View>

            <Text style={styles.notificationMessage}>{notification.message}</Text>

            <View style={styles.actions}>
              {!notification.read && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => onMarkAsRead(notification.id)}
                >
                  <Text style={styles.actionButtonText}>Marcar como lida</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.actionButton, styles.removeButton]}
                onPress={() => handleRemove(notification.id, notification.title)}
              >
                <Text style={styles.removeButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ff3b30',
    borderRadius: 6,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: 16,
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    backgroundColor: '#f8f9ff',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#ff3b30',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
}); 