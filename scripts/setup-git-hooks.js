
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
 * Este arquivo implementa Custom Hook React
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
 * 🔧 SETUP GIT HOOKS - CONFIGURAÇÃO AUTOMÁTICA
 * 
 * Este script configura automaticamente os hooks do git
 * para validar diretivas críticas em cada commit.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações
const CONFIG = {
  hooks: {
    'pre-commit': 'node scripts/pre-commit-hook.js',
    'commit-msg': 'node scripts/commit-msg-hook.js',
    'post-commit': 'node scripts/post-commit-hook.js'
  },
  
  // Diretório dos hooks do git
  gitHooksDir: '.git/hooks',
  
  // Scripts de validação
  validationScripts: [
    'scripts/validate-directives.js',
    'scripts/pre-commit-hook.js',
    'scripts/commit-msg-hook.js',
    'scripts/post-commit-hook.js'
  ]
};

/**
 * Classe para configuração de hooks
 */
class GitHooksSetup {
  constructor() {
    this.results = {
      success: true,
      hooksInstalled: [],
      errors: []
    };
  }

  /**
   * Executa a configuração completa
   */
  async setup() {
    console.log('🔧 CONFIGURANDO GIT HOOKS - DIRETIVAS CRÍTICAS');
    console.log('=' .repeat(60));
    
    try {
      // 1. Verificar se é um repositório git
      this.checkGitRepository();
      
      // 2. Verificar se scripts existem
      this.checkScripts();
      
      // 3. Instalar hooks
      await this.installHooks();
      
      // 4. Configurar permissões
      this.setPermissions();
      
      // 5. Gerar relatório
      this.generateReport();
      
      console.log('✅ Configuração concluída com sucesso!\n');
      return this.results.success;
      
    } catch (error) {
      console.error('❌ Erro na configuração:', error.message);
      this.results.success = false;
      this.results.errors.push(error.message);
      return false;
    }
  }

  /**
   * Verifica se é um repositório git
   */
  checkGitRepository() {
    if (!fs.existsSync('.git')) {
      throw new Error('Este diretório não é um repositório git');
    }
    
    if (!fs.existsSync(CONFIG.gitHooksDir)) {
      throw new Error('Diretório de hooks do git não encontrado');
    }
    
    console.log('✅ Repositório git verificado');
  }

  /**
   * Verifica se scripts de validação existem
   */
  checkScripts() {
    console.log('\n📁 Verificando scripts de validação...');
    
    for (const script of CONFIG.validationScripts) {
      if (fs.existsSync(script)) {
        console.log(`✅ ${script}`);
      } else {
        console.log(`❌ ${script} - NÃO ENCONTRADO`);
        this.results.errors.push(`Script não encontrado: ${script}`);
      }
    }
  }

  /**
   * Instala os hooks do git
   */
  async installHooks() {
    console.log('\n🔧 Instalando hooks do git...');
    
    for (const [hookName, command] of Object.entries(CONFIG.hooks)) {
      await this.installHook(hookName, command);
    }
  }

  /**
   * Instala um hook específico
   */
  async installHook(hookName, command) {
    try {
      const hookPath = path.join(CONFIG.gitHooksDir, hookName);
      const hookContent = this.generateHookContent(command);
      
      fs.writeFileSync(hookPath, hookContent);
      
      console.log(`✅ Hook instalado: ${hookName}`);
      this.results.hooksInstalled.push(hookName);
      
    } catch (error) {
      console.error(`❌ Erro ao instalar hook ${hookName}:`, error.message);
      this.results.errors.push(`Falha ao instalar ${hookName}: ${error.message}`);
    }
  }

  /**
   * Gera conteúdo do hook
   */
  generateHookContent(command) {
    return `#!/bin/sh
# 🛡️ GIT HOOK - DIRETIVAS CRÍTICAS
# Gerado automaticamente pelo setup-git-hooks.js
# Data: ${new Date().toISOString()}

# Executar comando de validação
${command}

# Verificar código de saída
if [ $? -ne 0 ]; then
  echo "❌ Hook falhou. Commit bloqueado."
  exit 1
fi

echo "✅ Hook executado com sucesso."
exit 0
`;
  }

