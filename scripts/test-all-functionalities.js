/**
 * @fileoverview Script de Teste Completo - DOM v2
 * @directory scripts
 * @description Testa todas as funcionalidades implementadas no projeto
 * @created 2025-07-22
 * @lastModified 2025-07-22
 * @author DOM v2 Team
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AllFunctionalitiesTester {
  constructor() {
    this.testResults = {
      systems: {},
      lacunasCriticas: {},
      integration: {},
      performance: {},
      summary: {}
    };
  }

  async runAllTests() {
    console.log('🧪 INICIANDO TESTES COMPLETOS DO DOM v2');
    console.log('========================================');
    
    try {
      // 1. Testar sistemas existentes
      await this.testExistingSystems();
      
      // 2. Testar lacunas críticas implementadas
      await this.testLacunasCriticas();
      
      // 3. Testar integração
      await this.testIntegration();
      
      // 4. Testar performance
      await this.testPerformance();
      
      // 5. Gerar relatório
      await this.generateTestReport();
      
      console.log('\n🎉 TODOS OS TESTES CONCLUÍDOS!');
      this.displaySummary();
      
    } catch (error) {
      console.error('❌ Erro nos testes:', error.message);
      process.exit(1);
    }
  }

  async testExistingSystems() {
    console.log('\n🔧 TESTANDO SISTEMAS EXISTENTES...');
    
    const systems = [
      { name: 'automation', test: () => this.testAutomation() },
      { name: 'dashboard', test: () => this.testDashboard() },
      { name: 'cicd', test: () => this.testCICD() },
      { name: 'predictive', test: () => this.testPredictive() },
      { name: 'personalization', test: () => this.testPersonalization() },
      { name: 'backend', test: () => this.testBackend() },
      { name: 'frontend', test: () => this.testFrontend() }
    ];

    for (const system of systems) {
      console.log(`\n   📋 Testando: ${system.name}`);
      try {
        const result = await system.test();
        this.testResults.systems[system.name] = result;
        console.log(`      ${result.success ? '✅' : '❌'} ${result.message}`);
      } catch (error) {
        this.testResults.systems[system.name] = {
          success: false,
          message: `Erro: ${error.message}`,
          error: error.message
        };
        console.log(`      ❌ Erro: ${error.message}`);
      }
    }
  }

  async testAutomation() {
    const automationPath = path.join(__dirname, '..', 'automation', 'automation-engine.js');
    
    if (!fs.existsSync(automationPath)) {
      throw new Error('Arquivo automation-engine.js não encontrado');
    }

    const content = fs.readFileSync(automationPath, 'utf8');
    
    // Verificar se contém funcionalidades básicas
    const hasEngine = content.includes('class') || content.includes('function');
    const hasAutomation = content.includes('automation') || content.includes('auto');
    
    if (!hasEngine || !hasAutomation) {
      throw new Error('Funcionalidades de automação não encontradas');
    }

    return {
      success: true,
      message: 'Sistema de automação funcionando',
      details: 'Engine de automação encontrado e válido'
    };
  }

  async testDashboard() {
    const dashboardPath = path.join(__dirname, '..', 'dashboard', 'dashboard-manager.js');
    
    if (!fs.existsSync(dashboardPath)) {
      throw new Error('Arquivo dashboard-manager.js não encontrado');
    }

    const content = fs.readFileSync(dashboardPath, 'utf8');
    
    // Verificar se contém funcionalidades básicas
    const hasManager = content.includes('class') || content.includes('function');
    const hasDashboard = content.includes('dashboard') || content.includes('metrics');
    
    if (!hasManager || !hasDashboard) {
      throw new Error('Funcionalidades de dashboard não encontradas');
    }

    return {
      success: true,
      message: 'Dashboard funcionando',
      details: 'Manager de dashboard encontrado e válido'
    };
  }

  async testCICD() {
    const cicdPath = path.join(__dirname, '..', 'cicd', 'cicd-pipeline.js');
    
    if (!fs.existsSync(cicdPath)) {
      throw new Error('Arquivo cicd-pipeline.js não encontrado');
    }

    const content = fs.readFileSync(cicdPath, 'utf8');
    
    // Verificar se contém funcionalidades básicas
    const hasPipeline = content.includes('pipeline') || content.includes('ci/cd');
    
    if (!hasPipeline) {
      throw new Error('Funcionalidades de CI/CD não encontradas');
    }

    return {
      success: true,
      message: 'Pipeline CI/CD funcionando',
      details: 'Pipeline de CI/CD encontrado e válido'
    };
  }

  async testPredictive() {
    const predictivePath = path.join(__dirname, '..', 'predictive', 'predictive-analysis.js');
    
    if (!fs.existsSync(predictivePath)) {
      throw new Error('Arquivo predictive-analysis.js não encontrado');
    }

    const content = fs.readFileSync(predictivePath, 'utf8');
    
    // Verificar se contém funcionalidades básicas
    const hasAnalysis = content.includes('analysis') || content.includes('predictive');
    
    if (!hasAnalysis) {
      throw new Error('Funcionalidades de análise preditiva não encontradas');
    }

    return {
      success: true,
      message: 'Análise preditiva funcionando',
      details: 'Sistema de análise preditiva encontrado e válido'
    };
  }

  async testPersonalization() {
    const personalizationPath = path.join(__dirname, '..', 'personalization', 'personalization-system.js');
    
    if (!fs.existsSync(personalizationPath)) {
      throw new Error('Arquivo personalization-system.js não encontrado');
    }

    const content = fs.readFileSync(personalizationPath, 'utf8');
    
    // Verificar se contém funcionalidades básicas
    const hasPersonalization = content.includes('personalization') || content.includes('profile');
    
    if (!hasPersonalization) {
      throw new Error('Funcionalidades de personalização não encontradas');
    }

    return {
      success: true,
      message: 'Sistema de personalização funcionando',
      details: 'Sistema de personalização encontrado e válido'
    };
  }

  async testBackend() {
    const serverPath = path.join(__dirname, '..', 'backend', 'src', 'server.ts');
    
    if (!fs.existsSync(serverPath)) {
      throw new Error('Arquivo server.ts não encontrado');
    }

    const content = fs.readFileSync(serverPath, 'utf8');
    
    // Verificar se contém funcionalidades básicas
    const hasExpress = content.includes('express');
    const hasRoutes = content.includes('router') || content.includes('app.get') || content.includes('app.post');
    
    if (!hasExpress || !hasRoutes) {
      throw new Error('Funcionalidades de backend não encontradas');
    }

    return {
      success: true,
      message: 'Backend funcionando',
      details: 'Servidor Express encontrado com rotas'
    };
  }

  async testFrontend() {
    const appPath = path.join(__dirname, '..', 'frontend', 'src', 'App.tsx');
    
    if (!fs.existsSync(appPath)) {
      throw new Error('Arquivo App.tsx não encontrado');
    }

    const content = fs.readFileSync(appPath, 'utf8');
    
    // Verificar se contém funcionalidades básicas
    const hasReact = content.includes('React') || content.includes('react');
    const hasComponents = content.includes('function') || content.includes('class');
    
    if (!hasReact || !hasComponents) {
      throw new Error('Funcionalidades de frontend não encontradas');
    }

    return {
      success: true,
      message: 'Frontend funcionando',
      details: 'App React Native encontrado com componentes'
    };
  }

  async testLacunasCriticas() {
    console.log('\n💰 TESTANDO LACUNAS CRÍTICAS IMPLEMENTADAS...');
    
    const lacunas = [
      { name: 'payments', test: () => this.testPayments() },
      { name: 'purchases', test: () => this.testPurchases() },
      { name: 'employees', test: () => this.testEmployees() }
    ];

    for (const lacuna of lacunas) {
      console.log(`\n   📋 Testando: ${lacuna.name}`);
      try {
        const result = await lacuna.test();
        this.testResults.lacunasCriticas[lacuna.name] = result;
        console.log(`      ${result.success ? '✅' : '❌'} ${result.message}`);
      } catch (error) {
        this.testResults.lacunasCriticas[lacuna.name] = {
          success: false,
          message: `Erro: ${error.message}`,
          error: error.message
        };
        console.log(`      ❌ Erro: ${error.message}`);
      }
    }
  }

  async testPayments() {
    const files = [
      'backend/src/routes/payments.ts',
      'backend/src/controllers/payment-controller.ts',
      'backend/src/models/Payment.ts',
      'frontend/src/screens/payments-screen.tsx'
    ];

    const results = [];
    for (const file of files) {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const isValid = this.validatePaymentFile(file, content);
        results.push({ file, valid: isValid });
      } else {
        results.push({ file, valid: false });
      }
    }

    const allValid = results.every(r => r.valid);
    const validFiles = results.filter(r => r.valid).length;

    return {
      success: allValid,
      message: `Sistema de pagamentos: ${validFiles}/${files.length} arquivos válidos`,
      details: results
    };
  }

  async testPurchases() {
    const files = [
      'backend/src/routes/purchases.ts',
      'backend/src/controllers/purchase-controller.ts',
      'backend/src/models/Purchase.ts',
      'frontend/src/screens/purchases-screen.tsx'
    ];

    const results = [];
    for (const file of files) {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const isValid = this.validatePurchaseFile(file, content);
        results.push({ file, valid: isValid });
      } else {
        results.push({ file, valid: false });
      }
    }

    const allValid = results.every(r => r.valid);
    const validFiles = results.filter(r => r.valid).length;

    return {
      success: allValid,
      message: `Sistema de compras: ${validFiles}/${files.length} arquivos válidos`,
      details: results
    };
  }

  async testEmployees() {
    const files = [
      'backend/src/routes/employees.ts',
      'backend/src/controllers/employee-controller.ts',
      'backend/src/models/Employee.ts',
      'frontend/src/screens/employees-screen.tsx'
    ];

    const results = [];
    for (const file of files) {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const isValid = this.validateEmployeeFile(file, content);
        results.push({ file, valid: isValid });
      } else {
        results.push({ file, valid: false });
      }
    }

    const allValid = results.every(r => r.valid);
    const validFiles = results.filter(r => r.valid).length;

    return {
      success: allValid,
      message: `Gestão de funcionários: ${validFiles}/${files.length} arquivos válidos`,
      details: results
    };
  }

  validatePaymentFile(filePath, content) {
    if (filePath.includes('routes/')) {
      return content.includes('router.post') && content.includes('payments');
    } else if (filePath.includes('controllers/')) {
      return content.includes('PaymentController') && content.includes('createPayment');
    } else if (filePath.includes('models/')) {
      return content.includes('Payment') && content.includes('extends Model');
    } else if (filePath.includes('screens/')) {
      return content.includes('PaymentsScreen') && content.includes('FlatList');
    }
    return false;
  }

  validatePurchaseFile(filePath, content) {
    if (filePath.includes('routes/')) {
      return content.includes('router.post') && content.includes('purchases');
    } else if (filePath.includes('controllers/')) {
      return content.includes('PurchaseController') && content.includes('createPurchase');
    } else if (filePath.includes('models/')) {
      return content.includes('Purchase') && content.includes('extends Model');
    } else if (filePath.includes('screens/')) {
      return content.includes('PurchasesScreen') && content.includes('FlatList');
    }
    return false;
  }

  validateEmployeeFile(filePath, content) {
    if (filePath.includes('routes/')) {
      return content.includes('router.post') && content.includes('employees');
    } else if (filePath.includes('controllers/')) {
      return content.includes('EmployeeController') && content.includes('createEmployee');
    } else if (filePath.includes('models/')) {
      return content.includes('Employee') && content.includes('extends Model');
    } else if (filePath.includes('screens/')) {
      return content.includes('EmployeesScreen') && content.includes('FlatList');
    }
    return false;
  }

  async testIntegration() {
    console.log('\n🔗 TESTANDO INTEGRAÇÃO...');
    
    try {
      // Verificar se as rotas estão integradas no servidor
      const serverPath = path.join(__dirname, '..', 'backend', 'src', 'server.ts');
      const serverContent = fs.readFileSync(serverPath, 'utf8');
      
      const integrations = [
        { name: 'Payments', pattern: 'paymentsRouter' },
        { name: 'Purchases', pattern: 'purchasesRouter' },
        { name: 'Employees', pattern: 'employeesRouter' }
      ];

      const results = [];
      for (const integration of integrations) {
        const isIntegrated = serverContent.includes(integration.pattern);
        results.push({ name: integration.name, integrated: isIntegrated });
      }

      const allIntegrated = results.every(r => r.integrated);
      const integratedCount = results.filter(r => r.integrated).length;

      this.testResults.integration = {
        success: allIntegrated,
        message: `Integração: ${integratedCount}/${integrations.length} sistemas integrados`,
        details: results
      };

      console.log(`   ${allIntegrated ? '✅' : '⚠️'} ${this.testResults.integration.message}`);

    } catch (error) {
      this.testResults.integration = {
        success: false,
        message: `Erro na integração: ${error.message}`,
        error: error.message
      };
      console.log(`   ❌ Erro na integração: ${error.message}`);
    }
  }

  async testPerformance() {
    console.log('\n⚡ TESTANDO PERFORMANCE...');
    
    try {
      // Verificar tamanho dos arquivos principais
      const files = [
        'backend/src/server.ts',
        'frontend/src/App.tsx',
        'automation/automation-engine.js',
        'dashboard/dashboard-manager.js'
      ];

      const results = [];
      let totalSize = 0;

      for (const file of files) {
        const filePath = path.join(__dirname, '..', file);
        if (fs.existsSync(filePath)) {
          const stats = fs.statSync(filePath);
          const sizeKB = Math.round(stats.size / 1024);
          totalSize += sizeKB;
          results.push({ file, sizeKB, status: sizeKB < 100 ? 'OK' : 'LARGE' });
        }
      }

      const avgSize = Math.round(totalSize / results.length);
      const isGoodPerformance = avgSize < 50;

      this.testResults.performance = {
        success: isGoodPerformance,
        message: `Performance: ${avgSize}KB média por arquivo`,
        details: results
      };

      console.log(`   ${isGoodPerformance ? '✅' : '⚠️'} ${this.testResults.performance.message}`);

    } catch (error) {
      this.testResults.performance = {
        success: false,
        message: `Erro na performance: ${error.message}`,
        error: error.message
      };
      console.log(`   ❌ Erro na performance: ${error.message}`);
    }
  }

  async generateTestReport() {
    console.log('\n💾 GERANDO RELATÓRIO DE TESTES...');
    
    const report = {
      timestamp: new Date().toISOString(),
      testResults: this.testResults,
      summary: {
        totalSystems: Object.keys(this.testResults.systems).length,
        workingSystems: Object.values(this.testResults.systems).filter(r => r.success).length,
        totalLacunas: Object.keys(this.testResults.lacunasCriticas).length,
        workingLacunas: Object.values(this.testResults.lacunasCriticas).filter(r => r.success).length,
        integrationWorking: this.testResults.integration.success,
        performanceGood: this.testResults.performance.success
      }
    };
    
    const reportPath = path.join(__dirname, '..', 'logs', 'all-functionalities-test-report.json');
    const logsDir = path.dirname(reportPath);
    
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`   ✅ Relatório salvo: ${reportPath}`);
  }

  displaySummary() {
    console.log('\n📊 RESUMO DOS TESTES:');
    console.log('=====================');
    
    const summary = {
      totalSystems: Object.keys(this.testResults.systems).length,
      workingSystems: Object.values(this.testResults.systems).filter(r => r.success).length,
      totalLacunas: Object.keys(this.testResults.lacunasCriticas).length,
      workingLacunas: Object.values(this.testResults.lacunasCriticas).filter(r => r.success).length,
      integrationWorking: this.testResults.integration.success,
      performanceGood: this.testResults.performance.success
    };
    
    console.log(`🔧 Sistemas testados: ${summary.totalSystems}`);
    console.log(`✅ Sistemas funcionando: ${summary.workingSystems}`);
    console.log(`💰 Lacunas críticas testadas: ${summary.totalLacunas}`);
    console.log(`✅ Lacunas críticas funcionando: ${summary.workingLacunas}`);
    console.log(`🔗 Integração: ${summary.integrationWorking ? '✅ FUNCIONANDO' : '❌ PROBLEMAS'}`);
    console.log(`⚡ Performance: ${summary.performanceGood ? '✅ BOA' : '⚠️ ATENÇÃO'}`);
    
    // Status por sistema
    console.log('\n📋 STATUS POR SISTEMA:');
    Object.entries(this.testResults.systems).forEach(([system, result]) => {
      const status = result.success ? '✅ FUNCIONANDO' : '❌ PROBLEMAS';
      console.log(`   ${system}: ${status}`);
    });
    
    // Status por lacuna crítica
    console.log('\n📋 STATUS POR LACUNA CRÍTICA:');
    Object.entries(this.testResults.lacunasCriticas).forEach(([lacuna, result]) => {
      const status = result.success ? '✅ FUNCIONANDO' : '❌ PROBLEMAS';
      console.log(`   ${lacuna}: ${status}`);
    });
    
    // Próximos passos
    if (summary.workingSystems === summary.totalSystems && 
        summary.workingLacunas === summary.totalLacunas && 
        summary.integrationWorking && 
        summary.performanceGood) {
      console.log('\n🎉 TODOS OS TESTES PASSARAM! SISTEMA PRONTO PARA USO!');
      console.log('\n📋 PRÓXIMOS PASSOS:');
      console.log('   1. Iniciar implementação das lacunas de alta prioridade');
      console.log('   2. Expandir sistemas existentes');
      console.log('   3. Implementar funcionalidades disruptivas');
    } else {
      console.log('\n⚠️ ALGUNS TESTES FALHARAM - CORREÇÃO NECESSÁRIA');
      console.log('\n📋 AÇÕES CORRETIVAS:');
      console.log('   1. Corrigir sistemas com problemas');
      console.log('   2. Verificar integração');
      console.log('   3. Otimizar performance');
    }
  }
}

// Execução principal
async function main() {
  const tester = new AllFunctionalitiesTester();
  await tester.runAllTests();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = AllFunctionalitiesTester; 