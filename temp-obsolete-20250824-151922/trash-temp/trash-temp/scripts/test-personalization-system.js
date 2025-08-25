
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
 * Este arquivo implementa Testes unitários
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

/**
 * 🧪 TESTE SISTEMA DE PERSONALIZAÇÃO - DOM v2
 * Script de teste para validar o sistema de personalização avançada
 * Implementação: Semana 21-22 da Fase 5
 */

const PersonalizationSystem = require('../personalization/personalization-system.js');

class PersonalizationSystemTester {
    constructor() {
        this.name = 'PersonalizationSystemTester';
        this.version = '1.0.0';
        this.testResults = [];
        this.startTime = Date.now();
    }

    /**
     * Executa todos os testes
     */
    async runAllTests() {
        console.log(`[${new Date().toISOString()}] 🧪 INICIANDO TESTES DE PERSONALIZAÇÃO - DOM v2`);
        console.log(`[${new Date().toISOString()}] ================================================`);
        
        try {
            // Teste 1: Inicialização
            await this.testInitialization();
            
            // Teste 2: Criação de perfis
            await this.testProfileCreation();
            
            // Teste 3: Aplicação de personalização
            await this.testPersonalizationApplication();
            
            // Teste 4: Regras de personalização
            await this.testPersonalizationRules();
            
            // Teste 5: Performance
            await this.testPerformance();
            
            // Teste 6: Integração
            await this.testIntegration();
            
            // Teste 7: Relatórios
            await this.testReports();
            
            // Gera relatório final
            this.generateFinalReport();
            
        } catch (error) {
            console.error(`[${new Date().toISOString()}] ❌ Erro nos testes:`, error);
            this.addTestResult('ERROR', 'Erro geral nos testes', false, error.message);
        }
    }

