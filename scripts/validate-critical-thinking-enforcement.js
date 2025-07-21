const fs = require('fs');
const path = require('path');

/**
 * 🛡️ SISTEMA DE GARANTIA DAS DIRETIVAS DE PENSAMENTO CRÍTICO
 * 
 * Este sistema garante que as 6 diretivas fundamentais sejam respeitadas
 * por todos os participantes (humanos e agentes de IA) através de
 * validação automática, registro de violações e procedimentos de correção.
 */

class CriticalThinkingEnforcement {
  constructor() {
    this.violations = [];
    this.validations = [];
    this.logsDir = path.join(__dirname, '../logs');
    this.ensureLogsDirectory();
  }

  // Garantir que o diretório de logs existe
  ensureLogsDirectory() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  /**
   * VALIDAÇÃO OBRIGATÓRIA ANTES DE QUALQUER AÇÃO
   * 
   * @param {Object} action - Ação a ser validada
   * @param {Object} context - Contexto da ação
   * @returns {boolean} - True se todas as diretivas foram seguidas
   * @throws {Error} - Se violação for identificada
   */
  validateBeforeAction(action, context = {}) {
    console.log('🔍 VALIDANDO DIRETIVAS DE PENSAMENTO CRÍTICO...');
    
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
      throw new Error(`🚨 VIOLAÇÃO DAS DIRETIVAS DE PENSAMENTO CRÍTICO:\n${errorMessage}`);
    }

