/**
 * @fileoverview Administrador do Sistema Onboarding - Componente de onboarding
 * @description Onboarding personalizado para perfil Administrador do Sistema
 * @version 2.0.0
 * @generated 2025-08-10T02:36:53.697Z
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

export const Administrador do SistemaOnboarding: React.FC<OnboardingProps> = ({
  userId,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const steps = [
  {
    "id": "admin-welcome",
    "title": "Painel de Administração",
    "description": "Gerencie e monitore toda a plataforma DOM v2",
    "type": "intro",
    "duration": 90
  },
  {
    "id": "analytics-overview",
    "title": "Dashboard de Analytics",
    "description": "Monitore KPIs e métricas em tempo real",
    "type": "tutorial",
    "duration": 360
  },
  {
    "id": "user-management",
    "title": "Gestão de Usuários",
    "description": "Como gerenciar usuários e famílias",
    "type": "tutorial",
    "duration": 240
  },
  {
    "id": "support-tools",
    "title": "Ferramentas de Suporte",
    "description": "Como dar suporte aos usuários",
    "type": "tutorial",
    "duration": 300
  },
  {
    "id": "system-config",
    "title": "Configurações do Sistema",
    "description": "Como configurar parâmetros da plataforma",
    "type": "tutorial",
    "duration": 360
  }
];
  const totalSteps = steps.length;
  const currentStepConfig = steps[currentStep];
  
  useEffect(() => {
    // Carregar progresso salvo
    loadOnboardingProgress();
  }, []);
  
  const loadOnboardingProgress = async () => {
    try {
      const progress = await onboardingService.getProgress(userId, 'admin');
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
      await onboardingService.saveProgress(userId, 'admin', {
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
      await onboardingService.markComplete(userId, 'admin');
      
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

export default Administrador do SistemaOnboarding;
