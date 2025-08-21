/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
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
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */


/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Aplicar asserções críticas


/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

/**
 * Valida CPF antes de processar login/registro
 */
function validateCPFForLogin(cpf: string): { isValid: boolean; cleanCPF: string; error?: string } {
  // Limpar CPF (remover caracteres especiais)
  const cleanCPF = cpf.replace(/\D/g, '');
  
  // Validar formato básico
  if (cleanCPF.length !== 11) {
    return {
      isValid: false,
      cleanCPF: '',
      error: 'CPF deve ter 11 dígitos'
    };
  }
  
  // Validar se não são todos os mesmos dígitos
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return {
      isValid: false,
      cleanCPF: '',
      error: 'CPF inválido'
    };
  }
  
  // Validar dígitos verificadores
  if (!validateCPF(cleanCPF)) {
    return {
      isValid: false,
      cleanCPF: '',
      error: 'CPF inválido'
    };
  }
  
  return {
    isValid: true,
    cleanCPF
  };
}

// Aplicar validação


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
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar Prisma Client
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-XSS-Protection', '0');
  next();
});

// Correlação e métricas simples (dev)
function generateCorrelationId(): string {
  return `cid-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

type Metrics = {
  startTime: number;
  totalRequests: number;
  perPath: Record<string, number>;
  lastRequestAt?: number;
};

const metrics: Metrics = {
  startTime: Date.now(),
  totalRequests: 0,
  perPath: {},
};

app.use((req, res, next) => {
  const correlationId = generateCorrelationId();
  (req as any).correlationId = correlationId;
  res.setHeader('X-Correlation-Id', correlationId);
  metrics.totalRequests += 1;
  metrics.perPath[req.path] = (metrics.perPath[req.path] || 0) + 1;
  metrics.lastRequestAt = Date.now();
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = String(res.statusCode);
    (metrics as any).perStatus = (metrics as any).perStatus || {};
    (metrics as any).perStatus[status] = ((metrics as any).perStatus[status] || 0) + 1;
    (metrics as any).latency = (metrics as any).latency || { count: 0, totalMs: 0, avgMs: 0 };
    (metrics as any).latency.count += 1;
    (metrics as any).latency.totalMs += duration;
    (metrics as any).latency.avgMs = Math.round((metrics as any).latency.totalMs / (metrics as any).latency.count);
  });
  next();
});
app.use(express.json());
// JWT (dev)
const JWT_SECRET = process.env.JWT_SECRET || 'domv2-dev-secret';
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_TTL || '15m';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_TTL || '7d';

type RefreshRecord = { userId: string; jti: string; expiresAt: number };
const refreshStore = new Map<string, RefreshRecord>(); // key: refreshToken

function signAccessToken(payload: Record<string, any>): string {
  return jwt.sign(payload, JWT_SECRET as jwt.Secret, { expiresIn: ACCESS_EXPIRES_IN as any });
}

function signRefreshToken(payload: Record<string, any>): { token: string; record: RefreshRecord } {
  const jti = `rt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const token = jwt.sign({ ...payload, jti }, JWT_SECRET as jwt.Secret, { expiresIn: REFRESH_EXPIRES_IN as any });
  const decoded = jwt.decode(token) as { exp?: number } | null;
  const expiresAt = decoded?.exp ? decoded.exp * 1000 : Date.now() + 7 * 24 * 60 * 60 * 1000;
  return { token, record: { userId: payload.sub, jti, expiresAt } };
}

// Lockout simples por tentativas (dev): 5 erros em 10min -> bloqueio 15min
type AttemptInfo = { count: number; firstAt: number; blockedUntil?: number };
const failedAttempts = new Map<string, AttemptInfo>(); // key: cpf|ip
// Rate limiting mais permissivo para desenvolvimento
const MAX_ATTEMPTS = 20; // Aumentado de 5 para 20
const WINDOW_MS = 5 * 60 * 1000; // Reduzido de 10 para 5 minutos
const BLOCK_MS = 2 * 60 * 1000; // Reduzido de 15 para 2 minutos

function getAttemptKey(cpf: string, ip?: string | string[]): string {
  return `${cpf || 'unknown'}|${Array.isArray(ip) ? ip[0] : ip || 'ip'}`;
}

function checkBlocked(key: string): boolean {
  const info = failedAttempts.get(key);
  if (!info) return false;
  const now = Date.now();
  if (info.blockedUntil && info.blockedUntil > now) return true;
  if (now - info.firstAt > WINDOW_MS) {
    failedAttempts.delete(key);
  }
  return false;
}

function registerFailure(key: string) {
  const now = Date.now();
  const info = failedAttempts.get(key);
  if (!info) {
    failedAttempts.set(key, { count: 1, firstAt: now });
    return;
  }
  if (now - info.firstAt > WINDOW_MS) {
    failedAttempts.set(key, { count: 1, firstAt: now });
    return;
  }
  info.count += 1;
  if (info.count >= MAX_ATTEMPTS) {
    info.blockedUntil = now + BLOCK_MS;
  }
  failedAttempts.set(key, info);
}

function clearAttempts(key: string) {
  failedAttempts.delete(key);
}

// Persistência simples em arquivo (dev) para budgets/payments/employees/timeclock
const dataDir = path.join(process.cwd(), 'logs');
const budgetsFile = path.join(dataDir, 'budgets-dev.json');
const paymentsFile = path.join(dataDir, 'payments-dev.json');
const employeesFile = path.join(dataDir, 'employees-dev.json');

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
let employeesMemory = loadJsonArray(employeesFile);
const timeClockFile = path.join(dataDir, 'timeclock-dev.json');
let timeClockMemory = loadJsonArray(timeClockFile);

// Health check (não versionado)
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Router versionado para /api e /api/v1
const apiRouter = express.Router();

// Métricas (dev)
apiRouter.get('/metrics', (req: Request, res: Response) => {
  res.json({
    success: true,
    uptimeMs: Date.now() - metrics.startTime,
    totalRequests: metrics.totalRequests,
    perPath: metrics.perPath,
    lastRequestAt: metrics.lastRequestAt || null,
    perStatus: (metrics as any).perStatus || {},
    latency: (metrics as any).latency || { count: 0, totalMs: 0, avgMs: 0 },
  });
});

// Teste de conexão com Prisma
apiRouter.get('/test-prisma', async (req: Request, res: Response) => {
  try {
    // Testar conexão contando usuários
    const userCount = await prisma.users.count();
    
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
apiRouter.post('/auth/login', (req: Request, res: Response) => {
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
    const key = getAttemptKey(cpf || 'missing', req.ip || req.headers['x-forwarded-for'] || '');
    if (checkBlocked(key)) {
      res.status(429).json({ success: false, error: 'Muitas tentativas. Tente novamente mais tarde.' });
      return;
    }
    registerFailure(key);
    res.status(400).json({ success: false, error: 'CPF e senha são obrigatórios' });
    return;
  }

  // Validar CPF antes de processar
  const cpfValidation = validateCPFForLogin(cpf);
  if (!cpfValidation.isValid) {
    const key = getAttemptKey(cpfValidation.cleanCPF || cpf, req.ip || req.headers['x-forwarded-for'] || '');
    if (checkBlocked(key)) {
      res.status(429).json({ success: false, error: 'Muitas tentativas. Tente novamente mais tarde.' });
      return;
    }
    registerFailure(key);
    res.status(400).json({ success: false, error: cpfValidation.error || 'CPF inválido' });
    return;
  }
  
  const cleanCPF = cpfValidation.cleanCPF;

  // Simular delay de processamento
  setTimeout(async () => {
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

    // Registrar prova de consentimento (dev) em arquivo local (pseudonimizando CPF)
    try {
      const logsDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      const safeHash = (value: string) => {
        try {
          const crypto = require('crypto');
          const salt = process.env.CONSENT_LOG_SALT || 'domv2-dev-salt';
          return crypto.createHash('sha256').update(String(salt) + ':' + value).digest('hex');
        } catch {
          return `hash_${Buffer.from(value).toString('base64')}`; // fallback fraco apenas para dev
        }
      };
      const consentRecord = {
        timestamp: new Date().toISOString(),
        cpf_hash: safeHash(cleanCPF),
        termsAccepted: !!termsAccepted,
        privacyAccepted: !!privacyAccepted,
        marketingAccepted: !!marketingAccepted,
        userAgent: req.headers['user-agent'] || null,
        ip_hash: safeHash(String(req.ip || (req.headers['x-forwarded-for'] as string) || 'unknown')),
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
        let userId: string | null = null;
        try {
          const dbUser = await prisma.users.findUnique({ where: { cpf: cleanCPF } as any });
          userId = dbUser?.id ?? null;
        } catch (_) {
          // ignore lookup error em dev
        }
        await prisma.userConsent.create({
          data: {
            user_id: userId,
            cpf: cleanCPF,
            termsAccepted: !!termsAccepted,
            privacyAccepted: !!privacyAccepted,
            marketingAccepted: !!marketingAccepted,
            user_agent: (req.headers['user-agent'] as string) || null,
            ip_address: null,
          },
        });
      } catch (dbErr) {
        console.error('Erro ao persistir consentimento no banco (dev):', (dbErr as Error).message);
      }
    })();

    // Tokens
    const userId = `dev-user-${cleanCPF}`;
    const accessToken = signAccessToken({ sub: userId, cpf: cleanCPF, profile });
    const { token: refreshToken, record } = signRefreshToken({ sub: userId, cpf: cleanCPF, profile });
    refreshStore.set(refreshToken, record);

    // limpar tentativas
    clearAttempts(getAttemptKey(cleanCPF, req.ip || req.headers['x-forwarded-for'] || ''));

    // Buscar dados reais do usuário no banco de dados
    try {
      const dbUser = await prisma.users.findUnique({ 
        where: { cpf: cleanCPF },
        select: {
          id: true,
          name: true,
          nickname: true,
          email: true,
          profile: true,
          cpf: true
        }
      });

      // Retornar dados reais do banco ou simulados se não encontrar
      res.json({
        success: true,
        user: {
          id: dbUser?.id || userId,
          name: dbUser?.name || `Usuário ${cleanCPF}`,
          nickname: dbUser?.nickname || `Nick_${cleanCPF.slice(-4)}`,
          email: dbUser?.email || `${cleanCPF}@dev.com`,
          profile: dbUser?.profile || profile,
          cpf: dbUser?.cpf || cleanCPF
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
        },
        token: accessToken,
        refreshToken
      });
    } catch (error) {
      console.error('Erro ao buscar usuário no banco:', error);
      // Em caso de erro, retornar dados simulados
      res.json({
        success: true,
        user: {
          id: userId,
          name: `Usuário ${cleanCPF}`,
          nickname: `Nick_${cleanCPF.slice(-4)}`,
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
        },
        token: accessToken,
        refreshToken
      });
    }
  }, 1000);
});

// Endpoint para logs de login
apiRouter.post('/logs/login', (req: Request, res: Response) => {
  const logData = req.body;
  
  console.log('Log de login:', logData);
  
  res.json({
    success: true,
    message: 'Log registrado com sucesso'
  });
});

// Endpoint para recuperação de senha
apiRouter.post('/auth/forgot-password', (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, error: 'Email é obrigatório' });
    return;
  }

  setTimeout(() => {
    res.json({ success: true, message: 'Email de recuperação enviado' });
  }, 1000);
});

// Refresh Token Endpoint
apiRouter.post('/auth/refresh', (req: Request, res: Response) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken || typeof refreshToken !== 'string') {
    return res.status(400).json({ success: false, error: 'refreshToken é obrigatório' });
  }
  const stored = refreshStore.get(refreshToken);
  if (!stored) {
    return res.status(401).json({ success: false, error: 'Refresh token inválido' });
  }
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
    if (!decoded || decoded.jti !== stored.jti) {
      return res.status(401).json({ success: false, error: 'Refresh token inválido' });
    }
    const accessToken = signAccessToken({ sub: stored.userId, cpf: decoded.cpf, profile: decoded.profile });
    return res.json({ success: true, token: accessToken });
  } catch {
    refreshStore.delete(refreshToken);
    return res.status(401).json({ success: false, error: 'Refresh token expirado' });
  }
});

// Validate Token Endpoint
apiRouter.get('/auth/validate', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Token de autorização não fornecido' });
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (!decoded || !decoded.sub) {
      return res.status(401).json({ success: false, error: 'Token inválido' });
    }
    
    // Token válido
    return res.json({ 
      success: true, 
      user: {
        id: decoded.sub,
        cpf: decoded.cpf,
        profile: decoded.profile
      }
    });
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Token expirado ou inválido' });
  }
});

// Budgets (dados reais via Prisma)
apiRouter.get('/budgets', async (req: Request, res: Response) => {
  try {
    const list = await prisma.budget.findMany({ orderBy: { created_at: 'desc' } });
    res.json({ success: true, budgets: list });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao listar orçamentos' });
  }
});

apiRouter.post('/budgets', async (req: Request, res: Response) => {
  const { name, amount, category = 'general', start_date, end_date } = req.body;
  if (!name || typeof amount !== 'number') {
    res.status(400).json({ success: false, error: 'Campos obrigatórios: name (string), amount (number)' });
    return;
  }
  try {
    const created = await prisma.budget.create({
      data: {
        id: randomUUID(),
    name: String(name),
    amount: Number(amount),
    spent: 0,
    category: String(category),
        start_date: start_date ? new Date(start_date) : new Date(),
        end_date: end_date ? new Date(end_date) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active',
      },
    });
    res.status(201).json({ success: true, budget: created });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao criar orçamento' });
  }
});

