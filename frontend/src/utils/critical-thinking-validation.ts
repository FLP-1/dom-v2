/**
 * 🛡️ SISTEMA DE VALIDAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO - FRONTEND
 * 
 * Este sistema garante que todas as ações do frontend sigam as diretivas
 * de pensamento crítico antes de serem executadas.
 */

interface Action {
  type: string;
  description: string;
  source?: {
    verified: boolean;
    url?: string;
  };
  documentation?: {
    sources: string[];
  };
  references?: string[];
  assumptions?: {
    identified: boolean;
    questioned: boolean;
    validated: boolean;
  };
  logic?: {
    tested: boolean;
    validated: boolean;
    consistent: boolean;
  };
  alternatives?: {
    considered: boolean;
    perspectives: boolean;
    creative: boolean;
  };
  transparency?: {
    documented: boolean;
    justified: boolean;
    clear: boolean;
  };
  honesty?: {
    declared: boolean;
    errors: boolean;
    uncertainty: boolean;
  };
}

interface Context {
  user?: string;
  timestamp?: string;
  component?: string;
  [key: string]: any;
}

interface ValidationCheck {
  passed: boolean;
  message: string;
  details: Record<string, any>;
}

interface ValidationResult {
  sourceVerified: ValidationCheck;
  assumptionsQuestioned: ValidationCheck;
  logicTested: ValidationCheck;
  alternativesConsidered: ValidationCheck;
  transparencyMaintained: ValidationCheck;
  honestyMaintained: ValidationCheck;
}

interface Violation {
  timestamp: string;
  action: Action;
  checks: ValidationResult;
  context: Context;
  message: string;
}

interface Validation {
  timestamp: string;
  action: Action;
  checks: ValidationResult;
  context: Context;
}

class CriticalThinkingValidation {
  private violations: Violation[] = [];
  private validations: Validation[] = [];
  private isEnabled: boolean = true;

  /**
   * VALIDAÇÃO OBRIGATÓRIA ANTES DE QUALQUER AÇÃO DO FRONTEND
   * 
   * @param action - Ação a ser validada
   * @param context - Contexto da ação
   * @returns True se todas as diretivas foram seguidas
   * @throws Error se violação for identificada
   */
  validateBeforeAction(action: Action, context: Context = {}): boolean {
    if (!this.isEnabled) return true;

    console.log('🔍 VALIDANDO DIRETIVAS DE PENSAMENTO CRÍTICO (FRONTEND)...');
    
    const checks: ValidationResult = {
      sourceVerified: this.checkSource(action, context),
      assumptionsQuestioned: this.checkAssumptions(action, context),
      logicTested: this.checkLogic(action, context),
      alternativesConsidered: this.checkAlternatives(action, context),
      transparencyMaintained: this.checkTransparency(action, context),
      honestyMaintained: this.checkHonesty(action, context)
    };

    const allPassed = Object.values(checks).every(check => check.passed);
    
    if (!allPassed) {
      this.recordViolation(action, checks, context);
      const errorMessage = this.generateViolationMessage(checks);
      this.showViolationAlert(errorMessage);
      throw new Error(`🚨 VIOLAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO:\n${errorMessage}`);
    }

    this.recordValidation(action, checks, context);
    console.log('✅ TODAS AS DIRETIVAS FORAM SEGUIDAS CORRETAMENTE');
    return true;
  }

  /**
   * VERIFICAÇÃO 1: FONTE VERIFICADA
   */
  private checkSource(action: Action, context: Context): ValidationCheck {
    const hasSource = Boolean(action.source && action.source.verified);
    const hasDocumentation = Boolean(action.documentation && action.documentation.sources);
    const hasReferences = Boolean(action.references && action.references.length > 0);
    
    return {
      passed: hasSource || hasDocumentation || hasReferences,
      message: 'Fonte deve ser verificada, confiável e documentada',
      details: { hasSource, hasDocumentation, hasReferences }
    };
  }

  /**
   * VERIFICAÇÃO 2: SUPOSIÇÕES QUESTIONADAS
   */
  private checkAssumptions(action: Action, context: Context): ValidationCheck {
    const hasAssumptions = Boolean(action.assumptions && action.assumptions.identified);
    const hasQuestioning = Boolean(action.assumptions && action.assumptions.questioned);
    const hasValidation = Boolean(action.assumptions && action.assumptions.validated);
    
    return {
      passed: hasAssumptions && hasQuestioning && hasValidation,
      message: 'Suposições devem ser identificadas, questionadas e validadas',
      details: { hasAssumptions, hasQuestioning, hasValidation }
    };
  }

