
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
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Componente React/React Native
 * 
 * @dependencies
 * - React, React Native
 * 
 * @usage
 * <ComponentName prop={value} />
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */









// FunÃ§Ã£o removida - causava erros de referÃªncia no frontend;
  
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

// Aplicar logging



// FunÃ§Ã£o removida - causava erros de referÃªncia no frontend

// ValidaÃ§Ã£o de input removida - causava erro de referÃªncia




function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}


function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getValue } from '../../utils/config';

export interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

// Interface das props
export interface CEPInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAddressFound?: (address: Address) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  error?: string;
  style?: any;
  inputStyle?: any;
  labelStyle?: any;
  errorStyle?: any;
}

// Componente CEPInput
const CEPInput: React.FC<CEPInputProps> = ({
  value,
  onChangeText,
  onAddressFound,
  placeholder = 'Digite o CEP',
  label = 'CEP',
  required = false,
  disabled = false,
  showLabel = true,
  error,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
}) => {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Validar formato do CEP
  const validateCEP = (cep: string): boolean => {
    const cleanCEP = cep.replace(/\D/g, '');
    return cleanCEP.length === 8;
  };

  // Formatar CEP (00000-000)
  const formatCEP = (cep: string): string => {
    const cleanCEP = cep.replace(/\D/g, '');
    if (cleanCEP.length <= 5) {
      return cleanCEP;
    }
    return `${cleanCEP.slice(0, 5)}-${cleanCEP.slice(5, 8)}`;
  };

  const searchAddress = async (cep: string) => {
    if (!validateCEP(cep)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setLoading(true);

    try {
      const cleanCEP = cep.replace(/\D/g, '');
      const viaCepUrl = getValue('integration.viacep.baseUrl') || 'https://viacep.com.br/ws';
      const response = await fetch(`${viaCepUrl}/${cleanCEP}/json/`);

      if (!response.ok) {
      }

      const data: Address = await response.json();

      if (data.erro) {
        return;
      }

      onAddressFound?.(data);
      
      Alert.alert(
        `${data.logradouro}, ${data.bairro}\n${data.localidade} - ${data.uf}`
      );

    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeText = (text: string) => {
    const formatted = formatCEP(text);
    onChangeText(formatted);
    
    // Validar formato
    const cleanText = text.replace(/\D/g, '');
    setIsValid(cleanText.length === 0 || cleanText.length === 8);
  };

  useEffect(() => {
    const cleanCEP = value.replace(/\D/g, '');
    if (cleanCEP.length === 8 && validateCEP(cleanCEP)) {
      searchAddress(cleanCEP);
    }
  }, [value]);

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            inputStyle,
            !isValid && styles.inputError,
            disabled && styles.inputDisabled,
          ]}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType="numeric"
          maxLength={9}
          editable={!disabled}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {loading && (
          <ActivityIndicator
            style={styles.loading}
            size="small"
            color="#007AFF"
          />
        )}
        
        {!loading && value.replace(/\D/g, '').length === 8 && (
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => searchAddress(value)}
            disabled={disabled}
          >
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={[styles.error, errorStyle]}>{error}</Text>
      )}
      
      {!isValid && !error && (
        <Text style={[styles.error, errorStyle]}>
        </Text>
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#F44336',
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  inputError: {
    borderColor: '#F44336',
  },
  inputDisabled: {
    backgroundColor: '#F5F5F5',
    color: '#999',
  },
  loading: {
    position: 'absolute',
    right: 16,
  },
  searchButton: {
    position: 'absolute',
    right: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 16,
  },
  searchButtonText: {
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
  },
});

export default CEPInput; 
