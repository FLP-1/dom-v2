
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
 * 🛡️ COMMIT-MSG HOOK - VALIDAÇÃO DE MENSAGENS DE COMMIT
 * 
 * Este hook valida se as mensagens de commit seguem as diretivas críticas
 * e padrões de qualidade estabelecidos.
 */

const fs = require('fs');
const path = require('path');

// Configurações
const CONFIG = {
  // Padrões de mensagem de commit
  patterns: {
    // Tipos de commit válidos
    types: [
      'feat', 'fix', 'docs', 'style', 'refactor', 
      'test', 'chore', 'perf', 'ci', 'build',
      'revert', 'wip', 'hotfix', 'security'
    ],
    
    // Palavras-chave que indicam pensamento crítico
    criticalKeywords: [
      'validado', 'testado', 'verificado', 'documentado',
      'validated', 'tested', 'verified', 'documented',
      'revisado', 'analisado', 'confirmado', 'aprovado'
    ],
    
    // Palavras que devem ser evitadas
    avoidWords: [
      'talvez', 'possivelmente', 'provavelmente', 'maybe',
      'perhaps', 'probably', 'assumindo', 'assuming'
    ]
  },
  
  // Limites
  limits: {
    minLength: 10,
    maxLength: 72,
    maxBodyLength: 1000
  }
};

/**
 * Classe de validação de mensagens de commit
 */
class CommitMsgValidator {
  constructor() {
    this.commitMsgFile = process.argv[2];
    this.results = {
      valid: true,
      errors: [],
      warnings: [],
      suggestions: []
    };
  }

  /**
   * Executa validação completa
   */
  validate() {
    try {
      // 1. Ler mensagem do commit
      const commitMsg = this.readCommitMessage();
      
      // 2. Validar estrutura básica
      this.validateBasicStructure(commitMsg);
      
      // 3. Validar conteúdo
      this.validateContent(commitMsg);
      
      // 4. Validar diretivas críticas
      this.validateCriticalThinking(commitMsg);
      
      // 5. Gerar feedback
      this.generateFeedback();
      
      return this.results.valid;
      
    } catch (error) {
      console.error('❌ Erro na validação:', error.message);
      return false;
    }
  }

  /**
   * Lê a mensagem do commit
   */
  readCommitMessage() {
    if (!this.commitMsgFile || !fs.existsSync(this.commitMsgFile)) {
      throw new Error('Arquivo de mensagem de commit não encontrado');
    }
    
    return fs.readFileSync(this.commitMsgFile, 'utf8');
  }

  /**
   * Valida estrutura básica da mensagem
   */
  validateBasicStructure(commitMsg) {
    const lines = commitMsg.split('\n');
    const subject = lines[0];
    
    // Verificar comprimento mínimo
    if (subject.length < CONFIG.limits.minLength) {
      this.results.errors.push(`Mensagem muito curta (${subject.length} chars). Mínimo: ${CONFIG.limits.minLength}`);
      this.results.valid = false;
    }
    
    // Verificar comprimento máximo
    if (subject.length > CONFIG.limits.maxLength) {
      this.results.errors.push(`Mensagem muito longa (${subject.length} chars). Máximo: ${CONFIG.limits.maxLength}`);
      this.results.valid = false;
    }
    
    // Verificar se começa com tipo válido
    const typeMatch = subject.match(/^(\w+):/);
    if (!typeMatch) {
      this.results.warnings.push('Considere usar formato: tipo: descrição (ex: feat: adicionar validação)');
    } else {
      const type = typeMatch[1];
      if (!CONFIG.patterns.types.includes(type)) {
        this.results.warnings.push(`Tipo "${type}" não reconhecido. Tipos válidos: ${CONFIG.patterns.types.join(', ')}`);
      }
    }
    
    // Verificar se termina com ponto
    if (subject.endsWith('.')) {
      this.results.warnings.push('Evite terminar mensagem com ponto');
    }
  }

  /**
   * Valida conteúdo da mensagem
   */
  validateContent(commitMsg) {
    const lines = commitMsg.split('\n');
    const subject = lines[0].toLowerCase();
    
    // Verificar palavras a evitar
    const avoidWordsFound = CONFIG.patterns.avoidWords.filter(word => 
      subject.includes(word.toLowerCase())
    );
    
    if (avoidWordsFound.length > 0) {
      this.results.warnings.push(`Evite palavras incertas: ${avoidWordsFound.join(', ')}`);
    }
    
    // Verificar se é muito genérica
    const genericPatterns = [
      /^fix:/i,
      /^update:/i,
      /^change:/i,
      /^modify:/i
    ];
    
    const isGeneric = genericPatterns.some(pattern => pattern.test(subject));
    if (isGeneric && subject.length < 30) {
      this.results.warnings.push('Mensagem muito genérica. Seja mais específico sobre o que foi alterado');
    }
  }

  /**
   * Valida diretivas de pensamento crítico
   */
  validateCriticalThinking(commitMsg) {
    const content = commitMsg.toLowerCase();
    
    // Verificar se há palavras-chave de pensamento crítico
    const criticalKeywordsFound = CONFIG.patterns.criticalKeywords.filter(keyword => 
      content.includes(keyword.toLowerCase())
    );
    
    if (criticalKeywordsFound.length > 0) {
      this.results.suggestions.push(`✅ Bom uso de palavras-chave: ${criticalKeywordsFound.join(', ')}`);
    } else {
      this.results.warnings.push('Considere incluir palavras que indiquem validação (ex: "validado", "testado")');
    }
    
    // Verificar se há contexto suficiente
    const hasContext = content.includes('porque') || content.includes('because') || 
                      content.includes('motivo') || content.includes('reason');
    
    if (!hasContext && content.length < 50) {
      this.results.suggestions.push('Considere explicar o motivo da mudança');
    }
  }

  /**
   * Gera feedback para o usuário
   */
  generateFeedback() {
    if (this.results.errors.length > 0) {
      console.log('\n❌ ERROS ENCONTRADOS:');
      this.results.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }
    
    if (this.results.warnings.length > 0) {
      console.log('\n⚠️ AVISOS:');
      this.results.warnings.forEach((warning, index) => {
        console.log(`  ${index + 1}. ${warning}`);
      });
    }
    
    if (this.results.suggestions.length > 0) {
      console.log('\n💡 SUGESTÕES:');
      this.results.suggestions.forEach((suggestion, index) => {
        console.log(`  ${index + 1}. ${suggestion}`);
      });
    }
    
    if (this.results.valid) {
      console.log('\n✅ Mensagem de commit válida!');
    } else {
      console.log('\n❌ Commit bloqueado. Corrija os erros acima.');
    }
  }
}

/**
 * Função principal
 */
function main() {
  try {
    const validator = new CommitMsgValidator();
    const isValid = validator.validate();
    
    // Retornar código de saída
    process.exit(isValid ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Erro fatal:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { CommitMsgValidator, CONFIG }; 