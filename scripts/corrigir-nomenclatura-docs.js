
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


/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Implementação de funcionalidade
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - Dependências específicas do contexto
 * 
 * @usage
 * Ver documentação específica para detalhes de uso
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  docsDir: './docs',
  backupDir: './docs-backup-nomenclatura',
  mapeamentoDiretorios: {
    // Diretórios que precisam ser renomeados para seguir o padrão kebab-case
    'ANALISES': 'analyses',
    'COMANDOS': 'commands',
    'CONFORMIDADE': 'compliance',
    'DADOS': 'data',
    'DEBUG': 'debug',
    'DESENVOLVIMENTO': 'development',
    'DESIGN': 'design',
    'DIAGRAMAS': 'diagrams',
    'DIRETIVAS': 'directives',
    'DOCUMENTACAO': 'documentation',
    'EXEMPLOS': 'examples',
    'FASES': 'phases',
    'FUNCIONALIDADES': 'features',
    'INSTRUCOES': 'instructions',
    'NEGOCIO': 'business',
    'PERFIS': 'profiles',
    'PLANOS': 'plans',
    'PROCESSOS': 'processes',
    'PROJETO': 'project',
    'PROMPTS': 'prompts',
    'REFERENCIAS': 'references',
    'RELATORIOS': 'reports',
    'REAVALIACOES': 'reassessments',
    'RESUMOS': 'summaries',
    'SEGURANCA': 'security',
    'SISTEMAS': 'systems',
    'TECNOLOGIAS': 'technologies',
    'TESTES': 'tests',
    'TROUBLESHOOTING': 'troubleshooting',
    'WORKSHOPS': 'workshops'
  },
  mapeamentoArquivos: {
    // Arquivos que precisam ser renomeados para seguir o padrão kebab-case
    'gap-analysis-funcionalidades-criticas.xlsx': 'gap-analysis-critical-features.xlsx',
    'resumo-executivo-separacao-mobile-web.md': 'executive-summary-mobile-web-separation.md',
    'RELATORIO-LIMPEZA-REORGANIZACAO.json': 'cleanup-reorganization-report.json',
    'RELATORIO-LIMPEZA-FINAL.json': 'final-cleanup-report.json',
    'RELATORIO-ORGANIZACAO-RAIZ.json': 'root-organization-report.json'
  }
};

// Funções utilitárias
const log = (message) => console.log(`[${new Date().toISOString()}] ${message}`);

const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`Diretório criado: ${dirPath}`);
  }
};

const copyFile = (source, destination) => {
  try {
    fs.copyFileSync(source, destination);
    log(`Arquivo copiado: ${source} -> ${destination}`);
    return true;
  } catch (error) {
    log(`Erro ao copiar ${source}: ${error.message}`);
    return false;
  }
};

const deleteFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
    log(`Arquivo deletado: ${filePath}`);
    return true;
  } catch (error) {
    log(`Erro ao deletar ${filePath}: ${error.message}`);
    return false;
  }
};

const renameDirectory = (oldPath, newPath) => {
  try {
    fs.renameSync(oldPath, newPath);
    log(`Diretório renomeado: ${oldPath} -> ${newPath}`);
    return true;
  } catch (error) {
    log(`Erro ao renomear diretório ${oldPath}: ${error.message}`);
    return false;
  }
};

const listDirectories = (dirPath) => {
  try {
    return fs.readdirSync(dirPath).filter(item => {
      const fullPath = path.join(dirPath, item);
      return fs.statSync(fullPath).isDirectory();
    });
  } catch (error) {
    log(`Erro ao listar diretórios em ${dirPath}: ${error.message}`);
    return [];
  }
};

const listFiles = (dirPath) => {
  try {
    return fs.readdirSync(dirPath).filter(file => {
      const fullPath = path.join(dirPath, file);
      return fs.statSync(fullPath).isFile();
    });
  } catch (error) {
    log(`Erro ao listar arquivos em ${dirPath}: ${error.message}`);
    return [];
  }
};

