"use strict";
/**
 * @fileoverview Servidor Express principal do DOM v2
 * @directory backend/src
 * @description Servidor básico com validações e endpoints essenciais para MVP
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const validation_1 = require("./utils/validation");
const database_1 = require("./database");
// Importar rotas das lacunas críticas
const payments_1 = __importDefault(require("./routes/payments"));
const purchases_1 = __importDefault(require("./routes/purchases"));
const employees_1 = __importDefault(require("./routes/employees"));
const budgets_1 = __importDefault(require("./routes/budgets"));
const payroll_1 = __importDefault(require("./routes/payroll"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware básico
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas das lacunas críticas
app.use('/api', payments_1.default);
app.use('/api', purchases_1.default);
app.use('/api', employees_1.default);
app.use('/api/budgets', budgets_1.default);
app.use('/api/payroll', payroll_1.default);
// Configuração do servidor
// Endpoint de saúde
app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dbHealth = yield (0, database_1.checkDatabaseHealth)();
    res.json({
        status: dbHealth.status,
        version: '2.0.0',
        message: 'DOM v2 - Backend funcionando',
        database: dbHealth.message
    });
}));
// Endpoint de teste
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API DOM v2 funcionando',
        timestamp: new Date().toISOString()
    });
});
// Endpoint de login (MVP simples com validações)
app.post('/api/auth/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cpf, password } = req.body;
    // Validações básicas
    if (!cpf || !password) {
        return res.status(400).json({
            error: 'CPF e senha são obrigatórios',
            code: 'MISSING_FIELDS'
        });
    }
    // Validar CPF
    if (!(0, validation_1.validateCPF)(cpf)) {
        return res.status(400).json({
            error: 'CPF inválido',
            code: 'INVALID_CPF'
        });
    }
    // Validar senha
    if (!(0, validation_1.validatePassword)(password)) {
        return res.status(400).json({
            error: 'Senha deve ter pelo menos 6 caracteres',
            code: 'INVALID_PASSWORD'
        });
    }
    try {
        // Buscar usuário por CPF (verificar em employer e employee)
        const employer = yield database_1.prisma.employer.findUnique({
            where: { cpf },
            include: { user: true }
        });
        const employee = yield database_1.prisma.employee.findUnique({
            where: { cpf },
            include: { user: true }
        });
        const user = (employer === null || employer === void 0 ? void 0 : employer.user) || (employee === null || employee === void 0 ? void 0 : employee.user);
        if (!user) {
            return res.status(401).json({
                error: 'CPF não encontrado',
                code: 'USER_NOT_FOUND'
            });
        }
        // Por enquanto, senha fixa para MVP (será implementada autenticação real depois)
        if (password !== '123456') {
            return res.status(401).json({
                error: 'CPF ou senha incorretos',
                code: 'INVALID_CREDENTIALS'
            });
        }
        // Buscar organizações do usuário
        const userOrganizations = yield database_1.prisma.userOrganization.findMany({
            where: { userId: user.id },
            include: { organization: true }
        });
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                profile: user.profile
            },
            organizations: userOrganizations.map((uo) => ({
                id: uo.organization.id,
                name: uo.organization.name,
                type: uo.organization.type,
                role: uo.role
            })),
            message: 'Login realizado com sucesso'
        });
    }
    catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({
            error: 'Erro interno do servidor',
            code: 'INTERNAL_ERROR'
        });
    }
}));
// Endpoint de dashboard (MVP)
app.get('/api/dashboard/stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Por enquanto, buscar dados da primeira organização (será implementado filtro por usuário depois)
        const organizations = yield database_1.prisma.organization.findMany({
            where: { status: 'ACTIVE' },
            take: 1
        });
        if (organizations.length === 0) {
            return res.json({
                success: true,
                stats: {
                    tasks: { active: 0, completed: 0, total: 0 },
                    notifications: { unread: 0, total: 0 },
                    users: { total: 0 },
                    system: { version: '2.0.0', status: 'operational' }
                },
                timestamp: new Date().toISOString()
            });
        }
        const organizationId = organizations[0].id;
        // Buscar estatísticas da organização
        const [activeTasks, completedTasks, totalTasks, unreadNotifications, totalNotifications, totalUsers] = yield Promise.all([
            database_1.prisma.task.count({ where: { organizationId, status: 'PENDING' } }),
            database_1.prisma.task.count({ where: { organizationId, status: 'COMPLETED' } }),
            database_1.prisma.task.count({ where: { organizationId } }),
            database_1.prisma.notification.count({ where: { organizationId, status: 'UNREAD' } }),
            database_1.prisma.notification.count({ where: { organizationId } }),
            database_1.prisma.userOrganization.count({ where: { organizationId, status: 'ACTIVE' } })
        ]);
        const stats = {
            tasks: {
                active: activeTasks,
                completed: completedTasks,
                total: totalTasks
            },
            notifications: {
                unread: unreadNotifications,
                total: totalNotifications
            },
            users: {
                total: totalUsers
            },
            system: {
                version: '2.0.0',
                status: 'operational'
            }
        };
        res.json({
            success: true,
            stats,
            timestamp: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({
            error: 'Erro interno do servidor',
            code: 'INTERNAL_ERROR'
        });
    }
}));
// Endpoints de tarefas (MVP)
app.get('/api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Por enquanto, buscar tarefas da primeira organização
        const organizations = yield database_1.prisma.organization.findMany({
            where: { status: 'ACTIVE' },
            take: 1
        });
        if (organizations.length === 0) {
            return res.json({
                success: true,
                tasks: [],
                total: 0
            });
        }
        const organizationId = organizations[0].id;
        const tasks = yield database_1.prisma.task.findMany({
            where: { organizationId },
            include: {
                user: {
                    select: { name: true, email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json({
            success: true,
            tasks,
            total: tasks.length
        });
    }
    catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({
            error: 'Erro interno do servidor',
            code: 'INTERNAL_ERROR'
        });
    }
}));
app.post('/api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority, dueDate } = req.body;
    if (!title) {
        return res.status(400).json({
            error: 'Título é obrigatório',
            code: 'MISSING_TITLE'
        });
    }
    if (title.length < 3) {
        return res.status(400).json({
            error: 'Título deve ter pelo menos 3 caracteres',
            code: 'TITLE_TOO_SHORT'
        });
    }
    try {
        // Por enquanto, usar a primeira organização e o primeiro usuário
        const [organization, user] = yield Promise.all([
            database_1.prisma.organization.findFirst({ where: { status: 'ACTIVE' } }),
            database_1.prisma.user.findFirst()
        ]);
        if (!organization || !user) {
            return res.status(400).json({
                error: 'Organização ou usuário não encontrado',
                code: 'MISSING_REQUIREMENTS'
            });
        }
        const newTask = yield database_1.prisma.task.create({
            data: {
                title,
                description: description || '',
                status: 'PENDING',
                priority: priority || 'MEDIUM',
                assignedTo: user.id,
                createdBy: user.id,
                organizationId: organization.id,
                dueDate: dueDate ? new Date(dueDate) : new Date(Date.now() + 24 * 60 * 60 * 1000)
            },
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });
        res.status(201).json({
            success: true,
            task: newTask,
            message: 'Tarefa criada com sucesso'
        });
    }
    catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({
            error: 'Erro interno do servidor',
            code: 'INTERNAL_ERROR'
        });
    }
}));
app.put('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    try {
        const existingTask = yield database_1.prisma.task.findUnique({
            where: { id }
        });
        if (!existingTask) {
            return res.status(404).json({
                error: 'Tarefa não encontrada',
                code: 'TASK_NOT_FOUND'
            });
        }
        const updatedTask = yield database_1.prisma.task.update({
            where: { id },
            data: {
                title: title || existingTask.title,
                description: description || existingTask.description,
                status: status || existingTask.status,
                priority: priority || existingTask.priority
            },
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });
        res.json({
            success: true,
            task: updatedTask,
            message: 'Tarefa atualizada com sucesso'
        });
    }
    catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({
            error: 'Erro interno do servidor',
            code: 'INTERNAL_ERROR'
        });
    }
}));
app.delete('/api/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const existingTask = yield database_1.prisma.task.findUnique({
            where: { id }
        });
        if (!existingTask) {
            return res.status(404).json({
                error: 'Tarefa não encontrada',
                code: 'TASK_NOT_FOUND'
            });
        }
        const deletedTask = yield database_1.prisma.task.delete({
            where: { id },
            include: {
                user: {
                    select: { name: true, email: true }
                }
            }
        });
        res.json({
            success: true,
            message: 'Tarefa removida com sucesso',
            task: deletedTask
        });
    }
    catch (error) {
        console.error('Erro ao remover tarefa:', error);
        res.status(500).json({
            error: 'Erro interno do servidor',
            code: 'INTERNAL_ERROR'
        });
    }
}));
// Iniciar servidor
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Conectar ao banco de dados
            yield (0, database_1.connectDatabase)();
            app.listen(PORT, () => {
                console.log(`[${new Date().toISOString()}] ` + `🚀 DOM v2 Backend rodando na porta ${PORT}`);
                console.log(`[${new Date().toISOString()}] ` + `📊 Health check: http://localhost:${PORT}/health`);
                console.log(`[${new Date().toISOString()}] ` + `🧪 Test endpoint: http://localhost:${PORT}/api/test`);
                console.log(`[${new Date().toISOString()}] ` + `🔐 Login endpoint: http://localhost:${PORT}/api/auth/login`);
                console.log(`[${new Date().toISOString()}] ` + `📈 Dashboard stats: http://localhost:${PORT}/api/dashboard/stats`);
                console.log(`[${new Date().toISOString()}] ` + `📋 Tasks CRUD: http://localhost:${PORT}/api/tasks`);
                console.log(`[${new Date().toISOString()}] ` + `✅ Validações de CPF e senha ativadas`);
                console.log(`[${new Date().toISOString()}] ` + `🗄️ Banco de dados PostgreSQL conectado`);
            });
        }
        catch (error) {
            console.error('❌ Erro ao iniciar servidor:', error);
            process.exit(1);
        }
    });
}
// Graceful shutdown
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[${new Date().toISOString()}] ` + '\n🛑 Encerrando servidor...');
    yield (0, database_1.disconnectDatabase)();
    process.exit(0);
}));
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[${new Date().toISOString()}] ` + '\n🛑 Encerrando servidor...');
    yield (0, database_1.disconnectDatabase)();
    process.exit(0);
}));
startServer();
exports.default = app;
