
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
 * Este arquivo implementa Documentação
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

# 🚀 GUIA PRÁTICO - SEED INTEGRADO DOM v2

## 📋 **VISÃO GERAL**

Este guia prático explica como usar o **Seed Integrado** implementado no DOM v2 para garantir integridade de dados e facilitar o desenvolvimento.

---

## 🎯 **QUANDO USAR O SEED INTEGRADO**

### **✅ CENÁRIOS DE USO**

1. **🆕 Novo Ambiente de Desenvolvimento**
   - Primeira configuração do projeto
   - Setup de ambiente limpo

2. **🔄 Reset de Dados**
   - Limpeza completa do banco
   - Volta ao estado inicial

3. **🧪 Testes de Integridade**
   - Validação de relacionamentos
   - Testes de constraints

4. **📊 Demonstração**
   - Apresentação do sistema
   - Dados de exemplo realistas

5. **🔧 Correção de Inconsistências**
   - Resolução de violações de constraints
   - Reparo de relacionamentos quebrados

---

## ⚙️ **COMO EXECUTAR**

### **🔧 PRÉ-REQUISITOS**

1. **PostgreSQL rodando**
2. **Banco de dados criado**
3. **Prisma configurado**
4. **Node.js instalado**

### **📝 COMANDOS PASSO A PASSO**

#### **PASSO 1: Navegar para o diretório**
```powershell
cd C:\dom-v2\backend
```

#### **PASSO 2: Configurar variável de ambiente**
```powershell
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
```

#### **PASSO 3: Gerar cliente Prisma**
```powershell
npx prisma generate
```

#### **PASSO 4: Compilar seed integrado**
```powershell
npx tsc prisma/seed-integrated.ts --outDir dist --target es2020 --module commonjs --esModuleInterop --skipLibCheck
```

#### **PASSO 5: Executar seed**
```powershell
node dist/seed-integrated.js
```

### **🎯 COMANDO COMPLETO (ONE-LINER)**
```powershell
cd C:\dom-v2\backend; $env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"; npx prisma generate; npx tsc prisma/seed-integrated.ts --outDir dist --target es2020 --module commonjs --esModuleInterop --skipLibCheck; node dist/seed-integrated.js
```

---

## 📊 **O QUE SERÁ CRIADO**

### **👥 DADOS DE USUÁRIOS**
- **2 usuários** com perfis diferentes
- **João Silva** (Administrador)
- **Maria Santos** (Usuário comum)

### **👥 GRUPOS E PERMISSÕES**
- **2 grupos** (Administradores, Usuários)
- **2 relacionamentos** usuário-grupo
- **2 sessões** de usuário

### **👷 FUNCIONALIDADES PRINCIPAIS**
- **3 funcionários** (Ana, Pedro, Lucia)
- **3 orçamentos** (Geral, Alimentação, Transporte)
- **3 folhas de pagamento** (com cálculos reais)
- **3 pagamentos** (pendentes e completados)
- **3 compras** (diferentes categorias)

### **🔔 SISTEMA DE NOTIFICAÇÕES**
- **3 notificações** (info, warning, success)
- **3 tarefas** (limpeza, jardinagem, cozinha)

---

## 🧪 **VALIDAÇÃO DOS DADOS**

### **✅ VERIFICAÇÃO AUTOMÁTICA**

O seed integrado executa verificações automáticas:

```typescript
// Logs de progresso
📝 Criando usuários...
✅ Criados 2 usuários
👥 Criando grupos...
✅ Criados 2 grupos
🔗 Criando relacionamentos usuário-grupo...
✅ Criados 2 relacionamentos usuário-grupo
// ... continua para todas as tabelas
```

### **🔍 VERIFICAÇÃO MANUAL**

#### **1. Testar APIs**
```powershell
# Budgets
curl http://localhost:3001/api/budgets

# Employees
curl http://localhost:3001/api/employees

# Payrolls
curl http://localhost:3001/api/payroll
```

#### **2. Verificar Banco de Dados**
```sql
-- Contar registros por tabela
SELECT 'users' as tabela, COUNT(*) as total FROM users
UNION ALL
SELECT 'employees', COUNT(*) FROM employees
UNION ALL
SELECT 'budgets', COUNT(*) FROM budgets
UNION ALL
SELECT 'payrolls', COUNT(*) FROM payrolls;
```

#### **3. Validar Relacionamentos**
```sql
-- Verificar integridade referencial
SELECT COUNT(*) as violacoes 
FROM budgets b 
LEFT JOIN users u ON b.user_id = u.id 
WHERE u.id IS NULL;
-- Resultado esperado: 0
```

---

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **❌ ERRO: Prisma Client não inicializado**
```bash
Error: @prisma/client did not initialize yet
```

**Solução:**
```powershell
npx prisma generate
```

### **❌ ERRO: UUID inválido**
```bash
Error creating UUID, invalid character
```

**Solução:**
- Verificar formato dos IDs
- Remover campos opcionais problemáticos
- Reexecutar seed

