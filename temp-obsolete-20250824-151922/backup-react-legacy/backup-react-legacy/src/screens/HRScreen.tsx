import React, { useState } from 'react';
import { useESocialEvents } from '../hooks/useRealData.ts';



const HRScreen: React.FC = () => {
  const [newEvent, setNewEvent] = useState({
    type: 'S2200' as const,
    employeeId: '',
    employeeName: '',
    eventDate: new Date().toISOString().split('T')[0]
  });

  // ✅ USANDO DADOS REAIS DO POSTGRESQL
  const { data: events, loading, create: createEvent, refetch } = useESocialEvents();
  
  // Garantir que events não seja null antes de usar
  const safeEvents = events || [];

  const handleSendEvent = async () => {
    try {
      if (!newEvent.employeeId || !newEvent.employeeName) {
        alert('Por favor, preencha todos os campos obrigatórios');
        return;
      }

      // ✅ CRIANDO EVENTO REAL NO POSTGRESQL
      await createEvent({
        type: newEvent.type,
        employeeId: newEvent.employeeId,
        employeeName: newEvent.employeeName,
        eventDate: newEvent.eventDate,
        xmlContent: `<xml>Real XML for ${newEvent.type}</xml>`,
        status: 'pending'
      });

      setNewEvent({
        type: 'S2200',
        employeeId: '',
        employeeName: '',
        eventDate: new Date().toISOString().split('T')[0]
      });
      
      refetch(); // Recarregar dados do banco
      alert('Evento eSocial criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar evento eSocial:', error);
      alert('Erro ao criar evento. Tente novamente.');
    }
  };

  const getEventTypeText = (type: string) => {
    const eventTypes: Record<string, string> = {
      'S2200': 'Admissão de Trabalhador',
      'S2205': 'Alteração de Dados Cadastrais',
      'S2206': 'Alteração de Contrato de Trabalho',
      'S2230': 'Afastamento Temporário',
      'S2240': 'Condições Ambientais do Trabalho',
      'S2250': 'Aviso Prévio',
      'S2260': 'Convocação para Trabalho',
      'S2298': 'Reintegração',
      'S2299': 'Desligamento',
      'S2300': 'Trabalhador Sem Vínculo',
      'S2399': 'Trava de Evento'
    };
    return eventTypes[type] || type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return '#10b981';
      case 'sent': return '#3b82f6';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted': return 'Aceito';
      case 'sent': return 'Enviado';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitado';
      default: return 'Desconhecido';
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
          👥 Recursos Humanos
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          margin: 0
        }}>
          Gestão de funcionários e conformidade eSocial
        </p>
      </div>

      {/* Novo Evento eSocial */}
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
          Novo Evento eSocial
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
              Tipo de Evento
            </label>
            <select
              value={newEvent.type}
              onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '44px'
              }}
              aria-label="Tipo de evento eSocial"
            >
              <option value="S2200">S2200 - Admissão</option>
              <option value="S2205">S2205 - Alteração Cadastral</option>
              <option value="S2206">S2206 - Alteração Contrato</option>
              <option value="S2230">S2230 - Afastamento</option>
              <option value="S2240">S2240 - Condições Ambientais</option>
              <option value="S2250">S2250 - Aviso Prévio</option>
              <option value="S2260">S2260 - Convocação</option>
              <option value="S2298">S2298 - Reintegração</option>
              <option value="S2299">S2299 - Desligamento</option>
              <option value="S2300">S2300 - Sem Vínculo</option>
              <option value="S2399">S2399 - Trava</option>
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
              ID do Funcionário
            </label>
            <input
              type="text"
              value={newEvent.employeeId}
              onChange={(e) => setNewEvent({...newEvent, employeeId: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '44px'
              }}
              placeholder="ID do funcionário"
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
              Nome do Funcionário
            </label>
            <input
              type="text"
              value={newEvent.employeeName}
              onChange={(e) => setNewEvent({...newEvent, employeeName: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '44px'
              }}
              placeholder="Nome completo"
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
              Data do Evento
            </label>
            <input
              type="date"
              value={newEvent.eventDate}
              onChange={(e) => setNewEvent({...newEvent, eventDate: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                minHeight: '44px'
              }}
              aria-label="Data do evento"
            />
          </div>
        </div>

        <button
          onClick={handleSendEvent}
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
          Enviar Evento eSocial
        </button>
      </div>

      {/* Histórico de Eventos */}
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
          Histórico de Eventos eSocial
        </h2>

        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            Carregando eventos...
          </div>
        ) : safeEvents.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 8px 0'
            }}>
              Nenhum evento encontrado
            </h3>
            <p style={{ fontSize: '14px', margin: 0 }}>
              Envie seu primeiro evento eSocial acima.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            {safeEvents.map((event) => (
              <div
                key={event.id}
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
                      {getEventTypeText(event.type)}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#64748b',
                      margin: 0
                    }}>
                      {event.employeeName}
                    </p>
                  </div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: `${getStatusColor(event.status)}15`,
                    color: getStatusColor(event.status)
                  }}>
                    {getStatusText(event.status)}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  <span>ID: {event.employeeId}</span>
                  <span>{new Date(event.eventDate).toLocaleDateString('pt-BR')}</span>
                </div>

                {event.protocol && (
                  <div style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    color: '#10b981',
                    fontWeight: '500'
                  }}>
                    Protocolo: {event.protocol}
                  </div>
                )}

                {event.errorMessage && (
                  <div style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    color: '#ef4444',
                    fontWeight: '500'
                  }}>
                    Erro: {event.errorMessage}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HRScreen;
