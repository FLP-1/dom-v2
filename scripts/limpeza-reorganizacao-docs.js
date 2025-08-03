
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
  backupDir: './docs-backup-completo',
  arquivosParaManter: [
    // Arquivos principais atualizados
    'gap-analysis-funcionalidades-criticas.xlsx',
    'resumo-executivo-separacao-mobile-web.md',
    'plano-reorganizacao-documentacao.md',
    'INDICE-DOCUMENTACAO.md',
    'guia-rapido-diretivas-criticas.md',
    'processo-development-secure.md',
    'regras-criticas-powershell.md',
    'guia-pensamento-critico.md',
    'regras-project-dom-v2.md',
    'guia-uso-seed-integrado.md',
    'estrategia-integridade-dados.md',
    'sistema-pensamento-critico-implementado.md',
    'processo-garantia-diretivas.md',
    'sistema-garantia-diretivas.md',
    'sistema-inicializacao-novos-chats.md',
    'instrucoes-implementacao-praticas.md',
    'auditoria-melhores-praticas.md',
    'planejamento-completo-impacto-usuario.md',
    'guia-testes-completo.md',
    'funcionalidades-disruptivas-praticas.md',
    'lacunas-desenvolvimento-qualidade.md',
    'lacunas-funcionais-empresariais.md',
    'lacunas-funcionais-expandidas.md',
    'plano-fase6-revisada.md',
    'lacunas-funcionais-detalhadas.md',
    'fase-5-concluida-100-percent.md',
    'personalizacao-avancada-implementada.md',
    'analise-preditiva-implementada.md',
    'RELATORIO_ANALISE_MELHORIAS.md'
  ],
  arquivosParaDeletar: [
    // Arquivos desatualizados ou duplicados
    'CHAT_CONTINUATION.md',
    'NEXT_CHAT_GUIDE.md',
    'status-atual-novo-chat.md',
    'resumo-executivo-novo-chat.md',
    'comando-inicial-novo-chat.md',
    'contexto-rapido-novo-chat.md',
    'contexto-completo-novo-chat.md',
    'instrucoes-complete-s-novo-chat.md',
    'instrucoes-rapidas-novo-chat.md',
    'instrucoes-novo-chat-completas.md',
    'instrucoes-novo-chat-continuidade.md',
    'instrucoes-novo-chat.md',
    'implementacao-telas-splash-login.md',
    'teste-final-completo.md',
    'status-teste-final.md',
    'correcao-element-type-invalid-final.md',
    'correcao-fast-refresh-final.md',
    'relatorio-migracao-webpack-final.md',
    'migracao-webpack-completa.md',
    'escalada-tecnica-react-native-web.md',
    'relatorio-telas-navegacao.md',
    'relatorio-validacao-cpfcnpj.md',
    'status-validacao-cpfcnpj.md',
    'relatorio-eliminacao-hardcode-concluida.md',
    'componentes-ui-expandidos.md',
    'plano-proximos-passos-prioritarios.md',
    'reflexao-arquitetura-micro-frontends.md',
    'analise-falha-cicd-pipeline.md',
    'solucao-conflito-mock-react-native-web.md',
    'scripts-instalacao-criados.md',
    'correcao-violacoes-concluida.md',
    'relatorio-violacoes-regras.md',
    'build-completo-dom-v2.md',
    'correcao-typescript-padronizacao.md',
    'status-atual-continuacao-desenvolvimento.md',
    'resumo-documentacao-integridade.md',
    'troubleshooting-prisma-postgresql.md',
    'registro-decisoes-criticas.md',
    'erro-codificacao-prisma-postgresql.md',
    'resumo-atualizacao-documentacao.md',
    'planejamento-proximos-passos.md',
    'aprendizados-react-native-web.md',
    'resumo-documentacao-continuidade.md',
    'continuidade-desenvolvimento-hibrido.md',
    'relatorio-sucesso-integracao-completa.md',
    'relatorio-sucesso-folha-pagamento.md',
    'resumo-documentacao-completa.md',
    'planejamento-revisado-funcionalidades.md',
    'continuidade-desenvolvimento-atual.md',
    'registro-planejamento-proximos-passos.md',
    'reavaliacao-proximos-passos-final.md',
    'reavaliacao-proximos-passos-detalhada.md',
    'phase1-week1-status.md',
    'planejamento-global-integrado.md',
    'atualizacao-documentacao-completa.md',
    'status-atual-project.md',
    'resumo-executivo-fase-5.md',
    'documentacao-completa-dom-v2.md',
    'status-atual-fase-5.md',
    'phase-5-concluida-100-percent.md'
  ],
  categorias: {
    DESENVOLVIMENTO: [
      'guia-testes-completo.md',
      'instrucoes-implementacao-praticas.md',
      'processo-development-secure.md',
      'regras-criticas-powershell.md',
      'guia-uso-seed-integrado.md',
      'sistema-pensamento-critico-implementado.md',
      'processo-garantia-diretivas.md',
      'sistema-garantia-diretivas.md',
      'sistema-inicializacao-novos-chats.md'
    ],
    FUNCIONALIDADES: [
      'funcionalidades-disruptivas-praticas.md',
      'lacunas-funcionais-completas.md',
      'lacunas-funcionais-detalhadas.md',
      'lacunas-funcionais-empresariais.md',
      'lacunas-funcionais-expandidas.md',
      'lacunas-desenvolvimento-qualidade.md'
    ],
    NEGOCIO: [
      'planejamento-completo-impacto-usuario.md',
      'plano-fase6-revisada.md',
      'fase-5-concluida-100-percent.md',
      'personalizacao-avancada-implementada.md',
      'analise-preditiva-implementada.md'
    ],
    PROCESSOS: [
      'guia-pensamento-critico.md',
      'regras-project-dom-v2.md',
      'guia-rapido-diretivas-criticas.md',
      'estrategia-integridade-dados.md'
    ],
    REFERENCIAS: [
      'INDICE-DOCUMENTACAO.md',
      'auditoria-melhores-praticas.md',
      'RELATORIO_ANALISE_MELHORIAS.md'
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
    return fs.readdirSync(dirPath).filter(file => file.endsWith('.md') || file.endsWith('.xlsx'));
  } catch (error) {
    log(`Erro ao listar arquivos em ${dirPath}: ${error.message}`);
    return [];
  }
};

