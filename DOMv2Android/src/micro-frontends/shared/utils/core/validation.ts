
/**
 * 
 * @alternatives
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
  */


/**
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
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
  */


/**
 * @param {any} data - Dados a serem validados
  */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

if (!validateInput(inputData)) {
}



/**
 * @param {string} message - Mensagem de erro
  */
function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}

/**
 * Sistema de logging estruturado
 * @param {string} message - Mensagem do log
 * @param {any} data - Dados adicionais
  */
function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}/**
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
  */

import { getMessage, MessageType, MessageCategory } from './messages';
import { getValue } from './config';

export enum ValidationType {
  REQUIRED = 'required',
  EMAIL = 'email',
  MIN_LENGTH = 'minLength',
  MAX_LENGTH = 'maxLength',
  PATTERN = 'pattern',
  CUSTOM = 'custom',
  CPF = 'cpf',
  CNPJ = 'cnpj',
  CEP = 'cep',
  PHONE = 'phone',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
  DATE = 'date',
  NUMBER = 'number',
  URL = 'url'
}

export interface ValidationRule {
  type: ValidationType;
  value?: any;
  message?: string;
  customValidator?: (value: any) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FieldValidation {
  field: string;
  value: any;
  rules: ValidationRule[];
}

export class ValidationSystem {
  private static validators: Map<ValidationType, (value: any, rule: ValidationRule) => string | null> = new Map();

  static initialize(): void {
    this.registerValidators();
  }

  // Registrar validadores
  private static registerValidators(): void {
    this.validators.set(ValidationType.REQUIRED, (value: any) => {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
      }
      return null;
    });

    this.validators.set(ValidationType.EMAIL, (value: any) => {
      if (value && !this.isValidEmail(value)) {
      }
      return null;
    });

    this.validators.set(ValidationType.MIN_LENGTH, (value: any, rule: ValidationRule) => {
      if (value && typeof value === 'string' && value.length < rule.value) {
        return `O campo deve ter pelo menos ${rule.value} caracteres.`;
      }
      return null;
    });

    this.validators.set(ValidationType.MAX_LENGTH, (value: any, rule: ValidationRule) => {
      if (value && typeof value === 'string' && value.length > rule.value) {
      }
      return null;
    });

    this.validators.set(ValidationType.PATTERN, (value: any, rule: ValidationRule) => {
      if (value && !new RegExp(rule.value).test(value)) {
      }
      return null;
    });

    this.validators.set(ValidationType.CPF, (value: any) => {
      if (value && !this.isValidCPF(value)) {
      }
      return null;
    });

    this.validators.set(ValidationType.CNPJ, (value: any) => {
      if (value && !this.isValidCNPJ(value)) {
      }
      return null;
    });

    this.validators.set(ValidationType.CEP, (value: any) => {
      if (value && !this.isValidCEP(value)) {
      }
      return null;
    });

    this.validators.set(ValidationType.PHONE, (value: any) => {
      if (value && !this.isValidPhone(value)) {
      }
      return null;
    });

    this.validators.set(ValidationType.PASSWORD, (value: any) => {
      if (value && !this.isValidPassword(value)) {
        return getMessage('validation.password')?.message || 'A senha deve ter pelo menos 8 caracteres.';
      }
      return null;
    });

    this.validators.set(ValidationType.CONFIRM_PASSWORD, (value: any, rule: ValidationRule) => {
      if (value && value !== rule.value) {
      }
      return null;
    });

    this.validators.set(ValidationType.DATE, (value: any) => {
      if (value && !this.isValidDate(value)) {
      }
      return null;
    });

    this.validators.set(ValidationType.NUMBER, (value: any) => {
      if (value && isNaN(Number(value))) {
      }
      return null;
    });

    this.validators.set(ValidationType.URL, (value: any) => {
      if (value && !this.isValidURL(value)) {
      }
      return null;
    });