apiRouter.get('/payroll', (req: Request, res: Response) => {
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

// Payments (dados reais via Prisma)
apiRouter.get('/payments', async (req: Request, res: Response) => {
  try {
    const list = await prisma.payment.findMany({ orderBy: { created_at: 'desc' } });
    res.json({ success: true, payments: list });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao listar pagamentos' });
  }
});

apiRouter.post('/payments', async (req: Request, res: Response) => {
  const { amount, description, due_date } = req.body;
  if (typeof amount !== 'number' || !description) {
    res.status(400).json({ success: false, error: 'Campos obrigatórios: amount (number), description (string)' });
    return;
  }
  try {
    const created = await prisma.payment.create({
      data: {
        id: randomUUID(),
        amount: Number(amount),
    description: String(description),
    status: 'pending',
        due_date: due_date ? new Date(due_date) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
    res.status(201).json({ success: true, payment: created });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao criar pagamento' });
  }
});

// Notifications (dados reais via Prisma: notifications)
apiRouter.get('/notifications', async (req: Request, res: Response) => {
  try {
    const { userCpf, unread_only } = req.query as Record<string, string | undefined>;
    
    // Buscar usuário se CPF foi fornecido
    let recipientId: string | undefined;
    if (userCpf) {
      try {
        const clean = String(userCpf).replace(/\D/g, '');
        const dbUser = await prisma.users.findUnique({ where: { cpf: clean } as any });
        recipientId = dbUser?.id;
      } catch {}
    }

    const where: any = { active: true };
    if (recipientId) where.recipient_id = recipientId;
    if (unread_only === 'true') where.read = false;

    const notifications = await prisma.notifications.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: 50 // Limite de 50 notificações por vez
    });

    const formattedNotifications = notifications.map(n => ({
      id: n.id,
      type: n.type,
      title: n.title,
      message: n.message,
      priority: n.priority || 'medium',
      category: n.category || 'general',
      read: n.read || false,
      created_at: n.created_at,
      read_at: n.read_at,
      extra_data: n.extra_data
    }));

    res.json({ success: true, notifications: formattedNotifications });
  } catch (e) {
    console.error('Erro ao buscar notificações:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar notificações' });
  }
});

apiRouter.put('/notifications/:id/read', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { read = true } = req.body;

    const updated = await prisma.notifications.update({
      where: { id },
      data: { 
        read: Boolean(read),
        read_at: read ? new Date() : null,
        updated_at: new Date()
      }
    });

    res.json({ success: true, notification: updated });
  } catch (e) {
    console.error('Erro ao atualizar notificação:', e);
    res.status(500).json({ success: false, error: 'Erro ao atualizar notificação' });
  }
});

apiRouter.delete('/notifications/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.notifications.update({
      where: { id },
      data: { active: false, updated_at: new Date() }
    });

    res.json({ success: true, message: 'Notificação removida com sucesso' });
  } catch (e) {
    console.error('Erro ao remover notificação:', e);
    res.status(500).json({ success: false, error: 'Erro ao remover notificação' });
  }
});

// Employees (dados reais via Prisma: employees)
apiRouter.get('/employees', async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query as Record<string, string | undefined>;
    
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { cpf: { contains: search } },
        { position: { contains: search, mode: 'insensitive' } }
      ];
    }

    const employees = await prisma.employees.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        payrolls: {
          take: 1,
          orderBy: { created_at: 'desc' }
        }
      }
    });

    const formattedEmployees = employees.map(emp => ({
      id: emp.id,
      name: emp.name,
      cpf: emp.cpf,
      position: emp.position,
      salary: emp.salary,
      status: emp.status,
      created_at: emp.created_at,
      updated_at: emp.updated_at,
      last_payroll: emp.payrolls[0] || null
    }));

    res.json({ success: true, employees: formattedEmployees });
  } catch (e) {
    console.error('Erro ao buscar funcionários:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar funcionários' });
  }
});

apiRouter.post('/employees', async (req: Request, res: Response) => {
  try {
    const { name, cpf, position, salary } = req.body;
    
    if (!name || !cpf || !position || !salary) {
      res.status(400).json({ 
        success: false, 
        error: 'Campos obrigatórios: name, cpf, position, salary' 
      });
      return;
    }

    // Limpar CPF
    const cleanCpf = String(cpf).replace(/\D/g, '');
    if (cleanCpf.length !== 11) {
      res.status(400).json({ success: false, error: 'CPF deve ter 11 dígitos' });
      return;
    }

    const created = await prisma.employees.create({
      data: {
        id: randomUUID(),
        name: String(name),
        cpf: cleanCpf,
        position: String(position),
        salary: Number(salary),
        status: 'active'
      }
    });

    res.status(201).json({ success: true, employee: created });
  } catch (e: any) {
    console.error('Erro ao criar funcionário:', e);
    if (e.code === 'P2002') {
      res.status(400).json({ success: false, error: 'CPF já cadastrado' });
    } else {
      res.status(500).json({ success: false, error: 'Erro ao criar funcionário' });
    }
  }
});

apiRouter.put('/employees/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, position, salary, status } = req.body;

    const updateData: any = { updated_at: new Date() };
    if (name) updateData.name = String(name);
    if (position) updateData.position = String(position);
    if (salary) updateData.salary = Number(salary);
    if (status) updateData.status = String(status);

    const updated = await prisma.employees.update({
      where: { id },
      data: updateData
    });

    res.json({ success: true, employee: updated });
  } catch (e) {
    console.error('Erro ao atualizar funcionário:', e);
    res.status(500).json({ success: false, error: 'Erro ao atualizar funcionário' });
  }
});

apiRouter.delete('/employees/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Soft delete - marcar como inativo
    await prisma.employees.update({
      where: { id },
      data: { 
        status: 'inactive',
        updated_at: new Date()
      }
    });

    res.json({ success: true, message: 'Funcionário inativado com sucesso' });
  } catch (e) {
    console.error('Erro ao inativar funcionário:', e);
    res.status(500).json({ success: false, error: 'Erro ao inativar funcionário' });
  }
});

// Budget (dados reais via Prisma: budgets)
apiRouter.get('/budgets', async (req: Request, res: Response) => {
  try {
    const { status, category, period } = req.query as Record<string, string | undefined>;
    
    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;
    
    // Filtro por período se fornecido
    if (period) {
      const now = new Date();
      let startDate: Date;
      
      switch (period) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(0); // Todos os períodos
      }
      
      where.start_date = { gte: startDate };
    }

    const budgets = await prisma.budget.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: 100 // Limite de 100 orçamentos por vez
    });

    const formattedBudgets = budgets.map(budget => ({
      id: budget.id,
      name: budget.name,
      amount: budget.amount,
      spent: budget.spent,
      category: budget.category,
      start_date: budget.start_date,
      end_date: budget.end_date,
      status: budget.status,
      created_at: budget.created_at,
      updated_at: budget.updated_at,
      remaining: budget.amount - budget.spent,
      progress: budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0
    }));

    res.json({ success: true, budgets: formattedBudgets });
  } catch (e) {
    console.error('Erro ao buscar orçamentos:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar orçamentos' });
  }
});

apiRouter.get('/budgets/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const budget = await prisma.budget.findUnique({
      where: { id }
    });

    if (!budget) {
      res.status(404).json({ success: false, error: 'Orçamento não encontrado' });
      return;
    }

    const formattedBudget = {
      id: budget.id,
      name: budget.name,
      amount: budget.amount,
      spent: budget.spent,
      category: budget.category,
      start_date: budget.start_date,
      end_date: budget.end_date,
      status: budget.status,
      created_at: budget.created_at,
      updated_at: budget.updated_at,
      remaining: budget.amount - budget.spent,
      progress: budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0
    };

    res.json({ success: true, budget: formattedBudget });
  } catch (e) {
    console.error('Erro ao buscar orçamento:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar orçamento' });
  }
});

apiRouter.post('/budgets', async (req: Request, res: Response) => {
  try {
    const { name, amount, category, start_date, end_date, description } = req.body;
    
    if (!name || !amount || !category || !start_date || !end_date) {
      res.status(400).json({ 
        success: false, 
        error: 'Campos obrigatórios: name, amount, category, start_date, end_date' 
      });
      return;
    }

    // Validações
    if (Number(amount) <= 0) {
      res.status(400).json({ success: false, error: 'Valor deve ser maior que zero' });
      return;
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    if (startDate >= endDate) {
      res.status(400).json({ success: false, error: 'Data de início deve ser anterior à data de fim' });
      return;
    }

    const created = await prisma.budget.create({
      data: {
        id: randomUUID(),
        name: String(name),
        amount: Number(amount),
        spent: 0,
        category: String(category),
        start_date: startDate,
        end_date: endDate,
        status: 'active'
      }
    });

    const formattedBudget = {
      id: created.id,
      name: created.name,
      amount: created.amount,
      spent: created.spent,
      category: created.category,
      start_date: created.start_date,
      end_date: created.end_date,
      status: created.status,
      created_at: created.created_at,
      updated_at: created.updated_at,
      remaining: created.amount - created.spent,
      progress: 0
    };

    res.status(201).json({ success: true, budget: formattedBudget });
  } catch (e: any) {
    console.error('Erro ao criar orçamento:', e);
    if (e.code === 'P2002') {
      res.status(400).json({ success: false, error: 'Orçamento com este nome já existe' });
    } else {
      res.status(500).json({ success: false, error: 'Erro ao criar orçamento' });
    }
  }
});

apiRouter.put('/budgets/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, amount, category, start_date, end_date, spent, status } = req.body;

    const updateData: any = { updated_at: new Date() };
    if (name) updateData.name = String(name);
    if (amount) updateData.amount = Number(amount);
    if (category) updateData.category = String(category);
    if (start_date) updateData.start_date = new Date(start_date);
    if (end_date) updateData.end_date = new Date(end_date);
    if (spent !== undefined) updateData.spent = Number(spent);
    if (status) updateData.status = String(status);

    // Validações
    if (updateData.amount && updateData.amount <= 0) {
      res.status(400).json({ success: false, error: 'Valor deve ser maior que zero' });
      return;
    }

    if (updateData.start_date && updateData.end_date && updateData.start_date >= updateData.end_date) {
      res.status(400).json({ success: false, error: 'Data de início deve ser anterior à data de fim' });
      return;
    }

    const updated = await prisma.budget.update({
      where: { id },
      data: updateData
    });

    const formattedBudget = {
      id: updated.id,
      name: updated.name,
      amount: updated.amount,
      spent: updated.spent,
      category: updated.category,
      start_date: updated.start_date,
      end_date: updated.end_date,
      status: updated.status,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
      remaining: updated.amount - updated.spent,
      progress: updated.amount > 0 ? (updated.spent / updated.amount) * 100 : 0
    };

    res.json({ success: true, budget: formattedBudget });
  } catch (e: any) {
    console.error('Erro ao atualizar orçamento:', e);
    if (e.code === 'P2025') {
      res.status(404).json({ success: false, error: 'Orçamento não encontrado' });
    } else {
      res.status(500).json({ success: false, error: 'Erro ao atualizar orçamento' });
    }
  }
});

apiRouter.delete('/budgets/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Soft delete - marcar como inativo
    await prisma.budget.update({
      where: { id },
      data: { 
        status: 'inactive',
        updated_at: new Date()
      }
    });

    res.json({ success: true, message: 'Orçamento inativado com sucesso' });
  } catch (e: any) {
    console.error('Erro ao inativar orçamento:', e);
    if (e.code === 'P2025') {
      res.status(404).json({ success: false, error: 'Orçamento não encontrado' });
    } else {
      res.status(500).json({ success: false, error: 'Erro ao inativar orçamento' });
    }
  }
});

// Endpoint para adicionar gasto ao orçamento
apiRouter.post('/budgets/:id/spend', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, description } = req.body;

    if (!amount || Number(amount) <= 0) {
      res.status(400).json({ success: false, error: 'Valor do gasto deve ser maior que zero' });
      return;
    }

    // Buscar orçamento atual
    const budget = await prisma.budget.findUnique({ where: { id } });
    
    if (!budget) {
      res.status(404).json({ success: false, error: 'Orçamento não encontrado' });
      return;
    }

    if (budget.status !== 'active') {
      res.status(400).json({ success: false, error: 'Não é possível adicionar gastos a orçamentos inativos' });
      return;
    }

    // Atualizar valor gasto
    const newSpent = budget.spent + Number(amount);
    
    const updated = await prisma.budget.update({
      where: { id },
      data: { 
        spent: newSpent,
        updated_at: new Date()
      }
    });

    const formattedBudget = {
      id: updated.id,
      name: updated.name,
      amount: updated.amount,
      spent: updated.spent,
      category: updated.category,
      start_date: updated.start_date,
      end_date: updated.end_date,
      status: updated.status,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
      remaining: updated.amount - updated.spent,
      progress: updated.amount > 0 ? (updated.spent / updated.amount) * 100 : 0
    };

    res.json({ 
      success: true, 
      budget: formattedBudget,
      message: `Gasto de R$ ${Number(amount).toFixed(2)} adicionado com sucesso`
    });
  } catch (e) {
    console.error('Erro ao adicionar gasto:', e);
    res.status(500).json({ success: false, error: 'Erro ao adicionar gasto' });
  }
});

// Payments (dados reais via Prisma: payments)
apiRouter.get('/payments', async (req: Request, res: Response) => {
  try {
    const { status, overdue, upcoming } = req.query as Record<string, string | undefined>;
    
    const where: any = {};
    if (status) where.status = status;
    
    // Filtros por data de vencimento
    const now = new Date();
    if (overdue === 'true') {
      where.due_date = { lt: now };
      where.status = { not: 'paid' };
    } else if (upcoming === 'true') {
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      where.due_date = { 
        gte: now,
        lte: nextWeek 
      };
      where.status = { not: 'paid' };
    }

    const payments = await prisma.payment.findMany({
      where,
      orderBy: { due_date: 'asc' },
      take: 100 // Limite de 100 pagamentos por vez
    });

    const formattedPayments = payments.map(payment => ({
      id: payment.id,
      amount: payment.amount,
      description: payment.description,
      status: payment.status,
      due_date: payment.due_date,
      created_at: payment.created_at,
      updated_at: payment.updated_at,
      is_overdue: payment.due_date < now && payment.status !== 'paid',
      days_until_due: Math.ceil((payment.due_date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    }));

    res.json({ success: true, payments: formattedPayments });
  } catch (e) {
    console.error('Erro ao buscar pagamentos:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar pagamentos' });
  }
});

apiRouter.get('/payments/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { id }
    });

    if (!payment) {
      res.status(404).json({ success: false, error: 'Pagamento não encontrado' });
      return;
    }

    const now = new Date();
    const formattedPayment = {
      id: payment.id,
      amount: payment.amount,
      description: payment.description,
      status: payment.status,
      due_date: payment.due_date,
      created_at: payment.created_at,
      updated_at: payment.updated_at,
      is_overdue: payment.due_date < now && payment.status !== 'paid',
      days_until_due: Math.ceil((payment.due_date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    };

    res.json({ success: true, payment: formattedPayment });
  } catch (e) {
    console.error('Erro ao buscar pagamento:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar pagamento' });
  }
});

