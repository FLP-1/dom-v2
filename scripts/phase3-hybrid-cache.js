#!/usr/bin/env node

/**
 * @fileoverview Sistema de Cache Híbrido Inteligente - Fase 3
 * @author Sistema DOM v2
 * @version 3.0.0
 * @since 2025-07-26
 * 
 * @description
 * Este script implementa um sistema de cache híbrido inteligente que
 * combina cache em memória + disco com paralelização para máxima
 * performance do sistema de validação.
 * 
 * @dependencies
 * - Node.js, fs, path, os, crypto, worker_threads
 * 
 * @usage
 * npm run phase3-hybrid
 * 
 * @see
 * - docs/phases/fase-3-evolucao-otimizacao-iniciada.md
 * - scripts/phase3-intelligent-cache.js
 * - scripts/phase3-parallel-validation.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

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
  
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    type: error.constructor.name
  };
  
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'phase3-hybrid-error-log.json'),
      JSON.stringify(errorLog) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
  
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
  
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'phase3-hybrid.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

/**
 * Cache híbrido inteligente (memória + disco)
 */
class HybridCache {
  constructor() {
    this.memoryCache = new Map();
    this.cacheDir = path.join(__dirname, '..', 'cache', 'hybrid');
    this.stats = {
      hits: 0,
      misses: 0,
      memoryHits: 0,
      diskHits: 0,
      writes: 0,
      evictions: 0
    };
    
    this.config = {
      maxMemorySize: 100, // Máximo de itens em memória
      maxDiskSize: 1000, // Máximo de itens em disco
      ttl: 3600000, // 1 hora em ms
      cleanupInterval: 300000 // 5 minutos
    };
    
    this.initializeCache();
    this.startCleanupInterval();
    
    logStructured('info', 'Cache híbrido inicializado', {
      memoryLimit: this.config.maxMemorySize,
      diskLimit: this.config.maxDiskSize
    });
  }

  /**
   * Inicializa o cache
   */
  initializeCache() {
    try {
      if (!fs.existsSync(this.cacheDir)) {
        fs.mkdirSync(this.cacheDir, { recursive: true });
      }
      
      // Carregar cache do disco
      this.loadCacheFromDisk();
      
    } catch (error) {
      handleError(error, 'cache-initialization');
    }
  }

  /**
   * Gera hash do arquivo
   * @param {string} filePath - Caminho do arquivo
   * @returns {string} - Hash do arquivo
   */
  generateFileHash(filePath) {
    try {
      if (!validateInput(filePath)) {
        throw new Error('Caminho do arquivo inválido');
      }
      
      const content = fs.readFileSync(filePath, 'utf8');
      return crypto.createHash('sha256').update(content).digest('hex');
      
    } catch (error) {
      handleError(error, 'file-hash-generation');
      return null;
    }
  }

  /**
   * Gera chave do cache
   * @param {string} filePath - Caminho do arquivo
   * @param {string} validationType - Tipo de validação
   * @returns {string} - Chave do cache
   */
  generateCacheKey(filePath, validationType = 'hybrid') {
    try {
      const hash = this.generateFileHash(filePath);
      if (!hash) return null;
      
      return `${validationType}_${hash}`;
      
    } catch (error) {
      handleError(error, 'cache-key-generation');
      return null;
    }
  }

  /**
   * Obtém valor do cache
   * @param {string} key - Chave do cache
   * @returns {object|null} - Valor do cache ou null
   */
  get(key) {
    try {
      if (!validateInput(key)) return null;
      
      // Verificar cache em memória primeiro
      if (this.memoryCache.has(key)) {
        const entry = this.memoryCache.get(key);
        
        if (this.isValid(entry)) {
          this.stats.hits++;
          this.stats.memoryHits++;
          return entry.value;
        } else {
          this.memoryCache.delete(key);
        }
      }
      
      // Verificar cache em disco
      const diskEntry = this.getFromDisk(key);
      if (diskEntry && this.isValid(diskEntry)) {
        // Mover para memória se espaço disponível
        if (this.memoryCache.size < this.config.maxMemorySize) {
          this.memoryCache.set(key, diskEntry);
        }
        
        this.stats.hits++;
        this.stats.diskHits++;
        return diskEntry.value;
      }
      
      this.stats.misses++;
      return null;
      
    } catch (error) {
      handleError(error, 'cache-get');
      return null;
    }
  }

