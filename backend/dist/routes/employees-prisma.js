"use strict";
// Rotas Employee com Prisma - Controle de Funcionários
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_prisma_1 = require("../controllers/employee-controller-prisma");
const router = (0, express_1.Router)();
// GET /api/employees - Listar todos os funcionários
router.get('/', employee_controller_prisma_1.EmployeeControllerPrisma.getAllEmployees);
// GET /api/employees/:id - Obter funcionário por ID
router.get('/:id', employee_controller_prisma_1.EmployeeControllerPrisma.getEmployeeById);
// POST /api/employees - Criar novo funcionário
router.post('/', employee_controller_prisma_1.EmployeeControllerPrisma.createEmployee);
// PUT /api/employees/:id - Atualizar funcionário
router.put('/:id', employee_controller_prisma_1.EmployeeControllerPrisma.updateEmployee);
// DELETE /api/employees/:id - Deletar funcionário
router.delete('/:id', employee_controller_prisma_1.EmployeeControllerPrisma.deleteEmployee);
// POST /api/employees/:id/clock-in - Registrar entrada
router.post('/:id/clock-in', employee_controller_prisma_1.EmployeeControllerPrisma.clockIn);
// POST /api/employees/:id/clock-out - Registrar saída
router.post('/:id/clock-out', employee_controller_prisma_1.EmployeeControllerPrisma.clockOut);
exports.default = router;
