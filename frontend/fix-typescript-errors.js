const fs = require('fs');
const path = require('path');

// Função para corrigir comentários mal formatados
function fixCommentBlocks(content) {
  // Corrigir comentários que começam com /**
  content = content.replace(
    /\*\*\s*\n\s*\*\s*\n\s*\*\s*Alternativas consideradas:/g,
    '/**\n * Alternativas consideradas:'
  );
  
  // Corrigir comentários que terminam mal
  content = content.replace(
    /\*\s*Referências externas:\s*\n\s*\*\s*-\s*([^*]+)\s*\*\//g,
    ' * Referências externas:\n * - $1\n */'
  );
  
  // Corrigir comentários com regex literals mal fechados
  content = content.replace(
    /\*\//g,
    ' */'
  );
  
  return content;
}

// Função para corrigir template literals mal fechados
function fixTemplateLiterals(content) {
  // Corrigir template literals em console.log
  content = content.replace(
    /console\.log\(`\[(\$\{[^}]+\})\] \[(\$\{[^}]+\})\] (\$\{[^}]+\})`,/g,
    'console.log(`[$1] [$2] $3`,'
  );
  
  // Corrigir template literals em throw new Error
  content = content.replace(
    /throw new Error\(`([^`]+)`\);/g,
    'throw new Error(`$1`);'
  );
  
  return content;
}

// Função para corrigir strings mal fechadas
function fixStringLiterals(content) {
  // Corrigir strings que terminam com }] em vez de }
  content = content.replace(
    /(\$\{[^}]+\})\]\s*\[(\$\{[^}]+\})\] (\$\{[^}]+\})/g,
    '$1] [$2] $3'
  );
  
  return content;
}

// Função para processar um arquivo
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let fixedContent = content;
    
    // Aplicar correções
    fixedContent = fixCommentBlocks(fixedContent);
    fixedContent = fixTemplateLiterals(fixedContent);
    fixedContent = fixStringLiterals(fixedContent);
    
    // Se o conteúdo mudou, salvar o arquivo
    if (fixedContent !== content) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Corrigido: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

// Função para processar diretório recursivamente
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let fixedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixedCount += processDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      if (processFile(filePath)) {
        fixedCount++;
      }
    }
  }
  
  return fixedCount;
}

// Executar correções
console.log('🔧 Iniciando correção de erros de TypeScript...');
const srcPath = path.join(__dirname, 'src');
const fixedCount = processDirectory(srcPath);
console.log(`\n✅ Correção concluída! ${fixedCount} arquivos corrigidos.`); 