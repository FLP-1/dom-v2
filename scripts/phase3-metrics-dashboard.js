#!/usr/bin/env node

/**
 * @fileoverview Dashboard de Métricas em Tempo Real - Fase 3
 * @author Sistema DOM v2
 * @version 3.0.0
 * @since 2025-07-26
 * 
 * @description
 * Este script implementa um dashboard de métricas em tempo real para
 * monitorar continuamente a performance do sistema de validação,
 * fornecendo insights visuais e alertas automáticos.
 * 
 * @dependencies
 * - Node.js, fs, path, os, readline, cluster
 * 
 * @usage
 * npm run phase3-dashboard
 * 
 * @see
 * - docs/phases/fase-3-evolucao-otimizacao-iniciada.md
 * - logs/phase3-benchmark-report.json
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');

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
      path.join(logsDir, 'phase3-dashboard-error-log.json'),
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
      path.join(logsDir, 'phase3-dashboard.log'),
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
 * - Phase 3 Plan: docs/phases/fase-3-evolucao-otimizacao-iniciada.md
 * - Node.js Performance Monitoring: https://nodejs.org/api/perf_hooks.html
 * - Real-time Dashboards: https://nodejs.org/en/docs/guides/performance/
 * - System Monitoring: https://nodejs.org/api/os.html
 * 
 * @alternatives
 * - Para visualização: Console, Web UI, Terminal UI
 * - Para métricas: Custom counters, Prometheus, StatsD
 * - Para alertas: Email, Slack, Webhooks
 * 
 * @considerations
 * - Performance: Monitoramento sem impacto no sistema
 * - Usabilidade: Interface clara e intuitiva
 * - Escalabilidade: Suporte a múltiplas métricas
 * - Estabilidade: Tratamento de falhas robusto
 */

/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: Dashboard em console com atualizações em tempo real
 * - Alternativa 1: Web Dashboard
 *   - Prós: Interface rica, acessível remotamente
 *   - Contras: Complexidade adicional, overhead de servidor
 * - Alternativa 2: Terminal UI (TUI)
 *   - Prós: Interface rica no terminal, interativa
 *   - Contras: Dependências externas, complexidade
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - Simplicidade e portabilidade
 * - Performance sem overhead
 * - Facilidade de manutenção
 * 
 * @trade-offs
 * - Simplicidade vs Funcionalidade
 * - Performance vs Visualização
 * - Portabilidade vs Riqueza
 */

/**
 * Coletor de métricas do sistema
 */
class SystemMetricsCollector {
  constructor() {
    this.metrics = {
      cpu: {
        usage: 0,
        cores: os.cpus().length,
        load: 0
      },
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        used: 0,
        usage: 0
      },
      disk: {
        total: 0,
        free: 0,
        used: 0,
        usage: 0
      },
      network: {
        connections: 0,
        bytesIn: 0,
        bytesOut: 0
      },
      process: {
        uptime: 0,
        memoryUsage: 0,
        cpuUsage: 0
      }
    };
    
    this.history = [];
    this.maxHistorySize = 100;
    
