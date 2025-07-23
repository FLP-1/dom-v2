"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_prisma_1 = require("../controllers/employee-controller-prisma");
const router = (0, express_1.Router)();
// Rotas de funcionários com Prisma
router.post('/employees', employee_controller_prisma_1.EmployeeControllerPrisma.createEmployee);
router.get('/employees', employee_controller_prisma_1.EmployeeControllerPrisma.getAllEmployees);
router.get('/employees/:id', employee_controller_prisma_1.EmployeeControllerPrisma.getEmployeeById);
router.put('/employees/:id', employee_controller_prisma_1.EmployeeControllerPrisma.updateEmployee);
router.delete('/employees/:id', employee_controller_prisma_1.EmployeeControllerPrisma.deleteEmployee);
exports.default = router;
