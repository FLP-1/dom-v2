#!/usr/bin/env node

/**
 * @fileoverview Script para testar conexão com Prisma
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-06
 */

const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function testarConexao() {
  console.log('🔌 TESTANDO CONEXÃO COM PRISMA');
  console.log('================================');
  
  try {
    // Testar conexão
    console.log('📡 Testando conexão...');
    await prisma.$connect();
    console.log('✅ Conexão estabelecida!');
    
    // Verificar tabelas
    console.log('\n📋 Verificando tabelas...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    console.log('📊 Tabelas encontradas:');
    tables.forEach(table => {
      console.log(`   - ${table.table_name}`);
    });
    
    // Verificar dados
    console.log('\n📊 Verificando dados...');
    const userCount = await prisma.user.count();
    const employeeCount = await prisma.employee.count();
    const budgetCount = await prisma.budget.count();
    
    console.log(`👥 Usuários: ${userCount}`);
    console.log(`👷 Funcionários: ${employeeCount}`);
    console.log(`💰 Orçamentos: ${budgetCount}`);
    
    if (userCount === 0) {
      console.log('\n⚠️ Nenhum usuário encontrado. Execute o seed!');
    } else {
      console.log('\n✅ Dados encontrados!');
    }
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Executar teste
testarConexao();
