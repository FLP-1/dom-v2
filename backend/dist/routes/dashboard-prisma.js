"use strict";
// Rotas Dashboard com Prisma - Dashboard Principal
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_prisma_1 = require("../controllers/dashboard-controller-prisma");
const router = (0, express_1.Router)();
// GET /api/dashboard - Obter dados completos do dashboard
router.get('/', dashboard_controller_prisma_1.DashboardControllerPrisma.getDashboardData);
// GET /api/dashboard/stats - Obter estatísticas resumidas
router.get('/stats', dashboard_controller_prisma_1.DashboardControllerPrisma.getDashboardStats);
exports.default = router;