apiRouter.post('/payments', async (req: Request, res: Response) => {
  try {
    const { amount, description, due_date } = req.body;
    
    if (!amount || !description || !due_date) {
      res.status(400).json({ 
        success: false, 
        error: 'Campos obrigatórios: amount, description, due_date' 
      });
      return;
    }

    // Validações
    if (Number(amount) <= 0) {
      res.status(400).json({ success: false, error: 'Valor deve ser maior que zero' });
      return;
    }

    const dueDate = new Date(due_date);
    if (isNaN(dueDate.getTime())) {
      res.status(400).json({ success: false, error: 'Data de vencimento inválida' });
      return;
    }

    const created = await prisma.payment.create({
      data: {
        id: randomUUID(),
        amount: Number(amount),
        description: String(description),
        due_date: dueDate,
        status: 'pending'
      }
    });

    const now = new Date();
    const formattedPayment = {
      id: created.id,
      amount: created.amount,
      description: created.description,
      status: created.status,
      due_date: created.due_date,
      created_at: created.created_at,
      updated_at: created.updated_at,
      is_overdue: created.due_date < now && created.status !== 'paid',
      days_until_due: Math.ceil((created.due_date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    };

    res.status(201).json({ success: true, payment: formattedPayment });
  } catch (e: any) {
    console.error('Erro ao criar pagamento:', e);
    res.status(500).json({ success: false, error: 'Erro ao criar pagamento' });
  }
});

apiRouter.put('/payments/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, description, due_date, status } = req.body;

    const updateData: any = { updated_at: new Date() };
    if (amount !== undefined) updateData.amount = Number(amount);
    if (description) updateData.description = String(description);
    if (due_date) {
      const dueDate = new Date(due_date);
      if (isNaN(dueDate.getTime())) {
        res.status(400).json({ success: false, error: 'Data de vencimento inválida' });
        return;
      }
      updateData.due_date = dueDate;
    }
    if (status) updateData.status = String(status);

    // Validações
    if (updateData.amount && updateData.amount <= 0) {
      res.status(400).json({ success: false, error: 'Valor deve ser maior que zero' });
      return;
    }

    const updated = await prisma.payment.update({
      where: { id },
      data: updateData
    });

    const now = new Date();
    const formattedPayment = {
      id: updated.id,
      amount: updated.amount,
      description: updated.description,
      status: updated.status,
      due_date: updated.due_date,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
      is_overdue: updated.due_date < now && updated.status !== 'paid',
      days_until_due: Math.ceil((updated.due_date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    };

    res.json({ success: true, payment: formattedPayment });
  } catch (e: any) {
    console.error('Erro ao atualizar pagamento:', e);
    if (e.code === 'P2025') {
      res.status(404).json({ success: false, error: 'Pagamento não encontrado' });
    } else {
      res.status(500).json({ success: false, error: 'Erro ao atualizar pagamento' });
    }
  }
});

apiRouter.delete('/payments/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Hard delete para pagamentos (diferente de soft delete de outros módulos)
    await prisma.payment.delete({
      where: { id }
    });

    res.json({ success: true, message: 'Pagamento excluído com sucesso' });
  } catch (e: any) {
    console.error('Erro ao excluir pagamento:', e);
    if (e.code === 'P2025') {
      res.status(404).json({ success: false, error: 'Pagamento não encontrado' });
    } else {
      res.status(500).json({ success: false, error: 'Erro ao excluir pagamento' });
    }
  }
});

// Endpoint para marcar pagamento como pago
apiRouter.post('/payments/:id/pay', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { payment_date, notes } = req.body;

    // Buscar pagamento atual
    const payment = await prisma.payment.findUnique({ where: { id } });
    
    if (!payment) {
      res.status(404).json({ success: false, error: 'Pagamento não encontrado' });
      return;
    }

    if (payment.status === 'paid') {
      res.status(400).json({ success: false, error: 'Pagamento já foi marcado como pago' });
      return;
    }

    // Atualizar status para pago
    const updated = await prisma.payment.update({
      where: { id },
      data: { 
        status: 'paid',
        updated_at: new Date()
      }
    });

    const now = new Date();
    const formattedPayment = {
      id: updated.id,
      amount: updated.amount,
      description: updated.description,
      status: updated.status,
      due_date: updated.due_date,
      created_at: updated.created_at,
      updated_at: updated.updated_at,
      is_overdue: false, // Não pode estar em atraso se foi pago
      days_until_due: Math.ceil((updated.due_date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    };

    res.json({ 
      success: true, 
      payment: formattedPayment,
      message: `Pagamento de R$ ${updated.amount.toFixed(2)} marcado como pago`
    });
  } catch (e) {
    console.error('Erro ao marcar pagamento como pago:', e);
    res.status(500).json({ success: false, error: 'Erro ao processar pagamento' });
  }
});

// Endpoint para estatísticas de pagamentos
apiRouter.get('/payments/stats/summary', async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Buscar todos os pagamentos relevantes
    const allPayments = await prisma.payment.findMany({
      where: {
        OR: [
          { status: { not: 'paid' } }, // Pendentes
          { 
            status: 'paid',
            updated_at: { gte: startOfMonth } // Pagos neste mês
          }
        ]
      }
    });

    // Calcular estatísticas
    const pending = allPayments.filter(p => p.status === 'pending');
    const overdue = pending.filter(p => p.due_date < now);
    const upcoming = pending.filter(p => p.due_date >= now && p.due_date <= nextWeek);
    const paidThisMonth = allPayments.filter(p => 
      p.status === 'paid' && p.updated_at >= startOfMonth && p.updated_at <= endOfMonth
    );

    const stats = {
      total_pending: pending.length,
      total_overdue: overdue.length,
      total_upcoming: upcoming.length,
      total_paid_this_month: paidThisMonth.length,
      amount_pending: pending.reduce((sum, p) => sum + p.amount, 0),
      amount_overdue: overdue.reduce((sum, p) => sum + p.amount, 0),
      amount_upcoming: upcoming.reduce((sum, p) => sum + p.amount, 0),
      amount_paid_this_month: paidThisMonth.reduce((sum, p) => sum + p.amount, 0)
    };

    res.json({ success: true, stats });
  } catch (e) {
    console.error('Erro ao buscar estatísticas de pagamentos:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar estatísticas' });
  }
});

// Time Clock (dados reais via Prisma: timeclock_entries)
apiRouter.get('/timeclock', async (req: Request, res: Response) => {
  try {
    const { userCpf, start, end } = req.query as Record<string, string | undefined>;
    let userId: string | undefined;
    if (userCpf) {
      try {
        const clean = String(userCpf).replace(/\D/g, '');
        const dbUser = await prisma.users.findUnique({ where: { cpf: clean } as any });
        userId = dbUser?.id;
      } catch {}
    }
    const where: any = {};
    if (userId) where.user_id = userId;
    if (start || end) {
      where.timestamp = {};
      if (start) where.timestamp.gte = new Date(start);
      if (end) where.timestamp.lte = new Date(end);
    }
    const list = await prisma.timeClockEntry.findMany({ where, orderBy: { timestamp: 'desc' } });
    const entries = list.map((t) => ({ id: t.id, type: (t.type as 'in' | 'out'), note: t.note, timestamp: t.timestamp }));
    res.json({ success: true, entries });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao listar registros de ponto' });
  }
});

apiRouter.post('/timeclock', async (req: Request, res: Response) => {
  const { type, note, userCpf } = req.body || {};
  if (!['in', 'out'].includes(type)) {
    res.status(400).json({ success: false, error: 'Campo obrigatório: type ("in" | "out")' });
    return;
  }
  try {
    let ownerUserId: string | null = null;
    if (userCpf) {
      try {
        const clean = String(userCpf).replace(/\D/g, '');
        const dbUser = await prisma.users.findUnique({ where: { cpf: clean } as any });
        ownerUserId = dbUser?.id ?? null;
      } catch (_) {
        // ignore
      }
    }
    const created = await prisma.timeClockEntry.create({
      data: {
        ...(ownerUserId ? { users: { connect: { id: ownerUserId } } } : {}),
        type: String(type),
        note: note ? String(note) : null,
        timestamp: new Date(),
      },
    });
    const entry = { id: created.id, type: (created.type as 'in' | 'out'), note: created.note ?? null, timestamp: created.timestamp };
    res.status(201).json({ success: true, entry });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao registrar ponto' });
  }
});

// Employees (dados reais via Prisma)
apiRouter.get('/employees', async (req: Request, res: Response) => {
  try {
    const list = await prisma.employees.findMany({ orderBy: { created_at: 'desc' } });
    res.json({ success: true, employees: list });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao listar funcionários' });
  }
});

apiRouter.get('/employees/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const found = await prisma.employees.findFirst({ where: { id: String(id) as any } });
    if (!found) { res.status(404).json({ success: false, error: 'Funcionário não encontrado' }); return; }
  res.json({ success: true, employee: found });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao buscar funcionário' });
  }
});

apiRouter.post('/employees', async (req: Request, res: Response) => {
  const { name, position, salary, cpf, userCpf } = req.body || {};
  if (!name || !position || typeof salary !== 'number' || !cpf) {
    res.status(400).json({ success: false, error: 'Campos obrigatórios: name, position, salary, cpf' });
    return;
  }
  try {
  let ownerUserId: string | null = null;
  if (userCpf) {
    try {
      const clean = String(userCpf).replace(/\D/g, '');
        const dbUser = await prisma.users.findUnique({ where: { cpf: clean } as any });
      ownerUserId = dbUser?.id ?? null;
      } catch (_) {}
    }
    const created = await prisma.employees.create({
      data: {
        id: randomUUID(),
        name: String(name),
    position: String(position),
    salary: Number(salary),
        cpf: String(cpf).replace(/\D/g, ''),
        ...(ownerUserId ? { users: { connect: { id: ownerUserId } } } : {}),
      },
    });
    res.status(201).json({ success: true, employee: created });
  } catch (e: any) {
    const msg = e?.code === 'P2002' ? 'CPF já cadastrado' : 'Erro ao criar funcionário';
    res.status(500).json({ success: false, error: msg });
  }
});

apiRouter.put('/employees/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, position, salary } = req.body || {};
  try {
    const data: any = { updated_at: new Date() };
    if (name !== undefined) data.name = String(name);
    if (position !== undefined) data.position = String(position);
    if (salary !== undefined) data.salary = Number(salary);
    const updated = await prisma.employees.updateMany({ where: { id: String(id) as any }, data });
    res.json({ success: true, updated });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao atualizar funcionário' });
  }
});

apiRouter.delete('/employees/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const removed = await prisma.employees.deleteMany({ where: { id: String(id) as any } });
    res.json({ success: true, removed });
  } catch (e) {
    res.status(500).json({ success: false, error: 'Erro ao excluir funcionário' });
  }
});

// ===================== INTEGRAÇÕES (Mocks com resiliência) =====================

type CircuitState = {
  failures: number;
  openedAt?: number;
};

const circuitBreakers: Record<string, CircuitState> = Object.create(null);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withResilience<T>(
  key: string,
  action: () => Promise<T>,
  options: { timeoutMs?: number; maxRetries?: number; baseDelayMs?: number; openAfterFailures?: number; halfOpenMs?: number } = {}
): Promise<T> {
  const {
    timeoutMs = 2000,
    maxRetries = 2,
    baseDelayMs = 150,
    openAfterFailures = 5,
    halfOpenMs = 30000,
  } = options;

  const state = (circuitBreakers[key] ||= { failures: 0 });
  const now = Date.now();
  if (state.openedAt && now - state.openedAt < halfOpenMs) {
    throw Object.assign(new Error('Circuit breaker aberto'), { code: 'CIRCUIT_OPEN' });
  }

  let attempt = 0;
  while (true) {
    attempt += 1;
    try {
      const result = await Promise.race<Promise<T>>([
        action(),
        new Promise<never>((_, reject) => setTimeout(() => reject(Object.assign(new Error('Timeout'), { code: 'ETIMEDOUT' })), timeoutMs)),
      ]);
      // sucesso: zera falhas
      state.failures = 0;
      state.openedAt = undefined;
      return result;
    } catch (err: any) {
      state.failures += 1;
      if (state.failures >= openAfterFailures) {
        state.openedAt = Date.now();
      }
      const canRetry = attempt <= maxRetries && ['ETIMEDOUT'].includes(err?.code);
      if (!canRetry) {
        throw err;
      }
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      await sleep(delay);
    }
  }
}

// Armazenamento em memória (dev)
type ESocialEvent = { id: string; employeeId: string; type: string; status: 'queued' | 'processed' | 'failed'; createdAt: string; xmlContent?: string };
const eSocialEvents: ESocialEvent[] = [];

type StripePayment = { id: string; amount: number; currency: string; description: string; status: 'requires_payment_method' | 'processing' | 'succeeded' | 'failed'; createdAt: string; method?: string };
const stripePayments: StripePayment[] = [];

type SPTransRoute = { id: string; name: string; code: string };
type SPTransArrival = { stopId: string; line: string; etaMinutes: number };
type SPTransStop = { id: string; name: string; latitude: number; longitude: number };

type TimeCardEntry = { id: string; employeeId: string; type: 'entry' | 'exit' | 'break_start' | 'break_end'; timestamp: string };
const timeCardEntries: TimeCardEntry[] = [];

// eSocial
apiRouter.post('/integrations/esocial/events', async (req: Request, res: Response) => {
  try {
    const { employeeId, type } = req.body || {};
    if (!employeeId || !type) {
      res.status(400).json({ success: false, error: 'Campos obrigatórios: employeeId, type' });
      return;
    }
    const result = await withResilience('esocial:create', async () => {
      await sleep(100);
      const ev: ESocialEvent = { id: randomUUID(), employeeId: String(employeeId), type: String(type), status: 'queued', createdAt: new Date().toISOString() };
      eSocialEvents.unshift(ev);
      return ev;
    });
    res.status(201).json(result);
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha eSocial' });
  }
});

apiRouter.get('/integrations/esocial/events', async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.query as { employeeId?: string };
    const list = await withResilience('esocial:list', async () => {
      await sleep(50);
      return employeeId ? eSocialEvents.filter(e => e.employeeId === employeeId) : eSocialEvents.slice(0, 100);
    });
    res.json(list);
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha eSocial' });
  }
});

apiRouter.post('/integrations/esocial/generate-xml', async (req: Request, res: Response) => {
  try {
    const { eventType, employeeData } = req.body || {};
    if (!eventType) { res.status(400).json({ success: false, error: 'eventType é obrigatório' }); return; }
    const xml = await withResilience('esocial:xml', async () => {
      await sleep(80);
      return `<?xml version="1.0" encoding="UTF-8"?><eSocial><event type="${String(eventType)}"/></eSocial>`;
    });
    res.json({ xmlContent: xml });
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha ao gerar XML' });
  }
});

