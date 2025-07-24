/**
 * @fileoverview Menu lateral do DOM v2
 * @description Menu de navegação com todas as funcionalidades do sistema
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
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

export type MenuItem = {
  id: string;
  title: string;
  icon: string;
  screen: string;
  description: string;
  requiresAuth?: boolean;
  adminOnly?: boolean;
};

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  user?: {
    name: string;
    profile: string;
    cpf: string;
  };
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: '📊',
    screen: 'dashboard',
    description: 'Visão geral do sistema'
  },
  {
    id: 'tasks',
    title: 'Tarefas',
    icon: '📋',
    screen: 'tasks',
    description: 'Gerenciamento de tarefas domésticas'
  },
  {
    id: 'employees',
    title: 'Funcionários',
    icon: '👥',
    screen: 'employees',
    description: 'Gestão de empregados domésticos'
  },
  {
    id: 'payroll',
    title: 'Folha de Pagamento',
    icon: '💰',
    screen: 'payroll',
    description: 'Controle de salários e benefícios'
  },
  {
    id: 'budget',
    title: 'Orçamento',
    icon: '📈',
    screen: 'budget',
    description: 'Controle financeiro e despesas'
  },
  {
    id: 'purchases',
    title: 'Compras',
    icon: '🛒',
    screen: 'purchases',
    description: 'Gestão de compras e fornecedores'
  },
  {
    id: 'payments',
    title: 'Pagamentos',
    icon: '💳',
    screen: 'payments',
    description: 'Controle de pagamentos e contas'
  },
  {
    id: 'notifications',
    title: 'Notificações',
    icon: '🔔',
    screen: 'notifications',
    description: 'Central de notificações'
  },
  {
    id: 'profile',
    title: 'Perfil',
    icon: '👤',
    screen: 'profile',
    description: 'Configurações do usuário'
  },
  {
    id: 'settings',
    title: 'Configurações',
    icon: '⚙️',
    screen: 'settings',
    description: 'Configurações do sistema',
    adminOnly: true
  }
];

const SideMenu: React.FC<SideMenuProps> = ({
  visible,
  onClose,
  onNavigate,
  onLogout,
  user
}) => {
  if (!visible) return null;

  const handleLogout = () => {
    Alert.alert(
      'Sair do Sistema',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: onLogout, style: 'destructive' },
      ]
    );
  };

  const handleMenuItemPress = (item: MenuItem) => {
    onNavigate(item.screen);
    onClose();
  };

  const isAdmin = user?.profile === 'ADMIN' || user?.profile === 'OWNER';

  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly && !isAdmin) return false;
    return true;
  });

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.menuContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>🏠 DOM v2</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userProfile}>{user.profile}</Text>
            <Text style={styles.userCpf}>{user.cpf}</Text>
          </View>
        )}

        <ScrollView style={styles.menuItems}>
          {filteredMenuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item)}
            >
              <View style={styles.menuItemIcon}>
                <Text style={styles.menuItemIconText}>{item.icon}</Text>
              </View>
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
              </View>
              {item.adminOnly && (
                <View style={styles.adminBadge}>
                  <Text style={styles.adminBadgeText}>ADMIN</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonIcon}>🚪</Text>
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: 300,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  userInfo: {
    padding: 16,
    backgroundColor: '#e8f5e8',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  userProfile: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 2,
  },
  userCpf: {
    fontSize: 12,
    color: '#6c757d',
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemIconText: {
    fontSize: 18,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#6c757d',
    lineHeight: 16,
  },
  adminBadge: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  adminBadgeText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default SideMenu; 