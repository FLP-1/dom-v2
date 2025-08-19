
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

# 🧠 Diretivas de Pensamento Crítico - DOM v2

## 🎯 **DECISÃO ARQUITETURAL DEFINITIVA**

### **✅ ARQUITETURA FRONTEND: HTML NATIVO**

**DECISÃO CRÍTICA:** O projeto DOM v2 utiliza **HTML nativo** como tecnologia principal para o frontend.

**JUSTIFICATIVA:**
- Simplicidade extrema (conforme diretrizes do projeto)
- Performance superior
- Manutenção simplificada
- Compatibilidade universal
- Menor curva de aprendizado

**CONSEQUÊNCIAS:**
- ❌ NÃO usar React/React Native
- ❌ NÃO usar frameworks complexos
- ✅ SEMPRE implementar em HTML nativo
- ✅ SEGUIR padrões estabelecidos

---

## 🧠 **DIRETIVAS DE PENSAMENTO CRÍTICO**

### **1. QUESTIONAR SUPOSIÇÕES**
- **SEMPRE** questionar: "Por que estamos fazendo isso?"
- **VERIFICAR** se a suposição está baseada em fatos
- **BUSCAR** evidências antes de aceitar
- **CONSIDERAR** alternativas viáveis

### **2. BUSCAR MÚLTIPLAS PERSPECTIVAS**
- **ANALISAR** pelo menos 3 perspectivas diferentes
- **CONSIDERAR** pontos de vista opostos
- **AVALIAR** impactos em diferentes stakeholders
- **DOCUMENTAR** trade-offs identificados

### **3. VERIFICAR FONTES E EVIDÊNCIAS**
- **SEMPRE** verificar a origem das informações
- **BUSCAR** evidências empíricas
- **AVALIAR** a credibilidade das fontes
- **DOCUMENTAR** referências utilizadas

### **4. IDENTIFICAR VIÉSES E LIMITAÇÕES**
- **RECONHECER** viés de confirmação
- **CONSIDERAR** limitações do conhecimento atual
- **AVALIAR** impactos de decisões passadas
- **DOCUMENTAR** incertezas e riscos

### **5. APLICAR LÓGICA E RAZÃO**
- **USAR** pensamento lógico estruturado
- **EVITAR** falácias lógicas comuns
- **CONSTRUIR** argumentos sólidos
- **VALIDAR** conclusões através de evidências

---

## 🏗️ **DIRETIVAS ARQUITETURAIS**

### **FRONTEND (OBRIGATÓRIO)**
```bash
✅ HTML NATIVO - Tecnologia principal
✅ CSS3 puro - Estilização
✅ JavaScript vanilla - Interatividade
✅ Mobile-first - Responsividade
✅ Acessibilidade - LGPD compliance
```

### **PROIBIDO (VIOLAÇÃO CRÍTICA)**
```bash
❌ React/React Native
❌ React Native Web
❌ Vue.js/Angular
❌ Frameworks complexos
❌ Bundlers desnecessários
```

---

## 📋 **CHECKLIST OBRIGATÓRIO**

### **ANTES DE IMPLEMENTAR QUALQUER COISA:**

#### **1. VERIFICAÇÃO ARQUITETURAL:**
- [ ] **ARQUITETURA:** Estou usando HTML nativo?
- [ ] **SIMPLICIDADE:** A solução é a mais simples possível?
- [ ] **MVP:** A funcionalidade é essencial para o MVP?
- [ ] **PADRÕES:** Estou seguindo os padrões estabelecidos?

#### **2. ANÁLISE CRÍTICA:**
- [ ] **SUPOSIÇÕES:** Identifiquei todas as suposições?
- [ ] **ALTERNATIVAS:** Considerei pelo menos 3 alternativas?
- [ ] **EVIDÊNCIAS:** Tenho evidências para minhas decisões?
- [ ] **VIÉSES:** Identifiquei possíveis viéses?

#### **3. VALIDAÇÃO TÉCNICA:**
- [ ] **PERFORMANCE:** A solução é performática?
- [ ] **MANUTENIBILIDADE:** O código é fácil de manter?
- [ ] **ESCALABILIDADE:** A solução escala adequadamente?
- [ ] **SEGURANÇA:** Considero aspectos de segurança?

