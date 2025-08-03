/**
 * @fileoverview Limpador de Arquivos Desnecessários - DOM v2
 * @directory scripts
 * @description Script para remover arquivos JavaScript não relacionados ao React Native
 * @created 2025-07-26
 * @author DOM Team v2
 * @directives Pensamento Crítico, Limpeza Rigorosa, Foco React Native
 */

const fs = require('fs');
const path = require('path');

class LimpadorArquivosDesnecessarios {
  constructor() {
    this.nome = "🧹 Limpador de Arquivos Desnecessários";
    this.versao = "1.0.0";
    this.status = "ATIVO";
    
    this.frontendPath = path.join(__dirname, '..', 'frontend');
    
    // Arquivos que NÃO fazem parte do React Native
    this.arquivosParaRemover = {
      servidores: [
        'server-simple-web.js',
        'server-web-webpack.js',
        'server-simple.js'
      ],
      webpack: [
        'webpack.config.js',
        'test-webpack.js'
      ],
      web: [
        'index.web.js',
        'src/index.web.js'
      ],
      testes: [
        'App-test.tsx'
      ],
      duplicados: [
        'prettierrc.js',
        'eslintrc.js'
      ],
      pastas: [
        'DOMv2Mobile'
      ]
    };

    // Arquivos que DEVEM permanecer (React Native)
    this.arquivosEssenciais = [
      'package.json',
      'package-lock.json',
      'metro.config.js',
      'babel.config.js',
      'app.json',
      'index.js',
      'App.tsx',
      'tsconfig.json',
      'jest.config.js',
      '.eslintrc.js',
      '.prettierrc.js',
      '.gitignore',
      'README.md',
      'watchmanconfig',
      'Gemfile'
    ];
  }

  async analisarArquivos() {
    console.log("🔍 Analisando arquivos do projeto...");
    
    const arquivosEncontrados = {
      paraRemover: [],
      essenciais: [],
      outros: []
    };

    // Verificar arquivos na raiz do frontend
    const arquivosRaiz = fs.readdirSync(this.frontendPath);
    
    for (const arquivo of arquivosRaiz) {
      const caminhoCompleto = path.join(this.frontendPath, arquivo);
      const stats = fs.statSync(caminhoCompleto);
      
      if (stats.isFile()) {
        if (this.arquivosParaRemover.servidores.includes(arquivo) ||
            this.arquivosParaRemover.webpack.includes(arquivo) ||
            this.arquivosParaRemover.web.includes(arquivo) ||
            this.arquivosParaRemover.testes.includes(arquivo) || // Corrected typo from 'teste' to 'testes'
            this.arquivosParaRemover.duplicados.includes(arquivo)) {
          arquivosEncontrados.paraRemover.push(arquivo);
        } else if (this.arquivosEssenciais.includes(arquivo)) {
          arquivosEncontrados.essenciais.push(arquivo);
        } else {
          arquivosEncontrados.outros.push(arquivo);
        }
      } else if (stats.isDirectory()) {
        if (this.arquivosParaRemover.pastas.includes(arquivo)) {
          arquivosEncontrados.paraRemover.push(arquivo + '/');
        }
      }
    }

    // Verificar arquivos em src/
    const srcPath = path.join(this.frontendPath, 'src');
    if (fs.existsSync(srcPath)) {
      const arquivosSrc = fs.readdirSync(srcPath);
      
      for (const arquivo of arquivosSrc) {
        const caminhoCompleto = path.join(srcPath, arquivo);
        const stats = fs.statSync(caminhoCompleto);
        
        if (stats.isFile()) {
          if (this.arquivosParaRemover.web.includes('src/' + arquivo) ||
              this.arquivosParaRemover.testes.includes(arquivo)) { // Corrected typo from 'teste' to 'testes'
            arquivosEncontrados.paraRemover.push('src/' + arquivo);
          }
        }
      }
    }

    return arquivosEncontrados;
  }

  async removerArquivos(arquivos) {
    console.log("🗑️ Removendo arquivos desnecessários...");
    
    let removidos = 0;
    let erros = 0;

    for (const arquivo of arquivos) {
      try {
        const caminhoCompleto = path.join(this.frontendPath, arquivo);
        
        if (fs.existsSync(caminhoCompleto)) {
          if (arquivo.endsWith('/')) {
            // É uma pasta
            fs.rmSync(caminhoCompleto, { recursive: true, force: true });
            console.log(`✅ Removida pasta: ${arquivo}`);
          } else {
            // É um arquivo
            fs.unlinkSync(caminhoCompleto);
            console.log(`✅ Removido arquivo: ${arquivo}`);
          }
          removidos++;
        }
      } catch (error) {
        console.error(`❌ Erro ao remover ${arquivo}:`, error.message);
        erros++;
      }
    }

    return { removidos, erros };
  }

  async verificarArquiteturaReactNative() {
    console.log("📱 Verificando arquitetura React Native...");
    
    const verificacoes = {
      metro: fs.existsSync(path.join(this.frontendPath, 'metro.config.js')),
      babel: fs.existsSync(path.join(this.frontendPath, 'babel.config.js')),
      appJson: fs.existsSync(path.join(this.frontendPath, 'app.json')),
      indexJs: fs.existsSync(path.join(this.frontendPath, 'index.js')),
      packageJson: fs.existsSync(path.join(this.frontendPath, 'package.json'))
    };

    const arquivosReactNative = Object.entries(verificacoes).filter(([_, existe]) => existe);
    const arquivosFaltando = Object.entries(verificacoes).filter(([_, existe]) => !existe);

    console.log("✅ Arquivos React Native encontrados:");
    arquivosReactNative.forEach(([arquivo, _]) => {
      console.log(`   - ${arquivo}`);
    });

    if (arquivosFaltando.length > 0) {
      console.log("❌ Arquivos React Native faltando:");
      arquivosFaltando.forEach(([arquivo, _]) => {
        console.log(`   - ${arquivo}`);
      });
    }

    return verificacoes;
  }

