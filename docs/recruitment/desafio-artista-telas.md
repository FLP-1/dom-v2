
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

# 🎨 DESAFIO CRIATIVO - ARTISTA DE TELAS

## 🎯 **OBJETIVO DO DESAFIO**

Demonstrar sua capacidade de **transformar interfaces em experiências artísticas** que realmente engajem diferentes perfis de usuário.

## 📋 **ENTREGA OBRIGATÓRIA**

### **1. TELA DE LOGIN ARTÍSTICA - EMPREGADO DOMÉSTICO**

#### **🎭 CONTEXTO:**
- **Perfil:** Maria, 45 anos, empregada doméstica
- **Experiência digital:** Básica (usa WhatsApp e Facebook)
- **Objetivo:** Criar confiança e acolhimento
- **Emoção desejada:** "Aqui eu sou bem-vinda e posso confiar"

#### **🎨 REQUISITOS VISUAIS:**
- **Cores:** Laranja vibrante (#FF5722) + Roxo amigável (#9C27B0)
- **Elementos:** Grandes, coloridos, expressivos
- **Linguagem:** Simples e acolhedora
- **Animações:** Divertidas e motivacionais

#### **📱 ENTREGA:**
- Mockup da tela de login
- Justificativa das escolhas visuais
- 3 variações da mesma tela
- Prototipagem interativa (opcional)

### **2. TELA DE LOGIN ARTÍSTICA - EMPREGADOR**

#### **🎭 CONTEXTO:**
- **Perfil:** João, 38 anos, executivo
- **Experiência digital:** Avançada (usa múltiplas ferramentas)
- **Objetivo:** Transmitir eficiência e profissionalismo
- **Emoção desejada:** "Aqui eu tenho controle e eficiência"

#### **🎨 REQUISITOS VISUAIS:**
- **Cores:** Azul profissional (#1976D2) + Verde sucesso (#4CAF50)
- **Elementos:** Clean, organizados, funcionais
- **Linguagem:** Profissional e direta
- **Animações:** Suaves e profissionais

#### **📱 ENTREGA:**
- Mockup da tela de login
- Justificativa das escolhas visuais
- 3 variações da mesma tela
- Prototipagem interativa (opcional)

### **3. TELA DE LOGIN ARTÍSTICA - FAMÍLIA**

#### **🎭 CONTEXTO:**
- **Perfil:** Família Silva (pais + 2 filhos adolescentes)
- **Experiência digital:** Intermediária
- **Objetivo:** Promover conexão e harmonia
- **Emoção desejada:** "Aqui nossa família se conecta"

#### **🎨 REQUISITOS VISUAIS:**
- **Cores:** Verde acolhedor (#4CAF50) + Azul familiar (#2196F3)
- **Elementos:** Equilibrados, harmoniosos, familiares
- **Linguagem:** Acolhedora e inclusiva
- **Animações:** Suaves e harmoniosas

#### **📱 ENTREGA:**
- Mockup da tela de login
- Justificativa das escolhas visuais
- 3 variações da mesma tela
- Prototipagem interativa (opcional)

## 📝 **FORMATO DE ENTREGA**

### **📁 ESTRUTURA DE ARQUIVOS:**
```
desafio-artista-telas/
├── README.md (explicação geral)
├── empregado/
│   ├── mockup.png
│   ├── justificativa.md
│   ├── variacao-1.png
│   ├── variacao-2.png
│   └── variacao-3.png
├── empregador/
│   ├── mockup.png
│   ├── justificativa.md
│   ├── variacao-1.png
│   ├── variacao-2.png
│   └── variacao-3.png
└── familia/
    ├── mockup.png
    ├── justificativa.md
    ├── variacao-1.png
    ├── variacao-2.png
    └── variacao-3.png
```

### **📄 README.md:**
```markdown
# Desafio Artista de Telas - [SEU NOME]

## 🎯 Abordagem Geral
[Explicar sua filosofia de design e abordagem]

## 🎨 Justificativa das Escolhas
[Explicar as decisões visuais para cada perfil]

## 🚀 Diferenciais
[O que torna seu trabalho único]

## 📱 Prototipagem
[Link para prototipagem interativa, se aplicável]
```

## ⏰ **PRAZO E ENTREGA**

- **Prazo:** 7 dias após recebimento
- **Formato:** Arquivo ZIP ou link para repositório
- **Tamanho máximo:** 50MB
- **Envio:** Para [EMAIL] com assunto "Desafio Artista de Telas - [SEU NOME]"

## 🏆 **CRITÉRIOS DE AVALIAÇÃO**

### **EMPATIA (40%):**
- Compreensão profunda dos perfis
- Adaptação visual para contextos específicos
- Sensibilidade cultural brasileira

### **ARTE (35%):**
- Qualidade artística das interfaces
- Criatividade na solução de problemas
- Consistência visual e harmonia

### **TÉCNICA (25%):**
- Conhecimento de UX/UI
- Experiência com design systems
- Capacidade de prototipagem

## 💡 **DICAS PARA DESTACAR-SE**

1. **Pense como artista:** Não apenas funcional, mas emocional
2. **Entenda a essência:** Cada perfil tem uma história e contexto
3. **Seja autêntico:** Sua visão artística é única
4. **Teste com usuários:** Se possível, valide suas escolhas
5. **Documente seu processo:** Mostre como chegou às decisões

## 🎭 **INSPIRAÇÃO**

- **Empregado:** Interfaces que acolhem e motivam
- **Empregador:** Interfaces que transmitem confiança
- **Família:** Interfaces que conectam e harmonizam

---

**Transforme interfaces em arte. Conecte pessoas através do design.**

**Boa sorte! 🎨✨**
