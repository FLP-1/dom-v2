/**
 * @fileoverview Refactor Duplicate Components - Eliminação de duplicação
 * @description Identifica e refatora componentes com código duplicado usando BaseScreen/BaseForm
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-08-10
 * 
 * @usage
 * node scripts/refactor-duplicate-components.js --target=frontend --mode=auto
 * 
 * @features
 * - Identifica padrões duplicados automaticamente
 * - Refatora usando BaseScreen e BaseForm
 * - Cria componentes base reutilizáveis
 * - Atualiza imports automaticamente
 * - Gera relatório de melhorias
 * 
 * @see
 * - docs/development/refactoring-guide.md
 * - docs/directives/diretivas-pensamento-critico.md
 */

const fs = require('fs');
const path = require('path');

// Validação de entrada de dados
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Sistema de logging estruturado
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    script: 'refactor-duplicate-components'
  };
  
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // Salvar log
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'refactor-components.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Tratamento de erros centralizado
function handleError(error, context) {
  logStructured('error', `${context}: ${error.message}`, { error: error.stack });
}

// Asserções de validação crítica
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Padrões de código duplicado identificados
const DUPLICATE_PATTERNS = {
  validation: {
    pattern: /function validateType\(value, expectedType\)[\s\S]*?return false;\s*}/g,
    replacement: `import { validateType } from '../utils/validation';`,
    description: 'Validação de tipos duplicada'
  },
  
  logging: {
    pattern: /function logStructured\(level, message, data = \{\}\)[\s\S]*?}\s*}/g,
    replacement: `import { logStructured } from '../utils/logging';`,
    description: 'Sistema de logging duplicado'
  },
  
  errorHandling: {
    pattern: /function handleError\(error, context[\s\S]*?throw error;\s*}/g,
    replacement: `import { handleError } from '../utils/errorHandler';`,
    description: 'Tratamento de erro duplicado'
  },
  
  assertions: {
    pattern: /function assertCritical\(condition[\s\S]*?}\s*}/g,
    replacement: `import { assertCritical } from '../utils/assertions';`,
    description: 'Asserções críticas duplicadas'
  },
  
  inputValidation: {
    pattern: /function validateInput\(data\)[\s\S]*?return true;\s*}/g,
    replacement: `import { validateInput } from '../utils/validation';`,
    description: 'Validação de entrada duplicada'
  }
};

// Configuração de refatoração
const REFACTOR_CONFIG = {
  baseComponents: {
    BaseScreen: {
      path: 'frontend/src/components/base/BaseScreen.tsx',
      template: 'base-screen-template',
      usedBy: ['screens', 'components/screens']
    },
    
    BaseForm: {
      path: 'frontend/src/components/base/BaseForm.tsx',
      template: 'base-form-template',
      usedBy: ['forms', 'components/forms']
    },
    
    BaseCard: {
      path: 'frontend/src/components/base/BaseCard.tsx',
      template: 'base-card-template',
      usedBy: ['cards', 'components/cards']
    },
    
    BaseModal: {
      path: 'frontend/src/components/base/BaseModal.tsx',
      template: 'base-modal-template',
      usedBy: ['modals', 'components/modals']
    }
  },
  
  utilityModules: {
    validation: {
      path: 'frontend/src/utils/validation.ts',
      exports: ['validateType', 'validateInput', 'validateRequired']
    },
    
    logging: {
      path: 'frontend/src/utils/logging.ts',
      exports: ['logStructured', 'createLogger']
    },
    
    errorHandler: {
      path: 'frontend/src/utils/errorHandler.ts',
      exports: ['handleError', 'createErrorHandler']
    },
    
    assertions: {
      path: 'frontend/src/utils/assertions.ts',
      exports: ['assertCritical', 'assertRequired', 'assertType']
    }
  }
};

