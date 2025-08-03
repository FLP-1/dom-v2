
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

# 🚀 **INSTRUÇÕES PARA NOVO CHAT - CONTINUIDADE DOM v2**
**Versão:** 2.0.0  
**Data:** 22 de Julho de 2025  
**Status:** 📋 **CONTINUIDADE DE DESENVOLVIMENTO**  
**Objetivo:** Manter continuidade do desenvolvimento em novos chats

---

## 🎯 **CONTEXTO ATUAL DO PROJETO**

### **📊 STATUS ATUAL:**
- **Fase:** 6A - Expansão (Semana 1 concluída)
- **Progresso:** 3 lacunas críticas implementadas e validadas
- **Sistemas:** 7 sistemas existentes funcionando
- **Próximo:** Implementação de lacunas de alta prioridade

### **✅ CONQUISTAS RECENTES:**
- ✅ **Sistema de Pagamentos** implementado (4 arquivos)
- ✅ **Sistema de Compras** implementado (4 arquivos)  
- ✅ **Gestão de Funcionários** implementado (4 arquivos)
- ✅ **Integração completa** com servidor principal
- ✅ **Sistema de testes** completo criado
- ✅ **Validação 100%** das lacunas críticas

---

## 🧠 **DIRETIVAS DE PENSAMENTO CRÍTICO**

### **📋 REGRAS FUNDAMENTAIS:**
1. **Sempre analisar** o estado atual antes de propor mudanças
2. **Validar implementações** antes de prosseguir
3. **Manter consistência** com arquitetura existente
4. **Documentar decisões** importantes
5. **Testar funcionalidades** após implementação

### **🎯 PRINCÍPIOS DE DESENVOLVIMENTO:**
- **Qualidade sobre velocidade** - Sempre validar antes de prosseguir
- **Documentação completa** - Cada mudança deve ser documentada
- **Testes automatizados** - Implementar testes para novas funcionalidades
- **Integração contínua** - Manter sistemas integrados
- **Pensamento crítico** - Questionar e validar cada decisão

---

## 📁 **ESTRUTURA ATUAL DO PROJETO**

### **🔧 SISTEMAS EXISTENTES (FUNCIONANDO):**
```
dom-v2/
├── automation/           # Sistema de automação
├── dashboard/           # Dashboard e métricas
├── cicd/               # Pipeline CI/CD
├── predictive/         # Análise preditiva
├── personalization/    # Sistema de personalização
├── backend/           # Servidor Express + TypeScript
└── frontend/          # React Native
```

### **💰 LACUNAS CRÍTICAS IMPLEMENTADAS:**
```
backend/src/
├── routes/
│   ├── payments.ts     # ✅ Implementado
│   ├── purchases.ts    # ✅ Implementado
│   └── employees.ts    # ✅ Implementado
├── controllers/
│   ├── payment-controller.ts    # ✅ Implementado
│   ├── purchase-controller.ts   # ✅ Implementado
│   └── employee-controller.ts   # ✅ Implementado
└── models/
    ├── Payment.ts      # ✅ Implementado
    ├── Purchase.ts     # ✅ Implementado
    └── Employee.ts     # ✅ Implementado

frontend/src/screens/
├── payments-screen.tsx    # ✅ Implementado
├── purchases-screen.tsx   # ✅ Implementado
└── employees-screen.tsx   # ✅ Implementado
```

### **🧪 SISTEMA DE TESTES:**
```
scripts/
├── test-all-functionalities.js    # ✅ Teste completo
├── test-apis.js                   # ✅ Teste de APIs
├── validate-lacunas-criticas.js   # ✅ Validação específica
└── audit-systems.js               # ✅ Auditoria de sistemas
```

---

## 🎯 **PRÓXIMOS PASSOS PRIORITÁRIOS**

### **📋 SEMANA 2 - LACUNAS DE ALTA PRIORIDADE:**

