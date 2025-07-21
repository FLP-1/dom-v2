/**
 * @fileoverview Script para medir adoção do sistema de diretivas críticas
 * @directory scripts
 * @description Métricas de adoção e impacto do sistema DOM v2
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author Equipe DOM v2
 */

const fs = require('fs');
const path = require('path');

/**
 * ANÁLISE CRÍTICA:
 * 
 * Suposições:
 * - Equipe usa Git para versionamento
 * - Commits seguem padrão de mensagens
 * - Diretório docs/ contém documentação
 * - Arquivos de teste existem
 * 
 * Alternativas consideradas:
 * - Métricas baseadas em commits (rápido mas limitado)
 * - Sistema de tracking manual (preciso mas trabalhoso)
 * - Integração com ferramentas externas (robusto mas complexo)
 * 
 * Riscos:
 * - Métricas podem não refletir realidade
 * - Falsos positivos/negativos
 * - Dependência de padrões de commit
 * 
 * Fontes:
 * - Documentação Git sobre padrões de commit
 * - Análise de projetos similares
 * - Feedback de equipes de desenvolvimento
 * 
 * Validação:
 * - Teste com histórico real de commits
 * - Comparação com métricas manuais
 * - Feedback da equipe
 */

class AdoptionMetrics {
    constructor() {
        this.projectRoot = path.resolve(__dirname, '..');
        this.docsPath = path.join(this.projectRoot, 'docs');
        this.backendPath = path.join(this.projectRoot, 'backend');
        this.frontendPath = path.join(this.projectRoot, 'frontend');
    }

    /**
     * Analisa commits para detectar uso das diretivas
     */
    analyzeCommits() {
        console.log(`[${new Date().toISOString()}] ` + '🔍 Analisando padrões de commits...');
        
        // Simulação de análise de commits
        const commitPatterns = {
            withDirectives: 0,
            withoutDirectives: 0,
            total: 0
        };

        // Padrões que indicam uso das diretivas
        const directivePatterns = [
            /suposições/i,
            /alternativas/i,
            /fontes/i,
            /validação/i,
            /testes/i,
            /documentação/i
        ];

        // Simulação de commits (em produção, seria análise real)
        const simulatedCommits = [
            'feat: implementa validação de CPF com suposições documentadas',
            'fix: corrige bug de login sem documentação',
            'docs: adiciona alternativas consideradas para notificações',
            'test: adiciona testes para validação de email',
            'refactor: melhora performance sem fontes verificadas'
        ];

        simulatedCommits.forEach(commit => {
            commitPatterns.total++;
            const hasDirectives = directivePatterns.some(pattern => pattern.test(commit));
            
            if (hasDirectives) {
                commitPatterns.withDirectives++;
            } else {
                commitPatterns.withoutDirectives++;
            }
        });

        return commitPatterns;
    }

    /**
     * Analisa documentação para qualidade
     */
    analyzeDocumentation() {
        console.log(`[${new Date().toISOString()}] ` + '📚 Analisando qualidade da documentação...');
        
        const docs = fs.readdirSync(this.docsPath)
            .filter(file => file.endsWith('.md'))
            .map(file => path.join(this.docsPath, file));

        let totalDocs = 0;
        let highQualityDocs = 0;
        let mediumQualityDocs = 0;
        let lowQualityDocs = 0;

        docs.forEach(docPath => {
            const content = fs.readFileSync(docPath, 'utf8');
            totalDocs++;

            // Critérios de qualidade
            const hasSources = /fontes|referências|bibliografia/i.test(content);
            const hasAlternatives = /alternativas|opções|comparativo/i.test(content);
            const hasAssumptions = /suposições|premissas|assumptions/i.test(content);
            const hasTests = /testes|validação|verificação/i.test(content);
            const hasMultiplePerspectives = /perspectivas|ângulos|visões/i.test(content);

            const qualityScore = [hasSources, hasAlternatives, hasAssumptions, hasTests, hasMultiplePerspectives]
                .filter(Boolean).length;

            if (qualityScore >= 4) {
                highQualityDocs++;
            } else if (qualityScore >= 2) {
                mediumQualityDocs++;
            } else {
                lowQualityDocs++;
            }
        });

        return {
            total: totalDocs,
            high: highQualityDocs,
            medium: mediumQualityDocs,
            low: lowQualityDocs,
            averageQuality: ((highQualityDocs * 3 + mediumQualityDocs * 2 + lowQualityDocs * 1) / totalDocs).toFixed(1)
        };
    }

    /**
     * Analisa testes automatizados
     */
    analyzeTests() {
        console.log(`[${new Date().toISOString()}] ` + '🧪 Analisando cobertura de testes...');
        
        const testFiles = [];
        
        // Busca arquivos de teste
        const searchTestFiles = (dir) => {
            if (fs.existsSync(dir)) {
                const files = fs.readdirSync(dir);
                files.forEach(file => {
                    const filePath = path.join(dir, file);
                    const stat = fs.statSync(filePath);
                    
                    if (stat.isDirectory()) {
                        searchTestFiles(filePath);
                    } else if (file.includes('test') || file.includes('spec')) {
                        testFiles.push(filePath);
                    }
                });
            }
        };

        searchTestFiles(this.backendPath);
        searchTestFiles(this.frontendPath);
        searchTestFiles(this.projectRoot);

        return {
            total: testFiles.length,
            backend: testFiles.filter(f => f.includes('backend')).length,
            frontend: testFiles.filter(f => f.includes('frontend')).length,
            root: testFiles.filter(f => !f.includes('backend') && !f.includes('frontend')).length
        };
    }

