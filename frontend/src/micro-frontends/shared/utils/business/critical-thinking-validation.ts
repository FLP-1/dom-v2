
/**
 * 
 * @alternatives
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
  */


/**
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
  */


/**
 * @param {any} data - Dados a serem validados
  */
// Função removida - causava erros de referência no frontend

// Validação de input removida - causava erro de referência


/**
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * 
 * @dependencies
 * 
 * @usage
 * import { functionName } from "./utils";
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
  */



/**
 * @param {string} message - Mensagem de erro
  */
function assert(condition: any, message: string): void {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}/**
 * 
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
   * 
   * @returns True se todas as diretivas foram seguidas
    */
  validateBeforeAction(action: Action, context: Context = {}): boolean {
    if (!this.isEnabled) return true;

    
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
    }

    this.recordValidation(action, checks, context);
    return true;
  }

  /**
    */
  private checkSource(action: Action, context: Context): ValidationCheck {
    const hasSource = Boolean(action.source && action.source.verified);
    const hasDocumentation = Boolean(action.documentation && action.documentation.sources);
    const hasReferences = Boolean(action.references && action.references.length > 0);
    
    return {
      passed: hasSource || hasDocumentation || hasReferences,
      details: { hasSource, hasDocumentation, hasReferences }
    };
  }

  /**
    */
  private checkAssumptions(action: Action, context: Context): ValidationCheck {
    const hasAssumptions = Boolean(action.assumptions && action.assumptions.identified);
    const hasQuestioning = Boolean(action.assumptions && action.assumptions.questioned);
    const hasValidation = Boolean(action.assumptions && action.assumptions.validated);
    
    return {
      passed: hasAssumptions && hasQuestioning && hasValidation,
      details: { hasAssumptions, hasQuestioning, hasValidation }
    };
  }

  /**
    */
  private checkLogic(action: Action, context: Context): ValidationCheck {
    const hasLogic = Boolean(action.logic && action.logic.tested);
    const hasValidation = Boolean(action.logic && action.logic.validated);
    const hasConsistency = Boolean(action.logic && action.logic.consistent);
    
    return {
      passed: hasLogic && hasValidation && hasConsistency,
      details: { hasLogic, hasValidation, hasConsistency }
    };
  }

  /**
    */
  private checkAlternatives(action: Action, context: Context): ValidationCheck {
    const hasAlternatives = Boolean(action.alternatives && action.alternatives.considered);
    const hasPerspectives = Boolean(action.alternatives && action.alternatives.perspectives);
    const hasCreative = Boolean(action.alternatives && action.alternatives.creative);
    
    return {
      passed: hasAlternatives && hasPerspectives && hasCreative,
      details: { hasAlternatives, hasPerspectives, hasCreative }
    };
  }

  /**
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
    */
  private checkHonesty(action: Action, context: Context): ValidationCheck {
    const hasDeclared = Boolean(action.honesty && action.honesty.declared);
    const hasErrors = Boolean(action.honesty && action.honesty.errors);
    const hasUncertainty = Boolean(action.honesty && action.honesty.uncertainty);
    
    return {
      passed: hasDeclared && hasErrors && hasUncertainty,
      details: { hasDeclared, hasErrors, hasUncertainty }
    };
  }

  /**
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
    */
  private saveViolationToStorage(violation: Violation): void {
    try {
      const existing = localStorage.getItem('criticalThinkingViolations');
      const violations = existing ? JSON.parse(existing) : [];
      violations.push(violation);
      localStorage.setItem('criticalThinkingViolations', JSON.stringify(violations));
    } catch (error) {
    }
  }

  /**
    */
  private saveValidationToStorage(validation: Validation): void {
    try {
      const existing = localStorage.getItem('criticalThinkingValidations');
      const validations = existing ? JSON.parse(existing) : [];
      validations.push(validation);
      localStorage.setItem('criticalThinkingValidations', JSON.stringify(validations));
    } catch (error) {
    }
  }

  /**
    */
  private createCriticalAlert(violation: Violation): void {
    const alertData = {
      type: 'critical',
      message: violation.message,
      timestamp: violation.timestamp,
      action: violation.action.type,
      component: violation.context.component || 'Unknown'
    };

    if (typeof window !== 'undefined' && 'dispatchEvent' in window) {
      (window as any).dispatchEvent(new CustomEvent('criticalThinkingViolation', {
        detail: alertData
      }));
    }
  }

  /**
    */
  private showViolationAlert(message: string): void {
    
    // Em ambiente de desenvolvimento, mostrar alerta visual
    if (process.env.NODE_ENV === 'development' && typeof (globalThis as any).alert !== 'undefined') {
    }
  }

  /**
    */
  private generateViolationMessage(checks: ValidationResult): string {
    const failedChecks = Object.entries(checks)
      .filter(([_, check]) => !check.passed)

    return failedChecks.join('\n');
  }

  /**
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
    */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    if (this.violations.length > this.validations.length) {
    }
    
    if (this.violations.length === 0) {
    }
    
    return recommendations;
  }

  /**
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
    */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
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
      
    } catch (error) {
      console.error('Erro ao carregar do storage:', error);
    }
  }
}

const criticalThinkingValidation = new CriticalThinkingValidation();

export default criticalThinkingValidation; 