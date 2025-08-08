import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas básicas
app.get('/', (req, res) => {
  res.json({ 
    message: 'DOM v2 Backend funcionando!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'DOM v2 Backend',
    version: '2.0.0'
  });
});

// Simular dados para o frontend
app.get('/api/dashboard', (req, res) => {
  res.json({
    users: 150,
    tasks: 45,
    revenue: 125000,
    notifications: 8
  });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com', role: 'admin' },
    { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com', role: 'user' },
    { id: 3, name: 'Pedro Costa', email: 'pedro@exemplo.com', role: 'user' }
  ]);
});

// Login simples
app.post('/api/auth/login', (req, res) => {
  const { cpf, password } = req.body;
  
  if (!cpf || !password) {
    return res.status(400).json({
      error: 'CPF e senha são obrigatórios',
      code: 'MISSING_FIELDS'
    });
  }
  
  if (password !== '123456') {
    return res.status(401).json({
      error: 'Senha incorreta (use: 123456)',
      code: 'INVALID_PASSWORD'
    });
  }
  
  res.json({
    success: true,
    user: {
      id: 'user-123',
      email: `${cpf}@exemplo.com`,
      profile: 'USER',
      cpf: cpf
    },
    message: 'Login realizado com sucesso'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor DOM v2 rodando na porta ${PORT}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
}); 