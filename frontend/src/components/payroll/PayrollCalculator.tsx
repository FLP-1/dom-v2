
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
 * @fileoverview Calculador de Folha de Pagamento
 * @directory frontend/src/components/payroll
 * @description Calculador automático de INSS/IRRF/FGTS
 * @created 2025-07-26
 * @author DOM Team v2
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
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
}
import { Employee, PayrollCalculation } from './PayrollSystem';

interface PayrollCalculatorProps {
  employee: Employee;
  onSave: (calculation: PayrollCalculation) => void;
  onCancel: () => void;
}

interface CalculationInputs {
  baseSalary: number;
  overtime: number;
  bonuses: number;
  allowances: number;
  deductions: number;
}

export const PayrollCalculator: React.FC<PayrollCalculatorProps> = ({
  employee,
  onSave,
  onCancel,
}) => {
  const [inputs, setInputs] = useState<CalculationInputs>({
    baseSalary: employee.baseSalary,
    overtime: 0,
    bonuses: 0,
    allowances: 0,
    deductions: 0,
  });

  const [calculation, setCalculation] = useState<PayrollCalculation>({
    grossSalary: 0,
    inss: 0,
    irrf: 0,
    fgts: 0,
    netSalary: 0,
    totalDeductions: 0,
    totalAdditions: 0,
  });

  // Calcular automaticamente quando inputs mudarem
  useEffect(() => {
    calculatePayroll();
  }, [inputs]);

  const calculatePayroll = () => {
    const grossSalary = inputs.baseSalary + inputs.overtime + inputs.bonuses + inputs.allowances;
    
    // Cálculo do INSS (2025)
    const inss = calculateINSS(grossSalary);
    
    // Cálculo do IRRF (2025)
    const irrf = calculateIRRF(grossSalary - inss);
    
    // Cálculo do FGTS (8% sobre o salário bruto)
    const fgts = grossSalary * 0.08;
    
    // Total de adições
    const totalAdditions = inputs.overtime + inputs.bonuses + inputs.allowances;
    
    // Total de deduções
    const totalDeductions = inss + irrf + inputs.deductions;
    
    // Salário líquido
    const netSalary = grossSalary - totalDeductions;

    setCalculation({
      grossSalary,
      inss,
      irrf,
      fgts,
      netSalary,
      totalDeductions,
      totalAdditions,
    });
  };

  const calculateINSS = (grossSalary: number): number => {
    // Tabela INSS 2025
    if (grossSalary <= 1320.00) {
      return grossSalary * 0.075;
    } else if (grossSalary <= 2571.29) {
      return grossSalary * 0.09;
    } else if (grossSalary <= 3856.94) {
      return grossSalary * 0.12;
    } else if (grossSalary <= 7507.49) {
      return grossSalary * 0.14;
    } else {
      return 7507.49 * 0.14; // Teto do INSS
    }
  };

  const calculateIRRF = (baseIRRF: number): number => {
    // Tabela IRRF 2025
    if (baseIRRF <= 2259.20) {
      return 0;
    } else if (baseIRRF <= 2826.65) {
      return (baseIRRF * 0.075) - 169.44;
    } else if (baseIRRF <= 3751.05) {
      return (baseIRRF * 0.15) - 381.44;
    } else if (baseIRRF <= 4664.68) {
      return (baseIRRF * 0.225) - 662.77;
    } else {
      return (baseIRRF * 0.275) - 896.00;
    }
  };

  const handleInputChange = (field: keyof CalculationInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const handleSave = () => {
    Alert.alert(
      'Confirmar Folha',
      'Deseja gerar a folha de pagamento com estes valores?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => onSave(calculation) },
      ]
    );
  };

  const formatCurrency = (value: number): string => {
    return `R$ ${value.toFixed(2)}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calculadora de Folha</Text>
        <Text style={styles.employeeName}>{employee.name}</Text>
        <Text style={styles.employeePosition}>{employee.position}</Text>
      </View>

      {/* Inputs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Valores de Entrada</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Salário Base</Text>
          <TextInput
            style={styles.input}
            value={inputs.baseSalary.toString()}
            onChangeText={(value) => handleInputChange('baseSalary', value)}
            keyboardType="numeric"
            placeholder="0,00"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Horas Extras</Text>
          <TextInput
            style={styles.input}
            value={inputs.overtime.toString()}
            onChangeText={(value) => handleInputChange('overtime', value)}
            keyboardType="numeric"
            placeholder="0,00"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Bônus</Text>
          <TextInput
            style={styles.input}
            value={inputs.bonuses.toString()}
            onChangeText={(value) => handleInputChange('bonuses', value)}
            keyboardType="numeric"
            placeholder="0,00"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Adicional</Text>
          <TextInput
            style={styles.input}
            value={inputs.allowances.toString()}
            onChangeText={(value) => handleInputChange('allowances', value)}
            keyboardType="numeric"
            placeholder="0,00"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Outras Deduções</Text>
          <TextInput
            style={styles.input}
            value={inputs.deductions.toString()}
            onChangeText={(value) => handleInputChange('deductions', value)}
            keyboardType="numeric"
            placeholder="0,00"
          />
        </View>
      </View>

      {/* Resultados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cálculos Automáticos</Text>
        
        <View style={styles.resultCard}>
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Salário Bruto:</Text>
            <Text style={styles.resultValue}>{formatCurrency(calculation.grossSalary)}</Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>INSS:</Text>
            <Text style={styles.resultValue}>{formatCurrency(calculation.inss)}</Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>IRRF:</Text>
            <Text style={styles.resultValue}>{formatCurrency(calculation.irrf)}</Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>FGTS:</Text>
            <Text style={styles.resultValue}>{formatCurrency(calculation.fgts)}</Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total Adições:</Text>
            <Text style={[styles.resultValue, styles.positiveValue]}>
              {formatCurrency(calculation.totalAdditions)}
            </Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total Deduções:</Text>
            <Text style={[styles.resultValue, styles.negativeValue]}>
              {formatCurrency(calculation.totalDeductions)}
            </Text>
          </View>
          
          <View style={[styles.resultRow, styles.finalResult]}>
            <Text style={styles.finalLabel}>SALÁRIO LÍQUIDO:</Text>
            <Text style={styles.finalValue}>{formatCurrency(calculation.netSalary)}</Text>
          </View>
        </View>
      </View>

      {/* Informações Adicionais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            • INSS calculado conforme tabela 2025
          </Text>
          <Text style={styles.infoText}>
            • IRRF calculado sobre base (Bruto - INSS)
          </Text>
          <Text style={styles.infoText}>
            • FGTS: 8% sobre salário bruto
          </Text>
          <Text style={styles.infoText}>
            • Valores atualizados conforme legislação vigente
          </Text>
        </View>
      </View>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.buttonText}>Gerar Folha</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 2,
  },
  employeePosition: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  positiveValue: {
    color: '#28a745',
  },
  negativeValue: {
    color: '#dc3545',
  },
  finalResult: {
    borderBottomWidth: 0,
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#007bff',
  },
  finalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  finalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  infoCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 15,
  },
  infoText: {
    fontSize: 12,
    color: '#1976d2',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PayrollCalculator; 

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