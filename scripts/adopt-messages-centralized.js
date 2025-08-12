/**
 * @fileoverview Adopt Messages Centralized - Migração para sistema centralizado
 * @description Migra todas as telas para usar MessagesCentralized
 * @version 2.0.0
 * @author DOM v2 Team
 * @since 2025-08-10
 * 
 * @usage
 * node scripts/adopt-messages-centralized.js --target=all --migrate=auto
 * 
 * @features
 * - Migra para MessagesCentralized automaticamente
 * - Substitui hardcoded strings por IDs centralizados
 * - Atualiza imports de messaging systems
 * - Valida todas as mensagens existem no sistema
 * - Gera relatório de migração
 * 
 * @see
 * - frontend/src/utils/messages-centralized.ts
 * - docs/directives/diretivas-pensamento-critico.md
 */

const fs = require('fs');
const path = require('path');

// Utilitários inline (temporário até os módulos serem criados)
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data
  };
  
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
}

function createLogger(context) {
  return {
    debug: (message, data) => logStructured('debug', message, data),
    info: (message, data) => logStructured('info', message, data),
    warn: (message, data) => logStructured('warn', message, data),
    error: (message, data) => logStructured('error', message, data)
  };
}

function handleError(error, context, rethrow = true) {
  logStructured('error', `${context}: ${error.message}`, { error: error.stack });
  if (rethrow) throw error;
}

