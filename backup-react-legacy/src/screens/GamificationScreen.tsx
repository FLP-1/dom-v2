import React, { useState } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  category: 'task' | 'finance' | 'family' | 'streak' | 'special';
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  points: number;
  rank: number;
  streak: number;
  achievements: number;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  level: number;
  points: number;
  rank: number;
  isCurrentUser: boolean;
}

const GamificationScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'leaderboard' | 'rewards'>('overview');
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  // Dados mockados
  const currentUser: User = {
    id: '1',
    name: 'Maria Silva',
    avatar: '👩',
    level: 8,
    points: 2840,
    rank: 3,
    streak: 12,
    achievements: 15
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Primeira Tarefa',
      description: 'Complete sua primeira tarefa',
      icon: '✅',
      points: 50,
      category: 'task',
      unlocked: true,
      unlockedAt: '2025-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Organizador Financeiro',
      description: 'Configure seu primeiro orçamento',
      icon: '💰',
      points: 100,
      category: 'finance',
      unlocked: true,
      unlockedAt: '2025-01-16T14:20:00Z'
    },
    {
      id: '3',
      name: 'Família Unida',
      description: 'Adicione 3 membros da família',
      icon: '👨‍👩‍👧‍👦',
      points: 150,
      category: 'family',
      unlocked: true,
      unlockedAt: '2025-01-18T09:15:00Z'
    },
    {
      id: '4',
      name: 'Dedicação Diária',
      description: 'Complete tarefas por 7 dias seguidos',
      icon: '🔥',
      points: 200,
      category: 'streak',
      unlocked: false,
      progress: 5,
      maxProgress: 7
    },
    {
      id: '5',
      name: 'Mestre das Tarefas',
      description: 'Complete 50 tarefas',
      icon: '🏆',
      points: 500,
      category: 'task',
      unlocked: false,
      progress: 32,
      maxProgress: 50
    },
    {
      id: '6',
      name: 'Economista',
      description: 'Economize R$ 1.000 em um mês',
      icon: '💎',
      points: 300,
      category: 'finance',
      unlocked: false,
      progress: 650,
      maxProgress: 1000
    },
    {
      id: '7',
      name: 'Aniversariante',
      description: 'Use o sistema por 1 ano',
      icon: '🎂',
      points: 1000,
      category: 'special',
      unlocked: false
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    {
      id: '2',
      name: 'João Santos',
      avatar: '👨',
      level: 12,
      points: 4560,
      rank: 1,
      isCurrentUser: false
    },
    {
      id: '3',
      name: 'Ana Costa',
      avatar: '👩',
      level: 10,
      points: 3890,
      rank: 2,
      isCurrentUser: false
    },
    {
      id: '1',
      name: 'Maria Silva',
      avatar: '👩',
      level: 8,
      points: 2840,
      rank: 3,
      isCurrentUser: true
    },
    {
      id: '4',
      name: 'Pedro Lima',
      avatar: '👨',
      level: 7,
      points: 2150,
      rank: 4,
      isCurrentUser: false
    },
    {
      id: '5',
      name: 'Carla Ferreira',
      avatar: '👩',
      level: 6,
      points: 1890,
      rank: 5,
      isCurrentUser: false
    }
  ];

  const rewards = [
    {
      id: '1',
      name: 'Café Grátis',
      description: 'Vale para uma cafeteria parceira',
      icon: '☕',
      pointsRequired: 500,
      available: true
    },
    {
      id: '2',
      name: 'Desconto 10%',
      description: 'Desconto em produtos domésticos',
      icon: '🏠',
      pointsRequired: 1000,
      available: true
    },
    {
      id: '3',
      name: 'Jantar Especial',
      description: 'Vale para um restaurante premium',
      icon: '🍽️',
      pointsRequired: 2000,
      available: false
    },
    {
      id: '4',
      name: 'Viagem Fim de Semana',
      description: 'Pacote para 2 pessoas',
      icon: '✈️',
      pointsRequired: 5000,
      available: false
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'task': return '#10b981';
      case 'finance': return '#f59e0b';
      case 'family': return '#3b82f6';
      case 'streak': return '#ef4444';
      case 'special': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'task': return 'Tarefas';
      case 'finance': return 'Finanças';
      case 'family': return 'Família';
      case 'streak': return 'Sequência';
      case 'special': return 'Especial';
      default: return category;
    }
  };

  const getLevelProgress = () => {
    const pointsInLevel = currentUser.points % 500;
    return (pointsInLevel / 500) * 100;
  };

  const handleRedeemReward = (rewardId: string) => {
    setSelectedReward(rewardId);
    setShowRewardModal(true);
  };

  const handleConfirmRedeem = () => {
    console.log('Resgatando recompensa:', selectedReward);
    setShowRewardModal(false);
    setSelectedReward(null);
    alert('Recompensa resgatada com sucesso!');
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

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
          🎮 Gamificação
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b', 
          margin: 0 
        }}>
          Complete desafios, ganhe pontos e desbloqueie conquistas
        </p>
      </div>

      {/* Perfil do Usuário */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div style={{
            fontSize: '48px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #6366f1'
          }}>
            {currentUser.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1e293b',
              margin: '0 0 4px 0'
            }}>
              {currentUser.name}
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: '0 0 8px 0'
            }}>
              Nível {currentUser.level} • {currentUser.points} pontos
            </p>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#f3f4f6',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${getLevelProgress()}%`,
                height: '100%',
                backgroundColor: '#6366f1',
                borderRadius: '4px'
              }} />
            </div>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '4px 0 0 0'
            }}>
              {currentUser.points % 500} / 500 pontos para o próximo nível
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
              #{currentUser.rank}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Ranking</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
              {currentUser.streak}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Dias Seguidos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
              {currentUser.achievements}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Conquistas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
              {unlockedAchievements.length}/{achievements.length}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>Desbloqueadas</div>
          </div>
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
          onClick={() => setSelectedTab('overview')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'overview' ? '#6366f1' : 'transparent',
            color: selectedTab === 'overview' ? '#ffffff' : '#6b7280'
          }}
        >
          📊 Visão Geral
        </button>
        <button
          onClick={() => setSelectedTab('achievements')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'achievements' ? '#6366f1' : 'transparent',
            color: selectedTab === 'achievements' ? '#ffffff' : '#6b7280'
          }}
        >
          🏆 Conquistas
        </button>
        <button
          onClick={() => setSelectedTab('leaderboard')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'leaderboard' ? '#6366f1' : 'transparent',
            color: selectedTab === 'leaderboard' ? '#ffffff' : '#6b7280'
          }}
        >
          🏅 Ranking
        </button>
        <button
          onClick={() => setSelectedTab('rewards')}
          style={{
            flex: 1,
            padding: '12px 16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            backgroundColor: selectedTab === 'rewards' ? '#6366f1' : 'transparent',
            color: selectedTab === 'rewards' ? '#ffffff' : '#6b7280'
          }}
        >
          🎁 Recompensas
        </button>
      </div>

      {/* Tab: Visão Geral */}
      {selectedTab === 'overview' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            Seu Progresso
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Próximas Conquistas */}
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
                🎯 Próximas Conquistas
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {lockedAchievements.slice(0, 3).map((achievement) => (
                  <div
                    key={achievement.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div style={{ fontSize: '24px' }}>{achievement.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1e293b',
                        marginBottom: '4px'
                      }}>
                        {achievement.name}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b',
                        marginBottom: '8px'
                      }}>
                        {achievement.description}
                      </div>
                      {achievement.progress !== undefined && (
                        <div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            color: '#6b7280',
                            marginBottom: '4px'
                          }}>
                            <span>Progresso</span>
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <div style={{
                            width: '100%',
                            height: '6px',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${(achievement.progress / achievement.maxProgress!) * 100}%`,
                              height: '100%',
                              backgroundColor: getCategoryColor(achievement.category),
                              borderRadius: '3px'
                            }} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: getCategoryColor(achievement.category),
                      backgroundColor: `${getCategoryColor(achievement.category)}15`,
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>
                      +{achievement.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estatísticas por Categoria */}
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
                📈 Conquistas por Categoria
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {['task', 'finance', 'family', 'streak', 'special'].map((category) => {
                  const categoryAchievements = achievements.filter(a => a.category === category);
                  const unlocked = categoryAchievements.filter(a => a.unlocked).length;
                  const total = categoryAchievements.length;
                  const percentage = total > 0 ? Math.round((unlocked / total) * 100) : 0;
                  const totalPoints = categoryAchievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
                  
                  return (
                    <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: getCategoryColor(category)
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '4px'
                        }}>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                            {getCategoryText(category)}
                          </span>
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>
                            {unlocked}/{total} ({percentage}%)
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${percentage}%`,
                            height: '100%',
                            backgroundColor: getCategoryColor(category),
                            borderRadius: '3px'
                          }} />
                        </div>
                        <div style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          marginTop: '4px'
                        }}>
                          {totalPoints} pontos ganhos
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

      {/* Tab: Conquistas */}
      {selectedTab === 'achievements' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            Todas as Conquistas
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb',
                  opacity: achievement.unlocked ? 1 : 0.7
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    fontSize: '32px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: achievement.unlocked ? getCategoryColor(achievement.category) : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: achievement.unlocked ? '#ffffff' : '#9ca3af'
                  }}>
                    {achievement.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: achievement.unlocked ? '#1e293b' : '#9ca3af',
                        margin: 0
                      }}>
                        {achievement.name}
                      </h3>
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: `${getCategoryColor(achievement.category)}15`,
                        color: getCategoryColor(achievement.category)
                      }}>
                        {getCategoryText(achievement.category)}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '14px',
                      color: achievement.unlocked ? '#64748b' : '#9ca3af',
                      margin: '0 0 8px 0'
                    }}>
                      {achievement.description}
                    </p>
                    {achievement.progress !== undefined && (
                      <div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '12px',
                          color: '#6b7280',
                          marginBottom: '4px'
                        }}>
                          <span>Progresso</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${(achievement.progress / achievement.maxProgress!) * 100}%`,
                            height: '100%',
                            backgroundColor: getCategoryColor(achievement.category),
                            borderRadius: '3px'
                          }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: achievement.unlocked ? getCategoryColor(achievement.category) : '#9ca3af',
                      marginBottom: '4px'
                    }}>
                      +{achievement.points}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      pontos
                    </div>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div style={{
                        fontSize: '10px',
                        color: '#9ca3af',
                        marginTop: '4px'
                      }}>
                        {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Ranking */}
      {selectedTab === 'leaderboard' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            🏅 Ranking da Comunidade
          </h2>

          <div style={{ display: 'grid', gap: '12px' }}>
            {leaderboard.map((user, index) => (
              <div
                key={user.id}
                style={{
                  backgroundColor: user.isCurrentUser ? '#fef3c7' : '#ffffff',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: user.isCurrentUser ? '2px solid #f59e0b' : '1px solid #e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: index === 0 ? '#fbbf24' : index === 1 ? '#9ca3af' : index === 2 ? '#cd7f32' : '#6b7280',
                  minWidth: '40px'
                }}>
                  #{user.rank}
                </div>
                <div style={{
                  fontSize: '32px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {user.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1e293b',
                      margin: 0
                    }}>
                      {user.name}
                    </h3>
                    {user.isCurrentUser && (
                      <span style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: '600',
                        backgroundColor: '#f59e0b',
                        color: '#ffffff'
                      }}>
                        VOCÊ
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    Nível {user.level} • {user.points.toLocaleString('pt-BR')} pontos
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1e293b'
                  }}>
                    Nível {user.level}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    {user.points.toLocaleString('pt-BR')} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Recompensas */}
      {selectedTab === 'rewards' && (
        <div>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#1e293b', 
            margin: '0 0 16px 0' 
          }}>
            🎁 Recompensas Disponíveis
          </h2>

          <div style={{ display: 'grid', gap: '16px' }}>
            {rewards.map((reward) => (
              <div
                key={reward.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb',
                  opacity: reward.available ? 1 : 0.6
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    fontSize: '32px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: reward.available ? '#fef3c7' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {reward.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: reward.available ? '#1e293b' : '#9ca3af',
                      margin: '0 0 4px 0'
                    }}>
                      {reward.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: reward.available ? '#64748b' : '#9ca3af',
                      margin: 0
                    }}>
                      {reward.description}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: reward.available ? '#f59e0b' : '#9ca3af',
                      marginBottom: '4px'
                    }}>
                      {reward.pointsRequired} pontos
                    </div>
                    {reward.available ? (
                      <button
                        onClick={() => handleRedeemReward(reward.id)}
                        disabled={currentUser.points < reward.pointsRequired}
                        style={{
                          backgroundColor: currentUser.points >= reward.pointsRequired ? '#f59e0b' : '#f3f4f6',
                          color: currentUser.points >= reward.pointsRequired ? '#ffffff' : '#9ca3af',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 16px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: currentUser.points >= reward.pointsRequired ? 'pointer' : 'not-allowed'
                        }}
                      >
                        {currentUser.points >= reward.pointsRequired ? '🎁 Resgatar' : '❌ Pontos Insuficientes'}
                      </button>
                    ) : (
                      <div style={{
                        fontSize: '12px',
                        color: '#9ca3af',
                        padding: '8px 16px'
                      }}>
                        Em breve
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Resgate */}
      {showRewardModal && (
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
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎁</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 8px 0'
            }}>
              Resgatar Recompensa
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              margin: '0 0 24px 0'
            }}>
              Tem certeza que deseja resgatar esta recompensa?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowRewardModal(false)}
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
                onClick={handleConfirmRedeem}
                style={{
                  backgroundColor: '#f59e0b',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamificationScreen;
