const fs = require('fs');
const path = require('path');

// Lista de arquivos com problemas específicos
const problematicFiles = [
  'src/utils/validation.ts',
  'src/utils/messages-system.ts',
  'src/utils/regional-adaptation.ts',
  'src/utils/simple-notifications.ts',
  'src/utils/turbo-module-mock.ts',
  'src/utils/user-profiles.ts'
];

// Função para corrigir problemas específicos
function fixSpecificErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Corrigir console.log com template literals mal formatados
    content = content.replace(
      /console\.log\(`\[(\$\{[^}]+\})\] \[(\$\{[^}]+\})\] (\$\{[^}]+\})`, data \|\| ''\);/g,
      'console.log(`[$1] [$2] $3`, data || \'\');'
    );
    
    // Corrigir throw new Error com template literals mal formatados
    content = content.replace(
      /throw new Error\(`Assertion failed: (\$\{[^}]+\})`\);/g,
      'throw new Error(`Assertion failed: $1`);'
    );
    
    // Corrigir comentários mal formatados no final dos arquivos
    content = content.replace(
      /Referências externas:\s*\n\s*\*\s*-\s*([^*]+)\s*\*\//g,
      'Referências externas:\n * - $1\n */'
    );
    
    // Corrigir comentários que começam com /**
    content = content.replace(
      /\*\*\s*\n\s*\*\s*\n\s*\*\s*Alternativas consideradas:/g,
      '/**\n * Alternativas consideradas:'
    );
    
    // Remover comentários mal formatados no final
    content = content.replace(
      /\*\s*Referências externas:\s*\n\s*\*\s*-\s*([^*]+)\s*\*\//g,
      ' * Referências externas:\n * - $1\n */'
    );
    
    // Corrigir strings mal fechadas
    content = content.replace(
      /(\$\{[^}]+\})\]\s*\[(\$\{[^}]+\})\] (\$\{[^}]+\})/g,
      '$1] [$2] $3'
    );
    
    // Se o conteúdo mudou, salvar
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Corrigido: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

// Processar arquivos específicos
console.log('🔧 Corrigindo erros específicos de TypeScript...');
let fixedCount = 0;

for (const file of problematicFiles) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    if (fixSpecificErrors(filePath)) {
      fixedCount++;
    }
  } else {
    console.log(`⚠️ Arquivo não encontrado: ${file}`);
  }
}

console.log(`\n✅ Correção concluída! ${fixedCount} arquivos corrigidos.`); 