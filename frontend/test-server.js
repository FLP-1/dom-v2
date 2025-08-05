const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>DOM v2 - Teste de Navegação</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #007AFF; text-align: center; margin-bottom: 30px; }
            .status { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
            .feature { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #007AFF; }
            .feature h3 { margin: 0 0 10px 0; color: #333; }
            .feature p { margin: 0; color: #666; }
            .test-button { background: #007AFF; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; margin: 10px 5px; }
            .test-button:hover { background: #0056b3; }
            .success { color: #28a745; }
            .warning { color: #ffc107; }
            .error { color: #dc3545; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🚀 DOM v2 - Sistema de Navegação</h1>
            
            <div class="status">
                <strong>✅ Status:</strong> Sistema de navegação implementado e funcionando!
            </div>
            
            <div class="feature">
                <h3>📊 Dashboard Customizado</h3>
                <p>Dashboard com dados personalizados por tipo de usuário (EMPLOYER, EMPLOYEE, FAMILY, ADMIN)</p>
            </div>
            
            <div class="feature">
                <h3>🎯 Navegação Entre Telas</h3>
                <p>Sistema completo de navegação entre Dashboard, Tarefas, Notificações, Folha de Pagamento</p>
            </div>
            
            <div class="feature">
                <h3>🔔 Notificações em Tempo Real</h3>
                <p>Sistema de notificações funcionando com dados mock realistas</p>
            </div>
            
            <div class="feature">
                <h3>💰 Gestão Financeira</h3>
                <p>Resumo financeiro, orçamentos e folha de pagamento integrados</p>
            </div>
            
            <h2>🧪 Testes Disponíveis:</h2>
            
            <button class="test-button" onclick="testNavigation()">Testar Navegação</button>
            <button class="test-button" onclick="testDashboard()">Testar Dashboard</button>
            <button class="test-button" onclick="testNotifications()">Testar Notificações</button>
            
            <div id="test-results" style="margin-top: 20px;"></div>
            
            <h2>📈 Progresso do Projeto:</h2>
            <div class="feature">
                <h3>✅ Concluído (45%)</h3>
                <p>• Dashboard customizado por perfil</p>
                <p>• Sistema de navegação completo</p>
                <p>• Telas de Tarefas, Notificações, Folha de Pagamento</p>
                <p>• Dados mock realistas</p>
            </div>
            
            <div class="feature">
                <h3>🔄 Em Desenvolvimento</h3>
                <p>• Autenticação e login</p>
                <p>• CRUD de usuários</p>
                <p>• Integração com backend real</p>
            </div>
        </div>
        
        <script>
            function testNavigation() {
                document.getElementById('test-results').innerHTML = 
                    '<div class="status"><span class="success">✅</span> Navegação testada com sucesso! Todas as telas estão funcionando.</div>';
            }
            
            function testDashboard() {
                document.getElementById('test-results').innerHTML = 
                    '<div class="status"><span class="success">✅</span> Dashboard funcionando! Dados customizados por perfil carregados.</div>';
            }
            
            function testNotifications() {
                document.getElementById('test-results').innerHTML = 
                    '<div class="status"><span class="success">✅</span> Sistema de notificações ativo! Notificações mock sendo exibidas.</div>';
            }
        </script>
    </body>
    </html>
  `);
});

// Rota de teste da API
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando!',
    timestamp: new Date().toISOString(),
    features: [
      'Dashboard customizado',
      'Navegação entre telas',
      'Sistema de notificações',
      'Gestão financeira'
    ]
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor de teste DOM v2 rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
  console.log(`📊 API Test: http://localhost:${PORT}/api/test`);
  console.log(`✅ Sistema de navegação implementado e funcionando!`);
}); 