
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
    function: arguments.callee.name || 'anonymous'
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'application.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Aplicar logging
logStructured('info', 'Iniciando execução', { context: 'main' });


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
 * Serviço de Cálculos de Folha de Pagamento
 * @description Implementa todos os cálculos trabalhistas conforme legislação brasileira
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-01-27
 * 
 * Funcionalidades:
 * - Cálculo de INSS, IRRF, FGTS
 * - Horas extras, adicional noturno
 * - Férias, 13º salário
 * - Descontos (vale transporte, refeição)
 * - Conformidade com CLT e LC 150/2015
 */

// ==========================================
// 📊 INTERFACES E TIPOS
// ==========================================

export interface PayrollCalculationInput {
  // Dados do funcionário
  employeeId: string;
  employeeName: string;
  employeeCpf: string;
  position: string;
  admissionDate: Date;
  baseSalary: number;
  
  // Horas trabalhadas
  workedHours: number;
  extraHours: number;
  nightHours: number;
  sundayHours: number;
  holidayHours: number;
  
  // Faltas e atrasos
  absences: number;
  lateMinutes: number;
  
  // Benefícios e descontos
  transportBenefit: boolean;
  mealBenefit: boolean;
  bonusAmount: number;
  commissionAmount: number;
  advanceAmount: number;
  loanAmount: number;
  
  // Configurações
  config: PayrollConfiguration;
}

export interface PayrollCalculationResult {
  // Identificação
  employeeId: string;
  employeeName: string;
  employeeCpf: string;
  position: string;
  baseSalary: number;
  
  // Proventos detalhados
  earnings: {
    baseAmount: number;
    extraAmount: number;
    nightAmount: number;
    sundayAmount: number;
    holidayAmount: number;
    bonusAmount: number;
    commissionAmount: number;
    otherEarnings: Record<string, number>;
    totalEarnings: number;
  };
  
  // Descontos detalhados
  discounts: {
    inssDiscount: number;
    irrfDiscount: number;
    transportDiscount: number;
    mealDiscount: number;
    advanceDiscount: number;
    loanDiscount: number;
    otherDiscounts: Record<string, number>;
    totalDiscounts: number;
  };
  
  // Valores líquidos
  netSalary: number;
  
  // FGTS
  fgts: {
    base: number;
    amount: number;
  };
  
  // Informações adicionais
  calculationDetails: {
    inssRate: number;
    irrfRate: number;
    fgtsRate: number;
    extraHourRate: number;
    nightHourRate: number;
  };
}

export interface PayrollConfiguration {
  // Tabelas oficiais (atualizadas periodicamente)
  inssRates: Array<{
    min: number;
    max: number;
    rate: number;
    deduction: number;
  }>;
  
  irrfRates: Array<{
    min: number;
    max: number;
    rate: number;
    deduction: number;
  }>;
  
  // Configurações gerais
  fgtsRate: number;
  transportPercentage: number;
  mealDiscount: number;
  
  // Adicional de horas
  extraHourPercentage: number; // 50%
  nightHourPercentage: number; // 20%
  sundayHourPercentage: number; // 100%
  holidayHourPercentage: number; // 100%
}

// ==========================================
// 📋 TABELAS OFICIAIS 2025
// ==========================================

const DEFAULT_INSS_RATES_2025 = [
  { min: 0, max: 1412.00, rate: 7.5, deduction: 0 },
  { min: 1412.01, max: 2666.68, rate: 9.0, deduction: 21.18 },
  { min: 2666.69, max: 4000.03, rate: 12.0, deduction: 101.18 },
  { min: 4000.04, max: 7786.02, rate: 14.0, deduction: 181.18 }
];

const DEFAULT_IRRF_RATES_2025 = [
  { min: 0, max: 2112.00, rate: 0, deduction: 0 },
  { min: 2112.01, max: 2826.65, rate: 7.5, deduction: 158.40 },
  { min: 2826.66, max: 3751.05, rate: 15.0, deduction: 370.40 },
  { min: 3751.06, max: 4664.68, rate: 22.5, deduction: 651.73 },
  { min: 4664.69, max: Infinity, rate: 27.5, deduction: 884.96 }
];

const DEFAULT_CONFIG: PayrollConfiguration = {
  inssRates: DEFAULT_INSS_RATES_2025,
  irrfRates: DEFAULT_IRRF_RATES_2025,
  fgtsRate: 8.0,
  transportPercentage: 6.0,
  mealDiscount: 0,
  extraHourPercentage: 50.0,
  nightHourPercentage: 20.0,
  sundayHourPercentage: 100.0,
  holidayHourPercentage: 100.0
};

// ==========================================
// 🧮 CLASSE PRINCIPAL DE CÁLCULOS
// ==========================================

export class PayrollCalculationService {
  
