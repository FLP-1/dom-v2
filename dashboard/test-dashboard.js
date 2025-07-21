/**
 * @fileoverview Teste do Dashboard - Fase 5
 * @directory dashboard
 * @description Teste básico do sistema de dashboard
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM v2 Team
 */

const DashboardInterface = require('./dashboard-interface');

console.log('🧪 TESTE DO DASHBOARD DE MONITORAMENTO');
console.log('=====================================');

async function testDashboard() {
  const dashboard = new DashboardInterface();
  
  console.log('📊 Carregando métricas...');
  dashboard.loadMetrics();
  
  console.log('🔄 Verificando alertas...');
  dashboard.checkAlerts();
  
  console.log('📋 Exibindo dashboard...');
  dashboard.displayDashboard();
  
  console.log('\n✅ Teste do dashboard concluído!');
  
  // Gerar relatório
  const report = dashboard.generateReport();
  console.log('\n📊 RELATÓRIO GERADO:');
  console.log(`   Progresso total: ${report.totalProgress}%`);
  console.log(`   Alertas: ${report.alerts.length}`);
  console.log(`   Métricas carregadas: ${Object.keys(report.metrics).length}`);
  
  return report;
}

testDashboard().catch(console.error); 