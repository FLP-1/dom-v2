/**
 * @fileoverview Script para executar suíte completa de testes
 * @version 2.0.0
 * @generated 2025-01-27T12:00:00.000Z
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurações
const CONFIG = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    components: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    }
  },
  outputDir: path.join(__dirname, '..', 'test-reports'),
  colors: {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m',
    bold: '\x1b[1m',
  }
};

// Utilitários de logging
function logSection(title) {
  console.log(`\n${CONFIG.colors.cyan}${CONFIG.colors.bold}=== ${title} ===${CONFIG.colors.reset}\n`);
}

function logSuccess(message) {
  console.log(`${CONFIG.colors.green}✅ ${message}${CONFIG.colors.reset}`);
}

function logError(message) {
  console.log(`${CONFIG.colors.red}❌ ${message}${CONFIG.colors.reset}`);
}

function logWarning(message) {
  console.log(`${CONFIG.colors.yellow}⚠️  ${message}${CONFIG.colors.reset}`);
}

function logInfo(message) {
  console.log(`${CONFIG.colors.blue}ℹ️  ${message}${CONFIG.colors.reset}`);
}

// Utilitário para executar comandos
function runCommand(command, description, options = {}) {
  try {
    logInfo(`Executando: ${description}`);
    const result = execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
      ...options
    });
    logSuccess(`Concluído: ${description}`);
    return { success: true, result };
  } catch (error) {
    logError(`Falhou: ${description}`);
    if (!options.continueOnError) {
      console.error(error.message);
      process.exit(1);
    }
    return { success: false, error };
  }
}

// Criar diretório de relatórios
function setupReportDirectory() {
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    logSuccess('Diretório de relatórios criado');
  }
}

// Validar ambiente
function validateEnvironment() {
  logSection('VALIDAÇÃO DO AMBIENTE');
  
  // Verificar Node.js
  const nodeVersion = process.version;
  logInfo(`Node.js: ${nodeVersion}`);
  
  // Verificar se package.json existe
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    logError('package.json não encontrado');
    process.exit(1);
  }
  
  // Verificar se node_modules existe
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    logWarning('node_modules não encontrado - executando npm install');
    runCommand('npm install', 'Instalação de dependências');
  }
  
  logSuccess('Ambiente validado');
}

// Executar linting
function runLinting() {
  logSection('LINTING E VERIFICAÇÃO DE TIPOS');
  
  runCommand('npm run type-check', 'Verificação de tipos TypeScript');
  runCommand('npm run lint', 'ESLint', { continueOnError: true });
  
  logSuccess('Linting concluído');
}

// Executar testes unitários
function runUnitTests() {
  logSection('TESTES UNITÁRIOS');
  
  const testResults = runCommand(
    'npm run test:coverage', 
    'Testes unitários com cobertura'
  );
  
  if (testResults.success) {
    logSuccess('Todos os testes unitários passaram');
  }
  
  return testResults;
}

// Executar testes de acessibilidade
function runAccessibilityTests() {
  logSection('TESTES DE ACESSIBILIDADE');
  
  const a11yResults = runCommand(
    'npm run test:accessibility', 
    'Testes de acessibilidade',
    { continueOnError: true }
  );
  
  if (a11yResults.success) {
    logSuccess('Todos os testes de acessibilidade passaram');
  } else {
    logWarning('Alguns testes de acessibilidade falharam - revisar logs');
  }
  
  return a11yResults;
}

// Executar testes visuais
function runVisualTests() {
  logSection('TESTES DE REGRESSÃO VISUAL');
  
  const visualResults = runCommand(
    'npm run test:visual', 
    'Testes de regressão visual',
    { continueOnError: true }
  );
  
  if (visualResults.success) {
    logSuccess('Todos os testes visuais passaram');
  } else {
    logWarning('Alguns snapshots podem ter mudado - revisar diffs');
  }
  
  return visualResults;
}

// Construir Storybook
function buildStorybook() {
  logSection('BUILD DO STORYBOOK');
  
  const storybookResults = runCommand(
    'npm run build-storybook', 
    'Build do Storybook para documentação',
    { continueOnError: true }
  );
  
  if (storybookResults.success) {
    logSuccess('Storybook construído com sucesso');
  } else {
    logWarning('Falha na construção do Storybook');
  }
  
  return storybookResults;
}

// Gerar relatório de cobertura HTML
function generateCoverageReport() {
  logSection('RELATÓRIO DE COBERTURA');
  
  const coveragePath = path.join(process.cwd(), 'coverage');
  if (fs.existsSync(coveragePath)) {
    const htmlReportPath = path.join(coveragePath, 'lcov-report', 'index.html');
    if (fs.existsSync(htmlReportPath)) {
      logSuccess(`Relatório HTML disponível em: ${htmlReportPath}`);
    }
    
    // Ler resumo da cobertura
    const summaryCoveragePath = path.join(coveragePath, 'coverage-summary.json');
    if (fs.existsSync(summaryCoveragePath)) {
      try {
        const summary = JSON.parse(fs.readFileSync(summaryCoveragePath, 'utf8'));
        const total = summary.total;
        
        console.log('\n📊 RESUMO DA COBERTURA:');
        console.log(`Lines: ${total.lines.pct}%`);
        console.log(`Functions: ${total.functions.pct}%`);
        console.log(`Branches: ${total.branches.pct}%`);
        console.log(`Statements: ${total.statements.pct}%`);
        
        // Verificar se atende aos thresholds
        const meetsThreshold = 
          total.lines.pct >= CONFIG.coverageThreshold.global.lines &&
          total.functions.pct >= CONFIG.coverageThreshold.global.functions &&
          total.branches.pct >= CONFIG.coverageThreshold.global.branches &&
          total.statements.pct >= CONFIG.coverageThreshold.global.statements;
        
        if (meetsThreshold) {
          logSuccess('Cobertura atende aos requisitos mínimos');
        } else {
          logWarning('Cobertura abaixo do threshold mínimo');
        }
      } catch (error) {
        logWarning('Não foi possível ler o resumo de cobertura');
      }
    }
  } else {
    logWarning('Relatório de cobertura não encontrado');
  }
}

// Gerar relatório final
function generateFinalReport() {
  logSection('RELATÓRIO FINAL');
  
  const reportContent = {
    timestamp: new Date().toISOString(),
    environment: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
    },
    summary: {
      // Os resultados seriam preenchidos pelos testes executados
    }
  };
  
  const reportPath = path.join(CONFIG.outputDir, 'test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportContent, null, 2));
  
  logSuccess(`Relatório salvo em: ${reportPath}`);
}

// Função principal
async function main() {
  const startTime = Date.now();
  
  console.log(`${CONFIG.colors.bold}${CONFIG.colors.blue}`);
  console.log('🧪 DOM V2 - SUÍTE COMPLETA DE TESTES');
  console.log('====================================');
  console.log(`${CONFIG.colors.reset}\n`);
  
  try {
    // Setup inicial
    setupReportDirectory();
    
    // Validações
    validateEnvironment();
    
    // Linting e verificações
    runLinting();
    
    // Testes
    const unitResults = runUnitTests();
    const a11yResults = runAccessibilityTests();
    const visualResults = runVisualTests();
    
    // Build
    const storybookResults = buildStorybook();
    
    // Relatórios
    generateCoverageReport();
    generateFinalReport();
    
    // Resumo final
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    logSection('RESUMO FINAL');
    
    console.log('📋 Resultados:');
    console.log(`   Testes Unitários: ${unitResults.success ? '✅ PASSOU' : '❌ FALHOU'}`);
    console.log(`   Testes A11y: ${a11yResults.success ? '✅ PASSOU' : '⚠️ WARNINGS'}`);
    console.log(`   Testes Visuais: ${visualResults.success ? '✅ PASSOU' : '⚠️ WARNINGS'}`);
    console.log(`   Storybook Build: ${storybookResults.success ? '✅ PASSOU' : '⚠️ WARNINGS'}`);
    
    console.log(`\n⏱️  Tempo total: ${duration}s\n`);
    
    if (unitResults.success && a11yResults.success && visualResults.success) {
      logSuccess('🎉 TODOS OS TESTES PRINCIPAIS PASSARAM!');
      console.log(`${CONFIG.colors.green}${CONFIG.colors.bold}`);
      console.log('✨ Biblioteca de componentes está pronta para produção!');
      console.log(`${CONFIG.colors.reset}\n`);
      process.exit(0);
    } else {
      logWarning('⚠️ Alguns testes falharam ou têm warnings - revisar resultados');
      process.exit(1);
    }
    
  } catch (error) {
    logError(`Erro durante execução: ${error.message}`);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  main,
  runUnitTests,
  runAccessibilityTests,
  runVisualTests,
  buildStorybook,
};
