
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
 * @fileoverview Histórico de Ponto Eletrônico
 * @directory frontend/src/components/timeclock
 * @description Componente para visualizar histórico de registros de ponto
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
import { Employee, TimeClockRecord } from './TimeClockSystem';

interface TimeClockHistoryProps {
  employee: Employee;
  timeRecords: TimeClockRecord[];
  onClose: () => void;
}

export const TimeClockHistory: React.FC<TimeClockHistoryProps> = ({
  employee,
  timeRecords,
  onClose,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTypeLabel = (type: TimeClockRecord['type']): string => {
    switch (type) {
      case 'entry':
        return 'Entrada';
      case 'exit':
        return 'Saída';
      case 'break_start':
        return 'Início Pausa';
      case 'break_end':
        return 'Fim Pausa';
      default:
        return 'Entrada';
    }
  };

  const getTypeIcon = (type: TimeClockRecord['type']): string => {
    switch (type) {
      case 'entry':
        return '🟢';
      case 'exit':
        return '🔴';
      case 'break_start':
        return '🟡';
      case 'break_end':
        return '🟢';
      default:
        return '🟢';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return '#28a745';
      case 'invalid':
        return '#dc3545';
      case 'pending':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'valid':
        return 'Válido';
      case 'invalid':
        return 'Inválido';
      case 'pending':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  const groupRecordsByDate = () => {
    const grouped: { [key: string]: TimeClockRecord[] } = {};
    
    timeRecords.forEach(record => {
      const date = formatDate(record.timestamp);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(record);
    });

    // Ordenar registros por data/hora dentro de cada grupo
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });

    return grouped;
  };

  const calculateWorkHours = (dayRecords: TimeClockRecord[]): string => {
    if (dayRecords.length < 2) return 'Incompleto';

    const entryRecord = dayRecords.find(r => r.type === 'entry');
    const exitRecord = dayRecords.find(r => r.type === 'exit');

    if (!entryRecord || !exitRecord) return 'Incompleto';

    const entryTime = new Date(entryRecord.timestamp).getTime();
    const exitTime = new Date(exitRecord.timestamp).getTime();
    const workTimeMs = exitTime - entryTime;
    const workHours = workTimeMs / (1000 * 60 * 60);

    return `${workHours.toFixed(1)}h`;
  };

  const sortedDates = Object.keys(groupRecordsByDate()).sort((a, b) => {
    const dateA = new Date(a.split('/').reverse().join('-'));
    const dateB = new Date(b.split('/').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico de Ponto</Text>
        <Text style={styles.employeeName}>{employee.name}</Text>
        <Text style={styles.employeePosition}>{employee.position}</Text>
      </View>

      <ScrollView style={styles.content}>
        {sortedDates.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
            <Text style={styles.emptySubtext}>
              Registre o primeiro ponto para este funcionário
            </Text>
          </View>
        ) : (
          sortedDates.map(date => {
            const dayRecords = groupRecordsByDate()[date];
            const workHours = calculateWorkHours(dayRecords);
            
            return (
              <View key={date} style={styles.dayCard}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayDate}>{date}</Text>
                  <Text style={styles.workHours}>Total: {workHours}</Text>
                </View>

                {dayRecords.map(record => (
                  <View key={record.id} style={styles.recordItem}>
                    <View style={styles.recordLeft}>
                      <Text style={styles.recordIcon}>{getTypeIcon(record.type)}</Text>
                      <View style={styles.recordInfo}>
                        <Text style={styles.recordType}>
                          {getTypeLabel(record.type)}
                        </Text>
                        <Text style={styles.recordTime}>
                          {formatTime(record.timestamp)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.recordRight}>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: getStatusColor(record.status) },
                        ]}
                      >
                        <Text style={styles.statusText}>
                          {getStatusText(record.status)}
                        </Text>
                      </View>
                      
                      <Text style={styles.recordLocation}>
                        📍 {record.location}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            );
          })
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
  dayCard: {
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
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dayDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workHours: {
    fontSize: 14,
    fontWeight: '600',
    color: '#28a745',
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  recordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recordIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  recordInfo: {
    flex: 1,
  },
  recordType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  recordTime: {
    fontSize: 12,
    color: '#666',
  },
  recordRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 5,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'white',
  },
  recordLocation: {
    fontSize: 10,
    color: '#999',
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

export default TimeClockHistory; 

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