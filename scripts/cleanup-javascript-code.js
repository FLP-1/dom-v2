
/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Implementação de funcionalidade
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

const fs = require('fs');
const path = require('path');

/**
 * Script de Limpeza Automática de Código JavaScript Problemático
 * 
 * Este script identifica e remove automaticamente:
 * - Código JavaScript misturado com TypeScript
 * - Funções logStructured, validateType, assertCritical problemáticas
 * - Comentários JSDoc problemáticos
 * - Referências a variáveis não definidas (data, inputData, etc.)
 * 
 * Diretrizes seguidas:
 * - Pensamento Crítico: Avaliar impacto antes de implementar
 * - Qualidade: Manter código limpo e TypeScript puro
 * - Arquitetura: Seguir padrões do projeto DOM v2
 */

const FRONTEND_SRC = path.join(__dirname, '../frontend/src');
const PROBLEMATIC_PATTERNS = [
  // Funções JavaScript problemáticas
  /function logStructured\([^)]*\)\s*\{[\s\S]*?\}/g,
  /function validateType\([^)]*\)\s*\{[\s\S]*?\}/g,
  /function assertCritical\([^)]*\)\s*\{[\s\S]*?\}/g,
  /function handleError\([^)]*\)\s*\{[\s\S]*?\}/g,
  
  // Comentários JSDoc problemáticos
  /\/\*\*[\s\S]*?@alternatives[\s\S]*?\*\//g,
  /\/\*\*[\s\S]*?@decision[\s\S]*?\*\//g,
  /\/\*\*[\s\S]*?@trade-offs[\s\S]*?\*\//g,
  /\/\*\*[\s\S]*?@references[\s\S]*?\*\//g,
  /\/\*\*[\s\S]*?@considerations[\s\S]*?\*\//g,
  
  // Chamadas problemáticas
  /logStructured\([^)]*\);/g,
  /validateType\([^)]*\);/g,
  /assertCritical\([^)]*\);/g,
  /handleError\([^)]*\);/g,
  
  // Referências a variáveis não definidas
  /if\s*\(\s*!validateInput\(inputData\)\s*\)/g,
  /if\s*\(\s*!validateType\(data[^)]*\)\s*\)/g,
  /assertCritical\(data[^)]*\)/g,
  
  // Imports problemáticos
  /import\s*\{\s*logStructured\s*\}\s*from\s*['"][^'"]*logging['"];?/g,
];

function cleanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let cleanedContent = content;
    let changes = 0;
    
    // Aplicar padrões de limpeza
    PROBLEMATIC_PATTERNS.forEach((pattern, index) => {
      const matches = cleanedContent.match(pattern);
      if (matches) {
        cleanedContent = cleanedContent.replace(pattern, '');
        changes += matches.length;
        console.log(`  - Removido ${matches.length} ocorrência(s) do padrão ${index + 1}`);
      }
    });
    
    // Remover linhas vazias excessivas
    cleanedContent = cleanedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    if (changes > 0) {
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`✅ ${filePath} - ${changes} correções aplicadas`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let totalFiles = 0;
  let modifiedFiles = 0;
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      const result = processDirectory(filePath);
      totalFiles += result.totalFiles;
      modifiedFiles += result.modifiedFiles;
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      totalFiles++;
      if (cleanFile(filePath)) {
        modifiedFiles++;
      }
    }
  });
  
  return { totalFiles, modifiedFiles };
}

// Executar limpeza
console.log('🧹 Iniciando limpeza automática de código JavaScript problemático...\n');

const result = processDirectory(FRONTEND_SRC);

console.log(`\n📊 Resumo da Limpeza:`);
console.log(`   - Arquivos processados: ${result.totalFiles}`);
console.log(`   - Arquivos modificados: ${result.modifiedFiles}`);
console.log(`   - Taxa de correção: ${((result.modifiedFiles / result.totalFiles) * 100).toFixed(1)}%`);

if (result.modifiedFiles > 0) {
  console.log(`\n✅ Limpeza concluída! Execute 'npm start' para testar.`);
} else {
  console.log(`\nℹ️  Nenhum arquivo precisou de correção.`);
}