// Stripe (mock)
apiRouter.post('/integrations/stripe/payment-intents', async (req: Request, res: Response) => {
  try {
    const { amount, currency, description } = req.body || {};
    if (typeof amount !== 'number' || !currency) {
      res.status(400).json({ success: false, error: 'Campos obrigatórios: amount (number), currency (string)' });
      return;
    }
    const payment = await withResilience('stripe:create', async () => {
      await sleep(100);
      const p: StripePayment = { id: `pi_${randomUUID()}`, amount: Number(amount), currency: String(currency), description: description ? String(description) : '', status: 'requires_payment_method', createdAt: new Date().toISOString() };
      stripePayments.unshift(p);
      return p;
    });
    res.status(201).json(payment);
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha Stripe' });
  }
});

apiRouter.post('/integrations/stripe/process-payment', async (req: Request, res: Response) => {
  try {
    const { paymentIntentId, paymentMethod } = req.body || {};
    if (!paymentIntentId || !paymentMethod) { res.status(400).json({ success: false, error: 'Campos obrigatórios: paymentIntentId, paymentMethod' }); return; }
    const updated = await withResilience('stripe:process', async () => {
      await sleep(150);
      const p = stripePayments.find(s => s.id === paymentIntentId);
      if (!p) throw Object.assign(new Error('Payment not found'), { code: 'NOT_FOUND' });
      p.method = String(paymentMethod);
      p.status = 'succeeded';
      return p;
    });
    res.json(updated);
  } catch (e: any) {
    const code = e?.code === 'NOT_FOUND' ? 404 : 503;
    res.status(code).json({ success: false, error: e?.message || 'Falha processamento' });
  }
});

apiRouter.get('/integrations/stripe/payments', async (req: Request, res: Response) => {
  try {
    const { limit } = req.query as any;
    const list = await withResilience('stripe:list', async () => {
      await sleep(50);
      const n = Math.max(1, Math.min(200, Number(limit) || 50));
      return stripePayments.slice(0, n);
    });
    res.json(list);
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha listagem Stripe' });
  }
});

// SPTrans (mock)
apiRouter.get('/integrations/sptrans/routes', async (req: Request, res: Response) => {
  try {
    const { q } = req.query as any;
    const routes = await withResilience('sptrans:routes', async () => {
      await sleep(60);
      const base: SPTransRoute[] = [
        { id: '1', name: 'Linha 8000-10 Term. Lapa - Pq. Dom Pedro II', code: '8000-10' },
        { id: '2', name: 'Linha 876A-10 Term. Lapa - Itaim Bibi', code: '876A-10' },
        { id: '3', name: 'Linha 875A-10 Pq. Dom Pedro II - Lapa', code: '875A-10' },
      ];
      if (!q) return base;
      const query = String(q).toLowerCase();
      return base.filter(r => r.name.toLowerCase().includes(query) || r.code.toLowerCase().includes(query));
    });
    res.json(routes);
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha SPTrans rotas' });
  }
});

apiRouter.get('/integrations/sptrans/arrivals/:stopId', async (req: Request, res: Response) => {
  try {
    const { stopId } = req.params;
    const arrivals = await withResilience('sptrans:arrivals', async () => {
      await sleep(80);
      const list: SPTransArrival[] = [
        { stopId, line: '8000-10', etaMinutes: 3 },
        { stopId, line: '876A-10', etaMinutes: 7 },
      ];
      return list;
    });
    res.json(arrivals);
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha SPTrans chegadas' });
  }
});

apiRouter.get('/integrations/sptrans/stops/nearby', async (req: Request, res: Response) => {
  try {
    const { lat, lng, radius } = req.query as any;
    if (lat === undefined || lng === undefined) { res.status(400).json({ success: false, error: 'lat e lng são obrigatórios' }); return; }
    const stops = await withResilience('sptrans:stops', async () => {
      await sleep(70);
      const base: SPTransStop[] = [
        { id: 's1', name: 'Ponto Av. Paulista 1000', latitude: Number(lat), longitude: Number(lng) },
        { id: 's2', name: 'Ponto R. da Consolação 500', latitude: Number(lat) + 0.001, longitude: Number(lng) - 0.001 },
      ];
      return base;
    });
    res.json(stops);
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha SPTrans paradas' });
  }
});

// Timecard (mock)
apiRouter.post('/integrations/timecard/entries', async (req: Request, res: Response) => {
  try {
    const { employeeId, type, timestamp } = req.body || {};
    if (!employeeId || !type) { res.status(400).json({ success: false, error: 'employeeId e type são obrigatórios' }); return; }
    const entry = await withResilience('timecard:create', async () => {
      await sleep(40);
      const e: TimeCardEntry = { id: randomUUID(), employeeId: String(employeeId), type: String(type), timestamp: timestamp || new Date().toISOString() };
      timeCardEntries.push(e);
      return e;
    });
    res.status(201).json(entry);
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha timecard' });
  }
});

apiRouter.get('/integrations/timecard/entries', async (req: Request, res: Response) => {
  try {
    const { employeeId, startDate, endDate } = req.query as any;
    const list = await withResilience('timecard:list', async () => {
      await sleep(40);
      return timeCardEntries.filter(e => (!employeeId || e.employeeId === String(employeeId)) && (!startDate || e.timestamp >= String(startDate)) && (!endDate || e.timestamp <= String(endDate)));
    });
    res.json(list);
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha timecard listagem' });
  }
});

apiRouter.get('/integrations/timecard/calculate-hours', async (req: Request, res: Response) => {
  try {
    const { employeeId, date } = req.query as any;
    if (!employeeId || !date) { res.status(400).json({ success: false, error: 'employeeId e date são obrigatórios' }); return; }
    const calc = await withResilience('timecard:calc', async () => {
      await sleep(60);
      const dayEntries = timeCardEntries.filter(e => e.employeeId === String(employeeId) && e.timestamp.startsWith(String(date)));
      const total = Math.max(0, Math.floor(dayEntries.length / 2) * 4); // mock simples
      const regular = Math.min(8, total);
      const overtime = Math.max(0, total - 8);
      const breaks = Math.max(0, Math.floor(dayEntries.length / 4) * 1);
      return { totalHours: total, regularHours: regular, overtime, breaks };
    });
    res.json(calc);
  } catch (e: any) {
    res.status(503).json({ success: false, error: e?.message || 'Falha timecard cálculo' });
  }
});

// ==========================================
// 💬 COMMUNICATION - SISTEMA DE MENSAGENS
// ==========================================

// Buscar mensagens de um grupo
apiRouter.get('/messages/:groupId', async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const { limit = '50', offset = '0' } = req.query as Record<string, string | undefined>;

    const messages = await prisma.message.findMany({
      where: { 
        group_id: groupId,
        active: true 
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            nickname: true,
            user_photo: true
          }
        },
        reply_to: {
          select: {
            id: true,
            content: true,
            sender: {
              select: { name: true }
            }
          }
        },
        reads: {
          select: {
            user_id: true,
            read_at: true
          }
        },
        _count: {
          select: { replies: true }
        }
      },
      orderBy: { created_at: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset)
    });

    const formattedMessages = messages.map(message => ({
      id: message.id,
      content: message.content,
      type: message.type,
      status: message.status,
      metadata: message.metadata,
      created_at: message.created_at,
      sender: {
        id: message.sender.id,
        name: message.sender.name,
        nickname: message.sender.nickname,
        avatar: message.sender.user_photo ? `data:image/jpeg;base64,${Buffer.from(message.sender.user_photo).toString('base64')}` : null
      },
      reply_to: message.reply_to ? {
        id: message.reply_to.id,
        content: message.reply_to.content,
        sender_name: message.reply_to.sender.name
      } : null,
      reads: message.reads,
      replies_count: message._count.replies
    }));

    res.json({ success: true, messages: formattedMessages });
  } catch (e) {
    console.error('Erro ao buscar mensagens:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar mensagens' });
  }
});

// Enviar mensagem
apiRouter.post('/messages', async (req: Request, res: Response) => {
  try {
    const { content, type = 'text', group_id, reply_to_id, metadata } = req.body;
    const sender_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação

    if (!content || !group_id) {
      return res.status(400).json({ 
        success: false, 
        error: 'Conteúdo e grupo são obrigatórios' 
      });
    }

    const message = await prisma.message.create({
      data: {
        content,
        type,
        sender_id,
        group_id,
        reply_to_id,
        metadata,
        status: 'sent'
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            nickname: true,
            user_photo: true
          }
        },
        reply_to: {
          select: {
            id: true,
            content: true,
            sender: {
              select: { name: true }
            }
          }
        }
      }
    });

    const formattedMessage = {
      id: message.id,
      content: message.content,
      type: message.type,
      status: message.status,
      metadata: message.metadata,
      created_at: message.created_at,
      sender: {
        id: message.sender.id,
        name: message.sender.name,
        nickname: message.sender.nickname,
        avatar: message.sender.user_photo ? `data:image/jpeg;base64,${Buffer.from(message.sender.user_photo).toString('base64')}` : null
      },
      reply_to: message.reply_to ? {
        id: message.reply_to.id,
        content: message.reply_to.content,
        sender_name: message.reply_to.sender.name
      } : null
    };

    res.json({ success: true, message: formattedMessage });
  } catch (e) {
    console.error('Erro ao enviar mensagem:', e);
    res.status(500).json({ success: false, error: 'Erro ao enviar mensagem' });
  }
});

// Marcar mensagem como lida
apiRouter.post('/messages/:messageId/read', async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação

    await prisma.messageRead.upsert({
      where: {
        message_id_user_id: {
          message_id: messageId,
          user_id
        }
      },
      update: {
        read_at: new Date()
      },
      create: {
        message_id: messageId,
        user_id,
        read_at: new Date()
      }
    });

    res.json({ success: true, message: 'Mensagem marcada como lida' });
  } catch (e) {
    console.error('Erro ao marcar mensagem como lida:', e);
    res.status(500).json({ success: false, error: 'Erro ao marcar mensagem como lida' });
  }
});

// Buscar grupos do usuário
apiRouter.get('/groups', async (req: Request, res: Response) => {
  try {
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação

    const userGroups = await prisma.user_group_roles.findMany({
      where: { 
        user_id,
        ativo: true 
      },
      include: {
        groups: {
          include: {
            _count: {
              select: {
                messages: {
                  where: { active: true }
                }
              }
            }
          }
        }
      }
    });

    const groups = userGroups.map(ug => ({
      id: ug.groups.id,
      name: ug.groups.name,
      description: ug.groups.description,
      type: ug.groups.type,
      role: ug.role,
      messages_count: ug.groups._count.messages,
      created_at: ug.groups.created_at
    }));

    res.json({ success: true, groups });
  } catch (e) {
    console.error('Erro ao buscar grupos:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar grupos' });
  }
});

// Estatísticas de comunicação
apiRouter.get('/communication/stats', async (req: Request, res: Response) => {
  try {
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação

    // Buscar grupos do usuário
    const userGroups = await prisma.user_group_roles.findMany({
      where: { user_id, ativo: true },
      select: { group_id: true }
    });

    const groupIds = userGroups.map(ug => ug.group_id);

    // Contar mensagens não lidas
    const unreadMessages = await prisma.message.count({
      where: {
        group_id: { in: groupIds },
        active: true,
        NOT: {
          reads: {
            some: { user_id }
          }
        }
      }
    });

    // Contar mensagens de hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayMessages = await prisma.message.count({
      where: {
        group_id: { in: groupIds },
        active: true,
        created_at: { gte: today }
      }
    });

    // Contar grupos ativos
    const activeGroups = groupIds.length;

    res.json({ 
      success: true, 
      stats: {
        unread_messages: unreadMessages,
        today_messages: todayMessages,
        active_groups: activeGroups,
        total_groups: activeGroups
      }
    });
  } catch (e) {
    console.error('Erro ao buscar estatísticas:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar estatísticas' });
  }
});

// ==========================================
// 🎮 GAMIFICATION - SISTEMA DE GAMIFICAÇÃO
// ==========================================

// Buscar estatísticas de gamificação do usuário
apiRouter.get('/gamification/stats', async (req: Request, res: Response) => {
  try {
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação

    // Buscar pontos totais do usuário
    const totalPointsResult = await prisma.userPoints.aggregate({
      where: { user_id },
      _sum: { points: true }
    });

    // Buscar achievements desbloqueados
    const unlockedAchievements = await prisma.userAchievement.count({
      where: { user_id }
    });

    // Buscar total de achievements disponíveis
    const totalAchievements = await prisma.achievement.count({
      where: { active: true }
    });

    // Buscar desafios ativos
    const activeChallenges = await prisma.userChallenge.count({
      where: { 
        user_id,
        status: 'active'
      }
    });

    // Buscar desafios completados
    const completedChallenges = await prisma.userChallenge.count({
      where: { 
        user_id,
        status: 'completed'
      }
    });

    // Buscar pontos por categoria (últimos 30 dias)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const pointsByCategory = await prisma.userPoints.groupBy({
      by: ['category'],
      where: {
        user_id,
        created_at: { gte: thirtyDaysAgo }
      },
      _sum: { points: true }
    });

    // Calcular nível baseado nos pontos totais
    const totalPoints = totalPointsResult._sum.points || 0;
    const level = Math.floor(totalPoints / 100) + 1; // 100 pontos por nível
    const pointsToNextLevel = (level * 100) - totalPoints;

    const stats = {
      total_points: totalPoints,
      level,
      points_to_next_level: Math.max(0, pointsToNextLevel),
      unlocked_achievements: unlockedAchievements,
      total_achievements: totalAchievements,
      achievement_completion_rate: totalAchievements > 0 ? (unlockedAchievements / totalAchievements * 100).toFixed(1) : '0',
      active_challenges: activeChallenges,
      completed_challenges: completedChallenges,
      points_by_category: pointsByCategory.reduce((acc, item) => {
        acc[item.category] = item._sum.points || 0;
        return acc;
      }, {} as Record<string, number>)
    };

    res.json({ success: true, stats });
  } catch (e) {
    console.error('Erro ao buscar estatísticas de gamificação:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar estatísticas' });
  }
});