// Funções principais
const limpezaReorganizacao = {
  createBackup: () => {
    log('Criando backup completo...');
    createDirectory(CONFIG.backupDir);
    
    const files = listFiles(CONFIG.docsDir);
    let backupCount = 0;
    
    files.forEach(file => {
      const sourcePath = path.join(CONFIG.docsDir, file);
      const backupPath = path.join(CONFIG.backupDir, file);
      if (copyFile(sourcePath, backupPath)) {
        backupCount++;
      }
    });
    
    log(`Backup concluído: ${backupCount} arquivos`);
    return backupCount;
  },

  deleteObsoleteFiles: () => {
    log('Deletando arquivos obsoletos...');
    let deletedCount = 0;
    
    CONFIG.arquivosParaDeletar.forEach(file => {
      const filePath = path.join(CONFIG.docsDir, file);
      if (fs.existsSync(filePath)) {
        if (deleteFile(filePath)) {
          deletedCount++;
        }
      }
    });
    
    log(`Arquivos obsoletos deletados: ${deletedCount}`);
    return deletedCount;
  },

  organizeByCategory: () => {
    log('Organizando arquivos por categoria...');
    let organizedCount = 0;
    
    Object.entries(CONFIG.categorias).forEach(([category, files]) => {
      const categoryDir = path.join(CONFIG.docsDir, category);
      createDirectory(categoryDir);
      
      files.forEach(file => {
        const sourcePath = path.join(CONFIG.docsDir, file);
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

  createCleanReadme: () => {
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

## Arquivos Principais na Raiz

- \`gap-analysis-funcionalidades-criticas.xlsx\` - Análise de lacunas e funcionalidades críticas
- \`resumo-executivo-separacao-mobile-web.md\` - Resumo da separação mobile/web
- \`plano-reorganizacao-documentacao.md\` - Plano de reorganização executado

## Limpeza Realizada

- ✅ Backup completo criado em \`docs-backup-completo/\`
- ✅ Arquivos obsoletos removidos
- ✅ Documentação organizada por categoria
- ✅ Estrutura limpa e navegável

---
*Reorganização realizada em: ${new Date().toISOString()}*
`;

    const readmePath = path.join(CONFIG.docsDir, 'README.md');
    fs.writeFileSync(readmePath, readmeContent);
    log('README.md atualizado');
  },

  generateReport: (backupCount, deletedCount, organizedCount) => {
    const report = {
      timestamp: new Date().toISOString(),
      operacao: 'Limpeza e Reorganização da Documentação',
      estatisticas: {
        arquivosBackup: backupCount,
        arquivosDeletados: deletedCount,
        arquivosOrganizados: organizedCount
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
        SEGURANCA: 'Segurança e compliance'
      },
      arquivosPrincipais: CONFIG.arquivosParaManter,
      observacoes: [
        'Backup completo disponível em docs-backup-completo/',
        'Documentação agora organizada por categoria',
        'Arquivos obsoletos removidos',
        'Estrutura limpa e navegável'
      ]
    };

    const reportPath = path.join(CONFIG.docsDir, 'RELATORIO-LIMPEZA-REORGANIZACAO.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log('Relatório de limpeza gerado');
  }
};

// Execução principal
const main = () => {
  log('Iniciando limpeza e reorganização da documentação...');
  
  try {
    const backupCount = limpezaReorganizacao.createBackup();
    const deletedCount = limpezaReorganizacao.deleteObsoleteFiles();
    const organizedCount = limpezaReorganizacao.organizeByCategory();
    
    limpezaReorganizacao.createCleanReadme();
    limpezaReorganizacao.generateReport(backupCount, deletedCount, organizedCount);
    
    log('✅ Limpeza e reorganização concluída com sucesso!');
    log(`📊 Resumo: ${backupCount} backup, ${deletedCount} deletados, ${organizedCount} organizados`);
    
  } catch (error) {
    log(`❌ Erro durante a operação: ${error.message}`);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { limpezaReorganizacao, CONFIG }; 