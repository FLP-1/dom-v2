
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
 * @fileoverview Setup Production Environment - Configuração de ambiente de produção
 * @description Configure todas as variáveis e recursos para o ambiente de produção
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-08-10
 * 
 * @usage
 * node scripts/setup-production-env.js --region=sudeste --ssl --monitoring
 * 
 * @features
 * - Configuração de variáveis de ambiente
 * - Setup de SSL/TLS
 * - Configuração de monitoramento
 * - Setup de logs estruturados
 * - Configuração de backup
 * - Configuração de CDN
 * 
 * @see
 * - docs/development/setup-env.md
 * - docs/directives/diretivas-pensamento-critico.md
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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
    script: 'setup-production-env'
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
      path.join(logsDir, 'production-setup.log'),
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

// Configuração de produção
const PRODUCTION_CONFIG = {
  regions: {
    sudeste: {
      name: 'Sudeste Brasil',
      awsRegion: 'sa-east-1',
      timezone: 'America/Sao_Paulo',
      domain: 'dom-v2.com.br',
      cdn: 'cdn.dom-v2.com.br',
      monitoring: {
        enabled: true,
        retention: '30d',
        alerting: true
      }
    }
  },
  
  security: {
    ssl: {
      enabled: true,
      tlsVersion: '1.3',
      ciphers: [
        'ECDHE-RSA-AES256-GCM-SHA384',
        'ECDHE-RSA-CHACHA20-POLY1305',
        'ECDHE-RSA-AES128-GCM-SHA256'
      ]
    },
    
    cors: {
      origins: ['https://dom-v2.com.br', 'https://app.dom-v2.com.br'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    },
    
    rateLimit: {
      windowMs: 900000, // 15 minutos
      max: 100, // limite por IP
      message: 'Muitas requisições, tente novamente em 15 minutos'
    }
  },
  
  performance: {
    caching: {
      redis: {
        enabled: true,
        ttl: 3600,
        maxMemory: '256mb'
      },
      cdn: {
        enabled: true,
        ttl: 86400,
        compression: true
      }
    },
    
    compression: {
      enabled: true,
      algorithm: 'gzip',
      level: 6
    }
  },
  
  monitoring: {
    metrics: {
      enabled: true,
      interval: 60000,
      retention: 2592000000 // 30 dias
    },
    
    logging: {
      level: 'info',
      format: 'json',
      rotation: {
        maxSize: '10mb',
        maxFiles: 10
      }
    },
    
    alerts: {
      responseTime: { threshold: 1000, severity: 'warning' },
      errorRate: { threshold: 0.05, severity: 'critical' },
      memoryUsage: { threshold: 0.85, severity: 'warning' },
      diskSpace: { threshold: 0.8, severity: 'critical' }
    }
  }
};

// Função principal
async function setupProductionEnvironment() {
  try {
    logStructured('info', '🏭 Iniciando configuração do ambiente de produção');
    
    // Validar argumentos
    const args = process.argv.slice(2);
    const region = getArgValue(args, '--region') || 'sudeste';
    const enableSsl = args.includes('--ssl');
    const enableMonitoring = args.includes('--monitoring');
    const force = args.includes('--force');
    
    assertCritical(validateInput(region), 'Região deve ser especificada');
    assertCritical(PRODUCTION_CONFIG.regions[region], `Região ${region} não configurada`);
    
    logStructured('info', 'Configuração validada', { region, enableSsl, enableMonitoring, force });
    
    const setupContext = {
      region,
      enableSsl,
      enableMonitoring,
      force,
      regionConfig: PRODUCTION_CONFIG.regions[region],
      timestamp: new Date().toISOString()
    };
    
    // Executar configuração
    await executeSetupSteps(setupContext);
    
    logStructured('info', '✅ Ambiente de produção configurado com sucesso!');
    
  } catch (error) {
    handleError(error, 'setupProductionEnvironment');
    process.exit(1);
  }
}

// Obter valor de argumento
function getArgValue(args, key) {
  const arg = args.find(arg => arg.startsWith(key + '='));
  return arg ? arg.split('=')[1] : null;
}

// Executar passos de configuração
async function executeSetupSteps(setupContext) {
  try {
    // 1. Configurar variáveis de ambiente
    await setupEnvironmentVariables(setupContext);
    
    // 2. Configurar SSL/TLS
    if (setupContext.enableSsl) {
      await setupSSL(setupContext);
    }
    
    // 3. Configurar banco de dados
    await setupDatabase(setupContext);
    
    // 4. Configurar cache e performance
    await setupPerformance(setupContext);
    
    // 5. Configurar segurança
    await setupSecurity(setupContext);
    
    // 6. Configurar monitoramento
    if (setupContext.enableMonitoring) {
      await setupMonitoring(setupContext);
    }
    
    // 7. Configurar backup
    await setupBackup(setupContext);
    
    // 8. Configurar CDN
    await setupCDN(setupContext);
    
    // 9. Gerar arquivo de configuração final
    await generateFinalConfig(setupContext);
    
  } catch (error) {
    handleError(error, 'executeSetupSteps');
    throw error;
  }
}

// Configurar variáveis de ambiente
async function setupEnvironmentVariables(setupContext) {
  try {
    logStructured('info', '🔧 Configurando variáveis de ambiente');
    
    const envVars = {
      // Environment
      NODE_ENV: 'production',
      PORT: '3001',
      
      // Region
      AWS_REGION: setupContext.regionConfig.awsRegion,
      TZ: setupContext.regionConfig.timezone,
      
      // Database
      DATABASE_URL: generateDatabaseUrl(setupContext),
      DATABASE_SSL: 'require',
      DATABASE_POOL_SIZE: '20',
      
      // Redis
      REDIS_URL: generateRedisUrl(setupContext),
      REDIS_TLS: 'true',
      
      // Security
      JWT_SECRET: generateSecureSecret(),
      SESSION_SECRET: generateSecureSecret(),
      ENCRYPTION_KEY: generateEncryptionKey(),
      
      // API Keys (placeholders - substituir por valores reais)
      SENDGRID_API_KEY: 'SG.placeholder',
      TWILIO_ACCOUNT_SID: 'AC_placeholder',
      TWILIO_AUTH_TOKEN: 'placeholder',
      
      // URLs
      API_BASE_URL: `https://api.${setupContext.regionConfig.domain}`,
      APP_BASE_URL: `https://app.${setupContext.regionConfig.domain}`,
      CDN_BASE_URL: `https://${setupContext.regionConfig.cdn}`,
      
      // Features
      ENABLE_ANALYTICS: 'true',
      ENABLE_CACHING: 'true',
      ENABLE_RATE_LIMITING: 'true',
      
      // Logging
      LOG_LEVEL: 'info',
      LOG_FORMAT: 'json',
      
      // Performance
      CLUSTER_MODE: 'true',
      MAX_WORKERS: '4',
      
      // Monitoring
      ENABLE_METRICS: setupContext.enableMonitoring ? 'true' : 'false',
      METRICS_INTERVAL: '60000',
      
      // Backup
      BACKUP_ENABLED: 'true',
      BACKUP_SCHEDULE: '0 2 * * *', // 2h da manhã todos os dias
      
      // Gamification
      GAMIFICATION_ENABLED: 'true',
      POINTS_MULTIPLIER: '1.0',
      
      // Communication
      WEBSOCKET_ENABLED: 'true',
      WEBSOCKET_COMPRESSION: 'true',
      
      // Pilot specific
      PILOT_REGION: setupContext.region,
      PILOT_START_DATE: '2025-08-10',
      PILOT_DURATION_WEEKS: '12'
    };
    
    // Gerar arquivo .env.production
    const envContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    const envPath = path.join(__dirname, '..', '.env.production');
    fs.writeFileSync(envPath, envContent);
    
    // Gerar arquivo de exemplo (sem valores sensíveis)
    const envExampleVars = { ...envVars };
    envExampleVars.JWT_SECRET = 'your-jwt-secret-here';
    envExampleVars.SESSION_SECRET = 'your-session-secret-here';
    envExampleVars.ENCRYPTION_KEY = 'your-encryption-key-here';
    envExampleVars.DATABASE_URL = 'postgresql://username:password@host:5432/database';
    envExampleVars.REDIS_URL = 'redis://username:password@host:6379';
    
    const envExampleContent = Object.entries(envExampleVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    const envExamplePath = path.join(__dirname, '..', '.env.production.example');
    fs.writeFileSync(envExamplePath, envExampleContent);
    
    logStructured('info', 'Variáveis de ambiente configuradas', { 
      envPath, 
      envExamplePath,
      variablesCount: Object.keys(envVars).length 
    });
    
  } catch (error) {
    handleError(error, 'setupEnvironmentVariables');
    throw error;
  }
}

// Gerar URL do banco de dados
function generateDatabaseUrl(setupContext) {
  const host = `db-${setupContext.region}.${setupContext.regionConfig.domain}`;
  return `postgresql://dom_v2_user:REPLACE_WITH_PASSWORD@${host}:5432/dom_v2_production?sslmode=require`;
}

// Gerar URL do Redis
function generateRedisUrl(setupContext) {
  const host = `redis-${setupContext.region}.${setupContext.regionConfig.domain}`;
  return `rediss://dom_v2_user:REPLACE_WITH_PASSWORD@${host}:6380`;
}

// Gerar secret seguro
function generateSecureSecret() {
  return crypto.randomBytes(64).toString('hex');
}

// Gerar chave de criptografia
function generateEncryptionKey() {
  return crypto.randomBytes(32).toString('hex');
}

// Configurar SSL/TLS
async function setupSSL(setupContext) {
  try {
    logStructured('info', '🔐 Configurando SSL/TLS');
    
    const sslConfig = {
      enabled: true,
      tlsVersion: PRODUCTION_CONFIG.security.ssl.tlsVersion,
      ciphers: PRODUCTION_CONFIG.security.ssl.ciphers,
      certificates: {
        domain: setupContext.regionConfig.domain,
        wildcardDomain: `*.${setupContext.regionConfig.domain}`,
        validationMethod: 'DNS',
        autoRenewal: true
      },
      hsts: {
        enabled: true,
        maxAge: 31536000, // 1 ano
        includeSubDomains: true,
        preload: true
      }
    };
    
    // Salvar configuração SSL
    const sslConfigPath = path.join(__dirname, '..', 'config', 'ssl.json');
    if (!fs.existsSync(path.dirname(sslConfigPath))) {
      fs.mkdirSync(path.dirname(sslConfigPath), { recursive: true });
    }
    fs.writeFileSync(sslConfigPath, JSON.stringify(sslConfig, null, 2));
    
    // Gerar script de configuração SSL
    const sslScript = generateSSLScript(setupContext, sslConfig);
    const sslScriptPath = path.join(__dirname, 'setup-ssl.sh');
    fs.writeFileSync(sslScriptPath, sslScript);
    fs.chmodSync(sslScriptPath, '755');
    
    logStructured('info', 'SSL/TLS configurado', { 
      configPath: sslConfigPath,
      scriptPath: sslScriptPath 
    });
    
  } catch (error) {
    handleError(error, 'setupSSL');
    throw error;
  }
}

// Gerar script SSL
function generateSSLScript(setupContext, sslConfig) {
  return `#!/bin/bash
# Script de configuração SSL para DOM v2
# Gerado automaticamente em ${new Date().toISOString()}

set -e

echo "🔐 Configurando SSL/TLS para ${setupContext.regionConfig.domain}"

# Instalar certbot se necessário
if ! command -v certbot &> /dev/null; then
    echo "Instalando certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot
fi

# Obter certificados SSL
echo "Obtendo certificados SSL..."
sudo certbot certonly \\
    --dns-route53 \\
    --email admin@${setupContext.regionConfig.domain} \\
    --agree-tos \\
    --no-eff-email \\
    -d ${setupContext.regionConfig.domain} \\
    -d *.${setupContext.regionConfig.domain}

# Configurar renovação automática
echo "Configurando renovação automática..."
echo "0 2 * * * root certbot renew --quiet" | sudo tee -a /etc/crontab

echo "✅ SSL/TLS configurado com sucesso!"
`;
}

// Configurar banco de dados
async function setupDatabase(setupContext) {
  try {
    logStructured('info', '🗄️ Configurando banco de dados');
    
    const dbConfig = {
      host: `db-${setupContext.region}.${setupContext.regionConfig.domain}`,
      port: 5432,
      database: 'dom_v2_production',
      username: 'dom_v2_user',
      ssl: true,
      poolSize: 20,
      connectionTimeout: 30000,
      idleTimeout: 600000,
      backup: {
        enabled: true,
        schedule: '0 3 * * *', // 3h da manhã todos os dias
        retention: 30, // 30 dias
        compression: true
      },
      monitoring: {
        slowQueries: true,
        threshold: 1000, // 1 segundo
        logQueries: false // apenas em desenvolvimento
      }
    };
    
    // Salvar configuração do banco
    const dbConfigPath = path.join(__dirname, '..', 'config', 'database.json');
    if (!fs.existsSync(path.dirname(dbConfigPath))) {
      fs.mkdirSync(path.dirname(dbConfigPath), { recursive: true });
    }
    fs.writeFileSync(dbConfigPath, JSON.stringify(dbConfig, null, 2));
    
    // Gerar script de inicialização do banco
    const dbScript = generateDatabaseScript(setupContext, dbConfig);
    const dbScriptPath = path.join(__dirname, 'setup-database.sql');
    fs.writeFileSync(dbScriptPath, dbScript);
    
    logStructured('info', 'Banco de dados configurado', { 
      configPath: dbConfigPath,
      scriptPath: dbScriptPath 
    });
    
  } catch (error) {
    handleError(error, 'setupDatabase');
    throw error;
  }
}

// Gerar script de banco de dados
function generateDatabaseScript(setupContext, dbConfig) {
  return `-- Script de configuração do banco de dados DOM v2
-- Gerado automaticamente em ${new Date().toISOString()}

-- Criar banco de dados
CREATE DATABASE ${dbConfig.database} 
WITH 
    ENCODING = 'UTF8'
    LC_COLLATE = 'pt_BR.UTF-8'
    LC_CTYPE = 'pt_BR.UTF-8'
    TEMPLATE = template0;

-- Conectar ao banco
\\c ${dbConfig.database};

-- Criar usuário
CREATE USER ${dbConfig.username} WITH PASSWORD 'REPLACE_WITH_SECURE_PASSWORD';

-- Conceder privilégios
GRANT ALL PRIVILEGES ON DATABASE ${dbConfig.database} TO ${dbConfig.username};
GRANT ALL ON SCHEMA public TO ${dbConfig.username};

-- Configurar timezone
SET timezone = '${setupContext.regionConfig.timezone}';

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Configurações de performance
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET max_connections = 100;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
ALTER SYSTEM SET maintenance_work_mem = '64MB';
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET default_statistics_target = 100;

-- Recarregar configurações
SELECT pg_reload_conf();

-- Comentário
COMMENT ON DATABASE ${dbConfig.database} IS 'Banco de dados de produção DOM v2 - Região ${setupContext.region}';
`;
}

// Configurar performance
async function setupPerformance(setupContext) {
  try {
    logStructured('info', '⚡ Configurando otimizações de performance');
    
    const performanceConfig = {
      caching: PRODUCTION_CONFIG.performance.caching,
      compression: PRODUCTION_CONFIG.performance.compression,
      
      optimization: {
        enableCluster: true,
        maxWorkers: 4,
        gracefulShutdown: 30000,
        requestTimeout: 30000,
        bodyLimit: '50mb'
      },
      
      staticAssets: {
        maxAge: 31536000, // 1 ano
        compression: true,
        etag: true,
        lastModified: true
      }
    };
    
    // Salvar configuração de performance
    const perfConfigPath = path.join(__dirname, '..', 'config', 'performance.json');
    if (!fs.existsSync(path.dirname(perfConfigPath))) {
      fs.mkdirSync(path.dirname(perfConfigPath), { recursive: true });
    }
    fs.writeFileSync(perfConfigPath, JSON.stringify(performanceConfig, null, 2));
    
    logStructured('info', 'Performance configurada', { configPath: perfConfigPath });
    
  } catch (error) {
    handleError(error, 'setupPerformance');
    throw error;
  }
}

// Configurar segurança
async function setupSecurity(setupContext) {
  try {
    logStructured('info', '🛡️ Configurando segurança');
    
    const securityConfig = {
      cors: PRODUCTION_CONFIG.security.cors,
      rateLimit: PRODUCTION_CONFIG.security.rateLimit,
      
      headers: {
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'", `wss://${setupContext.regionConfig.domain}`]
          }
        },
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true
        },
        noSniff: true,
        frameguard: { action: 'deny' },
        xssFilter: true
      },
      
      authentication: {
        sessionTimeout: 1800000, // 30 minutos
        maxLoginAttempts: 5,
        lockoutDuration: 900000, // 15 minutos
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true
        }
      },
      
      encryption: {
        algorithm: 'aes-256-gcm',
        keyRotation: 7776000000 // 90 dias
      }
    };
    
    // Salvar configuração de segurança
    const secConfigPath = path.join(__dirname, '..', 'config', 'security.json');
    if (!fs.existsSync(path.dirname(secConfigPath))) {
      fs.mkdirSync(path.dirname(secConfigPath), { recursive: true });
    }
    fs.writeFileSync(secConfigPath, JSON.stringify(securityConfig, null, 2));
    
    logStructured('info', 'Segurança configurada', { configPath: secConfigPath });
    
  } catch (error) {
    handleError(error, 'setupSecurity');
    throw error;
  }
}

