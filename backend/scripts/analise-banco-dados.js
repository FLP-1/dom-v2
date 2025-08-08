#!/usr/bin/env node

/**
 * @fileoverview Script para análise completa da base de dados PostgreSQL
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-06
 * 
 * @description
 * Este script analisa o estado atual da base de dados, verifica integridade
 * dos dados, valida CPFs/CNPJs e identifica problemas que precisam ser corrigidos.
 * 
 * @dependencies
 * - @prisma/client
 * - fs (Node.js built-in)
 * - path (Node.js built-in)
 * 
 * @usage
 * node scripts/analise-banco-dados.js
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error, debug)
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    file: __filename,
    function: 'logStructured'
  };
  
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
}

/**
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error, context = 'unknown') {
  console.error(`[ERROR] ${context}:`, error.message);
  throw error;
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
 * Valida CNPJ brasileiro
 * @param {string} cnpj - CNPJ a ser validado
 * @returns {boolean} - True se válido
 */
function validateCNPJ(cnpj) {
  if (!cnpj) return false;
  
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, '');
  
  // Verifica se tem 14 dígitos
  if (cnpj.length !== 14) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  
  // Validação do primeiro dígito verificador
  let weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weights[i];
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (parseInt(cnpj.charAt(12)) !== digit1) return false;
  
  // Validação do segundo dígito verificador
  weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weights[i];
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  return parseInt(cnpj.charAt(13)) === digit2;
}

/**
 * Analisa tabela Users
 */
async function analyzeUsers() {
  logStructured('info', 'Analisando tabela Users...');
  
  try {
    const users = await prisma.user.findMany();
    const analysis = {
      total: users.length,
      validCPFs: 0,
      invalidCPFs: 0,
      validEmails: 0,
      invalidEmails: 0,
      activeUsers: 0,
      inactiveUsers: 0,
      problems: []
    };
    
    for (const user of users) {
      // Validar CPF
      if (validateCPF(user.cpf)) {
        analysis.validCPFs++;
      } else {
        analysis.invalidCPFs++;
        analysis.problems.push({
          type: 'invalid_cpf',
          userId: user.id,
          cpf: user.cpf,
          message: 'CPF inválido'
        });
      }
      
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(user.email)) {
        analysis.validEmails++;
      } else {
        analysis.invalidEmails++;
        analysis.problems.push({
          type: 'invalid_email',
          userId: user.id,
          email: user.email,
          message: 'Email inválido'
        });
      }
      
      // Contar usuários ativos/inativos
      if (user.ativo) {
        analysis.activeUsers++;
      } else {
        analysis.inactiveUsers++;
      }
    }
    
    return analysis;
  } catch (error) {
    handleError(error, 'analyzeUsers');
    return null;
  }
}

/**
 * Analisa tabela Employees
 */
async function analyzeEmployees() {
  logStructured('info', 'Analisando tabela Employees...');
  
  try {
    const employees = await prisma.employee.findMany();
    const analysis = {
      total: employees.length,
      validCPFs: 0,
      invalidCPFs: 0,
      activeEmployees: 0,
      inactiveEmployees: 0,
      withUserRelation: 0,
      withoutUserRelation: 0,
      problems: []
    };
    
    for (const employee of employees) {
      // Validar CPF
      if (validateCPF(employee.cpf)) {
        analysis.validCPFs++;
      } else {
        analysis.invalidCPFs++;
        analysis.problems.push({
          type: 'invalid_cpf',
          employeeId: employee.id,
          cpf: employee.cpf,
          message: 'CPF inválido'
        });
      }
      
      // Contar funcionários ativos/inativos
      if (employee.status === 'active') {
        analysis.activeEmployees++;
      } else {
        analysis.inactiveEmployees++;
      }
      
      // Verificar relacionamento com User
      if (employee.user_id) {
        analysis.withUserRelation++;
      } else {
        analysis.withoutUserRelation++;
        analysis.problems.push({
          type: 'missing_user_relation',
          employeeId: employee.id,
          message: 'Funcionário sem relacionamento com usuário'
        });
      }
    }
    
    return analysis;
  } catch (error) {
    handleError(error, 'analyzeEmployees');
    return null;
  }
}

/**
 * Analisa tabela Budgets
 */
async function analyzeBudgets() {
  logStructured('info', 'Analisando tabela Budgets...');
  
  try {
    const budgets = await prisma.budget.findMany();
    const analysis = {
      total: budgets.length,
      activeBudgets: 0,
      inactiveBudgets: 0,
      withUserRelation: 0,
      withoutUserRelation: 0,
      validAmounts: 0,
      invalidAmounts: 0,
      problems: []
    };
    
    for (const budget of budgets) {
      // Contar orçamentos ativos/inativos
      if (budget.status === 'active') {
        analysis.activeBudgets++;
      } else {
        analysis.inactiveBudgets++;
      }
      
      // Verificar relacionamento com User
      if (budget.user_id) {
        analysis.withUserRelation++;
      } else {
        analysis.withoutUserRelation++;
        analysis.problems.push({
          type: 'missing_user_relation',
          budgetId: budget.id,
          message: 'Orçamento sem relacionamento com usuário'
        });
      }
      
      // Validar valores
      if (budget.amount > 0 && budget.spent >= 0) {
        analysis.validAmounts++;
      } else {
        analysis.invalidAmounts++;
        analysis.problems.push({
          type: 'invalid_amount',
          budgetId: budget.id,
          amount: budget.amount,
          spent: budget.spent,
          message: 'Valores inválidos'
        });
      }
    }
    
    return analysis;
  } catch (error) {
    handleError(error, 'analyzeBudgets');
    return null;
  }
}