    logStructured('info', 'Coletor de métricas inicializado');
  }

  /**
   * Coleta métricas atuais do sistema
   */
  collectMetrics() {
    try {
      const now = Date.now();
      
      // Métricas de CPU
      const cpus = os.cpus();
      let totalIdle = 0;
      let totalTick = 0;
      
      cpus.forEach(cpu => {
        for (const type in cpu.times) {
          totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
      });
      
      const idle = totalIdle / cpus.length;
      const total = totalTick / cpus.length;
      const usage = 100 - (100 * idle / total);
      
      this.metrics.cpu.usage = Math.round(usage * 100) / 100;
      this.metrics.cpu.load = os.loadavg()[0];
      
      // Métricas de memória
      const freeMem = os.freemem();
      const totalMem = os.totalmem();
      const usedMem = totalMem - freeMem;
      
      this.metrics.memory.free = freeMem;
      this.metrics.memory.used = usedMem;
      this.metrics.memory.usage = Math.round((usedMem / totalMem) * 100 * 100) / 100;
      
      // Métricas de processo
      const processUsage = process.memoryUsage();
      this.metrics.process.memoryUsage = processUsage.heapUsed;
      this.metrics.process.uptime = process.uptime();
      
      // Adicionar à história
      this.history.push({
        timestamp: now,
        metrics: JSON.parse(JSON.stringify(this.metrics))
      });
      
      // Manter apenas histórico recente
      if (this.history.length > this.maxHistorySize) {
        this.history.shift();
      }
      
      return this.metrics;
      
    } catch (error) {
      handleError(error, 'metrics-collection');
      return this.metrics;
    }
  }

  /**
   * Obtém métricas atuais
   * @returns {object} - Métricas atuais
   */
  getCurrentMetrics() {
    return this.collectMetrics();
  }

  /**
   * Obtém histórico de métricas
   * @param {number} minutes - Minutos de histórico
   * @returns {array} - Histórico de métricas
   */
  getHistory(minutes = 10) {
    try {
      const cutoff = Date.now() - (minutes * 60 * 1000);
      return this.history.filter(entry => entry.timestamp >= cutoff);
    } catch (error) {
      handleError(error, 'history-retrieval');
      return [];
    }
  }

  /**
   * Calcula tendências das métricas
   * @returns {object} - Tendências calculadas
   */
  calculateTrends() {
    try {
      if (this.history.length < 2) {
        return { cpu: 0, memory: 0, performance: 0 };
      }
      
      const recent = this.history.slice(-5);
      const older = this.history.slice(-10, -5);
      
      if (recent.length === 0 || older.length === 0) {
        return { cpu: 0, memory: 0, performance: 0 };
      }
      
      const recentAvg = {
        cpu: recent.reduce((sum, entry) => sum + entry.metrics.cpu.usage, 0) / recent.length,
        memory: recent.reduce((sum, entry) => sum + entry.metrics.memory.usage, 0) / recent.length
      };
      
      const olderAvg = {
        cpu: older.reduce((sum, entry) => sum + entry.metrics.cpu.usage, 0) / older.length,
        memory: older.reduce((sum, entry) => sum + entry.metrics.memory.usage, 0) / older.length
      };
      
      return {
        cpu: Math.round((recentAvg.cpu - olderAvg.cpu) * 100) / 100,
        memory: Math.round((recentAvg.memory - olderAvg.memory) * 100) / 100,
        performance: Math.round(((olderAvg.cpu + olderAvg.memory) - (recentAvg.cpu + recentAvg.memory)) * 100) / 100
      };
      
    } catch (error) {
      handleError(error, 'trend-calculation');
      return { cpu: 0, memory: 0, performance: 0 };
    }
  }
}

/**
 * Sistema de alertas
 */
class AlertSystem {
  constructor() {
    this.alerts = [];
    this.thresholds = {
      cpu: 80, // 80% de uso de CPU
      memory: 85, // 85% de uso de memória
      performance: -10 // Degradação de 10%
    };
    
    logStructured('info', 'Sistema de alertas inicializado');
  }

  /**
   * Verifica métricas e gera alertas
   * @param {object} metrics - Métricas atuais
   * @param {object} trends - Tendências calculadas
   * @returns {array} - Alertas gerados
   */
  checkAlerts(metrics, trends) {
    try {
      const newAlerts = [];
      const now = Date.now();
      
      // Verificar CPU
      if (metrics.cpu.usage > this.thresholds.cpu) {
        newAlerts.push({
          level: 'warning',
          message: `CPU usage high: ${metrics.cpu.usage}%`,
          timestamp: now,
          metric: 'cpu',
          value: metrics.cpu.usage
        });
      }
      
      // Verificar memória
      if (metrics.memory.usage > this.thresholds.memory) {
        newAlerts.push({
          level: 'critical',
          message: `Memory usage critical: ${metrics.memory.usage}%`,
          timestamp: now,
          metric: 'memory',
          value: metrics.memory.usage
        });
      }
      
      // Verificar tendência de performance
      if (trends.performance < this.thresholds.performance) {
        newAlerts.push({
          level: 'warning',
          message: `Performance degrading: ${trends.performance}%`,
          timestamp: now,
          metric: 'performance',
          value: trends.performance
        });
      }
      
      // Adicionar novos alertas
      this.alerts.push(...newAlerts);
      
      // Manter apenas alertas recentes (últimas 24 horas)
      const dayAgo = now - (24 * 60 * 60 * 1000);
      this.alerts = this.alerts.filter(alert => alert.timestamp >= dayAgo);
      
      return newAlerts;
      
    } catch (error) {
      handleError(error, 'alert-checking');
      return [];
    }
  }

