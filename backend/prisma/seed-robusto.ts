#!/usr/bin/env ts-node

/**
 * @fileoverview Seed robusto para o banco de dados DOM V2
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-06
 */

import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Gera CPF válido brasileiro
 * @returns {string} CPF válido
 */
function generateValidCPF(): string {
  // Gera 9 dígitos aleatórios
  let cpf = '';
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10);
  }
  
  // Calcula primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  cpf += digit1;
  
  // Calcula segundo dígito verificador
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
 * Gera CNPJ válido brasileiro
 * @returns {string} CNPJ válido
 */
function generateValidCNPJ(): string {
  // Gera 12 dígitos aleatórios
  let cnpj = '';
  for (let i = 0; i < 12; i++) {
    cnpj += Math.floor(Math.random() * 10);
  }
  
  // Calcula primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weights1[i];
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  cnpj += digit1;
  
  // Calcula segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weights2[i];
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  cnpj += digit2;
  
  return cnpj;
}

/**
 * Gera email válido
 * @param name - Nome para gerar email
 * @returns {string} Email válido
 */
function generateEmail(name: string): string {
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
  const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${cleanName}@${domain}`;
}

/**
 * Gera telefone brasileiro
 * @returns {string} Telefone válido
 */
function generatePhone(): string {
  const ddd = Math.floor(Math.random() * 90) + 11; // DDD 11-99
  const number = Math.floor(Math.random() * 90000000) + 10000000; // 8 dígitos
  return `${ddd}${number}`;
}

/**
 * Cria usuários de teste
 */
async function createUsers() {
  console.log('👥 Criando usuários...');
  
  const users = [
    {
      name: 'João Silva',
      nickname: 'joao.silva',
      cpf: generateValidCPF(),
      email: generateEmail('joao.silva'),
      password_hash: await bcrypt.hash('123456', 12),
      phone: generatePhone(),
      profile: 'employer',
      active: true,
      platforms: ['web', 'mobile'],
      permissions: ['admin', 'financeiro', 'rh']
    },
    {
      name: 'Maria Santos',
      nickname: 'maria.santos',
      cpf: generateValidCPF(),
      email: generateEmail('maria.santos'),
      password_hash: await bcrypt.hash('123456', 12),
      phone: generatePhone(),
      profile: 'employer',
      active: true,
      platforms: ['web'],
      permissions: ['financeiro']
    },
    {
      name: 'Pedro Oliveira',
      nickname: 'pedro.oliveira',
      cpf: generateValidCPF(),
      email: generateEmail('pedro.oliveira'),
      password_hash: await bcrypt.hash('123456', 12),
      phone: generatePhone(),
      profile: 'employee',
      active: true,
      platforms: ['mobile'],
      permissions: ['funcionario']
    }
  ];
  
  const createdUsers = [];
  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData
    });
    createdUsers.push(user);
         console.log(`✅ Usuário criado: ${user.name} (${user.email})`);
  }
  
  return createdUsers;
}

/**
 * Cria funcionários de teste
 */
async function createEmployees(users: any[]) {
  console.log('\n👷 Criando funcionários...');
  
  const employees = [
    {
      name: 'Ana Costa',
      cpf: generateValidCPF(),
      position: 'Empregada Doméstica',
      salary: 1500.00,
      status: 'active',
      user_id: users[0].id
    },
    {
      name: 'Carlos Ferreira',
      cpf: generateValidCPF(),
      position: 'Jardineiro',
      salary: 1200.00,
      status: 'active',
      user_id: users[0].id
    },
    {
      name: 'Lucia Mendes',
      cpf: generateValidCPF(),
      position: 'Cozinheira',
      salary: 1800.00,
      status: 'active',
      user_id: users[1].id
    },
    {
      name: 'Roberto Alves',
      cpf: generateValidCPF(),
      position: 'Motorista',
      salary: 1600.00,
      status: 'inactive',
      user_id: users[1].id
    }
  ];
  
  const createdEmployees = [];
  for (const employeeData of employees) {
    const employee = await prisma.employee.create({
      data: employeeData
    });
    createdEmployees.push(employee);
    console.log(`✅ Funcionário criado: ${employee.name} (${employee.position})`);
  }
  
  return createdEmployees;
}

/**
 * Cria orçamentos de teste
 */
async function createBudgets(users: any[]) {
  console.log('\n💰 Criando orçamentos...');
  
  const budgets = [
    {
      name: 'Orçamento Mensal - Janeiro 2025',
      amount: 5000.00,
      spent: 3200.00,
      category: 'Geral',
      start_date: new Date('2025-01-01'),
      end_date: new Date('2025-01-31'),
      status: 'active',
      user_id: users[0].id
    },
    {
      name: 'Orçamento Alimentação',
      amount: 1500.00,
      spent: 1200.00,
      category: 'Alimentação',
      start_date: new Date('2025-01-01'),
      end_date: new Date('2025-01-31'),
      status: 'active',
      user_id: users[0].id
    },
    {
      name: 'Orçamento Transporte',
      amount: 800.00,
      spent: 600.00,
      category: 'Transporte',
      start_date: new Date('2025-01-01'),
      end_date: new Date('2025-01-31'),
      status: 'active',
      user_id: users[0].id
    },
    {
      name: 'Orçamento Manutenção',
      amount: 2000.00,
      spent: 1500.00,
      category: 'Manutenção',
      start_date: new Date('2025-01-01'),
      end_date: new Date('2025-01-31'),
      status: 'active',
      user_id: users[1].id
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
  
  return createdBudgets;
}

/**
 * Cria folha de pagamento de teste
 */
async function createPayrolls(users: any[], employees: any[]) {
  console.log('\n💼 Criando folha de pagamento...');
  
  const payrolls = [
    {
      employee_code: 'EMP001',
      employee_name: employees[0].name,
      base_salary: 1500.00,
      overtime_hours: 5,
      overtime_rate: 1.5,
      bonuses: 200.00,
      deductions: 100.00,
      inss: 120.00,
      irrf: 0.00,
      fgts: 120.00,
      net_salary: 1580.00,
      gross_salary: 1800.00,
      month: 1,
      year: 2025,
      status: 'approved',
      user_id: users[0].id,
      employee_id: employees[0].id
    },
    {
      employee_code: 'EMP002',
      employee_name: employees[1].name,
      base_salary: 1200.00,
      overtime_hours: 3,
      overtime_rate: 1.5,
      bonuses: 150.00,
      deductions: 80.00,
      inss: 96.00,
      irrf: 0.00,
      fgts: 96.00,
      net_salary: 1274.00,
      gross_salary: 1440.00,
      month: 1,
      year: 2025,
      status: 'approved',
      user_id: users[0].id,
      employee_id: employees[1].id
    },
    {
      employee_code: 'EMP003',
      employee_name: employees[2].name,
      base_salary: 1800.00,
      overtime_hours: 8,
      overtime_rate: 1.5,
      bonuses: 300.00,
      deductions: 150.00,
      inss: 144.00,
      irrf: 0.00,
      fgts: 144.00,
      net_salary: 2106.00,
      gross_salary: 2400.00,
      month: 1,
      year: 2025,
      status: 'pending',
      user_id: users[1].id,
      employee_id: employees[2].id
    }
  ];
  
  const createdPayrolls = [];
  for (const payrollData of payrolls) {
    const payroll = await prisma.payroll.create({
      data: payrollData
    });
    createdPayrolls.push(payroll);
         console.log(`✅ Folha criada: ${payroll.employee_name} (R$ ${payroll.net_salary})`);
  }
  
  return createdPayrolls;
}

/**
 * Cria pagamentos de teste
 */
async function createPayments(users: any[]) {
  console.log('\n💳 Criando pagamentos...');
  
  const payments = [
    {
      description: 'Pagamento Salário Ana Costa',
      amount: 1580.00,
      status: 'completed',
      due_date: new Date('2025-01-05'),
      user_id: users[0].id
    },
    {
      description: 'Pagamento Salário Carlos Ferreira',
      amount: 1274.00,
      status: 'completed',
      due_date: new Date('2025-01-05'),
      user_id: users[0].id
    },
    {
      description: 'Pagamento Fornecedor Alimentos',
      amount: 800.00,
      status: 'pending',
      due_date: new Date('2025-01-10'),
      user_id: users[0].id
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
  
  return createdPayments;
}

/**
 * Cria compras de teste
 */
async function createPurchases(users: any[]) {
  console.log('\n🛒 Criando compras...');
  
  const purchases = [
    {
      title: 'Compras Supermercado',
      description: 'Compras de alimentos e produtos básicos',
      amount: 450.00,
      category: 'Alimentação',
      status: 'completed',
      user_id: users[0].id
    },
    {
      title: 'Material de Limpeza',
      description: 'Produtos de limpeza para casa',
      amount: 120.00,
      category: 'Limpeza',
      status: 'completed',
      user_id: users[0].id
    },
    {
      title: 'Manutenção Jardim',
      description: 'Serviços de manutenção do jardim',
      amount: 300.00,
      category: 'Manutenção',
      status: 'pending',
      user_id: users[1].id
    }
  ];
  
  const createdPurchases = [];
  for (const purchaseData of purchases) {
    const purchase = await prisma.purchase.create({
      data: purchaseData
    });
    createdPurchases.push(purchase);
    console.log(`✅ Compra criada: ${purchase.description} (R$ ${purchase.amount})`);
  }
  
  return createdPurchases;
}

/**
 * Cria tarefas de teste
 */
async function createTasks(users: any[]) {
  console.log('\n📋 Criando tarefas...');
  
  const tasks = [
    {
      title: 'Limpeza Diária',
      description: 'Limpeza geral da casa',
      status: 'completed',
      priority: 1,
      due_date: new Date('2025-01-05'),
      creator_id: users[0].id
    },
    {
      title: 'Manutenção Jardim',
      description: 'Podar plantas e regar',
      status: 'in_progress',
      priority: 2,
      due_date: new Date('2025-01-07'),
      creator_id: users[0].id
    },
    {
      title: 'Compras Semanais',
      description: 'Fazer compras no supermercado',
      status: 'pending',
      priority: 1,
      due_date: new Date('2025-01-08'),
      creator_id: users[1].id
    }
  ];
  
  const createdTasks = [];
  for (const taskData of tasks) {
    const task = await prisma.task.create({
      data: taskData
    });
    createdTasks.push(task);
    console.log(`✅ Tarefa criada: ${task.title} (${task.status})`);
  }
  
  return createdTasks;
}

/**
 * Cria notificações de teste
 */
async function createNotifications(users: any[]) {
  console.log('\n🔔 Criando notificações...');
  
  const notifications = [
    {
      title: 'Orçamento Atingido',
      message: 'O orçamento de alimentação atingiu 80% do limite',
      type: 'warning',
      read: false,
      recipient_id: users[0].id,
      sender_id: null,
      priority: 'medium',
      category: 'budget',
      active: true
    },
    {
      title: 'Pagamento Realizado',
      message: 'Pagamento do salário de Ana Costa foi realizado com sucesso',
      type: 'success',
      read: true,
      recipient_id: users[0].id,
      sender_id: null,
      priority: 'low',
      category: 'payment',
      active: true
    },
    {
      title: 'Tarefa Pendente',
      message: 'A tarefa "Manutenção Jardim" está pendente',
      type: 'info',
      read: false,
      recipient_id: users[0].id,
      sender_id: null,
      priority: 'high',
      category: 'task',
      active: true
    }
  ];
  
  const createdNotifications = [];
  for (const notificationData of notifications) {
    const notification = await prisma.notification.create({
      data: notificationData
    });
    createdNotifications.push(notification);
    console.log(`✅ Notificação criada: ${notification.title}`);
  }
  
  return createdNotifications;
}

/**
 * Função principal do seed
 */
async function main() {
  console.log('🌱 INICIANDO SEED ROBUSTO DO BANCO DE DADOS');
  console.log('===========================================');
  console.log(`📅 Data: ${new Date().toLocaleString('pt-BR')}\n`);
  console.log('🔍 Verificando se a função main está sendo executada...');
  
  try {
    // Limpar dados existentes (se houver)
    console.log('🧹 Limpando dados existentes...');
    await prisma.user_sessions.deleteMany();
    await prisma.user_group_roles.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.task.deleteMany();
    await prisma.payroll.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.purchase.deleteMany();
    await prisma.budget.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.groups.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Dados limpos\n');
    
    // Criar dados
    const users = await createUsers();
    const employees = await createEmployees(users);
    const budgets = await createBudgets(users);
    const payrolls = await createPayrolls(users, employees);
    const payments = await createPayments(users);
    const purchases = await createPurchases(users);
    const tasks = await createTasks(users);
    const notifications = await createNotifications(users);
    
    // Resumo final
    console.log('\n📊 RESUMO DO SEED');
    console.log('==================');
    console.log(`👥 Usuários: ${users.length}`);
    console.log(`👷 Funcionários: ${employees.length}`);
    console.log(`💰 Orçamentos: ${budgets.length}`);
    console.log(`💼 Folhas de pagamento: ${payrolls.length}`);
    console.log(`💳 Pagamentos: ${payments.length}`);
    console.log(`🛒 Compras: ${purchases.length}`);
    console.log(`📋 Tarefas: ${tasks.length}`);
    console.log(`🔔 Notificações: ${notifications.length}`);
    console.log('\n🎉 Seed concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro no seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Execução principal
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

export { main };
