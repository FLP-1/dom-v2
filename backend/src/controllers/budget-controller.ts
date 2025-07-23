// Controller Budget - Controle de Orçamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Request, Response } from 'express';
import { Budget, CreateBudgetRequest, UpdateBudgetRequest } from '../models/Budget';

// Simulação de banco de dados (simples)
let budgets: Budget[] = [
  {
    id: '1',
    name: 'Orçamento Mensal - Janeiro 2025',
    amount: 5000,
    spent: 3200,
    category: 'Geral',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    status: 'active',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: '2',
    name: 'Orçamento Alimentação',
    amount: 1500,
    spent: 1200,
    category: 'Alimentação',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    status: 'active',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: '3',
    name: 'Orçamento Transporte',
    amount: 800,
    spent: 600,
    category: 'Transporte',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    status: 'active',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-18')
  }
];

export class BudgetController {
  // Listar todos os orçamentos
  static async getAllBudgets(req: Request, res: Response): Promise<void> {
    try {
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
      const budget = budgets.find(b => b.id === id);

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
      const budgetData: CreateBudgetRequest = req.body;
      
      const newBudget: Budget = {
        id: Date.now().toString(),
        ...budgetData,
        spent: 0,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      budgets.push(newBudget);

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
      const updateData: UpdateBudgetRequest = req.body;

      const budgetIndex = budgets.findIndex(b => b.id === id);

      if (budgetIndex === -1) {
        res.status(404).json({
          success: false,
          message: 'Orçamento não encontrado'
        });
        return;
      }

      budgets[budgetIndex] = {
        ...budgets[budgetIndex],
        ...updateData,
        updatedAt: new Date()
      };

      res.json({
        success: true,
        data: budgets[budgetIndex],
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
      const budgetIndex = budgets.findIndex(b => b.id === id);

      if (budgetIndex === -1) {
        res.status(404).json({
          success: false,
          message: 'Orçamento não encontrado'
        });
        return;
      }

      budgets.splice(budgetIndex, 1);

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