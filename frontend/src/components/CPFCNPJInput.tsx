

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

interface CPFCNPJInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  onValidationChange?: (isValid: boolean) => void;
  onBackendValidation?: (result: { isValid: boolean; exists: boolean; message: string }) => void;
  disabled?: boolean;
  style?: any;
  enableBackendValidation?: boolean;
}

const CPFCNPJInput: React.FC<CPFCNPJInputProps> = ({
  value,
  onChangeText,
  placeholder = "Digite seu CPF ou CNPJ",
  error,
  onValidationChange,
  onBackendValidation,
  disabled = false,
  style,
  enableBackendValidation = true
}) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputType, setInputType] = useState<'cpf' | 'cnpj' | 'unknown'>('unknown');
  const [backendResult, setBackendResult] = useState<{ isValid: boolean; exists: boolean; message: string } | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // Função para validar CPF
  const validateCPF = (cpf: string): boolean => {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    
    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
  };

  // Função para validar CNPJ
  const validateCNPJ = (cnpj: string): boolean => {
    // Remove caracteres não numéricos
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
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
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (digit1 !== parseInt(cleanCNPJ.charAt(12))) return false;
    
    // Validação do segundo dígito verificador
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    if (digit2 !== parseInt(cleanCNPJ.charAt(13))) return false;
    
    return true;
  };

  // Função para formatar CPF/CNPJ
  const formatDocument = (text: string): string => {
    const cleanText = text.replace(/\D/g, '');
    
    if (cleanText.length <= 11) {
      // Formatação CPF: 000.000.000-00
      return cleanText
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // Formatação CNPJ: 00.000.000/0000-00
      return cleanText
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
  };

  // Função para determinar tipo de documento
  const determineDocumentType = (text: string): 'cpf' | 'cnpj' | 'unknown' => {
    const cleanText = text.replace(/\D/g, '');
    if (cleanText.length <= 11) return 'cpf';
    if (cleanText.length <= 14) return 'cnpj';
    return 'unknown';
  };

  // Função para validar documento
  const validateDocument = (text: string): boolean => {
    const cleanText = text.replace(/\D/g, '');
    const type = determineDocumentType(cleanText);
    
    if (type === 'cpf' && cleanText.length === 11) {
      return validateCPF(cleanText);
    } else if (type === 'cnpj' && cleanText.length === 14) {
      return validateCNPJ(cleanText);
    }
    
    return false;
  };

  // Função para validar no backend
  const validateWithBackend = async (document: string, type: 'cpf' | 'cnpj') => {
    if (!enableBackendValidation) return;
    
    setIsValidating(true);
    try {
      const response = await fetch('http://localhost:3001/api/validation/document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: document.replace(/\D/g, ''),
          type
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setBackendResult(result.data);
          if (onBackendValidation) {
            onBackendValidation(result.data);
          }
        }
      }
    } catch (error) {
      console.error('Erro na validação backend:', error);
      // Em caso de erro, mantém apenas validação frontend
    } finally {
      setIsValidating(false);
    }
  };

  // Efeito para validar quando o valor muda
  useEffect(() => {
    const cleanValue = value.replace(/\D/g, '');
    const type = determineDocumentType(value);
    const valid = validateDocument(value);
    
    setInputType(type);
    setIsValid(valid);
    
    if (onValidationChange) {
      onValidationChange(valid);
    }

    // Validar no backend se o documento está completo e válido
    if (valid && enableBackendValidation && (cleanValue.length === 11 || cleanValue.length === 14)) {
      validateWithBackend(value, type);
    } else {
      setBackendResult(null);
    }
  }, [value, onValidationChange, enableBackendValidation]);

  // Função para lidar com mudança de texto
  const handleTextChange = (text: string) => {
    const formatted = formatDocument(text);
    onChangeText(formatted);
  };

  // Função para limpar input
  const clearInput = () => {
    onChangeText('');
    setBackendResult(null);
  };

  // Função para obter mensagem de validação
  const getValidationMessage = (): string => {
    if (backendResult) {
      return backendResult.message;
    }
    if (value.length > 0) {
      return isValid ? '✓ Válido' : '✗ Inválido';
    }
    return '';
  };

  // Função para obter cor da validação
  const getValidationColor = (): string => {
    if (backendResult) {
      if (!backendResult.isValid) return '#f44336'; // Vermelho
      if (backendResult.exists) return '#ff9800'; // Laranja (já existe)
      return '#4CAF50'; // Verde (válido e disponível)
    }
    return isValid ? '#4CAF50' : '#f44336';
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
        isValid && styles.inputContainerValid
      ]}>
        <TextInput
          style={[
            styles.input,
            disabled && styles.inputDisabled
          ]}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor="#999"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          keyboardType="numeric"
          maxLength={inputType === 'cpf' ? 14 : 18} // CPF: 000.000.000-00 (14) | CNPJ: 00.000.000/0000-00 (18)
        />
        
        {value.length > 0 && !disabled && (
          <TouchableOpacity onPress={clearInput} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Indicador de tipo de documento  */}
      {value.length > 0 && (
        <View style={styles.typeIndicator}>
          <Text style={[
            styles.typeText,
            inputType === 'cpf' && styles.typeTextCPF,
            inputType === 'cnpj' && styles.typeTextCNPJ
          ]}>
            {inputType === 'cpf' ? 'CPF' : inputType === 'cnpj' ? 'CNPJ' : 'Documento'}
          </Text>
        </View>
      )}
      
      {/* Indicador de validação  */}
      {value.length > 0 && (
        <View style={styles.validationIndicator}>
          <Text style={[
            styles.validationText,
            { color: getValidationColor() }
          ]}>
            {isValidating ? '⏳ Validando...' : getValidationMessage()}
          </Text>
        </View>
      )}
      
      {/* Mensagem de erro  */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 48,
  },
  inputContainerFocused: {
    borderColor: '#1976D2',
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: '#f44336',
    borderWidth: 2,
  },
  inputContainerValid: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'System',
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    color: '#999',
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  typeIndicator: {
    marginTop: 4,
    marginLeft: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  typeTextCPF: {
    color: '#2196F3',
  },
  typeTextCNPJ: {
    color: '#9C27B0',
  },
  validationIndicator: {
    marginTop: 2,
    marginLeft: 4,
  },
  validationText: {
    fontSize: 12,
    fontWeight: '500',
  },
  validationTextValid: {
    color: '#4CAF50',
  },
  validationTextInvalid: {
    color: '#f44336',
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default CPFCNPJInput; 