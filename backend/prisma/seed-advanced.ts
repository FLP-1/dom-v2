#!/usr/bin/env ts-node

/**
 * @fileoverview Seed avançado para o banco de dados DOM V2 com relacionamentos complexos
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-13
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { validateCPF, formatCPF } from '../src/utils/cpfValidation';

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
 * Valida CPF antes de criar usuário
 */
function validateAndFormatUserCPF(cpf: string, name: string): string {
  if (!validateCPF(cpf)) {
    throw new Error(`CPF inválido para ${name}: ${cpf}`);
  }
  // Retornar apenas os dígitos, sem formatação
  return cpf.replace(/\D/g, '');
}

/**
 * Função principal do seed avançado
 */
async function main() {
  console.log('🚀 INICIANDO SEED AVANÇADO DO BANCO DE DADOS');
  console.log('============================================');
  console.log(`📅 Data: ${new Date().toLocaleString('pt-BR')}\n`);
  
  try {
    // Limpar dados existentes
    console.log('🧹 Limpando dados existentes...');
    await prisma.userProfile.deleteMany();
    await prisma.familyRelationship.deleteMany();
    await prisma.employmentRelationship.deleteMany();
    await prisma.userRole.deleteMany();
    await prisma.domesticContext.deleteMany();
    await prisma.notifications.deleteMany();
    await prisma.tasks.deleteMany();
    await prisma.payrolls.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.purchases.deleteMany();
    await prisma.budget.deleteMany();
    await prisma.employees.deleteMany();
    await prisma.users.deleteMany();
    console.log('✅ Dados limpos\n');
    
    // 1. Criar DONO DO SISTEMA (você)
    console.log('👑 Criando DONO DO SISTEMA...');
    const password_hash = await bcrypt.hash('123456', 12);
    
    const systemOwner = await prisma.users.create({
      data: {
        name: 'Dono do Sistema',
        nickname: 'sistema',
        cpf: validateAndFormatUserCPF('59876913700', 'Dono do Sistema'),
        email: 'sistema@domv2.com',
        password_hash,
        phone: '11999999999',
        profile: 'system_owner', // Perfil principal
        active: true,
        platforms: ['web'],
        permissions: ['*'] // Todas as permissões
      }
    });
    console.log(`✅ Dono do sistema criado: ${systemOwner.name} (${systemOwner.cpf})`);
    
    // 2. Criar usuários com CPFs válidos
    console.log('\n👥 Criando usuários com validação de CPF...');
    
    const joaoSilva = await prisma.users.create({
      data: {
        name: 'João Silva',
        nickname: 'joao',
        cpf: validateAndFormatUserCPF('12345678909', 'João Silva'),
        email: 'joao@email.com',
        password_hash,
        phone: '11999999999',
        profile: 'employer', // Perfil principal
        active: true,
        platforms: ['web'],
        permissions: ['admin']
      }
    });
    console.log(`✅ Usuário criado: ${joaoSilva.name} (${joaoSilva.cpf})`);
    
    const mariaSilva = await prisma.users.create({
      data: {
        name: 'Maria Silva',
        nickname: 'maria',
        cpf: validateAndFormatUserCPF('98765432100', 'Maria Silva'),
        email: 'maria@email.com',
        password_hash,
        phone: '11888888888',
        profile: 'family', // Perfil principal
        active: true,
        platforms: ['web'],
        permissions: ['view_finances']
      }
    });
    console.log(`✅ Usuário criado: ${mariaSilva.name} (${mariaSilva.cpf})`);
    
    const anaCosta = await prisma.users.create({
      data: {
        name: 'Ana Costa',
        nickname: 'ana',
        cpf: validateAndFormatUserCPF('11144477735', 'Ana Costa'),
        email: 'ana@email.com',
        password_hash,
        phone: '11777777777',
        profile: 'employee', // Perfil principal (funcionária)
        active: true,
        platforms: ['web'],
        permissions: ['view_my_tasks']
      }
    });
    console.log(`✅ Usuário criado: ${anaCosta.name} (${anaCosta.cpf})`);
    
    const babáMaria = await prisma.users.create({
      data: {
        name: 'Maria da Babá',
        nickname: 'baba',
        cpf: validateAndFormatUserCPF(generateValidCPF(), 'Maria da Babá'),
        email: 'baba@email.com',
        password_hash,
        phone: '11666666666',
        profile: 'employee', // Perfil principal
        active: true,
        platforms: ['mobile'],
        permissions: ['view_my_tasks']
      }
    });
    console.log(`✅ Usuário criado: ${babáMaria.name} (${babáMaria.cpf})`);
    
    // 3. Criar contextos domésticos
    console.log('\n🏠 Criando contextos domésticos...');
    
    // Família Silva (João é o dono)
    const familiaSilva = await prisma.domesticContext.create({
      data: {
        name: "Família Silva",
        type: "family",
        ownerId: joaoSilva.id,
        members: [
          { userId: joaoSilva.id, role: "owner", name: joaoSilva.name },
          { userId: mariaSilva.id, role: "spouse", name: mariaSilva.name }
        ],
        settings: {
          allowEmployeeAccess: true,
          notifications: true,
          privacy: "family"
        }
      }
    });
    console.log(`✅ Contexto criado: ${familiaSilva.name}`);
    
    // Família Costa (Ana é a dona)
    const familiaCosta = await prisma.domesticContext.create({
      data: {
        name: "Família Costa",
        type: "family",
        ownerId: anaCosta.id,
        members: [
          { userId: anaCosta.id, role: "owner", name: anaCosta.name }
        ],
        settings: {
          allowEmployeeAccess: true,
          notifications: true,
          privacy: "family"
        }
      }
    });
    console.log(`✅ Contexto criado: ${familiaCosta.name}`);
    
    // 4. Criar relacionamentos de trabalho
    console.log('\n💼 Criando relacionamentos de trabalho...');
    
    // Ana trabalha para a Família Silva
    const anaSilvaEmployment = await prisma.employmentRelationship.create({
      data: {
        employerId: joaoSilva.id,
        employeeId: anaCosta.id,
        contextId: familiaSilva.id,
        position: "Empregada Doméstica",
        salary: 1500.00,
        startDate: new Date("2024-01-01"),
        contractType: "formal",
        permissions: {
          view_tasks: true,
          clock_in_out: true,
          view_schedule: true
        }
      }
    });
    console.log(`✅ Relacionamento criado: ${anaCosta.name} trabalha para ${joaoSilva.name}`);
    
    // Babá Maria trabalha para a Família Costa
    const mariaCostaEmployment = await prisma.employmentRelationship.create({
      data: {
        employerId: anaCosta.id,
        employeeId: babáMaria.id,
        contextId: familiaCosta.id,
        position: "Babá",
        salary: 800.00,
        startDate: new Date("2024-06-01"),
        contractType: "informal",
        permissions: {
          view_tasks: true,
          clock_in_out: true
        }
      }
    });
    console.log(`✅ Relacionamento criado: ${babáMaria.name} trabalha para ${anaCosta.name}`);
    
    // 5. Criar relacionamentos familiares
    console.log('\n👨‍👩‍👧‍👦 Criando relacionamentos familiares...');
    
    // Maria Silva é esposa de João Silva
    const mariaJoaoFamily = await prisma.familyRelationship.create({
      data: {
        familyContextId: familiaSilva.id,
        memberId: mariaSilva.id,
        relationshipType: "spouse",
        permissions: {
          view_finances: true,
          manage_tasks: true,
          view_employees: true
        }
      }
    });
    console.log(`✅ Relacionamento familiar criado: ${mariaSilva.name} é esposa de ${joaoSilva.name}`);
    
    // 6. Criar perfis robustos usando a nova estrutura
    console.log('\n🎭 Criando perfis robustos...');
    
    // Dono do sistema - Perfil principal
    await prisma.userProfile.create({
      data: {
        userId: systemOwner.id,
        profileType: 'system_owner',
        contextId: null,
        contextType: 'system',
        isPrimary: true,
        isActive: true,
        permissions: { "*": true },
        metadata: {
          description: 'Dono do sistema com acesso total',
          createdBy: 'seed_advanced'
        }
      }
    });
    console.log(`✅ Perfil principal criado: ${systemOwner.name} como system_owner`);
    
    // João Silva - Perfil principal (empregador)
    await prisma.userProfile.create({
      data: {
        userId: joaoSilva.id,
        profileType: 'employer',
        contextId: familiaSilva.id,
        contextType: 'family',
        isPrimary: true,
        isActive: true,
        permissions: {
          manage_employees: true,
          view_finances: true,
          manage_tasks: true,
          admin: true
        },
        metadata: {
          description: 'Empregador da Família Silva',
          familyName: 'Silva',
          createdBy: 'seed_advanced'
        }
      }
    });
    console.log(`✅ Perfil principal criado: ${joaoSilva.name} como employer`);
    
    // Maria Silva - Perfil principal (familiar)
    await prisma.userProfile.create({
      data: {
        userId: mariaSilva.id,
        profileType: 'family',
        contextId: familiaSilva.id,
        contextType: 'family',
        isPrimary: true,
        isActive: true,
        permissions: {
          view_finances: true,
          manage_tasks: true,
          view_employees: true
        },
        metadata: {
          description: 'Esposa de João Silva',
          relationship: 'spouse',
          familyName: 'Silva',
          createdBy: 'seed_advanced'
        }
      }
    });
    console.log(`✅ Perfil principal criado: ${mariaSilva.name} como family`);
    
    // Ana Costa - Perfil principal (funcionária) + Perfil adicional (empregadora)
    await prisma.userProfile.create({
      data: {
        userId: anaCosta.id,
        profileType: 'employee',
        contextId: familiaSilva.id,
        contextType: 'family',
        isPrimary: true,
        isActive: true,
        permissions: {
          view_my_tasks: true,
          clock_in_out: true,
          view_schedule: true
        },
        metadata: {
          description: 'Funcionária da Família Silva',
          position: 'Empregada Doméstica',
          salary: 1500.00,
          familyName: 'Silva',
          createdBy: 'seed_advanced'
        }
      }
    });
    console.log(`✅ Perfil principal criado: ${anaCosta.name} como employee`);
    
    // Ana Costa - Perfil adicional (empregadora)
    await prisma.userProfile.create({
      data: {
        userId: anaCosta.id,
        profileType: 'employer',
        contextId: familiaCosta.id,
        contextType: 'family',
        isPrimary: false,
        isActive: true,
        permissions: {
          manage_employees: true,
          view_finances: true,
          manage_tasks: true
        },
        metadata: {
          description: 'Empregadora da Família Costa',
          familyName: 'Costa',
          employees: ['Maria da Babá'],
          createdBy: 'seed_advanced'
        }
      }
    });
    console.log(`✅ Perfil adicional criado: ${anaCosta.name} como employer da Família Costa`);
    
    // Babá Maria - Perfil principal (funcionária)
    await prisma.userProfile.create({
      data: {
        userId: babáMaria.id,
        profileType: 'employee',
        contextId: familiaCosta.id,
        contextType: 'family',
        isPrimary: true,
        isActive: true,
        permissions: {
          view_my_tasks: true,
          clock_in_out: true
        },
        metadata: {
          description: 'Babá da Família Costa',
          position: 'Babá',
          salary: 800.00,
          familyName: 'Costa',
          createdBy: 'seed_advanced'
        }
      }
    });
    console.log(`✅ Perfil principal criado: ${babáMaria.name} como employee`);
    
    // 7. Criar dados de teste básicos
    console.log('\n📊 Criando dados de teste básicos...');
    
    // Funcionários (para compatibilidade com sistema atual)
    const employees = [
      {
        id: 'EMP001',
        name: 'Ana Costa',
        cpf: anaCosta.cpf,
        position: 'Empregada Doméstica',
        salary: 1500.00,
        status: 'active',
        user_id: joaoSilva.id
      },
      {
        id: 'EMP002',
        name: 'Maria da Babá',
        cpf: babáMaria.cpf,
        position: 'Babá',
        salary: 800.00,
        status: 'active',
        user_id: anaCosta.id
      }
    ];
    
    for (const employeeData of employees) {
      await prisma.employees.create({
        data: employeeData
      });
      console.log(`✅ Funcionário criado: ${employeeData.name} (${employeeData.position})`);
    }
    
    // Orçamentos
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
        user_id: joaoSilva.id
      }
    ];
    
    for (const budgetData of budgets) {
      await prisma.budget.create({
        data: budgetData
      });
      console.log(`✅ Orçamento criado: ${budgetData.name}`);
    }
    
    // Tarefas
    const tasks = [
      {
        id: 'TASK001',
        title: 'Limpar casa',
        description: 'Limpeza geral da casa',
        status: 'pending',
        priority: 1,
        creator_id: joaoSilva.id,
        responsible_id: anaCosta.id,
        category: 'Limpeza',
        active: true
      },
      {
        id: 'TASK002',
        title: 'Cuidar das crianças',
        description: 'Cuidar das crianças da Família Costa',
        status: 'in_progress',
        priority: 2,
        creator_id: anaCosta.id,
        responsible_id: babáMaria.id,
        category: 'Cuidados',
        active: true
      }
    ];
    
    for (const taskData of tasks) {
      await prisma.tasks.create({
        data: taskData
      });
      console.log(`✅ Tarefa criada: ${taskData.title}`);
    }
    
    console.log('\n🎉 SEED AVANÇADO CONCLUÍDO COM SUCESSO!');
    console.log('============================================');
    console.log('\n📋 RESUMO DOS DADOS CRIADOS:');
    console.log('👑 Dono do Sistema: 598.769.137-00 (senha: 123456)');
    console.log('👥 Usuários: 5 criados com CPFs válidos');
    console.log('🏠 Contextos: 2 famílias criadas');
    console.log('💼 Relacionamentos: 2 empregos criados');
    console.log('👨‍👩‍👧‍👦 Família: 1 relacionamento familiar');
    console.log('🎭 Perfis: 7 perfis robustos criados (principais + adicionais)');
    console.log('📊 Dados: Funcionários, orçamentos e tarefas');
    
    console.log('\n🔑 CREDENCIAIS DE ACESSO:');
    console.log('Dono do Sistema: 598.769.137-00 / 123456');
    console.log('João Silva: 123.456.789-09 / 123456');
    console.log('Maria Silva: 987.654.321-00 / 123456');
    console.log('Ana Costa: 111.444.777-35 / 123456');
    console.log('Maria da Babá: [CPF gerado] / 123456');
    
    console.log('\n🎯 CENÁRIOS TESTADOS:');
    console.log('✅ Validação de CPF antes de gravar');
    console.log('✅ Múltiplos perfis por usuário');
    console.log('✅ Relacionamentos complexos');
    console.log('✅ Ana Costa: Funcionária + Empregadora');
    console.log('✅ Dono do sistema com acesso total');
    console.log('✅ Estrutura robusta de perfis');
    
    // 8. Demonstrar a nova estrutura de perfis
    console.log('\n📚 DEMONSTRAÇÃO DA NOVA ESTRUTURA:');
    
    // Buscar todos os perfis de Ana Costa
    const anaProfiles = await prisma.userProfile.findMany({
      where: { userId: anaCosta.id },
      include: { user: { select: { name: true, cpf: true } } }
    });
    
    console.log(`\n👤 Perfis de ${anaCosta.name}:`);
    for (const profile of anaProfiles) {
      console.log(`   - ${profile.profileType} ${profile.isPrimary ? '(PRINCIPAL)' : '(ADICIONAL)'} ${profile.contextId ? `(${profile.contextType})` : ''}`);
      console.log(`     Permissões: ${Object.keys(profile.permissions || {}).join(', ')}`);
    }
    
  } catch (error) {
    console.error('❌ ERRO NO SEED:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o seed
main()
  .then(() => {
    console.log('\n✅ Seed executado com sucesso!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erro no seed:', error);
    process.exit(1);
  });
