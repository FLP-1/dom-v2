/**
 * @fileoverview Implementador de Estrutura Mobile - DOM v2
 * @directory scripts
 * @description Script para implementar estrutura mobile React Native real
 * @created 2025-07-26
 * @author DOM Team v2
 * @directives Pensamento Crítico, Implementação Rigorosa, Mobile-First
 */

const fs = require('fs');
const path = require('path');

class ImplementadorEstruturaMobile {
  constructor() {
    this.nome = "🏗️ Implementador de Estrutura Mobile";
    this.versao = "1.0.0";
    this.status = "ATIVO";
    
    this.frontendPath = path.join(__dirname, '..', 'frontend');
    this.srcPath = path.join(this.frontendPath, 'src');
  }

  async criarEstruturaPastas() {
    console.log("📁 Criando estrutura de pastas mobile...");
    
    const estrutura = {
      screens: {
        employer: [
          "Dashboard.tsx",
          "EmployeeManagement.tsx",
          "TaskManagement.tsx", 
          "PaymentControl.tsx",
          "Reports.tsx"
        ],
        employee: [
          "Dashboard.tsx",
          "TaskList.tsx",
          "Calendar.tsx",
          "TimeTracking.tsx",
          "Profile.tsx"
        ],
        family: [
          "Dashboard.tsx",
          "Chat.tsx",
          "Notifications.tsx",
          "Settings.tsx",
          "Help.tsx"
        ]
      },
      components: {
        shared: [
          "Header.tsx",
          "BottomTabBar.tsx",
          "LoadingSpinner.tsx",
          "ErrorBoundary.tsx",
          "Modal.tsx"
        ],
        forms: [
          "Input.tsx",
          "Button.tsx",
          "Select.tsx",
          "DatePicker.tsx",
          "Switch.tsx"
        ],
        cards: [
          "TaskCard.tsx",
          "EmployeeCard.tsx",
          "MetricCard.tsx",
          "NotificationCard.tsx"
        ]
      },
      hooks: [
        "useAuth.ts",
        "useTasks.ts",
        "useEmployees.ts",
        "useNotifications.ts",
        "useTheme.ts"
      ],
      services: [
        "api.ts",
        "storage.ts",
        "notifications.ts",
        "geolocation.ts"
      ],
      utils: [
        "validation.ts",
        "formatting.ts",
        "constants.ts",
        "permissions.ts"
      ],
      navigation: [
        "AppNavigator.tsx",
        "EmployerNavigator.tsx",
        "EmployeeNavigator.tsx",
        "FamilyNavigator.tsx"
      ],
      context: [
        "AuthContext.tsx",
        "TaskContext.tsx",
        "EmployeeContext.tsx",
        "ThemeContext.tsx"
      ]
    };

    // Criar pastas principais
    const pastas = [
      'screens/employer',
      'screens/employee', 
      'screens/family',
      'components/shared',
      'components/forms',
      'components/cards',
      'hooks',
      'services',
      'utils',
      'navigation',
      'context'
    ];

    for (const pasta of pastas) {
      const pastaPath = path.join(this.srcPath, pasta);
      if (!fs.existsSync(pastaPath)) {
        fs.mkdirSync(pastaPath, { recursive: true });
        console.log(`✅ Criada pasta: ${pasta}`);
      }
    }

    return estrutura;
  }

  async criarComponenteBase(nome, tipo, conteudo) {
    const pastaPath = path.join(this.srcPath, tipo);
    const arquivoPath = path.join(pastaPath, nome);
    
    if (!fs.existsSync(arquivoPath)) {
      fs.writeFileSync(arquivoPath, conteudo);
      console.log(`✅ Criado: ${tipo}/${nome}`);
      return true;
    }
    return false;
  }

