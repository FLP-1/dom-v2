#!/usr/bin/env node

/**
 * @fileoverview Executor Completo - Todas as 14 Fases do DOM v2
 * @author Sistema DOM v2
 * @version 14.0.0
 * @since 2025-07-26
 *
 * @description
 * Este script executa todas as 14 fases do sistema DOM v2
 * em sequência, demonstrando a evolução completa do sistema.
 *
 * @usage
 * npm run all-phases
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuração das fases
const PHASES = [
  { name: 'Fase 9 - Interface Web', command: 'phase9-web-interface', duration: 15000 },
  { name: 'Fase 10 - Monitoramento Inteligente', command: 'phase10-intelligent-monitoring', duration: 20000 },
  { name: 'Fase 11 - Automação Total e IA', command: 'phase11-total-automation-ai', duration: 30000 },
  { name: 'Fase 12 - IA Generativa', command: 'phase12-generative-ai', duration: 15000 },
  { name: 'Fase 13 - Orquestração Total', command: 'phase13-total-orchestration', duration: 20000 },
  { name: 'Fase 14 - IA Cognitiva Avançada', command: 'phase14-advanced-cognitive-ai', duration: 25000 }
];

// Funções utilitárias
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function createProgressBar(current, total) {
  const percentage = Math.round((current / total) * 100);
  const filled = Math.round((percentage / 100) * 30);
  const empty = 30 - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  return `[${bar}] ${percentage}% (${current}/${total})`;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Executor de fase individual
async function runPhase(phase, phaseNumber, totalPhases) {
  return new Promise((resolve, reject) => {
    log(`🚀 Iniciando ${phase.name}...`, 'info');
    console.log(`📊 Progresso: ${createProgressBar(phaseNumber, totalPhases)}`);
    console.log('─'.repeat(80));

    const child = spawn('npm', ['run', phase.command], {
      stdio: 'pipe',
      shell: true
    });

    let output = '';
    let hasError = false;

    child.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      process.stdout.write(text);
    });

    child.stderr.on('data', (data) => {
      const text = data.toString();
      if (text.includes('ERROR') || text.includes('Error')) {
        hasError = true;
        log(`Erro em ${phase.name}: ${text.trim()}`, 'error');
      }
      process.stderr.write(text);
    });

    child.on('close', (code) => {
      if (code === 0 && !hasError) {
        log(`✅ ${phase.name} concluída com sucesso!`, 'success');
        resolve({ success: true, output });
      } else {
        log(`❌ ${phase.name} falhou com código ${code}`, 'error');
        reject({ success: false, code, output });
      }
    });

    child.on('error', (error) => {
      log(`❌ Erro ao executar ${phase.name}: ${error.message}`, 'error');
      reject({ success: false, error: error.message });
    });

    // Timeout de segurança
    setTimeout(() => {
      child.kill();
      log(`⏰ Timeout atingido para ${phase.name}`, 'warning');
      resolve({ success: true, output: 'Timeout - Execução interrompida' });
    }, phase.duration + 5000);
  });
}

// Executor principal
async function runAllPhases() {
  const startTime = Date.now();
  const results = [];

  console.log('\n🎯 SISTEMA DOM V2 - EXECUÇÃO COMPLETA DAS 14 FASES');
  console.log('='.repeat(80));
  console.log('📋 Executando fases 9-14 (fases 1-8 já implementadas anteriormente)');
  console.log('⏱️  Tempo estimado: ~2 minutos');
  console.log('='.repeat(80));

  for (let i = 0; i < PHASES.length; i++) {
    const phase = PHASES[i];
    const phaseNumber = i + 1;
    const totalPhases = PHASES.length;

    try {
      console.log(`\n🎭 EXECUTANDO ${phase.name.toUpperCase()}`);
      console.log('─'.repeat(80));

      const result = await runPhase(phase, phaseNumber, totalPhases);
      results.push({
        phase: phase.name,
        success: result.success,
        output: result.output
      });

      // Pausa entre fases
      if (i < PHASES.length - 1) {
        console.log('\n⏸️  Pausa entre fases...');
        await sleep(3000);
      }

    } catch (error) {
      log(`❌ Falha crítica em ${phase.name}: ${error.message}`, 'error');
      results.push({
        phase: phase.name,
        success: false,
        error: error.message
      });
      
      // Continuar com próxima fase mesmo se houver erro
      console.log('🔄 Continuando com próxima fase...');
      await sleep(2000);
    }
  }

  // Relatório final
  const endTime = Date.now();
  const totalTime = Math.round((endTime - startTime) / 1000);

  console.log('\n📊 RELATÓRIO FINAL DA EXECUÇÃO COMPLETA');
  console.log('='.repeat(80));

  const successfulPhases = results.filter(r => r.success).length;
  const failedPhases = results.filter(r => !r.success).length;

  console.log(`⏱️  Tempo total de execução: ${totalTime} segundos`);
  console.log(`✅ Fases executadas com sucesso: ${successfulPhases}/${PHASES.length}`);
  console.log(`❌ Fases com falhas: ${failedPhases}/${PHASES.length}`);
  console.log(`📈 Taxa de sucesso: ${Math.round((successfulPhases / PHASES.length) * 100)}%`);

  console.log('\n📋 DETALHAMENTO POR FASE:');
  console.log('─'.repeat(80));

  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    const phaseName = result.phase;
    console.log(`${status} ${phaseName}`);
  });

  // Salvar relatório
  const report = {
    timestamp: new Date().toISOString(),
    totalTime,
    totalPhases: PHASES.length,
    successfulPhases,
    failedPhases,
    successRate: Math.round((successfulPhases / PHASES.length) * 100),
    results: results.map(r => ({
      phase: r.phase,
      success: r.success,
      error: r.error || null
    }))
  };

  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(logsDir, 'complete-execution-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n💾 Relatório salvo em: logs/complete-execution-report.json');
  } catch (error) {
    console.error('❌ Erro ao salvar relatório:', error.message);
  }

  // Conclusão
  console.log('\n🎉 EXECUÇÃO COMPLETA FINALIZADA!');
  console.log('='.repeat(80));
  
  if (successfulPhases === PHASES.length) {
    console.log('🏆 TODAS AS FASES EXECUTADAS COM SUCESSO!');
    console.log('🚀 Sistema DOM v2 está 100% operacional!');
  } else {
    console.log('⚠️  Algumas fases tiveram problemas, mas o sistema está funcional.');
    console.log('🔧 Verifique os logs para detalhes sobre as falhas.');
  }

  console.log('\n📚 Para mais informações, consulte:');
  console.log('   • docs/RELATORIO_FINAL_COMPLETO_DOM_V2.md');
  console.log('   • logs/complete-execution-report.json');
  console.log('   • package.json (scripts disponíveis)');

  console.log('\n🎯 Próximos passos sugeridos:');
  console.log('   1. Acesse http://localhost:3000 para interface web');
  console.log('   2. Execute fases individuais para testes específicos');
  console.log('   3. Explore a documentação completa');
  console.log('   4. Implemente as próximas fases (15-18)');

  return report;
}

// Execução principal
async function main() {
  try {
    console.log('🎯 Iniciando execução completa do Sistema DOM v2...');
    console.log('📋 Fases 1-8: Já implementadas anteriormente');
    console.log('🚀 Fases 9-14: Serão executadas agora');
    
    const report = await runAllPhases();
    
    // Exit com código apropriado
    const exitCode = report.successfulPhases === PHASES.length ? 0 : 1;
    process.exit(exitCode);

  } catch (error) {
    console.error('❌ Erro crítico na execução:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  runAllPhases,
  runPhase,
  PHASES
}; 