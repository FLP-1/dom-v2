#!/usr/bin/env node

/**
 * @fileoverview Script simples para análise da base de dados PostgreSQL
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
 * Valida CPF brasileiro
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} - True se válido
 */
function validateCPF(cpf) {
  if (!cpf) return false;
  
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, '');
  
  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(cpf.charAt(9)) !== digit1) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(cpf.charAt(10)) === digit2;
}

/**
 * Analisa tabela Users
 */
async function analyzeUsers() {
  console.log('👥 Analisando tabela Users...');
  
  try {
    const result = await executeSQL(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN ativo = true THEN 1 END) as ativos,
        COUNT(CASE WHEN ativo = false THEN 1 END) as inativos,
        COUNT(CASE WHEN email IS NOT NULL AND email != '' THEN 1 END) as com_email,
        COUNT(CASE WHEN cpf IS NOT NULL AND cpf != '' THEN 1 END) as com_cpf
      FROM users;
    `);
    
    console.log(result);
    
    // Buscar dados dos usuários para validação
    const usersData = await executeSQL(`
      SELECT id, nome, email, cpf, ativo 
      FROM users 
      ORDER BY id;
    `);
    
    console.log('\n📋 Dados dos usuários:');
    console.log(usersData);
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao analisar Users:', error.message);
    return null;
  }
}

/**
 * Analisa tabela Employees
 */
async function analyzeEmployees() {
  console.log('\n👷 Analisando tabela Employees...');
  
  try {
    const result = await executeSQL(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as ativos,
        COUNT(CASE WHEN status != 'active' THEN 1 END) as inativos,
        COUNT(CASE WHEN cpf IS NOT NULL AND cpf != '' THEN 1 END) as com_cpf,
        COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END) as com_user_id
      FROM employees;
    `);
    
    console.log(result);
    
    // Buscar dados dos funcionários
    const employeesData = await executeSQL(`
      SELECT id, nome, cpf, status, user_id, salario_base
      FROM employees 
      ORDER BY id;
    `);
    
    console.log('\n📋 Dados dos funcionários:');
    console.log(employeesData);
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao analisar Employees:', error.message);
    return null;
  }
}

/**
 * Analisa tabela Budgets
 */
async function analyzeBudgets() {
  console.log('\n💰 Analisando tabela Budgets...');
  
  try {
    const result = await executeSQL(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as ativos,
        COUNT(CASE WHEN status != 'active' THEN 1 END) as inativos,
        COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END) as com_user_id,
        COUNT(CASE WHEN amount > 0 THEN 1 END) as com_valor_valido,
        ROUND(AVG(amount), 2) as valor_medio,
        ROUND(SUM(amount), 2) as valor_total
      FROM budgets;
    `);
    
    console.log(result);
    
    // Buscar dados dos orçamentos
    const budgetsData = await executeSQL(`
      SELECT id, nome, amount, spent, status, user_id, created_at
      FROM budgets 
      ORDER BY id;
    `);
    
    console.log('\n📋 Dados dos orçamentos:');
    console.log(budgetsData);
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao analisar Budgets:', error.message);
    return null;
  }
}

/**
 * Analisa tabela Payrolls
 */
async function analyzePayrolls() {
  console.log('\n💼 Analisando tabela Payrolls...');
  
  try {
    const result = await executeSQL(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN user_id IS NOT NULL THEN 1 END) as com_user_id,
        COUNT(CASE WHEN employee_id IS NOT NULL THEN 1 END) as com_employee_id,
        ROUND(AVG(salario_bruto), 2) as salario_medio,
        ROUND(SUM(salario_bruto), 2) as total_folha
      FROM payrolls;
    `);
    
    console.log(result);
    
    // Buscar dados da folha de pagamento
    const payrollsData = await executeSQL(`
      SELECT id, user_id, employee_id, salario_bruto, salario_liquido, mes, ano
      FROM payrolls 
      ORDER BY id;
    `);
    
    console.log('\n📋 Dados da folha de pagamento:');
    console.log(payrollsData);
    
    return result;
  } catch (error) {
    console.error('❌ Erro ao analisar Payrolls:', error.message);
    return null;
  }
}

/**
 * Analisa todas as tabelas
 */
async function analyzeAllTables() {
  console.log('📊 INICIANDO ANÁLISE COMPLETA DA BASE DE DADOS');
  console.log('==============================================');
  console.log(`📅 Data da análise: ${new Date().toLocaleString('pt-BR')}\n`);
  
  try {
    // Verificar conexão
    const connectionTest = await executeSQL('SELECT current_user, current_database();');
    console.log('✅ Conexão estabelecida:');
    console.log(connectionTest);
    
    // Analisar cada tabela
    await analyzeUsers();
    await analyzeEmployees();
    await analyzeBudgets();
    await analyzePayrolls();
    
    console.log('\n✅ Análise concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro na análise:', error.message);
  }
}

// Execução principal
if (require.main === module) {
  analyzeAllTables();
}

module.exports = {
  analyzeAllTables,
  validateCPF
};
