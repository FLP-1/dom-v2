/**
 * @fileoverview Sistema centralizado de configuração para o DOM v2
 * @description Centraliza todas as configurações do sistema para eliminar hardcode
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */

// Tipos de ambiente
export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test'
}

// Tipos de configuração
export enum ConfigType {
  API = 'api',
  APP = 'app',
  FEATURE = 'feature',
  INTEGRATION = 'integration',
  SECURITY = 'security',
  UI = 'ui'
}

// Interface para configurações
export interface Config {
  key: string;
  type: ConfigType;
  value: any;
  description: string;
  environment?: Environment;
  required?: boolean;
}

// Sistema de configuração centralizado
export class ConfigSystem {
  private static configs: Map<string, Config> = new Map();
  private static currentEnvironment: Environment = Environment.DEVELOPMENT;

  // Inicializar configurações do sistema
  static initialize(environment: Environment = Environment.DEVELOPMENT): void {
    this.currentEnvironment = environment;
    this.loadApiConfigs();
    this.loadAppConfigs();
    this.loadFeatureConfigs();
    this.loadIntegrationConfigs();
    this.loadSecurityConfigs();
    this.loadUiConfigs();
  }

  // Obter configuração por chave
  static getConfig(key: string): Config | null {
    return this.configs.get(key) || null;
  }

  // Obter valor da configuração
  static getValue(key: string): any {
    const config = this.getConfig(key);
    return config ? config.value : null;
  }

  // Obter configurações por tipo
  static getConfigsByType(type: ConfigType): Config[] {
    return Array.from(this.configs.values()).filter(
      config => config.type === type
    );
  }

  // Obter configurações por ambiente
  static getConfigsByEnvironment(environment: Environment): Config[] {
    return Array.from(this.configs.values()).filter(
      config => !config.environment || config.environment === environment
    );
  }

  // Adicionar nova configuração
  static addConfig(config: Config): void {
    this.configs.set(config.key, config);
  }

  // Atualizar configuração existente
  static updateConfig(key: string, config: Partial<Config>): void {
    const existing = this.configs.get(key);
    if (existing) {
      this.configs.set(key, { ...existing, ...config });
    }
  }

  // Remover configuração
  static removeConfig(key: string): void {
    this.configs.delete(key);
  }

  // Definir ambiente atual
  static setEnvironment(environment: Environment): void {
    this.currentEnvironment = environment;
  }

  // Obter ambiente atual
  static getCurrentEnvironment(): Environment {
    return this.currentEnvironment;
  }

  // Validar configurações obrigatórias
  static validateRequiredConfigs(): string[] {
    const missing: string[] = [];
    Array.from(this.configs.values()).forEach(config => {
      if (config.required && !config.value) {
        missing.push(config.key);
      }
    });
    return missing;
  }

  // Carregar configurações de API
  private static loadApiConfigs(): void {
    const apiConfigs: Config[] = [
      {
        key: 'api.baseUrl',
        type: ConfigType.API,
        value: 'http://localhost:3001',
        description: 'URL base da API',
        required: true
      },
      {
        key: 'api.timeout',
        type: ConfigType.API,
        value: 30000,
        description: 'Timeout das requisições em ms',
        required: true
      },
      {
        key: 'api.retryAttempts',
        type: ConfigType.API,
        value: 3,
        description: 'Número de tentativas de retry',
        required: true
      },
      {
        key: 'api.retryDelay',
        type: ConfigType.API,
        value: 1000,
        description: 'Delay entre tentativas em ms',
        required: true
      },
      {
        key: 'api.version',
        type: ConfigType.API,
        value: 'v1',
        description: 'Versão da API',
        required: true
      }
    ];

    apiConfigs.forEach(config => this.configs.set(config.key, config));
  }

