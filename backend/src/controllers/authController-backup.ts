
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
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value, expectedType) {
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

// Aplicar validação de tipos
if (!validateType(data, 'object')) {
  throw new TypeError('Dados devem ser um objeto válido');
}


/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error, debug)
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    file: __filename,
    function: arguments.callee.name || 'anonymous'
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'application.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Aplicar logging
logStructured('info', 'Iniciando execução', { context: 'main' });


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
assertCritical(data !== null, 'Dados não podem ser null');
assertCritical(typeof data === 'object', 'Dados devem ser um objeto');
assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');


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

// Aplicar validação
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}


/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Controlador de API REST
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - Dependências específicas do contexto
 * 
 * @usage
 * GET /api/resource - Retorna lista de recursos
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateCPF, formatCPF } from '../utils/cpfValidation';

const prisma = new PrismaClient();

// Configurações
const JWT_SECRET = process.env.JWT_SECRET || 'dom-v2-secret-key';
const JWT_EXPIRES_IN = '24h';

// Rate limiting
const loginAttempts = new Map<string, { count: number; lastAttempt: number; blockedUntil?: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const BLOCK_MS = 30 * 60 * 1000; // 30 minutos

/**
 * Valida CPF antes de processar login
 */
function validateCPFForLogin(cpf: string): { isValid: boolean; formatted?: string; error?: string } {
  if (!cpf) {
    return { isValid: false, error: 'CPF é obrigatório' };
  }

  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) {
    return { isValid: false, error: 'CPF deve ter 11 dígitos' };
  }

  if (!validateCPF(cleanCPF)) {
    return { isValid: false, error: 'CPF inválido' };
  }

  return { 
    isValid: true, 
    formatted: formatCPF(cleanCPF) 
  };
}

/**
 * Verifica rate limiting para um CPF
 */
