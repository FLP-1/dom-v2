#!/usr/bin/env node

/**
 * Hook de Pre-Commit - DOM v2
 * 
 * Este script é executado automaticamente antes de cada commit para garantir:
 * 1. Nenhuma violação das regras TypeScript
 * 2. Sintaxe válida
 * 3. Conformidade com diretrizes do projeto
 * 4. Prevenção de código corrompido
 * 
 * Diretrizes seguidas:
 * - Pensamento Crítico: Prevenir problemas antes do commit
 * - Qualidade: Garantir integridade do código
 * - Arquitetura: Proteção automática e sistêmica
 */

const TypeScriptEnforcer = require('./enforce-typescript-rules.js');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PreCommitHook {
  constructor() {
    this.enforcer = new TypeScriptEnforcer();
    this.stagedFiles = this.getStagedFiles();
  }

  /**
   * Obter arquivos staged para commit
   */
  getStagedFiles() {
    try {
      const output = execSync('git diff --cached --name-only --diff-filter=ACM', { 
        encoding: 'utf8',
        cwd: path.join(__dirname, '..')
      });
      
      return output
        .split('\n')
        .filter(file => file.trim())
        .filter(file => file.endsWith('.ts') || file.endsWith('.tsx'))
        .map(file => path.join(__dirname, '..', file));
    } catch (error) {
      console.error('Erro ao obter arquivos staged:', error.message);
      return [];
    }
  }

  /**
   * Verificar se há arquivos TypeScript staged
   */
  hasTypeScriptFiles() {
    return this.stagedFiles.length > 0;
  }

  /**
   * Executar validações
   */
  async runValidations() {
    console.log('🔍 Executando validações de pre-commit...');
    
    const results = {
      syntax: false,
      rules: false,
      tests: false
    };

    // 1. Validar sintaxe TypeScript
    try {
      console.log('📝 Validando sintaxe TypeScript...');
      execSync('npx tsc --noEmit', { 
        cwd: path.join(__dirname, '../frontend'),
        stdio: 'pipe' 
      });
      results.syntax = true;
      console.log('✅ Sintaxe TypeScript válida');
    } catch (error) {
      console.error('❌ Erro de sintaxe TypeScript:');
      console.error(error.message);
      return false;
    }

    // 2. Verificar regras do projeto
    try {
      console.log('🛡️  Verificando regras do projeto...');
      const violations = this.enforcer.detectViolations();
      
      if (violations.length > 0) {
        console.error('❌ Violações das regras detectadas:');
        violations.forEach(violation => {
          console.error(`   - ${violation.file}: ${violation.description}`);
        });
        
        // Tentar corrigir automaticamente
        console.log('🔧 Tentando corrigir violações automaticamente...');
        const fixes = this.enforcer.fixViolations();
        
        if (fixes.length > 0) {
          console.log(`✅ ${fixes.length} violações corrigidas automaticamente`);
          
          // Re-validar sintaxe após correções
          try {
            execSync('npx tsc --noEmit', { 
              cwd: path.join(__dirname, '../frontend'),
              stdio: 'pipe' 
            });
            results.rules = true;
          } catch (error) {
            console.error('❌ Sintaxe inválida após correções automáticas');
            return false;
          }
        } else {
          console.error('❌ Não foi possível corrigir violações automaticamente');
          return false;
        }
      } else {
        results.rules = true;
        console.log('✅ Nenhuma violação das regras detectada');
      }
    } catch (error) {
      console.error('❌ Erro ao verificar regras:', error.message);
      return false;
    }

    // 3. Executar testes básicos
    try {
      console.log('🧪 Executando testes básicos...');
      execSync('npm test -- --passWithNoTests', { 
        cwd: path.join(__dirname, '../frontend'),
        stdio: 'pipe' 
      });
      results.tests = true;
      console.log('✅ Testes passaram');
    } catch (error) {
      console.error('❌ Testes falharam:');
      console.error(error.message);
      return false;
    }

    return results.syntax && results.rules && results.tests;
  }

  /**
   * Executar hook completo
   */
  async execute() {
    console.log('🚀 Iniciando hook de pre-commit...');
    
    // Verificar se há arquivos TypeScript staged
    if (!this.hasTypeScriptFiles()) {
      console.log('ℹ️  Nenhum arquivo TypeScript staged - pulando validações');
      return true;
    }

    console.log(`📁 ${this.stagedFiles.length} arquivos TypeScript staged:`);
    this.stagedFiles.forEach(file => {
      console.log(`   - ${path.relative(path.join(__dirname, '..'), file)}`);
    });

    // Executar validações
    const isValid = await this.runValidations();

    if (isValid) {
      console.log('🎉 Pre-commit validado com sucesso!');
      console.log('✅ Commit permitido');
      return true;
    } else {
      console.error('💥 Pre-commit falhou!');
      console.error('❌ Commit bloqueado - corrija os problemas antes de tentar novamente');
      console.error('');
      console.error('💡 Dicas para resolver:');
      console.error('   1. Execute: node scripts/enforce-typescript-rules.js');
      console.error('   2. Corrija erros de sintaxe TypeScript');
      console.error('   3. Remova código JavaScript problemático');
      console.error('   4. Execute os testes: npm test');
      return false;
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const hook = new PreCommitHook();
  hook.execute()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Erro fatal no hook:', error.message);
      process.exit(1);
    });
}

module.exports = PreCommitHook; 