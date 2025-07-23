import { Router } from 'express';
import { EmployeeControllerPrisma } from '../controllers/employee-controller-prisma';

const router = Router();

// Rotas de funcionários com Prisma
router.post('/employees', EmployeeControllerPrisma.createEmployee);
router.get('/employees', EmployeeControllerPrisma.getAllEmployees);
router.get('/employees/:id', EmployeeControllerPrisma.getEmployeeById);
router.put('/employees/:id', EmployeeControllerPrisma.updateEmployee);
router.delete('/employees/:id', EmployeeControllerPrisma.deleteEmployee);

export default router;