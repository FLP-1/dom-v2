/**
 * @fileoverview Componente Table para exibição de dados tabulares
 * @description Componente reutilizável para tabelas de dados com foco na simplicidade
 * @author Equipe DOM v2
 * @version 1.0.0
 * @since 2025-07-23
 */

import React from 'react';
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