"use strict";
// Controller Budget com Prisma - Controle de Orçamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetControllerPrisma = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
class BudgetControllerPrisma {
    // Listar todos os orçamentos
    static getAllBudgets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const budgets = yield prisma.budget.findMany({
                    orderBy: { createdAt: 'desc' }
                });
                res.json({
                    success: true,
                    data: budgets,
                    message: 'Orçamentos listados com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar orçamentos',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter orçamento por ID
    static getBudgetById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const budget = yield prisma.budget.findUnique({
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar orçamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Criar novo orçamento
    static createBudget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const budgetData = req.body;
                const newBudget = yield prisma.budget.create({
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao criar orçamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Atualizar orçamento
    static updateBudget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const budget = yield prisma.budget.update({
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar orçamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Deletar orçamento
    static deleteBudget(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.budget.delete({
                    where: { id }
                });
                res.json({
                    success: true,
                    message: 'Orçamento deletado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao deletar orçamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
}
exports.BudgetControllerPrisma = BudgetControllerPrisma;
