
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
 * 🛡️ POST-COMMIT HOOK - REGISTRO DE MÉTRICAS E FEEDBACK
 * 
 * Este hook é executado após commits bem-sucedidos para:
 * - Registrar métricas de qualidade
 * - Coletar feedback
 * - Atualizar estatísticas
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações
const CONFIG = {
  // Diretório de logs
  logDir: 'logs',
  
  // Arquivo de métricas
  metricsFile: 'logs/commit-metrics.json',
  
  // Arquivo de feedback
  feedbackFile: 'logs/commit-feedback.json',
  
  // Métricas a coletar
  metrics: {
    commitCount: true,
    qualityScore: true,
    directiveCompliance: true,
    timeToCommit: true
  }
};

/**
 * Classe para registro de métricas pós-commit
 */
class PostCommitHook {
  constructor() {
    this.results = {
      success: true,
      metrics: {},
      feedback: {},
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Executa o hook completo
   */
  async run() {
    try {
      console.log('📊 POST-COMMIT HOOK - REGISTRANDO MÉTRICAS');
      console.log('=' .repeat(50));
      
      // 1. Coletar informações do commit
      this.collectCommitInfo();
      
      // 2. Calcular métricas de qualidade
      this.calculateQualityMetrics();
      
      // 3. Registrar métricas
      await this.saveMetrics();
      
      // 4. Coletar feedback
      this.collectFeedback();
      
      // 5. Gerar relatório
      this.generateReport();
      
      console.log('✅ Métricas registradas com sucesso!\n');
      return this.results.success;
      
    } catch (error) {
      console.error('❌ Erro no post-commit hook:', error.message);
      return false;
    }
  }

  /**
   * Coleta informações do commit atual
   */
  collectCommitInfo() {
    try {
      // Obter hash do commit
      const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      
      // Obter mensagem do commit
      const commitMsg = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
      
      // Obter autor
      const author = execSync('git log -1 --pretty=%an', { encoding: 'utf8' }).trim();
      
      // Obter data
      const date = execSync('git log -1 --pretty=%cd', { encoding: 'utf8' }).trim();
      
      // Obter arquivos modificados
      const files = execSync('git diff-tree --no-commit-id --name-only -r HEAD', { encoding: 'utf8' })
        .split('\n')
        .filter(file => file.trim());
      
      this.results.commitInfo = {
        hash: commitHash,
        message: commitMsg,
        author: author,
        date: date,
        files: files,
        fileCount: files.length
      };
      
      console.log(`📝 Commit: ${commitHash.substring(0, 8)}`);
      console.log(`👤 Autor: ${author}`);
      console.log(`📁 Arquivos: ${files.length}`);
      
    } catch (error) {
      console.warn('⚠️ Não foi possível coletar informações do commit:', error.message);
    }
  }

  /**
   * Calcula métricas de qualidade
   */
  calculateQualityMetrics() {
    const metrics = {
      timestamp: new Date().toISOString(),
      commitHash: this.results.commitInfo?.hash || 'unknown',
      author: this.results.commitInfo?.author || 'unknown'
    };
    
    // Contar commits totais
    try {
      const totalCommits = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
      metrics.totalCommits = parseInt(totalCommits);
    } catch (error) {
      metrics.totalCommits = 0;
    }
    
    // Analisar qualidade da mensagem
    if (this.results.commitInfo?.message) {
      metrics.messageQuality = this.analyzeMessageQuality(this.results.commitInfo.message);
    }
    
    // Analisar arquivos modificados
    if (this.results.commitInfo?.files) {
      metrics.fileAnalysis = this.analyzeFiles(this.results.commitInfo.files);
    }
    
    // Calcular conformidade com diretivas
    metrics.directiveCompliance = this.calculateDirectiveCompliance();
    
    this.results.metrics = metrics;
  }

  /**
   * Analisa qualidade da mensagem de commit
   */
  analyzeMessageQuality(message) {
    const analysis = {
      score: 0,
      issues: [],
      strengths: []
    };
    
    // Verificar comprimento
    if (message.length >= 10 && message.length <= 72) {
      analysis.score += 20;
      analysis.strengths.push('Comprimento adequado');
    } else {
      analysis.issues.push('Comprimento inadequado');
    }
    
    // Verificar formato
    if (/^[a-z]+:/.test(message)) {
      analysis.score += 20;
      analysis.strengths.push('Formato correto');
    } else {
      analysis.issues.push('Formato inadequado');
    }
    
    // Verificar palavras-chave de validação
    const validationKeywords = ['validado', 'testado', 'verificado', 'documentado'];
    const hasValidation = validationKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    
    if (hasValidation) {
      analysis.score += 30;
      analysis.strengths.push('Indica validação');
    } else {
      analysis.issues.push('Falta indicação de validação');
    }
    
    // Verificar especificidade
    if (message.length > 30) {
      analysis.score += 30;
      analysis.strengths.push('Mensagem específica');
    } else {
      analysis.issues.push('Mensagem muito genérica');
    }
    
    return analysis;
  }

  /**
   * Analisa arquivos modificados
   */
  analyzeFiles(files) {
    const analysis = {
      totalFiles: files.length,
      byExtension: {},
      byDirectory: {},
      criticalFiles: []
    };
    
    files.forEach(file => {
      // Análise por extensão
      const ext = path.extname(file);
      analysis.byExtension[ext] = (analysis.byExtension[ext] || 0) + 1;
      
      // Análise por diretório
      const dir = path.dirname(file);
      analysis.byDirectory[dir] = (analysis.byDirectory[dir] || 0) + 1;
      
      // Identificar arquivos críticos
      if (file.includes('security') || file.includes('auth') || file.includes('validation')) {
        analysis.criticalFiles.push(file);
      }
    });
    
    return analysis;
  }

  /**
   * Calcula conformidade com diretivas críticas
   */
  calculateDirectiveCompliance() {
    const compliance = {
      score: 0,
      checks: {
        sourceVerified: false,
        assumptionsIdentified: false,
        logicTested: false,
        alternativesConsidered: false,
        transparency: false,
        honesty: false
      }
    };
    
    // Verificar se há testes
    if (this.results.commitInfo?.files) {
      const hasTests = this.results.commitInfo.files.some(file => 
        file.includes('.test.') || file.includes('.spec.')
      );
      if (hasTests) {
        compliance.checks.logicTested = true;
        compliance.score += 20;
      }
    }
    
    // Verificar se há documentação
    if (this.results.commitInfo?.files) {
      const hasDocs = this.results.commitInfo.files.some(file => 
        file.includes('.md') || file.includes('README')
      );
      if (hasDocs) {
        compliance.checks.transparency = true;
        compliance.score += 20;
      }
    }
    
    // Verificar qualidade da mensagem
    if (this.results.metrics?.messageQuality?.score >= 70) {
      compliance.checks.honesty = true;
      compliance.score += 20;
    }
    
    return compliance;
  }

  /**
   * Salva métricas em arquivo
   */
  async saveMetrics() {
    try {
      // Criar diretório se não existir
      if (!fs.existsSync(CONFIG.logDir)) {
        fs.mkdirSync(CONFIG.logDir, { recursive: true });
      }
      
      // Carregar métricas existentes
      let existingMetrics = [];
      if (fs.existsSync(CONFIG.metricsFile)) {
        const content = fs.readFileSync(CONFIG.metricsFile, 'utf8');
        existingMetrics = JSON.parse(content);
      }
      
      // Adicionar nova métrica
      existingMetrics.push(this.results.metrics);
      
      // Salvar arquivo
      fs.writeFileSync(CONFIG.metricsFile, JSON.stringify(existingMetrics, null, 2));
      
      console.log(`💾 Métricas salvas em: ${CONFIG.metricsFile}`);
      
    } catch (error) {
      console.error('❌ Erro ao salvar métricas:', error.message);
    }
  }

  /**
   * Coleta feedback do usuário
   */
  collectFeedback() {
    const feedback = {
      timestamp: new Date().toISOString(),
      commitHash: this.results.commitInfo?.hash || 'unknown',
      author: this.results.commitInfo?.author || 'unknown',
      questions: {
        wasValidationHelpful: null,
        didDirectivesHelp: null,
        suggestions: null
      }
    };
    
    // Em um ambiente real, aqui seria coletado feedback interativo
    // Por enquanto, vamos simular feedback baseado nas métricas
    
    if (this.results.metrics?.messageQuality?.score >= 80) {
      feedback.questions.wasValidationHelpful = 'yes';
      feedback.questions.didDirectivesHelp = 'yes';
    } else {
      feedback.questions.wasValidationHelpful = 'partial';
      feedback.questions.didDirectivesHelp = 'partial';
    }
    
    this.results.feedback = feedback;
  }

  /**
   * Gera relatório de métricas
   */
  generateReport() {
    const metrics = this.results.metrics;
    
    console.log('\n📊 RELATÓRIO DE MÉTRICAS');
    console.log('=' .repeat(30));
    
    if (metrics.messageQuality) {
      console.log(`📝 Qualidade da mensagem: ${metrics.messageQuality.score}/100`);
      
      if (metrics.messageQuality.strengths.length > 0) {
        console.log('  ✅ Pontos fortes:');
        metrics.messageQuality.strengths.forEach(strength => {
          console.log(`    • ${strength}`);
        });
      }
      
      if (metrics.messageQuality.issues.length > 0) {
        console.log('  ⚠️ Pontos de melhoria:');
        metrics.messageQuality.issues.forEach(issue => {
          console.log(`    • ${issue}`);
        });
      }
    }
    
    if (metrics.directiveCompliance) {
      console.log(`🛡️ Conformidade com diretivas: ${metrics.directiveCompliance.score}/100`);
      
      Object.entries(metrics.directiveCompliance.checks).forEach(([check, passed]) => {
        const status = passed ? '✅' : '❌';
        console.log(`  ${status} ${check}`);
      });
    }
    
    if (metrics.fileAnalysis) {
      console.log(`📁 Análise de arquivos: ${metrics.fileAnalysis.totalFiles} modificados`);
      
      if (metrics.fileAnalysis.criticalFiles.length > 0) {
        console.log('  🔒 Arquivos críticos:');
        metrics.fileAnalysis.criticalFiles.forEach(file => {
          console.log(`    • ${file}`);
        });
      }
    }
    
    console.log('\n💡 DICAS PARA PRÓXIMOS COMMITS:');
    console.log('  • Inclua palavras como "validado", "testado"');
    console.log('  • Seja específico sobre as mudanças');
    console.log('  • Adicione testes quando relevante');
    console.log('  • Documente decisões importantes');
  }
}

/**
 * Função principal
 */
async function main() {
  try {
    const hook = new PostCommitHook();
    await hook.run();
    
    // Sempre retorna sucesso para não bloquear o commit
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Erro fatal:', error.message);
    process.exit(0); // Não bloquear commit mesmo com erro
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { PostCommitHook, CONFIG }; 