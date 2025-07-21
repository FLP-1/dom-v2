/**
 * @fileoverview Script de Dashboard Avançado - Fase 5
 * @directory dashboard
 * @description Sistema de monitoramento avançado em tempo real
 * @created 2024-12-19
 * @lastModified 2025-07-21
 * @author DOM v2 Team
 */

const DashboardInterface = require('./dashboard-interface');
const fs = require('fs');
const path = require('path');

class DashboardManager {
  constructor() {
    this.interface = new DashboardInterface();
    this.isRunning = false;
    this.commands = {
      'r': () => this.generateReport(),
      'h': () => this.showHistory(),
      'p': () => this.showPerformance(),
      'a': () => this.showAlerts(),
      'm': () => this.showMetrics(),
      's': () => this.saveSnapshot(),
      'help': () => this.showHelp()
    };
  }

  start() {
    console.log('🚀 Iniciando Dashboard Manager Avançado...');
    this.isRunning = true;
    this.interface.start();
    
    // Configurar entrada de comandos
    this.setupCommandInput();
    
    // Configurar tratamento de interrupção
    process.on('SIGINT', () => {
      console.log('\n🛑 Parando dashboard...');
      this.stop();
      process.exit(0);
    });
    
    // Configurar tratamento de erros
    process.on('uncaughtException', (error) => {
      console.error('❌ Erro não tratado:', error.message);
      this.logError(error);
    });
  }

  setupCommandInput() {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.on('line', (input) => {
      const command = input.trim().toLowerCase();
      
      if (this.commands[command]) {
        this.commands[command]();
      } else if (command === 'quit' || command === 'exit') {
        this.stop();
        rl.close();
        process.exit(0);
      } else if (command !== '') {
        console.log('❓ Comando não reconhecido. Digite "help" para ver comandos disponíveis.');
      }
    });
  }

  stop() {
    this.isRunning = false;
    this.interface.stop();
    this.saveFinalReport();
  }

  generateReport() {
    console.log('\n📊 GERANDO RELATÓRIO DETALHADO...');
    console.log('==================================');
    
    const report = this.interface.generateReport();
    
    // Salvar relatório
    const reportPath = path.join(__dirname, '..', 'logs', 'dashboard-report.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('📋 RELATÓRIO DETALHADO:');
    console.log('=======================');
    console.log(`📅 Data/Hora: ${new Date().toLocaleString('pt-BR')}`);
    console.log(`⏱️  Tempo de execução: ${report.uptime}`);
    console.log(`📊 Progresso geral: ${report.totalProgress.toFixed(1)}%`);
    console.log('');
    
    console.log('🎯 MÉTRICAS:');
    Object.entries(report.metrics).forEach(([key, metric]) => {
      if (typeof metric === 'object' && metric.current !== undefined) {
        const percentage = Math.round((metric.current / metric.target) * 100);
        console.log(`  ${key}: ${metric.current}% / ${metric.target}% (${percentage}%)`);
      }
    });
    
    console.log('');
    console.log('⚡ PERFORMANCE:');
    console.log(`  CPU: ${report.performance.cpu.toFixed(1)}%`);
    console.log(`  Memória: ${report.performance.memory.toFixed(1)}%`);
    console.log(`  Response Time: ${report.performance.responseTime.toFixed(0)}ms`);
    
    console.log('');
    console.log('🚨 ALERTAS:');
    if (report.alerts.length > 0) {
      report.alerts.forEach(alert => {
        console.log(`  ${alert.message} (${alert.value})`);
      });
    } else {
      console.log('  Nenhum alerta ativo');
    }
    
    console.log(`\n💾 Relatório salvo: logs/dashboard-report.json`);
  }

  showHistory() {
    console.log('\n📚 HISTÓRICO DE ATUALIZAÇÕES:');
    console.log('==============================');
    
    try {
      const configPath = path.join(__dirname, '..', 'phase5-config.json');
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        
        if (config.history && config.history.length > 0) {
          const recentHistory = config.history.slice(-10); // Últimas 10 entradas
          
          recentHistory.forEach((entry, index) => {
            const date = new Date(entry.timestamp).toLocaleString('pt-BR');
            console.log(`${index + 1}. ${date} - ${entry.type}`);
            
            if (entry.correctionsApplied) {
              console.log(`   🔧 ${entry.correctionsApplied} correções aplicadas`);
            }
            if (entry.automationProgress) {
              console.log(`   🤖 Automação: ${entry.automationProgress}%`);
            }
            if (entry.productivityProgress) {
              console.log(`   📈 Produtividade: ${entry.productivityProgress}%`);
            }
            console.log('');
          });
        } else {
          console.log('  Nenhum histórico disponível');
        }
      }
    } catch (error) {
      console.log('  Erro ao carregar histórico:', error.message);
    }
  }

  showPerformance() {
    console.log('\n⚡ DADOS DE PERFORMANCE:');
    console.log('========================');
    
    try {
      const performancePath = path.join(__dirname, '..', 'logs', 'performance-data.json');
      if (fs.existsSync(performancePath)) {
        const performanceData = JSON.parse(fs.readFileSync(performancePath, 'utf8'));
        
        const cpuData = performanceData.cpu.slice(-20);
        const memoryData = performanceData.memory.slice(-20);
        const responseData = performanceData.responseTime.slice(-20);
        
        console.log('📊 Últimos 20 pontos de dados:');
        console.log('CPU (%) | Memória (%) | Response Time (ms)');
        console.log('--------|-------------|-------------------');
        
        for (let i = 0; i < Math.min(20, cpuData.length); i++) {
          const cpu = cpuData[i]?.value?.toFixed(1) || 'N/A';
          const memory = memoryData[i]?.value?.toFixed(1) || 'N/A';
          const response = responseData[i]?.value?.toFixed(0) || 'N/A';
          
          console.log(`${cpu.padStart(7)} | ${memory.padStart(11)} | ${response.padStart(17)}`);
        }
      } else {
        console.log('  Dados de performance não encontrados');
      }
    } catch (error) {
      console.log('  Erro ao carregar dados de performance:', error.message);
    }
  }

