const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedPlans() {
  try {
    console.log('🌱 Iniciando seed dos planos...');

    // Limpar planos existentes
    await prisma.subscriptionPlan.deleteMany({});
    console.log('✅ Planos existentes removidos');

    // Criar planos
    const plans = [
      {
        name: 'basic',
        display_name: 'Plano Básico',
        description: 'Ideal para pequenas empresas e profissionais autônomos',
        price: 29.90,
        currency: 'BRL',
        interval: 'mensal',
        duration_days: 30,
        features: [
          'Gestão de usuários (até 5 usuários)',
          'Sistema de ponto básico',
          'Gestão financeira simples',
          'Sistema de tarefas',
          'Relatórios básicos',
          'Suporte por email'
        ],
        limits: {
          users: 5,
          documents: 100,
          storage: '1GB',
          reports: 'básicos'
        },
        active: true
      },
      {
        name: 'professional',
        display_name: 'Plano Profissional',
        description: 'Perfeito para empresas em crescimento',
        price: 79.90,
        currency: 'BRL',
        interval: 'mensal',
        duration_days: 30,
        features: [
          'Todas as funcionalidades do Plano Básico',
          'Gestão de usuários (até 20 usuários)',
          'Sistema de RH completo',
          'Gestão de documentos avançada',
          'Sistema de notificações',
          'Comunicação interna',
          'Gamificação e recompensas',
          'Relatórios avançados',
          'Suporte prioritário'
        ],
        limits: {
          users: 20,
          documents: 1000,
          storage: '10GB',
          reports: 'avançados'
        },
        active: true
      },
      {
        name: 'enterprise',
        display_name: 'Plano Enterprise',
        description: 'Solução completa para grandes empresas',
        price: 199.90,
        currency: 'BRL',
        interval: 'mensal',
        duration_days: 30,
        features: [
          'Todas as funcionalidades do Plano Profissional',
          'Usuários ilimitados',
          'Sistema de qualidade e inspeção',
          'Integrações avançadas',
          'API personalizada',
          'White label',
          'Relatórios customizados',
          'Suporte 24/7',
          'Treinamento personalizado'
        ],
        limits: {
          users: 'ilimitado',
          documents: 'ilimitado',
          storage: '100GB',
          reports: 'customizados'
        },
        active: true
      }
    ];

    for (const plan of plans) {
      await prisma.subscriptionPlan.create({
        data: plan
      });
      console.log(`✅ Plano ${plan.display_name} criado`);
    }

    console.log('🎉 Seed dos planos concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPlans();
