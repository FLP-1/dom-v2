import React, { useState } from 'react';
import { usePayments } from '../hooks/useRealData.ts';



const FinanceScreen: React.FC = () => {
  const [newPayment, setNewPayment] = useState({
    amount: '',
    description: '',
    paymentMethod: 'pix' as const
  });

  // ✅ USANDO DADOS REAIS DO POSTGRESQL
  const { data: payments, loading, create: createPayment, refetch } = usePayments();
  
  // Garantir que payments nunca seja null
  const safePayments = payments || [];

  const handleCreatePayment = async () => {
    try {
      const amount = parseFloat(newPayment.amount);
      if (!amount || amount <= 0) {
        alert('Por favor, insira um valor válido');
        return;
      }

      // ✅ CRIANDO PAGAMENTO REAL NO POSTGRESQL
      await createPayment({
        amount: amount * 100, // Stripe trabalha em centavos
        currency: 'brl',
        description: newPayment.description,
        paymentMethod: newPayment.paymentMethod,
        status: 'pending'
      });

      setNewPayment({ amount: '', description: '', paymentMethod: 'pix' });
      refetch(); // Recarregar dados do banco
      
      alert('Pagamento criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      alert('Erro ao criar pagamento. Tente novamente.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded': return '#10b981';
      case 'processing': return '#3b82f6';
      case 'pending': return '#f59e0b';
      case 'failed': return '#ef4444';
      case 'canceled': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'succeeded': return 'Aprovado';
      case 'processing': return 'Processando';
      case 'pending': return 'Pendente';
      case 'failed': return 'Falhou';
      case 'canceled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'card': return 'Cartão';
      case 'pix': return 'PIX';
      case 'boleto': return 'Boleto';
      case 'transfer': return 'Transferência';
      default: return method;
    }
  };

  return (
    <div style={{
      padding: '16px',
      maxWidth: '100%',
      margin: '0 auto'
    }}>
      <div style={{
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1e293b',
          margin: '0 0 8px 0'
        }}>
          💰 Gestão Financeira
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          margin: 0
        }}>
          Controle de pagamentos e integração Stripe
        </p>
      </div>

      {/* Novo Pagamento */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1e293b',
          margin: '0 0 16px 0'
        }}>
          Novo Pagamento
        </h2>
        
        <div style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Valor (R$)
            </label>
            <input
              type="number"
              step="0.01"
              value={newPayment.amount}
              onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '44px'
              }}
              placeholder="0,00"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Descrição
            </label>
            <input
              type="text"
              value={newPayment.description}
              onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '44px'
              }}
              placeholder="Descrição do pagamento"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Método de Pagamento
            </label>
            <select
              value={newPayment.paymentMethod}
              onChange={(e) => setNewPayment({...newPayment, paymentMethod: e.target.value as 'card' | 'pix' | 'boleto' | 'transfer'})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '44px'
              }}
              aria-label="Método de pagamento"
            >
              <option value="pix">PIX</option>
              <option value="card">Cartão</option>
              <option value="boleto">Boleto</option>
              <option value="transfer">Transferência</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCreatePayment}
          style={{
            marginTop: '16px',
            padding: '12px 24px',
            backgroundColor: '#6366f1',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            minHeight: '44px'
          }}
        >
          Processar Pagamento
        </button>
      </div>

      {/* Histórico de Pagamentos */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1e293b',
          margin: '0 0 16px 0'
        }}>
          Histórico de Pagamentos
        </h2>

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            Carregando pagamentos...
          </div>
        ) : safePayments.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💳</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 8px 0'
            }}>
              Nenhum pagamento encontrado
            </h3>
            <p style={{ fontSize: '14px', margin: 0 }}>
              Faça seu primeiro pagamento acima.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            {safePayments.map((payment) => (
              <div
                key={payment.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#f9fafb'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1e293b',
                      margin: '0 0 4px 0'
                    }}>
                      R$ {(payment.amount / 100).toFixed(2)}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#64748b',
                      margin: 0
                    }}>
                      {payment.description}
                    </p>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: `${getStatusColor(payment.status)}15`,
                    color: getStatusColor(payment.status)
                  }}>
                    {getStatusText(payment.status)}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  <span>{getPaymentMethodText(payment.paymentMethod)}</span>
                  <span>{new Date(payment.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceScreen;
