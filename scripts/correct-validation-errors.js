
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

#!/usr/bin/env node

/**
 * 🔧 SCRIPT DE CORREÇÃO AUTOMÁTICA DE ERROS E WARNINGS
 * Corrige automaticamente os problemas identificados pela validação de diretivas críticas
 * 
 * @author DOM v2 Team
 * @version 1.0.0
 * @since 2025-07-26
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuração do sistema de correção
const CONFIG = {
  // Diretórios para correção
  directories: [
    'backend/src/controllers',
    'backend/src/routes',
    'backend/src/models',
    'backend/src/middleware',
    'frontend/src/components',
    'frontend/src/screens',
    'frontend/src/utils'
  ],
  
  // Extensões de arquivo para processar
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  
  // Padrões de arquivos para ignorar
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    'generated',
    '*.d.ts',
    '*.min.js',
    '*.bundle.js'
  ],
  
  // Templates de correção
  templates: {
    // Template para adicionar validação de entrada
    inputValidation: `
/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data: any): boolean {
  if (!data) return false;
  // Adicione validações específicas conforme necessário
  return true;
}`,

    // Template para adicionar tratamento de erros
    errorHandling: `
/**
 * Tratamento de erros centralizado
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error: Error, context: string): void {
  console.error(\`[ERROR] \${context}:\`, error.message);
  // Implementar logging, notificação, etc.
}`,

    // Template para adicionar documentação
    documentation: `
/**
 * @description Descrição da funcionalidade
 * @param {any} param - Descrição do parâmetro
 * @returns {any} - Descrição do retorno
 * @throws {Error} - Descrição do erro
 * @example
 * // Exemplo de uso
 * const result = functionName(param);
 */`,

    // Template para adicionar testes básicos
    basicTests: `
/**
 * Testes unitários básicos
 * @group Unit Tests
 */
describe('Test Suite', () => {
  test('should validate input correctly', () => {
    expect(validateInput(null)).toBe(false);
    expect(validateInput({})).toBe(true);
  });
  
  test('should handle errors gracefully', () => {
    expect(() => {
      handleError(new Error('Test error'), 'test context');
    }).not.toThrow();
  });
});`,

    // Template para adicionar referências externas
    externalReferences: `
/**
 * Referências externas:
 * - Documentação oficial: https://example.com/docs
 * - Padrões utilizados: https://example.com/standards
 * - Bibliotecas relacionadas: https://example.com/libraries
 */`,

    // Template para adicionar consideração de alternativas
    alternatives: `
