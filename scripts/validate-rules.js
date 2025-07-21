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
