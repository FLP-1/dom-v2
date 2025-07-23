"use strict";
// Rotas Purchase com Prisma - Controle de Compras
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchase_controller_prisma_1 = require("../controllers/purchase-controller-prisma");
const router = (0, express_1.Router)();
// GET /api/purchases - Listar todas as compras
router.get('/', purchase_controller_prisma_1.PurchaseControllerPrisma.getAllPurchases);
// GET /api/purchases/:id - Obter compra por ID
router.get('/:id', purchase_controller_prisma_1.PurchaseControllerPrisma.getPurchaseById);
// POST /api/purchases - Criar nova compra
router.post('/', purchase_controller_prisma_1.PurchaseControllerPrisma.createPurchase);
// PUT /api/purchases/:id - Atualizar compra
router.put('/:id', purchase_controller_prisma_1.PurchaseControllerPrisma.updatePurchase);
// DELETE /api/purchases/:id - Deletar compra
router.delete('/:id', purchase_controller_prisma_1.PurchaseControllerPrisma.deletePurchase);
// POST /api/purchases/:id/approve - Aprovar compra
router.post('/:id/approve', purchase_controller_prisma_1.PurchaseControllerPrisma.approvePurchase);
exports.default = router;
