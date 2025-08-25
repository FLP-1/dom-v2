/**
 * Rotas de Documentos - DOM v2
 * Gerencia operaÃ§Ãµes CRUD para documentos usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /documents
 * Lista todos os documentos
 */
router.get('/', async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      include: {
        uploadedBy: true,
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: documents,
      count: documents.length
    });
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /documents/:id
 * Busca documento por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.document.findUnique({
      where: { id: parseInt(id) },
      include: {
        uploadedBy: true,
        category: true
      }
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Documento nÃ£o encontrado'
      });
    }

    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Erro ao buscar documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /documents
 * Cria novo documento
 */
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      filePath,
      fileType,
      fileSize,
      categoryId,
      tags
    } = req.body;

    // ValidaÃ§Ãµes bÃ¡sicas
    if (!title || !filePath) {
      return res.status(400).json({
        success: false,
        message: 'TÃ­tulo e caminho do arquivo sÃ£o obrigatÃ³rios'
      });
    }

    const document = await prisma.document.create({
      data: {
        title,
        description,
        filePath,
        fileType,
        fileSize: fileSize ? parseInt(fileSize) : null,
        categoryId: categoryId ? parseInt(categoryId) : null,
        tags: tags ? JSON.parse(tags) : [],
        uploadedById: 1 // TODO: Pegar do usuÃ¡rio logado
      },
      include: {
        uploadedBy: true,
        category: true
      }
    });

    res.status(201).json({
      success: true,
      data: document,
      message: 'Documento criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /documents/:id
 * Atualiza documento
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que nÃ£o devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    // Converte campos numÃ©ricos
    if (updateData.categoryId) {
      updateData.categoryId = parseInt(updateData.categoryId);
    }
    if (updateData.fileSize) {
      updateData.fileSize = parseInt(updateData.fileSize);
    }
    if (updateData.tags) {
      updateData.tags = JSON.parse(updateData.tags);
    }

    const document = await prisma.document.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        uploadedBy: true,
        category: true
      }
    });

    res.json({
      success: true,
      data: document,
      message: 'Documento atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /documents/:id
 * Remove documento
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.document.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Documento removido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover documento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;
