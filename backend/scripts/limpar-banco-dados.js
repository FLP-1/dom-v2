#!/usr/bin/env node

/**
 * @fileoverview Script para limpeza completa da base de dados PostgreSQL
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-06
 */

const { exec } = require('child_process');

/**
 * Executa comando SQL no PostgreSQL
 * @param {string} sql - Comando SQL a ser executado
 * @returns {Promise<string>} - Resultado do comando
 */
function executeSQL(sql) {
  return new Promise((resolve, reject) => {
    const command = `psql -U postgres -d db_dom -c "${sql}"`;
    
    exec(command, { 
      env: { ...process.env, PGPASSWORD: 'FLP*2025' },
      maxBuffer: 1024 * 1024 
    }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Limpa dados de uma tabela específica
 * @param {string} tableName - Nome da tabela
 * @param {string} description - Descrição da tabela
 */
async function clearTable(tableName, description) {
  try {
    console.log(`🗑️  Limpando ${description}...`);
    
    // Verificar se a tabela existe
    const exists = await executeSQL(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '${tableName}'
      );
    `);
    
    if (exists.includes('t')) {
      // Contar registros antes da limpeza
      const countBefore = await executeSQL(`SELECT COUNT(*) as total FROM ${tableName};`);
      console.log(`   📊 Registros antes: ${countBefore.match(/\d+/)[0]}`);
      
      // Limpar dados
      await executeSQL(`DELETE FROM ${tableName};`);
      
      // Verificar se foi limpa
      const countAfter = await executeSQL(`SELECT COUNT(*) as total FROM ${tableName};`);
      console.log(`   ✅ Registros depois: ${countAfter.match(/\d+/)[0]}`);
      
      return true;
    } else {
      console.log(`   ⚠️ Tabela ${tableName} não encontrada`);
      return false;
    }
  } catch (error) {
    console.error(`   ❌ Erro ao limpar ${tableName}:`, error.message);
    return false;
  }
}

/**
 * Limpa todas as tabelas na ordem correta (respeitando foreign keys)
 */
async function clearAllTables() {
  console.log('🧹 INICIANDO LIMPEZA COMPLETA DA BASE DE DADOS');
  console.log('==============================================');
  console.log(`📅 Data da limpeza: ${new Date().toLocaleString('pt-BR')}\n`);
  
  try {
    // Verificar conexão
    const connectionTest = await executeSQL('SELECT current_user, current_database();');
    console.log('✅ Conexão estabelecida:');
    console.log(connectionTest);
    
    // Ordem de limpeza (respeitando dependências)
    const tablesToClear = [
      { name: 'user_sessions', description: 'Sessões de usuário' },
      { name: 'user_group_roles', description: 'Roles de usuários em grupos' },
      { name: 'notifications', description: 'Notificações' },
      { name: 'tasks', description: 'Tarefas' },
      { name: 'payrolls', description: 'Folha de pagamento' },
      { name: 'payments', description: 'Pagamentos' },
      { name: 'purchases', description: 'Compras' },
      { name: 'budgets', description: 'Orçamentos' },
      { name: 'employees', description: 'Funcionários' },
      { name: 'groups', description: 'Grupos' },
      { name: 'users', description: 'Usuários' }
    ];
    
    let successCount = 0;
    let totalCount = tablesToClear.length;
    
    for (const table of tablesToClear) {
      const success = await clearTable(table.name, table.description);
      if (success) successCount++;
      console.log(''); // Linha em branco para separar
    }
    
    // Resumo final
    console.log('📋 RESUMO DA LIMPEZA');
    console.log('====================');
    console.log(`✅ Tabelas limpas com sucesso: ${successCount}/${totalCount}`);
    
    if (successCount === totalCount) {
      console.log('🎉 Limpeza completa realizada com sucesso!');
      console.log('💡 Próximo passo: Execute o script de repovoamento');
    } else {
      console.log('⚠️ Algumas tabelas não puderam ser limpas');
    }
    
  } catch (error) {
    console.error('❌ Erro na limpeza:', error.message);
  }
}

/**
 * Confirma se o usuário realmente quer limpar tudo
 */
function confirmCleanup() {
  console.log('⚠️  ATENÇÃO: Esta operação irá APAGAR TODOS os dados!');
  console.log('📋 Tabelas que serão afetadas:');
  console.log('   - users (usuários)');
  console.log('   - employees (funcionários)');
  console.log('   - budgets (orçamentos)');
  console.log('   - payrolls (folha de pagamento)');
  console.log('   - payments (pagamentos)');
  console.log('   - purchases (compras)');
  console.log('   - tasks (tarefas)');
  console.log('   - notifications (notificações)');
  console.log('   - groups (grupos)');
  console.log('   - user_group_roles (roles)');
  console.log('   - user_sessions (sessões)');
  console.log('');
  console.log('🔒 Esta ação NÃO PODE ser desfeita!');
  console.log('📝 Certifique-se de ter backup se necessário.');
  console.log('');
  
  // Simular confirmação (em produção, seria interativo)
  console.log('✅ Confirmação automática: LIMPEZA APROVADA');
  console.log('');
  
  return true;
}

/**
 * Função principal
 */
async function main() {
  if (confirmCleanup()) {
    await clearAllTables();
  } else {
    console.log('❌ Limpeza cancelada pelo usuário');
  }
}

// Execução principal
if (require.main === module) {
  main();
}

module.exports = {
  clearAllTables,
  clearTable
};
