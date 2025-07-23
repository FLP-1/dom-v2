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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_prisma_1 = require("../server-prisma");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
describe('🔍 TESTES AUTOMATIZADOS - APIs DOM v2', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Configuração inicial para testes
        yield prisma.$connect();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.$disconnect();
    }));
    describe('🏥 Health Check API', () => {
        test('GET /health - Deve retornar status 200 e informações do sistema', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_prisma_1.app)
                .get('/health')
                .expect(200);
            expect(response.body).toHaveProperty('status', 'ok');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('version');
            expect(response.body).toHaveProperty('environment');
        }));
    });
    describe('📊 Dashboard API', () => {
        test('GET /api/dashboard - Deve retornar dados do dashboard', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_prisma_1.app)
                .get('/api/dashboard')
                .expect(200);
            expect(response.body).toHaveProperty('totalTasks');
            expect(response.body).toHaveProperty('totalBudgets');
            expect(response.body).toHaveProperty('totalPayrolls');
            expect(response.body).toHaveProperty('recentActivities');
            expect(Array.isArray(response.body.recentActivities)).toBe(true);
        }));
    });
    describe('📋 Tasks API', () => {
        test('GET /api/tasks - Deve retornar lista de tarefas', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_prisma_1.app)
                .get('/api/tasks')
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
        }));
        test('POST /api/tasks - Deve criar nova tarefa', () => __awaiter(void 0, void 0, void 0, function* () {
            const newTask = {
                title: 'Teste Automatizado',
                description: 'Tarefa criada por teste automatizado',
                priority: 'high',
                status: 'pending'
            };
            const response = yield (0, supertest_1.default)(server_prisma_1.app)
                .post('/api/tasks')
                .send(newTask)
                .expect(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(newTask.title);
            expect(response.body.description).toBe(newTask.description);
        }));
        test('PUT /api/tasks/:id - Deve atualizar tarefa existente', () => __awaiter(void 0, void 0, void 0, function* () {
            // Primeiro criar uma tarefa
            const newTask = {
                title: 'Tarefa para Atualizar',
                description: 'Descrição original',
                priority: 'medium'
            };
            const createResponse = yield (0, supertest_1.default)(server_prisma_1.app)
                .post('/api/tasks')
                .send(newTask);
            const taskId = createResponse.body.id;
            // Atualizar a tarefa
            const updateData = {
                title: 'Tarefa Atualizada',
                status: 'completed'
            };
            const response = yield (0, supertest_1.default)(server_prisma_1.app)
                .put(`/api/tasks/${taskId}`)
                .send(updateData)
                .expect(200);
            expect(response.body.title).toBe(updateData.title);
            expect(response.body.status).toBe(updateData.status);
        }));
        test('DELETE /api/tasks/:id - Deve deletar tarefa', () => __awaiter(void 0, void 0, void 0, function* () {
            // Primeiro criar uma tarefa
            const newTask = {
                title: 'Tarefa para Deletar',
                description: 'Será deletada'
            };
            const createResponse = yield (0, supertest_1.default)(server_prisma_1.app)
                .post('/api/tasks')
                .send(newTask);
            const taskId = createResponse.body.id;
            // Deletar a tarefa
            yield (0, supertest_1.default)(server_prisma_1.app)
                .delete(`/api/tasks/${taskId}`)
                .expect(200);
            // Verificar se foi deletada
            yield (0, supertest_1.default)(server_prisma_1.app)
                .get(`/api/tasks/${taskId}`)
                .expect(404);
        }));
    });
    describe('💰 Budget API', () => {
        test('GET /api/budgets - Deve retornar lista de orçamentos', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_prisma_1.app)
                .get('/api/budgets')
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
        }));
        test('POST /api/budgets - Deve criar novo orçamento', () => __awaiter(void 0, void 0, void 0, function* () {
            const newBudget = {
                name: 'Orçamento Teste',
                amount: 10000.00,
                category: 'Marketing',
                period: '2025'
            };
            const response = yield (0, supertest_1.default)(server_prisma_1.app)
                .post('/api/budgets')
                .send(newBudget)
                .expect(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newBudget.name);
            expect(response.body.amount).toBe(newBudget.amount);
        }));
    });
    describe('💼 Payroll API', () => {
        test('GET /api/payroll - Deve retornar lista de folhas de pagamento', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_prisma_1.app)
                .get('/api/payroll')
                .expect(200);
            expect(Array.isArray(response.body)).toBe(true);
        }));
        test('POST /api/payroll - Deve criar nova folha de pagamento', () => __awaiter(void 0, void 0, void 0, function* () {
            const newPayroll = {
                employeeId: 'EMP001',
                employeeName: 'João Silva',
                baseSalary: 5000.00,
                month: 7,
                year: 2025
            };
            const response = yield (0, supertest_1.default)(server_prisma_1.app)
                .post('/api/payroll')
                .send(newPayroll)
                .expect(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.employeeName).toBe(newPayroll.employeeName);
            expect(response.body.baseSalary).toBe(newPayroll.baseSalary);
        }));
    });
    describe('🔒 Validações de Segurança', () => {
        test('POST /api/tasks - Deve rejeitar dados inválidos', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidTask = {
                // title ausente (obrigatório)
                description: 'Descrição sem título'
            };
            yield (0, supertest_1.default)(server_prisma_1.app)
                .post('/api/tasks')
                .send(invalidTask)
                .expect(400);
        }));
        test('POST /api/budgets - Deve rejeitar valores negativos', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidBudget = {
                name: 'Orçamento Inválido',
                amount: -1000, // Valor negativo
                category: 'Teste'
            };
            yield (0, supertest_1.default)(server_prisma_1.app)
                .post('/api/budgets')
                .send(invalidBudget)
                .expect(400);
        }));
    });
    describe('🧠 Pensamento Crítico Middleware', () => {
        test('Todas as requisições devem passar pelo middleware de pensamento crítico', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_prisma_1.app)
                .get('/api/dashboard');
            // Verificar se o middleware foi aplicado
            expect(response.headers).toHaveProperty('x-critical-thinking');
            expect(response.headers['x-critical-thinking']).toBe('applied');
        }));
    });
});
