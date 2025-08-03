#!/usr/bin/env node

/**
 * @fileoverview Setup do Ambiente de Adoção - Fase 2
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-07-26
 * 
 * @description
 * Este script configura o ambiente para a Fase 2 - Adoção das Diretivas Críticas,
 * implementando validação automática, templates e processos de qualidade.
 * 
 * @dependencies
 * - Node.js, fs, path
 * 
 * @usage
 * npm run setup-phase2
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

const fs = require('fs');
const path = require('path');

/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

/**
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error, context = 'unknown') {
  console.error(`[ERROR] ${context}:`, error.message);
  
  // Log estruturado para debugging
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    type: error.constructor.name
  };
  
  // Salvar log de erro
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'phase2-setup-error-log.json'),
      JSON.stringify(errorLog) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
  
  // Re-throw para tratamento superior
  throw error;
}

/**
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error, debug)
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    file: __filename,
    function: 'logStructured'
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'phase2-setup.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

/**
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value, expectedType) {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

// Aplicar validação de tipos
if (!validateType(process.argv, 'array')) {
  throw new TypeError('Argumentos devem ser um array válido');
}

/**
 * Referências externas e fontes de informação
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
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */

/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: Setup automatizado com validação contínua
 * - Alternativa 1: Setup manual com validação pontual
 *   - Prós: Controle total sobre cada etapa
 *   - Contras: Maior tempo de implementação, propenso a erros
 * - Alternativa 2: Setup parcial com validação opcional
 *   - Prós: Implementação mais rápida
 *   - Contras: Menor garantia de qualidade
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - Automação completa para garantir consistência
 * - Validação contínua para manter qualidade
 * - Documentação automática para facilitar manutenção
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */

class Phase2Setup {
  constructor() {
    this.setupSteps = [];
    this.errors = [];
    this.successCount = 0;
  }

  /**
   * Executa setup completo da Fase 2
   */
  async runSetup() {
    logStructured('info', 'Iniciando setup da Fase 2 - Adoção das Diretivas Críticas', { 
      timestamp: new Date().toISOString() 
    });

    try {
      // 1. Validar ambiente atual
      await this.validateCurrentEnvironment();
      
      // 2. Configurar validação automática
      await this.setupAutomaticValidation();
      
      // 3. Criar templates para novos arquivos
      await this.createFileTemplates();
      
      // 4. Configurar CI/CD com validação
      await this.setupCICDValidation();
      
      // 5. Criar documentação de processos
      await this.createProcessDocumentation();
      
      // 6. Configurar monitoramento
      await this.setupMonitoring();
      
      // 7. Gerar relatório final
      await this.generateSetupReport();
      
    } catch (error) {
      handleError(error, 'phase2-setup');
    }
  }

  /**
   * Valida ambiente atual
   */
  async validateCurrentEnvironment() {
    logStructured('info', 'Validando ambiente atual...');
    
    try {
      // Verificar se git hooks estão configurados
      const hooksDir = path.join(__dirname, '..', '.git', 'hooks');
      assertCritical(fs.existsSync(hooksDir), 'Diretório de git hooks não encontrado');
      
      // Verificar se scripts de validação existem
      const validationScript = path.join(__dirname, 'validate-directives.js');
      assertCritical(fs.existsSync(validationScript), 'Script de validação não encontrado');
      
      // Verificar se package.json tem scripts necessários
      const packageJson = path.join(__dirname, '..', 'package.json');
      assertCritical(fs.existsSync(packageJson), 'package.json não encontrado');
      
      const packageContent = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
      assertCritical(packageContent.scripts['validate-directives'], 'Script validate-directives não encontrado');
      
      this.setupSteps.push({
        step: 'validate-environment',
        status: 'success',
        message: 'Ambiente validado com sucesso'
      });
      this.successCount++;
      
      logStructured('info', 'Ambiente validado com sucesso');
      
    } catch (error) {
      this.setupSteps.push({
        step: 'validate-environment',
        status: 'error',
        message: error.message
      });
      this.errors.push(error);
      throw error;
    }
  }

