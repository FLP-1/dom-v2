
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
 * @fileoverview Histórico de Folhas de Pagamento
 * @directory frontend/src/components/payroll
 * @description Componente para visualizar histórico de folhas
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
import { Employee, PayrollItem } from './PayrollSystem';

interface PayrollHistoryProps {
  employee: Employee;
  payrollItems: PayrollItem[];
  onClose: () => void;
  onViewDetails: (payroll: PayrollItem) => void;
}

export const PayrollHistory: React.FC<PayrollHistoryProps> = ({
  employee,
  payrollItems,
  onClose,
  onViewDetails,
}) => {
  const formatCurrency = (value: number): string => {
    return `R$ ${value.toFixed(2)}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
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

  const sortedPayrollItems = [...payrollItems].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico de Folhas</Text>
        <Text style={styles.employeeName}>{employee.name}</Text>
        <Text style={styles.employeePosition}>{employee.position}</Text>
      </View>

      <ScrollView style={styles.content}>
        {sortedPayrollItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhuma folha encontrada</Text>
            <Text style={styles.emptySubtext}>
              Gere a primeira folha de pagamento para este funcionário
            </Text>
          </View>
        ) : (
          sortedPayrollItems.map(payroll => (
            <View key={payroll.id} style={styles.historyCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.periodText}>
                  {payroll.month}/{payroll.year}
                </Text>
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

              <View style={styles.cardContent}>
                <View style={styles.valueRow}>
                  <Text style={styles.valueLabel}>Salário Bruto:</Text>
                  <Text style={styles.valueAmount}>
                    {formatCurrency(payroll.grossSalary)}
                  </Text>
                </View>

                <View style={styles.valueRow}>
                  <Text style={styles.valueLabel}>Salário Líquido:</Text>
                  <Text style={styles.valueAmount}>
                    {formatCurrency(payroll.netSalary)}
                  </Text>
                </View>

                <View style={styles.deductionsRow}>
                  <Text style={styles.deductionsLabel}>Deduções:</Text>
                  <Text style={styles.deductionsText}>
                    INSS: {formatCurrency(payroll.inss)} | 
                    IRRF: {formatCurrency(payroll.irrf)}
                  </Text>
                </View>

                <View style={styles.dateRow}>
                  <Text style={styles.dateLabel}>Gerada em:</Text>
                  <Text style={styles.dateText}>
                    {formatDate(payroll.createdAt)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => onViewDetails(payroll)}
              >
                <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  periodText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  cardContent: {
    marginBottom: 15,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  deductionsRow: {
    marginBottom: 8,
  },
  deductionsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  deductionsText: {
    fontSize: 12,
    color: '#999',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: '#999',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  detailsButton: {
    backgroundColor: '#17a2b8',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
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

export default PayrollHistory; 

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