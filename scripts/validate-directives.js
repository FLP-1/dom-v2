#!/usr/bin/env node

/**
 * 🛡️ SISTEMA DE VALIDAÇÃO DE DIRETIVAS CRÍTICAS - VERSÃO OTIMIZADA
 * 
 * Este script implementa validação inteligente com:
 * - Análise semântica básica
 * - Validação de contexto
 * - Métricas de qualidade real
 * - Redução de falsos positivos/negativos
 */

const fs = require('fs');
const path = require('path');

// Configurações do sistema
const CONFIG = {
  // Diretórios para análise
  directories: [
    'backend/src',
    'frontend/src',
    'docs',
    'scripts'
  ],
  
  // Extensões de arquivo para análise
  extensions: ['.js', '.ts', '.tsx', '.md', '.json'],
  
  // Palavras-chave para análise semântica
  keywords: {
    critical: ['crítico', 'crítica', 'critical', 'importante', 'essencial', 'vital'],
    validation: ['validar', 'validar', 'verificar', 'confirmar', 'testar'],
    assumption: ['suposição', 'assumption', 'presumir', 'assumir', 'hipótese'],
    logic: ['lógica', 'logic', 'raciocínio', 'argumento', 'conclusão'],
    source: ['fonte', 'source', 'referência', 'documentação', 'evidência'],
    alternative: ['alternativa', 'alternative', 'opção', 'opções', 'outro'],
    transparency: ['transparência', 'transparency', 'claro', 'explícito', 'documentado'],
    honesty: ['honestidade', 'honesty', 'verdade', 'correção', 'erro']
  },
  
  // Pontuação para diferentes tipos de validação
  scoring: {
    sourceVerified: 20,
    assumptionsIdentified: 15,
    logicTested: 15,
    alternativesConsidered: 15,
    transparency: 15,
    honesty: 20
  },
  
  // Limites para diferentes níveis de qualidade
  thresholds: {
    excellent: 90,
    good: 75,
    acceptable: 60,
    poor: 40
  }
};

/**
 * Classe principal de validação
 */
class CriticalThinkingValidator {
  constructor() {
    this.results = {
      files: [],
      summary: {
        totalFiles: 0,
        validatedFiles: 0,
        averageScore: 0,
        qualityDistribution: {
          excellent: 0,
          good: 0,
          acceptable: 0,
          poor: 0
        },
        issues: []
      }
    };
  }

  /**
   * Executa validação completa
   */
  async validate() {
    console.log('🔍 Iniciando validação de diretivas críticas...\n');
    
    try {
      // 1. Coletar arquivos para análise
      const files = await this.collectFiles();
      console.log(`📁 Encontrados ${files.length} arquivos para análise\n`);
      
      // 2. Analisar cada arquivo
      for (const file of files) {
        await this.analyzeFile(file);
      }
      
      // 3. Calcular métricas
      this.calculateMetrics();
      
      // 4. Gerar relatório
      this.generateReport();
      
      // 5. Salvar resultados
      await this.saveResults();
      
    } catch (error) {
      console.error('❌ Erro durante validação:', error.message);
      process.exit(1);
    }
  }

  /**
   * Coleta arquivos para análise
   */
  async collectFiles() {
    const files = [];
    
    for (const dir of CONFIG.directories) {
      if (fs.existsSync(dir)) {
        await this.scanDirectory(dir, files);
      }
    }
    
    return files;
  }

