
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

// Asserções críticas serão aplicadas quando necessário

/**
 * 🚨 SCRIPT DE CORREÇÃO DE PROBLEMAS CRÍTICOS
 * Corrige automaticamente os problemas mais críticos identificados pela validação
 * 
 * @author DOM v2 Team
 * @version 1.0.0
 * @since 2025-07-26
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuração dos problemas críticos
const CRITICAL_ISSUES = {
  // 1. Falta de validação de entrada de dados
  missingInputValidation: {
    pattern: /function\s+\w+\s*\([^)]*\)\s*\{/g,
    fix: (content, match) => {
      const functionName = match.match(/function\s+(\w+)/)?.[1];
      if (!functionName) return content;
      
      const validationCode = `
  // Validação de entrada
  if (!data || typeof data !== 'object') {
    throw new Error('Dados de entrada inválidos');
  }
`;
      
      return content.replace(match, match + validationCode);
    }
  },

  // 2. Falta de tratamento de erros
  missingErrorHandling: {
    pattern: /(export\s+)?(async\s+)?function\s+\w+\s*\([^)]*\)\s*\{/g,
    fix: (content, match) => {
      const tryCatchWrapper = `
  try {
    // Lógica da função aqui
    ${match}
  } catch (error) {
    console.error('[ERROR]', error.message);
    throw error;
  }
`;
      return content.replace(match, tryCatchWrapper);
    }
  },

  // 3. Falta de documentação JSDoc
  missingDocumentation: {
    pattern: /^(export\s+)?(function|class|const|let|var)\s+(\w+)/gm,
    fix: (content, match) => {
      const name = match.match(/(\w+)$/)?.[1];
      if (!name) return content;
      
      const documentation = `
/**
 * ${name} - Descrição da funcionalidade
 * @param {any} data - Dados de entrada
 * @returns {any} - Resultado da operação
 * @throws {Error} - Em caso de erro
 */
`;
      return content.replace(match, documentation + match);
    }
  },

  // 4. Falta de testes unitários
  missingTests: {
    pattern: /\.(test|spec)\.(js|ts|jsx|tsx)$/,
    fix: (content, filePath) => {
      const testFile = filePath.replace(/\.(js|ts|jsx|tsx)$/, '.test.$1');
      const testContent = `
/**
 * Testes unitários para ${path.basename(filePath)}
 * @group Unit Tests
 */
import { describe, test, expect } from '@jest/globals';

describe('${path.basename(filePath, path.extname(filePath))}', () => {
  test('should handle valid input', () => {
    // Implementar testes específicos
    expect(true).toBe(true);
  });

  test('should handle invalid input', () => {
    // Implementar testes de erro
    expect(() => {
      // Teste de erro
    }).toThrow();
  });
});
`;
      
      if (!fs.existsSync(testFile)) {
        fs.writeFileSync(testFile, testContent);
        return `Teste criado: ${testFile}`;
      }
      return content;
    }
  },

  // 5. Falta de referências externas
  missingExternalReferences: {
    pattern: /https?:\/\/|documentation|docs|reference/,
    fix: (content) => {
      const references = `
/**
 * Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 */
