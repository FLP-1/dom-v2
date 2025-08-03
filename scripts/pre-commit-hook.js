
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
 * Este arquivo implementa Custom Hook React
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
 * 🛡️ PRE-COMMIT HOOK - VALIDAÇÃO AUTOMÁTICA DE DIRETIVAS CRÍTICAS
 * 
 * Este hook é executado automaticamente antes de cada commit,
 * garantindo que o código siga as diretivas críticas.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurações
const CONFIG = {
  // Comandos de validação
  commands: {
    validateDirectives: 'npm run validate-directives',
    checkDirectives: 'npm run check-diretivas',
    test: 'npm test',
    lint: 'npm run lint'
  },
  
  // Arquivos que devem ser validados
  filePatterns: [
    '**/*.js',
    '**/*.ts',
    '**/*.tsx',
    '**/*.md'
  ],
  
  // Diretórios para ignorar
  ignorePatterns: [
    'node_modules/**',
    'dist/**',
    'build/**',
    'logs/**',
    '*.log'
  ],
  
  // Limites de qualidade
  thresholds: {
    minScore: 60, // Pontuação mínima aceitável
    maxIssues: 10, // Máximo de issues críticas
    maxWarnings: 20 // Máximo de warnings
  }
};

/**
 * Classe principal do pre-commit hook
 */
class PreCommitHook {
  constructor() {
    this.stagedFiles = this.getStagedFiles();
    this.results = {
      passed: true,
      errors: [],
      warnings: [],
      summary: {
        filesChecked: 0,
        filesPassed: 0,
        filesFailed: 0,
        totalIssues: 0
      }
    };
  }

  /**
   * Executa o hook completo
   */
  async run() {
    console.log('🛡️ PRE-COMMIT HOOK - VALIDAÇÃO DE DIRETIVAS CRÍTICAS');
    console.log('=' .repeat(60));
    
    try {
      // 1. Verificar se há arquivos staged
      if (this.stagedFiles.length === 0) {
        console.log('✅ Nenhum arquivo para validar');
        return true;
      }
      
      console.log(`📁 Arquivos para validar: ${this.stagedFiles.length}\n`);
      
      // 2. Executar validações
      await this.runValidations();
      
      // 3. Gerar relatório
      this.generateReport();
      
      // 4. Decidir se permite commit
      return this.shouldAllowCommit();
      
    } catch (error) {
      console.error('❌ Erro no pre-commit hook:', error.message);
      return false;
    }
  }

  /**
   * Obtém arquivos staged no git
   */
  getStagedFiles() {
    try {
      const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
      return output.split('\n').filter(file => file.trim() && this.shouldValidateFile(file));
    } catch (error) {
      console.warn('⚠️ Não foi possível obter arquivos staged:', error.message);
      return [];
    }
  }

  /**
   * Verifica se arquivo deve ser validado
   */
  shouldValidateFile(filePath) {
    // Verificar se está nos padrões ignorados
    for (const pattern of CONFIG.ignorePatterns) {
      if (filePath.includes(pattern.replace('**', ''))) {
        return false;
      }
    }
    
    // Verificar se tem extensão válida
    const ext = path.extname(filePath);
    return CONFIG.filePatterns.some(pattern => 
      pattern.includes(ext) || pattern.includes('**')
    );
  }

  /**
   * Executa todas as validações
   */
  async runValidations() {
    const validations = [
      { name: 'Validação de Diretivas', command: CONFIG.commands.validateDirectives },
      { name: 'Verificação de Diretivas', command: CONFIG.commands.checkDirectives },
      { name: 'Testes', command: CONFIG.commands.test, optional: true },
      { name: 'Linting', command: CONFIG.commands.lint, optional: true }
    ];

    for (const validation of validations) {
      await this.runValidation(validation);
    }
  }

  /**
   * Executa uma validação específica
   */
  async runValidation(validation) {
    console.log(`🔍 Executando: ${validation.name}...`);
    
    try {
      const output = execSync(validation.command, { 
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 30000 // 30 segundos timeout
      });
      
      console.log(`✅ ${validation.name}: PASSED`);
      this.results.summary.filesPassed++;
      
    } catch (error) {
      console.log(`❌ ${validation.name}: FAILED`);
      console.log(error.stdout || error.message);
      
      this.results.summary.filesFailed++;
      this.results.errors.push({
        validation: validation.name,
        error: error.message,
        output: error.stdout || ''
      });
      
      // Se não é opcional, falha o commit
      if (!validation.optional) {
        this.results.passed = false;
      }
    }
    
    console.log('');
  }

  /**
   * Gera relatório de validação
   */
  generateReport() {
    console.log('📊 RELATÓRIO DE VALIDAÇÃO');
    console.log('=' .repeat(40));
    
    console.log(`📁 Arquivos verificados: ${this.results.summary.filesChecked}`);
    console.log(`✅ Validações passaram: ${this.results.summary.filesPassed}`);
    console.log(`❌ Validações falharam: ${this.results.summary.filesFailed}`);
    console.log(`🚨 Issues encontradas: ${this.results.summary.totalIssues}`);
    
    if (this.results.errors.length > 0) {
      console.log('\n🚨 ERROS ENCONTRADOS:');
      this.results.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error.validation}: ${error.error}`);
      });
    }
    
    if (this.results.warnings.length > 0) {
      console.log('\n⚠️ AVISOS:');
      this.results.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. ${warning}`);
      });
    }
  }

  /**
   * Decide se permite o commit
   */
  shouldAllowCommit() {
    if (!this.results.passed) {
      console.log('\n❌ COMMIT BLOQUEADO');
      console.log('Corrija os erros acima antes de fazer commit.');
      console.log('\n💡 DICAS:');
      console.log('  • Execute: npm run validate-directives');
      console.log('  • Verifique a documentação: docs/directives/guia-rapido-diretivas-criticas.md');
      console.log('  • Consulte a equipe se necessário');
      return false;
    }
    
    if (this.results.summary.totalIssues > CONFIG.thresholds.maxIssues) {
      console.log('\n⚠️ COMMIT COM AVISO');
      console.log(`Muitas issues encontradas (${this.results.summary.totalIssues}).`);
      console.log('Considere corrigir antes de prosseguir.');
      return true; // Permite mas com aviso
    }
    
    console.log('\n✅ COMMIT PERMITIDO');
    console.log('Todas as validações passaram!');
    return true;
  }

  /**
   * Salva log da validação
   */
  saveLog() {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      stagedFiles: this.stagedFiles,
      results: this.results,
      config: CONFIG
    };
    
    const logDir = 'logs';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logFile = path.join(logDir, `pre-commit-${timestamp.replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));
  }
}

/**
 * Função principal
 */
async function main() {
  try {
    const hook = new PreCommitHook();
    const success = await hook.run();
    
    // Salvar log
    hook.saveLog();
    
    // Retornar código de saída
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Erro fatal no pre-commit hook:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { PreCommitHook, CONFIG }; 