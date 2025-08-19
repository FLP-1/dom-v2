import { useState, useEffect, useMemo } from 'react';
import { apiService, GamificationStats, Achievement, Challenge, LeaderboardEntry, UserPointsEntry } from '../services/apiService';

export const useGamificationData = () => {
  // Estados principais
  const [stats, setStats] = useState<GamificationStats>({
    total_points: 0,
    level: 1,
    points_to_next_level: 100,
    unlocked_achievements: 0,
    total_achievements: 0,
    achievement_completion_rate: '0',
    active_challenges: 0,
    completed_challenges: 0,
    points_by_category: { /* TODO: Implement error handling */ } });
  
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [availableChallenges, setAvailableChallenges] = useState<Challenge[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  
  // Estados de controle
  const [loading, setLoading] = useState(true);
  const [achievementsLoading, setAchievementsLoading] = useState(false);
  const [challengesLoading, setChallengesLoading] = useState(false);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar estatísticas gerais
  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const statsData = await apiService.getGamificationStats();
      setStats(statsData);
    } catch (err) {
      console.error('Erro ao carregar estatísticas de gamificação:', err);
      setError('Erro ao carregar estatísticas');
      
      // Fallback para dados mock
      const mockStats: GamificationStats = {
        total_points: 350,
        level: 4,
        points_to_next_level: 50,
        unlocked_achievements: 8,
        total_achievements: 25,
        achievement_completion_rate: '32.0',
        active_challenges: 3,
        completed_challenges: 12,
        points_by_category: {
          tasks: 150,
          finance: 100,
          communication: 75,
          timeclock: 25
        }
      };
      
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar achievements
  const loadAchievements = useCallback(async (unlockedOnly = false) => {
    try {
      setAchievementsLoading(true);
      setError(null);

      const achievementsData = await apiService.getAchievements(unlockedOnly);
      setAchievements(achievementsData);
    } catch (err) {
      console.error('Erro ao carregar achievements:', err);
      setError('Erro ao carregar conquistas');
      
      // Fallback para dados mock
      const mockAchievements: Achievement[] = [
        {
          id: 'task-master',
          name: 'Mestre das Tarefas',
          description: 'Complete 50 tarefas',
          icon: '🏆',
          category: 'tasks',
          type: 'milestone',
          criteria: { tasks_completed: 50 },
          points: 100,
          rarity: 'rare',
          active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          unlocked: true,
          unlocked_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString()
        },
        {
          id: 'budget-saver',
          name: 'Poupador Experiente',
          description: 'Economize R$ 1000 no orçamento',
          icon: '💰',
          category: 'finance',
          type: 'milestone',
          criteria: { amount_saved: 1000 },
          points: 150,
          rarity: 'epic',
          active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          unlocked: false
        },
        {
          id: 'communicator',
          name: 'Comunicador Ativo',
          description: 'Envie 100 mensagens no chat familiar',
          icon: '💬',
          category: 'communication',
          type: 'milestone',
          criteria: { messages_sent: 100 },
          points: 75,
          rarity: 'common',
          active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          unlocked: true,
          unlocked_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
        }
      ];
      
      setAchievements(unlockedOnly ? mockAchievements.filter(a => a.unlocked) : mockAchievements);
    } finally {
      setAchievementsLoading(false);
    }
  }, []);

  // Carregar desafios
  const loadChallenges = useCallback(async (status: 'active' | 'completed' | 'available' = 'active') => {
    try {
      setChallengesLoading(true);
      setError(null);

      const challengesData = await apiService.getChallenges(status);
      
      if (status === 'available') {
        setAvailableChallenges(challengesData);
      } else {
        setChallenges(challengesData);
      }
    } catch (err) {
      console.error('Erro ao carregar desafios:', err);
      setError('Erro ao carregar desafios');
      
      // Fallback para dados mock
      const mockChallenges: Challenge[] = [
        {
          id: 'week-tasks',
          name: 'Semana Produtiva',
          description: 'Complete 10 tarefas esta semana',
          type: 'weekly',
          category: 'tasks',
          criteria: { tasks_completed: 10, period: 'week' },
          reward_points: 50,
          reward_badge: 'productive-week',
          start_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
          end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString(),
          active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_status: status === 'available' ? undefined : 'active',
          progress: status === 'available' ? undefined : { tasks_completed: 6 },
          started_at: status === 'available' ? undefined : new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
        },
        {
          id: 'budget-control',
          name: 'Controle Financeiro',
          description: 'Mantenha o orçamento dentro do limite por 30 dias',
          type: 'monthly',
          category: 'finance',
          criteria: { budget_compliance: true, period: 'month' },
          reward_points: 100,
          reward_badge: 'financial-master',
          start_date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
          end_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15).toISOString(),
          active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_status: status === 'available' ? undefined : 'active',
          progress: status === 'available' ? undefined : { days_compliant: 18 },
          started_at: status === 'available' ? undefined : new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString()
        }
      ];
      
      if (status === 'available') {
        setAvailableChallenges(mockChallenges);
      } else {
        setChallenges(mockChallenges.filter(c => c.user_status === status));
      }
    } finally {
      setChallengesLoading(false);
    }
  }, []);

  // Carregar ranking
  const loadLeaderboard = useCallback(async (period: 'all_time' | 'week' | 'month' = 'all_time', limit = 10) => {
    try {
      setLeaderboardLoading(true);
      setError(null);

      const leaderboardData = await apiService.getLeaderboard(period, limit);
      setLeaderboard(leaderboardData);
    } catch (err) {
      console.error('Erro ao carregar ranking:', err);
      setError('Erro ao carregar ranking');
      
      // Fallback para dados mock
      const mockLeaderboard: LeaderboardEntry[] = [
        {
          rank: 1,
          user_id: 'user-1',
          name: 'Maria Silva',
          nickname: 'Maria',
          avatar: null,
          total_points: 450
        },
        {
          rank: 2,
          user_id: 'user-2',
          name: 'João Silva',
          nickname: 'João',
          avatar: null,
          total_points: 380
        },
        {
          rank: 3,
          user_id: 'current-user',
          name: 'Você',
          nickname: 'Você',
          avatar: null,
          total_points: 350
        },
        {
          rank: 4,
          user_id: 'user-3',
          name: 'Ana Santos',
          nickname: 'Ana',
          avatar: null,
          total_points: 290
        }
      ];
      
      setLeaderboard(mockLeaderboard);
    } finally {
      setLeaderboardLoading(false);
    }
  }, []);

  // Aceitar desafio
  const acceptChallenge = useCallback(async (challengeId: string) => {
    try {
      setError(null);

      const acceptedChallenge = await apiService.acceptChallenge(challengeId);
      
      // Atualizar listas locais
      setAvailableChallenges(prev => prev.filter(c => c.id !== challengeId));
      setChallenges(prev => [...prev, acceptedChallenge]);
      
      // Atualizar estatísticas
      setStats(prev => ({
        ...prev,
        active_challenges: prev.active_challenges + 1
      }));

      return acceptedChallenge;
    } catch (err) {
      console.error('Erro ao aceitar desafio:', err);
      setError('Erro ao aceitar desafio');
      return null;
    }
  }, []);

  // Adicionar pontos
  const addPoints = useCallback(async (data: {
    action: string;
    points: number;
    category: string;
    reference_id?: string;
    metadata?: Record<string, unknown>;
  }) => {
    try {
      setError(null);

      const pointsEntry = await apiService.addPoints(data);
      
      // Atualizar estatísticas locais
      setStats(prev => {
        const newTotalPoints = prev.total_points + data.points;
        const newLevel = Math.floor(newTotalPoints / 100) + 1;
        const pointsToNextLevel = (newLevel * 100) - newTotalPoints;
        
        return {
          ...prev,
          total_points: newTotalPoints,
          level: newLevel,
          points_to_next_level: Math.max(0, pointsToNextLevel),
          points_by_category: {
            ...prev.points_by_category,
            [data.category]: (prev.points_by_category[data.category] || 0) + data.points
          }
        };
      });

      return pointsEntry;
    } catch (err) {
      console.error('Erro ao adicionar pontos:', err);
      setError('Erro ao adicionar pontos');
      return null;
    }
  }, []);

  // Recarregar todos os dados
  const reload = useCallback(() => {
    loadStats();
    loadAchievements();
    loadChallenges('active');
    loadChallenges('available');
    loadLeaderboard();
  }, [loadStats, loadAchievements, loadChallenges, loadLeaderboard]);

  // Estatísticas computadas
  const computedStats = useMemo(() => ({
    ...stats,
    level_progress: stats.level > 1 ? ((stats.total_points - ((stats.level - 1) * 100)) / 100) * 100 : (stats.total_points / 100) * 100,
    is_max_level: stats.points_to_next_level === 0,
    achievements_unlocked_today: achievements.filter(a => {
      if (!a.unlocked_at) return false;
      const today = new Date().toDateString();
      return new Date(a.unlocked_at).toDateString() === today;
    }).length,
    active_challenges_count: challenges.filter(c => c.user_status === 'active').length,
    available_challenges_count: availableChallenges.length,
    user_rank: leaderboard.find(entry => entry.user_id === 'current-user')?.rank || null
  }), [stats, achievements, challenges, availableChallenges, leaderboard]);

  // Efeitos
  useEffect(() => {
    reload();
  }, [reload]);

  return {
    // Dados
    stats: computedStats,
    achievements,
    challenges,
    availableChallenges,
    leaderboard,
    
    // Estados de controle
    loading,
    achievementsLoading,
    challengesLoading,
    leaderboardLoading,
    error,
    
    // Ações
    loadStats,
    loadAchievements,
    loadChallenges,
    loadLeaderboard,
    acceptChallenge,
    addPoints,
    reload,
    
    // Helpers
    hasUnlockedAchievements: computedStats.unlocked_achievements > 0,
    hasActiveChallenges: computedStats.active_challenges > 0,
    canLevelUp: computedStats.points_to_next_level <= 50,
    getAchievementsByCategory: (category: string) => achievements.filter(a => a.category === category),
    getChallengesByStatus: (status: string) => challenges.filter(c => c.user_status === status),
    formatPoints: (points: number) => points.toLocaleString('pt-BR'),
    getRarityColor: (rarity: string) => {
      switch (rarity) {
        case 'legendary': return '#FFD700';
        case 'epic': return '#9945FF';
        case 'rare': return '#0084FF';
        case 'common': default: return '#42B883';
      }
    }
  };
};
