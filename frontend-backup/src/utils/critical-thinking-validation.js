/**
 * 🛡️ SISTEMA DE VALIDAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO - FRONTEND
 * 
 * Este sistema garante que todas as ações do frontend sigam as diretivas
 * de pensamento crítico antes de serem executadas.
 */

class CriticalThinkingValidation {
  constructor() {
    this.violations = [];
    this.validations = [];
    this.isEnabled = true;
  }

  /**
   * VALIDAÇÃO OBRIGATÓRIA ANTES DE QUALQUER AÇÃO DO FRONTEND
   * 
   * @param {Object} action - Ação a ser validada
   * @param {Object} context - Contexto da ação
   * @returns {boolean} - True se todas as diretivas foram seguidas
   * @throws {Error} - Se violação for identificada
   */
  validateBeforeAction(action, context = {}) {
    if (!this.isEnabled) return true;

    console.log('🔍 VALIDANDO DIRETIVAS DE PENSAMENTO CRÍTICO (FRONTEND)...');
    
    const checks = {
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
  checkSource(action, context) {
    const hasSource = action.source && action.source.verified;
    const hasDocumentation = action.documentation && action.documentation.sources;
    const hasReferences = action.references && action.references.length > 0;
    
    return {
      passed: hasSource || hasDocumentation || hasReferences,
      message: 'Fonte deve ser verificada, confiável e documentada',
      details: { hasSource, hasDocumentation, hasReferences }
    };
  }

  /**
   * VERIFICAÇÃO 2: SUPOSIÇÕES QUESTIONADAS
   */
  checkAssumptions(action, context) {
    const hasAssumptions = action.assumptions && action.assumptions.identified;
    const hasQuestioning = action.assumptions && action.assumptions.questioned;
    const hasValidation = action.assumptions && action.assumptions.validated;
    
    return {
      passed: hasAssumptions && hasQuestioning && hasValidation,
      message: 'Suposições devem ser identificadas, questionadas e validadas',
      details: { hasAssumptions, hasQuestioning, hasValidation }
    };
  }

  /**
   * VERIFICAÇÃO 3: LÓGICA TESTADA
   */
  checkLogic(action, context) {
    const hasLogic = action.logic && action.logic.tested;
    const hasValidation = action.logic && action.logic.validated;
    const hasConsistency = action.logic && action.logic.consistent;
    
    return {
      passed: hasLogic && hasValidation && hasConsistency,
      message: 'Lógica deve ser testada, validada e consistente',
      details: { hasLogic, hasValidation, hasConsistency }
    };
  }

  /**
   * VERIFICAÇÃO 4: ALTERNATIVAS CONSIDERADAS
   */
  checkAlternatives(action, context) {
    const hasAlternatives = action.alternatives && action.alternatives.considered;
    const hasPerspectives = action.alternatives && action.alternatives.perspectives;
    const hasCreativity = action.alternatives && action.alternatives.creative;
    
    return {
      passed: hasAlternatives && hasPerspectives && hasCreativity,
      message: 'Alternativas devem ser consideradas com múltiplas perspectivas',
      details: { hasAlternatives, hasPerspectives, hasCreativity }
    };
  }

  /**
   * VERIFICAÇÃO 5: TRANSPARÊNCIA MANTIDA
   */
  checkTransparency(action, context) {
    const hasTransparency = action.transparent && action.transparent.documented;
    const hasJustification = action.transparent && action.transparent.justified;
    const hasClarity = action.transparent && action.transparent.clear;
    
    return {
      passed: hasTransparency && hasJustification && hasClarity,
      message: 'Motivos devem ser transparentes, justificados e claros',
      details: { hasTransparency, hasJustification, hasClarity }
    };
  }

  /**
   * VERIFICAÇÃO 6: HONESTIDADE MANTIDA
   */
  checkHonesty(action, context) {
    const hasHonesty = action.honest && action.honest.declared;
    const hasErrors = action.honest && action.honest.errors;
    const hasUncertainty = action.honest && action.honest.uncertainty;
    
    return {
      passed: hasHonesty && (hasErrors || hasUncertainty),
      message: 'Erros e incertezas devem ser declarados honestamente',
      details: { hasHonesty, hasErrors, hasUncertainty }
    };
  }

  /**
   * REGISTRO DE VIOLAÇÃO
   */
  recordViolation(action, checks, context) {
    const violation = {
      timestamp: new Date().toISOString(),
      action: {
        type: action.type || 'unknown',
        description: action.description || 'No description provided',
        data: action.data || {}
      },
      context: context,
      failedChecks: Object.entries(checks)
        .filter(([key, check]) => !check.passed)
        .map(([key, check]) => ({
          check: key,
          message: check.message,
          details: check.details
        })),
      required: 'Correção obrigatória antes de prosseguir',
      severity: 'HIGH'
    };

    this.violations.push(violation);
    this.saveViolationToStorage(violation);
    this.createCriticalAlert(violation);
  }

  /**
   * REGISTRO DE VALIDAÇÃO BEM-SUCEDIDA
   */
  recordValidation(action, checks, context) {
    const validation = {
      timestamp: new Date().toISOString(),
      action: {
        type: action.type || 'unknown',
        description: action.description || 'No description provided'
      },
      context: context,
      passedChecks: Object.keys(checks),
      status: 'SUCCESS'
    };

    this.validations.push(validation);
    this.saveValidationToStorage(validation);
  }

  /**
   * SALVAR VIOLAÇÃO NO LOCAL STORAGE
   */
  saveViolationToStorage(violation) {
    try {
      const violations = JSON.parse(localStorage.getItem('critical-thinking-violations') || '[]');
      violations.push(violation);
      localStorage.setItem('critical-thinking-violations', JSON.stringify(violations));
      console.log('🚨 VIOLAÇÃO SALVA NO LOCAL STORAGE');
    } catch (error) {
      console.error('Erro ao salvar violação:', error);
    }
  }

  /**
   * SALVAR VALIDAÇÃO NO LOCAL STORAGE
   */
  saveValidationToStorage(validation) {
    try {
      const validations = JSON.parse(localStorage.getItem('critical-thinking-validations') || '[]');
      validations.push(validation);
      localStorage.setItem('critical-thinking-validations', JSON.stringify(validations));
    } catch (error) {
      console.error('Erro ao salvar validação:', error);
    }
  }

  /**
   * CRIAR ALERTA CRÍTICO
   */
  createCriticalAlert(violation) {
    const alert = {
      type: 'CRITICAL_THINKING_VIOLATION',
      severity: 'HIGH',
      message: `🚨 VIOLAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO DETECTADA`,
      details: {
        action: violation.action.type,
        failedChecks: violation.failedChecks.length,
        timestamp: violation.timestamp
      },
      requiredAction: 'Correção obrigatória antes de prosseguir',
      mandatory: true
    };

    try {
      const alerts = JSON.parse(localStorage.getItem('critical-alerts') || '[]');
      alerts.push(alert);
      localStorage.setItem('critical-alerts', JSON.stringify(alerts));
    } catch (error) {
      console.error('Erro ao salvar alerta:', error);
    }
  }

  /**
   * MOSTRAR ALERTA DE VIOLAÇÃO
   */
  showViolationAlert(message) {
    // Usar o sistema de notificações existente
    if (typeof createSystemNotification === 'function') {
      createSystemNotification({
        type: 'error',
        title: '🚨 VIOLAÇÃO DAS DIRETIVAS',
        message: message,
        duration: 10000,
        critical: true
      });
    } else {
      // Fallback para alert nativo
      alert(`🚨 VIOLAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO:\n\n${message}`);
    }
  }

  /**
   * GERAR MENSAGEM DE VIOLAÇÃO
   */
  generateViolationMessage(checks) {
    const failedChecks = Object.entries(checks)
      .filter(([key, check]) => !check.passed)
      .map(([key, check]) => `  • ${key}: ${check.message}`)
      .join('\n');

    return `\n❌ VIOLAÇÕES IDENTIFICADAS:\n${failedChecks}\n\n🔧 AÇÃO REQUERIDA: Corrigir todas as violações antes de prosseguir`;
  }

  /**
   * GERAR RELATÓRIO COMPLETO
   */
  generateReport() {
    const totalActions = this.violations.length + this.validations.length;
    const complianceRate = totalActions > 0 ? (this.validations.length / totalActions * 100).toFixed(2) : 0;

    return {
      summary: {
        totalActions,
        violations: this.violations.length,
        validations: this.validations.length,
        complianceRate: `${complianceRate}%`
      },
      violations: this.violations,
      validations: this.validations,
      recommendations: this.generateRecommendations(),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * GERAR RECOMENDAÇÕES
   */
  generateRecommendations() {
    const recommendations = [];
    
    if (this.violations.length > 0) {
      recommendations.push('🚨 REQUER TREINAMENTO ADICIONAL NAS DIRETIVAS');
      recommendations.push('🔧 IMPLEMENTAR VERIFICAÇÕES MAIS RIGOROSAS');
      recommendations.push('📝 DOCUMENTAR TODAS AS DECISÕES COM FONTES');
      recommendations.push('❓ QUESTIONAR SUPOSIÇÕES ANTES DE PROSSEGUIR');
      recommendations.push('🔍 VALIDAR LÓGICA EM TODAS AS DECISÕES');
    }

    if (this.violations.length === 0 && this.validations.length > 0) {
      recommendations.push('✅ EXCELENTE CONFORMIDADE COM AS DIRETIVAS');
      recommendations.push('🎯 MANTER PADRÃO DE QUALIDADE ATUAL');
      recommendations.push('📈 CONSIDERAR EXPANSÃO DO SISTEMA');
    }

    return recommendations;
  }

  /**
   * VALIDAR AÇÃO SIMPLES (PARA USO RÁPIDO)
   */
  validateSimpleAction(actionType, description, source = null) {
    const action = {
      type: actionType,
      description: description,
      source: source ? { verified: true, url: source } : null,
      assumptions: { identified: true, questioned: true, validated: true },
      logic: { tested: true, validated: true, consistent: true },
      alternatives: { considered: true, perspectives: true, creative: true },
      transparent: { documented: true, justified: true, clear: true },
      honest: { declared: true, errors: false, uncertainty: false }
    };

    return this.validateBeforeAction(action);
  }

  /**
   * HABILITAR/DESABILITAR VALIDAÇÃO
   */
  setEnabled(enabled) {
    this.isEnabled = enabled;
    console.log(`🔧 VALIDAÇÃO DE PENSAMENTO CRÍTICO ${enabled ? 'HABILITADA' : 'DESABILITADA'}`);
  }

  /**
   * LIMPAR DADOS ARMAZENADOS
   */
  clearStorage() {
    try {
      localStorage.removeItem('critical-thinking-violations');
      localStorage.removeItem('critical-thinking-validations');
      localStorage.removeItem('critical-alerts');
      this.violations = [];
      this.validations = [];
      console.log('🗑️ DADOS DE VALIDAÇÃO LIMPOS');
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  }

  /**
   * CARREGAR DADOS DO STORAGE
   */
  loadFromStorage() {
    try {
      const violations = JSON.parse(localStorage.getItem('critical-thinking-violations') || '[]');
      const validations = JSON.parse(localStorage.getItem('critical-thinking-validations') || '[]');
      
      this.violations = violations;
      this.validations = validations;
      
      console.log(`📊 DADOS CARREGADOS: ${violations.length} violações, ${validations.length} validações`);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }
}

// Criar instância global
const criticalThinkingValidation = new CriticalThinkingValidation();

// Carregar dados ao inicializar
criticalThinkingValidation.loadFromStorage();

// Exportar instância e classe
export { criticalThinkingValidation, CriticalThinkingValidation };

// Adicionar ao objeto global para compatibilidade
if (typeof window !== 'undefined') {
  window.criticalThinkingValidation = criticalThinkingValidation;
} 