  /**
   * Configura validação automática
   */
  async setupAutomaticValidation() {
    logStructured('info', 'Configurando validação automática...');
    
    try {
      // Criar script de validação pré-commit
      const preCommitHook = `#!/bin/sh
# Pre-commit hook para validação de diretivas críticas
echo "🔍 Validando diretivas críticas..."
npm run validate-directives
if [ $? -ne 0 ]; then
  echo "❌ Validação falhou. Commit bloqueado."
  exit 1
fi
echo "✅ Validação aprovada. Commit permitido."
exit 0
`;

      const hooksDir = path.join(__dirname, '..', '.git', 'hooks');
      fs.writeFileSync(path.join(hooksDir, 'pre-commit'), preCommitHook);
      fs.chmodSync(path.join(hooksDir, 'pre-commit'), '755');
      
      this.setupSteps.push({
        step: 'setup-automatic-validation',
        status: 'success',
        message: 'Validação automática configurada'
      });
      this.successCount++;
      
      logStructured('info', 'Validação automática configurada com sucesso');
      
    } catch (error) {
      this.setupSteps.push({
        step: 'setup-automatic-validation',
        status: 'error',
        message: error.message
      });
      this.errors.push(error);
      throw error;
    }
  }

  /**
   * Cria templates para novos arquivos
   */
  async createFileTemplates() {
    logStructured('info', 'Criando templates para novos arquivos...');
    
    try {
      const templatesDir = path.join(__dirname, '..', 'templates');
      if (!fs.existsSync(templatesDir)) {
        fs.mkdirSync(templatesDir, { recursive: true });
      }
      
      // Template para componentes React
      const reactComponentTemplate = `/**
 * @fileoverview [DESCREVER COMPONENTE]
 * @author [SEU NOME]
 * @version 1.0.0
 * @since ${new Date().toISOString().split('T')[0]}
 * 
 * @description
 * Este componente implementa [FUNCIONALIDADE] seguindo as diretivas críticas.
 * 
 * @dependencies
 * - React, React Native
 * 
 * @usage
 * <ComponentName prop={value} />
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 */

import React from 'react';

/**
 * Validação de entrada de dados
 */
function validateInput(data) {
  if (!data) return false;
  return true;
}

/**
 * Tratamento de erros
 */
function handleError(error, context) {
  console.error(\`[ERROR] \${context}:\`, error.message);
  throw error;
}

interface ComponentNameProps {
  // Definir props aqui
}

export const ComponentName: React.FC<ComponentNameProps> = (props) => {
  try {
    // Validar props
    if (!validateInput(props)) {
      throw new Error('Props inválidas');
    }
    
    return (
      <div>
        {/* Implementação do componente */}
      </div>
    );
  } catch (error) {
    handleError(error, 'ComponentName');
    return null;
  }
};
`;

      // Template para scripts Node.js
      const nodeScriptTemplate = `#!/usr/bin/env node

/**
 * @fileoverview [DESCREVER SCRIPT]
 * @author [SEU NOME]
 * @version 1.0.0
 * @since ${new Date().toISOString().split('T')[0]}
 * 
 * @description
 * Este script implementa [FUNCIONALIDADE] seguindo as diretivas críticas.
 * 
 * @dependencies
 * - Node.js, fs, path
 * 
 * @usage
 * node script-name.js
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 */

const fs = require('fs');
const path = require('path');

/**
 * Validação de entrada de dados
 */
function validateInput(data) {
  if (!data) return false;
  return true;
}

/**
 * Tratamento de erros
 */
function handleError(error, context) {
  console.error(\`[ERROR] \${context}:\`, error.message);
  throw error;
}

/**
 * Função principal
 */
async function main() {
  try {
    // Implementação do script
    console.log('Script executado com sucesso');
  } catch (error) {
    handleError(error, 'main');
  }
}

if (require.main === module) {
  main();
}
`;

      // Salvar templates
      fs.writeFileSync(path.join(templatesDir, 'react-component.tsx'), reactComponentTemplate);
      fs.writeFileSync(path.join(templatesDir, 'node-script.js'), nodeScriptTemplate);
      
      this.setupSteps.push({
        step: 'create-file-templates',
        status: 'success',
        message: 'Templates criados com sucesso'
      });
      this.successCount++;
      
      logStructured('info', 'Templates criados com sucesso');
      
    } catch (error) {
      this.setupSteps.push({
        step: 'create-file-templates',
        status: 'error',
        message: error.message
      });
      this.errors.push(error);
      throw error;
    }
  }

