const fs = require('fs');
const path = require('path');

// Função para corrigir erros de sintaxe em um arquivo
function fixSyntaxErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Corrigir template strings malformadas
    const templateStringRegex = /throw new Error\(`Assertion failed: \$\{message\}([^`]*?)`\);/g;
    const matches = content.match(templateStringRegex);
    
    if (matches) {
      content = content.replace(templateStringRegex, 'throw new Error(`Assertion failed: ${message}`);');
      modified = true;
    }

    // Corrigir comentários malformados que estão sendo interpretados como código
    const commentRegex = /\/\*\*[\s\S]*?\*\//g;
    const commentMatches = content.match(commentRegex);
    
    if (commentMatches) {
      // Remover comentários que estão causando problemas
      content = content.replace(/\/\*\*[\s\S]*?\*\//g, '');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Corrigido: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Erro ao corrigir ${filePath}:`, error.message);
  }
}

// Função para encontrar todos os arquivos .tsx
function findTsxFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scanDirectory(fullPath);
      } else if (item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

// Executar correções
console.log('🔧 Corrigindo erros de sintaxe...');
const tsxFiles = findTsxFiles('./src');
console.log(`📁 Encontrados ${tsxFiles.length} arquivos .tsx`);

for (const file of tsxFiles) {
  fixSyntaxErrors(file);
}

console.log('✅ Correção concluída!'); 