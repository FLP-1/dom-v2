/**
 * @fileoverview FamilyGamification - Sistema de gamificação familiar
 * @description Sistema completo de pontos, badges e recompensas para famílias
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-08-10
 * 
 * @usage
 * <FamilyGamification familyId="family-123" userId="user-456" />
 * 
 * @features
 * - Sistema de pontos por atividade
 * - Badges e conquistas personalizadas
 * - Ranking familiar em tempo real
 * - Desafios semanais e mensais
 * - Recompensas customizáveis
 * - Níveis e progressão
 * 
 * @see
 * - docs/features/gamificacao-familiar.md
 * - docs/directives/diretivas-pensamento-critico.md
 */

import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Animated, Modal } from 'react-native';
import { Card } from '../ui/Card.tsx';
import { Button } from '../ui/Button.tsx';
import { Toast } from '../ui/Toast.tsx';
// Tipos e interfaces
interface GamificationData {
  user: {
    id: string;
    name: string;
    avatar: string;
    level: number;
    totalPoints: number;
    currentPoints: number;
    pointsToNextLevel: number;
    rank: number;
    badges: Badge[];
    achievements: Achievement[];
  };
  family: {
    id: string;
    totalMembers: number;
    weeklyGoal: number;
    weeklyProgress: number;
    monthlyChallenge: Challenge;
    leaderboard: FamilyMember[];
  };
  activities: Activity[];
  challenges: Challenge[];
  rewards: Reward[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
  category: 'task' | 'streak' | 'social' | 'special';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  progress: number;
  target: number;
  completed: boolean;
  unlockedAt?: Date;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  points: number;
  category: 'cleaning' | 'organization' | 'cooking' | 'maintenance' | 'communication';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // em minutos
  ageRestriction?: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'weekly' | 'monthly' | 'special';
  startDate: Date;
  endDate: Date;
  participants: string[];
  progress: { [userId: string]: number };
  target: number;
  reward: {
    points: number;
    badge?: Badge;
    customReward?: string;
  };
}

interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  weeklyPoints: number;
  lastActivity: Date;
  streak: number;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number; // em pontos
  category: 'privilege' | 'treat' | 'activity' | 'purchase';
  available: boolean;
  cooldown?: number; // em dias
}

interface FamilyGamificationProps {
  familyId: string;
  userId: string;
  onActivityComplete?: (activity: Activity, points: number) => void;
  onRewardClaim?: (reward: Reward) => void;
  style?: unknown;
}

// Validação de entrada de dados

