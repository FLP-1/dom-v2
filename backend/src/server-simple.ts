/**
 * Servidor Simples - DOM v2
 * Servidor básico para desenvolvimento e testes
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import usersRouter from './routes/users-prisma';
import timeclockRouter from './routes/timeclock-prisma';
import financialRouter from './routes/financial-prisma';
import tasksRouter from './routes/tasks-prisma';
import hrRouter from './routes/hr-prisma';
import documentsRouter from './routes/documents-prisma';
import reportsRouter from './routes/reports-prisma';
import notificationsRouter from './routes/notifications-prisma';
import communicationRouter from './routes/communication-prisma';
import gamificationRouter from './routes/gamification-prisma';
import integrationRouter from './routes/integration-prisma';
import reportsAdvancedRouter from './routes/reports-advanced-prisma';
import qualityRouter from './routes/quality-prisma';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middlewares básicos
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rotas de usuários
app.use('/api/users', usersRouter);

// Rotas de ponto
app.use('/api/timeclock', timeclockRouter);

// Rotas financeiras
app.use('/api/financial', financialRouter);

// Rotas de tarefas
app.use('/api/tasks', tasksRouter);

// Rotas de RH
app.use('/api/hr', hrRouter);

// Rotas de documentos
app.use('/api/documents', documentsRouter);

// Rotas de relatórios
app.use('/api/reports', reportsRouter);

// Rotas de notificações
app.use('/api/notifications', notificationsRouter);

// Rotas de comunicação
app.use('/api/communication', communicationRouter);

// Rotas de gamificação
app.use('/api/gamification', gamificationRouter);

// Rotas de integração
app.use('/api/integration', integrationRouter);

// Rotas de relatórios avançados e analytics
app.use('/api/reports-advanced', reportsAdvancedRouter);

// Rotas de qualidade e inspeção
app.use('/api/quality', qualityRouter);

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota de teste da API
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// Rotas do dashboard
app.get('/api/dashboard/metrics', async (req, res) => {
  try {
    // Mock data para desenvolvimento
    const metrics = {
      usersCount: 24,
      budgetAmount: 45250.00,
      budgetSpent: 12500.00,
      budgetRemaining: 32750.00,
      tasksCount: 12,
      documentsCount: 156,
      usersChange: 5,
      budgetChange: -2,
      tasksChange: 12,
      documentsChange: 8,
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    console.error('Erro ao carregar métricas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao carregar métricas do dashboard'
    });
  }
});

// Rota de atividade recente
app.get('/api/dashboard/activity', async (req, res) => {
  try {
    const mockActivities = [
      {
        id: 1,
        type: 'user',
        description: 'Novo usuário registrado: João Silva',
        timestamp: new Date(Date.now() - 300000).toISOString()
      },
      {
        id: 2,
        type: 'task',
        description: 'Tarefa concluída: Revisão de documentos',
        timestamp: new Date(Date.now() - 900000).toISOString()
      },
      {
        id: 3,
        type: 'payment',
        description: 'Pagamento processado: R$ 2.500,00',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 4,
        type: 'document',
        description: 'Documento enviado: Contrato de trabalho',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      }
    ];

    res.json({
      success: true,
      data: mockActivities
    });
  } catch (error) {
    console.error('Erro ao carregar atividade:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao carregar atividade recente'
    });
  }
});

// Rota de perfil do usuário
app.get('/api/auth/profile', (req, res) => {
  try {
    const mockUser = {
      id: 1,
      name: 'João Silva',
      email: 'joao@example.com',
      role: 'Administrador',
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      data: mockUser
    });
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao carregar perfil do usuário'
    });
  }
});

// Rota de login
app.post('/api/auth/login', (req, res) => {
  try {
    const { cpf, password } = req.body;
    
    console.log('Tentativa de login:', { cpf, hasPassword: !!password });
    
    // Validação básica
    if (!cpf || !password) {
      return res.status(400).json({
        success: false,
        message: 'CPF e senha são obrigatórios'
      });
    }
    
    // Normalizar CPF (remover formatação para comparação)
    const normalizeCPF = (cpf: string) => cpf.replace(/\D/g, '');
    const normalizedInputCPF = normalizeCPF(cpf);
    
    // Credenciais de teste com CPF (mantendo o que já estava validado)
    const testCredentials = [
      {
        cpf: '59876913700', // 598.769.137-00
        password: '123456',
        user: {
          id: 1,
          name: 'Usuário Teste',
          email: 'teste@domv2.com',
          role: 'Administrador'
        }
      },
      {
        cpf: '12345678901', // CPF alternativo para teste
        password: 'admin123',
        user: {
          id: 2,
          name: 'Administrador',
          email: 'admin@domv2.com',
          role: 'Administrador'
        }
      }
    ];
    
    // Verificar credenciais
    const validUser = testCredentials.find(cred => 
      normalizeCPF(cred.cpf) === normalizedInputCPF && 
      cred.password === password
    );
    
    if (validUser) {
      console.log('Login bem-sucedido para:', cpf);
      
      const token = 'mock-jwt-token-' + Date.now();
      
      res.json({
        success: true,
        data: {
          token,
          user: validUser.user
        },
        message: 'Login realizado com sucesso'
      });
    } else {
      console.log('Login falhou: credenciais inválidas');
      res.status(401).json({
        success: false,
        message: 'CPF ou senha incorretos'
      });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota de documentos
app.get('/api/documents/stats', (req, res) => {
  try {
    const stats = {
      totalDocuments: 156,
      pendingDocuments: 23,
      completedDocuments: 133,
      categories: [
        { name: 'Contratos', count: 45 },
        { name: 'Faturas', count: 38 },
        { name: 'Relatórios', count: 29 },
        { name: 'Outros', count: 44 }
      ]
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao carregar estatísticas'
    });
  }
});

// Middleware de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada'
  });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor DOM v2 rodando na porta ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/health`);
  console.log(`🔧 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⏰ Iniciado em: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Recebido SIGTERM, encerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Recebido SIGINT, encerrando servidor...');
  process.exit(0);
});

export default app;
