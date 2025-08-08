#!/usr/bin/env node

/**
 * @fileoverview Script para análise detalhada da base de dados PostgreSQL
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
 * Analisa problemas na tabela Users
 */
async function analyzeUsersProblems() {
  console.log('👥 ANALISANDO PROBLEMAS NA TABELA USERS');
  console.log('======================================');
  
  try {
    // Buscar dados dos usuários
    const usersData = await executeSQL(`
      SELECT id, nome, email, cpf, ativo, perfil
      FROM users 
      ORDER BY id;
    `);
    
    console.log('\n📋 Dados dos usuários:');
    console.log(usersData);
    
    // Analisar problemas específicos
    const problems = [];
    
    // Verificar CPF do usuário
    const userCPF = '59876913700';
    if (!validateCPF(userCPF)) {
      problems.push({
        type: 'invalid_cpf',
        table: 'users',
        value: userCPF,
        message: 'CPF do usuário é inválido'
      });
    }
    
    // Verificar email (está usando CPF como email)
    if (userCPF === '59876913700') {
      problems.push({
        type: 'invalid_email',
        table: 'users',
        value: userCPF,
        message: 'Email está usando CPF como valor'
      });
    }
    
    // Verificar relacionamentos
    const userRelations = await executeSQL(`
      SELECT 
        u.id as user_id,
        u.nome as user_name,
        COUNT(e.id) as employee_count,
        COUNT(b.id) as budget_count,
        COUNT(p.id) as payroll_count
      FROM users u
      LEFT JOIN employees e ON e.user_id = u.id
      LEFT JOIN budgets b ON b.user_id = u.id
      LEFT JOIN payrolls p ON p.user_id = u.id
      GROUP BY u.id, u.nome;
    `);
    
    console.log('\n🔗 Relacionamentos dos usuários:');
    console.log(userRelations);
    
    return problems;
  } catch (error) {
    console.error('❌ Erro ao analisar Users:', error.message);
    return [];
  }
}

/**
 * Analisa problemas na tabela Employees
 */
async function analyzeEmployeesProblems() {
  console.log('\n👷 ANALISANDO PROBLEMAS NA TABELA EMPLOYEES');
  console.log('===========================================');
  
  try {
    // Buscar dados dos funcionários
    const employeesData = await executeSQL(`
      SELECT id, name, cpf, position, salary, status, user_id
      FROM employees 
      ORDER BY id;
    `);
    
    console.log('\n📋 Dados dos funcionários:');
    console.log(employeesData);
    
    const problems = [];
    
    // Verificar CPFs dos funcionários
    const employeeCPFs = ['987.654.321-00', '123.456.789-00'];
    for (const cpf of employeeCPFs) {
      if (!validateCPF(cpf)) {
        problems.push({
          type: 'invalid_cpf',
          table: 'employees',
          value: cpf,
          message: 'CPF de funcionário é inválido'
        });
      }
    }
    
    // Verificar relacionamentos com usuários
    const employeeUserRelations = await executeSQL(`
      SELECT 
        e.id as employee_id,
        e.name as employee_name,
        e.user_id,
        u.nome as user_name
      FROM employees e
      LEFT JOIN users u ON u.id = e.user_id;
    `);
    
    console.log('\n🔗 Relacionamentos dos funcionários:');
    console.log(employeeUserRelations);
    
    // Verificar funcionários sem relacionamento com usuário
    const orphanEmployees = await executeSQL(`
      SELECT COUNT(*) as orphan_count
      FROM employees 
      WHERE user_id IS NULL OR user_id = '';
    `);
    
    console.log('\n👻 Funcionários órfãos (sem usuário):');
    console.log(orphanEmployees);
    
    return problems;
  } catch (error) {
    console.error('❌ Erro ao analisar Employees:', error.message);
    return [];
  }
}

/**
 * Analisa problemas na tabela Budgets
 */
