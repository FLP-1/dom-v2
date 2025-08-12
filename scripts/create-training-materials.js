/**
 * @fileoverview Create Training Materials - Criação de materiais de treinamento
 * @description Sistema completo de materiais de treinamento e onboarding para usuários
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-08-10
 * 
 * @usage
 * node scripts/create-training-materials.js --target=all --format=interactive
 * 
 * @features
 * - Onboarding personalizado por perfil
 * - Tutoriais interativos passo-a-passo
 * - Scripts para vídeos de treinamento
 * - FAQ completo e contextual
 * - Guias de melhores práticas
 * - Materiais de suporte técnico
 * 
 * @see
 * - docs/training/training-guide.md
 * - docs/directives/diretivas-pensamento-critico.md
 */

const fs = require('fs');
const path = require('path');

// Validação de entrada de dados
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Sistema de logging estruturado
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    script: 'create-training-materials'
  };
  
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // Salvar log
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'training-materials.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Tratamento de erros centralizado
function handleError(error, context) {
  logStructured('error', `${context}: ${error.message}`, { error: error.stack });
}

// Asserções de validação crítica
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Configuração de materiais de treinamento
const TRAINING_CONFIG = {
  profiles: {
    employer: {
      name: 'Empregador/Família',
      onboardingSteps: 8,
      estimatedTime: '25 minutos',
      priority: 'high',
      features: ['management', 'communication', 'gamification', 'analytics']
    },
    
    employee: {
      name: 'Empregado Doméstico',
      onboardingSteps: 5,
      estimatedTime: '15 minutos',
      priority: 'critical',
      features: ['tasks', 'communication', 'gamification']
    },
    
    family: {
      name: 'Membro da Família',
      onboardingSteps: 4,
      estimatedTime: '10 minutos',
      priority: 'medium',
      features: ['communication', 'gamification']
    },
    
    admin: {
      name: 'Administrador do Sistema',
      onboardingSteps: 12,
      estimatedTime: '45 minutos',
      priority: 'high',
      features: ['admin', 'analytics', 'support', 'configuration']
    }
  },
  
  formats: {
    interactive: {
      name: 'Tutorial Interativo',
      description: 'Guias passo-a-passo dentro da aplicação',
      engagement: 'high',
      retention: 85
    },
    
    video: {
      name: 'Vídeos de Treinamento',
      description: 'Vídeos explicativos para cada funcionalidade',
      engagement: 'medium',
      retention: 70
    },
    
    text: {
      name: 'Guias Textuais',
      description: 'Documentação detalhada em texto',
      engagement: 'low',
      retention: 45
    },
    
    infographic: {
      name: 'Infográficos',
      description: 'Resumos visuais das principais funcionalidades',
      engagement: 'medium',
      retention: 60
    }
  },
  
  content: {
    onboarding: {
      welcome: 'Mensagens de boas-vindas personalizadas',
      tour: 'Tour guiado pela interface',
      setup: 'Configuração inicial personalizada',
      firstSteps: 'Primeiros passos com a plataforma'
    },
    
    features: {
      communication: 'Como usar chat familiar e mensagens de áudio',
      gamification: 'Como funciona o sistema de pontos e recompensas',
      tasks: 'Como criar, atribuir e completar tarefas',
      analytics: 'Como interpretar métricas e relatórios'
    },
    
    support: {
      faq: 'Perguntas frequentes por categoria',
      troubleshooting: 'Solução de problemas comuns',
      contact: 'Como entrar em contato com suporte',
      feedback: 'Como enviar feedback e sugestões'
    }
  }
};

// Função principal
async function createTrainingMaterials() {
  try {
    logStructured('info', '📚 Iniciando criação dos materiais de treinamento');
    
    // Validar argumentos
    const args = process.argv.slice(2);
    const target = getArgValue(args, '--target') || 'all';
    const format = getArgValue(args, '--format') || 'all';
    const language = getArgValue(args, '--language') || 'pt-BR';
    
    assertCritical(validateInput(target), 'Target deve ser especificado');
    assertCritical(validateInput(format), 'Formato deve ser especificado');
    
    logStructured('info', 'Configuração validada', { target, format, language });
    
    const creationContext = {
      target,
      format,
      language,
      timestamp: new Date().toISOString(),
      creationId: `training-${Date.now()}`
    };
    
    // Executar criação de materiais
    await executeTrainingCreation(creationContext);
    
    logStructured('info', '✅ Materiais de treinamento criados com sucesso!');
    
  } catch (error) {
    handleError(error, 'createTrainingMaterials');
    process.exit(1);
  }
}

// Obter valor de argumento
function getArgValue(args, key) {
  const arg = args.find(arg => arg.startsWith(key + '='));
  return arg ? arg.split('=')[1] : null;
}

// Executar criação de materiais
async function executeTrainingCreation(creationContext) {
  try {
    // 1. Criar estrutura de diretórios
    await createTrainingDirectories(creationContext);
    
    // 2. Criar materiais de onboarding
    await createOnboardingMaterials(creationContext);
    
    // 3. Criar tutoriais interativos
    await createInteractiveTutorials(creationContext);
    
    // 4. Criar scripts de vídeos
    await createVideoScripts(creationContext);
    
    // 5. Criar FAQ completo
    await createComprehensiveFAQ(creationContext);
    
    // 6. Criar guias de melhores práticas
    await createBestPracticesGuides(creationContext);
    
    // 7. Criar materiais de suporte
    await createSupportMaterials(creationContext);
    
    // 8. Gerar índice e navegação
    await generateTrainingIndex(creationContext);
    
  } catch (error) {
    handleError(error, 'executeTrainingCreation');
    throw error;
  }
}