const FamilyGamification: React.FC<FamilyGamificationProps> = ({
  familyId,
  userId,
  onActivityComplete,
  onRewardClaim,
  style
}) => {
  // Estados
  const [gamificationData, setGamificationData] = useState<GamificationData | null>(null);
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'activities' | 'challenges' | 'rewards'>('dashboard');
  const [showLevelUp, setShowLevelUp] = useState<boolean>(false);
  const [showBadgeEarned, setShowBadgeEarned] = useState<Badge | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streakAnimation] = useState(new Animated.Value(0));

  // Validações críticas
  useEffect(() => {
    try {
      if (!validateInput(familyId)) {
        throw new Error('familyId é obrigatório');
      }
      if (!validateInput(userId)) {
        throw new Error('userId é obrigatório');
      }

      initializeGamification();
      
    } catch (error) { /* TODO: Implement error handling */ } }, [familyId, userId]);

  // Inicializar sistema de gamificação
  const initializeGamification = async () => {
    try {
      setIsLoading(true);
      await loadGamificationData();
      startStreakAnimation();
    } catch (error) {
      
      Toast.show('Erro ao carregar gamificação', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar dados de gamificação
  const loadGamificationData = async () => {
    try {
      // Simulação de API - substituir por chamada real
      const mockData: GamificationData = {
        user: {
          id: userId,
          name: 'Ana Silva',
          avatar: '👧',
          level: 7,
          totalPoints: 2850,
          currentPoints: 350,
          pointsToNextLevel: 150,
          rank: 2,
          badges: [
            {
              id: 'cleaning-master',
              name: 'Mestre da Limpeza',
              description: 'Completou 50 tarefas de limpeza',
              icon: '🧹',
              rarity: 'rare',
              earnedAt: new Date(Date.now() - 86400000),
              category: 'task'
            },
            {
              id: 'streak-7',
              name: 'Sequência de 7 Dias',
              description: 'Atividade por 7 dias consecutivos',
              icon: '🔥',
              rarity: 'epic',
              earnedAt: new Date(Date.now() - 172800000),
              category: 'streak'
            }
          ],
          achievements: [
            {
              id: 'task-completer',
              title: 'Completador de Tarefas',
              description: 'Complete 100 tarefas domésticas',
              icon: '✅',
              points: 500,
              progress: 73,
              target: 100,
              completed: false
            },
            {
              id: 'early-bird',
              title: 'Madrugador',
              description: 'Complete tarefas antes das 8h por 10 dias',
              icon: '🌅',
              points: 300,
              progress: 6,
              target: 10,
              completed: false
            }
          ]
        },
        family: {
          id: familyId,
          totalMembers: 4,
          weeklyGoal: 1000,
          weeklyProgress: 680,
          monthlyChallenge: {
            id: 'organization-month',
            title: 'Mês da Organização',
            description: 'Organizem juntos todos os cômodos da casa',
            type: 'monthly',
            startDate: new Date(Date.now() - 604800000),
            endDate: new Date(Date.now() + 2419200000),
            participants: ['user1', 'user2', 'user3', 'user4'],
            progress: { 'user1': 3, 'user2': 2, 'user3': 4, 'user4': 1 },
            target: 8,
            reward: {
              points: 1000,
              badge: {
                id: 'organization-champion',
                name: 'Campeão da Organização',
                description: 'Completou o desafio mensal de organização',
                icon: '🏆',
                rarity: 'legendary',
                earnedAt: new Date(),
                category: 'special'
              }
            }
          },
          leaderboard: [
            {
              id: 'parent1',
              name: 'Carlos (Pai)',
              avatar: '👨',
              points: 3200,
              level: 8,
              weeklyPoints: 280,
              lastActivity: new Date(Date.now() - 3600000),
              streak: 12
            },
            {
              id: userId,
              name: 'Ana (Filha)',
              avatar: '👧',
              points: 2850,
              level: 7,
              weeklyPoints: 350,
              lastActivity: new Date(Date.now() - 1800000),
              streak: 8
            },
            {
              id: 'parent2',
              name: 'Maria (Mãe)',
              avatar: '👩',
              points: 2400,
              level: 6,
              weeklyPoints: 180,
              lastActivity: new Date(Date.now() - 7200000),
              streak: 5
            },
            {
              id: 'child2',
              name: 'Pedro (Filho)',
              avatar: '👦',
              points: 1200,
              level: 4,
              weeklyPoints: 90,
              lastActivity: new Date(Date.now() - 14400000),
              streak: 3
            }
          ]
        },
        activities: [
          {
            id: 'clean-kitchen',
            name: 'Limpar Cozinha',
            description: 'Lavar louça, limpar pia e bancadas',
            points: 50,
            category: 'cleaning',
            difficulty: 'medium',
            estimatedTime: 30,
            ageRestriction: 10
          },
          {
            id: 'organize-room',
            name: 'Organizar Quarto',
            description: 'Arrumar cama, organizar roupas e limpar',
            points: 30,
            category: 'organization',
            difficulty: 'easy',
            estimatedTime: 20,
            ageRestriction: 8
          },
          {
            id: 'cook-meal',
            name: 'Preparar Refeição',
            description: 'Ajudar no preparo do almoço ou jantar',
            points: 80,
            category: 'cooking',
            difficulty: 'hard',
            estimatedTime: 60,
            ageRestriction: 12
          }
        ],
        challenges: [
          {
            id: 'weekly-cleanup',
            title: 'Limpeza Semanal',
            description: 'Família complete 20 tarefas de limpeza esta semana',
            type: 'weekly',
            startDate: new Date(Date.now() - 172800000),
            endDate: new Date(Date.now() + 432000000),
            participants: ['user1', 'user2', 'user3', 'user4'],
            progress: { 'user1': 6, 'user2': 4, 'user3': 5, 'user4': 2 },
            target: 20,
            reward: {
              points: 200,
              customReward: 'Pizza em família no fim de semana!'
            }
          }
        ],
        rewards: [
          {
            id: 'choose-movie',
            name: 'Escolher Filme da Noite',
            description: 'Escolha o filme para assistir em família',
            cost: 100,
            category: 'privilege',
            available: true
          },
          {
            id: 'ice-cream',
            name: 'Sorvete Especial',
            description: 'Ganhe um sorvete do seu sabor favorito',
            cost: 150,
            category: 'treat',
            available: true
          },
          {
            id: 'friends-sleepover',
            name: 'Convida Amigo para Dormir',
            description: 'Convide um amigo para dormir em casa',
            cost: 300,
            category: 'activity',
            available: true,
            cooldown: 7
          }
        ]
      };

      setGamificationData(mockData);
      
    } catch (error) { /* TODO: Implement error handling */ } };

  // Animação de streak
  const startStreakAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(streakAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(streakAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  // Completar atividade
  const completeActivity = async (activity: Activity) => {
    try {
      if (!gamificationData) return;

      // Atualizar pontos do usuário
      const newPoints = gamificationData.user.currentPoints + activity.points;
      const newTotalPoints = gamificationData.user.totalPoints + activity.points;
      
      // Verificar se subiu de nível
      let newLevel = gamificationData.user.level;
      let pointsToNextLevel = gamificationData.user.pointsToNextLevel - activity.points;
      
      if (pointsToNextLevel <= 0) {
        newLevel++;
        pointsToNextLevel = 500 - Math.abs(pointsToNextLevel); // 500 pontos por nível
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 3000);
      }

      // Verificar conquista de badge
      const earnedBadge = checkForBadgeEarned(activity, newTotalPoints);
      if (earnedBadge) {
        setShowBadgeEarned(earnedBadge);
        setTimeout(() => setShowBadgeEarned(null), 4000);
      }

      // Atualizar estado
      setGamificationData(prev => prev ? {
        ...prev,
        user: {
          ...prev.user,
          currentPoints: newPoints,
          totalPoints: newTotalPoints,
          level: newLevel,
          pointsToNextLevel: pointsToNextLevel,
          badges: earnedBadge ? [...prev.user.badges, earnedBadge] : prev.user.badges
        }
      } : null);

      // Callback
      if (onActivityComplete) {
        onActivityComplete(activity, activity.points);
      }

      Toast.show(`+${activity.points} pontos! ${activity.name} concluída!`, 'success');
      
    } catch (error) {
      
      Toast.show('Erro ao completar atividade', 'error');
    }
  };

  // Verificar se ganhou badge
  const checkForBadgeEarned = (activity: Activity, totalPoints: number): Badge | null => {
    // Simular lógica de badges
    if (activity.category === 'cleaning' && totalPoints >= 3000) {
      return {
        id: 'cleaning-expert',
        name: 'Expert em Limpeza',
        description: 'Alcançou 3000 pontos com tarefas de limpeza',
        icon: '🏅',
        rarity: 'epic',
        earnedAt: new Date(),
        category: 'task'
      };
    }
    return null;
  };

  // Resgatar recompensa
  const claimReward = async (reward: Reward) => {
    try {
      if (!gamificationData) return;

      if (gamificationData.user.currentPoints < reward.cost) {
        Toast.show('Pontos insuficientes!', 'warning');
        return;
      }

      // Deduzir pontos
      const newPoints = gamificationData.user.currentPoints - reward.cost;
      
      setGamificationData(prev => prev ? {
        ...prev,
        user: {
          ...prev.user,
          currentPoints: newPoints
        }
      } : null);

      if (onRewardClaim) {
        onRewardClaim(reward);
      }

      Toast.show(`Recompensa resgatada: ${reward.name}!`, 'success');
      
    } catch (error) {
      
      Toast.show('Erro ao resgatar recompensa', 'error');
    }
  };

  // Obter cor da raridade
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#6c757d';
      case 'rare': return '#007bff';
      case 'epic': return '#6f42c1';
      case 'legendary': return '#fd7e14';
      default: return '#6c757d';
    }
  };

  // Obter ícone da categoria
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cleaning': return '🧹';
      case 'organization': return '📦';
      case 'cooking': return '👨‍🍳';
      case 'maintenance': return '🔧';
      case 'communication': return '💬';
      default: return '⭐';
    }
  };

  // Renderizar dashboard principal
  const renderDashboard = () => {
    if (!gamificationData) return null;

    return (
      <ScrollView>
        {/* Header de usuário */}
        <Card style={{ margin: 16, padding: 16 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Text style={{ fontSize: 40, marginRight: 12 }}>
              {gamificationData.user.avatar}
            </Text>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#333333'
              }}>
                {gamificationData.user.name}
              </Text>
              
              <Text style={{
                fontSize: 14,
                color: '#666666'
              }}>
                Nível {gamificationData.user.level} • Rank #{gamificationData.user.rank}
              </Text>
            </View>

            {/* Streak indicator */}
            <Animated.View style={{
              opacity: streakAnimation,
              transform: [{
                scale: streakAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2]
                })
              }]
            }}>
              <View style={{
                backgroundColor: '#ff6b35',
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 6,
                alignItems: 'center'
              }}>
                <Text style={{ color: '#ffffff', fontSize: 16 }}>🔥</Text>
                <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: 'bold' }}>
                  {gamificationData.family.leaderboard.find(m => m.id === userId)?.streak || 0}
                </Text>
              </View>
            </Animated.View>
          </View>

          {/* Barra de progresso de nível */}
          <View style={{ marginBottom: 12 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 4
            }}>
              <Text style={{ fontSize: 12, color: '#666666' }}>
                {gamificationData.user.currentPoints} pontos
              </Text>
              <Text style={{ fontSize: 12, color: '#666666' }}>
                Próximo nível: {gamificationData.user.pointsToNextLevel}
              </Text>
            </View>
            
            <View style={{
              width: '100%',
              height: 8,
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
              overflow: 'hidden'
            }}>
              <View style={{
                width: `${(gamificationData.user.currentPoints / (gamificationData.user.currentPoints + gamificationData.user.pointsToNextLevel)) * 100}%`,
                height: '100%',
                backgroundColor: '#28a745',
                borderRadius: 4
              }} />
            </View>
          </View>

          {/* Estatísticas */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#007bff'
              }}>
                {gamificationData.user.totalPoints.toLocaleString()}
              </Text>
              <Text style={{ fontSize: 10, color: '#666666' }}>
                Total Pontos
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fd7e14'
              }}>
                {gamificationData.user.badges.length}
              </Text>
              <Text style={{ fontSize: 10, color: '#666666' }}>
                Badges
              </Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#28a745'
              }}>
                {gamificationData.user.achievements.filter(a => a.completed).length}
              </Text>
              <Text style={{ fontSize: 10, color: '#666666' }}>
                Conquistas
              </Text>
            </View>
          </View>
        </Card>

        {/* Ranking familiar */}
        <Card style={{ margin: 16, padding: 16 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 12,
            color: '#333333'
          }}>
            🏆 Ranking Familiar Esta Semana
          </Text>

          {gamificationData.family.leaderboard.map((member, index) => (
            <View key={member.id} style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
              borderBottomWidth: index < gamificationData.family.leaderboard.length - 1 ? 1 : 0,
              borderBottomColor: '#f0f0f0'
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                width: 30,
                color: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#666666'
              }}>
                #{index + 1}
              </Text>

              <Text style={{ fontSize: 24, marginRight: 8 }}>
                {member.avatar}
              </Text>

              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: member.id === userId ? 'bold' : 'normal',
                  color: member.id === userId ? '#007bff' : '#333333'
                }}>
                  {member.name}
                </Text>
                <Text style={{ fontSize: 10, color: '#666666' }}>
                  Nível {member.level} • {member.weeklyPoints} pts esta semana
                </Text>
              </View>

              {member.streak > 0 && (
                <View style={{
                  backgroundColor: '#ff6b35',
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4
                }}>
                  <Text style={{ color: '#ffffff', fontSize: 10 }}>
                    🔥{member.streak}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </Card>

        {/* Progresso do desafio mensal */}
        <Card style={{ margin: 16, padding: 16 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 8,
            color: '#333333'
          }}>
            🎯 {gamificationData.family.monthlyChallenge.title}
          </Text>

          <Text style={{
            fontSize: 12,
            color: '#666666',
            marginBottom: 12
          }}>
            {gamificationData.family.monthlyChallenge.description}
          </Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8
          }}>
            <Text style={{ fontSize: 12, color: '#666666' }}>
              Progresso: {Object.values(gamificationData.family.monthlyChallenge.progress).reduce((a, b) => a + b, 0)} / {gamificationData.family.monthlyChallenge.target}
            </Text>
            <Text style={{ fontSize: 12, color: '#666666' }}>
              Recompensa: {gamificationData.family.monthlyChallenge.reward.points} pts
            </Text>
          </View>

          <View style={{
            width: '100%',
            height: 8,
            backgroundColor: '#e0e0e0',
            borderRadius: 4,
            overflow: 'hidden',
            marginBottom: 8
          }}>
            <View style={{
              width: `${(Object.values(gamificationData.family.monthlyChallenge.progress).reduce((a, b) => a + b, 0) / gamificationData.family.monthlyChallenge.target) * 100}%`,
              height: '100%',
              backgroundColor: '#6f42c1',
              borderRadius: 4
            }} />
          </View>
        </Card>
      </ScrollView>
    );
  };

  // Renderizar atividades
  const renderActivities = () => {
    if (!gamificationData) return null;

    return (
      <ScrollView style={{ padding: 16 }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 16,
          color: '#333333'
        }}>
          ⭐ Atividades Disponíveis
        </Text>

        {gamificationData.activities.map((activity) => (
          <Card key={activity.id} style={{
            marginBottom: 12,
            padding: 16,
            borderLeftWidth: 4,
            borderLeftColor: activity.difficulty === 'easy' ? '#28a745' : 
                             activity.difficulty === 'medium' ? '#ffc107' : '#dc3545'
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8
            }}>
              <Text style={{ fontSize: 24, marginRight: 8 }}>
                {getCategoryIcon(activity.category)}
              </Text>
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#333333'
                }}>
                  {activity.name}
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: '#666666'
                }}>
                  {activity.description}
                </Text>
              </View>

              <View style={{
                backgroundColor: '#007bff',
                borderRadius: 16,
                paddingHorizontal: 12,
                paddingVertical: 6
              }}>
                <Text style={{
                  color: '#ffffff',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}>
                  +{activity.points}
                </Text>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Text style={{
                  fontSize: 10,
                  color: '#666666'
                }}>
                  ⏱️ {activity.estimatedTime}min
                </Text>
                <Text style={{
                  fontSize: 10,
                  color: '#666666'
                }}>
                  📊 {activity.difficulty}
                </Text>
                {activity.ageRestriction && (
                  <Text style={{
                    fontSize: 10,
                    color: '#666666'
                  }}>
                    👶 {activity.ageRestriction}+
                  </Text>
                )}
              </View>

              <Button
                title="Completar"
                onPress={() => completeActivity(activity)} onKeyDown={(e) => e.key === 'Enter' && (() => completeActivity(activity))()}
                style={{
                  backgroundColor: '#28a745',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 16
                }}
                textStyle={{ fontSize: 12 }}
              />
            </View>
          </Card>
        ))}
      </ScrollView>
    );
  };

  // Renderizar recompensas
  const renderRewards = () => {
    if (!gamificationData) return null;

    return (
      <ScrollView style={{ padding: 16 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333333'
          }}>
            🎁 Loja de Recompensas
          </Text>
          
          <View style={{
            backgroundColor: '#007bff',
            borderRadius: 16,
            paddingHorizontal: 12,
            paddingVertical: 6
          }}>
            <Text style={{
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 'bold'
            }}>
              💰 {gamificationData.user.currentPoints} pontos
            </Text>
          </View>
        </View>

        {gamificationData.rewards.map((reward) => (
          <Card key={reward.id} style={{
            marginBottom: 12,
            padding: 16,
            opacity: gamificationData.user.currentPoints >= reward.cost ? 1 : 0.6
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12
            }}>
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#f8f9fa',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12
              }}>
                <Text style={{ fontSize: 24 }}>
                  {reward.category === 'privilege' ? '👑' :
                   reward.category === 'treat' ? '🍭' :
                   reward.category === 'activity' ? '🎮' : '🛍️'}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#333333'
                }}>
                  {reward.name}
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: '#666666'
                }}>
                  {reward.description}
                </Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#fd7e14'
                }}>
                  {reward.cost}
                </Text>
                <Text style={{
                  fontSize: 10,
                  color: '#666666'
                }}>
                  pontos
                </Text>
              </View>
            </View>

            <Button
              title={gamificationData.user.currentPoints >= reward.cost ? 'Resgatar' : 'Pontos Insuficientes'}
              onPress={() => claimReward(reward)}
              disabled={gamificationData.user.currentPoints < reward.cost}
              style={{
                backgroundColor: gamificationData.user.currentPoints >= reward.cost ? '#28a745' : '#6c757d',
                borderRadius: 20
              }}
            />
          </Card>
        ))}
      </ScrollView>
    );
  };

  // Renderizar navegação de abas
  const renderTabNavigation = () => (
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      marginBottom: 8,
      borderRadius: 25,
      marginHorizontal: 16,
      overflow: 'hidden'
    }}>
      {[
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'activities', label: 'Atividades', icon: '⭐' },
        { id: 'challenges', label: 'Desafios', icon: '🎯' },
        { id: 'rewards', label: 'Recompensas', icon: '🎁' }
      ].map((tab) => (
        <TouchableOpacity accessibilityLabel="Botão"
          key={tab.id}
          onPress={() => setSelectedTab(tab.id as string)}
          style={{
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 8,
            backgroundColor: selectedTab === tab.id ? '#007bff' : 'transparent',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 2 }}>{tab.icon}</Text>
          <Text style={{
            fontSize: 10,
            color: selectedTab === tab.id ? '#ffffff' : '#666666',
            fontWeight: selectedTab === tab.id ? 'bold' : 'normal'
          }}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Modal de subiu de nível
  const LevelUpModal = () => (
    <Modal
      visible={showLevelUp}
      transparent
      animationType="fade"
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          backgroundColor: '#ffffff',
          borderRadius: 20,
          padding: 32,
          alignItems: 'center',
          minWidth: 250
        }}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>🎉</Text>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333333',
            marginBottom: 8
          }}>
            Parabéns!
          </Text>
          <Text style={{
            fontSize: 16,
            color: '#666666',
            textAlign: 'center'
          }}>
            Você subiu para o nível {gamificationData?.user.level}!
          </Text>
        </View>
      </View>
    </Modal>
  );

  // Modal de badge conquistado
  const BadgeEarnedModal = () => (
    <Modal
      visible={!!showBadgeEarned}
      transparent
      animationType="slide"
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          backgroundColor: '#ffffff',
          borderRadius: 20,
          padding: 32,
          alignItems: 'center',
          minWidth: 250
        }}>
          <Text style={{ fontSize: 48, marginBottom: 16 }}>
            {showBadgeEarned?.icon}
          </Text>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: getRarityColor(showBadgeEarned?.rarity || 'common'),
            marginBottom: 8
          }}>
            {showBadgeEarned?.name}
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#666666',
            textAlign: 'center'
          }}>
            {showBadgeEarned?.description}
          </Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[{ flex: 1, backgroundColor: '#f8f9fa' }, style]}>
      {/* Navegação de abas */}
      {renderTabNavigation()}

      {/* Conteúdo */}
      {isLoading ? (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: '#666666', fontSize: 16 }}>
            Carregando gamificação...
          </Text>
        </View>
      ) : (
        <>
          {selectedTab === 'dashboard' && renderDashboard()}
          {selectedTab === 'activities' && renderActivities()}
          {selectedTab === 'rewards' && renderRewards()}
          {/* Adicionar outras abas conforme necessário */}
        </>
      )}

      {/* Modais */}
      <LevelUpModal />
      <BadgeEarnedModal />
    </View>
  );
};

export default FamilyGamification;
