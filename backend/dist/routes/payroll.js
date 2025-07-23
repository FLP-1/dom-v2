"use strict";
/**
 * @fileoverview Rotas de Folha de Pagamento para DOM v2
 * @description Endpoints para sistema de folha de pagamento
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payroll_controller_1 = require("../controllers/payroll-controller");
const router = (0, express_1.Router)();
// GET /api/payroll - Listar todas as folhas de pagamento
router.get('/', payroll_controller_1.PayrollController.getAllPayrolls);
// GET /api/payroll/stats - Obter estatísticas
router.get('/stats', payroll_controller_1.PayrollController.getPayrollStats);
// GET /api/payroll/:id - Buscar folha de pagamento por ID
router.get('/:id', payroll_controller_1.PayrollController.getPayrollById);
// POST /api/payroll/calculate - Calcular folha de pagamento
router.post('/calculate', payroll_controller_1.PayrollController.calculatePayroll);
// POST /api/payroll - Criar nova folha de pagamento
router.post('/', payroll_controller_1.PayrollController.createPayroll);
// PUT /api/payroll/:id/status - Atualizar status da folha de pagamento
router.put('/:id/status', payroll_controller_1.PayrollController.updatePayrollStatus);
exports.default = router;
