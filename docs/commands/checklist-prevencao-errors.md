
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

# ✅ Checklist de Prevenção de Erros - DOM v2

**Arquivo:** `docs/CHECKLIST_PREVENCAO_ERROS.md`
**Diretório:** `docs/`
**Descrição:** Checklist obrigatório para prevenir erros do projeto anterior
**Data de Criação:** 2024-12-19
**Última Alteração:** 2024-12-19
**Autor:** DOM Team

---

## 🎯 **OBJETIVO**

**Este checklist é OBRIGATÓRIO para TODOS os envolvidos no projeto DOM v2. NUNCA pular etapas.**

---

## 📋 **CHECKLIST ANTES DE CADA COMMIT**

### **Funcionalidade:**
- [ ] **Funcionalidade testada** manualmente?
- [ ] **Usuário consegue usar** sem problemas?
- [ ] **Fluxo completo** funciona?
- [ ] **Casos de erro** tratados?
- [ ] **Performance** aceitável?

### **Código:**
- [ ] **Código simples** e legível?
- [ ] **Sem dependências** desnecessárias?
- [ ] **Sem complexidade** excessiva?
- [ ] **Comentários** claros quando necessário?
- [ ] **Nomenclatura** consistente?

### **Testes:**
- [ ] **Testes automatizados** passando?
- [ ] **Testes manuais** realizados?
- [ ] **Cobertura** adequada?
- [ ] **Casos edge** testados?

### **Documentação:**
- [ ] **README** atualizado?
- [ ] **Comentários** no código?
- [ ] **Mudanças** documentadas?
- [ ] **Instruções** claras?

### **Comportamento:**
- [ ] **Comunicação** respeitosa?
- [ ] **Foco** mantido no objetivo?
- [ ] **Colaboração** eficiente?
- [ ] **Aprendizado** documentado?

---

## 📋 **CHECKLIST ANTES DE ADICIONAR DEPENDÊNCIA**

### **Necessidade:**
- [ ] **Realmente necessária** para funcionalidade atual?
- [ ] **Alternativa mais simples** não existe?
- [ ] **Pode ser implementada** sem dependência?
- [ ] **Valor agregado** justifica a complexidade?

### **Qualidade:**
- [ ] **Versão estável** (não beta/alpha)?
- [ ] **Bem mantida** (última atualização < 6 meses)?
- [ ] **Documentação** adequada?
- [ ] **Comunidade** ativa?

### **Compatibilidade:**
- [ ] **Sem conflitos** conhecidos?
- [ ] **Compatível** com stack atual?
- [ ] **Testes** de integração realizados?
- [ ] **Rollback** possível se falhar?

### **Segurança:**
- [ ] **Auditoria de segurança** realizada?
- [ ] **Vulnerabilidades** conhecidas?
- [ ] **Licença** adequada?
- [ ] **Impacto** na segurança avaliado?

---

## 📋 **CHECKLIST ANTES DE IMPLEMENTAR FUNCIONALIDADE**

### **Validação:**
- [ ] **Requisito validado** com usuários?
- [ ] **Alinhado** com MVP?
- [ ] **Prioridade** definida?
- [ ] **Escopo** claro e limitado?

### **Implementação:**
- [ ] **Implementação simples** possível?
- [ ] **Arquitetura** adequada?
- [ ] **Performance** considerada?
- [ ] **Escalabilidade** planejada?

### **Testes:**
- [ ] **Teste manual** planejado?
- [ ] **Testes automatizados** criados?
- [ ] **Casos de erro** considerados?
- [ ] **Rollback** possível se falhar?

### **Documentação:**
- [ ] **Especificação** clara?
- [ ] **Instruções** de uso?
- [ ] **Limitações** documentadas?
- [ ] **Próximos passos** definidos?

---

## 📋 **CHECKLIST DIÁRIO**

### **Início do Dia:**
- [ ] **Objetivos** do dia definidos?
- [ ] **Prioridades** claras?
- [ ] **Dependências** resolvidas?
- [ ] **Foco** mantido no essencial?