// Buscar achievements do usuário
apiRouter.get('/gamification/achievements', async (req: Request, res: Response) => {
  try {
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação
    const { unlocked_only } = req.query as Record<string, string | undefined>;

    let achievements;

    if (unlocked_only === 'true') {
      // Apenas achievements desbloqueados
      achievements = await prisma.userAchievement.findMany({
        where: { user_id },
        include: {
          achievement: true
        },
        orderBy: { unlocked_at: 'desc' }
      });

      const formattedAchievements = achievements.map(ua => ({
        ...ua.achievement,
        unlocked_at: ua.unlocked_at,
        progress: ua.progress,
        unlocked: true
      }));

      res.json({ success: true, achievements: formattedAchievements });
    } else {
      // Todos os achievements com status de desbloqueio
      const allAchievements = await prisma.achievement.findMany({
        where: { active: true },
        orderBy: [{ category: 'asc' }, { points: 'desc' }]
      });

      const userAchievements = await prisma.userAchievement.findMany({
        where: { user_id },
        select: {
          achievement_id: true,
          unlocked_at: true,
          progress: true
        }
      });

      const userAchievementMap = new Map(
        userAchievements.map(ua => [ua.achievement_id, ua])
      );

      const formattedAchievements = allAchievements.map(achievement => {
        const userAchievement = userAchievementMap.get(achievement.id);
        return {
          ...achievement,
          unlocked: !!userAchievement,
          unlocked_at: userAchievement?.unlocked_at || null,
          progress: userAchievement?.progress || null
        };
      });

      res.json({ success: true, achievements: formattedAchievements });
    }
  } catch (e) {
    console.error('Erro ao buscar achievements:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar achievements' });
  }
});

// Buscar desafios ativos
apiRouter.get('/gamification/challenges', async (req: Request, res: Response) => {
  try {
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação
    const { status = 'active' } = req.query as Record<string, string | undefined>;

    const now = new Date();

    if (status === 'available') {
      // Desafios disponíveis (não iniciados pelo usuário)
      const userChallengeIds = await prisma.userChallenge.findMany({
        where: { user_id },
        select: { challenge_id: true }
      });

      const excludeIds = userChallengeIds.map(uc => uc.challenge_id);

      const availableChallenges = await prisma.challenge.findMany({
        where: {
          active: true,
          start_date: { lte: now },
          end_date: { gte: now },
          id: excludeIds.length > 0 ? { notIn: excludeIds } : undefined
        },
        orderBy: { reward_points: 'desc' }
      });

      res.json({ success: true, challenges: availableChallenges });
    } else {
      // Desafios do usuário por status
      const userChallenges = await prisma.userChallenge.findMany({
        where: { 
          user_id,
          status: status as string
        },
        include: {
          challenge: true
        },
        orderBy: { started_at: 'desc' }
      });

      const formattedChallenges = userChallenges.map(uc => ({
        ...uc.challenge,
        user_status: uc.status,
        progress: uc.progress,
        started_at: uc.started_at,
        completed_at: uc.completed_at
      }));

      res.json({ success: true, challenges: formattedChallenges });
    }
  } catch (e) {
    console.error('Erro ao buscar desafios:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar desafios' });
  }
});

// Aceitar um desafio
apiRouter.post('/gamification/challenges/:challengeId/accept', async (req: Request, res: Response) => {
  try {
    const { challengeId } = req.params;
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação

    // Verificar se o desafio existe e está ativo
    const challenge = await prisma.challenge.findFirst({
      where: {
        id: challengeId,
        active: true,
        start_date: { lte: new Date() },
        end_date: { gte: new Date() }
      }
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        error: 'Desafio não encontrado ou não está disponível'
      });
    }

    // Verificar se o usuário já aceitou este desafio
    const existingUserChallenge = await prisma.userChallenge.findUnique({
      where: {
        user_id_challenge_id: {
          user_id,
          challenge_id: challengeId
        }
      }
    });

    if (existingUserChallenge) {
      return res.status(400).json({
        success: false,
        error: 'Você já aceitou este desafio'
      });
    }

    // Aceitar o desafio
    const userChallenge = await prisma.userChallenge.create({
      data: {
        user_id,
        challenge_id: challengeId,
        status: 'active',
        progress: {}
      },
      include: {
        challenge: true
      }
    });

    res.json({ 
      success: true, 
      message: 'Desafio aceito com sucesso!',
      challenge: {
        ...userChallenge.challenge,
        user_status: userChallenge.status,
        progress: userChallenge.progress,
        started_at: userChallenge.started_at
      }
    });
  } catch (e) {
    console.error('Erro ao aceitar desafio:', e);
    res.status(500).json({ success: false, error: 'Erro ao aceitar desafio' });
  }
});

// Adicionar pontos para uma ação
apiRouter.post('/gamification/points', async (req: Request, res: Response) => {
  try {
    const { action, points, category, reference_id, metadata } = req.body;
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação

    if (!action || !points || !category) {
      return res.status(400).json({
        success: false,
        error: 'Ação, pontos e categoria são obrigatórios'
      });
    }

    // Adicionar pontos
    const userPoints = await prisma.userPoints.create({
      data: {
        user_id,
        action,
        points: parseInt(points),
        category,
        reference_id,
        metadata
      }
    });

    // TODO: Verificar achievements e desafios que podem ser desbloqueados

    res.json({ 
      success: true, 
      message: `${points} pontos adicionados por ${action}`,
      points: userPoints
    });
  } catch (e) {
    console.error('Erro ao adicionar pontos:', e);
    res.status(500).json({ success: false, error: 'Erro ao adicionar pontos' });
  }
});

// Buscar ranking familiar/geral
apiRouter.get('/gamification/leaderboard', async (req: Request, res: Response) => {
  try {
    const { period = 'all_time', limit = '10' } = req.query as Record<string, string | undefined>;

    let dateFilter = {};
    
    if (period === 'week') {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { created_at: { gte: oneWeekAgo } };
    } else if (period === 'month') {
      const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      dateFilter = { created_at: { gte: oneMonthAgo } };
    }

    // Buscar pontos agrupados por usuário
    const userPointsRaw = await prisma.userPoints.groupBy({
      by: ['user_id'],
      where: dateFilter,
      _sum: { points: true },
      orderBy: { _sum: { points: 'desc' } },
      take: parseInt(limit)
    });

    // Buscar informações dos usuários
    const userIds = userPointsRaw.map(up => up.user_id);
    const users = await prisma.users.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        name: true,
        nickname: true,
        user_photo: true
      }
    });

    const userMap = new Map(users.map(user => [user.id, user]));

    const leaderboard = userPointsRaw.map((userPoints, index) => {
      const user = userMap.get(userPoints.user_id);
      return {
        rank: index + 1,
        user_id: userPoints.user_id,
        name: user?.name || 'Usuário Desconhecido',
        nickname: user?.nickname,
        avatar: user?.user_photo ? `data:image/jpeg;base64,${Buffer.from(user.user_photo).toString('base64')}` : null,
        total_points: userPoints._sum.points || 0
      };
    });

    res.json({ success: true, leaderboard, period });
  } catch (e) {
    console.error('Erro ao buscar ranking:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar ranking' });
  }
});

// ==========================================
// ⚙️ USER SETTINGS - CONFIGURAÇÕES DE USUÁRIO
// ==========================================

// Buscar configurações do usuário
apiRouter.get('/settings', async (req: Request, res: Response) => {
  try {
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação

    let userSettings = await prisma.userSettings.findUnique({
      where: { user_id }
    });

    // Se não existir, criar com configurações padrão
    if (!userSettings) {
      const defaultSettings = {
        theme: {
          mode: 'system', // system, light, dark
          primary_color: '#007AFF',
          accent_color: '#34C759',
          font_size: 'medium', // small, medium, large
          font_family: 'system'
        },
        preferences: {
          language: 'pt-BR',
          currency: 'BRL',
          date_format: 'DD/MM/YYYY',
          time_format: '24h',
          first_day_of_week: 'monday'
        },
        ui_config: {
          sidebar_collapsed: false,
          show_animations: true,
          compact_mode: false,
          high_contrast: false,
          reduce_motion: false
        },
        notifications: {
          email_enabled: true,
          push_enabled: true,
          task_reminders: true,
          payment_alerts: true,
          achievement_notifications: true,
          quiet_hours: {
            enabled: false,
            start: '22:00',
            end: '08:00'
          }
        },
        privacy: {
          profile_visibility: 'family', // public, family, private
          activity_tracking: true,
          data_sharing: false,
          analytics_enabled: true
        }
      };

      userSettings = await prisma.userSettings.create({
        data: {
          user_id,
          theme: defaultSettings.theme,
          preferences: defaultSettings.preferences,
          ui_config: defaultSettings.ui_config,
          notifications: defaultSettings.notifications,
          privacy: defaultSettings.privacy
        }
      });
    }

    res.json({ 
      success: true, 
      settings: {
        id: userSettings.id,
        theme: userSettings.theme,
        preferences: userSettings.preferences,
        ui_config: userSettings.ui_config,
        notifications: userSettings.notifications,
        privacy: userSettings.privacy,
        updated_at: userSettings.updated_at
      }
    });
  } catch (e) {
    console.error('Erro ao buscar configurações:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar configurações' });
  }
});

// Atualizar configurações do usuário
apiRouter.put('/settings', async (req: Request, res: Response) => {
  try {
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação
    const { theme, preferences, ui_config, notifications, privacy } = req.body;

    // Buscar configurações existentes
    let userSettings = await prisma.userSettings.findUnique({
      where: { user_id }
    });

    if (!userSettings) {
      // Criar se não existir
      userSettings = await prisma.userSettings.create({
        data: {
          user_id,
          theme: theme || {},
          preferences: preferences || {},
          ui_config: ui_config || {},
          notifications: notifications || {},
          privacy: privacy || {}
        }
      });
    } else {
      // Atualizar configurações existentes (merge)
      const updatedData: any = { updated_at: new Date() };
      
      if (theme !== undefined) {
        updatedData.theme = { ...userSettings.theme as any, ...theme };
      }
      if (preferences !== undefined) {
        updatedData.preferences = { ...userSettings.preferences as any, ...preferences };
      }
      if (ui_config !== undefined) {
        updatedData.ui_config = { ...userSettings.ui_config as any, ...ui_config };
      }
      if (notifications !== undefined) {
        updatedData.notifications = { ...userSettings.notifications as any, ...notifications };
      }
      if (privacy !== undefined) {
        updatedData.privacy = { ...userSettings.privacy as any, ...privacy };
      }

      userSettings = await prisma.userSettings.update({
        where: { user_id },
        data: updatedData
      });
    }

    res.json({ 
      success: true, 
      message: 'Configurações atualizadas com sucesso',
      settings: {
        id: userSettings.id,
        theme: userSettings.theme,
        preferences: userSettings.preferences,
        ui_config: userSettings.ui_config,
        notifications: userSettings.notifications,
        privacy: userSettings.privacy,
        updated_at: userSettings.updated_at
      }
    });
  } catch (e) {
    console.error('Erro ao atualizar configurações:', e);
    res.status(500).json({ success: false, error: 'Erro ao atualizar configurações' });
  }
});

// Atualizar apenas configurações de tema
apiRouter.put('/settings/theme', async (req: Request, res: Response) => {
  try {
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação
    const themeConfig = req.body;

    const userSettings = await prisma.userSettings.upsert({
      where: { user_id },
      update: {
        theme: themeConfig,
        updated_at: new Date()
      },
      create: {
        user_id,
        theme: themeConfig,
        preferences: {},
        ui_config: {},
        notifications: {},
        privacy: {}
      }
    });

    res.json({ 
      success: true, 
      message: 'Tema atualizado com sucesso',
      theme: userSettings.theme
    });
  } catch (e) {
    console.error('Erro ao atualizar tema:', e);
    res.status(500).json({ success: false, error: 'Erro ao atualizar tema' });
  }
});

// Resetar configurações para padrão
apiRouter.post('/settings/reset', async (req: Request, res: Response) => {
  try {
    const user_id = '550e8400-e29b-41d4-a716-446655440000'; // TODO: Pegar do token de autenticação
    const { section } = req.body; // 'all', 'theme', 'preferences', etc.

    const defaultSettings = {
      theme: {
        mode: 'system',
        primary_color: '#007AFF',
        accent_color: '#34C759',
        font_size: 'medium',
        font_family: 'system'
      },
      preferences: {
        language: 'pt-BR',
        currency: 'BRL',
        date_format: 'DD/MM/YYYY',
        time_format: '24h',
        first_day_of_week: 'monday'
      },
      ui_config: {
        sidebar_collapsed: false,
        show_animations: true,
        compact_mode: false,
        high_contrast: false,
        reduce_motion: false
      },
      notifications: {
        email_enabled: true,
        push_enabled: true,
        task_reminders: true,
        payment_alerts: true,
        achievement_notifications: true,
        quiet_hours: {
          enabled: false,
          start: '22:00',
          end: '08:00'
        }
      },
      privacy: {
        profile_visibility: 'family',
        activity_tracking: true,
        data_sharing: false,
        analytics_enabled: true
      }
    };

    let updateData: any = { updated_at: new Date() };

    if (section === 'all') {
      updateData = { ...defaultSettings, updated_at: new Date() };
    } else if (section && defaultSettings[section as keyof typeof defaultSettings]) {
      updateData[section] = defaultSettings[section as keyof typeof defaultSettings];
    } else {
      return res.status(400).json({
        success: false,
        error: 'Seção inválida. Use: all, theme, preferences, ui_config, notifications, privacy'
      });
    }

    const userSettings = await prisma.userSettings.upsert({
      where: { user_id },
      update: updateData,
      create: {
        user_id,
        ...defaultSettings
      }
    });

    res.json({ 
      success: true, 
      message: `Configurações ${section === 'all' ? 'gerais' : `de ${section}`} resetadas com sucesso`,
      settings: {
        id: userSettings.id,
        theme: userSettings.theme,
        preferences: userSettings.preferences,
        ui_config: userSettings.ui_config,
        notifications: userSettings.notifications,
        privacy: userSettings.privacy,
        updated_at: userSettings.updated_at
      }
    });
  } catch (e) {
    console.error('Erro ao resetar configurações:', e);
    res.status(500).json({ success: false, error: 'Erro ao resetar configurações' });
  }
});

// ==========================================
// 👥 USER MANAGEMENT - GESTÃO DE USUÁRIOS
// ==========================================