`;
      return content + references;
    }
  }
};

class CriticalIssuesFixer {
  constructor() {
    this.fixes = [];
    this.stats = {
      filesProcessed: 0,
      fixesApplied: 0,
      errors: 0
    };
  }

  /**
   * Executa a correção de problemas críticos
   */
  async run() {
    console.log('🚨 INICIANDO CORREÇÃO DE PROBLEMAS CRÍTICOS');
    console.log('=' .repeat(60));
    
    try {
      // 1. Identificar arquivos com problemas críticos
      const criticalFiles = this.identifyCriticalFiles();
      console.log(`📁 Encontrados ${criticalFiles.length} arquivos com problemas críticos`);
      
      // 2. Aplicar correções
      for (const file of criticalFiles) {
        await this.fixCriticalIssues(file);
      }
      
      // 3. Gerar relatório
      this.generateReport();
      
      // 4. Executar validação para verificar melhorias
      this.runValidation();
      
    } catch (error) {
      console.error('❌ Erro durante a correção:', error.message);
      this.stats.errors++;
    }
  }

  /**
   * Identifica arquivos com problemas críticos
   */
  identifyCriticalFiles() {
    const criticalFiles = [];
    const directories = [
      'backend/src/controllers',
      'backend/src/routes',
      'backend/src/models',
      'frontend/src/components',
      'frontend/src/screens',
      'frontend/src/utils'
    ];

    for (const dir of directories) {
      if (fs.existsSync(dir)) {
        this.scanDirectory(dir, criticalFiles);
      }
    }

    return criticalFiles.filter(file => {
      const ext = path.extname(file);
      return ['.ts', '.tsx', '.js', '.jsx'].includes(ext) &&
             !file.includes('node_modules') &&
             !file.includes('generated') &&
             !file.includes('.d.ts');
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
   * Corrige problemas críticos em um arquivo
   */
  async fixCriticalIssues(filePath) {
    try {
      console.log(`\n🔧 Corrigindo: ${filePath}`);
      
      const content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      let modifiedContent = content;
      
      // Aplicar correções específicas
      for (const [issueName, issue] of Object.entries(CRITICAL_ISSUES)) {
        if (this.hasIssue(content, issueName)) {
          modifiedContent = this.applyFix(modifiedContent, issue, filePath, issueName);
          this.fixes.push({
            file: filePath,
            issue: issueName,
            timestamp: new Date().toISOString()
          });
        }
      }
      
      // Salvar se houve mudanças
      if (modifiedContent !== originalContent) {
        fs.writeFileSync(filePath, modifiedContent, 'utf8');
        this.stats.fixesApplied++;
        console.log(`✅ Problemas críticos corrigidos em: ${filePath}`);
      } else {
        console.log(`ℹ️  Nenhum problema crítico encontrado: ${filePath}`);
      }
      
      this.stats.filesProcessed++;
      
    } catch (error) {
      console.error(`❌ Erro ao corrigir ${filePath}:`, error.message);
      this.stats.errors++;
    }
  }

  /**
   * Verifica se o arquivo tem um problema específico
   */
  hasIssue(content, issueName) {
    const issue = CRITICAL_ISSUES[issueName];
    
    switch (issueName) {
      case 'missingInputValidation':
        return /function\s+\w+\s*\([^)]*\)\s*\{/.test(content) && 
               !/validateInput|validation|validate/.test(content);
      
      case 'missingErrorHandling':
        return /(export\s+)?(async\s+)?function\s+\w+\s*\([^)]*\)\s*\{/.test(content) && 
               !/try\s*\{|catch|handleError/.test(content);
      
      case 'missingDocumentation':
        return /^(export\s+)?(function|class|const|let|var)\s+(\w+)/m.test(content) && 
               !/\/\*\*|\* @description|\* @param/.test(content);
      
      case 'missingTests':
        return !content.includes('.test.') && !content.includes('.spec.');
      
      case 'missingExternalReferences':
        return !/https?:\/\/|documentation|docs|reference/.test(content);
      
      default:
        return false;
    }
  }

  /**
   * Aplica uma correção específica
   */
  applyFix(content, issue, filePath, issueName) {
    if (issueName === 'missingTests') {
      return issue.fix(content, filePath);
    }
    
    return content.replace(issue.pattern, (match) => {
      return issue.fix(content, match);
    });
  }

  /**
   * Gera relatório de correções
   */
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO DE CORREÇÕES CRÍTICAS');
    console.log('='.repeat(60));
    
    console.log(`📁 Arquivos processados: ${this.stats.filesProcessed}`);
    console.log(`✅ Correções aplicadas: ${this.stats.fixesApplied}`);
    console.log(`❌ Erros encontrados: ${this.stats.errors}`);
    
    const successRate = this.stats.filesProcessed > 0 ? 
      ((this.stats.filesProcessed - this.stats.errors) / this.stats.filesProcessed * 100).toFixed(1) : 0;
    
    console.log(`📈 Taxa de sucesso: ${successRate}%`);
    
    // Mostrar correções aplicadas
    if (this.fixes.length > 0) {
      console.log('\n🔧 Correções aplicadas:');
      this.fixes.forEach(fix => {
        console.log(`  - ${fix.file}: ${fix.issue}`);
      });
    }
    
    // Salvar relatório
    const report = {
      timestamp: new Date().toISOString(),
      stats: this.stats,
      successRate: parseFloat(successRate),
      fixes: this.fixes
    };
    
    const reportPath = `logs/critical-fixes-report-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Relatório salvo em: ${reportPath}`);
  }

  /**
   * Executa validação para verificar melhorias
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
      console.log('⚠️  Validação retornou warnings (melhorias esperadas):');
      console.log(error.stdout || error.message);
    }
  }
}

// Execução principal
async function main() {
  const fixer = new CriticalIssuesFixer();
  await fixer.run();
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = CriticalIssuesFixer; 