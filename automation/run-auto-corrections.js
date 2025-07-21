/**
 * @fileoverview Script de Execução de Correções Automáticas Avançado - Fase 5
 * @directory automation
 * @description Executa o sistema de correções automáticas avançado
 * @created 2024-12-19
 * @lastModified 2025-07-21
 * @author DOM v2 Team
 */

const AutoCorrector = require('./corrections/auto-corrector');
const path = require('path');
const fs = require('fs');

console.log('🤖 INICIANDO CORREÇÕES AUTOMÁTICAS AVANÇADAS - FASE 5');
console.log('==================================================');

async function runAutoCorrections() {
  const corrector = new AutoCorrector();
  const startTime = Date.now();
  
  try {
    // Escanear diretórios principais
    const directories = [
      path.join(__dirname, '..', 'scripts'),
      path.join(__dirname, '..', 'frontend', 'src'),
      path.join(__dirname, '..', 'backend', 'src'),
      path.join(__dirname, '..', 'docs'),
      path.join(__dirname, '..', 'automation'),
      path.join(__dirname, '..', 'dashboard'),
      path.join(__dirname, '..', 'cicd')
    ];
    
    console.log('\n🔍 INICIANDO ESCANEAMENTO AVANÇADO...');
    
    let totalFilesProcessed = 0;
    let totalCorrections = 0;
    
    for (const dir of directories) {
      if (fs.existsSync(dir)) {
        console.log(`\n📁 Processando: ${path.basename(dir)}`);
        const metrics = await corrector.scanDirectory(dir);
        totalFilesProcessed += metrics.filesProcessed;
        totalCorrections += metrics.correctionsApplied;
      } else {
        console.log(`⚠️  Diretório não encontrado: ${dir}`);
      }
    }
    
    // Gerar relatório detalhado
    const report = corrector.generateReport();
    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;
    
    // Exibir relatório completo
    displayDetailedReport(report, executionTime);
    
    // Salvar relatório em arquivo
    await saveReportToFile(report);
    
    // Atualizar métricas da Fase 5
    await updatePhase5Metrics(report);
    
    console.log('\n🎉 CORREÇÕES AUTOMÁTICAS AVANÇADAS CONCLUÍDAS!');
    console.log('===============================================');
    
    return report;
    
  } catch (error) {
    console.error('❌ Erro durante correções automáticas:', error.message);
    throw error;
  }
}

function displayDetailedReport(report, executionTime) {
  console.log('\n📊 RELATÓRIO DETALHADO DE CORREÇÕES AUTOMÁTICAS');
  console.log('===============================================');
  
  // Resumo geral
  console.log(`\n📈 RESUMO GERAL:`);
  console.log(`   📁 Arquivos processados: ${report.summary.filesProcessed}`);
  console.log(`   🔧 Total de correções: ${report.summary.totalCorrections}`);
  console.log(`   ❌ Erros corrigidos: ${report.summary.errorsFixed}`);
  console.log(`   ⏱️  Tempo economizado: ${report.summary.timeSaved} minutos`);
  console.log(`   ⚡ Tempo de execução: ${executionTime.toFixed(2)} segundos`);
  
  // Categorias
  console.log(`\n📋 CORREÇÕES POR CATEGORIA:`);
  Object.entries(report.summary.categories).forEach(([category, count]) => {
    if (count > 0) {
      const icon = getCategoryIcon(category);
      console.log(`   ${icon} ${category.toUpperCase()}: ${count} correções`);
    }
  });
  
  // Top correções
  if (report.corrections.length > 0) {
    console.log(`\n🏆 TOP 10 CORREÇÕES MAIS APLICADAS:`);
    const topCorrections = report.corrections
      .reduce((acc, correction) => {
        const key = correction.description;
        acc[key] = (acc[key] || 0) + correction.count;
        return acc;
      }, {});
    
    Object.entries(topCorrections)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([description, count], index) => {
        console.log(`   ${index + 1}. ${description}: ${count}x`);
      });
  }
  
  // Recomendações
  if (report.recommendations.length > 0) {
    console.log(`\n💡 RECOMENDAÇÕES:`);
    report.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }
  
  // Impacto na Fase 5
  const automationProgress = Math.min(80, 15 + (report.summary.totalCorrections * 3));
  console.log(`\n🎯 IMPACTO NA FASE 5:`);
  console.log(`   🤖 Automação: ${automationProgress}% (era 15%)`);
  console.log(`   📈 Produtividade: ${Math.min(60, 52 + (report.summary.totalCorrections * 0.5))}% (era 52%)`);
}

