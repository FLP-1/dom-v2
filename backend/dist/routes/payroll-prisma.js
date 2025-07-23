"use strict";
// Rotas Payroll com Prisma - Controle de Folha de Pagamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payroll_controller_prisma_1 = require("../controllers/payroll-controller-prisma");
const router = (0, express_1.Router)();
// GET /api/payroll - Listar todas as folhas de pagamento
router.get('/', payroll_controller_prisma_1.PayrollControllerPrisma.getAllPayrolls);
// GET /api/payroll/:id - Obter folha de pagamento por ID
router.get('/:id', payroll_controller_prisma_1.PayrollControllerPrisma.getPayrollById);
// POST /api/payroll - Criar nova folha de pagamento
router.post('/', payroll_controller_prisma_1.PayrollControllerPrisma.createPayroll);
// PUT /api/payroll/:id - Atualizar folha de pagamento
router.put('/:id', payroll_controller_prisma_1.PayrollControllerPrisma.updatePayroll);
// DELETE /api/payroll/:id - Deletar folha de pagamento
router.delete('/:id', payroll_controller_prisma_1.PayrollControllerPrisma.deletePayroll);
// GET /api/payroll/stats - Obter estatísticas
router.get('/stats', payroll_controller_prisma_1.PayrollControllerPrisma.getPayrollStats);
exports.default = router;
