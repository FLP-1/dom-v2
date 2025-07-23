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
exports.PurchaseController = void 0;
const Purchase_1 = require("../models/Purchase");
class PurchaseController {
    createPurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchaseData = req.body;
                const purchase = yield Purchase_1.Purchase.create(purchaseData);
                res.status(201).json({
                    success: true,
                    data: purchase,
                    message: 'Compra criada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao criar compra'
                });
            }
        });
    }
    getAllPurchases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const purchases = yield Purchase_1.Purchase.findAll();
                res.status(200).json({
                    success: true,
                    data: purchases,
                    message: 'Compras recuperadas com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao recuperar compras'
                });
            }
        });
    }
    getPurchaseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const purchase = yield Purchase_1.Purchase.findByPk(id);
                if (!purchase) {
                    return res.status(404).json({
                        success: false,
                        message: 'Compra não encontrada'
                    });
                }
                res.status(200).json({
                    success: true,
                    data: purchase,
                    message: 'Compra recuperada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao recuperar compra'
                });
            }
        });
    }
    updatePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const purchase = yield Purchase_1.Purchase.findByPk(id);
                if (!purchase) {
                    return res.status(404).json({
                        success: false,
                        message: 'Compra não encontrada'
                    });
                }
                yield purchase.update(updateData);
                res.status(200).json({
                    success: true,
                    data: purchase,
                    message: 'Compra atualizada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao atualizar compra'
                });
            }
        });
    }
    deletePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const purchase = yield Purchase_1.Purchase.findByPk(id);
                if (!purchase) {
                    return res.status(404).json({
                        success: false,
                        message: 'Compra não encontrada'
                    });
                }
                yield purchase.destroy();
                res.status(200).json({
                    success: true,
                    message: 'Compra excluída com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao excluir compra'
                });
            }
        });
    }
    approvePurchase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const purchase = yield Purchase_1.Purchase.findByPk(id);
                if (!purchase) {
                    return res.status(404).json({
                        success: false,
                        message: 'Compra não encontrada'
                    });
                }
                purchase.status = 'APPROVED';
                purchase.approvedAt = new Date();
                yield purchase.save();
                res.status(200).json({
                    success: true,
                    data: purchase,
                    message: 'Compra aprovada com sucesso'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    message: 'Erro ao aprovar compra'
                });
            }
        });
    }
}
exports.PurchaseController = PurchaseController;
