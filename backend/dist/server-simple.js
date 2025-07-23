"use strict";
// Servidor simplificado para micro-frontend de orçamento e folha de pagamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const budgets_1 = __importDefault(require("./routes/budgets"));
const payroll_1 = __importDefault(require("./routes/payroll"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware básico
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas do micro-frontend
app.use('/api/budgets', budgets_1.default);
app.use('/api/payroll', payroll_1.default);
// Endpoint de saúde
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        version: '2.0.0',
        message: 'DOM v2 - Micro-frontend Backend funcionando',
        database: 'simplificado'
    });
});
// Endpoint de teste
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API DOM v2 funcionando',
        timestamp: new Date().toISOString()
    });
});
// Iniciar servidor
const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor micro-frontend rodando na porta ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`💰 Budget API: http://localhost:${PORT}/api/budgets`);
    console.log(`💼 Payroll API: http://localhost:${PORT}/api/payroll`);
    console.log(`⏹️  Para parar: Ctrl+C`);
});
// Manter servidor ativo
process.on('SIGINT', () => {
    console.log('\n🛑 Parando servidor...');
    server.close(() => {
        console.log('✅ Servidor parado');
        process.exit(0);
    });
});
exports.default = app;
