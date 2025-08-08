
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


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

// Aplicar asserções críticas
assertCritical(data !== null, 'Dados não podem ser null');
assertCritical(typeof data === 'object', 'Dados devem ser um objeto');
assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');

#!/usr/bin/env node

/**
 * @fileoverview Script para análise e identificação de arquivos obsoletos
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-06
 * 
 * @description
 * Este script analisa o projeto DOM v2 para identificar arquivos obsoletos,
 * duplicados ou fora de uso, movendo-os para um diretório de "lixo" temporário.
 * 
 * @dependencies
 * - fs (Node.js built-in)
 * - path (Node.js built-in)
 * 
 * @usage
 * node scripts/analisar-arquivos-obsoletos.js
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
    function: arguments.callee.name || 'anonymous'
  };
  
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
}

/**
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error, context = 'unknown') {
  console.error(`[ERROR] ${context}:`, error.message);
  throw error;
}

// Configurações
const CONFIG = {
  projectRoot: process.cwd(),
  trashDir: path.join(process.cwd(), 'trash-temp'),
  maxFileAge: 30 * 24 * 60 * 60 * 1000, // 30 dias em ms
  minFileSize: 1024, // 1KB
  patterns: {
    obsolete: [
      '*.tmp',
      '*.temp',
      '*.bak',
      '*.backup',
      '*.old',
      '*.orig',
      '*.rej',
      '*.swp',
      '*.swo',
      '*~',
      '.DS_Store',
      'Thumbs.db'
    ],
    test: [
      'test-*.js',
      'test-*.ts',
      '*.test.js',
      '*.test.ts',
      '*.spec.js',
      '*.spec.ts'
    ],
    build: [
      'dist/',
      'build/',
      'out/',
      'target/',
      '*.min.js',
      '*.min.css'
    ],
    logs: [
      '*.log',
      'logs/',
      '*.pid'
    ]
  },
  excludeDirs: [
    'node_modules',
    '.git',
    'trash-temp',
    'dist',
    'build',
    'out',
    'target',
    'logs'
  ],
  excludeFiles: [
    'package.json',
    'package-lock.json',
    'README.md',
    '.gitignore',
    '.env',
    '.env.example'
  ]
};

/**
 * Verifica se um arquivo é obsoleto baseado em padrões
 * @param {string} filePath - Caminho do arquivo
 * @returns {boolean} - True se obsoleto
 */
function isObsoleteFile(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath);
  const stats = fs.statSync(filePath);
  
  // Verificar padrões de arquivos obsoletos
  for (const pattern of CONFIG.patterns.obsolete) {
    if (fileName.includes(pattern.replace('*', ''))) {
      return true;
    }
  }
  
  // Verificar arquivos muito antigos
  const fileAge = Date.now() - stats.mtime.getTime();
  if (fileAge > CONFIG.maxFileAge) {
    return true;
  }
  
  // Verificar arquivos muito pequenos (possivelmente vazios ou corrompidos)
  if (stats.size < CONFIG.minFileSize && ext !== '.md' && ext !== '.txt') {
    return true;
  }
  
  return false;
}

/**
 * Verifica se um arquivo é duplicado
 * @param {string} filePath - Caminho do arquivo
 * @param {Array} allFiles - Lista de todos os arquivos
 * @returns {Array} - Lista de duplicados
 */
function findDuplicates(filePath, allFiles) {
  const fileName = path.basename(filePath);
  const duplicates = allFiles.filter(f => 
    path.basename(f) === fileName && f !== filePath
  );
  return duplicates;
}

/**
 * Verifica se um arquivo está sendo usado
 * @param {string} filePath - Caminho do arquivo
 * @param {Array} allFiles - Lista de todos os arquivos
 * @returns {boolean} - True se está sendo usado
 */
