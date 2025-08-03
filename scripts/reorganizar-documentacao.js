
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

#!/usr/bin/env node

/**
 * Script de Reorganização da Documentação - DOM v2
 * 
 * Este script automatiza o processo de reorganização da documentação:
 * 1. Cria backup da documentação atual
 * 2. Gera inventário de documentos
 * 3. Cria nova estrutura de diretórios
 * 4. Inicia migração de documentos prioritários
 * 
 * Uso: node scripts/reorganizar-documentacao.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações
const CONFIG = {
  docsDir: './docs',
  backupDir: './docs-backup',
  newStructure: {
    'PROJETO': [
      'README.md',
      'arquitetura.md',
      'roadmap.md',
      'separacao-mobile-web.md',
      'metricas-sucesso.md'
    ],
    'DESENVOLVIMENTO': {
      'setup': [
        'setup-geral.md',
        'setup-backend.md',
        'setup-web.md',
        'setup-mobile.md'
      ],
      'guias': [
        'contribuicao.md',
        'padroes-codigo.md',
        'testes.md',
        'deploy.md'
      ],
      'troubleshooting': [
        'problemas-comuns.md',
        'debug-web.md',
        'debug-mobile.md'
      ]
    },
    'FUNCIONALIDADES': [
      'controle-orcamento.md',
      'folha-pagamento.md',
      'controle-jornada.md',
      'gestao-documentos.md',
      'employer-employee.md',
      'relatorios-analytics.md',
      'seguranca.md',
      'integracoes.md'
    ],
    'DESIGN': [
      'design-system.md',
      'componentes.md',
      'padroes-ui.md',
      'acessibilidade.md'
    ],
    'TECNOLOGIAS': {
      'backend': [
        'nodejs-typescript.md',
        'postgresql-prisma.md',
        'apis.md'
      ],
      'frontend': [
        'react-native-web.md',
        'webpack-babel.md',
        'componentes-web.md'
      ],
      'mobile': [
        'react-native.md',
        'metro-bundler.md',
        'componentes-mobile.md'
      ]
    },
    'NEGOCIO': [
      'casos-uso.md',
      'perfis-usuarios.md',
      'metricas-negocio.md',
      'roadmap-negocio.md'
    ],
    'SEGURANCA': [
      'autenticacao.md',
      'autorizacao.md',
      'lgpd.md',
      'compliance.md'
    ],
    'PROCESSOS': [
      'metodologia.md',
      'code-review.md',
      'testes.md',
      'deploy.md'
    ],
    'REFERENCIAS': [
      'glossario.md',
      'acronimos.md',
      'links-uteis.md',
      'changelog.md'
    ]
  },
  documentsToMigrate: [
    'planejamento-global-revisado-2025.md',
    'separacao-mobile-web-formalizacao.md',
    'lacunas-funcionais-completas.md',
    'especificacoes-funcionalidades-detalhadas.md',
    'arquitetura-hibrida-core-distribuido.md'
  ]
};

// Utilitários
const utils = {
  log: (message, type = 'info') => {
    const timestamp = new Date().toISOString();
    const colors = {
      info: '\x1b[36m',    // Cyan
      success: '\x1b[32m', // Green
      warning: '\x1b[33m', // Yellow
      error: '\x1b[31m',   // Red
      reset: '\x1b[0m'     // Reset
    };
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
  },

  createDirectory: (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      utils.log(`✅ Diretório criado: ${dirPath}`, 'success');
    } else {
      utils.log(`⚠️ Diretório já existe: ${dirPath}`, 'warning');
    }
  },

  copyFile: (source, destination) => {
    try {
      fs.copyFileSync(source, destination);
      utils.log(`✅ Arquivo copiado: ${source} → ${destination}`, 'success');
      return true;
    } catch (error) {
      utils.log(`❌ Erro ao copiar arquivo: ${source}`, 'error');
      return false;
    }
  },

  readFile: (filePath) => {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      utils.log(`❌ Erro ao ler arquivo: ${filePath}`, 'error');
      return null;
    }
  },

  writeFile: (filePath, content) => {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      utils.log(`✅ Arquivo criado: ${filePath}`, 'success');
      return true;
    } catch (error) {
      utils.log(`❌ Erro ao criar arquivo: ${filePath}`, 'error');
      return false;
    }
  },

  listFiles: (dirPath, extension = '.md') => {
    try {
      const files = fs.readdirSync(dirPath);
      return files.filter(file => file.endsWith(extension));
    } catch (error) {
      utils.log(`❌ Erro ao listar arquivos: ${dirPath}`, 'error');
      return [];
    }
  }
};

// Funções principais
const reorganizer = {
  // Fase 1: Backup da documentação atual
  createBackup: () => {
    utils.log('🔄 Iniciando backup da documentação atual...', 'info');
    
    // Criar diretório de backup
    utils.createDirectory(CONFIG.backupDir);
    
    // Copiar todos os arquivos .md
    const files = utils.listFiles(CONFIG.docsDir);
    let copiedCount = 0;
    
    files.forEach(file => {
      const sourcePath = path.join(CONFIG.docsDir, file);
      const destPath = path.join(CONFIG.backupDir, file);
      
      if (utils.copyFile(sourcePath, destPath)) {
        copiedCount++;
      }
    });
    
    utils.log(`✅ Backup concluído: ${copiedCount} arquivos copiados`, 'success');
    return copiedCount;
  },

  // Fase 2: Gerar inventário de documentos
  generateInventory: () => {
    utils.log('📋 Gerando inventário de documentos...', 'info');
    
    const files = utils.listFiles(CONFIG.docsDir);
    const inventory = {
      total: files.length,
      files: files.map(file => ({
        name: file,
        path: path.join(CONFIG.docsDir, file),
        size: fs.statSync(path.join(CONFIG.docsDir, file)).size,
        lastModified: fs.statSync(path.join(CONFIG.docsDir, file)).mtime
      })),
      categories: {
        planning: files.filter(f => f.includes('planejamento') || f.includes('plan')),
        technical: files.filter(f => f.includes('tecnico') || f.includes('setup') || f.includes('config')),
        features: files.filter(f => f.includes('funcionalidade') || f.includes('feature')),
        status: files.filter(f => f.includes('status') || f.includes('progresso')),
        other: files.filter(f => !f.includes('planejamento') && !f.includes('tecnico') && !f.includes('funcionalidade') && !f.includes('status'))
      }
    };
    
    // Salvar inventário
    const inventoryPath = path.join(CONFIG.backupDir, 'inventory.json');
    utils.writeFile(inventoryPath, JSON.stringify(inventory, null, 2));
    
    utils.log(`✅ Inventário gerado: ${inventory.total} documentos encontrados`, 'success');
    utils.log(`📊 Categorias: Planejamento (${inventory.categories.planning.length}), Técnico (${inventory.categories.technical.length}), Funcionalidades (${inventory.categories.features.length}), Status (${inventory.categories.status.length}), Outros (${inventory.categories.other.length})`, 'info');
    
    return inventory;
  },

  // Fase 3: Criar nova estrutura de diretórios
  createNewStructure: () => {
    utils.log('🏗️ Criando nova estrutura de diretórios...', 'info');
    
    const createStructure = (basePath, structure) => {
      Object.entries(structure).forEach(([name, content]) => {
        const dirPath = path.join(basePath, name);
        
        if (Array.isArray(content)) {
          // É um array de arquivos
          utils.createDirectory(dirPath);
          content.forEach(file => {
            const filePath = path.join(dirPath, file);
            if (!fs.existsSync(filePath)) {
              utils.writeFile(filePath, `# ${file.replace('.md', '').replace(/-/g, ' ').toUpperCase()}\n\n*Documento em construção*\n\n---\n\n**Data:** ${new Date().toISOString().split('T')[0]}\n**Status:** 📝 **EM CONSTRUÇÃO**`);
            }
          });
        } else if (typeof content === 'object') {
          // É um objeto (subdiretório)
          utils.createDirectory(dirPath);
          createStructure(dirPath, content);
        }
      });
    };
    
    createStructure(CONFIG.docsDir, CONFIG.newStructure);
    utils.log('✅ Nova estrutura de diretórios criada', 'success');
  },

  // Fase 4: Migrar documentos prioritários
  migratePriorityDocuments: () => {
    utils.log('📦 Migrando documentos prioritários...', 'info');
    
    let migratedCount = 0;
    
    CONFIG.documentsToMigrate.forEach(doc => {
      const sourcePath = path.join(CONFIG.docsDir, doc);
      const destPath = path.join(CONFIG.docsDir, 'PROJETO', doc);
      
      if (fs.existsSync(sourcePath)) {
        if (utils.copyFile(sourcePath, destPath)) {
          migratedCount++;
          // Remover arquivo original após migração
          fs.unlinkSync(sourcePath);
          utils.log(`🗑️ Arquivo original removido: ${sourcePath}`, 'warning');
        }
      } else {
        utils.log(`⚠️ Documento não encontrado: ${doc}`, 'warning');
      }
    });
    
    utils.log(`✅ Migração concluída: ${migratedCount} documentos migrados`, 'success');
    return migratedCount;
  },

  // Fase 5: Criar README principal
  createMainReadme: () => {
    utils.log('📖 Criando README principal...', 'info');
    
    const readmeContent = `# 📚 **DOCUMENTAÇÃO DOM v2**

**Versão:** 2.0.0  
**Data:** ${new Date().toISOString().split('T')[0]}  
**Status:** 🎯 **DOCUMENTAÇÃO REORGANIZADA**  

---

## 🎯 **VISÃO GERAL**

Esta documentação foi reorganizada para refletir a **nova arquitetura separada mobile/web** do projeto DOM v2, implementada em 23 de Julho de 2025.

### **📁 ESTRUTURA DA DOCUMENTAÇÃO:**

#### **📋 PROJETO/**
- **README.md** - Visão geral do projeto
- **arquitetura.md** - Arquitetura atual
- **roadmap.md** - Roadmap atualizado
- **separacao-mobile-web.md** - Formalização da separação
- **metricas-sucesso.md** - KPIs e métricas

#### **🚀 DESENVOLVIMENTO/**
- **setup/** - Guias de configuração por plataforma
- **guias/** - Guias de desenvolvimento
- **troubleshooting/** - Resolução de problemas

#### **📊 FUNCIONALIDADES/**
- **controle-orcamento.md** - Controle de orçamento
- **folha-pagamento.md** - Folha de pagamento
- **controle-jornada.md** - Controle de jornada
- **gestao-documentos.md** - Gestão de documentos
- **employer-employee.md** - Employer-Employee
- **relatorios-analytics.md** - Relatórios e analytics
- **seguranca.md** - Segurança e compliance
- **integracoes.md** - Integrações externas

#### **🎨 DESIGN/**
- **design-system.md** - Design system
- **componentes.md** - Biblioteca de componentes
- **padroes-ui.md** - Padrões de UI
- **acessibilidade.md** - Acessibilidade

#### **🔧 TECNOLOGIAS/**
- **backend/** - Node.js, TypeScript, PostgreSQL
- **frontend/** - React Native Web, Webpack, Babel
- **mobile/** - React Native, Metro Bundler

#### **📈 NEGÓCIO/**
- **casos-uso.md** - Casos de uso
- **perfis-usuarios.md** - Perfis de usuários
- **metricas-negocio.md** - Métricas de negócio
- **roadmap-negocio.md** - Roadmap de negócio

#### **🛡️ SEGURANÇA/**
- **autenticacao.md** - Autenticação
- **autorizacao.md** - Autorização
- **lgpd.md** - LGPD
- **compliance.md** - Compliance

#### **📋 PROCESSOS/**
- **metodologia.md** - Metodologia de desenvolvimento
- **code-review.md** - Processo de code review
- **testes.md** - Estratégia de testes
- **deploy.md** - Processo de deploy

#### **📚 REFERÊNCIAS/**
- **glossario.md** - Glossário técnico
- **acronimos.md** - Acrônimos
- **links-uteis.md** - Links úteis
- **changelog.md** - Histórico de mudanças

---

## 🚀 **INÍCIO RÁPIDO**

### **Para Desenvolvedores:**
1. 📖 Leia [PROJETO/README.md](PROJETO/README.md) para visão geral
2. 🏗️ Configure o ambiente com [DESENVOLVIMENTO/setup/setup-geral.md](DESENVOLVIMENTO/setup/setup-geral.md)
3. 📝 Consulte [DESENVOLVIMENTO/guias/contribuicao.md](DESENVOLVIMENTO/guias/contribuicao.md) para contribuir

### **Para Stakeholders:**
1. 📊 Veja [PROJETO/roadmap.md](PROJETO/roadmap.md) para roadmap
2. 📈 Consulte [NEGOCIO/metricas-negocio.md](NEGOCIO/metricas-negocio.md) para métricas
3. 🎯 Leia [PROJETO/metricas-sucesso.md](PROJETO/metricas-sucesso.md) para KPIs

---

## 📊 **STATUS DA REORGANIZAÇÃO**

- ✅ **Backup criado** - Documentação original preservada
- ✅ **Inventário gerado** - Todos os documentos catalogados
- ✅ **Nova estrutura criada** - Organização por categorias
- ✅ **Documentos prioritários migrados** - Informações essenciais preservadas
- 🚧 **Em progresso** - Migração de documentos específicos
- 📝 **Pendente** - Atualização de conteúdo técnico

---

## 🔄 **PRÓXIMOS PASSOS**

1. **Migrar documentos específicos** por categoria
2. **Atualizar conteúdo técnico** para refletir nova arquitetura
3. **Criar guias de setup** por plataforma
4. **Documentar funcionalidades** implementadas
5. **Estabelecer processos** de manutenção

---

**Status:** 📚 **DOCUMENTAÇÃO REORGANIZADA**  
**Próximo:** Migração de documentos específicos  
**Data:** ${new Date().toISOString().split('T')[0]}  
**Versão:** 2.0.0
`;

    const readmePath = path.join(CONFIG.docsDir, 'README.md');
    utils.writeFile(readmePath, readmeContent);
  },

  // Fase 6: Gerar relatório final
  generateReport: (backupCount, inventory, migratedCount) => {
    utils.log('📊 Gerando relatório final...', 'info');
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        backupCreated: backupCount,
        documentsInventoried: inventory.total,
        newStructureCreated: true,
        documentsMigrated: migratedCount,
        categoriesCreated: Object.keys(CONFIG.newStructure).length
      },
      details: {
        backupLocation: CONFIG.backupDir,
        inventoryLocation: path.join(CONFIG.backupDir, 'inventory.json'),
        newStructure: CONFIG.newStructure,
        migratedDocuments: CONFIG.documentsToMigrate
      },
      nextSteps: [
        'Migrar documentos específicos por categoria',
        'Atualizar conteúdo técnico para nova arquitetura',
        'Criar guias de setup por plataforma',
        'Documentar funcionalidades implementadas',
        'Estabelecer processos de manutenção'
      ]
    };
    
    const reportPath = path.join(CONFIG.docsDir, 'REORGANIZACAO-REPORT.json');
    utils.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    utils.log('✅ Relatório final gerado', 'success');
    return report;
  }
};

// Função principal
const main = async () => {
  utils.log('🚀 Iniciando reorganização da documentação DOM v2...', 'info');
  utils.log('📅 Data: ' + new Date().toISOString(), 'info');
  
  try {
    // Fase 1: Backup
    const backupCount = reorganizer.createBackup();
    
    // Fase 2: Inventário
    const inventory = reorganizer.generateInventory();
    
    // Fase 3: Nova estrutura
    reorganizer.createNewStructure();
    
    // Fase 4: Migração prioritária
    const migratedCount = reorganizer.migratePriorityDocuments();
    
    // Fase 5: README principal
    reorganizer.createMainReadme();
    
    // Fase 6: Relatório
    const report = reorganizer.generateReport(backupCount, inventory, migratedCount);
    
    // Resumo final
    utils.log('🎉 Reorganização da documentação concluída com sucesso!', 'success');
    utils.log(`📊 Resumo:`, 'info');
    utils.log(`   - Backup: ${backupCount} arquivos`, 'info');
    utils.log(`   - Inventário: ${inventory.total} documentos`, 'info');
    utils.log(`   - Migração: ${migratedCount} documentos prioritários`, 'info');
    utils.log(`   - Categorias: ${Object.keys(CONFIG.newStructure).length} criadas`, 'info');
    
    utils.log('📋 Próximos passos:', 'info');
    report.nextSteps.forEach((step, index) => {
      utils.log(`   ${index + 1}. ${step}`, 'info');
    });
    
  } catch (error) {
    utils.log(`❌ Erro durante reorganização: ${error.message}`, 'error');
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { reorganizer, utils, CONFIG }; 