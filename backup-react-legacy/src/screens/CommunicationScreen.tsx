import React, { useState } from 'react';

interface Message {
  id: string;
  type: 'sms' | 'email' | 'push' | 'whatsapp';
  recipient: string;
  subject: string;
  content: string;
  status: 'sent' | 'delivered' | 'failed' | 'pending';
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
}

interface Template {
  id: string;
  name: string;
  type: 'sms' | 'email' | 'push' | 'whatsapp';
  subject: string;
  content: string;
  variables: string[];
  usageCount: number;
  createdAt: string;
}

const CommunicationScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'messages' | 'templates' | 'analytics'>('messages');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [messageData, setMessageData] = useState({
    type: 'email' as const,
    recipients: '',
    subject: '',
    content: '',
    templateId: ''
  });
  const [templateData, setTemplateData] = useState({
    name: '',
    type: 'email' as const,
    subject: '',
    content: '',
    variables: ''
  });

  // Dados mockados
  const messages: Message[] = [
    {
      id: '1',
      type: 'email',
      recipient: 'maria.silva@email.com',
      subject: 'Bem-vinda ao DOM v2!',
      content: 'Olá Maria! Seja bem-vinda ao nosso sistema de gestão doméstica.',
      status: 'delivered',
      sentAt: '2025-01-27T10:30:00Z',
      deliveredAt: '2025-01-27T10:31:00Z',
      readAt: '2025-01-27T10:35:00Z'
    },
    {
      id: '2',
      type: 'sms',
      recipient: '+55 11 99999-9999',
      subject: 'Lembrete de Pagamento',
      content: 'Seu pagamento vence em 3 dias. Valor: R$ 1.250,00',
      status: 'sent',
      sentAt: '2025-01-27T09:15:00Z'
    },
    {
      id: '3',
      type: 'whatsapp',
      recipient: '+55 11 88888-8888',
      subject: 'Confirmação de Agendamento',
      content: 'Seu agendamento para limpeza foi confirmado para amanhã às 14h.',
      status: 'delivered',
      sentAt: '2025-01-26T16:45:00Z',
      deliveredAt: '2025-01-26T16:46:00Z'
    },
    {
      id: '4',
      type: 'push',
      recipient: 'João Silva',
      subject: 'Nova Tarefa Atribuída',
      content: 'Você tem uma nova tarefa: "Organizar documentos"',
      status: 'failed',
      sentAt: '2025-01-26T14:20:00Z'
    }
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'Boas-vindas',
      type: 'email',
      subject: 'Bem-vindo ao DOM v2, {{nome}}!',
      content: 'Olá {{nome}}! Seja bem-vindo ao nosso sistema de gestão doméstica. Estamos aqui para facilitar sua vida.',
      variables: ['nome'],
      usageCount: 45,
      createdAt: '2025-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Lembrete de Pagamento',
      type: 'sms',
      subject: 'Lembrete de Pagamento',
      content: 'Olá {{nome}}! Seu pagamento de R$ {{valor}} vence em {{dias}} dias.',
      variables: ['nome', 'valor', 'dias'],
      usageCount: 23,
      createdAt: '2025-01-10T14:30:00Z'
    },
    {
      id: '3',
      name: 'Confirmação de Agendamento',
      type: 'whatsapp',
      subject: 'Agendamento Confirmado',
      content: 'Olá {{nome}}! Seu agendamento para {{servico}} foi confirmado para {{data}} às {{hora}}.',
      variables: ['nome', 'servico', 'data', 'hora'],
      usageCount: 12,
      createdAt: '2025-01-05T09:15:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#10b981';
      case 'sent': return '#3b82f6';
      case 'failed': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Entregue';
      case 'sent': return 'Enviado';
      case 'failed': return 'Falhou';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return '📧';
      case 'sms': return '📱';
      case 'whatsapp': return '💬';
      case 'push': return '🔔';
      default: return '📨';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'email': return 'E-mail';
      case 'sms': return 'SMS';
      case 'whatsapp': return 'WhatsApp';
      case 'push': return 'Push';
      default: return type;
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviando mensagem:', messageData);
    setShowNewMessageModal(false);
    setMessageData({ type: 'email', recipients: '', subject: '', content: '', templateId: '' });
    alert('Mensagem enviada com sucesso!');
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Criando template:', templateData);
    setShowTemplateModal(false);
    setTemplateData({ name: '', type: 'email', subject: '', content: '', variables: '' });
    alert('Template criado com sucesso!');
  };

  const stats = {
    totalMessages: messages.length,
    deliveredMessages: messages.filter(m => m.status === 'delivered').length,
    failedMessages: messages.filter(m => m.status === 'failed').length,
    deliveryRate: Math.round((messages.filter(m => m.status === 'delivered').length / messages.length) * 100)
  };

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
          📢 Comunicação
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b', 
          margin: 0 
        }}>
          Gerencie mensagens, templates e notificações
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
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📨</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {stats.totalMessages}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Total de Mensagens</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {stats.deliveredMessages}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Entregues</div>
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
            {stats.deliveryRate}%
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Taxa de Entrega</div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📝</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
            {templates.length}
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>Templates</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '4px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <button
          onClick={() => setSelectedTab('messages')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'messages' ? '#6366f1' : 'transparent',
            color: selectedTab === 'messages' ? '#ffffff' : '#6b7280'
          }}
        >
          📨 Mensagens
        </button>
        <button
          onClick={() => setSelectedTab('templates')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'templates' ? '#6366f1' : 'transparent',
            color: selectedTab === 'templates' ? '#ffffff' : '#6b7280'
          }}
        >
          📝 Templates
        </button>
        <button
          onClick={() => setSelectedTab('analytics')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'analytics' ? '#6366f1' : 'transparent',
            color: selectedTab === 'analytics' ? '#ffffff' : '#6b7280'
          }}
        >
          📊 Analytics
        </button>
      </div>

      {/* Tab: Mensagens */}
      {selectedTab === 'messages' && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#1e293b', 
              margin: 0 
            }}>
              Histórico de Mensagens
            </h2>
            <button
              onClick={() => setShowNewMessageModal(true)}
              style={{
                backgroundColor: '#6366f1',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              ✉️ Nova Mensagem
            </button>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {messages.map((message) => (
              <div
                key={message.id}
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
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '24px' }}>{getTypeIcon(message.type)}</div>
                    <div>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 4px 0'
                      }}>
                        {message.subject}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        margin: 0
                      }}>
                        Para: {message.recipient}
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
                      backgroundColor: `${getStatusColor(message.status)}15`,
                      color: getStatusColor(message.status)
                    }}>
                      {getStatusText(message.status)}
                    </span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {getTypeText(message.type)}
                    </span>
                  </div>
                </div>

                <p style={{
                  fontSize: '14px',
                  color: '#374151',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5'
                }}>
                  {message.content}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  <span>Enviado: {new Date(message.sentAt).toLocaleString('pt-BR')}</span>
                  {message.deliveredAt && (
                    <span>Entregue: {new Date(message.deliveredAt).toLocaleString('pt-BR')}</span>
                  )}
                  {message.readAt && (
                    <span>Lido: {new Date(message.readAt).toLocaleString('pt-BR')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Templates */}
      {selectedTab === 'templates' && (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <h2 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#1e293b', 
              margin: 0 
            }}>
              Templates de Mensagem
            </h2>
            <button
              onClick={() => setShowTemplateModal(true)}
              style={{
                backgroundColor: '#6366f1',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              📝 Novo Template
            </button>
          </div>

          <div style={{ display: 'grid', gap: '16px' }}>
            {templates.map((template) => (
              <div
                key={template.id}
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
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '24px' }}>{getTypeIcon(template.type)}</div>
                    <div>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 4px 0'
                      }}>
                        {template.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        margin: 0
                      }}>
                        {template.subject}
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
                      backgroundColor: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {getTypeText(template.type)}
                    </span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: '#dbeafe',
                      color: '#1d4ed8'
                    }}>
                      {template.usageCount} usos
                    </span>
                  </div>
                </div>

                <p style={{
                  fontSize: '14px',
                  color: '#374151',
                  margin: '0 0 12px 0',
                  lineHeight: '1.5'
                }}>
                  {template.content}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Variáveis: {template.variables.join(', ')}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      style={{
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      style={{
                        backgroundColor: '#10b981',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      📤 Usar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Analytics */}
      {selectedTab === 'analytics' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            Analytics de Comunicação
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Gráfico por Tipo */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1e293b',
                margin: '0 0 16px 0'
              }}>
                📊 Mensagens por Tipo
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {['email', 'sms', 'whatsapp', 'push'].map((type) => {
                  const count = messages.filter(m => m.type === type).length;
                  const percentage = Math.round((count / messages.length) * 100);
                  return (
                    <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ fontSize: '20px' }}>{getTypeIcon(type)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '4px'
                        }}>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                            {getTypeText(type)}
                          </span>
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${percentage}%`,
                            height: '100%',
                            backgroundColor: '#6366f1',
                            borderRadius: '4px'
                          }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gráfico por Status */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1e293b',
                margin: '0 0 16px 0'
              }}>
                📈 Status de Entrega
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {['delivered', 'sent', 'failed', 'pending'].map((status) => {
                  const count = messages.filter(m => m.status === status).length;
                  const percentage = Math.round((count / messages.length) * 100);
                  return (
                    <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(status)
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '4px'
                        }}>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                            {getStatusText(status)}
                          </span>
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>
                            {count} ({percentage}%)
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${percentage}%`,
                            height: '100%',
                            backgroundColor: getStatusColor(status),
                            borderRadius: '4px'
                          }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nova Mensagem */}
      {showNewMessageModal && (
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
            maxWidth: '600px',
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
              ✉️ Nova Mensagem
            </h3>

            <form onSubmit={handleSendMessage} style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Tipo de Mensagem
                </label>
                <select
                  value={messageData.type}
                  onChange={(e) => setMessageData({ ...messageData, type: e.target.value as 'email' | 'sms' | 'whatsapp' | 'push' })}
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px'
                  }}
                  aria-label="Tipo de mensagem"
                >
                  <option value="email">E-mail</option>
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="push">Push Notification</option>
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
                  Destinatários
                </label>
                <input
                  type="text"
                  value={messageData.recipients}
                  onChange={(e) => setMessageData({ ...messageData, recipients: e.target.value })}
                  placeholder="Digite os destinatários (separados por vírgula)"
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
                  Assunto
                </label>
                <input
                  type="text"
                  value={messageData.subject}
                  onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                  placeholder="Assunto da mensagem"
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
                  Conteúdo
                </label>
                <textarea
                  value={messageData.content}
                  onChange={(e) => setMessageData({ ...messageData, content: e.target.value })}
                  placeholder="Conteúdo da mensagem"
                  rows={6}
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowNewMessageModal(false)}
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
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Novo Template */}
      {showTemplateModal && (
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
            maxWidth: '600px',
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
              📝 Novo Template
            </h3>

            <form onSubmit={handleCreateTemplate} style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Nome do Template
                </label>
                <input
                  type="text"
                  value={templateData.name}
                  onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                  placeholder="Ex: Boas-vindas"
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
                  Tipo
                </label>
                <select
                  value={templateData.type}
                  onChange={(e) => setTemplateData({ ...templateData, type: e.target.value as 'email' | 'sms' | 'whatsapp' | 'push' })}
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px'
                  }}
                  aria-label="Tipo de template"
                >
                  <option value="email">E-mail</option>
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="push">Push Notification</option>
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
                  Assunto
                </label>
                <input
                  type="text"
                  value={templateData.subject}
                  onChange={(e) => setTemplateData({ ...templateData, subject: e.target.value })}
                  placeholder="Assunto da mensagem"
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
                  Conteúdo
                </label>
                <textarea
                  value={templateData.content}
                  onChange={(e) => setTemplateData({ ...templateData, content: e.target.value })}
                  placeholder="Conteúdo do template (use {{variavel}} para variáveis)"
                  rows={6}
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    resize: 'vertical'
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
                  Variáveis (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={templateData.variables}
                  onChange={(e) => setTemplateData({ ...templateData, variables: e.target.value })}
                  placeholder="Ex: nome, valor, data"
                  style={{
                    width: '100%',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowTemplateModal(false)}
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
                  Criar Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationScreen;