// Configurar monitoramento
async function setupMonitoring(setupContext) {
  try {
    logStructured('info', '📊 Configurando monitoramento');
    
    const monitoringConfig = {
      ...PRODUCTION_CONFIG.monitoring,
      
      region: setupContext.region,
      environment: 'production',
      
      dashboards: {
        main: `https://monitoring.${setupContext.regionConfig.domain}/dashboard`,
        errors: `https://monitoring.${setupContext.regionConfig.domain}/errors`,
        performance: `https://monitoring.${setupContext.regionConfig.domain}/performance`
      },
      
      endpoints: {
        health: '/health',
        metrics: '/metrics',
        status: '/status'
      },
      
      notifications: {
        email: [`admin@${setupContext.regionConfig.domain}`],
        slack: {
          enabled: false,
          webhook: 'REPLACE_WITH_SLACK_WEBHOOK'
        },
        sms: {
          enabled: false,
          numbers: []
        }
      }
    };
    
    // Salvar configuração de monitoramento
    const monConfigPath = path.join(__dirname, '..', 'config', 'monitoring.json');
    if (!fs.existsSync(path.dirname(monConfigPath))) {
      fs.mkdirSync(path.dirname(monConfigPath), { recursive: true });
    }
    fs.writeFileSync(monConfigPath, JSON.stringify(monitoringConfig, null, 2));
    
    logStructured('info', 'Monitoramento configurado', { configPath: monConfigPath });
    
  } catch (error) {
    handleError(error, 'setupMonitoring');
    throw error;
  }
}