  /**
   * Configura CI/CD com validação
   */
  async setupCICDValidation() {
    logStructured('info', 'Configurando CI/CD com validação...');
    
    try {
      const cicdDir = path.join(__dirname, '..', 'cicd');
      if (!fs.existsSync(cicdDir)) {
        fs.mkdirSync(cicdDir, { recursive: true });
      }
      
      // GitHub Actions workflow
      const githubWorkflow = `name: Quality Validation

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  validate-quality:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Validate Directives
      run: npm run validate-directives
    
    - name: Run Tests
      run: npm test
    
    - name: Quality Check
      run: echo "✅ Quality validation completed"
`;

      fs.writeFileSync(path.join(cicdDir, '.github', 'workflows', 'quality-validation.yml'), githubWorkflow);
      
      this.setupSteps.push({
        step: 'setup-cicd-validation',
        status: 'success',
        message: 'CI/CD configurado com validação'
      });
      this.successCount++;
      
      logStructured('info', 'CI/CD configurado com sucesso');
      
    } catch (error) {
      this.setupSteps.push({
        step: 'setup-cicd-validation',
        status: 'error',
        message: error.message
      });
      this.errors.push(error);
      throw error;
    }
  }

  /**
   * Cria documentação de processos
   */
  async createProcessDocumentation() {
    logStructured('info', 'Criando documentação de processos...');
    
    try {
      const docsDir = path.join(__dirname, '..', 'docs', 'development');
      
      // Guia de desenvolvimento
      const developmentGuide = `# 🛠️ Guia de Desenvolvimento - Fase 2

## 📋 **Checklist de Qualidade**

### ✅ **Antes de Commitar:**
- [ ] Código segue diretivas críticas
- [ ] Documentação atualizada
- [ ] Testes passando
- [ ] Validação executada

### ✅ **Durante Code Review:**
- [ ] Verificar documentação
- [ ] Validar tratamento de erros
- [ ] Confirmar testes
- [ ] Revisar alternativas consideradas

## 🎯 **Padrões Obrigatórios**

### 📝 **Documentação:**
- Todo arquivo deve ter \`@fileoverview\`
- Funções devem ter \`@param\` e \`@returns\`
- Incluir \`@see\` para referências

### 🛡️ **Validação:**
- Implementar \`validateInput()\`
- Usar \`handleError()\` para tratamento
- Incluir \`assertCritical()\` quando necessário

### 🧪 **Testes:**
- Testes para funcionalidades críticas
- Validação de casos de erro
- Cobertura mínima de 80%

## 🚀 **Processo de Desenvolvimento**

1. **Criar branch** a partir de main
2. **Desenvolver** seguindo padrões
3. **Validar** com \`npm run validate-directives\`
4. **Testar** com \`npm test\`
5. **Fazer commit** (validação automática)
6. **Criar PR** para review
7. **Aprovar** e merge

## 📊 **Métricas de Qualidade**

- **100% conformidade** com diretivas críticas
- **Zero regressões** de qualidade
- **Tempo de correção** < 1 hora
- **Satisfação da equipe** > 90%
`;

      fs.writeFileSync(path.join(docsDir, 'guia-desenvolvimento-fase2.md'), developmentGuide);
      
      this.setupSteps.push({
        step: 'create-process-documentation',
        status: 'success',
        message: 'Documentação de processos criada'
      });
      this.successCount++;
      
      logStructured('info', 'Documentação de processos criada com sucesso');
      
    } catch (error) {
      this.setupSteps.push({
        step: 'create-process-documentation',
        status: 'error',
        message: error.message
      });
      this.errors.push(error);
      throw error;
    }
  }