  /**
   * Obtém alertas ativos
   * @returns {array} - Alertas ativos
   */
  getActiveAlerts() {
    return this.alerts.filter(alert => {
      const age = Date.now() - alert.timestamp;
      return age < (5 * 60 * 1000); // Alertas dos últimos 5 minutos
    });
  }

  /**
   * Limpa alertas antigos
   */
  cleanupOldAlerts() {
    try {
      const dayAgo = Date.now() - (24 * 60 * 60 * 1000);
      this.alerts = this.alerts.filter(alert => alert.timestamp >= dayAgo);
    } catch (error) {
      handleError(error, 'alert-cleanup');
    }
  }
}

/**
 * Renderizador do dashboard
 */
class DashboardRenderer {
  constructor() {
    this.lastRender = 0;
    this.renderInterval = 1000; // 1 segundo
  }

  /**
   * Limpa a tela do console
   */
  clearScreen() {
    try {
      // Limpar tela (funciona na maioria dos terminais)
      process.stdout.write('\x1Bc');
    } catch (error) {
      // Fallback: apenas quebras de linha
      console.log('\n'.repeat(50));
    }
  }

  /**
   * Renderiza barra de progresso
   * @param {number} value - Valor atual
   * @param {number} max - Valor máximo
   * @param {number} width - Largura da barra
   * @returns {string} - Barra de progresso
   */
  renderProgressBar(value, max, width = 20) {
    try {
      const percentage = Math.min(value / max, 1);
      const filled = Math.round(percentage * width);
      const empty = width - filled;
      
      const filledChar = '█';
      const emptyChar = '░';
      
      return filledChar.repeat(filled) + emptyChar.repeat(empty);
    } catch (error) {
      return '░'.repeat(width);
    }
  }

  /**
   * Renderiza métricas do sistema
   * @param {object} metrics - Métricas atuais
   * @param {object} trends - Tendências
   * @param {array} alerts - Alertas ativos
   */
  renderDashboard(metrics, trends, alerts) {
    try {
      this.clearScreen();
      
      const now = new Date().toLocaleString('pt-BR');
      
      console.log('╔══════════════════════════════════════════════════════════════════════════════╗');
      console.log('║                    📊 DASHBOARD DE MÉTRICAS - DOM v2                        ║');
      console.log('║                              Sistema de Validação                           ║');
      console.log('╠══════════════════════════════════════════════════════════════════════════════╣');
      console.log(`║ 📅 ${now.padEnd(75)} ║`);
      console.log('╚══════════════════════════════════════════════════════════════════════════════╝');
      console.log();
      
      // Seção de métricas do sistema
      console.log('🔧 MÉTRICAS DO SISTEMA');
      console.log('─'.repeat(80));
      
      // CPU
      const cpuBar = this.renderProgressBar(metrics.cpu.usage, 100);
      const cpuTrend = trends.cpu > 0 ? `↗️ +${trends.cpu}%` : trends.cpu < 0 ? `↘️ ${trends.cpu}%` : '→ 0%';
      console.log(`CPU Usage:     ${cpuBar} ${metrics.cpu.usage.toString().padStart(5)}% ${cpuTrend}`);
      console.log(`CPU Cores:     ${metrics.cpu.cores} cores`);
      console.log(`Load Average:  ${metrics.cpu.load.toFixed(2)}`);
      console.log();
      
      // Memória
      const memBar = this.renderProgressBar(metrics.memory.usage, 100);
      const memTrend = trends.memory > 0 ? `↗️ +${trends.memory}%` : trends.memory < 0 ? `↘️ ${trends.memory}%` : '→ 0%';
      const memUsedGB = (metrics.memory.used / (1024 * 1024 * 1024)).toFixed(1);
      const memTotalGB = (metrics.memory.total / (1024 * 1024 * 1024)).toFixed(1);
      console.log(`Memory Usage:  ${memBar} ${metrics.memory.usage.toString().padStart(5)}% ${memTrend}`);
      console.log(`Memory Used:   ${memUsedGB}GB / ${memTotalGB}GB`);
      console.log();
      
      // Processo
      const processMemMB = (metrics.process.memoryUsage / (1024 * 1024)).toFixed(1);
      const uptimeHours = (metrics.process.uptime / 3600).toFixed(1);
      console.log(`Process Memory: ${processMemMB}MB`);
      console.log(`Process Uptime: ${uptimeHours}h`);
      console.log();
      
      // Seção de alertas
      if (alerts.length > 0) {
        console.log('🚨 ALERTAS ATIVOS');
        console.log('─'.repeat(80));
        
        alerts.forEach((alert, index) => {
          const icon = alert.level === 'critical' ? '🔴' : '🟡';
          const time = new Date(alert.timestamp).toLocaleTimeString('pt-BR');
          console.log(`${icon} ${alert.message} (${time})`);
        });
        console.log();
      }
      
      // Seção de performance
      console.log('📈 TENDÊNCIAS DE PERFORMANCE');
      console.log('─'.repeat(80));
      
      const perfTrend = trends.performance > 0 ? '↗️ Melhorando' : trends.performance < 0 ? '↘️ Degradando' : '→ Estável';
      console.log(`Performance:   ${perfTrend} (${trends.performance}%)`);
      console.log();
      
      // Seção de comandos
      console.log('⌨️  COMANDOS DISPONÍVEIS');
      console.log('─'.repeat(80));
      console.log('q - Sair do dashboard');
      console.log('r - Atualizar métricas');
      console.log('h - Histórico detalhado');
      console.log('a - Alertas completos');
      console.log('s - Salvar relatório');
      console.log();
      
      console.log('─'.repeat(80));
      
    } catch (error) {
      handleError(error, 'dashboard-rendering');
      console.log('Erro ao renderizar dashboard');
    }
  }

