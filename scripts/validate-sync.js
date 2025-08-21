
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

// Aplicar validação de tipos
if (!validateType(data, 'object')) {
  throw new TypeError('Dados devem ser um objeto válido');
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

// Aplicar asserções críticas
assertCritical(data !== null, 'Dados não podem ser null');
assertCritical(typeof data === 'object', 'Dados devem ser um objeto');
assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');


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
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}


/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Implementação de funcionalidade
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - Dependências específicas do contexto
 * 
 * @usage
 * Ver documentação específica para detalhes de uso
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

#!/usr/bin/env node

/**
 * Script de Validação de Sincronização entre Plataformas
 * Verifica se as funcionalidades estão implementadas em ambas as plataformas
 */

const fs = require('fs');
const path = require('path');

// Configurações
const CONFIG = {
  backend: {
    path: './backend/src',
    routes: './routes',
    controllers: './controllers'
  },
  web: {
    path: './frontend/public',
    screens: './',
    api: './js/api'
  },
  mobile: {
    path: './DOMv2Android/src',
    screens: './screens',
    hooks: './hooks',
    navigation: './navigation'
  }
};

// Funcionalidades do sistema
const FUNCTIONALITIES = [
  {
    name: 'Dashboard',
    backend: ['dashboard-prisma'],
    web: ['dashboard.html'],
    mobile: ['DashboardScreen.tsx', 'AppNavigator.tsx']
  },
  {
    name: 'Tarefas',
    backend: ['task'],
    web: ['tasks-management.html'],
    mobile: ['TasksScreen.tsx', 'useTasks.ts']
  },
  {
    name: 'Funcionários',
    backend: ['employee'],
    web: ['employees-management.html'],
    mobile: ['EmployeesScreen.tsx', 'useEmployees.ts']
  },
  {
    name: 'Pagamentos',
    backend: ['payment'],
    web: ['payments-management.html'],
    mobile: ['PaymentsScreen.tsx', 'usePayments.ts']
  },
  {
    name: 'Orçamento',
    backend: ['budget'],
    web: ['budget-management.html'],
    mobile: ['BudgetScreen.tsx', 'useBudget.ts']
  },
  {
    name: 'Documentos',
    backend: ['documents-prisma'],
    web: ['documents-management.html'],
    mobile: ['DocumentsScreen.tsx', 'useDocuments.ts']
  },
  {
    name: 'Notificações',
    backend: ['notifications-prisma'],
    web: ['notifications.html'],
    mobile: ['NotificationsScreen.tsx', 'useNotifications.ts']
  },
  {
    name: 'Perfil',
    backend: ['profile'],
    web: ['profile.html'],
    mobile: ['ProfileScreen.tsx', 'useProfile.ts']
  },
  {
    name: 'Configurações',
    backend: ['settings-prisma'],
    web: ['settings.html'],
    mobile: ['SettingsScreen.tsx', 'useSettings.ts']
  }
];

class SyncValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      error: '❌',
      warning: '⚠️',
      success: '✅',
      info: 'ℹ️'
    }[type];

    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  checkFileExists(filePath, description) {
    try {
      if (fs.existsSync(filePath)) {
        this.success.push(`${description}: ${filePath}`);
        return true;
      } else {
        this.errors.push(`${description}: ${filePath} - ARQUIVO NÃO ENCONTRADO`);
        return false;
      }
    } catch (error) {
      this.errors.push(`${description}: ${filePath} - ERRO AO VERIFICAR: ${error.message}`);
      return false;
    }
  }

  checkDirectoryExists(dirPath, description) {
    try {
      if (fs.existsSync(dirPath)) {
        this.success.push(`${description}: ${dirPath}`);
        return true;
      } else {
        this.errors.push(`${description}: ${dirPath} - DIRETÓRIO NÃO ENCONTRADO`);
        return false;
      }
    } catch (error) {
      this.errors.push(`${description}: ${dirPath} - ERRO AO VERIFICAR: ${error.message}`);
      return false;
    }
  }

  checkBackendFunctionality(func) {
    this.log(`Verificando backend para: ${func.name}`, 'info');
    
    let backendOk = true;
    
    // Verificar rotas
    func.backend.forEach(route => {
      let routePath;
      if (route.includes('-prisma')) {
        // Se já tem -prisma, usar como está
        routePath = path.join(CONFIG.backend.path, CONFIG.backend.routes, `${route}.ts`);
      } else {
        // Se não tem -prisma, adicionar s-prisma
        routePath = path.join(CONFIG.backend.path, CONFIG.backend.routes, `${route}s-prisma.ts`);
      }
      if (!this.checkFileExists(routePath, `Rota ${route}`)) {
        backendOk = false;
      }
    });

    // Verificar controladores
    func.backend.forEach(controller => {
      const controllerPath = path.join(CONFIG.backend.path, CONFIG.backend.controllers, `${controller}-controller-prisma.ts`);
      if (!this.checkFileExists(controllerPath, `Controlador ${controller}`)) {
        backendOk = false;
      }
    });

    return backendOk;
  }

  checkWebFunctionality(func) {
    this.log(`Verificando web para: ${func.name}`, 'info');
    
    let webOk = true;
    
    // Verificar telas HTML
    func.web.forEach(screen => {
      const screenPath = path.join(CONFIG.web.path, screen);
      if (!this.checkFileExists(screenPath, `Tela web ${screen}`)) {
        webOk = false;
      }
    });

    return webOk;
  }

  checkMobileFunctionality(func) {
    this.log(`Verificando mobile para: ${func.name}`, 'info');
    
    let mobileOk = true;
    
    // Verificar telas
    func.mobile.forEach(screen => {
      if (screen.endsWith('Screen.tsx')) {
        const screenPath = path.join(CONFIG.mobile.path, CONFIG.mobile.screens, screen);
        if (!this.checkFileExists(screenPath, `Tela mobile ${screen}`)) {
          mobileOk = false;
        }
      } else if (screen.endsWith('.ts')) {
        const hookPath = path.join(CONFIG.mobile.path, CONFIG.mobile.hooks, screen);
        if (!this.checkFileExists(hookPath, `Hook ${screen}`)) {
          mobileOk = false;
        }
      } else if (screen.includes('Navigator')) {
        const navPath = path.join(CONFIG.mobile.path, CONFIG.mobile.navigation, screen);
        if (!this.checkFileExists(navPath, `Navegação ${screen}`)) {
          mobileOk = false;
        }
      }
    });

    return mobileOk;
  }

  checkMenuIntegration() {
    this.log('Verificando integração no menu', 'info');
    
    // Verificar menu web
    const webMenuPath = path.join(CONFIG.web.path, 'dashboard.html');
    if (fs.existsSync(webMenuPath)) {
      const webContent = fs.readFileSync(webMenuPath, 'utf8');
      const hasDocumentsInWebMenu = webContent.includes('documents-management.html');
      
      if (hasDocumentsInWebMenu) {
        this.success.push('Menu web: Documentos integrado');
      } else {
        this.warnings.push('Menu web: Documentos não encontrado no menu');
      }
    }

    // Verificar menu mobile
    const mobileMenuPath = path.join(CONFIG.mobile.path, 'micro-frontends/shared/components/layout/SideMenu.tsx');
    if (fs.existsSync(mobileMenuPath)) {
      const mobileContent = fs.readFileSync(mobileMenuPath, 'utf8');
      const hasDocumentsInMobileMenu = mobileContent.includes('documents') || mobileContent.includes('Documentos');
      
      if (hasDocumentsInMobileMenu) {
        this.success.push('Menu mobile: Documentos integrado');
      } else {
        this.warnings.push('Menu mobile: Documentos não encontrado no menu');
      }
    }
  }

  checkAPIIntegration() {
    this.log('Verificando integração com API', 'info');
    
    // Verificar se a API está rodando
    const http = require('http');
    
    return new Promise((resolve) => {
      const req = http.request({
        hostname: 'localhost',
        port: 3001,
        path: '/health',
        method: 'GET',
        timeout: 5000
      }, (res) => {
        if (res.statusCode === 200) {
          this.success.push('API: Servidor rodando na porta 3001');
          resolve(true);
        } else {
          this.warnings.push(`API: Servidor retornou status ${res.statusCode}`);
          resolve(false);
        }
      });

      req.on('error', (error) => {
        this.warnings.push(`API: Servidor não está rodando - ${error.message}`);
        resolve(false);
      });

      req.on('timeout', () => {
        this.warnings.push('API: Timeout ao conectar com servidor');
        resolve(false);
      });

      req.end();
    });
  }

  async validate() {
    this.log('🚀 Iniciando validação de sincronização entre plataformas...', 'info');
    this.log('', 'info');

    // Verificar estrutura de diretórios
    this.log('📁 Verificando estrutura de diretórios...', 'info');
    this.checkDirectoryExists(CONFIG.backend.path, 'Backend');
    this.checkDirectoryExists(CONFIG.web.path, 'Frontend Web');
    this.checkDirectoryExists(CONFIG.mobile.path, 'Frontend Mobile');
    this.log('', 'info');

    // Verificar funcionalidades
    this.log('🔧 Verificando funcionalidades...', 'info');
    for (const func of FUNCTIONALITIES) {
      this.log(``, 'info');
      this.log(`📋 ${func.name}`, 'info');
      
      const backendOk = this.checkBackendFunctionality(func);
      const webOk = this.checkWebFunctionality(func);
      const mobileOk = this.checkMobileFunctionality(func);

      if (backendOk && webOk && mobileOk) {
        this.success.push(`${func.name}: Implementação completa`);
      } else if (!backendOk) {
        this.errors.push(`${func.name}: Backend não implementado`);
      } else if (!webOk && !mobileOk) {
        this.errors.push(`${func.name}: Frontend não implementado`);
      } else if (!webOk) {
        this.warnings.push(`${func.name}: Web não implementado`);
      } else if (!mobileOk) {
        this.warnings.push(`${func.name}: Mobile não implementado`);
      }
    }

    this.log('', 'info');
    this.log('🔗 Verificando integração...', 'info');
    
    // Verificar integração no menu
    this.checkMenuIntegration();
    
    // Verificar API
    await this.checkAPIIntegration();

    // Relatório final
    this.log('', 'info');
    this.log('📊 RELATÓRIO DE VALIDAÇÃO', 'info');
    this.log('', 'info');

    if (this.success.length > 0) {
      this.log('✅ SUCESSOS:', 'success');
      this.success.forEach(item => this.log(`  ${item}`, 'success'));
      this.log('', 'info');
    }

    if (this.warnings.length > 0) {
      this.log('⚠️ AVISOS:', 'warning');
      this.warnings.forEach(item => this.log(`  ${item}`, 'warning'));
      this.log('', 'info');
    }

    if (this.errors.length > 0) {
      this.log('❌ ERROS:', 'error');
      this.errors.forEach(item => this.log(`  ${item}`, 'error'));
      this.log('', 'info');
    }

    // Resumo
    const total = this.success.length + this.warnings.length + this.errors.length;
    this.log(`📈 RESUMO: ${this.success.length} sucessos, ${this.warnings.length} avisos, ${this.errors.length} erros`, 'info');

    if (this.errors.length === 0) {
      this.log('🎉 Validação concluída com sucesso!', 'success');
      process.exit(0);
    } else {
      this.log('⚠️ Validação concluída com erros que precisam ser corrigidos.', 'warning');
      process.exit(1);
    }
  }
}

// Executar validação
if (require.main === module) {
  const validator = new SyncValidator();
  validator.validate().catch(error => {
    console.error('❌ Erro durante validação:', error);
    process.exit(1);
  });
}

module.exports = { SyncValidator, FUNCTIONALITIES, CONFIG };
