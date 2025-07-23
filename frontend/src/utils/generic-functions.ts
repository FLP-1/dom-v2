/**
 * @fileoverview Repositório de funções genéricas reutilizáveis
 * @description Funções utilitárias que podem ser usadas em múltiplas funcionalidades
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
 * Função genérica para criar notificações do sistema
 * @param type - Tipo da notificação
 * @param customMessage - Mensagem personalizada (opcional)
 * @param options - Opções adicionais (opcional)
 * @returns Objeto da notificação criada
 */
export function createSystemNotification(
  type: NotificationType, 
  customMessage: string | null = null, 
  options: Record<string, any> = {}
): SystemNotification | null {
  // Validação de entrada
  if (!type || typeof type !== 'string') {
    console.error('Tipo de notificação inválido:', type);
    return null;
  }

  const messages: Record<NotificationType, string> = {
    'TASK_REMINDER': 'Lembrete: Você tem tarefas pendentes para hoje',
    'PAYMENT_DUE': 'Pagamento vencendo: Há pagamentos que vencem em breve',
    'SYSTEM_UPDATE': 'Sistema atualizado: Novas funcionalidades disponíveis',
    'HELP_TIP': 'Dica: Use o botão + para criar novas tarefas rapidamente',
    'PURCHASE_REMINDER': 'Lembrete: Há compras pendentes para hoje',
    'TASK_COMPLETED': 'Tarefa concluída com sucesso',
    'PAYMENT_RECEIVED': 'Pagamento recebido com sucesso',
    'PURCHASE_COMPLETED': 'Compra realizada com sucesso',
    'EMPLOYEE_ASSIGNED': 'Funcionário designado para tarefa',
    'DEADLINE_APPROACHING': 'Prazo se aproximando',
    // ALERTAS CRÍTICOS - PENSAMENTO CRÍTICO
    'CRITICAL_ERROR': 'ERRO CRÍTICO: Problema identificado que requer correção imediata',
    'VALIDATION_NEEDED': 'VALIDAÇÃO NECESSÁRIA: Informação precisa ser verificada',
    'ASSUMPTION_ALERT': 'ALERTA DE SUPOSIÇÃO: Suposição identificada que precisa ser questionada',
    'LOGIC_ERROR': 'ERRO LÓGICO: Possível falha lógica identificada',
    'SOURCE_MISSING': 'FONTE AUSENTE: Informação sem fonte confiável documentada',
    'ALTERNATIVE_MISSING': 'ALTERNATIVA AUSENTE: Outras opções não foram consideradas'
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
    // ALERTAS CRÍTICOS - PRIORIDADE MÁXIMA
    'CRITICAL_ERROR': 'critical',
    'VALIDATION_NEEDED': 'high',
    'ASSUMPTION_ALERT': 'high',
    'LOGIC_ERROR': 'critical',
    'SOURCE_MISSING': 'high',
    'ALTERNATIVE_MISSING': 'medium'
  };

  // Verificar se o tipo é válido
  if (!messages[type]) {
    console.error('Tipo de notificação não reconhecido:', type);
    return null;
  }

  try {
    // Gerar ID único com timestamp + random para evitar duplicatas
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

    console.log(`[${new Date().toISOString()}] ` + 'Notificação criada com sucesso:', notification.title);
    return notification;
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    return null;
  }
}

/**
 * Função genérica para validar entrada de dados
 * @param data - Dados a serem validados
 * @param rules - Regras de validação
 * @returns Resultado da validação
 */
