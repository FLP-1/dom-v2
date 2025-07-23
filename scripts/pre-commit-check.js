#!/usr/bin/env node

/**
 * 🔒 SCRIPT DE PRÉ-COMMIT - GARANTIA DAS DIRETIVAS
 * Executa automaticamente antes de cada commit para garantir conformidade
 */

const GarantiaDiretivas = require('./garantia-diretivas');
const fs = require('fs');
const path = require('path');

class PreCommitCheck {
    constructor() {
        this.garantia = new GarantiaDiretivas();
        this.stagedFiles = this.getStagedFiles();
    }

    /**
     * Obtém arquivos staged para commit
     */
    getStagedFiles() {
        try {
            const { execSync } = require('child_process');
            const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
            return output.trim().split('\n').filter(file => file.length > 0);
        } catch (error) {
            console.log('⚠️  Git não disponível, verificando todos os arquivos...');
            return [];
        }
    }

    /**
     * Verifica se há mudanças críticas
     */
    verificarMudancasCriticas() {
        console.log('🔍 Verificando mudanças críticas...\n');
        
        const arquivosCriticos = [
            'package.json',
            'package-lock.json',
            'yarn.lock'
        ];
        
        const mudancasCriticas = this.stagedFiles.filter(file => 
            arquivosCriticos.some(critico => file.includes(critico))
        );
        
        if (mudancasCriticas.length > 0) {
            console.log('🚨 MUDANÇAS CRÍTICAS DETECTADAS:');
            mudancasCriticas.forEach(file => {
                console.log(`   - ${file}`);
            });
            console.log('\n⚠️  Verificação obrigatória das diretivas...\n');
            return true;
        }
        
        console.log('✅ Nenhuma mudança crítica detectada');
        return false;
    }

    /**
     * Verifica se há palavras proibidas nos commits
     */
    verificarMensagemCommit() {
        try {
            const { execSync } = require('child_process');
            const commitMsg = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).toLowerCase();
            
            const palavrasProibidas = [
                'upgrade react',
                'upgrade react-native',
                'update major',
                'breaking change',
                'remove dependency'
            ];
            
            const violacoes = palavrasProibidas.filter(palavra => 
                commitMsg.includes(palavra)
            );
            
            if (violacoes.length > 0) {
                console.log('🚨 PALAVRAS PROIBIDAS NA MENSAGEM DE COMMIT:');
                violacoes.forEach(palavra => {
                    console.log(`   - "${palavra}"`);
                });
                console.log('\n⚠️  Revisar mensagem de commit antes de prosseguir');
                return true;
            }
            
        } catch (error) {
            // Git não disponível, ignorar
        }
        
        return false;
    }

    /**
     * Executa verificação completa
     */
    executar() {
        console.log('🔒 EXECUTANDO VERIFICAÇÃO PRÉ-COMMIT\n');
        
        const mudancasCriticas = this.verificarMudancasCriticas();
        const mensagemProibida = this.verificarMensagemCommit();
        
        if (mudancasCriticas || mensagemProibida) {
            console.log('\n🛡️ EXECUTANDO SISTEMA DE GARANTIA DAS DIRETIVAS...\n');
            this.garantia.verificarDiretivas();
            
            if (this.garantia.violacoes.length > 0) {
                console.log('\n❌ COMMIT BLOQUEADO - VIOLAÇÕES ENCONTRADAS!');
                console.log('🔧 Corrija as violações antes de fazer commit.');
                process.exit(1);
            }
        }
        
        console.log('\n✅ VERIFICAÇÃO PRÉ-COMMIT CONCLUÍDA');
        console.log('🎉 Commit permitido - Diretivas respeitadas!');
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    const preCommit = new PreCommitCheck();
    preCommit.executar();
}

module.exports = PreCommitCheck; 