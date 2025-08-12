import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useBudgets } from '../../hooks/useBudgets.ts';
import { Loading } from '../../components/ui/Loading.tsx';
import { EmptyState } from '../../components/ui/EmptyState.tsx';
import { Toast } from '../../components/ui/Toast.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { hasPermission } from '../../utils/rbac.ts';

const BudgetScreen: React.FC = () => {
  const { budgets, loading, error, deleteBudget } = useBudgets();
  const { user } = useAuth();

  // Verificar permissões
  const canCreate = user && hasPermission(user.profile, 'create');
  const canUpdate = user && hasPermission(user.profile, 'update');
  const canDelete = user && hasPermission(user.profile, 'delete');

  if (loading) {
    return <Loading message="Carregando orçamentos..." />;
  }

  if (error) {
    Toast.show('error', 'Erro ao carregar orçamentos', error);
  }

  if (!budgets || budgets.length === 0) {
    return (
      <EmptyState
        title="Nenhum orçamento encontrado"
        message="Você ainda não possui orçamentos cadastrados."
        icon="📊"
      />
    );
  }

  const handleAddBudget = () => {
    // Implementar adição de orçamento
    Toast.show('info', 'Funcionalidade em desenvolvimento');
  };

  const handleEditBudget = (budgetId: string) => {
    setSelectedBudget(budgetId);
    // Implementar edição de orçamento
    Toast.show('info', 'Funcionalidade em desenvolvimento');
  };

  const handleDeleteBudget = async (budgetId: string) => {
    try {
      await deleteBudget(budgetId);
      Toast.show('success', 'Orçamento excluído com sucesso');
    } catch (err) {
      Toast.show('error', 'Erro ao excluir orçamento');
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return '#ef4444'; // Vermelho
    if (progress >= 75) return '#f59e0b'; // Amarelo
    return '#10b981'; // Verde
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Orçamentos</Text>
        {canCreate && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddBudget}>
            <Text style={styles.addButtonText}>+ Novo Orçamento</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.budgetList}>
        {budgets.map((budget) => {
          const progress = (budget.spent / budget.amount) * 100;
          const progressColor = getProgressColor(progress);

          return (
            <View key={budget.id} style={styles.budgetCard}>
              <View style={styles.budgetHeader}>
                <Text style={styles.budgetName}>{budget.name}</Text>
                <Text style={styles.budgetCategory}>{budget.category}</Text>
              </View>

              <View style={styles.budgetInfo}>
                <View style={styles.budgetAmount}>
                  <Text style={styles.amountLabel}>Gasto</Text>
                  <Text style={styles.amountValue}>
                    R$ {budget.spent.toLocaleString('pt-BR')}
                  </Text>
                </View>
                <View style={styles.budgetAmount}>
                  <Text style={styles.amountLabel}>Orçamento</Text>
                  <Text style={styles.amountValue}>
                    R$ {budget.amount.toLocaleString('pt-BR')}
                  </Text>
                </View>
                <View style={styles.budgetAmount}>
                  <Text style={styles.amountLabel}>Restante</Text>
                  <Text style={styles.amountValue}>
                    R$ {(budget.amount - budget.spent).toLocaleString('pt-BR')}
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
                        backgroundColor: progressColor
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{progress.toFixed(1)}%</Text>
              </View>

              <View style={styles.budgetActions}>
                {canUpdate && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleEditBudget(budget.id)}
                  >
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>
                )}
                {canDelete && (
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteBudget(budget.id)}
                  >
                    <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                      Excluir
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  budgetList: {
    padding: 20,
  },
  budgetCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  budgetCategory: {
    fontSize: 14,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  budgetAmount: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    minWidth: 40,
  },
  budgetActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
  },
  deleteButtonText: {
    color: '#dc2626',
  },
});

export default BudgetScreen;