  // Carregar configurações do app
  private static loadAppConfigs(): void {
    const appConfigs: Config[] = [
      {
        key: 'app.name',
        type: ConfigType.APP,
        value: 'DOM v2',
        description: 'Nome do aplicativo',
        required: true
      },
      {
        key: 'app.version',
        type: ConfigType.APP,
        value: '2.0.0',
        description: 'Versão do aplicativo',
        required: true
      },
      {
        key: 'app.description',
        type: ConfigType.APP,
        value: 'Sistema de Gestão Doméstica',
        description: 'Descrição do aplicativo',
        required: true
      },
      {
        key: 'app.author',
        type: ConfigType.APP,
        value: 'Equipe DOM v2',
        description: 'Autor do aplicativo',
        required: true
      },
      {
        key: 'app.supportEmail',
        type: ConfigType.APP,
        value: 'suporte@domv2.com',
        description: 'Email de suporte',
        required: true
      },
      {
        key: 'app.maxFileSize',
        type: ConfigType.APP,
        value: 10 * 1024 * 1024, // 10MB
        description: 'Tamanho máximo de arquivo em bytes',
        required: true
      },
      {
        key: 'app.sessionTimeout',
        type: ConfigType.APP,
        value: 30 * 60 * 1000, // 30 minutos
        description: 'Timeout da sessão em ms',
        required: true
      }
    ];

    appConfigs.forEach(config => this.configs.set(config.key, config));
  }

  // Carregar configurações de features
  private static loadFeatureConfigs(): void {
    const featureConfigs: Config[] = [
      {
        key: 'feature.notifications',
        type: ConfigType.FEATURE,
        value: true,
        description: 'Habilitar sistema de notificações',
        required: true
      },
      {
        key: 'feature.pushNotifications',
        type: ConfigType.FEATURE,
        value: true,
        description: 'Habilitar notificações push',
        required: true
      },
      {
        key: 'feature.biometrics',
        type: ConfigType.FEATURE,
        value: true,
        description: 'Habilitar autenticação biométrica',
        required: true
      },
      {
        key: 'feature.offlineMode',
        type: ConfigType.FEATURE,
        value: false,
        description: 'Habilitar modo offline',
        required: true
      },
      {
        key: 'feature.analytics',
        type: ConfigType.FEATURE,
        value: true,
        description: 'Habilitar analytics',
        required: true
      },
      {
        key: 'feature.debugMode',
        type: ConfigType.FEATURE,
        value: this.currentEnvironment === Environment.DEVELOPMENT,
        description: 'Habilitar modo debug',
        required: true
      }
    ];

    featureConfigs.forEach(config => this.configs.set(config.key, config));
  }

  // Carregar configurações de integração
  private static loadIntegrationConfigs(): void {
    const integrationConfigs: Config[] = [
      {
        key: 'integration.stripe.publicKey',
        type: ConfigType.INTEGRATION,
        value: 'pk_test_...',
        description: 'Chave pública do Stripe',
        required: true
      },
      {
        key: 'integration.stripe.secretKey',
        type: ConfigType.INTEGRATION,
        value: 'sk_test_...',
        description: 'Chave secreta do Stripe',
        required: true
      },
      {
        key: 'integration.viacep.baseUrl',
        type: ConfigType.INTEGRATION,
        value: 'https://viacep.com.br/ws',
        description: 'URL base do ViaCEP',
        required: true
      },
      {
        key: 'integration.sptrans.baseUrl',
        type: ConfigType.INTEGRATION,
        value: 'https://api.olhovivo.sptrans.com.br/v2.1',
        description: 'URL base da SPTrans',
        required: true
      },
      {
        key: 'integration.sptrans.token',
        type: ConfigType.INTEGRATION,
        value: 'your_token_here',
        description: 'Token da API SPTrans',
        required: true
      },
      {
        key: 'integration.whatsapp.businessId',
        type: ConfigType.INTEGRATION,
        value: 'your_business_id',
        description: 'ID do WhatsApp Business',
        required: true
      },
      {
        key: 'integration.whatsapp.accessToken',
        type: ConfigType.INTEGRATION,
        value: 'your_access_token',
        description: 'Token de acesso do WhatsApp',
        required: true
      }
    ];

    integrationConfigs.forEach(config => this.configs.set(config.key, config));
  }

