const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
    try {
        console.log('🔍 Testando conexão com o banco...');
        
        // Testar conexão
        await prisma.$connect();
        console.log('✅ Conectado ao banco de dados');
        
        // Verificar se há usuários
        const users = await prisma.users.findMany();
        console.log('👥 Usuários encontrados:', users.length);
        
        if (users.length > 0) {
            users.forEach(user => {
                console.log(`- ${user.name} (${user.cpf}) - Active: ${user.active}`);
            });
        }
        
        // Verificar se há perfis
        const profiles = await prisma.userProfile.findMany();
        console.log('👤 Perfis encontrados:', profiles.length);
        
        await prisma.$disconnect();
        console.log('✅ Teste concluído');
        
    } catch (error) {
        console.error('❌ Erro no teste:', error);
        await prisma.$disconnect();
    }
}

testDatabase();
