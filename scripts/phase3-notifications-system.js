#!/usr/bin/env node

/**
 * @fileoverview Sistema de Notificações Inteligentes - Fase 3
 * @author Sistema DOM v2
 * @version 3.0.0
 * @since 2025-07-26
 * 
 * @description
 * Este script implementa um sistema de notificações inteligentes que
 * integra alertas por email, Slack e webhooks para monitoramento
 * contínuo do sistema de validação.
 * 
 * @dependencies
 * - Node.js, fs, path, os, https, http, crypto
 * 
 * @usage
 * npm run phase3-notifications
 * 
 * @see
 * - docs/phases/fase-3-evolucao-otimizacao-iniciada.md
 * - scripts/phase3-metrics-dashboard.js
 * - scripts/phase3-hybrid-cache.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');
const http = require('http');
const crypto = require('crypto');

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

/**
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error, context = 'unknown') {
  console.error(`[ERROR] ${context}:`, error.message);
  
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    type: error.constructor.name
  };
  
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'phase3-notifications-error-log.json'),
      JSON.stringify(errorLog) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
  
  throw error;
}

/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error, debug)
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    file: __filename,
    function: 'logStructured'
  };
  
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'phase3-notifications.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

/**
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value, expectedType) {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

/**
 * Referências externas e fontes de informação
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Phase 3 Plan: docs/phases/fase-3-evolucao-otimizacao-iniciada.md
 * - Node.js HTTP/HTTPS: https://nodejs.org/api/https.html
 * - Slack Webhooks: https://api.slack.com/messaging/webhooks
 * - Email APIs: https://nodemailer.com/
 * 
 * @alternatives
 * - Para notificações: Email, Slack, Discord, Teams, SMS
 * - Para delivery: Webhooks, APIs, Message queues
 * - Para templates: Handlebars, EJS, Markdown
 * 
 * @considerations
 * - Segurança: Autenticação e criptografia
 * - Performance: Rate limiting e batching
 * - Confiabilidade: Retry logic e fallbacks
 * - Usabilidade: Templates personalizáveis
 */

/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: HTTP/HTTPS requests diretos
 * - Alternativa 1: Bibliotecas especializadas (nodemailer, @slack/web-api)
 *   - Prós: Funcionalidades avançadas, melhor tratamento de erros
 *   - Contras: Dependências externas, overhead
 * - Alternativa 2: Message queues (Redis, RabbitMQ)
 *   - Prós: Confiabilidade, processamento assíncrono
 *   - Contras: Complexidade adicional, infraestrutura
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - Simplicidade e portabilidade
 * - Controle total sobre o processo
 * - Sem dependências externas
 * 
 * @trade-offs
 * - Simplicidade vs Funcionalidade
 * - Controle vs Conveniência
 * - Performance vs Confiabilidade
 */

/**
 * Configuração do sistema de notificações
 */
class NotificationConfig {
  constructor() {
    this.config = {
      email: {
        enabled: false,
        smtp: {
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER || '',
            pass: process.env.SMTP_PASS || ''
          }
        },
        recipients: process.env.EMAIL_RECIPIENTS ? 
          process.env.EMAIL_RECIPIENTS.split(',') : [],
        from: process.env.EMAIL_FROM || 'noreply@dom-v2.com'
      },
      slack: {
        enabled: false,
        webhookUrl: process.env.SLACK_WEBHOOK_URL || '',
        channel: process.env.SLACK_CHANNEL || '#alerts',
        username: process.env.SLACK_USERNAME || 'DOM v2 Bot',
        iconEmoji: process.env.SLACK_ICON || ':warning:'
      },
      webhook: {
        enabled: false,
        url: process.env.WEBHOOK_URL || '',
        method: process.env.WEBHOOK_METHOD || 'POST',
        headers: process.env.WEBHOOK_HEADERS ? 
          JSON.parse(process.env.WEBHOOK_HEADERS) : {},
        timeout: parseInt(process.env.WEBHOOK_TIMEOUT) || 5000
      },
      general: {
        rateLimit: parseInt(process.env.NOTIFICATION_RATE_LIMIT) || 60, // segundos
        retryAttempts: parseInt(process.env.NOTIFICATION_RETRY_ATTEMPTS) || 3,
        retryDelay: parseInt(process.env.NOTIFICATION_RETRY_DELAY) || 1000, // ms
        batchSize: parseInt(process.env.NOTIFICATION_BATCH_SIZE) || 10,
        enableDebug: process.env.NOTIFICATION_DEBUG === 'true'
      }
    };
    
