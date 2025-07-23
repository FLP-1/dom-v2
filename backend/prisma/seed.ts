/**
 * @fileoverview Seed do banco de dados para DOM v2
 * @description Popula o banco com dados de teste para desenvolvimento
 * @author DOM Team v2
 * @version 2.0.0
 */

import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar dados de exemplo para Budget
  const budgets = await Promise.all([
    prisma.budget.create({
      data: {
        name: 'Orçamento Mensal - Janeiro 2025',
        amount: 5000,
        spent: 3200,
        category: 'Geral',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        status: 'active'
      }
    }),
    prisma.budget.create({
      data: {
        name: 'Orçamento Alimentação',
        amount: 1500,
        spent: 1200,
        category: 'Alimentação',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        status: 'active'
      }
    }),
    prisma.budget.create({
      data: {
        name: 'Orçamento Transporte',
        amount: 800,
        spent: 600,
        category: 'Transporte',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        status: 'active'
      }
    })
  ]);

  console.log(`✅ Criados ${budgets.length} orçamentos`);

  // Criar dados de exemplo para Employee
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        name: 'Maria Silva',
        cpf: '123.456.789-00',
        position: 'Empregada Doméstica',
        salary: 1500.00,
        status: 'active'
      }
    }),
    prisma.employee.create({
      data: {
        name: 'João Santos',
        cpf: '987.654.321-00',
        position: 'Jardineiro',
        salary: 1200.00,
        status: 'active'
      }
    })
  ]);

  console.log(`✅ Criados ${employees.length} funcionários`);

  // Criar dados de exemplo para Payroll
  const payrolls = await Promise.all([
    prisma.payroll.create({
      data: {
        employeeId: 'EMP001',
        employeeName: 'João Silva',
        baseSalary: 3000,
        overtimeHours: 10,
        overtimeRate: 1.5,
        bonuses: 500,
        deductions: 100,
        inss: 313.61,
        irrf: 127.50,
        fgts: 240,
        netSalary: 2958.89,
        grossSalary: 3500,
        month: 7,
        year: 2025,
        status: 'pending',
        employee_id: employees[0].id
      }
    }),
    prisma.payroll.create({
      data: {
        employeeId: 'EMP002',
        employeeName: 'Maria Santos',
        baseSalary: 4500,
        overtimeHours: 5,
        overtimeRate: 1.5,
        bonuses: 300,
        deductions: 150,
        inss: 470.42,
        irrf: 191.25,
        fgts: 360,
        netSalary: 4388.33,
        grossSalary: 5175,
        month: 7,
        year: 2025,
        status: 'approved',
        employee_id: employees[1].id
      }
    })
  ]);

  console.log(`✅ Criados ${payrolls.length} registros de folha de pagamento`);

  // Criar dados de exemplo para Payment
  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        amount: 1500.00,
        description: 'Pagamento de serviços domésticos',
        status: 'pending',
        dueDate: new Date('2025-07-25')
      }
    }),
    prisma.payment.create({
      data: {
        amount: 800.00,
        description: 'Pagamento de limpeza',
        status: 'completed',
        dueDate: new Date('2025-07-20')
      }
    })
  ]);

  console.log(`✅ Criados ${payments.length} pagamentos`);

  // Criar dados de exemplo para Purchase
  const purchases = await Promise.all([
    prisma.purchase.create({
      data: {
        title: 'Produtos de Limpeza',
        description: 'Detergente, sabão em pó, desinfetante',
        amount: 150.00,
        status: 'pending',
        category: 'Limpeza'
      }
    }),
    prisma.purchase.create({
      data: {
        title: 'Material de Escritório',
        description: 'Papel, canetas, grampeador',
        amount: 80.00,
        status: 'approved',
        category: 'Escritório'
      }
    })
  ]);

  console.log(`✅ Criados ${purchases.length} compras`);

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 