// Rotas Employee com Prisma - Controle de Funcionários
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Router } from 'express';
import { EmployeeControllerPrisma } from '../controllers/employee-controller-prisma';

const router = Router();

// GET /api/employees - Listar todos os funcionários
router.get('/', EmployeeControllerPrisma.getAllEmployees);

// GET /api/employees/:id - Obter funcionário por ID
router.get('/:id', EmployeeControllerPrisma.getEmployeeById);

// POST /api/employees - Criar novo funcionário
router.post('/', EmployeeControllerPrisma.createEmployee);

// PUT /api/employees/:id - Atualizar funcionário
router.put('/:id', EmployeeControllerPrisma.updateEmployee);

// DELETE /api/employees/:id - Deletar funcionário
router.delete('/:id', EmployeeControllerPrisma.deleteEmployee);

// POST /api/employees/:id/clock-in - Registrar entrada
router.post('/:id/clock-in', EmployeeControllerPrisma.clockIn);

// POST /api/employees/:id/clock-out - Registrar saída
router.post('/:id/clock-out', EmployeeControllerPrisma.clockOut);

export default router; 