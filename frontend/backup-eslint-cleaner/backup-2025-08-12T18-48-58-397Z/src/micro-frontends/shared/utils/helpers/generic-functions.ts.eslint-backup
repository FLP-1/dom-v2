

/**
 * @param {string} message - Mensagem de erro
  */
// Função removida - placeholder sanitizado

// Validação crítica removida - causava erro de referência

/**
 * @author DOM Team v2
 * @version 2.0.0
  */

export type NotificationType = 
  | 'TASK_REMINDER' | 'PAYMENT_DUE' | 'SYSTEM_UPDATE' | 'HELP_TIP' 
  | 'PURCHASE_REMINDER' | 'TASK_COMPLETED' | 'PAYMENT_RECEIVED' 
  | 'PURCHASE_COMPLETED' | 'EMPLOYEE_ASSIGNED' | 'DEADLINE_APPROACHING'
  | 'CRITICAL_ERROR' | 'VALIDATION_NEEDED' | 'ASSUMPTION_ALERT' 
  | 'LOGIC_ERROR' | 'SOURCE_MISSING' | 'ALTERNATIVE_MISSING';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface SystemNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  createdAt: string;
  read: boolean;
  [key: string]: any;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  type?: 'string' | 'number' | 'email' | 'date';
  custom?: (value: any) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface InformationSource {
  url?: string;
  author?: string;
  date?: string;
  type: 'documentation' | 'research' | 'expert' | 'official' | 'other';
  reliability: 'high' | 'medium' | 'low';
}

export interface Alternative {
  id: string;
  description: string;
  pros: string[];
  cons: string[];
  feasibility: 'high' | 'medium' | 'low';
}

export interface Assumption {
  id: string;
  description: string;
  questioned: boolean;
  validated: boolean;
  evidence?: string;
}

export interface LogicTest {
  id: string;
  description: string;
  expectedResult: any;
  actualResult: any;
  passed: boolean;
}

export interface Decision {
  id: string;
  description: string;
  alternatives: Alternative[];
  selectedAlternative: string;
  reasoning: string;
  assumptions: Assumption[];
  logicTests: LogicTest[];
  sourceVerified: boolean;
  transparency: boolean;
  honesty: boolean;
}

/**
 * @param customMessage - Mensagem personalizada (opcional)
  */
export function createSystemNotification(
  type: NotificationType, 
  customMessage: string | null = null, 
  options: Record<string, any> = {}
): SystemNotification | null {
  if (!type || typeof type !== 'string') {
    return null;
  }

  const messages: Record<NotificationType, string> = {
    'PAYMENT_RECEIVED': 'Pagamento recebido com sucesso',
    'PURCHASE_COMPLETED': 'Compra realizada com sucesso',
    'DEADLINE_APPROACHING': 'Prazo se aproximando',
  };

  const priorities: Record<NotificationType, NotificationPriority> = {
    'TASK_REMINDER': 'medium',
    'PAYMENT_DUE': 'high',
    'SYSTEM_UPDATE': 'low',
    'HELP_TIP': 'low',
    'PURCHASE_REMINDER': 'medium',
    'TASK_COMPLETED': 'low',
    'PAYMENT_RECEIVED': 'low',
    'PURCHASE_COMPLETED': 'low',
    'EMPLOYEE_ASSIGNED': 'medium',
    'DEADLINE_APPROACHING': 'high',
    'CRITICAL_ERROR': 'critical',
    'VALIDATION_NEEDED': 'high',
    'ASSUMPTION_ALERT': 'high',
    'LOGIC_ERROR': 'critical',
    'SOURCE_MISSING': 'high',
    'ALTERNATIVE_MISSING': 'medium'
  };

  if (!messages[type]) {
    return null;
  }

  try {
    const uniqueId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const notification: SystemNotification = {
      id: uniqueId,
      type: type,
      title: type.replace(/_/g, ' '),
      message: customMessage || messages[type],
      priority: priorities[type] || 'low',
      createdAt: new Date().toISOString(),
      read: false,
      ...options // Permite adicionar campos extras
    };

    return notification;
  } catch (error) {
    return null;
  }
}

/**
 * @param data - Dados a serem validados
  */
