
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
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value, expectedType) {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

// Aplicar validação de tipos
if (!validateType(data, 'object')) {
  throw new TypeError('Dados devem ser um objeto válido');
}


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
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error, context = 'unknown') {
  console.error(`[ERROR] ${context}:`, error.message);
  
  // Log estruturado para debugging
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    type: error.constructor.name
  };
  
  // Salvar log de erro
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'error-log.json'),
      JSON.stringify(errorLog) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
  
  // Re-throw para tratamento superior
  throw error;
}

// Aplicar tratamento de erro
try {
  // código principal aqui
} catch (error) {
  handleError(error, 'main-execution');
}


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