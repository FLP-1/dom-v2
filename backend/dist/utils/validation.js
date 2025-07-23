"use strict";
/**
 * @fileoverview Utilitário de Validação
 * @directory backend/src/utils
 * @description Validações básicas para o MVP
 * @created 2024-12-19
 * @lastModified 2024-12-19
 * @author DOM Team v2
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCPF = exports.validatePassword = exports.validateCPF = void 0;
/**
 * Valida CPF brasileiro
 * @param cpf - CPF a ser validado
 * @returns true se CPF é válido
 */
const validateCPF = (cpf) => {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, '');
    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) {
        return false;
    }
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
        return false;
    }
    // Validação dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11)
        remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) {
        return false;
    }
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11)
        remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) {
        return false;
    }
    return true;
};
exports.validateCPF = validateCPF;
/**
 * Valida senha básica
 * @param password - Senha a ser validada
 * @returns true se senha é válida
 */
const validatePassword = (password) => {
    // Senha deve ter pelo menos 6 caracteres
    return password.length >= 6;
};
exports.validatePassword = validatePassword;
/**
 * Formata CPF para exibição
 * @param cpf - CPF a ser formatado
 * @returns CPF formatado (XXX.XXX.XXX-XX)
 */
const formatCPF = (cpf) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};
exports.formatCPF = formatCPF;