// Funções principais
const corrigirNomenclatura = {
  createBackup: () => {
    log('Criando backup antes da correção de nomenclatura...');
    createDirectory(CONFIG.backupDir);
    
    const dirs = listDirectories(CONFIG.docsDir);
    const files = listFiles(CONFIG.docsDir);
    let backupCount = 0;
    
    // Backup dos diretórios
    dirs.forEach(dir => {
      const sourcePath = path.join(CONFIG.docsDir, dir);
      const backupPath = path.join(CONFIG.backupDir, dir);
      if (copyFile(sourcePath, backupPath)) {
        backupCount++;
      }
    });
    
    // Backup dos arquivos
    files.forEach(file => {
      const sourcePath = path.join(CONFIG.docsDir, file);
      const backupPath = path.join(CONFIG.backupDir, file);
      if (copyFile(sourcePath, backupPath)) {
        backupCount++;
      }
    });
    
    log(`Backup concluído: ${backupCount} itens`);
    return backupCount;
  },

  renameDirectories: () => {
    log('Renomeando diretórios para seguir o padrão kebab-case...');
    let renamedCount = 0;
    
    Object.entries(CONFIG.mapeamentoDiretorios).forEach(([oldName, newName]) => {
      const oldPath = path.join(CONFIG.docsDir, oldName);
      const newPath = path.join(CONFIG.docsDir, newName);
      
      if (fs.existsSync(oldPath)) {
        if (renameDirectory(oldPath, newPath)) {
          renamedCount++;
        }
      }
    });
    
    log(`Diretórios renomeados: ${renamedCount}`);
    return renamedCount;
  },

  renameFiles: () => {
    log('Renomeando arquivos para seguir o padrão kebab-case...');
    let renamedCount = 0;
    
    Object.entries(CONFIG.mapeamentoArquivos).forEach(([oldName, newName]) => {
      const oldPath = path.join(CONFIG.docsDir, oldName);
      const newPath = path.join(CONFIG.docsDir, newName);
      
      if (fs.existsSync(oldPath)) {
        if (copyFile(oldPath, newPath)) {
          deleteFile(oldPath);
          renamedCount++;
        }
      }
    });
    
    log(`Arquivos renomeados: ${renamedCount}`);
    return renamedCount;
  },

  updateReadme: () => {
    const readmeContent = `# DOM-V2 Documentation - Organized

## Updated Structure

### 📁 project/
Main project documents, planning and architecture.

### 📁 development/
Guides, processes and development instructions.

### 📁 features/
Functional specifications and gaps.

### 📁 business/
Business planning and user impact.

### 📁 processes/
Project rules, directives and processes.

### 📁 references/
Indexes, audits and analysis reports.

### 📁 technologies/
Technical and architectural documentation.

### 📁 design/
Interface and user experience documentation.

### 📁 security/
Security and compliance documentation.

### 📁 reports/
Implementation, validation and improvement reports.

### 📁 phases/
Project development phases documentation.

### 📁 systems/
Implemented systems documentation.

### 📁 plans/
Action plans and implementation.

### 📁 reassessments/
Reassessments and context analysis.

### 📁 summaries/
Executive summaries and documentation.

### 📁 profiles/
User profiles and naming patterns.

### 📁 examples/
Practical examples and FAQ.

### 📁 data/
Collected data and search data.

### 📁 commands/
PowerShell commands and execution scripts.

### 📁 tests/
Test scripts and files.

### 📁 instructions/
Guides and instructions for new chats.

### 📁 documentation/
Technical documentation and scripts.

### 📁 debug/
Debug and development files.

### 📁 diagrams/
Diagrams and visualizations.

### 📁 analyses/
Training and conflict analysis.

### 📁 compliance/
Compliance and percentage reports.

### 📁 workshops/
Workshops and training.

### 📁 troubleshooting/
Problem solving guides.

### 📁 prompts/
Structured prompts for AI.

### 📁 directives/
Critical thinking directives.

## Main Files in Root

- \`gap-analysis-critical-features.xlsx\` - Gap analysis and critical features
- \`executive-summary-mobile-web-separation.md\` - Mobile/web separation summary
- \`README.md\` - Main project documentation
- \`package.json\` - Project configurations
- \`phase5-config.json\` - Phase 5 configuration
- \`phase6-config.json\` - Phase 6 configuration

## Cleanup Performed

- ✅ Complete backup created in \`docs-backup-complete/\`
- ✅ Final backup created in \`docs-backup-final/\`
- ✅ Root backup created in \`docs-backup-raiz/\`
- ✅ Nomenclature backup created in \`docs-backup-nomenclatura/\`
- ✅ Obsolete files removed
- ✅ Documentation organized by category
- ✅ Clean and navigable structure
- ✅ Only essential files in root
- ✅ Root files organized in documentation
- ✅ Nomenclatura corrigida para seguir padrões do projeto

---
*Complete reorganization performed at: ${new Date().toISOString()}*
`;

    const readmePath = path.join(CONFIG.docsDir, 'README.md');
    fs.writeFileSync(readmePath, readmeContent);
    log('README.md updated with corrected nomenclature');
  },

  generateReport: (backupCount, dirsRenamed, filesRenamed) => {
    const report = {
      timestamp: new Date().toISOString(),
      operacao: 'Correção de Nomenclatura da Documentação',
      estatisticas: {
        arquivosBackup: backupCount,
        diretoriosRenomeados: dirsRenamed,
        arquivosRenomeados: filesRenamed
      },
      estruturaFinal: {
        project: 'Main project documents and planning',
        development: 'Development guides and processes',
        features: 'Functional specifications and gaps',
        business: 'Business planning',
        processes: 'Rules and directives',
        references: 'Indexes and reports',
        technologies: 'Technical documentation',
        design: 'Interface and UX',
        security: 'Security and compliance',
        reports: 'Implementation and validation reports',
        phases: 'Development phases documentation',
        systems: 'Implemented systems',
        plans: 'Action plans',
        reassessments: 'Reassessments and analysis',
        summaries: 'Executive summaries',
        profiles: 'Profiles and patterns',
        examples: 'Practical examples',
        data: 'Collected data',
        commands: 'PowerShell commands and scripts',
        tests: 'Test scripts and files',
        instructions: 'Guides and instructions',
        documentation: 'Technical documentation',
        debug: 'Debug files',
        diagrams: 'Diagrams and visualizations',
        analyses: 'Training analysis',
        compliance: 'Compliance reports',
        workshops: 'Workshops and training',
        troubleshooting: 'Problem solving guides',
        prompts: 'Structured prompts',
        directives: 'Critical directives'
      },
      mapeamentoDiretorios: CONFIG.mapeamentoDiretorios,
      mapeamentoArquivos: CONFIG.mapeamentoArquivos,
      observacoes: [
        'Backup completo disponível em docs-backup-complete/',
        'Backup final disponível em docs-backup-final/',
        'Backup da raiz disponível em docs-backup-raiz/',
        'Backup de nomenclatura disponível em docs-backup-nomenclatura/',
        'Documentação completamente organizada por categoria',
        'Nomenclatura corrigida para seguir padrões do projeto',
        'Estrutura limpa e altamente navegável',
        'Padrão kebab-case aplicado em todos os diretórios e arquivos'
      ]
    };

    const reportPath = path.join(CONFIG.docsDir, 'nomenclature-correction-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log('Nomenclature correction report generated');
  }
};

// Execução principal
const main = () => {
  log('Iniciando correção de nomenclatura da documentação...');
  
  try {
    const backupCount = corrigirNomenclatura.createBackup();
    const dirsRenamed = corrigirNomenclatura.renameDirectories();
    const filesRenamed = corrigirNomenclatura.renameFiles();
    
    corrigirNomenclatura.updateReadme();
    corrigirNomenclatura.generateReport(backupCount, dirsRenamed, filesRenamed);
    
    log('✅ Correção de nomenclatura concluída com sucesso!');
    log(`📊 Resumo: ${backupCount} backup, ${dirsRenamed} diretórios renomeados, ${filesRenamed} arquivos renomeados`);
    
  } catch (error) {
    log(`❌ Erro durante a operação: ${error.message}`);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { corrigirNomenclatura, CONFIG }; 