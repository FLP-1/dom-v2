/**
 * @fileoverview Seed Integrado do banco de dados para DOM v2
 * @description Popula o banco com dados de teste respeitando integridade referencial
 * @author DOM Team v2
 * @version 2.0.0
 */

import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed integrado do banco de dados...');

  // PASSO 1: Criar Users (Tabela pai)
  console.log('📝 Criando usuários...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        nome: 'João Silva',
        nickname: 'joao.silva',
        cpf: '12345678901',
        email: 'joao.silva@exemplo.com',
        senha_hash: '$2b$10$hashedpassword',
        perfil: 'empregador',
        ativo: true
      }
    }),
    prisma.user.create({
      data: {
        nome: 'Maria Santos',
        nickname: 'maria.santos',
        cpf: '98765432109',
        email: 'maria.santos@exemplo.com',
        senha_hash: '$2b$10$hashedpassword',
        perfil: 'empregador',
        ativo: true
      }
    })
  ]);

  console.log(`✅ Criados ${users.length} usuários`);

  // PASSO 2: Criar Groups
  console.log('👥 Criando grupos...');
  const groups = await Promise.all([
    prisma.groups.create({
      data: {
        nome: 'Administradores',
        descricao: 'Grupo de administradores do sistema',
        tipo: 'admin',
        ativo: true
      }
    }),
    prisma.groups.create({
      data: {
        nome: 'Usuários',
        descricao: 'Grupo de usuários comuns',
        tipo: 'user',
        ativo: true
      }
    })
  ]);

  console.log(`✅ Criados ${groups.length} grupos`);

  // PASSO 3: Criar User Group Roles (Relacionamento User-Group)
  console.log('🔗 Criando relacionamentos usuário-grupo...');
  const userGroupRoles = await Promise.all([
    prisma.user_group_roles.create({
      data: {
        user_id: users[0].id,
        group_id: groups[0].id,
        role: 'admin',
        ativo: true
      }
    }),
    prisma.user_group_roles.create({
      data: {
        user_id: users[1].id,
        group_id: groups[1].id,
        role: 'user',
        ativo: true
      }
    })
  ]);

  console.log(`✅ Criados ${userGroupRoles.length} relacionamentos usuário-grupo`);

  // PASSO 4: Criar Employees (Referenciam User)
  console.log('👷 Criando funcionários...');
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        name: 'Ana Costa',
        cpf: '11122233344',
        position: 'Empregada Doméstica',
        salary: 1500.00,
        status: 'active',
        user_id: users[0].id
      }
    }),
    prisma.employee.create({
      data: {
        name: 'Pedro Oliveira',
        cpf: '55566677788',
        position: 'Jardineiro',
        salary: 1200.00,
        status: 'active',
        user_id: users[0].id
      }
    }),
    prisma.employee.create({
      data: {
        name: 'Lucia Ferreira',
        cpf: '99988877766',
        position: 'Cozinheira',
        salary: 1800.00,
        status: 'active',
        user_id: users[1].id
      }
    })
  ]);

  console.log(`✅ Criados ${employees.length} funcionários`);

  // PASSO 5: Criar Budgets (Referenciam User)
  console.log('💰 Criando orçamentos...');
  const budgets = await Promise.all([
    prisma.budget.create({
      data: {
        name: 'Orçamento Mensal - Janeiro 2025',
        amount: 5000,
        spent: 3200,
        category: 'Geral',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
        status: 'active',
        user_id: users[0].id
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
        status: 'active',
        user_id: users[0].id
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
        status: 'active',
        user_id: users[1].id
      }
    })
  ]);

  console.log(`✅ Criados ${budgets.length} orçamentos`);

  // PASSO 6: Criar Payrolls (Referenciam User e Employee)
  console.log('💼 Criando folhas de pagamento...');
  const payrolls = await Promise.all([
    prisma.payroll.create({
      data: {
        employeeId: 'EMP001',
        employeeName: 'Ana Costa',
        baseSalary: 1500,
        overtimeHours: 10,
        overtimeRate: 1.5,
        bonuses: 200,
        deductions: 50,
        inss: 165.00,
        irrf: 0,
        fgts: 120.00,
        netSalary: 1585.00,
        grossSalary: 1700,
        month: 7,
        year: 2025,
        status: 'pending',
        user_id: users[0].id,
        employee_id: employees[0].id
      }
    }),
    prisma.payroll.create({
      data: {
        employeeId: 'EMP002',
        employeeName: 'Pedro Oliveira',
        baseSalary: 1200,
        overtimeHours: 5,
        overtimeRate: 1.5,
        bonuses: 100,
        deductions: 30,
        inss: 132.00,
        irrf: 0,
        fgts: 96.00,
        netSalary: 1238.00,
        grossSalary: 1300,
        month: 7,
        year: 2025,
        status: 'approved',
        user_id: users[0].id,
        employee_id: employees[1].id
      }
    }),
    prisma.payroll.create({
      data: {
        employeeId: 'EMP003',
        employeeName: 'Lucia Ferreira',
        baseSalary: 1800,
        overtimeHours: 8,
        overtimeRate: 1.5,
        bonuses: 300,
        deductions: 80,
        inss: 198.00,
        irrf: 0,
        fgts: 144.00,
        netSalary: 2122.00,
        grossSalary: 2220,
        month: 7,
        year: 2025,
        status: 'paid',
        user_id: users[1].id,
        employee_id: employees[2].id
      }
    })
  ]);

  console.log(`✅ Criados ${payrolls.length} registros de folha de pagamento`);

  // PASSO 7: Criar Payments (Referenciam User)
  console.log('💳 Criando pagamentos...');
  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        amount: 1500.00,
        description: 'Pagamento de serviços domésticos',
        status: 'pending',
        dueDate: new Date('2025-07-25'),
        user_id: users[0].id
      }
    }),
    prisma.payment.create({
      data: {
        amount: 800.00,
        description: 'Pagamento de limpeza',
        status: 'completed',
        dueDate: new Date('2025-07-20'),
        user_id: users[0].id
      }
    }),
    prisma.payment.create({
      data: {
        amount: 1200.00,
        description: 'Pagamento de jardinagem',
        status: 'pending',
        dueDate: new Date('2025-07-30'),
        user_id: users[1].id
      }
    })
  ]);

  console.log(`✅ Criados ${payments.length} pagamentos`);

  // PASSO 8: Criar Purchases (Referenciam User)
  console.log('🛒 Criando compras...');
  const purchases = await Promise.all([
    prisma.purchase.create({
      data: {
        title: 'Produtos de Limpeza',
        description: 'Detergente, sabão em pó, desinfetante',
        amount: 150.00,
        status: 'pending',
        category: 'Limpeza',
        user_id: users[0].id
      }
    }),
    prisma.purchase.create({
      data: {
        title: 'Material de Escritório',
        description: 'Papel, canetas, grampeador',
        amount: 80.00,
        status: 'approved',
        category: 'Escritório',
        user_id: users[0].id
      }
    }),
    prisma.purchase.create({
      data: {
        title: 'Alimentos',
        description: 'Arroz, feijão, óleo, temperos',
        amount: 200.00,
        status: 'completed',
        category: 'Alimentação',
        user_id: users[1].id
      }
    })
  ]);

  console.log(`✅ Criados ${purchases.length} compras`);

  // PASSO 9: Criar Notifications (Independentes)
  console.log('🔔 Criando notificações...');
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        tipo: 'info',
        titulo: 'Bem-vindo ao DOM v2',
        mensagem: 'Sistema de gestão doméstica inicializado com sucesso!',
        destinatario_id: users[0].id,
        lida: false,
        prioridade: 'normal',
        categoria: 'sistema',
        ativo: true
      }
    }),
    prisma.notification.create({
      data: {
        tipo: 'warning',
        titulo: 'Pagamento Pendente',
        mensagem: 'Você tem um pagamento vencendo em 3 dias',
        destinatario_id: users[0].id,
        lida: false,
        prioridade: 'alta',
        categoria: 'pagamento',
        ativo: true
      }
    }),
    prisma.notification.create({
      data: {
        tipo: 'success',
        titulo: 'Orçamento Aprovado',
        mensagem: 'Seu orçamento de alimentação foi aprovado',
        destinatario_id: users[1].id,
        lida: true,
        prioridade: 'normal',
        categoria: 'orcamento',
        ativo: true
      }
    })
  ]);

  console.log(`✅ Criadas ${notifications.length} notificações`);

  // PASSO 10: Criar Tasks (Referenciam User)
  console.log('📋 Criando tarefas...');
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        titulo: 'Limpar casa',
        descricao: 'Fazer limpeza geral da casa',
        status: 'pending',
        prioridade: 1,
        data_limite: new Date('2025-07-25'),
        criador_id: users[0].id,
        categoria: 'limpeza',
        ativo: true
      }
    }),
    prisma.task.create({
      data: {
        titulo: 'Cuidar do jardim',
        descricao: 'Podar plantas e regar',
        status: 'in_progress',
        prioridade: 2,
        data_limite: new Date('2025-07-28'),
        criador_id: users[0].id,
        categoria: 'jardinagem',
        ativo: true
      }
    }),
    prisma.task.create({
      data: {
        titulo: 'Preparar refeição',
        descricao: 'Fazer almoço para família',
        status: 'completed',
        prioridade: 1,
        data_limite: new Date('2025-07-23'),
        criador_id: users[1].id,
        categoria: 'cozinha',
        ativo: true
      }
    })
  ]);

  console.log(`✅ Criadas ${tasks.length} tarefas`);

  // PASSO 11: Criar User Sessions (Referenciam User e Group)
  console.log('🔐 Criando sessões de usuário...');
  const userSessions = await Promise.all([
    prisma.user_sessions.create({
      data: {
        user_id: users[0].id,
        session_token: 'session_token_1',
        active_group_id: groups[0].id,
        active_role: 'admin',
        expires_at: new Date('2025-12-31'),
        user_agent: 'Mozilla/5.0',
        ip_address: '192.168.1.100'
      }
    }),
    prisma.user_sessions.create({
      data: {
        user_id: users[1].id,
        session_token: 'session_token_2',
        active_group_id: groups[1].id,
        active_role: 'user',
        expires_at: new Date('2025-12-31'),
        user_agent: 'Mozilla/5.0',
        ip_address: '192.168.1.101'
      }
    })
  ]);

  console.log(`✅ Criadas ${userSessions.length} sessões de usuário`);

  console.log('🎉 Seed integrado concluído com sucesso!');
  console.log('📊 Resumo dos dados criados:');
  console.log(`   - ${users.length} usuários`);
  console.log(`   - ${groups.length} grupos`);
  console.log(`   - ${userGroupRoles.length} relacionamentos usuário-grupo`);
  console.log(`   - ${employees.length} funcionários`);
  console.log(`   - ${budgets.length} orçamentos`);
  console.log(`   - ${payrolls.length} folhas de pagamento`);
  console.log(`   - ${payments.length} pagamentos`);
  console.log(`   - ${purchases.length} compras`);
  console.log(`   - ${notifications.length} notificações`);
  console.log(`   - ${tasks.length} tarefas`);
  console.log(`   - ${userSessions.length} sessões de usuário`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed integrado:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 