
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
 * @fileoverview Detalhes da Folha de Pagamento
 * @directory frontend/src/components/payroll
 * @description Componente para visualizar detalhes completos da folha
 * @created 2025-07-26
 * @author DOM Team v2
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
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
import { PayrollItem } from './PayrollSystem';

interface PayrollDetailsProps {
  payroll: PayrollItem;
  onClose: () => void;
}

export const PayrollDetails: React.FC<PayrollDetailsProps> = ({
  payroll,
  onClose,
}) => {
  const formatCurrency = (value: number): string => {
    return `R$ ${value.toFixed(2)}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'approved':
        return '#17a2b8';
      case 'paid':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovada';
      case 'paid':
        return 'Paga';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalhes da Folha</Text>
        <Text style={styles.employeeName}>{payroll.employeeName}</Text>
        <Text style={styles.period}>
          Período: {payroll.month}/{payroll.year}
        </Text>
      </View>

      {/* Status */}
      <View style={styles.section}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(payroll.status) },
            ]}
          >
            <Text style={styles.statusText}>
              {getStatusText(payroll.status)}
            </Text>
          </View>
        </View>
      </View>

      {/* Valores Principais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Valores Principais</Text>
        
        <View style={styles.valueCard}>
          <View style={styles.valueRow}>
            <Text style={styles.valueLabel}>Salário Base:</Text>
            <Text style={styles.valueAmount}>
              {formatCurrency(payroll.baseSalary)}
            </Text>
          </View>
          
          <View style={styles.valueRow}>
            <Text style={styles.valueLabel}>Salário Bruto:</Text>
            <Text style={styles.valueAmount}>
              {formatCurrency(payroll.grossSalary)}
            </Text>
          </View>
          
          <View style={[styles.valueRow, styles.finalRow]}>
            <Text style={styles.finalLabel}>SALÁRIO LÍQUIDO:</Text>
            <Text style={styles.finalAmount}>
              {formatCurrency(payroll.netSalary)}
            </Text>
          </View>
        </View>
      </View>

      {/* Deduções */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deduções</Text>
        
        <View style={styles.deductionsCard}>
          <View style={styles.valueRow}>
            <Text style={styles.valueLabel}>INSS:</Text>
            <Text style={[styles.valueAmount, styles.deductionAmount]}>
              -{formatCurrency(payroll.inss)}
            </Text>
          </View>
          
          <View style={styles.valueRow}>
            <Text style={styles.valueLabel}>IRRF:</Text>
            <Text style={[styles.valueAmount, styles.deductionAmount]}>
              -{formatCurrency(payroll.irrf)}
            </Text>
          </View>
          
          <View style={styles.valueRow}>
            <Text style={styles.valueLabel}>Outras Deduções:</Text>
            <Text style={[styles.valueAmount, styles.deductionAmount]}>
              -{formatCurrency(payroll.otherDeductions)}
            </Text>
          </View>
          
          <View style={[styles.valueRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Deduções:</Text>
            <Text style={[styles.totalAmount, styles.deductionAmount]}>
              -{formatCurrency(payroll.totalDeductions)}
            </Text>
          </View>
        </View>
      </View>

      {/* Adições */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adições</Text>
        
        <View style={styles.additionsCard}>
          <View style={styles.valueRow}>
            <Text style={styles.valueLabel}>Outras Adições:</Text>
            <Text style={[styles.valueAmount, styles.additionAmount]}>
              +{formatCurrency(payroll.otherAdditions)}
            </Text>
          </View>
          
          <View style={[styles.valueRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Adições:</Text>
            <Text style={[styles.totalAmount, styles.additionAmount]}>
              +{formatCurrency(payroll.totalAdditions)}
            </Text>
          </View>
        </View>
      </View>

      {/* FGTS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FGTS</Text>
        
        <View style={styles.fgtsCard}>
          <View style={styles.valueRow}>
            <Text style={styles.valueLabel}>Valor FGTS (8%):</Text>
            <Text style={styles.valueAmount}>
              {formatCurrency(payroll.fgts)}
            </Text>
          </View>
          
          <Text style={styles.fgtsInfo}>
            FGTS é depositado pelo empregador e não é descontado do funcionário
          </Text>
        </View>
      </View>

      {/* Informações do Sistema */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Sistema</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Criada em:</Text>
            <Text style={styles.infoValue}>
              {formatDate(payroll.createdAt)}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Atualizada em:</Text>
            <Text style={styles.infoValue}>
              {formatDate(payroll.updatedAt)}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID da Folha:</Text>
            <Text style={styles.infoValue}>{payroll.id}</Text>
          </View>
        </View>
      </View>

      {/* Botão Fechar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fechar</Text>
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
  period: {
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  valueCard: {
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
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  valueLabel: {
    fontSize: 14,
    color: '#666',
  },
  valueAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  finalRow: {
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
  finalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  deductionsCard: {
    backgroundColor: '#fff5f5',
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
  deductionAmount: {
    color: '#dc3545',
  },
  additionsCard: {
    backgroundColor: '#f0fff4',
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
  additionAmount: {
    color: '#28a745',
  },
  totalRow: {
    borderBottomWidth: 0,
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fgtsCard: {
    backgroundColor: '#f0f8ff',
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
  fgtsInfo: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
  infoCard: {
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
  },
  closeButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PayrollDetails; 

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