// Configurar backup
async function setupBackup(setupContext) {
  try {
    logStructured('info', '💾 Configurando backup');
    
    const backupConfig = {
      enabled: true,
      schedule: '0 2 * * *', // 2h da manhã todos os dias
      retention: {
        daily: 7,
        weekly: 4,
        monthly: 12
      },
      
      targets: {
        database: {
          enabled: true,
          compression: true,
          encryption: true
        },
        files: {
          enabled: true,
          paths: ['/app/uploads', '/app/logs'],
          compression: true
        },
        configuration: {
          enabled: true,
          paths: ['/app/config'],
          encryption: true
        }
      },
      
      storage: {
        type: 's3',
        bucket: `dom-v2-backups-${setupContext.region}`,
        region: setupContext.regionConfig.awsRegion,
        encryption: 'AES256'
      },
      
      verification: {
        enabled: true,
        schedule: '0 4 * * 1', // Segunda-feira às 4h
        testRestore: true
      }
    };
    
    // Salvar configuração de backup
    const backupConfigPath = path.join(__dirname, '..', 'config', 'backup.json');
    if (!fs.existsSync(path.dirname(backupConfigPath))) {
      fs.mkdirSync(path.dirname(backupConfigPath), { recursive: true });
    }
    fs.writeFileSync(backupConfigPath, JSON.stringify(backupConfig, null, 2));
    
    // Gerar script de backup
    const backupScript = generateBackupScript(setupContext, backupConfig);
    const backupScriptPath = path.join(__dirname, 'backup.sh');
    fs.writeFileSync(backupScriptPath, backupScript);
    fs.chmodSync(backupScriptPath, '755');
    
    logStructured('info', 'Backup configurado', { 
      configPath: backupConfigPath,
      scriptPath: backupScriptPath 
    });
    
  } catch (error) {
    handleError(error, 'setupBackup');
    throw error;
  }
}

