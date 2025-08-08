/**
 * @fileoverview Teste do Pipeline CI/CD Avançado - Fase 5
 * @directory cicd
 * @description Teste completo do pipeline de integração e deploy
 * @created 2024-12-19
 * @lastModified 2025-07-21
 * @author DOM v2 Team
 */

const AdvancedCICDPipeline = require('./advanced-pipeline');

console.log('🧪 TESTANDO PIPELINE CI/CD AVANÇADO');
console.log('====================================');

async function testPipeline() {
  const pipeline = new AdvancedCICDPipeline();
  
  try {
    console.log('\n🚀 Iniciando teste do pipeline...');
    
    const result = await pipeline.runPipeline();
    
    if (result.success) {
      console.log('\n✅ TESTE DO PIPELINE CONCLUÍDO COM SUCESSO!');
      console.log('===========================================');
      console.log(`⏱️  Tempo total: ${result.duration.toFixed(2)} segundos`);
      
      // Exibir resultados dos gates
      if (result.gateResults) {
        console.log('\n🔍 RESULTADOS DOS GATES DE QUALIDADE:');
        console.log('=====================================');
        Object.entries(result.gateResults.gates).forEach(([gateName, gateResult]) => {
          const status = gateResult.passed ? '✅' : '❌';
          console.log(`${status} ${gateName}: ${gateResult.reason}`);
        });
      }
      
      // Exibir métricas
      const metrics = pipeline.getStatus();
      console.log('\n📊 MÉTRICAS DO PIPELINE:');
      console.log('=========================');
      console.log(`📈 Total de execuções: ${metrics.metrics.totalRuns}`);
      console.log(`✅ Execuções bem-sucedidas: ${metrics.metrics.successfulRuns}`);
      console.log(`❌ Execuções falharam: ${metrics.metrics.failedRuns}`);
      console.log(`📊 Taxa de sucesso: ${pipeline.calculateSuccessRate()}%`);
      console.log(`⏱️  Tempo médio: ${metrics.metrics.averageTime.toFixed(2)}s`);
      
      // Exibir status dos stages
      console.log('\n📋 STATUS DOS STAGES:');
      console.log('=====================');
      metrics.stages.forEach(stage => {
        const status = stage.status === 'completed' ? '✅' : '⏳';
        console.log(`${status} ${stage.name}: ${stage.status}`);
      });
      
    } else {
      console.log('\n❌ TESTE DO PIPELINE FALHOU!');
      console.log('============================');
      console.log(`Erro: ${result.error}`);
      
      if (result.gateResults) {
        console.log('\n🔍 GATES QUE FALHARAM:');
        Object.entries(result.gateResults.gates).forEach(([gateName, gateResult]) => {
          if (!gateResult.passed) {
            console.log(`❌ ${gateName}: ${gateResult.reason}`);
          }
        });
      }
    }
    
    // Gerar relatório
    const report = pipeline.generateReport();
    console.log('\n📊 RELATÓRIO COMPLETO GERADO');
    console.log('=============================');
    
    return result;
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
    throw error;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  testPipeline()
    .then(result => {
      console.log('\n🎉 Teste concluído!');
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('\n❌ Teste falhou:', error.message);
      process.exit(1);
    });
}

module.exports = { testPipeline }; 