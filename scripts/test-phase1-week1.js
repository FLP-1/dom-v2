/**
 * @fileoverview Teste das implementações da Semana 1 - Qualidade de Código
 * @description Valida centralização de mensagens, componentes reutilizáveis e configuração
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */

const fs = require('fs');
const path = require('path');

class Phase1Week1Tester {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      phase: 'Fase 1 - Fundação',
      week: 'Semana 1 - Qualidade de Código',
      tests: [],
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        score: 0
      }
    };
  }

  // Testar centralização de mensagens
  testMessageSystem() {
    console.log('🧪 Testando Sistema de Mensagens...');
    
    const testCases = [
      {
        name: 'Arquivo messages.ts existe',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/messages.ts');
          return fs.existsSync(filePath);
        }
      },
      {
        name: 'Sistema de mensagens inicializado',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/messages.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('MessageSystem.initialize()');
        }
      },
      {
        name: 'Mensagens de autenticação carregadas',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/messages.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('auth.login.success') && content.includes('auth.login.error');
        }
      },
      {
        name: 'Mensagens de tarefas carregadas',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/messages.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('task.create.success') && content.includes('task.create.error');
        }
      },
      {
        name: 'Mensagens de validação carregadas',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/messages.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('validation.required') && content.includes('validation.email');
        }
      }
    ];

    testCases.forEach(testCase => {
      const passed = testCase.test();
      this.addTestResult('Sistema de Mensagens', testCase.name, passed);
    });
  }

  // Testar sistema de configuração
  testConfigSystem() {
    console.log('⚙️ Testando Sistema de Configuração...');
    
    const testCases = [
      {
        name: 'Arquivo config.ts existe',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/config.ts');
          return fs.existsSync(filePath);
        }
      },
      {
        name: 'Sistema de configuração inicializado',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/config.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('ConfigSystem.initialize()');
        }
      },
      {
        name: 'Configurações de API carregadas',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/config.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('api.baseUrl') && content.includes('api.timeout');
        }
      },
      {
        name: 'Configurações de segurança carregadas',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/config.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('security.jwtSecret') && content.includes('security.passwordMinLength');
        }
      },
      {
        name: 'Configurações de UI carregadas',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/config.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('ui.theme.default') && content.includes('ui.language.default');
        }
      }
    ];

    testCases.forEach(testCase => {
      const passed = testCase.test();
      this.addTestResult('Sistema de Configuração', testCase.name, passed);
    });
  }

  // Testar componentes reutilizáveis
  testReusableComponents() {
    console.log('🧩 Testando Componentes Reutilizáveis...');
    
    const testCases = [
      {
        name: 'Componente Button existe',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/components/ui/Button.tsx');
          return fs.existsSync(filePath);
        }
      },
      {
        name: 'Componente Input existe',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/components/ui/Input.tsx');
          return fs.existsSync(filePath);
        }
      },
      {
        name: 'Componente Card existe',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/components/ui/Card.tsx');
          return fs.existsSync(filePath);
        }
      },
      {
        name: 'Índice de componentes UI existe',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/components/ui/index.ts');
          return fs.existsSync(filePath);
        }
      },
      {
        name: 'Componente Button com variantes',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/components/ui/Button.tsx');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('ButtonVariant') && content.includes('PRIMARY') && content.includes('SECONDARY');
        }
      },
      {
        name: 'Componente Input com tipos',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/components/ui/Input.tsx');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('InputType') && content.includes('EMAIL') && content.includes('PASSWORD');
        }
      },
      {
        name: 'Componente Card com variantes',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/components/ui/Card.tsx');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('CardVariant') && content.includes('DEFAULT') && content.includes('ELEVATED');
        }
      }
    ];

    testCases.forEach(testCase => {
      const passed = testCase.test();
      this.addTestResult('Componentes Reutilizáveis', testCase.name, passed);
    });
  }

  // Testar sistema de validação
  testValidationSystem() {
    console.log('✅ Testando Sistema de Validação...');
    
    const testCases = [
      {
        name: 'Arquivo validation.ts existe',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/validation.ts');
          return fs.existsSync(filePath);
        }
      },
      {
        name: 'Sistema de validação inicializado',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/validation.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('ValidationSystem.initialize()');
        }
      },
      {
        name: 'Validação de CPF implementada',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/validation.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('isValidCPF') && content.includes('ValidationType.CPF');
        }
      },
      {
        name: 'Validação de email implementada',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/validation.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('isValidEmail') && content.includes('ValidationType.EMAIL');
        }
      },
      {
        name: 'Validação de senha implementada',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/validation.ts');
          const content = fs.readFileSync(filePath, 'utf8');
          return content.includes('isValidPassword') && content.includes('ValidationType.PASSWORD');
        }
      }
    ];

    testCases.forEach(testCase => {
      const passed = testCase.test();
      this.addTestResult('Sistema de Validação', testCase.name, passed);
    });
  }

  // Testar arquitetura de código
  testCodeArchitecture() {
    console.log('🏗️ Testando Arquitetura de Código...');
    
    const testCases = [
      {
        name: 'Índice de utilitários existe',
        test: () => {
          const filePath = path.join(__dirname, '../frontend/src/utils/index.ts');
          return fs.existsSync(filePath);
        }
      },
      {
        name: 'Estrutura de pastas organizada',
        test: () => {
          const utilsPath = path.join(__dirname, '../frontend/src/utils');
          const componentsPath = path.join(__dirname, '../frontend/src/components/ui');
          return fs.existsSync(utilsPath) && fs.existsSync(componentsPath);
        }
      },
      {
        name: 'Documentação nos arquivos',
        test: () => {
          const files = [
            '../frontend/src/utils/messages.ts',
            '../frontend/src/utils/config.ts',
            '../frontend/src/utils/validation.ts',
            '../frontend/src/components/ui/Button.tsx',
            '../frontend/src/components/ui/Input.tsx',
            '../frontend/src/components/ui/Card.tsx'
          ];
          
          return files.every(file => {
            const filePath = path.join(__dirname, file);
            if (!fs.existsSync(filePath)) return false;
            const content = fs.readFileSync(filePath, 'utf8');
            return content.includes('@fileoverview') && content.includes('@description');
          });
        }
      },
      {
        name: 'Padrões internacionais (sem acentos)',
        test: () => {
          const files = [
            '../frontend/src/utils/messages.ts',
            '../frontend/src/utils/config.ts',
            '../frontend/src/utils/validation.ts',
            '../frontend/src/components/ui/Button.tsx',
            '../frontend/src/components/ui/Input.tsx',
            '../frontend/src/components/ui/Card.tsx'
          ];
          
          return files.every(file => {
            const filePath = path.join(__dirname, file);
            if (!fs.existsSync(filePath)) return false;
            const content = fs.readFileSync(filePath, 'utf8');
            // Verificar se não há acentos em nomes de variáveis/funções
            const codeLines = content.split('\n').filter(line => 
              !line.includes('@') && !line.includes('//') && !line.includes('/*')
            );
            const hasAccents = codeLines.some(line => 
              /[àáâãäåçèéêëìíîïñòóôõöùúûüýÿ]/.test(line)
            );
            return !hasAccents;
          });
        }
      }
    ];

    testCases.forEach(testCase => {
      const passed = testCase.test();
      this.addTestResult('Arquitetura de Código', testCase.name, passed);
    });
  }

  // Adicionar resultado de teste
  addTestResult(category, name, passed) {
    this.results.tests.push({
      category,
      name,
      passed,
      timestamp: new Date().toISOString()
    });
    
    this.results.summary.total++;
    if (passed) {
      this.results.summary.passed++;
    } else {
      this.results.summary.failed++;
    }
  }

  // Executar todos os testes
  runAllTests() {
    console.log('🚀 INICIANDO TESTES DA SEMANA 1 - QUALIDADE DE CÓDIGO');
    console.log('==================================================');
    
    this.testMessageSystem();
    this.testConfigSystem();
    this.testReusableComponents();
    this.testValidationSystem();
    this.testCodeArchitecture();
    
    this.calculateScore();
    this.generateReport();
  }

  // Calcular pontuação
  calculateScore() {
    this.results.summary.score = Math.round((this.results.summary.passed / this.results.summary.total) * 100);
  }

  // Gerar relatório
  generateReport() {
    console.log('\n📊 RELATÓRIO DOS TESTES - SEMANA 1');
    console.log('===================================');
    console.log(`📅 Data: ${new Date().toLocaleDateString('pt-BR')}`);
    console.log(`⏰ Hora: ${new Date().toLocaleTimeString('pt-BR')}`);
    console.log(`🎯 Fase: ${this.results.phase}`);
    console.log(`📋 Semana: ${this.results.week}`);
    console.log('');
    
    // Agrupar testes por categoria
    const categories = {};
    this.results.tests.forEach(test => {
      if (!categories[test.category]) {
        categories[test.category] = [];
      }
      categories[test.category].push(test);
    });
    
    // Exibir resultados por categoria
    Object.entries(categories).forEach(([category, tests]) => {
      console.log(`📁 ${category}:`);
      tests.forEach(test => {
        const status = test.passed ? '✅' : '❌';
        console.log(`   ${status} ${test.name}`);
      });
      console.log('');
    });
    
    // Resumo final
    console.log('📈 RESUMO FINAL:');
    console.log(`   Total de testes: ${this.results.summary.total}`);
    console.log(`   ✅ Aprovados: ${this.results.summary.passed}`);
    console.log(`   ❌ Reprovados: ${this.results.summary.failed}`);
    console.log(`   📊 Pontuação: ${this.results.summary.score}%`);
    
    // Status geral
    if (this.results.summary.score >= 90) {
      console.log('🎉 STATUS: EXCELENTE - Semana 1 implementada com sucesso!');
    } else if (this.results.summary.score >= 80) {
      console.log('👍 STATUS: BOM - Semana 1 implementada com pequenos ajustes necessários');
    } else if (this.results.summary.score >= 70) {
      console.log('⚠️ STATUS: REGULAR - Semana 1 precisa de melhorias');
    } else {
      console.log('🚨 STATUS: CRÍTICO - Semana 1 precisa de revisão completa');
    }
    
    // Salvar relatório
    this.saveReport();
  }

  // Salvar relatório
  saveReport() {
    const reportPath = path.join(__dirname, '../logs/phase1-week1-test-report.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n💾 Relatório salvo em: ${reportPath}`);
  }
}

// Executar testes
const tester = new Phase1Week1Tester();
tester.runAllTests(); 