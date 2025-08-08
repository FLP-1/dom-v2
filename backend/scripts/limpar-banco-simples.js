#!/usr/bin/env node

/**
 * @fileoverview Script simples para limpeza da base de dados
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
 * Limpa todas as tabelas
 */
async function clearAllTables() {
  console.log('🧹 LIMPEZA SIMPLES DA BASE DE DADOS');
  console.log('====================================');
  console.log(`📅 Data: ${new Date().toLocaleString('pt-BR')}\n`);
  
  try {
    // Testar conexão
    console.log('🔌 Testando conexão...');
    const test = await executeSQL('SELECT 1 as test;');
    console.log('✅ Conexão OK:', test);
    
    // Listar tabelas
    console.log('\n📋 Listando tabelas...');
    const tables = await executeSQL("SELECT tablename FROM pg_tables WHERE schemaname = 'public';");
    console.log('Tabelas encontradas:', tables);
    
    // Limpar tabelas na ordem correta
    const clearCommands = [
      'DELETE FROM user_sessions;',
      'DELETE FROM user_group_roles;',
      'DELETE FROM notifications;',
      'DELETE FROM tasks;',
      'DELETE FROM payrolls;',
      'DELETE FROM payments;',
      'DELETE FROM purchases;',
      'DELETE FROM budgets;',
      'DELETE FROM employees;',
      'DELETE FROM groups;',
      'DELETE FROM users;'
    ];
    
    console.log('\n🗑️ Iniciando limpeza...');
    
    for (const command of clearCommands) {
      try {
        console.log(`Executando: ${command}`);
        const result = await executeSQL(command);
        console.log(`✅ Sucesso: ${result}`);
      } catch (error) {
        console.log(`⚠️ Erro: ${error.message}`);
      }
    }
    
    console.log('\n✅ Limpeza concluída!');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

// Execução principal
if (require.main === module) {
  clearAllTables();
}

module.exports = {
  clearAllTables
};
