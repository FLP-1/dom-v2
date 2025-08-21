import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DashboardCard {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  value?: string | number;
}

interface User {
  id: string;
  name: string;
  cpf: string;
  profile: string;
}

interface DashboardScreenProps {
  user: User;
  onLogout: () => void;
  onNavigateToTasks?: () => void;
  onNavigateToNotifications?: () => void;
  onNavigateToPayroll?: () => void;
  onNavigateToNavigation?: () => void;
  onNavigateToUsers?: () => void;
  onNavigateToFinance?: () => void;
  onNavigateToHR?: () => void;
  onNavigateToAdvancedTimeCard?: () => void;
  onNavigateToPaymentIntegrations?: () => void;
  onNavigateToReports?: () => void;
  onNavigateToDocuments?: () => void;
}

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC<DashboardScreenProps> = ({
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
  onNavigateToReports,
  onNavigateToDocuments
}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const dashboardCards: DashboardCard[] = [
    {
      id: 'finance',
      title: 'Finanças',
      icon: '💰',
      color: '#10b981',
      description: 'Gestão financeira completa',
      value: 'R$ 45.230,00'
    },
    {
      id: 'tasks',
      title: 'Tarefas',
      icon: '📝',
      color: '#3b82f6',
      description: 'Organize suas atividades',
      value: '12 pendentes'
    },
    {
      id: 'employees',
      title: 'Funcionários',
      icon: '👥',
      color: '#8b5cf6',
      description: 'Gerencie sua equipe',
      value: '8 ativos'
    },
    {
      id: 'payments',
      title: 'Pagamentos',
      icon: '💳',
      color: '#059669',
      description: 'Controle de pagamentos',
      value: '15 pendentes'
    },
    {
      id: 'timeclock',
      title: 'Ponto',
      icon: '⏰',
      color: '#06b6d4',
      description: 'Controle de presença',
      value: 'Online'
    },
    {
      id: 'budget',
      title: 'Orçamentos',
      icon: '📋',
      color: '#7c3aed',
      description: 'Planejamento financeiro',
      value: '5 ativos'
    },
    {
      id: 'documents',
      title: 'Documentos',
      icon: '📄',
      color: '#0891b2',
      description: 'Gestão de documentos',
      value: '24 arquivos'
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: '🔔',
      color: '#ef4444',
      description: 'Mensagens e alertas',
      value: '3 novas'
    },
    {
      id: 'hr',
      title: 'Recursos Humanos',
      icon: '👨‍💼',
      color: '#0891b2',
      description: 'Gestão de RH',
      value: '12 funcionários'
    },
    {
      id: 'reports',
      title: 'Relatórios',
      icon: '📊',
      color: '#f59e0b',
      description: 'Visualize dados e métricas',
      value: '24h'
    },
    {
      id: 'advancedTimeCard',
      title: 'Ponto Avançado',
      icon: '⏱️',
      color: '#0d9488',
      description: 'Controle detalhado de horas',
      value: '156h/mês'
    },
    {
      id: 'paymentIntegrations',
      title: 'Integrações',
      icon: '🔗',
      color: '#7c2d12',
      description: 'Conexões com sistemas',
      value: '5 ativas'
    }
  ];

  const handleCardPress = (cardId: string) => {
    setSelectedCard(cardId);
    
    // Mapear cards para funções de navegação
    switch (cardId) {
      case 'tasks':
        onNavigateToTasks?.();
        break;
      case 'notifications':
        onNavigateToNotifications?.();
        break;
      case 'payroll':
        onNavigateToPayroll?.();
        break;
      case 'navigation':
        onNavigateToNavigation?.();
        break;
      case 'users':
        onNavigateToUsers?.();
        break;
      case 'finance':
        onNavigateToFinance?.();
        break;
      case 'hr':
        onNavigateToHR?.();
        break;
      case 'advancedTimeCard':
        onNavigateToAdvancedTimeCard?.();
        break;
      case 'paymentIntegrations':
        onNavigateToPaymentIntegrations?.();
        break;
      case 'reports':
        onNavigateToReports?.();
        break;
      case 'documents':
        onNavigateToDocuments?.();
        break;
      default:
        console.log(`Navegação para ${cardId} não implementada`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Bem-vindo,</Text>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userProfile}>{user.profile}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Dashboard</Text>
        <Text style={styles.sectionSubtitle}>Acesse as funcionalidades do sistema</Text>

        <View style={styles.cardsGrid}>
          {dashboardCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[
                styles.card,
                { backgroundColor: card.color },
                selectedCard === card.id && styles.selectedCard
              ]}
              onPress={() => handleCardPress(card.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.cardIcon}>{card.icon}</Text>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
              {card.value && (
                <Text style={styles.cardValue}>{card.value}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  userProfile: {
    fontSize: 12,
    color: '#6c757d',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 24,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: (width - 60) / 2,
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    transform: [{ scale: 0.95 }],
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.9,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default DashboardScreen;