// Criar estrutura de diretórios
async function createTrainingDirectories(creationContext) {
  try {
    logStructured('info', '📁 Criando estrutura de diretórios de treinamento');
    
    const baseDir = path.join(__dirname, '..', 'training');
    const directories = [
      'onboarding',
      'tutorials',
      'videos',
      'guides',
      'faq',
      'support',
      'assets',
      'templates'
    ];
    
    for (const dir of directories) {
      const fullPath = path.join(baseDir, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      
      // Criar subdiretórios por perfil
      for (const profile of Object.keys(TRAINING_CONFIG.profiles)) {
        const profilePath = path.join(fullPath, profile);
        if (!fs.existsSync(profilePath)) {
          fs.mkdirSync(profilePath, { recursive: true });
        }
      }
    }
    
    logStructured('info', 'Estrutura de diretórios criada', { 
      baseDir,
      directories: directories.length
    });
    
  } catch (error) {
    handleError(error, 'createTrainingDirectories');
    throw error;
  }
}

// Criar materiais de onboarding
async function createOnboardingMaterials(creationContext) {
  try {
    logStructured('info', '🎯 Criando materiais de onboarding');
    
    for (const [profileKey, profile] of Object.entries(TRAINING_CONFIG.profiles)) {
      const onboardingFlow = generateOnboardingFlow(profileKey, profile);
      const onboardingPath = path.join(__dirname, '..', 'training', 'onboarding', profileKey, 'flow.json');
      
      fs.writeFileSync(onboardingPath, JSON.stringify(onboardingFlow, null, 2));
      
      // Criar componente React de onboarding
      const onboardingComponent = generateOnboardingComponent(profileKey, profile, onboardingFlow);
      const componentPath = path.join(__dirname, '..', 'frontend', 'src', 'components', 'onboarding', `${profileKey}Onboarding.tsx`);
      
      // Criar diretório se não existir
      if (!fs.existsSync(path.dirname(componentPath))) {
        fs.mkdirSync(path.dirname(componentPath), { recursive: true });
      }
      
      fs.writeFileSync(componentPath, onboardingComponent);
      
      logStructured('info', `Onboarding criado para perfil: ${profile.name}`, {
        flowPath: onboardingPath,
        componentPath,
        steps: profile.onboardingSteps
      });
    }
    
  } catch (error) {
    handleError(error, 'createOnboardingMaterials');
    throw error;
  }
}

// Gerar fluxo de onboarding
function generateOnboardingFlow(profileKey, profile) {
  const baseFlow = {
    profile: profileKey,
    name: profile.name,
    estimatedTime: profile.estimatedTime,
    priority: profile.priority,
    steps: []
  };
  
  switch (profileKey) {
    case 'employer':
      baseFlow.steps = [
        {
          id: 'welcome',
          title: 'Bem-vindo ao DOM v2!',
          description: 'Vamos configurar sua conta para gerenciar sua família e equipe doméstica',
          type: 'intro',
          duration: 60,
          actions: ['continue']
        },
        {
          id: 'profile-setup',
          title: 'Configure seu Perfil',
          description: 'Conte-nos sobre sua família e necessidades',
          type: 'form',
          duration: 300,
          fields: ['familySize', 'houseType', 'employeesCount', 'preferences']
        },
        {
          id: 'family-members',
          title: 'Adicione Membros da Família',
          description: 'Convide membros da família para participar',
          type: 'action',
          duration: 180,
          actions: ['addMember', 'sendInvite', 'skip']
        },
        {
          id: 'employees-setup',
          title: 'Configure sua Equipe',
          description: 'Adicione empregados domésticos à plataforma',
          type: 'action',
          duration: 240,
          actions: ['addEmployee', 'setSchedule', 'defineRoles']
        },
        {
          id: 'communication-tour',
          title: 'Sistema de Comunicação',
          description: 'Aprenda a usar chat e mensagens de áudio',
          type: 'tutorial',
          duration: 300,
          highlights: ['chat-button', 'audio-button', 'notification-center']
        },
        {
          id: 'gamification-intro',
          title: 'Gamificação Familiar',
          description: 'Como motivar sua família com pontos e recompensas',
          type: 'tutorial',
          duration: 240,
          highlights: ['points-system', 'badges', 'rewards-store']
        },
        {
          id: 'first-task',
          title: 'Crie sua Primeira Tarefa',
          description: 'Vamos criar uma tarefa para testar o sistema',
          type: 'guided-action',
          duration: 180,
          guidance: ['open-tasks', 'create-task', 'assign-member', 'set-points']
        },
        {
          id: 'completion',
          title: 'Pronto para Começar!',
          description: 'Sua conta está configurada. Explore e aproveite!',
          type: 'celebration',
          duration: 60,
          rewards: { points: 100, badge: 'onboarding-complete' }
        }
      ];
      break;
      
    case 'employee':
      baseFlow.steps = [
        {
          id: 'welcome',
          title: 'Bem-vindo, Profissional!',
          description: 'O DOM v2 vai facilitar seu trabalho e reconhecer seu esforço',
          type: 'intro',
          duration: 60
        },
        {
          id: 'profile-basics',
          title: 'Seu Perfil Profissional',
          description: 'Configure informações básicas do seu perfil',
          type: 'form',
          duration: 120,
          fields: ['name', 'experience', 'specialties', 'availability']
        },
        {
          id: 'communication-basics',
          title: 'Comunicação Simples',
          description: 'Como usar chat e áudio para se comunicar',
          type: 'tutorial',
          duration: 180,
          highlights: ['simple-chat', 'audio-messages', 'notifications']
        },
        {
          id: 'points-system',
          title: 'Sistema de Pontos',
          description: 'Ganhe pontos completando tarefas com qualidade',
          type: 'tutorial',
          duration: 120,
          highlights: ['task-completion', 'points-earned', 'level-progress']
        },
        {
          id: 'ready-to-work',
          title: 'Tudo Pronto!',
          description: 'Você está pronto para começar a trabalhar com o DOM v2',
          type: 'celebration',
          duration: 60,
          rewards: { points: 50, badge: 'professional-ready' }
        }
      ];
      break;
      
    case 'family':
      baseFlow.steps = [
        {
          id: 'welcome',
          title: 'Olá, Família!',
          description: 'Vamos nos organizar e nos divertir juntos',
          type: 'intro',
          duration: 45
        },
        {
          id: 'family-chat',
          title: 'Chat da Família',
          description: 'Como usar o chat para se coordenar',
          type: 'tutorial',
          duration: 120,
          highlights: ['family-chat', 'emojis', 'reactions']
        },
        {
          id: 'fun-points',
          title: 'Pontos e Diversão',
          description: 'Ganhe pontos ajudando em casa e troque por recompensas',
          type: 'tutorial',
          duration: 150,
          highlights: ['earn-points', 'level-up', 'rewards']
        },
        {
          id: 'lets-play',
          title: 'Vamos Jogar!',
          description: 'Você está pronto para se divertir organizando a casa',
          type: 'celebration',
          duration: 45,
          rewards: { points: 25, badge: 'family-member' }
        }
      ];
      break;
      
    case 'admin':
      baseFlow.steps = [
        {
          id: 'admin-welcome',
          title: 'Painel de Administração',
          description: 'Gerencie e monitore toda a plataforma DOM v2',
          type: 'intro',
          duration: 90
        },
        {
          id: 'analytics-overview',
          title: 'Dashboard de Analytics',
          description: 'Monitore KPIs e métricas em tempo real',
          type: 'tutorial',
          duration: 360
        },
        {
          id: 'user-management',
          title: 'Gestão de Usuários',
          description: 'Como gerenciar usuários e famílias',
          type: 'tutorial',
          duration: 240
        },
        {
          id: 'support-tools',
          title: 'Ferramentas de Suporte',
          description: 'Como dar suporte aos usuários',
          type: 'tutorial',
          duration: 300
        },
        {
          id: 'system-config',
          title: 'Configurações do Sistema',
          description: 'Como configurar parâmetros da plataforma',
          type: 'tutorial',
          duration: 360
        }
        // ... mais steps para admin
      ];
      break;
  }
  
  return baseFlow;
}

// Gerar componente de onboarding
function generateOnboardingComponent(profileKey, profile, flow) {
  return `/**
 * @fileoverview ${profile.name} Onboarding - Componente de onboarding
 * @description Onboarding personalizado para perfil ${profile.name}
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { onboardingService } from '../../services/onboardingService';
import { ProgressIndicator } from '../common/ProgressIndicator';
import { StepContent } from './StepContent';

interface OnboardingProps {
  userId: string;
  onComplete: () => void;
  onSkip?: () => void;
}

export const ${profile.name.replace(/\\s+/g, '')}Onboarding: React.FC<OnboardingProps> = ({
  userId,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const steps = ${JSON.stringify(flow.steps, null, 2)};
  const totalSteps = steps.length;
  const currentStepConfig = steps[currentStep];
  
  useEffect(() => {
    // Carregar progresso salvo
    loadOnboardingProgress();
  }, []);
  
  const loadOnboardingProgress = async () => {
    try {
      const progress = await onboardingService.getProgress(userId, '${profileKey}');
      if (progress?.currentStep) {
        setCurrentStep(progress.currentStep);
        setStepData(progress.stepData || {});
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    }
  };
  
  const saveProgress = async () => {
    try {
      await onboardingService.saveProgress(userId, '${profileKey}', {
        currentStep,
        stepData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  };
  
  const handleNext = async () => {
    setIsLoading(true);
    
    try {
      // Salvar progresso
      await saveProgress();
      
      // Próximo passo ou conclusão
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        await completeOnboarding();
      }
    } catch (error) {
      console.error('Erro ao avançar:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleStepDataChange = (data: any) => {
    setStepData(prev => ({
      ...prev,
      [currentStepConfig.id]: data
    }));
  };
  
  const completeOnboarding = async () => {
    try {
      await onboardingService.markComplete(userId, '${profileKey}');
      
      // Dar recompensas se houver
      if (currentStepConfig.rewards) {
        await onboardingService.giveRewards(userId, currentStepConfig.rewards);
      }
      
      onComplete();
    } catch (error) {
      console.error('Erro ao completar onboarding:', error);
    }
  };
  
  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };
  
  if (!currentStepConfig) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentStepConfig.title}</Text>
        <ProgressIndicator 
          current={currentStep + 1} 
          total={totalSteps}
          showNumbers={true}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          {currentStepConfig.description}
        </Text>
        
        <StepContent
          step={currentStepConfig}
          data={stepData[currentStepConfig.id]}
          onChange={handleStepDataChange}
        />
      </View>
      
      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          {currentStep > 0 && (
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={handlePrevious}
            >
              <Text style={styles.secondaryButtonText}>Anterior</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={handleNext}
            disabled={isLoading}
          >
            <Text style={styles.primaryButtonText}>
              {currentStep < totalSteps - 1 ? 'Próximo' : 'Finalizar'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {onSkip && currentStep === 0 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Pular por agora</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.meta}>
          <Text style={styles.metaText}>
            Tempo estimado: {Math.ceil(currentStepConfig.duration / 60)} min
          </Text>
          <Text style={styles.metaText}>
            Passo {currentStep + 1} de {totalSteps}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  
  content: {
    flex: 1,
    padding: 24,
  },
  
  description: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  
  primaryButton: {
    backgroundColor: '#007bff',
  },
  
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  skipButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  
  skipButtonText: {
    color: '#6c757d',
    fontSize: 14,
    textAlign: 'center',
  },
  
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  
  metaText: {
    fontSize: 12,
    color: '#6c757d',
  },
});

export default ${profile.name.replace(/\\s+/g, '')}Onboarding;
`;
}

// Criar tutoriais interativos
async function createInteractiveTutorials(creationContext) {
  try {
    logStructured('info', '🎮 Criando tutoriais interativos');
    
    const tutorialConfig = {
      communication: {
        title: 'Sistema de Comunicação Familiar',
        description: 'Aprenda a usar chat, áudio e notificações',
        duration: '8 minutos',
        steps: [
          {
            target: '#chat-button',
            title: 'Chat Familiar',
            content: 'Clique aqui para abrir o chat da família. É onde vocês podem conversar em tempo real!',
            position: 'bottom'
          },
          {
            target: '#message-input',
            title: 'Digite sua Mensagem',
            content: 'Digite aqui sua mensagem. Você pode usar emojis e mencionar outros membros!',
            position: 'top'
          },
          {
            target: '#audio-button',
            title: 'Mensagens de Áudio',
            content: 'Pressione e segure para gravar mensagens de áudio. Mais rápido que digitar!',
            position: 'top'
          },
          {
            target: '#notification-center',
            title: 'Central de Notificações',
            content: 'Aqui você vê todas as notificações importantes da família',
            position: 'bottom'
          }
        ]
      },
      
      gamification: {
        title: 'Sistema de Gamificação',
        description: 'Como ganhar pontos, badges e recompensas',
        duration: '6 minutos',
        steps: [
          {
            target: '#points-display',
            title: 'Seus Pontos',
            content: 'Aqui você vê quantos pontos tem. Complete tarefas para ganhar mais!',
            position: 'bottom'
          },
          {
            target: '#level-progress',
            title: 'Progressão de Nível',
            content: 'Sua barra de progresso para o próximo nível. Mais pontos = nível mais alto!',
            position: 'bottom'
          },
          {
            target: '#badges-section',
            title: 'Suas Conquistas',
            content: 'Badges que você ganhou por completar tarefas especiais',
            position: 'top'
          },
          {
            target: '#rewards-store',
            title: 'Loja de Recompensas',
            content: 'Use seus pontos para resgatar recompensas incríveis!',
            position: 'top'
          }
        ]
      },
      
      tasks: {
        title: 'Gestão de Tarefas',
        description: 'Como criar, atribuir e completar tarefas',
        duration: '5 minutos',
        steps: [
          {
            target: '#create-task-button',
            title: 'Criar Nova Tarefa',
            content: 'Clique aqui para criar uma nova tarefa para a família',
            position: 'bottom'
          },
          {
            target: '#task-form',
            title: 'Detalhes da Tarefa',
            content: 'Preencha nome, descrição, pontos e para quem é a tarefa',
            position: 'right'
          },
          {
            target: '#task-list',
            title: 'Lista de Tarefas',
            content: 'Aqui ficam todas as tarefas. Clique para ver detalhes ou marcar como concluída',
            position: 'top'
          }
        ]
      }
    };
    
    // Salvar configuração de tutoriais
    const tutorialPath = path.join(__dirname, '..', 'training', 'tutorials', 'interactive-config.json');
    fs.writeFileSync(tutorialPath, JSON.stringify(tutorialConfig, null, 2));
    
    // Gerar componente de tutorial interativo
    const tutorialComponent = generateInteractiveTutorialComponent(tutorialConfig);
    const componentPath = path.join(__dirname, '..', 'frontend', 'src', 'components', 'tutorials', 'InteractiveTutorial.tsx');
    
    if (!fs.existsSync(path.dirname(componentPath))) {
      fs.mkdirSync(path.dirname(componentPath), { recursive: true });
    }
    
    fs.writeFileSync(componentPath, tutorialComponent);
    
    logStructured('info', 'Tutoriais interativos criados', {
      configPath: tutorialPath,
      componentPath,
      tutorials: Object.keys(tutorialConfig).length
    });
    
  } catch (error) {
    handleError(error, 'createInteractiveTutorials');
    throw error;
  }
}

// Gerar componente de tutorial interativo
function generateInteractiveTutorialComponent(config) {
  return `/**
 * @fileoverview Interactive Tutorial - Tutoriais interativos
 * @description Sistema de tutoriais passo-a-passo interativos
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

interface TutorialStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialConfig {
  title: string;
  description: string;
  duration: string;
  steps: TutorialStep[];
}

interface InteractiveTutorialProps {
  tutorialType: keyof typeof tutorialConfigs;
  isVisible: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const tutorialConfigs = ${JSON.stringify(config, null, 2)};

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  tutorialType,
  isVisible,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightElement, setHighlightElement] = useState<string | null>(null);
  
  const tutorial = tutorialConfigs[tutorialType];
  const totalSteps = tutorial?.steps.length || 0;
  const currentStepConfig = tutorial?.steps[currentStep];
  
  useEffect(() => {
    if (isVisible && currentStepConfig) {
      setHighlightElement(currentStepConfig.target);
    } else {
      setHighlightElement(null);
    }
  }, [isVisible, currentStep, currentStepConfig]);
  
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleComplete = () => {
    setCurrentStep(0);
    setHighlightElement(null);
    onComplete();
  };
  
  const handleSkip = () => {
    setCurrentStep(0);
    setHighlightElement(null);
    onSkip();
  };
  
  if (!isVisible || !tutorial) {
    return null;
  }
  
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        {/* Elemento destacado */}
        {highlightElement && (
          <HighlightElement target={highlightElement} />
        )}
        
        {/* Tooltip do passo atual */}
        <View style={[
          styles.tooltip,
          getTooltipPosition(currentStepConfig?.position || 'bottom')
        ]}>
          <View style={styles.tooltipHeader}>
            <Text style={styles.stepTitle}>{currentStepConfig?.title}</Text>
            <Text style={styles.stepCounter}>
              {currentStep + 1} de {totalSteps}
            </Text>
          </View>
          
          <Text style={styles.stepContent}>
            {currentStepConfig?.content}
          </Text>
          
          <View style={styles.tooltipActions}>
            <View style={styles.navigationButtons}>
              {currentStep > 0 && (
                <TouchableOpacity 
                  style={[styles.button, styles.secondaryButton]}
                  onPress={handlePrevious}
                >
                  <Text style={styles.secondaryButtonText}>Anterior</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={[styles.button, styles.primaryButton]}
                onPress={handleNext}
              >
                <Text style={styles.primaryButtonText}>
                  {currentStep < totalSteps - 1 ? 'Próximo' : 'Finalizar'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={handleSkip}
            >
              <Text style={styles.skipButtonText}>Pular tutorial</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Indicador de progresso */}
        <View style={styles.progressIndicator}>
          <View style={[
            styles.progressBar,
            { width: \`\${((currentStep + 1) / totalSteps) * 100}%\` }
          ]} />
        </View>
      </View>
    </Modal>
  );
};

const HighlightElement: React.FC<{ target: string }> = ({ target }) => {
  // Implementar lógica de highlight do elemento
  // Por enquanto, apenas um placeholder
  return (
    <View style={styles.highlight}>
      <Text style={styles.highlightText}>Elemento: {target}</Text>
    </View>
  );
};

const getTooltipPosition = (position: string) => {
  switch (position) {
    case 'top':
      return { top: 100, left: 20, right: 20 };
    case 'bottom':
      return { bottom: 100, left: 20, right: 20 };
    case 'left':
      return { top: '50%', left: 20, marginTop: -50 };
    case 'right':
      return { top: '50%', right: 20, marginTop: -50 };
    default:
      return { bottom: 100, left: 20, right: 20 };
  }
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  
  highlight: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 0, 0.3)',
    borderRadius: 8,
    padding: 8,
    top: 200,
    left: 20,
    right: 20,
  },
  
  highlightText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  tooltip: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    maxWidth: 320,
  },
  
  tooltipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  
  stepCounter: {
    fontSize: 12,
    color: '#6c757d',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  stepContent: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 20,
  },
  
  tooltipActions: {
    gap: 12,
  },
  
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  
  primaryButton: {
    backgroundColor: '#007bff',
  },
  
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  
  secondaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  skipButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  
  skipButtonText: {
    color: '#6c757d',
    fontSize: 12,
    textAlign: 'center',
  },
  
  progressIndicator: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  
  progressBar: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 2,
  },
});

export default InteractiveTutorial;
`;
}

// Criar scripts de vídeos
async function createVideoScripts(creationContext) {
  try {
    logStructured('info', '🎬 Criando scripts de vídeos de treinamento');
    
    const videoScripts = {
      'introducao-dom-v2': {
        title: 'Introdução ao DOM v2',
        duration: '3:30',
        target: 'all',
        script: `
FADE IN:

CENA 1 - INTRO ANIMADA (0:00 - 0:15)
[Logo DOM v2 aparece com animação suave]
[Música de fundo energética e amigável]

NARRADOR (V.O.):
"Bem-vindos ao DOM v2 - a revolução na gestão doméstica!"

[Montagem rápida mostrando famílias organizadas e felizes]

CENA 2 - PROBLEMA ATUAL (0:15 - 0:45)
[Imagens de famílias desorganizadas, conflitos domésticos]

NARRADOR (V.O.):
"Cansado de desorganização em casa? Conflitos sobre tarefas? 
Falta de comunicação entre família e empregados?
O DOM v2 veio para resolver isso!"

CENA 3 - APRESENTAÇÃO DAS FUNCIONALIDADES (0:45 - 2:30)

[CHAT FAMILIAR - 0:45-1:00]
[Tela do celular mostrando chat animado]
NARRADOR (V.O.):
"Chat familiar em tempo real - coordenem-se instantaneamente!"

[GAMIFICAÇÃO - 1:00-1:15]
[Animação de pontos sendo ganhos, badges aparecendo]
NARRADOR (V.O.):
"Sistema de pontos e recompensas - torne as tarefas divertidas!"

[ORGANIZAÇÃO - 1:15-1:30]
[Interface limpa mostrando tarefas sendo atribuídas]
NARRADOR (V.O.):
"Gestão inteligente de tarefas - cada um sabe o que fazer!"

[COMUNICAÇÃO - 1:30-1:45]
[Mensagens de áudio sendo enviadas e recebidas]
NARRADOR (V.O.):
"Mensagens de áudio para comunicação clara e rápida!"

[ANALYTICS - 1:45-2:00]
[Dashboard com gráficos e métricas]
NARRADOR (V.O.):
"Acompanhe o progresso da família com analytics detalhados!"

[RESULTADOS - 2:00-2:30]
[Família sorrindo, casa organizada, harmonia]
NARRADOR (V.O.):
"Resultado: uma família mais organizada, comunicativa e feliz!"

CENA 4 - CALL TO ACTION (2:30 - 3:30)
[Tela de cadastro do app]

NARRADOR (V.O.):
"Faça parte da revolução! Cadastre-se gratuitamente 
e transforme sua casa em 7 dias.
DOM v2 - Sua família, organizada e unida!"

[Logo final com site e contatos]

FADE OUT.

FIM
        `
      },
      
      'chat-familiar-tutorial': {
        title: 'Como Usar o Chat Familiar',
        duration: '2:45',
        target: 'families',
        script: `
FADE IN:

CENA 1 - ABERTURA (0:00 - 0:20)
[Família reunida no sofá com smartphones]

NARRADOR (V.O.):
"Aprenda a usar o Chat Familiar do DOM v2 
e mantenha sua família sempre conectada!"

CENA 2 - ACESSANDO O CHAT (0:20 - 0:40)
[Close na tela do celular, dedos navegando]

NARRADOR (V.O.):
"Primeiro, abra o app DOM v2 e toque em 'Comunicação'.
Depois, selecione 'Chat Familiar'."

[Animação mostrando os toques na tela]

CENA 3 - ENVIANDO MENSAGENS (0:40 - 1:10)
[Demonstração de diferentes tipos de mensagem]

NARRADOR (V.O.):
"Digite sua mensagem aqui. Use emojis para tornar 
a conversa mais divertida! 😊"

[Mostra emojis sendo selecionados]

"Mencione outros membros com @ seguido do nome.
A pessoa receberá uma notificação especial!"

CENA 4 - MENSAGENS DE ÁUDIO (1:10 - 1:40)
[Demonstração do botão de áudio]

NARRADOR (V.O.):
"Para mensagens de áudio, pressione e segure este botão.
Fale claramente e solte quando terminar.
Perfeito para instruções detalhadas!"

[Visualização da onda sonora durante gravação]

CENA 5 - REAÇÕES E RESPOSTAS (1:40 - 2:10)
[Demonstração de reações em mensagens]

NARRADOR (V.O.):
"Reaja às mensagens com emojis rápidos.
Assim todos sabem que você viu e aprovou!"

[Emojis de reação aparecendo nas mensagens]

CENA 6 - DICAS IMPORTANTES (2:10 - 2:45)
[Lista de dicas na tela]

NARRADOR (V.O.):
"Dicas importantes:
• Seja respeitoso sempre
• Use o chat para coordenação
• Emergências merecem ligação
• Mantenha conversas positivas

Agora sua família está mais conectada que nunca!"

[Família sorrindo e usando o chat]

FADE OUT.
        `
      },
      
      'gamificacao-explicacao': {
        title: 'Sistema de Gamificação - Como Funciona',
        duration: '4:00',
        target: 'families',
        script: `
FADE IN:

CENA 1 - INTRODUÇÃO (0:00 - 0:30)
[Animação com elementos de jogos: pontos, badges, rankings]

NARRADOR (V.O.):
"Descubra como o sistema de gamificação do DOM v2 
transforma as tarefas de casa em diversão para toda família!"

CENA 2 - SISTEMA DE PONTOS (0:30 - 1:15)
[Animação mostrando pontos sendo ganhos]

NARRADOR (V.O.):
"Cada tarefa concluída gera pontos! 
Limpeza da cozinha: 50 pontos
Organizar quarto: 30 pontos
Ajudar irmão: 40 pontos"

[Contador de pontos subindo na tela]

"Quanto melhor a qualidade, mais pontos você ganha!
Seja consistente e ganhe bônus de streak!"

CENA 3 - BADGES E CONQUISTAS (1:15 - 2:00)
[Galeria de badges sendo mostrada]

NARRADOR (V.O.):
"Ganhe badges especiais por conquistas únicas:
🧹 Mestre da Limpeza - 100 tarefas de limpeza
🔥 Streak de Fogo - 30 dias consecutivos
👨‍👩‍👧‍👦 Espírito de Equipe - 50 ajudas à família"

[Badges aparecendo com efeitos visuais]

CENA 4 - RANKING FAMILIAR (2:00 - 2:30)
[Dashboard do ranking animado]

NARRADOR (V.O.):
"Compete de forma saudável no ranking semanal!
Veja quem está se dedicando mais e motive uns aos outros.
Lembrem-se: o objetivo é colaborar, não competir!"

CENA 5 - LOJA DE RECOMPENSAS (2:30 - 3:30)
[Interface da loja com recompensas]

NARRADOR (V.O.):
"Use seus pontos na loja de recompensas!
• Escolher filme da noite - 100 pontos
• Sorvete especial - 150 pontos  
• Amigo para dormir - 400 pontos
• Item desejado - 500 pontos"

[Recompensas sendo selecionadas e resgatadas]

CENA 6 - FAMÍLIA MOTIVADA (3:30 - 4:00)
[Família celebrando conquistas juntos]

NARRADOR (V.O.):
"O resultado? Uma família mais unida, motivada 
e com a casa sempre organizada!
Diversão e organização podem andar juntas!"

FADE OUT.
        `
      }
    };
    
    // Salvar scripts de vídeos
    for (const [videoId, video] of Object.entries(videoScripts)) {
      const scriptPath = path.join(__dirname, '..', 'training', 'videos', `${videoId}.md`);
      
      const scriptContent = `# ${video.title}

**Duração:** ${video.duration}  
**Público-alvo:** ${video.target}  
**Data de criação:** ${new Date().toISOString()}

## Script Completo

${video.script}

## Notas de Produção

### Recursos Necessários
- [ ] Narrador profissional (voz feminina ou masculina neutra)
- [ ] Animações 2D/3D para interfaces
- [ ] Música de fundo licenciada
- [ ] Capturas de tela do app em alta resolução
- [ ] Atores para cenas familiares (se necessário)

### Especificações Técnicas
- **Resolução:** 1920x1080 (Full HD)
- **Frame Rate:** 30 fps
- **Formato de entrega:** MP4 (H.264)
- **Áudio:** AAC 44.1kHz stereo
- **Legendas:** PT-BR (obrigatório)

### Aprovação
- [ ] Roteiro aprovado pelo time de produto
- [ ] Storyboard aprovado
- [ ] Versão final aprovada
- [ ] Testes de usabilidade realizados

## Versões

### v1.0
- Script inicial criado
- Estrutura básica definida

### Próximas versões
- Refinamento baseado em feedback
- Adaptação para diferentes perfis
- Versões curtas para redes sociais
`;
      
      fs.writeFileSync(scriptPath, scriptContent);
    }
    
    logStructured('info', 'Scripts de vídeos criados', {
      totalScripts: Object.keys(videoScripts).length,
      videosDir: path.join(__dirname, '..', 'training', 'videos')
    });
    
  } catch (error) {
    handleError(error, 'createVideoScripts');
    throw error;
  }
}

// Criar FAQ completo
async function createComprehensiveFAQ(creationContext) {
  try {
    logStructured('info', '❓ Criando FAQ completo');
    
    const faqData = {
      categories: {
        'getting-started': {
          name: 'Primeiros Passos',
          icon: '🚀',
          questions: [
            {
              id: 'what-is-dom-v2',
              question: 'O que é o DOM v2?',
              answer: 'O DOM v2 é uma plataforma revolucionária para gestão doméstica que conecta famílias e empregados domésticos através de comunicação em tempo real, gamificação e organização inteligente de tarefas.',
              tags: ['básico', 'introdução']
            },
            {
              id: 'how-to-register',
              question: 'Como me cadastro no DOM v2?',
              answer: 'Para se cadastrar: 1) Baixe o app ou acesse nosso site, 2) Clique em "Cadastrar", 3) Escolha seu perfil (Empregador, Empregado ou Família), 4) Preencha suas informações básicas, 5) Confirme seu email. Pronto!',
              tags: ['cadastro', 'registro', 'conta']
            },
            {
              id: 'first-steps',
              question: 'Quais são os primeiros passos após o cadastro?',
              answer: 'Após o cadastro, siga nosso onboarding: 1) Complete seu perfil, 2) Adicione membros da família ou empregados, 3) Faça o tour pelas funcionalidades, 4) Crie sua primeira tarefa, 5) Teste o chat familiar. O sistema te guiará em cada passo!',
              tags: ['onboarding', 'primeiros-passos']
            }
          ]
        },
        
        'communication': {
          name: 'Comunicação',
          icon: '💬',
          questions: [
            {
              id: 'how-chat-works',
              question: 'Como funciona o chat familiar?',
              answer: 'O chat familiar permite comunicação em tempo real entre todos os membros. Você pode enviar mensagens de texto, áudios, emojis e até mencionar pessoas específicas. Todas as mensagens ficam salvas para consulta posterior.',
              tags: ['chat', 'comunicação', 'mensagens']
            },
            {
              id: 'audio-messages',
              question: 'Como enviar mensagens de áudio?',
              answer: 'Para enviar áudio: 1) Abra o chat, 2) Pressione e segure o botão do microfone, 3) Fale sua mensagem (máximo 60 segundos), 4) Solte o botão para enviar automaticamente. É perfeito para instruções detalhadas!',
              tags: ['áudio', 'mensagens', 'microfone']
            },
            {
              id: 'notifications',
              question: 'Como funcionam as notificações?',
              answer: 'As notificações são inteligentes e categorizadas por prioridade: Urgentes (vermelho), Importantes (amarelo), Informativas (azul). Você pode personalizar quais tipos receber e definir horários silenciosos.',
              tags: ['notificações', 'alertas', 'configurações']
            }
          ]
        },
        
        'gamification': {
          name: 'Gamificação',
          icon: '🎮',
          questions: [
            {
              id: 'points-system',
              question: 'Como funciona o sistema de pontos?',
              answer: 'Você ganha pontos completando tarefas. Cada tarefa tem uma pontuação base, mas você pode ganhar bônus por qualidade (+25%), consistência (+10% por dia consecutivo) e trabalho em equipe (+15%). Pontos podem ser trocados por recompensas!',
              tags: ['pontos', 'gamificação', 'recompensas']
            },
            {
              id: 'badges',
              question: 'O que são badges e como ganhá-las?',
              answer: 'Badges são conquistas especiais por atividades únicas: Mestre da Limpeza (100 tarefas), Streak de Fogo (30 dias consecutivos), Espírito de Equipe (50 ajudas). Cada badge tem raridade: comum, rara, épica ou lendária!',
              tags: ['badges', 'conquistas', 'gamificação']
            },
            {
              id: 'rewards-store',
              question: 'Como funciona a loja de recompensas?',
              answer: 'Use seus pontos para resgatar: Privilégios (escolher filme, passe livre), Tratamentos (sobremesa, pizza), Atividades (noite de jogos, amigo para dormir), Compras (itens até R$ 50). Cada família pode personalizar as recompensas!',
              tags: ['recompensas', 'loja', 'pontos']
            }
          ]
        },
        
        'technical': {
          name: 'Suporte Técnico',
          icon: '🔧',
          questions: [
            {
              id: 'app-not-working',
              question: 'O app não está funcionando, o que fazer?',
              answer: 'Tente estas soluções: 1) Feche e abra o app novamente, 2) Verifique sua conexão com internet, 3) Atualize o app na loja, 4) Reinicie seu celular, 5) Se persistir, entre em contato conosco com detalhes do problema.',
              tags: ['problemas', 'app', 'suporte']
            },
            {
              id: 'sync-issues',
              question: 'Minhas informações não estão sincronizando',
              answer: 'Para resolver problemas de sincronização: 1) Verifique se está conectado à internet, 2) Force a atualização puxando a tela para baixo, 3) Saia e entre novamente na conta, 4) Se não resolver, contate nosso suporte.',
              tags: ['sincronização', 'dados', 'conectividade']
            },
            {
              id: 'account-recovery',
              question: 'Esqueci minha senha, como recuperar?',
              answer: 'Na tela de login, clique em "Esqueci minha senha", digite seu email e clique em "Enviar". Você receberá um link para criar uma nova senha. Verifique também a pasta de spam. O link expira em 24h.',
              tags: ['senha', 'recuperação', 'conta']
            }
          ]
        }
      },
      
      metadata: {
        lastUpdated: new Date().toISOString(),
        totalQuestions: 0, // será calculado
        averageRating: 4.7,
        language: 'pt-BR',
        version: '2.0.0'
      }
    };
    
    // Calcular total de questões
    faqData.metadata.totalQuestions = Object.values(faqData.categories)
      .reduce((total, category) => total + category.questions.length, 0);
    
    // Salvar FAQ
    const faqPath = path.join(__dirname, '..', 'training', 'faq', 'comprehensive-faq.json');
    fs.writeFileSync(faqPath, JSON.stringify(faqData, null, 2));
    
    // Gerar componente React do FAQ
    const faqComponent = generateFAQComponent(faqData);
    const componentPath = path.join(__dirname, '..', 'frontend', 'src', 'components', 'faq', 'ComprehensiveFAQ.tsx');
    
    if (!fs.existsSync(path.dirname(componentPath))) {
      fs.mkdirSync(path.dirname(componentPath), { recursive: true });
    }
    
    fs.writeFileSync(componentPath, faqComponent);
    
    logStructured('info', 'FAQ completo criado', {
      dataPath: faqPath,
      componentPath,
      categories: Object.keys(faqData.categories).length,
      totalQuestions: faqData.metadata.totalQuestions
    });
    
  } catch (error) {
    handleError(error, 'createComprehensiveFAQ');
    throw error;
  }
}

// Gerar componente FAQ
function generateFAQComponent(faqData) {
  return `/**
 * @fileoverview Comprehensive FAQ - FAQ completo
 * @description Sistema completo de perguntas frequentes
 * @version 2.0.0
 * @generated ${new Date().toISOString()}
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}

interface FAQCategory {
  name: string;
  icon: string;
  questions: FAQQuestion[];
}

const faqData = ${JSON.stringify(faqData, null, 2)};

export const ComprehensiveFAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());
  const [filteredData, setFilteredData] = useState(faqData.categories);
  
  useEffect(() => {
    filterFAQ();
  }, [searchTerm, selectedCategory]);
  
  const filterFAQ = () => {
    let filtered = { ...faqData.categories };
    
    // Filtrar por categoria
    if (selectedCategory) {
      filtered = { [selectedCategory]: filtered[selectedCategory] };
    }
    
    // Filtrar por busca
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      
      Object.keys(filtered).forEach(categoryKey => {
        filtered[categoryKey] = {
          ...filtered[categoryKey],
          questions: filtered[categoryKey].questions.filter(q =>
            q.question.toLowerCase().includes(searchLower) ||
            q.answer.toLowerCase().includes(searchLower) ||
            q.tags.some(tag => tag.toLowerCase().includes(searchLower))
          )
        };
        
        // Remover categorias vazias
        if (filtered[categoryKey].questions.length === 0) {
          delete filtered[categoryKey];
        }
      });
    }
    
    setFilteredData(filtered);
  };
  
  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setExpandedQuestions(new Set());
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>❓ Perguntas Frequentes</Text>
        <Text style={styles.subtitle}>
          {faqData.metadata.totalQuestions} perguntas • Avaliação {faqData.metadata.averageRating}⭐
        </Text>
      </View>
      
      {/* Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar perguntas..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {(searchTerm || selectedCategory) && (
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Categorias */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              !selectedCategory && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[
              styles.categoryButtonText,
              !selectedCategory && styles.categoryButtonTextActive
            ]}>
              📋 Todas
            </Text>
          </TouchableOpacity>
          
          {Object.entries(faqData.categories).map(([key, category]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.categoryButton,
                selectedCategory === key && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(key)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === key && styles.categoryButtonTextActive
              ]}>
                {category.icon} {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* FAQ */}
      <View style={styles.faqContainer}>
        {Object.keys(filteredData).length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              😔 Nenhuma pergunta encontrada
            </Text>
            <Text style={styles.noResultsSubtext}>
              Tente buscar por outros termos ou entre em contato conosco
            </Text>
          </View>
        ) : (
          Object.entries(filteredData).map(([categoryKey, category]) => (
            <View key={categoryKey} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>
                {category.icon} {category.name}
              </Text>
              
              {category.questions.map((question) => (
                <View key={question.id} style={styles.questionContainer}>
                  <TouchableOpacity
                    style={styles.questionHeader}
                    onPress={() => toggleQuestion(question.id)}
                  >
                    <Text style={styles.questionText}>
                      {question.question}
                    </Text>
                    <Text style={styles.expandIcon}>
                      {expandedQuestions.has(question.id) ? '−' : '+'}
                    </Text>
                  </TouchableOpacity>
                  
                  {expandedQuestions.has(question.id) && (
                    <View style={styles.answerContainer}>
                      <Text style={styles.answerText}>
                        {question.answer}
                      </Text>
                      
                      <View style={styles.tagsContainer}>
                        {question.tags.map((tag, index) => (
                          <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))
        )}
      </View>
      
      {/* Contato */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>
          💬 Não encontrou sua resposta?
        </Text>
        <Text style={styles.contactText}>
          Nossa equipe de suporte está pronta para ajudar!
        </Text>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>
            📞 Entrar em Contato
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    fontSize: 16,
  },
  
  clearButton: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#6c757d',
    borderRadius: 8,
  },
  
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  
  categoryButton: {
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  
  categoryButtonActive: {
    backgroundColor: '#007bff',
  },
  
  categoryButtonText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '600',
  },
  
  categoryButtonTextActive: {
    color: '#fff',
  },
  
  faqContainer: {
    padding: 16,
  },
  
  categorySection: {
    marginBottom: 24,
  },
  
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 12,
  },
  
  expandIcon: {
    fontSize: 20,
    color: '#007bff',
    fontWeight: 'bold',
  },
  
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  
  answerText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 12,
  },
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  
  tag: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  tagText: {
    fontSize: 12,
    color: '#6c757d',
  },
  
  noResults: {
    alignItems: 'center',
    padding: 32,
  },
  
  noResultsText: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 8,
  },
  
  noResultsSubtext: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
  
  contactSection: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  
  contactText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 16,
  },
  
  contactButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ComprehensiveFAQ;
`;
}

// Criar guias de melhores práticas
async function createBestPracticesGuides(creationContext) {
  try {
    logStructured('info', '📖 Criando guias de melhores práticas');
    
    const bestPracticesGuides = {
      'employer-best-practices': {
        title: 'Melhores Práticas para Empregadores',
        target: 'employer',
        content: `# 🏠 Guia de Melhores Práticas para Empregadores

## Comunicação Efetiva

### ✅ O que fazer
- **Seja claro e específico** nas instruções
- **Use mensagens de áudio** para tarefas complexas
- **Reconheça o bom trabalho** publicamente no chat
- **Estabeleça expectativas claras** desde o início

### ❌ O que evitar
- Instruções vagas ou contraditórias
- Críticas públicas (use mensagens privadas)
- Mudanças constantes de prioridades
- Falta de feedback construtivo

## Gamificação Inteligente

### ✅ Configuração de Pontos
- **Tarefas simples:** 25-50 pontos
- **Tarefas médias:** 50-100 pontos
- **Tarefas complexas:** 100-200 pontos
- **Bônus de qualidade:** 25% extra

### ✅ Recompensas Motivadoras
- Misture privilégios, tratamentos e itens
- Personalize para cada membro da família
- Mantenha algumas recompensas surpresa
- Celebre conquistas especiais

## Gestão de Equipe

### ✅ Delegação Eficaz
- Atribua tarefas baseadas em habilidades
- Defina prazos realistas
- Forneça recursos necessários
- Monitore progresso sem microgerenciar

### ✅ Desenvolvimento da Equipe
- Ofereça treinamento quando necessário
- Reconheça crescimento profissional
- Incentive sugestões de melhoria
- Mantenha ambiente de trabalho positivo`
      },
      
      'employee-best-practices': {
        title: 'Melhores Práticas para Empregados',
        target: 'employee',
        content: `# 👩‍💼 Guia de Melhores Práticas para Empregados

## Comunicação Profissional

### ✅ Comunicação Clara
- **Confirme recebimento** de instruções importantes
- **Tire dúvidas antes** de começar tarefas complexas
- **Reporte problemas** assim que surgirem
- **Use áudio** para explicações detalhadas

### ✅ Proatividade
- Sugira melhorias nos processos
- Antecipe necessidades da família
- Mantenha-se atualizado sobre preferências
- Comunique mudanças de disponibilidade

## Maximização de Pontos

### ✅ Estratégias de Pontuação
- Foque na **qualidade** das tarefas
- Mantenha **consistência** diária
- Colabore com outros membros
- Complete tarefas no prazo

### ✅ Progressão de Carreira
- Colete badges profissionais
- Mantenha streak de qualidade
- Participe de treinamentos
- Solicite feedback regularmente

## Excelência no Serviço

### ✅ Padrões de Qualidade
- Siga checklists quando disponíveis
- Documente problemas encontrados
- Mantenha ambiente organizado
- Respeite preferências familiares

### ✅ Relacionamento Familiar
- Seja respeitoso com todos
- Mantenha discrição e privacidade
- Adapte-se à dinâmica familiar
- Construa confiança através de ações`
      },
      
      'family-engagement': {
        title: 'Engajamento Familiar',
        target: 'family',
        content: `# 👨‍👩‍👧‍👦 Guia de Engajamento Familiar

## Motivação de Crianças

### ✅ Estratégias por Idade
**6-9 anos:**
- Tarefas simples e visuais
- Recompensas imediatas
- Gamificação com elementos lúdicos
- Celebração de pequenas conquistas

**10-13 anos:**
- Tarefas com mais responsabilidade
- Sistema de níveis e badges
- Competições saudáveis
- Recompensas sociais

**14+ anos:**
- Autonomia na escolha de tarefas
- Recompensas mais maduras
- Foco em desenvolvimento pessoal
- Preparação para vida adulta

## Criação de Hábitos

### ✅ Implementação Gradual
1. **Semana 1:** Uma tarefa simples por dia
2. **Semana 2:** Adicionar segunda tarefa
3. **Semana 3:** Introduzir colaboração
4. **Semana 4:** Estabelecer rotina completa

### ✅ Manutenção de Engajamento
- Varie tipos de tarefas
- Introduza novos desafios
- Celebre marcos importantes
- Ajuste recompensas conforme crescimento

## Resolução de Conflitos

### ✅ Mediação Eficaz
- Ouça todos os lados
- Foque em soluções, não culpados
- Use o sistema de pontos como motivação
- Estabeleça regras claras de convivência

### ✅ Prevenção de Problemas
- Comunicação aberta e frequente
- Expectativas claras para todos
- Reconhecimento equitativo
- Flexibilidade quando necessário`
      }
    };
    
    // Salvar guias
    for (const [guideId, guide] of Object.entries(bestPracticesGuides)) {
      const guidePath = path.join(__dirname, '..', 'training', 'guides', `${guideId}.md`);
      fs.writeFileSync(guidePath, guide.content);
    }
    
    logStructured('info', 'Guias de melhores práticas criados', {
      totalGuides: Object.keys(bestPracticesGuides).length,
      guidesDir: path.join(__dirname, '..', 'training', 'guides')
    });
    
  } catch (error) {
    handleError(error, 'createBestPracticesGuides');
    throw error;
  }
}

// Criar materiais de suporte
async function createSupportMaterials(creationContext) {
  try {
    logStructured('info', '🆘 Criando materiais de suporte');
    
    const supportMaterials = {
      'troubleshooting-guide': {
        title: 'Guia de Solução de Problemas',
        content: `# 🔧 Guia de Solução de Problemas DOM v2

## Problemas Comuns

### 📱 App não abre ou trava
**Soluções:**
1. Force o fechamento do app
2. Reinicie o dispositivo
3. Atualize o app na loja
4. Limpe cache do app (Android)
5. Reinstale o app (último recurso)

### 🌐 Problemas de conexão
**Soluções:**
1. Verifique conexão Wi-Fi/dados
2. Teste em outra rede
3. Reinicie roteador
4. Contate provedor de internet
5. Use dados móveis temporariamente

### 🔄 Sincronização falha
**Soluções:**
1. Puxe tela para baixo (refresh)
2. Saia e entre na conta
3. Verifique espaço de armazenamento
4. Atualize app para última versão
5. Contate suporte com detalhes

### 🔔 Notificações não chegam
**Soluções:**
1. Verifique permissões de notificação
2. Confira configurações do app
3. Desabilite modo economia de bateria
4. Reinstale o app
5. Teste em outro dispositivo

## Códigos de Erro

### Erro 1001: Falha de autenticação
- Verifique email/senha
- Reset senha se necessário
- Contate suporte se persistir

### Erro 2001: Servidor indisponível
- Aguarde alguns minutos
- Verifique status em nossas redes sociais
- Tente novamente mais tarde

### Erro 3001: Dados corrompidos
- Faça logout e login
- Limpe cache do app
- Sincronize dados novamente

## Contatos de Emergência

### 📞 Suporte Técnico
- **Email:** suporte@dom-v2.com.br
- **WhatsApp:** (11) 99999-9999
- **Horário:** Segunda a Sexta, 8h às 18h

### 🚨 Emergências (Falhas Críticas)
- **Email:** emergencia@dom-v2.com.br
- **Telefone:** (11) 91234-5678
- **Disponível:** 24/7`
      },
      
      'feature-requests': {
        title: 'Como Solicitar Funcionalidades',
        content: `# 💡 Como Solicitar Novas Funcionalidades

## Canal Oficial de Sugestões

### 📧 Email de Sugestões
- **Endereço:** sugestoes@dom-v2.com.br
- **Assunto:** [SUGESTÃO] Título da funcionalidade
- **Tempo de resposta:** Até 7 dias úteis

### 📝 Template de Sugestão

**Título da Funcionalidade:**
[Nome claro e descritivo]

**Problema que Resolve:**
[Descreva o problema atual]

**Solução Proposta:**
[Como a funcionalidade resolveria]

**Benefícios Esperados:**
[Quais melhorias traria]

**Urgência:**
- [ ] Baixa (seria legal ter)
- [ ] Média (melhoraria experiência)
- [ ] Alta (necessária para uso)
- [ ] Crítica (impeditiva)

**Perfil de Usuário:**
- [ ] Empregador
- [ ] Empregado
- [ ] Família
- [ ] Todos

## Processo de Avaliação

### ⏱️ Timeline Típico
1. **Recebimento:** Confirmação em 24h
2. **Análise Técnica:** 3-5 dias úteis
3. **Priorização:** 7-10 dias úteis
4. **Resposta:** Feedback em até 2 semanas

### 📊 Critérios de Avaliação
- Impacto no usuário
- Viabilidade técnica
- Alinhamento com visão do produto
- Recursos necessários
- Demanda da comunidade

## Funcionalidades Mais Solicitadas

### 🔜 Em Desenvolvimento
- Video chamadas no chat
- Integração com calendários
- App nativo para smartwatch
- Modo offline básico

### 🎯 No Roadmap
- Integração com smart home
- IA para sugestões automáticas
- Marketplace de serviços
- Sistema de avaliações

### 💭 Em Análise
- Múltiplas famílias por conta
- Sistema de backup avançado
- Integração com ERPs
- Localização em tempo real`
      }
    };
    
    // Salvar materiais de suporte
    for (const [materialId, material] of Object.entries(supportMaterials)) {
      const materialPath = path.join(__dirname, '..', 'training', 'support', `${materialId}.md`);
      fs.writeFileSync(materialPath, material.content);
    }
    
    logStructured('info', 'Materiais de suporte criados', {
      totalMaterials: Object.keys(supportMaterials).length,
      supportDir: path.join(__dirname, '..', 'training', 'support')
    });
    
  } catch (error) {
    handleError(error, 'createSupportMaterials');
    throw error;
  }
}

// Gerar índice e navegação
async function generateTrainingIndex(creationContext) {
  try {
    logStructured('info', '📚 Gerando índice de treinamento');
    
    const trainingIndex = {
      title: 'DOM v2 - Central de Treinamento',
      description: 'Material completo de treinamento e suporte para todos os usuários',
      lastUpdated: new Date().toISOString(),
      version: '2.0.0',
      
      sections: {
        onboarding: {
          title: '🎯 Onboarding',
          description: 'Guias de primeiros passos personalizados por perfil',
          items: [
            { id: 'employer', title: 'Empregador/Família', duration: '25 min', steps: 8 },
            { id: 'employee', title: 'Empregado Doméstico', duration: '15 min', steps: 5 },
            { id: 'family', title: 'Membro da Família', duration: '10 min', steps: 4 },
            { id: 'admin', title: 'Administrador', duration: '45 min', steps: 12 }
          ]
        },
        
        tutorials: {
          title: '🎮 Tutoriais Interativos',
          description: 'Aprenda usando a própria interface do sistema',
          items: [
            { id: 'communication', title: 'Sistema de Comunicação', duration: '8 min' },
            { id: 'gamification', title: 'Sistema de Gamificação', duration: '6 min' },
            { id: 'tasks', title: 'Gestão de Tarefas', duration: '5 min' }
          ]
        },
        
        videos: {
          title: '🎬 Vídeos de Treinamento',
          description: 'Vídeos explicativos para cada funcionalidade',
          items: [
            { id: 'introducao-dom-v2', title: 'Introdução ao DOM v2', duration: '3:30' },
            { id: 'chat-familiar-tutorial', title: 'Como Usar o Chat Familiar', duration: '2:45' },
            { id: 'gamificacao-explicacao', title: 'Sistema de Gamificação', duration: '4:00' }
          ]
        },
        
        guides: {
          title: '📖 Guias de Melhores Práticas',
          description: 'Dicas e estratégias para uso otimizado',
          items: [
            { id: 'employer-best-practices', title: 'Melhores Práticas para Empregadores' },
            { id: 'employee-best-practices', title: 'Melhores Práticas para Empregados' },
            { id: 'family-engagement', title: 'Engajamento Familiar' }
          ]
        },
        
        faq: {
          title: '❓ FAQ',
          description: 'Perguntas frequentes organizadas por categoria',
          items: [
            { id: 'getting-started', title: 'Primeiros Passos', questions: 3 },
            { id: 'communication', title: 'Comunicação', questions: 3 },
            { id: 'gamification', title: 'Gamificação', questions: 3 },
            { id: 'technical', title: 'Suporte Técnico', questions: 3 }
          ]
        },
        
        support: {
          title: '🆘 Suporte',
          description: 'Solução de problemas e contatos de ajuda',
          items: [
            { id: 'troubleshooting-guide', title: 'Guia de Solução de Problemas' },
            { id: 'feature-requests', title: 'Como Solicitar Funcionalidades' }
          ]
        }
      },
      
      quickLinks: {
        'Começar Agora': '/onboarding',
        'Problemas Técnicos': '/support/troubleshooting-guide',
        'Perguntas Frequentes': '/faq',
        'Contatar Suporte': 'mailto:suporte@dom-v2.com.br'
      },
      
      statistics: {
        totalMaterials: 0,
        totalDuration: '0 horas',
        completionRate: 0,
        averageRating: 4.8
      }
    };
    
    // Calcular estatísticas
    let totalItems = 0;
    Object.values(trainingIndex.sections).forEach(section => {
      totalItems += section.items.length;
    });
    trainingIndex.statistics.totalMaterials = totalItems;
    
    // Salvar índice
    const indexPath = path.join(__dirname, '..', 'training', 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(trainingIndex, null, 2));
    
    // Gerar README principal
    const readmeContent = generateTrainingReadme(trainingIndex);
    const readmePath = path.join(__dirname, '..', 'training', 'README.md');
    fs.writeFileSync(readmePath, readmeContent);
    
    logStructured('info', 'Índice de treinamento gerado', {
      indexPath,
      readmePath,
      totalSections: Object.keys(trainingIndex.sections).length,
      totalMaterials: trainingIndex.statistics.totalMaterials
    });
    
  } catch (error) {
    handleError(error, 'generateTrainingIndex');
    throw error;
  }
}

// Gerar README de treinamento
function generateTrainingReadme(index) {
  return `# 📚 DOM v2 - Central de Treinamento

${index.description}

**Última atualização:** ${new Date(index.lastUpdated).toLocaleDateString('pt-BR')}  
**Versão:** ${index.version}

---

## 🎯 **Início Rápido**

### Para Novos Usuários
1. 🎯 **[Onboarding](/onboarding)** - Comece aqui! Guias personalizados por perfil
2. 🎮 **[Tutoriais Interativos](/tutorials)** - Aprenda usando o próprio sistema
3. ❓ **[FAQ](/faq)** - Respostas para dúvidas mais comuns

### Para Usuários Experientes
- 📖 **[Guias de Melhores Práticas](/guides)** - Otimize seu uso do sistema
- 🎬 **[Vídeos Avançados](/videos)** - Funcionalidades em detalhes
- 🆘 **[Suporte](/support)** - Solução de problemas

---

## 📋 **Conteúdo Completo**

${Object.entries(index.sections).map(([sectionId, section]) => `
### ${section.title}

${section.description}

${section.items.map(item => `- **[${item.title}](/${sectionId}/${item.id})** ${item.duration ? `(${item.duration})` : ''} ${item.steps ? `- ${item.steps} passos` : ''} ${item.questions ? `- ${item.questions} perguntas` : ''}`).join('\n')}
`).join('\n')}

---

## 🔗 **Links Rápidos**

${Object.entries(index.quickLinks).map(([title, link]) => `- **[${title}](${link})**`).join('\n')}

---

## 📊 **Estatísticas**

- 📚 **${index.statistics.totalMaterials} materiais** de treinamento
- ⭐ **${index.statistics.averageRating}/5** avaliação média
- 📈 **${index.statistics.completionRate}%** taxa de conclusão
- 🕒 **${index.statistics.totalDuration}** de conteúdo

---

## 💬 **Precisa de Ajuda?**

### Suporte Técnico
- 📧 **Email:** suporte@dom-v2.com.br
- 💬 **WhatsApp:** (11) 99999-9999
- 🕒 **Horário:** Segunda a Sexta, 8h às 18h

### Emergências
- 🚨 **Email:** emergencia@dom-v2.com.br
- 📞 **Telefone:** (11) 91234-5678
- 🕒 **Disponível:** 24/7

---

## 🔄 **Atualizações**

Este material de treinamento é atualizado continuamente. Para sugestões ou correções:

- 📧 **Sugestões:** sugestoes@dom-v2.com.br
- 🐛 **Reportar problemas:** bugs@dom-v2.com.br
- 💡 **Ideias de conteúdo:** conteudo@dom-v2.com.br

---

**🏠 DOM v2 - Transformando a gestão doméstica com tecnologia e carinho!** ❤️
`;
}

// Executar script se chamado diretamente
if (require.main === module) {
  createTrainingMaterials().catch(error => {
    handleError(error, 'main');
    process.exit(1);
  });
}

module.exports = {
  createTrainingMaterials,
  TRAINING_CONFIG
};
