#!/usr/bin/env node

/**
 * @fileoverview Hook de Pre-Commit - Diretivas Críticas DOM v2
 * @description Validação automática antes de cada commit
 * @version 1.0.0
 * @author DOM v2 Team
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PreCommitHook {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.success = true;
        this.stagedFiles = this.getStagedFiles();
    }

    // OBTER ARQUIVOS STAGED
    getStagedFiles() {
        try {
            const output = execSync('git diff --staged --name-only', { encoding: 'utf8' });
            return output.trim().split('\n').filter(file => file.length > 0);
        } catch (error) {
            console.log(`[${new Date().toISOString()}] ` + '⚠️ Não foi possível obter arquivos staged');
            return [];
        }
    }

    // VALIDAÇÃO DE DIRETIVAS CRÍTICAS
    validateDirectives() {
        console.log(`[${new Date().toISOString()}] ` + '🔍 Validando diretivas críticas...');
        
        const docsFiles = this.stagedFiles.filter(file => file.endsWith('.md'));
        const codeFiles = this.stagedFiles.filter(file => 
            file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.jsx')
        );

        // Validar documentação
        docsFiles.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            this.validateDocumentationDirectives(content, file);
        });

        // Validar código
        codeFiles.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            this.validateCodeDirectives(content, file);
        });
    }

    // VALIDAÇÃO DE DOCUMENTAÇÃO
    validateDocumentationDirectives(content, filename) {
        const contentLower = content.toLowerCase();
        
        // Verificar fontes
        if (!contentLower.includes('fonte') && !contentLower.includes('referência') && 
            !contentLower.includes('validação') && !contentLower.includes('teste')) {
            this.warnings.push(`⚠️ ${filename}: Possível falta de fontes/referências`);
        }

        // Verificar limitações
        if (!contentLower.includes('limitação') && !contentLower.includes('problema') && 
            !contentLower.includes('desafio') && !contentLower.includes('restrição')) {
            this.warnings.push(`⚠️ ${filename}: Possível falta de limitações documentadas`);
        }

        // Verificar múltiplas perspectivas
        if (!contentLower.includes('alternativa') && !contentLower.includes('outro') && 
            !contentLower.includes('diferente') && !contentLower.includes('perspectiva')) {
            this.warnings.push(`⚠️ ${filename}: Possível falta de múltiplas perspectivas`);
        }
    }

    // VALIDAÇÃO DE CÓDIGO
    validateCodeDirectives(content, filename) {
        const contentLower = content.toLowerCase();
        
        // Verificar comentários explicativos
        if (!content.includes('//') && !content.includes('/*') && !content.includes('*')) {
            this.warnings.push(`⚠️ ${filename}: Possível falta de comentários explicativos`);
        }

        // Verificar tratamento de erros
        if (!contentLower.includes('try') && !contentLower.includes('catch') && 
            !contentLower.includes('error') && !contentLower.includes('throw')) {
            this.warnings.push(`⚠️ ${filename}: Possível falta de tratamento de erros`);
        }

        // Verificar validações
        if (!contentLower.includes('if') && !contentLower.includes('validate') && 
            !contentLower.includes('check') && !contentLower.includes('assert')) {
            this.warnings.push(`⚠️ ${filename}: Possível falta de validações`);
        }

        // Verificar TODO/FIXME
        if (contentLower.includes('todo') || contentLower.includes('fixme')) {
            this.warnings.push(`⚠️ ${filename}: Contém TODO/FIXME - verificar se está documentado`);
        }
    }

    // VALIDAÇÃO DE VERSÕES
    validateVersions() {
        console.log(`[${new Date().toISOString()}] ` + '📦 Validando versões...');
        
        try {
            execSync('npm run check-versions', { stdio: 'pipe' });
            console.log(`[${new Date().toISOString()}] ` + '✅ Versões validadas');
        } catch (error) {
            this.errors.push('❌ Falha na validação de versões');
            this.success = false;
        }
    }

    // VALIDAÇÃO DE TESTES
    validateTests() {
        console.log(`[${new Date().toISOString()}] ` + '🧪 Validando testes...');
        
        const testFiles = this.stagedFiles.filter(file => 
            file.includes('test') || file.includes('.test.') || file.includes('.spec.')
        );

        if (testFiles.length === 0) {
            this.warnings.push('⚠️ Nenhum arquivo de teste modificado');
        } else {
            console.log(`[${new Date().toISOString()}] ` + `✅ ${testFiles.length} arquivos de teste modificados`);
        }
    }

    // VALIDAÇÃO DE SEGURANÇA
    validateSecurity() {
        console.log(`[${new Date().toISOString()}] ` + '🔒 Validando segurança...');
        
        const securityKeywords = [
            'password', 'token', 'secret', 'key', 'auth', 'permission', 'role'
        ];

        this.stagedFiles.forEach(file => {
            if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx')) {
                const content = fs.readFileSync(file, 'utf8');
                const contentLower = content.toLowerCase();
                
                securityKeywords.forEach(keyword => {
                    if (contentLower.includes(keyword)) {
                        // Verificar se há validação de segurança
                        if (!contentLower.includes('validate') && !contentLower.includes('check')) {
                            this.warnings.push(`⚠️ ${file}: Possível problema de segurança com '${keyword}'`);
                        }
                    }
                });
            }
        });
    }

    // VALIDAÇÃO DE PERFORMANCE
    validatePerformance() {
        console.log(`[${new Date().toISOString()}] ` + '⚡ Validando performance...');
        
        const performanceKeywords = [
            'for', 'while', 'forEach', 'map', 'filter', 'reduce', 'async', 'await'
        ];

        this.stagedFiles.forEach(file => {
            if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.tsx')) {
                const content = fs.readFileSync(file, 'utf8');
                const contentLower = content.toLowerCase();
                
                // Verificar loops aninhados
                const forLoops = (contentLower.match(/for\s*\(/g) || []).length;
                const whileLoops = (contentLower.match(/while\s*\(/g) || []).length;
                
                if (forLoops + whileLoops > 3) {
                    this.warnings.push(`⚠️ ${file}: Muitos loops - verificar performance`);
                }
            }
        });
    }

    // EXECUÇÃO PRINCIPAL
    run() {
        console.log(`[${new Date().toISOString()}] ` + '🚀 INICIANDO PRE-COMMIT HOOK - DIRETIVAS CRÍTICAS');
        console.log(`[${new Date().toISOString()}] ` + `📁 Arquivos staged: ${this.stagedFiles.length}\n`);

        if (this.stagedFiles.length === 0) {
            console.log(`[${new Date().toISOString()}] ` + '✅ Nenhum arquivo staged - commit permitido');
            return true;
        }

        // Executar validações
        this.validateDirectives();
        this.validateVersions();
        this.validateTests();
        this.validateSecurity();
        this.validatePerformance();

        // Exibir resultados
        this.printResults();

        return this.success;
    }

    // EXIBIR RESULTADOS
    printResults() {
        console.log(`[${new Date().toISOString()}] ` + '\n📊 RESULTADOS DO PRE-COMMIT HOOK');
        console.log(`[${new Date().toISOString()}] ` + '==================================');

        if (this.warnings.length > 0) {
            console.log(`[${new Date().toISOString()}] ` + '\n⚠️  AVISOS:');
            this.warnings.forEach(warning => console.log(`[${new Date().toISOString()}] ` + `  ${warning}`));
        }

        if (this.errors.length > 0) {
            console.log(`[${new Date().toISOString()}] ` + '\n❌ ERROS:');
            this.errors.forEach(error => console.log(`[${new Date().toISOString()}] ` + `  ${error}`));
        }

        console.log(`[${new Date().toISOString()}] ` + '\n📝 CHECKLIST PRE-COMMIT:');
        console.log(`[${new Date().toISOString()}] ` + '□ Diretivas críticas validadas');
        console.log(`[${new Date().toISOString()}] ` + '□ Versões verificadas');
        console.log(`[${new Date().toISOString()}] ` + '□ Testes implementados');
        console.log(`[${new Date().toISOString()}] ` + '□ Segurança verificada');
        console.log(`[${new Date().toISOString()}] ` + '□ Performance avaliada');

        if (this.success) {
            console.log(`[${new Date().toISOString()}] ` + '\n✅ PRE-COMMIT APROVADO - Commit permitido');
        } else {
            console.log(`[${new Date().toISOString()}] ` + '\n❌ PRE-COMMIT REJEITADO - Corrigir erros antes do commit');
            console.log(`[${new Date().toISOString()}] ` + '\n🔧 AÇÕES RECOMENDADAS:');
            console.log(`[${new Date().toISOString()}] ` + '1. Corrigir erros críticos');
            console.log(`[${new Date().toISOString()}] ` + '2. Revisar avisos');
            console.log(`[${new Date().toISOString()}] ` + '3. Executar testes');
            console.log(`[${new Date().toISOString()}] ` + '4. Validar diretivas críticas');
        }
    }
}

// Execução
if (require.main === module) {
    const hook = new PreCommitHook();
    const success = hook.run();
    
    if (!success) {
        process.exit(1);
    }
}

module.exports = PreCommitHook; 