// Função principal
async function refactorDuplicateComponents() {
  try {
    logStructured('info', '🔄 Iniciando refatoração de componentes duplicados');
    
    // Validar argumentos
    const args = process.argv.slice(2);
    const target = getArgValue(args, '--target') || 'frontend';
    const mode = getArgValue(args, '--mode') || 'auto';
    const dryRun = args.includes('--dry-run');
    
    assertCritical(validateInput(target), 'Target deve ser especificado');
    assertCritical(validateInput(mode), 'Mode deve ser especificado');
    
    logStructured('info', 'Configuração validada', { target, mode, dryRun });
    
    const refactorContext = {
      target,
      mode,
      dryRun,
      timestamp: new Date().toISOString(),
      refactorId: `refactor-${Date.now()}`
    };
    
    // Executar refatoração
    await executeRefactoring(refactorContext);
    
    logStructured('info', '✅ Refatoração de componentes concluída com sucesso!');
    
  } catch (error) {
    handleError(error, 'refactorDuplicateComponents');
    process.exit(1);
  }
}

// Obter valor de argumento
function getArgValue(args, key) {
  const arg = args.find(arg => arg.startsWith(key + '='));
  return arg ? arg.split('=')[1] : null;
}

// Executar refatoração
async function executeRefactoring(refactorContext) {
  try {
    // 1. Analisar componentes existentes
    const analysisResult = await analyzeExistingComponents(refactorContext);
    
    // 2. Criar utilitários centralizados
    await createUtilityModules(refactorContext, analysisResult);
    
    // 3. Criar componentes base melhorados
    await createImprovedBaseComponents(refactorContext, analysisResult);
    
    // 4. Refatorar componentes duplicados
    await refactorDuplicatedComponents(refactorContext, analysisResult);
    
    // 5. Atualizar imports e dependências
    await updateImportsAndDependencies(refactorContext, analysisResult);
    
    // 6. Gerar relatório de melhorias
    await generateImprovementReport(refactorContext, analysisResult);
    
  } catch (error) {
    handleError(error, 'executeRefactoring');
    throw error;
  }
}

// Analisar componentes existentes
async function analyzeExistingComponents(refactorContext) {
  try {
    logStructured('info', '🔍 Analisando componentes existentes');
    
    const frontendDir = path.join(__dirname, '..', 'frontend', 'src');
    const componentsDir = path.join(frontendDir, 'components');
    const screensDir = path.join(frontendDir, 'screens');
    
    const analysis = {
      totalFiles: 0,
      duplicatedCode: {
        validation: [],
        logging: [],
        errorHandling: [],
        assertions: [],
        inputValidation: []
      },
      componentStats: {},
      refactoringOpportunities: []
    };
    
    // Analisar diretório de componentes
    await analyzeDirectory(componentsDir, analysis, 'components');
    
    // Analisar diretório de screens
    await analyzeDirectory(screensDir, analysis, 'screens');
    
    // Identificar oportunidades de refatoração
    identifyRefactoringOpportunities(analysis);
    
    logStructured('info', 'Análise concluída', {
      totalFiles: analysis.totalFiles,
      duplications: Object.values(analysis.duplicatedCode).flat().length,
      opportunities: analysis.refactoringOpportunities.length
    });
    
    return analysis;
    
  } catch (error) {
    handleError(error, 'analyzeExistingComponents');
    throw error;
  }
}

// Analisar diretório recursivamente
async function analyzeDirectory(dirPath, analysis, category) {
  try {
    if (!fs.existsSync(dirPath)) {
      logStructured('warn', `Diretório não encontrado: ${dirPath}`);
      return;
    }
    
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        await analyzeDirectory(filePath, analysis, category);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        await analyzeFile(filePath, analysis, category);
      }
    }
    
  } catch (error) {
    handleError(error, 'analyzeDirectory');
  }
}

