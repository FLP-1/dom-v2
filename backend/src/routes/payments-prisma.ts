/**
 * Rotas de Pagamentos - DOM v2
 * Gerencia operações CRUD para pagamentos usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /payments
 * Lista todos os pagamentos
 */
router.get('/', async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        employee: true,
        paymentMethod: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({
      success: true,
      data: payments,
      count: payments.length
    });
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /payments/:id
 * Busca pagamento por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(id) },
      include: {
        employee: true,
        paymentMethod: true
      }
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Pagamento não encontrado'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Erro ao buscar pagamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /payments
 * Cria novo pagamento
 */
router.post('/', async (req, res) => {
  try {
    const {
      employeeId,
      amount,
      paymentMethodId,
      paymentDate,
      description,
      status
    } = req.body;

    // Validações básicas
    if (!employeeId || !amount || !paymentMethodId) {
      return res.status(400).json({
        success: false,
        message: 'ID do funcionário, valor e método de pagamento são obrigatórios'
      });
    }

    const payment = await prisma.payment.create({
      data: {
        employeeId: parseInt(employeeId),
        amount: parseFloat(amount),
        paymentMethodId: parseInt(paymentMethodId),
        paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
        description,
        status: status || 'PENDING'
      },
      include: {
        employee: true,
        paymentMethod: true
      }
    });

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Pagamento criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /payments/:id
 * Atualiza pagamento
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que não devem ser atualizados
    delete updateData.id;
    delete updateData.createdAt;

    // Converte campos numéricos
    if (updateData.employeeId) {
      updateData.employeeId = parseInt(updateData.employeeId);
    }
    if (updateData.paymentMethodId) {
      updateData.paymentMethodId = parseInt(updateData.paymentMethodId);
    }
    if (updateData.amount) {
      updateData.amount = parseFloat(updateData.amount);
    }
    if (updateData.paymentDate) {
      updateData.paymentDate = new Date(updateData.paymentDate);
    }

    const payment = await prisma.payment.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        employee: true,
        paymentMethod: true
      }
    });

    res.json({
      success: true,
      data: payment,
      message: 'Pagamento atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar pagamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /payments/:id
 * Remove pagamento
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.payment.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Pagamento removido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover pagamento:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /payments/employee/:employeeId
 * Busca pagamentos por funcionário
 */
router.get('/employee/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const payments = await prisma.payment.findMany({
      where: { employeeId: parseInt(employeeId) },
      include: {
        employee: true,
        paymentMethod: true
      },
      orderBy: {
        paymentDate: 'desc'
      }
    });

    res.json({
      success: true,
      data: payments,
      count: payments.length
    });
  } catch (error) {
    console.error('Erro ao buscar pagamentos do funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;


