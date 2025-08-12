const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function generateSimpleTestData() {
  console.log('🚀 Iniciando geração de dados simples para teste eSocial...\n');

  try {
    // 1. Criar usuário empregador
    console.log('👤 Criando usuário empregador...');
    const password_hash = await bcrypt.hash('senha123', 10);
    
    const employer = await prisma.users.upsert({
      where: { cpf: '12345678901' },
      update: {},
      create: {
        name: 'João Silva - Empregador',
        cpf: '12345678901',
        email: 'joao.silva@email.com',
        profile: 'employer',
        password_hash,
        active: true,
        platforms: ['web'],
        permissions: ['basic']
      }
    });
    console.log('✅ Usuário empregador criado!\n');

    // 2. Criar configuração eSocial
    console.log('🏛️ Criando configuração eSocial...');
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
    console.log('✅ Configuração eSocial criada!\n');

    // 3. Criar certificado digital
    console.log('🔐 Criando certificado digital...');
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
    console.log('✅ Certificado digital criado!\n');

    // 4. Criar eventos eSocial
    console.log('📋 Criando eventos eSocial...');
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
    console.log('✅ 3 eventos eSocial criados!\n');

    console.log('🎉 DADOS eSOCIAL GERADOS COM SUCESSO!');
    console.log('\n📋 RESUMO:');
    console.log(`   • 1 usuário empregador`);
    console.log(`   • 1 configuração eSocial`);
    console.log(`   • 1 certificado digital`);
    console.log(`   • 3 eventos eSocial (aceito, pendente, erro)`);
    
    console.log('\n🔑 CREDENCIAIS DE TESTE:');
    console.log('   Empregador: CPF 12345678901 / senha: senha123');

  } catch (error) {
    console.error('❌ Erro ao gerar dados de teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar o script
if (require.main === module) {
  generateSimpleTestData();
}

module.exports = { generateSimpleTestData };