function isFileUsed(filePath, allFiles) {
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = path.basename(filePath, path.extname(filePath));
  
  // Verificar se o arquivo é importado/requerido em outros arquivos
  for (const file of allFiles) {
    if (file === filePath) continue;
    
    try {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes(fileName) || content.includes(fileNameWithoutExt)) {
        return true;
      }
    } catch (error) {
      // Ignorar erros de leitura
    }
  }
  
  return false;
}

/**
 * Move arquivo para diretório de lixo
 * @param {string} filePath - Caminho do arquivo
 * @param {string} reason - Motivo da movimentação
 */
function moveToTrash(filePath, reason) {
  try {
    const relativePath = path.relative(CONFIG.projectRoot, filePath);
    const trashPath = path.join(CONFIG.trashDir, relativePath);
    const trashDir = path.dirname(trashPath);
    
    // Criar diretório se não existir
    if (!fs.existsSync(trashDir)) {
      fs.mkdirSync(trashDir, { recursive: true });
    }
    
    // Mover arquivo
    fs.renameSync(filePath, trashPath);
    
    // Criar arquivo de metadados
    const metadataPath = trashPath + '.metadata.json';
    const metadata = {
      originalPath: filePath,
      movedAt: new Date().toISOString(),
      reason: reason,
      size: fs.statSync(trashPath).size
    };
    
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    
    logStructured('info', `Arquivo movido para lixo: ${relativePath}`, { reason });
  } catch (error) {
    handleError(error, `moveToTrash: ${filePath}`);
  }
}

/**
 * Função principal de análise
 */
function analyzeObsoleteFiles() {
  logStructured('info', 'Iniciando análise de arquivos obsoletos...');
  
  try {
    // Criar diretório de lixo se não existir
    if (!fs.existsSync(CONFIG.trashDir)) {
      fs.mkdirSync(CONFIG.trashDir, { recursive: true });
    }
    
    // Coletar todos os arquivos
    const allFiles = [];
    const obsoleteFiles = [];
    const duplicateFiles = [];
    const unusedFiles = [];
    
    function collectFiles(dir) {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          const dirName = path.basename(fullPath);
          if (!CONFIG.excludeDirs.includes(dirName)) {
            collectFiles(fullPath);
          }
        } else {
          const fileName = path.basename(fullPath);
          if (!CONFIG.excludeFiles.includes(fileName)) {
            allFiles.push(fullPath);
          }
        }
      }
    }
    
    collectFiles(CONFIG.projectRoot);
    
    logStructured('info', `Total de arquivos encontrados: ${allFiles.length}`);
    
    // Analisar cada arquivo
    for (const filePath of allFiles) {
      const relativePath = path.relative(CONFIG.projectRoot, filePath);
      
      // Verificar se é obsoleto
      if (isObsoleteFile(filePath)) {
        obsoleteFiles.push({ path: filePath, reason: 'obsoleto' });
        continue;
      }
      
      // Verificar duplicados
      const duplicates = findDuplicates(filePath, allFiles);
      if (duplicates.length > 0) {
        duplicateFiles.push({ path: filePath, duplicates });
        continue;
      }
      
      // Verificar se está sendo usado (apenas para arquivos .js, .ts, .tsx)
      const ext = path.extname(filePath);
      if (['.js', '.ts', '.tsx'].includes(ext)) {
        if (!isFileUsed(filePath, allFiles)) {
          unusedFiles.push({ path: filePath, reason: 'não utilizado' });
        }
      }
    }
    
    // Gerar relatório
    const report = {
      timestamp: new Date().toISOString(),
      totalFiles: allFiles.length,
      obsoleteFiles: obsoleteFiles.length,
      duplicateFiles: duplicateFiles.length,
      unusedFiles: unusedFiles.length,
      details: {
        obsolete: obsoleteFiles,
        duplicates: duplicateFiles,
        unused: unusedFiles
      }
    };
    
    // Salvar relatório
    const reportPath = path.join(CONFIG.trashDir, 'analysis-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Exibir resultados
    console.log('\n📊 RELATÓRIO DE ANÁLISE DE ARQUIVOS OBSOLETOS');
    console.log('================================================');
    console.log(`📁 Total de arquivos analisados: ${report.totalFiles}`);
    console.log(`🗑️  Arquivos obsoletos encontrados: ${report.obsoleteFiles}`);
    console.log(`📋 Arquivos duplicados encontrados: ${report.duplicateFiles}`);
    console.log(`❌ Arquivos não utilizados encontrados: ${report.unusedFiles}`);
    console.log(`📄 Relatório salvo em: ${reportPath}`);
    
    // Perguntar se deve mover os arquivos
    if (obsoleteFiles.length > 0 || duplicateFiles.length > 0 || unusedFiles.length > 0) {
      console.log('\n🚀 ARQUIVOS IDENTIFICADOS PARA MOVIMENTAÇÃO:');
      
      if (obsoleteFiles.length > 0) {
        console.log('\n🗑️  ARQUIVOS OBSOLETOS:');
        obsoleteFiles.forEach(file => {
          console.log(`  - ${path.relative(CONFIG.projectRoot, file.path)}`);
        });
      }
      
      if (duplicateFiles.length > 0) {
        console.log('\n📋 ARQUIVOS DUPLICADOS:');
        duplicateFiles.forEach(file => {
          console.log(`  - ${path.relative(CONFIG.projectRoot, file.path)}`);
          file.duplicates.forEach(dup => {
            console.log(`    Duplicado: ${path.relative(CONFIG.projectRoot, dup)}`);
          });
        });
      }
      
      if (unusedFiles.length > 0) {
        console.log('\n❌ ARQUIVOS NÃO UTILIZADOS:');
        unusedFiles.forEach(file => {
          console.log(`  - ${path.relative(CONFIG.projectRoot, file.path)}`);
        });
      }
      
      console.log('\n✅ Análise concluída! Verifique o relatório antes de mover os arquivos.');
    } else {
      console.log('\n✅ Nenhum arquivo obsoleto encontrado!');
    }
    
  } catch (error) {
    handleError(error, 'analyzeObsoleteFiles');
  }
}

