/**
 * 🧪 TESTE ANÁLISE PREDITIVA - DOM v2
 * Script de teste para validar o sistema de análise preditiva
 * Implementação: Semana 19-20 da Fase 5
 */

const PredictiveAnalysis = require('../predictive/predictive-analysis.js');

class PredictiveAnalysisTester {
    constructor() {
        this.name = 'PredictiveAnalysisTester';
        this.version = '1.0.0';
        this.testResults = [];
        this.startTime = Date.now();
    }

    /**
     * Executa todos os testes
     */
    async runAllTests() {
        console.log(`[${new Date().toISOString()}] 🧪 INICIANDO TESTES DE ANÁLISE PREDITIVA`);
        console.log(`[${new Date().toISOString()}] ==========================================`);
        
        try {
            // Teste 1: Inicialização
            await this.testInitialization();
            
            // Teste 2: Análise completa
            await this.testCompleteAnalysis();
            
            // Teste 3: Validação de dados
            await this.testDataValidation();
            
            // Teste 4: Performance
            await this.testPerformance();
            
            // Teste 5: Integração
            await this.testIntegration();
            
            // Teste 6: Relatórios
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
            const analysis = new PredictiveAnalysis();
            
            // Testa criação do objeto
            this.addTestResult('INIT', 'Criação do objeto PredictiveAnalysis', true);
            
            // Testa inicialização
            const initResult = await analysis.initialize();
            this.addTestResult('INIT', 'Inicialização do sistema', initResult.success, initResult.error);
            
            // Testa componentes
            const components = [
                { name: 'Engine', component: analysis.engine },
                { name: 'TrendAnalyzer', component: analysis.trendAnalyzer },
                { name: 'ProductivityPredictor', component: analysis.productivityPredictor }
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
     * Teste 2: Análise completa
     */
    async testCompleteAnalysis() {
        console.log(`[${new Date().toISOString()}] 🔮 Teste 2: Análise completa...`);
        
        try {
            const analysis = new PredictiveAnalysis();
            await analysis.initialize();
            
            // Executa análise completa
            const result = await analysis.runCompleteAnalysis();
            
            // Valida resultado
            this.addTestResult('ANALYSIS', 'Execução da análise completa', result.success, result.error);
            
            if (result.success) {
                // Valida estrutura dos resultados
                const hasPredictions = result.results && Array.isArray(result.results.predictions);
                this.addTestResult('ANALYSIS', 'Estrutura de previsões', hasPredictions);
                
                const hasTrends = result.results && result.results.trends;
                this.addTestResult('ANALYSIS', 'Estrutura de tendências', hasTrends);
                
                const hasProductivity = result.results && result.results.productivity;
                this.addTestResult('ANALYSIS', 'Estrutura de produtividade', hasProductivity);
                
                const hasInsights = result.results && Array.isArray(result.results.insights);
                this.addTestResult('ANALYSIS', 'Estrutura de insights', hasInsights);
                
                // Valida quantidade de previsões
                const predictionCount = result.results.predictions.length;
                const expectedCount = analysis.config.predictionHorizon;
                this.addTestResult('ANALYSIS', `Quantidade de previsões (${predictionCount}/${expectedCount})`, 
                    predictionCount >= expectedCount);
                
                // Valida confiança
                const confidence = result.results.confidence;
                this.addTestResult('ANALYSIS', `Confiança válida (${confidence})`, 
                    confidence >= 0 && confidence <= 1);
                
                // Valida tempo de processamento
                const processingTime = result.processingTime;
                this.addTestResult('ANALYSIS', `Tempo de processamento (${processingTime}ms)`, 
                    processingTime < 10000); // Máximo 10 segundos
            }
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 2 concluído`);
            
        } catch (error) {
            this.addTestResult('ANALYSIS', 'Análise completa', false, error.message);
            throw error;
        }
    }

    /**
     * Teste 3: Validação de dados
     */
    async testDataValidation() {
        console.log(`[${new Date().toISOString()}] 📊 Teste 3: Validação de dados...`);
        
        try {
            const analysis = new PredictiveAnalysis();
            
            // Testa geração de dados históricos
            const historicalData = analysis.generateHistoricalData();
            
            const hasData = Array.isArray(historicalData) && historicalData.length > 0;
            this.addTestResult('DATA', 'Geração de dados históricos', hasData);
            
            if (hasData) {
                // Valida estrutura dos dados
                const sample = historicalData[0];
                const requiredFields = ['date', 'productivity', 'tasks'];
                const hasRequiredFields = requiredFields.every(field => sample.hasOwnProperty(field));
                this.addTestResult('DATA', 'Estrutura dos dados históricos', hasRequiredFields);
                
                // Valida quantidade de dados
                const dataCount = historicalData.length;
                this.addTestResult('DATA', `Quantidade de dados (${dataCount})`, dataCount >= 90);
                
                // Valida valores de produtividade
                const validProductivity = historicalData.every(item => 
                    item.productivity >= 0 && item.productivity <= 1);
                this.addTestResult('DATA', 'Valores de produtividade válidos', validProductivity);
                
                // Valida datas
                const validDates = historicalData.every(item => 
                    !isNaN(new Date(item.date).getTime()));
                this.addTestResult('DATA', 'Formato de datas válido', validDates);
            }
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 3 concluído`);
            
        } catch (error) {
            this.addTestResult('DATA', 'Validação de dados', false, error.message);
            throw error;
        }
    }

    /**
     * Teste 4: Performance
     */
    async testPerformance() {
        console.log(`[${new Date().toISOString()}] ⚡ Teste 4: Performance...`);
        
        try {
            const analysis = new PredictiveAnalysis();
            await analysis.initialize();
            
            // Testa tempo de execução
            const startTime = Date.now();
            const result = await analysis.runCompleteAnalysis();
            const executionTime = Date.now() - startTime;
            
            // Valida tempo de execução
            const isFast = executionTime < 5000; // Máximo 5 segundos
            this.addTestResult('PERFORMANCE', `Tempo de execução (${executionTime}ms)`, isFast);
            
            // Testa uso de memória (simulado)
            const memoryUsage = process.memoryUsage();
            const isMemoryEfficient = memoryUsage.heapUsed < 100 * 1024 * 1024; // Máximo 100MB
            this.addTestResult('PERFORMANCE', 'Uso de memória eficiente', isMemoryEfficient);
            
            // Testa múltiplas execuções
            const times = [];
            for (let i = 0; i < 3; i++) {
                const start = Date.now();
                await analysis.runCompleteAnalysis();
                times.push(Date.now() - start);
            }
            
            const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
            const isConsistent = times.every(time => Math.abs(time - avgTime) < 1000); // Variação < 1s
            this.addTestResult('PERFORMANCE', 'Consistência de performance', isConsistent);
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 4 concluído`);
            
        } catch (error) {
            this.addTestResult('PERFORMANCE', 'Performance', false, error.message);
            throw error;
        }
    }

    /**
     * Teste 5: Integração
     */
    async testIntegration() {
        console.log(`[${new Date().toISOString()}] 🔗 Teste 5: Integração...`);
        
        try {
            const analysis = new PredictiveAnalysis();
            await analysis.initialize();
            await analysis.runCompleteAnalysis();
            
            // Testa integração de componentes
            const engineReport = analysis.engine.getAnalysisReport();
            this.addTestResult('INTEGRATION', 'Relatório do engine', !!engineReport);
            
            const trendReport = analysis.trendAnalyzer.getAnalysisReport();
            this.addTestResult('INTEGRATION', 'Relatório do trend analyzer', !!trendReport);
            
            const productivityReport = analysis.productivityPredictor.getPredictorReport();
            this.addTestResult('INTEGRATION', 'Relatório do productivity predictor', !!productivityReport);
            
            // Testa integração de resultados
            const integratedResults = analysis.integrateResults(
                { success: true, predictions: [] },
                { trend: { direction: 'stable' } },
                { success: true, predictions: [] }
            );
            
            this.addTestResult('INTEGRATION', 'Integração de resultados', !!integratedResults);
            
            // Testa validação
            const validation = analysis.validatePredictions();
            this.addTestResult('INTEGRATION', 'Validação de previsões', !!validation);
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 5 concluído`);
            
        } catch (error) {
            this.addTestResult('INTEGRATION', 'Integração', false, error.message);
            throw error;
        }
    }

    /**
     * Teste 6: Relatórios
     */
    async testReports() {
        console.log(`[${new Date().toISOString()}] 📋 Teste 6: Relatórios...`);
        
        try {
            const analysis = new PredictiveAnalysis();
            await analysis.initialize();
            await analysis.runCompleteAnalysis();
            
            // Testa relatório completo
            const fullReport = analysis.getAnalysisReport();
            this.addTestResult('REPORTS', 'Relatório completo', !!fullReport);
            
            if (fullReport) {
                const hasAnalysis = fullReport.analysis;
                this.addTestResult('REPORTS', 'Seção de análise', hasAnalysis);
                
                const hasResults = fullReport.results;
                this.addTestResult('REPORTS', 'Seção de resultados', hasResults);
                
                const hasMetrics = fullReport.metrics;
                this.addTestResult('REPORTS', 'Seção de métricas', hasMetrics);
                
                const hasComponents = fullReport.components;
                this.addTestResult('REPORTS', 'Seção de componentes', hasComponents);
            }
            
            // Testa relatório do dashboard
            const dashboardReport = analysis.getDashboardPredictions();
            this.addTestResult('REPORTS', 'Relatório do dashboard', !!dashboardReport);
            
            if (dashboardReport) {
                const hasNext7Days = Array.isArray(dashboardReport.next7Days);
                this.addTestResult('REPORTS', 'Previsões próximos 7 dias', hasNext7Days);
                
                const hasInsights = Array.isArray(dashboardReport.insights);
                this.addTestResult('REPORTS', 'Insights do dashboard', hasInsights);
                
                const hasRecommendations = Array.isArray(dashboardReport.recommendations);
                this.addTestResult('REPORTS', 'Recomendações do dashboard', hasRecommendations);
            }
            
            console.log(`[${new Date().toISOString()}] ✅ Teste 6 concluído`);
            
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
            console.log(`[${new Date().toISOString()}] 🎉 EXCELENTE! Sistema de análise preditiva funcionando perfeitamente`);
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
    console.log(`[${new Date().toISOString()}] 🚀 INICIANDO TESTES DE ANÁLISE PREDITIVA - DOM v2`);
    console.log(`[${new Date().toISOString()}] ================================================`);
    
    const tester = new PredictiveAnalysisTester();
    
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
    module.exports = PredictiveAnalysisTester;
    module.exports.main = main;
}

// Executa se for o arquivo principal
if (require.main === module) {
    main();
} 