function checkRateLimit(cpf: string): { allowed: boolean; remainingAttempts?: number; blockedUntil?: number } {
  const now = Date.now();
  const attempts = loginAttempts.get(cpf);

  if (!attempts) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Verificar se está bloqueado
  if (attempts.blockedUntil && now < attempts.blockedUntil) {
    return { 
      allowed: false, 
      blockedUntil: attempts.blockedUntil 
    };
  }

  // Resetar se passou a janela de tempo
  if (now - attempts.lastAttempt > WINDOW_MS) {
    loginAttempts.delete(cpf);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  // Verificar se excedeu tentativas
  if (attempts.count >= MAX_ATTEMPTS) {
    const blockedUntil = now + BLOCK_MS;
    attempts.blockedUntil = blockedUntil;
    loginAttempts.set(cpf, attempts);
    return { 
      allowed: false, 
      blockedUntil 
    };
  }

  return { 
    allowed: true, 
    remainingAttempts: MAX_ATTEMPTS - attempts.count 
  };
}

/**
 * Registra tentativa de login
 */
function recordLoginAttempt(cpf: string, success: boolean): void {
  const now = Date.now();
  const attempts = loginAttempts.get(cpf) || { count: 0, lastAttempt: 0 };

  if (success) {
    // Resetar tentativas em caso de sucesso
    loginAttempts.delete(cpf);
  } else {
    // Incrementar tentativas em caso de falha
    attempts.count += 1;
    attempts.lastAttempt = now;
    loginAttempts.set(cpf, attempts);
  }
}

/**
 * Gera token JWT
 */
function generateToken(user: any): string {
  const payload = {
    userId: user.id,
    cpf: user.cpf,
    profile: user.profile,
    permissions: user.permissions || []
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Login do usuário
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { cpf, password } = req.body;

    // Validação básica
    if (!cpf || !password) {
      return res.status(400).json({
        success: false,
        message: 'CPF e senha são obrigatórios'
      });
    }

    // Validar CPF
    const cpfValidation = validateCPFForLogin(cpf);
    if (!cpfValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: cpfValidation.error
      });
    }

    const formattedCPF = cpfValidation.formatted!;

    // Verificar rate limiting
    const rateLimit = checkRateLimit(formattedCPF);
    if (!rateLimit.allowed) {
      const blockedMinutes = Math.ceil((rateLimit.blockedUntil! - Date.now()) / (1000 * 60));
      return res.status(429).json({
        success: false,
        message: `Muitas tentativas de login. Tente novamente em ${blockedMinutes} minutos.`
      });
    }

    // Buscar usuário
    const user = await prisma.users.findUnique({
      where: { cpf: formattedCPF },
      include: {
        user_roles: {
          where: { active: true },
          include: {
            context: true
          }
        }
      }
    });

    if (!user) {
      recordLoginAttempt(formattedCPF, false);
      return res.status(401).json({
        success: false,
        message: 'CPF ou senha incorretos'
      });
    }

    // Verificar se usuário está ativo
    if (!user.active) {
      recordLoginAttempt(formattedCPF, false);
      return res.status(401).json({
        success: false,
        message: 'Conta desativada'
      });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      recordLoginAttempt(formattedCPF, false);
      return res.status(401).json({
        success: false,
        message: 'CPF ou senha incorretos'
      });
    }

    // Login bem-sucedido
    recordLoginAttempt(formattedCPF, true);

    // Atualizar último login
    await prisma.users.update({
      where: { id: user.id },
      data: { last_login: new Date() }
    });

    // Gerar token
    const token = generateToken(user);

    // Preparar resposta
    const userResponse = {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      profile: user.profile,
      permissions: user.permissions,
      roles: user.user_roles.map(role => ({
        type: role.roleType,
        context: role.context,
        permissions: role.permissions
      }))
    };

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Logout do usuário
 */
export const logout = async (req: Request, res: Response) => {
  try {
    // Em uma implementação mais robusta, poderíamos invalidar o token
    // Por enquanto, apenas retornamos sucesso
    res.json({
      success: true,
      message: 'Logout realizado com sucesso'
    });
  } catch (error) {
    console.error('Erro no logout:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Validar token
 */
export const validateToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token não fornecido'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
      include: {
        user_roles: {
          where: { active: true },
          include: {
            context: true
          }
        }
      }
    });

    if (!user || !user.active) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    const userResponse = {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      profile: user.profile,
      permissions: user.permissions,
      roles: user.user_roles.map(role => ({
        type: role.roleType,
        context: role.context,
        permissions: role.permissions
      }))
    };

    res.json({
      success: true,
      data: {
        user: userResponse
      }
    });

  } catch (error) {
    console.error('Erro na validação do token:', error);
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

/**
 * Registrar novo usuário
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, cpf, email, password, profile = 'employer' } = req.body;

    // Validações
    if (!name || !cpf || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    // Validar CPF
    const cpfValidation = validateCPFForLogin(cpf);
    if (!cpfValidation.isValid) {
      return res.status(400).json({
        success: false,
        message: cpfValidation.error
      });
    }

    const formattedCPF = cpfValidation.formatted!;

    // Verificar se CPF já existe
    const existingUser = await prisma.users.findUnique({
      where: { cpf: formattedCPF }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'CPF já cadastrado'
      });
    }

    // Verificar se email já existe
    const existingEmail = await prisma.users.findUnique({
      where: { email }
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }

    // Hash da senha
    const password_hash = await bcrypt.hash(password, 12);

    // Criar usuário
    const user = await prisma.users.create({
      data: {
        name,
        cpf: formattedCPF,
        email,
        password_hash,
        profile,
        active: true,
        permissions: ['basic']
      }
    });

    // Gerar token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: {
        user: {
          id: user.id,
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          profile: user.profile
        },
        token
      }
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Middleware para verificar autenticação
 */
export const authenticateToken = (req: Request, res: Response, next: Function) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token não fornecido'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

/**
 * Middleware para verificar permissões
 */
export const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: Function) => {
    try {
      const user = (req as any).user;
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não autenticado'
        });
      }

      // Dono do sistema tem todas as permissões
      if (user.profile === 'system_owner') {
        return next();
      }

      // Verificar permissão específica
      if (user.permissions && user.permissions.includes(permission)) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: 'Permissão insuficiente'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  };
};
