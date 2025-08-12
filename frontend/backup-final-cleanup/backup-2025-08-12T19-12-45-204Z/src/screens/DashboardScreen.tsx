

/**
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */

}

// Aplicar validação de tipos
 {
  throw new TypeError('Dados devem ser um objeto válido');
}

/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Aplicar asserções críticas

if (!Object.keys(data) throw new Error('Assertion failed');.length > 0, 'Dados não podem estar vazios');

/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Aplicar validação
 {
  throw new Error('Dados de entrada inválidos');
}

/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description Dashboard Principal DOM v2
 */

import React, { useEffect, useMemo, useState } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView 
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import ReactLazy = React.lazy;
const BudgetScreen = ReactLazy(() => import('./budget/BudgetScreen'));
const PaymentScreen = ReactLazy(() => import('./payments/PaymentScreen'));
const TimeClockScreen = ReactLazy(() => import('./timeclock/TimeClockScreen'));
const EmployeesScreen = ReactLazy(() => import('./employees/EmployeesScreen'));
import { getMetrics } from '../services/api';
import AlertBanner from '../components/ui/AlertBanner';
const StatusBarChart = ReactLazy(() => import('../components/ui/StatusBarChart'));
const RpmLineChart = ReactLazy(() => import('../components/ui/RpmLineChart'));
import { Alert } from 'react-native';
import { useToast } from '../components/ui/Toast';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
}

