// Rotas Payment com Prisma - Controle de Pagamentos
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Router } from 'express';
import { PaymentControllerPrisma } from '../controllers/payment-controller-prisma';

const router = Router();

// GET /api/payments - Listar todos os pagamentos
router.get('/', PaymentControllerPrisma.getAllPayments);

// GET /api/payments/:id - Obter pagamento por ID
router.get('/:id', PaymentControllerPrisma.getPaymentById);

// POST /api/payments - Criar novo pagamento
router.post('/', PaymentControllerPrisma.createPayment);

// PUT /api/payments/:id - Atualizar pagamento
router.put('/:id', PaymentControllerPrisma.updatePayment);

// DELETE /api/payments/:id - Deletar pagamento
router.delete('/:id', PaymentControllerPrisma.deletePayment);

// POST /api/payments/:id/process - Processar pagamento
router.post('/:id/process', PaymentControllerPrisma.processPayment);

export default router; 