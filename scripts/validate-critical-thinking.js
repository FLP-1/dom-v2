#!/usr/bin/env node

/**
 * SISTEMA DE VALIDAÇÃO DE PENSAMENTO CRÍTICO
 * Valida se as diretivas de honestidade intelectual estão sendo seguidas
 */

const fs = require('fs');
const path = require('path');

// Configurações
const CONFIG = {
  projectRoot: path.join(__dirname, '..'),
  docsPath: path.join(__dirname, '../docs'),
  criticalFiles: [
    'docs/diretivas-pensamento-critico.md',
    'docs/regras-project-dom-v2.md',
    'docs/status-atual-project.md'
  ],
  validationRules: {
    requireSources: true,
    requireAlternatives: true,
    requireAssumptionCheck: true,
    requireLogicTest: true,
    requireContrapoints: true
  }
};

// Tipos de alerta crítico
const ALERT_TYPES = {
  CRITICAL: 'CRITICAL',
  VALIDATION: 'VALIDATION', 
  ASSUMPTION: 'ASSUMPTION',
  LOGIC: 'LOGIC'
};

class CriticalThinkingValidator {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.successes = [];
  }

  /**
   * Valida se as diretivas estão sendo seguidas
   */
  async validateDirectives() {
    console.log(`[${new Date().toISOString()}] ` + '🔍 VALIDANDO DIRETIVAS DE PENSAMENTO CRÍTICO...\n');

    // 1. Verificar se documentação existe
    await this.validateDocumentation();
    
    // 2. Verificar se sistema de notificações críticas existe
    await this.validateCriticalNotifications();
    
    // 3. Verificar se checklist está implementado
    await this.validateChecklist();
    
    // 4. Verificar se procedimentos de correção estão claros
    await this.validateCorrectionProcedures();
    
    // 5. Verificar se fontes confiáveis estão documentadas
    await this.validateReliableSources();

    this.generateReport();
  }

  /**
   * Valida se a documentação das diretivas existe
   */
  async validateDocumentation() {
    const directiveFile = path.join(CONFIG.projectRoot, 'docs/diretivas-pensamento-critico.md');
    
    if (!fs.existsSync(directiveFile)) {
      this.issues.push({
        type: ALERT_TYPES.CRITICAL,
        message: 'Documentação de diretivas de pensamento crítico não encontrada',
        file: directiveFile,
        action: 'Criar documentação completa das diretivas'
      });
      return;
    }

    const content = fs.readFileSync(directiveFile, 'utf8');
    
    // Verificar se todas as 6 diretivas estão documentadas
    const directives = [
      'NÃO PRESUMA - BUSQUE CERTEZA',
      'SEJA CRÍTICO CONSTRUTIVO', 
      'QUESTIONE SUPOSIÇÕES',
      'APRESENTE CONTRAPONTOS',
      'TESTE A LÓGICA',
      'PRIORIZE VERDADE E HONESTIDADE'
    ];

    directives.forEach(directive => {
      if (!content.includes(directive)) {
        this.issues.push({
          type: ALERT_TYPES.CRITICAL,
          message: `Diretiva "${directive}" não encontrada na documentação`,
          file: directiveFile,
          action: 'Adicionar diretiva faltante'
        });
      }
    });

    this.successes.push('✅ Documentação de diretivas encontrada e validada');
  }

  /**
   * Valida se sistema de notificações críticas está implementado
   */
  async validateCriticalNotifications() {
    const genericFunctionsFile = path.join(CONFIG.projectRoot, 'frontend/src/utils/generic-functions.js');
    
    if (!fs.existsSync(genericFunctionsFile)) {
      this.issues.push({
        type: ALERT_TYPES.CRITICAL,
        message: 'Arquivo de funções genéricas não encontrado',
        file: genericFunctionsFile,
        action: 'Criar sistema de notificações críticas'
      });
      return;
    }

    const content = fs.readFileSync(genericFunctionsFile, 'utf8');
    
    if (!content.includes('createSystemNotification')) {
      this.issues.push({
        type: ALERT_TYPES.CRITICAL,
        message: 'Função createSystemNotification não encontrada',
        file: genericFunctionsFile,
        action: 'Implementar função de notificações críticas'
      });
    } else {
      this.successes.push('✅ Sistema de notificações críticas implementado');
    }
  }

  /**
   * Valida se checklist obrigatório está implementado
   */
  async validateChecklist() {
    const directiveFile = path.join(CONFIG.projectRoot, 'docs/diretivas-pensamento-critico.md');
    
    if (!fs.existsSync(directiveFile)) {
      return;
    }

    const content = fs.readFileSync(directiveFile, 'utf8');
    
    const checklistItems = [
      'Informação foi verificada em fonte confiável?',
      'Alternativas foram consideradas?',
      'Suposições foram identificadas e questionadas?',
      'Lógica foi testada e validada?',
      'Contrapontos foram apresentados?'
    ];

    checklistItems.forEach(item => {
      if (!content.includes(item)) {
        this.warnings.push({
          type: ALERT_TYPES.VALIDATION,
          message: `Item do checklist não encontrado: "${item}"`,
          file: directiveFile,
          action: 'Adicionar item ao checklist'
        });
      }
    });

    if (checklistItems.every(item => content.includes(item))) {
      this.successes.push('✅ Checklist obrigatório implementado');
    }
  }

  /**
   * Valida se procedimentos de correção estão claros
   */
  async validateCorrectionProcedures() {
    const directiveFile = path.join(CONFIG.projectRoot, 'docs/diretivas-pensamento-critico.md');
    
    if (!fs.existsSync(directiveFile)) {
      return;
    }

    const content = fs.readFileSync(directiveFile, 'utf8');
    
    const procedures = [
      'PARAR IMEDIATAMENTE',
      'DOCUMENTAR',
      'EXPLICAR',
      'PROPOR',
      'VALIDAR'
    ];

    procedures.forEach(procedure => {
      if (!content.includes(procedure)) {
        this.warnings.push({
          type: ALERT_TYPES.VALIDATION,
          message: `Procedimento de correção não encontrado: "${procedure}"`,
          file: directiveFile,
          action: 'Adicionar procedimento de correção'
        });
      }
    });

    if (procedures.every(procedure => content.includes(procedure))) {
      this.successes.push('✅ Procedimentos de correção documentados');
    }
  }

  /**
   * Valida se fontes confiáveis estão documentadas
   */
  async validateReliableSources() {
    const directiveFile = path.join(CONFIG.projectRoot, 'docs/diretivas-pensamento-critico.md');
    
    if (!fs.existsSync(directiveFile)) {
      return;
    }

    const content = fs.readFileSync(directiveFile, 'utf8');
    
    const sources = [
      'Documentação oficial',
      'Artigos acadêmicos',
      'Comunidades técnicas',
      'Especialistas',
      'Padrões internacionais'
    ];

    sources.forEach(source => {
      if (!content.includes(source)) {
        this.warnings.push({
          type: ALERT_TYPES.VALIDATION,
          message: `Fonte confiável não documentada: "${source}"`,
          file: directiveFile,
          action: 'Adicionar fonte confiável à documentação'
        });
      }
    });

    if (sources.every(source => content.includes(source))) {
      this.successes.push('✅ Fontes confiáveis documentadas');
    }
  }

  /**
   * Gera relatório de validação
   */
  generateReport() {
    console.log(`[${new Date().toISOString()}] ` + '\n📊 RELATÓRIO DE VALIDAÇÃO DE PENSAMENTO CRÍTICO\n');
    console.log(`[${new Date().toISOString()}] ` + '=' .repeat(60));

    if (this.successes.length > 0) {
      console.log(`[${new Date().toISOString()}] ` + '\n✅ SUCESSOS:');
      this.successes.forEach(success => console.log(`[${new Date().toISOString()}] ` + `  ${success}`));
    }

    if (this.warnings.length > 0) {
      console.log(`[${new Date().toISOString()}] ` + '\n⚠️  AVISOS:');
      this.warnings.forEach(warning => {
        console.log(`[${new Date().toISOString()}] ` + `  ${warning.message}`);
        console.log(`[${new Date().toISOString()}] ` + `    Arquivo: ${warning.file}`);
        console.log(`[${new Date().toISOString()}] ` + `    Ação: ${warning.action}\n`);
      });
    }

    if (this.issues.length > 0) {
      console.log(`[${new Date().toISOString()}] ` + '\n🚨 PROBLEMAS CRÍTICOS:');
      this.issues.forEach(issue => {
        console.log(`[${new Date().toISOString()}] ` + `  ${issue.message}`);
        console.log(`[${new Date().toISOString()}] ` + `    Arquivo: ${issue.file}`);
        console.log(`[${new Date().toISOString()}] ` + `    Ação: ${issue.action}\n`);
      });
    }

    // Estatísticas
    const total = this.successes.length + this.warnings.length + this.issues.length;
    const compliance = total > 0 ? ((this.successes.length / total) * 100).toFixed(1) : 100;
    
    console.log(`[${new Date().toISOString()}] ` + '=' .repeat(60));
    console.log(`[${new Date().toISOString()}] ` + `📈 CONFORMIDADE: ${compliance}%`);
    console.log(`[${new Date().toISOString()}] ` + `✅ Sucessos: ${this.successes.length}`);
    console.log(`[${new Date().toISOString()}] ` + `⚠️  Avisos: ${this.warnings.length}`);
    console.log(`[${new Date().toISOString()}] ` + `🚨 Problemas: ${this.issues.length}`);

    if (this.issues.length > 0) {
      console.log(`[${new Date().toISOString()}] ` + '\n🚨 AÇÃO REQUERIDA: Corrigir problemas críticos antes de prosseguir!');
      process.exit(1);
    } else if (this.warnings.length > 0) {
      console.log(`[${new Date().toISOString()}] ` + '\n⚠️  RECOMENDAÇÃO: Revisar avisos para melhorar conformidade');
    } else {
      console.log(`[${new Date().toISOString()}] ` + '\n🎉 EXCELENTE: Todas as diretivas de pensamento crítico estão sendo seguidas!');
    }
  }
}

// Execução principal
async function main() {
  try {
    const validator = new CriticalThinkingValidator();
    await validator.validateDirectives();
  } catch (error) {
    console.error('❌ Erro durante validação:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { CriticalThinkingValidator, ALERT_TYPES }; 