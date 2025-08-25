const { PrismaClient } = require('./src/generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const user = await prisma.user.create({
      data: {
        nome: 'Usuario Teste',
        email: '59876913700',
        senha_hash: hashedPassword,
        cpf: '59876913700',
        perfil: 'empregador',
        ativo: true
      }
    });
    
    console.log('✅ Usuário criado:', user.email);
    console.log('🔑 Senha: 123456');
  } catch (error) {
    console.log('❌ Erro:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser(); 