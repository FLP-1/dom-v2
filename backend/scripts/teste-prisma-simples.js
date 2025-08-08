const { PrismaClient } = require('../src/generated/prisma');

console.log('🔌 Testando Prisma...');

const prisma = new PrismaClient();

async function testar() {
  try {
    console.log('📡 Conectando...');
    await prisma.$connect();
    console.log('✅ Conectado!');
    
    console.log('📊 Testando query...');
    const count = await prisma.user.count();
    console.log(`👥 Usuários: ${count}`);
    
    await prisma.$disconnect();
    console.log('✅ Desconectado!');
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

testar();