async function analyzeBudgetsProblems() {
  console.log('\n💰 ANALISANDO PROBLEMAS NA TABELA BUDGETS');
  console.log('========================================');
  
  try {
    // Buscar dados dos orçamentos
    const budgetsData = await executeSQL(`
      SELECT id, name, amount, spent, category, status, user_id
      FROM budgets 
      ORDER BY id;
    `);
    
    console.log('\n📋 Dados dos orçamentos:');
    console.log(budgetsData);
    
    const problems = [];
    
    // Verificar relacionamentos com usuários
    const budgetUserRelations = await executeSQL(`
      SELECT 
        b.id as budget_id,
        b.name as budget_name,
        b.user_id,
        u.nome as user_name
      FROM budgets b
      LEFT JOIN users u ON u.id = b.user_id;
    `);
    
    console.log('\n🔗 Relacionamentos dos orçamentos:');
    console.log(budgetUserRelations);
    
    // Verificar orçamentos sem relacionamento com usuário
    const orphanBudgets = await executeSQL(`
      SELECT COUNT(*) as orphan_count
      FROM budgets 
      WHERE user_id IS NULL OR user_id = '';
    `);
    
    console.log('\n👻 Orçamentos órfãos (sem usuário):');
    console.log(orphanBudgets);
    
    // Verificar valores negativos ou zero
    const invalidAmounts = await executeSQL(`
      SELECT COUNT(*) as invalid_count
      FROM budgets 
      WHERE amount <= 0 OR spent < 0;
    `);
    
    console.log('\n⚠️ Orçamentos com valores inválidos:');
    console.log(invalidAmounts);
    
    return problems;
  } catch (error) {
    console.error('❌ Erro ao analisar Budgets:', error.message);
    return [];
  }
}

/**
 * Analisa problemas na tabela Payrolls
 */
async function analyzePayrollsProblems() {
  console.log('\n💼 ANALISANDO PROBLEMAS NA TABELA PAYROLLS');
  console.log('==========================================');
  
  try {
    // Buscar dados da folha de pagamento
    const payrollsData = await executeSQL(`
      SELECT id, employeeId, employeeName, baseSalary, netSalary, grossSalary, month, year, status, user_id, employee_id
      FROM payrolls 
      ORDER BY id;
    `);
    
    console.log('\n📋 Dados da folha de pagamento:');
    console.log(payrollsData);
    
    const problems = [];
    
    // Verificar relacionamentos
    const payrollRelations = await executeSQL(`
      SELECT 
        p.id as payroll_id,
        p.employeeName,
        p.user_id,
        p.employee_id,
        u.nome as user_name,
        e.name as employee_name
      FROM payrolls p
      LEFT JOIN users u ON u.id = p.user_id
      LEFT JOIN employees e ON e.id = p.employee_id;
    `);
    
    console.log('\n🔗 Relacionamentos da folha de pagamento:');
    console.log(payrollRelations);
    
    // Verificar folhas sem relacionamento com usuário
    const orphanPayrolls = await executeSQL(`
      SELECT COUNT(*) as orphan_count
      FROM payrolls 
      WHERE user_id IS NULL OR user_id = '';
    `);
    
    console.log('\n👻 Folhas órfãs (sem usuário):');
    console.log(orphanPayrolls);
    
    // Verificar cálculos
    const calculationProblems = await executeSQL(`
      SELECT 
        id,
        employeeName,
        baseSalary,
        grossSalary,
        netSalary,
        (baseSalary + (overtimeHours * overtimeRate * baseSalary / 160) + bonuses) as expected_gross,
        (baseSalary + (overtimeHours * overtimeRate * baseSalary / 160) + bonuses - deductions - inss - irrf) as expected_net
      FROM payrolls;
    `);
    
    console.log('\n🧮 Verificação de cálculos:');
    console.log(calculationProblems);
    
    return problems;
  } catch (error) {
    console.error('❌ Erro ao analisar Payrolls:', error.message);
    return [];
  }
}

/**
 * Analisa todas as tabelas
 */
async function analyzeAllTables() {
  console.log('📊 ANÁLISE DETALHADA DA BASE DE DADOS');
  console.log('=====================================');
  console.log(`📅 Data da análise: ${new Date().toLocaleString('pt-BR')}\n`);
  
  try {
    // Verificar conexão
    const connectionTest = await executeSQL('SELECT current_user, current_database();');
    console.log('✅ Conexão estabelecida:');
    console.log(connectionTest);
    
    // Analisar cada tabela
    const usersProblems = await analyzeUsersProblems();
    const employeesProblems = await analyzeEmployeesProblems();
    const budgetsProblems = await analyzeBudgetsProblems();
    const payrollsProblems = await analyzePayrollsProblems();
    
    // Resumo dos problemas
    const allProblems = [...usersProblems, ...employeesProblems, ...budgetsProblems, ...payrollsProblems];
    
    console.log('\n📋 RESUMO DOS PROBLEMAS IDENTIFICADOS');
    console.log('=====================================');
    console.log(`Total de problemas: ${allProblems.length}`);
    
    if (allProblems.length > 0) {
      allProblems.forEach((problem, index) => {
        console.log(`${index + 1}. ${problem.type.toUpperCase()} - ${problem.message}`);
        console.log(`   Tabela: ${problem.table}, Valor: ${problem.value}`);
      });
    } else {
      console.log('✅ Nenhum problema crítico identificado!');
    }
    
    console.log('\n✅ Análise detalhada concluída!');
    
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