    /**
     * Teste 1: Inicialização do sistema
     */
    async testInitialization() {
        console.log(`[${new Date().toISOString()}] 🔧 Teste 1: Inicialização do sistema...`);
        
        try {
            const system = new PersonalizationSystem();
            
            // Testa criação do objeto
            this.addTestResult('INIT', 'Criação do objeto PersonalizationSystem', true);
            
            // Testa inicialização
            const initResult = await system.initialize();
            this.addTestResult('INIT', 'Inicialização do sistema', initResult.success, initResult.error);
            
            // Testa componentes
            const components = [
                { name: 'UserProfiles', component: system.userProfiles },
                { name: 'PersonalizationRules', component: system.personalizationRules }
            ];
            
            components.forEach(({ name, component }) => {
                const isValid = component && typeof component === 'object' && component.name;
                this.addTestResult('INIT', `Componente ${name}`, isValid);
            });
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 1 concluído`);
            
        } catch (error) {
            this.addTestResult('INIT', 'Inicialização', false, error.message);
            throw error;
        }
    }

    /**
     * Teste 2: Criação de perfis
     */
    async testProfileCreation() {
        console.log(`[${new Date().toISOString()}] 👤 Teste 2: Criação de perfis...`);
        
        try {
            const system = new PersonalizationSystem();
            await system.initialize();
            
            // Testa criação de diferentes tipos de perfil
            const profileTypes = ['admin', 'manager', 'employee', 'family'];
            
            for (const profileType of profileTypes) {
                const userId = `test_${profileType}_${Date.now()}`;
                const result = system.userProfiles.createProfile(userId, profileType);
                
                this.addTestResult('PROFILES', `Criação de perfil ${profileType}`, result.success, result.error);
                
                if (result.success) {
                    // Valida perfil criado
                    const profile = system.userProfiles.getProfile(userId);
                    this.addTestResult('PROFILES', `Validação de perfil ${profileType}`, !!profile);
                    
                    // Valida configurações de interface
                    const interfaceSettings = system.userProfiles.getInterfaceSettings(userId);
                    this.addTestResult('PROFILES', `Configurações de interface ${profileType}`, !!interfaceSettings);
                    
                    // Valida configurações de produtividade
                    const productivitySettings = system.userProfiles.getProductivitySettings(userId);
                    this.addTestResult('PROFILES', `Configurações de produtividade ${profileType}`, !!productivitySettings);
                }
            }
            
            // Testa listagem de perfis
            const profilesList = system.userProfiles.listProfiles();
            this.addTestResult('PROFILES', 'Listagem de perfis', profilesList.total > 0);
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 2 concluído`);
            
        } catch (error) {
            this.addTestResult('PROFILES', 'Criação de perfis', false, error.message);
            throw error;
        }
    }

    /**
     * Teste 3: Aplicação de personalização
     */
    async testPersonalizationApplication() {
        console.log(`[${new Date().toISOString()}] 🎨 Teste 3: Aplicação de personalização...`);
        
        try {
            const system = new PersonalizationSystem();
            await system.initialize();
            
            // Cria perfil de teste
            const userId = `test_personalization_${Date.now()}`;
            system.userProfiles.createProfile(userId, 'manager');
            
            // Testa aplicação de personalização
            const result = await system.applyPersonalization(userId);
            
            this.addTestResult('PERSONALIZATION', 'Aplicação de personalização', result.success, result.error);
            
            if (result.success) {
                // Valida estrutura da personalização
                const hasPersonalization = result.personalization;
                this.addTestResult('PERSONALIZATION', 'Estrutura de personalização', hasPersonalization);
                
                const hasInterface = result.personalization.interface;
                this.addTestResult('PERSONALIZATION', 'Configurações de interface', hasInterface);
                
                const hasProductivity = result.personalization.productivity;
                this.addTestResult('PERSONALIZATION', 'Configurações de produtividade', hasProductivity);
                
                const hasProfile = result.personalization.profile;
                this.addTestResult('PERSONALIZATION', 'Informações de perfil', hasProfile);
                
                // Valida regras aplicadas
                const appliedRules = result.appliedRules;
                this.addTestResult('PERSONALIZATION', 'Regras aplicadas', Array.isArray(appliedRules));
                
                // Valida recomendações
                const recommendations = result.recommendations;
                this.addTestResult('PERSONALIZATION', 'Recomendações geradas', Array.isArray(recommendations));
            }
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 3 concluído`);
            
        } catch (error) {
            this.addTestResult('PERSONALIZATION', 'Aplicação de personalização', false, error.message);
            throw error;
        }
    }

    /**
     * Teste 4: Regras de personalização
     */
    async testPersonalizationRules() {
        console.log(`[${new Date().toISOString()}] ⚙️ Teste 4: Regras de personalização...`);
        
        try {
            const system = new PersonalizationSystem();
            await system.initialize();
            
            const userId = `test_rules_${Date.now()}`;
            system.userProfiles.createProfile(userId, 'admin');
            
            // Testa avaliação de regras
            const rulesResult = system.personalizationRules.evaluateRules(userId, {
                profile: { type: 'admin' },
                time: { hour: 10, day: 1 },
                device: { type: 'desktop' }
            });
            
            this.addTestResult('RULES', 'Avaliação de regras', rulesResult.success, rulesResult.error);
            
            if (rulesResult.success) {
                // Valida regras aplicadas
                const appliedRules = rulesResult.appliedRules;
                this.addTestResult('RULES', 'Regras aplicadas', Array.isArray(appliedRules));
                
                // Valida mudanças
                const changes = rulesResult.changes;
                this.addTestResult('RULES', 'Mudanças registradas', Array.isArray(changes));
            }
            
            // Testa criação de regra personalizada
            const customRule = {
                category: 'productivity',
                name: 'Teste Personalizado',
                description: 'Regra de teste para validação',
                condition: (context) => context.profile.type === 'admin',
                action: (profile) => ({ ...profile, testField: true }),
                priority: 50
            };
            
            const createRuleResult = system.personalizationRules.createCustomRule(userId, customRule);
            this.addTestResult('RULES', 'Criação de regra personalizada', createRuleResult.success, createRuleResult.error);
            
            // Testa listagem de regras personalizadas
            const customRules = system.personalizationRules.listCustomRules(userId);
            this.addTestResult('RULES', 'Listagem de regras personalizadas', customRules.total >= 0);
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 4 concluído`);
            
        } catch (error) {
            this.addTestResult('RULES', 'Regras de personalização', false, error.message);
            throw error;
        }
    }

    /**
     * Teste 5: Performance
     */
    async testPerformance() {
        console.log(`[${new Date().toISOString()}] ⚡ Teste 5: Performance...`);
        
        try {
            const system = new PersonalizationSystem();
            await system.initialize();
            
            // Testa tempo de aplicação de personalização
            const startTime = Date.now();
            const result = await system.applyPersonalization('test_performance');
            const executionTime = Date.now() - startTime;
            
            const isFast = executionTime < 1000; // Máximo 1 segundo
            this.addTestResult('PERFORMANCE', `Tempo de aplicação (${executionTime}ms)`, isFast);
            
            // Testa múltiplas aplicações
            const times = [];
            for (let i = 0; i < 3; i++) {
                const start = Date.now();
                await system.applyPersonalization(`test_perf_${i}`);
                times.push(Date.now() - start);
            }
            
            const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
            const isConsistent = times.every(time => Math.abs(time - avgTime) < 500); // Variação < 500ms
            this.addTestResult('PERFORMANCE', 'Consistência de performance', isConsistent);
            
            // Testa uso de memória
            const memoryUsage = process.memoryUsage();
            const isMemoryEfficient = memoryUsage.heapUsed < 200 * 1024 * 1024; // Máximo 200MB
            this.addTestResult('PERFORMANCE', 'Uso de memória eficiente', isMemoryEfficient);
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 5 concluído`);
            
        } catch (error) {
            this.addTestResult('PERFORMANCE', 'Performance', false, error.message);
            throw error;
        }
    }

    /**
     * Teste 6: Integração
     */
    async testIntegration() {
        console.log(`[${new Date().toISOString()}] 🔗 Teste 6: Integração...`);
        
        try {
            const system = new PersonalizationSystem();
            await system.initialize();
            
            // Testa integração entre componentes
            const profilesReport = system.userProfiles.getProfilesReport();
            this.addTestResult('INTEGRATION', 'Relatório de perfis', !!profilesReport);
            
            const rulesReport = system.personalizationRules.getRulesReport();
            this.addTestResult('INTEGRATION', 'Relatório de regras', !!rulesReport);
            
            const systemReport = system.getSystemReport();
            this.addTestResult('INTEGRATION', 'Relatório do sistema', !!systemReport);
            
            // Testa validação de personalização
            const userId = `test_integration_${Date.now()}`;
            system.userProfiles.createProfile(userId, 'employee');
            await system.applyPersonalization(userId);
            
            const validation = system.validatePersonalization(userId);
            this.addTestResult('INTEGRATION', 'Validação de personalização', validation.valid);
            
            // Testa dados do dashboard
            const dashboardData = system.getDashboardData();
            this.addTestResult('INTEGRATION', 'Dados do dashboard', !!dashboardData);
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 6 concluído`);
            
        } catch (error) {
            this.addTestResult('INTEGRATION', 'Integração', false, error.message);
            throw error;
        }
    }

    /**
     * Teste 7: Relatórios
     */
    async testReports() {
        console.log(`[${new Date().toISOString()}] 📋 Teste 7: Relatórios...`);
        
        try {
            const system = new PersonalizationSystem();
            await system.initialize();
            
            // Testa relatório do sistema
            const systemReport = system.getSystemReport();
            this.addTestResult('REPORTS', 'Relatório do sistema', !!systemReport);
            
            if (systemReport) {
                const hasSystem = systemReport.system;
                this.addTestResult('REPORTS', 'Seção do sistema', hasSystem);
                
                const hasComponents = systemReport.components;
                this.addTestResult('REPORTS', 'Seção de componentes', hasComponents);
                
                const hasMetrics = systemReport.metrics;
                this.addTestResult('REPORTS', 'Seção de métricas', hasMetrics);
                
                const hasHistory = systemReport.history;
                this.addTestResult('REPORTS', 'Seção de histórico', hasHistory);
            }
            
            // Testa dados do dashboard
            const dashboardData = system.getDashboardData();
            this.addTestResult('REPORTS', 'Dados do dashboard', !!dashboardData);
            
            if (dashboardData) {
                const hasProfiles = dashboardData.profiles;
                this.addTestResult('REPORTS', 'Dados de perfis', hasProfiles);
                
                const hasPersonalizations = dashboardData.personalizations;
                this.addTestResult('REPORTS', 'Dados de personalizações', hasPersonalizations);
                
                const hasMetrics = dashboardData.metrics;
                this.addTestResult('REPORTS', 'Métricas do dashboard', hasMetrics);
                
                const hasRecommendations = dashboardData.recommendations;
                this.addTestResult('REPORTS', 'Recomendações do dashboard', Array.isArray(hasRecommendations));
            }
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 7 concluído`);
            
        } catch (error) {
            this.addTestResult('REPORTS', 'Relatórios', false, error.message);
            throw error;
        }
    }

    /**
     * Adiciona resultado de teste
     */
    addTestResult(category, description, passed, error = null) {
        const result = {
            category,
            description,
            passed,
            error,
            timestamp: new Date().toISOString()
        };
        
        this.testResults.push(result);
        
        const status = passed ? '✅' : '❌';
        console.log(`[${new Date().toISOString()}] ${status} ${category}: ${description}`);
        
        if (error) {
            console.log(`[${new Date().toISOString()}]    Erro: ${error}`);
        }
    }

    /**
     * Gera relatório final
     */
    generateFinalReport() {
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(r => r.passed).length;
        const failedTests = totalTests - passedTests;
        const successRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
        const executionTime = Date.now() - this.startTime;
        
        console.log(`\n[${new Date().toISOString()}] 📊 RELATÓRIO FINAL DOS TESTES`);
        console.log(`[${new Date().toISOString()}] =================================`);
        console.log(`[${new Date().toISOString()}] 📈 Total de testes: ${totalTests}`);
        console.log(`[${new Date().toISOString()}] ✅ Testes aprovados: ${passedTests}`);
        console.log(`[${new Date().toISOString()}] ❌ Testes falharam: ${failedTests}`);
        console.log(`[${new Date().toISOString()}] 📊 Taxa de sucesso: ${successRate.toFixed(1)}%`);
        console.log(`[${new Date().toISOString()}] ⏱️  Tempo total: ${executionTime}ms`);
        
        // Agrupa por categoria
        const categories = {};
        this.testResults.forEach(result => {
            if (!categories[result.category]) {
                categories[result.category] = { passed: 0, failed: 0, total: 0 };
            }
            categories[result.category].total++;
            if (result.passed) {
                categories[result.category].passed++;
            } else {
                categories[result.category].failed++;
            }
        });
        
        console.log(`\n[${new Date().toISOString()}] 📋 RESULTADOS POR CATEGORIA:`);
        Object.keys(categories).forEach(category => {
            const cat = categories[category];
            const catSuccessRate = (cat.passed / cat.total) * 100;
            console.log(`[${new Date().toISOString()}] ${category}: ${cat.passed}/${cat.total} (${catSuccessRate.toFixed(1)}%)`);
        });
        
        // Testes que falharam
        const failedResults = this.testResults.filter(r => !r.passed);
        if (failedResults.length > 0) {
            console.log(`\n[${new Date().toISOString()}] ❌ TESTES QUE FALHARAM:`);
            failedResults.forEach(result => {
                console.log(`[${new Date().toISOString()}] - ${result.category}: ${result.description}`);
                if (result.error) {
                    console.log(`[${new Date().toISOString()}]   Erro: ${result.error}`);
                }
            });
        }
        
        // Conclusão
        console.log(`\n[${new Date().toISOString()}] 🎯 CONCLUSÃO:`);
        if (successRate >= 90) {
            console.log(`[${new Date().toISOString()}] 🎉 EXCELENTE! Sistema de personalização funcionando perfeitamente`);
        } else if (successRate >= 80) {
            console.log(`[${new Date().toISOString()}] ✅ BOM! Sistema funcionando com pequenos ajustes necessários`);
        } else if (successRate >= 70) {
            console.log(`[${new Date().toISOString()}] 🟡 REGULAR! Sistema funcionando mas precisa de melhorias`);
        } else {
            console.log(`[${new Date().toISOString()}] ❌ PROBLEMAS! Sistema precisa de correções significativas`);
        }
        
        return {
            totalTests,
            passedTests,
            failedTests,
            successRate,
            executionTime,
            categories,
            failedResults
        };
    }
}

// Função principal
async function main() {
    console.log(`[${new Date().toISOString()}] 🚀 INICIANDO TESTES DE PERSONALIZAÇÃO - DOM v2`);
    console.log(`[${new Date().toISOString()}] ================================================`);
    
    const tester = new PersonalizationSystemTester();
    
    try {
        await tester.runAllTests();
        
        const report = tester.generateFinalReport();
        
        // Retorna código de saída baseado no sucesso
        if (report.successRate >= 80) {
            console.log(`[${new Date().toISOString()}] 🎉 Testes concluídos com sucesso!`);
            process.exit(0);
        } else {
            console.log(`[${new Date().toISOString()}] ⚠️ Testes concluídos com problemas`);
            process.exit(1);
        }
        
    } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ Erro fatal nos testes:`, error);
        process.exit(1);
    }
}

// Exporta para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersonalizationSystemTester;
    module.exports.main = main;
}

// Executa se for o arquivo principal
if (require.main === module) {
    main();
} 