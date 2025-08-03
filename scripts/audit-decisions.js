
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
 * Este arquivo implementa Implementação de funcionalidade
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

#!/usr/bin/env node

/**
 * SISTEMA DE AUDITORIA DE DECISÕES
 * 
 * Este script rastreia todas as decisões tomadas no projeto para garantir:
 * 1. Rastreabilidade completa
 * 2. Validação das diretivas críticas
 * 3. Documentação de fontes e justificativas
 * 4. Identificação de padrões e melhorias
 */

const fs = require('fs');
const path = require('path');

class DecisionAuditor {
    constructor() {
        this.auditLog = [];
        this.decisionsFile = 'docs/AUDIT_LOG_DECISOES.md';
        this.loadAuditLog();
    }

    // Carrega o log de auditoria existente
    loadAuditLog() {
        if (fs.existsSync(this.decisionsFile)) {
            try {
                const content = fs.readFileSync(this.decisionsFile, 'utf8');
                // Parse do markdown para extrair decisões
                this.parseDecisionsFromMarkdown(content);
            } catch (error) {
                console.error('Erro ao carregar log de auditoria:', error.message);
            }
        }
    }

    // Parse das decisões do markdown
    parseDecisionsFromMarkdown(content) {
        const decisionBlocks = content.split('## DECISÃO:').slice(1);
        
        decisionBlocks.forEach(block => {
            const decision = this.extractDecisionFromBlock(block);
            if (decision) {
                this.auditLog.push(decision);
            }
        });
    }

