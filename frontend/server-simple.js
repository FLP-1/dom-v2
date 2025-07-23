const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proxy para Metro bundler
app.get('/index.bundle', (req, res) => {
  res.redirect('http://localhost:8081/index.bundle?platform=web&dev=true');
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor web rodando em http://localhost:${PORT}`);
  console.log(`📱 React Native Web disponível`);
}); 