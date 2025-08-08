
/**
 * 
 * @alternatives
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 */


/**
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 */


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


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}


function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}


function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}


function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}


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
}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}:`, error.message);
}
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
    screen: 'dashboard',
  },
  {
    id: 'tasks',
    title: 'Tarefas',
    screen: 'tasks',
  },
  {
    id: 'employees',
    screen: 'employees',
  },
  {
    id: 'payroll',
    title: 'Folha de Pagamento',
    screen: 'payroll',
  },
  {
    id: 'budget',
    screen: 'budget',
    description: 'Controle financeiro e despesas'
  },
  {
    id: 'purchases',
    title: 'Compras',
    screen: 'purchases',
  },
  {
    id: 'payments',
    title: 'Pagamentos',
    screen: 'payments',
    description: 'Controle de pagamentos e contas'
  },
  {
    id: 'notifications',
    screen: 'notifications',
  },
  {
    id: 'profile',
    title: 'Perfil',
    screen: 'profile',
  },
  {
    id: 'settings',
    screen: 'settings',
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
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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


 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */