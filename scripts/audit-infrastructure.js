#!/usr/bin/env node

/**
 * 🏗️ AUDITORIA DE INFRAESTRUTURA - DOM v2
 * 
 * Este script analisa a infraestrutura atual do projeto
 * identificando problemas de centralização, reutilização e arquitetura
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 INICIANDO AUDITORIA DE INFRAESTRUTURA');
console.log('==========================================\n');

// Função para analisar estrutura de arquivos
function analyzeFileStructure(dir, prefix = '') {
  const items = fs.readdirSync(dir);
  const files = [];
  const directories = [];
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      directories.push(item);
    } else {
      files.push(item);
    }
  });
  
  return { files, directories };
}

// Função para analisar componentes
function analyzeComponents() {
  console.log('📦 ANALISANDO COMPONENTES...');
  
  try {
    const componentsDir = path.join(__dirname, '../frontend/src/components');
    const uiDir = path.join(__dirname, '../frontend/src/components/ui');
    
    // Verificar estrutura de componentes
    if (fs.existsSync(componentsDir)) {
      const components = analyzeFileStructure(componentsDir);
      console.log(`   📁 Componentes principais: ${components.files.length} arquivos`);
      console.log(`   📁 Subdiretórios: ${components.directories.length}`);
      
      components.files.forEach(file => {
        console.log(`      - ${file}`);
      });
    } else {
      console.log('   ❌ Diretório de componentes não encontrado');
    }
    
    // Verificar biblioteca UI
    if (fs.existsSync(uiDir)) {
      const uiComponents = analyzeFileStructure(uiDir);
      console.log(`   🎨 Biblioteca UI: ${uiComponents.files.length} componentes`);
      
      uiComponents.files.forEach(file => {
        console.log(`      - ${file}`);
      });
    } else {
      console.log('   ❌ Diretório UI não encontrado');
    }
  } catch (error) {
    console.log(`   ❌ Erro ao analisar componentes: ${error.message}`);
  }
  
  console.log('');
}

// Função para analisar centralização de mensagens
function analyzeMessageCentralization() {
  console.log('💬 ANALISANDO CENTRALIZAÇÃO DE MENSAGENS...');
  
  const messagesFile = path.join(__dirname, '../frontend/src/utils/messages.ts');
  const configFile = path.join(__dirname, '../frontend/src/utils/config.ts');
  
  if (fs.existsSync(messagesFile)) {
    const content = fs.readFileSync(messagesFile, 'utf8');
    const messageCount = (content.match(/export const/g) || []).length;
    console.log(`   ✅ Sistema de mensagens: ${messageCount} mensagens centralizadas`);
  } else {
    console.log('   ❌ Sistema de mensagens: NÃO ENCONTRADO');
  }
  
  if (fs.existsSync(configFile)) {
    const content = fs.readFileSync(configFile, 'utf8');
    const configCount = (content.match(/export const/g) || []).length;
    console.log(`   ✅ Sistema de configuração: ${configCount} configurações centralizadas`);
  } else {
    console.log('   ❌ Sistema de configuração: NÃO ENCONTRADO');
  }
  
  console.log('');
}

// Função para analisar reutilização de código
function analyzeCodeReuse() {
  console.log('🔄 ANALISANDO REUTILIZAÇÃO DE CÓDIGO...');
  
  const utilsDir = path.join(__dirname, '../frontend/src/utils');
  const hooksDir = path.join(__dirname, '../frontend/src/hooks');
  
  if (fs.existsSync(utilsDir)) {
    const utils = analyzeFileStructure(utilsDir);
    console.log(`   🛠️ Utilitários: ${utils.files.length} arquivos`);
    utils.files.forEach(file => {
      console.log(`      - ${file}`);
    });
  }
  
  if (fs.existsSync(hooksDir)) {
    const hooks = analyzeFileStructure(hooksDir);
    console.log(`   🎣 Hooks customizados: ${hooks.files.length} hooks`);
    hooks.files.forEach(file => {
      console.log(`      - ${file}`);
    });
  }
  
  console.log('');
}

// Função para analisar arquitetura backend
function analyzeBackendArchitecture() {
  console.log('🔧 ANALISANDO ARQUITETURA BACKEND...');
  
  const backendDir = path.join(__dirname, '../backend/src');
  
  if (fs.existsSync(backendDir)) {
    const structure = analyzeFileStructure(backendDir);
    console.log(`   📁 Estrutura backend: ${structure.directories.length} diretórios`);
    
    structure.directories.forEach(dir => {
      const dirPath = path.join(backendDir, dir);
      const dirContent = analyzeFileStructure(dirPath);
      console.log(`      📂 ${dir}: ${dirContent.files.length} arquivos`);
    });
  }
  
  console.log('');
}

// Função para analisar padrões de código
function analyzeCodePatterns() {
  console.log('📋 ANALISANDO PADRÕES DE CÓDIGO...');
  
  // Verificar arquivos de configuração
  const packageJson = path.join(__dirname, '../package.json');
  const tsConfig = path.join(__dirname, '../tsconfig.json');
  const eslintConfig = path.join(__dirname, '../eslintrc.js');
  
  const configs = [
    { name: 'package.json', path: packageJson },
    { name: 'tsconfig.json', path: tsConfig },
    { name: 'eslintrc.js', path: eslintConfig }
  ];
  
  configs.forEach(config => {
    if (fs.existsSync(config.path)) {
      console.log(`   ✅ ${config.name}: CONFIGURADO`);
    } else {
      console.log(`   ❌ ${config.name}: NÃO ENCONTRADO`);
    }
  });
  
  console.log('');
}

// Função para identificar problemas
function identifyProblems() {
  console.log('🚨 PROBLEMAS IDENTIFICADOS:');
  
  const problems = [];
  
  // Verificar se há hardcode
  const screensDir = path.join(__dirname, '../frontend/src/screens');
  if (fs.existsSync(screensDir)) {
    const screens = analyzeFileStructure(screensDir);
    if (screens.files.length > 0) {
      const sampleFile = path.join(screensDir, screens.files[0]);
      const content = fs.readFileSync(sampleFile, 'utf8');
      
      // Verificar strings hardcoded
      const hardcodedStrings = content.match(/"([^"]{10,})"/g);
      if (hardcodedStrings && hardcodedStrings.length > 5) {
        problems.push('❌ Strings hardcoded encontradas em telas');
      }
    }
  }
  
  // Verificar duplicação de componentes
  const componentsDir = path.join(__dirname, '../frontend/src/components');
  if (fs.existsSync(componentsDir)) {
    const components = analyzeFileStructure(componentsDir);
    if (components.files.length < 5) {
      problems.push('❌ Poucos componentes reutilizáveis');
    }
  }
  
  // Verificar estrutura de testes
  const testsDir = path.join(__dirname, '../frontend/__tests__');
  if (!fs.existsSync(testsDir)) {
    problems.push('❌ Diretório de testes não encontrado');
  }
  
  if (problems.length === 0) {
    console.log('   ✅ Nenhum problema crítico identificado');
  } else {
    problems.forEach(problem => {
      console.log(`   ${problem}`);
    });
  }
  
  console.log('');
}

// Função para gerar recomendações
function generateRecommendations() {
  console.log('💡 RECOMENDAÇÕES:');
  
  const recommendations = [
    '🔧 Implementar sistema completo de centralização de mensagens',
    '🎨 Expandir biblioteca de componentes reutilizáveis',
    '📋 Estabelecer padrões de arquitetura claros',
    '🧪 Implementar sistema de testes abrangente',
    '🔄 Criar sistema de reutilização de código',
    '📚 Documentar padrões estabelecidos'
  ];
  
  recommendations.forEach(rec => {
    console.log(`   ${rec}`);
  });
  
  console.log('');
}

// Executar auditoria
try {
  analyzeComponents();
  analyzeMessageCentralization();
  analyzeCodeReuse();
  analyzeBackendArchitecture();
  analyzeCodePatterns();
  identifyProblems();
  generateRecommendations();
  
  console.log('✅ AUDITORIA DE INFRAESTRUTURA CONCLUÍDA!');
  
} catch (error) {
  console.error('❌ Erro durante auditoria:', error.message);
} 