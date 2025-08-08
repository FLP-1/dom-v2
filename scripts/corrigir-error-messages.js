const fs = require('fs');
const path = require('path');

function corrigirArquivo(caminhoArquivo) {
  try {
    let conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
    let modificado = false;

    // Corrigir ERROR_MESSAGES para MESSAGES
    if (conteudo.includes('ERROR_MESSAGES')) {
      conteudo = conteudo.replace(/ERROR_MESSAGES\.NETWORK_ERROR/g, 'MESSAGES.ERROR');
      modificado = true;
    }

    if (modificado) {
      fs.writeFileSync(caminhoArquivo, conteudo, 'utf8');
      console.log(`✅ Corrigido: ${caminhoArquivo}`);
    }
  } catch (erro) {
    console.error(`❌ Erro ao corrigir ${caminhoArquivo}:`, erro.message);
  }
}

function processarDiretorio(diretorio) {
  const arquivos = fs.readdirSync(diretorio);
  
  arquivos.forEach(arquivo => {
    const caminhoCompleto = path.join(diretorio, arquivo);
    const stat = fs.statSync(caminhoCompleto);
    
    if (stat.isDirectory()) {
      processarDiretorio(caminhoCompleto);
    } else if (arquivo.endsWith('.ts') || arquivo.endsWith('.tsx')) {
      corrigirArquivo(caminhoCompleto);
    }
  });
}

console.log('🔧 Corrigindo referências ERROR_MESSAGES...');
processarDiretorio('frontend/src');
console.log('✅ Correção concluída!');
