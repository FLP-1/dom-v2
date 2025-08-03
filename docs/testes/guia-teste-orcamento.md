
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



// Validação de entrada de dados
function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}

// Validação de tipos
function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}



// Tratamento de erros centralizado
function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}:`, error.message);
  // Implementar logging, notificação, etc.
}

// Wrapper para funções com tratamento de erro
function safeExecute(fn: Function, context: string): any {
  try {
    return fn();
  } catch (error) {
    handleError(error as Error, context);
    throw error;
  }
}

/**
 * @fileoverview guia-teste-orcamento
 * @description Funcionalidade principal
 * @version 1.0.0
 * @author DOM v2 Team
 * @since 2025-07-26
 */

# 🧪 Guia de Teste Manual - Controle de Orçamento

## 📱 Como Testar

### 1. **Iniciar o App**
```bash
# No diretório raiz do projeto
npm run start-dev
# ou
cd frontend && npm start
```

### 2. **Acessar as Telas de Orçamento**

#### **Tela Principal (BudgetScreen)**
- Navegue para: `/budget` ou `/orcamento`
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
- Teste com backend rodando: `cd backend && npm run dev`
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
- Execute: `node scripts/implementar-controle-orcamento.js`

### **Erro: "apiClient is not defined"**
- Verifique se o arquivo api-client existe
- Execute: `node scripts/revisar-integracao-backend.js`

### **Erro: "Button component not found"**
- Verifique se os shared components existem
- Execute: `node scripts/estruturar-shared.js`

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

```bash
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
```
