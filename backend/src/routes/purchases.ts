import { Router } from 'express';
import { PurchaseControllerPrisma } from '../controllers/purchase-controller-prisma';

const router = Router();

// Rotas de compras com Prisma
router.post('/purchases', PurchaseControllerPrisma.createPurchase);
router.get('/purchases', PurchaseControllerPrisma.getAllPurchases);
router.get('/purchases/:id', PurchaseControllerPrisma.getPurchaseById);
router.put('/purchases/:id', PurchaseControllerPrisma.updatePurchase);
router.delete('/purchases/:id', PurchaseControllerPrisma.deletePurchase);
router.post('/purchases/:id/approve', PurchaseControllerPrisma.approvePurchase);

export default router;