  async implementarComponentesBase() {
    console.log("🧩 Implementando componentes base...");
    
    const componentes = {
      'components/shared/Header.tsx': `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onBackPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuPress, onBackPress }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={[styles.title, { color: colors.surface }]}>{title}</Text>
      {onMenuPress && (
        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  menuButton: {
    padding: 8,
  },
  menuText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});`,

      'components/forms/Button.tsx': `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
}) => {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = [styles.button, fullWidth && styles.fullWidth];
    
    switch (variant) {
      case 'primary':
        return [...baseStyle, { backgroundColor: colors.primary }];
      case 'secondary':
        return [...baseStyle, { backgroundColor: colors.secondary }];
      case 'outline':
        return [...baseStyle, { 
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primary,
        }];
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text];
    
    switch (variant) {
      case 'outline':
        return [...baseStyle, { color: colors.primary }];
      default:
        return [...baseStyle, { color: colors.surface }];
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.surface} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});`,

      'components/cards/TaskCard.tsx': `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
}

interface TaskCardProps {
  task: Task;
  onPress: (task: Task) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onStatusChange }) => {
  const { colors } = useTheme();

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'in_progress':
        return colors.primary;
      case 'completed':
        return colors.success;
      default:
        return colors.text.secondary;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
      default:
        return colors.text.secondary;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface }]}
      onPress={() => onPress(task)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={2}>
          {task.title}
        </Text>
        <View style={[styles.priority, { backgroundColor: getPriorityColor(task.priority) }]}>
          <Text style={styles.priorityText}>{task.priority.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={[styles.description, { color: colors.text.secondary }]} numberOfLines={2}>
        {task.description}
      </Text>
      
      <View style={styles.footer}>
        <Text style={[styles.assignedTo, { color: colors.text.secondary }]}>
          👤 {task.assignedTo}
        </Text>
        <Text style={[styles.dueDate, { color: colors.text.secondary }]}>
          📅 {task.dueDate}
        </Text>
      </View>
      
      <View style={[styles.status, { backgroundColor: getStatusColor(task.status) }]}>
        <Text style={styles.statusText}>{task.status.replace('_', ' ').toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  priority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  assignedTo: {
    fontSize: 12,
  },
  dueDate: {
    fontSize: 12,
  },
  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});`,

      'hooks/useTheme.ts': `import React, { createContext, useContext, useState } from 'react';

interface Colors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  error: string;
  warning: string;
  success: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
}

interface Theme {
  colors: Colors;
  isDark: boolean;
  toggleTheme: () => void;
}

const lightColors: Colors = {
  primary: '#1A237E',
  secondary: '#00C853',
  accent: '#FF6F00',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  error: '#D32F2F',
  warning: '#F57C00',
  success: '#388E3C',
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
  },
};

const darkColors: Colors = {
  primary: '#3F51B5',
  secondary: '#4CAF50',
  accent: '#FF9800',
  background: '#121212',
  surface: '#1E1E1E',
  error: '#F44336',
  warning: '#FF9800',
  success: '#4CAF50',
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B0B0',
    disabled: '#666666',
  },
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme: Theme = {
    colors: isDark ? darkColors : lightColors,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};`,

      'utils/constants.ts': `export const APP_CONSTANTS = {
  APP_NAME: 'DOM v2',
  VERSION: '2.0.0',
  BUILD_NUMBER: '1',
} as const;

export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:3001/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  TASKS: {
    LIST: '/tasks',
    CREATE: '/tasks',
    UPDATE: '/tasks/:id',
    DELETE: '/tasks/:id',
  },
  EMPLOYEES: {
    LIST: '/employees',
    CREATE: '/employees',
    UPDATE: '/employees/:id',
    DELETE: '/employees/:id',
  },
  PAYMENTS: {
    LIST: '/payments',
    CREATE: '/payments',
    UPDATE: '/payments/:id',
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME_PREFERENCE: 'theme_preference',
  LANGUAGE: 'language',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  UNAUTHORIZED: 'Sessão expirada. Faça login novamente.',
  VALIDATION_ERROR: 'Dados inválidos. Verifique as informações.',
  SERVER_ERROR: 'Erro no servidor. Tente novamente.',
  UNKNOWN_ERROR: 'Erro desconhecido. Tente novamente.',
} as const;

export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Tarefa criada com sucesso!',
  TASK_UPDATED: 'Tarefa atualizada com sucesso!',
  TASK_DELETED: 'Tarefa removida com sucesso!',
  EMPLOYEE_CREATED: 'Funcionário adicionado com sucesso!',
  EMPLOYEE_UPDATED: 'Funcionário atualizado com sucesso!',
  PAYMENT_CREATED: 'Pagamento registrado com sucesso!',
} as const;`,

      'services/api.ts': `import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS, STORAGE_KEYS, ERROR_MESSAGES } from '../utils/constants';

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface ApiError {
  message: string;
  status: number;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_ENDPOINTS.BASE_URL;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const token = await this.getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        message: errorData.message || ERROR_MESSAGES.SERVER_ERROR,
        status: response.status,
      } as ApiError;
    }

    return await response.json();
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(this.baseURL + endpoint, {
        method: 'GET',
        headers,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      throw {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        status: 0,
      } as ApiError;
    }
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(this.baseURL + endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      throw {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        status: 0,
      } as ApiError;
    }
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(this.baseURL + endpoint, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      throw {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        status: 0,
      } as ApiError;
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(this.baseURL + endpoint, {
        method: 'DELETE',
        headers,
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      throw {
        message: ERROR_MESSAGES.NETWORK_ERROR,
        status: 0,
      } as ApiError;
    }
  }
}

export const apiService = new ApiService();
export default apiService;`
    };

    let criados = 0;
    for (const [caminho, conteudo] of Object.entries(componentes)) {
      const criado = await this.criarComponenteBase(path.basename(caminho), path.dirname(caminho), conteudo);
      if (criado) criados++;
    }

    console.log(`✅ Criados ${criados} componentes base`);
    return criados;
  }