// Listar usuários (apenas administradores)
apiRouter.get('/admin/users', async (req: Request, res: Response) => {
  try {
    // TODO: Verificar se o usuário tem permissões de administrador
    const { status, profile, search, limit = '50', offset = '0' } = req.query as Record<string, string | undefined>;

    const where: any = {};
    
    if (status) where.active = status === 'active';
    if (profile) where.profile = profile;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { cpf: { contains: search } }
      ];
    }

    const [users, totalCount] = await Promise.all([
      prisma.users.findMany({
        where,
        select: {
          id: true,
          name: true,
          nickname: true,
          email: true,
          cpf: true,
          phone: true,
          profile: true,
          active: true,
          created_at: true,
          last_login: true,
          platforms: true,
          permissions: true,
          user_photo: false // Não incluir foto na listagem por performance
        },
        orderBy: { created_at: 'desc' },
        take: parseInt(limit),
        skip: parseInt(offset)
      }),
      prisma.users.count({ where })
    ]);

    const formattedUsers = users.map(user => ({
      ...user,
      cpf: user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'), // Formatar CPF
      platforms: user.platforms || [],
      permissions: user.permissions || [],
      days_since_login: user.last_login ? 
        Math.floor((Date.now() - new Date(user.last_login).getTime()) / (1000 * 60 * 60 * 24)) : null
    }));

    res.json({ 
      success: true, 
      users: formattedUsers,
      pagination: {
        total: totalCount,
        limit: parseInt(limit),
        offset: parseInt(offset),
        has_more: parseInt(offset) + parseInt(limit) < totalCount
      }
    });
  } catch (e) {
    console.error('Erro ao listar usuários:', e);
    res.status(500).json({ success: false, error: 'Erro ao listar usuários' });
  }
});

// Buscar usuário específico
apiRouter.get('/admin/users/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        user_consents: {
          orderBy: { created_at: 'desc' },
          take: 1
        },
        user_settings: true,
        _count: {
          select: {
            budgets: true,
            payments: true,
            tasks: { where: { creator_id: userId } },
            messages: true,
            user_achievements: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado'
      });
    }

    const formattedUser = {
      ...user,
      cpf: user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
      platforms: user.platforms || [],
      permissions: user.permissions || [],
      user_photo: user.user_photo ? `data:image/jpeg;base64,${Buffer.from(user.user_photo).toString('base64')}` : null,
      stats: user._count,
      last_consent: user.user_consents[0] || null,
      settings_configured: !!user.user_settings
    };

    res.json({ success: true, user: formattedUser });
  } catch (e) {
    console.error('Erro ao buscar usuário:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar usuário' });
  }
});

// Criar novo usuário (apenas administradores)
apiRouter.post('/admin/users', async (req: Request, res: Response) => {
  try {
    const { name, email, cpf, phone, profile = 'employer', permissions = [] } = req.body;

    if (!name || !email || !cpf) {
      return res.status(400).json({
        success: false,
        error: 'Nome, email e CPF são obrigatórios'
      });
    }

    // Verificar se CPF ou email já existem
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { cpf: cpf.replace(/\D/g, '') },
          { email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: existingUser.cpf === cpf.replace(/\D/g, '') ? 'CPF já cadastrado' : 'Email já cadastrado'
      });
    }

    // Gerar senha temporária
    const tempPassword = Math.random().toString(36).slice(-8);
    const bcrypt = require('bcrypt');
    const password_hash = await bcrypt.hash(tempPassword, 10);

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        cpf: cpf.replace(/\D/g, ''),
        phone,
        profile,
        password_hash,
        permissions: permissions || [],
        platforms: ['web'],
        active: true
      }
    });

    // TODO: Enviar email com senha temporária

    res.json({ 
      success: true, 
      message: 'Usuário criado com sucesso',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        cpf: newUser.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
        profile: newUser.profile,
        temp_password: tempPassword // Em produção, enviar por email
      }
    });
  } catch (e) {
    console.error('Erro ao criar usuário:', e);
    res.status(500).json({ success: false, error: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário
apiRouter.put('/admin/users/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, profile, permissions, active } = req.body;

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (profile !== undefined) updateData.profile = profile;
    if (permissions !== undefined) updateData.permissions = permissions;
    if (active !== undefined) updateData.active = active;
    
    updateData.updated_at = new Date();

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updateData
    });

    res.json({ 
      success: true, 
      message: 'Usuário atualizado com sucesso',
      user: {
        ...updatedUser,
        cpf: updatedUser.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
        platforms: updatedUser.platforms || [],
        permissions: updatedUser.permissions || []
      }
    });
  } catch (e) {
    console.error('Erro ao atualizar usuário:', e);
    res.status(500).json({ success: false, error: 'Erro ao atualizar usuário' });
  }
});

// Desativar usuário (soft delete)
apiRouter.delete('/admin/users/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await prisma.users.update({
      where: { id: userId },
      data: { 
        active: false,
        updated_at: new Date()
      }
    });

    res.json({ 
      success: true, 
      message: 'Usuário desativado com sucesso'
    });
  } catch (e) {
    console.error('Erro ao desativar usuário:', e);
    res.status(500).json({ success: false, error: 'Erro ao desativar usuário' });
  }
});

// Resetar senha do usuário
apiRouter.post('/admin/users/:userId/reset-password', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Gerar nova senha temporária
    const tempPassword = Math.random().toString(36).slice(-8);
    const bcrypt = require('bcrypt');
    const password_hash = await bcrypt.hash(tempPassword, 10);

    await prisma.users.update({
      where: { id: userId },
      data: { 
        password_hash,
        updated_at: new Date()
      }
    });

    // TODO: Enviar email com nova senha

    res.json({ 
      success: true, 
      message: 'Senha resetada com sucesso',
      temp_password: tempPassword // Em produção, enviar por email
    });
  } catch (e) {
    console.error('Erro ao resetar senha:', e);
    res.status(500).json({ success: false, error: 'Erro ao resetar senha' });
  }
});

// Estatísticas de usuários
apiRouter.get('/admin/users/stats/summary', async (req: Request, res: Response) => {
  try {
    const [totalUsers, activeUsers, inactiveUsers, profileStats, recentUsers] = await Promise.all([
      prisma.users.count(),
      prisma.users.count({ where: { active: true } }),
      prisma.users.count({ where: { active: false } }),
      prisma.users.groupBy({
        by: ['profile'],
        _count: { profile: true }
      }),
      prisma.users.count({
        where: {
          created_at: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Últimos 30 dias
          }
        }
      })
    ]);

    const profileDistribution = profileStats.reduce((acc, item) => {
      acc[item.profile || 'undefined'] = item._count.profile;
      return acc;
    }, {} as Record<string, number>);

    const stats = {
      total_users: totalUsers,
      active_users: activeUsers,
      inactive_users: inactiveUsers,
      recent_users: recentUsers,
      profile_distribution: profileDistribution,
      activity_rate: totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : '0'
    };

    res.json({ success: true, stats });
  } catch (e) {
    console.error('Erro ao buscar estatísticas:', e);
    res.status(500).json({ success: false, error: 'Erro ao buscar estatísticas' });
  }
});

// ==========================================
// 🎨 WHITE-LABEL SYSTEM - SISTEMA WHITE-LABEL
// ==========================================

