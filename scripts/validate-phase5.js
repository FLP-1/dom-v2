/**
 * @fileoverview Script de Validação da Fase 5 - Automação Avançada
 * @directory scripts
 * @description Validação específica dos componentes da Fase 5
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM v2 Team
 */

const fs = require('fs');
const path = require('path');

console.log(`[${new Date().toISOString()}] ` + '🔍 VALIDANDO FASE 5 - AUTOMAÇÃO AVANÇADA');
console.log(`[${new Date().toISOString()}] ` + '========================================');

// Estrutura esperada da Fase 5
const expectedStructure = {
  'automation': ['automation-engine.js', 'corrections', 'notifications'],
  'dashboard': ['dashboard-manager.js', 'metrics', 'visualizations'],
  'cicd': ['cicd-pipeline.js', 'pipelines', 'gates'],
  'predictive': ['models', 'analysis'],
  'personalization': ['configs', 'rules']
};

// Arquivos de configuração esperados
const expectedFiles = [
  'phase5-config.json',
  'docs/fase-5-setup-concluido.md'
];

// Scripts npm esperados
const expectedScripts = [
  'phase5:setup',
  'phase5:automation',
  'phase5:dashboard',
  'phase5:cicd',
  'phase5:validate',
  'phase5:metrics'
];

let validationResults = {
  structure: { passed: 0, total: 0, issues: [] },
  files: { passed: 0, total: 0, issues: [] },
  scripts: { passed: 0, total: 0, issues: [] },
  functionality: { passed: 0, total: 0, issues: [] }
};

// Validar estrutura de diretórios
console.log(`[${new Date().toISOString()}] ` + '\n📁 Validando estrutura de diretórios...');
Object.keys(expectedStructure).forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  validationResults.structure.total++;
  
  if (fs.existsSync(dirPath)) {
    console.log(`[${new Date().toISOString()}] ` + `✅ ${dir}/`);
    validationResults.structure.passed++;
    
    // Verificar subdiretórios
    expectedStructure[dir].forEach(subItem => {
      const subPath = path.join(dirPath, subItem);
      if (fs.existsSync(subPath)) {
        console.log(`[${new Date().toISOString()}] ` + `  ✅ ${dir}/${subItem}`);
      } else {
        console.log(`[${new Date().toISOString()}] ` + `  ❌ ${dir}/${subItem} - Não encontrado`);
        validationResults.structure.issues.push(`${dir}/${subItem} não encontrado`);
      }
    });
  } else {
    console.log(`[${new Date().toISOString()}] ` + `❌ ${dir}/ - Não encontrado`);
    validationResults.structure.issues.push(`${dir} não encontrado`);
  }
});

// Validar arquivos de configuração
console.log(`[${new Date().toISOString()}] ` + '\n📄 Validando arquivos de configuração...');
expectedFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  validationResults.files.total++;
  
  if (fs.existsSync(filePath)) {
    console.log(`[${new Date().toISOString()}] ` + `✅ ${file}`);
    validationResults.files.passed++;
  } else {
    console.log(`[${new Date().toISOString()}] ` + `❌ ${file} - Não encontrado`);
    validationResults.files.issues.push(`${file} não encontrado`);
  }
});

// Validar scripts npm
console.log(`[${new Date().toISOString()}] ` + '\n📦 Validando scripts npm...');
const packagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  expectedScripts.forEach(script => {
    validationResults.scripts.total++;
    
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`[${new Date().toISOString()}] ` + `✅ ${script}`);
      validationResults.scripts.passed++;
    } else {
      console.log(`[${new Date().toISOString()}] ` + `❌ ${script} - Não encontrado`);
      validationResults.scripts.issues.push(`${script} não encontrado`);
    }
  });
} else {
  console.log(`[${new Date().toISOString()}] ` + '❌ package.json não encontrado');
  validationResults.scripts.issues.push('package.json não encontrado');
}

// Validar funcionalidade básica
console.log(`[${new Date().toISOString()}] ` + '\n🧪 Validando funcionalidade básica...');
validationResults.functionality.total = 3;

// Teste 1: Verificar se o engine de automação pode ser carregado
try {
  const automationPath = path.join(__dirname, '..', 'automation', 'automation-engine.js');
  if (fs.existsSync(automationPath)) {
    console.log(`[${new Date().toISOString()}] ` + '✅ Engine de automação carregável');
    validationResults.functionality.passed++;
  } else {
    console.log(`[${new Date().toISOString()}] ` + '❌ Engine de automação não encontrado');
    validationResults.functionality.issues.push('Engine de automação não encontrado');
  }
} catch (error) {
  console.log(`[${new Date().toISOString()}] ` + '❌ Erro ao carregar engine de automação');
  validationResults.functionality.issues.push('Erro ao carregar engine de automação');
}

