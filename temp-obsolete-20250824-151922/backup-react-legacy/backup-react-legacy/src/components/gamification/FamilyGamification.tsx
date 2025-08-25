import React, { useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
  avatar?: string;
}

interface FamilyGamificationProps {
  achievements?: Achievement[];
  leaderboard?: LeaderboardEntry[];
  userPoints?: number;
  userLevel?: number;
  onUnlockAchievement?: (achievementId: string) => void;
  style?: React.CSSProperties;
}

const FamilyGamification: React.FC<FamilyGamificationProps> = ({
  achievements = [],
  leaderboard = [],
  userPoints = 0,
  userLevel = 1,
  onUnlockAchievement,
  style = {}
}) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard'>('achievements');

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const totalPoints = achievements.reduce((sum, a) => sum + (a.unlocked ? a.points : 0), 0);

  const getLevelInfo = (level: number) => {
    const basePoints = 100;
    const pointsForLevel = level * basePoints;
    const nextLevelPoints = (level + 1) * basePoints;
    const progress = ((userPoints - pointsForLevel) / (nextLevelPoints - pointsForLevel)) * 100;
    
    return {
      currentLevel: level,
      pointsForLevel,
      nextLevelPoints,
      progress: Math.min(Math.max(progress, 0), 100)
    };
  };

  const levelInfo = getLevelInfo(userLevel);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxHeight: '600px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      ...style
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f8fafc'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1e293b',
          margin: '0 0 12px 0'
        }}>
          🏆 Gamificação Familiar
        </h3>

        {/* User Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '12px'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '12px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#6366f1'
            }}>
              {userLevel}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#6b7280'
            }}>
              Nível
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '12px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#10b981'
            }}>
              {userPoints}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#6b7280'
            }}>
              Pontos
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '12px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#f59e0b'
            }}>
              {unlockedAchievements.length}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#6b7280'
            }}>
              Conquistas
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div style={{
          marginTop: '12px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#6b7280',
            marginBottom: '4px'
          }}>
            <span>Nível {levelInfo.currentLevel}</span>
            <span>Nível {levelInfo.currentLevel + 1}</span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e5e7eb',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${levelInfo.progress}%`,
              height: '100%',
              backgroundColor: '#6366f1',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <div style={{
            fontSize: '11px',
            color: '#6b7280',
            marginTop: '4px',
            textAlign: 'center'
          }}>
            {userPoints - levelInfo.pointsForLevel} / {levelInfo.nextLevelPoints - levelInfo.pointsForLevel} pontos para o próximo nível
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <button
          onClick={() => setActiveTab('achievements')}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            backgroundColor: activeTab === 'achievements' ? '#6366f1' : 'transparent',
            color: activeTab === 'achievements' ? '#ffffff' : '#374151',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            minHeight: '44px'
          }}
        >
          🏅 Conquistas
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          style={{
            flex: 1,
            padding: '12px',
            border: 'none',
            backgroundColor: activeTab === 'leaderboard' ? '#6366f1' : 'transparent',
            color: activeTab === 'leaderboard' ? '#ffffff' : '#374151',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            minHeight: '44px'
          }}
        >
          📊 Ranking
        </button>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '16px'
      }}>
        {activeTab === 'achievements' ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {achievements.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: '0 0 8px 0'
                }}>
                  Nenhuma conquista disponível
                </h4>
                <p style={{ fontSize: '14px', margin: 0 }}>
                  Complete tarefas para desbloquear conquistas!
                </p>
              </div>
            ) : (
              achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    backgroundColor: achievement.unlocked ? '#f0f9ff' : '#f9fafb',
                    border: `1px solid ${achievement.unlocked ? '#0ea5e9' : '#e5e7eb'}`,
                    opacity: achievement.unlocked ? 1 : 0.7
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      opacity: achievement.unlocked ? 1 : 0.5
                    }}>
                      {achievement.icon}
                    </div>

                    <div style={{
                      flex: 1
                    }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: '0 0 4px 0'
                      }}>
                        {achievement.title}
                      </h4>
                      
                      <p style={{
                        fontSize: '14px',
                        color: '#64748b',
                        margin: '0 0 8px 0'
                      }}>
                        {achievement.description}
                      </p>

                      {achievement.progress !== undefined && achievement.maxProgress && (
                        <div style={{
                          marginBottom: '8px'
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            color: '#6b7280',
                            marginBottom: '4px'
                          }}>
                            <span>Progresso</span>
                            <span>{achievement.progress} / {achievement.maxProgress}</span>
                          </div>
                          <div style={{
                            width: '100%',
                            height: '4px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '2px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                              height: '100%',
                              backgroundColor: '#6366f1'
                            }} />
                          </div>
                        </div>
                      )}

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12px',
                        color: '#6b7280'
                      }}>
                        <span>+{achievement.points} pontos</span>
                        {achievement.unlocked && achievement.unlockedAt && (
                          <span>Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}</span>
                        )}
                      </div>
                    </div>

                    {achievement.unlocked && (
                      <div style={{
                        fontSize: '24px',
                        color: '#10b981'
                      }}>
                        ✅
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {leaderboard.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#6b7280'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: '0 0 8px 0'
                }}>
                  Ranking vazio
                </h4>
                <p style={{ fontSize: '14px', margin: 0 }}>
                  Seja o primeiro a pontuar!
                </p>
              </div>
            ) : (
              leaderboard.map((entry, index) => (
                <div
                  key={entry.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: index === 0 ? '#fef3c7' : '#f9fafb',
                    border: index === 0 ? '1px solid #f59e0b' : '1px solid #e5e7eb'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: index === 0 ? '#f59e0b' : '#6366f1',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>

                  <div style={{
                    flex: 1
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1e293b'
                    }}>
                      {entry.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {entry.points} pontos
                    </div>
                  </div>

                  {index === 0 && (
                    <div style={{
                      fontSize: '20px'
                    }}>
                      👑
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyGamification;