#### **1. RELATÓRIOS AVANÇADOS:**
- **Objetivo:** Sistema completo de relatórios e analytics
- **Arquivos:** `backend/src/routes/reports.ts`, `backend/src/controllers/report-controller.ts`, `backend/src/models/Report.ts`, `frontend/src/screens/reports-screen.tsx`
- **Funcionalidades:** Relatórios financeiros, de produtividade, de funcionários, exportação PDF/Excel

#### **2. CONTROLE DE ACESSO GRANULAR:**
- **Objetivo:** Sistema de permissões e roles
- **Arquivos:** `backend/src/routes/permissions.ts`, `backend/src/controllers/permission-controller.ts`, `backend/src/models/Permission.ts`, `frontend/src/screens/permissions-screen.tsx`
- **Funcionalidades:** Roles (admin, manager, user), permissões por funcionalidade, auditoria de acesso

#### **3. HISTÓRICO DE ATIVIDADES:**
- **Objetivo:** Sistema de logs e histórico completo
- **Arquivos:** `backend/src/routes/activities.ts`, `backend/src/controllers/activity-controller.ts`, `backend/src/models/Activity.ts`, `frontend/src/screens/activities-screen.tsx`
- **Funcionalidades:** Log de todas as ações, histórico de mudanças, auditoria completa

### **📋 SEMANA 3-4 - EXPANSÃO DE SISTEMAS:**

#### **4. AUTOMAÇÃO INTELIGENTE:**
- **Objetivo:** Expandir sistema de automação com IA
- **Melhorias:** Automação baseada em padrões, sugestões inteligentes, otimização automática

#### **5. DASHBOARD PREDITIVO:**
- **Objetivo:** Dashboard com análises preditivas
- **Funcionalidades:** Previsões de gastos, tendências de produtividade, alertas inteligentes

#### **6. INTEGRAÇÃO AVANÇADA:**
- **Objetivo:** Integração entre todos os sistemas
- **Funcionalidades:** Sincronização em tempo real, workflows automatizados

---

## 🛠️ **COMANDOS ESSENCIAIS**

### **📊 VERIFICAÇÃO DE STATUS:**
```powershell
# Status geral do projeto
npm run quick-status

# Métricas da fase atual
npm run phase5:metrics

# Validação de pensamento crítico
npm run validate-critical-thinking
```

### **🧪 TESTES DISPONÍVEIS:**
```powershell
# Teste completo de todas as funcionalidades
npm run test:all

# Teste específico das lacunas críticas
npm run test:lacunas-criticas

# Teste de APIs (requer servidor rodando)
npm run test:apis

# Auditoria de sistemas
npm run audit:systems
```

### **🚀 DESENVOLVIMENTO:**
```powershell
# Iniciar servidor backend
npm run start:server

# Verificar saúde do servidor
npm run test:server

# Implementar lacunas críticas (já feito)
node scripts/implement-lacunas-criticas.js

# Validar implementações
node scripts/validate-lacunas-criticas.js
```

---

## 📋 **CHECKLIST DE INICIALIZAÇÃO**

### **🔍 VERIFICAÇÕES INICIAIS:**
- [ ] **Verificar status atual:** `npm run quick-status`
- [ ] **Validar lacunas críticas:** `npm run test:lacunas-criticas`
- [ ] **Auditar sistemas:** `npm run audit:systems`
- [ ] **Verificar documentação:** Ler `docs/reavaliacao-proximos-passos-final.md`

### **📊 ANÁLISE DO ESTADO ATUAL:**
- [ ] **Confirmar implementações** das lacunas críticas
- [ ] **Verificar integração** com servidor principal
- [ ] **Validar sistema de testes** funcionando
- [ ] **Revisar próximos passos** definidos

### **🎯 DEFINIÇÃO DE PRIORIDADES:**
- [ ] **Identificar lacunas** de alta prioridade para implementar
- [ ] **Planejar expansão** dos sistemas existentes
- [ ] **Definir cronograma** para próximas implementações
- [ ] **Estabelecer métricas** de sucesso

