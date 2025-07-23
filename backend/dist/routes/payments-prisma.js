"use strict";
// Rotas Payment com Prisma - Controle de Pagamentos
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_prisma_1 = require("../controllers/payment-controller-prisma");
const router = (0, express_1.Router)();
// GET /api/payments - Listar todos os pagamentos
router.get('/', payment_controller_prisma_1.PaymentControllerPrisma.getAllPayments);
// GET /api/payments/:id - Obter pagamento por ID
router.get('/:id', payment_controller_prisma_1.PaymentControllerPrisma.getPaymentById);
// POST /api/payments - Criar novo pagamento
router.post('/', payment_controller_prisma_1.PaymentControllerPrisma.createPayment);
// PUT /api/payments/:id - Atualizar pagamento
router.put('/:id', payment_controller_prisma_1.PaymentControllerPrisma.updatePayment);
// DELETE /api/payments/:id - Deletar pagamento
router.delete('/:id', payment_controller_prisma_1.PaymentControllerPrisma.deletePayment);
// POST /api/payments/:id/process - Processar pagamento
router.post('/:id/process', payment_controller_prisma_1.PaymentControllerPrisma.processPayment);
exports.default = router;
