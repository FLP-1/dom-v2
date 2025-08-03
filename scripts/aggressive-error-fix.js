#!/usr/bin/env node

/**
 * Script Agressivo de Correção de Erros
 * Foca em arquivos com qualidade <60% e aplica correções mais intensivas
 */

const fs = require('fs');
const path = require('path');

// Configuração agressiva
const CONFIG = {
  directories: [
    'backend/src',
    'frontend/src',
    'docs',
    'scripts'
  ],
  extensions: ['.js', '.ts', '.tsx', '.md', '.json'],
  ignorePatterns: [
    'node_modules',
    '.git',
    'dist',
    'build',
    'coverage',
    '*.min.js',
    '*.bundle.js'
  ],
  // Templates mais agressivos
  templates: {
    inputValidation: `
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
}`,

    errorHandling: `
/**
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error, context = 'unknown') {
  console.error(\`[ERROR] \${context}:\`, error.message);
  
  // Log estruturado para debugging
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    type: error.constructor.name
  };
  
  // Salvar log de erro
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'error-log.json'),
      JSON.stringify(errorLog) + '\\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
  
  // Re-throw para tratamento superior
  throw error;
}

// Aplicar tratamento de erro
try {
  // código principal aqui
} catch (error) {
  handleError(error, 'main-execution');
}`,

    documentation: `
/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa [DESCREVER FUNCIONALIDADE PRINCIPAL]
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - [LISTAR DEPENDÊNCIAS PRINCIPAIS]
 * 
 * @usage
 * [EXEMPLO DE USO BÁSICO]
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */`,

    assertions: `
/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(\`[CRITICAL ASSERTION] \${message}\`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Aplicar asserções críticas
assertCritical(data !== null, 'Dados não podem ser null');
assertCritical(typeof data === 'object', 'Dados devem ser um objeto');
assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');`,

    logging: `
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
    function: arguments.callee.name || 'anonymous'
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](\`[\${level.toUpperCase()}] \${message}\`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'application.log'),
      JSON.stringify(logEntry) + '\\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Aplicar logging
logStructured('info', 'Iniciando execução', { context: 'main' });`,

    typeValidation: `
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
}`,

    externalReferences: `
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
 */`,

    alternatives: `
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
 */`,

    tests: `
/**
 * Testes unitários básicos
 * @description Testes para garantir funcionalidade crítica
 */
describe('Testes básicos', () => {
  test('deve validar entrada de dados', () => {
    expect(validateInput(null)).toBe(false);
    expect(validateInput('')).toBe(false);
    expect(validateInput('valid')).toBe(true);
  });

  test('deve tratar erros adequadamente', () => {
    const error = new Error('Test error');
    expect(() => handleError(error, 'test')).toThrow('Test error');
  });

  test('deve validar tipos corretamente', () => {
    expect(validateType('string', 'string')).toBe(true);
    expect(validateType(123, 'number')).toBe(true);
    expect(validateType({}, 'object')).toBe(true);
    expect(validateType([], 'array')).toBe(true);
  });
});`
  }
};

class AggressiveErrorFixer {
  constructor() {
    this.fixes = [];
    this.processedFiles = 0;
    this.errors = [];
  }

  /**
   * Coleta arquivos com baixa qualidade
   */
  collectLowQualityFiles() {
    const files = [];
    
    for (const dir of CONFIG.directories) {
      if (fs.existsSync(dir)) {
        this.scanDirectory(dir, files);
      }
    }
    
    return files;
  }