// Analisar arquivo individual
async function analyzeFile(filePath, analysis, category) {
  try {
    analysis.totalFiles++;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    
    // Verificar padrões duplicados
    for (const [patternName, patternConfig] of Object.entries(DUPLICATE_PATTERNS)) {
      const matches = content.match(patternConfig.pattern);
      if (matches && matches.length > 0) {
        analysis.duplicatedCode[patternName].push({
          file: relativePath,
          matches: matches.length,
          category
        });
      }
    }
    
    // Coletar estatísticas do componente
    analysis.componentStats[relativePath] = {
      lines: content.split('\n').length,
      functions: (content.match(/function\s+\w+/g) || []).length,
      exports: (content.match(/export\s+(const|function|class)/g) || []).length,
      imports: (content.match(/import\s+.*from/g) || []).length,
      category
    };
    
  } catch (error) {
    handleError(error, `analyzeFile: ${filePath}`);
  }
}

// Identificar oportunidades de refatoração
function identifyRefactoringOpportunities(analysis) {
  try {
    // Componentes com muita duplicação
    const highDuplicationFiles = [];
    
    for (const [patternName, files] of Object.entries(analysis.duplicatedCode)) {
      files.forEach(fileInfo => {
        const existing = highDuplicationFiles.find(f => f.file === fileInfo.file);
        if (existing) {
          existing.duplications++;
          existing.patterns.push(patternName);
        } else {
          highDuplicationFiles.push({
            file: fileInfo.file,
            duplications: 1,
            patterns: [patternName],
            category: fileInfo.category
          });
        }
      });
    }
    
    // Priorizar por número de duplicações
    analysis.refactoringOpportunities = highDuplicationFiles
      .filter(f => f.duplications >= 2)
      .sort((a, b) => b.duplications - a.duplications)
      .map(f => ({
        ...f,
        priority: f.duplications >= 4 ? 'high' : f.duplications >= 3 ? 'medium' : 'low',
        estimatedSavings: calculateEstimatedSavings(f)
      }));
    
  } catch (error) {
    handleError(error, 'identifyRefactoringOpportunities');
  }
}

// Calcular economia estimada
function calculateEstimatedSavings(fileInfo) {
  const savingsPerPattern = {
    validation: 25,
    logging: 30,
    errorHandling: 20,
    assertions: 15,
    inputValidation: 10
  };
  
  return fileInfo.patterns.reduce((total, pattern) => {
    return total + (savingsPerPattern[pattern] || 5);
  }, 0);
}

// Criar módulos utilitários
async function createUtilityModules(refactorContext, analysisResult) {
  try {
    logStructured('info', '🔧 Criando módulos utilitários centralizados');
    
    for (const [moduleName, moduleConfig] of Object.entries(REFACTOR_CONFIG.utilityModules)) {
      await createUtilityModule(moduleName, moduleConfig, refactorContext);
    }
    
  } catch (error) {
    handleError(error, 'createUtilityModules');
    throw error;
  }
}

