const { PrismaClient } = require('./src/generated/prisma');

const prisma = new PrismaClient();

async function testSeed() {
  try {
    console.log('🔍 Testando conexão com Prisma...');
    
    // Testar conexão
    await prisma.$connect();
    console.log('✅ Conexão estabelecida');
    
    // Verificar se há tabelas
    const userCount = await prisma.user.count();
    console.log(`📊 Usuários na tabela: ${userCount}`);
    
    // Tentar criar um usuário de teste
    const testUser = await prisma.user.create({
      data: {
        name: 'Teste Usuário',
        nickname: 'teste',
        cpf: '12345678901',
        email: 'teste@teste.com',
        password_hash: 'teste123',
        profile: 'employer',
        active: true
      }
    });
    
    console.log('✅ Usuário de teste criado:', testUser.id);
    
    // Limpar usuário de teste
    await prisma.user.delete({
      where: { id: testUser.id }
    });
    
    console.log('✅ Usuário de teste removido');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testSeed();