  async implementarTelasMobile() {
    console.log("📱 Implementando telas mobile...");
    
    const telas = {
      'screens/employer/Dashboard.tsx': `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/shared/Header';
import { Button } from '../../components/forms/Button';

export const EmployerDashboard: React.FC = () => {
  const { colors } = useTheme();

  const metrics = [
    { label: 'Tarefas Ativas', value: '15', icon: '📋' },
    { label: 'Tarefas Concluídas', value: '8', icon: '✅' },
    { label: 'Funcionários', value: '3', icon: '👥' },
    { label: 'Gastos do Mês', value: 'R$ 2.450', icon: '💰' },
  ];

  const actions = [
    { title: 'Nova Tarefa', description: 'Criar uma nova tarefa', icon: '➕' },
    { title: 'Gerenciar Funcionários', description: 'Adicionar ou editar funcionários', icon: '👥' },
    { title: 'Relatório de Produtividade', description: 'Visualizar relatórios detalhados', icon: '📊' },
    { title: 'Controle de Pagamentos', description: 'Gerenciar pagamentos', icon: '💰' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Dashboard Executivo" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Métricas Principais
        </Text>
        
        <View style={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <View key={index} style={[styles.metricCard, { backgroundColor: colors.surface }]}>
              <Text style={styles.metricIcon}>{metric.icon}</Text>
              <Text style={[styles.metricValue, { color: colors.primary }]}>
                {metric.value}
              </Text>
              <Text style={[styles.metricLabel, { color: colors.text.secondary }]}>
                {metric.label}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Ações Rápidas
        </Text>
        
        <View style={styles.actionsGrid}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { backgroundColor: colors.surface }]}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={[styles.actionTitle, { color: colors.text.primary }]}>
                {action.title}
              </Text>
              <Text style={[styles.actionDescription, { color: colors.text.secondary }]}>
                {action.description}
              </Text>
              <Button
                title="Acessar"
                onPress={() => {}}
                variant="primary"
                fullWidth
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  metricIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  actionsGrid: {
    gap: 16,
  },
  actionCard: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
});`,

      'screens/employee/Dashboard.tsx': `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/shared/Header';
import { TaskCard } from '../../components/cards/TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
}

export const EmployeeDashboard: React.FC = () => {
  const { colors } = useTheme();

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Limpeza da Cozinha',
      description: 'Limpar fogão, geladeira e pia da cozinha',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2025-07-27',
      assignedTo: 'Maria Silva',
    },
    {
      id: '2',
      title: 'Lavar Roupas',
      description: 'Lavar e passar roupas da família',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-07-28',
      assignedTo: 'Maria Silva',
    },
    {
      id: '3',
      title: 'Organizar Quartos',
      description: 'Organizar e arrumar os quartos',
      status: 'completed',
      priority: 'low',
      dueDate: '2025-07-26',
      assignedTo: 'Maria Silva',
    },
  ];

  const handleTaskPress = (task: Task) => {
    console.log('Tarefa selecionada:', task);
  };

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    console.log('Mudança de status:', taskId, status);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Meu Dashboard" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.welcomeCard, { backgroundColor: colors.primary }]}>
          <Text style={[styles.welcomeTitle, { color: colors.surface }]}>
            Olá, Maria Silva! 👋
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.surface }]}>
            Você tem {mockTasks.filter(t => t.status === 'pending').length} tarefas pendentes
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Minhas Tarefas
        </Text>
        
        {mockTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onPress={handleTaskPress}
            onStatusChange={handleStatusChange}
          />
        ))}

        <TouchableOpacity
          style={[styles.addTaskButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.addTaskText, { color: colors.surface }]}>
            ➕ Nova Tarefa
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  welcomeCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  addTaskButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addTaskText: {
    fontSize: 16,
    fontWeight: '600',
  },
});`,

      'screens/family/Dashboard.tsx': `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Header } from '../../components/shared/Header';

export const FamilyDashboard: React.FC = () => {
  const { colors } = useTheme();

  const notifications = [
    {
      id: '1',
      title: 'Tarefa Concluída',
      message: 'Maria concluiu a limpeza da cozinha',
      time: '2 min atrás',
      type: 'success',
    },
    {
      id: '2',
      title: 'Nova Tarefa',
      message: 'Nova tarefa criada: Organizar quartos',
      time: '15 min atrás',
      type: 'info',
    },
    {
      id: '3',
      title: 'Pagamento Realizado',
      message: 'Pagamento de R$ 500 realizado para Maria',
      time: '1 hora atrás',
      type: 'success',
    },
  ];

  const quickActions = [
    { title: 'Chat com Funcionários', icon: '💬', color: '#4CAF50' },
    { title: 'Ver Tarefas', icon: '📋', color: '#2196F3' },
    { title: 'Configurações', icon: '⚙️', color: '#FF9800' },
    { title: 'Ajuda', icon: '❓', color: '#9C27B0' },
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Família Dashboard" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.welcomeCard, { backgroundColor: colors.primary }]}>
          <Text style={[styles.welcomeTitle, { color: colors.surface }]}>
            Bem-vindo à sua casa! 🏠
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.surface }]}>
            Tudo organizado e funcionando perfeitamente
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Notificações Recentes
        </Text>
        
        {notifications.map((notification) => (
          <View
            key={notification.id}
            style={[styles.notificationCard, { backgroundColor: colors.surface }]}
          >
            <View style={styles.notificationHeader}>
              <Text style={[styles.notificationTitle, { color: colors.text.primary }]}>
                {notification.title}
              </Text>
              <Text style={[styles.notificationTime, { color: colors.text.secondary }]}>
                {notification.time}
              </Text>
            </View>
            <Text style={[styles.notificationMessage, { color: colors.text.secondary }]}>
              {notification.message}
            </Text>
            <View
              style={[
                styles.notificationIndicator,
                { backgroundColor: getNotificationColor(notification.type) },
              ]}
            />
          </View>
        ))}

        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          Ações Rápidas
        </Text>
        
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, { backgroundColor: colors.surface }]}
              activeOpacity={0.8}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Text style={styles.actionIconText}>{action.icon}</Text>
              </View>
              <Text style={[styles.actionTitle, { color: colors.text.primary }]}>
                {action.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  welcomeCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  notificationCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  notificationTime: {
    fontSize: 12,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  notificationIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});`
    };

    let criadas = 0;
    for (const [caminho, conteudo] of Object.entries(telas)) {
      const criada = await this.criarComponenteBase(path.basename(caminho), path.dirname(caminho), conteudo);
      if (criada) criadas++;
    }

    console.log(`✅ Criadas ${criadas} telas mobile`);
    return criadas;
  }

