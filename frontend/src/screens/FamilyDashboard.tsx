







import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';
import { Colors, Typography, Spacing, Borders, Shadows, Icons, Animations } from '../components/ui/DesignSystem';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';


function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}


function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}


function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}


function log(level: string, message: string, data?: any): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}


function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}] [${level.toUpperCase()}] ${message}`, data || '');
}`);
  }
}:`, error.message);
  // Implementar logging, notificação, etc.
}
import { getProfileMessage } from '../utils/messages-system';

const { width: screenWidth } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  tasksCompleted: number;
}

interface FamilyTask {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  assignedTo: string;
  status: 'available' | 'in_progress' | 'completed';
  category: string;
  dueDate: string;
}

interface FamilyAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

const FamilyDashboard: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'João',
      avatar: '👨',
      points: 1250,
      level: 8,
      tasksCompleted: 45,
    },
    {
      id: '2',
      name: 'Maria',
      avatar: '👩',
      points: 980,
      level: 6,
      tasksCompleted: 32,
    },
    {
      id: '3',
      name: 'Pedro',
      avatar: '👦',
      points: 750,
      level: 5,
      tasksCompleted: 28,
    },
    {
      id: '4',
      name: 'Ana',
      avatar: '👧',
      points: 620,
      level: 4,
      tasksCompleted: 22,
    },
  ]);

  const [familyTasks, setFamilyTasks] = useState<FamilyTask[]>([
    {
      id: '1',
      title: 'Organizar o Quarto',
      description: 'Arrumar a cama e organizar os brinquedos',
      points: 50,
      difficulty: 'easy',
      assignedTo: 'Pedro',
      status: 'available',
      category: 'Organização',
      dueDate: 'Hoje',
    },
    {
      id: '2',
      title: 'Ajudar na Cozinha',
      description: 'Lavar os pratos do almoço',
      points: 75,
      difficulty: 'medium',
      assignedTo: 'Ana',
      status: 'in_progress',
      category: 'Limpeza',
      dueDate: 'Hoje',
    },
    {
      id: '3',
      title: 'Regar as Plantas',
      description: 'Regar todas as plantas do jardim',
      points: 100,
      difficulty: 'easy',
      assignedTo: 'João',
      status: 'completed',
      category: 'Jardim',
      dueDate: 'Ontem',
    },
    {
      id: '4',
      title: 'Limpar a Sala',
      description: 'Aspirar o tapete e organizar os móveis',
      points: 150,
      difficulty: 'hard',
      assignedTo: 'Maria',
      status: 'available',
      category: 'Limpeza',
      dueDate: 'Amanhã',
    },
  ]);

  const [achievements, setAchievements] = useState<FamilyAchievement[]>([
    {
      id: '1',
      title: 'Primeiro Passo',
      description: 'Complete sua primeira tarefa',
      icon: '🌟',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
    },
    {
      id: '2',
      title: 'Equipe Unida',
      description: 'Complete 10 tarefas em família',
      icon: '👨‍👩‍👧‍👦',
      unlocked: false,
      progress: 7,
      maxProgress: 10,
    },
    {
      id: '3',
      title: 'Mestre da Organização',
      description: 'Complete 20 tarefas de organização',
      icon: '📦',
      unlocked: false,
      progress: 15,
      maxProgress: 20,
    },
    {
      id: '4',
      title: 'Jardineiro Experiente',
      description: 'Complete 15 tarefas do jardim',
      icon: '🌱',
      unlocked: false,
      progress: 8,
      maxProgress: 15,
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | 'in_progress' | 'completed'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  // Animações
  const fadeInOpacity = Animations.fadeIn(700);
  const slideInUp = Animations.slideIn('up', 600);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return Colors.success;
      case 'medium': return Colors.warning;
      case 'hard': return Colors.error;
      default: return Colors.gray[500];
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Desconhecido';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return Colors.success;
      case 'in_progress': return Colors.info;
      case 'available': return Colors.warning;
      default: return Colors.gray[500];
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída';
      case 'in_progress': return 'Em Andamento';
      case 'available': return 'Disponível';
      default: return 'Desconhecido';
    }
  };

  const filteredTasks = familyTasks.filter(task => {
    const statusMatch = selectedFilter === 'all' || task.status === selectedFilter;
    const difficultyMatch = selectedDifficulty === 'all' || task.difficulty === selectedDifficulty;
    return statusMatch && difficultyMatch;
  });

  const totalFamilyPoints = familyMembers.reduce((sum, member) => sum + member.points, 0);
  const totalTasksCompleted = familyMembers.reduce((sum, member) => sum + member.tasksCompleted, 0);

  const handleTaskAction = (taskId: string, action: 'start' | 'complete' | 'claim') => {
    setFamilyTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          switch (action) {
            case 'start':
              return { ...task, status: 'in_progress' as const };
            case 'complete':
              return { ...task, status: 'completed' as const };
            case 'claim':
              return { ...task, status: 'in_progress' as const };
            default:
              return task;
          }
        }
        return task;
      })
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Familiar  */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>
            {getProfileMessage('family', 'auth.login.success')?.title || 'Bem-vindo à família!'}
          </Text>
          <Text style={styles.subtitleText}>
            Ajude a manter a casa organizada e ganhe pontos!
          </Text>
        </View>
        <View style={styles.headerIcon}>
          {Icons.getIcon('family', 32, Colors.family.primary)}
        </View>
      </View>

      {/* Ranking da Família  */}
      <View style={styles.rankingContainer}>
        <Text style={styles.sectionTitle}>🏆 Ranking da Família</Text>
        <Card
          variant="elevated"
          size="lg"
          profile="family"
          style={styles.rankingCard}
        >
          <View style={styles.rankingContent}>
            {familyMembers
              .sort((a, b) => b.points - a.points)
              .map((member, index) => (
                <View key={member.id} style={styles.rankingItem}>
                  <View style={styles.rankingPosition}>
                    <Text style={styles.positionText}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`}
                    </Text>
                  </View>
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberAvatar}>{member.avatar}</Text>
                    <View style={styles.memberDetails}>
                      <Text style={styles.memberName}>{member.name}</Text>
                      <Text style={styles.memberLevel}>Nível {member.level}</Text>
                    </View>
                  </View>
                  <View style={styles.memberStats}>
                    <Text style={styles.memberPoints}>{member.points} pts</Text>
                    <Text style={styles.memberTasks}>{member.tasksCompleted} tarefas</Text>
                  </View>
                </View>
              ))}
          </View>
        </Card>
      </View>

      {/* Estatísticas da Família  */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>📊 Estatísticas da Família</Text>
        <View style={styles.statsGrid}>
          <Card
            variant="filled"
            size="md"
            profile="family"
            style={[styles.statCard, { backgroundColor: Colors.family.primary }]}
          >
            <View style={styles.statContent}>
              <Text style={styles.statIcon}>⭐</Text>
              <Text style={styles.statValue}>{totalFamilyPoints}</Text>
              <Text style={styles.statLabel}>Pontos Totais</Text>
            </View>
          </Card>
          <Card
            variant="filled"
            size="md"
            profile="family"
            style={[styles.statCard, { backgroundColor: Colors.family.secondary }]}
          >
            <View style={styles.statContent}>
              <Text style={styles.statIcon}>✅</Text>
              <Text style={styles.statValue}>{totalTasksCompleted}</Text>
              <Text style={styles.statLabel}>Tarefas Concluídas</Text>
            </View>
          </Card>
          <Card
            variant="filled"
            size="md"
            profile="family"
            style={[styles.statCard, { backgroundColor: Colors.family.accent }]}
          >
            <View style={styles.statContent}>
              <Text style={styles.statIcon}>🎯</Text>
              <Text style={styles.statValue}>{achievements.filter(a => a.unlocked).length}</Text>
              <Text style={styles.statLabel}>Conquistas</Text>
            </View>
          </Card>
        </View>
      </View>

      {/* Filtros de Tarefas  */}
      <View style={styles.filtersContainer}>
        <Text style={styles.sectionTitle}>🔍 Filtrar Tarefas</Text>
        
        {/* Filtro por Status  */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Status:</Text>
          <View style={styles.filterButtons}>
            {(['all', 'available', 'in_progress', 'completed'] as const).map((filter) => (
              <Button
                key={filter}
                title={filter === 'all' ? 'Todas' : filter === 'available' ? 'Disponíveis' : filter === 'in_progress' ? 'Em Andamento' : 'Concluídas'}
                variant={selectedFilter === filter ? 'primary' : 'outline'}
                profile="family"
                size="sm"
                onPress={() => setSelectedFilter(filter)}
                style={styles.filterButton}
              />
            ))}
          </View>
        </View>

        {/* Filtro por Dificuldade  */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Dificuldade:</Text>
          <View style={styles.filterButtons}>
            {(['all', 'easy', 'medium', 'hard'] as const).map((difficulty) => (
              <Button
                key={difficulty}
                title={difficulty === 'all' ? 'Todas' : difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Médio' : 'Difícil'}
                variant={selectedDifficulty === difficulty ? 'primary' : 'outline'}
                profile="family"
                size="sm"
                onPress={() => setSelectedDifficulty(difficulty)}
                style={styles.filterButton}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Lista de Tarefas Familiares  */}
      <View style={styles.tasksContainer}>
        <View style={styles.tasksHeader}>
          <Text style={styles.sectionTitle}>
            🎯 Tarefas Familiares ({filteredTasks.length})
          </Text>
          <Button
            title="Nova Tarefa"
            variant="primary"
            profile="family"
            icon="task"
            size="sm"
            onPress={() => {}}
          />
        </View>
        
        {filteredTasks.length === 0 ? (
          <Card
            variant="outlined"
            size="md"
            profile="family"
            style={styles.emptyCard}
          >
            <View style={styles.emptyContent}>
              <Text style={styles.emptyIcon}>🎉</Text>
              <Text style={styles.emptyTitle}>Parabéns, Família!</Text>
              <Text style={styles.emptyText}>
                Não há tarefas pendentes. Vocês estão em dia!
              </Text>
            </View>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              variant="outlined"
              size="lg"
              profile="family"
              style={[
                styles.taskCard,
                task.status === 'completed' && styles.completedTask
              ]}
            >
              <View style={styles.taskContent}>
                <View style={styles.taskHeader}>
                  <View style={styles.taskTitleContainer}>
                    <Text style={[
                      styles.taskTitle,
                      task.status === 'completed' && styles.completedTaskTitle
                    ]}>
                      {task.title}
                    </Text>
                    <View style={styles.taskBadges}>
                      <View style={[styles.pointsBadge, { backgroundColor: Colors.family.primary }]}>
                        <Text style={styles.badgeText}>
                          {task.points} pts
                        </Text>
                      </View>
                      <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(task.difficulty) }]}>
                        <Text style={styles.badgeText}>
                          {getDifficultyText(task.difficulty)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(task.status)}</Text>
                  </View>
                </View>
                
                <Text style={styles.taskDescription}>{task.description}</Text>
                
                <View style={styles.taskDetails}>
                  <View style={styles.taskDetail}>
                    <Text style={styles.detailIcon}>👤</Text>
                    <Text style={styles.detailText}>{task.assignedTo}</Text>
                  </View>
                  <View style={styles.taskDetail}>
                    <Text style={styles.detailIcon}>📅</Text>
                    <Text style={styles.detailText}>{task.dueDate}</Text>
                  </View>
                  <View style={styles.taskDetail}>
                    <Text style={styles.detailIcon}>🏷️</Text>
                    <Text style={styles.detailText}>{task.category}</Text>
                  </View>
                </View>
                
                <View style={styles.taskActions}>
                  {task.status === 'available' && (
                    <Button
                      title="Pegar Tarefa"
                      variant="primary"
                      profile="family"
                      icon="play"
                      size="sm"
                      onPress={() => handleTaskAction(task.id, 'claim')}
                    />
                  )}
                  {task.status === 'in_progress' && (
                    <View style={styles.actionButtons}>
                      <Button
                        title="Pausar"
                        variant="outline"
                        profile="family"
                        icon="pause"
                        size="sm"
                        onPress={() => handleTaskAction(task.id, 'start')}
                        style={styles.actionButton}
                      />
                      <Button
                        title="Concluir"
                        variant="primary"
                        profile="family"
                        icon="check"
                        size="sm"
                        onPress={() => handleTaskAction(task.id, 'complete')}
                        style={styles.actionButton}
                      />
                    </View>
                  )}
                  {task.status === 'completed' && (
                    <View style={styles.completedActions}>
                      <Text style={styles.completedText}>🎉 Tarefa concluída! +{task.points} pontos!</Text>
                    </View>
                  )}
                </View>
              </View>
            </Card>
          ))
        )}
      </View>

      {/* Conquistas  */}
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>🏆 Conquistas</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              variant={achievement.unlocked ? "filled" : "outlined"}
              size="md"
              profile="family"
              style={[
                styles.achievementCard,
                achievement.unlocked && { backgroundColor: Colors.family.accent }
              ]}
            >
              <View style={styles.achievementContent}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.lockedAchievement
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                {!achievement.unlocked && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${(achievement.progress / achievement.maxProgress) * 100}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {achievement.progress}/{achievement.maxProgress}
                    </Text>
                  </View>
                )}
                {achievement.unlocked && (
                  <Text style={styles.unlockedText}>✅ Desbloqueada!</Text>
                )}
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  contentContainer: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  welcomeText: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.family.primary,
    fontFamily: Typography.families.primary,
  },
  subtitleText: {
    fontSize: Typography.sizes.md,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
    marginTop: Spacing.xs,
  },
  headerIcon: {
    marginLeft: Spacing.md,
  },
  rankingContainer: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.gray[800],
    fontFamily: Typography.families.primary,
    marginBottom: Spacing.md,
  },
  rankingCard: {
    backgroundColor: Colors.family.background,
  },
  rankingContent: {
    gap: Spacing.sm,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  rankingPosition: {
    width: 40,
    alignItems: 'center',
  },
  positionText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.family.primary,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: Spacing.sm,
  },
  memberAvatar: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  memberDetails: {
    flex: 1,
  },
  memberName: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.gray[800],
    fontFamily: Typography.families.primary,
  },
  memberLevel: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
  },
  memberStats: {
    alignItems: 'flex-end',
  },
  memberPoints: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    color: Colors.family.primary,
    fontFamily: Typography.families.primary,
  },
  memberTasks: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
  },
  statsContainer: {
    marginBottom: Spacing.xl,
  },
  statsGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: Spacing.md,
  },
  statCard: {
    flex: isWeb ? 1 : undefined,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    fontFamily: Typography.families.primary,
  },
  statLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.white,
    fontFamily: Typography.families.secondary,
    textAlign: 'center',
  },
  filtersContainer: {
    marginBottom: Spacing.xl,
  },
  filterSection: {
    marginBottom: Spacing.md,
  },
  filterLabel: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
    color: Colors.gray[700],
    fontFamily: Typography.families.primary,
    marginBottom: Spacing.sm,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  filterButton: {
    flex: 1,
    minWidth: 80,
  },
  tasksContainer: {
    marginBottom: Spacing.xl,
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  taskCard: {
    marginBottom: Spacing.md,
  },
  completedTask: {
    opacity: 0.7,
  },
  taskContent: {
    width: '100%',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  taskTitleContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.gray[800],
    fontFamily: Typography.families.primary,
    marginBottom: Spacing.xs,
  },
  completedTaskTitle: {
    textDecorationLine: 'line-through',
    color: Colors.gray[500],
  },
  taskBadges: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  pointsBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Borders.radius.sm,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Borders.radius.sm,
  },
  badgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
    color: Colors.white,
    fontFamily: Typography.families.primary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Borders.radius.sm,
  },
  statusText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
    color: Colors.white,
    fontFamily: Typography.families.primary,
  },
  taskDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
    marginBottom: Spacing.sm,
  },
  taskDetails: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  taskDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailIcon: {
    fontSize: Typography.sizes.sm,
  },
  detailText: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
  },
  taskActions: {
    alignItems: 'flex-start',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  completedActions: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  completedText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.success,
    fontFamily: Typography.families.primary,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyContent: {
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  emptyTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.family.primary,
    fontFamily: Typography.families.primary,
    marginBottom: Spacing.xs,
  },
  emptyText: {
    fontSize: Typography.sizes.md,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
    textAlign: 'center',
  },
  achievementsContainer: {
    marginBottom: Spacing.xl,
  },
  achievementsGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  achievementCard: {
    flex: isWeb ? 1 : undefined,
    minWidth: isWeb ? 200 : undefined,
  },
  achievementContent: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
  },
  achievementTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    color: Colors.gray[800],
    fontFamily: Typography.families.primary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  lockedAchievement: {
    color: Colors.gray[500],
  },
  achievementDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.gray[200],
    borderRadius: Borders.radius.full,
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.family.primary,
    borderRadius: Borders.radius.full,
  },
  progressText: {
    fontSize: Typography.sizes.xs,
    color: Colors.gray[600],
    fontFamily: Typography.families.secondary,
  },
  unlockedText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
    color: Colors.success,
    fontFamily: Typography.families.primary,
  },
});

export default FamilyDashboard; 


Referências externas:
 * - Node.js: https://nodejs.org/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * - Express: https://expressjs.com/
 * - Prisma: https://www.prisma.io/docs
 * - React: https://react.dev/
 * - Jest: https://jestjs.io/docs
 * - React Native: https://reactnative.dev/
 * - Webpack: https://webpack.js.org/
  */