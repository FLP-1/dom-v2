"use strict";
// Rotas Budget com Prisma - Controle de Orçamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budget_controller_prisma_1 = require("../controllers/budget-controller-prisma");
const router = (0, express_1.Router)();
// GET /api/budgets - Listar todos os orçamentos
router.get('/', budget_controller_prisma_1.BudgetControllerPrisma.getAllBudgets);
// GET /api/budgets/:id - Obter orçamento por ID
router.get('/:id', budget_controller_prisma_1.BudgetControllerPrisma.getBudgetById);
// POST /api/budgets - Criar novo orçamento
router.post('/', budget_controller_prisma_1.BudgetControllerPrisma.createBudget);
// PUT /api/budgets/:id - Atualizar orçamento
router.put('/:id', budget_controller_prisma_1.BudgetControllerPrisma.updateBudget);
// DELETE /api/budgets/:id - Deletar orçamento
router.delete('/:id', budget_controller_prisma_1.BudgetControllerPrisma.deleteBudget);
exports.default = router;
