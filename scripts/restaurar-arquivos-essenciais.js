/**
 * @fileoverview Restaurador de Arquivos Essenciais - DOM v2
 * @directory scripts
 * @description Script para restaurar arquivos essenciais do React Native Web
 * @created 2025-07-26
 * @author DOM Team v2
 * @directives Correção de Erro, React Native + React Native Web
 */

const fs = require('fs');
const path = require('path');

class RestauradorArquivosEssenciais {
  constructor() {
    this.nome = "🔧 Restaurador de Arquivos Essenciais";
    this.versao = "1.0.0";
    this.status = "CORREÇÃO";
    
    this.frontendPath = path.join(__dirname, '..', 'frontend');
    
    // Arquivos ESSENCIAIS que foram removidos incorretamente
    this.arquivosParaRestaurar = {
      webpack: {
        'webpack.config.js': `const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    hot: true,
    port: 3000,
  },
};`
      },
      web: {
        'index.web.js': `import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('DOMv2', () => App);
AppRegistry.runApplication('DOMv2', {
  rootTag: document.getElementById('root'),
});`
      },
      server: {
        'server-web-webpack.js': `const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`🚀 Servidor React Native Web rodando na porta \${PORT}\`);
  console.log(\`📱 Acesse: http://localhost:\${PORT}\`);
});`
      },
      test: {
        'test-webpack.js': `const webpack = require('webpack');
const config = require('./webpack.config.js');

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('❌ Erro no build webpack:', err || stats.toString());
    process.exit(1);
  }
  
  console.log('✅ Build webpack concluído com sucesso!');
  console.log(stats.toString({
    chunks: false,
    colors: true
  }));
});`
      }
    };
  }

  async restaurarArquivos() {
    console.log("🔧 Restaurando arquivos essenciais...");
    
    let restaurados = 0;
    let erros = 0;

    for (const [categoria, arquivos] of Object.entries(this.arquivosParaRestaurar)) {
      for (const [nomeArquivo, conteudo] of Object.entries(arquivos)) {
        try {
          const caminhoCompleto = path.join(this.frontendPath, nomeArquivo);
          
          // Verificar se o arquivo já existe
          if (fs.existsSync(caminhoCompleto)) {
            console.log(`⚠️ Arquivo já existe: ${nomeArquivo}`);
            continue;
          }
          
          // Criar diretório se necessário
          const dir = path.dirname(caminhoCompleto);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          
          // Criar arquivo
          fs.writeFileSync(caminhoCompleto, conteudo);
          console.log(`✅ Restaurado: ${nomeArquivo}`);
          restaurados++;
          
        } catch (error) {
          console.error(`❌ Erro ao restaurar ${nomeArquivo}:`, error.message);
          erros++;
        }
      }
    }

    return { restaurados, erros };
  }

  async verificarArquiteturaCompleta() {
    console.log("🔍 Verificando arquitetura React Native + React Native Web...");
    
    const verificacoes = {
      // React Native
      metro: fs.existsSync(path.join(this.frontendPath, 'metro.config.js')),
      babel: fs.existsSync(path.join(this.frontendPath, 'babel.config.js')),
      appJson: fs.existsSync(path.join(this.frontendPath, 'app.json')),
      indexJs: fs.existsSync(path.join(this.frontendPath, 'index.js')),
      packageJson: fs.existsSync(path.join(this.frontendPath, 'package.json')),
      
      // React Native Web
      webpack: fs.existsSync(path.join(this.frontendPath, 'webpack.config.js')),
      indexWeb: fs.existsSync(path.join(this.frontendPath, 'index.web.js')),
      serverWeb: fs.existsSync(path.join(this.frontendPath, 'server-web-webpack.js')),
      testWebpack: fs.existsSync(path.join(this.frontendPath, 'test-webpack.js'))
    };

    console.log("✅ Arquivos React Native:");
    Object.entries(verificacoes).slice(0, 5).forEach(([arquivo, existe]) => {
      console.log(`   ${existe ? '✅' : '❌'} ${arquivo}`);
    });

    console.log("✅ Arquivos React Native Web:");
    Object.entries(verificacoes).slice(5).forEach(([arquivo, existe]) => {
      console.log(`   ${existe ? '✅' : '❌'} ${arquivo}`);
    });

    return verificacoes;
  }

  async gerarRelatorio(resultadoRestauracao, verificacoes) {
    console.log("📊 Gerando relatório de restauração...");
    
    const relatorio = {
      timestamp: new Date().toISOString(),
      restaurador: {
        nome: this.nome,
        versao: this.versao,
        status: this.status
      },
      restauracao: resultadoRestauracao,
      arquitetura: verificacoes,
      arquiteturaCompleta: {
        reactNative: Object.values(verificacoes).slice(0, 5).every(v => v),
        reactNativeWeb: Object.values(verificacoes).slice(5).every(v => v),
        completa: Object.values(verificacoes).every(v => v)
      },
      recomendacoes: {
        restauracao: resultadoRestauracao.restaurados > 0 ? "✅ Restauração realizada com sucesso" : "ℹ️ Nenhum arquivo restaurado",
        arquitetura: Object.values(verificacoes).every(v => v) ? "✅ Arquitetura completa restaurada" : "⚠️ Alguns arquivos ainda podem estar faltando",
        proximosPassos: [
          "1. Verificar se o projeto funciona no web (npm run web)",
          "2. Verificar se o projeto funciona no mobile (npm run android)",
          "3. Configurar emulador Android Studio",
          "4. Testar telas mobile implementadas",
          "5. Continuar desenvolvimento mobile"
        ]
      }
    };

    // Salvar relatório
    const relatorioPath = path.join(__dirname, '..', 'docs', 'mobile', 'relatorio-restauracao-arquivos.json');
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
    console.log("🔧 CORREÇÃO: RESTAURANDO ARQUIVOS ESSENCIAIS");
    console.log("=" .repeat(60));
    console.log("📝 Arquitetura: React Native + React Native Web");
    console.log("=" .repeat(60));
    
    try {
      // 1. Restaurar arquivos
      const resultadoRestauracao = await this.restaurarArquivos();
      
      console.log(`\n✅ RESTAURAÇÃO CONCLUÍDA:`);
      console.log(`   Arquivos restaurados: ${resultadoRestauracao.restaurados}`);
      console.log(`   Erros: ${resultadoRestauracao.erros}`);
      
      // 2. Verificar arquitetura
      const verificacoes = await this.verificarArquiteturaCompleta();
      
      // 3. Gerar relatório
      const relatorio = await this.gerarRelatorio(resultadoRestauracao, verificacoes);
      
      console.log("\n🎯 RESTAURAÇÃO CONCLUÍDA!");
      console.log("=" .repeat(60));
      
      console.log("\n📊 RESUMO:");
      console.log(`   Arquivos restaurados: ${relatorio.restauracao.restaurados}`);
      console.log(`   Erros: ${relatorio.restauracao.erros}`);
      console.log(`   Arquitetura completa: ${relatorio.recomendacoes.arquitetura}`);
      
      console.log("\n🚀 PRÓXIMOS PASSOS:");
      relatorio.recomendacoes.proximosPassos.forEach((passo, index) => {
        console.log(`${index + 1}. ${passo}`);
      });
      
      console.log("\n💡 COMANDOS PARA TESTAR:");
      console.log("   Web: cd frontend && npm run web");
      console.log("   Mobile: cd frontend && npm run android");
      
      return relatorio;
      
    } catch (error) {
      console.error("❌ Erro na restauração:", error.message);
      throw error;
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const restaurador = new RestauradorArquivosEssenciais();
  restaurador.executar()
    .then(() => {
      console.log("\n✅ Restauração concluída com sucesso!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n❌ Erro na restauração:", error);
      process.exit(1);
    });
}

module.exports = RestauradorArquivosEssenciais; 