  /**
   * Renderiza histórico detalhado
   * @param {array} history - Histórico de métricas
   */
  renderHistory(history) {
    try {
      this.clearScreen();
      
      console.log('📊 HISTÓRICO DETALHADO DE MÉTRICAS');
      console.log('─'.repeat(80));
      console.log('Timestamp           | CPU % | Memory % | Load Avg');
      console.log('─'.repeat(80));
      
      history.slice(-20).forEach(entry => {
        const time = new Date(entry.timestamp).toLocaleTimeString('pt-BR');
        const cpu = entry.metrics.cpu.usage.toFixed(1);
        const memory = entry.metrics.memory.usage.toFixed(1);
        const load = entry.metrics.cpu.load.toFixed(2);
        
        console.log(`${time.padEnd(18)} | ${cpu.padStart(5)} | ${memory.padStart(8)} | ${load.padStart(8)}`);
      });
      
      console.log();
      console.log('Pressione qualquer tecla para voltar ao dashboard...');
      
    } catch (error) {
      handleError(error, 'history-rendering');
    }
  }
}

/**
 * Dashboard principal
 */
class MetricsDashboard {
  constructor() {
    this.collector = new SystemMetricsCollector();
    this.alerts = new AlertSystem();
    this.renderer = new DashboardRenderer();
    this.isRunning = false;
    this.updateInterval = null;
    
    logStructured('info', 'Dashboard de métricas inicializado');
  }

  /**
   * Inicia o dashboard
   */
  async start() {
    try {
      this.isRunning = true;
      
      logStructured('info', 'Iniciando dashboard de métricas');
      
      // Configurar interface de entrada
      this.setupInputHandling();
      
      // Iniciar atualizações automáticas
      this.startAutoUpdate();
      
      // Primeira renderização
      await this.updateAndRender();
      
      console.log('Dashboard iniciado. Pressione "q" para sair.');
      
    } catch (error) {
      handleError(error, 'dashboard-start');
    }
  }

