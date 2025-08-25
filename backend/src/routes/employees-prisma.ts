/**
 * Rotas de Funcionários - DOM v2
 * Gerencia operações CRUD para funcionários usando Prisma ORM
 */

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/**
 * GET /employees
 * Lista todos os funcionários
 */
router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        profile: true,
        department: true,
        position: true
      }
    });

    res.json({
      success: true,
      data: employees,
      count: employees.length
    });
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /employees/:id
 * Busca funcionário por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
      include: {
        profile: true,
        department: true,
        position: true,
        timeRecords: true,
        documents: true
      }
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Funcionário não encontrado'
      });
    }

    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Erro ao buscar funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * POST /employees
 * Cria novo funcionário
 */
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      cpf,
      phone,
      address,
      departmentId,
      positionId,
      salary,
      hireDate,
      status
    } = req.body;

    // Validações básicas
    if (!name || !email || !cpf) {
      return res.status(400).json({
        success: false,
        message: 'Nome, email e CPF são obrigatórios'
      });
    }

    const employee = await prisma.employee.create({
      data: {
        name,
        email,
        cpf,
        phone,
        address,
        departmentId: departmentId ? parseInt(departmentId) : null,
        positionId: positionId ? parseInt(positionId) : null,
        salary: salary ? parseFloat(salary) : null,
        hireDate: hireDate ? new Date(hireDate) : new Date(),
        status: status || 'ACTIVE'
      },
      include: {
        profile: true,
        department: true,
        position: true
      }
    });

    res.status(201).json({
      success: true,
      data: employee,
      message: 'Funcionário criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * PUT /employees/:id
 * Atualiza funcionário
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
    if (updateData.positionId) {
      updateData.positionId = parseInt(updateData.positionId);
    }
    if (updateData.salary) {
      updateData.salary = parseFloat(updateData.salary);
    }
    if (updateData.hireDate) {
      updateData.hireDate = new Date(updateData.hireDate);
    }

    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        profile: true,
        department: true,
        position: true
      }
    });

    res.json({
      success: true,
      data: employee,
      message: 'Funcionário atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * DELETE /employees/:id
 * Remove funcionário
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.employee.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Funcionário removido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao remover funcionário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

/**
 * GET /employees/search
 * Busca funcionários por critérios
 */
router.get('/search', async (req, res) => {
  try {
    const { name, email, department, status } = req.query;

    const where: any = {};

    if (name) {
      where.name = { contains: name as string, mode: 'insensitive' };
    }
    if (email) {
      where.email = { contains: email as string, mode: 'insensitive' };
    }
    if (department) {
      where.department = { name: { contains: department as string, mode: 'insensitive' } };
    }
    if (status) {
      where.status = status;
    }

    const employees = await prisma.employee.findMany({
      where,
      include: {
        profile: true,
        department: true,
        position: true
      }
    });

    res.json({
      success: true,
      data: employees,
      count: employees.length
    });
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

export default router;