  showAlerts() {
    console.log('\n🚨 ALERTAS ATIVOS:');
    console.log('==================');
    
    const report = this.interface.generateReport();
    
    if (report.alerts.length > 0) {
      report.alerts.forEach((alert, index) => {
        const time = new Date(alert.timestamp).toLocaleTimeString('pt-BR');
        const icon = this.getAlertIcon(alert.level);
        console.log(`${index + 1}. ${icon} ${alert.message}`);
        console.log(`   Valor: ${alert.value} | Hora: ${time}`);
        console.log('');
      });
    } else {
      console.log('  Nenhum alerta ativo no momento');
    }
  }

  showMetrics() {
    console.log('\n📊 MÉTRICAS DETALHADAS:');
    console.log('=======================');
    
    const report = this.interface.generateReport();
    
    Object.entries(report.metrics).forEach(([key, metric]) => {
      if (typeof metric === 'object' && metric.current !== undefined) {
        const percentage = Math.round((metric.current / metric.target) * 100);
        const bar = this.createProgressBar(percentage, 20);
        
        let status = '🔴';
        if (percentage >= 100) status = '🟢';
        else if (percentage >= 80) status = '🟠';
        else if (percentage >= 50) status = '🟡';
        
        console.log(`${status} ${key.toUpperCase()}: ${metric.current}% / ${metric.target}% ${bar} ${percentage}%`);
      }
    });
  }

  saveSnapshot() {
    console.log('\n📸 SALVANDO SNAPSHOT...');
    
    const snapshot = {
      timestamp: new Date().toISOString(),
      metrics: this.interface.generateReport(),
      performance: this.interface.performanceData
    };
    
    const snapshotPath = path.join(__dirname, '..', 'logs', `snapshot-${Date.now()}.json`);
    const snapshotDir = path.dirname(snapshotPath);
    
    if (!fs.existsSync(snapshotDir)) {
      fs.mkdirSync(snapshotDir, { recursive: true });
    }
    
    fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2));
    
    console.log(`✅ Snapshot salvo: ${path.basename(snapshotPath)}`);
  }

  showHelp() {
    console.log('\n💡 COMANDOS DISPONÍVEIS:');
    console.log('========================');
    console.log('  r     - Gerar relatório detalhado');
    console.log('  h     - Mostrar histórico de atualizações');
    console.log('  p     - Mostrar dados de performance');
    console.log('  a     - Mostrar alertas ativos');
    console.log('  m     - Mostrar métricas detalhadas');
    console.log('  s     - Salvar snapshot atual');
    console.log('  help  - Mostrar esta ajuda');
    console.log('  quit  - Sair do dashboard');
    console.log('  exit  - Sair do dashboard');
    console.log('');
  }

  getAlertIcon(level) {
    const icons = {
      critical: '🚨',
      warning: '⚠️',
      success: '✅',
      info: 'ℹ️'
    };
    return icons[level] || 'ℹ️';
  }

  createProgressBar(percentage, length) {
    const filled = Math.round((percentage / 100) * length);
    const empty = length - filled;
    
    let bar = '';
    for (let i = 0; i < filled; i++) {
      bar += '█';
    }
    for (let i = 0; i < empty; i++) {
      bar += '░';
    }
    
    return `[${bar}]`;
  }

  logError(error) {
    try {
      const errorLogPath = path.join(__dirname, '..', 'logs', 'dashboard-errors.log');
      const errorLogDir = path.dirname(errorLogPath);
      
      if (!fs.existsSync(errorLogDir)) {
        fs.mkdirSync(errorLogDir, { recursive: true });
      }
      
      const errorEntry = {
        timestamp: new Date().toISOString(),
        error: error.message,
        stack: error.stack
      };
      
      fs.appendFileSync(errorLogPath, JSON.stringify(errorEntry) + '\n');
    } catch (logError) {
      console.error('Erro ao salvar log de erro:', logError.message);
    }
  }

  saveFinalReport() {
    try {
      const finalReport = this.interface.generateReport();
      finalReport.final = true;
      finalReport.sessionEnd = new Date().toISOString();
      
      const finalReportPath = path.join(__dirname, '..', 'logs', `final-report-${Date.now()}.json`);
      const finalReportDir = path.dirname(finalReportPath);
      
      if (!fs.existsSync(finalReportDir)) {
        fs.mkdirSync(finalReportDir, { recursive: true });
      }
      
      fs.writeFileSync(finalReportPath, JSON.stringify(finalReport, null, 2));
      console.log(`📊 Relatório final salvo: ${path.basename(finalReportPath)}`);
    } catch (error) {
      console.error('Erro ao salvar relatório final:', error.message);
    }
  }

  getMetrics() {
    return this.interface.generateReport();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const manager = new DashboardManager();
  manager.start();
}

module.exports = DashboardManager;