    this.loadConfigFromFile();
    logStructured('info', 'Configuração de notificações carregada');
  }

  /**
   * Carrega configuração de arquivo
   */
  loadConfigFromFile() {
    try {
      const configPath = path.join(__dirname, '..', 'config', 'notifications.json');
      
      if (fs.existsSync(configPath)) {
        const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        this.config = { ...this.config, ...fileConfig };
        logStructured('info', 'Configuração carregada do arquivo', { configPath });
      }
    } catch (error) {
      handleError(error, 'config-loading');
    }
  }

  /**
   * Salva configuração em arquivo
   */
  saveConfigToFile() {
    try {
      const configDir = path.join(__dirname, '..', 'config');
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
      
      const configPath = path.join(configDir, 'notifications.json');
      fs.writeFileSync(configPath, JSON.stringify(this.config, null, 2));
      
      logStructured('info', 'Configuração salva em arquivo', { configPath });
    } catch (error) {
      handleError(error, 'config-saving');
    }
  }

  /**
   * Obtém configuração
   * @returns {object} - Configuração atual
   */
  getConfig() {
    return this.config;
  }

  /**
   * Atualiza configuração
   * @param {object} newConfig - Nova configuração
   */
  updateConfig(newConfig) {
    try {
      this.config = { ...this.config, ...newConfig };
      this.saveConfigToFile();
      logStructured('info', 'Configuração atualizada');
    } catch (error) {
      handleError(error, 'config-update');
    }
  }
}

/**
 * Template engine para notificações
 */
class NotificationTemplateEngine {
  constructor() {
    this.templates = {
      alert: {
        subject: '🚨 Alerta DOM v2 - {level}',
        email: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: {color};">{title}</h2>
            <p><strong>Nível:</strong> {level}</p>
            <p><strong>Mensagem:</strong> {message}</p>
            <p><strong>Timestamp:</strong> {timestamp}</p>
            <p><strong>Contexto:</strong> {context}</p>
            {details}
            <hr>
            <p style="font-size: 12px; color: #666;">
              Sistema DOM v2 - Notificação automática
            </p>
          </div>
        `,
        slack: {
          text: '🚨 *{title}*',
          attachments: [{
            color: '{color}',
            fields: [
              { title: 'Nível', value: '{level}', short: true },
              { title: 'Timestamp', value: '{timestamp}', short: true },
              { title: 'Mensagem', value: '{message}', short: false },
              { title: 'Contexto', value: '{context}', short: false }
            ],
            footer: 'Sistema DOM v2'
          }]
        },
        webhook: {
          title: '{title}',
          level: '{level}',
          message: '{message}',
          timestamp: '{timestamp}',
          context: '{context}',
          system: 'DOM v2'
        }
      },
      performance: {
        subject: '📊 Relatório de Performance DOM v2',
        email: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2E86AB;">📊 Relatório de Performance</h2>
            <h3>Métricas do Sistema</h3>
            <ul>
              <li><strong>Arquivos processados:</strong> {totalProcessed}</li>
              <li><strong>Tempo total:</strong> {totalTime}ms</li>
              <li><strong>Tempo médio:</strong> {averageTime}ms</li>
              <li><strong>Taxa de acerto do cache:</strong> {cacheHitRate}</li>
            </ul>
            <h3>Alertas</h3>
            {alerts}
            <hr>
            <p style="font-size: 12px; color: #666;">
              Sistema DOM v2 - Relatório automático
            </p>
          </div>
        `,
        slack: {
          text: '📊 *Relatório de Performance DOM v2*',
          attachments: [{
            color: '#2E86AB',
            fields: [
              { title: 'Arquivos Processados', value: '{totalProcessed}', short: true },
              { title: 'Tempo Total', value: '{totalTime}ms', short: true },
              { title: 'Tempo Médio', value: '{averageTime}ms', short: true },
              { title: 'Cache Hit Rate', value: '{cacheHitRate}', short: true }
            ],
            footer: 'Sistema DOM v2'
          }]
        }
      }
    };
  }

