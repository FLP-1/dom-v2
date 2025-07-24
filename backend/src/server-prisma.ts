// Servidor com Prisma para micro-frontend de orçamento e folha de pagamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import cors from 'cors';
import express from 'express';
import { PrismaClient } from './generated/prisma';
import budgetsRouter from './routes/budgets-prisma';
import payrollRouter from './routes/payroll-prisma';
import employeesRouter from './routes/employees-prisma';
import paymentsRouter from './routes/payments-prisma';
import purchasesRouter from './routes/purchases-prisma';
import notificationsRouter from './routes/notifications-prisma';
import tasksRouter from './routes/tasks-prisma';
import dashboardRouter from './routes/dashboard-prisma';

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar Prisma
let prisma: PrismaClient;

const initializeDatabase = async () => {
  try {
    console.log('🔗 Inicializando conexão com PostgreSQL...');
    console.log('📝 Verificando configuração do banco...');
    
    // Verificar se DATABASE_URL está configurada
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL não configurada no arquivo .env');
    }
    
    console.log('✅ DATABASE_URL configurada');
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
    
    // Testar conexão com timeout
    console.log('🔍 Testando conexão com PostgreSQL...');
    const connectionPromise = prisma.$connect();
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout na conexão com PostgreSQL')), 10000);
    });
    
    await Promise.race([connectionPromise, timeoutPromise]);
    console.log('✅ PostgreSQL conectado com sucesso!');
    
    // Verificar se as tabelas existem com timeout
    console.log('🔍 Verificando estrutura do banco...');
    const queryPromise = prisma.$queryRaw`SELECT 1`;
    const queryTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout na verificação do banco')), 5000);
    });
    
    await Promise.race([queryPromise, queryTimeoutPromise]);
    console.log('✅ Estrutura do banco verificada');
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com PostgreSQL:', error);
    console.log('\n🔧 CONFIGURAÇÃO NECESSÁRIA:');
    console.log('1. Instale PostgreSQL: https://www.postgresql.org/download/');
    console.log('2. Crie um banco de dados chamado "db_dom"');
    console.log('3. Configure o arquivo .env com:');
    console.log('   DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"');
    console.log('4. Execute as migrações:');
    console.log('   npx prisma db push');
    console.log('5. Gere o Prisma Client:');
    console.log('   npx prisma generate');
    console.log('\n🚀 Após configurar, reinicie o servidor');
    
    process.exit(1);
  }
};

// Middleware básico
app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Rotas do micro-frontend com Prisma
app.use('/api/budgets', budgetsRouter);
app.use('/api/payroll', payrollRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/purchases', purchasesRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/dashboard', dashboardRouter);

// Endpoint de saúde
app.get('/health', (req, res) => {
  console.log('🏥 Health check solicitado');
  res.json({
    status: 'ok',
    version: '2.0.0',
    message: 'DOM v2 - Micro-frontend Backend com Prisma',
    database: 'postgresql',
    features: 'full'
  });
});

// Endpoint de teste
app.get('/api/test', (req, res) => {
  console.log('🧪 Teste solicitado');
  res.json({
    message: 'API DOM v2 com Prisma funcionando',
    database: 'postgresql',
    timestamp: new Date().toISOString()
  });
});

