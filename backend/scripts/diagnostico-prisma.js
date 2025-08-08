#!/usr/bin/env node

/**
 * @fileoverview Script de diagnóstico para problemas com Prisma
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-06
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

/**
 * Verifica se arquivo existe
 */
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

/**
 * Lê conteúdo do arquivo
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

/**
 * Executa comando e retorna resultado
 */
async function executeCommand(command) {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd: process.cwd() });
    return { success: true, stdout, stderr };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Diagnóstico principal
 */
async function diagnostico() {
  console.log('🔍 DIAGNÓSTICO PRISMA - DOM V2');
  console.log('================================\n');

  // 1. Verificar arquivos essenciais
  console.log('1️⃣ VERIFICANDO ARQUIVOS ESSENCIAIS');
  console.log('─'.repeat(40));

  const arquivos = [
    'package.json',
    'prisma/schema.prisma',
    '.env',
    'node_modules/.bin/prisma'
  ];

  for (const arquivo of arquivos) {
    const existe = fileExists(arquivo);
    console.log(`${existe ? '✅' : '❌'} ${arquivo}`);
    
    if (arquivo === '.env' && existe) {
      const conteudo = readFile(arquivo);
      console.log(`   Conteúdo: ${conteudo ? conteudo.trim() : 'vazio'}`);
    }
  }
  console.log('');

  // 2. Verificar dependências
  console.log('2️⃣ VERIFICANDO DEPENDÊNCIAS');
  console.log('─'.repeat(40));

  const packageJson = readFile('package.json');
  if (packageJson) {
    const pkg = JSON.parse(packageJson);
    console.log(`✅ package.json encontrado (versão: ${pkg.version})`);
    
    const prismaVersion = pkg.dependencies?.['prisma'] || pkg.devDependencies?.['prisma'];
    console.log(`📦 Prisma versão: ${prismaVersion || 'não encontrado'}`);
    
    const prismaClientVersion = pkg.dependencies?.['@prisma/client'] || pkg.devDependencies?.['@prisma/client'];
    console.log(`📦 Prisma Client versão: ${prismaClientVersion || 'não encontrado'}`);
  } else {
    console.log('❌ package.json não encontrado');
  }
  console.log('');

  // 3. Verificar node_modules
  console.log('3️⃣ VERIFICANDO NODE_MODULES');
  console.log('─'.repeat(40));

  const nodeModulesExists = fileExists('node_modules');
  console.log(`${nodeModulesExists ? '✅' : '❌'} node_modules existe`);

  const prismaBinExists = fileExists('node_modules/.bin/prisma');
  console.log(`${prismaBinExists ? '✅' : '❌'} prisma bin existe`);

  if (nodeModulesExists) {
    const { success, stdout, stderr } = await executeCommand('npm list prisma');
    if (success) {
      console.log('📦 Prisma instalado via npm');
    } else {
      console.log('❌ Erro ao verificar Prisma via npm');
    }
  }
  console.log('');

  // 4. Verificar schema.prisma
  console.log('4️⃣ VERIFICANDO SCHEMA.PRISMA');
  console.log('─'.repeat(40));

  const schemaPath = 'prisma/schema.prisma';
  const schemaExists = fileExists(schemaPath);
  console.log(`${schemaExists ? '✅' : '❌'} schema.prisma existe`);

  if (schemaExists) {
    const schemaContent = readFile(schemaPath);
    if (schemaContent) {
      const hasGenerator = schemaContent.includes('generator client');
      const hasDatasource = schemaContent.includes('datasource db');
      const hasModels = schemaContent.includes('model ');
      
      console.log(`🔧 Generator: ${hasGenerator ? '✅' : '❌'}`);
      console.log(`🔧 Datasource: ${hasDatasource ? '✅' : '❌'}`);
      console.log(`🔧 Models: ${hasModels ? '✅' : '❌'}`);
      
      // Contar modelos
      const modelCount = (schemaContent.match(/model /g) || []).length;
      console.log(`📊 Total de modelos: ${modelCount}`);
    }
  }
  console.log('');

  // 5. Verificar variáveis de ambiente
  console.log('5️⃣ VERIFICANDO VARIÁVEIS DE AMBIENTE');
  console.log('─'.repeat(40));

  const envExists = fileExists('.env');
  console.log(`${envExists ? '✅' : '❌'} .env existe`);

  if (envExists) {
    const envContent = readFile('.env');
    if (envContent) {
      const hasDatabaseUrl = envContent.includes('DATABASE_URL');
      console.log(`🔧 DATABASE_URL: ${hasDatabaseUrl ? '✅' : '❌'}`);
      
      if (hasDatabaseUrl) {
        const match = envContent.match(/DATABASE_URL="([^"]+)"/);
        if (match) {
          const url = match[1];
          console.log(`🔗 URL: ${url}`);
          
          // Verificar componentes da URL
          const hasPostgres = url.includes('postgresql://');
          const hasHost = url.includes('localhost');
          const hasPort = url.includes(':5432');
          const hasDatabase = url.includes('/db_dom');
          
          console.log(`   PostgreSQL: ${hasPostgres ? '✅' : '❌'}`);
          console.log(`   Host: ${hasHost ? '✅' : '❌'}`);
          console.log(`   Port: ${hasPort ? '✅' : '❌'}`);
          console.log(`   Database: ${hasDatabase ? '✅' : '❌'}`);
        }
      }
    }
  }
  console.log('');

  // 6. Testar comandos Prisma
  console.log('6️⃣ TESTANDO COMANDOS PRISMA');
  console.log('─'.repeat(40));

  const commands = [
    'npx prisma --version',
    'npx prisma generate',
    'npx prisma db push --help'
  ];

  for (const command of commands) {
    console.log(`🔧 Testando: ${command}`);
    const { success, stdout, stderr } = await executeCommand(command);
    
    if (success) {
      console.log(`✅ Sucesso: ${stdout ? stdout.trim().substring(0, 100) + '...' : 'comando executado'}`);
    } else {
      console.log(`❌ Erro: ${stderr || 'comando falhou'}`);
    }
    console.log('');
  }

  // 7. Verificar PostgreSQL
  console.log('7️⃣ VERIFICANDO POSTGRESQL');
  console.log('─'.repeat(40));

  const { success: pgSuccess, stdout: pgStdout } = await executeCommand('Get-Service -Name "*postgres*" | Select-Object Name, Status');
  if (pgSuccess) {
    console.log('✅ Serviço PostgreSQL:');
    console.log(pgStdout);
  } else {
    console.log('❌ Erro ao verificar serviço PostgreSQL');
  }

  // Testar conexão
  const { success: connSuccess } = await executeCommand('$env:PGPASSWORD="FLP*2025"; psql -h localhost -U postgres -d db_dom -c "SELECT 1;"');
  console.log(`🔗 Conexão PostgreSQL: ${connSuccess ? '✅' : '❌'}`);
  console.log('');

  // Resumo
  console.log('📊 RESUMO DO DIAGNÓSTICO');
  console.log('─'.repeat(40));
  console.log('✅ Arquivos essenciais verificados');
  console.log('✅ Dependências verificadas');
  console.log('✅ Schema Prisma verificado');
  console.log('✅ Variáveis de ambiente verificadas');
  console.log('✅ Comandos Prisma testados');
  console.log('✅ PostgreSQL verificado');
  console.log('');
  console.log('🎯 PRÓXIMOS PASSOS:');
  console.log('1. Se algum item estiver com ❌, corrigir primeiro');
  console.log('2. Executar: npx prisma generate');
  console.log('3. Executar: npx prisma db push');
  console.log('4. Executar: npx ts-node prisma/seed-robusto.ts');
}

// Executar diagnóstico
if (require.main === module) {
  diagnostico().catch(console.error);
}

module.exports = { diagnostico };