  async gerarRelatorio(arquivosEncontrados, resultadoRemocao, verificacoes) {
    console.log("📊 Gerando relatório de limpeza...");
    
    const relatorio = {
      timestamp: new Date().toISOString(),
      limpador: {
        nome: this.nome,
        versao: this.versao,
        status: this.status
      },
      analise: {
        arquivosParaRemover: arquivosEncontrados.paraRemover,
        arquivosEssenciais: arquivosEncontrados.essenciais,
        outrosArquivos: arquivosEncontrados.outros
      },
      remocao: resultadoRemocao,
      arquitetura: verificacoes,
      recomendacoes: {
        arquivosRemovidos: resultadoRemocao.removidos > 0 ? "✅ Limpeza realizada com sucesso" : "ℹ️ Nenhum arquivo removido",
        arquiteturaReactNative: Object.values(verificacoes).every(v => v) ? "✅ Arquitetura React Native intacta" : "⚠️ Alguns arquivos React Native podem estar faltando",
        proximosPassos: [
          "1. Verificar se o projeto ainda funciona",
          "2. Testar build do React Native",
          "3. Configurar emulador Android",
          "4. Implementar funcionalidades mobile"
        ]
      }
    };

    // Salvar relatório
    const relatorioPath = path.join(__dirname, '..', 'docs', 'mobile', 'relatorio-limpeza-arquivos.json');
    const relatorioDir = path.dirname(relatorioPath);
    
    if (!fs.existsSync(relatorioDir)) {
      fs.mkdirSync(relatorioDir, { recursive: true });
    }
    
    fs.writeFileSync(relatorioPath, JSON.stringify(relatorio, null, 2));
    
    console.log("✅ Relatório salvo em:", relatorioPath);
    return relatorio;
  }

  async executar() {
    console.log(`🚀 ${this.nome} v${this.versao}`);
    console.log("=" .repeat(60));
    console.log("🎯 LIMPEZA RIGOROSA DE ARQUIVOS DESNECESSÁRIOS");
    console.log("=" .repeat(60));
    
    try {
      // 1. Analisar arquivos
      const arquivosEncontrados = await this.analisarArquivos();
      
      console.log("\n📋 ANÁLISE DOS ARQUIVOS:");
      console.log(`   Arquivos para remover: ${arquivosEncontrados.paraRemover.length}`);
      console.log(`   Arquivos essenciais: ${arquivosEncontrados.essenciais.length}`);
      console.log(`   Outros arquivos: ${arquivosEncontrados.outros.length}`);
      
      if (arquivosEncontrados.paraRemover.length > 0) {
        console.log("\n🗑️ ARQUIVOS PARA REMOVER:");
        arquivosEncontrados.paraRemover.forEach(arquivo => {
          console.log(`   - ${arquivo}`);
        });
        
        // 2. Remover arquivos
        const resultadoRemocao = await this.removerArquivos(arquivosEncontrados.paraRemover);
        
        console.log(`\n✅ REMOÇÃO CONCLUÍDA:`);
        console.log(`   Arquivos removidos: ${resultadoRemocao.removidos}`);
        console.log(`   Erros: ${resultadoRemocao.erros}`);
      } else {
        console.log("\n✅ Nenhum arquivo desnecessário encontrado!");
      }
      
      // 3. Verificar arquitetura
      const verificacoes = await this.verificarArquiteturaReactNative();
      
      // 4. Gerar relatório
      const resultadoRemocao = arquivosEncontrados.paraRemover.length > 0 
        ? await this.removerArquivos(arquivosEncontrados.paraRemover)
        : { removidos: 0, erros: 0 };
        
      const relatorio = await this.gerarRelatorio(
        arquivosEncontrados, 
        resultadoRemocao, 
        verificacoes
      );
      
      console.log("\n🎯 LIMPEZA CONCLUÍDA!");
      console.log("=" .repeat(60));
      
      console.log("\n📊 RESUMO:");
      console.log(`   Arquivos removidos: ${relatorio.remocao.removidos}`);
      console.log(`   Erros: ${relatorio.remocao.erros}`);
      console.log(`   Arquitetura React Native: ${relatorio.recomendacoes.arquiteturaReactNative}`);
      
      console.log("\n🚀 PRÓXIMOS PASSOS:");
      relatorio.recomendacoes.proximosPassos.forEach((passo, index) => {
        console.log(`${index + 1}. ${passo}`);
      });
      
      return relatorio;
      
    } catch (error) {
      console.error("❌ Erro na limpeza:", error.message);
      throw error;
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const limpador = new LimpadorArquivosDesnecessarios();
  limpador.executar()
    .then(() => {
      console.log("\n✅ Limpeza concluída com sucesso!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Erro na limpeza:", error);
      process.exit(1);
    });
}

module.exports = LimpadorArquivosDesnecessarios; 