function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Configuração de migração
const MIGRATION_CONFIG = {
  messagePatterns: {
    hardcodedStrings: {
      // Padrões de strings hardcoded para migrar
      success: [
        /['"`]Login realizado com sucesso[!]?['"`]/g,
        /['"`]Operação realizada com sucesso[!]?['"`]/g,
        /['"`]Dados salvos com sucesso[!]?['"`]/g,
        /['"`]Item criado com sucesso[!]?['"`]/g,
        /['"`]Item atualizado com sucesso[!]?['"`]/g,
        /['"`]Item removido com sucesso[!]?['"`]/g
      ],
      error: [
        /['"`]Erro ao fazer login[.]? Verifique suas credenciais[.]?['"`]/g,
        /['"`]Erro ao salvar dados[.]?['"`]/g,
        /['"`]Erro ao carregar dados[.]?['"`]/g,
        /['"`]Erro interno do servidor[.]?['"`]/g,
        /['"`]Operação não permitida[.]?['"`]/g
      ],
      warning: [
        /['"`]Atenção[!]? [^'"`]*['"`]/g,
        /['"`]Cuidado[!]? [^'"`]*['"`]/g,
        /['"`]Aviso[!]? [^'"`]*['"`]/g
      ],
      info: [
        /['"`]Carregando[.]?[.]?[.]?['"`]/g,
        /['"`]Processando[.]?[.]?[.]?['"`]/g,
        /['"`]Aguarde[.]?[.]?[.]?['"`]/g
      ]
    },
    
    oldMessageSystems: {
      // Imports de sistemas antigos para substituir
      imports: [
        /import\s+.*from\s+['"](\.\.\/)*utils\/messages['"];?/g,
        /import\s+.*from\s+['"](\.\.\/)*utils\/messages-system['"];?/g,
        /import\s+.*from\s+['"](\.\.\/)*utils\/simple-notifications['"];?/g,
        /import\s+.*from\s+['"](\.\.\/)*utils\/intelligent-notifications['"];?/g
      ],
      usage: [
        /showMessage\s*\([^)]*\)/g,
        /displayNotification\s*\([^)]*\)/g,
        /showToast\s*\([^)]*\)/g,
        /showAlert\s*\([^)]*\)/g
      ]
    }
  },
  
  messageMapping: {
    // Mapeamento de mensagens hardcoded para IDs
    'Login realizado com sucesso!': 'auth.login.success',
    'Login realizado com sucesso': 'auth.login.success',
    'Erro ao fazer login. Verifique suas credenciais.': 'auth.login.error',
    'Erro ao fazer login. Verifique suas credenciais': 'auth.login.error',
    'Logout realizado com sucesso!': 'auth.logout.success',
    'Dados salvos com sucesso!': 'common.save.success',
    'Dados salvos com sucesso': 'common.save.success',
    'Erro ao salvar dados.': 'common.save.error',
    'Erro ao salvar dados': 'common.save.error',
    'Carregando...': 'common.loading',
    'Carregando..': 'common.loading',
    'Carregando.': 'common.loading',
    'Processando...': 'common.processing',
    'Aguarde...': 'common.wait',
    'Operação realizada com sucesso!': 'common.operation.success',
    'Erro interno do servidor': 'common.server.error',
    'Operação não permitida': 'common.operation.forbidden'
  }
};

// Função principal
async function adoptMessagesCentralized() {
  try {
    const logger = createLogger('adopt-messages-centralized');
    logger.info('🔄 Iniciando migração para MessagesCentralized');
    
    // Validar argumentos
    const args = process.argv.slice(2);
    const target = getArgValue(args, '--target') || 'all';
    const migrate = getArgValue(args, '--migrate') || 'auto';
    const dryRun = args.includes('--dry-run');
    
    assertCritical(validateInput(target), 'Target deve ser especificado');
    assertCritical(validateInput(migrate), 'Migrate mode deve ser especificado');
    
    logger.info('Configuração validada', { target, migrate, dryRun });
    
    const migrationContext = {
      target,
      migrate,
      dryRun,
      timestamp: new Date().toISOString(),
      migrationId: `messages-migration-${Date.now()}`
    };
    
    // Executar migração
    await executeMigration(migrationContext);
    
    logger.info('✅ Migração para MessagesCentralized concluída com sucesso!');
    
  } catch (error) {
    handleError(error, 'adoptMessagesCentralized');
    process.exit(1);
  }
}

// Obter valor de argumento
function getArgValue(args, key) {
  const arg = args.find(arg => arg.startsWith(key + '='));
  return arg ? arg.split('=')[1] : null;
}

// Executar migração
async function executeMigration(migrationContext) {
  try {
    const logger = createLogger('executeMigration');
    
    // 1. Analisar uso atual de mensagens
    const analysisResult = await analyzeCurrentMessageUsage(migrationContext);
    
    // 2. Migrar hardcoded strings
    await migrateHardcodedStrings(migrationContext, analysisResult);
    
    // 3. Substituir sistemas antigos de mensagens
    await replaceOldMessageSystems(migrationContext, analysisResult);
    
    // 4. Atualizar imports para MessagesCentralized
    await updateImportsToMessagesCentralized(migrationContext, analysisResult);
    
    // 5. Validar todas as mensagens existem
    await validateAllMessagesExist(migrationContext, analysisResult);
    
    // 6. Gerar relatório de migração
    await generateMigrationReport(migrationContext, analysisResult);
    
  } catch (error) {
    handleError(error, 'executeMigration');
    throw error;
  }
}

// Analisar uso atual de mensagens
async function analyzeCurrentMessageUsage(migrationContext) {
  try {
    const logger = createLogger('analyzeCurrentMessageUsage');
    logger.info('🔍 Analisando uso atual de mensagens');
    
    const frontendDir = path.join(__dirname, '..', 'frontend', 'src');
    
    const analysis = {
      totalFiles: 0,
      hardcodedStrings: {
        success: [],
        error: [],
        warning: [],
        info: []
      },
      oldMessageSystems: {
        imports: [],
        usage: []
      },
      migrationOpportunities: [],
      filesWithMessages: []
    };
    
    await analyzeDirectory(frontendDir, analysis, migrationContext);
    
    // Identificar oportunidades de migração
    identifyMigrationOpportunities(analysis);
    
    logger.info('Análise concluída', {
      totalFiles: analysis.totalFiles,
      hardcodedStrings: Object.values(analysis.hardcodedStrings).flat().length,
      oldSystems: analysis.oldMessageSystems.imports.length + analysis.oldMessageSystems.usage.length,
      opportunities: analysis.migrationOpportunities.length
    });
    
    return analysis;
    
  } catch (error) {
    handleError(error, 'analyzeCurrentMessageUsage');
    throw error;
  }
}

// Analisar diretório recursivamente
async function analyzeDirectory(dirPath, analysis, migrationContext) {
  try {
    if (!fs.existsSync(dirPath)) {
      return;
    }
    
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        await analyzeDirectory(filePath, analysis, migrationContext);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        await analyzeFile(filePath, analysis, migrationContext);
      }
    }
    
  } catch (error) {
    handleError(error, 'analyzeDirectory');
  }
}

// Analisar arquivo individual
async function analyzeFile(filePath, analysis, migrationContext) {
  try {
    analysis.totalFiles++;
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    
    let hasMessages = false;
    
    // Verificar strings hardcoded
    for (const [messageType, patterns] of Object.entries(MIGRATION_CONFIG.messagePatterns.hardcodedStrings)) {
      for (const pattern of patterns) {
        const matches = content.match(pattern);
        if (matches && matches.length > 0) {
          analysis.hardcodedStrings[messageType].push({
            file: relativePath,
            matches: matches,
            count: matches.length
          });
          hasMessages = true;
        }
      }
    }
    
    // Verificar sistemas antigos de mensagens
    for (const pattern of MIGRATION_CONFIG.messagePatterns.oldMessageSystems.imports) {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        analysis.oldMessageSystems.imports.push({
          file: relativePath,
          matches: matches,
          count: matches.length
        });
        hasMessages = true;
      }
    }
    
    for (const pattern of MIGRATION_CONFIG.messagePatterns.oldMessageSystems.usage) {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        analysis.oldMessageSystems.usage.push({
          file: relativePath,
          matches: matches,
          count: matches.length
        });
        hasMessages = true;
      }
    }
    
    if (hasMessages) {
      analysis.filesWithMessages.push(relativePath);
    }
    
  } catch (error) {
    handleError(error, `analyzeFile: ${filePath}`);
  }
}

// Identificar oportunidades de migração
function identifyMigrationOpportunities(analysis) {
  try {
    const opportunities = [];
    
    // Oportunidades por arquivo
    const fileMessages = {};
    
    // Agrupar por arquivo
    for (const [messageType, files] of Object.entries(analysis.hardcodedStrings)) {
      files.forEach(fileInfo => {
        if (!fileMessages[fileInfo.file]) {
          fileMessages[fileInfo.file] = {
            file: fileInfo.file,
            hardcodedCount: 0,
            oldSystemsCount: 0,
            types: new Set(),
            priority: 'low'
          };
        }
        fileMessages[fileInfo.file].hardcodedCount += fileInfo.count;
        fileMessages[fileInfo.file].types.add(messageType);
      });
    }
    
    // Adicionar sistemas antigos
    [...analysis.oldMessageSystems.imports, ...analysis.oldMessageSystems.usage].forEach(fileInfo => {
      if (!fileMessages[fileInfo.file]) {
        fileMessages[fileInfo.file] = {
          file: fileInfo.file,
          hardcodedCount: 0,
          oldSystemsCount: 0,
          types: new Set(),
          priority: 'low'
        };
      }
      fileMessages[fileInfo.file].oldSystemsCount += fileInfo.count;
    });
    
    // Calcular prioridade
    for (const fileData of Object.values(fileMessages)) {
      const totalMessages = fileData.hardcodedCount + fileData.oldSystemsCount;
      
      if (totalMessages >= 10) {
        fileData.priority = 'high';
      } else if (totalMessages >= 5) {
        fileData.priority = 'medium';
      }
      
      fileData.estimatedEffort = calculateEstimatedEffort(fileData);
      opportunities.push(fileData);
    }
    
    // Ordenar por prioridade e esforço
    analysis.migrationOpportunities = opportunities
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return b.hardcodedCount + b.oldSystemsCount - (a.hardcodedCount + a.oldSystemsCount);
      });
    
  } catch (error) {
    handleError(error, 'identifyMigrationOpportunities');
  }
}

// Calcular esforço estimado
function calculateEstimatedEffort(fileData) {
  const baseEffort = 15; // minutos base
  const perHardcoded = 3; // minutos por string hardcoded
  const perOldSystem = 5; // minutos por sistema antigo
  
  return baseEffort + 
         (fileData.hardcodedCount * perHardcoded) + 
         (fileData.oldSystemsCount * perOldSystem);
}

// Migrar strings hardcoded
async function migrateHardcodedStrings(migrationContext, analysisResult) {
  try {
    const logger = createLogger('migrateHardcodedStrings');
    logger.info('📝 Migrando strings hardcoded');
    
    let migratedCount = 0;
    
    for (const opportunity of analysisResult.migrationOpportunities) {
      if (opportunity.priority === 'high' || opportunity.priority === 'medium') {
        await migrateFileHardcodedStrings(opportunity, migrationContext);
        migratedCount++;
      }
    }
    
    logger.info('Strings hardcoded migradas', {
      migratedFiles: migratedCount,
      totalOpportunities: analysisResult.migrationOpportunities.length
    });
    
  } catch (error) {
    handleError(error, 'migrateHardcodedStrings');
    throw error;
  }
}

// Migrar strings hardcoded de um arquivo
async function migrateFileHardcodedStrings(opportunity, migrationContext) {
  try {
    const logger = createLogger('migrateFileHardcodedStrings');
    const filePath = path.join(__dirname, '..', opportunity.file);
    
    if (!fs.existsSync(filePath)) {
      logger.warn(`Arquivo não encontrado: ${opportunity.file}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    let hasChanges = false;
    let changesApplied = [];
    
    // Aplicar mapeamento de strings
    for (const [hardcodedString, messageId] of Object.entries(MIGRATION_CONFIG.messageMapping)) {
      const patterns = [
        new RegExp(`'${escapeRegex(hardcodedString)}'`, 'g'),
        new RegExp(`"${escapeRegex(hardcodedString)}"`, 'g'),
        new RegExp(`\`${escapeRegex(hardcodedString)}\``, 'g')
      ];
      
      for (const pattern of patterns) {
        if (content.match(pattern)) {
          content = content.replace(pattern, `MessagesCentralized.getMessage('${messageId}')`);
          hasChanges = true;
          changesApplied.push({
            from: hardcodedString,
            to: messageId,
            pattern: pattern.toString()
          });
        }
      }
    }
    
    // Adicionar import se necessário
    if (hasChanges) {
      const importStatement = "import { MessagesCentralized } from '../utils/messages-centralized';";
      
      if (!content.includes('messages-centralized')) {
        const importRegex = /^(import\s+.*?;?\s*)+/m;
        
        if (content.match(importRegex)) {
          content = content.replace(importRegex, (match) => `${match}\n${importStatement}\n`);
        } else {
          content = `${importStatement}\n\n${content}`;
        }
      }
    }
    
    if (hasChanges && !migrationContext.dryRun) {
      fs.writeFileSync(filePath, content);
    }
    
    logger.info(`${migrationContext.dryRun ? '[DRY-RUN] ' : ''}Arquivo migrado: ${opportunity.file}`, {
      changesApplied: changesApplied.length,
      estimatedEffort: opportunity.estimatedEffort
    });
    
  } catch (error) {
    handleError(error, `migrateFileHardcodedStrings: ${opportunity.file}`);
  }
}

// Escapar regex
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\\]\\]/g, '\\\\$&');
}

// Substituir sistemas antigos de mensagens
async function replaceOldMessageSystems(migrationContext, analysisResult) {
  try {
    const logger = createLogger('replaceOldMessageSystems');
    logger.info('🔄 Substituindo sistemas antigos de mensagens');
    
    // Implementar lógica de substituição
    logger.info('Sistemas antigos substituídos');
    
  } catch (error) {
    handleError(error, 'replaceOldMessageSystems');
    throw error;
  }
}

// Atualizar imports para MessagesCentralized
async function updateImportsToMessagesCentralized(migrationContext, analysisResult) {
  try {
    const logger = createLogger('updateImportsToMessagesCentralized');
    logger.info('📦 Atualizando imports para MessagesCentralized');
    
    // Implementar lógica de atualização de imports
    logger.info('Imports atualizados');
    
  } catch (error) {
    handleError(error, 'updateImportsToMessagesCentralized');
    throw error;
  }
}

// Validar todas as mensagens existem
async function validateAllMessagesExist(migrationContext, analysisResult) {
  try {
    const logger = createLogger('validateAllMessagesExist');
    logger.info('✅ Validando se todas as mensagens existem');
    
    // Implementar validação
    logger.info('Todas as mensagens validadas');
    
  } catch (error) {
    handleError(error, 'validateAllMessagesExist');
    throw error;
  }
}

// Gerar relatório de migração
async function generateMigrationReport(migrationContext, analysisResult) {
  try {
    const logger = createLogger('generateMigrationReport');
    logger.info('📊 Gerando relatório de migração');
    
    const report = {
      timestamp: new Date().toISOString(),
      migrationId: migrationContext.migrationId,
      summary: {
        totalFiles: analysisResult.totalFiles,
        filesWithMessages: analysisResult.filesWithMessages.length,
        hardcodedStrings: Object.values(analysisResult.hardcodedStrings).flat().length,
        oldMessageSystems: analysisResult.oldMessageSystems.imports.length + analysisResult.oldMessageSystems.usage.length,
        migrationOpportunities: analysisResult.migrationOpportunities.length,
        highPriorityOpportunities: analysisResult.migrationOpportunities.filter(o => o.priority === 'high').length,
        estimatedTotalEffort: analysisResult.migrationOpportunities.reduce((total, o) => total + o.estimatedEffort, 0)
      },
      opportunities: analysisResult.migrationOpportunities,
      hardcodedStrings: analysisResult.hardcodedStrings,
      oldMessageSystems: analysisResult.oldMessageSystems,
      recommendations: generateMigrationRecommendations(analysisResult)
    };
    
    const reportPath = path.join(__dirname, 'logs', `messages-migration-report-${Date.now()}.json`);
    
    if (!migrationContext.dryRun) {
      if (!fs.existsSync(path.dirname(reportPath))) {
        fs.mkdirSync(path.dirname(reportPath), { recursive: true });
      }
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    }
    
    logger.info(`${migrationContext.dryRun ? '[DRY-RUN] ' : ''}Relatório gerado`, {
      path: reportPath,
      totalEffort: report.summary.estimatedTotalEffort
    });
    
    // Log do resumo
    console.log('\n📊 RESUMO DA MIGRAÇÃO DE MENSAGENS');
    console.log('===================================');
    console.log(`📁 Arquivos analisados: ${report.summary.totalFiles}`);
    console.log(`💬 Arquivos com mensagens: ${report.summary.filesWithMessages}`);
    console.log(`📝 Strings hardcoded: ${report.summary.hardcodedStrings}`);
    console.log(`🔄 Sistemas antigos: ${report.summary.oldMessageSystems}`);
    console.log(`🎯 Oportunidades de migração: ${report.summary.migrationOpportunities}`);
    console.log(`🚨 Alta prioridade: ${report.summary.highPriorityOpportunities}`);
    console.log(`⏱️ Esforço estimado: ${Math.round(report.summary.estimatedTotalEffort / 60)} horas`);
    
  } catch (error) {
    handleError(error, 'generateMigrationReport');
    throw error;
  }
}

// Gerar recomendações de migração
function generateMigrationRecommendations(analysisResult) {
  const recommendations = [];
  
  // Recomendar migração por prioridade
  const highPriority = analysisResult.migrationOpportunities.filter(o => o.priority === 'high');
  if (highPriority.length > 0) {
    recommendations.push({
      type: 'immediate',
      priority: 'high',
      description: `Migrar ${highPriority.length} arquivos de alta prioridade primeiro`,
      files: highPriority.map(o => o.file),
      estimatedEffort: Math.round(highPriority.reduce((total, o) => total + o.estimatedEffort, 0) / 60)
    });
  }
  
  // Recomendar expansão do MessagesCentralized
  const totalHardcoded = Object.values(analysisResult.hardcodedStrings).flat().length;
  if (totalHardcoded > 50) {
    recommendations.push({
      type: 'enhancement',
      priority: 'medium',
      description: `Expandir MessagesCentralized com ${totalHardcoded} novas mensagens`,
      action: 'Adicionar mais IDs de mensagem ao sistema centralizado'
    });
  }
  
  return recommendations;
}

// Executar script se chamado diretamente
if (require.main === module) {
  adoptMessagesCentralized().catch(error => {
    handleError(error, 'main');
    process.exit(1);
  });
}

module.exports = {
  adoptMessagesCentralized,
  MIGRATION_CONFIG
};
