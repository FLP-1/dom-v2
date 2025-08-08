#!/usr/bin/env node

/**
 * @fileoverview Script para análise arquitetural da base de dados
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-06
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

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
 * Analisa estrutura das tabelas
 */
async function analyzeTableStructure() {
  console.log('🏗️ ANALISANDO ESTRUTURA DAS TABELAS');
  console.log('===================================');
  
  try {
    // Listar todas as tabelas
    const tables = await executeSQL(`
      SELECT table_name, table_type
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);
    
    console.log('\n📋 Tabelas existentes:');
    console.log(tables);
    
    // Analisar estrutura de cada tabela
    const tableNames = ['users', 'employees', 'budgets', 'payrolls', 'payments', 'purchases', 'tasks', 'notifications', 'groups', 'user_group_roles', 'user_sessions'];
    
    for (const tableName of tableNames) {
      try {
        const structure = await executeSQL(`
          SELECT 
            column_name,
            data_type,
            is_nullable,
            column_default,
            character_maximum_length
          FROM information_schema.columns 
          WHERE table_name = '${tableName}'
          ORDER BY ordinal_position;
        `);
        
        console.log(`\n🔍 Estrutura da tabela ${tableName}:`);
        console.log(structure);
      } catch (error) {
        console.log(`⚠️ Tabela ${tableName} não encontrada ou erro na consulta`);
      }
    }
    
  } catch (error) {
    console.error('❌ Erro ao analisar estrutura:', error.message);
  }
}

/**
 * Analisa relacionamentos entre tabelas
 */
async function analyzeRelationships() {
  console.log('\n🔗 ANALISANDO RELACIONAMENTOS ENTRE TABELAS');
  console.log('===========================================');
  
  try {
    // Verificar chaves estrangeiras
    const foreignKeys = await executeSQL(`
      SELECT 
        tc.table_name, 
        kcu.column_name, 
        ccu.table_name AS foreign_table_name,
        ccu.column_name AS foreign_column_name 
      FROM information_schema.table_constraints AS tc 
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY'
      AND tc.table_schema = 'public';
    `);
    
    console.log('\n🔗 Chaves estrangeiras identificadas:');
    console.log(foreignKeys);
    
  } catch (error) {
    console.error('❌ Erro ao analisar relacionamentos:', error.message);
  }
}

/**
 * Analisa funcionalidades implementadas no frontend
 */
async function analyzeFrontendFeatures() {
  console.log('\n🎨 ANALISANDO FUNCIONALIDADES DO FRONTEND');
  console.log('=========================================');
  
  try {
    // Verificar componentes e telas existentes
    const frontendPath = path.join(__dirname, '../../frontend/src');
    
    if (fs.existsSync(frontendPath)) {
      console.log('\n📱 Componentes encontrados:');
      
      // Verificar componentes de orçamento
      const budgetComponents = fs.readdirSync(path.join(frontendPath, 'components/budget'), { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);
      
      console.log('💰 Componentes de Orçamento:', budgetComponents);
      
      // Verificar componentes de folha de pagamento
      const payrollComponents = fs.readdirSync(path.join(frontendPath, 'components/payroll'), { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);
      
      console.log('💼 Componentes de Folha de Pagamento:', payrollComponents);
      
      // Verificar telas
      const screens = fs.readdirSync(path.join(frontendPath, 'screens'), { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);
      
      console.log('🖥️ Telas encontradas:', screens);
      
      // Verificar hooks
      const hooks = fs.readdirSync(path.join(frontendPath, 'hooks'), { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);
      
      console.log('🎣 Hooks encontrados:', hooks);
      
    } else {
      console.log('⚠️ Diretório frontend não encontrado');
    }
    
  } catch (error) {
    console.error('❌ Erro ao analisar frontend:', error.message);
  }
}

/**
 * Analisa APIs implementadas no backend
 */
async function analyzeBackendAPIs() {
  console.log('\n🔌 ANALISANDO APIS DO BACKEND');
  console.log('==============================');
  
  try {
    const routesPath = path.join(__dirname, '../src/routes');
    
    if (fs.existsSync(routesPath)) {
      console.log('\n🛣️ Rotas encontradas:');
      
      const routes = fs.readdirSync(routesPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);
      
      console.log(routes);
      
      // Analisar cada rota
      for (const route of routes) {
        try {
          const routeContent = fs.readFileSync(path.join(routesPath, route), 'utf8');
          const endpoints = routeContent.match(/\.(get|post|put|delete|patch)\s*\(/g) || [];
          
          console.log(`\n📡 Endpoints em ${route}:`, endpoints.length);
        } catch (error) {
          console.log(`⚠️ Erro ao ler rota ${route}`);
        }
      }
    } else {
      console.log('⚠️ Diretório de rotas não encontrado');
    }
    
  } catch (error) {
    console.error('❌ Erro ao analisar APIs:', error.message);
  }
}

/**
 * Analisa alinhamento entre frontend, backend e banco
 */
async function analyzeAlignment() {
  console.log('\n🎯 ANALISANDO ALINHAMENTO ENTRE FRONTEND, BACKEND E BANCO');
  console.log('==========================================================');
  
  try {
    // Verificar se as tabelas suportam as funcionalidades
    const requiredTables = {
      'users': ['autenticação', 'perfis', 'sessões'],
      'employees': ['gestão de funcionários', 'folha de pagamento'],
      'budgets': ['controle de orçamento', 'categorias'],
      'payrolls': ['folha de pagamento', 'cálculos'],
      'payments': ['pagamentos', 'transações'],
      'purchases': ['compras', 'despesas'],
      'tasks': ['tarefas', 'controle de jornada'],
      'notifications': ['notificações', 'alertas'],
      'groups': ['grupos', 'permissões'],
      'user_group_roles': ['roles', 'permissões'],
      'user_sessions': ['sessões', 'segurança']
    };
    
    console.log('\n📊 Análise de cobertura funcional:');
    
    for (const [table, features] of Object.entries(requiredTables)) {
      try {
        const exists = await executeSQL(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = '${table}'
          );
        `);
        
        if (exists.includes('t')) {
          console.log(`✅ ${table}: Suporta ${features.join(', ')}`);
        } else {
          console.log(`❌ ${table}: FALTANDO - Suportaria ${features.join(', ')}`);
        }
      } catch (error) {
        console.log(`⚠️ ${table}: Erro na verificação`);
      }
    }
    
  } catch (error) {
    console.error('❌ Erro ao analisar alinhamento:', error.message);
  }
}

/**
 * Analisa todas as dimensões
 */
async function analyzeAllDimensions() {
  console.log('📊 ANÁLISE ARQUITETURAL COMPLETA DA BASE DE DADOS');
  console.log('=================================================');
  console.log(`📅 Data da análise: ${new Date().toLocaleString('pt-BR')}\n`);
  
  try {
    // Verificar conexão
    const connectionTest = await executeSQL('SELECT current_user, current_database();');
    console.log('✅ Conexão estabelecida:');
    console.log(connectionTest);
    
    // Executar análises
    await analyzeTableStructure();
    await analyzeRelationships();
    await analyzeFrontendFeatures();
    await analyzeBackendAPIs();
    await analyzeAlignment();
    
    console.log('\n✅ Análise arquitetural concluída!');
    
  } catch (error) {
    console.error('❌ Erro na análise:', error.message);
  }
}

// Execução principal
if (require.main === module) {
  analyzeAllDimensions();
}

module.exports = {
  analyzeAllDimensions,
  analyzeTableStructure,
  analyzeRelationships,
  analyzeFrontendFeatures,
  analyzeBackendAPIs,
  analyzeAlignment
};
