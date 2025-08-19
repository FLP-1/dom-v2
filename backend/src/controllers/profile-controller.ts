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
