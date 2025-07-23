"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchase_controller_prisma_1 = require("../controllers/purchase-controller-prisma");
const router = (0, express_1.Router)();
// Rotas de compras com Prisma
router.post('/purchases', purchase_controller_prisma_1.PurchaseControllerPrisma.createPurchase);
router.get('/purchases', purchase_controller_prisma_1.PurchaseControllerPrisma.getAllPurchases);
router.get('/purchases/:id', purchase_controller_prisma_1.PurchaseControllerPrisma.getPurchaseById);
router.put('/purchases/:id', purchase_controller_prisma_1.PurchaseControllerPrisma.updatePurchase);
router.delete('/purchases/:id', purchase_controller_prisma_1.PurchaseControllerPrisma.deletePurchase);
router.post('/purchases/:id/approve', purchase_controller_prisma_1.PurchaseControllerPrisma.approvePurchase);
exports.default = router;
