/**
 * @fileoverview Componente CPFCNPJInput para formulários brasileiros
 * @description Input específico para CPF/CNPJ com validação e formatação automática
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

// Tipos para o componente
export interface CPFCNPJInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onValidationChange?: (isValid: boolean, type: 'cpf' | 'cnpj' | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  style?: any;
  labelStyle?: any;
  inputStyle?: any;
  errorStyle?: any;
}

// Utilitários para validação
const cleanDocument = (document: string): string => {
  return document.replace(/\D/g, '');
};

const formatCPF = (cpf: string): string => {
  const cleaned = cleanDocument(cpf);
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatCNPJ = (cnpj: string): string => {
  const cleaned = cleanDocument(cnpj);
  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

const validateCPF = (cpf: string): boolean => {
  const cleaned = cleanDocument(cpf);
  
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false; // Todos os dígitos iguais
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.charAt(10))) return false;
  
  return true;
};

const validateCNPJ = (cnpj: string): boolean => {
  const cleaned = cleanDocument(cnpj);
  
  if (cleaned.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cleaned)) return false; // Todos os dígitos iguais
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  let weight = 2;
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleaned.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(cleaned.charAt(12))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  weight = 2;
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleaned.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (digit2 !== parseInt(cleaned.charAt(13))) return false;
  
  return true;
};

const getDocumentType = (document: string): 'cpf' | 'cnpj' | null => {
  const cleaned = cleanDocument(document);
  if (cleaned.length === 11) return 'cpf';
  if (cleaned.length === 14) return 'cnpj';
  return null;
};

// Componente principal
const CPFCNPJInput: React.FC<CPFCNPJInputProps> = ({
  value,
  onChangeText,
  onValidationChange,
  placeholder = 'Digite o CPF ou CNPJ',
  label,
  error,
  disabled = false,
  required = false,
  autoFocus = false,
  maxLength = 18,
  style,
  labelStyle,
  inputStyle,
  errorStyle
}) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [documentType, setDocumentType] = useState<'cpf' | 'cnpj' | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Formatar e validar o documento
  const handleChangeText = (text: string) => {
    const cleaned = cleanDocument(text);
    let formatted = text;
    let type: 'cpf' | 'cnpj' | null = null;
    let valid = false;

    if (cleaned.length <= 11) {
      formatted = formatCPF(cleaned);
      type = cleaned.length === 11 ? 'cpf' : null;
      valid = cleaned.length === 11 ? validateCPF(cleaned) : false;
    } else {
      formatted = formatCNPJ(cleaned);
      type = cleaned.length === 14 ? 'cnpj' : null;
      valid = cleaned.length === 14 ? validateCNPJ(cleaned) : false;
    }

    setDocumentType(type);
    setIsValid(valid);
    onChangeText(formatted);
    
    if (onValidationChange) {
      onValidationChange(valid, type);
    }
  };

  // Determinar o tipo de documento baseado no valor atual
  useEffect(() => {
    if (value) {
      const type = getDocumentType(value);
      const valid = type === 'cpf' ? validateCPF(value) : 
                   type === 'cnpj' ? validateCNPJ(value) : false;
      
      setDocumentType(type);
      setIsValid(valid);
      
      if (onValidationChange) {
        onValidationChange(valid, type);
      }
    }
  }, [value, onValidationChange]);

  const getStatusColor = () => {
    if (!value) return '#6c757d';
    if (isValid) return '#28a745';
    if (documentType) return '#dc3545';
    return '#6c757d';
  };

  const getStatusText = () => {
    if (!value) return '';
    if (isValid) return documentType === 'cpf' ? 'CPF Válido' : 'CNPJ Válido';
    if (documentType) return documentType === 'cpf' ? 'CPF Inválido' : 'CNPJ Inválido';
    return '';
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
        disabled && styles.inputContainerDisabled
      ]}>
        <TextInput
          style={[
            styles.input,
            inputStyle,
            disabled && styles.inputDisabled
          ]}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor="#6c757d"
          editable={!disabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
          keyboardType="numeric"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {value && (
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusIndicator,
              { backgroundColor: getStatusColor() }
            ]} />
            <Text style={[
              styles.statusText,
              { color: getStatusColor() }
            ]}>
              {getStatusText()}
            </Text>
          </View>
        )}
      </View>
      
      {error && (
        <Text style={[styles.errorText, errorStyle]}>
          {error}
        </Text>
      )}
      
      {value && !error && !isValid && documentType && (
        <Text style={styles.validationText}>
          {documentType === 'cpf' 
            ? 'CPF inválido. Verifique os dígitos.' 
            : 'CNPJ inválido. Verifique os dígitos.'}
        </Text>
      )}
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 8,
  },
  required: {
    color: '#dc3545',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    minHeight: 48,
  },
  inputContainerFocused: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: '#dc3545',
  },
  inputContainerDisabled: {
    backgroundColor: '#f8f9fa',
    borderColor: '#e9ecef',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#212529',
    paddingVertical: 12,
  },
  inputDisabled: {
    color: '#6c757d',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 12,
    color: '#dc3545',
    marginTop: 4,
  },
  validationText: {
    fontSize: 12,
    color: '#dc3545',
    marginTop: 4,
  },
});

export default CPFCNPJInput; 