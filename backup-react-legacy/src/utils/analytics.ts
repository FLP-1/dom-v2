/**
 * @fileoverview Analytics SDK - Sistema de tracking personalizado DOM v2
 * @description SDK de analytics otimizado para o piloto regional
 * @version 2.0.0
 * @generated 2025-08-10T02:27:47.670Z
 */

import mixpanel from 'mixpanel-browser';

// Configuração do analytics
const ANALYTICS_CONFIG = {
  "provider": "mixpanel",
  "apiKey": "MIXPANEL_API_KEY_PILOT",
  "project": "dom-v2-pilot-sudeste",
  "settings": {
    "trackAnonymousUsers": true,
    "persistentStorage": true,
    "crossDomainTracking": true,
    "respectDoNotTrack": true,
    "dataRetention": 365
  },
  "customProperties": {
    "environment": "production",
    "pilotRegion": "sudeste",
    "appVersion": "2.0.0",
    "buildNumber": "local"
  }
};

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
  userRegistered: (properties: unknown) => trackEvent({
    name: 'user_registered',
    properties
  }),
  
  profileCompleted: (properties: unknown) => trackEvent({
    name: 'profile_completed', 
    properties
  }),
  
  onboardingCompleted: (properties: unknown) => trackEvent({
    name: 'onboarding_completed',
    properties
  }),
  
  // Engajamento
  chatMessageSent: (properties: unknown) => trackEvent({
    name: 'chat_message_sent',
    properties
  }),
  
  audioMessageSent: (properties: unknown) => trackEvent({
    name: 'audio_message_sent',
    properties
  }),
  
  taskCompleted: (properties: unknown) => trackEvent({
    name: 'task_completed',
    properties
  }),
  
  badgeEarned: (properties: unknown) => trackEvent({
    name: 'badge_earned',
    properties
  }),
  
  rewardClaimed: (properties: unknown) => trackEvent({
    name: 'reward_claimed',
    properties
  }),
  
  // Negócio
  subscriptionStarted: (properties: unknown) => trackEvent({
    name: 'subscription_started',
    properties
  }),
  
  paymentSuccessful: (properties: unknown) => trackEvent({
    name: 'payment_successful',
    properties
  }),
  
  paymentFailed: (properties: unknown) => trackEvent({
    name: 'payment_failed',
    properties
  }),
  
  // Suporte
  helpRequested: (properties: unknown) => trackEvent({
    name: 'help_requested',
    properties
  }),
  
  bugReported: (properties: unknown) => trackEvent({
    name: 'bug_reported',
    properties
  }),
  
  feedbackSubmitted: (properties: unknown) => trackEvent({
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
  trackError: (error: Error, context?: unknown) => {
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