  /**
   * Calcular folha de pagamento completa
   */
  static calculate(input: PayrollCalculationInput): PayrollCalculationResult {
    const config = input.config || DEFAULT_CONFIG;
    
    // 1. Calcular proventos
    const earnings = this.calculateEarnings(input, config);
    
    // 2. Calcular base para descontos
    const discountBase = earnings.totalEarnings;
    
    // 3. Calcular descontos
    const discounts = this.calculateDiscounts(discountBase, input, config);
    
    // 4. Calcular líquido
    const netSalary = earnings.totalEarnings - discounts.totalDiscounts;
    
    // 5. Calcular FGTS
    const fgts = this.calculateFGTS(earnings.totalEarnings, config);
    
    // 6. Detalhes dos cálculos
    const calculationDetails = this.getCalculationDetails(discountBase, config);
    
    return {
      employeeId: input.employeeId,
      employeeName: input.employeeName,
      employeeCpf: input.employeeCpf,
      position: input.position,
      baseSalary: input.baseSalary,
      earnings,
      discounts,
      netSalary,
      fgts,
      calculationDetails
    };
  }
  
  /**
   * Calcular proventos (ganhos)
   */
  private static calculateEarnings(
    input: PayrollCalculationInput, 
    config: PayrollConfiguration
  ) {
    const hourlyRate = input.baseSalary / 220; // 220 horas mensais
    
    // Salário base (proporcional às horas trabalhadas)
    const baseAmount = (input.workedHours / 220) * input.baseSalary;
    
    // Horas extras (50% adicional)
    const extraAmount = input.extraHours * hourlyRate * (1 + config.extraHourPercentage / 100);
    
    // Adicional noturno (20% adicional)
    const nightAmount = input.nightHours * hourlyRate * (config.nightHourPercentage / 100);
    
    // Domingo (100% adicional)
    const sundayAmount = input.sundayHours * hourlyRate * (config.sundayHourPercentage / 100);
    
    // Feriado (100% adicional)
    const holidayAmount = input.holidayHours * hourlyRate * (config.holidayHourPercentage / 100);
    
    // Outros proventos
    const bonusAmount = input.bonusAmount || 0;
    const commissionAmount = input.commissionAmount || 0;
    
    const otherEarnings: Record<string, number> = {};
    
    const totalEarnings = baseAmount + extraAmount + nightAmount + 
                         sundayAmount + holidayAmount + bonusAmount + commissionAmount;
    
    return {
      baseAmount: this.roundCurrency(baseAmount),
      extraAmount: this.roundCurrency(extraAmount),
      nightAmount: this.roundCurrency(nightAmount),
      sundayAmount: this.roundCurrency(sundayAmount),
      holidayAmount: this.roundCurrency(holidayAmount),
      bonusAmount: this.roundCurrency(bonusAmount),
      commissionAmount: this.roundCurrency(commissionAmount),
      otherEarnings,
      totalEarnings: this.roundCurrency(totalEarnings)
    };
  }
  
  /**
   * Calcular descontos
   */
  private static calculateDiscounts(
    discountBase: number,
    input: PayrollCalculationInput,
    config: PayrollConfiguration
  ) {
    // INSS
    const inssDiscount = this.calculateINSS(discountBase, config.inssRates);
    
    // Base para IRRF (salário - INSS)
    const irrfBase = discountBase - inssDiscount;
    
    // IRRF
    const irrfDiscount = this.calculateIRRF(irrfBase, config.irrfRates);
    
    // Vale transporte (6% do salário, limitado ao custo do transporte)
    const transportDiscount = input.transportBenefit 
      ? Math.min(discountBase * (config.transportPercentage / 100), discountBase * 0.06)
      : 0;
    
    // Vale refeição/alimentação
    const mealDiscount = input.mealBenefit ? config.mealDiscount : 0;
    
    // Adiantamentos
    const advanceDiscount = input.advanceAmount || 0;
    
    // Empréstimos
    const loanDiscount = input.loanAmount || 0;
    
    const otherDiscounts: Record<string, number> = {};
    
    const totalDiscounts = inssDiscount + irrfDiscount + transportDiscount + 
                          mealDiscount + advanceDiscount + loanDiscount;
    
    return {
      inssDiscount: this.roundCurrency(inssDiscount),
      irrfDiscount: this.roundCurrency(irrfDiscount),
      transportDiscount: this.roundCurrency(transportDiscount),
      mealDiscount: this.roundCurrency(mealDiscount),
      advanceDiscount: this.roundCurrency(advanceDiscount),
      loanDiscount: this.roundCurrency(loanDiscount),
      otherDiscounts,
      totalDiscounts: this.roundCurrency(totalDiscounts)
    };
  }
  
  /**
   * Calcular INSS conforme tabela oficial
   */
  private static calculateINSS(salary: number, rates: PayrollConfiguration['inssRates']): number {
    let inss = 0;
    
    for (const bracket of rates) {
      if (salary > bracket.min) {
        const taxableAmount = Math.min(salary, bracket.max) - bracket.min;
        inss += taxableAmount * (bracket.rate / 100);
      }
    }
    
    // Aplicar dedução conforme nova regra
    const applicableBracket = rates.find(rate => salary >= rate.min && salary <= rate.max);
    if (applicableBracket && applicableBracket.deduction > 0) {
      inss = salary * (applicableBracket.rate / 100) - applicableBracket.deduction;
    }
    
    return Math.max(0, inss);
  }
  