  /**
   * Para o dashboard
   */
  stop() {
    try {
      this.isRunning = false;
      
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
        this.updateInterval = null;
      }
      
      logStructured('info', 'Dashboard de métricas finalizado');
      
    } catch (error) {
      handleError(error, 'dashboard-stop');
    }
  }

  /**
   * Configura tratamento de entrada do usuário
   */
  setupInputHandling() {
    try {
      // Configurar modo raw para capturar teclas individuais
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      
      process.stdin.on('data', async (key) => {
        switch (key) {
          case 'q':
          case '\u0003': // Ctrl+C
            this.stop();
            process.exit(0);
            break;
            
          case 'r':
            await this.updateAndRender();
            break;
            
          case 'h':
            this.renderer.renderHistory(this.collector.getHistory());
            break;
            
          case 'a':
            this.showAllAlerts();
            break;
            
          case 's':
            await this.saveReport();
            break;
        }
      });
      
    } catch (error) {
      handleError(error, 'input-handling-setup');
    }
  }

  /**
   * Inicia atualizações automáticas
   */
  startAutoUpdate() {
    try {
      this.updateInterval = setInterval(async () => {
        if (this.isRunning) {
          await this.updateAndRender();
        }
      }, 2000); // Atualizar a cada 2 segundos
      
    } catch (error) {
      handleError(error, 'auto-update-start');
    }
  }

  /**
   * Atualiza métricas e renderiza dashboard
   */
  async updateAndRender() {
    try {
      // Coletar métricas
      const metrics = this.collector.getCurrentMetrics();
      
      // Calcular tendências
      const trends = this.collector.calculateTrends();
      
      // Verificar alertas
      const newAlerts = this.alerts.checkAlerts(metrics, trends);
      const activeAlerts = this.alerts.getActiveAlerts();
      
      // Renderizar dashboard
      this.renderer.renderDashboard(metrics, trends, activeAlerts);
      
      // Log de novos alertas
      if (newAlerts.length > 0) {
        newAlerts.forEach(alert => {
          logStructured(alert.level, alert.message, {
            metric: alert.metric,
            value: alert.value
          });
        });
      }
      
    } catch (error) {
      handleError(error, 'update-and-render');
    }
  }

  /**
   * Mostra todos os alertas
   */
  showAllAlerts() {
    try {
      this.renderer.clearScreen();
      
      console.log('🚨 TODOS OS ALERTAS (Últimas 24 horas)');
      console.log('─'.repeat(80));
      
      if (this.alerts.alerts.length === 0) {
        console.log('Nenhum alerta registrado.');
      } else {
        this.alerts.alerts.forEach((alert, index) => {
          const icon = alert.level === 'critical' ? '🔴' : '🟡';
          const time = new Date(alert.timestamp).toLocaleString('pt-BR');
          console.log(`${index + 1}. ${icon} ${alert.message} (${time})`);
        });
      }
      
      console.log();
      console.log('Pressione qualquer tecla para voltar ao dashboard...');
      
    } catch (error) {
      handleError(error, 'show-all-alerts');
    }
  }

  /**
   * Salva relatório de métricas
   */
  async saveReport() {
    try {
      const report = {
        timestamp: new Date().toISOString(),
        metrics: this.collector.getCurrentMetrics(),
        trends: this.collector.calculateTrends(),
        alerts: this.alerts.alerts,
        history: this.collector.getHistory(60) // Última hora
      };
      
      const reportPath = path.join(__dirname, '..', 'logs', 'phase3-dashboard-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      console.log(`\n💾 Relatório salvo em: ${reportPath}`);
      
      // Aguardar 2 segundos antes de continuar
      setTimeout(() => {
        if (this.isRunning) {
          this.updateAndRender();
        }
      }, 2000);
      
    } catch (error) {
      handleError(error, 'report-saving');
    }
  }
}

// Execução principal
async function main() {
  try {
    logStructured('info', 'Iniciando dashboard de métricas', { context: 'main' });
    
    const dashboard = new MetricsDashboard();
    
    // Configurar tratamento de saída
    process.on('SIGINT', () => {
      console.log('\n\nFinalizando dashboard...');
      dashboard.stop();
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      console.log('\n\nFinalizando dashboard...');
      dashboard.stop();
      process.exit(0);
    });
    
    // Iniciar dashboard
    await dashboard.start();
    
  } catch (error) {
    handleError(error, 'main-execution');
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { 
  SystemMetricsCollector, 
  AlertSystem, 
  DashboardRenderer, 
  MetricsDashboard 
}; 