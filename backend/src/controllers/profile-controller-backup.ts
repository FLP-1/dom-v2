
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

const prisma = new PrismaClient();

/**
 * Busca todos os perfis de um usuário
 */
export const getUserProfiles = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const profiles = await prisma.userProfile.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            cpf: true,
            email: true
          }
        }
      },
      orderBy: [
        { isPrimary: 'desc' },
        { profileType: 'asc' }
      ]
    });

    res.json({
      success: true,
      data: profiles
    });

  } catch (error) {
    console.error('Erro ao buscar perfis:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Busca o perfil principal de um usuário
 */
export const getPrimaryProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const primaryProfile = await prisma.userProfile.findFirst({
      where: { 
        userId,
        isPrimary: true,
        isActive: true
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            cpf: true,
            email: true,
            profile: true
          }
        }
      }
    });

    if (!primaryProfile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil principal não encontrado'
      });
    }

    res.json({
      success: true,
      data: primaryProfile
    });

  } catch (error) {
    console.error('Erro ao buscar perfil principal:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Busca perfis por tipo
 */
export const getProfilesByType = async (req: Request, res: Response) => {
  try {
    const { profileType } = req.params;
    const { contextId, contextType, active } = req.query;

    const where: any = {
      profileType,
      isActive: true
    };

    if (contextId) where.contextId = contextId as string;
    if (contextType) where.contextType = contextType as string;
    if (active !== undefined) where.isActive = active === 'true';

    const profiles = await prisma.userProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            cpf: true,
            email: true
          }
        }
      },
      orderBy: [
        { isPrimary: 'desc' },
        { created_at: 'desc' }
      ]
    });

    res.json({
      success: true,
      data: profiles
    });

  } catch (error) {
    console.error('Erro ao buscar perfis por tipo:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Cria um novo perfil para um usuário
 */
export const createUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { profileType, contextId, contextType, isPrimary, permissions, metadata } = req.body;

    // Validações
    if (!profileType) {
      return res.status(400).json({
        success: false,
        message: 'Tipo de perfil é obrigatório'
      });
    }

    // Verificar se o usuário existe
    const user = await prisma.users.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Se for perfil principal, desativar outros perfis principais
    if (isPrimary) {
      await prisma.userProfile.updateMany({
        where: { 
          userId,
          isPrimary: true
        },
        data: { isPrimary: false }
      });
    }

    // Verificar se já existe um perfil com o mesmo tipo e contexto
    const existingProfile = await prisma.userProfile.findFirst({
      where: {
        userId,
        profileType,
        contextId: contextId || null
      }
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Já existe um perfil com este tipo e contexto'
      });
    }

    // Criar o perfil
    const profile = await prisma.userProfile.create({
      data: {
        userId,
        profileType,
        contextId: contextId || null,
        contextType: contextType || null,
        isPrimary: isPrimary || false,
        isActive: true,
        permissions: permissions || {},
        metadata: metadata || {}
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            cpf: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Perfil criado com sucesso',
      data: profile
    });

  } catch (error) {
    console.error('Erro ao criar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Atualiza um perfil existente
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const { profileType, contextId, contextType, isPrimary, isActive, permissions, metadata } = req.body;

    // Verificar se o perfil existe
    const existingProfile = await prisma.userProfile.findUnique({
      where: { id: profileId },
      include: { user: true }
    });

    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil não encontrado'
      });
    }

    // Se for tornar principal, desativar outros perfis principais
    if (isPrimary && !existingProfile.isPrimary) {
      await prisma.userProfile.updateMany({
        where: { 
          userId: existingProfile.userId,
          isPrimary: true
        },
        data: { isPrimary: false }
      });
    }

    // Atualizar o perfil
    const updatedProfile = await prisma.userProfile.update({
      where: { id: profileId },
      data: {
        profileType: profileType || existingProfile.profileType,
        contextId: contextId !== undefined ? contextId : existingProfile.contextId,
        contextType: contextType || existingProfile.contextType,
        isPrimary: isPrimary !== undefined ? isPrimary : existingProfile.isPrimary,
        isActive: isActive !== undefined ? isActive : existingProfile.isActive,
        permissions: permissions || existingProfile.permissions,
        metadata: metadata || existingProfile.metadata
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            cpf: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      data: updatedProfile
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Remove um perfil
 */
export const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;

    // Verificar se o perfil existe
    const profile = await prisma.userProfile.findUnique({
      where: { id: profileId }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil não encontrado'
      });
    }

    // Não permitir remover perfil principal
    if (profile.isPrimary) {
      return res.status(400).json({
        success: false,
        message: 'Não é possível remover o perfil principal'
      });
    }

    // Remover o perfil
    await prisma.userProfile.delete({
      where: { id: profileId }
    });

    res.json({
      success: true,
      message: 'Perfil removido com sucesso'
    });

  } catch (error) {
    console.error('Erro ao remover perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Define um perfil como principal
 */
export const setPrimaryProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;

    // Verificar se o perfil existe
    const profile = await prisma.userProfile.findUnique({
      where: { id: profileId }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil não encontrado'
      });
    }

    // Desativar outros perfis principais do usuário
    await prisma.userProfile.updateMany({
      where: { 
        userId: profile.userId,
        isPrimary: true
      },
      data: { isPrimary: false }
    });

    // Definir este perfil como principal
    const updatedProfile = await prisma.userProfile.update({
      where: { id: profileId },
      data: { isPrimary: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            cpf: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Perfil definido como principal',
      data: updatedProfile
    });

  } catch (error) {
    console.error('Erro ao definir perfil principal:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Busca estatísticas de perfis
 */
export const getProfileStats = async (req: Request, res: Response) => {
  try {
    const stats = await prisma.userProfile.groupBy({
      by: ['profileType'],
      _count: {
        id: true
      },
      where: {
        isActive: true
      }
    });

    const totalProfiles = await prisma.userProfile.count({
      where: { isActive: true }
    });

    const primaryProfiles = await prisma.userProfile.count({
      where: { 
        isPrimary: true,
        isActive: true
      }
    });

    const additionalProfiles = await prisma.userProfile.count({
      where: { 
        isPrimary: false,
        isActive: true
      }
    });

    res.json({
      success: true,
      data: {
        total: totalProfiles,
        primary: primaryProfiles,
        additional: additionalProfiles,
        byType: stats.map(stat => ({
          type: stat.profileType,
          count: stat._count.id
        }))
      }
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};
