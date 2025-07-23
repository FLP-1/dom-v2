"use strict";
// Controller Payment com Prisma - Controle de Pagamentos
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
exports.PaymentControllerPrisma = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
class PaymentControllerPrisma {
    // Listar todos os pagamentos
    static getAllPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield prisma.payment.findMany({
                    orderBy: { createdAt: 'desc' }
                });
                res.json({
                    success: true,
                    data: payments,
                    message: 'Pagamentos listados com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar pagamentos',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Obter pagamento por ID
    static getPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const payment = yield prisma.payment.findUnique({
                    where: { id }
                });
                if (!payment) {
                    res.status(404).json({
                        success: false,
                        message: 'Pagamento não encontrado'
                    });
                    return;
                }
                res.json({
                    success: true,
                    data: payment,
                    message: 'Pagamento encontrado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao buscar pagamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Criar novo pagamento
    static createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentData = req.body;
                const newPayment = yield prisma.payment.create({
                    data: {
                        amount: parseFloat(paymentData.amount),
                        description: paymentData.description,
                        status: paymentData.status || 'pending',
                        dueDate: new Date(paymentData.dueDate)
                    }
                });
                res.status(201).json({
                    success: true,
                    data: newPayment,
                    message: 'Pagamento criado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao criar pagamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Atualizar pagamento
    static updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const payment = yield prisma.payment.update({
                    where: { id },
                    data: {
                        amount: updateData.amount ? parseFloat(updateData.amount) : undefined,
                        description: updateData.description,
                        status: updateData.status,
                        dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
                        updatedAt: new Date()
                    }
                });
                res.json({
                    success: true,
                    data: payment,
                    message: 'Pagamento atualizado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao atualizar pagamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Deletar pagamento
    static deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma.payment.delete({
                    where: { id }
                });
                res.json({
                    success: true,
                    message: 'Pagamento deletado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao deletar pagamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
    // Processar pagamento
    static processPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const payment = yield prisma.payment.update({
                    where: { id },
                    data: {
                        status: 'completed',
                        updatedAt: new Date()
                    }
                });
                res.json({
                    success: true,
                    data: payment,
                    message: 'Pagamento processado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Erro ao processar pagamento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                });
            }
        });
    }
}
exports.PaymentControllerPrisma = PaymentControllerPrisma;
