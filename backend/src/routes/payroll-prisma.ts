// Rotas Payroll com Prisma - Controle de Folha de Pagamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Router } from 'express';
import { PayrollControllerPrisma } from '../controllers/payroll-controller-prisma';

const router = Router();

// GET /api/payroll - Listar todas as folhas de pagamento
router.get('/', PayrollControllerPrisma.getAllPayrolls);

// GET /api/payroll/:id - Obter folha de pagamento por ID
router.get('/:id', PayrollControllerPrisma.getPayrollById);

// POST /api/payroll - Criar nova folha de pagamento
router.post('/', PayrollControllerPrisma.createPayroll);

// PUT /api/payroll/:id - Atualizar folha de pagamento
router.put('/:id', PayrollControllerPrisma.updatePayroll);

// DELETE /api/payroll/:id - Deletar folha de pagamento
router.delete('/:id', PayrollControllerPrisma.deletePayroll);

// GET /api/payroll/stats - Obter estatísticas
router.get('/stats', PayrollControllerPrisma.getPayrollStats);

export default router; 