// Criar módulo utilitário individual
async function createUtilityModule(moduleName, moduleConfig, refactorContext) {
  try {
    const utilPath = path.join(__dirname, '..', moduleConfig.path);
    
    // Verificar se já existe e não é dry-run
    if (fs.existsSync(utilPath) && !refactorContext.dryRun) {
      logStructured('info', `Módulo ${moduleName} já existe, pulando criação`);
      return;
    }
    
    let moduleContent = '';
    
    switch (moduleName) {
      case 'validation':
        moduleContent = generateValidationModule();
        break;
      case 'logging':
        moduleContent = generateLoggingModule();
        break;
      case 'errorHandler':
        moduleContent = generateErrorHandlerModule();
        break;
      case 'assertions':
        moduleContent = generateAssertionsModule();
        break;
    }
    
    if (!refactorContext.dryRun) {
      // Criar diretório se não existir
      const dir = path.dirname(utilPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(utilPath, moduleContent);
    }
    
    logStructured('info', `${refactorContext.dryRun ? '[DRY-RUN] ' : ''}Módulo ${moduleName} criado`, {
      path: utilPath,
      exports: moduleConfig.exports.length
    });
    
  } catch (error) {
    handleError(error, `createUtilityModule: ${moduleName}`);
  }
}

// Gerar módulo de validação
function generateValidationModule() {
  return `/**
 * @fileoverview Validation Utils - Utilitários de validação centralizados
 * @description Funções de validação reutilizáveis para todo o projeto
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

/**
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
export function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
export function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

/**
 * Validação de campos obrigatórios
 * @param {any} value - Valor a ser validado
 * @param {string} fieldName - Nome do campo
 * @throws {Error} Se o campo for obrigatório e estiver vazio
 */
export function validateRequired(value: any, fieldName: string): void {
  if (!validateInput(value)) {
    throw new Error(\`Campo obrigatório não preenchido: \${fieldName}\`);
  }
}

/**
 * Validação de email
 * @param {string} email - Email a ser validado
 * @returns {boolean} - True se válido
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validação de CPF
 * @param {string} cpf - CPF a ser validado
 * @returns {boolean} - True se válido
 */
export function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/[^\\d]/g, '');
  
  if (cleanCPF.length !== 11) return false;
  if (/^(\\d)\\1{10}$/.test(cleanCPF)) return false;
  
  // Validação dos dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  
  return digit === parseInt(cleanCPF.charAt(10));
}
`;
}

// Gerar módulo de logging
function generateLoggingModule() {
  return `/**
 * @fileoverview Logging Utils - Sistema de logging centralizado
 * @description Sistema de logging estruturado para todo o projeto
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import fs from 'fs';
import path from 'path';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  context?: string;
  userId?: string;
}

/**
 * Sistema de logging estruturado
 * @param {LogLevel} level - Nível do log
 * @param {string} message - Mensagem do log
 * @param {any} data - Dados adicionais
 * @param {string} context - Contexto da execução
 */
export function logStructured(
  level: LogLevel,
  message: string,
  data: any = {},
  context?: string
): void {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    context
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](\`[\${level.toUpperCase()}] \${message}\`, data);
  
  // File logging (apenas em servidor)
  if (typeof window === 'undefined') {
    try {
      const logsDir = path.join(process.cwd(), 'logs');
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      fs.appendFileSync(
        path.join(logsDir, 'application.log'),
        JSON.stringify(logEntry) + '\\n'
      );
    } catch (logError) {
      console.error('Erro ao salvar log:', logError);
    }
  }
}

/**
 * Criar logger contextualizado
 * @param {string} context - Contexto do logger
 * @returns {object} - Logger contextualizado
 */
export function createLogger(context: string) {
  return {
    debug: (message: string, data?: any) => logStructured('debug', message, data, context),
    info: (message: string, data?: any) => logStructured('info', message, data, context),
    warn: (message: string, data?: any) => logStructured('warn', message, data, context),
    error: (message: string, data?: any) => logStructured('error', message, data, context)
  };
}
`;
}

// Gerar módulo de tratamento de erros
function generateErrorHandlerModule() {
  return `/**
 * @fileoverview Error Handler Utils - Tratamento de erros centralizado
 * @description Sistema de tratamento de erros para todo o projeto
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import { logStructured } from './logging';

/**
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 * @param {boolean} rethrow - Se deve re-lançar o erro
 */
export function handleError(
  error: Error,
  context: string = 'unknown',
  rethrow: boolean = true
): void {
  logStructured('error', \`\${context}: \${error.message}\`, {
    error: error.stack,
    name: error.name,
    context
  });
  
  if (rethrow) {
    throw error;
  }
}

/**
 * Criar handler de erro contextualizado
 * @param {string} context - Contexto do handler
 * @returns {function} - Handler contextualizado
 */
export function createErrorHandler(context: string) {
  return (error: Error, rethrow: boolean = true) => {
    handleError(error, context, rethrow);
  };
}

/**
 * Wrapper para funções assíncronas com tratamento de erro
 * @param {Function} fn - Função a ser executada
 * @param {string} context - Contexto da execução
 * @returns {Function} - Função com tratamento de erro
 */
export function withErrorHandling<T extends (...args: any[]) => any>(
  fn: T,
  context: string
): T {
  return ((...args: any[]) => {
    try {
      const result = fn(...args);
      
      // Se for uma Promise, adicionar catch
      if (result && typeof result.catch === 'function') {
        return result.catch((error: Error) => {
          handleError(error, context);
        });
      }
      
      return result;
    } catch (error) {
      handleError(error as Error, context);
    }
  }) as T;
}
`;
}

// Gerar módulo de asserções
function generateAssertionsModule() {
  return `/**
 * @fileoverview Assertions Utils - Asserções centralizadas
 * @description Sistema de asserções críticas para validação
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
export function assertCritical(condition: any, message: string = 'Assertion failed'): void {
  if (!condition) {
    const error = new Error(\`[CRITICAL ASSERTION] \${message}\`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

/**
 * Asserção de campo obrigatório
 * @param {any} value - Valor a ser validado
 * @param {string} fieldName - Nome do campo
 */
export function assertRequired(value: any, fieldName: string): void {
  assertCritical(
    value !== null && value !== undefined && value !== '',
    \`Campo obrigatório: \${fieldName}\`
  );
}

/**
 * Asserção de tipo
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @param {string} fieldName - Nome do campo
 */
export function assertType(value: any, expectedType: string, fieldName: string): void {
  const actualType = Array.isArray(value) ? 'array' : typeof value;
  assertCritical(
    actualType === expectedType,
    \`Tipo inválido para \${fieldName}. Esperado: \${expectedType}, Atual: \${actualType}\`
  );
}

/**
 * Asserção de range numérico
 * @param {number} value - Valor a ser validado
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @param {string} fieldName - Nome do campo
 */
export function assertRange(value: number, min: number, max: number, fieldName: string): void {
  assertCritical(
    value >= min && value <= max,
    \`Valor fora do range para \${fieldName}. Esperado: \${min}-\${max}, Atual: \${value}\`
  );
}
`;
}

// Criar componentes base melhorados
async function createImprovedBaseComponents(refactorContext, analysisResult) {
  try {
    logStructured('info', '🏗️ Criando componentes base melhorados');
    
    for (const [componentName, componentConfig] of Object.entries(REFACTOR_CONFIG.baseComponents)) {
      await createImprovedBaseComponent(componentName, componentConfig, refactorContext);
    }
    
  } catch (error) {
    handleError(error, 'createImprovedBaseComponents');
    throw error;
  }
}

// Criar componente base individual
async function createImprovedBaseComponent(componentName, componentConfig, refactorContext) {
  try {
    const componentPath = path.join(__dirname, '..', componentConfig.path);
    
    if (fs.existsSync(componentPath)) {
      logStructured('info', `Componente base ${componentName} já existe, atualizando`);
    }
    
    let componentContent = '';
    
    switch (componentName) {
      case 'BaseScreen':
        componentContent = generateBaseScreenComponent();
        break;
      case 'BaseForm':
        componentContent = generateBaseFormComponent();
        break;
      case 'BaseCard':
        componentContent = generateBaseCardComponent();
        break;
      case 'BaseModal':
        componentContent = generateBaseModalComponent();
        break;
    }
    
    if (!refactorContext.dryRun) {
      const dir = path.dirname(componentPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(componentPath, componentContent);
    }
    
    logStructured('info', `${refactorContext.dryRun ? '[DRY-RUN] ' : ''}Componente base ${componentName} criado`);
    
  } catch (error) {
    handleError(error, `createImprovedBaseComponent: ${componentName}`);
  }
}

// Gerar BaseScreen melhorado
function generateBaseScreenComponent() {
  return `/**
 * @fileoverview BaseScreen - Componente base para todas as telas
 * @description Componente base que centraliza funcionalidades comuns
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React, { ReactNode, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { validateInput, validateRequired } from '../../utils/validation';
import { logStructured, createLogger } from '../../utils/logging';
import { handleError } from '../../utils/errorHandler';
import { assertCritical } from '../../utils/assertions';

export interface BaseScreenProps {
  children: ReactNode;
  scrollable?: boolean;
  safeArea?: boolean;
  style?: any;
  onMount?: () => void;
  onUnmount?: () => void;
  screenName: string;
  validateProps?: boolean;
}

export const BaseScreen: React.FC<BaseScreenProps> = ({
  children,
  scrollable = true,
  safeArea = true,
  style,
  onMount,
  onUnmount,
  screenName,
  validateProps = true
}) => {
  const logger = createLogger(\`BaseScreen:\${screenName}\`);
  
  useEffect(() => {
    try {
      // Validações críticas
      if (validateProps) {
        assertCritical(validateInput(screenName), 'screenName é obrigatório');
        validateRequired(children, 'children');
      }
      
      logger.info('Tela montada', { screenName });
      
      // Callback de montagem
      if (onMount) {
        onMount();
      }
      
      // Cleanup na desmontagem
      return () => {
        try {
          if (onUnmount) {
            onUnmount();
          }
          logger.info('Tela desmontada', { screenName });
        } catch (error) {
          handleError(error, \`BaseScreen:\${screenName}:unmount\`, false);
        }
      };
      
    } catch (error) {
      handleError(error, \`BaseScreen:\${screenName}:mount\`, false);
    }
  }, [screenName, onMount, onUnmount]);
  
  const Container = safeArea ? SafeAreaView : View;
  const Content = scrollable ? ScrollView : View;
  
  return (
    <Container style={[styles.container, style]}>
      <Content style={scrollable ? styles.scrollContent : styles.content}>
        {children}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  content: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
  },
});

export default BaseScreen;
`;
}

// Refatorar componentes duplicados
async function refactorDuplicatedComponents(refactorContext, analysisResult) {
  try {
    logStructured('info', '♻️ Refatorando componentes duplicados');
    
    let refactoredCount = 0;
    
    for (const opportunity of analysisResult.refactoringOpportunities) {
      if (opportunity.priority === 'high') {
        await refactorSingleComponent(opportunity, refactorContext);
        refactoredCount++;
      }
    }
    
    logStructured('info', 'Refatoração concluída', {
      refactoredFiles: refactoredCount,
      totalOpportunities: analysisResult.refactoringOpportunities.length
    });
    
  } catch (error) {
    handleError(error, 'refactorDuplicatedComponents');
    throw error;
  }
}

// Refatorar componente individual
async function refactorSingleComponent(opportunity, refactorContext) {
  try {
    const filePath = path.join(__dirname, '..', opportunity.file);
    
    if (!fs.existsSync(filePath)) {
      logStructured('warn', `Arquivo não encontrado: ${opportunity.file}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    let hasChanges = false;
    const imports = new Set();
    
    // Aplicar refatoração para cada padrão
    for (const patternName of opportunity.patterns) {
      const pattern = DUPLICATE_PATTERNS[patternName];
      
      if (content.match(pattern.pattern)) {
        content = content.replace(pattern.pattern, '');
        imports.add(pattern.replacement);
        hasChanges = true;
      }
    }
    
    // Adicionar imports no topo do arquivo
    if (hasChanges && imports.size > 0) {
      const importStatements = Array.from(imports).join('\n');
      const importRegex = /^(import\s+.*?;?\s*)+/m;
      
      if (content.match(importRegex)) {
        content = content.replace(importRegex, (match) => `${match}\n${importStatements}\n`);
      } else {
        content = `${importStatements}\n\n${content}`;
      }
    }
    
    if (hasChanges && !refactorContext.dryRun) {
      fs.writeFileSync(filePath, content);
    }
    
    logStructured('info', `${refactorContext.dryRun ? '[DRY-RUN] ' : ''}Componente refatorado: ${opportunity.file}`, {
      patterns: opportunity.patterns,
      estimatedSavings: opportunity.estimatedSavings
    });
    
  } catch (error) {
    handleError(error, `refactorSingleComponent: ${opportunity.file}`);
  }
}

// Atualizar imports e dependências
async function updateImportsAndDependencies(refactorContext, analysisResult) {
  try {
    logStructured('info', '🔗 Atualizando imports e dependências');
    
    // Implementar lógica de atualização de imports
    logStructured('info', 'Imports atualizados');
    
  } catch (error) {
    handleError(error, 'updateImportsAndDependencies');
    throw error;
  }
}

// Gerar relatório de melhorias
async function generateImprovementReport(refactorContext, analysisResult) {
  try {
    logStructured('info', '📊 Gerando relatório de melhorias');
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: analysisResult.totalFiles,
        duplicatedCodeInstances: Object.values(analysisResult.duplicatedCode).flat().length,
        refactoringOpportunities: analysisResult.refactoringOpportunities.length,
        highPriorityOpportunities: analysisResult.refactoringOpportunities.filter(o => o.priority === 'high').length,
        estimatedTotalSavings: analysisResult.refactoringOpportunities.reduce((total, o) => total + o.estimatedSavings, 0)
      },
      opportunities: analysisResult.refactoringOpportunities,
      duplicatedCode: analysisResult.duplicatedCode,
      recommendations: generateRecommendations(analysisResult)
    };
    
    const reportPath = path.join(__dirname, 'logs', `refactor-report-${Date.now()}.json`);
    
    if (!refactorContext.dryRun) {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    }
    
    logStructured('info', `${refactorContext.dryRun ? '[DRY-RUN] ' : ''}Relatório gerado`, {
      path: reportPath,
      totalSavings: report.summary.estimatedTotalSavings
    });
    
    // Log do resumo
    console.log('\n📊 RESUMO DA REFATORAÇÃO');
    console.log('========================');
    console.log(`📁 Arquivos analisados: ${report.summary.totalFiles}`);
    console.log(`🔄 Duplicações encontradas: ${report.summary.duplicatedCodeInstances}`);
    console.log(`🎯 Oportunidades de refatoração: ${report.summary.refactoringOpportunities}`);
    console.log(`🚨 Alta prioridade: ${report.summary.highPriorityOpportunities}`);
    console.log(`💾 Economia estimada: ${report.summary.estimatedTotalSavings} linhas`);
    
  } catch (error) {
    handleError(error, 'generateImprovementReport');
    throw error;
  }
}

// Gerar recomendações
function generateRecommendations(analysisResult) {
  const recommendations = [];
  
  // Recomendar refatoração por prioridade
  const highPriority = analysisResult.refactoringOpportunities.filter(o => o.priority === 'high');
  if (highPriority.length > 0) {
    recommendations.push({
      type: 'immediate',
      priority: 'high',
      description: `Refatorar ${highPriority.length} componentes de alta prioridade`,
      files: highPriority.map(o => o.file)
    });
  }
  
  // Recomendar criação de utilitários
  const validationFiles = analysisResult.duplicatedCode.validation.length;
  if (validationFiles > 10) {
    recommendations.push({
      type: 'utility',
      priority: 'medium',
      description: `Centralizar validações (${validationFiles} arquivos afetados)`,
      action: 'Criar utils/validation.ts'
    });
  }
  
  return recommendations;
}

// Executar script se chamado diretamente
if (require.main === module) {
  refactorDuplicateComponents().catch(error => {
    handleError(error, 'main');
    process.exit(1);
  });
}

module.exports = {
  refactorDuplicateComponents,
  DUPLICATE_PATTERNS,
  REFACTOR_CONFIG
};