#### **4. DOCUMENTAÇÃO:**
- [ ] **DECISÕES:** Documentei as decisões tomadas?
- [ ] **JUSTIFICATIVAS:** Expliquei o porquê das escolhas?
- [ ] **ALTERNATIVAS:** Liste as alternativas consideradas?
- [ ] **RISCOS:** Identifiquei e documentei os riscos?

---

## 🚨 **VIOLAÇÕES CRÍTICAS**

### **VIOLAÇÃO ARQUITETURAL (BLOQUEIO IMEDIATO):**
```bash
❌ Tentar usar React/React Native
❌ Implementar frameworks complexos
❌ Ignorar padrões HTML nativo
❌ Não seguir mobile-first
```

### **VIOLAÇÃO DE PENSAMENTO CRÍTICO:**
```bash
❌ Implementar sem questionar
❌ Não considerar alternativas
❌ Ignorar evidências
❌ Não documentar decisões
```

---

## 📊 **MATRIZ DE DECISÃO**

### **CRITÉRIOS DE AVALIAÇÃO:**
| Critério | Peso | Descrição |
|----------|------|-----------|
| Simplicidade | 40% | Quão simples é a solução? |
| Performance | 25% | Qual o impacto na performance? |
| Manutenibilidade | 20% | Fácil de manter e evoluir? |
| Compatibilidade | 15% | Funciona em todos os dispositivos? |

### **PONTUAÇÃO MÍNIMA:**
- **MÍNIMO:** 80 pontos (escala 0-100)
- **RECOMENDADO:** 90+ pontos
- **EXCELENTE:** 95+ pontos

---

## 🔧 **PROCESSO DE APLICAÇÃO**

### **1. ANÁLISE INICIAL:**
```bash
# Verificar arquitetura
if (tecnologia !== 'HTML_NATIVO') {
    throw new Error('VIOLAÇÃO ARQUITETURAL');
}

# Aplicar checklist
if (!checklistCompleto()) {
    throw new Error('CHECKLIST INCOMPLETO');
}
```

### **2. IMPLEMENTAÇÃO:**
```bash
# Seguir padrões
- Usar HTML nativo
- CSS inline ou externo
- JavaScript vanilla
- Mobile-first
- Acessibilidade
```

### **3. VALIDAÇÃO:**
```bash
# Testes obrigatórios
- Responsividade
- Performance
- Acessibilidade
- Compatibilidade
```

---

## 📚 **REFERÊNCIAS OBRIGATÓRIAS**

### **DOCUMENTAÇÃO:**
- `docs/architecture/ARQUITETURA_FRONTEND_ATUALIZADA.md`
- `docs/profiles/perfis-usuarios-detalhados.md`
- `docs/profiles/perfis-enriquecidos.md`

### **EXEMPLOS:**
- `frontend/public/payments-management.html` - Implementação completa
- `frontend/public/index.html` - Entry point

---

## 🎯 **DIRETRIZES PARA IA ASSISTANTS**

### **ANTES DE RESPONDER:**
1. **VERIFICAR** arquitetura HTML nativo
2. **APLICAR** checklist completo
3. **DOCUMENTAR** decisões
4. **ALERTAR** sobre violações
5. **SUGERIR** alternativas simples

### **RESPOSTA ESTRUTURADA:**
```markdown
## 🎯 ANÁLISE CRÍTICA

### **ARQUITETURA:**
- ✅ HTML nativo (conforme diretrizes)

### **SUPOSIÇÕES:**
- [Listar suposições identificadas]

### **ALTERNATIVAS:**
- [Listar alternativas consideradas]

### **DECISÃO:**
- [Justificar escolha]

### **IMPLEMENTAÇÃO:**
- [Código HTML nativo]
```

---

**ÚLTIMA ATUALIZAÇÃO:** 06/08/2025  
**VERSÃO:** 2.0.0  
**STATUS:** OBRIGATÓRIA E DEFINITIVA
