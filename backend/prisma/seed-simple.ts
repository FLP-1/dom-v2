#!/usr/bin/env ts-node

/**
 * @fileoverview Seed simples para o banco de dados DOM V2
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-14
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Gera CPF válido brasileiro
 */
function generateValidCPF(): string {
  let cpf = '';
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10);
  }
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  cpf += digit1;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  cpf += digit2;
  
  return cpf;
}

/**
 * Função principal do seed
 */
async function main() {
  console.log('🌱 INICIANDO SEED SIMPLES DO BANCO DE DADOS');
  console.log('============================================');
  console.log(`📅 Data: ${new Date().toLocaleString('pt-BR')}\n`);
  
  try {
    // Limpar dados existentes
    console.log('🧹 Limpando dados existentes...');
    await prisma.notifications.deleteMany();
    await prisma.tasks.deleteMany();
    await prisma.payrolls.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.purchases.deleteMany();
    await prisma.budget.deleteMany();
    await prisma.employees.deleteMany();
    await prisma.users.deleteMany();
    console.log('✅ Dados limpos\n');
    
    // 1. Criar usuário empregador
    console.log('👤 Criando usuário empregador...');
    const password_hash = await bcrypt.hash('123456', 12);
    
    const employer = await prisma.users.create({
      data: {
        name: 'João Silva - Empregador',
        nickname: 'joao.silva',
        cpf: '12345678901',
        email: 'joao.silva@email.com',
        password_hash,
        phone: '11999999999',
        profile: 'employer',
        active: true,
        platforms: ['web', 'mobile'],
        permissions: ['admin', 'financeiro', 'rh']
      }
    });
    console.log(`✅ Usuário criado: ${employer.name} (${employer.email})`);
    
    // 2. Criar funcionários
    console.log('\n👷 Criando funcionários...');
    const employees = [
      {
        id: 'EMP001',
        name: 'Ana Costa',
        cpf: generateValidCPF(),
        position: 'Empregada Doméstica',
        salary: 1500.00,
        status: 'active',
        user_id: employer.id
      },
      {
        id: 'EMP002',
        name: 'Carlos Ferreira',
        cpf: generateValidCPF(),
        position: 'Jardineiro',
        salary: 1200.00,
        status: 'active',
        user_id: employer.id
      },
      {
        id: 'EMP003',
        name: 'Lucia Mendes',
        cpf: generateValidCPF(),
        position: 'Cozinheira',
        salary: 1800.00,
        status: 'active',
        user_id: employer.id
      }
    ];
    
    const createdEmployees = [];
    for (const employeeData of employees) {
      const employee = await prisma.employees.create({
        data: employeeData
      });
      createdEmployees.push(employee);
      console.log(`✅ Funcionário criado: ${employee.name} (${employee.position})`);
    }
    
    // 3. Criar orçamentos
    console.log('\n💰 Criando orçamentos...');
    const budgets = [
      {
        id: 'BUD001',
        name: 'Orçamento Mensal - Janeiro 2025',
        amount: 5000.00,
        spent: 3200.00,
        category: 'Geral',
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-01-31'),
        status: 'active',
        user_id: employer.id
      },
      {
        id: 'BUD002',
        name: 'Orçamento Alimentação',
        amount: 1500.00,
        spent: 1200.00,
        category: 'Alimentação',
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-01-31'),
        status: 'active',
        user_id: employer.id
      }
    ];
    
    const createdBudgets = [];
    for (const budgetData of budgets) {
      const budget = await prisma.budget.create({
        data: budgetData
      });
      createdBudgets.push(budget);
      console.log(`✅ Orçamento criado: ${budget.name} (R$ ${budget.amount})`);
    }
    
    // 4. Criar pagamentos
    console.log('\n💳 Criando pagamentos...');
    const payments = [
      {
        id: 'PAY001',
        description: 'Pagamento Salário Ana Costa',
        amount: 1580.00,
        status: 'completed',
        due_date: new Date('2025-01-05'),
        user_id: employer.id
      },
      {
        id: 'PAY002',
        description: 'Pagamento Salário Carlos Ferreira',
        amount: 1274.00,
        status: 'completed',
        due_date: new Date('2025-01-05'),
        user_id: employer.id
      },
      {
        id: 'PAY003',
        description: 'Pagamento Fornecedor Alimentos',
        amount: 800.00,
        status: 'pending',
        due_date: new Date('2025-01-10'),
        user_id: employer.id
      }
    ];
    
    const createdPayments = [];
    for (const paymentData of payments) {
      const payment = await prisma.payment.create({
        data: paymentData
      });
      createdPayments.push(payment);
      console.log(`✅ Pagamento criado: ${payment.description} (R$ ${payment.amount})`);
    }
    
    // 5. Criar tarefas
    console.log('\n📋 Criando tarefas...');
    const tasks = [
      {
        id: 'TASK001',
        title: 'Limpeza Diária',
        description: 'Limpeza geral da casa',
        status: 'completed',
        priority: 1,
        due_date: new Date('2025-01-05'),
        creator_id: employer.id
      },
      {
        id: 'TASK002',
        title: 'Manutenção Jardim',
        description: 'Podar plantas e regar',
        status: 'in_progress',
        priority: 2,
        due_date: new Date('2025-01-07'),
        creator_id: employer.id
      },
      {
        id: 'TASK003',
        title: 'Compras Semanais',
        description: 'Fazer compras no supermercado',
        status: 'pending',
        priority: 1,
        due_date: new Date('2025-01-08'),
        creator_id: employer.id
      }
    ];
    
    const createdTasks = [];
    for (const taskData of tasks) {
      const task = await prisma.tasks.create({
        data: taskData
      });
      createdTasks.push(task);
      console.log(`✅ Tarefa criada: ${task.title} (${task.status})`);
    }
    
    // 6. Criar notificações
    console.log('\n🔔 Criando notificações...');
    const notifications = [
      {
        id: 'NOT001',
        title: 'Orçamento Atingido',
        message: 'O orçamento de alimentação atingiu 80% do limite',
        type: 'warning',
        read: false,
        recipient_id: employer.id,
        sender_id: null,
        priority: 'medium',
        category: 'budget',
        active: true
      },
      {
        id: 'NOT002',
        title: 'Pagamento Realizado',
        message: 'Pagamento do salário de Ana Costa foi realizado com sucesso',
        type: 'success',
        read: true,
        recipient_id: employer.id,
        sender_id: null,
        priority: 'low',
        category: 'payment',
        active: true
      },
      {
        id: 'NOT003',
        title: 'Tarefa Pendente',
        message: 'A tarefa "Manutenção Jardim" está pendente',
        type: 'info',
        read: false,
        recipient_id: employer.id,
        sender_id: null,
        priority: 'high',
        category: 'task',
        active: true
      }
    ];
    
    const createdNotifications = [];
    for (const notificationData of notifications) {
      const notification = await prisma.notifications.create({
        data: notificationData
      });
      createdNotifications.push(notification);
      console.log(`✅ Notificação criada: ${notification.title}`);
    }
    
    // Resumo final
    console.log('\n📊 RESUMO DO SEED');
    console.log('==================');
    console.log(`👥 Usuários: 1`);
    console.log(`👷 Funcionários: ${createdEmployees.length}`);
    console.log(`💰 Orçamentos: ${createdBudgets.length}`);
    console.log(`💳 Pagamentos: ${createdPayments.length}`);
    console.log(`📋 Tarefas: ${createdTasks.length}`);
    console.log(`🔔 Notificações: ${createdNotifications.length}`);
    console.log('\n🎉 Seed concluído com sucesso!');
    console.log('\n🔑 DADOS DE LOGIN:');
    console.log(`   CPF: 12345678901`);
    console.log(`   Senha: 123456`);
    
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Execução principal
if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

export { main };
