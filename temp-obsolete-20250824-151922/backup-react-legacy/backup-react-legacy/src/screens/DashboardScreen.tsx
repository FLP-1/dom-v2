import React, { useState } from 'react';

interface DashboardCard {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  value?: string | number;
}

interface DashboardScreenProps {
  onNavigate?: (screen: string) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const dashboardCards: DashboardCard[] = [
    {
      id: 'finance',
      title: 'Finanças',
      icon: '💰',
      color: '#10b981',
      description: 'Gestão financeira completa',
      value: 'R$ 45.230,00'
    },
    {
      id: 'tasks',
      title: 'Tarefas',
      icon: '📝',
      color: '#3b82f6',
      description: 'Organize suas atividades',
      value: '12 pendentes'
    },
    {
      id: 'employees',
      title: 'Funcionários',
      icon: '👥',
      color: '#8b5cf6',
      description: 'Gerencie sua equipe',
      value: '8 ativos'
    },
    {
      id: 'payments',
      title: 'Pagamentos',
      icon: '💳',
      color: '#059669',
      description: 'Controle de pagamentos',
      value: '15 pendentes'
    },
    {
      id: 'timeclock',
      title: 'Ponto',
      icon: '⏰',
      color: '#06b6d4',
      description: 'Controle de presença',
      value: 'Online'
    },
    {
      id: 'budget',
      title: 'Orçamentos',
      icon: '📋',
      color: '#7c3aed',
      description: 'Planejamento financeiro',
      value: '5 ativos'
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: '🔔',
      color: '#ef4444',
      description: 'Mensagens e alertas',
      value: '3 novas'
    },
    {
      id: 'hr',
      title: 'Recursos Humanos',
      icon: '👨‍💼',
      color: '#0891b2',
      description: 'Gestão de RH',
      value: '12 funcionários'
    },
    {
      id: 'reports',
      title: 'Relatórios',
      icon: '📊',
      color: '#f59e0b',
      description: 'Visualize dados e métricas',
      value: '24h'
    },
    {
      id: 'advancedTimeCard',
      title: 'Ponto Avançado',
      icon: '⏱️',
      color: '#0d9488',
      description: 'Controle detalhado de horas',
      value: '156h/mês'
    },
    {
      id: 'paymentIntegrations',
      title: 'Integrações',
      icon: '🔗',
      color: '#dc2626',
      description: 'Stripe, PIX e outros',
      value: '3 ativas'
    },
    {
      id: 'communication',
      title: 'Comunicação',
      icon: '💬',
      color: '#2563eb',
      description: 'Chat e mensagens',
      value: '5 conversas'
    },
    {
      id: 'gamification',
      title: 'Gamificação',
      icon: '🏆',
      color: '#fbbf24',
      description: 'Sistema de recompensas',
      value: '850 pontos'
    },
    {
      id: 'profile',
      title: 'Perfil',
      icon: '👤',
      color: '#6b7280',
      description: 'Configurações pessoais',
      value: 'Ativo'
    },
    {
      id: 'users',
      title: 'Usuários',
      icon: '👥',
      color: '#374151',
      description: 'Gestão de usuários',
      value: '24 cadastrados'
    },
    {
      id: 'settings',
      title: 'Configurações',
      icon: '⚙️',
      color: '#4b5563',
      description: 'Configurações do sistema',
      value: 'Admin'
    }
  ];

  const handleCardPress = (cardId: string) => {
    try {
      setSelectedCard(cardId);
      console.log('Card selecionado:', cardId);
      
      // Navegar para a tela correspondente
      if (onNavigate) {
        console.log('Chamando onNavigate com:', cardId);
        onNavigate(cardId);
      } else {
        console.warn('onNavigate não está disponível');
      }
    } catch (error) {
      console.error('Erro ao clicar no card:', cardId, error);
      alert(`Erro ao acessar ${cardId}. Tente novamente.`);
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
          Dashboard
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#64748b',
          margin: 0
        }}>
          Bem-vindo ao sistema DOM v2
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '8px'
          }}>
            1.247
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b'
          }}>
            Total de Acessos
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '8px'
          }}>
            98.5%
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b'
          }}>
            Uptime
          </div>
        </div>
        
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '8px'
          }}>
            2.3s
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b'
          }}>
            Tempo Médio
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {dashboardCards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardPress(card.id)}
            style={{
              backgroundColor: '#ffffff',
              border: 'none',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textAlign: 'left',
              minHeight: '120px',
              minWidth: '280px',
              transform: selectedCard === card.id ? 'scale(0.98)' : 'scale(1)',
              borderLeft: `4px solid ${card.color}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = selectedCard === card.id ? 'scale(0.98)' : 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              gap: '12px'
            }}>
              <span style={{
                fontSize: '32px'
              }}>
                {card.icon}
              </span>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  margin: '0 0 4px 0'
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  margin: 0
                }}>
                  {card.description}
                </p>
              </div>
            </div>
            
            {card.value && (
              <div style={{
                marginTop: 'auto',
                padding: '8px 12px',
                backgroundColor: `${card.color}15`,
                borderRadius: '8px',
                alignSelf: 'flex-start'
              }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: card.color
                }}>
                  {card.value}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardScreen;