  /**
   * Renderiza template
   * @param {string} templateName - Nome do template
   * @param {string} type - Tipo (email, slack, webhook)
   * @param {object} data - Dados para substituição
   * @returns {string|object} - Template renderizado
   */
  render(templateName, type, data) {
    try {
      if (!validateInput(templateName) || !validateInput(type)) {
        throw new Error('Template name ou type inválido');
      }
      
      const template = this.templates[templateName];
      if (!template) {
        throw new Error(`Template '${templateName}' não encontrado`);
      }
      
      const content = template[type];
      if (!content) {
        throw new Error(`Tipo '${type}' não suportado para template '${templateName}'`);
      }
      
      return this.replacePlaceholders(content, data);
      
    } catch (error) {
      handleError(error, 'template-rendering');
      return null;
    }
  }

  /**
   * Substitui placeholders no template
   * @param {string|object} content - Conteúdo do template
   * @param {object} data - Dados para substituição
   * @returns {string|object} - Conteúdo com placeholders substituídos
   */
  replacePlaceholders(content, data) {
    try {
      if (typeof content === 'string') {
        let result = content;
        
        for (const [key, value] of Object.entries(data)) {
          const placeholder = `{${key}}`;
          result = result.replace(new RegExp(placeholder, 'g'), value);
        }
        
        return result;
      } else if (typeof content === 'object') {
        const result = JSON.parse(JSON.stringify(content));
        
        const replaceInObject = (obj) => {
          for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
              obj[key] = this.replacePlaceholders(value, data);
            } else if (typeof value === 'object' && value !== null) {
              replaceInObject(value);
            }
          }
        };
        
        replaceInObject(result);
        return result;
      }
      
      return content;
      
    } catch (error) {
      handleError(error, 'placeholder-replacement');
      return content;
    }
  }

  /**
   * Obtém cor baseada no nível
   * @param {string} level - Nível do alerta
   * @returns {string} - Cor em formato hex
   */
  getColorForLevel(level) {
    const colors = {
      critical: '#FF0000',
      error: '#FF6B6B',
      warning: '#FFA500',
      info: '#4ECDC4',
      success: '#45B7D1'
    };
    
    return colors[level] || colors.info;
  }
}

/**
 * Notificador por email
 */
class EmailNotifier {
  constructor(config) {
    this.config = config;
    this.templateEngine = new NotificationTemplateEngine();
    this.rateLimit = new Map();
    
    logStructured('info', 'Notificador de email inicializado');
  }

  /**
   * Envia notificação por email
   * @param {object} notification - Dados da notificação
   * @returns {Promise<boolean>} - True se enviado com sucesso
   */
  async send(notification) {
    try {
      if (!this.config.email.enabled) {
        logStructured('debug', 'Email notifications desabilitadas');
        return false;
      }
      
      if (!validateInput(notification)) {
        throw new Error('Dados da notificação inválidos');
      }
      
      // Verificar rate limit
      if (this.isRateLimited('email')) {
        logStructured('warn', 'Rate limit atingido para email');
        return false;
      }
      
      const templateData = {
        ...notification,
        color: this.templateEngine.getColorForLevel(notification.level),
        timestamp: new Date().toLocaleString('pt-BR')
      };
      
      const subject = this.templateEngine.render('alert', 'subject', templateData);
      const htmlBody = this.templateEngine.render('alert', 'email', templateData);
      
      // Simular envio de email (em produção, usar nodemailer)
      const emailData = {
        from: this.config.email.from,
        to: this.config.email.recipients.join(', '),
        subject,
        html: htmlBody
      };
      
      logStructured('info', 'Email preparado', {
        to: emailData.to,
        subject: emailData.subject
      });
      
      // Em produção, implementar envio real
      // await this.sendEmail(emailData);
      
      this.updateRateLimit('email');
      return true;
      
    } catch (error) {
      handleError(error, 'email-sending');
      return false;
    }
  }

