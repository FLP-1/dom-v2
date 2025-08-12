#!/usr/bin/env node

/**
 * 🏗️ VALIDADOR AUTOMÁTICO DE ARQUITETURA DOM v2
 * 
 * Este script valida se o código segue o Framework de Decisão Arquitetural
 * antes de commits, PRs ou deploys.
 * 
 * Uso: npm run validate-architecture
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 🎯 REGRAS DO FRAMEWORK DE DECISÃO ARQUITETURAL
const ARCHITECTURE_RULES = {
  // Regra 1: Separação de Responsabilidades
  SEPARATION_OF_CONCERNS: {
    name: 'Separação de Responsabilidades',
    description: 'Componentes UI não devem conter lógica de API diretamente',
    validate: (filePath, content) => {
      // Screens não devem ter fetch direto
      if (filePath.includes('screens') && filePath.endsWith('.tsx')) {
        const hasFetch = content.includes('fetch(') && !content.includes('// FRAMEWORK_EXCEPTION');
        const hasApiLogic = /API_BASE_URL/.test(content);
        
        // Debug para arquivo específico
        if (filePath.includes('TesteViolacao')) {
          console.log(`🔍 DEBUG ${filePath}:`);
          console.log(`   hasFetch: ${hasFetch}`);
          console.log(`   hasApiLogic: ${hasApiLogic}`);
        }
        
        if (hasFetch || hasApiLogic) {
          return {
            valid: false,
            message: `❌ Screen ${path.basename(filePath)} contém lógica de API direta. Use hooks customizados.`,
            suggestion: 'Mova a lógica para um hook customizado (ex: useTasksData, useFinanceData)'
          };
        }
      }
      return { valid: true };
    }
  },

  // Regra 2: Uso de Hooks Customizados
  CUSTOM_HOOKS_USAGE: {
    name: 'Uso de Hooks Customizados',
    description: 'Telas devem usar hooks customizados para lógica de estado',
    validate: (filePath, content) => {
      if (filePath.includes('/screens/') && filePath.endsWith('.tsx')) {
        // Verificar se usa useState diretamente para dados de API
        const hasState = content.includes('useState');
        const hasApiRelatedState = /useState.*\[\]/.test(content) && 
          (content.includes('loading') || content.includes('error'));
        
        if (hasState && hasApiRelatedState && !content.includes('use') && !content.includes('Data')) {
          return {
            valid: false,
            message: `⚠️ Screen ${path.basename(filePath)} pode se beneficiar de hook customizado.`,
            suggestion: 'Considere criar um hook customizado para gerenciar o estado dos dados'
          };
        }
      }
      return { valid: true };
    }
  },

  // Regra 3: Centralização de APIs
  API_CENTRALIZATION: {
    name: 'Centralização de APIs',
    description: 'Chamadas de API devem usar o apiService centralizado',
    validate: (filePath, content) => {
      if (filePath.includes('/hooks/') && filePath.endsWith('.ts')) {
        const hasFetch = content.includes('fetch(');
        const hasApiService = content.includes('apiService');
        
        if (hasFetch && !hasApiService) {
          return {
            valid: false,
            message: `❌ Hook ${path.basename(filePath)} usa fetch direto em vez do apiService.`,
            suggestion: 'Use apiService.getXXX() em vez de fetch direto para consistência e retry automático'
          };
        }
      }
      return { valid: true };
    }
  },

  // Regra 4: Documentação de Decisões
  DECISION_DOCUMENTATION: {
    name: 'Documentação de Decisões',
    description: 'Arquivos novos devem ter documentação de decisões arquiteturais',
    validate: (filePath, content) => {
      if (filePath.includes('/screens/') || filePath.includes('/hooks/')) {
        const hasDocumentation = content.includes('@description') || 
          content.includes('Seguindo as diretrizes') ||
          content.includes('Framework de Decisão');
        
        if (!hasDocumentation) {
          return {
            valid: false,
            message: `📝 Arquivo ${path.basename(filePath)} precisa de documentação arquitetural.`,
            suggestion: 'Adicione comentário explicando as decisões arquiteturais tomadas'
          };
        }
      }
      return { valid: true };
    }
  }
};

// 🔍 FUNÇÃO PRINCIPAL DE VALIDAÇÃO
function validateArchitecture() {
  console.log('🏗️ INICIANDO VALIDAÇÃO DE ARQUITETURA DOM v2\n');
  
  let totalFiles = 0;
  let validFiles = 0;
  let warnings = [];
  let errors = [];

  // Buscar arquivos relevantes
  const patterns = [
    'frontend/src/screens/**/*.tsx',
    'frontend/src/hooks/**/*.ts',
    'frontend/src/services/**/*.ts'
  ];

  patterns.forEach(pattern => {
    const files = glob.sync(pattern);
    
    files.forEach(filePath => {
      if (!fs.existsSync(filePath)) return;
      
      totalFiles++;
      const content = fs.readFileSync(filePath, 'utf8');
      let fileValid = true;

      // Aplicar todas as regras
      Object.entries(ARCHITECTURE_RULES).forEach(([ruleKey, rule]) => {
        const result = rule.validate(filePath, content);
        
        if (!result.valid) {
          fileValid = false;
          const issue = {
            file: filePath,
            rule: rule.name,
            message: result.message,
            suggestion: result.suggestion
          };

          if (result.message.includes('❌')) {
            errors.push(issue);
          } else {
            warnings.push(issue);
          }
        }
      });

      if (fileValid) validFiles++;
    });
  });

  // 📊 RELATÓRIO DE RESULTADOS
  console.log('📊 RELATÓRIO DE VALIDAÇÃO ARQUITETURAL\n');
  console.log(`Total de arquivos analisados: ${totalFiles}`);
  console.log(`Arquivos válidos: ${validFiles}`);
  console.log(`Arquivos com problemas: ${totalFiles - validFiles}\n`);
  
  // Debug: mostrar alguns arquivos analisados
  if (totalFiles > 0) {
    console.log('🔍 Últimos arquivos analisados:');
    const lastFiles = glob.sync('frontend/src/screens/**/*.tsx').slice(-3);
    lastFiles.forEach(file => console.log(`   - ${file}`));
    console.log('');
  }

  // Mostrar erros (bloqueantes)
  if (errors.length > 0) {
    console.log('🚨 ERROS CRÍTICOS (devem ser corrigidos):');
    errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.message}`);
      console.log(`   Arquivo: ${error.file}`);
      console.log(`   Sugestão: ${error.suggestion}\n`);
    });
  }

  // Mostrar warnings (recomendações)
  if (warnings.length > 0) {
    console.log('⚠️ AVISOS (recomendações):');
    warnings.forEach((warning, index) => {
      console.log(`${index + 1}. ${warning.message}`);
      console.log(`   Arquivo: ${warning.file}`);
      console.log(`   Sugestão: ${warning.suggestion}\n`);
    });
  }

  // Resultado final
  const success = errors.length === 0;
  if (success) {
    console.log('✅ VALIDAÇÃO CONCLUÍDA COM SUCESSO!');
    console.log('🎯 Arquitetura está em conformidade com o Framework de Decisão Arquitetural\n');
  } else {
    console.log('❌ VALIDAÇÃO FALHOU!');
    console.log(`🔧 Corrija os ${errors.length} erro(s) crítico(s) antes de prosseguir\n`);
  }

  return success;
}

// 🚀 EXECUÇÃO
if (require.main === module) {
  const success = validateArchitecture();
  process.exit(success ? 0 : 1);
}

module.exports = { validateArchitecture, ARCHITECTURE_RULES };
