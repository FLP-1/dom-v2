import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { usePayments } from '../../hooks/usePayments.ts';
import { Loading } from '../../components/ui/Loading.tsx';
import { EmptyState } from '../../components/ui/EmptyState.tsx';
import { Toast } from '../../components/ui/Toast.tsx';
import { useAuth } from '../../context/AuthContext.tsx';
import { hasPermission } from '../../utils/rbac.ts';

const PaymentScreen: React.FC = () => {
  const { payments, loading, error, deletePayment } = usePayments();
  const { user } = useAuth();

  // Verificar permissões
  const canCreate = user && hasPermission(user.profile, 'create');
  const canUpdate = user && hasPermission(user.profile, 'update');
  const canDelete = user && hasPermission(user.profile, 'delete');

  if (loading) {
    return <Loading message="Carregando pagamentos..." />;
  }

  if (error) {
    Toast.show('error', 'Erro ao carregar pagamentos', error);
  }

  if (!payments || payments.length === 0) {
    return (
      <EmptyState
        title="Nenhum pagamento encontrado"
        message="Você ainda não possui pagamentos cadastrados."
        icon="💳"
      />
    );
  }

  const handleAddPayment = () => {
    // Implementar adição de pagamento
    Toast.show('info', 'Funcionalidade em desenvolvimento');
  };

  const handleEditPayment = (paymentId: string) => {
    setSelectedPayment(paymentId);
    // Implementar edição de pagamento
    Toast.show('info', 'Funcionalidade em desenvolvimento');
  };

  const handleDeletePayment = async (paymentId: string) => {
    try {
      await deletePayment(paymentId);
      Toast.show('success', 'Pagamento excluído com sucesso');
    } catch (err) {
      Toast.show('error', 'Erro ao excluir pagamento');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981'; // Verde
      case 'pending':
        return '#f59e0b'; // Amarelo
      case 'cancelled':
        return '#ef4444'; // Vermelho
      default:
        return '#6b7280'; // Cinza
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pagamentos</Text>
        {canCreate && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddPayment}>
            <Text style={styles.addButtonText}>+ Novo Pagamento</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.paymentList}>
        {payments.map((payment) => {
          const statusColor = getStatusColor(payment.status);
          const statusText = getStatusText(payment.status);

          return (
            <View key={payment.id} style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <Text style={styles.paymentDescription}>{payment.description}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                  <Text style={styles.statusText}>{statusText}</Text>
                </View>
              </View>

              <View style={styles.paymentInfo}>
                <View style={styles.paymentAmount}>
                  <Text style={styles.amountLabel}>Valor</Text>
                  <Text style={styles.amountValue}>
                    R$ {payment.amount.toLocaleString('pt-BR')}
                  </Text>
                </View>
                <View style={styles.paymentCategory}>
                  <Text style={styles.categoryLabel}>Categoria</Text>
                  <Text style={styles.categoryValue}>{payment.category}</Text>
                </View>
                <View style={styles.paymentMethod}>
                  <Text style={styles.methodLabel}>Método</Text>
                  <Text style={styles.methodValue}>{payment.paymentMethod}</Text>
                </View>
              </View>

              <View style={styles.paymentDate}>
                <Text style={styles.dateLabel}>Data</Text>
                <Text style={styles.dateValue}>
                  {new Date(payment.date).toLocaleDateString('pt-BR')}
                </Text>
              </View>

              {payment.recipient && (
                <View style={styles.paymentRecipient}>
                  <Text style={styles.recipientLabel}>Destinatário</Text>
                  <Text style={styles.recipientValue}>{payment.recipient}</Text>
                </View>
              )}

              <View style={styles.paymentActions}>
                {canUpdate && (
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => handleEditPayment(payment.id)}
                  >
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>
                )}
                {canDelete && (
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeletePayment(payment.id)}
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
  paymentList: {
    padding: 20,
  },
  paymentCard: {
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
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentAmount: {
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
  paymentCategory: {
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  categoryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  paymentMethod: {
    alignItems: 'center',
  },
  methodLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  methodValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  paymentDate: {
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    color: '#374151',
  },
  paymentRecipient: {
    marginBottom: 12,
  },
  recipientLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  recipientValue: {
    fontSize: 14,
    color: '#374151',
  },
  paymentActions: {
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

export default PaymentScreen;