// Gerar script de backup
function generateBackupScript(setupContext, backupConfig) {
  return `#!/bin/bash
# Script de backup DOM v2
# Gerado automaticamente em ${new Date().toISOString()}

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/tmp/dom_v2_backup_$TIMESTAMP"
S3_BUCKET="${backupConfig.storage.bucket}"

echo "🔄 Iniciando backup DOM v2 - $TIMESTAMP"

# Criar diretório temporário
mkdir -p $BACKUP_DIR

# Backup do banco de dados
echo "📊 Fazendo backup do banco de dados..."
pg_dump $DATABASE_URL | gzip > $BACKUP_DIR/database_$TIMESTAMP.sql.gz

# Backup de arquivos
echo "📁 Fazendo backup de arquivos..."
tar -czf $BACKUP_DIR/files_$TIMESTAMP.tar.gz ${backupConfig.targets.files.paths.join(' ')}

# Backup de configurações
echo "⚙️ Fazendo backup de configurações..."
tar -czf $BACKUP_DIR/config_$TIMESTAMP.tar.gz ${backupConfig.targets.configuration.paths.join(' ')}

# Upload para S3
echo "☁️ Enviando para S3..."
aws s3 sync $BACKUP_DIR s3://$S3_BUCKET/daily/$(date +%Y/%m/%d)/ --sse AES256

# Limpeza
echo "🧹 Limpando arquivos temporários..."
rm -rf $BACKUP_DIR

# Verificar retenção
echo "📅 Aplicando política de retenção..."
aws s3 ls s3://$S3_BUCKET/daily/ --recursive | awk '{print $4}' | sort | head -n -${backupConfig.retention.daily} | xargs -I {} aws s3 rm s3://$S3_BUCKET/{} 2>/dev/null || true

echo "✅ Backup concluído com sucesso!"
`;
}

