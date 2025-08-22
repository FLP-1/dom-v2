import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth-middleware';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware de autenticação para todas as rotas
router.use(authenticateToken);

// GET /api/gamification/profile - Perfil de gamificação do usuário
router.get('/profile', async (req, res) => {
  try {
    const user_id = req.user?.id;

    // Buscar pontos totais do usuário
    const totalPoints = await prisma.userPoints.aggregate({
      where: {
        user_id: user_id as string
      },
      _sum: {
        points: true
      }
    });

    // Buscar conquistas desbloqueadas
    const achievements = await prisma.userAchievement.findMany({
      where: {
        user_id: user_id as string
      },
      include: {
        achievement: true
      },
      orderBy: {
        unlocked_at: 'desc'
      }
    });

    // Buscar desafios ativos
    const activeChallenges = await prisma.userChallenge.findMany({
      where: {
        user_id: user_id as string,
        status: 'active'
      },
      include: {
        challenge: true
      }
    });

    // Calcular nível baseado nos pontos (cada 100 pontos = 1 nível)
    const points = totalPoints._sum.points || 0;
    const level = Math.floor(points / 100) + 1;
    const progressToNextLevel = points % 100;

    res.json({
      success: true,
      data: {
        user_id: user_id,
        total_points: points,
        level: level,
        progress_to_next_level: progressToNextLevel,
        achievements: achievements.map(ua => ({
          id: ua.achievement.id,
          name: ua.achievement.name,
          description: ua.achievement.description,
          icon: ua.achievement.icon,
          category: ua.achievement.category,
          points: ua.achievement.points,
          rarity: ua.achievement.rarity,
          unlocked_at: ua.unlocked_at
        })),
        active_challenges: activeChallenges.map(uc => ({
          id: uc.challenge.id,
          name: uc.challenge.name,
          description: uc.challenge.description,
          type: uc.challenge.type,
          category: uc.challenge.category,
          reward_points: uc.challenge.reward_points,
          reward_badge: uc.challenge.reward_badge,
          progress: uc.progress,
          started_at: uc.started_at
        }))
      }
    });
  } catch (error) {
    console.error('Erro ao buscar perfil de gamificação:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/gamification/achievements - Listar conquistas disponíveis
router.get('/achievements', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { category, type } = req.query;

    const whereClause: any = {
      active: true
    };

    if (category) {
      whereClause.category = category;
    }

    if (type) {
      whereClause.type = type;
    }

    const achievements = await prisma.achievement.findMany({
      where: whereClause,
      include: {
        user_achievements: {
          where: {
            user_id: user_id as string
          }
        }
      },
      orderBy: [
        { category: 'asc' },
        { points: 'desc' }
      ]
    });

    res.json({
      success: true,
      data: achievements.map(achievement => ({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        category: achievement.category,
        type: achievement.type,
        points: achievement.points,
        rarity: achievement.rarity,
        unlocked: achievement.user_achievements.length > 0,
        unlocked_at: achievement.user_achievements[0]?.unlocked_at || null
      }))
    });
  } catch (error) {
    console.error('Erro ao listar conquistas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/gamification/points - Adicionar pontos ao usuário
router.post('/points', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { action, points, category, reference_id, metadata } = req.body;

    if (!action || !points || !category) {
      return res.status(400).json({
        success: false,
        error: 'Ação, pontos e categoria são obrigatórios'
      });
    }

    const userPoints = await prisma.userPoints.create({
      data: {
        user_id: user_id as string,
        action,
        points: parseInt(points),
        category,
        reference_id,
        metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : null
      }
    });

    // Verificar se alguma conquista foi desbloqueada
    await checkAndUnlockAchievements(user_id as string, action, category);

    res.status(201).json({
      success: true,
      data: userPoints
    });
  } catch (error) {
    console.error('Erro ao adicionar pontos:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/gamification/challenges - Listar desafios disponíveis
router.get('/challenges', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { type, category } = req.query;

    const whereClause: any = {
      active: true,
      start_date: {
        lte: new Date()
      },
      end_date: {
        gte: new Date()
      }
    };

    if (type) {
      whereClause.type = type;
    }

    if (category) {
      whereClause.category = category;
    }

    const challenges = await prisma.challenge.findMany({
      where: whereClause,
      include: {
        user_challenges: {
          where: {
            user_id: user_id as string
          }
        }
      },
      orderBy: [
        { end_date: 'asc' },
        { reward_points: 'desc' }
      ]
    });

    res.json({
      success: true,
      data: challenges.map(challenge => ({
        id: challenge.id,
        name: challenge.name,
        description: challenge.description,
        type: challenge.type,
        category: challenge.category,
        reward_points: challenge.reward_points,
        reward_badge: challenge.reward_badge,
        start_date: challenge.start_date,
        end_date: challenge.end_date,
        status: challenge.user_challenges[0]?.status || 'available',
        progress: challenge.user_challenges[0]?.progress || null,
        started_at: challenge.user_challenges[0]?.started_at || null
      }))
    });
  } catch (error) {
    console.error('Erro ao listar desafios:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// POST /api/gamification/challenges/:id/start - Iniciar um desafio
router.post('/challenges/:id/start', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;

    // Verificar se o desafio existe e está ativo
    const challenge = await prisma.challenge.findFirst({
      where: {
        id,
        active: true,
        start_date: {
          lte: new Date()
        },
        end_date: {
          gte: new Date()
        }
      }
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        error: 'Desafio não encontrado ou não está ativo'
      });
    }

    // Verificar se o usuário já iniciou o desafio
    const existingChallenge = await prisma.userChallenge.findUnique({
      where: {
        user_id_challenge_id: {
          user_id: user_id as string,
          challenge_id: id
        }
      }
    });

    if (existingChallenge) {
      return res.status(400).json({
        success: false,
        error: 'Você já iniciou este desafio'
      });
    }

    const userChallenge = await prisma.userChallenge.create({
      data: {
        user_id: user_id as string,
        challenge_id: id,
        status: 'active',
        progress: {}
      },
      include: {
        challenge: true
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: userChallenge.challenge.id,
        name: userChallenge.challenge.name,
        description: userChallenge.challenge.description,
        type: userChallenge.challenge.type,
        category: userChallenge.challenge.category,
        reward_points: userChallenge.challenge.reward_points,
        reward_badge: userChallenge.challenge.reward_badge,
        status: userChallenge.status,
        progress: userChallenge.progress,
        started_at: userChallenge.started_at
      }
    });
  } catch (error) {
    console.error('Erro ao iniciar desafio:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// PUT /api/gamification/challenges/:id/progress - Atualizar progresso do desafio
router.put('/challenges/:id/progress', async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { id } = req.params;
    const { progress, completed } = req.body;

    const userChallenge = await prisma.userChallenge.findUnique({
      where: {
        user_id_challenge_id: {
          user_id: user_id as string,
          challenge_id: id
        }
      },
      include: {
        challenge: true
      }
    });

    if (!userChallenge) {
      return res.status(404).json({
        success: false,
        error: 'Desafio não encontrado'
      });
    }

    const updateData: any = {
      progress: progress ? JSON.parse(JSON.stringify(progress)) : userChallenge.progress
    };

    if (completed) {
      updateData.status = 'completed';
      updateData.completed_at = new Date();

      // Adicionar pontos de recompensa
      await prisma.userPoints.create({
        data: {
          user_id: user_id as string,
          action: 'challenge_completed',
          points: userChallenge.challenge.reward_points,
          category: 'challenge',
          reference_id: id,
          metadata: {
            challenge_name: userChallenge.challenge.name,
            challenge_type: userChallenge.challenge.type
          }
        }
      });
    }

    const updatedChallenge = await prisma.userChallenge.update({
      where: {
        user_id_challenge_id: {
          user_id: user_id as string,
          challenge_id: id
        }
      },
      data: updateData,
      include: {
        challenge: true
      }
    });

    res.json({
      success: true,
      data: {
        id: updatedChallenge.challenge.id,
        name: updatedChallenge.challenge.name,
        status: updatedChallenge.status,
        progress: updatedChallenge.progress,
        completed_at: updatedChallenge.completed_at
      }
    });
  } catch (error) {
    console.error('Erro ao atualizar progresso do desafio:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/gamification/leaderboard - Ranking de usuários
router.get('/leaderboard', async (req, res) => {
  try {
    const { category, limit = '10' } = req.query;

    const whereClause: any = {};
    if (category) {
      whereClause.category = category;
    }

    const leaderboard = await prisma.userPoints.groupBy({
      by: ['user_id'],
      where: whereClause,
      _sum: {
        points: true
      },
      orderBy: {
        _sum: {
          points: 'desc'
        }
      },
      take: parseInt(limit as string)
    });

    // Buscar informações dos usuários
    const userIds = leaderboard.map(item => item.user_id);
    const users = await prisma.users.findMany({
      where: {
        id: {
          in: userIds
        }
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    const leaderboardData = leaderboard.map((item, index) => {
      const user = users.find(u => u.id === item.user_id);
      return {
        rank: index + 1,
        user_id: item.user_id,
        name: user?.name || 'Usuário',
        email: user?.email || '',
        total_points: item._sum.points || 0
      };
    });

    res.json({
      success: true,
      data: leaderboardData
    });
  } catch (error) {
    console.error('Erro ao buscar ranking:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// GET /api/gamification/stats - Estatísticas de gamificação
router.get('/stats', async (req, res) => {
  try {
    const user_id = req.user?.id;

    // Pontos por categoria
    const pointsByCategory = await prisma.userPoints.groupBy({
      by: ['category'],
      where: {
        user_id: user_id as string
      },
      _sum: {
        points: true
      }
    });

    // Conquistas por categoria
    const achievementsByCategory = await prisma.userAchievement.groupBy({
      by: ['achievement'],
      where: {
        user_id: user_id as string
      },
      _count: true
    });

    // Desafios completados
    const completedChallenges = await prisma.userChallenge.count({
      where: {
        user_id: user_id as string,
        status: 'completed'
      }
    });

    // Total de pontos
    const totalPoints = await prisma.userPoints.aggregate({
      where: {
        user_id: user_id as string
      },
      _sum: {
        points: true
      }
    });

    res.json({
      success: true,
      data: {
        total_points: totalPoints._sum.points || 0,
        points_by_category: pointsByCategory.map(item => ({
          category: item.category,
          points: item._sum.points || 0
        })),
        achievements_count: achievementsByCategory.length,
        completed_challenges: completedChallenges,
        level: Math.floor((totalPoints._sum.points || 0) / 100) + 1
      }
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
});

// Função auxiliar para verificar e desbloquear conquistas
async function checkAndUnlockAchievements(user_id: string, action: string, category: string) {
  try {
    // Buscar conquistas que podem ser desbloqueadas
    const achievements = await prisma.achievement.findMany({
      where: {
        active: true,
        criteria: {
          path: ['action'],
          equals: action
        }
      }
    });

    for (const achievement of achievements) {
      // Verificar se o usuário já tem a conquista
      const existingAchievement = await prisma.userAchievement.findUnique({
        where: {
          user_id_achievement_id: {
            user_id,
            achievement_id: achievement.id
          }
        }
      });

      if (!existingAchievement) {
        // Verificar critérios específicos
        const criteria = achievement.criteria as any;
        let shouldUnlock = false;

        if (criteria.type === 'action_count') {
          const actionCount = await prisma.userPoints.count({
            where: {
              user_id,
              action: action,
              category: category
            }
          });

          if (actionCount >= criteria.required_count) {
            shouldUnlock = true;
          }
        } else if (criteria.type === 'points_threshold') {
          const totalPoints = await prisma.userPoints.aggregate({
            where: {
              user_id
            },
            _sum: {
              points: true
            }
          });

          if ((totalPoints._sum.points || 0) >= criteria.required_points) {
            shouldUnlock = true;
          }
        }

        if (shouldUnlock) {
          // Desbloquear conquista
          await prisma.userAchievement.create({
            data: {
              user_id,
              achievement_id: achievement.id,
              progress: {}
            }
          });

          // Adicionar pontos da conquista
          if (achievement.points > 0) {
            await prisma.userPoints.create({
              data: {
                user_id,
                action: 'achievement_unlocked',
                points: achievement.points,
                category: 'achievement',
                reference_id: achievement.id,
                metadata: {
                  achievement_name: achievement.name,
                  achievement_category: achievement.category
                }
              }
            });
          }
        }
      }
    }
  } catch (error) {
    console.error('Erro ao verificar conquistas:', error);
  }
}

export default router;
