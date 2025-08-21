const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Função para gerar ID único
function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

async function generateDocumentsTest() {
  try {
    console.log('🚀 Iniciando geração de documentos de teste...');

    // 1. Buscar usuário existente
    console.log('👤 Buscando usuário existente...');
    const user = await prisma.users.findFirst({
      where: { email: { contains: 'teste.com' } }
    });

    if (!user) {
      console.log('❌ Nenhum usuário de teste encontrado. Execute primeiro o script de geração de usuários.');
      return;
    }

    console.log(`✅ Usuário encontrado: ${user.name} (${user.email})`);

    // 2. Buscar categorias existentes
    console.log('📁 Buscando categorias existentes...');
    const categories = await prisma.documentCategory.findMany({
      where: { active: true }
    });

    if (categories.length === 0) {
      console.log('❌ Nenhuma categoria encontrada.');
      return;
    }

    console.log(`✅ ${categories.length} categorias encontradas`);

    // 3. Buscar funcionário existente
    console.log('👷 Buscando funcionário existente...');
    const employee = await prisma.employees.findFirst({
      where: { user_id: user.id }
    });

    if (!employee) {
      console.log('⚠️ Nenhum funcionário encontrado. Documentos serão criados sem funcionário associado.');
    } else {
      console.log(`✅ Funcionário encontrado: ${employee.name}`);
    }

    // 4. Criar documentos de teste
    console.log('📄 Criando documentos de teste...');
    const sampleDocuments = [
      {
        name: 'Contrato de Aluguel',
        description: 'Contrato de aluguel do apartamento residencial',
        category_id: categories[0].id,
        employee_id: employee?.id,
        file_name: 'contrato_aluguel.pdf',
        file_path: '/uploads/documents/contrato_aluguel.pdf',
        file_size: 1024000,
        file_type: 'application/pdf',
        file_hash: crypto.randomBytes(32).toString('hex'),
        tags: ['contrato', 'aluguel', 'imóvel'],
        metadata: { tipo: 'contrato', valor: 2500.00, prazo: '12 meses' },
        is_sensitive: true,
        access_level: 'PRIVATE',
        user_id: user.id
      },
      {
        name: 'Nota Fiscal Eletrônica',
        description: 'NF-e da compra de eletrodomésticos',
        category_id: categories[1]?.id || categories[0].id,
        employee_id: employee?.id,
        file_name: 'nfe_eletrodomesticos.pdf',
        file_path: '/uploads/documents/nfe_eletrodomesticos.pdf',
        file_size: 512000,
        file_type: 'application/pdf',
        file_hash: crypto.randomBytes(32).toString('hex'),
        tags: ['nfe', 'eletrodomésticos', 'compra'],
        metadata: { valor: 1500.00, fornecedor: 'Loja ABC' },
        is_sensitive: false,
        access_level: 'PRIVATE',
        user_id: user.id
      },
      {
        name: 'Extrato Bancário',
        description: 'Extrato da conta corrente - Janeiro 2025',
        category_id: categories.find(c => c.name.includes('Bancário'))?.id || categories[0].id,
        employee_id: employee?.id,
        file_name: 'extrato_banco.pdf',
        file_path: '/uploads/documents/extrato_banco.pdf',
        file_size: 256000,
        file_type: 'application/pdf',
        file_hash: crypto.randomBytes(32).toString('hex'),
        tags: ['extrato', 'banco', 'financeiro'],
        metadata: { banco: 'Banco XYZ', conta: '12345-6' },
        is_sensitive: true,
        access_level: 'PRIVATE',
        user_id: user.id
      },
      {
        name: 'Receita Médica',
        description: 'Receita médica para tratamento',
        category_id: categories.find(c => c.name.includes('Médico'))?.id || categories[0].id,
        employee_id: employee?.id,
        file_name: 'receita_medica.pdf',
        file_path: '/uploads/documents/receita_medica.pdf',
        file_size: 128000,
        file_type: 'application/pdf',
        file_hash: crypto.randomBytes(32).toString('hex'),
        tags: ['receita', 'médico', 'saúde'],
        metadata: { medico: 'Dr. Silva', especialidade: 'Cardiologia' },
        is_sensitive: true,
        access_level: 'PRIVATE',
        user_id: user.id
      },
      {
        name: 'Diploma Universitário',
        description: 'Diploma de graduação em Administração',
        category_id: categories.find(c => c.name.includes('Escolar'))?.id || categories[0].id,
        employee_id: employee?.id,
        file_name: 'diploma_administracao.pdf',
        file_path: '/uploads/documents/diploma_administracao.pdf',
        file_size: 2048000,
        file_type: 'application/pdf',
        file_hash: crypto.randomBytes(32).toString('hex'),
        tags: ['diploma', 'universidade', 'educação'],
        metadata: { universidade: 'Universidade XYZ', curso: 'Administração' },
        is_sensitive: false,
        access_level: 'PRIVATE',
        user_id: user.id
      }
    ];

    for (const docData of sampleDocuments) {
      const document = await prisma.document.create({
        data: {
          id: generateId(),
          ...docData
        }
      });
      console.log(`✅ Documento criado: ${document.name}`);
    }

    console.log('\n🎉 Documentos de teste gerados com sucesso!');
    console.log('\n📊 RESUMO:');
    console.log(`📄 ${sampleDocuments.length} documentos criados`);
    console.log(`👤 Usuário: ${user.name}`);
    console.log(`📁 Categorias utilizadas: ${categories.length}`);

    console.log('\n🔑 PARA TESTAR:');
    console.log(`Use o usuário: ${user.email}`);
    console.log('Senha: 123456');

  } catch (error) {
    console.error('❌ Erro ao gerar documentos de teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  generateDocumentsTest();
}

module.exports = { generateDocumentsTest };
