"use strict";
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
const client_1 = require("@prisma/client");
const task_controller_prisma_1 = require("../controllers/task-controller-prisma");
const budget_controller_prisma_1 = require("../controllers/budget-controller-prisma");
const payroll_controller_prisma_1 = require("../controllers/payroll-controller-prisma");
const dashboard_controller_prisma_1 = require("../controllers/dashboard-controller-prisma");
const prisma = new client_1.PrismaClient();
describe('🎯 TESTES AUTOMATIZADOS - CONTROLLERS DOM v2', () => {
    let taskController;
    let budgetController;
    let payrollController;
    let dashboardController;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$connect();
        taskController = new task_controller_prisma_1.TaskController();
        budgetController = new budget_controller_prisma_1.BudgetController();
        payrollController = new payroll_controller_prisma_1.PayrollController();
        dashboardController = new dashboard_controller_prisma_1.DashboardController();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Limpar dados de teste antes de cada teste
        yield prisma.task.deleteMany();
        yield prisma.budget.deleteMany();
        yield prisma.payroll.deleteMany();
    }));
    describe('📋 Task Controller', () => {
        test('Deve criar tarefa com dados válidos', () => __awaiter(void 0, void 0, void 0, function* () {
            const taskData = {
                title: 'Tarefa de Teste Controller',
                description: 'Teste do controller de tarefas',
                priority: 'high',
                status: 'pending'
            };
            const result = yield taskController.createTask(taskData);
            expect(result).toHaveProperty('id');
            expect(result.title).toBe(taskData.title);
            expect(result.description).toBe(taskData.description);
            expect(result.priority).toBe(taskData.priority);
        }));
        test('Deve listar todas as tarefas', () => __awaiter(void 0, void 0, void 0, function* () {
            // Criar algumas tarefas de teste
            yield taskController.createTask({
                title: 'Tarefa 1',
                description: 'Primeira tarefa'
            });
            yield taskController.createTask({
                title: 'Tarefa 2',
                description: 'Segunda tarefa'
            });
            const tasks = yield taskController.getAllTasks();
            expect(Array.isArray(tasks)).toBe(true);
            expect(tasks.length).toBeGreaterThanOrEqual(2);
        }));
        test('Deve atualizar tarefa existente', () => __awaiter(void 0, void 0, void 0, function* () {
            const task = yield taskController.createTask({
                title: 'Tarefa Original',
                description: 'Descrição original'
            });
            const updateData = {
                title: 'Tarefa Atualizada',
                status: 'completed'
            };
            const updatedTask = yield taskController.updateTask(task.id, updateData);
            expect(updatedTask.title).toBe(updateData.title);
            expect(updatedTask.status).toBe(updateData.status);
        }));
        test('Deve deletar tarefa existente', () => __awaiter(void 0, void 0, void 0, function* () {
            const task = yield taskController.createTask({
                title: 'Tarefa para Deletar',
                description: 'Será deletada'
            });
            yield taskController.deleteTask(task.id);
            // Tentar buscar a tarefa deletada deve retornar null
            const deletedTask = yield taskController.getTaskById(task.id);
            expect(deletedTask).toBeNull();
        }));
    });
    describe('💰 Budget Controller', () => {
        test('Deve criar orçamento com dados válidos', () => __awaiter(void 0, void 0, void 0, function* () {
            const budgetData = {
                name: 'Orçamento Controller Teste',
                amount: 15000.00,
                category: 'Desenvolvimento',
                period: '2025'
            };
            const result = yield budgetController.createBudget(budgetData);
            expect(result).toHaveProperty('id');
            expect(result.name).toBe(budgetData.name);
            expect(result.amount).toBe(budgetData.amount);
            expect(result.category).toBe(budgetData.category);
        }));
        test('Deve calcular total de orçamentos por categoria', () => __awaiter(void 0, void 0, void 0, function* () {
            yield budgetController.createBudget({
                name: 'Orçamento 1',
                amount: 10000,
                category: 'Marketing',
                period: '2025'
            });
            yield budgetController.createBudget({
                name: 'Orçamento 2',
                amount: 5000,
                category: 'Marketing',
                period: '2025'
            });
            const totalMarketing = yield budgetController.getTotalByCategory('Marketing');
            expect(totalMarketing).toBe(15000);
        }));
    });
    describe('💼 Payroll Controller', () => {
        test('Deve criar folha de pagamento com cálculos automáticos', () => __awaiter(void 0, void 0, void 0, function* () {
            const payrollData = {
                employeeId: 'EMP001',
                employeeName: 'Maria Silva',
                baseSalary: 6000.00,
                overtimeHours: 10,
                overtimeRate: 1.5,
                bonuses: 500.00,
                month: 7,
                year: 2025
            };
            const result = yield payrollController.createPayroll(payrollData);
            expect(result).toHaveProperty('id');
            expect(result.employeeName).toBe(payrollData.employeeName);
            expect(result.baseSalary).toBe(payrollData.baseSalary);
            expect(result.grossSalary).toBeGreaterThan(payrollData.baseSalary);
            expect(result.netSalary).toBeLessThan(result.grossSalary);
        }));
        test('Deve calcular impostos corretamente', () => __awaiter(void 0, void 0, void 0, function* () {
            const payrollData = {
                employeeId: 'EMP002',
                employeeName: 'João Santos',
                baseSalary: 8000.00,
                month: 7,
                year: 2025
            };
            const result = yield payrollController.createPayroll(payrollData);
            // Verificar se os impostos foram calculados
            expect(result.inss).toBeGreaterThan(0);
            expect(result.irrf).toBeGreaterThanOrEqual(0);
            expect(result.fgts).toBeGreaterThan(0);
            // Verificar se o salário líquido é menor que o bruto
            expect(result.netSalary).toBeLessThan(result.grossSalary);
        }));
    });
    describe('📊 Dashboard Controller', () => {
        test('Deve retornar estatísticas completas do dashboard', () => __awaiter(void 0, void 0, void 0, function* () {
            // Criar dados de teste
            yield taskController.createTask({
                title: 'Tarefa Dashboard',
                description: 'Para teste do dashboard'
            });
            yield budgetController.createBudget({
                name: 'Orçamento Dashboard',
                amount: 20000,
                category: 'Teste',
                period: '2025'
            });
            yield payrollController.createPayroll({
                employeeId: 'EMP003',
                employeeName: 'Pedro Teste',
                baseSalary: 5000,
                month: 7,
                year: 2025
            });
            const dashboardData = yield dashboardController.getDashboardData();
            expect(dashboardData).toHaveProperty('totalTasks');
            expect(dashboardData).toHaveProperty('totalBudgets');
            expect(dashboardData).toHaveProperty('totalPayrolls');
            expect(dashboardData).toHaveProperty('recentActivities');
            expect(dashboardData).toHaveProperty('budgetSummary');
            expect(dashboardData).toHaveProperty('taskStatus');
            expect(dashboardData.totalTasks).toBeGreaterThan(0);
            expect(dashboardData.totalBudgets).toBeGreaterThan(0);
            expect(dashboardData.totalPayrolls).toBeGreaterThan(0);
        }));
        test('Deve retornar atividades recentes', () => __awaiter(void 0, void 0, void 0, function* () {
            const recentActivities = yield dashboardController.getRecentActivities();
            expect(Array.isArray(recentActivities)).toBe(true);
        }));
    });
    describe('🔒 Validações de Dados', () => {
        test('Deve rejeitar tarefa sem título', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidTask = {
                description: 'Tarefa sem título'
            };
            yield expect(taskController.createTask(invalidTask))
                .rejects.toThrow();
        }));
        test('Deve rejeitar orçamento com valor negativo', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidBudget = {
                name: 'Orçamento Inválido',
                amount: -1000,
                category: 'Teste',
                period: '2025'
            };
            yield expect(budgetController.createBudget(invalidBudget))
                .rejects.toThrow();
        }));
        test('Deve rejeitar folha de pagamento com salário negativo', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidPayroll = {
                employeeId: 'EMP004',
                employeeName: 'Teste Inválido',
                baseSalary: -1000,
                month: 7,
                year: 2025
            };
            yield expect(payrollController.createPayroll(invalidPayroll))
                .rejects.toThrow();
        }));
    });
    describe('🧠 Pensamento Crítico nos Controllers', () => {
        test('Controllers devem aplicar validações críticas', () => __awaiter(void 0, void 0, void 0, function* () {
            // Teste de pensamento crítico no controller de tarefas
            const taskData = {
                title: 'Tarefa Crítica',
                description: 'Teste de pensamento crítico',
                priority: 'critical'
            };
            const result = yield taskController.createTask(taskData);
            // Verificar se as validações críticas foram aplicadas
            expect(result).toHaveProperty('criticalThinkingValidated', true);
        }));
    });
});
