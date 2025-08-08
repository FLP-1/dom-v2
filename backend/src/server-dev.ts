/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description Servidor de desenvolvimento DOM v2 - TypeScript
 * 
 * @dependencies
 * - Express
 * - CORS
 * - TypeScript
 * 
 * @usage npm run dev
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { validateCPF } from './utils/validation';
import { PrismaClient } from './generated/prisma';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar Prisma Client
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Persistência simples em arquivo (dev) para budgets/payments
const dataDir = path.join(process.cwd(), 'logs');
const budgetsFile = path.join(dataDir, 'budgets-dev.json');
const paymentsFile = path.join(dataDir, 'payments-dev.json');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadJsonArray(filePath: string): any[] {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      if (raw.trim().length > 0) {
        return JSON.parse(raw);
      }
    }
  } catch {
    // ignore
  }
  return [];
}

function saveJsonArray(filePath: string, data: any[]) {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { encoding: 'utf8' });
}

let budgetsMemory = loadJsonArray(budgetsFile);
let paymentsMemory = loadJsonArray(paymentsFile);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Teste de conexão com Prisma
app.get('/api/test-prisma', async (req: Request, res: Response) => {
  try {
    // Testar conexão contando usuários
    const userCount = await prisma.user.count();
    
    res.json({
      success: true,
      message: 'Conexão com Prisma estabelecida com sucesso!',
      userCount: userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao conectar com Prisma:', error);
    res.status(500).json({
      success: false,
      error: 'Erro ao conectar com banco de dados',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// Endpoint de login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const {
    cpf,
    password,
    rememberMe = false,
    biometricUsed = false,
    marketingAccepted = false,
    termsAccepted = false,
    privacyAccepted = false,
  } = req.body;

  if (!cpf || !password) {
    return res.status(400).json({
      success: false,
      error: 'CPF e senha são obrigatórios'
    });
  }

  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (!validateCPF(cleanCPF)) {
    return res.status(400).json({
      success: false,
      error: 'CPF inválido'
    });
  }

  // Simular delay de processamento
  setTimeout(() => {
    // Determinar perfil baseado no CPF
    let profile = 'user';
    if (cleanCPF.endsWith('00')) {
      profile = 'admin';
    } else if (cleanCPF.endsWith('11')) {
      profile = 'employer';
    } else if (cleanCPF.endsWith('22')) {
      profile = 'employee';
    } else if (cleanCPF.endsWith('33')) {
      profile = 'family';
    }

    // Registrar prova de consentimento (dev) em arquivo local
    try {
      const logsDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      const consentRecord = {
        timestamp: new Date().toISOString(),
        cpf: cleanCPF,
        termsAccepted: !!termsAccepted,
        privacyAccepted: !!privacyAccepted,
        marketingAccepted: !!marketingAccepted,
        userAgent: req.headers['user-agent'] || null,
        ip: req.ip || (req.headers['x-forwarded-for'] as string) || null,
      };
      fs.appendFileSync(
        path.join(logsDir, 'consents-log.json'),
        JSON.stringify(consentRecord) + '\n',
        { encoding: 'utf8' }
      );
    } catch (logError) {
      console.error('Erro ao registrar consentimento (dev):', (logError as Error).message);
    }

    // Tentar persistir consentimentos via Prisma (dev)
    (async () => {
      try {
        await prisma.userConsent.create({
          data: {
            cpf: cleanCPF,
            termsAccepted: !!termsAccepted,
            privacyAccepted: !!privacyAccepted,
            marketingAccepted: !!marketingAccepted,
            user_agent: (req.headers['user-agent'] as string) || null,
            ip_address: req.ip || (req.headers['x-forwarded-for'] as string) || null,
          },
        });
      } catch (dbErr) {
        console.error('Erro ao persistir consentimento no banco (dev):', (dbErr as Error).message);
      }
    })();

    // Retornar dados simulados com perfil correto
    res.json({
      success: true,
      user: {
        id: `dev-user-${cleanCPF}`,
        name: `Usuário ${cleanCPF}`,
        email: `${cleanCPF}@dev.com`,
        profile: profile,
        cpf: cleanCPF
      },
      organizations: [{
        id: 'dev-org-123',
        type: 'user',
        role: 'user'
      }],
      message: `Login realizado com sucesso - Perfil: ${profile}`,
      preferences: {
        rememberMe,
        biometricEnabled: biometricUsed,
        marketingAccepted
       },
      consents: {
        termsAccepted: !!termsAccepted,
        privacyAccepted: !!privacyAccepted,
        marketingAccepted: !!marketingAccepted
      }
    });
  }, 1000);
});

// Endpoint para logs de login
app.post('/api/logs/login', (req: Request, res: Response) => {
  const logData = req.body;
  
  console.log('Log de login:', logData);
  
  res.json({
    success: true,
    message: 'Log registrado com sucesso'
  });
});

// Endpoint para recuperação de senha
app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'Email é obrigatório'
    });
  }

  setTimeout(() => {
    res.json({
      success: true,
      message: 'Email de recuperação enviado'
    });
  }, 1000);
});

