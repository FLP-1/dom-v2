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