// Configurar white-label do parceiro
apiRouter.post('/partners/:partnerId/white-label', async (req: Request, res: Response) => {
  try {
    const { partnerId } = req.params;
    const {
      brand_name,
      brand_logo_url,
      brand_colors,
      custom_domain,
      custom_subdomain,
      brand_settings
    } = req.body;

    // Verificar se o parceiro existe
    const partner = await prisma.partnerProfile.findUnique({
      where: { id: partnerId }
    });

    if (!partner) {
      return res.status(404).json({ success: false, error: 'Parceiro não encontrado' });
    }

    // Atualizar configuração white-label do parceiro
    const updatedPartner = await prisma.partnerProfile.update({
      where: { id: partnerId },
      data: {
        white_label_enabled: true,
        brand_name,
        brand_logo_url,
        brand_colors,
        custom_domain,
        custom_subdomain,
        brand_settings
      }
    });

    res.json({ success: true, data: updatedPartner });
  } catch (error) {
    console.error('Erro ao configurar white-label:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Buscar configuração white-label
apiRouter.get('/partners/:partnerId/white-label', async (req: Request, res: Response) => {
  try {
    const { partnerId } = req.params;

    const partner = await prisma.partnerProfile.findUnique({
      where: { id: partnerId },
      select: {
        id: true,
        white_label_enabled: true,
        brand_name: true,
        brand_logo_url: true,
        brand_colors: true,
        custom_domain: true,
        custom_subdomain: true,
        brand_settings: true
      }
    });

    if (!partner) {
      return res.status(404).json({ success: false, error: 'Parceiro não encontrado' });
    }

    res.json({ success: true, data: partner });
  } catch (error) {
    console.error('Erro ao buscar configuração white-label:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// ==========================================
// 💰 COMMISSION SYSTEM - SISTEMA DE COMISSÕES
// ==========================================

// Configurar comissionamento do parceiro
apiRouter.post('/partners/:partnerId/commission-config', async (req: Request, res: Response) => {
  try {
    const { partnerId } = req.params;
    const {
      commission_enabled,
      commission_type,
      commission_rate,
      commission_tiers,
      payment_terms
    } = req.body;

    const updatedPartner = await prisma.partnerProfile.update({
      where: { id: partnerId },
      data: {
        commission_enabled,
        commission_type,
        commission_rate,
        commission_tiers,
        payment_terms
      }
    });

    res.json({ success: true, data: updatedPartner });
  } catch (error) {
    console.error('Erro ao configurar comissionamento:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Vincular empregador ao parceiro
apiRouter.post('/partners/:partnerId/link-employer', async (req: Request, res: Response) => {
  try {
    const { partnerId } = req.params;
    const {
      employer_id,
      link_type = 'referral',
      referral_code,
      commission_rate
    } = req.body;

    // Verificar se já existe vínculo
    const existingLink = await prisma.partnerEmployerLink.findFirst({
      where: {
        partner_id: partnerId,
        employer_id: employer_id
      }
    });

    if (existingLink) {
      return res.status(400).json({ 
        success: false, 
        error: 'Empregador já está vinculado a este parceiro' 
      });
    }

    const link = await prisma.partnerEmployerLink.create({
      data: {
        partner_id: partnerId,
        employer_id,
        link_type,
        referral_code,
        commission_rate,
        activated_at: new Date()
      }
    });

    res.json({ success: true, data: link });
  } catch (error) {
    console.error('Erro ao vincular empregador:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Listar empregadores vinculados
apiRouter.get('/partners/:partnerId/linked-employers', async (req: Request, res: Response) => {
  try {
    const { partnerId } = req.params;
    const { status, link_type } = req.query;

    const where: any = { partner_id: partnerId };
    if (status) where.status = status;
    if (link_type) where.link_type = link_type;

    const links = await prisma.partnerEmployerLink.findMany({
      where,
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            created_at: true
          }
        }
      },
      orderBy: { linked_at: 'desc' }
    });

    res.json({ success: true, data: links });
  } catch (error) {
    console.error('Erro ao listar empregadores vinculados:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Listar comissões do parceiro
apiRouter.get('/partners/:partnerId/commissions', async (req: Request, res: Response) => {
  try {
    const { partnerId } = req.params;
    const { status, period, page = 1, limit = 20 } = req.query;

    const where: any = { partner_id: partnerId };
    if (status) where.status = status;
    
    if (period) {
      const now = new Date();
      let startDate;
      
      switch (period) {
        case 'current_month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'last_month':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          where.earned_at = {
            gte: startDate,
            lt: new Date(now.getFullYear(), now.getMonth(), 1)
          };
          break;
        case 'current_year':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      }
      
      if (period !== 'last_month') {
        where.earned_at = { gte: startDate };
      }
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [commissions, total] = await Promise.all([
      prisma.commission.findMany({
        where,
        include: {
          employer_link: {
            include: {
              employer: {
                select: { name: true, email: true }
              }
            }
          },
          subscription: {
            select: { plan: { select: { name: true } } }
          }
        },
        orderBy: { earned_at: 'desc' },
        skip,
        take: parseInt(limit as string)
      }),
      prisma.commission.count({ where })
    ]);

    // Calcular estatísticas
    const stats = await prisma.commission.aggregate({
      where: { partner_id: partnerId },
      _sum: { commission_amount: true },
      _count: { id: true }
    });

    const pendingCommissions = await prisma.commission.aggregate({
      where: { partner_id: partnerId, status: 'pending' },
      _sum: { commission_amount: true },
      _count: { id: true }
    });

    const paidCommissions = await prisma.commission.aggregate({
      where: { partner_id: partnerId, status: 'paid' },
      _sum: { commission_amount: true },
      _count: { id: true }
    });

    res.json({
      success: true,
      data: {
        commissions,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string))
        },
        stats: {
          total_earned: stats._sum.commission_amount || 0,
          total_commissions: stats._count.id || 0,
          pending_amount: pendingCommissions._sum.commission_amount || 0,
          pending_count: pendingCommissions._count.id || 0,
          paid_amount: paidCommissions._sum.commission_amount || 0,
          paid_count: paidCommissions._count.id || 0
        }
      }
    });
  } catch (error) {
    console.error('Erro ao listar comissões:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Marcar comissão como paga
apiRouter.put('/commissions/:commissionId/pay', async (req: Request, res: Response) => {
  try {
    const { commissionId } = req.params;
    const { payment_method, payment_reference, notes } = req.body;

    const commission = await prisma.commission.update({
      where: { id: commissionId },
      data: {
        status: 'paid',
        paid_at: new Date(),
        payment_method,
        payment_reference,
        notes
      }
    });

    res.json({ success: true, data: commission });
  } catch (error) {
    console.error('Erro ao marcar comissão como paga:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Buscar por subdomínio/domínio personalizado
apiRouter.get('/white-label/resolve/:domain', async (req: Request, res: Response) => {
  try {
    const { domain } = req.params;

    // Buscar por subdomínio no parceiro
    let partner = await prisma.partnerProfile.findFirst({
      where: {
        OR: [
          { custom_subdomain: domain },
          { custom_domain: domain }
        ],
        white_label_enabled: true
      },
      select: {
        id: true,
        brand_name: true,
        brand_logo_url: true,
        brand_colors: true,
        brand_settings: true
      }
    });

    if (!partner) {
      return res.status(404).json({ 
        success: false, 
        error: 'Configuração white-label não encontrada' 
      });
    }

    res.json({ success: true, data: partner });
  } catch (error) {
    console.error('Erro ao resolver domínio white-label:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// ==========================================
// 💰 PAYROLL SYSTEM - SISTEMA DE FOLHA DE PAGAMENTO
// ==========================================

// Listar períodos de folha
apiRouter.get('/payroll/periods', async (req: Request, res: Response) => {
  try {
    const { year, month, status } = req.query;
    const userId = req.headers['user-id'] as string; // Simulado

    const where: any = { user_id: userId || 'user-mock' };
    if (year) where.reference_year = parseInt(year as string);
    if (month) where.reference_month = parseInt(month as string);
    if (status) where.status = status;

    const periods = await prisma.payrollPeriod.findMany({
      where,
      include: {
        payroll_items: {
          include: {
            employee: {
              select: { name: true, cpf: true, position: true }
            }
          }
        },
        _count: {
          select: { payroll_items: true, payslips: true }
        }
      },
      orderBy: [
        { reference_year: 'desc' },
        { reference_month: 'desc' }
      ]
    });

    res.json({ success: true, data: periods });
  } catch (error) {
    console.error('Erro ao listar períodos de folha:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Criar novo período de folha
apiRouter.post('/payroll/periods', async (req: Request, res: Response) => {
  try {
    const { reference_month, reference_year } = req.body;
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Verificar se já existe período
    const existingPeriod = await prisma.payrollPeriod.findUnique({
      where: {
        user_id_reference_month_reference_year: {
          user_id: userId,
          reference_month: parseInt(reference_month),
          reference_year: parseInt(reference_year)
        }
      }
    });

    if (existingPeriod) {
      return res.status(400).json({
        success: false,
        error: 'Período de folha já existe'
      });
    }

    const period = await prisma.payrollPeriod.create({
      data: {
        user_id: userId,
        reference_month: parseInt(reference_month),
        reference_year: parseInt(reference_year),
        status: 'draft'
      }
    });

    res.json({ success: true, data: period });
  } catch (error) {
    console.error('Erro ao criar período de folha:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Calcular folha de pagamento
apiRouter.post('/payroll/periods/:periodId/calculate', async (req: Request, res: Response) => {
  try {
    const { periodId } = req.params;

    // Buscar período
    const period = await prisma.payrollPeriod.findUnique({
      where: { id: periodId },
      include: {
        user: true
      }
    });

    if (!period) {
      return res.status(404).json({ success: false, error: 'Período não encontrado' });
    }

    // Buscar funcionários ativos
    const employees = await prisma.employees.findMany({
      where: { 
        user_id: period.user_id,
        active: true 
      }
    });

    if (employees.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Nenhum funcionário ativo encontrado'
      });
    }

    // Simular cálculos para cada funcionário
    const payrollItems = [];
    let totalGross = 0;
    let totalDiscounts = 0;
    let totalNet = 0;

    for (const employee of employees) {
      // Simular dados de ponto (em produção, viria do TimeEntry)
      const workedHours = 220; // Horas padrão
      const extraHours = Math.floor(Math.random() * 20); // 0-20h extras
      const baseSalary = parseFloat(employee.salary.toString());

      // Cálculos simplificados
      const hourlyRate = baseSalary / 220;
      const baseAmount = baseSalary;
      const extraAmount = extraHours * hourlyRate * 1.5;
      const totalEarnings = baseAmount + extraAmount;

      // Descontos (INSS, IRRF simulados)
      const inssDiscount = Math.min(totalEarnings * 0.11, 908.85); // Teto INSS 2025
      const irrfDiscount = totalEarnings > 2112 ? (totalEarnings - 2112) * 0.075 : 0;
      const totalDiscountsEmployee = inssDiscount + irrfDiscount;

      const netSalary = totalEarnings - totalDiscountsEmployee;

      const payrollItem = await prisma.payrollItem.create({
        data: {
          payroll_period_id: periodId,
          employee_id: employee.id,
          employee_name: employee.name,
          employee_cpf: employee.cpf,
          position: employee.position,
          admission_date: employee.hire_date,
          base_salary: baseSalary,
          worked_hours: workedHours,
          extra_hours: extraHours,
          base_amount: baseAmount,
          extra_amount: extraAmount,
          total_earnings: totalEarnings,
          inss_discount: inssDiscount,
          irrf_discount: irrfDiscount,
          total_discounts: totalDiscountsEmployee,
          net_salary: netSalary,
          fgts_base: totalEarnings,
          fgts_amount: totalEarnings * 0.08
        }
      });

      payrollItems.push(payrollItem);
      totalGross += totalEarnings;
      totalDiscounts += totalDiscountsEmployee;
      totalNet += netSalary;
    }

    // Atualizar período
    const updatedPeriod = await prisma.payrollPeriod.update({
      where: { id: periodId },
      data: {
        status: 'calculated',
        calculation_date: new Date(),
        total_gross: totalGross,
        total_discounts: totalDiscounts,
        total_net: totalNet
      }
    });

    res.json({
      success: true,
      data: {
        period: updatedPeriod,
        items: payrollItems,
        summary: {
          employees_count: employees.length,
          total_gross: totalGross,
          total_discounts: totalDiscounts,
          total_net: totalNet
        }
      }
    });

  } catch (error) {
    console.error('Erro ao calcular folha:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Buscar detalhes de um período
apiRouter.get('/payroll/periods/:periodId', async (req: Request, res: Response) => {
  try {
    const { periodId } = req.params;

    const period = await prisma.payrollPeriod.findUnique({
      where: { id: periodId },
      include: {
        payroll_items: {
          include: {
            employee: {
              select: { name: true, cpf: true, position: true, hire_date: true }
            }
          }
        },
        payslips: true
      }
    });

    if (!period) {
      return res.status(404).json({ success: false, error: 'Período não encontrado' });
    }

    res.json({ success: true, data: period });
  } catch (error) {
    console.error('Erro ao buscar período:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Aprovar folha de pagamento
apiRouter.put('/payroll/periods/:periodId/approve', async (req: Request, res: Response) => {
  try {
    const { periodId } = req.params;

    const period = await prisma.payrollPeriod.update({
      where: { id: periodId },
      data: {
        status: 'approved',
        approval_date: new Date()
      }
    });

    res.json({ success: true, data: period });
  } catch (error) {
    console.error('Erro ao aprovar folha:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Gerar holerites
apiRouter.post('/payroll/periods/:periodId/payslips', async (req: Request, res: Response) => {
  try {
    const { periodId } = req.params;

    const period = await prisma.payrollPeriod.findUnique({
      where: { id: periodId },
      include: { payroll_items: { include: { employee: true } } }
    });

    if (!period) {
      return res.status(404).json({ success: false, error: 'Período não encontrado' });
    }

    const payslips = [];

    for (const item of period.payroll_items) {
      const payslip = await prisma.payslip.upsert({
        where: {
          payroll_period_id_employee_id: {
            payroll_period_id: periodId,
            employee_id: item.employee_id
          }
        },
        update: {},
        create: {
          payroll_period_id: periodId,
          employee_id: item.employee_id,
          payslip_number: `${period.reference_month.toString().padStart(2, '0')}${period.reference_year}-${item.employee.cpf}`,
          reference_period: `${period.reference_month.toString().padStart(2, '0')}/${period.reference_year}`,
          company_name: 'DOM v2 - Sistema de Gestão',
          employee_name: item.employee_name,
          employee_cpf: item.employee_cpf,
          position: item.position,
          admission_date: item.admission_date,
          total_earnings: item.total_earnings,
          total_discounts: item.total_discounts,
          net_salary: item.net_salary,
          fgts_amount: item.fgts_amount,
          earnings_detail: {
            base_amount: item.base_amount,
            extra_amount: item.extra_amount,
            bonus_amount: item.bonus_amount
          },
          discounts_detail: {
            inss_discount: item.inss_discount,
            irrf_discount: item.irrf_discount,
            transport_discount: item.transport_discount
          }
        }
      });

      payslips.push(payslip);
    }

    res.json({ success: true, data: payslips });
  } catch (error) {
    console.error('Erro ao gerar holerites:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Buscar holerite específico
apiRouter.get('/payroll/payslips/:payslipId', async (req: Request, res: Response) => {
  try {
    const { payslipId } = req.params;

    const payslip = await prisma.payslip.findUnique({
      where: { id: payslipId },
      include: {
        employee: true,
        payroll_period: true
      }
    });

    if (!payslip) {
      return res.status(404).json({ success: false, error: 'Holerite não encontrado' });
    }

    res.json({ success: true, data: payslip });
  } catch (error) {
    console.error('Erro ao buscar holerite:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Configurações de folha de pagamento
apiRouter.get('/payroll/config', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    let config = await prisma.payrollConfiguration.findUnique({
      where: { user_id: userId }
    });

    if (!config) {
      // Criar configuração padrão
      config = await prisma.payrollConfiguration.create({
        data: {
          user_id: userId,
          company_name: 'DOM v2 - Sistema de Gestão',
          inss_rates: [
            { min: 0, max: 1412.00, rate: 7.5, deduction: 0 },
            { min: 1412.01, max: 2666.68, rate: 9.0, deduction: 21.18 },
            { min: 2666.69, max: 4000.03, rate: 12.0, deduction: 101.18 },
            { min: 4000.04, max: 7786.02, rate: 14.0, deduction: 181.18 }
          ],
          irrf_rates: [
            { min: 0, max: 2112.00, rate: 0, deduction: 0 },
            { min: 2112.01, max: 2826.65, rate: 7.5, deduction: 158.40 },
            { min: 2826.66, max: 3751.05, rate: 15.0, deduction: 370.40 },
            { min: 3751.06, max: 4664.68, rate: 22.5, deduction: 651.73 },
            { min: 4664.69, max: 999999.99, rate: 27.5, deduction: 884.96 }
          ]
        }
      });
    }

    res.json({ success: true, data: config });
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Atualizar configurações
apiRouter.put('/payroll/config', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';
    const configData = req.body;

    const config = await prisma.payrollConfiguration.upsert({
      where: { user_id: userId },
      update: {
        ...configData,
        updated_at: new Date()
      },
      create: {
        user_id: userId,
        ...configData
      }
    });

    res.json({ success: true, data: config });
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// ==========================================
// 🏛️ eSOCIAL DOMÉSTICO - SISTEMA DE COMPLIANCE
// ==========================================

// Certificados Digitais
apiRouter.get('/esocial/certificates', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';
    
    const certificates = await prisma.eSocialCertificate.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });

    res.json({ success: true, data: certificates });
  } catch (error) {
    console.error('Erro ao listar certificados:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

apiRouter.post('/esocial/certificates', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';
    const certificateData = req.body;

    const ESocialService = require('./services/esocialService').ESocialService;
    const certificate = await ESocialService.manageCertificate(userId, certificateData);

    res.json({ success: true, data: certificate });
  } catch (error) {
    console.error('Erro ao gerenciar certificado:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Configuração do Empregador
apiRouter.get('/esocial/config', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    const config = await prisma.eSocialConfig.findUnique({
      where: { user_id: userId }
    });

    res.json({ success: true, data: config });
  } catch (error) {
    console.error('Erro ao obter configuração eSocial:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

apiRouter.post('/esocial/config', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';
    const configData = req.body;

    const ESocialService = require('./services/esocialService').ESocialService;
    const config = await ESocialService.configureEmployer(userId, configData);

    res.json({ success: true, data: config });
  } catch (error) {
    console.error('Erro ao configurar empregador:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Eventos eSocial
apiRouter.get('/esocial/events', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';
    const eventType = req.query.eventType as string;
    const status = req.query.status as string;
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    const ESocialService = require('./services/esocialService').ESocialService;
    const filters = {
      eventType,
      status,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined
    };

    const report = await ESocialService.getEventReport(userId, filters);

    res.json({ success: true, data: report });
  } catch (error) {
    console.error('Erro ao listar eventos eSocial:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

apiRouter.post('/esocial/events', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';
    const eventData = req.body;

    const ESocialService = require('./services/esocialService').ESocialService;
    const event = await ESocialService.createEvent(userId, eventData);

    res.json({ success: true, data: event });
  } catch (error) {
    console.error('Erro ao criar evento eSocial:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

apiRouter.post('/esocial/events/:eventId/send', async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;

    const ESocialService = require('./services/esocialService').ESocialService;
    const event = await ESocialService.sendEvent(eventId);

    res.json({ success: true, data: event });
  } catch (error) {
    console.error('Erro ao enviar evento eSocial:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

apiRouter.post('/esocial/events/retry', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    const ESocialService = require('./services/esocialService').ESocialService;
    const results = await ESocialService.retryFailedEvents(userId);

    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Erro ao reprocessar eventos:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Integrações de Pagamento
apiRouter.get('/payment-integrations', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Dados mockados para integrações de pagamento
    const integrations = [
      {
        id: 'mercadopago',
        name: 'Mercado Pago',
        type: 'pix',
        status: 'active',
        icon: '💳',
        description: 'Solução completa de pagamentos online',
        setupDate: '2025-01-15',
        lastTransaction: '2025-01-27',
        transactionCount: 156,
        totalAmount: 45230.50,
        apiKey: 'mp_test_123456789',
        environment: 'sandbox'
      },
      {
        id: 'pix',
        name: 'PIX Direto',
        type: 'pix',
        status: 'active',
        icon: '📱',
        description: 'Transferências instantâneas via PIX',
        setupDate: '2025-01-10',
        lastTransaction: '2025-01-27',
        transactionCount: 89,
        totalAmount: 12340.75,
        apiKey: 'pix_direct_987654321',
        environment: 'production'
      },
      {
        id: 'stripe',
        name: 'Stripe',
        type: 'card',
        status: 'inactive',
        icon: '💳',
        description: 'Processamento de cartões internacionais',
        setupDate: '2024-12-20',
        lastTransaction: '2024-12-28',
        transactionCount: 23,
        totalAmount: 5670.30,
        apiKey: 'sk_test_stripe_456789',
        environment: 'sandbox'
      },
      {
        id: 'boleto',
        name: 'Boleto Bancário',
        type: 'boleto',
        status: 'pending',
        icon: '📄',
        description: 'Geração de boletos bancários',
        setupDate: null,
        lastTransaction: null,
        transactionCount: 0,
        totalAmount: 0,
        apiKey: null,
        environment: null
      },
      {
        id: 'transfer',
        name: 'Transferência Bancária',
        type: 'transfer',
        status: 'inactive',
        icon: '🏦',
        description: 'Transferências entre contas bancárias',
        setupDate: null,
        lastTransaction: null,
        transactionCount: 0,
        totalAmount: 0,
        apiKey: null,
        environment: null
      }
    ];

    res.json({ success: true, integrations });
  } catch (error) {
    console.error('Erro ao buscar integrações de pagamento:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar integrações' });
  }
});

apiRouter.post('/payment-integrations/setup', async (req: Request, res: Response) => {
  try {
    const { providerId, apiKey, secretKey, webhookUrl, environment } = req.body;
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Aqui seria feita a validação e configuração real do provedor
    console.log('Configurando provedor:', { providerId, apiKey, secretKey, webhookUrl, environment, userId });

    res.json({ 
      success: true, 
      message: 'Provedor configurado com sucesso',
      integration: {
        id: providerId,
        status: 'active',
        setupDate: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Erro ao configurar provedor:', error);
    res.status(500).json({ success: false, error: 'Erro ao configurar provedor' });
  }
});

apiRouter.put('/payment-integrations/:id/activate', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.headers['user-id'] as string || 'user-mock';

    console.log('Ativando provedor:', { id, status, userId });

    res.json({ 
      success: true, 
      message: 'Provedor ativado com sucesso',
      integration: { id, status: 'active' }
    });
  } catch (error) {
    console.error('Erro ao ativar provedor:', error);
    res.status(500).json({ success: false, error: 'Erro ao ativar provedor' });
  }
});

apiRouter.put('/payment-integrations/:id/deactivate', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.headers['user-id'] as string || 'user-mock';

    console.log('Desativando provedor:', { id, status, userId });

    res.json({ 
      success: true, 
      message: 'Provedor desativado com sucesso',
      integration: { id, status: 'inactive' }
    });
  } catch (error) {
    console.error('Erro ao desativar provedor:', error);
    res.status(500).json({ success: false, error: 'Erro ao desativar provedor' });
  }
});

// Turnos (dados mockados para funcionalidades avançadas)
apiRouter.get('/shifts', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Dados mockados para turnos
    const shifts = [
      {
        id: 'SHIFT001',
        name: 'Manhã',
        startTime: '08:00',
        endTime: '17:00',
        employees: ['EMP001', 'EMP002'],
        description: 'Turno padrão da manhã',
        active: true
      },
      {
        id: 'SHIFT002',
        name: 'Tarde',
        startTime: '14:00',
        endTime: '23:00',
        employees: ['EMP003'],
        description: 'Turno da tarde',
        active: true
      },
      {
        id: 'SHIFT003',
        name: 'Noite',
        startTime: '22:00',
        endTime: '07:00',
        employees: ['EMP004'],
        description: 'Turno noturno',
        active: true
      }
    ];

    res.json({ success: true, shifts });
  } catch (error) {
    console.error('Erro ao buscar turnos:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar turnos' });
  }
});

apiRouter.post('/shifts', async (req: Request, res: Response) => {
  try {
    const { name, startTime, endTime, employees, description } = req.body;
    const userId = req.headers['user-id'] as string || 'user-mock';

    console.log('Criando turno:', { name, startTime, endTime, employees, description, userId });

    res.json({ 
      success: true, 
      message: 'Turno criado com sucesso',
      shift: {
        id: `SHIFT${Date.now()}`,
        name,
        startTime,
        endTime,
        employees,
        description,
        active: true
      }
    });
  } catch (error) {
    console.error('Erro ao criar turno:', error);
    res.status(500).json({ success: false, error: 'Erro ao criar turno' });
  }
});

apiRouter.put('/shifts/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, startTime, endTime, employees, description, active } = req.body;
    const userId = req.headers['user-id'] as string || 'user-mock';

    console.log('Atualizando turno:', { id, name, startTime, endTime, employees, description, active, userId });

    res.json({ 
      success: true, 
      message: 'Turno atualizado com sucesso',
      shift: { id, name, startTime, endTime, employees, description, active }
    });
  } catch (error) {
    console.error('Erro ao atualizar turno:', error);
    res.status(500).json({ success: false, error: 'Erro ao atualizar turno' });
  }
});

// Comunicação (dados mockados para funcionalidades avançadas)
apiRouter.get('/communication/messages', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Dados mockados para mensagens
    const messages = [
      {
        id: '1',
        type: 'email',
        recipient: 'maria.silva@email.com',
        subject: 'Bem-vinda ao DOM v2!',
        content: 'Olá Maria! Seja bem-vinda ao nosso sistema de gestão doméstica.',
        status: 'delivered',
        sentAt: '2025-01-27T10:30:00Z',
        deliveredAt: '2025-01-27T10:31:00Z',
        readAt: '2025-01-27T10:35:00Z'
      },
      {
        id: '2',
        type: 'sms',
        recipient: '+55 11 99999-9999',
        subject: 'Lembrete de Pagamento',
        content: 'Seu pagamento vence em 3 dias. Valor: R$ 1.250,00',
        status: 'sent',
        sentAt: '2025-01-27T09:15:00Z'
      },
      {
        id: '3',
        type: 'whatsapp',
        recipient: '+55 11 88888-8888',
        subject: 'Confirmação de Agendamento',
        content: 'Seu agendamento para limpeza foi confirmado para amanhã às 14h.',
        status: 'delivered',
        sentAt: '2025-01-26T16:45:00Z',
        deliveredAt: '2025-01-26T16:46:00Z'
      },
      {
        id: '4',
        type: 'push',
        recipient: 'João Silva',
        subject: 'Nova Tarefa Atribuída',
        content: 'Você tem uma nova tarefa: "Organizar documentos"',
        status: 'failed',
        sentAt: '2025-01-26T14:20:00Z'
      }
    ];

    res.json({ success: true, messages });
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar mensagens' });
  }
});

apiRouter.get('/communication/templates', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Dados mockados para templates
    const templates = [
      {
        id: '1',
        name: 'Boas-vindas',
        type: 'email',
        subject: 'Bem-vindo ao DOM v2, {{nome}}!',
        content: 'Olá {{nome}}! Seja bem-vindo ao nosso sistema de gestão doméstica. Estamos aqui para facilitar sua vida.',
        variables: ['nome'],
        usageCount: 45,
        createdAt: '2025-01-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Lembrete de Pagamento',
        type: 'sms',
        subject: 'Lembrete de Pagamento',
        content: 'Olá {{nome}}! Seu pagamento de R$ {{valor}} vence em {{dias}} dias.',
        variables: ['nome', 'valor', 'dias'],
        usageCount: 23,
        createdAt: '2025-01-10T14:30:00Z'
      },
      {
        id: '3',
        name: 'Confirmação de Agendamento',
        type: 'whatsapp',
        subject: 'Agendamento Confirmado',
        content: 'Olá {{nome}}! Seu agendamento para {{servico}} foi confirmado para {{data}} às {{hora}}.',
        variables: ['nome', 'servico', 'data', 'hora'],
        usageCount: 12,
        createdAt: '2025-01-05T09:15:00Z'
      }
    ];

    res.json({ success: true, templates });
  } catch (error) {
    console.error('Erro ao buscar templates:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar templates' });
  }
});

apiRouter.post('/communication/send', async (req: Request, res: Response) => {
  try {
    const { type, recipients, subject, content } = req.body;
    const userId = req.headers['user-id'] as string || 'user-mock';

    console.log('Enviando mensagem:', { type, recipients, subject, content, userId });

    res.json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso',
      messageId: `MSG${Date.now()}`
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ success: false, error: 'Erro ao enviar mensagem' });
  }
});

apiRouter.post('/communication/templates', async (req: Request, res: Response) => {
  try {
    const { name, type, subject, content, variables } = req.body;
    const userId = req.headers['user-id'] as string || 'user-mock';

    console.log('Criando template:', { name, type, subject, content, variables, userId });

    res.json({ 
      success: true, 
      message: 'Template criado com sucesso',
      template: {
        id: `TEMPLATE${Date.now()}`,
        name,
        type,
        subject,
        content,
        variables,
        usageCount: 0,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Erro ao criar template:', error);
    res.status(500).json({ success: false, error: 'Erro ao criar template' });
  }
});

// Gamificação (dados mockados para funcionalidades avançadas)
apiRouter.get('/gamification/user', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Dados mockados para perfil do usuário
    const user = {
      id: userId,
      name: 'Maria Silva',
      avatar: '👩',
      level: 8,
      points: 2840,
      rank: 3,
      streak: 12,
      achievements: 15
    };

    res.json({ success: true, user });
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar dados do usuário' });
  }
});

apiRouter.get('/gamification/achievements', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Dados mockados para conquistas
    const achievements = [
      {
        id: '1',
        name: 'Primeira Tarefa',
        description: 'Complete sua primeira tarefa',
        icon: '✅',
        points: 50,
        category: 'task',
        unlocked: true,
        unlockedAt: '2025-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'Organizador Financeiro',
        description: 'Configure seu primeiro orçamento',
        icon: '💰',
        points: 100,
        category: 'finance',
        unlocked: true,
        unlockedAt: '2025-01-16T14:20:00Z'
      },
      {
        id: '3',
        name: 'Família Unida',
        description: 'Adicione 3 membros da família',
        icon: '👨‍👩‍👧‍👦',
        points: 150,
        category: 'family',
        unlocked: true,
        unlockedAt: '2025-01-18T09:15:00Z'
      },
      {
        id: '4',
        name: 'Dedicação Diária',
        description: 'Complete tarefas por 7 dias seguidos',
        icon: '🔥',
        points: 200,
        category: 'streak',
        unlocked: false,
        progress: 5,
        maxProgress: 7
      },
      {
        id: '5',
        name: 'Mestre das Tarefas',
        description: 'Complete 50 tarefas',
        icon: '🏆',
        points: 500,
        category: 'task',
        unlocked: false,
        progress: 32,
        maxProgress: 50
      },
      {
        id: '6',
        name: 'Economista',
        description: 'Economize R$ 1.000 em um mês',
        icon: '💎',
        points: 300,
        category: 'finance',
        unlocked: false,
        progress: 650,
        maxProgress: 1000
      },
      {
        id: '7',
        name: 'Aniversariante',
        description: 'Use o sistema por 1 ano',
        icon: '🎂',
        points: 1000,
        category: 'special',
        unlocked: false
      }
    ];

    res.json({ success: true, achievements });
  } catch (error) {
    console.error('Erro ao buscar conquistas:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar conquistas' });
  }
});

apiRouter.get('/gamification/leaderboard', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Dados mockados para ranking
    const leaderboard = [
      {
        id: '2',
        name: 'João Santos',
        avatar: '👨',
        level: 12,
        points: 4560,
        rank: 1,
        isCurrentUser: false
      },
      {
        id: '3',
        name: 'Ana Costa',
        avatar: '👩',
        level: 10,
        points: 3890,
        rank: 2,
        isCurrentUser: false
      },
      {
        id: '1',
        name: 'Maria Silva',
        avatar: '👩',
        level: 8,
        points: 2840,
        rank: 3,
        isCurrentUser: true
      },
      {
        id: '4',
        name: 'Pedro Lima',
        avatar: '👨',
        level: 7,
        points: 2150,
        rank: 4,
        isCurrentUser: false
      },
      {
        id: '5',
        name: 'Carla Ferreira',
        avatar: '👩',
        level: 6,
        points: 1890,
        rank: 5,
        isCurrentUser: false
      }
    ];

    res.json({ success: true, leaderboard });
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar ranking' });
  }
});

apiRouter.get('/gamification/rewards', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Dados mockados para recompensas
    const rewards = [
      {
        id: '1',
        name: 'Café Grátis',
        description: 'Vale para uma cafeteria parceira',
        icon: '☕',
        pointsRequired: 500,
        available: true
      },
      {
        id: '2',
        name: 'Desconto 10%',
        description: 'Desconto em produtos domésticos',
        icon: '🏠',
        pointsRequired: 1000,
        available: true
      },
      {
        id: '3',
        name: 'Jantar Especial',
        description: 'Vale para um restaurante premium',
        icon: '🍽️',
        pointsRequired: 2000,
        available: false
      },
      {
        id: '4',
        name: 'Viagem Fim de Semana',
        description: 'Pacote para 2 pessoas',
        icon: '✈️',
        pointsRequired: 5000,
        available: false
      }
    ];

    res.json({ success: true, rewards });
  } catch (error) {
    console.error('Erro ao buscar recompensas:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar recompensas' });
  }
});

apiRouter.post('/gamification/rewards/:id/redeem', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.headers['user-id'] as string || 'user-mock';

    console.log('Resgatando recompensa:', { rewardId: id, userId });

    res.json({
      success: true,
      message: 'Recompensa resgatada com sucesso',
      rewardId: id,
      redeemedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao resgatar recompensa:', error);
    res.status(500).json({ success: false, error: 'Erro ao resgatar recompensa' });
  }
});

// Relatórios eSocial
apiRouter.get('/esocial/reports/compliance', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['user-id'] as string || 'user-mock';

    // Obter estatísticas de compliance
    const totalEvents = await prisma.eSocialEvent.count({
      where: { user_id: userId }
    });

    const pendingEvents = await prisma.eSocialEvent.count({
      where: { 
        user_id: userId,
        event_status: 'pending'
      }
    });

    const errorEvents = await prisma.eSocialEvent.count({
      where: { 
        user_id: userId,
        event_status: 'error'
      }
    });

    const acceptedEvents = await prisma.eSocialEvent.count({
      where: { 
        user_id: userId,
        event_status: 'accepted'
      }
    });

    const complianceRate = totalEvents > 0 ? (acceptedEvents / totalEvents) * 100 : 0;

    res.json({
      success: true,
      data: {
        totalEvents,
        pendingEvents,
        errorEvents,
        acceptedEvents,
        complianceRate: Math.round(complianceRate * 100) / 100
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório de compliance:', error);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
  }
});

// Importar rotas de documentos
import documentsRouter from './routes/documents-prisma';
// Importar rotas de perfis e configurações
import profilesRouter from './routes/profiles-prisma';
import settingsRouter from './routes/settings-prisma';

// Montar rotas de documentos
apiRouter.use('/documents', documentsRouter);
// Montar rotas de perfis e configurações
apiRouter.use('/profiles', profilesRouter);
apiRouter.use('/settings', settingsRouter);

// Rota de teste temporária para documentos sem autenticação
apiRouter.get('/documents/test-no-auth', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Rota de documentos funcionando sem autenticação',
    timestamp: new Date().toISOString()
  });
});

// Montar router nas versões /api e /api/v1 para compatibilidade
app.use('/api', apiRouter);
app.use('/api/v1', apiRouter);

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