// Rotas Dashboard com Prisma - Dashboard Principal
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import { Router } from 'express';
import { DashboardControllerPrisma } from '../controllers/dashboard-controller-prisma';

const router = Router();

// GET /api/dashboard - Obter dados completos do dashboard
router.get('/', DashboardControllerPrisma.getDashboardData);

// GET /api/dashboard/stats - Obter estatísticas resumidas
router.get('/stats', DashboardControllerPrisma.getDashboardStats);

export default router; 