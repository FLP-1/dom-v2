#!/usr/bin/env node

const webpack = require('webpack');
const config = require('../webpack.config.js');
const path = require('path');
const fs = require('fs');

const buildConfig = config({}, { mode: 'production' });

console.log('🏗️ Iniciando build de produção DOM v2...');
console.log('📦 React Native Web com Webpack');
console.log('🎯 Modo: Produção');

const compiler = webpack(buildConfig);

compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('❌ Erro durante o build:');
    if (err) {
      console.error(err);
    }
    if (stats.hasErrors()) {
      console.error(stats.toString({
        colors: true,
        chunks: false,
        children: false
      }));
    }
    process.exit(1);
  }

  console.log('✅ Build concluído com sucesso!');
  console.log('📁 Arquivos gerados em:', path.resolve(__dirname, '../dist'));
  
  // Mostrar estatísticas do build
  console.log('\n📊 Estatísticas do Build:');
  console.log(stats.toString({
    colors: true,
    chunks: false,
    children: false,
    modules: false
  }));

  // Verificar se os arquivos foram gerados
  const distPath = path.resolve(__dirname, '../dist');
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    console.log('\n📄 Arquivos gerados:');
    files.forEach(file => {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);
      console.log(`  - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    });
  }

  console.log('\n🚀 Para servir os arquivos de produção:');
  console.log('   npm run serve:prod');
}); 