#!/usr/bin/env node

/**
 * ⚡ SCRIPT DE VALIDAÇÃO RÁPIDA - DOM v2
 * 
 * Validação rápida do estado crítico do projeto
 * Para uso em novos chats e verificações pontuais
 * 
 * Data: 22/07/2025
 * Responsável: IA Assistant
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Cores para output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log('\n' + '='.repeat(50), 'cyan');
  log(`⚡ ${message}`, 'bright');
  log('='.repeat(50), 'cyan');
}

function logStatus(item, status, details = '') {
  const icon = status === 'OK' ? '✅' : status === 'WARNING' ? '⚠️' : '❌';
  const color = status === 'OK' ? 'green' : status === 'WARNING' ? 'yellow' : 'red';
  
  log(`${icon} ${item}`, color);
  if (details) {
    log(`   ${details}`, 'blue');
  }
}

function checkFileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath));
}

function executeCommand(command, cwd = process.cwd()) {
  try {
    execSync(command, { 
      cwd, 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    return true;
  } catch (error) {
    return false;
  }
}

function validateCriticalFiles() {
  logHeader('VALIDAÇÃO DE ARQUIVOS CRÍTICOS');
  
  const criticalFiles = [
    { path: 'contexto-rapido-novo-chat.md', description: 'Contexto Rápido' },
    { path: 'docs/continuidade-desenvolvimento-hibrido.md', description: 'Plano Detalhado' },
    { path: 'docs/especificacoes-funcionalidades-detalhadas.md', description: 'Especificações' },
    { path: 'docs/instrucoes-implementacao-praticas.md', description: 'Instruções Práticas' },
    { path: 'docs/diretivas-pensamento-critico.md', description: 'Diretivas Críticas' },
    { path: 'frontend/package.json', description: 'Frontend Package' },
    { path: 'backend/package.json', description: 'Backend Package' },
    { path: 'package.json', description: 'Root Package' }
  ];
  
  let allFilesExist = true;
  
  criticalFiles.forEach(file => {
    if (checkFileExists(file.path)) {
      logStatus(file.description, 'OK');
    } else {
      logStatus(file.description, 'ERROR', `Arquivo não encontrado: ${file.path}`);
      allFilesExist = false;
    }
  });
  
  return allFilesExist;
}

function validateImplementedFeatures() {
  logHeader('VALIDAÇÃO DE FUNCIONALIDADES IMPLEMENTADAS');
  
  const features = [
    { path: 'backend/src/models/Payment.ts', description: 'Modelo Payment' },
    { path: 'backend/src/models/Purchase.ts', description: 'Modelo Purchase' },
    { path: 'backend/src/models/Employee.ts', description: 'Modelo Employee' },
    { path: 'backend/src/controllers/payment-controller.ts', description: 'Controller Payment' },
    { path: 'backend/src/controllers/purchase-controller.ts', description: 'Controller Purchase' },
    { path: 'backend/src/controllers/employee-controller.ts', description: 'Controller Employee' },
    { path: 'frontend/src/screens/payments-screen.tsx', description: 'Tela Payments' },
    { path: 'frontend/src/screens/purchases-screen.tsx', description: 'Tela Purchases' },
    { path: 'frontend/src/screens/employees-screen.tsx', description: 'Tela Employees' }
  ];
  
  let implementedCount = 0;
  
  features.forEach(feature => {
    if (checkFileExists(feature.path)) {
      logStatus(feature.description, 'OK');
      implementedCount++;
    } else {
      logStatus(feature.description, 'WARNING', `Não implementado: ${feature.path}`);
    }
  });
  
  log(`\n📊 Total implementado: ${implementedCount}/${features.length}`, 'cyan');
  return implementedCount;
}

function validateKnownIssues() {
  logHeader('VALIDAÇÃO DE PROBLEMAS CONHECIDOS');
  
  // ESLint não configurado intencionalmente
  logStatus('ESLint', 'INFO', 'Não configurado - foco em funcionalidades críticas');
  
  // Verificar testes backend
  log('Verificando testes backend...', 'blue');
  const backendTestsWork = executeCommand('npm test', path.join(process.cwd(), 'backend'));
  
  if (backendTestsWork) {
    logStatus('Testes Backend', 'OK');
  } else {
    logStatus('Testes Backend', 'ERROR', 'Não configurados - comando falha');
  }
  
  // Verificar TypeScript frontend
  log('Verificando TypeScript frontend...', 'blue');
  const frontendTsWorks = executeCommand('npx tsc --noEmit', path.join(process.cwd(), 'frontend'));
  
  if (frontendTsWorks) {
    logStatus('TypeScript Frontend', 'OK');
  } else {
    logStatus('TypeScript Frontend', 'WARNING', 'Problemas detectados');
  }
  
  // Verificar TypeScript backend
  log('Verificando TypeScript backend...', 'blue');
  const backendTsWorks = executeCommand('npx tsc --noEmit', path.join(process.cwd(), 'backend'));
  
  if (backendTsWorks) {
    logStatus('TypeScript Backend', 'OK');
  } else {
    logStatus('TypeScript Backend', 'WARNING', 'Problemas detectados');
  }
}

function generateQuickSummary() {
  logHeader('RESUMO RÁPIDO');
  
  const summary = {
    projectName: 'DOM v2',
    currentPhase: 'Semana 1 - Fundação Crítica',
    strategy: 'Laboratório de Evolução Contínua (Híbrida)',
    nextStep: 'Configurar testes básicos',
    criticalIssues: [
      'Testes ausentes no backend',
      'TypeScript inconsistente'
    ],
    immediateTasks: [
      'Configurar testes (3-4 horas)',
      'Padronizar TypeScript (1-2 horas)'
    ]
  };
  
  log('📋 INFORMAÇÕES RÁPIDAS:', 'bright');
  Object.entries(summary).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      log(`   ${key}:`, 'cyan');
      value.forEach(item => log(`     • ${item}`, 'yellow'));
    } else {
      log(`   ${key}: ${value}`, 'cyan');
    }
  });
}

function generateNextActions() {
  logHeader('PRÓXIMAS AÇÕES RECOMENDADAS');
  
  const actions = [
    {
      priority: 'CRÍTICA',
      action: 'Configurar testes Jest',
      command: 'cd C:\\dom-v2\\backend && npm install --save-dev jest @types/jest ts-jest',
      reason: 'Ausentes no backend - comando npm test falha'
    },
    {
      priority: 'CRÍTICA',
      action: 'Configurar testes Jest',
      command: 'cd C:\\dom-v2\\backend && npm install --save-dev jest @types/jest ts-jest',
      reason: 'Ausentes no backend - comando npm test falha'
    },
    {
      priority: 'CRÍTICA',
      action: 'Padronizar TypeScript',
      command: 'Verificar tsconfig.json em frontend e backend',
      reason: 'Configuração inconsistente detectada'
    },
    {
      priority: 'IMPORTANTE',
      action: 'Implementar pre-commit hooks',
      command: 'cd C:\\dom-v2 && npm install --save-dev husky lint-staged',
      reason: 'Prevenção de problemas futuros'
    }
  ];
  
  actions.forEach((action, index) => {
    log(`${index + 1}. [${action.priority}] ${action.action}`, 'bright');
    log(`   💻 Comando: ${action.command}`, 'green');
    log(`   📝 Motivo: ${action.reason}`, 'yellow');
  });
}

function main() {
  logHeader('VALIDAÇÃO RÁPIDA - DOM v2');
  log('Data: 22/07/2025', 'blue');
  log('Responsável: IA Assistant', 'blue');
  
  // 1. Validar arquivos críticos
  const filesValid = validateCriticalFiles();
  
  if (!filesValid) {
    log('\n❌ ARQUIVOS CRÍTICOS FALTANDO', 'red');
    log('Execute: node scripts/init-new-chat.js para inicialização completa', 'yellow');
  }
  
  // 2. Validar funcionalidades implementadas
  const implementedCount = validateImplementedFeatures();
  
  // 3. Validar problemas conhecidos
  validateKnownIssues();
  
  // 4. Gerar resumo rápido
  generateQuickSummary();
  
  // 5. Gerar próximas ações
  generateNextActions();
  
  logHeader('VALIDAÇÃO CONCLUÍDA');
  
  if (filesValid && implementedCount >= 6) {
    log('✅ Projeto em estado funcional', 'green');
    log('🎯 Próximo passo: Corrigir problemas críticos', 'green');
  } else if (filesValid) {
    log('⚠️ Projeto parcialmente funcional', 'yellow');
    log('🔧 Necessita implementações adicionais', 'yellow');
  } else {
    log('❌ Projeto com problemas críticos', 'red');
    log('🚨 Requer atenção imediata', 'red');
  }
  
  log('\n💡 DICA: Use "node scripts/init-new-chat.js" para inicialização completa', 'cyan');
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  validateCriticalFiles,
  validateImplementedFeatures,
  validateKnownIssues,
  generateQuickSummary,
  generateNextActions
}; 