  /**
   * Configura monitoramento
   */
  async setupMonitoring() {
    logStructured('info', 'Configurando monitoramento...');
    
    try {
      const monitoringDir = path.join(__dirname, '..', 'monitoring');
      if (!fs.existsSync(monitoringDir)) {
        fs.mkdirSync(monitoringDir, { recursive: true });
      }
      
      // Script de monitoramento contínuo
      const monitoringScript = `#!/usr/bin/env node

/**
 * @fileoverview Monitoramento de Qualidade - Fase 2
 * @description Monitora qualidade do projeto em tempo real
 */

const fs = require('fs');
const path = require('path');

class QualityMonitor {
  constructor() {
    this.metrics = {
      totalFiles: 0,
      qualityScore: 0,
      lastCheck: null,
      issues: []
    };
  }

  async monitorQuality() {
    try {
      // Executar validação
      const { execSync } = require('child_process');
      const output = execSync('npm run validate-directives', { encoding: 'utf8' });
      
      // Extrair métricas
      const scoreMatch = output.match(/Pontuação média: (\\d+\\.\\d+)%/);
      if (scoreMatch) {
        this.metrics.qualityScore = parseFloat(scoreMatch[1]);
      }
      
      this.metrics.lastCheck = new Date().toISOString();
      
      // Salvar métricas
      fs.writeFileSync(
        path.join(__dirname, 'quality-metrics.json'),
        JSON.stringify(this.metrics, null, 2)
      );
      
      console.log(\`✅ Qualidade monitorada: \${this.metrics.qualityScore}%\`);
      
    } catch (error) {
      console.error('❌ Erro no monitoramento:', error.message);
    }
  }
}

const monitor = new QualityMonitor();
monitor.monitorQuality();
`;

      fs.writeFileSync(path.join(monitoringDir, 'quality-monitor.js'), monitoringScript);
      fs.chmodSync(path.join(monitoringDir, 'quality-monitor.js'), '755');
      
      this.setupSteps.push({
        step: 'setup-monitoring',
        status: 'success',
        message: 'Monitoramento configurado'
      });
      this.successCount++;
      
      logStructured('info', 'Monitoramento configurado com sucesso');
      
    } catch (error) {
      this.setupSteps.push({
        step: 'setup-monitoring',
        status: 'error',
        message: error.message
      });
      this.errors.push(error);
      throw error;
    }
  }

  /**
   * Gera relatório final do setup
   */
  async generateSetupReport() {
    logStructured('info', 'Gerando relatório final...');
    
    try {
      const report = {
        timestamp: new Date().toISOString(),
        phase: 'Fase 2 - Setup',
        summary: {
          totalSteps: this.setupSteps.length,
          successfulSteps: this.successCount,
          failedSteps: this.errors.length,
          successRate: (this.successCount / this.setupSteps.length * 100).toFixed(1)
        },
        steps: this.setupSteps,
        errors: this.errors.map(e => e.message),
        recommendations: [
          'Execute npm run validate-directives regularmente',
          'Use os templates criados para novos arquivos',
          'Siga o guia de desenvolvimento',
          'Monitore métricas de qualidade'
        ]
      };

      const reportPath = path.join(__dirname, '..', 'logs', 'phase2-setup-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      // Exibir resumo
      console.log('\n📊 RELATÓRIO DE SETUP - FASE 2');
      console.log('=====================================');
      console.log(`📁 Total de passos: ${report.summary.totalSteps}`);
      console.log(`✅ Passos bem-sucedidos: ${report.summary.successfulSteps}`);
      console.log(`❌ Passos com erro: ${report.summary.failedSteps}`);
      console.log(`📈 Taxa de sucesso: ${report.summary.successRate}%`);
      console.log(`💾 Relatório salvo em: ${reportPath}`);
      
      if (report.summary.successRate === '100.0') {
        console.log('\n🎉 SETUP DA FASE 2 CONCLUÍDO COM SUCESSO!');
        console.log('🚀 Projeto pronto para adoção das diretivas críticas!');
      } else {
        console.log('\n⚠️ Setup concluído com alguns problemas. Verifique os erros.');
      }
      
      this.setupSteps.push({
        step: 'generate-setup-report',
        status: 'success',
        message: 'Relatório final gerado'
      });
      this.successCount++;
      
      logStructured('info', 'Relatório final gerado com sucesso');
      
    } catch (error) {
      this.setupSteps.push({
        step: 'generate-setup-report',
        status: 'error',
        message: error.message
      });
      this.errors.push(error);
      throw error;
    }
  }
}

// Execução principal
async function main() {
  try {
    logStructured('info', 'Iniciando execução', { context: 'main' });
    
    const setup = new Phase2Setup();
    await setup.runSetup();
    
  } catch (error) {
    handleError(error, 'main-execution');
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = Phase2Setup; 