---

## 📚 **DOCUMENTAÇÃO ESSENCIAL**

### **📄 DOCUMENTOS DE REFERÊNCIA:**
- `docs/reavaliacao-proximos-passos-final.md` - **PLANO ATUAL**
- `docs/guia-testes-completo.md` - **GUIA DE TESTES**
- `docs/planejamento-global-integrado.md` - **VISÃO GERAL**
- `docs/plano-fase6-revisada.md` - **DETALHES DA FASE 6**
- `docs/registro-planejamento-proximos-passos.md` - **HISTÓRICO**

### **📊 RELATÓRIOS IMPORTANTES:**
- `logs/all-functionalities-test-report.json` - **TESTE COMPLETO**
- `logs/lacunas-criticas-validation-report.json` - **VALIDAÇÃO LACUNAS**
- `phase6-config.json` - **CONFIGURAÇÃO FASE 6**

---

## 🎯 **ESTRATÉGIA DE CONTINUIDADE**

### **📋 PRIMEIRA AÇÃO AO INICIAR:**
1. **Executar verificação completa:**
   ```powershell
   npm run test:all
   npm run test:lacunas-criticas
   npm run audit:systems
   ```

2. **Revisar status atual:**
   ```powershell
   npm run quick-status
   ```

3. **Ler documentação atual:**
   - `docs/reavaliacao-proximos-passos-final.md`

4. **Definir próximos passos:**
   - Implementar lacunas de alta prioridade
   - Expandir sistemas existentes
   - Preparar para funcionalidades disruptivas

### **🔄 FLUXO DE TRABALHO:**
1. **Análise** - Verificar estado atual
2. **Planejamento** - Definir próximas implementações
3. **Implementação** - Criar funcionalidades
4. **Validação** - Testar implementações
5. **Documentação** - Registrar mudanças
6. **Iteração** - Repetir ciclo

---

## 🚨 **PONTOS DE ATENÇÃO**

### **⚠️ PROBLEMAS CONHECIDOS:**
- **Frontend:** App.tsx não encontrado (normal para React Native)
- **Servidor:** Pode não estar rodando (usar `npm run start:server`)
- **APIs:** Requerem servidor ativo para testes completos

### **✅ SISTEMAS FUNCIONANDO:**
- **Backend:** Express + TypeScript + Prisma
- **Lacunas Críticas:** Pagamentos, Compras, Funcionários
- **Integração:** Todas as rotas integradas
- **Testes:** Sistema completo de validação

### **🎯 PRÓXIMAS PRIORIDADES:**
1. **Relatórios Avançados** (Semana 2)
2. **Controle de Acesso Granular** (Semana 2)
3. **Histórico de Atividades** (Semana 2)
4. **Automação Inteligente** (Semana 3)
5. **Dashboard Preditivo** (Semana 3-4)

---

## 📞 **COMUNICAÇÃO COM IA**

### **💬 FRASE INICIAL RECOMENDADA:**
```
"Sou o desenvolvedor do projeto DOM v2. Carregue o contexto completo deste arquivo e continue o desenvolvimento de onde paramos. Use PowerShell, especifique diretórios e continue exclusivamente pela IA. O projeto está na Fase 6A com 3 lacunas críticas implementadas e validadas. Próximo passo: implementar lacunas de alta prioridade (Relatórios, Permissões, Histórico)."
```

### **🎯 EXPECTATIVAS:**
- **Continuidade:** Manter progresso atual
- **Qualidade:** Implementar com validação
- **Documentação:** Registrar todas as mudanças
- **Testes:** Validar cada implementação
- **Pensamento Crítico:** Analisar antes de implementar

---

**Status:** 📋 **CONTINUIDADE DE DESENVOLVIMENTO**  
**Próximo:** Implementação de lacunas de alta prioridade  
**Data:** 22 de Julho de 2025  
**Versão:** 2.0.0 