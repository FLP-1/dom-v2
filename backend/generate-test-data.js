/**
 * Script para gerar massa de dados de teste - DOM v2
 * Execute: node scripts/generate-test-data.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// Dados de teste
const testUsers = [
  {
    name: 'Maria Silva Santos',
    cpf: '12345678901',
    email: 'maria@exemplo.com',
    profile: 'employer',
    password: 'senha123'
  },
  {
    name: 'João Carlos Oliveira',
    cpf: '11111111111', // employee
    email: 'joao@exemplo.com',
    profile: 'employee',
    password: 'senha123'
  },
  {
    name: 'Ana Paula Costa',
    cpf: '22222222222', // family
    email: 'ana@exemplo.com',
    profile: 'family',
    password: 'senha123'
  },
  {
    name: 'Administrador Sistema',
    cpf: '00000000000', // admin
    email: 'admin@domv2.com.br',
    profile: 'admin',
    password: 'admin123'
  },
  {
    name: 'Limpeza Total Ltda',
    cpf: '33333333333',
    email: 'contato@limpezatotal.com',
    profile: 'partner',
    password: 'parceiro123'
  },
  {
    name: 'Produtos Domésticos S/A',
    cpf: '44444444444',
    email: 'vendas@produtosdom.com',
    profile: 'supplier',
    password: 'fornecedor123'
  }
];

const subscriptionPlans = [
  {
    name: 'Básico',
    description: 'Plano ideal para casas com até 2 funcionários',
    price: 29.90,
    interval: 'monthly',
    features: {
      employees: 2,
      storage_gb: 5,
      support: 'email',
      reports: 'basic',
      integrations: 'basic'
    },
    limits: {
      max_employees: 2,
      storage_gb: 5,
      api_calls: 1000
    }
  },
  {
    name: 'Profissional',
    description: 'Plano completo para casas com até 5 funcionários',
    price: 59.90,
    interval: 'monthly',
    features: {
      employees: 5,
      storage_gb: 20,
      support: 'priority',
      reports: 'advanced',
      integrations: 'full'
    },
    limits: {
      max_employees: 5,
      storage_gb: 20,
      api_calls: 5000
    }
  },
  {
    name: 'Empresarial',
    description: 'Plano ilimitado para grandes residências',
    price: 99.90,
    interval: 'monthly',
    features: {
      employees: 'unlimited',
      storage_gb: 100,
      support: 'dedicated',
      reports: 'premium',
      integrations: 'custom'
    },
    limits: {
      max_employees: -1, // unlimited
      storage_gb: 100,
      api_calls: 50000
    }
  }
];

const sampleEmployees = [
  {
    name: 'Carla Santos Silva',
    cpf: '98765432100',
    position: 'Diarista',
    salary: 1400.00,
    hire_date: new Date('2023-01-15'),
    work_schedule: {
      monday: { start: '08:00', end: '17:00' },
      tuesday: { start: '08:00', end: '17:00' },
      wednesday: { start: '08:00', end: '17:00' },
      thursday: { start: '08:00', end: '17:00' },
      friday: { start: '08:00', end: '17:00' },
      saturday: { start: '08:00', end: '12:00' }
    }
  },
  {
    name: 'Roberto Lima Costa',
    cpf: '87654321099',
    position: 'Jardineiro',
    salary: 1200.00,
    hire_date: new Date('2023-03-01'),
    work_schedule: {
      monday: { start: '07:00', end: '15:00' },
      wednesday: { start: '07:00', end: '15:00' },
      friday: { start: '07:00', end: '15:00' }
    }
  }
];

const sampleTasks = [
  {
    title: 'Limpeza da sala de estar',
    description: 'Aspirar tapetes, limpar móveis e organizar objetos',
    priority: 'medium',
    status: 'pending',
    estimated_duration: 60
  },
  {
    title: 'Preparar almoço',
    description: 'Cardápio: arroz, feijão, frango grelhado e salada',
    priority: 'high',
    status: 'in_progress',
    estimated_duration: 120
  },
  {
    title: 'Regar plantas do jardim',
    description: 'Regar todas as plantas e verificar pragas',
    priority: 'low',
    status: 'completed',
    estimated_duration: 30
  }
];

const sampleBudgets = [
  {
    name: 'Orçamento Janeiro 2025',
    total_amount: 5000.00,
    period_start: new Date('2025-01-01'),
    period_end: new Date('2025-01-31'),
    categories: {
      'Salários': 3000.00,
      'Alimentação': 800.00,
      'Limpeza': 400.00,
      'Manutenção': 500.00,
      'Outros': 300.00
    }
  }
];

const samplePayments = [
  {
    description: 'Salário - Carla Santos',
    amount: 1400.00,
    due_date: new Date('2025-01-05'),
    status: 'paid',
    category: 'salary'
  },
  {
    description: 'Compras do mês - Supermercado',
    amount: 650.00,
    due_date: new Date('2025-01-10'),
    status: 'pending',
    category: 'groceries'
  }
];

async function generateTestData() {
  console.log('🚀 Iniciando geração de dados de teste...\n');

  try {
    // 1. Criar planos de assinatura
    console.log('📋 Criando planos de assinatura...');
    for (const plan of subscriptionPlans) {
      await prisma.subscriptionPlan.create({
        data: plan
      });
    }
    console.log('✅ Planos criados com sucesso!\n');

    // 2. Criar usuários
    console.log('👥 Criando usuários de teste...');
    const createdUsers = [];
    
    for (const user of testUsers) {
      const password_hash = await bcrypt.hash(user.password, 10);
      
      const createdUser = await prisma.users.upsert({
        where: { cpf: user.cpf },
        update: {
          name: user.name,
          email: user.email,
          profile: user.profile,
          password_hash,
          active: true,
          platforms: ['web'],
          permissions: user.profile === 'admin' ? ['admin', 'manage_users'] : ['basic']
        },
        create: {
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          profile: user.profile,
          password_hash,
          active: true,
          platforms: ['web'],
          permissions: user.profile === 'admin' ? ['admin', 'manage_users'] : ['basic']
        }
      });
      
      createdUsers.push(createdUser);
      console.log(`   ✓ ${user.name} (${user.profile})`);
    }
    console.log('✅ Usuários criados com sucesso!\n');

    // 3. Criar assinaturas
    console.log('💳 Criando assinaturas...');
    const basicPlan = await prisma.subscriptionPlan.findFirst({ where: { name: 'Básico' } });
    const professionalPlan = await prisma.subscriptionPlan.findFirst({ where: { name: 'Profissional' } });
    
    const employer = createdUsers.find(u => u.profile === 'employer');
    if (employer && professionalPlan) {
      await prisma.subscription.create({
        data: {
          user_id: employer.id,
          plan_id: professionalPlan.id,
          status: 'active',
          current_period_start: new Date(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
          trial_start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
          trial_end: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000) // 23 dias restantes
        }
      });
      console.log('   ✓ Assinatura Profissional para empregador');
    }
    console.log('✅ Assinaturas criadas com sucesso!\n');

    // 4. Criar funcionários
    console.log('👨‍🔧 Criando funcionários...');
    if (employer) {
      for (const emp of sampleEmployees) {
        await prisma.employees.upsert({
          where: { cpf: emp.cpf },
          update: emp,
          create: {
            ...emp,
            user_id: employer.id,
            active: true,
            benefits: {
              vale_transporte: true,
              vale_refeicao: true,
              plano_saude: false
            },
            documents: {
              rg: `${emp.cpf}RG`,
              ctps: `${emp.cpf}CTPS`,
              pis: `${emp.cpf}PIS`
            }
          }
        });
        console.log(`   ✓ ${emp.name} (${emp.position})`);
      }
    }
    console.log('✅ Funcionários criados com sucesso!\n');

    // 5. Criar tarefas
    console.log('📝 Criando tarefas...');
    if (employer) {
      for (const task of sampleTasks) {
        await prisma.tasks.create({
          data: {
            ...task,
            creator_id: employer.id,
            assigned_to: employer.id,
            created_at: new Date(),
            due_date: new Date(Date.now() + 24 * 60 * 60 * 1000) // amanhã
          }
        });
        console.log(`   ✓ ${task.title}`);
      }
    }
    console.log('✅ Tarefas criadas com sucesso!\n');

    // 6. Criar orçamentos
    console.log('📊 Criando orçamentos...');
    if (employer) {
      for (const budget of sampleBudgets) {
        await prisma.budget.create({
          data: {
            ...budget,
            user_id: employer.id,
            status: 'active'
          }
        });
        console.log(`   ✓ ${budget.name}`);
      }
    }
    console.log('✅ Orçamentos criados com sucesso!\n');

    // 7. Criar pagamentos
    console.log('💰 Criando pagamentos...');
    if (employer) {
      for (const payment of samplePayments) {
        await prisma.payment.create({
          data: {
            ...payment,
            user_id: employer.id
          }
        });
        console.log(`   ✓ ${payment.description}`);
      }
    }
    console.log('✅ Pagamentos criados com sucesso!\n');

    // 8. Criar perfil de parceiro
    console.log('🤝 Criando perfil de parceiro...');
    const partner = createdUsers.find(u => u.profile === 'partner');
    if (partner) {
      await prisma.partnerProfile.upsert({
        where: { user_id: partner.id },
        update: {},
        create: {
          user_id: partner.id,
          company_name: 'Limpeza Total Ltda',
          cnpj: '12.345.678/0001-90',
          service_type: 'cleaning',
          description: 'Serviços de limpeza residencial e comercial com qualidade e confiança',
          service_area: {
            regions: ['Zona Sul', 'Centro', 'Vila Madalena'],
            max_distance: 15
          },
          price_range: {
            min: 50.00,
            max: 200.00
          },
          availability: {
            monday: { start: '08:00', end: '18:00' },
            tuesday: { start: '08:00', end: '18:00' },
            wednesday: { start: '08:00', end: '18:00' },
            thursday: { start: '08:00', end: '18:00' },
            friday: { start: '08:00', end: '18:00' },
            saturday: { start: '08:00', end: '14:00' }
          },
          rating: 4.8,
          total_reviews: 127,
          verified: true
        }
      });
      console.log('   ✓ Limpeza Total Ltda');
    }
    console.log('✅ Perfil de parceiro criado com sucesso!\n');

    // 9. Criar perfil de fornecedor
    console.log('📦 Criando perfil de fornecedor...');
    const supplier = createdUsers.find(u => u.profile === 'supplier');
    if (supplier) {
      await prisma.supplierProfile.upsert({
        where: { user_id: supplier.id },
        update: {},
        create: {
          user_id: supplier.id,
          company_name: 'Produtos Domésticos S/A',
          cnpj: '98.765.432/0001-10',
          supplier_type: 'products',
          description: 'Fornecedor de produtos de limpeza e utensílios domésticos',
          delivery_areas: {
            regions: ['São Paulo', 'ABC', 'Grande SP'],
            free_delivery_above: 100.00
          },
          min_order: 50.00,
          payment_terms: {
            methods: ['credit_card', 'pix', 'boleto'],
            installments: 3,
            discount_cash: 5
          },
          rating: 4.5,
          total_orders: 89,
          verified: true
        }
      });
      console.log('   ✓ Produtos Domésticos S/A');
    }
    console.log('✅ Perfil de fornecedor criado com sucesso!\n');

    // 10. Configurar white-label e comissionamento
    console.log('🎨 Configurando white-label e comissionamento...');
    if (partner) {
      // Habilitar white-label
      await prisma.partnerProfile.update({
        where: { id: (await prisma.partnerProfile.findUnique({ where: { user_id: partner.id } }))?.id },
        data: {
          white_label_enabled: true,
          brand_name: 'Limpeza Total - Sistema de Gestão',
          brand_logo_url: '/assets/limpeza-total-logo.png',
          brand_colors: {
            primary: '#059669',
            secondary: '#047857',
            accent: '#10b981',
            text: '#1f2937',
            background: '#ffffff'
          },
          custom_subdomain: 'limpezatotal',
          brand_settings: {
            fonts: {
              primary: 'Inter',
              secondary: 'Roboto'
            },
            header_config: {
              logo_position: 'left',
              show_navigation: true
            },
            footer_config: {
              show_copyright: true,
              custom_text: 'Powered by Limpeza Total'
            }
          },
          commission_enabled: true,
          commission_type: 'percentage',
          commission_rate: 15.0,
          payment_terms: {
            payment_day: 5,
            payment_method: 'pix',
            minimum_amount: 50.0
          }
        }
      });

      // Vincular empregador ao parceiro
      if (employer) {
        const partnerProfile = await prisma.partnerProfile.findUnique({ 
          where: { user_id: partner.id } 
        });
        
        if (partnerProfile) {
          const employerLink = await prisma.partnerEmployerLink.create({
            data: {
              partner_id: partnerProfile.id,
              employer_id: employer.id,
              link_type: 'referral',
              status: 'active',
              referral_code: 'LIMPEZA2025',
              commission_rate: 15.0,
              activated_at: new Date()
            }
          });

          // Criar algumas comissões de exemplo
          const commissions = [
            {
              partner_id: partnerProfile.id,
              employer_link_id: employerLink.id,
              commission_type: 'subscription',
              base_amount: 59.90,
              commission_rate: 15.0,
              commission_amount: 8.99,
              status: 'pending',
              due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
            },
            {
              partner_id: partnerProfile.id,
              employer_link_id: employerLink.id,
              commission_type: 'renewal',
              base_amount: 59.90,
              commission_rate: 15.0,
              commission_amount: 8.99,
              status: 'paid',
              due_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 dias atrás
              paid_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 dias atrás
              payment_method: 'pix',
              payment_reference: 'PIX-LIMPEZA-001'
            }
          ];

          for (const commission of commissions) {
            await prisma.commission.create({ data: commission });
          }

          console.log('   ✓ White-label configurado para Limpeza Total');
          console.log('   ✓ Empregador vinculado com código LIMPEZA2025');
          console.log('   ✓ 2 comissões de exemplo criadas');
        }
      }
    }
    console.log('✅ White-label e comissionamento configurados com sucesso!\n');

    // 11. Criar notificações
    console.log('🔔 Criando notificações...');
    if (employer) {
      const notifications = [
        {
          user_id: employer.id,
          title: 'Pagamento pendente',
          message: 'Você tem um pagamento de salário vencendo amanhã',
          type: 'payment',
          priority: 'high',
          read: false
        },
        {
          user_id: employer.id,
          title: 'Nova tarefa atribuída',
          message: 'Carla Santos concluiu a limpeza da sala',
          type: 'task',
          priority: 'medium',
          read: false
        },
        {
          user_id: employer.id,
          title: 'Backup realizado',
          message: 'Backup automático dos seus dados foi realizado com sucesso',
          type: 'system',
          priority: 'low',
          read: true
        }
      ];

      for (const notif of notifications) {
        await prisma.notification.create({
          data: notif
        });
      }
      console.log('   ✓ 3 notificações criadas');
    }
    console.log('✅ Notificações criadas com sucesso!\n');

    // 12. Criar dados eSocial
    console.log('🏛️ Criando dados eSocial...');
    if (employer) {
      // Configuração eSocial
      const esocialConfig = await prisma.eSocialConfig.upsert({
        where: { user_id: employer.id },
        update: {},
        create: {
          user_id: employer.id,
          employer_type: 'individual',
          employer_cpf: '12345678901',
          employer_name: 'João Silva - Empregador Doméstico',
          employer_address: 'Rua das Flores, 123 - São Paulo/SP',
          employer_phone: '(11) 99999-9999',
          employer_email: 'joao.silva@email.com',
          esocial_version: '2.5',
          environment: 'testing',
          auto_send: true,
          retry_interval: 300,
          max_retries: 3
        }
      });

      // Certificado digital
      const esocialCertificate = await prisma.eSocialCertificate.create({
        data: {
          user_id: employer.id,
          certificate_type: 'e-CPF',
          certificate_file: 'certificado-teste-base64',
          valid_from: new Date('2024-01-01'),
          valid_until: new Date('2025-12-31'),
          is_active: true,
          validation_status: 'valid',
          notes: 'Certificado de teste para desenvolvimento'
        }
      });

      // Eventos eSocial
      const esocialEvents = [
        {
          user_id: employer.id,
          certificate_id: esocialCertificate.id,
          event_type: 'S-1000',
          event_status: 'accepted',
          event_data: {
            employerName: 'João Silva',
            employerCpf: '12345678901',
            eventType: 'S-1000',
            description: 'Cadastro inicial do empregador'
          },
          event_xml: '<?xml version="1.0" encoding="UTF-8"?><eSocial><evtInfoEmpregador>...</evtInfoEmpregador></eSocial>',
          protocol_number: 'PROT-2025-001',
          response_xml: '<?xml version="1.0" encoding="UTF-8"?><retornoEvento><status>SUCESSO</status></retornoEvento>',
          created_at: new Date('2025-01-15')
        },
        {
          user_id: employer.id,
          certificate_id: esocialCertificate.id,
          event_type: 'S-2200',
          event_status: 'pending',
          event_data: {
            employeeName: 'Maria Santos',
            employeeCpf: '98765432100',
            eventType: 'S-2200',
            description: 'Admissão de funcionário'
          },
          event_xml: '<?xml version="1.0" encoding="UTF-8"?><eSocial><evtAdmissao>...</evtAdmissao></eSocial>'
        },
        {
          user_id: employer.id,
          certificate_id: esocialCertificate.id,
          event_type: 'S-1200',
          event_status: 'error',
          event_data: {
            employeeName: 'Pedro Costa',
            employeeCpf: '11122233344',
            eventType: 'S-1200',
            description: 'Remuneração de funcionário'
          },
          event_xml: '<?xml version="1.0" encoding="UTF-8"?><eSocial><evtRemun>...</evtRemun></eSocial>',
          error_message: 'Erro de validação: CPF inválido',
          retry_count: 1,
          created_at: new Date('2025-01-20')
        }
      ];

      for (const event of esocialEvents) {
        await prisma.eSocialEvent.create({ data: event });
      }

      console.log('   ✓ Configuração eSocial criada');
      console.log('   ✓ Certificado digital criado');
      console.log('   ✓ 3 eventos eSocial criados (aceito, pendente, erro)');
    }
    console.log('✅ Dados eSocial criados com sucesso!\n');

    console.log('🎉 DADOS DE TESTE GERADOS COM SUCESSO!');
    console.log('\n📋 RESUMO:');
    console.log(`   • ${testUsers.length} usuários`);
    console.log(`   • ${subscriptionPlans.length} planos de assinatura`);
    console.log(`   • ${sampleEmployees.length} funcionários`);
    console.log(`   • ${sampleTasks.length} tarefas`);
    console.log(`   • ${sampleBudgets.length} orçamentos`);
    console.log(`   • ${samplePayments.length} pagamentos`);
    console.log(`   • 1 parceiro`);
    console.log(`   • 1 fornecedor`);
    console.log(`   • 3 notificações`);
    console.log(`   • 1 configuração eSocial`);
    console.log(`   • 1 certificado digital`);
    console.log(`   • 3 eventos eSocial`);
    
    console.log('\n🔑 CREDENCIAIS DE TESTE:');
    console.log('   Empregador: CPF 12345678901 / senha: senha123');
    console.log('   Empregado:  CPF 11111111111 / senha: senha123');
    console.log('   Familiar:   CPF 22222222222 / senha: senha123');
    console.log('   Admin:      CPF 00000000000 / senha: admin123');
    console.log('   Parceiro:   CPF 33333333333 / senha: parceiro123');
    console.log('   Fornecedor: CPF 44444444444 / senha: fornecedor123');

  } catch (error) {
    console.error('❌ Erro ao gerar dados de teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
if (require.main === module) {
  generateTestData();
}

module.exports = { generateTestData };