// Configurar CDN
async function setupCDN(setupContext) {
  try {
    logStructured('info', '🌐 Configurando CDN');
    
    const cdnConfig = {
      enabled: true,
      domain: setupContext.regionConfig.cdn,
      origins: [
        {
          domain: `api.${setupContext.regionConfig.domain}`,
          path: '/static/*',
          ttl: 31536000 // 1 ano
        },
        {
          domain: `app.${setupContext.regionConfig.domain}`,
          path: '/assets/*',
          ttl: 31536000 // 1 ano
        }
      ],
      
      caching: {
        defaultTtl: 86400, // 1 dia
        maxTtl: 31536000, // 1 ano
        compression: true,
        browserCaching: true
      },
      
      security: {
        httpsRedirect: true,
        tlsVersion: '1.2',
        waf: {
          enabled: true,
          rules: ['CommonAttacks', 'SQLInjection', 'XSS']
        }
      },
      
      geoBlocking: {
        enabled: false,
        allowedCountries: ['BR']
      }
    };
    
    // Salvar configuração de CDN
    const cdnConfigPath = path.join(__dirname, '..', 'config', 'cdn.json');
    if (!fs.existsSync(path.dirname(cdnConfigPath))) {
      fs.mkdirSync(path.dirname(cdnConfigPath), { recursive: true });
    }
    fs.writeFileSync(cdnConfigPath, JSON.stringify(cdnConfig, null, 2));
    
    logStructured('info', 'CDN configurado', { configPath: cdnConfigPath });
    
  } catch (error) {
    handleError(error, 'setupCDN');
    throw error;
  }
}

