/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description Dashboard Principal DOM v2
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import BudgetScreen from './budget/BudgetScreen';
import PaymentScreen from './payments/PaymentScreen';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
}

const DashboardScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '📊',
      color: '#6366f1',
      description: 'Visão geral do sistema'
    },
    {
      id: 'employees',
      title: 'Funcionários',
      icon: '👥',
      color: '#10b981',
      description: 'Gestão de equipe'
    },
    {
      id: 'finance',
      title: 'Financeiro',
      icon: '💰',
      color: '#f59e0b',
      description: 'Controle financeiro'
    },
    {
      id: 'payroll',
      title: 'Folha de Pagamento',
      icon: '💳',
      color: '#8b5cf6',
      description: 'Gestão de salários'
    },
    {
      id: 'tasks',
      title: 'Tarefas',
      icon: '📋',
      color: '#3b82f6',
      description: 'Controle de atividades'
    },
    {
      id: 'reports',
      title: 'Relatórios',
      icon: '📈',
      color: '#ef4444',
      description: 'Análises e métricas'
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: '🔔',
      color: '#06b6d4',
      description: 'Alertas do sistema'
    },
    {
      id: 'settings',
      title: 'Configurações',
      icon: '⚙️',
      color: '#6b7280',
      description: 'Preferências do usuário'
    }
  ];

  const profile = (user?.profile || '').toLowerCase();

  const profileMenus: Record<string, string[]> = {
    employer: ['dashboard', 'employees', 'finance', 'payroll', 'tasks', 'reports', 'notifications', 'settings'],
    employee: ['dashboard', 'tasks', 'notifications', 'reports', 'settings'],
    family: ['dashboard', 'notifications', 'reports', 'settings']
  };

  const allowedMenuIds = profileMenus[profile] || menuItems.map(m => m.id);
  const filteredMenuItems = menuItems.filter(item => allowedMenuIds.includes(item.id));

  const handleMenuPress = (menuId: string) => {
    setSelectedMenu(menuId);
    if (menuId === 'finance') {
      // Para este MVP, podemos abrir a tela simples de budgets (se integrada ao fluxo principal)
      // Em projetos com React Navigation, aqui faríamos navigation.navigate('Budget')
      console.log('Abrir Financeiro (orçamentos/pagamentos)');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
            <Text style={styles.userProfile}>{user?.profile || 'Perfil'}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Finance Section (inline) */}
        {selectedMenu === 'finance' && (
          <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Financeiro</Text>
              <TouchableOpacity style={styles.logoutButton} onPress={() => setSelectedMenu(null)}>
                <Text style={styles.logoutText}>Voltar</Text>
              </TouchableOpacity>
            </View>
            <View style={{ gap: 16 }}>
              <View>
                <Text style={styles.sectionTitle}>Orçamentos</Text>
                <BudgetScreen />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Pagamentos</Text>
                <PaymentScreen />
              </View>
            </View>
          </View>
        )}

        {/* Welcome Section */}
        {selectedMenu !== 'finance' && (
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bem-vindo ao DOM v2</Text>
          <Text style={styles.welcomeSubtitle}>
            Sistema de Gestão Doméstica e Empresarial
          </Text>
        </View>
        )}

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Resumo Rápido</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Funcionários</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>R$ 45.2k</Text>
              <Text style={styles.statLabel}>Receita Mensal</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Tarefas Pendentes</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Notificações</Text>
            </View>
          </View>
        </View>

        {/* Menu Grid */}
        {selectedMenu !== 'finance' && (
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Funcionalidades</Text>
          <View style={styles.menuGrid}>
            {filteredMenuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  selectedMenu === item.id && styles.menuItemSelected
                ]}
                onPress={() => handleMenuPress(item.id)}
              >
                <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                  <Text style={styles.menuIconText}>{item.icon}</Text>
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        )}

        {/* Recent Activity */}
        {selectedMenu !== 'finance' && (
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Atividade Recente</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>✅</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Login realizado com sucesso</Text>
                <Text style={styles.activityTime}>Agora</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>📊</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Relatório mensal gerado</Text>
                <Text style={styles.activityTime}>Há 2 horas</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityIcon}>👥</Text>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Novo funcionário cadastrado</Text>
                <Text style={styles.activityTime}>Ontem</Text>
              </View>
            </View>
          </View>
        </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  userProfile: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItemSelected: {
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuIconText: {
    fontSize: 24,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'center',
  },
  menuDescription: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 14,
  },
  activitySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  activityList: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default DashboardScreen;