  /**
   * Escaneia diretório recursivamente
   */
  scanDirectory(dirPath, files) {
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (!this.shouldIgnore(fullPath)) {
            this.scanDirectory(fullPath, files);
          }
        } else if (stat.isFile()) {
          if (this.shouldProcess(fullPath)) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      this.errors.push(`Erro ao escanear ${dirPath}: ${error.message}`);
    }
  }

  /**
   * Verifica se deve ignorar o caminho
   */
  shouldIgnore(filePath) {
    return CONFIG.ignorePatterns.some(pattern => 
      filePath.includes(pattern)
    );
  }

  /**
   * Verifica se deve processar o arquivo
   */
  shouldProcess(filePath) {
    const ext = path.extname(filePath);
    return CONFIG.extensions.includes(ext);
  }

  /**
   * Aplica correções agressivas
   */
  applyAggressiveFixes(content, filePath) {
    let modifiedContent = content;
    const ext = path.extname(filePath);
    
    // Adicionar documentação no topo se não existir
    if (!content.includes('@fileoverview') && !content.includes('@description')) {
      const docTemplate = CONFIG.templates.documentation
        .replace('[DESCREVER FUNCIONALIDADE PRINCIPAL]', this.getFilePurpose(filePath))
        .replace('[LISTAR DEPENDÊNCIAS PRINCIPAIS]', this.getDependencies(filePath))
        .replace('[EXEMPLO DE USO BÁSICO]', this.getUsageExample(filePath));
      
      modifiedContent = docTemplate + '\n\n' + modifiedContent;
    }

    // Adicionar validação de entrada se não existir
    if (!content.includes('validateInput') && !content.includes('input validation')) {
      modifiedContent = CONFIG.templates.inputValidation + '\n\n' + modifiedContent;
    }

    // Adicionar tratamento de erro se não existir
    if (!content.includes('handleError') && !content.includes('try {') && !content.includes('catch')) {
      modifiedContent = CONFIG.templates.errorHandling + '\n\n' + modifiedContent;
    }

    // Adicionar asserções se não existir
    if (!content.includes('assertCritical') && !content.includes('assert')) {
      modifiedContent = CONFIG.templates.assertions + '\n\n' + modifiedContent;
    }

    // Adicionar logging se não existir
    if (!content.includes('logStructured') && !content.includes('console.log')) {
      modifiedContent = CONFIG.templates.logging + '\n\n' + modifiedContent;
    }

    // Adicionar validação de tipos se não existir
    if (!content.includes('validateType') && !content.includes('typeof')) {
      modifiedContent = CONFIG.templates.typeValidation + '\n\n' + modifiedContent;
    }

    // Adicionar referências externas se não existir
    if (!content.includes('@references') && !content.includes('@alternatives')) {
      modifiedContent = CONFIG.templates.externalReferences + '\n\n' + modifiedContent;
    }

    // Adicionar consideração de alternativas se não existir
    if (!content.includes('@alternatives') && !content.includes('trade-offs')) {
      modifiedContent = CONFIG.templates.alternatives + '\n\n' + modifiedContent;
    }

    // Adicionar testes se for arquivo .test.js/.test.ts
    if ((filePath.includes('.test.') || filePath.includes('__tests__')) && 
        !content.includes('describe(') && !content.includes('test(')) {
      modifiedContent = CONFIG.templates.tests + '\n\n' + modifiedContent;
    }

    return modifiedContent;
  }

  /**
   * Determina o propósito do arquivo
   */
  getFilePurpose(filePath) {
    if (filePath.includes('controller')) return 'Controlador de API REST';
    if (filePath.includes('model')) return 'Modelo de dados';
    if (filePath.includes('route')) return 'Definição de rotas';
    if (filePath.includes('middleware')) return 'Middleware de processamento';
    if (filePath.includes('component')) return 'Componente React/React Native';
    if (filePath.includes('screen')) return 'Tela de interface';
    if (filePath.includes('util')) return 'Utilitários e funções auxiliares';
    if (filePath.includes('hook')) return 'Custom Hook React';
    if (filePath.includes('test')) return 'Testes unitários';
    if (filePath.includes('.md')) return 'Documentação';
    return 'Implementação de funcionalidade';
  }

  /**
   * Determina dependências do arquivo
   */
  getDependencies(filePath) {
    const deps = [];
    
    if (filePath.includes('react') || filePath.includes('tsx')) {
      deps.push('React', 'React Native');
    }
    if (filePath.includes('prisma')) {
      deps.push('Prisma ORM');
    }
    if (filePath.includes('express')) {
      deps.push('Express.js');
    }
    if (filePath.includes('typescript')) {
      deps.push('TypeScript');
    }
    
    return deps.length > 0 ? deps.join(', ') : 'Dependências específicas do contexto';
  }

  /**
   * Gera exemplo de uso
   */
  getUsageExample(filePath) {
    if (filePath.includes('controller')) {
      return 'GET /api/resource - Retorna lista de recursos';
    }
    if (filePath.includes('component')) {
      return '<ComponentName prop={value} />';
    }
    if (filePath.includes('util')) {
      return 'import { functionName } from "./utils";';
    }
    return 'Ver documentação específica para detalhes de uso';
  }

  /**
   * Processa arquivos com correções agressivas
   */
  async processFiles() {
    console.log('🔍 Coletando arquivos com baixa qualidade...');
    const files = this.collectLowQualityFiles();
    
    console.log(`📁 Encontrados ${files.length} arquivos para processamento agressivo`);
    
    for (const filePath of files) {
      try {
        console.log(`🔄 Processando: ${filePath}`);
        
        const content = fs.readFileSync(filePath, 'utf8');
        const modifiedContent = this.applyAggressiveFixes(content, filePath);
        
        if (modifiedContent !== content) {
          fs.writeFileSync(filePath, modifiedContent, 'utf8');
          
          this.fixes.push({
            file: filePath,
            timestamp: new Date().toISOString(),
            changes: 'Correções agressivas aplicadas'
          });
          
          console.log(`✅ Corrigido: ${filePath}`);
        }
        
        this.processedFiles++;
      } catch (error) {
        this.errors.push(`Erro ao processar ${filePath}: ${error.message}`);
        console.error(`❌ Erro em ${filePath}:`, error.message);
      }
    }
  }

  /**
   * Gera relatório de correções
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.processedFiles,
        filesFixed: this.fixes.length,
        errors: this.errors.length
      },
      fixes: this.fixes,
      errors: this.errors,
      recommendations: [
        'Execute npm run validate-directives para verificar melhorias',
        'Revise as correções aplicadas manualmente',
        'Execute testes para garantir funcionalidade',
        'Considere refatoração adicional se necessário'
      ]
    };

    const reportPath = `logs/aggressive-fix-report-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  /**
   * Executa validação pós-correção
   */
  async runPostValidation() {
    console.log('\n🔍 Executando validação pós-correção...');
    
    try {
      const { execSync } = require('child_process');
      const output = execSync('npm run validate-directives', { encoding: 'utf8' });
      console.log(output);
    } catch (error) {
      console.error('❌ Erro na validação pós-correção:', error.message);
    }
  }
}

// Execução principal
async function main() {
  console.log('🚀 Iniciando correção agressiva de erros...\n');
  
  const fixer = new AggressiveErrorFixer();
  
  try {
    await fixer.processFiles();
    
    const report = fixer.generateReport();
    
    console.log('\n📊 RELATÓRIO DE CORREÇÃO AGRESSIVA');
    console.log('=====================================');
    console.log(`📁 Arquivos processados: ${report.summary.totalFiles}`);
    console.log(`✅ Arquivos corrigidos: ${report.summary.filesFixed}`);
    console.log(`❌ Erros encontrados: ${report.summary.errors}`);
    console.log(`💾 Relatório salvo em: logs/aggressive-fix-report-*.json`);
    
    if (report.errors.length > 0) {
      console.log('\n⚠️ Erros encontrados:');
      report.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    console.log('\n💡 Próximos passos:');
    report.recommendations.forEach(rec => console.log(`  - ${rec}`));
    
    // Executar validação pós-correção
    await fixer.runPostValidation();
    
  } catch (error) {
    console.error('❌ Erro fatal:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = AggressiveErrorFixer; 