// Gerar configuração final
async function generateFinalConfig(setupContext) {
  try {
    logStructured('info', '📋 Gerando configuração final');
    
    const finalConfig = {
      environment: 'production',
      region: setupContext.region,
      timestamp: setupContext.timestamp,
      domain: setupContext.regionConfig.domain,
      
      services: {
        api: {
          url: `https://api.${setupContext.regionConfig.domain}`,
          healthCheck: `https://api.${setupContext.regionConfig.domain}/health`
        },
        app: {
          url: `https://app.${setupContext.regionConfig.domain}`,
          healthCheck: `https://app.${setupContext.regionConfig.domain}/`
        },
        cdn: {
          url: `https://${setupContext.regionConfig.cdn}`,
          healthCheck: `https://${setupContext.regionConfig.cdn}/health`
        }
      },
      
      features: {
        ssl: setupContext.enableSsl,
        monitoring: setupContext.enableMonitoring,
        backup: true,
        caching: true,
        compression: true,
        gamification: true,
        communication: true,
        pilotAnalytics: true
      },
      
      deployment: {
        strategy: 'blue-green',
        rollbackEnabled: true,
        healthChecks: true,
        monitoringDuration: 300000 // 5 minutos
      }
    };
    
    // Salvar configuração final
    const finalConfigPath = path.join(__dirname, '..', 'config', 'production.json');
    if (!fs.existsSync(path.dirname(finalConfigPath))) {
      fs.mkdirSync(path.dirname(finalConfigPath), { recursive: true });
    }
    fs.writeFileSync(finalConfigPath, JSON.stringify(finalConfig, null, 2));
    
    // Gerar checklist de deploy
    const checklist = generateDeployChecklist(setupContext, finalConfig);
    const checklistPath = path.join(__dirname, 'production-checklist.md');
    fs.writeFileSync(checklistPath, checklist);
    
    logStructured('info', 'Configuração final gerada', { 
      configPath: finalConfigPath,
      checklistPath 
    });
    
    // Exibir resumo
    console.log('\n🎯 RESUMO DA CONFIGURAÇÃO DE PRODUÇÃO');
    console.log('======================================');
    console.log(`📍 Região: ${setupContext.region}`);
    console.log(`🌐 Domínio: ${setupContext.regionConfig.domain}`);
    console.log(`🔐 SSL: ${setupContext.enableSsl ? 'Habilitado' : 'Desabilitado'}`);
    console.log(`📊 Monitoramento: ${setupContext.enableMonitoring ? 'Habilitado' : 'Desabilitado'}`);
    console.log(`📋 Checklist: ${checklistPath}`);
    console.log(`⚙️ Configuração: ${finalConfigPath}`);
    
  } catch (error) {
    handleError(error, 'generateFinalConfig');
    throw error;
  }
}

