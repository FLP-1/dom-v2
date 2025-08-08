#!/usr/bin/env node

/**
 * @fileoverview Script para verificar e atualizar tabelas PostgreSQL
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-06
 */

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

// Configurações
const DB_CONFIG = {
  host: 'localhost',
  user: 'postgres',
  password: 'FLP*2025',
  database: 'db_dom'
};

/**
 * Executa comando psql
 */
async function executePsql(command) {
  const env = { ...process.env, PGPASSWORD: DB_CONFIG.password };
  const psqlCommand = `psql -h ${DB_CONFIG.host} -U ${DB_CONFIG.user} -d ${DB_CONFIG.database} -c "${command}"`;
  
  try {
    const { stdout, stderr } = await execAsync(psqlCommand, { env });
    if (stderr) console.log('Stderr:', stderr);
    return stdout;
  } catch (error) {
    console.error('Erro ao executar psql:', error.message);
    return null;
  }
}

/**
 * Verifica estrutura atual das tabelas
 */
async function verificarEstruturaTabelas() {
  console.log('🔍 VERIFICANDO ESTRUTURA ATUAL DAS TABELAS');
  console.log('==========================================\n');

  const tabelas = [
    'users', 'employees', 'budgets', 'payrolls', 
    'payments', 'purchases', 'tasks', 'notifications',
    'groups', 'user_group_roles', 'user_sessions'
  ];

  for (const tabela of tabelas) {
    console.log(`📋 Tabela: ${tabela}`);
    console.log('─'.repeat(50));
    
    const resultado = await executePsql(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = '${tabela}' 
      ORDER BY ordinal_position;
    `);
    
    if (resultado) {
      console.log(resultado);
    } else {
      console.log('❌ Erro ao consultar tabela');
    }
    console.log('\n');
  }
}

/**
 * Verifica se as tabelas existem
 */
async function verificarExistenciaTabelas() {
  console.log('🔍 VERIFICANDO EXISTÊNCIA DAS TABELAS');
  console.log('=====================================\n');

  const resultado = await executePsql(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `);

  if (resultado) {
    console.log(resultado);
  } else {
    console.log('❌ Erro ao verificar tabelas');
  }
}

/**
 * Aplica as mudanças usando Prisma
 */
async function aplicarMudancasPrisma() {
  console.log('🔄 APLICANDO MUDANÇAS COM PRISMA');
  console.log('=================================\n');

  try {
    console.log('1️⃣ Gerando Prisma Client...');
    await execAsync('npx prisma generate');
    console.log('✅ Prisma Client gerado\n');

    console.log('2️⃣ Aplicando mudanças no banco...');
    await execAsync('npx prisma db push --force-reset');
    console.log('✅ Mudanças aplicadas\n');

    console.log('3️⃣ Executando seed...');
    await execAsync('npx ts-node prisma/seed-robusto.ts');
    console.log('✅ Seed executado\n');

  } catch (error) {
    console.error('❌ Erro ao aplicar mudanças:', error.message);
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🚀 INICIANDO VERIFICAÇÃO E ATUALIZAÇÃO DAS TABELAS');
  console.log('==================================================\n');

  // Verificar se PostgreSQL está rodando
  console.log('1️⃣ Verificando conexão com PostgreSQL...');
  const testConnection = await executePsql('SELECT version();');
  if (testConnection) {
    console.log('✅ PostgreSQL conectado\n');
  } else {
    console.log('❌ Erro de conexão com PostgreSQL');
    console.log('💡 Verifique se o serviço está rodando:');
    console.log('   Get-Service -Name "*postgres*"');
    console.log('   Start-Service postgresql-x64-17');
    return;
  }

  // Verificar existência das tabelas
  await verificarExistenciaTabelas();

  // Verificar estrutura atual
  await verificarEstruturaTabelas();

  // Aplicar mudanças
  await aplicarMudancasPrisma();

  console.log('🎉 PROCESSO CONCLUÍDO!');
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
