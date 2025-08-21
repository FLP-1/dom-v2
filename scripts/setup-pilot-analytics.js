
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
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
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */

/**
 * @fileoverview Setup Pilot Analytics - Configuração completa de analytics do piloto
 * @description Sistema completo de métricas, KPIs e monitoramento para o piloto regional
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-08-10
 * 
 * @usage
 * node scripts/setup-pilot-analytics.js --region=sudeste --env=production
 * 
 * @features
 * - Dashboard de KPIs em tempo real
 * - Métricas de negócio e técnicas
 * - Alertas automáticos por thresholds
 * - Relatórios automáticos periódicos
 * - Análise de coortes e funis
 * - Tracking de eventos customizados
 * 
 * @see
 * - docs/analytics/pilot-analytics-guide.md
 * - docs/directives/diretivas-pensamento-critico.md
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const execAsync = promisify(require('child_process').exec);

// Validação de entrada de dados
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Sistema de logging estruturado
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    script: 'setup-pilot-analytics'
  };
  
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // Salvar log
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'pilot-analytics.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Tratamento de erros centralizado
function handleError(error, context) {
  logStructured('error', `${context}: ${error.message}`, { error: error.stack });
}

// Asserções de validação crítica
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Configuração de Analytics
const ANALYTICS_CONFIG = {
  pilot: {
    region: 'sudeste',
    startDate: '2025-08-10',
    duration: 12, // semanas
    targetFamilies: 500,
    targetRevenue: 45000 // R$
  },
  
  kpis: {
    acquisition: {
      totalUsers: { target: 2500, critical: 1500 },
      familiesRegistered: { target: 500, critical: 300 },
      conversionRate: { target: 0.20, critical: 0.12 }, // 20%
      cac: { target: 120, critical: 200 }, // R$ Customer Acquisition Cost
      roas: { target: 3.0, critical: 2.0 } // Return on Ad Spend
    },
    
    engagement: {
      dau: { target: 0.75, critical: 0.50 }, // % Daily Active Users
      sessionTime: { target: 25, critical: 15 }, // minutos
      featuresUsed: { target: 4.5, critical: 3.0 }, // features por sessão
      chatAdoption: { target: 0.80, critical: 0.60 }, // %
      gamificationEngagement: { target: 0.85, critical: 0.65 } // %
    },
    
    retention: {
      d1: { target: 0.80, critical: 0.60 }, // Dia 1
      d7: { target: 0.65, critical: 0.45 }, // Dia 7
      d30: { target: 0.50, critical: 0.30 }, // Dia 30
      churnRate: { target: 0.05, critical: 0.15 } // % mensal
    },
    
    satisfaction: {
      nps: { target: 60, critical: 40 }, // Net Promoter Score
      cssat: { target: 4.5, critical: 3.5 }, // Customer Satisfaction 1-5
      supportTickets: { target: 0.02, critical: 0.08 }, // % usuários
      bugReports: { target: 0.01, critical: 0.05 } // % usuários
    },
    
    business: {
      mrr: { target: 45000, critical: 25000 }, // Monthly Recurring Revenue
      arpu: { target: 90, critical: 60 }, // Average Revenue Per User
      ltv: { target: 1080, critical: 720 }, // Lifetime Value
      paymentFailures: { target: 0.02, critical: 0.05 } // %
    },
    
    technical: {
      responseTime: { target: 200, critical: 500 }, // ms
      uptime: { target: 0.999, critical: 0.995 }, // %
      errorRate: { target: 0.001, critical: 0.01 }, // %
      loadTime: { target: 2.0, critical: 3.5 } // segundos
    }
  },
  
  events: {
    user: [
      'user_registered',
      'profile_completed', 
      'first_login',
      'onboarding_completed',
      'subscription_started',
      'subscription_cancelled'
    ],
    
    feature: [
      'chat_first_message',
      'audio_first_sent',
      'gamification_first_points',
      'task_completed',
      'badge_earned',
      'reward_claimed'
    ],
    
    business: [
      'payment_attempted',
      'payment_successful',
      'payment_failed',
      'upgrade_requested',
      'downgrade_requested',
      'refund_requested'
    ],
    
    support: [
      'help_requested',
      'ticket_created',
      'bug_reported',
      'feedback_submitted',
      'rating_given'
    ]
  },
  
  reports: {
    daily: {
      time: '09:00',
      recipients: ['pilot@dom-v2.com.br'],
      metrics: ['dau', 'sessionTime', 'signups', 'revenue']
    },
    
    weekly: {
      time: 'monday:10:00',
      recipients: ['team@dom-v2.com.br', 'leadership@dom-v2.com.br'],
      metrics: ['all_kpis', 'cohort_analysis', 'funnel_analysis']
    },
    
    monthly: {
      time: '1st:08:00',
      recipients: ['board@dom-v2.com.br'],
      metrics: ['executive_summary', 'growth_trends', 'financial_analysis']
    }
  }
};

// Função principal
async function setupPilotAnalytics() {
  try {
    logStructured('info', '📊 Iniciando configuração do analytics do piloto');
    
    // Validar argumentos
    const args = process.argv.slice(2);
    const region = getArgValue(args, '--region') || 'sudeste';
    const env = getArgValue(args, '--env') || 'production';
    const skipTests = args.includes('--skip-tests');
    
    assertCritical(validateInput(region), 'Região deve ser especificada');
    assertCritical(validateInput(env), 'Ambiente deve ser especificado');
    
    logStructured('info', 'Configuração validada', { region, env, skipTests });
    
    const setupContext = {
      region,
      env,
      skipTests,
      timestamp: new Date().toISOString(),
      setupId: `analytics-setup-${Date.now()}`
    };
    
    // Executar configuração
    await executeAnalyticsSetup(setupContext);
    
    logStructured('info', '✅ Analytics do piloto configurado com sucesso!');
    
  } catch (error) {
    handleError(error, 'setupPilotAnalytics');
    process.exit(1);
  }
}

// Obter valor de argumento
function getArgValue(args, key) {
  const arg = args.find(arg => arg.startsWith(key + '='));
  return arg ? arg.split('=')[1] : null;
}

// Executar configuração de analytics
async function executeAnalyticsSetup(setupContext) {
  try {
    // 1. Configurar infraestrutura de tracking
    await setupTrackingInfrastructure(setupContext);
    
    // 2. Configurar dashboards e visualizações
    await setupDashboards(setupContext);
    
    // 3. Configurar alertas automáticos
    await setupAlerts(setupContext);
    
    // 4. Configurar relatórios automáticos
    await setupAutomatedReports(setupContext);
    
    // 5. Configurar análise de coortes
    await setupCohortAnalysis(setupContext);
    
    // 6. Configurar tracking de eventos
    await setupEventTracking(setupContext);
    
    // 7. Configurar métricas em tempo real
    await setupRealTimeMetrics(setupContext);
    
    // 8. Executar validação final
    if (!setupContext.skipTests) {
      await validateAnalyticsSetup(setupContext);
    }
    
  } catch (error) {
    handleError(error, 'executeAnalyticsSetup');
    throw error;
  }
}

// Configurar infraestrutura de tracking
async function setupTrackingInfrastructure(setupContext) {
  try {
    logStructured('info', '🔧 Configurando infraestrutura de tracking');
    
    const trackingConfig = {
      provider: 'mixpanel', // ou Google Analytics, Amplitude
      apiKey: 'MIXPANEL_API_KEY_PILOT',
      project: `dom-v2-pilot-${setupContext.region}`,
      
      settings: {
        trackAnonymousUsers: true,
        persistentStorage: true,
        crossDomainTracking: true,
        respectDoNotTrack: true,
        dataRetention: 365 // dias
      },
      
      customProperties: {
        environment: setupContext.env,
        pilotRegion: setupContext.region,
        appVersion: '2.0.0',
        buildNumber: process.env.BUILD_NUMBER || 'local'
      }
    };
    
    // Salvar configuração de tracking
    const trackingPath = path.join(__dirname, '..', 'config', 'analytics-tracking.json');
    if (!fs.existsSync(path.dirname(trackingPath))) {
      fs.mkdirSync(path.dirname(trackingPath), { recursive: true });
    }
    fs.writeFileSync(trackingPath, JSON.stringify(trackingConfig, null, 2));
    
    // Gerar SDK de tracking personalizado
    const trackingSDK = generateTrackingSDK(setupContext, trackingConfig);
    const sdkPath = path.join(__dirname, '..', 'frontend', 'src', 'utils', 'analytics.ts');
    fs.writeFileSync(sdkPath, trackingSDK);
    
    logStructured('info', 'Infraestrutura de tracking configurada', { 
      configPath: trackingPath,
      sdkPath 
    });
    
  } catch (error) {
    handleError(error, 'setupTrackingInfrastructure');
    throw error;
  }
}

// Gerar SDK de tracking
function generateTrackingSDK(setupContext, config) {
  return `/**
 * @fileoverview Analytics SDK - Sistema de tracking personalizado DOM v2
 * @description SDK de analytics otimizado para o piloto regional
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import mixpanel from 'mixpanel-browser';

// Configuração do analytics
const ANALYTICS_CONFIG = ${JSON.stringify(config, null, 2)};

// Inicializar tracking
let isInitialized = false;

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

export interface UserProperties {
  userId: string;
  email?: string;
  role: 'employer' | 'employee' | 'family';
  familyId: string;
  region: string;
  subscriptionPlan?: string;
  registrationDate: Date;
  onboardingCompleted?: boolean;
}

// Inicializar analytics
export function initializeAnalytics(): void {
  if (isInitialized) return;
  
  try {
    // Configurar Mixpanel
    mixpanel.init(ANALYTICS_CONFIG.apiKey, {
      debug: ANALYTICS_CONFIG.settings.debug || false,
      track_pageview: true,
      persistence: 'localStorage',
      cross_subdomain_cookie: ANALYTICS_CONFIG.settings.crossDomainTracking,
      respect_dnt: ANALYTICS_CONFIG.settings.respectDoNotTrack
    });
    
    // Definir propriedades globais
    mixpanel.register(ANALYTICS_CONFIG.customProperties);
    
    isInitialized = true;
    console.log('[Analytics] Inicializado com sucesso');
    
  } catch (error) {
    console.error('[Analytics] Erro na inicialização:', error);
  }
}

// Identificar usuário
export function identifyUser(userProperties: UserProperties): void {
  if (!isInitialized) {
    console.warn('[Analytics] Analytics não inicializado');
    return;
  }
  
  try {
    mixpanel.identify(userProperties.userId);
    
    // Definir propriedades do usuário
    mixpanel.people.set({
      '$email': userProperties.email,
      '$created': userProperties.registrationDate,
      'role': userProperties.role,
      'familyId': userProperties.familyId,
      'region': userProperties.region,
      'subscriptionPlan': userProperties.subscriptionPlan,
      'onboardingCompleted': userProperties.onboardingCompleted
    });
    
    console.log('[Analytics] Usuário identificado:', userProperties.userId);
    
  } catch (error) {
    console.error('[Analytics] Erro ao identificar usuário:', error);
  }
}

// Rastrear evento
export function trackEvent(event: AnalyticsEvent): void {
  if (!isInitialized) {
    console.warn('[Analytics] Analytics não inicializado');
    return;
  }
  
  try {
    const properties = {
      ...event.properties,
      timestamp: event.timestamp || new Date(),
      environment: ANALYTICS_CONFIG.customProperties.environment,
      pilotRegion: ANALYTICS_CONFIG.customProperties.pilotRegion
    };
    
    mixpanel.track(event.name, properties);
    
    console.log('[Analytics] Evento rastreado:', event.name, properties);
    
  } catch (error) {
    console.error('[Analytics] Erro ao rastrear evento:', error);
  }
}

// Rastrear página
export function trackPage(pageName: string, properties?: Record<string, any>): void {
  trackEvent({
    name: 'page_viewed',
    properties: {
      pageName,
      url: window.location.href,
      ...properties
    }
  });
}

// Eventos específicos do negócio
export const BusinessEvents = {
  // Aquisição
  userRegistered: (properties: any) => trackEvent({
    name: 'user_registered',
    properties
  }),
  
  profileCompleted: (properties: any) => trackEvent({
    name: 'profile_completed', 
    properties
  }),
  
  onboardingCompleted: (properties: any) => trackEvent({
    name: 'onboarding_completed',
    properties
  }),
  
  // Engajamento
  chatMessageSent: (properties: any) => trackEvent({
    name: 'chat_message_sent',
    properties
  }),
  
  audioMessageSent: (properties: any) => trackEvent({
    name: 'audio_message_sent',
    properties
  }),
  
  taskCompleted: (properties: any) => trackEvent({
    name: 'task_completed',
    properties
  }),
  
  badgeEarned: (properties: any) => trackEvent({
    name: 'badge_earned',
    properties
  }),
  
  rewardClaimed: (properties: any) => trackEvent({
    name: 'reward_claimed',
    properties
  }),
  
  // Negócio
  subscriptionStarted: (properties: any) => trackEvent({
    name: 'subscription_started',
    properties
  }),
  
  paymentSuccessful: (properties: any) => trackEvent({
    name: 'payment_successful',
    properties
  }),
  
  paymentFailed: (properties: any) => trackEvent({
    name: 'payment_failed',
    properties
  }),
  
  // Suporte
  helpRequested: (properties: any) => trackEvent({
    name: 'help_requested',
    properties
  }),
  
  bugReported: (properties: any) => trackEvent({
    name: 'bug_reported',
    properties
  }),
  
  feedbackSubmitted: (properties: any) => trackEvent({
    name: 'feedback_submitted',
    properties
  })
};

// Métricas em tempo real
export const RealTimeMetrics = {
  // Incrementar contador
  increment: (metricName: string, value: number = 1) => {
    trackEvent({
      name: 'metric_increment',
      properties: {
        metricName,
        value,
        timestamp: new Date()
      }
    });
  },
  
  // Definir gauge
  gauge: (metricName: string, value: number) => {
    trackEvent({
      name: 'metric_gauge',
      properties: {
        metricName,
        value,
        timestamp: new Date()
      }
    });
  },
  
  // Timing
  timing: (metricName: string, duration: number) => {
    trackEvent({
      name: 'metric_timing',
      properties: {
        metricName,
        duration,
        timestamp: new Date()
      }
    });
  }
};

// Utilitários
export const AnalyticsUtils = {
  // Iniciar timer
  startTimer: (name: string) => {
    const startTime = Date.now();
    
    return {
      end: () => {
        const duration = Date.now() - startTime;
        RealTimeMetrics.timing(name, duration);
        return duration;
      }
    };
  },
  
  // Rastrear erro
  trackError: (error: Error, context?: any) => {
    trackEvent({
      name: 'error_occurred',
      properties: {
        errorMessage: error.message,
        errorStack: error.stack,
        context,
        timestamp: new Date()
      }
    });
  },
  
  // Flush eventos pendentes
  flush: () => {
    if (isInitialized) {
      mixpanel.track('session_end');
    }
  }
};

// Auto-inicialização
if (typeof window !== 'undefined') {
  // Inicializar quando DOM carregar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalytics);
  } else {
    initializeAnalytics();
  }
  
  // Flush ao sair da página
  window.addEventListener('beforeunload', AnalyticsUtils.flush);
}

export default {
  initialize: initializeAnalytics,
  identify: identifyUser,
  track: trackEvent,
  page: trackPage,
  events: BusinessEvents,
  metrics: RealTimeMetrics,
  utils: AnalyticsUtils
};
`;
}

// Configurar dashboards
async function setupDashboards(setupContext) {
  try {
    logStructured('info', '📈 Configurando dashboards de analytics');
    
    const dashboardConfig = {
      mainDashboard: {
        name: 'Pilot Overview Dashboard',
        url: `https://analytics.dom-v2.com.br/pilot-${setupContext.region}`,
        refresh: 300, // 5 minutos
        
        widgets: [
          {
            type: 'kpi-grid',
            title: 'KPIs Principais',
            metrics: [
              'totalUsers', 'familiesRegistered', 'dau', 'mrr',
              'conversionRate', 'churnRate', 'nps', 'responseTime'
            ],
            size: 'large'
          },
          
          {
            type: 'line-chart',
            title: 'Crescimento de Usuários',
            metrics: ['totalUsers', 'familiesRegistered'],
            timeRange: '30d',
            size: 'medium'
          },
          
          {
            type: 'funnel',
            title: 'Funil de Conversão',
            steps: [
              'landing_page_visit',
              'signup_started', 
              'signup_completed',
              'onboarding_completed',
              'first_task_completed',
              'subscription_started'
            ],
            size: 'medium'
          },
          
          {
            type: 'cohort-table',
            title: 'Análise de Coortes',
            metric: 'retention',
            groupBy: 'week',
            size: 'large'
          },
          
          {
            type: 'geographic-map',
            title: 'Distribuição Regional',
            metric: 'activeUsers',
            region: setupContext.region,
            size: 'medium'
          }
        ]
      },
      
      businessDashboard: {
        name: 'Business Metrics Dashboard',
        url: `https://analytics.dom-v2.com.br/business-${setupContext.region}`,
        
        widgets: [
          {
            type: 'revenue-chart',
            title: 'Receita e Projeções',
            metrics: ['mrr', 'projectedRevenue', 'ltv'],
            size: 'large'
          },
          
          {
            type: 'acquisition-cost',
            title: 'CAC por Canal',
            channels: ['google_ads', 'meta_ads', 'organic', 'referral'],
            size: 'medium'
          }
        ]
      },
      
      technicalDashboard: {
        name: 'Technical Performance Dashboard', 
        url: `https://analytics.dom-v2.com.br/tech-${setupContext.region}`,
        
        widgets: [
          {
            type: 'performance-metrics',
            title: 'Performance Técnica',
            metrics: ['responseTime', 'uptime', 'errorRate', 'loadTime'],
            size: 'large'
          },
          
          {
            type: 'error-tracking',
            title: 'Tracking de Erros',
            groupBy: 'errorType',
            size: 'medium'
          }
        ]
      }
    };
    
    // Salvar configuração de dashboards
    const dashboardPath = path.join(__dirname, '..', 'config', 'analytics-dashboards.json');
    fs.writeFileSync(dashboardPath, JSON.stringify(dashboardConfig, null, 2));
    
    // Gerar componente React para dashboard principal
    const dashboardComponent = generateDashboardComponent(setupContext, dashboardConfig);
    const componentPath = path.join(__dirname, '..', 'frontend', 'src', 'components', 'analytics', 'PilotAnalyticsDashboard.tsx');
    fs.writeFileSync(componentPath, dashboardComponent);
    
    logStructured('info', 'Dashboards configurados', { 
      configPath: dashboardPath,
      componentPath
    });
    
  } catch (error) {
    handleError(error, 'setupDashboards');
    throw error;
  }
}

// Gerar componente de dashboard
function generateDashboardComponent(setupContext, config) {
  return `/**
 * @fileoverview Pilot Analytics Dashboard - Dashboard principal do piloto
 * @description Dashboard completo de analytics para acompanhamento do piloto regional
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { analyticsService } from '../../services/analyticsService';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { ErrorBoundary } from '../common/ErrorBoundary';

interface KPIData {
  name: string;
  value: number;
  target: number;
  change: number;
  status: 'good' | 'warning' | 'critical';
  format: 'number' | 'percentage' | 'currency' | 'duration';
}

interface DashboardData {
  kpis: KPIData[];
  chartData: any[];
  lastUpdated: Date;
  isLoading: boolean;
  error?: string;
}

export const PilotAnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    kpis: [],
    chartData: [],
    lastUpdated: new Date(),
    isLoading: true
  });
  
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    loadDashboardData();
    
    // Auto-refresh a cada 5 minutos
    const interval = setInterval(loadDashboardData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const loadDashboardData = async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true, error: undefined }));
      
      const [kpisData, chartsData] = await Promise.all([
        analyticsService.getKPIs(),
        analyticsService.getChartData()
      ]);
      
      setData({
        kpis: kpisData,
        chartData: chartsData,
        lastUpdated: new Date(),
        isLoading: false
      });
      
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: 'Erro ao carregar dados'
      }));
    }
  };
  
  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };
  
  const formatValue = (value: number, format: string): string => {
    switch (format) {
      case 'percentage':
        return \`\${(value * 100).toFixed(1)}%\`;
      case 'currency':
        return \`R$ \${value.toLocaleString('pt-BR')}\`;
      case 'duration':
        return \`\${value.toFixed(1)}min\`;
      default:
        return value.toLocaleString('pt-BR');
    }
  };
  
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'good': return '#28a745';
      case 'warning': return '#ffc107';
      case 'critical': return '#dc3545';
      default: return '#6c757d';
    }
  };
  
  if (data.isLoading && data.kpis.length === 0) {
    return (
      <View style={styles.container}>
        <LoadingIndicator message="Carregando analytics..." />
      </View>
    );
  }
  
  if (data.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{data.error}</Text>
      </View>
    );
  }
  
  return (
    <ErrorBoundary>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>📊 Analytics do Piloto - ${setupContext.region}</Text>
          <Text style={styles.subtitle}>
            Última atualização: {data.lastUpdated.toLocaleTimeString('pt-BR')}
          </Text>
        </View>
        
        <View style={styles.kpiGrid}>
          {data.kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { borderLeftColor: getStatusColor(kpi.status) }]}>
              <View style={styles.kpiHeader}>
                <Text style={styles.kpiName}>{kpi.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(kpi.status) }]}>
                  <Text style={styles.statusText}>
                    {kpi.status === 'good' ? '✓' : kpi.status === 'warning' ? '⚠' : '✗'}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.kpiValue}>
                {formatValue(kpi.value, kpi.format)}
              </Text>
              
              <View style={styles.kpiMeta}>
                <Text style={styles.kpiTarget}>
                  Meta: {formatValue(kpi.target, kpi.format)}
                </Text>
                <Text style={[styles.kpiChange, { 
                  color: kpi.change >= 0 ? '#28a745' : '#dc3545' 
                }]}>
                  {kpi.change >= 0 ? '↗' : '↘'} {Math.abs(kpi.change).toFixed(1)}%
                </Text>
              </View>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: \`\${Math.min((kpi.value / kpi.target) * 100, 100)}%\`,
                      backgroundColor: getStatusColor(kpi.status)
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.insights}>
          <Text style={styles.sectionTitle}>💡 Insights Automáticos</Text>
          <GenerateInsights kpis={data.kpis} />
        </View>
        
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>⚡ Ações Rápidas</Text>
          <QuickActions />
        </View>
      </ScrollView>
    </ErrorBoundary>
  );
};

const GenerateInsights: React.FC<{ kpis: KPIData[] }> = ({ kpis }) => {
  const insights = generateAutomaticInsights(kpis);
  
  return (
    <View style={styles.insightsList}>
      {insights.map((insight, index) => (
        <View key={index} style={styles.insightCard}>
          <Text style={styles.insightText}>{insight.message}</Text>
          <Text style={styles.insightAction}>{insight.action}</Text>
        </View>
      ))}
    </View>
  );
};

const QuickActions: React.FC = () => {
  return (
    <View style={styles.actionsList}>
      <ActionButton 
        title="📊 Relatório Detalhado" 
        onPress={() => {/* Navigate to detailed report */}}
      />
      <ActionButton 
        title="🚨 Configurar Alertas" 
        onPress={() => {/* Navigate to alerts config */}}
      />
      <ActionButton 
        title="📈 Análise de Coortes" 
        onPress={() => {/* Navigate to cohort analysis */}}
      />
      <ActionButton 
        title="💰 ROI Calculator" 
        onPress={() => {/* Navigate to ROI calculator */}}
      />
    </View>
  );
};

