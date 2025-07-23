// Rotas Budget com Prisma - Controle de Orçamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Router } from 'express';
import { BudgetControllerPrisma } from '../controllers/budget-controller-prisma';

const router = Router();

// GET /api/budgets - Listar todos os orçamentos
router.get('/', BudgetControllerPrisma.getAllBudgets);

// GET /api/budgets/:id - Obter orçamento por ID
router.get('/:id', BudgetControllerPrisma.getBudgetById);

// POST /api/budgets - Criar novo orçamento
router.post('/', BudgetControllerPrisma.createBudget);

// PUT /api/budgets/:id - Atualizar orçamento
router.put('/:id', BudgetControllerPrisma.updateBudget);

// DELETE /api/budgets/:id - Deletar orçamento
router.delete('/:id', BudgetControllerPrisma.deleteBudget);

export default router; 