/**
 * Rotas de Perfis - DOM v2
 * Gerencia operaÃ§Ãµes CRUD para perfis usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /profiles
 * Lista todos os perfis
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        user: true,
        permissions: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: profiles,
      count: profiles.length
    });
  } catch (error) {
    console.error('Erro ao buscar perfis:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /profiles/:id
 * Busca perfil por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await prisma.profile.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        permissions: true
      }
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil nÃ£o encontrado'
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /profiles
 * Cria novo perfil
 */
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      userId,
      permissions
    } = req.body;

    // ValidaÃ§Ãµes bÃ¡sicas
    if (!name || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Nome e usuÃ¡rio sÃ£o obrigatÃ³rios'
      });
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        description,
        userId: parseInt(userId),
        permissions: permissions ? JSON.parse(permissions) : []
      },
      include: {
        user: true,
        permissions: true
      }
    });

    res.status(201).json({
      success: true,
      data: profile,
      message: 'Perfil criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /profiles/:id
 * Atualiza perfil
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que nÃ£o devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    // Converte campos numÃ©ricos
    if (updateData.userId) {
      updateData.userId = parseInt(updateData.userId);
    }
    if (updateData.permissions) {
      updateData.permissions = JSON.parse(updateData.permissions);
    }

    const profile = await prisma.profile.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        user: true,
        permissions: true
      }
    });

    res.json({
      success: true,
      data: profile,
      message: 'Perfil atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /profiles/:id
 * Remove perfil
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.profile.delete({
      where: { id: parseInt(id) }
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
});

export default router;