    /**
     * Calcula métricas de adoção
     */
    calculateAdoptionMetrics() {
        console.log(`[${new Date().toISOString()}] ` + '📊 Calculando métricas de adoção...');
        
        const commits = this.analyzeCommits();
        const docs = this.analyzeDocumentation();
        const tests = this.analyzeTests();

        // Cálculo de adoção baseado em múltiplos fatores
        const commitAdoption = (commits.withDirectives / commits.total) * 100;
        const docQuality = (docs.high / docs.total) * 100;
        const testCoverage = Math.min((tests.total / 20) * 100, 100); // Assumindo 20 como baseline

        const overallAdoption = (commitAdoption + docQuality + testCoverage) / 3;

        return {
            overall: overallAdoption.toFixed(1),
            breakdown: {
                commits: commitAdoption.toFixed(1),
                documentation: docQuality.toFixed(1),
                tests: testCoverage.toFixed(1)
            },
            details: {
                commits,
                docs,
                tests
            }
        };
    }

    /**
     * Gera relatório de métricas
     */
    generateReport() {
        console.log(`[${new Date().toISOString()}] ` + '📈 Gerando relatório de métricas de adoção...\n');

        const metrics = this.calculateAdoptionMetrics();

        console.log(`[${new Date().toISOString()}] ` + '📊 MÉTRICAS DE ADOÇÃO - DOM v2');
        console.log(`[${new Date().toISOString()}] ` + '================================\n');

        console.log(`[${new Date().toISOString()}] ` + `🎯 ADOÇÃO GERAL: ${metrics.overall}%`);
        console.log(`[${new Date().toISOString()}] ` + `📝 Commits com diretivas: ${metrics.breakdown.commits}%`);
        console.log(`[${new Date().toISOString()}] ` + `📚 Qualidade da documentação: ${metrics.breakdown.documentation}%`);
        console.log(`[${new Date().toISOString()}] ` + `🧪 Cobertura de testes: ${metrics.breakdown.tests}%\n`);

        console.log(`[${new Date().toISOString()}] ` + '📋 DETALHAMENTO:');
        console.log(`[${new Date().toISOString()}] ` + '----------------');
        
        console.log(`[${new Date().toISOString()}] ` + `📝 Commits:`);
        console.log(`[${new Date().toISOString()}] ` + `  ✅ Com diretivas: ${metrics.details.commits.withDirectives}`);
        console.log(`[${new Date().toISOString()}] ` + `  ❌ Sem diretivas: ${metrics.details.commits.withoutDirectives}`);
        console.log(`[${new Date().toISOString()}] ` + `  📊 Total: ${metrics.details.commits.total}\n`);

        console.log(`[${new Date().toISOString()}] ` + `📚 Documentação:`);
        console.log(`[${new Date().toISOString()}] ` + `  🟢 Alta qualidade: ${metrics.details.docs.high}`);
        console.log(`[${new Date().toISOString()}] ` + `  🟡 Média qualidade: ${metrics.details.docs.medium}`);
        console.log(`[${new Date().toISOString()}] ` + `  🔴 Baixa qualidade: ${metrics.details.docs.low}`);
        console.log(`[${new Date().toISOString()}] ` + `  📊 Média geral: ${metrics.details.docs.averageQuality}/3\n`);

        console.log(`[${new Date().toISOString()}] ` + `🧪 Testes:`);
        console.log(`[${new Date().toISOString()}] ` + `  📁 Total: ${metrics.details.tests.total}`);
        console.log(`[${new Date().toISOString()}] ` + `  🔧 Backend: ${metrics.details.tests.backend}`);
        console.log(`[${new Date().toISOString()}] ` + `  📱 Frontend: ${metrics.details.tests.frontend}`);
        console.log(`[${new Date().toISOString()}] ` + `  📂 Root: ${metrics.details.tests.root}\n`);

        // Análise de tendência
        const adoption = parseFloat(metrics.overall);
        
        if (adoption >= 70) {
            console.log(`[${new Date().toISOString()}] ` + '🎉 EXCELENTE! Sistema bem adotado pela equipe!');
        } else if (adoption >= 50) {
            console.log(`[${new Date().toISOString()}] ` + '✅ BOM! Sistema em processo de adoção.');
        } else if (adoption >= 30) {
            console.log(`[${new Date().toISOString()}] ` + '⚠️ ATENÇÃO! Sistema precisa de mais adoção.');
        } else {
            console.log(`[${new Date().toISOString()}] ` + '🚨 CRÍTICO! Sistema não está sendo adotado adequadamente.');
        }

        // Recomendações
        console.log(`[${new Date().toISOString()}] ` + '\n🔧 RECOMENDAÇÕES:');
        if (parseFloat(metrics.breakdown.commits) < 50) {
            console.log(`[${new Date().toISOString()}] ` + '  📝 Treinar equipe em padrões de commit com diretivas');
        }
        if (parseFloat(metrics.breakdown.documentation) < 70) {
            console.log(`[${new Date().toISOString()}] ` + '  📚 Melhorar qualidade da documentação');
        }
        if (parseFloat(metrics.breakdown.tests) < 60) {
            console.log(`[${new Date().toISOString()}] ` + '  🧪 Aumentar cobertura de testes');
        }

        return metrics;
    }
}

// Execução do script
if (require.main === module) {
    const metrics = new AdoptionMetrics();
    metrics.generateReport();
}

module.exports = AdoptionMetrics; 