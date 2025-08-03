
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
 * @fileoverview Componente Table para exibição de dados tabulares
 * @description Componente reutilizável para tabelas de dados com foco na simplicidade
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
 */

import React from 'react';

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
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

// Tipos para o componente
export interface TableColumn {
  key: string;
  title: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

export interface TableProps {
  data: any[];
  columns: TableColumn[];
  onRowClick?: (row: any, index: number) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  loading?: boolean;
  emptyMessage?: string;
  maxHeight?: number;
  striped?: boolean;
  hoverable?: boolean;
}

export interface TableRowProps {
  row: any;
  columns: TableColumn[];
  index: number;
  onPress?: () => void;
  striped?: boolean;
  hoverable?: boolean;
}

export interface TableHeaderProps {
  columns: TableColumn[];
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

// Componente de cabeçalho da tabela
const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  onSort,
  sortColumn,
  sortDirection
}) => {
  const handleSort = (column: TableColumn) => {
    if (!column.sortable || !onSort) return;
    
    const newDirection = 
      sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column.key, newDirection);
  };

  return (
    <View style={styles.header}>
      {columns.map((column, index) => (
        <TouchableOpacity
          key={column.key}
          style={[
            styles.headerCell,
            { width: column.width || 'auto' },
            { alignItems: column.align === 'center' ? 'center' : 
                       column.align === 'right' ? 'flex-end' : 'flex-start' }
          ]}
          onPress={() => handleSort(column)}
          disabled={!column.sortable}
        >
          <Text style={[
            styles.headerText,
            column.sortable && styles.sortableHeader
          ]}>
            {column.title}
          </Text>
          {column.sortable && sortColumn === column.key && (
            <Text style={styles.sortIcon}>
              {sortDirection === 'asc' ? ' ▲' : ' ▼'}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Componente de linha da tabela
const TableRow: React.FC<TableRowProps> = ({
  row,
  columns,
  index,
  onPress,
  striped,
  hoverable
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.row,
        striped && index % 2 === 1 && styles.stripedRow,
        hoverable && styles.hoverableRow
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      {columns.map((column) => (
        <View
          key={column.key}
          style={[
            styles.cell,
            { width: column.width || 'auto' },
            { alignItems: column.align === 'center' ? 'center' : 
                       column.align === 'right' ? 'flex-end' : 'flex-start' }
          ]}
        >
          <Text style={styles.cellText} numberOfLines={2}>
            {row[column.key] || '-'}
          </Text>
        </View>
      ))}
    </TouchableOpacity>
  );
};

// Componente principal da tabela
const Table: React.FC<TableProps> = ({
  data,
  columns,
  onRowClick,
  onSort,
  sortColumn,
  sortDirection = 'asc',
  loading = false,
  emptyMessage = 'Nenhum dado encontrado',
  maxHeight = 400,
  striped = true,
  hoverable = true
}) => {
  if (loading) {
    return (
      <View style={[styles.container, { height: maxHeight }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { height: maxHeight }]}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { maxHeight }]}>
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {data.map((row, index) => (
          <TableRow
            key={index}
            row={row}
            columns={columns}
            index={index}
            onPress={onRowClick ? () => onRowClick(row, index) : undefined}
            striped={striped}
            hoverable={hoverable}
          />
        ))}
      </ScrollView>
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  sortableHeader: {
    color: '#007bff',
  },
  sortIcon: {
    fontSize: 12,
    color: '#007bff',
    marginLeft: 4,
  },
  body: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  stripedRow: {
    backgroundColor: '#f8f9fa',
  },
  hoverableRow: {
    // Efeito hover seria implementado com onPressIn/onPressOut se necessário
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
    color: '#212529',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
});

export default Table; 

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