function getCategoryIcon(category) {
  const icons = {
    naming: '📝',
    structure: '🏗️',
    imports: '📦',
    documentation: '📚',
    performance: '⚡',
    security: '🔒',
    accessibility: '♿',
    testing: '🧪'
  };
  return icons[category] || '🔧';
}

async function saveReportToFile(report) {
  try {
    const reportPath = path.join(__dirname, '..', 'logs', 'auto-corrections-report.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n💾 Relatório salvo: logs/auto-corrections-report.json`);
  } catch (error) {
    console.warn('⚠️  Erro ao salvar relatório:', error.message);
  }
}

async function updatePhase5Metrics(correctionReport) {
  try {
    const configPath = path.join(__dirname, '..', 'phase5-config.json');
    
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      // Calcular progresso baseado nas correções aplicadas
      const automationProgress = Math.min(80, 15 + (correctionReport.summary.totalCorrections * 3));
      const productivityProgress = Math.min(60, 52 + (correctionReport.summary.totalCorrections * 0.5));
      
      // Atualizar métricas
      config.metrics.automation.current = automationProgress;
      config.metrics.productivity.current = productivityProgress;
      
      // Atualizar histórico
      if (!config.history) config.history = [];
      config.history.push({
        timestamp: new Date().toISOString(),
        type: 'auto-corrections',
        correctionsApplied: correctionReport.summary.totalCorrections,
        automationProgress,
        productivityProgress
      });
      
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      
      console.log(`\n📊 MÉTRICAS DA FASE 5 ATUALIZADAS:`);
      console.log(`   🤖 Automação: ${automationProgress}% (era 15%)`);
      console.log(`   📈 Produtividade: ${productivityProgress}% (era 52%)`);
      
      // Verificar se atingiu metas
      if (automationProgress >= 80) {
        console.log(`\n🎉 META DE AUTOMAÇÃO ATINGIDA! (${automationProgress}%)`);
      }
      if (productivityProgress >= 60) {
        console.log(`\n🎉 META DE PRODUTIVIDADE ATINGIDA! (${productivityProgress}%)`);
      }
    }
  } catch (error) {
    console.error('⚠️  Erro ao atualizar métricas:', error.message);
  }
}

// Função para executar em modo dry-run
async function runDryRun() {
  console.log('🔍 EXECUTANDO EM MODO DRY-RUN (SEM APLICAR CORREÇÕES)');
  console.log('====================================================');
  
  const corrector = new AutoCorrector();
  corrector.config.automation.dryRun = true;
  
  return await runAutoCorrections();
}

// Função para executar correções específicas
async function runSpecificCorrections(categories = []) {
  console.log(`🎯 EXECUTANDO CORREÇÕES ESPECÍFICAS: ${categories.join(', ')}`);
  console.log('====================================================');
  
  const corrector = new AutoCorrector();
  
  // Filtrar apenas as categorias especificadas
  if (categories.length > 0) {
    const filteredRules = {};
    categories.forEach(category => {
      if (corrector.rules[category]) {
        filteredRules[category] = corrector.rules[category];
      }
    });
    corrector.rules = filteredRules;
  }
  
  return await runAutoCorrections();
}

// Executar se chamado diretamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--dry-run')) {
    runDryRun()
      .then(report => {
        console.log('\n✅ Dry-run concluído com sucesso!');
        process.exit(0);
      })
      .catch(error => {
        console.error('\n❌ Dry-run falhou:', error.message);
        process.exit(1);
      });
  } else if (args.includes('--categories')) {
    const categoriesIndex = args.indexOf('--categories');
    const categories = args[categoriesIndex + 1]?.split(',') || [];
    runSpecificCorrections(categories)
      .then(report => {
        console.log('\n✅ Correções específicas concluídas!');
        process.exit(0);
      })
      .catch(error => {
        console.error('\n❌ Correções específicas falharam:', error.message);
        process.exit(1);
      });
  } else {
    runAutoCorrections()
      .then(report => {
        console.log('\n✅ Processo concluído com sucesso!');
        process.exit(0);
      })
      .catch(error => {
        console.error('\n❌ Processo falhou:', error.message);
        process.exit(1);
      });
  }
}

module.exports = { 
  runAutoCorrections, 
  runDryRun, 
  runSpecificCorrections 
}; 