const fs = require('fs');
const path = require('path');

function corrigirArquivo(caminhoArquivo) {
  try {
    let conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
    let modificado = false;

    // Remover validações problemáticas
    const padroes = [
      /if \(!validateType\(data, 'object'\)\) \{\s*\}/g,
      /assertCritical\(typeof data === 'object', 'Dados devem ser um objeto'\);/g,
      /if \(!validateInput\(inputData\)\) \{\s*\}/g,
      /function logStructured\(level, message, data = \{\}\) \{[\s\S]*?\}/g,
      /function assertCritical\(condition, message = 'Assertion failed'\) \{[\s\S]*?\}/g,
      /function validateInput\(data\) \{[\s\S]*?\}/g,
      /function validateType\(value, expectedType\) \{[\s\S]*?\}/g
    ];

    padroes.forEach((padrao, index) => {
      if (padrao.test(conteudo)) {
        if (index === 0) {
          conteudo = conteudo.replace(padrao, '// Validação de tipos removida - causava erro de referência');
        } else if (index === 1) {
          conteudo = conteudo.replace(padrao, '// Validação crítica removida - causava erro de referência');
        } else if (index === 2) {
          conteudo = conteudo.replace(padrao, '// Validação de input removida - causava erro de referência');
        } else {
          conteudo = conteudo.replace(padrao, '// Função removida - causava erros de referência no frontend');
        }
        modificado = true;
      }
    });

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

console.log('🔧 Iniciando correção de erros "data is not defined"...');
processarDiretorio('frontend/src');
console.log('✅ Correção concluída!');