// Endpoint de login ROBUSTO
app.post('/api/auth/login', async (req, res) => {
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

  try {
    console.log('🔍 Buscando usuário no PostgreSQL...');
    
    // Buscar usuário por CPF com timeout
    const userPromise = prisma.user.findUnique({
      where: { cpf: cleanCPF },
      include: {
        user_group_roles: {
          include: {
            groups: true
          }
        }
      }
    });
    
    const userTimeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout na busca do usuário')), 5000);
    });
    
    const user = await Promise.race([userPromise, userTimeoutPromise]) as any;

    // Se não encontrar usuário, criar um básico para MVP
    if (!user) {
      console.log('👤 Usuário não encontrado, criando usuário básico...');
      
      // Criar grupo básico se não existir
      let group = await prisma.groups.findFirst({
        where: { tipo: 'user' }
      });

      if (!group) {
        console.log('👥 Criando grupo básico...');
        group = await prisma.groups.create({
          data: {
            nome: 'Usuário Básico',
            descricao: 'Grupo de usuários básicos',
            tipo: 'user',
            ativo: true
          }
        });
      }

      // Criar usuário básico
      console.log('👤 Criando usuário básico...');
      const newUser = await prisma.user.create({
        data: {
          nome: 'Usuário Teste',
          nickname: 'usuario.teste',
          cpf: cleanCPF,
          email: `${cleanCPF}@teste.com`,
          senha_hash: 'senha_hash_temporaria',
          perfil: 'empregador',
          ativo: true
        }
      });

      // Criar relacionamento usuário-grupo
      await prisma.user_group_roles.create({
        data: {
          user_id: newUser.id,
          group_id: group.id,
          role: 'user',
          ativo: true
        }
      });

      console.log('✅ Usuário criado com sucesso no PostgreSQL');
      
      // Retornar dados do novo usuário
      return res.json({
        success: true,
        user: {
          id: newUser.id,
          name: newUser.nome,
          email: newUser.email,
          profile: newUser.perfil || 'USER',
          cpf: newUser.cpf
        },
        organizations: [{
          id: group.id,
          name: group.nome,
          type: group.tipo,
          role: 'user'
        }],
        message: 'Usuário criado e login realizado com sucesso'
      });
    }

    // Verificar se usuário está ativo
    if (!user.ativo) {
      console.log('❌ Usuário inativo');
      return res.status(401).json({
        error: 'Usuário inativo',
        code: 'USER_INACTIVE'
      });
    }

    // Buscar organizações do usuário
    const userOrganizations = user.user_group_roles.filter(ugr => ugr.ativo);

    console.log('✅ Login realizado com sucesso');

    // Retornar dados do usuário
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.nome,
        email: user.email,
        profile: user.perfil || 'USER',
        cpf: user.cpf
      },
      organizations: userOrganizations.map((uo: any) => ({
        id: uo.groups.id,
        name: uo.groups.nome,
        type: uo.groups.tipo,
        role: uo.role
      })),
      message: 'Login realizado com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Middleware de erro
app.use((err: any, req: any, res: any, next: any) => {
  console.error('❌ Erro no servidor:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    code: 'INTERNAL_ERROR'
  });
});

// Rota 404
app.use('*', (req, res) => {
  console.log('❌ Rota não encontrada:', req.originalUrl);
  res.status(404).json({
    error: 'Rota não encontrada',
    code: 'NOT_FOUND'
  });
});

// Inicializar servidor com tratamento robusto
const startServer = async () => {
  try {
    // Inicializar banco primeiro
    await initializeDatabase();
    
    // Iniciar servidor
    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor micro-frontend com Prisma rodando na porta ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth/login`);
      console.log(`💰 Budget API: http://localhost:${PORT}/api/budgets`);
      console.log(`💼 Payroll API: http://localhost:${PORT}/api/payroll`);
      console.log(`👥 Employees API: http://localhost:${PORT}/api/employees`);
      console.log(`💳 Payments API: http://localhost:${PORT}/api/payments`);
      console.log(`🛒 Purchases API: http://localhost:${PORT}/api/purchases`);
      console.log(`🔔 Notifications API: http://localhost:${PORT}/api/notifications`);
      console.log(`📋 Tasks API: http://localhost:${PORT}/api/tasks`);
      console.log(`📈 Dashboard API: http://localhost:${PORT}/api/dashboard`);
      console.log(`⏹️  Para parar: Ctrl+C`);
    });

    // Manter servidor ativo
    process.on('SIGINT', async () => {
      console.log('\n🛑 Parando servidor...');
      if (prisma) {
        await prisma.$disconnect();
      }
      server.close(() => {
        console.log('✅ Servidor parado');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Iniciar servidor
startServer().catch(console.error);

export default app; 