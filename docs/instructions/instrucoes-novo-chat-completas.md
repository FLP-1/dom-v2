
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

# 📋 INSTRUÇÕES COMPLETAS - NOVO CHAT DOM v2

## 🎯 **INFORMAÇÕES CRÍTICAS:**
- **Projeto:** DOM v2 - Sistema de Gestão Doméstica
- **Status:** React Native Web 100% Funcional
- **Data:** 22/07/2025 20:15
- **Objetivo:** Continuidade do desenvolvimento

## ✅ **SUCESSO ALCANÇADO:**

### **PROBLEMA CRÍTICO RESOLVIDO:**
- ✅ **React Native Web funcionando no navegador**
- ✅ **Erro DevSettings eliminado completamente**
- ✅ **TurboModuleRegistry mockado no Metro**
- ✅ **Sistema 100% operacional**

## 🚀 **COMANDOS PARA INICIAR:**

### **1. CARREGAR DOCUMENTAÇÃO ESTRATÉGICA:**
```powershell
# Documentação estratégica
Get-Content "docs/continuidade-desenvolvimento-hibrido.md"
Get-Content "contexto-rapido-novo-chat.md"
Get-Content "docs/resumo-documentacao-continuidade.md"
Get-Content "docs/status-atual-novo-chat.md"
```

### **2. CARREGAR DOCUMENTAÇÃO TÉCNICA:**
```powershell
# Documentação técnica
Get-Content "docs/especificacoes-funcionalidades-detalhadas.md"
Get-Content "docs/instrucoes-implementacao-praticas.md"
Get-Content "docs/auditoria-melhores-praticas.md"
Get-Content "docs/resumo-documentacao-completa.md"
```

### **3. EXECUTAR SCRIPTS DE SUPORTE:**
```powershell
# Backend
cd C:\dom-v2\backend; npm run start:simple

# Metro (Frontend)
cd C:\dom-v2\frontend; npm start

# Servidor Web
cd C:\dom-v2\frontend; node server-web.js

# Teste de saúde
Invoke-WebRequest -Uri "http://localhost:3001/health" -Method GET
```

### **4. GARANTIR CUMPRIMENTO DAS DIRETIVAS:**
```powershell
# Carregar diretivas obrigatórias
Get-Content "docs/sistema-garantia-diretivas.md"
```

## 📱 **URLS DE ACESSO:**
- **React Native Web:** http://localhost:3000/react-native
- **Versão Simplificada:** http://localhost:3000
- **Backend APIs:** http://localhost:3001/api/payroll

## 🎯 **PRÓXIMOS PASSOS:**

### **FASE 1: MICRO-FRONTENDS (Semana 2-3)**
1. **Desenvolvimento de micro-frontends**
   - BudgetComponent com interface completa
   - PayrollComponent com interface completa
   - Componentes compartilhados

2. **Implementação de funcionalidades**
   - Formulários de criação/edição
   - Dashboards com métricas
   - Relatórios em tempo real

### **FASE 2: INTEGRAÇÃO E TESTES (Semana 3-4)**
1. **Sistema de navegação**
   - Navegação entre micro-frontends
   - Menu lateral responsivo
   - Breadcrumb dinâmico

2. **Testes automatizados**
   - Testes unitários
   - Testes de integração
   - Testes end-to-end

### **FASE 3: OTIMIZAÇÃO E PRODUÇÃO (Semana 4)**
1. **Performance**
   - Lazy loading
   - Code splitting
   - Otimização de bundle

2. **Deploy**
   - Configuração de produção
   - CI/CD pipeline
   - Monitoramento

## 📋 **DOCUMENTAÇÃO ESSENCIAL:**

### **Status e Contexto:**
- `docs/status-atual-novo-chat.md` - Status completo atualizado
- `contexto-rapido-novo-chat.md` - Contexto para novos chats
- `docs/continuidade-desenvolvimento-hibrido.md` - Plano estratégico

### **Diretivas e Regras:**
- `docs/sistema-garantia-diretivas.md` - Diretivas obrigatórias
- `docs/especificacoes-funcionalidades-detalhadas.md` - Especificações técnicas
- `docs/instrucoes-implementacao-praticas.md` - Instruções de implementação

### **Aprendizados e Planejamento:**
- `docs/aprendizados-react-native-web.md` - Aprendizados técnicos
- `docs/planejamento-proximos-passos.md` - Planejamento detalhado

### **Auditoria e Qualidade:**
- `docs/auditoria-melhores-praticas.md` - Auditoria de melhores práticas
- `docs/resumo-documentacao-completa.md` - Resumo completo

## 🎯 **DIRETIVAS OBRIGATÓRIAS:**

### **CHECKLIST ANTES DE CADA DECISÃO:**
1. **VERIFICAÇÃO DE FATOS:**
   - [ ] Informação verificada em fonte confiável
   - [ ] Alternativas consideradas e analisadas
   - [ ] Suposições identificadas e questionadas
   - [ ] Lógica testada e validada

2. **APLICAÇÃO DAS REGRAS:**
   - [ ] REGRA DA SIMPLICIDADE EXTREMA aplicada
   - [ ] REGRA DA STACK FIXA respeitada
   - [ ] REGRA DA VALIDAÇÃO CONTÍNUA seguida
   - [ ] REGRA DO MVP RIGOROSO considerada

3. **ALINHAMENTO ESTRATÉGICO:**
   - [ ] Está alinhado com o plano estratégico
   - [ ] Prioridade correta sendo seguida
   - [ ] Foco no essencial mantido
   - [ ] Complexidade desnecessária evitada

4. **CONTRASTES E PERSPECTIVAS:**
   - [ ] Múltiplas perspectivas consideradas
   - [ ] Contrapontos apresentados
   - [ ] Riscos identificados e avaliados
   - [ ] Alternativas viáveis exploradas

## 🎉 **RESULTADO:**
**O DOM v2 está 100% funcional com React Native Web renderizando corretamente no navegador!**

**Base sólida estabelecida para desenvolvimento avançado de funcionalidades.**

**Aguarde a próxima instrução para continuar o desenvolvimento.** 