  /**
   * Define permissões de execução
   */
  setPermissions() {
    console.log('\n🔐 Configurando permissões...');
    
    for (const hookName of Object.keys(CONFIG.hooks)) {
      try {
        const hookPath = path.join(CONFIG.gitHooksDir, hookName);
        
        // No Windows, não precisamos definir permissões de execução
        if (process.platform !== 'win32') {
          fs.chmodSync(hookPath, '755');
        }
        
        console.log(`✅ Permissões configuradas: ${hookName}`);
        
      } catch (error) {
        console.warn(`⚠️ Aviso ao configurar permissões para ${hookName}:`, error.message);
      }
    }
  }

  /**
   * Gera relatório de configuração
   */
  generateReport() {
    console.log('\n📊 RELATÓRIO DE CONFIGURAÇÃO');
    console.log('=' .repeat(40));
    
    console.log(`✅ Hooks instalados: ${this.results.hooksInstalled.length}`);
    this.results.hooksInstalled.forEach(hook => {
      console.log(`  • ${hook}`);
    });
    
    if (this.results.errors.length > 0) {
      console.log(`\n❌ Erros encontrados: ${this.results.errors.length}`);
      this.results.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error}`);
      });
    }
    
    console.log('\n💡 PRÓXIMOS PASSOS:');
    console.log('  1. Faça um commit de teste para verificar os hooks');
    console.log('  2. Execute: git commit -m "test: verificar hooks"');
    console.log('  3. Verifique se a validação é executada automaticamente');
    
    console.log('\n📚 DOCUMENTAÇÃO:');
    console.log('  • Guia rápido: docs/directives/guia-rapido-diretivas-criticas.md');
    console.log('  • Comandos: npm run validate-directives');
    console.log('  • Suporte: Equipe de desenvolvimento');
  }

  /**
   * Remove hooks instalados
   */
  removeHooks() {
    console.log('🗑️ Removendo hooks do git...');
    
    for (const hookName of Object.keys(CONFIG.hooks)) {
      try {
        const hookPath = path.join(CONFIG.gitHooksDir, hookName);
        
        if (fs.existsSync(hookPath)) {
          fs.unlinkSync(hookPath);
          console.log(`✅ Hook removido: ${hookName}`);
        }
        
      } catch (error) {
        console.error(`❌ Erro ao remover hook ${hookName}:`, error.message);
      }
    }
  }

  /**
   * Verifica status dos hooks
   */
  checkStatus() {
    console.log('🔍 Verificando status dos hooks...');
    
    for (const hookName of Object.keys(CONFIG.hooks)) {
      const hookPath = path.join(CONFIG.gitHooksDir, hookName);
      
      if (fs.existsSync(hookPath)) {
        const content = fs.readFileSync(hookPath, 'utf8');
        const isOurHook = content.includes('DIRETIVAS CRÍTICAS');
        
        if (isOurHook) {
          console.log(`✅ ${hookName} - Instalado (nossos hooks)`);
        } else {
          console.log(`⚠️ ${hookName} - Existe (outro hook)`);
        }
      } else {
        console.log(`❌ ${hookName} - Não instalado`);
      }
    }
  }
}

/**
 * Função principal
 */
async function main() {
  const args = process.argv.slice(2);
  const setup = new GitHooksSetup();
  
  try {
    switch (args[0]) {
      case 'install':
      case undefined:
        await setup.setup();
        break;
        
      case 'remove':
        setup.removeHooks();
        console.log('✅ Hooks removidos com sucesso');
        break;
        
      case 'status':
        setup.checkStatus();
        break;
        
      case 'help':
        console.log(`
🔧 SETUP GIT HOOKS - COMANDOS DISPONÍVEIS

Uso: node scripts/setup-git-hooks.js [comando]

Comandos:
  install    Instala os hooks (padrão)
  remove     Remove os hooks instalados
  status     Verifica status dos hooks
  help       Mostra esta ajuda

Exemplos:
  node scripts/setup-git-hooks.js install
  node scripts/setup-git-hooks.js status
  node scripts/setup-git-hooks.js remove
        `);
        break;
        
      default:
        console.error('❌ Comando inválido. Use "help" para ver opções.');
        process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { GitHooksSetup, CONFIG }; 