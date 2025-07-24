/**
 * @fileoverview Servidor web robusto para React Native Web DOM v2
 * @description Servidor com keep-alive, health checks e reinicialização automática
 * @created 2024-12-19
 * @author DOM Team v2
 */

const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para keep-alive
app.use((req, res, next) => {
  res.set('Connection', 'keep-alive');
  res.set('Keep-Alive', 'timeout=5, max=1000');
  next();
});

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'frontend-web',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Servir arquivos estáticos com cache
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1h',
  etag: true,
  lastModified: true
}));

// Rota principal com fallback robusto
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  
  // Verificar se o arquivo existe
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback simples
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>DOM v2 - Carregando...</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .loading { color: #666; }
          </style>
        </head>
        <body>
          <h1>DOM v2</h1>
          <p class="loading">Carregando aplicação...</p>
          <script>
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          </script>
        </body>
      </html>
    `);
  }
});

// Proxy inteligente para Metro bundler
app.get('/index.bundle', (req, res) => {
  const metroUrl = 'http://localhost:8081/index.bundle?platform=web&dev=true';
  
  // Verificar se Metro está disponível
  const http = require('http');
  const checkMetro = http.get('http://localhost:8081/status', (metroRes) => {
    if (metroRes.statusCode === 200) {
      res.redirect(metroUrl);
    } else {
      res.status(503).json({ error: 'Metro bundler não disponível' });
    }
  });
  
  checkMetro.on('error', () => {
    res.status(503).json({ error: 'Metro bundler não disponível' });
  });
  
  checkMetro.setTimeout(2000);
});

// Rota para verificar status do Metro
app.get('/metro-status', (req, res) => {
  const http = require('http');
  const checkMetro = http.get('http://localhost:8081/status', (metroRes) => {
    res.json({ metro: 'running', status: metroRes.statusCode });
  });
  
  checkMetro.on('error', () => {
    res.json({ metro: 'stopped', status: 'error' });
  });
  
  checkMetro.setTimeout(2000);
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor web:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Criar servidor HTTP com configurações robustas
const server = http.createServer(app);

// Configurações de timeout
server.keepAliveTimeout = 65000; // 65 segundos
server.headersTimeout = 66000;   // 66 segundos

// Event listeners para estabilidade
server.on('error', (err) => {
  console.error('Erro no servidor HTTP:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Porta ${PORT} já está em uso`);
    process.exit(1);
  }
});

server.on('connection', (socket) => {
  // Configurar keep-alive no socket
  socket.setKeepAlive(true, 60000);
  socket.setTimeout(30000);
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`🌐 Servidor web robusto rodando em http://localhost:${PORT}`);
  console.log(`📱 React Native Web disponível`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Metro status: http://localhost:${PORT}/metro-status`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Recebido SIGTERM, encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado graciosamente');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Recebido SIGINT, encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado graciosamente');
    process.exit(0);
  });
});

// Monitoramento de memória
setInterval(() => {
  const memUsage = process.memoryUsage();
  if (memUsage.heapUsed > 100 * 1024 * 1024) { // 100MB
    console.warn('⚠️ Uso de memória alto:', Math.round(memUsage.heapUsed / 1024 / 1024), 'MB');
  }
}, 30000); // A cada 30 segundos 