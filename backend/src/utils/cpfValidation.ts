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
