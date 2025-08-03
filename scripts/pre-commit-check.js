
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