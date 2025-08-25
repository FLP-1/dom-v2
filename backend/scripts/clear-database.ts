import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
    try {
        console.log('🧹 Iniciando limpeza do banco de dados...');
        
        // Limpar tabelas na ordem correta (respeitando foreign keys)
        await prisma.payment.deleteMany({});
        console.log('✅ Pagamentos removidos');
        
        await prisma.employees.deleteMany({});
        console.log('✅ Funcionários removidos');
        
        await prisma.userProfile.deleteMany({});
        console.log('✅ Perfis de usuário removidos');
        
        await prisma.users.deleteMany({});
        console.log('✅ Usuários removidos');
        
        console.log('✅ Limpeza do banco de dados concluída com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro durante a limpeza:', error);
    } finally {
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    clearDatabase();
}

export default clearDatabase;