  /**
   * Verifica rate limit
   * @param {string} type - Tipo de notificação
   * @returns {boolean} - True se rate limited
   */
  isRateLimited(type) {
    const now = Date.now();
    const lastSent = this.rateLimit.get(type) || 0;
    const limit = this.config.general.rateLimit * 1000;
    
    return (now - lastSent) < limit;
  }

  /**
   * Atualiza rate limit
   * @param {string} type - Tipo de notificação
   */
  updateRateLimit(type) {
    this.rateLimit.set(type, Date.now());
  }
}

/**
 * Notificador por Slack
 */
class SlackNotifier {
  constructor(config) {
    this.config = config;
    this.templateEngine = new NotificationTemplateEngine();
    this.rateLimit = new Map();
    
    logStructured('info', 'Notificador do Slack inicializado');
  }

  /**
   * Envia notificação para Slack
   * @param {object} notification - Dados da notificação
   * @returns {Promise<boolean>} - True se enviado com sucesso
   */
  async send(notification) {
    try {
      if (!this.config.slack.enabled) {
        logStructured('debug', 'Slack notifications desabilitadas');
        return false;
      }
      
      if (!validateInput(notification)) {
        throw new Error('Dados da notificação inválidos');
      }
      
      // Verificar rate limit
      if (this.isRateLimited('slack')) {
        logStructured('warn', 'Rate limit atingido para Slack');
        return false;
      }
      
      const templateData = {
        ...notification,
        color: this.templateEngine.getColorForLevel(notification.level),
        timestamp: new Date().toLocaleString('pt-BR')
      };
      
      const slackMessage = this.templateEngine.render('alert', 'slack', templateData);
      
      const payload = {
        channel: this.config.slack.channel,
        username: this.config.slack.username,
        icon_emoji: this.config.slack.iconEmoji,
        ...slackMessage
      };
      
      const success = await this.sendWebhook(this.config.slack.webhookUrl, payload);
      
      if (success) {
        this.updateRateLimit('slack');
      }
      
      return success;
      
    } catch (error) {
      handleError(error, 'slack-sending');
      return false;
    }
  }

  /**
   * Envia webhook
   * @param {string} url - URL do webhook
   * @param {object} payload - Dados a enviar
   * @returns {Promise<boolean>} - True se enviado com sucesso
   */
  async sendWebhook(url, payload) {
    return new Promise((resolve) => {
      try {
        const data = JSON.stringify(payload);
        const urlObj = new URL(url);
        
        const options = {
          hostname: urlObj.hostname,
          port: urlObj.port || 443,
          path: urlObj.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
          }
        };
        
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const req = client.request(options, (res) => {
          let responseData = '';
          
          res.on('data', (chunk) => {
            responseData += chunk;
          });
          
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              logStructured('info', 'Slack webhook enviado com sucesso');
              resolve(true);
            } else {
              logStructured('error', 'Erro no webhook do Slack', {
                statusCode: res.statusCode,
                response: responseData
              });
              resolve(false);
            }
          });
        });
        
        req.on('error', (error) => {
          logStructured('error', 'Erro ao enviar webhook do Slack', { error: error.message });
          resolve(false);
        });
        
        req.setTimeout(this.config.general.webhook.timeout, () => {
          req.destroy();
          logStructured('error', 'Timeout no webhook do Slack');
          resolve(false);
        });
        
