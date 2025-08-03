
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
  backupDir: './docs-backup-final',
  arquivosParaManterNaRaiz: [
    // Apenas os arquivos principais mais importantes
    'gap-analysis-funcionalidades-criticas.xlsx',
    'resumo-executivo-separacao-mobile-web.md',
    'plano-reorganizacao-documentacao.md',
    'README.md',
    'RELATORIO-LIMPEZA-REORGANIZACAO.json'
  ],
  categoriasAdicionais: {
    RELATORIOS: [
      'RELATORIO_TESTE_MELHORIAS.md',
      'RELATORIO_VALIDACAO_IMPACTO.md',
      'RELATORIO_MELHORIAS_DOCUMENTACAO.md',
      'RELATORIO_OTIMIZACAO_COMANDOS.md',
      'RELATORIO_IMPLEMENTACAO_MELHORIAS.md',
      'RELATORIO_EXPANSAO_VALIDACOES.md',
      'RELATORIO_VALIDACAO_NOMENCLATURA.md',
      'relatorio-validacao-nomenclatura.md',
      'relatorio-validacao-impact.md',
      'relatorio-test-improvement-s.md',
      'relatorio-otimizacao-comandos.md',
      'relatorio-improvement-s-documentacao.md',
      'relatorio-implementacao-nomenclatura.md',
      'relatorio-implementacao-improvement-s.md',
      'relatorio-expansao-validacoes.md',
      'relatorio-analise-improvement-s.md',
      'relatorio-correcao-final.md',
      'relatorio-correcao-nomenclatura.md',
      'relatorio-100-conformidade.md',
      'relatorio-sucesso-folha-pagamento.md',
      'relatorio-sucesso-integracao-completa.md',
      'relatorio-telas-navegacao.md',
      'relatorio-validacao-cpfcnpj.md',
      'relatorio-eliminacao-hardcode-concluida.md',
      'relatorio-violacoes-regras.md',
      'relatorio-migracao-webpack-final.md'
    ],
    FASES: [
      'phase-5-implementacoes-concluidas.md',
      'phase-5-status-atual.md',
      'phase-5-setup-concluido.md',
      'phase-4-concluida-success.md',
      'phase-3-validacao-continua.md',
      'phase-2-concluida-success.md',
      'phase-2-adocao-em-andamento.md',
      'phase-1-otimizacao-concluida.md',
      'status-phase-4.md',
      'status-teste-final.md',
      'status-validacao-cpfcnpj.md'
    ],
    SISTEMAS: [
      'sistema-garantia-diretivas-implementado.md',
      'sistema-notificacoes-implementado.md',
      'system-diretivas-criticas-implementado.md',
      'analise-sistema-diretivas.md'
    ],
    PLANOS: [
      'plan-preparacao-phase-5.md',
      'plan-proximas-phase-s-etapas.md',
      'plan-implementacao-proximos-steps.md',
      'plan-acao-proximos-steps.md',
      'plano-proximos-passos-prioritarios.md',
      'plano-reorganizacao-documentacao.md'
    ],
    REAVALIACOES: [
      'reavaliacao-contextualizada-fatos-reais.md',
      'reavaliacao-complete-implementacao.md',
      'reavaliacao-proximos-passos-detalhada.md',
      'reavaliacao-proximos-passos-final.md'
    ],
    RESUMOS: [
      'resumo-proximos-steps-implementados.md',
      'resumo-documentacao-completa.md',
      'resumo-documentacao-continuidade.md',
      'resumo-documentacao-integridade.md',
      'resumo-executivo-fase-5.md',
      'resumo-atualizacao-documentacao.md'
    ],
    PERFIS: [
      'perfis-enriquecidos.md',
      'perfis-usuarios-detalhados.md',
      'padroes-nomenclatura.md',
      'exemplo-personalizacao.md'
    ],
    EXEMPLOS: [
      'EXEMPLOS_PRATICOS.md',
      'exemplos-praticos.md',
      'faq.md'
    ],
    DADOS: [
      'data-reais-coletados.md',
      'data-para-busca.md'
    ],
    COMANDOS: [
      'comandos-powershell-especificos.md',
      'checklist-qualidade.md',
      'checklist-prevencao-errors.md'
    ],
    ANALISES: [
      'analise-training-project-em-development.md',
      'analise-conflitos-diretivas.md',
      'acao-imediata-proximas-phase-s.md'
    ],
    CONFORMIDADE: [
      '100-percent-conformity-achieved.md',
      '100-percent-conformity.md',
      '100-percent-final.md',
      '100-percent-complete.md',
      '100-percent-complete-final.md'
    ],
    WORKSHOPS: [
      'workshop-adocao-phase2.md',
      'training-diretivas-criticas.md'
    ],
    TROUBLESHOOTING: [
      'TROUBLESHOOTING_GUIDE.md',
      'troubleshooting-guide.md'
    ],
    PROMPTS: [
      'prompts-estruturados-ia.md'
    ],
    DIRETIVAS: [
      'diretivas-pensamento-critico.md'
    ],
    DOCUMENTACAO: [
      'documentacao-status-completa.md'
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
    return fs.readdirSync(dirPath).filter(file => file.endsWith('.md') || file.endsWith('.xlsx') || file.endsWith('.json'));
  } catch (error) {
    log(`Erro ao listar arquivos em ${dirPath}: ${error.message}`);
    return [];
  }
};

