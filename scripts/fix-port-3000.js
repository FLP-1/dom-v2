#!/usr/bin/env node

/**
 * @fileoverview Script para corrigir conflito de porta 3000 (cross-platform)
 * @author Sistema DOM v2
 * @version 1.1.0
 * @since 2025-07-26
 *
 * @description
 * Este script verifica se a porta 3000 está em uso e libera se necessário, suportando Windows, macOS e Linux
 *
 * @usage
 * node scripts/fix-port-3000.js
 */

const { exec } = require('child_process');
const http = require('http');
const os = require('os');

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
    const platform = os.platform();

    // Comandos por SO, evitando interpolação perigosa
    let cmd;
    if (platform === 'win32') {
      cmd = `netstat -ano | findstr :${Number(port)}`;
    } else if (platform === 'darwin') {
      cmd = `lsof -n -iTCP:${Number(port)} -sTCP:LISTEN -P`; // macOS
    } else {
      // Linux
      // Tenta lsof; se indisponível, fallback para ss
      cmd = `bash -c 'command -v lsof >/dev/null 2>&1 && lsof -n -iTCP:${Number(port)} -sTCP:LISTEN -P || ss -lptn | grep :${Number(port)}'`;
    }

    exec(cmd, { windowsHide: true, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      if (error && !stdout) {
        return reject(error);
      }

      const output = (stdout || '').trim();
      const processes = new Set();

      if (!output) {
        return resolve([]);
      }

      const lines = output.split(/\r?\n/);
      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) continue;

        if (platform === 'win32') {
          const parts = line.split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && /^\d+$/.test(pid)) processes.add(pid);
        } else if (platform === 'darwin') {
          // lsof: COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
          const parts = line.split(/\s+/);
          if (parts.length > 1) {
            const pid = parts[1];
            if (pid && /^\d+$/.test(pid)) processes.add(pid);
          }
        } else {
          // Linux: try to extract pid from ss output like users:(("node",pid=1234,fd=23))
          const match = line.match(/pid=(\d+)/);
          if (match && match[1] && /^\d+$/.test(match[1])) {
            processes.add(match[1]);
          } else {
            // lsof-like format
            const parts = line.split(/\s+/);
            if (parts.length > 1 && /^\d+$/.test(parts[1])) {
              processes.add(parts[1]);
            }
          }
        }
      }

      resolve(Array.from(processes));
    });
  });
}

function killProcess(pid) {
  return new Promise((resolve, reject) => {
    const platform = os.platform();

    if (!/^\d+$/.test(String(pid))) {
      return reject(new Error('PID inválido'));
    }

    const cmd = platform === 'win32' ? `taskkill /PID ${pid} /F` : `kill -9 ${pid}`;

    exec(cmd, { windowsHide: true }, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout || 'killed');
    });
  });
}

async function fixPort3000() {
  const targetPort = Number(process.env.PORT) || 3000;
  console.log(`🔍 Verificando porta ${targetPort}...`);
  
  const isPortInUse = await checkPort(targetPort);
  
  if (!isPortInUse) {
    console.log(`✅ Porta ${targetPort} está livre!`);
    return true;
  }
  
  console.log(`⚠️  Porta ${targetPort} está em uso. Tentando liberar...`);
  
  try {
    const processes = await findProcessUsingPort(targetPort);
    
    if (processes.length === 0) {
      console.log(`❌ Não foi possível identificar o processo usando a porta ${targetPort}`);
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
    const isPortFree = await checkPort(targetPort);
    
    if (isPortFree) {
      console.log(`✅ Porta ${targetPort} liberada com sucesso!`);
      return true;
    } else {
      console.log(`❌ Não foi possível liberar a porta ${targetPort}`);
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
      console.log('\n🎉 Porta pronta para uso!');
    } else {
      console.log('\n⚠️  Não foi possível liberar a porta');
      console.log('💡 Tente:');
      console.log('   1. Reiniciar o terminal');
      console.log('   2. Verificar processos manualmente');
      console.log('   3. Usar uma porta alternativa via env PORT=3001');
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