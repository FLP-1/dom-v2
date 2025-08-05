







import React from 'react';


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
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent?: number;
  category: string;
  status: 'active' | 'inactive' | 'completed';
  startDate: string;
  endDate: string;
}

interface BudgetCardProps {
  budget: Budget;
  detailed?: boolean;
  onPress?: () => void;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget, detailed = false, onPress }) => {
  const progress = budget.spent ? (budget.spent / budget.amount) * 100 : 0;
  const remaining = budget.amount - (budget.spent || 0);

  const getStatusColor = () => {
    if (progress >= 90) return '#FF3B30';
    if (progress >= 75) return '#FF9500';
    return '#34C759';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.name}>{budget.name}</Text>
        <Text style={styles.category}>{budget.category}</Text>
      </View>

      <View style={styles.amounts}>
        <View style={styles.amountRow}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.amount}>R$ {budget.amount.toFixed(2)}</Text>
        </View>
        
        {budget.spent && (
          <View style={styles.amountRow}>
            <Text style={styles.label}>Gasto:</Text>
            <Text style={styles.spent}>R$ {budget.spent.toFixed(2)}</Text>
          </View>
        )}

        <View style={styles.amountRow}>
          <Text style={styles.label}>Restante:</Text>
          <Text style={[styles.remaining, { color: getStatusColor() }]}>
            R$ {remaining.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: getStatusColor()
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{progress.toFixed(1)}%</Text>
      </View>

      {detailed && (
        <View style={styles.dates}>
          <Text style={styles.dateText}>
            {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  amounts: {
    marginBottom: 12,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
  },
  spent: {
    fontSize: 14,
    color: '#FF3B30',
  },
  remaining: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    minWidth: 40,
  },
  dates: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
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