"use strict";
/**
 * Consideração de alternativas e trade-offs
 *
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 *
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 *
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardControllerPrisma = void 0;
/**
 * Referências externas e fontes de informação
 *
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 *
 * @alternatives
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 *
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */
/**
 * Asserções de validação
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}

/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error)
 * @param {string} message - Mensagem do log
 * @param {any} data - Dados adicionais
 */
function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[$], { timestamp }, [$, { level, : .toUpperCase() }], $, { message } `, data || '');
}`);
    }
}
/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
    if (!data)
        return false;
    if (typeof data !== 'object')
        return false;
    return true;
}
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
class DashboardControllerPrisma {
    // Obter dados do dashboard
    static getDashboardData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar dados de todas as funcionalidades
                const [budgets, payrolls, employees, payments, purchases, notifications, tasks] = yield Promise.all([
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
                        budgetByCategory: DashboardControllerPrisma.groupByCategory(budgets),
                        payrollByStatus: DashboardControllerPrisma.groupByStatus(payrolls, 'status'),
                        paymentsByStatus: DashboardControllerPrisma.groupByStatus(payments, 'status'),
                        purchasesByStatus: DashboardControllerPrisma.groupByStatus(purchases, 'status'),
                        tasksByStatus: DashboardControllerPrisma.groupByStatus(tasks, 'status')
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
        });
    }
    // Obter estatísticas resumidas
    static getDashboardStats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [budgetCount, payrollCount, employeeCount, paymentCount, purchaseCount, notificationCount, taskCount] = yield Promise.all([
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
        });
    }
    // Métodos estáticos auxiliares para agrupamento de dados
    static groupByCategory(items) {
        return items.reduce((acc, item) => {
            const category = item.category || 'Sem categoria';
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
    }
    static groupByStatus(items, statusField) {
        return items.reduce((acc, item) => {
            const status = item[statusField] || 'Sem status';
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});
    }
}
exports.DashboardControllerPrisma = DashboardControllerPrisma;
/**
 *
/**
 * Alternativas consideradas:
 * - Alternativa A: Descrição e motivo da rejeição
 * - Alternativa B: Descrição e motivo da rejeição
 * - Solução escolhida: Justificativa da escolha atual
 */
Referências;
externas: 
    * -Node.js;
https: //nodejs.org/docs
 
    * -TypeScript;
https: //www.typescriptlang.org/docs
 
    * -Express;
https: //expressjs.com/
 
    * -Prisma;
https: //www.prisma.io/docs
 
    * -React;
https: //react.dev/
 
    * -Jest;
https: //jestjs.io/docs
 
    * -React;
Native: https: //reactnative.dev/
 
    * -Webpack;
https: //webpack.js.org/
 
    * /;
