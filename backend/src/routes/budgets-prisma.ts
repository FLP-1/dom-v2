/**
 * Rotas de Orçamentos - DOM v2
 * Gerencia operações CRUD para orçamentos usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /budgets
 * Lista todos os orçamentos
 */
router.get('/', async (req, res) => {
  try {
    const budgets = await prisma.budget.findMany({
      include: {
        department: true,
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: budgets,
      count: budgets.length
    });
  } catch (error) {
    console.error('Erro ao buscar orçamentos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /budgets/:id
 * Busca orçamento por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await prisma.budget.findUnique({
      where: { id: parseInt(id) },
      include: {
        department: true,
        category: true,
        budgetItems: true
      }
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: 'Orçamento não encontrado'
      });
    }

    res.json({
      success: true,
      data: budget
    });
  } catch (error) {
    console.error('Erro ao buscar orçamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /budgets
 * Cria novo orçamento
 */
router.post('/', async (req, res) => {
  try {
    const {
      name,
      description,
      amount,
      departmentId,
      categoryId,
      startDate,
      endDate,
      status
    } = req.body;

    // Validações básicas
    if (!name || !amount || !departmentId) {
      return res.status(400).json({
        success: false,
        message: 'Nome, valor e departamento são obrigatórios'
      });
    }

    const budget = await prisma.budget.create({
      data: {
        name,
        description,
        amount: parseFloat(amount),
        departmentId: parseInt(departmentId),
        categoryId: categoryId ? parseInt(categoryId) : null,
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : null,
        status: status || 'DRAFT'
      },
      include: {
        department: true,
        category: true
      }
    });

    res.status(201).json({
      success: true,
      data: budget,
      message: 'Orçamento criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /budgets/:id
 * Atualiza orçamento
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que não devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    // Converte campos numéricos
    if (updateData.departmentId) {
      updateData.departmentId = parseInt(updateData.departmentId);
    }
    if (updateData.categoryId) {
      updateData.categoryId = parseInt(updateData.categoryId);
    }
    if (updateData.amount) {
      updateData.amount = parseFloat(updateData.amount);
    }
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const budget = await prisma.budget.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        department: true,
        category: true
      }
    });

    res.json({
      success: true,
      data: budget,
      message: 'Orçamento atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar orçamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /budgets/:id
 * Remove orçamento
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.budget.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Orçamento removido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover orçamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /budgets/department/:departmentId
 * Busca orçamentos por departamento
 */
router.get('/department/:departmentId', async (req, res) => {
  try {
    const { departmentId } = req.params;
    const budgets = await prisma.budget.findMany({
      where: { departmentId: parseInt(departmentId) },
      include: {
        department: true,
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: budgets,
      count: budgets.length
    });
  } catch (error) {
    console.error('Erro ao buscar orçamentos do departamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;


