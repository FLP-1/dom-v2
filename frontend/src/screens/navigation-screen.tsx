







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
  // Implementar logging, notificação, etc.
}
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    Pressable,
    View,
} from 'react-native';

interface NavigationScreenProps {
  onNavigateToScreen: (screenName: string) => void;
  onBack: () => void;
}

interface ScreenInfo {
  name: string;
  path: string;
  description: string;
  category: string;
  status: 'current' | 'backup' | 'premium';
}

export const NavigationScreen: React.FC<NavigationScreenProps> = ({
  onNavigateToScreen,
  onBack
}) => {
  const allScreens: ScreenInfo[] = [
    // TELAS ATUAIS
    {
      name: 'SplashScreen',
      path: 'frontend/src/components/SplashScreen.tsx',
      description: 'Tela de carregamento inicial',
      category: 'Atual',
      status: 'current'
    },
    {
      name: 'Login Screen (Atual)',
      path: 'frontend/src/screens/login-screen.tsx',
      description: 'Tela de login simplificada',
      category: 'Atual',
      status: 'current'
    },
    {
      name: 'Dashboard Screen (Atual)',
      path: 'frontend/src/screens/dashboard-screen.tsx',
      description: 'Dashboard principal simplificado',
      category: 'Atual',
      status: 'current'
    },

    // TELAS DO BACKUP
    {
      name: 'Login Screen (Backup)',
      path: 'frontend-backup/src/screens/login-screen.tsx',
      description: 'Tela de login original do backup',
      category: 'Backup',
      status: 'backup'
    },
    {
      name: 'Dashboard Screen (Backup)',
      path: 'frontend-backup/src/screens/dashboard-screen.tsx',
      description: 'Dashboard original do backup',
      category: 'Backup',
      status: 'backup'
    },
    {
      name: 'Simple Dashboard (Backup)',
      path: 'frontend-backup/src/screens/simple-dashboard.tsx',
      description: 'Dashboard simples do backup',
      category: 'Backup',
      status: 'backup'
    },
    {
      name: 'Tasks Screen (Backup)',
      path: 'frontend-backup/src/screens/tasks-screen.tsx',
      description: 'Tela de tarefas do backup',
      category: 'Backup',
      status: 'backup'
    },
    {
      name: 'Employees Screen (Backup)',
      path: 'frontend-backup/src/screens/employees-screen.tsx',
      description: 'Tela de funcionários do backup',
      category: 'Backup',
      status: 'backup'
    },
    {
      name: 'Purchases Screen (Backup)',
      path: 'frontend-backup/src/screens/purchases-screen.tsx',
      description: 'Tela de compras do backup',
      category: 'Backup',
      status: 'backup'
    },
    {
      name: 'Payments Screen (Backup)',
      path: 'frontend-backup/src/screens/payments-screen.tsx',
      description: 'Tela de pagamentos do backup',
      category: 'Backup',
      status: 'backup'
    },
    {
      name: 'Notifications Screen (Backup)',
      path: 'frontend-backup/src/screens/notifications-screen.tsx',
      description: 'Tela de notificações do backup',
      category: 'Backup',
      status: 'backup'
    },

    // TELAS PREMIUM
    {
      name: 'Premium Login Screen',
      path: 'frontend/src/screens/PremiumLoginScreen.tsx',
      description: 'Tela de login premium',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Ultra Premium Login Screen',
      path: 'frontend/src/screens/UltraPremiumLoginScreen.tsx',
      description: 'Tela de login ultra premium',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Admin Dashboard',
      path: 'frontend/src/screens/AdminDashboard.tsx',
      description: 'Dashboard para administradores',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Family Dashboard',
      path: 'frontend/src/screens/FamilyDashboard.tsx',
      description: 'Dashboard para família',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Employee Dashboard',
      path: 'frontend/src/screens/EmployeeDashboard.tsx',
      description: 'Dashboard para funcionários',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Employer Dashboard',
      path: 'frontend/src/screens/EmployerDashboard.tsx',
      description: 'Dashboard para empregadores',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Tasks Screen (Premium)',
      path: 'frontend/src/screens/tasks-screen.tsx',
      description: 'Tela de tarefas premium',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Employees Screen (Premium)',
      path: 'frontend/src/screens/employees-screen.tsx',
      description: 'Tela de funcionários premium',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Purchases Screen (Premium)',
      path: 'frontend/src/screens/purchases-screen.tsx',
      description: 'Tela de compras premium',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Payments Screen (Premium)',
      path: 'frontend/src/screens/payments-screen.tsx',
      description: 'Tela de pagamentos premium',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Notifications Screen (Premium)',
      path: 'frontend/src/screens/notifications-screen.tsx',
      description: 'Tela de notificações premium',
      category: 'Premium',
      status: 'premium'
    },
    {
      name: 'Simple Dashboard (Premium)',
      path: 'frontend/src/screens/simple-dashboard.tsx',
      description: 'Dashboard simples premium',
      category: 'Premium',
      status: 'premium'
    }
  ];

  const handleScreenSelect = (screen: ScreenInfo) => {
    Alert.alert(
      'Navegar para Tela',
      `Deseja navegar para:\n\n${screen.name}\n\n${screen.description}\n\nCaminho: ${screen.path}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Navegar', 
          onPress: () => onNavigateToScreen(screen.name),
          style: 'default'
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return '#28a745';
      case 'backup': return '#ffc107';
      case 'premium': return '#007bff';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'current': return 'ATUAL';
      case 'backup': return 'BACKUP';
      case 'premium': return 'PREMIUM';
      default: return 'N/A';
    }
  };

  const groupedScreens = allScreens.reduce((acc, screen) => {
    if (!acc[screen.category]) {
      acc[screen.category] = [];
    }
    acc[screen.category].push(screen);
    return acc;
  }, {} as Record<string, ScreenInfo[]>);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Navegação Completa</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🎯 Navegador de Telas DOM v2</Text>
          <Text style={styles.infoText}>
            Selecione qualquer tela para visualizar e testar. 
            As telas estão organizadas por categoria:
          </Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#28a745' }]} />
              <Text style={styles.legendText}>Atual - Em uso</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#ffc107' }]} />
              <Text style={styles.legendText}>Backup - Versões anteriores</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#007bff' }]} />
              <Text style={styles.legendText}>Premium - Funcionalidades avançadas</Text>
            </View>
          </View>
        </View>

        {Object.entries(groupedScreens).map(([category, screens]) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category} ({screens.length} telas)</Text>
            
            {screens.map((screen, index) => (
              <Pressable
                key={`${screen.name}-${index}`}
                style={styles.screenButton}
                onPress={() => handleScreenSelect(screen)}
              >
                <View style={styles.screenButtonContent}>
                  <View style={styles.screenButtonHeader}>
                    <Text style={styles.screenName}>{screen.name}</Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(screen.status) }
                    ]}>
                      <Text style={styles.statusText}>{getStatusText(screen.status)}</Text>
                    </View>
                  </View>
                  <Text style={styles.screenDescription}>{screen.description}</Text>
                  <Text style={styles.screenPath}>{screen.path}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Total de telas disponíveis: {allScreens.length}
          </Text>
          <Text style={styles.footerText}>
            Use esta tela para testar e validar layouts
          </Text>
        </View>
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
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#6c757d',
    borderRadius: 6,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSpacer: {
    width: 80,
  },
  content: {
    flex: 1,
    padding: 20,
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
    marginBottom: 16,
    lineHeight: 20,
  },
  legend: {
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  screenButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  screenButtonContent: {
    padding: 16,
  },
  screenButtonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  screenName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  screenDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  screenPath: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'monospace',
  },
  footer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
  },
}); 


Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */