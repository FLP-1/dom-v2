import React, { useState } from 'react';

interface PaymentProvider {
  id: string;
  name: string;
  type: 'pix' | 'card' | 'boleto' | 'transfer';
  status: 'active' | 'inactive' | 'pending';
  icon: string;
  description: string;
  setupDate?: string;
  lastTransaction?: string;
  transactionCount?: number;
  totalAmount?: number;
}

const PaymentIntegrationsScreen: React.FC = () => {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [setupData, setSetupData] = useState({
    providerId: '',
    apiKey: '',
    secretKey: '',
    webhookUrl: '',
    environment: 'sandbox'
  });

  // Dados mockados dos provedores de pagamento
  const paymentProviders: PaymentProvider[] = [
    {
      id: 'mercadopago',
      name: 'Mercado Pago',
      type: 'pix',
      status: 'active',
      icon: '💳',
      description: 'Solução completa de pagamentos online',
      setupDate: '2025-01-15',
      lastTransaction: '2025-01-27',
      transactionCount: 156,
      totalAmount: 45230.50
    },
    {
      id: 'pix',
      name: 'PIX Direto',
      type: 'pix',
      status: 'active',
      icon: '📱',
      description: 'Transferências instantâneas via PIX',
      setupDate: '2025-01-10',
      lastTransaction: '2025-01-27',
      transactionCount: 89,
      totalAmount: 12340.75
    },
    {
      id: 'stripe',
      name: 'Stripe',
      type: 'card',
      status: 'inactive',
      icon: '💳',
      description: 'Processamento de cartões internacionais',
      setupDate: '2024-12-20',
      lastTransaction: '2024-12-28',
      transactionCount: 23,
      totalAmount: 5670.30
    },
    {
      id: 'boleto',
      name: 'Boleto Bancário',
      type: 'boleto',
      status: 'pending',
      icon: '📄',
      description: 'Geração de boletos bancários',
      setupDate: undefined,
      lastTransaction: undefined,
      transactionCount: 0,
      totalAmount: 0
    },
    {
      id: 'transfer',
      name: 'Transferência Bancária',
      type: 'transfer',
      status: 'inactive',
      icon: '🏦',
      description: 'Transferências entre contas bancárias',
      setupDate: undefined,
      lastTransaction: undefined,
      transactionCount: 0,
      totalAmount: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'inactive': return '#6b7280';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'pix': return 'PIX';
      case 'card': return 'Cartão';
      case 'boleto': return 'Boleto';
      case 'transfer': return 'Transferência';
      default: return type;
    }
  };

  const handleSetupProvider = (providerId: string) => {
    setSetupData({ ...setupData, providerId });
    setShowSetupModal(true);
  };

  const handleSetupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria feita a integração real com a API
    console.log('Configurando provedor:', setupData);
    setShowSetupModal(false);
    setSetupData({ providerId: '', apiKey: '', secretKey: '', webhookUrl: '', environment: 'sandbox' });
    alert('Provedor configurado com sucesso!');
  };

  const activeProviders = paymentProviders.filter(p => p.status === 'active');
  const inactiveProviders = paymentProviders.filter(p => p.status === 'inactive');
  const pendingProviders = paymentProviders.filter(p => p.status === 'pending');

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
          💳 Integrações de Pagamento
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b', 
          margin: 0 
        }}>
          Gerencie conectores com sistemas de pagamento
        </p>
      </div>

      {/* Estatísticas */}
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
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {activeProviders.length}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Ativos</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>💰</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            R$ {paymentProviders.reduce((sum, p) => sum + (p.totalAmount || 0), 0).toLocaleString('pt-BR')}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Total Processado</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {paymentProviders.reduce((sum, p) => sum + (p.transactionCount || 0), 0)}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Transações</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚙️</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {pendingProviders.length}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Pendentes</div>
        </div>
      </div>

      {/* Provedores Ativos */}
      {activeProviders.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            ✅ Provedores Ativos
          </h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {activeProviders.map((provider) => (
              <div
                key={provider.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '32px' }}>{provider.icon}</div>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 4px 0'
                      }}>
                        {provider.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        margin: 0
                      }}>
                        {provider.description}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: `${getStatusColor(provider.status)}15`,
                      color: getStatusColor(provider.status)
                    }}>
                      {getStatusText(provider.status)}
                    </span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {getTypeText(provider.type)}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                      Configurado em
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                      {provider.setupDate ? new Date(provider.setupDate).toLocaleDateString('pt-BR') : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                      Última transação
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                      {provider.lastTransaction ? new Date(provider.lastTransaction).toLocaleDateString('pt-BR') : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                      Transações
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                      {provider.transactionCount?.toLocaleString('pt-BR') || '0'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                      Valor total
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>
                      R$ {provider.totalAmount?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    style={{
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    🔧 Configurar
                  </button>
                  <button
                    style={{
                      backgroundColor: '#fef2f2',
                      color: '#dc2626',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    🚫 Desativar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Provedores Pendentes */}
      {pendingProviders.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            ⚠️ Provedores Pendentes
          </h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {pendingProviders.map((provider) => (
              <div
                key={provider.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #fef3c7'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '32px' }}>{provider.icon}</div>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 4px 0'
                      }}>
                        {provider.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        margin: 0
                      }}>
                        {provider.description}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: `${getStatusColor(provider.status)}15`,
                      color: getStatusColor(provider.status)
                    }}>
                      {getStatusText(provider.status)}
                    </span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {getTypeText(provider.type)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => handleSetupProvider(provider.id)}
                    style={{
                      backgroundColor: '#f59e0b',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    ⚙️ Configurar Agora
                  </button>
                  <button
                    style={{
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    📖 Documentação
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Provedores Inativos */}
      {inactiveProviders.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            🔴 Provedores Inativos
          </h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {inactiveProviders.map((provider) => (
              <div
                key={provider.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #fecaca',
                  opacity: 0.7
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '32px' }}>{provider.icon}</div>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 4px 0'
                      }}>
                        {provider.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        margin: 0
                      }}>
                        {provider.description}
                      </p>
                    </div>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: `${getStatusColor(provider.status)}15`,
                      color: getStatusColor(provider.status)
                    }}>
                      {getStatusText(provider.status)}
                    </span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {getTypeText(provider.type)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => handleSetupProvider(provider.id)}
                    style={{
                      backgroundColor: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Reativar
                  </button>
                  <button
                    style={{
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    📊 Histórico
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Configuração */}
      {showSetupModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 16px 0'
            }}>
              ⚙️ Configurar Provedor
            </h3>

            <form onSubmit={handleSetupSubmit} style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Provedor
                </label>
                <select
                  value={setupData.providerId}
                  onChange={(e) => setSetupData({ ...setupData, providerId: e.target.value })}
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Selecione um provedor</option>
                  {paymentProviders.map(provider => (
                    <option key={provider.id} value={provider.id}>
                      {provider.name} - {getTypeText(provider.type)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  API Key
                </label>
                <input
                  type="text"
                  value={setupData.apiKey}
                  onChange={(e) => setSetupData({ ...setupData, apiKey: e.target.value })}
                  placeholder="Sua chave de API"
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px'
                  }}
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
                  Secret Key
                </label>
                <input
                  type="password"
                  value={setupData.secretKey}
                  onChange={(e) => setSetupData({ ...setupData, secretKey: e.target.value })}
                  placeholder="Sua chave secreta"
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px'
                  }}
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
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={setupData.webhookUrl}
                  onChange={(e) => setSetupData({ ...setupData, webhookUrl: e.target.value })}
                  placeholder="https://seu-dominio.com/webhook"
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px'
                  }}
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
                  Ambiente
                </label>
                <select
                  value={setupData.environment}
                  onChange={(e) => setSetupData({ ...setupData, environment: e.target.value })}
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px'
                  }}
                >
                  <option value="sandbox">Sandbox (Teste)</option>
                  <option value="production">Produção</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowSetupModal(false)}
                  style={{
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
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
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Configurar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentIntegrationsScreen;