    // Extrai dados de decisão de um bloco markdown
    extractDecisionFromBlock(block) {
        const lines = block.split('\n');
        const decision = {
            id: '',
            timestamp: '',
            type: '',
            description: '',
            assumptions: [],
            alternatives: [],
            risks: [],
            sources: [],
            validation: '',
            status: ''
        };

        let currentSection = '';
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            if (trimmed.startsWith('### ID:')) {
                decision.id = trimmed.replace('### ID:', '').trim();
            } else if (trimmed.startsWith('### Data:')) {
                decision.timestamp = trimmed.replace('### Data:', '').trim();
            } else if (trimmed.startsWith('### Tipo:')) {
                decision.type = trimmed.replace('### Tipo:', '').trim();
            } else if (trimmed.startsWith('### Descrição:')) {
                decision.description = trimmed.replace('### Descrição:', '').trim();
            } else if (trimmed.startsWith('### Suposições:')) {
                currentSection = 'assumptions';
            } else if (trimmed.startsWith('### Alternativas:')) {
                currentSection = 'alternatives';
            } else if (trimmed.startsWith('### Riscos:')) {
                currentSection = 'risks';
            } else if (trimmed.startsWith('### Fontes:')) {
                currentSection = 'sources';
            } else if (trimmed.startsWith('### Validação:')) {
                decision.validation = trimmed.replace('### Validação:', '').trim();
            } else if (trimmed.startsWith('### Status:')) {
                decision.status = trimmed.replace('### Status:', '').trim();
            } else if (trimmed.startsWith('- ') && currentSection) {
                const item = trimmed.replace('- ', '').trim();
                decision[currentSection].push(item);
            }
        });

        return decision.id ? decision : null;
    }

    // Registra uma nova decisão
    recordDecision(decisionData) {
        const decision = {
            id: this.generateDecisionId(),
            timestamp: new Date().toISOString(),
            type: decisionData.type || 'GERAL',
            description: decisionData.description,
            assumptions: decisionData.assumptions || [],
            alternatives: decisionData.alternatives || [],
            risks: decisionData.risks || [],
            sources: decisionData.sources || [],
            validation: decisionData.validation || '',
            status: 'PENDENTE',
            author: decisionData.author || 'SISTEMA',
            files: decisionData.files || []
        };

        // Valida se a decisão segue as diretivas
        const validation = this.validateDecision(decision);
        
        if (!validation.valid) {
            console.error('❌ DECISÃO REJEITADA - Não segue diretivas:');
            validation.errors.forEach(error => console.error(`  - ${error}`));
            return false;
        }

        this.auditLog.push(decision);
        this.saveAuditLog();
        
        console.log(`[${new Date().toISOString()}] ` + `✅ Decisão registrada: ${decision.id}`);
        return true;
    }

    // Valida se uma decisão segue as diretivas críticas
    validateDecision(decision) {
        const errors = [];

        // 1. Verificar se não presume (tem fontes)
        if (decision.sources.length === 0) {
            errors.push('Não presuma: Fontes não documentadas');
        }

        // 2. Verificar pensamento crítico (tem alternativas)
        if (decision.alternatives.length < 2) {
            errors.push('Pensamento crítico: Menos de 2 alternativas consideradas');
        }

        // 3. Verificar questionamento de suposições
        if (decision.assumptions.length === 0) {
            errors.push('Questionamento de suposições: Suposições não listadas');
        }

        // 4. Verificar múltiplas perspectivas
        if (decision.alternatives.length < 3) {
            errors.push('Múltiplas perspectivas: Menos de 3 alternativas consideradas');
        }

        // 5. Verificar teste de lógica
        if (!decision.validation) {
            errors.push('Teste de lógica: Validação não documentada');
        }

        // 6. Verificar honestidade intelectual (tem riscos)
        if (decision.risks.length === 0) {
            errors.push('Honestidade intelectual: Riscos não identificados');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    // Gera ID único para decisão
    generateDecisionId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `DEC-${timestamp}-${random}`;
    }

    // Salva o log de auditoria
    saveAuditLog() {
        const content = this.generateAuditMarkdown();
        
        try {
            fs.writeFileSync(this.decisionsFile, content, 'utf8');
            console.log(`[${new Date().toISOString()}] ` + '📝 Log de auditoria salvo');
        } catch (error) {
            console.error('Erro ao salvar log de auditoria:', error.message);
        }
    }

    // Gera markdown do log de auditoria
    generateAuditMarkdown() {
        let content = `# LOG DE AUDITORIA DE DECISÕES
## Garantindo o Seguimento das Diretivas Críticas

**Última atualização:** ${new Date().toISOString()}
**Total de decisões:** ${this.auditLog.length}

---

`;

        this.auditLog.forEach(decision => {
            content += this.generateDecisionMarkdown(decision);
        });

        return content;
    }

    // Gera markdown para uma decisão
    generateDecisionMarkdown(decision) {
        return `## DECISÃO: ${decision.description}

### ID: ${decision.id}
### Data: ${decision.timestamp}
### Tipo: ${decision.type}
### Autor: ${decision.author}
### Status: ${decision.status}

### Descrição: ${decision.description}

### Suposições:
${decision.assumptions.map(assumption => `- ${assumption}`).join('\n')}

### Alternativas:
${decision.alternatives.map(alternative => `- ${alternative}`).join('\n')}

### Riscos:
${decision.risks.map(risk => `- ${risk}`).join('\n')}

### Fontes:
${decision.sources.map(source => `- ${source}`).join('\n')}

### Validação: ${decision.validation}

### Arquivos Afetados:
${decision.files.map(file => `- ${file}`).join('\n')}

---

`;
    }

    // Analisa padrões nas decisões
    analyzePatterns() {
        console.log(`[${new Date().toISOString()}] ` + '📊 ANÁLISE DE PADRÕES NAS DECISÕES\n');

        const analysis = {
            totalDecisions: this.auditLog.length,
            byType: {},
            byStatus: {},
            averageAlternatives: 0,
            averageRisks: 0,
            complianceRate: 0
        };

        // Análise por tipo
        this.auditLog.forEach(decision => {
            analysis.byType[decision.type] = (analysis.byType[decision.type] || 0) + 1;
            analysis.byStatus[decision.status] = (analysis.byStatus[decision.status] || 0) + 1;
        });

        // Médias
        const totalAlternatives = this.auditLog.reduce((sum, d) => sum + d.alternatives.length, 0);
        const totalRisks = this.auditLog.reduce((sum, d) => sum + d.risks.length, 0);
        
        analysis.averageAlternatives = totalAlternatives / this.auditLog.length;
        analysis.averageRisks = totalRisks / this.auditLog.length;

        // Taxa de conformidade
        const compliantDecisions = this.auditLog.filter(d => {
            const validation = this.validateDecision(d);
            return validation.valid;
        }).length;

        analysis.complianceRate = (compliantDecisions / this.auditLog.length) * 100;

        // Imprime análise
        console.log(`[${new Date().toISOString()}] ` + `📈 Total de decisões: ${analysis.totalDecisions}`);
        console.log(`[${new Date().toISOString()}] ` + `📊 Taxa de conformidade: ${analysis.complianceRate.toFixed(1)}%`);
        console.log(`[${new Date().toISOString()}] ` + `📋 Média de alternativas: ${analysis.averageAlternatives.toFixed(1)}`);
        console.log(`[${new Date().toISOString()}] ` + `⚠️  Média de riscos: ${analysis.averageRisks.toFixed(1)}`);

        console.log(`[${new Date().toISOString()}] ` + '\n📂 Por tipo:');
        Object.entries(analysis.byType).forEach(([type, count]) => {
            console.log(`[${new Date().toISOString()}] ` + `  ${type}: ${count}`);
        });

        console.log(`[${new Date().toISOString()}] ` + '\n📊 Por status:');
        Object.entries(analysis.byStatus).forEach(([status, count]) => {
            console.log(`[${new Date().toISOString()}] ` + `  ${status}: ${count}`);
        });

        return analysis;
    }

    // Interface de linha de comando
    runCLI() {
        const args = process.argv.slice(2);
        const command = args[0];

        switch (command) {
            case 'record':
                this.handleRecordCommand(args.slice(1));
                break;
            case 'analyze':
                this.analyzePatterns();
                break;
            case 'validate':
                this.validateAllDecisions();
                break;
            default:
                console.log(`[${new Date().toISOString()}] ` + 'Uso: node audit-decisions.js [record|analyze|validate]');
                console.log(`[${new Date().toISOString()}] ` + '  record - Registra nova decisão');
                console.log(`[${new Date().toISOString()}] ` + '  analyze - Analisa padrões');
                console.log(`[${new Date().toISOString()}] ` + '  validate - Valida todas as decisões');
        }
    }

    // Manipula comando de registro
    handleRecordCommand(args) {
        if (args.length < 1) {
            console.log(`[${new Date().toISOString()}] ` + 'Uso: node audit-decisions.js record "descrição da decisão"');
            return;
        }

        const description = args[0];
        
        // Solicita dados interativamente
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const decisionData = {
            description: description,
            type: 'GERAL',
            assumptions: [],
            alternatives: [],
            risks: [],
            sources: [],
            validation: '',
            author: 'USUÁRIO'
        };

        console.log(`[${new Date().toISOString()}] ` + '📝 Registrando nova decisão...\n');

        // Coleta dados interativamente
        this.collectDecisionData(rl, decisionData, () => {
            this.recordDecision(decisionData);
            rl.close();
        });
    }

    // Coleta dados de decisão interativamente
    collectDecisionData(rl, decisionData, callback) {
        const questions = [
            { key: 'type', question: 'Tipo da decisão (TÉCNICA/BUSINESS/GERAL): ' },
            { key: 'assumptions', question: 'Suposições (separadas por vírgula): ' },
            { key: 'alternatives', question: 'Alternativas consideradas (separadas por vírgula): ' },
            { key: 'risks', question: 'Riscos identificados (separadas por vírgula): ' },
            { key: 'sources', question: 'Fontes/referências (separadas por vírgula): ' },
            { key: 'validation', question: 'Como validar esta decisão: ' }
        ];

        let currentIndex = 0;

        const askQuestion = () => {
            if (currentIndex >= questions.length) {
                callback();
                return;
            }

            const question = questions[currentIndex];
            rl.question(question.question, (answer) => {
                if (question.key === 'assumptions' || question.key === 'alternatives' || 
                    question.key === 'risks' || question.key === 'sources') {
                    decisionData[question.key] = answer.split(',').map(item => item.trim()).filter(item => item);
                } else {
                    decisionData[question.key] = answer.trim();
                }
                
                currentIndex++;
                askQuestion();
            });
        };

        askQuestion();
    }

    // Valida todas as decisões
    validateAllDecisions() {
        console.log(`[${new Date().toISOString()}] ` + '🔍 VALIDANDO TODAS AS DECISÕES\n');

        let validCount = 0;
        let invalidCount = 0;

        this.auditLog.forEach((decision, index) => {
            const validation = this.validateDecision(decision);
            
            if (validation.valid) {
                validCount++;
                console.log(`[${new Date().toISOString()}] ` + `✅ ${index + 1}. ${decision.id}: VÁLIDA`);
            } else {
                invalidCount++;
                console.log(`[${new Date().toISOString()}] ` + `❌ ${index + 1}. ${decision.id}: INVÁLIDA`);
                validation.errors.forEach(error => {
                    console.log(`[${new Date().toISOString()}] ` + `    - ${error}`);
                });
            }
        });

        console.log(`[${new Date().toISOString()}] ` + `\n📊 RESULTADO: ${validCount} válidas, ${invalidCount} inválidas`);
        console.log(`[${new Date().toISOString()}] ` + `📈 Taxa de conformidade: ${((validCount / this.auditLog.length) * 100).toFixed(1)}%`);
    }
}

// Executa se chamado diretamente
if (require.main === module) {
    const auditor = new DecisionAuditor();
    auditor.runCLI();
}

module.exports = DecisionAuditor; 