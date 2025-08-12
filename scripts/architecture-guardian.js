#!/usr/bin/env node

/**
 * 🛡️ GUARDIÃO ARQUITETURAL - DOM v2
 * 
 * Sistema de monitoramento contínuo que:
 * - Monitora mudanças em tempo real
 * - Alerta violações imediatamente
 * - Bloqueia commits não conformes
 * - Envia notificações para a equipe
 */

const fs = require('fs');
const path = require('path');
const { validateArchitecture } = require('./validate-architecture');

class ArchitectureGuardian {
  constructor() {
    this.violations = [];
    this.lastCheck = Date.now();
    this.isMonitoring = false;
  }

  // 🚨 MONITORAMENTO EM TEMPO REAL
  startMonitoring() {
    if (this.isMonitoring) {
      console.log('🛡️ Guardião Arquitetural já está ativo');
      return;
    }

    console.log('🛡️ INICIANDO GUARDIÃO ARQUITETURAL');
    console.log('👁️  Monitorando arquivos em tempo real...');
    
    this.isMonitoring = true;
    
    // Monitorar mudanças nos arquivos
    const watchPaths = [
      'frontend/src/screens',
      'frontend/src/hooks', 
      'frontend/src/services'
    ];

    watchPaths.forEach(watchPath => {
      if (fs.existsSync(watchPath)) {
        fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
          if (filename && (filename.endsWith('.tsx') || filename.endsWith('.ts'))) {
            console.log(`📝 Arquivo modificado: ${filename}`);
            this.validateChanges(path.join(watchPath, filename));
          }
        });
      }
    });

    // Verificação periódica
    setInterval(() => {
      this.periodicCheck();
    }, 30000); // A cada 30 segundos
  }

  // ✅ VALIDAR MUDANÇAS ESPECÍFICAS
  async validateChanges(filePath) {
    try {
      const success = validateArchitecture();
      
      if (!success) {
        this.handleViolation(filePath);
      } else {
        this.handleSuccess(filePath);
      }
    } catch (error) {
      console.error('❌ Erro na validação:', error.message);
    }
  }

  // 🚨 TRATAR VIOLAÇÃO
  handleViolation(filePath) {
    const violation = {
      file: filePath,
      timestamp: new Date().toISOString(),
      type: 'architecture_violation'
    };

    this.violations.push(violation);
    
    console.log('\\n🚨 VIOLAÇÃO ARQUITETURAL DETECTADA!');
    console.log(`📁 Arquivo: ${filePath}`);
    console.log(`⏰ Horário: ${new Date().toLocaleString()}`);
    
    // Alertas escalados
    this.sendAlert(violation);
    
    // Bloquear se for commit
    if (process.env.GIT_COMMIT) {
      console.log('🛑 COMMIT BLOQUEADO - Corrija as violações primeiro');
      process.exit(1);
    }
  }

  // ✅ TRATAR SUCESSO
  handleSuccess(filePath) {
    console.log(`✅ ${path.basename(filePath)} está conforme`);
  }

  // 📨 ENVIAR ALERTAS
  sendAlert(violation) {
    // Alerta no console (desenvolvimento)
    console.log('\\n📢 ALERTA PARA A EQUIPE:');
    console.log('🔧 Ação necessária: Revisar e corrigir violação arquitetural');
    console.log('📖 Consulte: docs/architecture/FRAMEWORK_DECISAO_ARQUITETURAL.md');
    
    // TODO: Integrar com Slack/Teams/Email em produção
    // this.sendSlackAlert(violation);
    // this.sendEmailAlert(violation);
  }

  // 🔄 VERIFICAÇÃO PERIÓDICA
  periodicCheck() {
    const now = Date.now();
    const timeSinceLastCheck = now - this.lastCheck;
    
    if (timeSinceLastCheck > 60000) { // 1 minuto
      console.log('🔍 Verificação periódica da arquitetura...');
      validateArchitecture();
      this.lastCheck = now;
    }
  }

  // 📊 GERAR RELATÓRIO
  generateReport() {
    console.log('\\n📊 RELATÓRIO DO GUARDIÃO ARQUITETURAL');
    console.log('=====================================');
    console.log(`Total de violações: ${this.violations.length}`);
    console.log(`Última verificação: ${new Date(this.lastCheck).toLocaleString()}`);
    console.log(`Status: ${this.isMonitoring ? '🟢 Ativo' : '🔴 Inativo'}`);
    
    if (this.violations.length > 0) {
      console.log('\\n🚨 Violações recentes:');
      this.violations.slice(-5).forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.file} - ${new Date(violation.timestamp).toLocaleString()}`);
      });
    }
    
    console.log('\\n💡 Recomendações:');
    console.log('- Execute: npm run validate-architecture');
    console.log('- Consulte: docs/architecture/FRAMEWORK_DECISAO_ARQUITETURAL.md');
    console.log('- Use templates: npm run generate:screen -- --name MinhaScreen');
  }

  // 🛑 PARAR MONITORAMENTO
  stopMonitoring() {
    this.isMonitoring = false;
    console.log('🛡️ Guardião Arquitetural parado');
  }
}

// 🚀 EXECUÇÃO
if (require.main === module) {
  const guardian = new ArchitectureGuardian();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
      guardian.startMonitoring();
      break;
    case 'report':
      guardian.generateReport();
      break;
    case 'stop':
      guardian.stopMonitoring();
      break;
    default:
      console.log('🛡️ GUARDIÃO ARQUITETURAL - DOM v2');
      console.log('');
      console.log('Comandos disponíveis:');
      console.log('  start   - Iniciar monitoramento');
      console.log('  report  - Gerar relatório');
      console.log('  stop    - Parar monitoramento');
      console.log('');
      console.log('Exemplos:');
      console.log('  npm run architecture-guardian start');
      console.log('  npm run architecture-guardian report');
  }
}

module.exports = ArchitectureGuardian;