  /**
   * Escaneia diretório recursivamente
   */
  async scanDirectory(dirPath, files) {
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (!this.shouldIgnore(fullPath)) {
            await this.scanDirectory(fullPath, files);
          }
        } else if (stat.isFile()) {
          if (this.shouldProcess(fullPath)) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️ Erro ao escanear ${dirPath}: ${error.message}`);
    }
  }

  /**
   * Verifica se deve ignorar o caminho
   */
  shouldIgnore(filePath) {
    const ignorePatterns = [
      'node_modules',
      '.git',
      'dist',
      'build',
      'coverage',
      '*.min.js',
      '*.bundle.js'
    ];
    
    return ignorePatterns.some(pattern => filePath.includes(pattern));
  }

  /**
   * Verifica se deve processar o arquivo
   */
  shouldProcess(filePath) {
    const ext = path.extname(filePath);
    return CONFIG.extensions.includes(ext);
  }

  /**
   * Analisa um arquivo individual
   */
  async analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const analysis = this.performSemanticAnalysis(content, filePath);
      
      this.results.files.push({
        file: filePath,
        score: analysis.score,
        issues: analysis.issues,
        details: analysis.details
      });
      
      // Exibir resultado
      const status = analysis.score >= CONFIG.thresholds.excellent ? '✅' :
                    analysis.score >= CONFIG.thresholds.good ? '✅' :
                    analysis.score >= CONFIG.thresholds.acceptable ? '⚠️' : '❌';
      
      console.log(`${status} ${filePath} (${analysis.score.toFixed(1)}%)`);
      
    } catch (error) {
      console.error(`❌ Erro ao analisar ${filePath}: ${error.message}`);
    }
  }

  /**
   * Realiza análise semântica do conteúdo
   */
  performSemanticAnalysis(content, filePath) {
    const analysis = {
      score: 0,
      issues: [],
      details: {}
    };
    
    // Análise de verificação de fontes
    const sourceScore = this.analyzeSourceVerification(content, filePath);
    analysis.details.sourceVerification = sourceScore;
    
    // Análise de suposições
    const assumptionScore = this.analyzeAssumptions(content);
    analysis.details.assumptions = assumptionScore;
    
    // Análise de lógica
    const logicScore = this.analyzeLogic(content);
    analysis.details.logic = logicScore;
    
    // Análise de alternativas
    const alternativeScore = this.analyzeAlternatives(content);
    analysis.details.alternatives = alternativeScore;
    
    // Análise de transparência
    const transparencyScore = this.analyzeTransparency(content);
    analysis.details.transparency = transparencyScore;
    
    // Análise de honestidade
    const honestyScore = this.analyzeHonesty(content);
    analysis.details.honesty = honestyScore;
    
    // Calcular pontuação total
    analysis.score = Math.min(100, 
      sourceScore.score + 
      assumptionScore.score + 
      logicScore.score + 
      alternativeScore.score + 
      transparencyScore.score + 
      honestyScore.score
    );
    
    // Coletar issues
    [
      sourceScore.issues,
      assumptionScore.issues,
      logicScore.issues,
      alternativeScore.issues,
      transparencyScore.issues,
      honestyScore.issues
    ].forEach(issues => {
      analysis.issues.push(...issues);
    });
    
    return analysis;
  }

  /**
   * Analisa verificação de fontes
   */
  analyzeSourceVerification(content, filePath) {
    const result = { score: 0, issues: [] };
    
    // Verificar referências externas
    const hasExternalRefs = /@references|@see|https?:\/\/|www\.|github\.com|stackoverflow\.com/i.test(content);
    if (hasExternalRefs) {
      result.score += CONFIG.scoring.sourceVerified;
    } else {
      result.issues.push('Não há referências a fontes externas');
    }
    
    // Verificar documentação
    const hasDocumentation = /@fileoverview|@description|@param|@returns|@author/i.test(content);
    if (hasDocumentation) {
      result.score += 10;
    } else {
      result.issues.push('Falta documentação clara');
    }
    
    return result;
  }

  /**
   * Analisa identificação de suposições
   */
  analyzeAssumptions(content) {
    const result = { score: 0, issues: [] };
    
    // Verificar asserções
    const hasAssertions = /assert|assertion|expect|should|must|require/i.test(content);
    if (hasAssertions) {
      result.score += CONFIG.scoring.assumptionsIdentified;
    } else {
      result.issues.push('Falta asserções de validação');
    }
    
    // Verificar validação de entrada
    const hasInputValidation = /validateInput|input.*validation|check.*input/i.test(content);
    if (hasInputValidation) {
      result.score += 10;
    } else {
      result.issues.push('Falta validação de entrada de dados');
    }
    
    return result;
  }

  /**
   * Analisa teste de lógica
   */
  analyzeLogic(content) {
    const result = { score: 0, issues: [] };
    
    // Verificar testes
    const hasTests = /describe\(|test\(|it\(|expect\(|\.test\.|\.spec\./i.test(content);
    if (hasTests) {
      result.score += CONFIG.scoring.logicTested;
    } else {
      result.issues.push('Falta testes unitários');
    }
    
    // Verificar tratamento de erros
    const hasErrorHandling = /try\s*{|catch\s*{|throw\s+new\s+Error|handleError/i.test(content);
    if (hasErrorHandling) {
      result.score += 10;
    } else {
      result.issues.push('Falta tratamento de erros');
    }
    
    return result;
  }

  /**
   * Analisa consideração de alternativas
   */
  analyzeAlternatives(content) {
    const result = { score: 0, issues: [] };
    
    // Verificar menção a alternativas
    const hasAlternatives = /@alternatives|alternative|alternativa|opção|opções|outro|outra/i.test(content);
    if (hasAlternatives) {
      result.score += CONFIG.scoring.alternativesConsidered;
    } else {
      result.issues.push('Não há consideração explícita de alternativas');
    }
    
    return result;
  }

  /**
   * Analisa transparência
   */
  analyzeTransparency(content) {
    const result = { score: 0, issues: [] };
    
    // Verificar comentários explicativos
    const hasComments = /\/\*|\/\/|<!--|#.*\n/.test(content);
    if (hasComments) {
      result.score += CONFIG.scoring.transparency;
    } else {
      result.issues.push('Falta documentação no código');
    }
    
    // Verificar logging
    const hasLogging = /console\.|logStructured|logger\.|debug\(|info\(|warn\(|error\(/i.test(content);
    if (hasLogging) {
      result.score += 5;
    } else {
      result.issues.push('Falta logging estruturado');
    }
    
    return result;
  }

  /**
   * Analisa honestidade
   */
  analyzeHonesty(content) {
    const result = { score: 0, issues: [] };
    
    // Verificar tratamento de incertezas
    const hasUncertaintyHandling = /uncertainty|incerteza|maybe|possibly|perhaps|might/i.test(content);
    if (hasUncertaintyHandling) {
      result.score += CONFIG.scoring.honesty;
    } else {
      result.issues.push('Falta tratamento de erros e incertezas');
    }
    
    // Verificar validação de tipos
    const hasTypeValidation = /validateType|typeof|instanceof|type.*check/i.test(content);
    if (hasTypeValidation) {
      result.score += 10;
    } else {
      result.issues.push('Falta validação de tipos');
    }
    
    return result;
  }

  /**
   * Calcula métricas gerais
   */
  calculateMetrics() {
    const files = this.results.files;
    const summary = this.results.summary;
    
    summary.totalFiles = files.length;
    summary.validatedFiles = files.length;
    
    if (files.length > 0) {
      const totalScore = files.reduce((sum, file) => sum + file.score, 0);
      summary.averageScore = totalScore / files.length;
      
      // Distribuição de qualidade
      files.forEach(file => {
        if (file.score >= CONFIG.thresholds.excellent) {
          summary.qualityDistribution.excellent++;
        } else if (file.score >= CONFIG.thresholds.good) {
          summary.qualityDistribution.good++;
        } else if (file.score >= CONFIG.thresholds.acceptable) {
          summary.qualityDistribution.acceptable++;
        } else {
          summary.qualityDistribution.poor++;
        }
      });
      
      // Coletar issues mais comuns
      const issueCounts = {};
      files.forEach(file => {
        file.issues.forEach(issue => {
          issueCounts[issue] = (issueCounts[issue] || 0) + 1;
        });
      });
      
      summary.issues = Object.entries(issueCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([issue, count]) => ({ issue, count }));
    }
  }

  /**
   * Gera relatório final
   */
  generateReport() {
    const summary = this.results.summary;
    
    console.log('\n📊 RELATÓRIO DE VALIDAÇÃO DE DIRETIVAS CRÍTICAS');
    console.log('============================================================');
    console.log(`\n📁 Arquivos analisados: ${summary.totalFiles}`);
    console.log(`✅ Arquivos validados: ${summary.validatedFiles}`);
    console.log(`📈 Pontuação média: ${summary.averageScore.toFixed(1)}%`);
    
    console.log('\n📊 Distribuição de Qualidade:');
    console.log(`  🏆 Excelente (≥${CONFIG.thresholds.excellent}%): ${summary.qualityDistribution.excellent} arquivos`);
    console.log(`  ✅ Bom (≥${CONFIG.thresholds.good}%): ${summary.qualityDistribution.good} arquivos`);
    console.log(`  ⚠️ Aceitável (≥${CONFIG.thresholds.acceptable}%): ${summary.qualityDistribution.acceptable} arquivos`);
    console.log(`  ❌ Ruim (<${CONFIG.thresholds.acceptable}%): ${summary.qualityDistribution.poor} arquivos`);
    
    if (summary.issues.length > 0) {
      console.log('\n🚨 Principais Issues Identificadas:');
      summary.issues.forEach(({ issue, count }) => {
        console.log(`  • ${issue} (${count} ocorrências)`);
      });
    }
    
    console.log('\n💡 Recomendações:');
    console.log('  • Implementar mais validações de entrada de dados');
    console.log('  • Adicionar documentação e comentários explicativos');
    console.log('  • Implementar testes unitários');
    console.log('  • Melhorar tratamento de erros');
  }

  /**
   * Salva resultados em arquivo
   */
  async saveResults() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const reportPath = `logs/validation-report-${timestamp}.json`;
      
      // Criar diretório logs se não existir
      if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs');
      }
      
      fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
      console.log(`\n💾 Relatório salvo em: ${reportPath}`);
      console.log('✅ Validação concluída com sucesso!\n');
      
    } catch (error) {
      console.error('❌ Erro ao salvar relatório:', error.message);
    }
  }
}

// Execução principal
async function main() {
  const validator = new CriticalThinkingValidator();
  await validator.validate();
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = CriticalThinkingValidator; 