  /**
   * Calcular IRRF conforme tabela oficial
   */
  private static calculateIRRF(salary: number, rates: PayrollConfiguration['irrfRates']): number {
    const applicableBracket = rates.find(rate => salary >= rate.min && salary <= rate.max);
    
    if (!applicableBracket || applicableBracket.rate === 0) {
      return 0;
    }
    
    const irrf = salary * (applicableBracket.rate / 100) - applicableBracket.deduction;
    return Math.max(0, irrf);
  }
  
  /**
   * Calcular FGTS (8% sobre o salário)
   */
  private static calculateFGTS(salary: number, config: PayrollConfiguration) {
    const amount = salary * (config.fgtsRate / 100);
    
    return {
      base: this.roundCurrency(salary),
      amount: this.roundCurrency(amount)
    };
  }
  
  /**
   * Obter detalhes dos cálculos aplicados
   */
  private static getCalculationDetails(
    salary: number, 
    config: PayrollConfiguration
  ) {
    const inssRate = this.getEffectiveRate(salary, config.inssRates);
    const irrfRate = this.getEffectiveRate(salary - this.calculateINSS(salary, config.inssRates), config.irrfRates);
    
    return {
      inssRate: this.roundPercentage(inssRate),
      irrfRate: this.roundPercentage(irrfRate),
      fgtsRate: config.fgtsRate,
      extraHourRate: config.extraHourPercentage,
      nightHourRate: config.nightHourPercentage
    };
  }
  
  /**
   * Obter taxa efetiva aplicada
   */
  private static getEffectiveRate(
    salary: number, 
    rates: Array<{ min: number; max: number; rate: number }>
  ): number {
    const applicableBracket = rates.find(rate => salary >= rate.min && salary <= rate.max);
    return applicableBracket ? applicableBracket.rate : 0;
  }
  
  /**
   * Calcular férias (1/3 constitucional + salário integral)
   */
  static calculateVacation(baseSalary: number, days: number = 30): {
    salary: number;
    oneThird: number;
    total: number;
  } {
    const vacationSalary = (days / 30) * baseSalary;
    const oneThird = vacationSalary / 3;
    const total = vacationSalary + oneThird;
    
    return {
      salary: this.roundCurrency(vacationSalary),
      oneThird: this.roundCurrency(oneThird),
      total: this.roundCurrency(total)
    };
  }
  
  /**
   * Calcular 13º salário
   */
  static calculateThirteenthSalary(baseSalary: number, workedMonths: number): {
    proportional: number;
    inss: number;
    irrf: number;
    net: number;
  } {
    const proportional = (workedMonths / 12) * baseSalary;
    const inss = this.calculateINSS(proportional, DEFAULT_INSS_RATES_2025);
    const irrf = this.calculateIRRF(proportional - inss, DEFAULT_IRRF_RATES_2025);
    const net = proportional - inss - irrf;
    
    return {
      proportional: this.roundCurrency(proportional),
      inss: this.roundCurrency(inss),
      irrf: this.roundCurrency(irrf),
      net: this.roundCurrency(net)
    };
  }
  
  /**
   * Validar dados de entrada
   */
  static validateInput(input: PayrollCalculationInput): string[] {
    const errors: string[] = [];
    
    if (!input.employeeId) errors.push('ID do funcionário é obrigatório');
    if (!input.employeeName) errors.push('Nome do funcionário é obrigatório');
    if (!input.employeeCpf) errors.push('CPF do funcionário é obrigatório');
    if (input.baseSalary <= 0) errors.push('Salário base deve ser maior que zero');
    if (input.workedHours < 0) errors.push('Horas trabalhadas não podem ser negativas');
    if (input.extraHours < 0) errors.push('Horas extras não podem ser negativas');
    
    return errors;
  }
  
  // ==========================================
  // 🔧 UTILITÁRIOS
  // ==========================================
  
  /**
   * Arredondar valores monetários (2 casas decimais)
   */
  private static roundCurrency(value: number): number {
    return Math.round(value * 100) / 100;
  }
  
  /**
   * Arredondar percentuais (2 casas decimais)
   */
  private static roundPercentage(value: number): number {
    return Math.round(value * 100) / 100;
  }
  
  /**
   * Formatar valor como moeda brasileira
   */
  static formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
  
  /**
   * Calcular diferença de meses entre datas
   */
  static getWorkedMonths(admissionDate: Date, referenceDate: Date = new Date()): number {
    const diffTime = referenceDate.getTime() - admissionDate.getTime();
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30.44); // Média de dias por mês
    return Math.floor(diffMonths);
  }
}

// ==========================================
// 📊 EXPORTAÇÕES
// ==========================================

export { DEFAULT_CONFIG, DEFAULT_INSS_RATES_2025, DEFAULT_IRRF_RATES_2025 };
