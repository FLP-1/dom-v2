
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
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
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */


/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Aplicar validação
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}



/**
 * Tratamento de erros centralizado
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}

/**
 * Asserções de validação
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 */
function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}

/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error)
 * @param {string} message - Mensagem do log
 * @param {any} data - Dados adicionais
 */
function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}

/**
 * Validação de tipos
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
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
}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}:`, error.message);
  // Implementar logging, notificação, etc.
}/**
 * @fileoverview Exemplo de uso do componente CPFCNPJInput
 * @description Demonstra a validação de dígito verificador em tempo real
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CPFCNPJInput from '../ui/CPFCNPJInput';
import Toast from '../ui/Toast';

interface ValidationState {
  isValid: boolean;
  type: 'cpf' | 'cnpj' | null;
}

const CPFCNPJExample: React.FC = () => {
  const [cpfValue, setCpfValue] = useState('');
  const [cnpjValue, setCnpjValue] = useState('');
  const [cpfValidation, setCpfValidation] = useState<ValidationState>({ isValid: false, type: null });
  const [cnpjValidation, setCnpjValidation] = useState<ValidationState>({ isValid: false, type: null });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCpfValidation = (isValid: boolean, type: 'cpf' | 'cnpj' | null) => {
    setCpfValidation({ isValid, type });
    
    if (isValid && type === 'cpf') {
      setToastMessage('✅ CPF válido! Dígito verificador correto.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleCnpjValidation = (isValid: boolean, type: 'cpf' | 'cnpj' | null) => {
    setCnpjValidation({ isValid, type });
    
    if (isValid && type === 'cnpj') {
      setToastMessage('✅ CNPJ válido! Dígito verificador correto.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleSubmit = () => {
    if (cpfValidation.isValid && cnpjValidation.isValid) {
      setToastMessage('🎉 Ambos os documentos são válidos! Enviando dados...');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      setToastMessage('❌ Por favor, corrija os documentos inválidos.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🧪 Exemplo CPF/CNPJ Input</Text>
        <Text style={styles.subtitle}>
          Validação de dígito verificador em tempo real
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 CPF Input</Text>
        <CPFCNPJInput
          value={cpfValue}
          onChangeText={setCpfValue}
          onValidationChange={handleCpfValidation}
          placeholder="Digite um CPF válido"
          label="CPF"
          required
        />
        
        <View style={styles.validationInfo}>
          <Text style={styles.validationTitle}>Status da Validação:</Text>
          <Text style={[
            styles.validationText,
            { color: cpfValidation.isValid ? '#28a745' : '#dc3545' }
          ]}>
            {cpfValidation.isValid 
              ? '✅ CPF válido - Dígito verificador correto'
              : cpfValue 
                ? '❌ CPF inválido - Verifique os dígitos'
                : '⏳ Aguardando entrada...'
            }
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 CNPJ Input</Text>
        <CPFCNPJInput
          value={cnpjValue}
          onChangeText={setCnpjValue}
          onValidationChange={handleCnpjValidation}
          placeholder="Digite um CNPJ válido"
          label="CNPJ"
          required
        />
        
        <View style={styles.validationInfo}>
          <Text style={styles.validationTitle}>Status da Validação:</Text>
          <Text style={[
            styles.validationText,
            { color: cnpjValidation.isValid ? '#28a745' : '#dc3545' }
          ]}>
            {cnpjValidation.isValid 
              ? '✅ CNPJ válido - Dígito verificador correto'
              : cnpjValue 
                ? '❌ CNPJ inválido - Verifique os dígitos'
                : '⏳ Aguardando entrada...'
            }
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔍 Como Funciona</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>CPF (11 dígitos):</Text>
          <Text style={styles.infoText}>
            • Validação dos 2 dígitos verificadores{'\n'}
            • Algoritmo: Soma ponderada dos 9 primeiros dígitos{'\n'}
            • Resto da divisão por 11 determina o dígito{'\n'}
            • Se resto = 10 ou 11, dígito = 0
          </Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>CNPJ (14 dígitos):</Text>
          <Text style={styles.infoText}>
            • Validação dos 2 dígitos verificadores{'\n'}
            • Algoritmo: Soma ponderada com pesos 2-9{'\n'}
            • Resto da divisão por 11 determina o dígito{'\n'}
            • Se resto < 2, dígito = 0; senão dígito = 11 - resto
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 Exemplos Válidos</Text>
        <View style={styles.examplesContainer}>
          <Text style={styles.exampleTitle}>CPFs Válidos:</Text>
          <Text style={styles.exampleText}>
            • 111.444.777-35{'\n'}
            • 123.456.789-09{'\n'}
            • 598.769.137-00{'\n'}
            • 529.982.247-25
          </Text>
          
          <Text style={styles.exampleTitle}>CNPJs Válidos:</Text>
          <Text style={styles.exampleText}>
            • 11.222.333/0001-81{'\n'}
            • 00.000.000/0001-91{'\n'}
            • 11.444.777/0001-61{'\n'}
            • 11.111.111/1111-11
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✅ Benefícios da Validação</Text>
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitText}>
            • 🛡️ Prevenção de dados inválidos no sistema{'\n'}
            • ⚡ Validação em tempo real durante digitação{'\n'}
            • 🎯 Feedback visual imediato ao usuário{'\n'}
            • 📊 Garantia de integridade dos dados{'\n'}
            • 🔒 Conformidade com padrões brasileiros{'\n'}
            • 💡 Experiência do usuário aprimorada
          </Text>
        </View>
      </View>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastMessage.includes('✅') ? 'success' : 'error'}
          onClose={() => setShowToast(false)}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  validationInfo: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  validationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
    marginBottom: 4,
  },
  validationText: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
  examplesContainer: {
    gap: 16,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    color: '#495057',
    fontFamily: 'monospace',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 4,
  },
  benefitsContainer: {
    padding: 12,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
  },
  benefitText: {
    fontSize: 14,
    color: '#155724',
    lineHeight: 20,
  },
});

export default CPFCNPJExample; 

/**
 * 
/**
 * Alternativas consideradas:
 * - Alternativa A: Descrição e motivo da rejeição
 * - Alternativa B: Descrição e motivo da rejeição
 * - Solução escolhida: Justificativa da escolha atual
 */
Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
 */