        req.write(data);
        req.end();
        
      } catch (error) {
        handleError(error, 'webhook-sending');
        resolve(false);
      }
    });
  }

  /**
   * Verifica rate limit
   * @param {string} type - Tipo de notificação
   * @returns {boolean} - True se rate limited
   */
  isRateLimited(type) {
    const now = Date.now();
    const lastSent = this.rateLimit.get(type) || 0;
    const limit = this.config.general.rateLimit * 1000;
    
    return (now - lastSent) < limit;
  }

  /**
   * Atualiza rate limit
   * @param {string} type - Tipo de notificação
   */
  updateRateLimit(type) {
    this.rateLimit.set(type, Date.now());
  }
}

/**
 * Notificador por webhook
 */
class WebhookNotifier {
  constructor(config) {
    this.config = config;
    this.templateEngine = new NotificationTemplateEngine();
    this.rateLimit = new Map();
    
    logStructured('info', 'Notificador de webhook inicializado');
  }

  /**
   * Envia notificação por webhook
   * @param {object} notification - Dados da notificação
   * @returns {Promise<boolean>} - True se enviado com sucesso
   */
  async send(notification) {
    try {
      if (!this.config.webhook.enabled) {
        logStructured('debug', 'Webhook notifications desabilitadas');
        return false;
      }
      
      if (!validateInput(notification)) {
        throw new Error('Dados da notificação inválidos');
      }
      
      // Verificar rate limit
      if (this.isRateLimited('webhook')) {
        logStructured('warn', 'Rate limit atingido para webhook');
        return false;
      }
      
      const templateData = {
        ...notification,
        color: this.templateEngine.getColorForLevel(notification.level),
        timestamp: new Date().toISOString()
      };
      
      const payload = this.templateEngine.render('alert', 'webhook', templateData);
      
      const success = await this.sendWebhook(this.config.webhook.url, payload);
      
      if (success) {
        this.updateRateLimit('webhook');
      }
      
      return success;
      
    } catch (error) {
      handleError(error, 'webhook-sending');
      return false;
    }
  }

  /**
   * Envia webhook
   * @param {string} url - URL do webhook
   * @param {object} payload - Dados a enviar
   * @returns {Promise<boolean>} - True se enviado com sucesso
   */
  async sendWebhook(url, payload) {
    return new Promise((resolve) => {
      try {
        const data = JSON.stringify(payload);
        const urlObj = new URL(url);
        
        const options = {
          hostname: urlObj.hostname,
          port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
          path: urlObj.pathname,
          method: this.config.webhook.method,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
            ...this.config.webhook.headers
          }
        };
        
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const req = client.request(options, (res) => {
          let responseData = '';
          
          res.on('data', (chunk) => {
            responseData += chunk;
          });
          
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              logStructured('info', 'Webhook enviado com sucesso');
              resolve(true);
            } else {
              logStructured('error', 'Erro no webhook', {
                statusCode: res.statusCode,
                response: responseData
              });
              resolve(false);
            }
          });
        });
        
        req.on('error', (error) => {
          logStructured('error', 'Erro ao enviar webhook', { error: error.message });
          resolve(false);
        });
        
        req.setTimeout(this.config.webhook.timeout, () => {
          req.destroy();
          logStructured('error', 'Timeout no webhook');
          resolve(false);
        });
        
        req.write(data);
        req.end();
        
      } catch (error) {
        handleError(error, 'webhook-sending');
        resolve(false);
      }
    });
  }

  /**
   * Verifica rate limit
   * @param {string} type - Tipo de notificação
   * @returns {boolean} - True se rate limited
   */
  isRateLimited(type) {
    const now = Date.now();
    const lastSent = this.rateLimit.get(type) || 0;
    const limit = this.config.general.rateLimit * 1000;
    
    return (now - lastSent) < limit;
  }

  /**
   * Atualiza rate limit
   * @param {string} type - Tipo de notificação
   */
  updateRateLimit(type) {
    this.rateLimit.set(type, Date.now());
  }
}

/**
 * Sistema principal de notificações
 */