// Endpoints simulados para desenvolvimento
app.get('/api/budgets', (req: Request, res: Response) => {
  res.json({ success: true, budgets: budgetsMemory });
});

app.post('/api/budgets', (req: Request, res: Response) => {
  const { name, amount, category = 'general', start_date, end_date } = req.body;
  if (!name || typeof amount !== 'number') {
    return res.status(400).json({ success: false, error: 'Campos obrigatórios: name (string), amount (number)' });
  }
  const newBudget = {
    id: `budget-${Date.now()}`,
    name: String(name),
    amount: Number(amount),
    spent: 0,
    category: String(category),
    start_date: start_date || new Date().toISOString(),
    end_date: end_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  budgetsMemory.unshift(newBudget);
  saveJsonArray(budgetsFile, budgetsMemory);
  res.status(201).json({ success: true, budget: newBudget });
});

app.get('/api/payroll', (req: Request, res: Response) => {
  res.json({
    success: true,
    payroll: [
      {
        id: 'payroll-1',
        employee: 'João Silva',
        amount: 3000,
        status: 'paid'
      }
    ]
  });
});

// Payments (dev)
app.get('/api/payments', (req: Request, res: Response) => {
  res.json({ success: true, payments: paymentsMemory });
});

app.post('/api/payments', (req: Request, res: Response) => {
  const { amount, description, due_date } = req.body;
  if (typeof amount !== 'number' || !description) {
    return res.status(400).json({ success: false, error: 'Campos obrigatórios: amount (number), description (string)' });
  }
  const newPayment = {
    id: `payment-${Date.now()}`,
    amount: Number(amount),
    description: String(description),
    status: 'pending',
    due_date: due_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  paymentsMemory.unshift(newPayment);
  saveJsonArray(paymentsFile, paymentsMemory);
  res.status(201).json({ success: true, payment: newPayment });
});

app.get('/api/employees', (req: Request, res: Response) => {
  res.json({
    success: true,
    employees: [
      {
        id: 'emp-1',
        name: 'João Silva',
        position: 'Desenvolvedor',
        salary: 3000
      }
    ]
  });
});

// Middleware de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro:', err);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    code: 'INTERNAL_ERROR'
  });
});

// Rota 404
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    code: 'NOT_FOUND'
  });
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor de desenvolvimento rodando na porta ${PORT}`);
});

// Manter servidor ativo
process.on('SIGINT', async () => {
  console.log('🔄 Encerrando servidor...');
  server.close(async () => {
    console.log('🔌 Desconectando do banco de dados...');
    await prisma.$disconnect();
    console.log('👋 Servidor encerrado');
    process.exit(0);
  });
});

export default app; 