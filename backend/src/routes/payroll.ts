/**
 * @fileoverview Rotas de Folha de Pagamento para DOM v2
 * @description Endpoints para sistema de folha de pagamento
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */

import { Router } from 'express';
import { PayrollController } from '../controllers/payroll-controller';

const router = Router();

// GET /api/payroll - Listar todas as folhas de pagamento
router.get('/', PayrollController.getAllPayrolls);

// GET /api/payroll/stats - Obter estatísticas
router.get('/stats', PayrollController.getPayrollStats);

// GET /api/payroll/:id - Buscar folha de pagamento por ID
router.get('/:id', PayrollController.getPayrollById);

// POST /api/payroll/calculate - Calcular folha de pagamento
router.post('/calculate', PayrollController.calculatePayroll);

// POST /api/payroll - Criar nova folha de pagamento
router.post('/', PayrollController.createPayroll);

// PUT /api/payroll/:id/status - Atualizar status da folha de pagamento
router.put('/:id/status', PayrollController.updatePayrollStatus);

export default router; 