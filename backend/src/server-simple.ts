// Servidor simplificado para micro-frontend de orçamento e folha de pagamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import cors from 'cors';
import express from 'express';
import budgetsRouter from './routes/budgets';
import payrollRouter from './routes/payroll';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware básico
app.use(cors());
app.use(express.json());

// Rotas do micro-frontend
app.use('/api/budgets', budgetsRouter);
app.use('/api/payroll', payrollRouter);

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

export default app; 