/**
 * Analisa tabela Payrolls
 */
async function analyzePayrolls() {
  logStructured('info', 'Analisando tabela Payrolls...');
  
  try {
    const payrolls = await prisma.payroll.findMany();
    const analysis = {
      total: payrolls.length,
      withUserRelation: 0,
      withoutUserRelation: 0,
      withEmployeeRelation: 0,
      withoutEmployeeRelation: 0,
      validCalculations: 0,
      invalidCalculations: 0,
      problems: []
    };
    
    for (const payroll of payrolls) {
      // Verificar relacionamento com User
      if (payroll.user_id) {
        analysis.withUserRelation++;
      } else {
        analysis.withoutUserRelation++;
        analysis.problems.push({
          type: 'missing_user_relation',
          payrollId: payroll.id,
          message: 'Folha de pagamento sem relacionamento com usuário'
        });
      }
      
      // Verificar relacionamento com Employee
      if (payroll.employee_id) {
        analysis.withEmployeeRelation++;
      } else {
        analysis.withoutEmployeeRelation++;
        analysis.problems.push({
          type: 'missing_employee_relation',
          payrollId: payroll.id,
          message: 'Folha de pagamento sem relacionamento com funcionário'
        });
      }
      
      // Validar cálculos
      const expectedGross = payroll.baseSalary + (payroll.overtimeHours * payroll.overtimeRate * payroll.baseSalary / 160);
      const expectedNet = expectedGross - payroll.deductions - payroll.inss - payroll.irrf;
      
      if (Math.abs(payroll.grossSalary - expectedGross) < 1 && Math.abs(payroll.netSalary - expectedNet) < 1) {
        analysis.validCalculations++;
      } else {
        analysis.invalidCalculations++;
        analysis.problems.push({
          type: 'invalid_calculation',
          payrollId: payroll.id,
          expectedGross,
          actualGross: payroll.grossSalary,
          expectedNet,
          actualNet: payroll.netSalary,
          message: 'Cálculos incorretos'
        });
      }
    }
    
    return analysis;
  } catch (error) {
    handleError(error, 'analyzePayrolls');
    return null;
  }
}

/**
 * Analisa todas as tabelas
 */
async function analyzeAllTables() {
  logStructured('info', 'Iniciando análise completa da base de dados...');
  
  try {
    const analysis = {
      timestamp: new Date().toISOString(),
      users: await analyzeUsers(),
      employees: await analyzeEmployees(),
      budgets: await analyzeBudgets(),
      payrolls: await analyzePayrolls(),
      summary: {
        totalProblems: 0,
        criticalProblems: 0,
        recommendations: []
      }
    };
    
    // Calcular totais
    if (analysis.users) {
      analysis.summary.totalProblems += analysis.users.problems.length;
    }
    if (analysis.employees) {
      analysis.summary.totalProblems += analysis.employees.problems.length;
    }
    if (analysis.budgets) {
      analysis.summary.totalProblems += analysis.budgets.problems.length;
    }
    if (analysis.payrolls) {
      analysis.summary.totalProblems += analysis.payrolls.problems.length;
    }
    
    // Identificar problemas críticos
    const criticalProblems = [];
    if (analysis.users && analysis.users.invalidCPFs > 0) {
      criticalProblems.push('CPFs inválidos na tabela Users');
    }
    if (analysis.employees && analysis.employees.invalidCPFs > 0) {
      criticalProblems.push('CPFs inválidos na tabela Employees');
    }
    if (analysis.payrolls && analysis.payrolls.invalidCalculations > 0) {
      criticalProblems.push('Cálculos incorretos na folha de pagamento');
    }
    
    analysis.summary.criticalProblems = criticalProblems.length;
    
    // Gerar recomendações
    if (analysis.users && analysis.users.total === 0) {
      analysis.summary.recommendations.push('Criar dados de teste para usuários');
    }
    if (analysis.employees && analysis.employees.total === 0) {
      analysis.summary.recommendations.push('Criar dados de teste para funcionários');
    }
    if (analysis.budgets && analysis.budgets.total === 0) {
      analysis.summary.recommendations.push('Criar dados de teste para orçamentos');
    }
    if (analysis.payrolls && analysis.payrolls.total === 0) {
      analysis.summary.recommendations.push('Criar dados de teste para folha de pagamento');
    }
    
    return analysis;
  } catch (error) {
    handleError(error, 'analyzeAllTables');
    return null;
  }
}