export function validateInput(data: Record<string, any>, rules: Record<string, ValidationRule>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];

    // Verificar se é obrigatório
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field} é obrigatório`);
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
              errors.push(`${field} deve ser um número`);
            }
            break;
          case 'email':
            if (typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
              errors.push(`${field} deve ser um email válido`);
            }
            break;
          case 'date':
            if (isNaN(Date.parse(value))) {
              errors.push(`${field} deve ser uma data válida`);
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
          errors.push(`${field} deve ter no máximo ${rule.maxLength} caracteres`);
        }
      }

      // Verificar padrão
      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        errors.push(`${field} não segue o padrão esperado`);
      }

      // Verificar validação customizada
      if (rule.custom && !rule.custom(value)) {
        errors.push(`${field} falhou na validação customizada`);
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
 * Função para formatar datas
 * @param date - Data a ser formatada
 * @param format - Formato desejado
 * @param customFormat - Formato customizado (opcional)
 * @returns Data formatada
 */
export function formatDate(date: Date | string, format: 'short' | 'long' | 'iso' = 'short', customFormat?: string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Data inválida';
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
 * Função debounce para otimizar performance
 * @param func - Função a ser executada
 * @param delay - Delay em milissegundos
 * @returns Função com debounce
 */
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Função throttle para limitar execução
 * @param func - Função a ser executada
 * @param limit - Limite de execuções por segundo
 * @returns Função com throttle
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
 * Gerar ID único
 * @param prefix - Prefixo para o ID
 * @returns ID único
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
 * @param field - Campo específico (opcional)
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
 * @param field - Campo para comparação (opcional)
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
 * Validar fonte de informação
 * @param information - Informação a ser validada
 * @param source - Fonte da informação
 * @param sourceType - Tipo da fonte
 * @returns Resultado da validação
 */
export function validateInformationSource(
  information: string, 
  source: InformationSource, 
  sourceType: 'documentation' | 'research' | 'expert' | 'official'
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verificar se a fonte é do tipo correto
  if (source.type !== sourceType) {
    errors.push(`Fonte deve ser do tipo ${sourceType}`);
  }

  // Verificar confiabilidade
  if (source.reliability === 'low') {
    warnings.push('Fonte tem baixa confiabilidade');
  }

  // Verificar se tem URL para fontes online
  if (sourceType === 'documentation' && !source.url) {
    warnings.push('Documentação deve ter URL de referência');
  }

  // Verificar se tem autor para fontes acadêmicas
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
 * @param selectedOption - Opção selecionada
 * @param reason - Motivo da seleção
 * @returns Resultado da validação
 */
export function validateAlternatives(
  alternatives: Alternative[], 
  selectedOption: string, 
  reason: string
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verificar se há alternativas
  if (alternatives.length < 2) {
    errors.push('Deve haver pelo menos 2 alternativas');
  }

  // Verificar se a opção selecionada existe
  const selected = alternatives.find(alt => alt.id === selectedOption);
  if (!selected) {
    errors.push('Opção selecionada não existe nas alternativas');
  }

  // Verificar se há razão para a seleção
  if (!reason || reason.trim().length < 10) {
    warnings.push('Razão da seleção deve ser detalhada');
  }

  // Verificar se alternativas têm prós e contras
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
 * Validar suposições
 * @param assumptions - Lista de suposições
 * @param validations - Validações realizadas
 * @returns Resultado da validação
 */
export function validateAssumptions(
  assumptions: Assumption[], 
  validations: Record<string, boolean>
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verificar se há suposições
  if (assumptions.length === 0) {
    warnings.push('Nenhuma suposição identificada');
  }

  // Verificar se suposições foram questionadas
  assumptions.forEach(assumption => {
    if (!assumption.questioned) {
      errors.push(`Suposição ${assumption.id} deve ser questionada`);
    }
    if (!assumption.validated) {
      warnings.push(`Suposição ${assumption.id} deve ser validada`);
    }
    if (assumption.validated && !assumption.evidence) {
      warnings.push(`Suposição ${assumption.id} validada deve ter evidência`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validar lógica
 * @param logic - Descrição da lógica
 * @param testCases - Casos de teste
 * @param results - Resultados dos testes
 * @returns Resultado da validação
 */
export function validateLogic(
  logic: string, 
  testCases: LogicTest[], 
  results: Record<string, any>
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verificar se há descrição da lógica
  if (!logic || logic.trim().length < 20) {
    errors.push('Lógica deve ser descrita detalhadamente');
  }

  // Verificar se há casos de teste
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
 * Checklist de pensamento crítico
 * @param decision - Decisão a ser avaliada
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

  // Verificar suposições
  if (decision.assumptions.length === 0) {
    warnings.push('Deve identificar suposições');
  }

  // Verificar testes lógicos
  if (decision.logicTests.length === 0) {
    warnings.push('Deve testar a lógica');
  }

  // Verificar transparência
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