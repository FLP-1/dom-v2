// Rotas Budget - Controle de Orçamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Router } from 'express';
import { BudgetController } from '../controllers/budget-controller';

const router = Router();

// GET /api/budgets - Listar todos os orçamentos
router.get('/', BudgetController.getAllBudgets);

// GET /api/budgets/:id - Obter orçamento por ID
router.get('/:id', BudgetController.getBudgetById);

// POST /api/budgets - Criar novo orçamento
router.post('/', BudgetController.createBudget);

// PUT /api/budgets/:id - Atualizar orçamento
router.put('/:id', BudgetController.updateBudget);

// DELETE /api/budgets/:id - Deletar orçamento
router.delete('/:id', BudgetController.deleteBudget);

export default router; 