  async executar() {
    console.log(`🚀 ${this.nome} v${this.versao}`);
    console.log("=" .repeat(60));
    
    try {
      console.log("🎯 IMPLEMENTANDO ESTRUTURA MOBILE REACT NATIVE");
      console.log("=" .repeat(60));
      
      const estrutura = await this.criarEstruturaPastas();
      const componentes = await this.implementarComponentesBase();
      const telas = await this.implementarTelasMobile();
      
      console.log("\n✅ IMPLEMENTAÇÃO CONCLUÍDA!");
      console.log("=" .repeat(60));
      console.log(`📁 Estrutura de pastas criada`);
      console.log(`🧩 ${componentes} componentes base implementados`);
      console.log(`📱 ${telas} telas mobile implementadas`);
      
      console.log("\n🎯 PRÓXIMOS PASSOS:");
      console.log("1. Configurar React Navigation");
      console.log("2. Implementar Context API");
      console.log("3. Configurar emulador Android");
      console.log("4. Testar telas no dispositivo");
      console.log("5. Implementar funcionalidades específicas");
      
      return {
        estrutura,
        componentes,
        telas
      };
      
    } catch (error) {
      console.error("❌ Erro na implementação:", error.message);
      throw error;
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const implementador = new ImplementadorEstruturaMobile();
  implementador.executar()
    .then(() => {
      console.log("\n✅ Estrutura mobile implementada com sucesso!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Erro na implementação:", error);
      process.exit(1);
    });
}

module.exports = ImplementadorEstruturaMobile; 