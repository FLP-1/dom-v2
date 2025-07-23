"use strict";
// Servidor com Prisma para micro-frontend de orçamento e folha de pagamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
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
const prisma_1 = require("./generated/prisma");
const budgets_prisma_1 = __importDefault(require("./routes/budgets-prisma"));
const payroll_prisma_1 = __importDefault(require("./routes/payroll-prisma"));
const employees_prisma_1 = __importDefault(require("./routes/employees-prisma"));
const payments_prisma_1 = __importDefault(require("./routes/payments-prisma"));
const purchases_prisma_1 = __importDefault(require("./routes/purchases-prisma"));
const notifications_prisma_1 = __importDefault(require("./routes/notifications-prisma"));
const tasks_prisma_1 = __importDefault(require("./routes/tasks-prisma"));
const dashboard_prisma_1 = __importDefault(require("./routes/dashboard-prisma"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const prisma = new prisma_1.PrismaClient();
// Middleware básico
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas do micro-frontend com Prisma
app.use('/api/budgets', budgets_prisma_1.default);
app.use('/api/payroll', payroll_prisma_1.default);
app.use('/api/employees', employees_prisma_1.default);
app.use('/api/payments', payments_prisma_1.default);
app.use('/api/purchases', purchases_prisma_1.default);
app.use('/api/notifications', notifications_prisma_1.default);
app.use('/api/tasks', tasks_prisma_1.default);
app.use('/api/dashboard', dashboard_prisma_1.default);
// Endpoint de saúde
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        version: '2.0.0',
        message: 'DOM v2 - Micro-frontend Backend com Prisma',
        database: 'postgresql'
    });
});
// Endpoint de teste
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API DOM v2 com Prisma funcionando',
        timestamp: new Date().toISOString()
    });
});
// Iniciar servidor
const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor micro-frontend com Prisma rodando na porta ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`💰 Budget API: http://localhost:${PORT}/api/budgets`);
    console.log(`💼 Payroll API: http://localhost:${PORT}/api/payroll`);
    console.log(`👥 Employees API: http://localhost:${PORT}/api/employees`);
    console.log(`💳 Payments API: http://localhost:${PORT}/api/payments`);
    console.log(`🛒 Purchases API: http://localhost:${PORT}/api/purchases`);
    console.log(`🔔 Notifications API: http://localhost:${PORT}/api/notifications`);
    console.log(`📋 Tasks API: http://localhost:${PORT}/api/tasks`);
    console.log(`📈 Dashboard API: http://localhost:${PORT}/api/dashboard`);
    console.log(`⏹️  Para parar: Ctrl+C`);
});
// Manter servidor ativo
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('\n🛑 Parando servidor...');
    yield prisma.$disconnect();
    server.close(() => {
        console.log('✅ Servidor parado');
        process.exit(0);
    });
}));
exports.default = app;