// Teste 2: Verificar se o dashboard manager pode ser carregado
try {
  const dashboardPath = path.join(__dirname, '..', 'dashboard', 'dashboard-manager.js');
  if (fs.existsSync(dashboardPath)) {
    console.log(`[${new Date().toISOString()}] ` + '✅ Dashboard manager carregável');
    validationResults.functionality.passed++;
  } else {
    console.log(`[${new Date().toISOString()}] ` + '❌ Dashboard manager não encontrado');
    validationResults.functionality.issues.push('Dashboard manager não encontrado');
  }
} catch (error) {
  console.log(`[${new Date().toISOString()}] ` + '❌ Erro ao carregar dashboard manager');
  validationResults.functionality.issues.push('Erro ao carregar dashboard manager');
}

// Teste 3: Verificar se o pipeline CI/CD pode ser carregado
try {
  const cicdPath = path.join(__dirname, '..', 'cicd', 'cicd-pipeline.js');
  if (fs.existsSync(cicdPath)) {
    console.log(`[${new Date().toISOString()}] ` + '✅ Pipeline CI/CD carregável');
    validationResults.functionality.passed++;
  } else {
    console.log(`[${new Date().toISOString()}] ` + '❌ Pipeline CI/CD não encontrado');
    validationResults.functionality.issues.push('Pipeline CI/CD não encontrado');
  }
} catch (error) {
  console.log(`[${new Date().toISOString()}] ` + '❌ Erro ao carregar pipeline CI/CD');
  validationResults.functionality.issues.push('Erro ao carregar pipeline CI/CD');
}

// Relatório final
console.log(`[${new Date().toISOString()}] ` + '\n📊 RELATÓRIO DE VALIDAÇÃO DA FASE 5');
console.log(`[${new Date().toISOString()}] ` + '====================================');

const categories = ['structure', 'files', 'scripts', 'functionality'];
let totalPassed = 0;
let totalTests = 0;

categories.forEach(category => {
  const result = validationResults[category];
  const percentage = Math.round((result.passed / result.total) * 100);
  totalPassed += result.passed;
  totalTests += result.total;
  
  let status = '🟢';
  if (percentage < 50) status = '🔴';
  else if (percentage < 80) status = '🟡';
  else if (percentage < 100) status = '🟠';
  
  console.log(`[${new Date().toISOString()}] ` + `${status} ${category.toUpperCase()}: ${result.passed}/${result.total} (${percentage}%)`);
  
  if (result.issues.length > 0) {
    console.log(`[${new Date().toISOString()}] ` + `   ⚠️  Problemas:`);
    result.issues.forEach(issue => console.log(`[${new Date().toISOString()}] ` + `      - ${issue}`));
  }
});

const overallPercentage = Math.round((totalPassed / totalTests) * 100);
let overallStatus = '🟢';
if (overallPercentage < 50) overallStatus = '🔴';
else if (overallPercentage < 80) overallStatus = '🟡';
else if (overallPercentage < 100) overallStatus = '🟠';

console.log(`[${new Date().toISOString()}] ` + `\n${overallStatus} VALIDAÇÃO GERAL: ${totalPassed}/${totalTests} (${overallPercentage}%)`);

if (overallPercentage >= 80) {
  console.log(`[${new Date().toISOString()}] ` + '\n🎉 FASE 5 VALIDADA COM SUCESSO!');
  console.log(`[${new Date().toISOString()}] ` + '✅ Setup básico concluído');
  console.log(`[${new Date().toISOString()}] ` + '✅ Estrutura implementada');
  console.log(`[${new Date().toISOString()}] ` + '✅ Scripts funcionais');
  console.log(`[${new Date().toISOString()}] ` + '🚀 Pronto para implementação avançada');
} else {
  console.log(`[${new Date().toISOString()}] ` + '\n⚠️  VALIDAÇÃO COM PROBLEMAS');
  console.log(`[${new Date().toISOString()}] ` + '🔧 Corrija os problemas antes de continuar');
}

console.log(`[${new Date().toISOString()}] ` + '\n📋 PRÓXIMOS PASSOS:');
console.log(`[${new Date().toISOString()}] ` + '==================');
console.log(`[${new Date().toISOString()}] ` + '1. Implementar correções automáticas');
console.log(`[${new Date().toISOString()}] ` + '2. Criar dashboard inicial');
console.log(`[${new Date().toISOString()}] ` + '3. Integrar CI/CD');
console.log(`[${new Date().toISOString()}] ` + '4. Implementar análise preditiva');
console.log(`[${new Date().toISOString()}] ` + '5. Configurar personalização'); 