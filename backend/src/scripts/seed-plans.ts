import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPlans() {
  try {
    console.log('🌱 Iniciando seed dos planos de assinatura...');

    // Limpar planos existentes
    await prisma.subscriptionPlan.deleteMany({});
    console.log('✅ Planos existentes removidos');

    // Criar planos baseados no arquivo "Plano de Assinatura.txt"
    const plans = [
      {
        name: 'free',
        display_name: 'Plano Free',
        description: 'Deguste o DOM sem compromisso: 15 dias gratuitos para experimentar a gestão que organiza até seus sonhos mais bagunçados!',
        tagline: 'Deguste o DOM sem compromisso: 15 dias gratuitos para experimentar a gestão que organiza até seus sonhos mais bagunçados!',
        price_monthly: 0.00,
        price_yearly: 0.00,
        currency: 'BRL',
        interval: 'monthly',
        duration_days: 15,
        trial_days: 15,
        features: [
          'dashboard_basic',
          'timeclock_limited',
          'documents_upload_50mb',
          'community_support'
        ],
        benefits: [
          'Dashboard básico',
          'Registro de ponto limitado',
          'Upload de documentos (até 50MB)',
          'Suporte via comunidade'
        ],
        limits: {
          max_documents: 10,
          max_storage_mb: 50,
          max_users: 1,
          max_tasks: 5
        },
        active: true
      },
      {
        name: 'lar_doce_lar',
        display_name: 'Lar Doce Lar',
        description: 'Cansado de ser o CEO da sua casa? Com este plano, você terceiriza a bagunça e foca no que realmente importa: maratonar séries!',
        tagline: 'Cansado de ser o CEO da sua casa? Com este plano, você terceiriza a bagunça e foca no que realmente importa: maratonar séries!',
        price_monthly: 29.90,
        price_yearly: 299.00,
        currency: 'BRL',
        interval: 'monthly',
        duration_days: 30,
        trial_days: 0,
        features: [
          'dashboard_personalized',
          'collaborative_tasks',
          'smart_timeclock',
          'documents_management_100mb',
          'priority_support'
        ],
        benefits: [
          'Dashboard personalizado',
          'Gestão de tarefas colaborativa',
          'Registro de ponto inteligente',
          'Gestão de documentos (até 100MB)',
          'Suporte prioritário'
        ],
        limits: {
          max_documents: 50,
          max_storage_mb: 100,
          max_users: 5,
          max_tasks: 25
        },
        active: true
      },
      {
        name: 'super_domestica',
        display_name: 'Super Doméstica',
        description: 'Transforme sua casa em um paraíso da organização! Com este plano, até Marie Kondo sentiria inveja.',
        tagline: 'Transforme sua casa em um paraíso da organização! Com este plano, até Marie Kondo sentiria inveja.',
        price_monthly: 49.90,
        price_yearly: 499.00,
        currency: 'BRL',
        interval: 'monthly',
        duration_days: 30,
        trial_days: 0,
        features: [
          'all_lar_doce_lar_features',
          'simplified_financial_management',
          'unified_communication',
          'voice_assistant',
          'purchase_management',
          'personalized_alerts'
        ],
        benefits: [
          'Tudo do Lar Doce Lar',
          'Gestão financeira simplificada',
          'Comunicação unificada (chat e videochamadas)',
          'Assistente virtual (comandos de voz)',
          'Gestão de compras',
          'Alertas personalizados'
        ],
        limits: {
          max_documents: 100,
          max_storage_mb: 250,
          max_users: 10,
          max_tasks: 50,
          max_video_calls: 10
        },
        active: true
      },
      {
        name: 'ultra_pro',
        display_name: 'Ultra Pro',
        description: 'O plano que vai te dar superpoderes domésticos! Organize, planeje e execute com a eficiência de um ninja.',
        tagline: 'O plano que vai te dar superpoderes domésticos! Organize, planeje e execute com a eficiência de um ninja.',
        price_monthly: 79.90,
        price_yearly: 799.00,
        currency: 'BRL',
        interval: 'monthly',
        duration_days: 30,
        trial_days: 0,
        features: [
          'all_super_domestica_features',
          'wearables_integration',
          'personalized_reports',
          'gamification_rewards',
          'subscription_management',
          'esocial_domestic_integration',
          'loan_advance_management'
        ],
        benefits: [
          'Tudo do Super Doméstica',
          'Integração com wearables',
          'Relatórios personalizados',
          'Gamificação (sistema de recompensas)',
          'Gestão de planos de assinatura',
          'Integração com eSocial Doméstico',
          'Gestão de empréstimos e adiantamentos'
        ],
        limits: {
          max_documents: 500,
          max_storage_mb: 1000,
          max_users: 25,
          max_tasks: 100,
          max_video_calls: 50,
          max_reports: 20
        },
        active: true
      },
      {
        name: 'parceria_master',
        display_name: 'Parceria Master',
        description: 'Seja nosso parceiro e conquiste o mundo (ou pelo menos, o mercado doméstico) conosco! Juntos, somos imbatíveis!',
        tagline: 'Seja nosso parceiro e conquiste o mundo (ou pelo menos, o mercado doméstico) conosco! Juntos, somos imbatíveis!',
        price_monthly: 0.00, // Preço personalizado
        price_yearly: 0.00, // Preço personalizado
        currency: 'BRL',
        interval: 'monthly',
        duration_days: 30,
        trial_days: 0,
        features: [
          'all_ultra_pro_features',
          'white_label_interface',
          'strategic_market_data',
          'specialized_technical_support',
          'exclusive_events',
          'multiple_nuclei_management'
        ],
        benefits: [
          'Customização da interface (white label)',
          'Acesso a dados estratégicos do mercado',
          'Suporte técnico especializado',
          'Participação em eventos exclusivos',
          'Gestão de múltiplos núcleos'
        ],
        limits: {
          max_documents: -1, // Ilimitado
          max_storage_mb: -1, // Ilimitado
          max_users: -1, // Ilimitado
          max_tasks: -1, // Ilimitado
          max_video_calls: -1, // Ilimitado
          max_reports: -1 // Ilimitado
        },
        active: true
      }
    ];

    // Inserir planos
    for (const planData of plans) {
      const plan = await prisma.subscriptionPlan.create({
        data: planData
      });
      console.log(`✅ Plano criado: ${plan.display_name}`);
    }

    console.log('🎉 Seed dos planos concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o seed
seedPlans();
