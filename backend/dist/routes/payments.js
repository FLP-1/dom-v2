"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment-controller");
const router = (0, express_1.Router)();
const paymentController = new payment_controller_1.PaymentController();
// Rotas de pagamentos
router.post('/payments', paymentController.createPayment);
router.get('/payments', paymentController.getAllPayments);
router.get('/payments/:id', paymentController.getPaymentById);
router.put('/payments/:id', paymentController.updatePayment);
router.delete('/payments/:id', paymentController.deletePayment);
router.post('/payments/:id/process', paymentController.processPayment);
exports.default = router;
