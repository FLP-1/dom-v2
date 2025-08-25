import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedDatabase() {
    try {
        console.log('🌱 Iniciando seed do banco de dados...');
        
        const adminPassword = await bcrypt.hash('admin123', 10);
        const userPassword = await bcrypt.hash('user123', 10);

        console.log('🔑 Senhas hash geradas');

        // Criar usuário admin
        const adminUser = await prisma.users.upsert({
            where: { cpf: '11144477735' },
            update: {},
            create: {
                name: 'João Silva',
                nickname: 'João',
                cpf: '11144477735',
                email: 'joao.silva@dom.com',
                password_hash: adminPassword,
                profile: 'Admin',
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
        });

        console.log('✅ Usuário admin criado:', adminUser.id);

        // Criar perfis para o admin
        await prisma.userProfile.upsert({
            where: { 
                userId_profileType_contextId: {
                    userId: adminUser.id,
                    profileType: 'ADMIN',
                    contextId: 'main-business'
                }
            },
            update: {},
            create: {
                userId: adminUser.id,
                profileType: 'ADMIN',
                contextId: 'main-business',
                isPrimary: true,
                isActive: true,
                metadata: {
                    name: 'Administrador',
                    role: 'Admin',
                    avatar: '👨‍💼',
                    description: 'Acesso total ao sistema'
                }
            },
        });

        await prisma.userProfile.upsert({
            where: { 
                userId_profileType_contextId: {
                    userId: adminUser.id,
                    profileType: 'EMPLOYER',
                    contextId: 'main-business'
                }
            },
            update: {},
            create: {
                userId: adminUser.id,
                profileType: 'EMPLOYER',
                contextId: 'main-business',
                isPrimary: false,
                isActive: true,
                metadata: {
                    name: 'Empregador',
                    role: 'Employer',
                    avatar: '👔',
                    description: 'Gestão de empregados domésticos'
                }
            },
        });

        await prisma.userProfile.upsert({
            where: { 
                userId_profileType_contextId: {
                    userId: adminUser.id,
                    profileType: 'OWNER',
                    contextId: 'main-business'
                }
            },
            update: {},
            create: {
                userId: adminUser.id,
                profileType: 'OWNER',
                contextId: 'main-business',
                isPrimary: false,
                isActive: true,
                metadata: {
                    name: 'Dono',
                    role: 'Owner',
                    avatar: '👑',
                    description: 'Proprietário do sistema'
                }
            },
        });

        console.log('✅ Perfis do admin criados');

        // Criar usuário comum
        const commonUser = await prisma.users.upsert({
            where: { cpf: '12345678909' },
            update: {},
            create: {
                name: 'Maria Santos',
                nickname: 'Maria',
                cpf: '12345678909',
                email: 'maria.santos@dom.com',
                password_hash: userPassword,
                profile: 'User',
                active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
        });

        console.log('✅ Usuário comum criado:', commonUser.id);

        // Criar perfil para o usuário comum
        await prisma.userProfile.upsert({
            where: { 
                userId_profileType_contextId: {
                    userId: commonUser.id,
                    profileType: 'EMPLOYEE',
                    contextId: 'main-business'
                }
            },
            update: {},
            create: {
                userId: commonUser.id,
                profileType: 'EMPLOYEE',
                contextId: 'main-business',
                isPrimary: true,
                isActive: true,
                metadata: {
                    name: 'Empregado Doméstico',
                    role: 'Employee',
                    avatar: '👩‍💼',
                    description: 'Acesso básico ao sistema'
                }
            },
        });

        console.log('✅ Perfil do usuário comum criado');

        // Criar funcionários
        const employee1 = await prisma.employees.upsert({
            where: { id: 'emp-001' },
            update: {},
            create: {
                id: 'emp-001',
                name: 'Ana Costa',
                cpf: '98765432100',
                position: 'Empregada Doméstica',
                salary: 1500.00,
                status: 'active',
                created_at: new Date(),
                updated_at: new Date()
            },
        });

        const employee2 = await prisma.employees.upsert({
            where: { id: 'emp-002' },
            update: {},
            create: {
                id: 'emp-002',
                name: 'Carlos Oliveira',
                cpf: '55566677788',
                position: 'Jardineiro',
                salary: 1200.00,
                status: 'active',
                created_at: new Date(),
                updated_at: new Date()
            },
        });

        const employee3 = await prisma.employees.upsert({
            where: { id: 'emp-003' },
            update: {},
            create: {
                id: 'emp-003',
                name: 'Lucia Ferreira',
                cpf: '11122233344',
                position: 'Cozinheira',
                salary: 1800.00,
                status: 'active',
                created_at: new Date(),
                updated_at: new Date()
            },
        });

        console.log('✅ Funcionários criados');

        // Criar pagamentos
        await prisma.payment.upsert({
            where: { id: 'pay-001' },
            update: {},
            create: {
                id: 'pay-001',
                amount: 1500.00,
                description: 'Salário de agosto - Ana Costa',
                status: 'paid',
                due_date: new Date('2024-08-01'),
                created_at: new Date(),
                updated_at: new Date()
            },
        });

        await prisma.payment.upsert({
            where: { id: 'pay-002' },
            update: {},
            create: {
                id: 'pay-002',
                amount: 1200.00,
                description: 'Salário de agosto - Carlos Oliveira',
                status: 'paid',
                due_date: new Date('2024-08-01'),
                created_at: new Date(),
                updated_at: new Date()
            },
        });

        await prisma.payment.upsert({
            where: { id: 'pay-003' },
            update: {},
            create: {
                id: 'pay-003',
                amount: 1800.00,
                description: 'Salário de agosto - Lucia Ferreira',
                status: 'paid',
                due_date: new Date('2024-08-01'),
                created_at: new Date(),
                updated_at: new Date()
            },
        });

        console.log('✅ Pagamentos criados');

        // Verificar se os usuários foram criados
        const adminCheck = await prisma.users.findUnique({
            where: { cpf: '11144477735' }
        });

        const userCheck = await prisma.users.findUnique({
            where: { cpf: '12345678909' }
        });

        console.log('🔍 Verificação final:');
        console.log('- Admin existe:', !!adminCheck);
        console.log('- User existe:', !!userCheck);

        if (adminCheck) {
            console.log('- Admin active:', adminCheck.active);
            console.log('- Admin password_hash length:', adminCheck.password_hash.length);
        }

        if (userCheck) {
            console.log('- User active:', userCheck.active);
            console.log('- User password_hash length:', userCheck.password_hash.length);
        }

        console.log('✅ Seed do banco de dados concluído com sucesso!');
        console.log('\n📋 Dados criados:');
        console.log('- Usuários: João Silva, Maria Santos');
        console.log('- Perfis: Administrador, Empregador, Dono, Empregado Doméstico');
        console.log('- Funcionários: 3');
        console.log('- Pagamentos: 3');
        console.log('\n🔑 Credenciais de teste:');
        console.log('Admin: 111.444.777-35 / admin123');
        console.log('User: 123.456.789-09 / user123');
        console.log('🎉 Seed finalizado!');

    } catch (error) {
        console.error('❌ Erro durante o seed:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('🎉 Seed finalizado!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Erro no seed:', error);
            process.exit(1);
        });
}

export default seedDatabase;
