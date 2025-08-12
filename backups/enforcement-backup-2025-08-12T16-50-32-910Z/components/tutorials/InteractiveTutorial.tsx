/**
 * @fileoverview Interactive Tutorial - Tutoriais interativos
 * @description Sistema de tutoriais passo-a-passo interativos
 * @version 2.0.0
 * @generated 2025-08-10T02:36:53.703Z
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

const tutorialConfigs = {
  "communication": {
    "title": "Sistema de Comunicação Familiar",
    "description": "Aprenda a usar chat, áudio e notificações",
    "duration": "8 minutos",
    "steps": [
      {
        "target": "#chat-button",
        "title": "Chat Familiar",
        "content": "Clique aqui para abrir o chat da família. É onde vocês podem conversar em tempo real!",
        "position": "bottom"
      },
      {
        "target": "#message-input",
        "title": "Digite sua Mensagem",
        "content": "Digite aqui sua mensagem. Você pode usar emojis e mencionar outros membros!",
        "position": "top"
      },
      {
        "target": "#audio-button",
        "title": "Mensagens de Áudio",
        "content": "Pressione e segure para gravar mensagens de áudio. Mais rápido que digitar!",
        "position": "top"
      },
      {
        "target": "#notification-center",
        "title": "Central de Notificações",
        "content": "Aqui você vê todas as notificações importantes da família",
        "position": "bottom"
      }
    ]
  },
  "gamification": {
    "title": "Sistema de Gamificação",
    "description": "Como ganhar pontos, badges e recompensas",
    "duration": "6 minutos",
    "steps": [
      {
        "target": "#points-display",
        "title": "Seus Pontos",
        "content": "Aqui você vê quantos pontos tem. Complete tarefas para ganhar mais!",
        "position": "bottom"
      },
      {
        "target": "#level-progress",
        "title": "Progressão de Nível",
        "content": "Sua barra de progresso para o próximo nível. Mais pontos = nível mais alto!",
        "position": "bottom"
      },
      {
        "target": "#badges-section",
        "title": "Suas Conquistas",
        "content": "Badges que você ganhou por completar tarefas especiais",
        "position": "top"
      },
      {
        "target": "#rewards-store",
        "title": "Loja de Recompensas",
        "content": "Use seus pontos para resgatar recompensas incríveis!",
        "position": "top"
      }
    ]
  },
  "tasks": {
    "title": "Gestão de Tarefas",
    "description": "Como criar, atribuir e completar tarefas",
    "duration": "5 minutos",
    "steps": [
      {
        "target": "#create-task-button",
        "title": "Criar Nova Tarefa",
        "content": "Clique aqui para criar uma nova tarefa para a família",
        "position": "bottom"
      },
      {
        "target": "#task-form",
        "title": "Detalhes da Tarefa",
        "content": "Preencha nome, descrição, pontos e para quem é a tarefa",
        "position": "right"
      },
      {
        "target": "#task-list",
        "title": "Lista de Tarefas",
        "content": "Aqui ficam todas as tarefas. Clique para ver detalhes ou marcar como concluída",
        "position": "top"
      }
    ]
  }
};

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
            { width: `${((currentStep + 1) / totalSteps) * 100}%` }
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
