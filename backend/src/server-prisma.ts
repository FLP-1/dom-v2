// Servidor com Prisma para micro-frontend de orçamento e folha de pagamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import cors from 'cors';
import express from 'express';
import { PrismaClient } from './generated/prisma';
import budgetsRouter from './routes/budgets-prisma';
import payrollRouter from './routes/payroll-prisma';
import employeesRouter from './routes/employees-prisma';
import paymentsRouter from './routes/payments-prisma';
import purchasesRouter from './routes/purchases-prisma';
import notificationsRouter from './routes/notifications-prisma';
import tasksRouter from './routes/tasks-prisma';
import dashboardRouter from './routes/dashboard-prisma';

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

// Middleware básico
app.use(cors());
app.use(express.json());

// Rotas do micro-frontend com Prisma
app.use('/api/budgets', budgetsRouter);
app.use('/api/payroll', payrollRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/purchases', purchasesRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/dashboard', dashboardRouter);

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
process.on('SIGINT', async () => {
  console.log('\n🛑 Parando servidor...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('✅ Servidor parado');
    process.exit(0);
  });
});

export default app; 