

/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Componente React/React Native
 * 
 * @dependencies
 * - React, React Native
 * 
 * @usage
 * <ComponentName prop={value} />
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../../../context/AuthContext';

export type MenuItem = {
  id: string;
  title: string;
  icon?: string;
  screen: string;
  description?: string;
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
    cpf?: string;
  };
}

const defaultMenuItems: MenuItem[] = [
  { id: 'dashboard', title: 'Dashboard', screen: 'dashboard' },
  { id: 'employees', title: 'Funcionários', screen: 'employees' },
  { id: 'payments', title: 'Pagamentos', screen: 'payments' },
  { id: 'timeclock', title: 'Ponto', screen: 'timeclock' },
  { id: 'budget', title: 'Orçamentos', screen: 'budget' },
  { id: 'tasks', title: 'Tarefas', screen: 'tasks' },
  { id: 'notifications', title: 'Notificações', screen: 'notifications' },
  { id: 'profile', title: 'Perfil', screen: 'profile' },
  { id: 'settings', title: 'Configurações', screen: 'settings', adminOnly: true },
  { id: 'users', title: 'Usuários', screen: 'users', adminOnly: true },
  { id: 'finance', title: 'Financeiro', screen: 'finance' },
  { id: 'hr', title: 'RH', screen: 'hr' },
  { id: 'advancedTimeCard', title: 'Ponto Avançado', screen: 'advancedTimeCard' },
  { id: 'paymentIntegrations', title: 'Integrações de Pagamento', screen: 'paymentIntegrations' },
  { id: 'reports', title: 'Relatórios', screen: 'reports' },
];

const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose, onNavigate, onLogout, user }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const { user: authUser } = useAuth();
  const activeUser = user || authUser || undefined;
  const profile = (activeUser?.profile || '').toLowerCase();

  const iconMap: Record<string, string> = {
    dashboard: 'home-outline',
    employees: 'people-outline',
    payments: 'card-outline',
    timeclock: 'time-outline',
    budget: 'cash-outline',
    tasks: 'checkmark-done-outline',
    notifications: 'notifications-outline',
    profile: 'person-circle-outline',
    settings: 'settings-outline',
    users: 'shield-outline',
    finance: 'bar-chart-outline',
    hr: 'briefcase-outline',
    advancedTimeCard: 'timer-outline',
    paymentIntegrations: 'swap-horizontal-outline',
    reports: 'document-text-outline',
  };

  function getMenuByProfile(p: string): MenuItem[] {
    const all = defaultMenuItems;
    if (p === 'admin' || p === 'owner') return all;
    if (p === 'employer') return ['dashboard','reports','finance','payments','hr','tasks','notifications','profile'].map(id => all.find(i => i.id === id)!).filter(Boolean as any);
    if (p === 'employee') return ['tasks','timeclock','notifications','profile'].map(id => all.find(i => i.id === id)!).filter(Boolean as any);
    if (p === 'family') return ['tasks','notifications','profile'].map(id => all.find(i => i.id === id)!).filter(Boolean as any);
    if (p === 'partner' || p === 'subordinate') return ['dashboard','tasks','notifications','reports','finance','profile'].map(id => all.find(i => i.id === id)!).filter(Boolean as any);
    return all.filter(i => !i.adminOnly);
  }

  if (!visible && !isDesktop) return null;

  const handleLogout = () => {
    Alert.alert('Sair do Sistema', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: onLogout, style: 'destructive' },
    ]);
  };

  const handleMenuItemPress = (item: MenuItem) => {
    onNavigate(item.screen);
    if (!isDesktop) onClose();
  };

  const isAdmin = ['admin','owner'].includes(profile);
  const filteredMenuItems = getMenuByProfile(profile).filter((item) => (item.adminOnly ? !!isAdmin : true));
  const prefersLargeTouch = ['employee', 'family'].includes(profile);
  const iconSize = prefersLargeTouch ? 22 : 18;
  const itemPadding = prefersLargeTouch ? 20 : 16;
  const fontSize = prefersLargeTouch ? 18 : 16;

  return (
    <View style={[styles.overlay, isDesktop && { position: 'relative', backgroundColor: 'transparent' }] }>
      {!isDesktop && <TouchableOpacity style={styles.backdrop} onPress={onClose} />}
      <View style={[styles.menuContainer, isDesktop && { position: 'relative', height: '100%', width: 300 }] }>
        <View style={styles.header}>
          <Text style={styles.logo}>DOM v2</Text>
          {!isDesktop && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityLabel="Fechar menu">
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          )}
        </View>

        {activeUser && (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{activeUser.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.userProfile}>{activeUser.profile}</Text>
              <View style={[styles.profileBadge, isAdmin ? styles.badgeAdmin : styles.badgeDefault]}>
                <Text style={styles.badgeText}>{activeUser.profile?.toUpperCase()}</Text>
              </View>
            </View>
            {!!activeUser.cpf && <Text style={styles.userCpf}>{activeUser.cpf}</Text>}
          </View>
        )}

        <ScrollView style={styles.menuItems}>
          {filteredMenuItems.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.menuItem, { padding: itemPadding }]} onPress={() => handleMenuItemPress(item)}>
              <View style={[styles.menuItemIcon, prefersLargeTouch && { width: 44, height: 44, borderRadius: 22 }]}>
                <Icon name={iconMap[item.id] || 'ellipse-outline'} size={iconSize} color="#2d2d2d" />
              </View>
              <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemTitle, { fontSize }]}>{item.title || item.id}</Text>
                {!!item.description && <Text style={styles.menuItemDescription}>{item.description}</Text>}
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
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, flexDirection: 'row' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
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
  logo: { fontSize: 20, fontWeight: 'bold', color: '#212529' },
  closeButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#e9ecef', justifyContent: 'center', alignItems: 'center' },
  closeButtonText: { fontSize: 20, color: '#6c757d', fontWeight: 'bold', lineHeight: 20 },
  userInfo: { padding: 16, backgroundColor: '#e8f5e8', borderBottomWidth: 1, borderBottomColor: '#e9ecef' },
  userName: { fontSize: 16, fontWeight: '600', color: '#212529', marginBottom: 4 },
  userProfile: { fontSize: 14, color: '#495057', marginBottom: 2 },
  userCpf: { fontSize: 12, color: '#6c757d' },
  profileBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  badgeAdmin: { backgroundColor: '#ffe3e3' },
  badgeDefault: { backgroundColor: '#e9ecef' },
  badgeText: { fontSize: 10, color: '#495057', fontWeight: '700' },
  menuItems: { flex: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f8f9fa' },
  menuItemIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f8f9fa', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  menuItemIconText: { fontSize: 18 },
  menuItemContent: { flex: 1 },
  menuItemTitle: { fontSize: 16, fontWeight: '500', color: '#212529', marginBottom: 2 },
  menuItemDescription: { fontSize: 12, color: '#6c757d', lineHeight: 16 },
  adminBadge: { backgroundColor: '#dc3545', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  adminBadgeText: { fontSize: 10, color: '#ffffff', fontWeight: 'bold' },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#e9ecef', backgroundColor: '#f8f9fa' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#dc3545', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8 },
  logoutButtonText: { fontSize: 16, fontWeight: '600', color: '#ffffff' },
});

export default SideMenu;