  // Carregar configurações de segurança
  private static loadSecurityConfigs(): void {
    const securityConfigs: Config[] = [
      {
        key: 'security.jwtSecret',
        type: ConfigType.SECURITY,
        value: 'your_jwt_secret_here',
        description: 'Chave secreta para JWT',
        required: true
      },
      {
        key: 'security.jwtExpiration',
        type: ConfigType.SECURITY,
        value: '24h',
        description: 'Tempo de expiração do JWT',
        required: true
      },
      {
        key: 'security.passwordMinLength',
        type: ConfigType.SECURITY,
        value: 8,
        description: 'Tamanho mínimo da senha',
        required: true
      },
      {
        key: 'security.passwordRequireSpecial',
        type: ConfigType.SECURITY,
        value: true,
        description: 'Exigir caracteres especiais na senha',
        required: true
      },
      {
        key: 'security.maxLoginAttempts',
        type: ConfigType.SECURITY,
        value: 5,
        description: 'Máximo de tentativas de login',
        required: true
      },
      {
        key: 'security.lockoutDuration',
        type: ConfigType.SECURITY,
        value: 15 * 60 * 1000, // 15 minutos
        description: 'Duração do bloqueio em ms',
        required: true
      },
      {
        key: 'security.require2FA',
        type: ConfigType.SECURITY,
        value: false,
        description: 'Exigir autenticação de dois fatores',
        required: true
      },
      {
        key: 'security.encryptionKey',
        type: ConfigType.SECURITY,
        value: 'your_encryption_key_here',
        description: 'Chave de criptografia',
        required: true
      }
    ];

    securityConfigs.forEach(config => this.configs.set(config.key, config));
  }

  // Carregar configurações de UI
  private static loadUiConfigs(): void {
    const uiConfigs: Config[] = [
      {
        key: 'ui.theme.default',
        type: ConfigType.UI,
        value: 'light',
        description: 'Tema padrão da interface',
        required: true
      },
      {
        key: 'ui.language.default',
        type: ConfigType.UI,
        value: 'pt-BR',
        description: 'Idioma padrão da interface',
        required: true
      },
      {
        key: 'ui.currency.default',
        type: ConfigType.UI,
        value: 'BRL',
        description: 'Moeda padrão',
        required: true
      },
      {
        key: 'ui.timezone.default',
        type: ConfigType.UI,
        value: 'America/Sao_Paulo',
        description: 'Fuso horário padrão',
        required: true
      },
      {
        key: 'ui.dateFormat',
        type: ConfigType.UI,
        value: 'dd/MM/yyyy',
        description: 'Formato de data padrão',
        required: true
      },
      {
        key: 'ui.timeFormat',
        type: ConfigType.UI,
        value: 'HH:mm',
        description: 'Formato de hora padrão',
        required: true
      },
      {
        key: 'ui.itemsPerPage',
        type: ConfigType.UI,
        value: 20,
        description: 'Itens por página padrão',
        required: true
      },
      {
        key: 'ui.autoRefresh',
        type: ConfigType.UI,
        value: 30000, // 30 segundos
        description: 'Intervalo de atualização automática em ms',
        required: true
      },
      {
        key: 'ui.animation.enabled',
        type: ConfigType.UI,
        value: true,
        description: 'Habilitar animações',
        required: true
      },
      {
        key: 'ui.animation.duration',
        type: ConfigType.UI,
        value: 300,
        description: 'Duração das animações em ms',
        required: true
      }
    ];

    uiConfigs.forEach(config => this.configs.set(config.key, config));
  }
}

// Inicializar sistema de configuração
ConfigSystem.initialize();

// Exportar funções utilitárias
export const getConfig = (key: string): Config | null => {
  return ConfigSystem.getConfig(key);
};

export const getValue = (key: string): any => {
  return ConfigSystem.getValue(key);
};

export const getConfigsByType = (type: ConfigType): Config[] => {
  return ConfigSystem.getConfigsByType(type);
};

export const getConfigsByEnvironment = (environment: Environment): Config[] => {
  return ConfigSystem.getConfigsByEnvironment(environment);
};

export const addConfig = (config: Config): void => {
  ConfigSystem.addConfig(config);
};

export const updateConfig = (key: string, config: Partial<Config>): void => {
  ConfigSystem.updateConfig(key, config);
};

export const removeConfig = (key: string): void => {
  ConfigSystem.removeConfig(key);
};

export const setEnvironment = (environment: Environment): void => {
  ConfigSystem.setEnvironment(environment);
};

export const getCurrentEnvironment = (): Environment => {
  return ConfigSystem.getCurrentEnvironment();
};

export const validateRequiredConfigs = (): string[] => {
  return ConfigSystem.validateRequiredConfigs();
};

// Exportar sistema completo
export default ConfigSystem; 