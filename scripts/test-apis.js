/**
 * @fileoverview Script de Teste de APIs - DOM v2
 * @directory scripts
 * @description Testa as APIs das lacunas críticas implementadas
 * @created 2025-07-22
 * @lastModified 2025-07-22
 * @author DOM v2 Team
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

class APITester {
  constructor() {
    this.baseURL = 'http://localhost:3001';
    this.testResults = {
      payments: [],
      purchases: [],
      employees: [],
      summary: {}
    };
  }

  async testAllAPIs() {
    console.log('🌐 INICIANDO TESTES DE API DO DOM v2');
    console.log('====================================');
    console.log(`📍 Base URL: ${this.baseURL}`);
    
    try {
      // 1. Testar APIs de Pagamentos
      await this.testPaymentsAPI();
      
      // 2. Testar APIs de Compras
      await this.testPurchasesAPI();
      
      // 3. Testar APIs de Funcionários
      await this.testEmployeesAPI();
      
      // 4. Gerar relatório
      await this.generateAPIReport();
      
      console.log('\n🎉 TESTES DE API CONCLUÍDOS!');
      this.displayAPISummary();
      
    } catch (error) {
      console.error('❌ Erro nos testes de API:', error.message);
      process.exit(1);
    }
  }

  async testPaymentsAPI() {
    console.log('\n💰 TESTANDO APIS DE PAGAMENTOS...');
    
    const tests = [
      {
        name: 'GET /api/payments',
        method: 'GET',
        path: '/api/payments',
        expectedStatus: 200
      },
      {
        name: 'POST /api/payments',
        method: 'POST',
        path: '/api/payments',
        data: {
          amount: 100.50,
          currency: 'BRL',
          method: 'PIX',
          description: 'Teste de pagamento',
          userId: 1
        },
        expectedStatus: 201
      },
      {
        name: 'GET /api/payments/1',
        method: 'GET',
        path: '/api/payments/1',
        expectedStatus: 200
      },
      {
        name: 'PUT /api/payments/1',
        method: 'PUT',
        path: '/api/payments/1',
        data: {
          status: 'PROCESSED'
        },
        expectedStatus: 200
      },
      {
        name: 'POST /api/payments/1/process',
        method: 'POST',
        path: '/api/payments/1/process',
        expectedStatus: 200
      }
    ];

    for (const test of tests) {
      try {
        const result = await this.makeRequest(test);
        this.testResults.payments.push({
          test: test.name,
          success: result.success,
          status: result.status,
          response: result.response,
          error: result.error
        });
        
        const status = result.success ? '✅' : '❌';
        console.log(`   ${status} ${test.name}: ${result.status}`);
        
      } catch (error) {
        this.testResults.payments.push({
          test: test.name,
          success: false,
          error: error.message
        });
        console.log(`   ❌ ${test.name}: Erro - ${error.message}`);
      }
    }
  }

  async testPurchasesAPI() {
    console.log('\n🛒 TESTANDO APIS DE COMPRAS...');
    
    const tests = [
      {
        name: 'GET /api/purchases',
        method: 'GET',
        path: '/api/purchases',
        expectedStatus: 200
      },
      {
        name: 'POST /api/purchases',
        method: 'POST',
        path: '/api/purchases',
        data: {
          title: 'Compras do mês',
          description: 'Compras básicas para casa',
          amount: 500.00,
          category: 'ALIMENTOS',
          priority: 'MEDIUM',
          userId: 1
        },
        expectedStatus: 201
      },
      {
        name: 'GET /api/purchases/1',
        method: 'GET',
        path: '/api/purchases/1',
        expectedStatus: 200
      },
      {
        name: 'PUT /api/purchases/1',
        method: 'PUT',
        path: '/api/purchases/1',
        data: {
          status: 'APPROVED'
        },
        expectedStatus: 200
      },
      {
        name: 'POST /api/purchases/1/approve',
        method: 'POST',
        path: '/api/purchases/1/approve',
        expectedStatus: 200
      }
    ];

    for (const test of tests) {
      try {
        const result = await this.makeRequest(test);
        this.testResults.purchases.push({
          test: test.name,
          success: result.success,
          status: result.status,
          response: result.response,
          error: result.error
        });
        
        const status = result.success ? '✅' : '❌';
        console.log(`   ${status} ${test.name}: ${result.status}`);
        
      } catch (error) {
        this.testResults.purchases.push({
          test: test.name,
          success: false,
          error: error.message
        });
        console.log(`   ❌ ${test.name}: Erro - ${error.message}`);
      }
    }
  }

  async testEmployeesAPI() {
    console.log('\n👥 TESTANDO APIS DE FUNCIONÁRIOS...');
    
    const tests = [
      {
        name: 'GET /api/employees',
        method: 'GET',
        path: '/api/employees',
        expectedStatus: 200
      },
      {
        name: 'POST /api/employees',
        method: 'POST',
        path: '/api/employees',
        data: {
          name: 'João Silva',
          email: 'joao@exemplo.com',
          phone: '(11) 99999-9999',
          position: 'Auxiliar Doméstico',
          salary: 1500.00,
          hireDate: new Date().toISOString(),
          userId: 1
        },
        expectedStatus: 201
      },
      {
        name: 'GET /api/employees/1',
        method: 'GET',
        path: '/api/employees/1',
        expectedStatus: 200
      },
      {
        name: 'PUT /api/employees/1',
        method: 'PUT',
        path: '/api/employees/1',
        data: {
          salary: 1600.00
        },
        expectedStatus: 200
      },
      {
        name: 'POST /api/employees/1/clock-in',
        method: 'POST',
        path: '/api/employees/1/clock-in',
        expectedStatus: 200
      },
      {
        name: 'POST /api/employees/1/clock-out',
        method: 'POST',
        path: '/api/employees/1/clock-out',
        expectedStatus: 200
      }
    ];

    for (const test of tests) {
      try {
        const result = await this.makeRequest(test);
        this.testResults.employees.push({
          test: test.name,
          success: result.success,
          status: result.status,
          response: result.response,
          error: result.error
        });
        
        const status = result.success ? '✅' : '❌';
        console.log(`   ${status} ${test.name}: ${result.status}`);
        
      } catch (error) {
        this.testResults.employees.push({
          test: test.name,
          success: false,
          error: error.message
        });
        console.log(`   ❌ ${test.name}: Erro - ${error.message}`);
      }
    }
  }

  async makeRequest(test) {
    return new Promise((resolve, reject) => {
      const url = new URL(test.path, this.baseURL);
      const options = {
        hostname: url.hostname,
        port: url.port || 3001,
        path: url.pathname,
        method: test.method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const req = http.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            const success = res.statusCode === test.expectedStatus;
            
            resolve({
              success,
              status: res.statusCode,
              response,
              error: success ? null : `Status esperado: ${test.expectedStatus}, recebido: ${res.statusCode}`
            });
          } catch (error) {
            resolve({
              success: false,
              status: res.statusCode,
              response: data,
              error: 'Resposta não é JSON válido'
            });
          }
        });
      });

      req.on('error', (error) => {
        resolve({
          success: false,
          status: 0,
          error: `Erro de conexão: ${error.message}`
        });
      });

      if (test.data) {
        req.write(JSON.stringify(test.data));
      }

      req.end();
    });
  }

  async generateAPIReport() {
    console.log('\n💾 GERANDO RELATÓRIO DE APIS...');
    
    const report = {
      timestamp: new Date().toISOString(),
      baseURL: this.baseURL,
      testResults: this.testResults,
      summary: {
        totalPaymentsTests: this.testResults.payments.length,
        successfulPaymentsTests: this.testResults.payments.filter(r => r.success).length,
        totalPurchasesTests: this.testResults.purchases.length,
        successfulPurchasesTests: this.testResults.purchases.filter(r => r.success).length,
        totalEmployeesTests: this.testResults.employees.length,
        successfulEmployeesTests: this.testResults.employees.filter(r => r.success).length
      }
    };
    
    const reportPath = path.join(__dirname, '..', 'logs', 'api-test-report.json');
    const logsDir = path.dirname(reportPath);
    
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`   ✅ Relatório salvo: ${reportPath}`);
  }

  displayAPISummary() {
    console.log('\n📊 RESUMO DOS TESTES DE API:');
    console.log('============================');
    
    const summary = {
      totalPaymentsTests: this.testResults.payments.length,
      successfulPaymentsTests: this.testResults.payments.filter(r => r.success).length,
      totalPurchasesTests: this.testResults.purchases.length,
      successfulPurchasesTests: this.testResults.purchases.filter(r => r.success).length,
      totalEmployeesTests: this.testResults.employees.length,
      successfulEmployeesTests: this.testResults.employees.filter(r => r.success).length
    };
    
    console.log(`💰 Testes de Pagamentos: ${summary.successfulPaymentsTests}/${summary.totalPaymentsTests}`);
    console.log(`🛒 Testes de Compras: ${summary.successfulPurchasesTests}/${summary.totalPurchasesTests}`);
    console.log(`👥 Testes de Funcionários: ${summary.successfulEmployeesTests}/${summary.totalEmployeesTests}`);
    
    const totalTests = summary.totalPaymentsTests + summary.totalPurchasesTests + summary.totalEmployeesTests;
    const successfulTests = summary.successfulPaymentsTests + summary.successfulPurchasesTests + summary.successfulEmployeesTests;
    
    console.log(`\n📊 TOTAL: ${successfulTests}/${totalTests} testes passaram`);
    
    if (successfulTests === totalTests) {
      console.log('\n🎉 TODAS AS APIS ESTÃO FUNCIONANDO!');
    } else {
      console.log('\n⚠️ ALGUMAS APIS FALHARAM - VERIFICAR SERVIDOR');
      console.log('\n💡 DICA: Certifique-se de que o servidor está rodando em http://localhost:3001');
    }
  }
}

// Execução principal
async function main() {
  const tester = new APITester();
  await tester.testAllAPIs();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = APITester; 