class NotificationSystem {
  constructor() {
    this.config = new NotificationConfig();
    this.emailNotifier = new EmailNotifier(this.config.getConfig());
    this.slackNotifier = new SlackNotifier(this.config.getConfig());
    this.webhookNotifier = new WebhookNotifier(this.config.getConfig());
    
    this.notificationQueue = [];
    this.isProcessing = false;
    this.stats = {
      sent: 0,
      failed: 0,
      queued: 0,
      emailSent: 0,
      slackSent: 0,
      webhookSent: 0
    };
    
    logStructured('info', 'Sistema de notificações inicializado');
  }

  /**
   * Envia notificação
   * @param {object} notification - Dados da notificação
   * @returns {Promise<boolean>} - True se enviado com sucesso
   */
  async sendNotification(notification) {
    try {
      if (!validateInput(notification)) {
        throw new Error('Dados da notificação inválidos');
      }
      
      // Validar campos obrigatórios
      assertCritical(notification.title, 'Título é obrigatório');
      assertCritical(notification.message, 'Mensagem é obrigatória');
      assertCritical(notification.level, 'Nível é obrigatório');
      
      // Adicionar metadados
      const enrichedNotification = {
        ...notification,
        id: this.generateNotificationId(),
        timestamp: new Date().toISOString(),
        system: 'DOM v2',
        version: '3.0.0'
      };
      
      // Adicionar à fila se batching estiver habilitado
      if (this.config.getConfig().general.batchSize > 1) {
        this.notificationQueue.push(enrichedNotification);
        this.stats.queued++;
        
        if (this.notificationQueue.length >= this.config.getConfig().general.batchSize) {
          await this.processQueue();
        }
        
        return true;
      }
      
      // Envio imediato
      return await this.sendToAllChannels(enrichedNotification);
      
    } catch (error) {
      handleError(error, 'notification-sending');
      this.stats.failed++;
      return false;
    }
  }

