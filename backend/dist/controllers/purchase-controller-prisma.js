"use strict";
// Controller Purchase com Prisma - Controle de Compras
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
exports.PurchaseControllerPrisma = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
class PurchaseControllerPrisma {
    // Listar todas as compras
    static getAllPurchases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchases = yield prisma.purchase.findMany({
                    orderBy: { createdAt: 'desc' }
                });
                res.json({
                    success: true,
                    data: purchases,
                    message: 'Compras listadas com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar compras',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter compra por ID
    static getPurchaseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const purchase = yield prisma.purchase.findUnique({
                    where: { id }
                });
                if (!purchase) {
                    res.status(404).json({
                        success: false,
                        message: 'Compra não encontrada'
                    });
                    return;
                }
                res.json({
                    success: true,
                    data: purchase,
                    message: 'Compra encontrada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar compra',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Criar nova compra
    static createPurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchaseData = req.body;
                const newPurchase = yield prisma.purchase.create({
                    data: {
                        title: purchaseData.title,
                        description: purchaseData.description,
                        amount: parseFloat(purchaseData.amount),
                        status: purchaseData.status || 'pending',
                        category: purchaseData.category
                    }
                });
                res.status(201).json({
                    success: true,
                    data: newPurchase,
                    message: 'Compra criada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao criar compra',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Atualizar compra
    static updatePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const purchase = yield prisma.purchase.update({
                    where: { id },
                    data: {
                        title: updateData.title,
                        description: updateData.description,
                        amount: updateData.amount ? parseFloat(updateData.amount) : undefined,
                        status: updateData.status,
                        category: updateData.category,
                        updatedAt: new Date()
                    }
                });
                res.json({
                    success: true,
                    data: purchase,
                    message: 'Compra atualizada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar compra',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Deletar compra
    static deletePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.purchase.delete({
                    where: { id }
                });
                res.json({
                    success: true,
                    message: 'Compra deletada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao deletar compra',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Aprovar compra
    static approvePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const purchase = yield prisma.purchase.update({
                    where: { id },
                    data: {
                        status: 'approved',
                        updatedAt: new Date()
                    }
                });
                res.json({
                    success: true,
                    data: purchase,
                    message: 'Compra aprovada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao aprovar compra',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
}
exports.PurchaseControllerPrisma = PurchaseControllerPrisma;
