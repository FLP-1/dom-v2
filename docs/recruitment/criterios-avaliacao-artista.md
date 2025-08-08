
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

# 📊 CRITÉRIOS DE AVALIAÇÃO - ARTISTA DE TELAS

## 🎯 **SISTEMA DE PONTUAÇÃO**

### **EMPATIA (40% - 40 pontos)**

#### **Compreensão de Perfis (15 pontos)**
- **15 pontos:** Demonstra compreensão profunda de cada perfil
- **10 pontos:** Compreensão adequada da maioria dos perfis
- **5 pontos:** Compreensão básica dos perfis
- **0 pontos:** Não demonstra compreensão dos perfis

#### **Adaptação Visual (15 pontos)**
- **15 pontos:** Adaptação visual excelente para cada contexto
- **10 pontos:** Adaptação adequada para a maioria dos contextos
- **5 pontos:** Adaptação básica para alguns contextos
- **0 pontos:** Não adapta visualmente para os contextos

#### **Sensibilidade Cultural (10 pontos)**
- **10 pontos:** Incorporação autêntica da cultura brasileira
- **7 pontos:** Incorporação adequada de elementos culturais
- **4 pontos:** Incorporação básica de elementos culturais
- **0 pontos:** Não incorpora elementos culturais

### **ARTE (35% - 35 pontos)**

#### **Qualidade Artística (15 pontos)**
- **15 pontos:** Interfaces com alta qualidade artística
- **10 pontos:** Interfaces com qualidade artística adequada
- **5 pontos:** Interfaces com qualidade artística básica
- **0 pontos:** Interfaces sem qualidade artística

#### **Criatividade (10 pontos)**
- **10 pontos:** Soluções altamente criativas e inovadoras
- **7 pontos:** Soluções criativas e adequadas
- **4 pontos:** Soluções com criatividade básica
- **0 pontos:** Soluções sem criatividade

#### **Consistência Visual (10 pontos)**
- **10 pontos:** Consistência visual excelente em todos os elementos
- **7 pontos:** Consistência visual adequada na maioria dos elementos
- **4 pontos:** Consistência visual básica em alguns elementos
- **0 pontos:** Falta de consistência visual

### **TÉCNICA (25% - 25 pontos)**

#### **Conhecimento UX/UI (10 pontos)**
- **10 pontos:** Conhecimento avançado de UX/UI
- **7 pontos:** Conhecimento adequado de UX/UI
- **4 pontos:** Conhecimento básico de UX/UI
- **0 pontos:** Falta de conhecimento de UX/UI

#### **Design Systems (10 pontos)**
- **10 pontos:** Experiência avançada com design systems
- **7 pontos:** Experiência adequada com design systems
- **4 pontos:** Experiência básica com design systems
- **0 pontos:** Sem experiência com design systems

#### **Prototipagem (5 pontos)**
- **5 pontos:** Prototipagem interativa excelente
- **3 pontos:** Prototipagem adequada
- **1 ponto:** Prototipagem básica
- **0 pontos:** Sem prototipagem

## 📋 **RUBRICA DE AVALIAÇÃO**

### **EXCELENTE (90-100 pontos)**
- Compreensão excepcional dos perfis
- Qualidade artística superior
- Conhecimento técnico avançado
- **RECOMENDAÇÃO:** Contratar imediatamente

### **MUITO BOM (80-89 pontos)**
- Compreensão muito boa dos perfis
- Qualidade artística alta
- Conhecimento técnico adequado
- **RECOMENDAÇÃO:** Contratar com ajustes menores

### **BOM (70-79 pontos)**
- Compreensão adequada dos perfis
- Qualidade artística boa
- Conhecimento técnico básico
- **RECOMENDAÇÃO:** Considerar com treinamento

### **REGULAR (60-69 pontos)**
- Compreensão básica dos perfis
- Qualidade artística regular
- Conhecimento técnico limitado
- **RECOMENDAÇÃO:** Não contratar

### **INSUFICIENTE (< 60 pontos)**
- Falta de compreensão dos perfis
- Qualidade artística insuficiente
- Conhecimento técnico inadequado
- **RECOMENDAÇÃO:** Não contratar

## 🎨 **CHECKLIST DE AVALIAÇÃO**

### **EMPATIA:**
- [ ] Compreende profundamente cada perfil de usuário
- [ ] Adapta visualmente para contextos específicos
- [ ] Incorpora elementos da cultura brasileira
- [ ] Demonstra sensibilidade às necessidades dos usuários
- [ ] Cria conexão emocional através do design

### **ARTE:**
- [ ] Interfaces com alta qualidade artística
- [ ] Soluções criativas e inovadoras
- [ ] Consistência visual em todos os elementos
- [ ] Harmonia entre cores, tipografia e elementos
- [ ] Expressão artística única e autêntica

### **TÉCNICA:**
- [ ] Conhecimento sólido de UX/UI
- [ ] Experiência com design systems
- [ ] Capacidade de prototipagem
- [ ] Entendimento de acessibilidade
- [ ] Conhecimento de ferramentas de design

## 📝 **FORMULÁRIO DE AVALIAÇÃO**

### **CANDIDATO:** [NOME]
### **DATA:** [DATA]
### **AVALIADOR:** [NOME]

#### **EMPATIA (40 pontos):**
- Compreensão de Perfis: ___/15
- Adaptação Visual: ___/15
- Sensibilidade Cultural: ___/10
- **TOTAL EMPATIA:** ___/40

#### **ARTE (35 pontos):**
- Qualidade Artística: ___/15
- Criatividade: ___/10
- Consistência Visual: ___/10
- **TOTAL ARTE:** ___/35

#### **TÉCNICA (25 pontos):**
- Conhecimento UX/UI: ___/10
- Design Systems: ___/10
- Prototipagem: ___/5
- **TOTAL TÉCNICA:** ___/25

#### **PONTUAÇÃO FINAL:** ___/100
#### **CLASSIFICAÇÃO:** [EXCELENTE/MUITO BOM/BOM/REGULAR/INSUFICIENTE]
#### **RECOMENDAÇÃO:** [CONTRATAR/CONSIDERAR/NÃO CONTRATAR]

#### **COMENTÁRIOS:**
[Observações detalhadas sobre o candidato]

---

**Avaliação realizada pelo Agente de Contratação de Artista de Telas - DOM v2** 🎨