### **❌ ERRO: Chave estrangeira violada**
```bash
Foreign key constraint failed
```

**Solução:**
- Verificar ordem de criação
- Limpar banco antes de reexecutar
- Validar dados de entrada

### **❌ ERRO: Conexão com banco**
```bash
Connection refused
```

**Solução:**
- Verificar se PostgreSQL está rodando
- Validar DATABASE_URL
- Testar conexão manualmente

---

## 🔄 **RESET COMPLETO**

### **🔄 LIMPAR E RECRIAR TUDO**

#### **PASSO 1: Parar servidor**
```powershell
# Ctrl+C no terminal do servidor
```

#### **PASSO 2: Reset do banco**
```powershell
cd C:\dom-v2\backend
npx prisma migrate reset --force
```

#### **PASSO 3: Aplicar migrações**
```powershell
npx prisma migrate deploy
```

#### **PASSO 4: Executar seed integrado**
```powershell
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
npx prisma generate
npx tsc prisma/seed-integrated.ts --outDir dist --target es2020 --module commonjs --esModuleInterop --skipLibCheck
node dist/seed-integrated.js
```

#### **PASSO 5: Reiniciar servidor**
```powershell
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
node dist/server-prisma.js
```

---

## 📈 **MONITORAMENTO**

### **📊 LOGS ESPERADOS**

```bash
🌱 Iniciando seed integrado do banco de dados...
📝 Criando usuários...
✅ Criados 2 usuários
👥 Criando grupos...
✅ Criados 2 grupos
🔗 Criando relacionamentos usuário-grupo...
✅ Criados 2 relacionamentos usuário-grupo
👷 Criando funcionários...
✅ Criados 3 funcionários
💰 Criando orçamentos...
✅ Criados 3 orçamentos
💼 Criando folhas de pagamento...
✅ Criados 3 registros de folha de pagamento
💳 Criando pagamentos...
✅ Criados 3 pagamentos
🛒 Criando compras...
✅ Criados 3 compras
🔔 Criando notificações...
✅ Criadas 3 notificações
📋 Criando tarefas...
✅ Criadas 3 tarefas
🔐 Criando sessões de usuário...
✅ Criadas 2 sessões de usuário
🎉 Seed integrado concluído com sucesso!
```

### **📊 RESUMO FINAL**
```
📊 Resumo dos dados criados:
   - 2 usuários
   - 2 grupos
   - 2 relacionamentos usuário-grupo
   - 3 funcionários
   - 3 orçamentos
   - 3 folhas de pagamento
   - 3 pagamentos
   - 3 compras
   - 3 notificações
   - 3 tarefas
   - 2 sessões de usuário
```

---

## 🎯 **BEST PRACTICES**

### **✅ RECOMENDAÇÕES**

1. **🔄 Sempre fazer backup antes**
   - Dados importantes podem ser perdidos
   - Use `pg_dump` se necessário

2. **🧪 Testar em ambiente isolado**
   - Use banco de desenvolvimento
   - Evite executar em produção

3. **📝 Documentar mudanças**
   - Registre modificações no seed
   - Mantenha histórico de versões

4. **🔍 Validar após execução**
   - Teste APIs principais
   - Verifique relacionamentos

5. **⚡ Otimizar para performance**
   - Use transações quando possível
   - Evite operações desnecessárias

### **❌ EVITAR**

1. **🚫 Executar em produção sem backup**
2. **🚫 Modificar seed sem testar**
3. **🚫 Ignorar logs de erro**
4. **🚫 Executar sem verificar pré-requisitos**
5. **🚫 Usar dados sensíveis no seed**

---

## 🔮 **PRÓXIMOS PASSOS**

### **🎯 APÓS EXECUTAR O SEED**

1. **🧪 Testar todas as APIs**
   ```powershell
   curl http://localhost:3001/api/budgets
   curl http://localhost:3001/api/employees
   curl http://localhost:3001/api/payroll
   ```

2. **🎨 Integrar com frontend**
   - Conectar micro-frontends
   - Testar interface

3. **📊 Implementar dashboard**
   - Usar dados integrados
   - Criar visualizações

4. **🔧 Corrigir problemas identificados**
   - Tasks API (erro UUID)
   - Dashboard API

---

## 📞 **SUPORTE**

### **🔗 DOCUMENTAÇÃO RELACIONADA**
- [Estratégia de Integridade de Dados](./estrategia-integridade-dados.md)
- [Schema Prisma](../backend/prisma/schema.prisma)
- [Seed Integrado](../backend/prisma/seed-integrated.ts)

### **🚨 EM CASO DE PROBLEMAS**
1. Verificar logs de erro
2. Validar pré-requisitos
3. Consultar documentação
4. Executar reset completo se necessário

---

*Guia criado em: 2025-01-23*  
*Versão: 1.0.0*  
*Autor: DOM Team v2*  
*Status: ✅ Ativo e Funcional* 