  /**
   * VERIFICAÇÃO 3: LÓGICA TESTADA
   */
  private checkLogic(action: Action, context: Context): ValidationCheck {
    const hasLogic = Boolean(action.logic && action.logic.tested);
    const hasValidation = Boolean(action.logic && action.logic.validated);
    const hasConsistency = Boolean(action.logic && action.logic.consistent);
    
    return {
      passed: hasLogic && hasValidation && hasConsistency,
      message: 'Lógica deve ser testada, validada e consistente',
      details: { hasLogic, hasValidation, hasConsistency }
    };
  }

  /**
   * VERIFICAÇÃO 4: ALTERNATIVAS CONSIDERADAS
   */
  private checkAlternatives(action: Action, context: Context): ValidationCheck {
    const hasAlternatives = Boolean(action.alternatives && action.alternatives.considered);
    const hasPerspectives = Boolean(action.alternatives && action.alternatives.perspectives);
    const hasCreative = Boolean(action.alternatives && action.alternatives.creative);
    
    return {
      passed: hasAlternatives && hasPerspectives && hasCreative,
      message: 'Alternativas devem ser consideradas, com múltiplas perspectivas e criatividade',
      details: { hasAlternatives, hasPerspectives, hasCreative }
    };
  }

  /**
   * VERIFICAÇÃO 5: TRANSPARÊNCIA MANTIDA
   */
  private checkTransparency(action: Action, context: Context): ValidationCheck {
    const hasDocumented = Boolean(action.transparency && action.transparency.documented);
    const hasJustified = Boolean(action.transparency && action.transparency.justified);
    const hasClear = Boolean(action.transparency && action.transparency.clear);
    
    return {
      passed: hasDocumented && hasJustified && hasClear,
      message: 'Processo deve ser documentado, justificado e claro',
      details: { hasDocumented, hasJustified, hasClear }
    };
  }

  /**
   * VERIFICAÇÃO 6: HONESTIDADE MANTIDA
   */
  private checkHonesty(action: Action, context: Context): ValidationCheck {
    const hasDeclared = Boolean(action.honesty && action.honesty.declared);
    const hasErrors = Boolean(action.honesty && action.honesty.errors);
    const hasUncertainty = Boolean(action.honesty && action.honesty.uncertainty);
    
    return {
      passed: hasDeclared && hasErrors && hasUncertainty,
      message: 'Incertezas, erros e limitações devem ser declarados',
      details: { hasDeclared, hasErrors, hasUncertainty }
    };
  }

  /**
   * REGISTRAR VIOLAÇÃO
   */
  private recordViolation(action: Action, checks: ValidationResult, context: Context): void {
    const violation: Violation = {
      timestamp: new Date().toISOString(),
      action,
      checks,
      context,
      message: this.generateViolationMessage(checks)
    };

    this.violations.push(violation);
    this.saveViolationToStorage(violation);
    this.createCriticalAlert(violation);
  }

  /**
   * REGISTRAR VALIDAÇÃO
   */
  private recordValidation(action: Action, checks: ValidationResult, context: Context): void {
    const validation: Validation = {
      timestamp: new Date().toISOString(),
      action,
      checks,
      context
    };

    this.validations.push(validation);
    this.saveValidationToStorage(validation);
  }

  /**
   * SALVAR VIOLAÇÃO NO STORAGE
   */
  private saveViolationToStorage(violation: Violation): void {
    try {
      const existing = localStorage.getItem('criticalThinkingViolations');
      const violations = existing ? JSON.parse(existing) : [];
      violations.push(violation);
      localStorage.setItem('criticalThinkingViolations', JSON.stringify(violations));
    } catch (error) {
      console.error('Erro ao salvar violação:', error);
    }
  }

  /**
   * SALVAR VALIDAÇÃO NO STORAGE
   */
  private saveValidationToStorage(validation: Validation): void {
    try {
      const existing = localStorage.getItem('criticalThinkingValidations');
      const validations = existing ? JSON.parse(existing) : [];
      validations.push(validation);
      localStorage.setItem('criticalThinkingValidations', JSON.stringify(validations));
    } catch (error) {
      console.error('Erro ao salvar validação:', error);
    }
  }

