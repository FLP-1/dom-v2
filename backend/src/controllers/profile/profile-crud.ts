
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

/**
 * Profile CRUD Controller - DOM v2
 * Responsável por operações CRUD de perfis
 */

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Buscar todos os perfis de um usuário
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
 * Buscar perfil principal de um usuário
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
 * Criar novo perfil
 */
export const createUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const profileData = req.body;

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

    // Se for perfil principal, desativar outros
    if (profileData.isPrimary) {
      await prisma.userProfile.updateMany({
        where: { userId },
        data: { isPrimary: false }
      });
    }

    const newProfile = await prisma.userProfile.create({
      data: {
        ...profileData,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: newProfile,
      message: 'Perfil criado com sucesso'
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
 * Atualizar perfil
 */
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const updateData = req.body;

    // Verificar se o perfil existe
    const existingProfile = await prisma.userProfile.findUnique({
      where: { id: profileId }
    });

    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil não encontrado'
      });
    }

    // Se for perfil principal, desativar outros
    if (updateData.isPrimary) {
      await prisma.userProfile.updateMany({
        where: { 
          userId: existingProfile.userId,
          id: { not: profileId }
        },
        data: { isPrimary: false }
      });
    }

    const updatedProfile = await prisma.userProfile.update({
      where: { id: profileId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedProfile,
      message: 'Perfil atualizado com sucesso'
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
 * Excluir perfil
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

    // Não permitir excluir perfil principal
    if (profile.isPrimary) {
      return res.status(400).json({
        success: false,
        message: 'Não é possível excluir o perfil principal'
      });
    }

    await prisma.userProfile.delete({
      where: { id: profileId }
    });

    res.json({
      success: true,
      message: 'Perfil excluído com sucesso'
    });

  } catch (error) {
    console.error('Erro ao excluir perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

/**
 * Definir perfil como principal
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
        id: { not: profileId }
      },
      data: { isPrimary: false }
    });

    // Ativar este perfil como principal
    const updatedProfile = await prisma.userProfile.update({
      where: { id: profileId },
      data: { isPrimary: true }
    });

    res.json({
      success: true,
      data: updatedProfile,
      message: 'Perfil definido como principal'
    });

  } catch (error) {
    console.error('Erro ao definir perfil principal:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};
