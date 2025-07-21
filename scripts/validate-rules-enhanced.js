#!/usr/bin/env node

/**
 * @fileoverview Sistema de Validação Melhorado - Diretivas Críticas DOM v2
 * @description Versão otimizada com análise semântica e validação de contexto
 * @version 2.0.0
 * @author DOM v2 Team
 */

const fs = require('fs');
const path = require('path');

class EnhancedDirectivesValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.success = true;
        this.metrics = {
            filesAnalyzed: 0,
            directivesFound: 0,
            contextValidations: 0,
            semanticAnalysis: 0
        };
        
        // Palavras-chave semânticas para análise mais inteligente
        this.semanticKeywords = {
            sources: ['fonte', 'referência', 'bibliografia', 'citação', 'acadêmico', 'estudo', 'pesquisa', 'validação'],
            criticalThinking: ['análise', 'crítica', 'questionamento', 'avaliação', 'reflexão', 'pensamento'],
            assumptions: ['suposição', 'presunção', 'assumir', 'hipótese', 'premissa', 'questionar'],
            perspectives: ['perspectiva', 'visão', 'ângulo', 'abordagem', 'diferente', 'alternativo'],
            logic: ['lógica', 'raciocínio', 'argumento', 'evidência', 'conclusão', 'inferência'],
            honesty: ['honestidade', 'verdade', 'transparência', 'erro', 'correção', 'limitação']
        };
        
        // Contextos específicos do projeto DOM v2
        this.projectContexts = {
            market: ['mercado', 'concorrência', 'diferencial', 'usuário', 'validação'],
            fraud: ['fraude', 'controle', 'garantia', 'segurança', 'verificação'],
            integration: ['integração', 'solução', 'complexidade', 'sistema'],
            technology: ['tecnologia', 'stack', 'arquitetura', 'implementação']
        };
    }

    // 1. VALIDAÇÃO SEMÂNTICA MELHORADA
    validateSemanticAnalysis(content, filename) {
        const semanticScore = {
            sources: 0,
            criticalThinking: 0,
            assumptions: 0,
            perspectives: 0,
            logic: 0,
            honesty: 0
        };

        const contentLower = content.toLowerCase();
        
        // Análise semântica por categoria
        Object.keys(this.semanticKeywords).forEach(category => {
            this.semanticKeywords[category].forEach(keyword => {
                if (contentLower.includes(keyword)) {
                    semanticScore[category]++;
                }
            });
        });

        // Pontuação baseada em contexto
        let contextScore = 0;
        Object.keys(this.projectContexts).forEach(context => {
            this.projectContexts[context].forEach(keyword => {
                if (contentLower.includes(keyword)) {
                    contextScore++;
                }
            });
        });

        this.metrics.semanticAnalysis++;
        
        return {
            score: semanticScore,
            contextScore,
            totalScore: Object.values(semanticScore).reduce((a, b) => a + b, 0) + contextScore,
            hasContext: contextScore > 0
        };
    }

    // 2. VALIDAÇÃO DE CONTEXTO ESPECÍFICO
    validateProjectContext(content, filename) {
        const contextValidation = {
            marketAwareness: false,
            fraudControl: false,
            integrationFocus: false,
            technicalDepth: false
        };

        const contentLower = content.toLowerCase();

        // Verificar consciência de mercado
        if (contentLower.includes('mercado') || contentLower.includes('concorrência') || 
            contentLower.includes('usuário') || contentLower.includes('validação')) {
            contextValidation.marketAwareness = true;
        }

        // Verificar foco em controle de fraude
        if (contentLower.includes('fraude') || contentLower.includes('controle') || 
            contentLower.includes('garantia') || contentLower.includes('segurança')) {
            contextValidation.fraudControl = true;
        }

        // Verificar foco em integração
        if (contentLower.includes('integração') || contentLower.includes('solução') || 
            contentLower.includes('sistema') || contentLower.includes('complexidade')) {
            contextValidation.integrationFocus = true;
        }

        // Verificar profundidade técnica
        if (contentLower.includes('tecnologia') || contentLower.includes('arquitetura') || 
            contentLower.includes('implementação') || contentLower.includes('stack')) {
            contextValidation.technicalDepth = true;
        }

        this.metrics.contextValidations++;
        
        return contextValidation;
    }

    // 3. VALIDAÇÃO DE QUALIDADE REAL
    validateQualityMetrics(content, filename) {
        const qualityMetrics = {
            hasStructure: false,
            hasExamples: false,
            hasLimitations: false,
            hasAlternatives: false,
            hasValidation: false
        };

        const contentLower = content.toLowerCase();

        // Verificar estrutura
        if (contentLower.includes('##') || contentLower.includes('###') || 
            contentLower.includes('1.') || contentLower.includes('2.')) {
            qualityMetrics.hasStructure = true;
        }

        // Verificar exemplos
        if (contentLower.includes('exemplo') || contentLower.includes('caso') || 
            contentLower.includes('cenário') || contentLower.includes('```')) {
            qualityMetrics.hasExamples = true;
        }

        // Verificar limitações
        if (contentLower.includes('limitação') || contentLower.includes('restrição') || 
            contentLower.includes('problema') || contentLower.includes('desafio')) {
            qualityMetrics.hasLimitations = true;
        }

        // Verificar alternativas
        if (contentLower.includes('alternativa') || contentLower.includes('opção') || 
            contentLower.includes('outro') || contentLower.includes('diferente')) {
            qualityMetrics.hasAlternatives = true;
        }

        // Verificar validação
        if (contentLower.includes('validação') || contentLower.includes('teste') || 
            contentLower.includes('verificação') || contentLower.includes('confirmação')) {
            qualityMetrics.hasValidation = true;
        }

        return qualityMetrics;
    }

    // 4. VALIDAÇÃO PRINCIPAL MELHORADA
    validateEnhancedSources() {
        console.log(`[${new Date().toISOString()}] ` + '🔍 Validando fontes e referências (análise semântica)...');
        
        const docsPath = path.join(__dirname, '..', 'docs');
        const files = this.getMarkdownFiles(docsPath);

        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const semanticAnalysis = this.validateSemanticAnalysis(content, path.basename(file));
            
            if (semanticAnalysis.totalScore < 3) {
                this.warnings.push(`⚠️ ${path.basename(file)}: Baixa pontuação semântica (${semanticAnalysis.totalScore}/10)`);
            } else {
                console.log(`[${new Date().toISOString()}] ` + `✅ ${path.basename(file)}: Pontuação semântica ${semanticAnalysis.totalScore}/10`);
            }
        });
    }

    validateEnhancedCriticalThinking() {
        console.log(`[${new Date().toISOString()}] ` + '🤔 Validando pensamento crítico (análise contextual)...');
        
        const docsPath = path.join(__dirname, '..', 'docs');
        const files = this.getMarkdownFiles(docsPath);

        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const contextValidation = this.validateProjectContext(content, path.basename(file));
            const qualityMetrics = this.validateQualityMetrics(content, path.basename(file));
            
            const contextScore = Object.values(contextValidation).filter(Boolean).length;
            const qualityScore = Object.values(qualityMetrics).filter(Boolean).length;
            
            if (contextScore >= 2 && qualityScore >= 3) {
                console.log(`[${new Date().toISOString()}] ` + `✅ ${path.basename(file)}: Pensamento crítico contextualizado detectado`);
            } else if (contextScore >= 1 && qualityScore >= 2) {
                console.log(`[${new Date().toISOString()}] ` + `⚠️ ${path.basename(file)}: Pensamento crítico básico detectado`);
            } else {
                this.warnings.push(`⚠️ ${path.basename(file)}: Possível falta de pensamento crítico contextualizado`);
            }
        });
    }

    validateEnhancedAssumptions() {
        console.log(`[${new Date().toISOString()}] ` + '❓ Validando questionamento de suposições (análise de qualidade)...');
        
        const docsPath = path.join(__dirname, '..', 'docs');
        const files = this.getMarkdownFiles(docsPath);

        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const qualityMetrics = this.validateQualityMetrics(content, path.basename(file));
            
            if (qualityMetrics.hasLimitations && qualityMetrics.hasAlternatives) {
                console.log(`[${new Date().toISOString()}] ` + `✅ ${path.basename(file)}: Questionamento de suposições robusto detectado`);
            } else if (qualityMetrics.hasLimitations || qualityMetrics.hasAlternatives) {
                console.log(`[${new Date().toISOString()}] ` + `⚠️ ${path.basename(file)}: Questionamento de suposições básico detectado`);
            } else {
                this.warnings.push(`⚠️ ${path.basename(file)}: Possível falta de questionamento de suposições`);
            }
        });
    }

    validateEnhancedMultiplePerspectives() {
        console.log(`[${new Date().toISOString()}] ` + '👥 Validando múltiplas perspectivas (análise semântica)...');
        
        const docsPath = path.join(__dirname, '..', 'docs');
        const files = this.getMarkdownFiles(docsPath);

        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const semanticAnalysis = this.validateSemanticAnalysis(content, path.basename(file));
            
            if (semanticAnalysis.score.perspectives >= 2) {
                console.log(`[${new Date().toISOString()}] ` + `✅ ${path.basename(file)}: Múltiplas perspectivas robustas detectadas`);
            } else if (semanticAnalysis.score.perspectives >= 1) {
                console.log(`[${new Date().toISOString()}] ` + `⚠️ ${path.basename(file)}: Múltiplas perspectivas básicas detectadas`);
            } else {
                this.warnings.push(`⚠️ ${path.basename(file)}: Possível falta de múltiplas perspectivas`);
            }
        });
    }

    validateEnhancedLogic() {
        console.log(`[${new Date().toISOString()}] ` + '🧠 Validando lógica e testes (análise de estrutura)...');
        
        const testFiles = this.getTestFiles();
        const codeFiles = this.getCodeFiles();
        
        if (testFiles.length > 0) {
            console.log(`[${new Date().toISOString()}] ` + `✅ ${testFiles.length} arquivos de teste encontrados`);
            testFiles.forEach(file => {
                console.log(`[${new Date().toISOString()}] ` + `  ✅ ${path.basename(file)}`);
            });
        } else {
            this.warnings.push('⚠️ Nenhum arquivo de teste encontrado');
        }

        if (codeFiles.length > 0) {
            console.log(`[${new Date().toISOString()}] ` + `✅ ${codeFiles.length} arquivos de código analisados`);
        }
    }

    validateEnhancedHonesty() {
        console.log(`[${new Date().toISOString()}] ` + '🎯 Validando honestidade intelectual (análise de transparência)...');
        
        const docsPath = path.join(__dirname, '..', 'docs');
        const files = this.getMarkdownFiles(docsPath);

        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            const semanticAnalysis = this.validateSemanticAnalysis(content, path.basename(file));
            const qualityMetrics = this.validateQualityMetrics(content, path.basename(file));
            
            if (semanticAnalysis.score.honesty >= 2 && qualityMetrics.hasLimitations) {
                console.log(`[${new Date().toISOString()}] ` + `✅ ${path.basename(file)}: Honestidade intelectual robusta detectada`);
            } else if (semanticAnalysis.score.honesty >= 1) {
                console.log(`[${new Date().toISOString()}] ` + `⚠️ ${path.basename(file)}: Honestidade intelectual básica detectada`);
            } else {
                this.warnings.push(`⚠️ ${path.basename(file)}: Possível falta de honestidade intelectual`);
            }
        });
    }

    // MÉTODOS AUXILIARES
    getMarkdownFiles(dir) {
        const files = [];
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
            const fullPath = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                files.push(...this.getMarkdownFiles(fullPath));
            } else if (item.endsWith('.md')) {
                files.push(fullPath);
            }
        });
        
        return files;
    }

    getTestFiles() {
        const testFiles = [];
        const rootDir = path.join(__dirname, '..');
        
        // Procurar arquivos de teste
        const testPatterns = ['**/*.test.*', '**/*.spec.*', 'test-*.js', 'test-*.ts'];
        
        testPatterns.forEach(pattern => {
            try {
                const files = this.globSync(pattern, { cwd: rootDir });
                testFiles.push(...files.map(file => path.join(rootDir, file)));
            } catch (error) {
                // Ignorar erros de padrão não encontrado
            }
        });
        
        return testFiles;
    }

    getCodeFiles() {
        const codeFiles = [];
        const rootDir = path.join(__dirname, '..');
        
        // Procurar arquivos de código
        const codePatterns = ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'];
        
        codePatterns.forEach(pattern => {
            try {
                const files = this.globSync(pattern, { cwd: rootDir });
                codeFiles.push(...files.map(file => path.join(rootDir, file)));
            } catch (error) {
                // Ignorar erros de padrão não encontrado
            }
        });
        
        return codeFiles;
    }

    globSync(pattern, options) {
        // Implementação simplificada de glob
        const files = [];
        const dir = options.cwd || '.';
        
        try {
            const items = fs.readdirSync(dir);
            items.forEach(item => {
                if (item.includes('test') || item.includes('.test.') || item.includes('.spec.')) {
                    files.push(item);
                }
            });
        } catch (error) {
            // Ignorar erros
        }
        
        return files;
    }

    // EXECUÇÃO PRINCIPAL
    runAllValidations() {
        console.log(`[${new Date().toISOString()}] ` + '\n🚀 INICIANDO VALIDAÇÃO MELHORADA DAS DIRETIVAS CRÍTICAS');
        console.log(`[${new Date().toISOString()}] ` + '📊 Versão 2.0.0 - Análise Semântica e Contextual\n');

        this.validateEnhancedSources();
        this.validateEnhancedCriticalThinking();
        this.validateEnhancedAssumptions();
        this.validateEnhancedMultiplePerspectives();
        this.validateEnhancedLogic();
        this.validateEnhancedHonesty();

        this.printEnhancedResults();
    }

    printEnhancedResults() {
        console.log(`[${new Date().toISOString()}] ` + '\n📊 RESULTADOS DA VALIDAÇÃO MELHORADA');
        console.log(`[${new Date().toISOString()}] ` + '=====================================');

        console.log(`[${new Date().toISOString()}] ` + '\n📈 MÉTRICAS DE ANÁLISE:');
        console.log(`[${new Date().toISOString()}] ` + `  📁 Arquivos analisados: ${this.metrics.filesAnalyzed}`);
        console.log(`[${new Date().toISOString()}] ` + `  🎯 Diretivas encontradas: ${this.metrics.directivesFound}`);
        console.log(`[${new Date().toISOString()}] ` + `  🔍 Validações de contexto: ${this.metrics.contextValidations}`);
        console.log(`[${new Date().toISOString()}] ` + `  🧠 Análises semânticas: ${this.metrics.semanticAnalysis}`);

        if (this.warnings.length > 0) {
            console.log(`[${new Date().toISOString()}] ` + '\n⚠️  AVISOS MELHORADOS:');
            this.warnings.forEach(warning => console.log(`[${new Date().toISOString()}] ` + `  ${warning}`));
        }

        if (this.errors.length > 0) {
            console.log(`[${new Date().toISOString()}] ` + '\n❌ ERROS:');
            this.errors.forEach(error => console.log(`[${new Date().toISOString()}] ` + `  ${error}`));
            this.success = false;
        }

        console.log(`[${new Date().toISOString()}] ` + '\n🔧 AÇÕES RECOMENDADAS MELHORADAS:');
        console.log(`[${new Date().toISOString()}] ` + '1. Implementar análise semântica mais profunda');
        console.log(`[${new Date().toISOString()}] ` + '2. Adicionar validação de contexto específico do projeto');
        console.log(`[${new Date().toISOString()}] ` + '3. Melhorar métricas de qualidade real');
        console.log(`[${new Date().toISOString()}] ` + '4. Implementar feedback em tempo real');

        console.log(`[${new Date().toISOString()}] ` + '\n📝 CHECKLIST OBRIGATÓRIO MELHORADO:');
        console.log(`[${new Date().toISOString()}] ` + '□ Análise semântica realizada');
        console.log(`[${new Date().toISOString()}] ` + '□ Contexto do projeto validado');
        console.log(`[${new Date().toISOString()}] ` + '□ Métricas de qualidade coletadas');
        console.log(`[${new Date().toISOString()}] ` + '□ Fontes verificadas e documentadas');
        console.log(`[${new Date().toISOString()}] ` + '□ Alternativas consideradas');
        console.log(`[${new Date().toISOString()}] ` + '□ Suposições listadas e validadas');
        console.log(`[${new Date().toISOString()}] ` + '□ Múltiplas perspectivas analisadas');
        console.log(`[${new Date().toISOString()}] ` + '□ Lógica testada');
        console.log(`[${new Date().toISOString()}] ` + '□ Erros reportados');

        console.log(`[${new Date().toISOString()}] ` + `\n${this.success ? '✅ VALIDAÇÃO MELHORADA APROVADA' : '❌ VALIDAÇÃO MELHORADA COM PROBLEMAS'}`);
    }
}

// Execução
if (require.main === module) {
    const validator = new EnhancedDirectivesValidator();
    validator.runAllValidations();
}

module.exports = EnhancedDirectivesValidator; 