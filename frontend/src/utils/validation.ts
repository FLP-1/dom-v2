/**
 * @fileoverview Sistema centralizado de validação para o DOM v2
 * @description Centraliza todas as validações do sistema para eliminar hardcode
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-22
 */

import { getMessage, MessageType, MessageCategory } from './messages';
import { getValue } from './config';

// Tipos de validação
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

// Interface para regras de validação
export interface ValidationRule {
  type: ValidationType;
  value?: any;
  message?: string;
  customValidator?: (value: any) => boolean | string;
}

// Interface para resultado de validação
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Interface para validação de campo
export interface FieldValidation {
  field: string;
  value: any;
  rules: ValidationRule[];
}

// Sistema de validação centralizado
export class ValidationSystem {
  private static validators: Map<ValidationType, (value: any, rule: ValidationRule) => string | null> = new Map();

  // Inicializar sistema de validação
  static initialize(): void {
    this.registerValidators();
  }

  // Registrar validadores
  private static registerValidators(): void {
    // Validação obrigatória
    this.validators.set(ValidationType.REQUIRED, (value: any) => {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return getMessage('validation.required')?.message || 'Este campo é obrigatório.';
      }
      return null;
    });

    // Validação de email
    this.validators.set(ValidationType.EMAIL, (value: any) => {
      if (value && !this.isValidEmail(value)) {
        return getMessage('validation.email')?.message || 'Digite um email válido.';
      }
      return null;
    });

    // Validação de comprimento mínimo
    this.validators.set(ValidationType.MIN_LENGTH, (value: any, rule: ValidationRule) => {
      if (value && typeof value === 'string' && value.length < rule.value) {
        return `O campo deve ter pelo menos ${rule.value} caracteres.`;
      }
      return null;
    });

    // Validação de comprimento máximo
    this.validators.set(ValidationType.MAX_LENGTH, (value: any, rule: ValidationRule) => {
      if (value && typeof value === 'string' && value.length > rule.value) {
        return `O campo deve ter no máximo ${rule.value} caracteres.`;
      }
      return null;
    });

    // Validação de padrão
    this.validators.set(ValidationType.PATTERN, (value: any, rule: ValidationRule) => {
      if (value && !new RegExp(rule.value).test(value)) {
        return rule.message || 'Formato inválido.';
      }
      return null;
    });

    // Validação de CPF
    this.validators.set(ValidationType.CPF, (value: any) => {
      if (value && !this.isValidCPF(value)) {
        return getMessage('validation.cpf')?.message || 'Digite um CPF válido.';
      }
      return null;
    });

    // Validação de CNPJ
    this.validators.set(ValidationType.CNPJ, (value: any) => {
      if (value && !this.isValidCNPJ(value)) {
        return 'Digite um CNPJ válido.';
      }
      return null;
    });

    // Validação de CEP
    this.validators.set(ValidationType.CEP, (value: any) => {
      if (value && !this.isValidCEP(value)) {
        return 'Digite um CEP válido.';
      }
      return null;
    });

    // Validação de telefone
    this.validators.set(ValidationType.PHONE, (value: any) => {
      if (value && !this.isValidPhone(value)) {
        return 'Digite um telefone válido.';
      }
      return null;
    });

    // Validação de senha
    this.validators.set(ValidationType.PASSWORD, (value: any) => {
      if (value && !this.isValidPassword(value)) {
        return getMessage('validation.password')?.message || 'A senha deve ter pelo menos 8 caracteres.';
      }
      return null;
    });

    // Validação de confirmação de senha
    this.validators.set(ValidationType.CONFIRM_PASSWORD, (value: any, rule: ValidationRule) => {
      if (value && value !== rule.value) {
        return 'As senhas não coincidem.';
      }
      return null;
    });

    // Validação de data
    this.validators.set(ValidationType.DATE, (value: any) => {
      if (value && !this.isValidDate(value)) {
        return 'Digite uma data válida.';
      }
      return null;
    });

    // Validação de número
    this.validators.set(ValidationType.NUMBER, (value: any) => {
      if (value && isNaN(Number(value))) {
        return 'Digite um número válido.';
      }
      return null;
    });

    // Validação de URL
    this.validators.set(ValidationType.URL, (value: any) => {
      if (value && !this.isValidURL(value)) {
        return 'Digite uma URL válida.';
      }
      return null;
    });

    // Validação customizada
    this.validators.set(ValidationType.CUSTOM, (value: any, rule: ValidationRule) => {
      if (rule.customValidator) {
        const result = rule.customValidator(value);
        if (typeof result === 'string') {
          return result;
        }
        if (!result) {
          return rule.message || 'Validação falhou.';
        }
      }
      return null;
    });
  }

  // Validar campo único
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

  // Validar múltiplos campos
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

  // Validar formulário completo
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

  // Funções utilitárias de validação
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static isValidCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cleanCPF.charAt(9)) === digit1 && parseInt(cleanCPF.charAt(10)) === digit2;
  }

  private static isValidCNPJ(cnpj: string): boolean {
    // Remove caracteres não numéricos
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    // Verifica se tem 14 dígitos
    if (cleanCNPJ.length !== 14) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
    
    // Validação do primeiro dígito verificador
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    // Validação do segundo dígito verificador
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
    // Remove caracteres não numéricos
    const cleanCEP = cep.replace(/\D/g, '');
    
    // Verifica se tem 8 dígitos
    return cleanCEP.length === 8;
  }

  private static isValidPhone(phone: string): boolean {
    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Verifica se tem entre 10 e 11 dígitos
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

// Inicializar sistema de validação
ValidationSystem.initialize();

// Exportar funções utilitárias
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