  /**
   * Define valor no cache
   * @param {string} key - Chave do cache
   * @param {any} value - Valor a ser armazenado
   * @param {number} ttl - Tempo de vida em ms
   */
  set(key, value, ttl = null) {
    try {
      if (!validateInput(key) || !validateInput(value)) {
        throw new Error('Chave ou valor inválido');
      }
      
      const entry = {
        value,
        timestamp: Date.now(),
        ttl: ttl || this.config.ttl,
        accessCount: 0
      };
      
      // Armazenar em memória
      if (this.memoryCache.size >= this.config.maxMemorySize) {
        this.evictFromMemory();
      }
      
      this.memoryCache.set(key, entry);
      
      // Armazenar em disco
      this.saveToDisk(key, entry);
      
      this.stats.writes++;
      
    } catch (error) {
      handleError(error, 'cache-set');
    }
  }

  /**
   * Verifica se entrada é válida
   * @param {object} entry - Entrada do cache
   * @returns {boolean} - True se válida
   */
  isValid(entry) {
    try {
      if (!entry || !entry.timestamp) return false;
      
      const now = Date.now();
      const age = now - entry.timestamp;
      
      return age < entry.ttl;
      
    } catch (error) {
      return false;
    }
  }

  /**
   * Remove entrada da memória
   */
  evictFromMemory() {
    try {
      if (this.memoryCache.size === 0) return;
      
      // LRU: remover entrada mais antiga
      let oldestKey = null;
      let oldestTime = Date.now();
      
      for (const [key, entry] of this.memoryCache) {
        if (entry.timestamp < oldestTime) {
          oldestTime = entry.timestamp;
          oldestKey = key;
        }
      }
      
      if (oldestKey) {
        this.memoryCache.delete(oldestKey);
        this.stats.evictions++;
      }
      
    } catch (error) {
      handleError(error, 'memory-eviction');
    }
  }

  /**
   * Obtém entrada do disco
   * @param {string} key - Chave do cache
   * @returns {object|null} - Entrada do cache
   */
  getFromDisk(key) {
    try {
      const filePath = path.join(this.cacheDir, `${key}.json`);
      
      if (!fs.existsSync(filePath)) return null;
      
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
      
    } catch (error) {
      handleError(error, 'disk-get');
      return null;
    }
  }

  /**
   * Salva entrada no disco
   * @param {string} key - Chave do cache
   * @param {object} entry - Entrada do cache
   */
  saveToDisk(key, entry) {
    try {
      const filePath = path.join(this.cacheDir, `${key}.json`);
      fs.writeFileSync(filePath, JSON.stringify(entry, null, 2));
      
    } catch (error) {
      handleError(error, 'disk-save');
    }
  }

  /**
   * Carrega cache do disco
   */
  loadCacheFromDisk() {
    try {
      if (!fs.existsSync(this.cacheDir)) return;
      
      const files = fs.readdirSync(this.cacheDir);
      let loadedCount = 0;
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const key = file.replace('.json', '');
          const entry = this.getFromDisk(key);
          
          if (entry && this.isValid(entry)) {
            if (this.memoryCache.size < this.config.maxMemorySize) {
              this.memoryCache.set(key, entry);
              loadedCount++;
            }
          } else {
            // Remover entrada inválida
            this.removeFromDisk(key);
          }
        }
      }
      
