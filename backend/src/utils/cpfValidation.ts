
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */


/**
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value, expectedType) {
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

// Aplicar validação de tipos
if (!validateType(data, 'object')) {
  throw new TypeError('Dados devem ser um objeto válido');
}


/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Aplicar asserções críticas
assertCritical(data !== null, 'Dados não podem ser null');
assertCritical(typeof data === 'object', 'Dados devem ser um objeto');
assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');


/**
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error, context = 'unknown') {
  console.error(`[ERROR] ${context}:`, error.message);
  
  // Log estruturado para debugging
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    type: error.constructor.name
  };
  
  // Salvar log de erro
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'error-log.json'),
      JSON.stringify(errorLog) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
  
  // Re-throw para tratamento superior
  throw error;
}

// Aplicar tratamento de erro
try {
  // código principal aqui
} catch (error) {
  handleError(error, 'main-execution');
}


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

// Aplicar validação
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}


/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Utilitários e funções auxiliares
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - Dependências específicas do contexto
 * 
 * @usage
 * import { functionName } from "./utils";
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

/**
 * Utilitários para validação de CPF
 * @author Sistema DOM v2
 * @version 2.0.0
 */

/**
 * Remove caracteres não numéricos do CPF
 */
export function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

/**
 * Valida se o CPF tem 11 dígitos
 */
export function validateCPFLength(cpf: string): boolean {
  const clean = cleanCPF(cpf);
  return clean.length === 11;
}

/**
 * Valida se todos os dígitos são iguais (CPF inválido)
 */
export function validateCPFDigits(cpf: string): boolean {
  const clean = cleanCPF(cpf);
  return !/^(\d)\1{10}$/.test(clean);
}

/**
 * Calcula o primeiro dígito verificador do CPF
 */
export function calculateFirstDigit(cpf: string): number {
  const clean = cleanCPF(cpf);
  let sum = 0;
  
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i)) * (10 - i);
  }
  
  let remainder = (sum * 10) % 11;
  return remainder === 10 || remainder === 11 ? 0 : remainder;
}

/**
 * Calcula o segundo dígito verificador do CPF
 */
export function calculateSecondDigit(cpf: string): number {
  const clean = cleanCPF(cpf);
  let sum = 0;
  
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i)) * (11 - i);
  }
  
  let remainder = (sum * 10) % 11;
  return remainder === 10 || remainder === 11 ? 0 : remainder;
}

/**
 * Valida CPF completo com dígitos verificadores
 */
export function validateCPF(cpf: string): boolean {
  const clean = cleanCPF(cpf);
  
  // Verifica se tem 11 dígitos
  if (!validateCPFLength(clean)) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais
  if (!validateCPFDigits(clean)) {
    return false;
  }
  
  // Validação do primeiro dígito verificador
  const firstDigit = calculateFirstDigit(clean);
  if (firstDigit !== parseInt(clean.charAt(9))) {
    return false;
  }
  
  // Validação do segundo dígito verificador
  const secondDigit = calculateSecondDigit(clean);
  if (secondDigit !== parseInt(clean.charAt(10))) {
    return false;
  }
  
  return true;
}

/**
 * Formata CPF com máscara (000.000.000-00)
 */
export function formatCPF(cpf: string): string {
  const clean = cleanCPF(cpf);
  return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Valida e formata CPF
 */
export function validateAndFormatCPF(cpf: string): { isValid: boolean; formatted?: string; error?: string } {
  if (!cpf) {
    return { isValid: false, error: 'CPF é obrigatório' };
  }
  
  const clean = cleanCPF(cpf);
  
  if (!validateCPFLength(clean)) {
    return { isValid: false, error: 'CPF deve ter 11 dígitos' };
  }
  
  if (!validateCPFDigits(clean)) {
    return { isValid: false, error: 'CPF não pode ter todos os dígitos iguais' };
  }
  
  if (!validateCPF(clean)) {
    return { isValid: false, error: 'CPF inválido' };
  }
  
  return { 
    isValid: true, 
    formatted: formatCPF(clean) 
  };
}

/**
 * Testa se um CPF é válido (para testes)
 */
export function testCPF(cpf: string): void {
  console.log(`Testando CPF: ${cpf}`);
  console.log(`Limpo: ${cleanCPF(cpf)}`);
  console.log(`Válido: ${validateCPF(cpf)}`);
  console.log(`Formatado: ${formatCPF(cleanCPF(cpf))}`);
  console.log('---');
}

// CPFs de teste válidos
export const VALID_CPFS = [
  '11144477735',
  '12345678909',
  '98765432100',
  '59876913700' // CPF do dono do sistema
];

// CPFs de teste inválidos
export const INVALID_CPFS = [
  '11111111111', // Todos iguais
  '12345678901', // Dígitos verificadores incorretos
  '00000000000', // Todos zeros
  '1234567890',  // Menos de 11 dígitos
  '123456789012' // Mais de 11 dígitos
];