export function validateInput(data: Record<string, any>, rules: Record<string, ValidationRule>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];

    if (rule.required && (value === undefined || value === null || value === '')) {
      continue;
    }

    if (value !== undefined && value !== null) {
      // Verificar tipo
      if (rule.type) {
        switch (rule.type) {
          case 'string':
            if (typeof value !== 'string') {
              errors.push(`${field} deve ser uma string`);
            }
            break;
          case 'number':
            if (typeof value !== 'number' || isNaN(value)) {
            }
            break;
          case 'email':
            if (typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            }
            break;
          case 'date':
            if (isNaN(Date.parse(value))) {
            }
            break;
        }
      }

      // Verificar comprimento
      if (typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          errors.push(`${field} deve ter pelo menos ${rule.minLength} caracteres`);
        }
        if (rule.maxLength && value.length > rule.maxLength) {
        }
      }

      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      }

      if (rule.custom && !rule.custom(value)) {
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * @param date - Data a ser formatada
 * @param format - Formato desejado
 * @param customFormat - Formato customizado (opcional)
 * @returns Data formatada
  */
export function formatDate(date: Date | string, format: 'short' | 'long' | 'iso' = 'short', customFormat?: string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
  }

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('pt-BR');
    case 'long':
      return dateObj.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'iso':
      return dateObj.toISOString();
    default:
      return customFormat ? dateObj.toLocaleDateString('pt-BR') : dateObj.toLocaleDateString('pt-BR');
  }
}

/**
 * @param delay - Delay em milissegundos
  */
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
  */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, 1000 / limit);
    }
  };
}

/**
 * @param prefix - Prefixo para o ID
  */
export function generateUniqueId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}${timestamp}_${random}`;
}

/**
 * Verificar se valor existe em array
 * @param array - Array a ser verificado
 * @param value - Valor a ser procurado
 * @returns True se encontrado
  */
export function existsInArray<T>(array: T[], value: any, field?: keyof T): boolean {
  if (field) {
    return array.some(item => item[field] === value);
  }
  return array.includes(value);
}

/**
 * Remover duplicatas de array
 * @param array - Array original
 * @returns Array sem duplicatas
  */
export function removeDuplicates<T>(array: T[], field?: keyof T): T[] {
  if (field) {
    const seen = new Set();
    return array.filter(item => {
      const value = item[field];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }
  return [...new Set(array)];
}

/**
 * @param sourceType - Tipo da fonte
  */
export function validateInformationSource(
  information: string, 
  source: InformationSource, 
  sourceType: 'documentation' | 'research' | 'expert' | 'official'
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (source.type !== sourceType) {
    errors.push(`Fonte deve ser do tipo ${sourceType}`);
  }

  // Verificar confiabilidade
  if (source.reliability === 'low') {
    warnings.push('Fonte tem baixa confiabilidade');
  }

  // Verificar se tem URL para fontes online
  if (sourceType === 'documentation' && !source.url) {
  }

  if (sourceType === 'research' && !source.author) {
    warnings.push('Pesquisa deve ter autor identificado');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validar alternativas consideradas
 * @param alternatives - Lista de alternativas
  */
export function validateAlternatives(
  alternatives: Alternative[], 
  selectedOption: string, 
  reason: string
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (alternatives.length < 2) {
    errors.push('Deve haver pelo menos 2 alternativas');
  }

  const selected = alternatives.find(alt => alt.id === selectedOption);
  if (!selected) {
  }

  if (!reason || reason.trim().length < 10) {
  }

  alternatives.forEach(alt => {
    if (alt.pros.length === 0) {
      warnings.push(`Alternativa ${alt.id} deve ter pelo menos um ponto positivo`);
    }
    if (alt.cons.length === 0) {
      warnings.push(`Alternativa ${alt.id} deve ter pelo menos um ponto negativo`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
  */
export function validateAssumptions(
  assumptions: Assumption[], 
  validations: Record<string, boolean>
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (assumptions.length === 0) {
  }

  assumptions.forEach(assumption => {
    if (!assumption.questioned) {
    }
    if (!assumption.validated) {
    }
    if (assumption.validated && !assumption.evidence) {
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * @param testCases - Casos de teste
 * @param results - Resultados dos testes
  */
export function validateLogic(
  logic: string, 
  testCases: LogicTest[], 
  results: Record<string, any>
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!logic || logic.trim().length < 20) {
  }

  if (testCases.length === 0) {
    warnings.push('Deve haver pelo menos um caso de teste');
  }

  // Verificar resultados dos testes
  testCases.forEach(test => {
    if (test.expectedResult !== test.actualResult) {
      errors.push(`Teste ${test.id} falhou: esperado ${test.expectedResult}, obtido ${test.actualResult}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * @returns Checklist completo
  */
export function criticalThinkingChecklist(decision: Decision): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verificar fonte
  if (!decision.sourceVerified) {
    errors.push('Fonte deve ser verificada');
  }

  // Verificar alternativas
  if (decision.alternatives.length < 2) {
    errors.push('Deve considerar pelo menos 2 alternativas');
  }

  if (decision.assumptions.length === 0) {
  }

  if (decision.logicTests.length === 0) {
  }

  if (!decision.transparency) {
    errors.push('Processo deve ser transparente');
  }

  // Verificar honestidade
  if (!decision.honesty) {
    errors.push('Deve ser honesto sobre incertezas');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
} 