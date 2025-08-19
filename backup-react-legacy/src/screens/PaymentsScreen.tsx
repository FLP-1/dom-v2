import React, { useState } from 'react';
import { usePayments } from '../hooks/useRealData.ts';

interface Payment {
  id: string;
  description: string;
  amount: number;
  status: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

const PaymentsScreen: React.FC = () => {
  const { payments, loading, error, create, update, remove, refetch } = usePayments();
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    status: 'pending',
    due_date: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPayment) {
        await update(editingPayment.id, {
          ...formData,
          amount: parseFloat(formData.amount),
          due_date: new Date(formData.due_date)
        });
        setEditingPayment(null);
      } else {
        await create({
          ...formData,
          amount: parseFloat(formData.amount),
          due_date: new Date(formData.due_date)
        });
      }
      setFormData({ description: '', amount: '', status: 'pending', due_date: '' });
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error('Erro ao salvar pagamento:', error);
    }
  };

  const handleEdit = (payment: Payment) => {
    setEditingPayment(payment);
    setFormData({
      description: payment.description,
      amount: payment.amount.toString(),
      status: payment.status,
      due_date: new Date(payment.due_date).toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este pagamento?')) {
      try {
        await remove(id);
        refetch();
      } catch (error) {
        console.error('Erro ao excluir pagamento:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'overdue': return '#ef4444';
      case 'cancelled': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'pending': return 'Pendente';
      case 'overdue': return 'Vencido';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  if (loading) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#6b7280' }}>Carregando pagamentos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '18px', color: '#ef4444' }}>Erro ao carregar pagamentos: {error}</div>
      </div>
    );
  }

  // Garantir que payments não seja null antes de usar reduce
  const safePayments = payments || [];
  const totalAmount = safePayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedAmount = safePayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = safePayments
    .filter(payment => payment.status === 'pending')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div style={{ padding: '16px', maxWidth: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#1e293b', 
          margin: '0 0 8px 0' 
        }}>
          💳 Gestão de Pagamentos
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b', 
          margin: 0 
        }}>
          Controle de pagamentos e transações financeiras
        </p>
      </div>

      {/* Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginBottom: '24px' 
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderLeft: '4px solid #6366f1'
        }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Total</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {formatCurrency(totalAmount)}
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderLeft: '4px solid #10b981'
        }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Concluídos</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>
            {formatCurrency(completedAmount)}
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          borderLeft: '4px solid #f59e0b'
        }}>
          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Pendentes</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>
            {formatCurrency(pendingAmount)}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => {
            setEditingPayment(null);
            setFormData({ description: '', amount: '', status: 'pending', due_date: '' });
            setShowForm(true);
          }}
          style={{
            backgroundColor: '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            minHeight: '44px'
          }}
        >
          ➕ Novo Pagamento
        </button>
        <button
          onClick={refetch}
          style={{
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            minHeight: '44px'
          }}
        >
          🔄 Atualizar
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            {editingPayment ? 'Editar Pagamento' : 'Novo Pagamento'}
          </h3>
          
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Descrição
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                placeholder="Descrição do pagamento"
                style={{
                  width: '100%',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
                  minHeight: '44px'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Valor (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  placeholder="0,00"
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    minHeight: '44px'
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Data de Vencimento
                </label>
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    minHeight: '44px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{
                  width: '100%',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '14px',
                  minHeight: '44px'
                }}
              >
                <option value="pending">Pendente</option>
                <option value="completed">Concluído</option>
                <option value="overdue">Vencido</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPayment(null);
                }}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  minHeight: '44px'
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  minHeight: '44px'
                }}
              >
                {editingPayment ? 'Atualizar' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payments List */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f8fafc'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: 0 
          }}>
            Pagamentos ({safePayments.length})
          </h3>
        </div>

        {safePayments.length === 0 ? (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#6b7280' 
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💳</div>
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>Nenhum pagamento registrado</div>
            <div style={{ fontSize: '14px' }}>Adicione seu primeiro pagamento para começar</div>
          </div>
        ) : (
          <div style={{ overflow: 'auto' }}>
            {safePayments.map((payment) => (
              <div
                key={payment.id}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#6366f1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                      💳
                    </div>
                    <div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1e293b'
                      }}>
                        {payment.description}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#64748b'
                      }}>
                        Vencimento: {formatDate(payment.due_date)}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1e293b'
                    }}>
                      {formatCurrency(payment.amount)}
                    </span>
                    <span style={{
                      color: getStatusColor(payment.status),
                      fontWeight: '600'
                    }}>
                      {getStatusText(payment.status)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(payment)}
                    style={{
                      backgroundColor: '#f59e0b',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      minHeight: '36px'
                    }}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(payment.id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      minHeight: '36px'
                    }}
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsScreen;
