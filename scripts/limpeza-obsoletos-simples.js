
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
if (!validateType(data, 'object')) {
  throw new TypeError('Dados devem ser um objeto válido');
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

// Aplicar asserções críticas
assertCritical(data !== null, 'Dados não podem ser null');
assertCritical(typeof data === 'object', 'Dados devem ser um objeto');
assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');


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

// Aplicar validação
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}

#!/usr/bin/env node

/**
 * @fileoverview Script simples para limpeza de arquivos obsoletos
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-08-06
 */

const fs = require('fs');
const path = require('path');

console.log('🗑️  INICIANDO ANÁLISE DE ARQUIVOS OBSOLETOS...\n');

// Configurações
const TRASH_DIR = path.join(process.cwd(), 'trash-temp');
const EXCLUDE_DIRS = ['node_modules', '.git', 'trash-temp', 'dist', 'build', 'out', 'target', 'logs'];
const EXCLUDE_FILES = ['package.json', 'package-lock.json', 'README.md', '.gitignore'];

// Padrões de arquivos obsoletos
const OBSOLETE_PATTERNS = [
  '*.tmp', '*.temp', '*.bak', '*.backup', '*.old', '*.orig', 
  '*.rej', '*.swp', '*.swo', '*~', '.DS_Store', 'Thumbs.db',
  'test-', '*.test.js', '*.test.ts', '*.spec.js', '*.spec.ts'
];

// Criar diretório de lixo
if (!fs.existsSync(TRASH_DIR)) {
  fs.mkdirSync(TRASH_DIR, { recursive: true });
  console.log('📁 Diretório de lixo criado:', TRASH_DIR);
}

// Coletar arquivos
function collectFiles(dir, files = []) {
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!EXCLUDE_DIRS.includes(item)) {
          collectFiles(fullPath, files);
        }
      } else {
        if (!EXCLUDE_FILES.includes(item)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.log('⚠️  Erro ao ler diretório:', dir, error.message);
  }
  
  return files;
}

// Verificar se arquivo é obsoleto
function isObsolete(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath);
  
  // Verificar padrões
  for (const pattern of OBSOLETE_PATTERNS) {
    if (fileName.includes(pattern.replace('*', ''))) {
      return true;
    }
  }
  
  // Verificar arquivos muito pequenos (exceto .md e .txt)
  try {
    const stats = fs.statSync(filePath);
    if (stats.size < 1024 && ext !== '.md' && ext !== '.txt') {
      return true;
    }
  } catch (error) {
    return false;
  }
  
  return false;
}

// Mover para lixo
function moveToTrash(filePath) {
  try {
    const relativePath = path.relative(process.cwd(), filePath);
    const trashPath = path.join(TRASH_DIR, relativePath);
    const trashDir = path.dirname(trashPath);
    
    if (!fs.existsSync(trashDir)) {
      fs.mkdirSync(trashDir, { recursive: true });
    }
    
    fs.renameSync(filePath, trashPath);
    console.log(`  ✅ Movido: ${relativePath}`);
    return true;
  } catch (error) {
    console.log(`  ❌ Erro ao mover: ${filePath}`, error.message);
    return false;
  }
}

// Análise principal
console.log('🔍 Analisando arquivos...');
const allFiles = collectFiles(process.cwd());
console.log(`📊 Total de arquivos encontrados: ${allFiles.length}`);

const obsoleteFiles = [];
const movedFiles = [];

// Identificar arquivos obsoletos
console.log('\n🔍 Identificando arquivos obsoletos...');
for (const filePath of allFiles) {
  if (isObsolete(filePath)) {
    obsoleteFiles.push(filePath);
  }
}

console.log(`🗑️  Arquivos obsoletos encontrados: ${obsoleteFiles.length}`);

if (obsoleteFiles.length > 0) {
  console.log('\n📋 ARQUIVOS OBSOLETOS IDENTIFICADOS:');
  obsoleteFiles.forEach(file => {
    const relativePath = path.relative(process.cwd(), file);
    console.log(`  - ${relativePath}`);
  });
  
  console.log('\n🚀 Movendo arquivos para lixo...');
  for (const filePath of obsoleteFiles) {
    if (moveToTrash(filePath)) {
      movedFiles.push(filePath);
    }
  }
  
  console.log(`\n✅ ${movedFiles.length} arquivos movidos para ${TRASH_DIR}`);
  console.log('📋 Verifique o diretório de lixo antes de descartar definitivamente.');
} else {
  console.log('\n✅ Nenhum arquivo obsoleto encontrado!');
}

// Salvar relatório
const report = {
  timestamp: new Date().toISOString(),
  totalFiles: allFiles.length,
  obsoleteFiles: obsoleteFiles.length,
  movedFiles: movedFiles.length,
  files: movedFiles.map(f => path.relative(process.cwd(), f))
};

const reportPath = path.join(TRASH_DIR, 'limpeza-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`📄 Relatório salvo em: ${reportPath}`);

console.log('\n🎉 Análise concluída!');
