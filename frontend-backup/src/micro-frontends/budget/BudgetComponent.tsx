// Componente Budget - Micro-frontend de Controle de Orçamento
// Seguindo a REGRA DA SIMPLICIDADE EXTREMA

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'overdue';
}

interface BudgetComponentProps {
  onBack?: () => void;
}

const BudgetComponent: React.FC<BudgetComponentProps> = ({ onBack }) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar orçamentos
  const loadBudgets = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/budgets');
      const data = await response.json();
      
      if (data.success) {
        setBudgets(data.data);
      }
    } catch (error) {
      console.error('Erro ao carregar orçamentos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os orçamentos');
    } finally {
      setLoading(false);
    }
  };

  // Criar orçamento de exemplo
  const createSampleBudget = async () => {
    try {
      const sampleBudget = {
        name: 'Orçamento Exemplo',
        amount: 1000,
        category: 'Geral',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const response = await fetch('http://localhost:3001/api/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sampleBudget),
      });

      const data = await response.json();
      
      if (data.success) {
        Alert.alert('Sucesso', 'Orçamento criado com sucesso!');
        loadBudgets();
      }
    } catch (error) {
      console.error('Erro ao criar orçamento:', error);
      Alert.alert('Erro', 'Não foi possível criar o orçamento');
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'completed':
        return '#2196F3';
      case 'overdue':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getProgressPercentage = (spent: number, amount: number) => {
    return Math.min((spent / amount) * 100, 100);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando orçamentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Controle de Orçamento</Text>
        {onBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity style={styles.createButton} onPress={createSampleBudget}>
        <Text style={styles.createButtonText}>Criar Orçamento Exemplo</Text>
      </TouchableOpacity>

      <ScrollView style={styles.budgetList}>
        {budgets.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum orçamento encontrado</Text>
        ) : (
          budgets.map((budget) => (
            <View key={budget.id} style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <Text style={styles.budgetName}>{budget.name}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(budget.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{budget.status}</Text>
                </View>
              </View>
              
              <Text style={styles.budgetCategory}>{budget.category}</Text>
              
              <View style={styles.budgetAmounts}>
                <Text style={styles.amountText}>
                  Gasto: R$ {budget.spent.toFixed(2)}
                </Text>
                <Text style={styles.amountText}>
                  Total: R$ {budget.amount.toFixed(2)}
                </Text>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${getProgressPercentage(budget.spent, budget.amount)}%`,
                        backgroundColor: getProgressPercentage(budget.spent, budget.amount) > 100 ? '#F44336' : '#4CAF50',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {getProgressPercentage(budget.spent, budget.amount).toFixed(1)}%
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  backButton: {
    backgroundColor: '#666',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  budgetList: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
  budgetCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  budgetCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  budgetAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amountText: {
    fontSize: 14,
    color: '#333',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
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
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
});

export default BudgetComponent; 