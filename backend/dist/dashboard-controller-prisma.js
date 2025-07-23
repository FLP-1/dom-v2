"use strict";
// Controller Dashboard com Prisma - Dashboard Principal
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardControllerPrisma = void 0;
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
class DashboardControllerPrisma {
    // Obter dados do dashboard
    static async getDashboardData(req, res) {
        try {
            // Buscar dados de todas as funcionalidades
            const [budgets, payrolls, employees, payments, purchases, notifications, tasks] = await Promise.all([
                prisma.budget.findMany({ where: { status: 'active' } }),
                prisma.payroll.findMany(),
                prisma.employee.findMany({ where: { status: 'active' } }),
                prisma.payment.findMany(),
                prisma.purchase.findMany(),
                prisma.notification.findMany({
                    where: { ativo: true, lida: false },
                    take: 5,
                    orderBy: { data_criacao: 'desc' }
                }),
                prisma.task.findMany({
                    where: { ativo: true },
                    take: 5,
                    orderBy: { data_criacao: 'desc' }
                })
            ]);
            // Calcular estatísticas
            const totalBudgets = budgets.length;
            const totalBudgetAmount = budgets.reduce((sum, b) => sum + b.amount, 0);
            const totalBudgetSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
            const budgetUtilization = totalBudgetAmount > 0 ? (totalBudgetSpent / totalBudgetAmount) * 100 : 0;
            const totalPayrolls = payrolls.length;
            const totalGrossSalary = payrolls.reduce((sum, p) => sum + p.grossSalary, 0);
            const totalNetSalary = payrolls.reduce((sum, p) => sum + p.netSalary, 0);
            const totalEmployees = employees.length;
            const totalEmployeeSalary = employees.reduce((sum, e) => sum + e.salary, 0);
            const pendingPayments = payments.filter(p => p.status === 'pending').length;
            const totalPaymentAmount = payments.reduce((sum, p) => sum + p.amount, 0);
            const pendingPurchases = purchases.filter(p => p.status === 'pending').length;
            const totalPurchaseAmount = purchases.reduce((sum, p) => sum + p.amount, 0);
            const unreadNotifications = notifications.length;
            const pendingTasks = tasks.filter(t => t.status === 'pending').length;
            // Dados do dashboard
            const dashboardData = {
                overview: {
                    totalBudgets,
                    totalBudgetAmount,
                    totalBudgetSpent,
                    budgetUtilization: Math.round(budgetUtilization * 100) / 100,
                    totalPayrolls,
                    totalGrossSalary,
                    totalNetSalary,
                    totalEmployees,
                    totalEmployeeSalary,
                    pendingPayments,
                    totalPaymentAmount,
                    pendingPurchases,
                    totalPurchaseAmount,
                    unreadNotifications,
                    pendingTasks
                },
                recentData: {
                    notifications,
                    tasks,
                    recentPayrolls: payrolls.slice(0, 3),
                    recentPayments: payments.slice(0, 3),
                    recentPurchases: purchases.slice(0, 3)
                },
                charts: {
                    budgetByCategory: groupByCategory(budgets),
                    payrollByStatus: groupByStatus(payrolls, 'status'),
                    paymentsByStatus: groupByStatus(payments, 'status'),
                    purchasesByStatus: groupByStatus(purchases, 'status'),
                    tasksByStatus: groupByStatus(tasks, 'status')
                }
            };
            res.json({
                success: true,
                data: dashboardData,
                message: 'Dados do dashboard recuperados com sucesso'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar dados do dashboard',
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }
    // Obter estatísticas resumidas
    static async getDashboardStats(req, res) {
        try {
            const [budgetCount, payrollCount, employeeCount, paymentCount, purchaseCount, notificationCount, taskCount] = await Promise.all([
                prisma.budget.count({ where: { status: 'active' } }),
                prisma.payroll.count(),
                prisma.employee.count({ where: { status: 'active' } }),
                prisma.payment.count(),
                prisma.purchase.count(),
                prisma.notification.count({ where: { ativo: true, lida: false } }),
                prisma.task.count({ where: { ativo: true, status: 'pending' } })
            ]);
            const stats = {
                budgets: budgetCount,
                payrolls: payrollCount,
                employees: employeeCount,
                payments: paymentCount,
                purchases: purchaseCount,
                unreadNotifications: notificationCount,
                pendingTasks: taskCount
            };
            res.json({
                success: true,
                data: stats,
                message: 'Estatísticas do dashboard recuperadas'
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar estatísticas do dashboard',
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }
}
exports.DashboardControllerPrisma = DashboardControllerPrisma;
// Funções auxiliares para agrupamento de dados
function groupByCategory(items) {
    return items.reduce((acc, item) => {
        const category = item.category || 'Sem categoria';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});
}
function groupByStatus(items, statusField) {
    return items.reduce((acc, item) => {
        const status = item[statusField] || 'Sem status';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});
}
