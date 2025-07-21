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

  // Limpar dados existentes
  await prisma.notification.deleteMany();
  await prisma.task.deleteMany();
  await prisma.userOrganization.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Dados anteriores removidos');

  // 1. Criar Organizações
  const householdOrg = await prisma.organization.create({
    data: {
      name: 'Residência Silva',
      description: 'Casa da família Silva',
      type: 'HOUSEHOLD',
      status: 'ACTIVE'
    }
  });

  const businessOrg = await prisma.organization.create({
    data: {
      name: 'Empresa Santos Ltda',
      description: 'Empresa de limpeza',
      type: 'BUSINESS',
      status: 'ACTIVE'
    }
  });

  console.log('🏢 Organizações criadas');

  // 2. Criar Usuários
  const mariaUser = await prisma.user.create({
    data: {
      email: 'maria.silva@email.com',
      name: 'Maria Silva',
      profile: 'EMPLOYER'
    }
  });

  const anaUser = await prisma.user.create({
    data: {
      email: 'ana.santos@email.com',
      name: 'Ana Santos',
      profile: 'EMPLOYEE'
    }
  });

  const joaoUser = await prisma.user.create({
    data: {
      email: 'joao.oliveira@email.com',
      name: 'João Oliveira',
      profile: 'FAMILY'
    }
  });

  console.log('👥 Usuários criados');

  // 3. Relacionar Usuários com Organizações
  await prisma.userOrganization.createMany({
    data: [
      {
        userId: mariaUser.id,
        organizationId: householdOrg.id,
        role: 'OWNER',
        status: 'ACTIVE'
      },
      {
        userId: anaUser.id,
        organizationId: householdOrg.id,
        role: 'MEMBER',
        status: 'ACTIVE'
      },
      {
        userId: joaoUser.id,
        organizationId: householdOrg.id,
        role: 'MEMBER',
        status: 'ACTIVE'
      },
      {
        userId: anaUser.id,
        organizationId: businessOrg.id,
        role: 'ADMIN',
        status: 'ACTIVE'
      }
    ]
  });

  console.log('🔗 Usuários relacionados às organizações');

  // 4. Criar Tarefas
  await prisma.task.createMany({
    data: [
      {
        title: 'Limpar cozinha',
        description: 'Limpar pia, fogão e organizar armários',
        priority: 'MEDIUM',
        status: 'PENDING',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        assignedTo: anaUser.id,
        createdBy: mariaUser.id,
        organizationId: householdOrg.id
      },
      {
        title: 'Lavar roupas',
        description: 'Lavar, passar e organizar roupas da semana',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
        assignedTo: anaUser.id,
        createdBy: mariaUser.id,
        organizationId: householdOrg.id
      },
      {
        title: 'Organizar documentos',
        description: 'Organizar documentos da empresa',
        priority: 'LOW',
        status: 'PENDING',
        dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
        assignedTo: anaUser.id,
        createdBy: anaUser.id,
        organizationId: businessOrg.id
      }
    ]
  });

  console.log('📋 Tarefas criadas');

  // 5. Criar Notificações
  await prisma.notification.createMany({
    data: [
      {
        type: 'TASK_REMINDER',
        title: 'Lembrete de Tarefa',
        message: 'Você tem tarefas pendentes para hoje',
        priority: 'MEDIUM',
        status: 'UNREAD',
        organizationId: householdOrg.id,
        userId: anaUser.id
      },
      {
        type: 'HELP_TIP',
        title: 'Dica do Sistema',
        message: 'Use o botão + para criar novas tarefas rapidamente',
        priority: 'LOW',
        status: 'UNREAD',
        organizationId: householdOrg.id,
        userId: mariaUser.id
      },
      {
        type: 'SYSTEM_UPDATE',
        title: 'Atualização do Sistema',
        message: 'Novas funcionalidades disponíveis',
        priority: 'LOW',
        status: 'READ',
        organizationId: householdOrg.id,
        userId: joaoUser.id
      },
      {
        type: 'PAYMENT_DUE',
        title: 'Pagamento Vencendo',
        message: 'Há pagamentos que vencem em breve',
        priority: 'HIGH',
        status: 'UNREAD',
        organizationId: businessOrg.id,
        userId: anaUser.id
      }
    ]
  });

  console.log('🔔 Notificações criadas');

  // 6. Criar perfis específicos
  await prisma.employer.create({
    data: {
      userId: mariaUser.id,
      companyName: 'Residência Silva',
      cpf: '59876913700',
      address: 'Rua das Flores, 123',
      phone: '(11) 99999-9999'
    }
  });

  await prisma.employee.create({
    data: {
      userId: anaUser.id,
      employerId: (await prisma.employer.findFirst())!.id,
      cpf: '12345678901',
      pis: '12345678901',
      address: 'Rua do Trabalho, 456',
      phone: '(11) 88888-8888',
      salary: 1500.00,
      startDate: new Date('2024-01-01')
    }
  });

  await prisma.family.create({
    data: {
      userId: joaoUser.id,
      relation: 'Filho'
    }
  });

  console.log('👤 Perfis específicos criados');

  console.log('✅ Seed concluído com sucesso!');
  console.log('\n📊 Dados criados:');
  console.log('- 2 Organizações');
  console.log('- 3 Usuários');
  console.log('- 4 Relacionamentos Usuário-Organização');
  console.log('- 3 Tarefas');
  console.log('- 4 Notificações');
  console.log('- 3 Perfis específicos');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 