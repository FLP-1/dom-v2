"use strict";
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
exports.PaymentController = void 0;
const database_1 = require("../database");
class PaymentController {
    createPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentData = req.body;
                const newPayment = yield database_1.prisma.payment.create({
                    data: paymentData
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
                    error: error.message,
                    message: 'Erro ao criar pagamento'
                });
            }
        });
    }
    getAllPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payments = yield database_1.prisma.payment.findMany();
                res.status(200).json({
                    success: true,
                    data: payments,
                    message: 'Pagamentos recuperados com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao recuperar pagamentos'
                });
            }
        });
    }
    getPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const payment = yield database_1.prisma.payment.findUnique({
                    where: { id }
                });
                if (!payment) {
                    return res.status(404).json({
                        success: false,
                        message: 'Pagamento não encontrado'
                    });
                }
                res.status(200).json({
                    success: true,
                    data: payment,
                    message: 'Pagamento recuperado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao recuperar pagamento'
                });
            }
        });
    }
    updatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const payment = yield database_1.prisma.payment.update({
                    where: { id },
                    data: updateData
                });
                res.status(200).json({
                    success: true,
                    data: payment,
                    message: 'Pagamento atualizado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao atualizar pagamento'
                });
            }
        });
    }
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.prisma.payment.delete({
                    where: { id }
                });
                res.status(200).json({
                    success: true,
                    message: 'Pagamento excluído com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao excluir pagamento'
                });
            }
        });
    }
    processPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const payment = yield database_1.prisma.payment.update({
                    where: { id },
                    data: {
                        status: 'PROCESSED',
                        processedAt: new Date()
                    }
                });
                res.status(200).json({
                    success: true,
                    data: payment,
                    message: 'Pagamento processado com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao processar pagamento'
                });
            }
        });
    }
}
exports.PaymentController = PaymentController;
