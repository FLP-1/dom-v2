// Controller Budget com Prisma - Controle de Orçamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class BudgetControllerPrisma {
  // Listar todos os orçamentos
  static async getAllBudgets(req: Request, res: Response): Promise<void> {
    try {
      const budgets = await prisma.budget.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.json({
        success: true,
        data: budgets,
        message: 'Orçamentos listados com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar orçamentos',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Obter orçamento por ID
  static async getBudgetById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const budget = await prisma.budget.findUnique({
        where: { id }
      });

      if (!budget) {
        res.status(404).json({
          success: false,
          message: 'Orçamento não encontrado'
        });
        return;
      }

      res.json({
        success: true,
        data: budget,
        message: 'Orçamento encontrado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar orçamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Criar novo orçamento
  static async createBudget(req: Request, res: Response): Promise<void> {
    try {
      const budgetData = req.body;
      
      const newBudget = await prisma.budget.create({
        data: {
          name: budgetData.name,
          amount: parseFloat(budgetData.amount),
          spent: parseFloat(budgetData.spent || 0),
          category: budgetData.category,
          startDate: new Date(budgetData.startDate),
          endDate: new Date(budgetData.endDate),
          status: budgetData.status || 'active'
        }
      });

      res.status(201).json({
        success: true,
        data: newBudget,
        message: 'Orçamento criado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar orçamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Atualizar orçamento
  static async updateBudget(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const budget = await prisma.budget.update({
        where: { id },
        data: {
          name: updateData.name,
          amount: updateData.amount ? parseFloat(updateData.amount) : undefined,
          spent: updateData.spent ? parseFloat(updateData.spent) : undefined,
          category: updateData.category,
          startDate: updateData.startDate ? new Date(updateData.startDate) : undefined,
          endDate: updateData.endDate ? new Date(updateData.endDate) : undefined,
          status: updateData.status,
          updatedAt: new Date()
        }
      });

      res.json({
        success: true,
        data: budget,
        message: 'Orçamento atualizado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar orçamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  // Deletar orçamento
  static async deleteBudget(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      await prisma.budget.delete({
        where: { id }
      });

      res.json({
        success: true,
        message: 'Orçamento deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar orçamento',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }
} 