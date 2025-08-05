







import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}


function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}


function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}


function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}


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
import { BudgetCard } from './BudgetCard';

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent?: number;
  category: string;
  status: string;
  startDate: string;
  endDate: string;
}

interface BudgetListProps {
  budgets: Budget[];
  onBudgetPress?: (budget: Budget) => void;
}

export const BudgetList: React.FC<BudgetListProps> = ({ budgets, onBudgetPress }) => {
  const renderBudget = ({ item }: { item: Budget }) => (
    <BudgetCard 
      budget={item} 
      onPress={() => onBudgetPress?.(item)}
    />
  );

  if (budgets.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum orçamento encontrado</Text>
        <Text style={styles.emptySubtext}>
          Crie seu primeiro orçamento para começar a controlar seus gastos
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={budgets}
      renderItem={renderBudget}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});



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