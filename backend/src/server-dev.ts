// Servidor de desenvolvimento DOM v2 - TypeScript
// Seguindo as diretrizes do projeto e melhores práticas

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware básico
app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`📨 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Endpoint de saúde
app.get('/health', (req: Request, res: Response) => {
  console.log('🏥 Health check solicitado');
  res.json({
    status: 'ok',
    version: '2.0.0',
    message: 'DOM v2 - Servidor de Desenvolvimento TypeScript',
    database: 'none',
    features: 'basic'
  });
});

// Endpoint de teste
app.get('/api/test', (req: Request, res: Response) => {
  console.log('🧪 Teste solicitado');
  res.json({
    message: 'API DOM v2 funcionando',
    database: 'none',
    timestamp: new Date().toISOString()
  });
});

// Endpoint de login SIMPLES
app.post('/api/auth/login', (req: Request, res: Response) => {
  console.log('🔐 Login solicitado');
  const { cpf, password } = req.body;

  console.log('🔐 Tentativa de login:', { cpf, password });

  // Validações básicas
  if (!cpf || !password) {
    console.log('❌ Campos obrigatórios faltando');
    return res.status(400).json({
      error: 'CPF e senha são obrigatórios',
      code: 'MISSING_FIELDS'
    });
  }

  // Para MVP: aceitar qualquer CPF válido e senha 123456
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) {
    console.log('❌ CPF inválido:', cpf);
    return res.status(400).json({
      error: 'CPF deve ter 11 dígitos',
      code: 'INVALID_CPF'
    });
  }

  if (password !== '123456') {
    console.log('❌ Senha incorreta');
    return res.status(401).json({
      error: 'Senha incorreta (use: 123456)',
      code: 'INVALID_PASSWORD'
    });
  }

  console.log('✅ Login realizado com sucesso (modo desenvolvimento)');

  // Retornar dados simulados
  res.json({
    success: true,
    user: {
      id: 'dev-user-123',
      name: 'Usuário Desenvolvimento',
      email: `${cleanCPF}@dev.com`,
      profile: 'USER',
      cpf: cleanCPF
    },
    organizations: [{
      id: 'dev-org-123',
      name: 'Organização Desenvolvimento',
      type: 'user',
      role: 'user'
    }],
    message: 'Login realizado com sucesso (modo desenvolvimento)'
  });
});

// Endpoints simulados para desenvolvimento
app.get('/api/budgets', (req: Request, res: Response) => {
  res.json({
    budgets: [
      { id: 1, name: 'Orçamento Teste', amount: 10000 }
    ]
  });
});

app.get('/api/payroll', (req: Request, res: Response) => {
  res.json({
    payroll: [
      { id: 1, employee: 'João Silva', salary: 3000 }
    ]
  });
});

app.get('/api/employees', (req: Request, res: Response) => {
  res.json({
    employees: [
      { id: 1, name: 'João Silva', position: 'Desenvolvedor' }
    ]
  });
});

// Middleware de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Erro no servidor:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    code: 'INTERNAL_ERROR'
  });
});

// Rota 404
app.use('*', (req: Request, res: Response) => {
  console.log('❌ Rota não encontrada:', req.originalUrl);
  res.status(404).json({
    error: 'Rota não encontrada',
    code: 'NOT_FOUND'
  });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor de desenvolvimento TypeScript rodando na porta ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth/login`);
  console.log(`💰 Budget API: http://localhost:${PORT}/api/budgets`);
  console.log(`💼 Payroll API: http://localhost:${PORT}/api/payroll`);
  console.log(`👥 Employees API: http://localhost:${PORT}/api/employees`);
  console.log(`⏹️  Para parar: Ctrl+C`);
});

// Manter servidor ativo
process.on('SIGINT', () => {
  console.log('\n🛑 Parando servidor...');
  server.close(() => {
    console.log('✅ Servidor parado');
    process.exit(0);
  });
});

export default app; 