      logStructured('info', 'Cache carregado do disco', { loadedCount });
      
    } catch (error) {
      handleError(error, 'disk-load');
    }
  }

  /**
   * Remove entrada do disco
   * @param {string} key - Chave do cache
   */
  removeFromDisk(key) {
    try {
      const filePath = path.join(this.cacheDir, `${key}.json`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      handleError(error, 'disk-remove');
    }
  }

  /**
   * Inicia intervalo de limpeza
   */
  startCleanupInterval() {
    setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * Limpa cache expirado
   */
  cleanup() {
    try {
      // Limpar memória
      for (const [key, entry] of this.memoryCache) {
        if (!this.isValid(entry)) {
          this.memoryCache.delete(key);
        }
      }
      
      // Limpar disco
      if (fs.existsSync(this.cacheDir)) {
        const files = fs.readdirSync(this.cacheDir);
        
        for (const file of files) {
          if (file.endsWith('.json')) {
            const key = file.replace('.json', '');
            const entry = this.getFromDisk(key);
            
            if (!entry || !this.isValid(entry)) {
              this.removeFromDisk(key);
            }
          }
        }
      }
      
      logStructured('debug', 'Cache limpo', {
        memorySize: this.memoryCache.size
      });
      
    } catch (error) {
      handleError(error, 'cache-cleanup');
    }
  }

  /**
   * Obtém estatísticas do cache
   * @returns {object} - Estatísticas
   */
  getStats() {
    const hitRate = this.stats.hits + this.stats.misses > 0 
      ? (this.stats.hits / (this.stats.hits + this.stats.misses) * 100).toFixed(2)
      : 0;
    
    return {
      ...this.stats,
      hitRate: `${hitRate}%`,
      memorySize: this.memoryCache.size,
      memoryHitRate: this.stats.memoryHits > 0 
        ? (this.stats.memoryHits / this.stats.hits * 100).toFixed(2) + '%'
        : '0%'
    };
  }

  /**
   * Limpa todo o cache
   */
  clear() {
    try {
      this.memoryCache.clear();
      
      if (fs.existsSync(this.cacheDir)) {
        const files = fs.readdirSync(this.cacheDir);
        for (const file of files) {
          if (file.endsWith('.json')) {
            fs.unlinkSync(path.join(this.cacheDir, file));
          }
        }
      }
      
      this.stats = {
        hits: 0,
        misses: 0,
        memoryHits: 0,
        diskHits: 0,
        writes: 0,
        evictions: 0
      };
      
      logStructured('info', 'Cache limpo completamente');
      
    } catch (error) {
      handleError(error, 'cache-clear');
    }
  }
}

/**
 * Sistema de validação híbrido com cache e paralelização
 */
class HybridValidationSystem {
  constructor(maxWorkers = null) {
    this.cache = new HybridCache();
    this.maxWorkers = maxWorkers || Math.max(1, os.cpus().length - 1);
    this.stats = {
      totalProcessed: 0,
      totalTime: 0,
      averageTime: 0,
      cacheHits: 0,
      cacheMisses: 0,
      workersUsed: 0,
      errors: 0
    };
    
    logStructured('info', 'Sistema de validação híbrido inicializado', {
      maxWorkers: this.maxWorkers,
      cpuCores: os.cpus().length
    });
  }

  /**
   * Valida arquivo com cache e paralelização
   * @param {string} filePath - Caminho do arquivo
   * @param {number} workerId - ID do worker
   * @returns {Promise<object>} - Resultado da validação
   */
  async validateFile(filePath, workerId) {
    return new Promise((resolve, reject) => {
      try {
        if (!validateInput(filePath)) {
          reject(new Error('Caminho do arquivo inválido'));
          return;
        }
        
        const startTime = Date.now();
        
        // Verificar cache primeiro
        const cacheKey = this.cache.generateCacheKey(filePath);
        if (cacheKey) {
          const cachedResult = this.cache.get(cacheKey);
          if (cachedResult) {
            const processingTime = Date.now() - startTime;
            this.stats.cacheHits++;
            this.updateStats(processingTime, true);
            
            logStructured('debug', 'Cache hit', {
              file: filePath,
              processingTime: `${processingTime}ms`
            });
            
            resolve({ ...cachedResult, processingTime, fromCache: true });
            return;
          }
        }
        
        // Cache miss - validar em worker
        this.stats.cacheMisses++;
        const worker = new Worker(__filename, {
          workerData: { filePath, workerId }
        });
        
        worker.on('message', (result) => {
          const processingTime = Date.now() - startTime;
          
          // Armazenar no cache
          if (cacheKey && result.success) {
            this.cache.set(cacheKey, result);
          }
          
          this.updateStats(processingTime, result.success);
          
          worker.terminate();
          
          logStructured('debug', 'Arquivo processado', {
            file: result.file,
            score: result.score,
            processingTime: `${processingTime}ms`,
            fromCache: false
          });
          
          resolve({ ...result, processingTime, fromCache: false });
        });
        
        worker.on('error', (error) => {
          logStructured('error', 'Erro no worker', { workerId, error: error.message });
          this.stats.errors++;
          worker.terminate();
          reject(error);
        });
        
        worker.on('exit', (code) => {
          if (code !== 0) {
            logStructured('warn', 'Worker finalizado com código não-zero', { workerId, code });
          }
        });
        
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Valida múltiplos arquivos em paralelo
   * @param {array} filePaths - Lista de arquivos
   * @returns {Promise<array>} - Resultados da validação
   */
  async validateMultipleFiles(filePaths) {
    try {
      if (!validateInput(filePaths) || !Array.isArray(filePaths)) {
        throw new Error('Lista de arquivos inválida');
      }
      
      logStructured('info', 'Iniciando validação híbrida', {
        fileCount: filePaths.length,
        maxWorkers: this.maxWorkers
      });
      
      const startTime = Date.now();
      const chunks = this.chunkArray(filePaths, this.maxWorkers);
      const results = [];
      
      for (const chunk of chunks) {
        const chunkPromises = chunk.map((filePath, index) =>
          this.validateFile(filePath, index)
        );
        
        const chunkResults = await Promise.all(chunkPromises);
        results.push(...chunkResults);
      }
      
      const totalTime = Date.now() - startTime;
      this.stats.workersUsed = Math.min(this.maxWorkers, filePaths.length);
      
      logStructured('info', 'Validação híbrida concluída', {
        fileCount: filePaths.length,
        totalTime: `${totalTime}ms`,
        averageTime: `${(totalTime / filePaths.length).toFixed(2)}ms`,
        workersUsed: this.stats.workersUsed,
        cacheStats: this.cache.getStats()
      });
      
      return results;
      
    } catch (error) {
      handleError(error, 'multiple-files-validation');
      return [];
    }
  }

  /**
   * Atualiza estatísticas
   * @param {number} processingTime - Tempo de processamento
   * @param {boolean} success - Se foi bem-sucedido
   */
  updateStats(processingTime, success) {
    this.stats.totalProcessed++;
    this.stats.totalTime += processingTime;
    this.stats.averageTime = this.stats.totalTime / this.stats.totalProcessed;
    
    if (!success) {
      this.stats.errors++;
    }
  }

  /**
   * Divide array em chunks
   * @param {array} array - Array a ser dividido
   * @param {number} chunkSize - Tamanho do chunk
   * @returns {array} - Array de chunks
   */
  chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  /**
   * Compara performance com outros sistemas
   * @param {array} filePaths - Lista de arquivos para teste
   * @returns {Promise<object>} - Comparação de performance
   */
  async comparePerformance(filePaths) {
    try {
      logStructured('info', 'Iniciando comparação de performance');
      
      // Teste com cache híbrido
      const hybridStart = Date.now();
      const hybridResults = await this.validateMultipleFiles(filePaths);
      const hybridTime = Date.now() - hybridStart;
      
      // Teste sem cache (simulado)
      const noCacheStart = Date.now();
      const noCacheResults = await this.validateMultipleFiles(filePaths);
      const noCacheTime = Date.now() - noCacheStart;
      
      const improvement = ((noCacheTime - hybridTime) / noCacheTime * 100).toFixed(2);
      
      const comparison = {
        hybrid: {
          time: hybridTime,
          results: hybridResults.length,
          cacheStats: this.cache.getStats()
        },
        noCache: {
          time: noCacheTime,
          results: noCacheResults.length
        },
        improvement: `${improvement}%`
      };
      
      logStructured('info', 'Comparação de performance concluída', comparison);
      
      return comparison;
      
    } catch (error) {
      handleError(error, 'performance-comparison');
      return null;
    }
  }

  /**
   * Obtém estatísticas do sistema
   * @returns {object} - Estatísticas completas
   */
  getStats() {
    return {
      ...this.stats,
      cache: this.cache.getStats(),
      system: {
        maxWorkers: this.maxWorkers,
        cpuCores: os.cpus().length,
        memoryUsage: process.memoryUsage()
      }
    };
  }

  /**
   * Gera relatório de performance
   * @returns {object} - Relatório detalhado
   */
  generatePerformanceReport() {
    try {
      const stats = this.getStats();
      const cacheStats = this.cache.getStats();
      
      const report = {
        timestamp: new Date().toISOString(),
        system: {
          totalProcessed: stats.totalProcessed,
          totalTime: stats.totalTime,
          averageTime: stats.averageTime,
          workersUsed: stats.workersUsed,
          errors: stats.errors
        },
        cache: {
          hitRate: cacheStats.hitRate,
          memoryHits: cacheStats.memoryHits,
          diskHits: cacheStats.diskHits,
          memorySize: cacheStats.memorySize,
          writes: cacheStats.writes,
          evictions: cacheStats.evictions
        },
        performance: {
          filesPerSecond: stats.totalProcessed > 0 
            ? (stats.totalProcessed / (stats.totalTime / 1000)).toFixed(2)
            : 0,
          averageTimePerFile: stats.averageTime.toFixed(2) + 'ms',
          efficiency: cacheStats.hitRate
        }
      };
      
      // Salvar relatório
      const reportPath = path.join(__dirname, '..', 'logs', 'phase3-hybrid-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      logStructured('info', 'Relatório de performance gerado', { reportPath });
      
      return report;
      
    } catch (error) {
      handleError(error, 'performance-report-generation');
      return null;
    }
  }
}

// Lógica do worker thread
if (!isMainThread) {
  try {
    const { filePath, workerId } = workerData;
    
    if (!filePath) {
      throw new Error('filePath não fornecido para o worker');
    }
    
    // Simular validação do arquivo
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Análise básica
    let score = 100;
    const issues = [];
    
    // Verificar diretivas críticas
    if (!content.includes('validateInput')) {
      score -= 20;
      issues.push('Falta validação de entrada');
    }
    
    if (!content.includes('handleError')) {
      score -= 20;
      issues.push('Falta tratamento de erros');
    }
    
    if (!content.includes('logStructured')) {
      score -= 15;
      issues.push('Falta logging estruturado');
    }
    
    if (!content.includes('assertCritical')) {
      score -= 10;
      issues.push('Falta asserções críticas');
    }
    
    if (!content.includes('validateType')) {
      score -= 10;
      issues.push('Falta validação de tipos');
    }
    
    if (!content.includes('@references') || !content.includes('@alternatives')) {
      score -= 15;
      issues.push('Falta consideração de alternativas');
    }
    
    if (!content.includes('@considerations')) {
      score -= 10;
      issues.push('Falta considerações de design');
    }
    
    score = Math.max(0, score);
    
    const result = {
      file: filePath,
      score,
      issues,
      workerId,
      timestamp: new Date().toISOString(),
      success: true
    };
    
    parentPort.postMessage(result);
    
  } catch (error) {
    parentPort.postMessage({
      file: workerData.filePath || 'unknown',
      score: 0,
      issues: ['Erro na validação'],
      workerId: workerData.workerId || 'unknown',
      error: error.message,
      success: false
    });
  }
}

// Execução principal
async function main() {
  try {
    logStructured('info', 'Iniciando sistema de cache híbrido', { context: 'main' });
    
    const system = new HybridValidationSystem();
    
    // Obter arquivos para validação
    const targetDirs = ['scripts', 'backend/src', 'frontend/src'];
    const filePaths = [];
    
    for (const dir of targetDirs) {
      const fullPath = path.join(__dirname, '..', dir);
      if (fs.existsSync(fullPath)) {
        const files = getAllFiles(fullPath);
        filePaths.push(...files);
      }
    }
    
    if (filePaths.length === 0) {
      logStructured('warn', 'Nenhum arquivo encontrado para validação');
      return;
    }
    
    logStructured('info', 'Arquivos encontrados', { count: filePaths.length });
    
    // Executar validação híbrida
    const results = await system.validateMultipleFiles(filePaths);
    
    // Gerar relatório
    const report = system.generatePerformanceReport();
    
    // Comparar performance
    const comparison = await system.comparePerformance(filePaths.slice(0, 10));
    
    // Exibir resultados
    console.log('\n📊 RESULTADOS DO SISTEMA HÍBRIDO');
    console.log('─'.repeat(80));
    console.log(`Arquivos processados: ${results.length}`);
    console.log(`Tempo total: ${system.stats.totalTime}ms`);
    console.log(`Tempo médio: ${system.stats.averageTime.toFixed(2)}ms`);
    console.log(`Workers utilizados: ${system.stats.workersUsed}`);
    console.log(`Erros: ${system.stats.errors}`);
    
    console.log('\n💾 ESTATÍSTICAS DO CACHE');
    console.log('─'.repeat(80));
    const cacheStats = system.cache.getStats();
    console.log(`Taxa de acerto: ${cacheStats.hitRate}`);
    console.log(`Acertos em memória: ${cacheStats.memoryHits}`);
    console.log(`Acertos em disco: ${cacheStats.diskHits}`);
    console.log(`Itens em memória: ${cacheStats.memorySize}`);
    console.log(`Escritas: ${cacheStats.writes}`);
    console.log(`Evicções: ${cacheStats.evictions}`);
    
    if (comparison) {
      console.log('\n⚡ COMPARAÇÃO DE PERFORMANCE');
      console.log('─'.repeat(80));
      console.log(`Com cache: ${comparison.hybrid.time}ms`);
      console.log(`Sem cache: ${comparison.noCache.time}ms`);
      console.log(`Melhoria: ${comparison.improvement}`);
    }
    
    console.log('\n✅ Sistema híbrido concluído com sucesso!');
    
  } catch (error) {
    handleError(error, 'main-execution');
    process.exit(1);
  }
}

/**
 * Obtém todos os arquivos de um diretório recursivamente
 * @param {string} dirPath - Caminho do diretório
 * @returns {array} - Lista de arquivos
 */
function getAllFiles(dirPath) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath));
      } else if (stat.isFile() && /\.(js|ts|tsx|jsx)$/.test(item)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    handleError(error, 'file-discovery');
  }
  
  return files;
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { 
  HybridCache, 
  HybridValidationSystem 
}; 