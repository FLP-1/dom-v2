import { Router } from 'express';
import { PaymentController } from '../controllers/payment-controller';

const router = Router();
const paymentController = new PaymentController();

// Rotas de pagamentos
router.post('/payments', paymentController.createPayment);
router.get('/payments', paymentController.getAllPayments);
router.get('/payments/:id', paymentController.getPaymentById);
router.put('/payments/:id', paymentController.updatePayment);
router.delete('/payments/:id', paymentController.deletePayment);
router.post('/payments/:id/process', paymentController.processPayment);

export default router;