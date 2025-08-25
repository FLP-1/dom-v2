/**
 * Rotas de ConfiguraÃ§Ãµes - DOM v2
 * Gerencia operaÃ§Ãµes CRUD para configuraÃ§Ãµes usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /settings
 * Lista todas as configuraÃ§Ãµes
 */
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.setting.findMany({
      orderBy: {
        category: 'asc'
      }
    });

    res.json({
      success: true,
      data: settings,
      count: settings.length
    });
  } catch (error) {
    console.error('Erro ao buscar configuraÃ§Ãµes:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /settings/:id
 * Busca configuraÃ§Ã£o por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const setting = await prisma.setting.findUnique({
      where: { id: parseInt(id) }
    });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: 'ConfiguraÃ§Ã£o nÃ£o encontrada'
      });
    }

    res.json({
      success: true,
      data: setting
    });
  } catch (error) {
    console.error('Erro ao buscar configuraÃ§Ã£o:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /settings
 * Cria nova configuraÃ§Ã£o
 */
router.post('/', async (req, res) => {
  try {
    const {
      key,
      value,
      category,
      description
    } = req.body;

    // ValidaÃ§Ãµes bÃ¡sicas
    if (!key || !value) {
      return res.status(400).json({
        success: false,
        message: 'Chave e valor sÃ£o obrigatÃ³rios'
      });
    }

    const setting = await prisma.setting.create({
      data: {
        key,
        value,
        category: category || 'GENERAL',
        description
      }
    });

    res.status(201).json({
      success: true,
      data: setting,
      message: 'ConfiguraÃ§Ã£o criada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar configuraÃ§Ã£o:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /settings/:id
 * Atualiza configuraÃ§Ã£o
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que nÃ£o devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    const setting = await prisma.setting.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({
      success: true,
      data: setting,
      message: 'ConfiguraÃ§Ã£o atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar configuraÃ§Ã£o:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /settings/:id
 * Remove configuraÃ§Ã£o
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.setting.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'ConfiguraÃ§Ã£o removida com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover configuraÃ§Ã£o:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /settings/category/:category
 * Busca configuraÃ§Ãµes por categoria
 */
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const settings = await prisma.setting.findMany({
      where: { category },
      orderBy: {
        key: 'asc'
      }
    });

    res.json({
      success: true,
      data: settings,
      count: settings.length
    });
  } catch (error) {
    console.error('Erro ao buscar configuraÃ§Ãµes da categoria:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