/**
 * Move arquivos identificados para o lixo
 */
function moveObsoleteFiles() {
  logStructured('info', 'Movendo arquivos obsoletos para lixo...');
  
  try {
    const reportPath = path.join(CONFIG.trashDir, 'analysis-report.json');
    
    if (!fs.existsSync(reportPath)) {
      console.log('❌ Relatório de análise não encontrado. Execute a análise primeiro.');
      return;
    }
    
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    let movedCount = 0;
    
    // Mover arquivos obsoletos
    for (const file of report.details.obsolete) {
      if (fs.existsSync(file.path)) {
        moveToTrash(file.path, file.reason);
        movedCount++;
      }
    }
    
    // Mover arquivos duplicados (manter apenas o primeiro)
    for (const file of report.details.duplicates) {
      if (fs.existsSync(file.path)) {
        moveToTrash(file.path, 'duplicado');
        movedCount++;
      }
    }
    
    // Mover arquivos não utilizados
    for (const file of report.details.unused) {
      if (fs.existsSync(file.path)) {
        moveToTrash(file.path, file.reason);
        movedCount++;
      }
    }
    
    console.log(`\n✅ ${movedCount} arquivos movidos para ${CONFIG.trashDir}`);
    console.log('📋 Verifique o diretório de lixo antes de descartar definitivamente.');
    
  } catch (error) {
    handleError(error, 'moveObsoleteFiles');
  }
}

// Execução principal
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'move':
      moveObsoleteFiles();
      break;
    default:
      analyzeObsoleteFiles();
      break;
  }
}

module.exports = {
  analyzeObsoleteFiles,
  moveObsoleteFiles,
  isObsoleteFile,
  findDuplicates,
  isFileUsed
};