const DashboardScreen: React.FC = () => {
  const { user, logout, sessionExpired, clearSessionExpired } = useAuth();
  const { show } = useToast();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{ totalRequests: number; latency?: { avgMs: number }; perStatus?: Record<string, number>; perPath?: Record<string, number> } | null>(null);
  const [throughput, setThroughput] = useState<Array<{ path: string; rpm: number }>>([]);
  const prevRef = React.useRef<{ at: number; perPath: Record<string, number> | undefined } | null>(null);
  const [rpmSeries, setRpmSeries] = useState<Array<{ at: number; rpm: number }>>([]);
  const [rpmWindowMinutes, setRpmWindowMinutes] = useState<1 | 5>(1);
  const statusSummary = useMemo(() => {
    const perStatus: Record<string, number> | undefined = (metrics as any)?.perStatus;
    const entries = perStatus ? Object.entries(perStatus) : [];
    const sum = (prefix: string) => entries.filter(([code]) => code.startsWith(prefix)).reduce((acc, [, v]) => acc + (v || 0), 0);
    return {
      s2xx: sum('2'),
      s4xx: sum('4'),
      s5xx: sum('5'),
    };
  }, [metrics]);
  const healthBadge = useMemo(() => {
    const totalErr = (statusSummary.s4xx || 0) + (statusSummary.s5xx || 0);
    if (totalErr === 0) return { label: 'OK', color: '#10b981' };
    if (statusSummary.s5xx > 0) return { label: 'Degradado', color: '#ef4444' };
    return { label: 'Atenção', color: '#f59e0b' };
  }, [statusSummary]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getMetrics();
        if (mounted) setMetrics({ totalRequests: res.data.totalRequests, latency: res.data.latency, perStatus: res.data.perStatus, perPath: res.data.perPath });
      } catch { /* TODO: Implement error handling */ } })();
    const id = setInterval(async () => {
      try {
        const res = await getMetrics();
        if (mounted) {
          setMetrics({ totalRequests: res.data.totalRequests, latency: res.data.latency, perStatus: res.data.perStatus, perPath: res.data.perPath });
          // Throughput: calcula rpm por rota (delta/segundos*60)
          const now = Date.now();
          const prev = prevRef.current;
          const currentPerPath: Record<string, number> = res.data.perPath || { /* TODO: Implement error handling */ } ;
          if (prev && prev.perPath) {
            const elapsedSec = Math.max(1, Math.round((now - prev.at) / 1000));
            const rpms: Array<{ path: string; rpm: number }> = Object.keys(currentPerPath).map((p) => {
              const delta = Math.max(0, (currentPerPath[p] || 0) - (prev.perPath![p] || 0));
              const rpm = Math.round((delta / elapsedSec) * 60);
              return { path: p || '/', rpm };
            });
            rpms.sort((a, b) => b.rpm - a.rpm);
            setThroughput(rpms.slice(0, 5));
            const totalDelta = Object.keys(currentPerPath).reduce((acc, p) => acc + Math.max(0, (currentPerPath[p] || 0) - (prev.perPath![p] || 0)), 0);
            const rpmTotal = Math.round((totalDelta / elapsedSec) * 60);
            setRpmSeries((s) => {
              const next = [...s, { at: now, rpm: rpmTotal }];
              const maxPoints = (rpmWindowMinutes === 5 ? 5 : 1) * 12; // 5s amostragem
              return next.slice(-maxPoints);
            });
          }
          prevRef.current = { at: now, perPath: { ...currentPerPath } };
        }
      } catch { /* TODO: Implement error handling */ } }, 5000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  const refreshNow = async () => {
    try {
      const res = await getMetrics();
      setMetrics({ totalRequests: res.data.totalRequests, latency: res.data.latency, perStatus: res.data.perStatus, perPath: res.data.perPath });
      const now = Date.now();
      const prev = prevRef.current;
      const currentPerPath: Record<string, number> = res.data.perPath || { /* TODO: Implement error handling */ } ;
      if (prev && prev.perPath) {
        const elapsedSec = Math.max(1, Math.round((now - prev.at) / 1000));
        const rpms: Array<{ path: string; rpm: number }> = Object.keys(currentPerPath).map((p) => {
          const delta = Math.max(0, (currentPerPath[p] || 0) - (prev.perPath![p] || 0));
          const rpm = Math.round((delta / elapsedSec) * 60);
          return { path: p || '/', rpm };
        });
        rpms.sort((a, b) => b.rpm - a.rpm);
        setThroughput(rpms.slice(0, 5));
        const totalDelta = Object.keys(currentPerPath).reduce((acc, p) => acc + Math.max(0, (currentPerPath[p] || 0) - (prev.perPath![p] || 0)), 0);
        const rpmTotal = Math.round((totalDelta / elapsedSec) * 60);
        setRpmSeries((s) => {
          const next = [...s, { at: now, rpm: rpmTotal }];
          return next.slice(-12);
        });
      }
      prevRef.current = { at: now, perPath: { ...currentPerPath } };
      show('Métricas atualizadas', 'success');
    } catch {
      show('Falha ao atualizar métricas', 'error');
    }
  };

  useEffect(() => {
    const handler = () => {
      show('Sessão expirada. Faça login novamente.', 'warning');
    };
    window.addEventListener('session-expired' as any, handler as any);
    return () => window.removeEventListener('session-expired' as any, handler as any);
  }, []);

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
      id: 'timeclock',
      title: 'Ponto',
      icon: '⏱️',
      color: '#22c55e',
      description: 'Batidas de ponto'
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
    employee: ['dashboard', 'finance', 'tasks', 'notifications', 'reports', 'settings'],
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

      {/* Banner de Sessão Expirada */}
      {sessionExpired && (
        <AlertBanner
          type="warning"
          message="Sua sessão expirou. Faça login novamente."
          actionLabel="Fazer login"
          onAction={() => { clearSessionExpired(); logout(); }}
          onClose={() => clearSessionExpired()}
        />
      )}

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
                <React.Suspense fallback={<Text>Carregando...</Text>}>
                  <BudgetScreen />
                </React.Suspense>
              </View>
              <View>
                <Text style={styles.sectionTitle}>Pagamentos</Text>
                <React.Suspense fallback={<Text>Carregando...</Text>}>
                  <PaymentScreen />
                </React.Suspense>
              </View>
            </View>
          </View>
        )}

        {/* TimeClock Section (inline) */}
        {selectedMenu === 'timeclock' && (
          <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Ponto</Text>
              <TouchableOpacity style={styles.logoutButton} onPress={() => setSelectedMenu(null)}>
                <Text style={styles.logoutText}>Voltar</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.sectionTitle}>Registros</Text>
              <React.Suspense fallback={<Text>Carregando...</Text>}>
                <TimeClockScreen />
              </React.Suspense>
            </View>
          </View>
        )}

        {/* Welcome Section */}
        {selectedMenu === null && (
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bem-vindo ao DOM v2</Text>
          <Text style={styles.welcomeSubtitle}>
            Sistema de Gestão Doméstica e Empresarial
          </Text>
        </View>
        )}

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.sectionTitle}>Resumo Rápido</Text>
              <View style={{ backgroundColor: healthBadge.color, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                <Text style={{ color: '#fff', fontWeight: '600', fontSize: 12 }}>{healthBadge.label}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ color: '#64748b', fontSize: 12 }}>Janela:</Text>
                <TouchableOpacity onPress={() => setRpmWindowMinutes(1)} style={{ backgroundColor: rpmWindowMinutes===1?'#6366f1':'#e2e8f0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                  <Text style={{ color: rpmWindowMinutes===1?'#fff':'#0f172a', fontSize: 12 }}>1 min</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRpmWindowMinutes(5)} style={{ backgroundColor: rpmWindowMinutes===5?'#6366f1':'#e2e8f0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
                  <Text style={{ color: rpmWindowMinutes===5?'#fff':'#0f172a', fontSize: 12 }}>5 min</Text>
                </TouchableOpacity>
                <Text style={{ color: '#64748b', fontSize: 12 }}>Atualizado: {new Date().toLocaleTimeString()}</Text>
              </View>
              <TouchableOpacity style={[styles.logoutButton, { backgroundColor: '#10b981' }]} onPress={refreshNow}>
                <Text style={styles.logoutText}>Atualizar</Text>
              </TouchableOpacity>
            </View>
          </View>
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
              <Text style={styles.statNumber}>{metrics?.totalRequests ?? '—'}</Text>
              <Text style={styles.statLabel}>Req. API (total)</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{metrics?.latency?.avgMs ?? '—'}</Text>
              <Text style={styles.statLabel}>Latência média (ms)</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{statusSummary.s2xx ?? '—'}</Text>
              <Text style={styles.statLabel}>Respostas 2xx</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{statusSummary.s4xx ?? '—'}</Text>
              <Text style={styles.statLabel}>Erros 4xx</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{statusSummary.s5xx ?? '—'}</Text>
              <Text style={styles.statLabel}>Erros 5xx</Text>
            </View>
          </View>
          <React.Suspense fallback={<Text>Carregando gráfico...</Text>}>
            <StatusBarChart s2xx={statusSummary.s2xx} s4xx={statusSummary.s4xx} s5xx={statusSummary.s5xx} />
          </React.Suspense>
          {rpmSeries.length > 0 ? (
            <React.Suspense fallback={<Text>Carregando série...</Text>}>
              <RpmLineChart points={rpmSeries} />
            </React.Suspense>
          ) : null}
          {!!throughput.length && (
            <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 12, marginTop: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1e293b', marginBottom: 8 }}>Throughput por rota (rpm)</Text>
              {throughput.map((t) => (
                <View key={t.path} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 }}>
                  <Text style={{ color: '#475569', maxWidth: '70%' }}>{t.path}</Text>
                  <Text style={{ color: '#0f172a', fontWeight: '600' }}>{t.rpm}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Menu Grid */}
        {selectedMenu === null && (
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
        {selectedMenu === null && (
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

        {/* Employees Section (inline) */}
        {selectedMenu === 'employees' && (
          <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Funcionários</Text>
              <TouchableOpacity style={styles.logoutButton} onPress={() => setSelectedMenu(null)}>
                <Text style={styles.logoutText}>Voltar</Text>
              </TouchableOpacity>
            </View>
            <React.Suspense fallback={<Text>Carregando...</Text>}>
              <EmployeesScreen />
            </React.Suspense>
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