/**
 * Exibe relatório da análise
 */
function displayReport(analysis) {
  if (!analysis) {
    console.log('❌ Erro na análise da base de dados');
    return;
  }
  
  console.log('\n📊 RELATÓRIO DE ANÁLISE DA BASE DE DADOS');
  console.log('==========================================');
  console.log(`📅 Data da análise: ${new Date(analysis.timestamp).toLocaleString('pt-BR')}`);
  
  // Tabela Users
  if (analysis.users) {
    console.log('\n👥 TABELA USERS:');
    console.log(`   Total: ${analysis.users.total}`);
    console.log(`   CPFs válidos: ${analysis.users.validCPFs}`);
    console.log(`   CPFs inválidos: ${analysis.users.invalidCPFs}`);
    console.log(`   Emails válidos: ${analysis.users.validEmails}`);
    console.log(`   Emails inválidos: ${analysis.users.invalidEmails}`);
    console.log(`   Usuários ativos: ${analysis.users.activeUsers}`);
    console.log(`   Usuários inativos: ${analysis.users.inactiveUsers}`);
  }
  
  // Tabela Employees
  if (analysis.employees) {
    console.log('\n👷 TABELA EMPLOYEES:');
    console.log(`   Total: ${analysis.employees.total}`);
    console.log(`   CPFs válidos: ${analysis.employees.validCPFs}`);
    console.log(`   CPFs inválidos: ${analysis.employees.invalidCPFs}`);
    console.log(`   Funcionários ativos: ${analysis.employees.activeEmployees}`);
    console.log(`   Funcionários inativos: ${analysis.employees.inactiveEmployees}`);
    console.log(`   Com relacionamento User: ${analysis.employees.withUserRelation}`);
    console.log(`   Sem relacionamento User: ${analysis.employees.withoutUserRelation}`);
  }
  
  // Tabela Budgets
  if (analysis.budgets) {
    console.log('\n💰 TABELA BUDGETS:');
    console.log(`   Total: ${analysis.budgets.total}`);
    console.log(`   Orçamentos ativos: ${analysis.budgets.activeBudgets}`);
    console.log(`   Orçamentos inativos: ${analysis.budgets.inactiveBudgets}`);
    console.log(`   Com relacionamento User: ${analysis.budgets.withUserRelation}`);
    console.log(`   Sem relacionamento User: ${analysis.budgets.withoutUserRelation}`);
    console.log(`   Valores válidos: ${analysis.budgets.validAmounts}`);
    console.log(`   Valores inválidos: ${analysis.budgets.invalidAmounts}`);
  }
  
  // Tabela Payrolls
  if (analysis.payrolls) {
    console.log('\n💼 TABELA PAYROLLS:');
    console.log(`   Total: ${analysis.payrolls.total}`);
    console.log(`   Com relacionamento User: ${analysis.payrolls.withUserRelation}`);
    console.log(`   Sem relacionamento User: ${analysis.payrolls.withoutUserRelation}`);
    console.log(`   Com relacionamento Employee: ${analysis.payrolls.withEmployeeRelation}`);
    console.log(`   Sem relacionamento Employee: ${analysis.payrolls.withoutEmployeeRelation}`);
    console.log(`   Cálculos válidos: ${analysis.payrolls.validCalculations}`);
    console.log(`   Cálculos inválidos: ${analysis.payrolls.invalidCalculations}`);
  }
  
  // Resumo
  console.log('\n📋 RESUMO:');
  console.log(`   Total de problemas: ${analysis.summary.totalProblems}`);
  console.log(`   Problemas críticos: ${analysis.summary.criticalProblems}`);
  
  if (analysis.summary.recommendations.length > 0) {
    console.log('\n🎯 RECOMENDAÇÕES:');
    analysis.summary.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }
  
  if (analysis.summary.criticalProblems > 0) {
    console.log('\n🚨 PROBLEMAS CRÍTICOS IDENTIFICADOS:');
    console.log('   Recomenda-se executar correção completa da base de dados');
  }
}

/**
 * Função principal
 */
async function main() {
  try {
    logStructured('info', 'Iniciando análise da base de dados PostgreSQL...');
    
    // Testar conexão
    await prisma.$connect();
    logStructured('info', 'Conexão com banco de dados estabelecida');
    
    // Executar análise
    const analysis = await analyzeAllTables();
    
    // Exibir relatório
    displayReport(analysis);
    
    // Salvar relatório
    const reportPath = path.join(__dirname, '../analysis-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
    console.log(`\n📄 Relatório salvo em: ${reportPath}`);
    
    logStructured('info', 'Análise concluída com sucesso');
    
  } catch (error) {
    handleError(error, 'main');
  } finally {
    await prisma.$disconnect();
  }
}

// Execução principal
if (require.main === module) {
  main();
}

module.exports = {
  analyzeAllTables,
  validateCPF,
  validateCNPJ,
  displayReport
};