const ActionButton: React.FC<{ title: string; onPress: () => void }> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <Text style={styles.actionButtonText}>{title}</Text>
  </TouchableOpacity>
);

function generateAutomaticInsights(kpis: KPIData[]): Array<{ message: string; action: string }> {
  const insights = [];
  
  // Análise automática de KPIs
  const criticalKpis = kpis.filter(kpi => kpi.status === 'critical');
  const warningKpis = kpis.filter(kpi => kpi.status === 'warning');
  const goodKpis = kpis.filter(kpi => kpi.status === 'good');
  
  if (criticalKpis.length > 0) {
    insights.push({
      message: \`🚨 \${criticalKpis.length} métricas críticas precisam de atenção imediata\`,
      action: 'Revisar estratégia de aquisição e retenção'
    });
  }
  
  if (warningKpis.length > 2) {
    insights.push({
      message: \`⚠️ Múltiplas métricas em estado de alerta\`,
      action: 'Implementar ações corretivas preventivas'
    });
  }
  
  const growthKpis = kpis.filter(kpi => kpi.change > 10);
  if (growthKpis.length > 0) {
    insights.push({
      message: \`📈 \${growthKpis.length} métricas com crescimento acelerado\`,
      action: 'Escalar estratégias que estão funcionando'
    });
  }
  
  return insights;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  
  kpiCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  kpiName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    flex: 1,
  },
  
  statusBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  
  kpiMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  
  kpiTarget: {
    fontSize: 12,
    color: '#6c757d',
  },
  
  kpiChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  progressBar: {
    height: 4,
    backgroundColor: '#e9ecef',
    borderRadius: 2,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  
  insights: {
    marginBottom: 24,
  },
  
  insightsList: {
    gap: 12,
  },
  
  insightCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#007bff',
  },
  
  insightText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  
  insightAction: {
    fontSize: 13,
    color: '#007bff',
    fontWeight: '600',
  },
  
  quickActions: {
    marginBottom: 24,
  },
  
  actionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  
  actionButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: '48%',
  },
  
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 32,
  },
});

export default PilotAnalyticsDashboard;
`;
}

// Configurar alertas automáticos
async function setupAlerts(setupContext) {
  try {
    logStructured('info', '🚨 Configurando alertas automáticos');
    
    const alertsConfig = {
      channels: {
        email: {
          enabled: true,
          recipients: ['alerts@dom-v2.com.br', 'pilot@dom-v2.com.br'],
          template: 'pilot-alert-template'
        },
        
        slack: {
          enabled: true,
          webhook: 'SLACK_WEBHOOK_URL',
          channel: '#pilot-alerts'
        },
        
        sms: {
          enabled: false, // apenas para emergências críticas
          numbers: ['+5511999999999']
        }
      },
      
      rules: [
        {
          name: 'Critical KPI Alert',
          condition: 'kpi_below_critical_threshold',
          metrics: ['conversionRate', 'dau', 'uptime'],
          threshold: 'critical',
          channels: ['email', 'slack'],
          frequency: 'immediate',
          escalation: true
        },
        
        {
          name: 'Revenue Drop Alert',
          condition: 'revenue_drop',
          metrics: ['mrr', 'dailyRevenue'],
          threshold: -20, // -20%
          channels: ['email', 'slack', 'sms'],
          frequency: 'immediate',
          priority: 'critical'
        },
        
        {
          name: 'User Acquisition Slowdown',
          condition: 'acquisition_below_target',
          metrics: ['signups', 'familiesRegistered'],
          threshold: -30, // -30% da meta
          channels: ['email'],
          frequency: 'daily',
          priority: 'warning'
        },
        
        {
          name: 'Technical Performance Issue',
          condition: 'technical_degradation',
          metrics: ['responseTime', 'errorRate', 'uptime'],
          threshold: 'warning',
          channels: ['email', 'slack'],
          frequency: 'immediate',
          priority: 'high'
        },
        
        {
          name: 'Churn Rate Spike',
          condition: 'churn_spike',
          metrics: ['churnRate'],
          threshold: 15, // 15% acima da média
          channels: ['email'],
          frequency: 'immediate',
          priority: 'critical'
        }
      ]
    };
    
    // Salvar configuração de alertas
    const alertsPath = path.join(__dirname, '..', 'config', 'analytics-alerts.json');
    fs.writeFileSync(alertsPath, JSON.stringify(alertsConfig, null, 2));
    
    // Gerar script de monitoramento de alertas
    const alertScript = generateAlertScript(setupContext, alertsConfig);
    const scriptPath = path.join(__dirname, 'monitor-pilot-alerts.js');
    fs.writeFileSync(scriptPath, alertScript);
    fs.chmodSync(scriptPath, '755');
    
    logStructured('info', 'Alertas configurados', { 
      configPath: alertsPath,
      scriptPath,
      rules: alertsConfig.rules.length
    });
    
  } catch (error) {
    handleError(error, 'setupAlerts');
    throw error;
  }
}

// Gerar script de monitoramento de alertas
function generateAlertScript(setupContext, config) {
  return `#!/usr/bin/env node
/**
 * @fileoverview Monitor Pilot Alerts - Sistema de monitoramento de alertas
 * @description Monitora KPIs e envia alertas automáticos quando necessário
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

const config = ${JSON.stringify(config, null, 2)};

async function monitorAlerts() {
  console.log('🔍 Iniciando monitoramento de alertas do piloto');
  
  try {
    // Buscar métricas atuais
    const metrics = await getCurrentMetrics();
    
    // Verificar cada regra de alerta
    for (const rule of config.rules) {
      const alertTriggered = await checkAlertRule(rule, metrics);
      
      if (alertTriggered) {
        await sendAlert(rule, alertTriggered);
      }
    }
    
    console.log('✅ Monitoramento de alertas concluído');
    
  } catch (error) {
    console.error('❌ Erro no monitoramento:', error);
  }
}

async function getCurrentMetrics() {
  // Simular busca de métricas (substituir por API real)
  return {
    conversionRate: 0.18, // 18%
    dau: 0.72, // 72%
    uptime: 0.998, // 99.8%
    mrr: 38000, // R$ 38.000
    signups: 145,
    churnRate: 0.08 // 8%
  };
}

async function checkAlertRule(rule, metrics) {
  // Implementar lógica de verificação de alertas
  console.log(\`Verificando regra: \${rule.name}\`);
  
  // Retornar dados do alerta se triggered
  return null;
}

async function sendAlert(rule, alertData) {
  console.log(\`🚨 Enviando alerta: \${rule.name}\`);
  
  // Implementar envio de alertas para canais configurados
  for (const channel of rule.channels) {
    if (config.channels[channel]?.enabled) {
      await sendToChannel(channel, rule, alertData);
    }
  }
}

async function sendToChannel(channel, rule, alertData) {
  console.log(\`📧 Enviando para \${channel}\`);
  // Implementar envio específico por canal
}

// Executar se chamado diretamente
if (require.main === module) {
  monitorAlerts();
}

module.exports = { monitorAlerts };
`;
}

// Configurar relatórios automáticos
async function setupAutomatedReports(setupContext) {
  try {
    logStructured('info', '📋 Configurando relatórios automáticos');
    
    const reportsConfig = ANALYTICS_CONFIG.reports;
    
    // Gerar templates de relatórios
    const reportTemplates = {
      daily: generateDailyReportTemplate(),
      weekly: generateWeeklyReportTemplate(),
      monthly: generateMonthlyReportTemplate()
    };
    
    // Salvar templates
    const templatesPath = path.join(__dirname, '..', 'config', 'report-templates.json');
    fs.writeFileSync(templatesPath, JSON.stringify(reportTemplates, null, 2));
    
    // Gerar script de geração de relatórios
    const reportScript = generateReportScript(setupContext, reportsConfig);
    const scriptPath = path.join(__dirname, 'generate-pilot-reports.js');
    fs.writeFileSync(scriptPath, reportScript);
    fs.chmodSync(scriptPath, '755');
    
    logStructured('info', 'Relatórios automáticos configurados', { 
      templatesPath,
      scriptPath
    });
    
  } catch (error) {
    handleError(error, 'setupAutomatedReports');
    throw error;
  }
}

// Gerar templates de relatórios
function generateDailyReportTemplate() {
  return {
    name: 'Relatório Diário do Piloto',
    frequency: 'daily',
    sections: [
      {
        title: 'KPIs do Dia',
        metrics: ['signups', 'dau', 'sessionTime', 'revenue'],
        visualization: 'table'
      },
      {
        title: 'Alertas e Problemas',
        content: 'critical_issues',
        visualization: 'list'
      },
      {
        title: 'Top Insights',
        content: 'daily_insights',
        visualization: 'cards'
      }
    ]
  };
}

function generateWeeklyReportTemplate() {
  return {
    name: 'Relatório Semanal do Piloto',
    frequency: 'weekly',
    sections: [
      {
        title: 'Resumo da Semana',
        metrics: ['all_kpis'],
        visualization: 'dashboard'
      },
      {
        title: 'Análise de Coortes',
        content: 'cohort_analysis',
        visualization: 'cohort_table'
      },
      {
        title: 'Funil de Conversão',
        content: 'conversion_funnel',
        visualization: 'funnel_chart'
      },
      {
        title: 'Recomendações',
        content: 'weekly_recommendations',
        visualization: 'action_items'
      }
    ]
  };
}

function generateMonthlyReportTemplate() {
  return {
    name: 'Relatório Mensal Executivo',
    frequency: 'monthly',
    sections: [
      {
        title: 'Executive Summary',
        content: 'executive_summary',
        visualization: 'executive_cards'
      },
      {
        title: 'Growth Analysis',
        content: 'growth_trends',
        visualization: 'trend_charts'
      },
      {
        title: 'Financial Analysis',
        content: 'financial_analysis',
        visualization: 'financial_charts'
      },
      {
        title: 'Strategic Recommendations',
        content: 'strategic_recommendations',
        visualization: 'strategy_matrix'
      }
    ]
  };
}

// Gerar script de relatórios
function generateReportScript(setupContext, config) {
  return `#!/usr/bin/env node
/**
 * @fileoverview Generate Pilot Reports - Geração automática de relatórios
 * @description Gera relatórios automáticos do piloto regional
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

const fs = require('fs');
const path = require('path');

const reportsConfig = ${JSON.stringify(config, null, 2)};

async function generateReports() {
  console.log('📊 Gerando relatórios do piloto');
  
  const reportType = process.argv[2] || 'daily';
  
  try {
    switch (reportType) {
      case 'daily':
        await generateDailyReport();
        break;
      case 'weekly':
        await generateWeeklyReport();
        break;
      case 'monthly':
        await generateMonthlyReport();
        break;
      default:
        console.error('Tipo de relatório inválido:', reportType);
        process.exit(1);
    }
    
    console.log(\`✅ Relatório \${reportType} gerado com sucesso\`);
    
  } catch (error) {
    console.error('❌ Erro ao gerar relatório:', error);
  }
}

async function generateDailyReport() {
  console.log('📅 Gerando relatório diário');
  
  const data = await collectDailyData();
  const report = await generateReportContent('daily', data);
  
  await saveReport('daily', report);
  await sendReport('daily', report);
}

async function generateWeeklyReport() {
  console.log('📈 Gerando relatório semanal');
  
  const data = await collectWeeklyData();
  const report = await generateReportContent('weekly', data);
  
  await saveReport('weekly', report);
  await sendReport('weekly', report);
}

async function generateMonthlyReport() {
  console.log('📊 Gerando relatório mensal');
  
  const data = await collectMonthlyData();
  const report = await generateReportContent('monthly', data);
  
  await saveReport('monthly', report);
  await sendReport('monthly', report);
}

async function collectDailyData() {
  // Implementar coleta de dados diários
  return {
    date: new Date().toISOString().split('T')[0],
    kpis: {},
    events: [],
    insights: []
  };
}

async function collectWeeklyData() {
  // Implementar coleta de dados semanais
  return {
    weekStart: new Date(),
    kpis: {},
    cohorts: {},
    funnel: {}
  };
}

async function collectMonthlyData() {
  // Implementar coleta de dados mensais
  return {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    summary: {},
    trends: {},
    financials: {}
  };
}

async function generateReportContent(type, data) {
  // Implementar geração de conteúdo
  return {
    type,
    generatedAt: new Date(),
    data,
    sections: []
  };
}

async function saveReport(type, report) {
  const filename = \`pilot-report-\${type}-\${Date.now()}.json\`;
  const filepath = path.join(__dirname, 'reports', filename);
  
  if (!fs.existsSync(path.dirname(filepath))) {
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
  }
  
  fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
  console.log(\`💾 Relatório salvo: \${filepath}\`);
}

async function sendReport(type, report) {
  const recipients = reportsConfig[type]?.recipients || [];
  
  for (const recipient of recipients) {
    console.log(\`📧 Enviando relatório \${type} para \${recipient}\`);
    // Implementar envio de email
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  generateReports();
}

module.exports = { generateReports };
`;
}

// Configurar análise de coortes
async function setupCohortAnalysis(setupContext) {
  try {
    logStructured('info', '👥 Configurando análise de coortes');
    
    const cohortConfig = {
      dimensions: [
        'registration_week',
        'first_payment_week',
        'feature_adoption_week',
        'region',
        'acquisition_channel'
      ],
      
      metrics: [
        'retention_rate',
        'revenue_per_cohort',
        'feature_adoption',
        'engagement_score'
      ],
      
      periods: [
        'week_1', 'week_2', 'week_4', 'week_8', 'week_12'
      ],
      
      analysis: {
        retentionCohorts: {
          enabled: true,
          groupBy: 'registration_week',
          metric: 'active_users'
        },
        
        revenueCohorts: {
          enabled: true,
          groupBy: 'first_payment_week',
          metric: 'cumulative_revenue'
        },
        
        featureCohorts: {
          enabled: true,
          groupBy: 'feature_adoption_week',
          metric: 'feature_usage'
        }
      }
    };
    
    // Salvar configuração de coortes
    const cohortPath = path.join(__dirname, '..', 'config', 'cohort-analysis.json');
    fs.writeFileSync(cohortPath, JSON.stringify(cohortConfig, null, 2));
    
    logStructured('info', 'Análise de coortes configurada', { configPath: cohortPath });
    
  } catch (error) {
    handleError(error, 'setupCohortAnalysis');
    throw error;
  }
}

// Configurar tracking de eventos
async function setupEventTracking(setupContext) {
  try {
    logStructured('info', '📍 Configurando tracking de eventos');
    
    const eventsConfig = ANALYTICS_CONFIG.events;
    
    // Gerar schema de eventos
    const eventSchema = generateEventSchema(eventsConfig);
    const schemaPath = path.join(__dirname, '..', 'config', 'event-schema.json');
    fs.writeFileSync(schemaPath, JSON.stringify(eventSchema, null, 2));
    
    logStructured('info', 'Tracking de eventos configurado', { 
      schemaPath,
      totalEvents: Object.values(eventsConfig).flat().length
    });
    
  } catch (error) {
    handleError(error, 'setupEventTracking');
    throw error;
  }
}

// Gerar schema de eventos
function generateEventSchema(eventsConfig) {
  const schema = {};
  
  for (const [category, events] of Object.entries(eventsConfig)) {
    schema[category] = {};
    
    for (const eventName of events) {
      schema[category][eventName] = {
        properties: {
          userId: { type: 'string', required: true },
          timestamp: { type: 'datetime', required: true },
          sessionId: { type: 'string', required: false },
          ...getEventSpecificProperties(eventName)
        }
      };
    }
  }
  
  return schema;
}

// Obter propriedades específicas do evento
function getEventSpecificProperties(eventName) {
  const commonProps = {
    device: { type: 'string' },
    browser: { type: 'string' },
    region: { type: 'string' }
  };
  
  switch (eventName) {
    case 'user_registered':
      return {
        ...commonProps,
        registrationMethod: { type: 'string' },
        referralSource: { type: 'string' }
      };
      
    case 'task_completed':
      return {
        ...commonProps,
        taskType: { type: 'string' },
        duration: { type: 'number' },
        pointsEarned: { type: 'number' }
      };
      
    case 'payment_successful':
      return {
        ...commonProps,
        amount: { type: 'number' },
        plan: { type: 'string' },
        paymentMethod: { type: 'string' }
      };
      
    default:
      return commonProps;
  }
}

// Configurar métricas em tempo real
async function setupRealTimeMetrics(setupContext) {
  try {
    logStructured('info', '⚡ Configurando métricas em tempo real');
    
    const realTimeConfig = {
      streams: [
        {
          name: 'user_activity',
          source: 'application_events',
          aggregation: 'count',
          window: '1m',
          metrics: ['active_users', 'page_views', 'api_calls']
        },
        
        {
          name: 'business_metrics',
          source: 'business_events',
          aggregation: 'sum',
          window: '5m',
          metrics: ['revenue', 'signups', 'conversions']
        },
        
        {
          name: 'technical_metrics',
          source: 'system_events',
          aggregation: 'avg',
          window: '30s',
          metrics: ['response_time', 'error_rate', 'cpu_usage']
        }
      ],
      
      alerts: {
        enabled: true,
        thresholds: {
          high_error_rate: { metric: 'error_rate', threshold: 0.05 },
          slow_response: { metric: 'response_time', threshold: 1000 },
          low_activity: { metric: 'active_users', threshold: 10 }
        }
      }
    };
    
    // Salvar configuração de métricas em tempo real
    const realTimePath = path.join(__dirname, '..', 'config', 'realtime-metrics.json');
    fs.writeFileSync(realTimePath, JSON.stringify(realTimeConfig, null, 2));
    
    logStructured('info', 'Métricas em tempo real configuradas', { configPath: realTimePath });
    
  } catch (error) {
    handleError(error, 'setupRealTimeMetrics');
    throw error;
  }
}

// Validar configuração de analytics
async function validateAnalyticsSetup(setupContext) {
  try {
    logStructured('info', '✅ Validando configuração de analytics');
    
    const validations = [
      { name: 'Tracking SDK', check: () => checkTrackingSDK() },
      { name: 'Dashboard Config', check: () => checkDashboardConfig() },
      { name: 'Alerts Config', check: () => checkAlertsConfig() },
      { name: 'Reports Config', check: () => checkReportsConfig() },
      { name: 'Event Schema', check: () => checkEventSchema() }
    ];
    
    let allPassed = true;
    
    for (const validation of validations) {
      try {
        const result = await validation.check();
        logStructured('info', `✅ ${validation.name}: Válido`);
      } catch (error) {
        logStructured('error', `❌ ${validation.name}: ${error.message}`);
        allPassed = false;
      }
    }
    
    if (allPassed) {
      logStructured('info', '🎉 Todas as validações passaram!');
    } else {
      throw new Error('Algumas validações falharam');
    }
    
  } catch (error) {
    handleError(error, 'validateAnalyticsSetup');
    throw error;
  }
}

// Funções de validação
function checkTrackingSDK() {
  const sdkPath = path.join(__dirname, '..', 'frontend', 'src', 'utils', 'analytics.ts');
  if (!fs.existsSync(sdkPath)) {
    throw new Error('SDK de tracking não encontrado');
  }
  return true;
}

function checkDashboardConfig() {
  const configPath = path.join(__dirname, '..', 'config', 'analytics-dashboards.json');
  if (!fs.existsSync(configPath)) {
    throw new Error('Configuração de dashboard não encontrada');
  }
  return true;
}

function checkAlertsConfig() {
  const configPath = path.join(__dirname, '..', 'config', 'analytics-alerts.json');
  if (!fs.existsSync(configPath)) {
    throw new Error('Configuração de alertas não encontrada');
  }
  return true;
}

function checkReportsConfig() {
  const configPath = path.join(__dirname, '..', 'config', 'report-templates.json');
  if (!fs.existsSync(configPath)) {
    throw new Error('Templates de relatórios não encontrados');
  }
  return true;
}

function checkEventSchema() {
  const schemaPath = path.join(__dirname, '..', 'config', 'event-schema.json');
  if (!fs.existsSync(schemaPath)) {
    throw new Error('Schema de eventos não encontrado');
  }
  return true;
}

// Executar script se chamado diretamente
if (require.main === module) {
  setupPilotAnalytics().catch(error => {
    handleError(error, 'main');
    process.exit(1);
  });
}

module.exports = {
  setupPilotAnalytics,
  ANALYTICS_CONFIG
};
