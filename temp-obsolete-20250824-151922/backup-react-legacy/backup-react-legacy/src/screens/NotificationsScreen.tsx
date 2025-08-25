import React, { useState } from 'react';
import { useNotifications } from '../hooks/useRealData.ts';

const NotificationsScreen: React.FC = () => {
  // ✅ USANDO DADOS REAIS DO POSTGRESQL
  const { data: notifications, loading, update: updateNotification, delete: deleteNotification, refetch } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Garantir que notifications não seja null antes de usar filter
  const safeNotifications = notifications || [];
  const filteredNotifications = safeNotifications.filter(notification => 
    filter === 'all' ? true : !notification.read
  );

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await updateNotification(notificationId, { read: true });
      refetch();
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
      alert('Erro ao marcar como lida. Tente novamente.');
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
      refetch();
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
      alert('Erro ao deletar notificação. Tente novamente.');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      default: return '🔔';
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
          🔔 Notificações
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          margin: 0
        }}>
          Central de notificações do sistema
        </p>
      </div>

      {/* Filtros */}
      <div style={{
        marginBottom: '24px',
        display: 'flex',
        gap: '12px',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: filter === 'all' ? '#6366f1' : '#f1f5f9',
            color: filter === 'all' ? '#ffffff' : '#374151',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Todas ({safeNotifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: filter === 'unread' ? '#6366f1' : '#f1f5f9',
            color: filter === 'unread' ? '#ffffff' : '#374151',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Não lidas ({safeNotifications.filter(n => !n.read).length})
        </button>
      </div>

      {/* Lista de Notificações */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        {loading ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            Carregando notificações...
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 8px 0'
            }}>
              Nenhuma notificação encontrada
            </h3>
            <p style={{ fontSize: '14px', margin: 0 }}>
              {filter === 'all' ? 'Você não tem notificações ainda.' : 'Todas as notificações foram lidas.'}
            </p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: notification.read ? '#f9fafb' : '#ffffff',
                  borderLeft: `4px solid ${getTypeColor(notification.type)}`
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '20px' }}>
                      {getTypeIcon(notification.type)}
                    </span>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1e293b',
                      margin: 0
                    }}>
                      {notification.title}
                    </h3>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: '#10b981',
                          color: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Marcar como lida
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
                
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  margin: '0 0 8px 0'
                }}>
                  {notification.message}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  <span>{new Date(notification.timestamp).toLocaleString('pt-BR')}</span>
                  <span style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: `${getTypeColor(notification.type)}15`,
                    color: getTypeColor(notification.type),
                    fontSize: '11px',
                    fontWeight: '500'
                  }}>
                    {notification.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsScreen;