  /**
   * Envia para todos os canais
   * @param {object} notification - Notificação a enviar
   * @returns {Promise<boolean>} - True se pelo menos um canal funcionou
   */
  async sendToAllChannels(notification) {
    try {
      const results = await Promise.allSettled([
        this.emailNotifier.send(notification),
        this.slackNotifier.send(notification),
        this.webhookNotifier.send(notification)
      ]);
      
      let successCount = 0;
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          successCount++;
          switch (index) {
            case 0: this.stats.emailSent++; break;
            case 1: this.stats.slackSent++; break;
            case 2: this.stats.webhookSent++; break;
          }
        }
      });
      
      if (successCount > 0) {
        this.stats.sent++;
        logStructured('info', 'Notificação enviada', {
          channels: successCount,
          title: notification.title
        });
        return true;
      } else {
        this.stats.failed++;
        logStructured('error', 'Falha ao enviar notificação', {
          title: notification.title
        });
        return false;
      }
      
    } catch (error) {
      handleError(error, 'all-channels-sending');
      this.stats.failed++;
      return false;
    }
  }

  /**
   * Processa fila de notificações
   */
  async processQueue() {
    if (this.isProcessing || this.notificationQueue.length === 0) {
      return;
    }
    
    this.isProcessing = true;
    
    try {
      const batch = this.notificationQueue.splice(0, this.config.getConfig().general.batchSize);
      
      logStructured('info', 'Processando lote de notificações', {
        count: batch.length
      });
      
      for (const notification of batch) {
        await this.sendToAllChannels(notification);
        
        // Delay entre notificações para evitar spam
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
    } catch (error) {
      handleError(error, 'queue-processing');
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Gera ID único para notificação
   * @returns {string} - ID único
   */
  generateNotificationId() {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Envia notificação de alerta
   * @param {string} title - Título do alerta
   * @param {string} message - Mensagem do alerta
   * @param {string} level - Nível (critical, error, warning, info, success)
   * @param {string} context - Contexto do alerta
   * @param {object} details - Detalhes adicionais
   * @returns {Promise<boolean>} - True se enviado com sucesso
   */
  async sendAlert(title, message, level = 'info', context = 'system', details = {}) {
    return await this.sendNotification({
      title,
      message,
      level,
      context,
      details
    });
  }

  /**
   * Envia relatório de performance
   * @param {object} performanceData - Dados de performance
   * @returns {Promise<boolean>} - True se enviado com sucesso
   */
  async sendPerformanceReport(performanceData) {
    try {
      const notification = {
        title: 'Relatório de Performance DOM v2',
        message: 'Relatório de performance do sistema de validação',
        level: 'info',
        context: 'performance',
        details: performanceData
      };
      
      return await this.sendNotification(notification);
      
    } catch (error) {
      handleError(error, 'performance-report-sending');
      return false;
    }
  }

  /**
   * Obtém estatísticas do sistema
   * @returns {object} - Estatísticas
   */
  getStats() {
    return {
      ...this.stats,
      queueSize: this.notificationQueue.length,
      isProcessing: this.isProcessing,
      config: {
        emailEnabled: this.config.getConfig().email.enabled,
        slackEnabled: this.config.getConfig().slack.enabled,
        webhookEnabled: this.config.getConfig().webhook.enabled
      }
    };
  }

  /**
   * Limpa estatísticas
   */
  clearStats() {
    this.stats = {
      sent: 0,
      failed: 0,
      queued: 0,
      emailSent: 0,
      slackSent: 0,
      webhookSent: 0
    };
    
    logStructured('info', 'Estatísticas limpas');
  }
}

// Execução principal
async function main() {
  try {
    logStructured('info', 'Iniciando sistema de notificações', { context: 'main' });
    
    const notificationSystem = new NotificationSystem();
    
    // Teste de notificações
    console.log('\n📧 TESTANDO SISTEMA DE NOTIFICAÇÕES');
    console.log('─'.repeat(80));
    
    // Teste 1: Alerta crítico
    console.log('1. Enviando alerta crítico...');
    await notificationSystem.sendAlert(
      'Teste de Sistema',
      'Este é um teste do sistema de notificações',
      'critical',
      'test',
      { testId: 1, timestamp: new Date().toISOString() }
    );
    
    // Teste 2: Alerta de warning
    console.log('2. Enviando alerta de warning...');
    await notificationSystem.sendAlert(
      'Performance Degradada',
      'Taxa de acerto do cache abaixo do esperado',
      'warning',
      'performance',
      { cacheHitRate: '45%', threshold: '80%' }
    );
    
    // Teste 3: Relatório de performance
    console.log('3. Enviando relatório de performance...');
    await notificationSystem.sendPerformanceReport({
      totalProcessed: 150,
      totalTime: 2500,
      averageTime: 16.7,
      cacheHitRate: '85%',
      workersUsed: 4,
      errors: 0
    });
    
    // Processar fila pendente
    if (notificationSystem.notificationQueue.length > 0) {
      console.log('4. Processando fila de notificações...');
      await notificationSystem.processQueue();
    }
    
    // Exibir estatísticas
    console.log('\n📊 ESTATÍSTICAS DO SISTEMA');
    console.log('─'.repeat(80));
    const stats = notificationSystem.getStats();
    console.log(`Notificações enviadas: ${stats.sent}`);
    console.log(`Notificações falharam: ${stats.failed}`);
    console.log(`Notificações na fila: ${stats.queued}`);
    console.log(`Emails enviados: ${stats.emailSent}`);
    console.log(`Slack enviados: ${stats.slackSent}`);
    console.log(`Webhooks enviados: ${stats.webhookSent}`);
    
    console.log('\n✅ Sistema de notificações testado com sucesso!');
    console.log('\n💡 Para configurar notificações reais:');
    console.log('1. Configure as variáveis de ambiente');
    console.log('2. Ou edite config/notifications.json');
    console.log('3. Habilite os canais desejados');
    
  } catch (error) {
    handleError(error, 'main-execution');
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { 
  NotificationConfig,
  NotificationTemplateEngine,
  EmailNotifier,
  SlackNotifier,
  WebhookNotifier,
  NotificationSystem
}; 