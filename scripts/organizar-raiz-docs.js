
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
  raizDir: './',
  docsDir: './docs',
  backupDir: './docs-backup-raiz',
  arquivosParaManterNaRaiz: [
    // Arquivos essenciais que devem permanecer na raiz
    'README.md',
    'package.json',
    'package-lock.json',
    'phase5-config.json',
    'phase6-config.json',
    '.gitignore'
  ],
  categorias: {
    COMANDOS: [
      'run-dom-v2-webpack.ps1',
      'run-dom-v2-stable.ps1',
      'run-dom-v2-complete.ps1',
      'run-dom-v2-web-simple.ps1',
      'run-dom-v2-web.ps1',
      'run-dom-v2-web-fixed.ps1',
      'run-dom-v2.ps1',
      'run-web-check.ps1',
      'run-web-simple.ps1',
      'test-frontend.ps1',
      'test-metro-only.ps1',
      'test-bundle-web.ps1',
      'debug-metro-web.ps1',
      'test-metro-simple.ps1',
      'test-metro-web.ps1',
      'setup-database.ps1',
      'install-dom-v2.ps1',
      'install-dom-v2.bat',
      'start-dom-v2.bat',
      'install-and-run-dom-v2.ps1'
    ],
    TESTES: [
      'test-login-api.js',
      'test-cpfcnpj-validation.js',
      'test-final-complete.js',
      'test-react-native-web-final.js',
      'test-devsettings-debug.js',
      'test-simple-success.js',
      'test-final-debug.js',
      'test-final-app.js',
      'test-simple-app.js',
      'test-app-loading.js',
      'test-integration.js',
      'test-tasks.js',
      'test-dashboard.js',
      'test-login.js',
      'test.html'
    ],
    INSTRUCOES: [
      'NEXT_CHAT_GUIDE.md',
      'CHAT_CONTINUATION.md',
      'status-atual-novo-chat.md',
      'resumo-progresso-componentes.md',
      'resumo-executivo-novo-chat.md',
      'contexto-rapido-novo-chat.md',
      'comando-inicial-novo-chat.md',
      'instrucoes-novo-chat.md',
      'instrucoes-rapidas-novo-chat.md',
      'contexto-completo-novo-chat.md',
      'instrucoes-novo-chat-completas.md',
      'instrucoes-novo-chat-continuidade.md',
      'instrucoes-complete-s-novo-chat.md'
    ],
    DOCUMENTACAO: [
      'TECHNICAL_DOCS.md',
      'README-SCRIPTS.md'
    ],
    DEBUG: [
      'debug-real.html',
      'debug-index.html'
    ],
    DIAGRAMAS: [
      'svg aria-roledescription=flowchart-.svg'
    ]
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

const listFiles = (dirPath) => {
  try {
    return fs.readdirSync(dirPath).filter(file => {
      const fullPath = path.join(dirPath, file);
      return fs.statSync(fullPath).isFile() && 
             (file.endsWith('.md') || file.endsWith('.ps1') || file.endsWith('.js') || 
              file.endsWith('.html') || file.endsWith('.svg') || file.endsWith('.json'));
    });
  } catch (error) {
    log(`Erro ao listar arquivos em ${dirPath}: ${error.message}`);
    return [];
  }
};

// Funções principais
const organizarRaiz = {
  createBackup: () => {
    log('Criando backup dos arquivos da raiz...');
    createDirectory(CONFIG.backupDir);
    
    const files = listFiles(CONFIG.raizDir);
    let backupCount = 0;
    
    files.forEach(file => {
      const sourcePath = path.join(CONFIG.raizDir, file);
      const backupPath = path.join(CONFIG.backupDir, file);
      if (copyFile(sourcePath, backupPath)) {
        backupCount++;
      }
    });
    
    log(`Backup concluído: ${backupCount} arquivos`);
    return backupCount;
  },

  organizeByCategory: () => {
    log('Organizando arquivos da raiz por categoria...');
    let organizedCount = 0;
    
    Object.entries(CONFIG.categorias).forEach(([category, files]) => {
      const categoryDir = path.join(CONFIG.docsDir, category);
      createDirectory(categoryDir);
      
      files.forEach(file => {
        const sourcePath = path.join(CONFIG.raizDir, file);
        const destPath = path.join(categoryDir, file);
        
        if (fs.existsSync(sourcePath)) {
          if (copyFile(sourcePath, destPath)) {
            deleteFile(sourcePath);
            organizedCount++;
          }
        }
      });
    });
    
    log(`Arquivos organizados: ${organizedCount}`);
    return organizedCount;
  },

  deleteUncategorizedFiles: () => {
    log('Deletando arquivos não categorizados da raiz...');
    const files = listFiles(CONFIG.raizDir);
    let deletedCount = 0;
    
    files.forEach(file => {
      if (!CONFIG.arquivosParaManterNaRaiz.includes(file)) {
        const filePath = path.join(CONFIG.raizDir, file);
        if (deleteFile(filePath)) {
          deletedCount++;
        }
      }
    });
    
    log(`Arquivos não categorizados deletados: ${deletedCount}`);
    return deletedCount;
  },

  updateReadme: () => {
    const readmeContent = `# Documentação DOM-V2 - Organizada

## Estrutura Atualizada

### 📁 PROJETO/
Documentos principais do projeto, planejamento e arquitetura.

### 📁 DESENVOLVIMENTO/
Guias, processos e instruções de desenvolvimento.

### 📁 FUNCIONALIDADES/
Especificações e lacunas funcionais.

### 📁 NEGOCIO/
Planejamento de negócio e impacto no usuário.

### 📁 PROCESSOS/
Regras, diretivas e processos do projeto.

### 📁 REFERENCIAS/
Índices, auditorias e relatórios de análise.

### 📁 TECNOLOGIAS/
Documentação técnica e arquitetural.

### 📁 DESIGN/
Documentação de interface e experiência do usuário.

### 📁 SEGURANCA/
Documentação de segurança e compliance.

### 📁 RELATORIOS/
Relatórios de implementação, validação e melhorias.

### 📁 FASES/
Documentação das fases de desenvolvimento do projeto.

### 📁 SISTEMAS/
Documentação dos sistemas implementados.

### 📁 PLANOS/
Planos de ação e implementação.

### 📁 REAVALIACOES/
Reavaliações e análises de contexto.

### 📁 RESUMOS/
Resumos executivos e de documentação.

### 📁 PERFIS/
Perfis de usuários e padrões de nomenclatura.

### 📁 EXEMPLOS/
Exemplos práticos e FAQ.

### 📁 DADOS/
Dados coletados e para busca.

### 📁 COMANDOS/
Comandos PowerShell e scripts de execução.

### 📁 TESTES/
Scripts e arquivos de teste.

### 📁 INSTRUCOES/
Guias e instruções para novos chats.

### 📁 DOCUMENTACAO/
Documentação técnica e scripts.

### 📁 DEBUG/
Arquivos de debug e desenvolvimento.

### 📁 DIAGRAMAS/
Diagramas e visualizações.

### 📁 ANALISES/
Análises de treinamento e conflitos.

### 📁 CONFORMIDADE/
Relatórios de conformidade e percentuais.

### 📁 WORKSHOPS/
Workshops e treinamentos.

### 📁 TROUBLESHOOTING/
Guias de solução de problemas.

### 📁 PROMPTS/
Prompts estruturados para IA.

### 📁 DIRETIVAS/
Diretivas de pensamento crítico.

## Arquivos Principais na Raiz

- \`gap-analysis-funcionalidades-criticas.xlsx\` - Análise de lacunas e funcionalidades críticas
- \`resumo-executivo-separacao-mobile-web.md\` - Resumo da separação mobile/web
- \`README.md\` - Documentação principal do projeto
- \`package.json\` - Configurações do projeto
- \`phase5-config.json\` - Configuração da Fase 5
- \`phase6-config.json\` - Configuração da Fase 6

## Limpeza Realizada

- ✅ Backup completo criado em \`docs-backup-completo/\`
- ✅ Backup final criado em \`docs-backup-final/\`
- ✅ Backup da raiz criado em \`docs-backup-raiz/\`
- ✅ Arquivos obsoletos removidos
- ✅ Documentação organizada por categoria
- ✅ Estrutura limpa e navegável
- ✅ Apenas arquivos essenciais na raiz
- ✅ Arquivos da raiz organizados na documentação

---
*Reorganização completa realizada em: ${new Date().toISOString()}*
`;

    const readmePath = path.join(CONFIG.docsDir, 'README.md');
    fs.writeFileSync(readmePath, readmeContent);
    log('README.md atualizado com estrutura completa');
  },

  generateReport: (backupCount, organizedCount, deletedCount) => {
    const report = {
      timestamp: new Date().toISOString(),
      operacao: 'Organização dos Arquivos da Raiz',
      estatisticas: {
        arquivosBackup: backupCount,
        arquivosOrganizados: organizedCount,
        arquivosDeletados: deletedCount
      },
      estruturaFinal: {
        PROJETO: 'Documentos principais e planejamento',
        DESENVOLVIMENTO: 'Guias e processos de desenvolvimento',
        FUNCIONALIDADES: 'Especificações e lacunas funcionais',
        NEGOCIO: 'Planejamento de negócio',
        PROCESSOS: 'Regras e diretivas',
        REFERENCIAS: 'Índices e relatórios',
        TECNOLOGIAS: 'Documentação técnica',
        DESIGN: 'Interface e UX',
        SEGURANCA: 'Segurança e compliance',
        RELATORIOS: 'Relatórios de implementação e validação',
        FASES: 'Documentação das fases de desenvolvimento',
        SISTEMAS: 'Sistemas implementados',
        PLANOS: 'Planos de ação',
        REAVALIACOES: 'Reavaliações e análises',
        RESUMOS: 'Resumos executivos',
        PERFIS: 'Perfis e padrões',
        EXEMPLOS: 'Exemplos práticos',
        DADOS: 'Dados coletados',
        COMANDOS: 'Comandos PowerShell e scripts',
        TESTES: 'Scripts e arquivos de teste',
        INSTRUCOES: 'Guias e instruções',
        DOCUMENTACAO: 'Documentação técnica',
        DEBUG: 'Arquivos de debug',
        DIAGRAMAS: 'Diagramas e visualizações',
        ANALISES: 'Análises de treinamento',
        CONFORMIDADE: 'Relatórios de conformidade',
        WORKSHOPS: 'Workshops e treinamentos',
        TROUBLESHOOTING: 'Guias de solução',
        PROMPTS: 'Prompts estruturados',
        DIRETIVAS: 'Diretivas críticas'
      },
      arquivosNaRaiz: CONFIG.arquivosParaManterNaRaiz,
      observacoes: [
        'Backup completo disponível em docs-backup-completo/',
        'Backup final disponível em docs-backup-final/',
        'Backup da raiz disponível em docs-backup-raiz/',
        'Documentação completamente organizada por categoria',
        'Arquivos da raiz organizados na documentação',
        'Apenas arquivos essenciais na raiz',
        'Estrutura limpa e altamente navegável'
      ]
    };

    const reportPath = path.join(CONFIG.docsDir, 'RELATORIO-ORGANIZACAO-RAIZ.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log('Relatório de organização da raiz gerado');
  }
};

// Execução principal
const main = () => {
  log('Iniciando organização dos arquivos da raiz...');
  
  try {
    const backupCount = organizarRaiz.createBackup();
    const organizedCount = organizarRaiz.organizeByCategory();
    const deletedCount = organizarRaiz.deleteUncategorizedFiles();
    
    organizarRaiz.updateReadme();
    organizarRaiz.generateReport(backupCount, organizedCount, deletedCount);
    
    log('✅ Organização da raiz concluída com sucesso!');
    log(`📊 Resumo: ${backupCount} backup, ${organizedCount} organizados, ${deletedCount} deletados`);
    
  } catch (error) {
    log(`❌ Erro durante a operação: ${error.message}`);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { organizarRaiz, CONFIG }; 