
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
      path.join(logsDir, 'application.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Aplicar logging
logStructured('info', 'Iniciando execução', { context: 'main' });


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
 * Este arquivo implementa Testes unitários
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

// Função de log que funciona no PowerShell
const log = (message) => {
  process.stdout.write(`[${new Date().toISOString()}] ${message}\n`);
};

log('🧪 Iniciando testes do controle de orçamento...');

const CONFIG = {
  frontendDir: './frontend',
  testResults: []
};

// Funções de teste
const testarControleOrcamento = {
  verificarArquivos: () => {
    log('📁 Verificando arquivos criados...');
    
    const arquivosEsperados = {
      telas: [
        'frontend/src/screens/budget/BudgetScreen.tsx',
        'frontend/src/screens/budget/BudgetCreateScreen.tsx',
        'frontend/src/screens/budget/BudgetDetailScreen.tsx',
        'frontend/src/screens/budget/index.ts'
      ],
      componentes: [
        'frontend/src/components/budget/BudgetCard.tsx',
        'frontend/src/components/budget/BudgetForm.tsx',
        'frontend/src/components/budget/BudgetChart.tsx',
        'frontend/src/components/budget/BudgetList.tsx',
        'frontend/src/components/budget/index.ts'
      ],
      hooks: [
        'frontend/src/hooks/useBudget.ts',
        'frontend/src/hooks/useBudgetAnalytics.ts'
      ],
      utils: [
        'frontend/src/utils/budget-calculations.ts',
        'frontend/src/utils/budget-validation.ts'
      ]
    };

    let totalArquivos = 0;
    let arquivosExistentes = 0;
    let arquivosFaltando = [];

    Object.entries(arquivosEsperados).forEach(([categoria, arquivos]) => {
      log(`\n🔍 Verificando ${categoria}:`);
      arquivos.forEach(arquivo => {
        totalArquivos++;
        if (fs.existsSync(arquivo)) {
          const stats = fs.statSync(arquivo);
          if (stats.size > 0) {
            log(`  ✅ ${arquivo} (${stats.size} bytes)`);
            arquivosExistentes++;
          } else {
            log(`  ⚠️  ${arquivo} (vazio)`);
            arquivosFaltando.push(arquivo);
          }
        } else {
          log(`  ❌ ${arquivo} (não encontrado)`);
          arquivosFaltando.push(arquivo);
        }
      });
    });

    return {
      totalArquivos,
      arquivosExistentes,
      arquivosFaltando,
      percentualSucesso: (arquivosExistentes / totalArquivos) * 100
    };
  },

  verificarEstruturaComponentes: () => {
    log('\n🔧 Verificando estrutura dos componentes...');
    
    const componentes = [
      'frontend/src/components/budget/BudgetCard.tsx',
      'frontend/src/components/budget/BudgetForm.tsx',
      'frontend/src/components/budget/BudgetChart.tsx',
      'frontend/src/components/budget/BudgetList.tsx'
    ];

    const resultados = [];

    componentes.forEach(componente => {
      if (fs.existsSync(componente)) {
        const conteudo = fs.readFileSync(componente, 'utf8');
        const verificacoes = {
          arquivo: componente,
          temImportReact: conteudo.includes('import React'),
          temExport: conteudo.includes('export const'),
          temInterface: conteudo.includes('interface'),
          temStyleSheet: conteudo.includes('StyleSheet.create'),
          temJSX: conteudo.includes('return (') || conteudo.includes('return('),
          tamanho: conteudo.length
        };

        const score = Object.values(verificacoes).filter(v => v === true).length;
        verificacoes.score = score;
        verificacoes.status = score >= 4 ? '✅ OK' : score >= 2 ? '⚠️  Parcial' : '❌ Problema';

        resultados.push(verificacoes);
        log(`  ${verificacoes.status} ${componente} (score: ${score}/6)`);
      }
    });

    return resultados;
  },

  verificarHooks: () => {
    log('\n🎣 Verificando hooks...');
    
    const hooks = [
      'frontend/src/hooks/useBudget.ts',
      'frontend/src/hooks/useBudgetAnalytics.ts'
    ];

    const resultados = [];

    hooks.forEach(hook => {
      if (fs.existsSync(hook)) {
        const conteudo = fs.readFileSync(hook, 'utf8');
        const verificacoes = {
          arquivo: hook,
          temImportReact: conteudo.includes('import { useState'),
          temUseState: conteudo.includes('useState'),
          temUseEffect: conteudo.includes('useEffect'),
          temUseCallback: conteudo.includes('useCallback'),
          temInterface: conteudo.includes('interface'),
          temExport: conteudo.includes('export const'),
          temApiClient: conteudo.includes('apiClient'),
          tamanho: conteudo.length
        };

        const score = Object.values(verificacoes).filter(v => v === true).length;
        verificacoes.score = score;
        verificacoes.status = score >= 5 ? '✅ OK' : score >= 3 ? '⚠️  Parcial' : '❌ Problema';

        resultados.push(verificacoes);
        log(`  ${verificacoes.status} ${hook} (score: ${score}/8)`);
      }
    });

    return resultados;
  },

  verificarUtils: () => {
    log('\n🛠️  Verificando utilitários...');
    
    const utils = [
      'frontend/src/utils/budget-calculations.ts',
      'frontend/src/utils/budget-validation.ts'
    ];

    const resultados = [];

    utils.forEach(util => {
      if (fs.existsSync(util)) {
        const conteudo = fs.readFileSync(util, 'utf8');
        const verificacoes = {
          arquivo: util,
          temExport: conteudo.includes('export'),
          temInterface: conteudo.includes('interface'),
          temFunction: conteudo.includes('function') || conteudo.includes('const'),
          temReturn: conteudo.includes('return'),
          tamanho: conteudo.length
        };

        const score = Object.values(verificacoes).filter(v => v === true).length;
        verificacoes.score = score;
        verificacoes.status = score >= 4 ? '✅ OK' : score >= 2 ? '⚠️  Parcial' : '❌ Problema';

        resultados.push(verificacoes);
        log(`  ${verificacoes.status} ${util} (score: ${score}/5)`);
      }
    });

    return resultados;
  },

  verificarIntegracao: () => {
    log('\n🔗 Verificando integração...');
    
    const verificacoes = {
      sharedComponents: false,
      apiClient: false,
      navigation: false,
      styling: false
    };

    // Verificar se existe shared/components/ui
    if (fs.existsSync('frontend/src/micro-frontends/shared/components/ui/Button.tsx')) {
      verificacoes.sharedComponents = true;
      log('  ✅ Shared components encontrados');
    } else {
      log('  ❌ Shared components não encontrados');
    }

    // Verificar se existe api-client
    if (fs.existsSync('frontend/src/micro-frontends/shared/utils/core/api-client.ts')) {
      verificacoes.apiClient = true;
      log('  ✅ API client encontrado');
    } else {
      log('  ❌ API client não encontrado');
    }

    // Verificar se existe navigation
    if (fs.existsSync('frontend/src/navigation/AppNavigator.tsx')) {
      verificacoes.navigation = true;
      log('  ✅ Navigation encontrado');
    } else {
      log('  ❌ Navigation não encontrado');
    }

    // Verificar se existe styling
    const budgetCard = fs.readFileSync('frontend/src/components/budget/BudgetCard.tsx', 'utf8');
    if (budgetCard.includes('StyleSheet.create')) {
      verificacoes.styling = true;
      log('  ✅ Styling implementado');
    } else {
      log('  ❌ Styling não implementado');
    }

    return verificacoes;
  },

  criarTesteManual: () => {
    log('\n📝 Criando guia de teste manual...');
    
    const guiaTeste = `# 🧪 Guia de Teste Manual - Controle de Orçamento

## 📱 Como Testar

### 1. **Iniciar o App**
\`\`\`bash
# No diretório raiz do projeto
npm run start-dev
# ou
cd frontend && npm start
\`\`\`

### 2. **Acessar as Telas de Orçamento**

#### **Tela Principal (BudgetScreen)**
- Navegue para: \`/budget\` ou \`/orcamento\`
- Verifique se carrega sem erros
- Teste os filtros de período (Semana/Mês/Ano)
- Verifique se o gráfico de progresso aparece
- Teste o botão "+ Novo"

#### **Tela de Criação (BudgetCreateScreen)**
- Clique em "+ Novo" na tela principal
- Preencha o formulário:
  - Nome: "Teste Orçamento"
  - Valor: "1000.00"
  - Categoria: Selecione uma categoria
  - Data início: Data atual
  - Data fim: Data futura
  - Descrição: "Orçamento de teste"
- Clique em "Criar Orçamento"
- Verifique se retorna para a lista

#### **Tela de Detalhes (BudgetDetailScreen)**
- Clique em um orçamento na lista
- Verifique se mostra:
  - Nome e categoria
  - Card detalhado
  - Gráfico de progresso
  - Valores (Total, Gasto, Restante)

### 3. **Testes de Funcionalidade**

#### **Validação de Formulário**
- Tente criar orçamento sem preencher campos obrigatórios
- Teste valores negativos ou zero
- Teste datas inválidas
- Verifique se as mensagens de erro aparecem

#### **Cálculos**
- Crie um orçamento de R$ 1000
- Adicione um gasto de R$ 300
- Verifique se o progresso mostra 30%
- Verifique se o valor restante é R$ 700

#### **Categorias**
- Teste todas as categorias disponíveis:
  - Alimentação
  - Transporte
  - Moradia
  - Saúde
  - Educação
  - Lazer
  - Vestuário
  - Outros

### 4. **Testes de Interface**

#### **Responsividade**
- Teste em diferentes tamanhos de tela
- Verifique se os cards se adaptam
- Teste a rolagem da lista

#### **Estados de Loading**
- Verifique se aparece "Carregando..." durante operações
- Teste o estado de erro (desconecte a internet)

#### **Navegação**
- Teste voltar para a tela anterior
- Verifique se a navegação funciona corretamente

### 5. **Testes de Integração**

#### **API Backend**
- Verifique se as requisições são feitas corretamente
- Teste com backend rodando: \`cd backend && npm run dev\`
- Verifique se os dados são salvos no banco

#### **Persistência**
- Crie um orçamento
- Recarregue a página
- Verifique se o orçamento ainda aparece

### 6. **Testes de Performance**

#### **Lista de Orçamentos**
- Crie 10+ orçamentos
- Verifique se a lista rola suavemente
- Teste a busca/filtro se implementado

#### **Gráficos**
- Verifique se os gráficos renderizam rapidamente
- Teste com muitos dados

## 🐛 Problemas Comuns

### **Erro: "Cannot find module"**
- Verifique se todos os arquivos foram criados
- Execute: \`node scripts/implementar-controle-orcamento.js\`

### **Erro: "apiClient is not defined"**
- Verifique se o arquivo api-client existe
- Execute: \`node scripts/revisar-integracao-backend.js\`

### **Erro: "Button component not found"**
- Verifique se os shared components existem
- Execute: \`node scripts/estruturar-shared.js\`

### **Tela não carrega**
- Verifique o console do navegador
- Verifique se as rotas estão configuradas
- Teste acessando diretamente a URL

## 📊 Métricas de Sucesso

- ✅ App inicia sem erros
- ✅ Telas carregam corretamente
- ✅ Formulários validam dados
- ✅ Cálculos funcionam
- ✅ Navegação funciona
- ✅ Dados persistem
- ✅ Interface responsiva
- ✅ Performance adequada

## 🔧 Comandos Úteis

\`\`\`bash
# Verificar arquivos criados
ls frontend/src/screens/budget/
ls frontend/src/components/budget/
ls frontend/src/hooks/ | findstr Budget
ls frontend/src/utils/ | findstr budget

# Executar testes
npm test

# Verificar logs
npm run start-dev 2>&1 | tee logs.txt

# Limpar cache
npm run clean
\`\`\`
`;

    fs.writeFileSync('./docs/testes/guia-teste-orcamento.md', guiaTeste);
    log('  📄 Guia de teste manual criado: docs/testes/guia-teste-orcamento.md');
  },

  gerarRelatorio: (resultados) => {
    log('\n📊 Gerando relatório de testes...');
    
    const relatorio = {
      timestamp: new Date().toISOString(),
      operacao: 'Teste do Controle de Orçamento',
      resumo: {
        arquivosVerificados: resultados.arquivos.totalArquivos,
        arquivosExistentes: resultados.arquivos.arquivosExistentes,
        percentualSucesso: resultados.arquivos.percentualSucesso.toFixed(1) + '%',
        componentesTestados: resultados.componentes.length,
        hooksTestados: resultados.hooks.length,
        utilsTestados: resultados.utils.length
      },
      detalhes: {
        arquivos: resultados.arquivos,
        componentes: resultados.componentes,
        hooks: resultados.hooks,
        utils: resultados.utils,
        integracao: resultados.integracao
      },
      status: resultados.arquivos.percentualSucesso >= 80 ? '✅ SUCESSO' : 
              resultados.arquivos.percentualSucesso >= 60 ? '⚠️  PARCIAL' : '❌ FALHA',
      recomendacoes: []
    };

    // Gerar recomendações
    if (resultados.arquivos.arquivosFaltando.length > 0) {
      relatorio.recomendacoes.push('Executar novamente o script de implementação');
    }

    if (resultados.componentes.some(c => c.score < 4)) {
      relatorio.recomendacoes.push('Revisar estrutura dos componentes');
    }

    if (resultados.hooks.some(h => h.score < 5)) {
      relatorio.recomendacoes.push('Revisar implementação dos hooks');
    }

    if (!resultados.integracao.sharedComponents) {
      relatorio.recomendacoes.push('Configurar shared components');
    }

    if (!resultados.integracao.apiClient) {
      relatorio.recomendacoes.push('Configurar API client');
    }

    // Salvar relatório
    fs.writeFileSync('./docs/reports/teste-orcamento-report.json', JSON.stringify(relatorio, null, 2));
    log('  📄 Relatório salvo: docs/reports/teste-orcamento-report.json');

    return relatorio;
  }
};

// Execução principal
try {
  log('🚀 Iniciando testes...\n');

  const resultados = {
    arquivos: testarControleOrcamento.verificarArquivos(),
    componentes: testarControleOrcamento.verificarEstruturaComponentes(),
    hooks: testarControleOrcamento.verificarHooks(),
    utils: testarControleOrcamento.verificarUtils(),
    integracao: testarControleOrcamento.verificarIntegracao()
  };

  testarControleOrcamento.criarTesteManual();
  const relatorio = testarControleOrcamento.gerarRelatorio(resultados);

  // Resumo final
  log('\n' + '='.repeat(60));
  log('📋 RESUMO DOS TESTES');
  log('='.repeat(60));
  log(`📁 Arquivos: ${resultados.arquivos.arquivosExistentes}/${resultados.arquivos.totalArquivos} (${resultados.arquivos.percentualSucesso.toFixed(1)}%)`);
  log(`🔧 Componentes: ${resultados.componentes.filter(c => c.status === '✅ OK').length}/${resultados.componentes.length}`);
  log(`🎣 Hooks: ${resultados.hooks.filter(h => h.status === '✅ OK').length}/${resultados.hooks.length}`);
  log(`🛠️  Utils: ${resultados.utils.filter(u => u.status === '✅ OK').length}/${resultados.utils.length}`);
  log(`🔗 Integração: ${Object.values(resultados.integracao).filter(v => v).length}/4`);
  log(`\n🎯 STATUS FINAL: ${relatorio.status}`);
  
  if (relatorio.recomendacoes.length > 0) {
    log('\n💡 RECOMENDAÇÕES:');
    relatorio.recomendacoes.forEach((rec, index) => {
      log(`  ${index + 1}. ${rec}`);
    });
  }

  log('\n✅ Testes concluídos!');
  log('📖 Consulte o guia de teste manual: docs/testes/guia-teste-orcamento.md');
  
} catch (error) {
  log('❌ Erro durante os testes: ' + error.message);
} 