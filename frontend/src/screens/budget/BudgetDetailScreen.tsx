







import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useBudget } from '../../hooks/useBudget';
import { BudgetCard } from '../../components/budget/BudgetCard';


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
import { BudgetChart } from '../../components/budget/BudgetChart';

interface BudgetDetailScreenProps {
  route: {
    params: {
      budgetId: string;
    };
  };
}

export const BudgetDetailScreen: React.FC<BudgetDetailScreenProps> = ({ route }) => {
  const { budgetId } = route.params;
  const { getBudgetById, loading, error } = useBudget();
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    const fetchBudget = async () => {
      const budgetData = await getBudgetById(budgetId);
      setBudget(budgetData);
    };
    fetchBudget();
  }, [budgetId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error || !budget) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Erro ao carregar orçamento</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{budget.name}</Text>
        <Text style={styles.category}>{budget.category}</Text>
      </View>

      <BudgetCard budget={budget} detailed />

      <View style={styles.chartSection}>
        <Text style={styles.sectionTitle}>Progresso</Text>
        <BudgetChart data={[budget]} />
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Detalhes</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Valor Total:</Text>
          <Text style={styles.detailValue}>R$ {budget.amount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gasto Atual:</Text>
          <Text style={styles.detailValue}>R$ {budget.spent || 0}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Restante:</Text>
          <Text style={styles.detailValue}>R$ {budget.amount - (budget.spent || 0)}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  chartSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 1,
  },
  detailsSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
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