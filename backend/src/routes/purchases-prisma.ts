// Rotas Purchase com Prisma - Controle de Compras
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Router } from 'express';
import { PurchaseControllerPrisma } from '../controllers/purchase-controller-prisma';

const router = Router();

// GET /api/purchases - Listar todas as compras
router.get('/', PurchaseControllerPrisma.getAllPurchases);

// GET /api/purchases/:id - Obter compra por ID
router.get('/:id', PurchaseControllerPrisma.getPurchaseById);

// POST /api/purchases - Criar nova compra
router.post('/', PurchaseControllerPrisma.createPurchase);

// PUT /api/purchases/:id - Atualizar compra
router.put('/:id', PurchaseControllerPrisma.updatePurchase);

// DELETE /api/purchases/:id - Deletar compra
router.delete('/:id', PurchaseControllerPrisma.deletePurchase);

// POST /api/purchases/:id/approve - Aprovar compra
router.post('/:id/approve', PurchaseControllerPrisma.approvePurchase);

export default router; 