// Gerar checklist de deploy
function generateDeployChecklist(setupContext, finalConfig) {
  return `# 📋 Checklist de Deploy de Produção - DOM v2

**Região:** ${setupContext.region}  
**Data:** ${new Date().toISOString()}  
**Domínio:** ${setupContext.regionConfig.domain}

## ✅ Pré-Deploy

- [ ] Variáveis de ambiente configuradas
- [ ] Certificados SSL obtidos ${setupContext.enableSsl ? '✅' : '❌'}
- [ ] Banco de dados configurado
- [ ] Redis configurado
- [ ] CDN configurado
- [ ] Monitoramento configurado ${setupContext.enableMonitoring ? '✅' : '❌'}
- [ ] Backup configurado
- [ ] Testes de integração executados
- [ ] Revisão de código aprovada

## ✅ Deploy

- [ ] Build de produção executado
- [ ] Deploy para ambiente staging
- [ ] Testes de smoke executados
- [ ] Deploy para produção executado
- [ ] Health checks passando
- [ ] Métricas estáveis

## ✅ Pós-Deploy

- [ ] Funcionalidades principais testadas
- [ ] Monitoramento ativo
- [ ] Alertas configurados
- [ ] Backup funcionando
- [ ] Documentação atualizada
- [ ] Equipe notificada

## 🔗 Links Importantes

- **API Health:** ${finalConfig.services.api.healthCheck}
- **App Health:** ${finalConfig.services.app.healthCheck}
- **CDN Health:** ${finalConfig.services.cdn.healthCheck}
- **Monitoramento:** https://monitoring.${setupContext.regionConfig.domain}
- **Logs:** https://logs.${setupContext.regionConfig.domain}

## 📞 Contatos de Emergência

- **DevOps:** devops@${setupContext.regionConfig.domain}
- **Backend:** backend@${setupContext.regionConfig.domain}
- **Frontend:** frontend@${setupContext.regionConfig.domain}

---

**Gerado automaticamente pelo script de configuração de produção DOM v2**
`;
}

// Executar script se chamado diretamente
if (require.main === module) {
  setupProductionEnvironment().catch(error => {
    handleError(error, 'main');
    process.exit(1);
  });
}

module.exports = {
  setupProductionEnvironment,
  PRODUCTION_CONFIG
};
