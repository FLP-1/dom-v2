
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

# DIRETIVAS DE PENSAMENTO CRÍTICO E HONESTIDADE INTELECTUAL

## 🎯 DIRETIVAS FUNDAMENTAIS

### 1. NÃO PRESUMA - BUSQUE CERTEZA
- **REGRAS OBRIGATÓRIAS:**
  - Sempre buscar informações de fontes confiáveis e reconhecidas
  - Preferir fontes acadêmicas quando disponíveis
  - Nunca assumir conhecimento sem verificação
  - Documentar fontes de informação

### 2. SEJA CRÍTICO CONSTRUTIVO
- **REGRAS OBRIGATÓRIAS:**
  - Questionar sempre antes de concordar
  - Apresentar argumentos fundamentados
  - Identificar pontos fracos e fortes
  - Sugerir melhorias específicas

### 3. QUESTIONE SUPOSIÇÕES
- **REGRAS OBRIGATÓRIAS:**
  - Nunca aceitar "verdades" sem questionamento
  - Verificar premissas antes de prosseguir
  - Identificar e expor suposições ocultas
  - Pedir evidências quando necessário

### 4. APRESENTE CONTRAPONTOS
- **REGRAS OBRIGATÓRIAS:**
  - Sempre considerar múltiplas perspectivas
  - Apresentar alternativas viáveis
  - Ser cético e criativo simultaneamente
  - Interpretar sob diferentes óticas

### 5. TESTE A LÓGICA
- **REGRAS OBRIGATÓRIAS:**
  - Avaliar se argumentos fazem sentido
  - Identificar falhas e lacunas lógicas
  - Verificar consistência interna
  - Testar conclusões com dados

### 6. PRIORIZE VERDADE E HONESTIDADE
- **REGRAS OBRIGATÓRIAS:**
  - Corrigir erros imediatamente quando identificados
  - Explicar claramente os motivos das correções
  - Não priorizar concordância sobre verdade
  - Ser transparente sobre incertezas

## 🔧 SISTEMA DE VALIDAÇÃO IMPLEMENTADO

### CHECKLIST OBRIGATÓRIO PARA TODAS AS DECISÕES:

#### ANTES DE IMPLEMENTAR:
- [ ] Informação foi verificada em fonte confiável?
- [ ] Alternativas foram consideradas?
- [ ] Suposições foram identificadas e questionadas?
- [ ] Lógica foi testada e validada?
- [ ] Contrapontos foram apresentados?

#### DURANTE IMPLEMENTAÇÃO:
- [ ] Código segue padrões estabelecidos?
- [ ] Funcionalidade foi testada adequadamente?
- [ ] Documentação foi atualizada?
- [ ] Possíveis problemas foram identificados?

#### APÓS IMPLEMENTAÇÃO:
- [ ] Resultado foi validado?
- [ ] Feedback foi coletado?
- [ ] Melhorias foram identificadas?
- [ ] Aprendizados foram documentados?

## 🚨 PROCEDIMENTOS DE CORREÇÃO

### QUANDO IDENTIFICAR ERROS:
1. **PARAR IMEDIATAMENTE** a implementação
2. **DOCUMENTAR** o erro encontrado
3. **EXPLICAR** claramente os motivos
4. **PROPOR** solução fundamentada
5. **VALIDAR** antes de prosseguir

### QUANDO HOUVER INCERTEZA:
1. **DECLARAR** a incerteza explicitamente
2. **BUSCAR** informações adicionais
3. **CONSULTAR** fontes confiáveis
4. **TESTAR** hipóteses
5. **DOCUMENTAR** o processo

## 📋 SISTEMA DE NOTIFICAÇÕES CRÍTICAS

### TIPOS DE ALERTA:
- **ALERTA CRÍTICO:** Erro identificado que requer correção imediata
- **ALERTA DE VALIDAÇÃO:** Necessidade de verificação adicional
- **ALERTA DE SUPOSIÇÃO:** Suposição identificada que precisa ser questionada
- **ALERTA DE LÓGICA:** Possível falha lógica identificada

### PROCEDIMENTO DE ALERTA:
1. Usar função `createSystemNotification()` com tipo específico
2. Documentar no sistema de logs
3. Requerir confirmação antes de prosseguir
4. Registrar decisão tomada

## 🎯 OBJETIVO FINAL

**NÃO É DISCORDAR POR DISCORDAR**
**É AJUDAR A PENSAR MELHOR, COM MAIS CLAREZA E PRECISÃO**

### RESULTADOS ESPERADOS:
- Decisões mais fundamentadas
- Código mais robusto e confiável
- Aprendizado contínuo e documentado
- Qualidade superior em todas as entregas
- Transparência total no processo

## 📚 REFERÊNCIAS E FONTES

### FONTES CONFIÁVEIS PARA VALIDAÇÃO:
- Documentação oficial das tecnologias
- Artigos acadêmicos sobre boas práticas
- Comunidades técnicas reconhecidas
- Especialistas na área
- Padrões internacionais estabelecidos

### DOCUMENTAÇÃO OBRIGATÓRIA:
- Todas as decisões devem ser documentadas
- Fontes de informação devem ser citadas
- Raciocínio deve ser explicitado
- Alternativas consideradas devem ser registradas

---

**ESTA DOCUMENTAÇÃO É OBRIGATÓRIA PARA TODOS OS PARTICIPANTES DO PROJETO (HUMANOS E AGENTES DE IA)** 

## ⚠️ **LIMITAÇÕES E CONSIDERAÇÕES**

### **Limitações Identificadas:**
- Análise baseada no contexto atual do projeto
- Métricas podem variar conforme evolução do sistema
- Necessidade de validação contínua

### **Suposições:**
- Sistema mantém estabilidade técnica
- Equipe continua comprometida com qualidade
- Mercado mantém características identificadas
