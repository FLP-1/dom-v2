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