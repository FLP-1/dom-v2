const fs = require('fs');
const path = require('path');

/**
 * Script para limpar erros de encoding nos arquivos do frontend
 * Remove linhas problemáticas que contêm caracteres inválidos
 */

const frontendSrcPath = path.join(__dirname, '..', 'frontend', 'src');

function cleanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Filtrar linhas que contêm caracteres problemáticos
    const cleanedLines = lines.filter(line => {
      // Remover linhas que contêm caracteres de encoding problemáticos
      if (line.includes('Teste criado:') || 
          line.includes('frontend\\') ||
          line.includes('backend\\') ||
          line.match(/[^\x00-\x7F]/)) {
        return false;
      }
      return true;
    });
    
    // Remover linhas vazias no final
    while (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1].trim() === '') {
      cleanedLines.pop();
    }
    
    const cleanedContent = cleanedLines.join('\n');
    
    if (cleanedContent !== content) {
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`✅ Limpo: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  let cleanedCount = 0;
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      cleanedCount += processDirectory(fullPath);
    } else if (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx')) {
      if (cleanFile(fullPath)) {
        cleanedCount++;
      }
    }
  }
  
  return cleanedCount;
}

console.log('🧹 Iniciando limpeza de erros de encoding no frontend...');
const cleanedFiles = processDirectory(frontendSrcPath);
console.log(`✅ Limpeza concluída! ${cleanedFiles} arquivos foram limpos.`);
