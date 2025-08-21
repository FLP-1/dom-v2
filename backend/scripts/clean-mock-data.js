const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function cleanMockData() {
  try {
    console.log('🧹 Iniciando limpeza de dados mocados...');

    // 1. Remover usuários com emails de teste
    console.log('🗑️ Removendo usuários de teste...');
    const deletedUsers = await prisma.users.deleteMany({
      where: {
        OR: [
          { email: { contains: 'teste.com' } },
          { email: { contains: 'test@' } },
          { email: { contains: 'example.com' } }
        ]
      }
    });
    console.log(`✅ ${deletedUsers.count} usuários de teste removidos`);

    // 2. Remover funcionários sem usuário associado
    console.log('🗑️ Removendo funcionários órfãos...');
    const deletedEmployees = await prisma.employees.deleteMany({
      where: {
        user_id: null
      }
    });
    console.log(`✅ ${deletedEmployees.count} funcionários órfãos removidos`);

    // 3. Remover orçamentos sem usuário associado
    console.log('🗑️ Removendo orçamentos órfãos...');
    const deletedBudgets = await prisma.budget.deleteMany({
      where: {
        user_id: null
      }
    });
    console.log(`✅ ${deletedBudgets.count} orçamentos órfãos removidos`);

    // 4. Remover tarefas sem usuário associado
    console.log('🗑️ Removendo tarefas órfãs...');
    const deletedTasks = await prisma.task.deleteMany({
      where: {
        user_id: null
      }
    });
    console.log(`✅ ${deletedTasks.count} tarefas órfãs removidas`);

    // 5. Remover documentos sem usuário associado
    console.log('🗑️ Removendo documentos órfãos...');
    const deletedDocuments = await prisma.document.deleteMany({
      where: {
        user_id: null
      }
    });
    console.log(`✅ ${deletedDocuments.count} documentos órfãos removidos`);

    // 6. Remover categorias de documentos vazias
    console.log('🗑️ Removendo categorias vazias...');
    const categories = await prisma.documentCategory.findMany({
      include: {
        _count: {
          select: { documents: true }
        }
      }
    });

    for (const category of categories) {
      if (category._count.documents === 0) {
        await prisma.documentCategory.delete({
          where: { id: category.id }
        });
        console.log(`✅ Categoria vazia removida: ${category.name}`);
      }
    }

    console.log('\n🎉 Limpeza de dados mocados concluída!');
    console.log('\n📊 RESUMO DA LIMPEZA:');
    console.log(`👥 ${deletedUsers.count} usuários removidos`);
    console.log(`👷 ${deletedEmployees.count} funcionários removidos`);
    console.log(`💰 ${deletedBudgets.count} orçamentos removidos`);
    console.log(`📋 ${deletedTasks.count} tarefas removidas`);
    console.log(`📄 ${deletedDocuments.count} documentos removidos`);

  } catch (error) {
    console.error('❌ Erro ao limpar dados mocados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  cleanMockData();
}

module.exports = { cleanMockData };