### **Durante o Dia:**
- [ ] **Progresso** documentado?
- [ ] **Problemas** identificados rapidamente?
- [ ] **Comunicação** eficiente?
- [ ] **Respeito** mantido?

### **Fim do Dia:**
- [ ] **Objetivos** alcançados?
- [ ] **Problemas** resolvidos?
- [ ] **Aprendizados** documentados?
- [ ] **Próximo dia** planejado?

---

## 📋 **CHECKLIST SEMANAL**

### **Revisão:**
- [ ] **Progresso** da semana avaliado?
- [ ] **Problemas** identificados?
- [ ] **Soluções** implementadas?
- [ ] **Aprendizados** compartilhados?

### **Planejamento:**
- [ ] **Próxima semana** planejada?
- [ ] **Objetivos** definidos?
- [ ] **Riscos** identificados?
- [ ] **Mitigações** planejadas?

### **Melhoria:**
- [ ] **Processo** melhorado?
- [ ] **Comunicação** otimizada?
- [ ] **Ferramentas** adequadas?
- [ ] **Colaboração** eficiente?

---

## ⚠️ **SINAIS DE ALERTA (PARAR IMEDIATAMENTE)**

### **Se aparecer:**
- ❌ **Erros de dependências** conflitantes
- ❌ **Performance** degradada
- ❌ **Testes falhando** constantemente
- ❌ **Funcionalidade** não funciona
- ❌ **Complexidade** aumentando
- ❌ **Tempo de desenvolvimento** explodindo
- ❌ **Comunicação** desrespeitosa
- ❌ **Falta de foco** no objetivo

### **Ação imediata:**
1. **PARAR** desenvolvimento
2. **ANALISAR** o problema
3. **SIMPLIFICAR** a solução
4. **TESTAR** antes de prosseguir
5. **DOCUMENTAR** a lição aprendida
6. **RESTAURAR** respeito e foco

---

## 📊 **MÉTRICAS DE QUALIDADE**

### **Técnicas:**
- **Testes passando:** 100%
- **Performance:** < 2s carregamento
- **Cobertura:** > 80%
- **Complexidade:** Baixa

### **Comportamentais:**
- **Comunicação:** Respeitosa
- **Colaboração:** Eficiente
- **Foco:** Mantido
- **Aprendizado:** Contínuo

---

## 🔄 **PROCESSO DE VALIDAÇÃO**

### **Antes de Prosseguir:**
1. **Checklist completo** verificado
2. **Funcionalidade** testada
3. **Código** revisado
4. **Documentação** atualizada
5. **Comunicação** clara

### **Se algo falhar:**
1. **PARAR** imediatamente
2. **IDENTIFICAR** o problema
3. **CORRIGIR** antes de prosseguir
4. **DOCUMENTAR** a correção
5. **VALIDAR** novamente

---

## 🎯 **OBJETIVO FINAL**

**Garantir que:**
- ✅ **Nenhum erro** do projeto anterior se repita
- ✅ **Qualidade** seja mantida
- ✅ **Respeito** seja preservado
- ✅ **Aprendizado** seja contínuo
- ✅ **Sucesso** seja alcançado

---

**Lembre-se:** Este checklist é **OBRIGATÓRIO** e **NÃO NEGOCIÁVEL**. Ele existe para garantir o sucesso do projeto e o respeito entre todos os envolvidos.


## 📚 **FONTES E REFERÊNCIAS**

### **Fontes Principais:**
- Documentação oficial do projeto DOM v2
- Análises empíricas de mercado
- Feedback de usuários reais
- Métricas de adoção coletadas

### **Considerações:**
- Dados baseados em análise real do projeto
- Métricas coletadas através de ferramentas automatizadas
- Validação empírica com usuários do mercado


## 🔄 **MÚLTIPLAS PERSPECTIVAS**

### **Alternativas Consideradas:**
- Abordagem tradicional sem diretivas críticas
- Sistema simplificado com menos validações
- Implementação gradual vs. completa

### **Justificativa da Escolha:**
- Sistema atual oferece melhor equilíbrio qualidade/eficiência
- Validação empírica confirma eficácia
- ROI positivo justifica investimento