// Funções principais
const limpezaFinal = {
  createBackup: () => {
    log('Criando backup dos arquivos restantes...');
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

  organizeRemainingFiles: () => {
    log('Organizando arquivos restantes por categoria...');
    let organizedCount = 0;
    
    Object.entries(CONFIG.categoriasAdicionais).forEach(([category, files]) => {
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

  deleteUncategorizedFiles: () => {
    log('Deletando arquivos não categorizados...');
    const files = listFiles(CONFIG.docsDir);
    let deletedCount = 0;
    
    files.forEach(file => {
      if (!CONFIG.arquivosParaManterNaRaiz.includes(file)) {
        const filePath = path.join(CONFIG.docsDir, file);
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
Comandos PowerShell e checklists.

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

### 📁 DOCUMENTACAO/
Status da documentação.

## Arquivos Principais na Raiz

- \`gap-analysis-funcionalidades-criticas.xlsx\` - Análise de lacunas e funcionalidades críticas
- \`resumo-executivo-separacao-mobile-web.md\` - Resumo da separação mobile/web
- \`plano-reorganizacao-documentacao.md\` - Plano de reorganização executado
- \`RELATORIO-LIMPEZA-REORGANIZACAO.json\` - Relatório da limpeza realizada

## Limpeza Realizada

- ✅ Backup completo criado em \`docs-backup-completo/\`
- ✅ Backup final criado em \`docs-backup-final/\`
- ✅ Arquivos obsoletos removidos
- ✅ Documentação organizada por categoria
- ✅ Estrutura limpa e navegável
- ✅ Apenas arquivos essenciais na raiz

---
*Reorganização final realizada em: ${new Date().toISOString()}*
`;

    const readmePath = path.join(CONFIG.docsDir, 'README.md');
    fs.writeFileSync(readmePath, readmeContent);
    log('README.md atualizado com estrutura final');
  },

  generateFinalReport: (backupCount, organizedCount, deletedCount) => {
    const report = {
      timestamp: new Date().toISOString(),
      operacao: 'Limpeza Final da Documentação',
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
        COMANDOS: 'Comandos e checklists',
        ANALISES: 'Análises de treinamento',
        CONFORMIDADE: 'Relatórios de conformidade',
        WORKSHOPS: 'Workshops e treinamentos',
        TROUBLESHOOTING: 'Guias de solução',
        PROMPTS: 'Prompts estruturados',
        DIRETIVAS: 'Diretivas críticas',
        DOCUMENTACAO: 'Status da documentação'
      },
      arquivosNaRaiz: CONFIG.arquivosParaManterNaRaiz,
      observacoes: [
        'Backup completo disponível em docs-backup-completo/',
        'Backup final disponível em docs-backup-final/',
        'Documentação completamente organizada por categoria',
        'Apenas arquivos essenciais na raiz',
        'Estrutura limpa e altamente navegável'
      ]
    };

    const reportPath = path.join(CONFIG.docsDir, 'RELATORIO-LIMPEZA-FINAL.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    log('Relatório final de limpeza gerado');
  }
};

// Execução principal
const main = () => {
  log('Iniciando limpeza final da documentação...');
  
  try {
    const backupCount = limpezaFinal.createBackup();
    const organizedCount = limpezaFinal.organizeRemainingFiles();
    const deletedCount = limpezaFinal.deleteUncategorizedFiles();
    
    limpezaFinal.updateReadme();
    limpezaFinal.generateFinalReport(backupCount, organizedCount, deletedCount);
    
    log('✅ Limpeza final concluída com sucesso!');
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

module.exports = { limpezaFinal, CONFIG }; 