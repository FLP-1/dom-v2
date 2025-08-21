const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

// Função para gerar CPF válido
function generateValidCPF() {
  // Gerar 9 dígitos aleatórios
  let cpf = '';
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10);
  }

  // Calcular primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  cpf += digit1;

  // Calcular segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  cpf += digit2;

  return cpf;
}

// Função para gerar ID único
function generateId() {
  return crypto.randomBytes(16).toString('hex');
}

// Dados de teste
const testUsers = [
  {
    name: 'João Silva',
    email: 'joao.silva@teste.com',
    cpf: generateValidCPF(),
    profile: 'employer',
    phone: '(11) 99999-1111'
  },
  {
    name: 'Maria Santos',
    email: 'maria.santos@teste.com',
    cpf: generateValidCPF(),
    profile: 'employer',
    phone: '(11) 99999-2222'
  },
  {
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@teste.com',
    cpf: generateValidCPF(),
    profile: 'employer',
    phone: '(11) 99999-3333'
  }
];

const testEmployees = [
  {
    name: 'Roberto Almeida',
    cpf: generateValidCPF(),
    position: 'Auxiliar de Limpeza',
    salary: 1500.00,
    status: 'active'
  },
  {
    name: 'Lucia Pereira',
    cpf: generateValidCPF(),
    position: 'Cozinheira',
    salary: 1800.00,
    status: 'active'
  },
  {
    name: 'Fernando Lima',
    cpf: generateValidCPF(),
    position: 'Jardineiro',
    salary: 1600.00,
    status: 'active'
  },
  {
    name: 'Sandra Rodrigues',
    cpf: generateValidCPF(),
    position: 'Lavadeira',
    salary: 1400.00,
    status: 'active'
  },
  {
    name: 'Antonio Souza',
    cpf: generateValidCPF(),
    position: 'Motorista',
    salary: 2000.00,
    status: 'active'
  }
];

const testCategories = [
  { name: 'Documentos Contratuais', description: 'Contratos diversos', icon: '📄', color: '#3B82F6' },
  { name: 'Documentos Fiscais', description: 'Notas fiscais e recibos', icon: '🧾', color: '#10B981' },
  { name: 'Documentos Pessoais', description: 'RG, CPF, certidões', icon: '🆔', color: '#F59E0B' },
  { name: 'Documentos Bancários', description: 'Extratos e comprovantes', icon: '🏦', color: '#8B5CF6' },
  { name: 'Documentos Médicos', description: 'Exames e receitas', icon: '🏥', color: '#EF4444' },
  { name: 'Documentos Escolares', description: 'Diplomas e certificados', icon: '🎓', color: '#06B6D4' },
  { name: 'Documentos Imobiliários', description: 'Escrituras e contratos', icon: '🏠', color: '#84CC16' },
  { name: 'Documentos Veiculares', description: 'Documentação de veículos', icon: '🚗', color: '#F97316' }
];