    this.validators.set(ValidationType.CUSTOM, (value: any, rule: ValidationRule) => {
      if (rule.customValidator) {
        const result = rule.customValidator(value);
        if (typeof result === 'string') {
          return result;
        }
        if (!result) {
        }
      }
      return null;
    });
  }

  static validateField(fieldValidation: FieldValidation): ValidationResult {
    const { field, value, rules } = fieldValidation;
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const rule of rules) {
      const validator = this.validators.get(rule.type);
      if (validator) {
        const error = validator(value, rule);
        if (error) {
          errors.push(error);
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  static validateFields(fieldValidations: FieldValidation[]): ValidationResult {
    const allErrors: string[] = [];
    const allWarnings: string[] = [];

    for (const fieldValidation of fieldValidations) {
      const result = this.validateField(fieldValidation);
      allErrors.push(...result.errors);
      allWarnings.push(...result.warnings);
    }

    return {
      isValid: allErrors.length === 0,
      errors: allErrors,
      warnings: allWarnings
    };
  }

  static validateForm(formData: Record<string, any>, validationSchema: Record<string, ValidationRule[]>): ValidationResult {
    const fieldValidations: FieldValidation[] = [];

    for (const [field, rules] of Object.entries(validationSchema)) {
      fieldValidations.push({
        field,
        value: formData[field],
        rules
      });
    }

    return this.validateFields(fieldValidations);
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static isValidCPF(cpf: string): boolean {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cleanCPF.charAt(9)) === digit1 && parseInt(cleanCPF.charAt(10)) === digit2;
  }

  private static isValidCNPJ(cnpj: string): boolean {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    if (cleanCNPJ.length !== 14) return false;
    
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
    
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cleanCNPJ.charAt(12)) === digit1 && parseInt(cleanCNPJ.charAt(13)) === digit2;
  }

  private static isValidCEP(cep: string): boolean {
    const cleanCEP = cep.replace(/\D/g, '');
    
    return cleanCEP.length === 8;
  }

  private static isValidPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '');
    
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  }

  private static isValidPassword(password: string): boolean {
    const minLength = getValue('security.passwordMinLength') || 8;
    const requireSpecial = getValue('security.passwordRequireSpecial') || false;
    
    if (password.length < minLength) return false;
    
    if (requireSpecial) {
      const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
      if (!specialChars.test(password)) return false;
    }
    
    return true;
  }

  private static isValidDate(date: string): boolean {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj.getTime());
  }

  private static isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Adicionar validador customizado
  static addValidator(type: ValidationType, validator: (value: any, rule: ValidationRule) => string | null): void {
    this.validators.set(type, validator);
  }

  // Remover validador
  static removeValidator(type: ValidationType): void {
    this.validators.delete(type);
  }

  // Obter validador
  static getValidator(type: ValidationType): ((value: any, rule: ValidationRule) => string | null) | undefined {
    return this.validators.get(type);
  }
}

ValidationSystem.initialize();

export const validateField = (fieldValidation: FieldValidation): ValidationResult => {
  return ValidationSystem.validateField(fieldValidation);
};

export const validateFields = (fieldValidations: FieldValidation[]): ValidationResult => {
  return ValidationSystem.validateFields(fieldValidations);
};

export const validateForm = (formData: Record<string, any>, validationSchema: Record<string, ValidationRule[]>): ValidationResult => {
  return ValidationSystem.validateForm(formData, validationSchema);
};

export const addValidator = (type: ValidationType, validator: (value: any, rule: ValidationRule) => string | null): void => {
  ValidationSystem.addValidator(type, validator);
};

export const removeValidator = (type: ValidationType): void => {
  ValidationSystem.removeValidator(type);
};

export const getValidator = (type: ValidationType): ((value: any, rule: ValidationRule) => string | null) | undefined => {
  return ValidationSystem.getValidator(type);
};

// Exportar sistema completo
export default ValidationSystem; 

/**
 * 
/**
 * Alternativas consideradas:
  */
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */