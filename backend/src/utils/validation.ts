/**
 * @fileoverview Utilitários de validação para o DOM v2
 * @author DOM Team v2
 * @version 2.0.0
 * @since 2024-12-19
 */

/**
 * Valida CPF brasileiro
 * @param cpf - CPF a ser validado
 * @returns true se o CPF é válido
 */
export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) {
    return false;
  }
  
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) {
    return false;
  }
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) {
    return false;
  }
  
  return true;
};

/**
 * Valida CNPJ brasileiro
 * @param cnpj - CNPJ a ser validado
 * @returns true se o CNPJ é válido
 */
export const validateCNPJ = (cnpj: string): boolean => {
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  if (cleanCNPJ.length !== 14) {
    return false;
  }
  
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) {
    return false;
  }
  
  let sum = 0;
  let weight = 2;
  
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  
  if (digit1 !== parseInt(cleanCNPJ.charAt(12))) {
    return false;
  }
  
  sum = 0;
  weight = 2;
  
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  
  if (digit2 !== parseInt(cleanCNPJ.charAt(13))) {
    return false;
  }
  
  return true;
};

/**
 * Valida senha
 * @param password - Senha a ser validada
 * @returns true se a senha é válida
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Formata CPF
 * @param cpf - CPF a ser formatado
 * @returns CPF formatado (XXX.XXX.XXX-XX)
 */
export const formatCPF = (cpf: string): string => {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Formata CNPJ
 * @param cnpj - CNPJ a ser formatado
 * @returns CNPJ formatado (XX.XXX.XXX/XXXX-XX)
 */
export const formatCNPJ = (cnpj: string): string => {
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  return cleanCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

/**
 * Valida email
 * @param email - Email a ser validado
 * @returns true se o email é válido
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida telefone brasileiro
 * @param phone - Telefone a ser validado
 * @returns true se o telefone é válido
 */
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

/**
 * Formata telefone brasileiro
 * @param phone - Telefone a ser formatado
 * @returns Telefone formatado
 */
export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  return phone;
};

/**
 * Valida CEP brasileiro
 * @param cep - CEP a ser validado
 * @returns true se o CEP é válido
 */
export const validateCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.length === 8;
};

/**
 * Formata CEP brasileiro
 * @param cep - CEP a ser formatado
 * @returns CEP formatado (XXXXX-XXX)
 */
export const formatCEP = (cep: string): string => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.replace(/(\d{5})(\d{3})/, '$1-$2');
};

/**
 * Valida se um valor não está vazio
 * @param value - Valor a ser validado
 * @returns true se o valor não está vazio
 */
export const isNotEmpty = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  
  if (typeof value === 'object') {
    return Object.keys(value).length > 0;
  }
  
  return true;
};

/**
 * Valida se um valor é um número válido
 * @param value - Valor a ser validado
 * @returns true se o valor é um número válido
 */
export const isValidNumber = (value: any): boolean => {
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value);
  }
  
  if (typeof value === 'string') {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  }
  
  return false;
};