const testBudgets = [
  {
    name: 'Alimentação',
    amount: 800.00,
    category: 'FOOD',
    start_date: new Date(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    name: 'Transporte',
    amount: 300.00,
    category: 'TRANSPORT',
    start_date: new Date(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    name: 'Lazer',
    amount: 200.00,
    category: 'ENTERTAINMENT',
    start_date: new Date(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    name: 'Saúde',
    amount: 150.00,
    category: 'HEALTH',
    start_date: new Date(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    name: 'Educação',
    amount: 500.00,
    category: 'EDUCATION',
    start_date: new Date(),
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active'
  }
];

const testTasks = [
  {
    title: 'Pagar contas',
    description: 'Pagar contas de luz, água e internet',
    status: 'pending',
    priority: 1,
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    category: 'FINANCE'
  },
  {
    title: 'Agendar consulta médica',
    description: 'Agendar consulta com cardiologista',
    status: 'pending',
    priority: 2,
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    category: 'HEALTH'
  },
  {
    title: 'Comprar material escolar',
    description: 'Comprar livros e material para as crianças',
    status: 'pending',
    priority: 1,
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    category: 'EDUCATION'
  },
  {
    title: 'Manutenção do carro',
    description: 'Levar o carro para revisão',
    status: 'pending',
    priority: 2,
    due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    category: 'TRANSPORT'
  },
  {
    title: 'Organizar documentos',
    description: 'Organizar documentos pessoais e familiares',
    status: 'pending',
    priority: 3,
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    category: 'ORGANIZATION'
  }
];

async function generateTestData() {
  try {
    console.log('🚀 Iniciando geração de dados de teste...');

    // 1. Criar usuários de teste
    console.log('📝 Criando usuários de teste...');
    const createdUsers = [];
    for (const userData of testUsers) {
      const user = await prisma.users.create({
        data: {
          name: userData.name,
          email: userData.email,
          cpf: userData.cpf,
          profile: userData.profile,
          phone: userData.phone,
          password_hash: crypto.createHash('sha256').update('123456').digest('hex'),
          active: true
        }
      });
      createdUsers.push(user);
      console.log(`✅ Usuário criado: ${user.name} (${user.email})`);
    }

    // 2. Criar categorias de documentos
    console.log('📁 Criando categorias de documentos...');
    const createdCategories = [];
    for (const categoryData of testCategories) {
      const category = await prisma.documentCategory.create({
        data: {
          name: categoryData.name,
          description: categoryData.description,
          icon: categoryData.icon,
          color: categoryData.color,
          active: true
        }
      });
      createdCategories.push(category);
      console.log(`✅ Categoria criada: ${category.name}`);
    }

    // 3. Criar funcionários (associados ao primeiro usuário)
    console.log('👥 Criando funcionários...');
    const createdEmployees = [];
    for (const employeeData of testEmployees) {
      const employee = await prisma.employees.create({
        data: {
          id: generateId(),
          name: employeeData.name,
          cpf: employeeData.cpf,
          position: employeeData.position,
          salary: employeeData.salary,
          status: employeeData.status,
          user_id: createdUsers[0].id
        }
      });
      createdEmployees.push(employee);
      console.log(`✅ Funcionário criado: ${employee.name} (${employee.position})`);
    }

    // 4. Criar orçamentos (associados ao primeiro usuário)
    console.log('💰 Criando orçamentos...');
    for (const budgetData of testBudgets) {
      const budget = await prisma.budget.create({
        data: {
          id: generateId(),
          name: budgetData.name,
          amount: budgetData.amount,
          category: budgetData.category,
          start_date: budgetData.start_date,
          end_date: budgetData.end_date,
          status: budgetData.status,
          user_id: createdUsers[0].id
        }
      });
      console.log(`✅ Orçamento criado: ${budget.name} (R$ ${budget.amount})`);
    }

    // 5. Criar tarefas (associadas ao primeiro usuário)
    console.log('📋 Criando tarefas...');
    for (const taskData of testTasks) {
      const task = await prisma.tasks.create({
        data: {
          id: generateId(),
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,
          due_date: taskData.due_date,
          category: taskData.category,
          creator_id: createdUsers[0].id,
          active: true
        }
      });
      console.log(`✅ Tarefa criada: ${task.title}`);
    }

    // 6. Criar alguns documentos de exemplo
    console.log('📄 Criando documentos de exemplo...');
    const sampleDocuments = [
      {
        name: 'Contrato de Aluguel',
        description: 'Contrato de aluguel do apartamento',
        category_id: createdCategories[0].id,
        employee_id: createdEmployees[0].id,
        file_name: 'contrato_aluguel.pdf',
        file_path: '/uploads/documents/contrato_aluguel.pdf',
        file_size: 1024000,
        file_type: 'application/pdf',
        file_hash: crypto.randomBytes(32).toString('hex'),
        tags: ['contrato', 'aluguel', 'imóvel'],
        metadata: { tipo: 'contrato', valor: 2500.00 },
        is_sensitive: true,
        access_level: 'PRIVATE',
        user_id: createdUsers[0].id
      },
      {
        name: 'Nota Fiscal Eletrônica',
        description: 'NF-e da compra de eletrodomésticos',
        category_id: createdCategories[1].id,
        file_name: 'nfe_eletrodomesticos.pdf',
        file_path: '/uploads/documents/nfe_eletrodomesticos.pdf',
        file_size: 512000,
        file_type: 'application/pdf',
        file_hash: crypto.randomBytes(32).toString('hex'),
        tags: ['nfe', 'eletrodomésticos', 'compra'],
        metadata: { valor: 1500.00, fornecedor: 'Loja ABC' },
        is_sensitive: false,
        access_level: 'PRIVATE',
        user_id: createdUsers[0].id
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

    console.log('\n🎉 Dados de teste gerados com sucesso!');
    console.log('\n📊 RESUMO:');
    console.log(`👥 ${createdUsers.length} usuários criados`);
    console.log(`📁 ${createdCategories.length} categorias de documentos criadas`);
    console.log(`👷 ${createdEmployees.length} funcionários criados`);
    console.log(`💰 ${testBudgets.length} orçamentos criados`);
    console.log(`📋 ${testTasks.length} tarefas criadas`);
    console.log(`📄 ${sampleDocuments.length} documentos de exemplo criados`);

    console.log('\n🔑 CREDENCIAIS DE TESTE:');
    console.log('Usuário Principal (OWNER):');
    console.log(`Email: ${createdUsers[0].email}`);
    console.log(`CPF: ${createdUsers[0].cpf}`);
    console.log('Senha: 123456');

    console.log('\nUsuário Administrador (ADMIN):');
    console.log(`Email: ${createdUsers[1].email}`);
    console.log(`CPF: ${createdUsers[1].cpf}`);
    console.log('Senha: 123456');

  } catch (error) {
    console.error('❌ Erro ao gerar dados de teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  generateTestData();
}

module.exports = { generateTestData };
