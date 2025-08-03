#!/usr/bin/env node

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_PATH = path.join(__dirname, '../dist');

// Verificar se a pasta dist existe
if (!fs.existsSync(DIST_PATH)) {
  console.error('❌ Pasta dist não encontrada!');
  console.log('💡 Execute primeiro: npm run build');
  process.exit(1);
}

// Servir arquivos estáticos
app.use(express.static(DIST_PATH));

// SPA fallback - todas as rotas vão para index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(PORT, () => {
  console.log('🚀 Servidor de produção DOM v2 iniciado!');
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
  console.log('📁 Servindo arquivos de:', DIST_PATH);
  
  // Listar arquivos servidos
  const files = fs.readdirSync(DIST_PATH);
  console.log('\n📄 Arquivos disponíveis:');
  files.forEach(file => {
    const filePath = path.join(DIST_PATH, file);
    const stats = fs.statSync(filePath);
    console.log(`  - ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
  
  console.log('\n✅ Servidor pronto para produção!');
}); 