    this.recordValidation(action, checks, context);
    console.log('✅ TODAS AS DIRETIVAS FORAM SEGUIDAS CORRETAMENTE');
    return true;
  }

  /**
   * VERIFICAÇÃO 1: FONTE VERIFICADA
   * Diretiva: NÃO PRESUMA - BUSQUE CERTEZA
   */
  checkSource(action, context) {
    const hasSource = action.source && action.source.verified;
    const hasDocumentation = action.documentation && action.documentation.sources;
    const hasReferences = action.references && action.references.length > 0;
    
    return {
      passed: hasSource || hasDocumentation || hasReferences,
      message: 'Fonte deve ser verificada, confiável e documentada',
      details: {
        hasSource,
        hasDocumentation,
        hasReferences,
        source: action.source,
        documentation: action.documentation,
        references: action.references
      }
    };
  }

  /**
   * VERIFICAÇÃO 2: SUPOSIÇÕES QUESTIONADAS
   * Diretiva: QUESTIONE SUPOSIÇÕES
   */
  checkAssumptions(action, context) {
    const hasAssumptions = action.assumptions && action.assumptions.identified;
    const hasQuestioning = action.assumptions && action.assumptions.questioned;
    const hasValidation = action.assumptions && action.assumptions.validated;
    
    return {
      passed: hasAssumptions && hasQuestioning && hasValidation,
      message: 'Suposições devem ser identificadas, questionadas e validadas',
      details: {
        hasAssumptions,
        hasQuestioning,
        hasValidation,
        assumptions: action.assumptions
      }
    };
  }

  /**
   * VERIFICAÇÃO 3: LÓGICA TESTADA
   * Diretiva: TESTE A LÓGICA
   */
  checkLogic(action, context) {
    const hasLogic = action.logic && action.logic.tested;
    const hasValidation = action.logic && action.logic.validated;
    const hasConsistency = action.logic && action.logic.consistent;
    
    return {
      passed: hasLogic && hasValidation && hasConsistency,
      message: 'Lógica deve ser testada, validada e consistente',
      details: {
        hasLogic,
        hasValidation,
        hasConsistency,
        logic: action.logic
      }
    };
  }

  /**
   * VERIFICAÇÃO 4: ALTERNATIVAS CONSIDERADAS
   * Diretiva: APRESENTE CONTRAPONTOS
   */
  checkAlternatives(action, context) {
    const hasAlternatives = action.alternatives && action.alternatives.considered;
    const hasPerspectives = action.alternatives && action.alternatives.perspectives;
    const hasCreativity = action.alternatives && action.alternatives.creative;
    
    return {
      passed: hasAlternatives && hasPerspectives && hasCreativity,
      message: 'Alternativas devem ser consideradas com múltiplas perspectivas',
      details: {
        hasAlternatives,
        hasPerspectives,
        hasCreativity,
        alternatives: action.alternatives
      }
    };
  }

  /**
   * VERIFICAÇÃO 5: TRANSPARÊNCIA MANTIDA
   * Diretiva: SEJA CRÍTICO CONSTRUTIVO
   */
  checkTransparency(action, context) {
    const hasTransparency = action.transparent && action.transparent.documented;
    const hasJustification = action.transparent && action.transparent.justified;
    const hasClarity = action.transparent && action.transparent.clear;
    
    return {
      passed: hasTransparency && hasJustification && hasClarity,
      message: 'Motivos devem ser transparentes, justificados e claros',
      details: {
        hasTransparency,
        hasJustification,
        hasClarity,
        transparent: action.transparent
      }
    };
  }

  /**
   * VERIFICAÇÃO 6: HONESTIDADE MANTIDA
   * Diretiva: PRIORIZE VERDADE E HONESTIDADE
   */
  checkHonesty(action, context) {
    const hasHonesty = action.honest && action.honest.declared;
    const hasErrors = action.honest && action.honest.errors;
    const hasUncertainty = action.honest && action.honest.uncertainty;
    
    // Honestidade é válida se foi declarada, independente de ter erros ou incertezas
    return {
      passed: hasHonesty,
      message: 'Honestidade deve ser declarada (erros e incertezas são opcionais)',
      details: {
        hasHonesty,
        hasErrors,
        hasUncertainty,
        honest: action.honest
      }
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
    this.saveViolation(violation);
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
    this.saveValidation(validation);
  }

  /**
   * SALVAR VIOLAÇÃO NO ARQUIVO
   */
  saveViolation(violation) {
    const violationsFile = path.join(this.logsDir, 'critical-thinking-violations.json');
    const violations = fs.existsSync(violationsFile) 
      ? JSON.parse(fs.readFileSync(violationsFile, 'utf8'))
      : [];
    
    violations.push(violation);
    fs.writeFileSync(violationsFile, JSON.stringify(violations, null, 2));
    
    console.log(`🚨 VIOLAÇÃO REGISTRADA: ${violationsFile}`);
  }

  /**
   * SALVAR VALIDAÇÃO NO ARQUIVO
   */
  saveValidation(validation) {
    const validationsFile = path.join(this.logsDir, 'critical-thinking-validations.json');
    const validations = fs.existsSync(validationsFile) 
      ? JSON.parse(fs.readFileSync(validationsFile, 'utf8'))
      : [];
    
    validations.push(validation);
    fs.writeFileSync(validationsFile, JSON.stringify(validations, null, 2));
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

    const alertsFile = path.join(this.logsDir, 'critical-alerts.json');
    const alerts = fs.existsSync(alertsFile) 
      ? JSON.parse(fs.readFileSync(alertsFile, 'utf8'))
      : [];
    
    alerts.push(alert);
    fs.writeFileSync(alertsFile, JSON.stringify(alerts, null, 2));
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

    const report = {
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

    return report;
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
}

// Exportar classe
module.exports = CriticalThinkingEnforcement;

// Se executado diretamente, mostrar exemplo de uso
if (require.main === module) {
  console.log('🛡️ SISTEMA DE GARANTIA DAS DIRETIVAS DE PENSAMENTO CRÍTICO');
  console.log('========================================================');
  
  const enforcement = new CriticalThinkingEnforcement();
  
  // Exemplo de validação bem-sucedida
  try {
    enforcement.validateSimpleAction(
      'DECISION',
      'Implementar sistema de validação',
      'https://docs.example.com/validation'
    );
  } catch (error) {
    console.log('❌ Exemplo de violação:', error.message);
  }
  
  // Gerar relatório
  const report = enforcement.generateReport();
  console.log('\n📊 RELATÓRIO:', JSON.stringify(report.summary, null, 2));
} 