  /**
   * CRIAR ALERTA CRÍTICO
   */
  private createCriticalAlert(violation: Violation): void {
    const alertData = {
      type: 'critical',
      title: '🚨 VIOLAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO',
      message: violation.message,
      timestamp: violation.timestamp,
      action: violation.action.type,
      component: violation.context.component || 'Unknown'
    };

    // Emitir evento para o sistema de notificações
    if (typeof window !== 'undefined' && 'dispatchEvent' in window) {
      (window as any).dispatchEvent(new CustomEvent('criticalThinkingViolation', {
        detail: alertData
      }));
    }
  }

  /**
   * MOSTRAR ALERTA DE VIOLAÇÃO
   */
  private showViolationAlert(message: string): void {
    console.error('🚨 ALERTA DE VIOLAÇÃO:', message);
    
    // Em ambiente de desenvolvimento, mostrar alerta visual
    if (process.env.NODE_ENV === 'development' && typeof (globalThis as any).alert !== 'undefined') {
      (globalThis as any).alert(`🚨 VIOLAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO:\n\n${message}`);
    }
  }

  /**
   * GERENCIAR MENSAGEM DE VIOLAÇÃO
   */
  private generateViolationMessage(checks: ValidationResult): string {
    const failedChecks = Object.entries(checks)
      .filter(([_, check]) => !check.passed)
      .map(([name, check]) => `• ${check.message}`);

    return failedChecks.join('\n');
  }

  /**
   * GERAR RELATÓRIO
   */
  generateReport(): any {
    return {
      timestamp: new Date().toISOString(),
      totalViolations: this.violations.length,
      totalValidations: this.validations.length,
      complianceRate: this.validations.length / (this.violations.length + this.validations.length) * 100,
      recentViolations: this.violations.slice(-5),
      recentValidations: this.validations.slice(-5),
      recommendations: this.generateRecommendations()
    };
  }

  /**
   * GERENCIAR RECOMENDAÇÕES
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.violations.length > this.validations.length) {
      recommendations.push('⚠️ Muitas violações detectadas. Revise as diretivas de pensamento crítico.');
    }
    
    if (this.violations.length === 0) {
      recommendations.push('✅ Excelente! Todas as ações seguem as diretivas de pensamento crítico.');
    }
    
    return recommendations;
  }

  /**
   * VALIDAÇÃO SIMPLES PARA AÇÕES BÁSICAS
   */
  validateSimpleAction(actionType: string, description: string, source: string | null = null): boolean {
    const action: Action = {
      type: actionType,
      description,
      source: source ? { verified: true, url: source } : undefined,
      assumptions: { identified: true, questioned: true, validated: true },
      logic: { tested: true, validated: true, consistent: true },
      alternatives: { considered: true, perspectives: true, creative: true },
      transparency: { documented: true, justified: true, clear: true },
      honesty: { declared: true, errors: false, uncertainty: false }
    };

    return this.validateBeforeAction(action);
  }

  /**
   * HABILITAR/DESABILITAR VALIDAÇÃO
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    console.log(`🔧 Validação de pensamento crítico ${enabled ? 'habilitada' : 'desabilitada'}`);
  }

  /**
   * LIMPAR STORAGE
   */
  clearStorage(): void {
    try {
      localStorage.removeItem('criticalThinkingViolations');
      localStorage.removeItem('criticalThinkingValidations');
      this.violations = [];
      this.validations = [];
      console.log('🗑️ Storage de pensamento crítico limpo');
    } catch (error) {
      console.error('Erro ao limpar storage:', error);
    }
  }

  /**
   * CARREGAR DO STORAGE
   */
  loadFromStorage(): void {
    try {
      const violations = localStorage.getItem('criticalThinkingViolations');
      const validations = localStorage.getItem('criticalThinkingValidations');
      
      if (violations) {
        this.violations = JSON.parse(violations);
      }
      
      if (validations) {
        this.validations = JSON.parse(validations);
      }
      
      console.log(`📊 Carregados ${this.violations.length} violações e ${this.validations.length} validações do storage`);
    } catch (error) {
      console.error('Erro ao carregar do storage:', error);
    }
  }
}

// Instância global
const criticalThinkingValidation = new CriticalThinkingValidation();

export default criticalThinkingValidation; 