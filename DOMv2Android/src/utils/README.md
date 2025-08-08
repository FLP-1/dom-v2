
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
 * Tratamento robusto de erros
 * @param {Error} error - Erro capturado
 * @param {string} context - Contexto onde o erro ocorreu
 */
function handleError(error, context = 'unknown') {
  console.error(`[ERROR] ${context}:`, error.message);
  
  // Log estruturado para debugging
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    type: error.constructor.name
  };
  
  // Salvar log de erro
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'error-log.json'),
      JSON.stringify(errorLog) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
  
  // Re-throw para tratamento superior
  throw error;
}

// Aplicar tratamento de erro
try {
  // código principal aqui
} catch (error) {
  handleError(error, 'main-execution');
}


/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Utilitários e funções auxiliares
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - Dependências específicas do contexto
 * 
 * @usage
 * import { functionName } from "./utils";
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

# Repositório de Funções Genéricas - DOM v2

## 📁 Estrutura

```
frontend/src/utils/
├── generic-functions.js    # Funções genéricas reutilizáveis
├── messages.ts            # Sistema de mensagens centralizadas
├── validation.ts          # Validações específicas
└── README.md             # Esta documentação
```

## 🔧 Funções Disponíveis

### `createSystemNotification(type, customMessage, options)`
Cria notificações do sistema de forma padronizada.

**Parâmetros:**
- `type` (string): Tipo da notificação (TASK_REMINDER, PAYMENT_DUE, etc.)
- `customMessage` (string, opcional): Mensagem personalizada
- `options` (object, opcional): Opções adicionais

**Exemplo:**
```javascript
const notification = createSystemNotification('TASK_REMINDER', 'Tarefa específica vencendo', {
    taskId: '123',
    dueDate: '2024-12-25'
});
```

### `validateInput(data, rules)`
Valida dados de entrada com regras configuráveis.

**Parâmetros:**
- `data` (object): Dados a serem validados
- `rules` (object): Regras de validação

**Exemplo:**
```javascript
const rules = {
    name: { required: true, minLength: 3, maxLength: 50 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    age: { type: 'number', min: 18 }
};

const result = validateInput({ name: 'João', email: 'joao@email.com' }, rules);
```

### `formatDate(date, format, customFormat)`
Formata datas de forma consistente.

**Parâmetros:**
- `date` (string|Date): Data a ser formatada
- `format` (string): Formato desejado ('short', 'long', 'time', 'datetime', 'custom')
- `customFormat` (object, opcional): Formato customizado

**Exemplo:**
```javascript
formatDate('2024-12-25', 'long'); // "quarta-feira, 25 de dezembro de 2024"
formatDate('2024-12-25', 'short'); // "25/12/2024"
```

### `debounce(func, delay)`
Aplica debounce a uma função.

**Exemplo:**
```javascript
const debouncedSearch = debounce(searchFunction, 300);
```

### `throttle(func, limit)`
Aplica throttle a uma função.

**Exemplo:**
```javascript
const throttledScroll = throttle(handleScroll, 100);
```

### `generateUniqueId(prefix)`
Gera IDs únicos.

**Exemplo:**
```javascript
generateUniqueId('task'); // "task_1703123456789_abc123def"
```

### `existsInArray(array, value, field)`
Verifica se um valor existe em um array.

**Exemplo:**
```javascript
existsInArray(users, 'joao@email.com', 'email'); // true
```

### `removeDuplicates(array, field)`
Remove duplicatas de um array.

**Exemplo:**
```javascript
removeDuplicates(notifications, 'type'); // Remove notificações duplicadas por tipo
```

## 🎯 Tipos de Notificação Disponíveis

| Tipo | Prioridade | Descrição |
|------|------------|-----------|
| `TASK_REMINDER` | medium | Lembrete de tarefas pendentes |
| `PAYMENT_DUE` | high | Pagamento vencendo |
| `SYSTEM_UPDATE` | low | Atualização do sistema |
| `HELP_TIP` | low | Dicas do sistema |
| `PURCHASE_REMINDER` | medium | Lembrete de compras |
| `TASK_COMPLETED` | low | Tarefa concluída |
| `PAYMENT_RECEIVED` | low | Pagamento recebido |
| `PURCHASE_COMPLETED` | low | Compra realizada |
| `EMPLOYEE_ASSIGNED` | medium | Funcionário designado |
| `DEADLINE_APPROACHING` | high | Prazo se aproximando |

## 📝 Como Usar

### Importação
```javascript
import { createSystemNotification, validateInput, formatDate } from './utils/generic-functions.js';
```

### Uso em Componentes
```javascript
// Criar notificação
const notification = createSystemNotification('TASK_REMINDER');

// Validar formulário
const validation = validateInput(formData, validationRules);

// Formatar data
const formattedDate = formatDate(task.dueDate, 'long');
```

## 🔄 Extensibilidade

Para adicionar novos tipos de notificação:

1. Adicione o tipo em `messages`
2. Defina a prioridade em `priorities`
3. Use a função normalmente

```javascript
// Em generic-functions.js
const messages = {
    // ... tipos existentes
    'NEW_TYPE': 'Nova mensagem personalizada'
};

const priorities = {
    // ... prioridades existentes
    'NEW_TYPE': 'medium'
};
```

## 🧪 Testes

Todas as funções incluem:
- ✅ Validação de entrada
- ✅ Tratamento de erros
- ✅ Logs informativos
- ✅ Documentação JSDoc

## 📚 Convenções

- **Nomes:** camelCase para funções e variáveis
- **Documentação:** JSDoc para todas as funções
- **Validação:** Sempre validar entrada
- **Logs:** Console.log para sucesso, console.error para erros
- **Retorno:** null para falhas, objeto/dado para sucesso 