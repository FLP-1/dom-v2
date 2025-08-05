







import React, { useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Modal,
  ActivityIndicator,
  Switch,
} from 'react-native';
import IntegrationService from '../services/integrations';

interface NotificationsScreenProps {
  onNavigateBack: () => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
  category: 'system' | 'timecard' | 'payment' | 'hr' | 'finance';
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onNavigateBack }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'settings' | 'test'>('all');
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testTitle, setTestTitle] = useState('');
  const [testMessage, setTestMessage] = useState('');
  const [testType, setTestType] = useState<'info' | 'warning' | 'error' | 'success'>('info');

  // Configurações de notificação
  const [settings, setSettings] = useState({
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    timecardAlerts: true,
    paymentAlerts: true,
    hrAlerts: true,
    financeAlerts: true,
    systemAlerts: true,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  const integrationService = IntegrationService.getInstance();

  // Dados mockados de notificações
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Ponto Registrado',
      message: 'Maria Silva registrou entrada às 08:15',
      type: 'success',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutos atrás
      read: false,
      category: 'timecard'
    },
    {
      id: '2',
      title: 'Pagamento Processado',
      message: 'Pagamento de R$ 2.800,00 para João Santos foi processado com sucesso',
      type: 'success',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutos atrás
      read: false,
      category: 'payment'
    },
    {
      id: '3',
      title: 'Atraso Detectado',
      message: 'Pedro Oliveira está atrasado há 30 minutos',
      type: 'warning',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutos atrás
      read: true,
      category: 'timecard'
    },
    {
      id: '4',
      title: 'Relatório Mensal',
      message: 'Relatório financeiro de novembro está disponível para download',
      type: 'info',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      read: true,
      category: 'finance'
    },
    {
      id: '5',
      title: 'Nova Contratação',
      message: 'Ana Costa foi contratada para o setor de limpeza',
      type: 'info',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
      read: true,
      category: 'hr'
    },
    {
      id: '6',
      title: 'Manutenção Programada',
      message: 'Sistema ficará indisponível das 02:00 às 04:00 para manutenção',
      type: 'warning',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 horas atrás
      read: true,
      category: 'system'
    },
    {
      id: '7',
      title: 'Erro de Pagamento',
      message: 'Falha ao processar pagamento de R$ 1.500,00 para Carlos Lima',
      type: 'error',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 horas atrás
      read: true,
      category: 'payment'
    },
    {
      id: '8',
      title: 'Horas Extras',
      message: 'José Silva trabalhou 2 horas extras hoje',
      type: 'info',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 horas atrás
      read: true,
      category: 'timecard'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleDeleteNotification = (id: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta notificação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setNotifications(prev => prev.filter(notif => notif.id !== id));
          }
        }
      ]
    );
  };

  const handleSendTestNotification = async () => {
    if (!testTitle.trim() || !testMessage.trim()) {
      Alert.alert('Erro', 'Preencha título e mensagem');
      return;
    }

    setLoading(true);
    try {
      // Simular envio de notificação
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: testTitle,
        message: testMessage,
        type: testType,
        timestamp: new Date(),
        read: false,
        category: 'system'
      };

      setNotifications(prev => [newNotification, ...prev]);
      setShowTestModal(false);
      setTestTitle('');
      setTestMessage('');
      setTestType('info');
      
      Alert.alert('Sucesso', 'Notificação de teste enviada!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao enviar notificação de teste');
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'error': return '#F44336';
      case 'info': return '#2196F3';
      default: return '#666';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'timecard': return '⏰';
      case 'payment': return '💳';
      case 'hr': return '👥';
      case 'finance': return '💰';
      case 'system': return '⚙️';
      default: return '📢';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'unread') return !notif.read;
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const renderNotificationsList = () => (
    <View>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>
          {activeTab === 'unread' ? 'Não Lidas' : 'Todas as Notificações'}
        </Text>
        {activeTab === 'all' && unreadCount > 0 && (
          <Pressable style={styles.markAllButton} onPress={handleMarkAllAsRead}>
            <Text style={styles.markAllButtonText}>Marcar todas como lidas</Text>
          </Pressable>
        )}
      </View>

      {filteredNotifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>
            {activeTab === 'unread' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação'}
          </Text>
          <Text style={styles.emptySubtitle}>
            {activeTab === 'unread' 
              ? 'Todas as notificações foram lidas' 
              : 'As notificações aparecerão aqui'
            }
          </Text>
        </View>
      ) : (
        <View style={styles.notificationsList}>
          {filteredNotifications.map((notification) => (
            <View
              key={notification.id}
              style={[
                styles.notificationItem,
                !notification.read && styles.unreadNotification
              ]}
            >
              <View style={styles.notificationHeader}>
                <View style={styles.notificationMeta}>
                  <Text style={styles.notificationIcon}>
                    {getTypeIcon(notification.type)}
                  </Text>
                  <Text style={styles.notificationCategory}>
                    {getCategoryIcon(notification.category)}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {formatTime(notification.timestamp)}
                  </Text>
                </View>
                <View style={styles.notificationActions}>
                  {!notification.read && (
                    <Pressable
                      style={styles.actionButton}
                      onPress={() => handleMarkAsRead(notification.id)}
                    >
                      <Text style={styles.actionButtonText}>✓</Text>
                    </Pressable>
                  )}
                  <Pressable
                    style={styles.actionButton}
                    onPress={() => handleDeleteNotification(notification.id)}
                  >
                    <Text style={styles.actionButtonText}>🗑️</Text>
                  </Pressable>
                </View>
              </View>

              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>

              <View style={[
                styles.notificationTypeIndicator,
                { backgroundColor: getTypeColor(notification.type) }
              ]} />
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderSettingsTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Configurações de Notificação</Text>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>📱 Canais de Notificação</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Notificações Push</Text>
            <Text style={styles.settingDescription}>
              Receber notificações no dispositivo
            </Text>
          </View>
          <Switch
            value={settings.pushEnabled}
            onValueChange={(value) => setSettings(prev => ({ ...prev, pushEnabled: value }))}
            trackColor={{ false: '#ddd', true: '#007AFF' }}
            thumbColor={settings.pushEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Notificações por Email</Text>
            <Text style={styles.settingDescription}>
              Receber notificações por email
            </Text>
          </View>
          <Switch
            value={settings.emailEnabled}
            onValueChange={(value) => setSettings(prev => ({ ...prev, emailEnabled: value }))}
            trackColor={{ false: '#ddd', true: '#007AFF' }}
            thumbColor={settings.emailEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Notificações por SMS</Text>
            <Text style={styles.settingDescription}>
              Receber notificações por SMS
            </Text>
          </View>
          <Switch
            value={settings.smsEnabled}
            onValueChange={(value) => setSettings(prev => ({ ...prev, smsEnabled: value }))}
            trackColor={{ false: '#ddd', true: '#007AFF' }}
            thumbColor={settings.smsEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>🔔 Tipos de Notificação</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Controle de Ponto</Text>
            <Text style={styles.settingDescription}>
              Entradas, saídas, atrasos e horas extras
            </Text>
          </View>
          <Switch
            value={settings.timecardAlerts}
            onValueChange={(value) => setSettings(prev => ({ ...prev, timecardAlerts: value }))}
            trackColor={{ false: '#ddd', true: '#007AFF' }}
            thumbColor={settings.timecardAlerts ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Pagamentos</Text>
            <Text style={styles.settingDescription}>
              Processamento e falhas de pagamento
            </Text>
          </View>
          <Switch
            value={settings.paymentAlerts}
            onValueChange={(value) => setSettings(prev => ({ ...prev, paymentAlerts: value }))}
            trackColor={{ false: '#ddd', true: '#007AFF' }}
            thumbColor={settings.paymentAlerts ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Recursos Humanos</Text>
            <Text style={styles.settingDescription}>
              Contratações, demissões e mudanças
            </Text>
          </View>
          <Switch
            value={settings.hrAlerts}
            onValueChange={(value) => setSettings(prev => ({ ...prev, hrAlerts: value }))}
            trackColor={{ false: '#ddd', true: '#007AFF' }}
            thumbColor={settings.hrAlerts ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Financeiro</Text>
            <Text style={styles.settingDescription}>
              Relatórios e alertas financeiros
            </Text>
          </View>
          <Switch
            value={settings.financeAlerts}
            onValueChange={(value) => setSettings(prev => ({ ...prev, financeAlerts: value }))}
            trackColor={{ false: '#ddd', true: '#007AFF' }}
            thumbColor={settings.financeAlerts ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Sistema</Text>
            <Text style={styles.settingDescription}>
              Manutenções e atualizações
            </Text>
          </View>
          <Switch
            value={settings.systemAlerts}
            onValueChange={(value) => setSettings(prev => ({ ...prev, systemAlerts: value }))}
            trackColor={{ false: '#ddd', true: '#007AFF' }}
            thumbColor={settings.systemAlerts ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>🌙 Horário Silencioso</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Ativar Horário Silencioso</Text>
            <Text style={styles.settingDescription}>
              Não receber notificações em horários específicos
            </Text>
          </View>
          <Switch
            value={settings.quietHours.enabled}
            onValueChange={(value) => setSettings(prev => ({ 
              ...prev, 
              quietHours: { ...prev.quietHours, enabled: value }
            }))}
            trackColor={{ false: '#ddd', true: '#007AFF' }}
            thumbColor={settings.quietHours.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {settings.quietHours.enabled && (
          <View style={styles.quietHoursSettings}>
            <Text style={styles.quietHoursLabel}>Horário: {settings.quietHours.start} - {settings.quietHours.end}</Text>
            <Text style={styles.quietHoursDescription}>
              As notificações serão silenciadas durante este período
            </Text>
          </View>
        )}
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>📊 Estatísticas</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{notifications.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{unreadCount}</Text>
            <Text style={styles.statLabel}>Não Lidas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {notifications.filter(n => n.type === 'error').length}
            </Text>
            <Text style={styles.statLabel}>Erros</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {notifications.filter(n => n.type === 'warning').length}
            </Text>
            <Text style={styles.statLabel}>Avisos</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTestTab = () => (
    <View>
      <Text style={styles.sectionTitle}>Teste de Notificações</Text>

      <View style={styles.testCard}>
        <Text style={styles.testTitle}>🧪 Enviar Notificação de Teste</Text>
        <Text style={styles.testDescription}>
          Teste o sistema de notificações enviando uma notificação de exemplo
        </Text>

        <Pressable
          style={styles.testButton}
          onPress={() => setShowTestModal(true)}
        >
          <Text style={styles.testButtonText}>Enviar Notificação de Teste</Text>
        </Pressable>
      </View>

      <View style={styles.testCard}>
        <Text style={styles.testTitle}>📋 Notificações de Exemplo</Text>
        
        <View style={styles.exampleList}>
          <Pressable
            style={styles.exampleItem}
            onPress={() => {
              setTestTitle('Teste de Sucesso');
              setTestMessage('Esta é uma notificação de teste de sucesso');
              setTestType('success');
              setShowTestModal(true);
            }}
          >
            <Text style={styles.exampleIcon}>✅</Text>
            <Text style={styles.exampleText}>Notificação de Sucesso</Text>
          </Pressable>

          <Pressable
            style={styles.exampleItem}
            onPress={() => {
              setTestTitle('Teste de Aviso');
              setTestMessage('Esta é uma notificação de teste de aviso');
              setTestType('warning');
              setShowTestModal(true);
            }}
          >
            <Text style={styles.exampleIcon}>⚠️</Text>
            <Text style={styles.exampleText}>Notificação de Aviso</Text>
          </Pressable>

          <Pressable
            style={styles.exampleItem}
            onPress={() => {
              setTestTitle('Teste de Erro');
              setTestMessage('Esta é uma notificação de teste de erro');
              setTestType('error');
              setShowTestModal(true);
            }}
          >
            <Text style={styles.exampleIcon}>❌</Text>
            <Text style={styles.exampleText}>Notificação de Erro</Text>
          </Pressable>

          <Pressable
            style={styles.exampleItem}
            onPress={() => {
              setTestTitle('Teste de Informação');
              setTestMessage('Esta é uma notificação de teste de informação');
              setTestType('info');
              setShowTestModal(true);
            }}
          >
            <Text style={styles.exampleIcon}>ℹ️</Text>
            <Text style={styles.exampleText}>Notificação de Informação</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Notificações</Text>
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            📢 Todas
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'unread' && styles.activeTab]}
          onPress={() => setActiveTab('unread')}
        >
          <Text style={[styles.tabText, activeTab === 'unread' && styles.activeTabText]}>
            🔔 Não Lidas {unreadCount > 0 && `(${unreadCount})`}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
            ⚙️ Configurações
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'test' && styles.activeTab]}
          onPress={() => setActiveTab('test')}
        >
          <Text style={[styles.tabText, activeTab === 'test' && styles.activeTabText]}>
            🧪 Teste
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'all' && renderNotificationsList()}
        {activeTab === 'unread' && renderNotificationsList()}
        {activeTab === 'settings' && renderSettingsTab()}
        {activeTab === 'test' && renderTestTab()}
      </ScrollView>

      {/* Modal de Teste */}
      <Modal
        visible={showTestModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enviar Notificação de Teste</Text>

            <Text style={styles.inputLabel}>Título</Text>
            <TextInput
              style={styles.input}
              value={testTitle}
              onChangeText={setTestTitle}
              placeholder="Digite o título da notificação"
            />

            <Text style={styles.inputLabel}>Mensagem</Text>
            <TextInput
              style={styles.input}
              value={testMessage}
              onChangeText={setTestMessage}
              placeholder="Digite a mensagem da notificação"
              multiline
              numberOfLines={3}
            />

            <Text style={styles.inputLabel}>Tipo</Text>
            <View style={styles.typeSelector}>
              {(['info', 'success', 'warning', 'error'] as const).map((type) => (
                <Pressable
                  key={type}
                  style={[
                    styles.typeOption,
                    testType === type && styles.typeOptionSelected
                  ]}
                  onPress={() => setTestType(type)}
                >
                  <Text style={[
                    styles.typeOptionText,
                    testType === type && styles.typeOptionTextSelected
                  ]}>
                    {getTypeIcon(type)} {type.toUpperCase()}
                  </Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowTestModal(false);
                  setTestTitle('');
                  setTestMessage('');
                  setTestType('info');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSendTestNotification}
                disabled={loading}
              >
                <Text style={styles.saveButtonText}>
                  {loading ? 'Enviando...' : 'Enviar'}
                </Text>
              </Pressable>
            </View>
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
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  markAllButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  markAllButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  notificationsList: {
    gap: 12,
  },
  notificationItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationIcon: {
    fontSize: 16,
  },
  notificationCategory: {
    fontSize: 14,
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
  },
  notificationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  actionButtonText: {
    fontSize: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  notificationTypeIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 4,
    height: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  settingsCard: {
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
  settingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  quietHoursSettings: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  quietHoursLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  quietHoursDescription: {
    fontSize: 12,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  testCard: {
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
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  testDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  testButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  exampleList: {
    gap: 8,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  exampleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  exampleText: {
    fontSize: 14,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  typeOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  typeOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  typeOptionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  typeOptionTextSelected: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});