import React, { useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Modal,
} from 'react-native';

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  category: 'household' | 'food' | 'transport' | 'health' | 'entertainment' | 'other';
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'overdue';
}

interface Payment {
  id: string;
  description: string;
  amount: number;
  category: 'salary' | 'service' | 'supplier' | 'utility' | 'other';
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  recipient: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: 'household' | 'food' | 'transport' | 'health' | 'entertainment' | 'other';
  date: string;
  paymentMethod: 'cash' | 'card' | 'transfer' | 'pix';
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface FinanceScreenProps {
  onNavigateBack: () => void;
}

export const FinanceScreen: React.FC<FinanceScreenProps> = ({ onNavigateBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'budgets' | 'payments' | 'expenses'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'budget' | 'payment' | 'expense'>('budget');
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // Dados mockados para demonstração
  const mockBudgets: Budget[] = [
    {
      id: '1',
      name: 'Orçamento Mensal Casa',
      amount: 5000,
      spent: 3200,
      category: 'household',
      period: 'monthly',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'active'
    },
    {
      id: '2',
      name: 'Alimentação',
      amount: 1500,
      spent: 1200,
      category: 'food',
      period: 'monthly',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'active'
    }
  ];

  const mockPayments: Payment[] = [
    {
      id: '1',
      description: 'Salário Maria Silva',
      amount: 2500,
      category: 'salary',
      dueDate: '2024-01-05',
      paidDate: '2024-01-05',
      status: 'paid',
      recipient: 'Maria Silva'
    },
    {
      id: '2',
      description: 'Conta de Luz',
      amount: 180,
      category: 'utility',
      dueDate: '2024-01-15',
      status: 'pending',
      recipient: 'Companhia de Energia'
    }
  ];

  const mockExpenses: Expense[] = [
    {
      id: '1',
      description: 'Supermercado',
      amount: 450,
      category: 'food',
      date: '2024-01-10',
      paymentMethod: 'card',
      status: 'confirmed'
    },
    {
      id: '2',
      description: 'Combustível',
      amount: 120,
      category: 'transport',
      date: '2024-01-12',
      paymentMethod: 'cash',
      status: 'confirmed'
    }
  ];

  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);

  // Cálculos financeiros
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const budgetUtilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const totalIncome = payments
    .filter(p => p.category === 'salary' && p.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const totalExpenses = expenses
    .filter(e => e.status === 'confirmed')
    .reduce((sum, expense) => sum + expense.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'pending');
  const overduePayments = payments.filter(p => p.status === 'overdue');

  const handleAddItem = (type: 'budget' | 'payment' | 'expense') => {
    setModalType(type);
    setFormData({});
    setShowAddModal(true);
  };

  const handleSaveItem = () => {
    if (!formData.name && !formData.description) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      ...formData,
      date: formData.date || new Date().toISOString().split('T')[0]
    };

    switch (modalType) {
      case 'budget':
        setBudgets([...budgets, newItem as Budget]);
        break;
      case 'payment':
        setPayments([...payments, newItem as Payment]);
        break;
      case 'expense':
        setExpenses([...expenses, newItem as Expense]);
        break;
    }

    setShowAddModal(false);
    setFormData({});
    Alert.alert('Sucesso', 'Item adicionado com sucesso');
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      household: '🏠 Casa',
      food: '🍽️ Alimentação',
      transport: '🚗 Transporte',
      health: '🏥 Saúde',
      entertainment: '🎬 Entretenimento',
      other: '📦 Outros',
      salary: '💰 Salário',
      service: '🔧 Serviço',
      supplier: '🏪 Fornecedor',
      utility: '⚡ Utilidade'
    };
    return labels[category as keyof typeof labels] || category;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: '#4CAF50',
      completed: '#2196F3',
      overdue: '#F44336',
      pending: '#FF9800',
      paid: '#4CAF50',
      cancelled: '#9E9E9E',
      confirmed: '#4CAF50'
    };
    return colors[status as keyof typeof colors] || '#666';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: 'Ativo',
      completed: 'Concluído',
      overdue: 'Vencido',
      pending: 'Pendente',
      paid: 'Pago',
      cancelled: 'Cancelado',
      confirmed: 'Confirmado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const renderOverview = () => (
    <View>
      {/* Resumo Financeiro */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumo Financeiro</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Receita Total</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
              R$ {totalIncome.toLocaleString('pt-BR')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Despesas Totais</Text>
            <Text style={[styles.summaryValue, { color: '#F44336' }]}>
              R$ {totalExpenses.toLocaleString('pt-BR')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Saldo</Text>
            <Text style={[styles.summaryValue, { color: totalIncome - totalExpenses >= 0 ? '#4CAF50' : '#F44336' }]}>
              R$ {(totalIncome - totalExpenses).toLocaleString('pt-BR')}
            </Text>
          </View>
        </View>
      </View>

      {/* Orçamentos */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Orçamentos</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Orçamento Total</Text>
            <Text style={styles.summaryValue}>
              R$ {totalBudget.toLocaleString('pt-BR')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Gasto Total</Text>
            <Text style={styles.summaryValue}>
              R$ {totalSpent.toLocaleString('pt-BR')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Restante</Text>
            <Text style={[styles.summaryValue, { color: totalRemaining >= 0 ? '#4CAF50' : '#F44336' }]}>
              R$ {totalRemaining.toLocaleString('pt-BR')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Utilização</Text>
            <Text style={styles.summaryValue}>
              {budgetUtilization.toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>

      {/* Pagamentos Pendentes */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Pagamentos</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Pendentes</Text>
            <Text style={[styles.summaryValue, { color: '#FF9800' }]}>
              {pendingPayments.length}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Vencidos</Text>
            <Text style={[styles.summaryValue, { color: '#F44336' }]}>
              {overduePayments.length}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Valor Pendente</Text>
            <Text style={styles.summaryValue}>
              R$ {pendingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString('pt-BR')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderBudgets = () => (
    <View>
      {budgets.map((budget) => {
        const utilization = (budget.spent / budget.amount) * 100;
        const remaining = budget.amount - budget.spent;
        
        return (
          <View key={budget.id} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{budget.name}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(budget.status) }
              ]}>
                <Text style={styles.statusText}>
                  {getStatusLabel(budget.status)}
                </Text>
              </View>
            </View>
            
            <View style={styles.itemDetails}>
              <Text style={styles.itemCategory}>
                {getCategoryLabel(budget.category)}
              </Text>
              <Text style={styles.itemPeriod}>
                {budget.period === 'monthly' ? 'Mensal' : 
                 budget.period === 'quarterly' ? 'Trimestral' : 'Anual'}
              </Text>
            </View>

            <View style={styles.budgetProgress}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${Math.min(utilization, 100)}%`,
                      backgroundColor: utilization > 90 ? '#F44336' : 
                                     utilization > 75 ? '#FF9800' : '#4CAF50'
                    }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {utilization.toFixed(1)}% utilizado
              </Text>
            </View>

            <View style={styles.budgetAmounts}>
              <View style={styles.amountItem}>
                <Text style={styles.amountLabel}>Orçado:</Text>
                <Text style={styles.amountValue}>
                  R$ {budget.amount.toLocaleString('pt-BR')}
                </Text>
              </View>
              <View style={styles.amountItem}>
                <Text style={styles.amountLabel}>Gasto:</Text>
                <Text style={styles.amountValue}>
                  R$ {budget.spent.toLocaleString('pt-BR')}
                </Text>
              </View>
              <View style={styles.amountItem}>
                <Text style={styles.amountLabel}>Restante:</Text>
                <Text style={[styles.amountValue, { color: remaining >= 0 ? '#4CAF50' : '#F44336' }]}>
                  R$ {remaining.toLocaleString('pt-BR')}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderPayments = () => (
    <View>
      {payments.map((payment) => (
        <View key={payment.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{payment.description}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(payment.status) }
            ]}>
              <Text style={styles.statusText}>
                {getStatusLabel(payment.status)}
              </Text>
            </View>
          </View>
          
          <View style={styles.itemDetails}>
            <Text style={styles.itemCategory}>
              {getCategoryLabel(payment.category)}
            </Text>
            <Text style={styles.itemRecipient}>
              Para: {payment.recipient}
            </Text>
          </View>

          <View style={styles.paymentInfo}>
            <View style={styles.paymentAmount}>
              <Text style={styles.amountLabel}>Valor:</Text>
              <Text style={styles.amountValue}>
                R$ {payment.amount.toLocaleString('pt-BR')}
              </Text>
            </View>
            <View style={styles.paymentDate}>
              <Text style={styles.dateLabel}>Vencimento:</Text>
              <Text style={styles.dateValue}>
                {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
              </Text>
            </View>
            {payment.paidDate && (
              <View style={styles.paymentDate}>
                <Text style={styles.dateLabel}>Pago em:</Text>
                <Text style={styles.dateValue}>
                  {new Date(payment.paidDate).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderExpenses = () => (
    <View>
      {expenses.map((expense) => (
        <View key={expense.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{expense.description}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(expense.status) }
            ]}>
              <Text style={styles.statusText}>
                {getStatusLabel(expense.status)}
              </Text>
            </View>
          </View>
          
          <View style={styles.itemDetails}>
            <Text style={styles.itemCategory}>
              {getCategoryLabel(expense.category)}
            </Text>
            <Text style={styles.itemDate}>
              {new Date(expense.date).toLocaleDateString('pt-BR')}
            </Text>
          </View>

          <View style={styles.expenseInfo}>
            <View style={styles.expenseAmount}>
              <Text style={styles.amountLabel}>Valor:</Text>
              <Text style={styles.amountValue}>
                R$ {expense.amount.toLocaleString('pt-BR')}
              </Text>
            </View>
            <View style={styles.expenseMethod}>
              <Text style={styles.methodLabel}>Forma de Pagamento:</Text>
              <Text style={styles.methodValue}>
                {expense.paymentMethod === 'cash' ? 'Dinheiro' :
                 expense.paymentMethod === 'card' ? 'Cartão' :
                 expense.paymentMethod === 'transfer' ? 'Transferência' : 'PIX'}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Gestão Financeira</Text>
        <Pressable 
          style={styles.addButton} 
          onPress={() => handleAddItem(activeTab === 'budgets' ? 'budget' : 
                                     activeTab === 'payments' ? 'payment' : 'expense')}
        >
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </Pressable>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            📊 Resumo
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'budgets' && styles.activeTab]}
          onPress={() => setActiveTab('budgets')}
        >
          <Text style={[styles.tabText, activeTab === 'budgets' && styles.activeTabText]}>
            💰 Orçamentos
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'payments' && styles.activeTab]}
          onPress={() => setActiveTab('payments')}
        >
          <Text style={[styles.tabText, activeTab === 'payments' && styles.activeTabText]}>
            💳 Pagamentos
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'expenses' && styles.activeTab]}
          onPress={() => setActiveTab('expenses')}
        >
          <Text style={[styles.tabText, activeTab === 'expenses' && styles.activeTabText]}>
            📝 Despesas
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'budgets' && renderBudgets()}
        {activeTab === 'payments' && renderPayments()}
        {activeTab === 'expenses' && renderExpenses()}
      </ScrollView>

      {/* Modal para Adicionar Item */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === 'budget' ? 'Adicionar Orçamento' :
               modalType === 'payment' ? 'Adicionar Pagamento' : 'Adicionar Despesa'}
            </Text>

            <Text style={styles.inputLabel}>
              {modalType === 'budget' ? 'Nome do Orçamento' : 'Descrição'} *
            </Text>
            <TextInput
              style={styles.input}
              value={formData.name || formData.description || ''}
              onChangeText={(text) => setFormData({ 
                ...formData, 
                [modalType === 'budget' ? 'name' : 'description']: text 
              })}
              placeholder={modalType === 'budget' ? 'Ex: Orçamento Mensal Casa' : 'Ex: Supermercado'}
            />

            <Text style={styles.inputLabel}>Valor *</Text>
            <TextInput
              style={styles.input}
              value={formData.amount?.toString() || ''}
              onChangeText={(text) => setFormData({ ...formData, amount: parseFloat(text) || 0 })}
              placeholder="0,00"
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Categoria</Text>
            <View style={styles.categorySelector}>
              {modalType === 'budget' || modalType === 'expense' ? (
                // Categorias para orçamentos e despesas
                ['household', 'food', 'transport', 'health', 'entertainment', 'other'].map((category) => (
                  <Pressable
                    key={category}
                    style={[
                      styles.categoryOption,
                      formData.category === category && styles.categoryOptionSelected
                    ]}
                    onPress={() => setFormData({ ...formData, category })}
                  >
                    <Text style={[
                      styles.categoryOptionText,
                      formData.category === category && styles.categoryOptionTextSelected
                    ]}>
                      {getCategoryLabel(category)}
                    </Text>
                  </Pressable>
                ))
              ) : (
                // Categorias para pagamentos
                ['salary', 'service', 'supplier', 'utility', 'other'].map((category) => (
                  <Pressable
                    key={category}
                    style={[
                      styles.categoryOption,
                      formData.category === category && styles.categoryOptionSelected
                    ]}
                    onPress={() => setFormData({ ...formData, category })}
                  >
                    <Text style={[
                      styles.categoryOptionText,
                      formData.category === category && styles.categoryOptionTextSelected
                    ]}>
                      {getCategoryLabel(category)}
                    </Text>
                  </Pressable>
                ))
              )}
            </View>

            {modalType === 'payment' && (
              <>
                <Text style={styles.inputLabel}>Destinatário</Text>
                <TextInput
                  style={styles.input}
                  value={formData.recipient || ''}
                  onChangeText={(text) => setFormData({ ...formData, recipient: text })}
                  placeholder="Nome do destinatário"
                />
                <Text style={styles.inputLabel}>Data de Vencimento</Text>
                <TextInput
                  style={styles.input}
                  value={formData.dueDate || ''}
                  onChangeText={(text) => setFormData({ ...formData, dueDate: text })}
                  placeholder="YYYY-MM-DD"
                />
              </>
            )}

            {modalType === 'expense' && (
              <>
                <Text style={styles.inputLabel}>Data</Text>
                <TextInput
                  style={styles.input}
                  value={formData.date || ''}
                  onChangeText={(text) => setFormData({ ...formData, date: text })}
                  placeholder="YYYY-MM-DD"
                />
                <Text style={styles.inputLabel}>Forma de Pagamento</Text>
                <View style={styles.paymentMethodSelector}>
                  {['cash', 'card', 'transfer', 'pix'].map((method) => (
                    <Pressable
                      key={method}
                      style={[
                        styles.paymentMethodOption,
                        formData.paymentMethod === method && styles.paymentMethodOptionSelected
                      ]}
                      onPress={() => setFormData({ ...formData, paymentMethod: method })}
                    >
                      <Text style={[
                        styles.paymentMethodOptionText,
                        formData.paymentMethod === method && styles.paymentMethodOptionTextSelected
                      ]}>
                        {method === 'cash' ? 'Dinheiro' :
                         method === 'card' ? 'Cartão' :
                         method === 'transfer' ? 'Transferência' : 'PIX'}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveItem}
              >
                <Text style={styles.saveButtonText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    minWidth: '45%',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
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
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  itemDetails: {
    marginBottom: 12,
  },
  itemCategory: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPeriod: {
    fontSize: 12,
    color: '#999',
  },
  itemRecipient: {
    fontSize: 12,
    color: '#666',
  },
  itemDate: {
    fontSize: 12,
    color: '#999',
  },
  budgetProgress: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  budgetAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountItem: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  amountValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  paymentInfo: {
    gap: 8,
  },
  paymentAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
  },
  dateValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  expenseInfo: {
    gap: 8,
  },
  expenseAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodLabel: {
    fontSize: 12,
    color: '#666',
  },
  methodValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  categoryOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
  },
  categoryOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryOptionText: {
    fontSize: 12,
    color: '#666',
  },
  categoryOptionTextSelected: {
    color: '#fff',
  },
  paymentMethodSelector: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  paymentMethodOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  paymentMethodOptionSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  paymentMethodOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  paymentMethodOptionTextSelected: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 