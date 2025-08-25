
/**
 * 
 * @alternatives
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 */


/**
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 */


/**
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 */
function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

/**
 * @param {string} message - Mensagem de erro
 */
function assertCritical(condition: any, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

/**
 * @param {any} data - Dados a serem validados
 */
function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}


/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * 
 * @dependencies
 * - Prisma ORM
 * 
 * @usage
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import cors from 'cors';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import budgetsRouter from './routes/budgets-prisma.js';
import payrollRouter from './routes/payroll-prisma.js';
import employeesRouter from './routes/employees-prisma.js';
import paymentsRouter from './routes/payments-prisma.js';
import purchasesRouter from './routes/purchases-prisma.js';
import notificationsRouter from './routes/notifications-prisma.js';
import tasksRouter from './routes/tasks-prisma.js';
import dashboardRouter from './routes/dashboard-prisma.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar Prisma
let prisma: PrismaClient;

const initializeDatabase = async () => {
  try {
    
    if (!process.env.DATABASE_URL) {
    }
    
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
    
    const connectionPromise = prisma.$connect();
    const timeoutPromise = new Promise((_, reject) => {
    });
    
    await Promise.race([connectionPromise, timeoutPromise]);
    
    // Verificar se as tabelas existem com timeout
    const queryPromise = prisma.$queryRaw`SELECT 1`;
    const queryTimeoutPromise = new Promise((_, reject) => {
    });
    
    await Promise.race([queryPromise, queryTimeoutPromise]);
    
    return true;
  } catch (error) {
    console.log('1. Instale PostgreSQL: https://www.postgresql.org/download/');
    console.log('2. Crie um banco de dados chamado "db_dom"');
    console.log('3. Configure o arquivo .env com:');
    console.log('   DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"');
    console.log('   npx prisma db push');
    console.log('5. Gere o Prisma Client:');
    console.log('   npx prisma generate');
    
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
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

app.get('/health', (req, res) => {
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
  res.json({
    message: 'API DOM v2 com Prisma funcionando',
    database: 'postgresql',
    timestamp: new Date().toISOString()
  });
});

// Endpoint de login ROBUSTO
app.post('/api/auth/login', async (req, res) => {
  const { cpf, password } = req.body;


  if (!cpf || !password) {
    return res.status(400).json({
      code: 'MISSING_FIELDS'
    });
  }

  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) {
    return res.status(400).json({
      code: 'INVALID_CPF'
    });
  }

  if (password !== '123456') {
    return res.status(401).json({
      error: 'Senha incorreta (use: 123456)',
      code: 'INVALID_PASSWORD'
    });
  }

  try {
    
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
    });
    
    const user = await Promise.race([userPromise, userTimeoutPromise]) as any;

    if (!user) {
      
      let group = await prisma.groups.findFirst({
        where: { tipo: 'user' }
      });

      if (!group) {
        group = await prisma.groups.create({
          data: {
            tipo: 'user',
            ativo: true
          }
        });
      }

      const newUser = await prisma.user.create({
        data: {
          nickname: 'usuario.teste',
          cpf: cleanCPF,
          email: `${cleanCPF}@teste.com`,
          senha_hash: 'senha_hash_temporaria',
          perfil: 'empregador',
          ativo: true
        }
      });

      await prisma.user_group_roles.create({
        data: {
          user_id: newUser.id,
          group_id: group.id,
          role: 'user',
          ativo: true
        }
      });

      
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
      });
    }

    if (!user.ativo) {
      return res.status(401).json({
        code: 'USER_INACTIVE'
      });
    }

    const userOrganizations = user.user_group_roles.filter((ugr: any) => ugr.ativo);


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
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Middleware de erro
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({
    error: 'Erro interno do servidor',
    code: 'INTERNAL_ERROR'
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
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
    });

    // Manter servidor ativo
    process.on('SIGINT', async () => {
      if (prisma) {
        await prisma.$disconnect();
      }
      server.close(() => {
        process.exit(0);
      });
    });
  } catch (error) {
    process.exit(1);
  }
};

// Iniciar servidor
startServer().catch(console.error);

export default app; 