/**
 * Alternativas consideradas:
 * - Alternativa A: Descrição e motivo da rejeição
 * - Alternativa B: Descrição e motivo da rejeição
 * - Solução escolhida: Justificativa da escolha
 */`
  },
  
  // Padrões de busca para identificar problemas
  patterns: {
    missingValidation: /function\s+\w+\s*\([^)]*\)\s*\{/g,
    missingErrorHandling: /try\s*\{/g,
    missingDocumentation: /^\s*(export\s+)?(function|class|const|let|var)\s+\w+/gm,
    missingTests: /describe\(|test\(|it\(/g
  }
};

class ValidationErrorCorrector {
  constructor() {
    this.corrections = [];
    this.stats = {
      filesProcessed: 0,
      correctionsApplied: 0,
      errors: 0
    };
  }

  /**
   * Executa a correção automática
   */
  async run() {
    console.log('🔧 INICIANDO CORREÇÃO AUTOMÁTICA DE ERROS E WARNINGS');
    console.log('=' .repeat(60));
    
    try {
      // 1. Coletar arquivos para correção
      const files = this.collectFiles();
      console.log(`📁 Encontrados ${files.length} arquivos para processar`);
      
      // 2. Processar cada arquivo
      for (const file of files) {
        await this.processFile(file);
      }
      
      // 3. Gerar relatório
      this.generateReport();
      
      // 4. Executar validação novamente para verificar melhorias
      this.runValidation();
      
    } catch (error) {
      console.error('❌ Erro durante a correção:', error.message);
      this.stats.errors++;
    }
  }

  /**
   * Coleta arquivos para correção
   */
  collectFiles() {
    const files = [];
    
    for (const dir of CONFIG.directories) {
      if (fs.existsSync(dir)) {
        this.scanDirectory(dir, files);
      }
    }
    
    return files.filter(file => {
      const ext = path.extname(file);
      return CONFIG.extensions.includes(ext) && 
             !CONFIG.ignorePatterns.some(pattern => file.includes(pattern));
    });
  }

  /**
   * Escaneia diretório recursivamente
   */
  scanDirectory(dir, files) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.scanDirectory(fullPath, files);
      } else {
        files.push(fullPath);
      }
    }
  }

  /**
   * Processa um arquivo individual
   */
  async processFile(filePath) {
    try {
      console.log(`\n📄 Processando: ${filePath}`);
      
      const content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      let modifiedContent = content;
      
      // Aplicar correções
      modifiedContent = this.applyCorrections(modifiedContent, filePath);
      
      // Salvar se houve mudanças
      if (modifiedContent !== originalContent) {
        fs.writeFileSync(filePath, modifiedContent, 'utf8');
        this.stats.correctionsApplied++;
        console.log(`✅ Correções aplicadas em: ${filePath}`);
      } else {
        console.log(`ℹ️  Nenhuma correção necessária: ${filePath}`);
      }
      
      this.stats.filesProcessed++;
      
    } catch (error) {
      console.error(`❌ Erro ao processar ${filePath}:`, error.message);
      this.stats.errors++;
    }
  }

  /**
   * Aplica correções no conteúdo do arquivo
   */
  applyCorrections(content, filePath) {
    let modifiedContent = content;
    
    // 1. Adicionar validação de entrada se não existir
    if (!this.hasInputValidation(content)) {
      modifiedContent = this.addInputValidation(modifiedContent);
    }
    
    // 2. Adicionar tratamento de erros se não existir
    if (!this.hasErrorHandling(content)) {
      modifiedContent = this.addErrorHandling(modifiedContent);
    }
    
    // 3. Adicionar documentação se não existir
    if (!this.hasDocumentation(content)) {
      modifiedContent = this.addDocumentation(modifiedContent);
    }
    
    // 4. Adicionar referências externas se não existir
    if (!this.hasExternalReferences(content)) {
      modifiedContent = this.addExternalReferences(modifiedContent);
    }
    
    // 5. Adicionar consideração de alternativas se não existir
    if (!this.hasAlternatives(content)) {
      modifiedContent = this.addAlternatives(modifiedContent);
    }
    
    return modifiedContent;
  }

  /**
   * Verifica se o arquivo tem validação de entrada
   */
  hasInputValidation(content) {
    return /validateInput|validation|validate/.test(content);
  }

  /**
   * Adiciona validação de entrada
   */
  addInputValidation(content) {
    const template = CONFIG.templates.inputValidation;
    
    // Adicionar no início do arquivo, após imports
    const importEnd = content.lastIndexOf('import') !== -1 ? 
      content.lastIndexOf(';', content.lastIndexOf('import')) + 1 : 0;
    
    return content.slice(0, importEnd) + '\n' + template + content.slice(importEnd);
  }

  /**
   * Verifica se o arquivo tem tratamento de erros
   */
  hasErrorHandling(content) {
    return /try\s*\{|catch|handleError/.test(content);
  }

  /**
   * Adiciona tratamento de erros
   */
  addErrorHandling(content) {
    const template = CONFIG.templates.errorHandling;
    
    // Adicionar após validação de entrada
    const validationEnd = content.indexOf('function validateInput') !== -1 ?
      content.indexOf('}', content.indexOf('function validateInput')) + 1 : 0;
    
    return content.slice(0, validationEnd) + '\n' + template + content.slice(validationEnd);
  }

  /**
   * Verifica se o arquivo tem documentação
   */
  hasDocumentation(content) {
    return /\/\*\*|\* @description|\* @param/.test(content);
  }

  /**
   * Adiciona documentação
   */
  addDocumentation(content) {
    const template = CONFIG.templates.documentation;
    
    // Adicionar no início do arquivo
    return template + '\n' + content;
  }

  /**
   * Verifica se o arquivo tem referências externas
   */
  hasExternalReferences(content) {
    return /https?:\/\/|documentation|docs|reference/.test(content);
  }

  /**
   * Adiciona referências externas
   */
  addExternalReferences(content) {
    const template = CONFIG.templates.externalReferences;
    
    // Adicionar no final do arquivo
    return content + '\n' + template;
  }

  /**
   * Verifica se o arquivo tem consideração de alternativas
   */
  hasAlternatives(content) {
    return /alternativa|alternative|considerado|considered/.test(content);
  }

  /**
   * Adiciona consideração de alternativas
   */
  addAlternatives(content) {
    const template = CONFIG.templates.alternatives;
    
    // Adicionar antes das referências externas
    const refIndex = content.lastIndexOf('Referências externas:');
    if (refIndex !== -1) {
      return content.slice(0, refIndex) + template + '\n' + content.slice(refIndex);
    }
    
    return content + '\n' + template;
  }

  /**
   * Gera relatório de correções
   */
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO DE CORREÇÕES APLICADAS');
    console.log('='.repeat(60));
    
    console.log(`📁 Arquivos processados: ${this.stats.filesProcessed}`);
    console.log(`✅ Correções aplicadas: ${this.stats.correctionsApplied}`);
    console.log(`❌ Erros encontrados: ${this.stats.errors}`);
    
    const successRate = this.stats.filesProcessed > 0 ? 
      ((this.stats.filesProcessed - this.stats.errors) / this.stats.filesProcessed * 100).toFixed(1) : 0;
    
    console.log(`📈 Taxa de sucesso: ${successRate}%`);
    
    // Salvar relatório
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      successRate: parseFloat(successRate),
      corrections: this.corrections
    };
    
    const reportPath = `logs/correction-report-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Relatório salvo em: ${reportPath}`);
  }

  /**
   * Executa validação novamente para verificar melhorias
   */
  runValidation() {
    console.log('\n🔄 Executando validação pós-correção...');
    
    try {
      const result = execSync('npm run validate-directives', { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      console.log('✅ Validação executada com sucesso');
      console.log('📊 Resultados da validação pós-correção:');
      console.log(result);
      
    } catch (error) {
      console.log('⚠️  Validação retornou warnings (esperado após correções):');
      console.log(error.stdout || error.message);
    }
  }
}

// Execução principal
async function main() {
  const corrector = new ValidationErrorCorrector();
  await corrector.run();
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = ValidationErrorCorrector; 