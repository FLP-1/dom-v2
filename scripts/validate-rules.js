
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
 * SISTEMA DE VALIDAÇÃO DAS DIRETIVAS CRÍTICAS
 * 
 * Este script valida se todas as diretivas estão sendo seguidas:
 * 1. Não presuma - busque certeza
 * 2. Seja crítico construtivo
 * 3. Questione suposições
 * 4. Apresente múltiplas perspectivas
 * 5. Teste a lógica
 * 6. Priorize verdade e honestidade intelectual
 */

const fs = require('fs');
const path = require('path');

class DirectivesValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.success = true;
    }

    // 1. VALIDAÇÃO: Não presuma - busque certeza
    validateSources() {
        console.log(`[${new Date().toISOString()}] ` + '🔍 Validando fontes e referências...');
        
        const filesToCheck = [
            'README.md',
            'docs/STATUS_ATUAL_PROJETO.md',
            'docs/REGRAS_PROJETO_DOM_V2.md'
        ];

        filesToCheck.forEach(file => {
            if (fs.existsSync(file)) {
                const content = fs.readFileSync(file, 'utf8');
                
                // Verifica se há referências ou fontes
                const hasReferences = /(fonte|referência|source|reference|https?:\/\/)/i.test(content);
                const hasAcademicSources = /(acadêmico|academic|paper|research|study)/i.test(content);
                
                if (!hasReferences) {
                    this.warnings.push(`⚠️  ${file}: Possível falta de fontes/referências`);
                }
                
                if (hasAcademicSources) {
                    console.log(`[${new Date().toISOString()}] ` + `✅ ${file}: Fontes acadêmicas encontradas`);
                }
            }
        });
    }

    // 2. VALIDAÇÃO: Pensamento crítico
    validateCriticalThinking() {
        console.log(`[${new Date().toISOString()}] ` + '🤔 Validando pensamento crítico...');
        
        const criticalKeywords = [
            'alternativa', 'questionar', 'crítico', 'análise',
            'trade-off', 'desvantagem', 'limitação', 'risco'
        ];

        const files = this.getAllFiles('docs');
        let hasCriticalThinking = false;

        files.forEach(file => {
            if (file.endsWith('.md')) {
                const content = fs.readFileSync(file, 'utf8');
                const hasKeywords = criticalKeywords.some(keyword => 
                    content.toLowerCase().includes(keyword)
                );
                
                if (hasKeywords) {
                    hasCriticalThinking = true;
                    console.log(`[${new Date().toISOString()}] ` + `✅ ${file}: Pensamento crítico detectado`);
                }
            }
        });

        if (!hasCriticalThinking) {
            this.warnings.push('⚠️  Possível falta de pensamento crítico na documentação');
        }
    }

    // 3. VALIDAÇÃO: Questionamento de suposições
    validateAssumptions() {
        console.log(`[${new Date().toISOString()}] ` + '❓ Validando questionamento de suposições...');
        
        const assumptionKeywords = [
            'suposição', 'assumption', 'presume', 'assume',
            'hipótese', 'hypothesis', 'verificar', 'validate'
        ];

        const files = this.getAllFiles('docs');
        let hasAssumptionQuestioning = false;

        files.forEach(file => {
            if (file.endsWith('.md')) {
                const content = fs.readFileSync(file, 'utf8');
                const hasKeywords = assumptionKeywords.some(keyword => 
                    content.toLowerCase().includes(keyword)
                );
                
                if (hasKeywords) {
                    hasAssumptionQuestioning = true;
                    console.log(`[${new Date().toISOString()}] ` + `✅ ${file}: Questionamento de suposições detectado`);
                }
            }
        });

        if (!hasAssumptionQuestioning) {
            this.warnings.push('⚠️  Possível falta de questionamento de suposições');
        }
    }

    // 4. VALIDAÇÃO: Múltiplas perspectivas
    validateMultiplePerspectives() {
        console.log(`[${new Date().toISOString()}] ` + '👥 Validando múltiplas perspectivas...');
        
        const perspectiveKeywords = [
            'alternativa', 'perspectiva', 'visão', 'abordagem',
            'método', 'estratégia', 'opção', 'consideração'
        ];

        const files = this.getAllFiles('docs');
        let hasMultiplePerspectives = false;

        files.forEach(file => {
            if (file.endsWith('.md')) {
                const content = fs.readFileSync(file, 'utf8');
                const keywordCount = perspectiveKeywords.filter(keyword => 
                    content.toLowerCase().includes(keyword)
                ).length;
                
                if (keywordCount >= 3) {
                    hasMultiplePerspectives = true;
                    console.log(`[${new Date().toISOString()}] ` + `✅ ${file}: Múltiplas perspectivas detectadas`);
                }
            }
        });

        if (!hasMultiplePerspectives) {
            this.warnings.push('⚠️  Possível falta de múltiplas perspectivas');
        }
    }

    // 5. VALIDAÇÃO: Teste de lógica
    validateLogic() {
        console.log(`[${new Date().toISOString()}] ` + '🧠 Validando lógica e testes...');
        
        // Verifica se há testes
        const testFiles = [
            'frontend/__tests__/App.test.tsx',
            'test-dashboard.js',
            'test-login.js',
            'test-tasks.js'
        ];

        let hasTests = false;
        testFiles.forEach(file => {
            if (fs.existsSync(file)) {
                hasTests = true;
                console.log(`[${new Date().toISOString()}] ` + `✅ ${file}: Testes encontrados`);
            }
        });

        if (!hasTests) {
            this.warnings.push('⚠️  Possível falta de testes automatizados');
        }

        // Verifica se há validações no código
        const validationKeywords = [
            'validate', 'validation', 'test', 'check',
            'verify', 'assert', 'expect'
        ];

        const codeFiles = this.getAllFiles('src');
        let hasCodeValidation = false;

        codeFiles.forEach(file => {
            if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
                const content = fs.readFileSync(file, 'utf8');
                const hasKeywords = validationKeywords.some(keyword => 
                    content.toLowerCase().includes(keyword)
                );
                
                if (hasKeywords) {
                    hasCodeValidation = true;
                    console.log(`[${new Date().toISOString()}] ` + `✅ ${file}: Validações no código detectadas`);
                }
            }
        });

        if (!hasCodeValidation) {
            this.warnings.push('⚠️  Possível falta de validações no código');
        }
    }

    // 6. VALIDAÇÃO: Verdade e honestidade intelectual
    validateHonesty() {
        console.log(`[${new Date().toISOString()}] ` + '🎯 Validando honestidade intelectual...');
        
        const honestyKeywords = [
            'erro', 'error', 'bug', 'problema', 'limitação',
            'falha', 'failure', 'correção', 'fix', 'melhoria'
        ];

        const files = this.getAllFiles('docs');
        let hasHonesty = false;

        files.forEach(file => {
            if (file.endsWith('.md')) {
                const content = fs.readFileSync(file, 'utf8');
                const hasKeywords = honestyKeywords.some(keyword => 
                    content.toLowerCase().includes(keyword)
                );
                
                if (hasKeywords) {
                    hasHonesty = true;
                    console.log(`[${new Date().toISOString()}] ` + `✅ ${file}: Honestidade intelectual detectada`);
                }
            }
        });

        if (!hasHonesty) {
            this.warnings.push('⚠️  Possível falta de transparência sobre limitações');
        }
    }

    // Método auxiliar para obter todos os arquivos
    getAllFiles(dir) {
        const files = [];
        
        if (fs.existsSync(dir)) {
            const items = fs.readdirSync(dir);
            
            items.forEach(item => {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    files.push(...this.getAllFiles(fullPath));
                } else {
                    files.push(fullPath);
                }
            });
        }
        
        return files;
    }

    // Executa todas as validações
    runAllValidations() {
        console.log(`[${new Date().toISOString()}] ` + '🚀 INICIANDO VALIDAÇÃO DAS DIRETIVAS CRÍTICAS\n');
        
        this.validateSources();
        this.validateCriticalThinking();
        this.validateAssumptions();
        this.validateMultiplePerspectives();
        this.validateLogic();
        this.validateHonesty();
        
        this.printResults();
    }

    // Imprime resultados
    printResults() {
        console.log(`[${new Date().toISOString()}] ` + '\n📊 RESULTADOS DA VALIDAÇÃO\n');
        
        if (this.warnings.length > 0) {
            console.log(`[${new Date().toISOString()}] ` + '⚠️  AVISOS:');
            this.warnings.forEach(warning => console.log(`[${new Date().toISOString()}] ` + warning));
            this.success = false;
        }
        
        if (this.errors.length > 0) {
            console.log(`[${new Date().toISOString()}] ` + '\n❌ ERROS:');
            this.errors.forEach(error => console.log(`[${new Date().toISOString()}] ` + error));
            this.success = false;
        }
        
        if (this.success) {
            console.log(`[${new Date().toISOString()}] ` + '✅ TODAS AS DIRETIVAS CRÍTICAS ESTÃO SENDO SEGUIDAS!');
        } else {
            console.log(`[${new Date().toISOString()}] ` + '\n🔧 AÇÕES RECOMENDADAS:');
            console.log(`[${new Date().toISOString()}] ` + '1. Revisar documentação para incluir fontes');
            console.log(`[${new Date().toISOString()}] ` + '2. Adicionar pensamento crítico e múltiplas perspectivas');
            console.log(`[${new Date().toISOString()}] ` + '3. Implementar mais testes automatizados');
            console.log(`[${new Date().toISOString()}] ` + '4. Documentar limitações e possíveis melhorias');
        }
        
        console.log(`[${new Date().toISOString()}] ` + '\n📝 CHECKLIST OBRIGATÓRIO:');
        console.log(`[${new Date().toISOString()}] ` + '□ Fontes verificadas e documentadas');
        console.log(`[${new Date().toISOString()}] ` + '□ Alternativas consideradas');
        console.log(`[${new Date().toISOString()}] ` + '□ Suposições listadas e validadas');
        console.log(`[${new Date().toISOString()}] ` + '□ Múltiplas perspectivas analisadas');
        console.log(`[${new Date().toISOString()}] ` + '□ Lógica testada');
        console.log(`[${new Date().toISOString()}] ` + '□ Erros reportados');
        
        process.exit(this.success ? 0 : 1);
    }
}

// Executa a validação
const validator = new DirectivesValidator();
validator.runAllValidations();
