
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

#!/usr/bin/env node

/**
 * @fileoverview Script para corrigir conflito de porta 3000
 * @author Sistema DOM v2
 * @version 1.0.0
 * @since 2025-07-26
 *
 * @description
 * Este script verifica se a porta 3000 está em uso e libera se necessário
 *
 * @usage
 * node scripts/fix-port-3000.js
 */

const { exec } = require('child_process');
const http = require('http');

function checkPort(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    
    server.listen(port, () => {
      server.close();
      resolve(false); // Porta livre
    });
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true); // Porta em uso
      } else {
        resolve(false);
      }
    });
  });
}

function findProcessUsingPort(port) {
  return new Promise((resolve, reject) => {
    exec(`netstat -ano | findstr :${port}`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      
      const lines = stdout.trim().split('\n');
      const processes = [];
      
      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[4];
          if (pid && !isNaN(pid)) {
            processes.push(pid);
          }
        }
      });
      
      resolve(processes);
    });
  });
}

function killProcess(pid) {
  return new Promise((resolve, reject) => {
    exec(`taskkill /PID ${pid} /F`, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

async function fixPort3000() {
  console.log('🔍 Verificando porta 3000...');
  
  const isPortInUse = await checkPort(3000);
  
  if (!isPortInUse) {
    console.log('✅ Porta 3000 está livre!');
    return true;
  }
  
  console.log('⚠️  Porta 3000 está em uso. Tentando liberar...');
  
  try {
    const processes = await findProcessUsingPort(3000);
    
    if (processes.length === 0) {
      console.log('❌ Não foi possível identificar o processo usando a porta 3000');
      return false;
    }
    
    console.log(`📋 Processos encontrados: ${processes.join(', ')}`);
    
    for (const pid of processes) {
      try {
        console.log(`🔄 Encerrando processo ${pid}...`);
        await killProcess(pid);
        console.log(`✅ Processo ${pid} encerrado com sucesso`);
      } catch (error) {
        console.log(`❌ Erro ao encerrar processo ${pid}: ${error.message}`);
      }
    }
    
    // Verificar novamente
    const isPortFree = await checkPort(3000);
    
    if (isPortFree) {
      console.log('✅ Porta 3000 liberada com sucesso!');
      return true;
    } else {
      console.log('❌ Não foi possível liberar a porta 3000');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erro ao tentar liberar porta:', error.message);
    return false;
  }
}

// Execução principal
async function main() {
  try {
    const success = await fixPort3000();
    
    if (success) {
      console.log('\n🎉 Porta 3000 está pronta para uso!');
      console.log('🚀 Execute: npm run phase9-web-interface');
    } else {
      console.log('\n⚠️  Não foi possível liberar a porta 3000');
      console.log('💡 Tente:');
      console.log('   1. Reiniciar o terminal');
      console.log('   2. Verificar processos manualmente');
      console.log('   3. Usar uma porta alternativa');
    }
    
  } catch (error) {
    console.error('❌ Erro crítico:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  checkPort,
  findProcessUsingPort,
  killProcess,
  fixPort3000
}; 