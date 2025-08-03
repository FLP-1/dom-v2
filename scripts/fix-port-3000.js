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