
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

# 🛡️ Regras do Projeto DOM v2 - Prevenção de Erros
## Análise Crítica e Contextualizada das Regras de Desenvolvimento

### 📋 ANÁLISE CRÍTICA
**Suposições:**
- O projeto anterior (DOM v1) falhou devido a complexidade excessiva
- A equipe atual pode repetir os mesmos erros
- Regras rígidas são necessárias para prevenir falhas
- Simplicidade é mais eficaz que complexidade

**Alternativas consideradas:**
- Regras flexíveis (risco de interpretação subjetiva)
- Sem regras (risco de repetir erros anteriores)
- Regras rígidas com exceções (complexidade desnecessária)
- Regras rígidas sem exceções (abordagem recomendada)

**Fontes e referências:**
- Análise post-mortem do DOM v1
- Princípios de desenvolvimento ágil
- Estudos sobre complexidade em projetos de software
- Experiência da equipe em projetos similares
- Documentação oficial das tecnologias escolhidas

**Riscos identificados:**
- Regras podem ser muito restritivas
- Equipe pode resistir às regras
- Flexibilidade pode ser perdida
- Processo pode ficar burocrático

**Validação:**
- Teste com equipe atual
- Comparação com projetos similares
- Feedback de especialistas
- Análise de métricas de sucesso

**Arquivo:** `docs/REGRAS_PROJETO_DOM_V2.md`
**Diretório:** `docs/`
**Descrição:** Regras rígidas para prevenir erros do projeto anterior
**Data de Criação:** 2024-12-19
**Última Alteração:** 2024-12-19
**Autor:** DOM Team

---

## 🎯 **PRINCÍPIO FUNDAMENTAL**

**Este projeto NUNCA repetirá os erros do DOM v1. Regras rígidas garantem desenvolvimento seguro e eficiente.**

---

## 📋 **REGRAS TÉCNICAS RÍGIDAS**

### **1. REGRA DA SIMPLICIDADE EXTREMA**
```bash
# NUNCA fazer:
❌ Adicionar dependências "por precaução"
❌ Implementar funcionalidades "futuras"
❌ Usar bibliotecas "trendy" sem necessidade
❌ Criar abstrações "elegantes" desnecessárias
❌ Over-engineering antes de validar

# SEMPRE fazer:
✅ Implementar apenas o essencial
✅ Validar cada funcionalidade antes de prosseguir
✅ Usar apenas dependências comprovadamente necessárias
✅ Manter código simples e direto
✅ Focar no MVP primeiro
```

### **2. REGRA DA VALIDAÇÃO CONTÍNUA**
```bash
# A cada etapa:
✅ Funcionalidade funciona?
✅ Testes passam?
✅ Usuário consegue usar?
✅ Performance aceitável?
✅ Código simples e legível?

# Se NÃO: PARAR e corrigir antes de prosseguir
```

### **3. REGRA DA STACK FIXA**
```bash
# Stack definida e IMUTÁVEL:
Frontend: React Native + TypeScript
Backend: Node.js + Express + TypeScript
Banco: PostgreSQL
APIs: Apenas as essenciais

# NUNCA mudar stack no meio do projeto
# NUNCA adicionar tecnologias "experimentais"
# NUNCA usar versões beta/alpha
```

### **4. REGRA DO MVP RIGOROSO**
```bash
# MVP = Mínimo Viable Product
- Login → Dashboard → Funcionalidade básica
- SEM modais complexos
- SEM contextos complicados
- SEM funcionalidades "nice to have"

# Só adicionar complexidade após validação
```

### **5. REGRA DAS DEPENDÊNCIAS**
```bash
# Antes de adicionar dependência:
✅ Realmente necessária?
✅ Versão estável (não beta/alpha)?
✅ Bem mantida (última atualização < 6 meses)?
✅ Sem conflitos conhecidos?
✅ Alternativa mais simples existe?

# Se NÃO: NÃO ADICIONAR
```

### **6. REGRA DE NOMENCLATURA RÍGIDA**
```bash
# NUNCA usar acentos ou caracteres especiais:
❌ função validaçãoUsuário()
❌ const dadosUsuário = {}
❌ arquivo validação-segurança.js
❌ class ValidaçãoDocumentação {}
❌ interface DadosUsuário {}

# SEMPRE usar nomenclatura em inglês e ASCII:
✅ function validateUser()
✅ const userData = {}
✅ arquivo validate-security.js
✅ class DocumentValidation {}
✅ interface UserData {}

# Padrões obrigatórios:
✅ camelCase para variáveis e funções
✅ PascalCase para classes e interfaces
✅ kebab-case para nomes de arquivos
✅ UPPER_SNAKE_CASE para constantes
✅ lowercase para comandos npm
```

---

## 🤝 **REGRAS COMPORTAMENTAIS OBRIGATÓRIAS**

### **1. RESPEITO E COLABORAÇÃO**
```bash
✅ Tratar todos com respeito, independente do papel
✅ Valorizar diferentes perspectivas
✅ Reconhecer esforços e contribuições
✅ Comunicar de forma construtiva
✅ Aprender com erros de forma respeitosa
```

### **2. COMUNICAÇÃO EFICIENTE**
```bash
✅ Ser direto e claro
✅ Fazer perguntas quando necessário
✅ Corrigir erros de forma respeitosa
✅ Manter foco no objetivo
✅ Evitar comunicação desnecessária
```

### **3. APRENDIZADO CONTÍNUO**
```bash
✅ Aprender com erros passados
✅ Documentar lições aprendidas
✅ Compartilhar conhecimento
✅ Evoluir como pessoa e profissional
✅ Não repetir padrões problemáticos
```

### **4. FOCO E DISCIPLINA**
```bash
✅ Manter foco no essencial
✅ Não se distrair com "shiny objects"
✅ Seguir o plano estabelecido
✅ Resistir à tentação de "melhorar" sem necessidade
✅ Priorizar funcionalidade sobre perfeição
```

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

## 📊 **CHECKLIST OBRIGATÓRIO**

### **Antes de Cada Commit:**
- [ ] **Funcionalidade testada** manualmente?
- [ ] **Testes automatizados** passando?
- [ ] **Performance** aceitável?
- [ ] **Código simples** e legível?
- [ ] **Sem dependências** desnecessárias?
- [ ] **Documentação** atualizada?
- [ ] **Comunicação** respeitosa?
- [ ] **Foco** mantido no objetivo?
- [ ] **Nomenclatura** em inglês e sem acentos?
- [ ] **Padrões de nomenclatura** seguidos?

### **Antes de Adicionar Dependência:**
- [ ] **Realmente necessária**?
- [ ] **Versão estável** (não beta/alpha)?
- [ ] **Bem mantida** (última atualização < 6 meses)?
- [ ] **Sem conflitos** conhecidos?
- [ ] **Alternativa mais simples** existe?

### **Antes de Implementar Funcionalidade:**
- [ ] **Requisito validado** com usuários?
- [ ] **Implementação simples** possível?
- [ ] **Teste manual** planejado?
- [ ] **Rollback** possível se falhar?
- [ ] **Alinhado** com MVP?

---

## 🔄 **PROCESSO DE DESENVOLVIMENTO SEGURO**

### **Fase 1: Setup Mínimo (1 dia)**
```bash
# Apenas o essencial:
- React Native + TypeScript
- Node.js + Express
- PostgreSQL
- Testes básicos
- Deploy simples
```

### **Fase 2: Login Funcional (1-2 dias)**
```bash
# Apenas login:
- Tela de login
- Autenticação
- Redirecionamento para dashboard
- Testes completos
- Validação manual
```

### **Fase 3: Dashboard Básico (1-2 dias)**
```bash
# Apenas dashboard:
- Tela básica
- Dados do usuário
- Logout
- Testes completos
- Validação manual
```

### **Fase 4: Funcionalidades Essenciais (2-3 dias)**
```bash
# Uma por vez:
- Lista de tarefas
- Perfil de usuário
- Configurações básicas
- Testes a cada adição
```

---

## 🎯 **OBJETIVO FINAL**

**Criar um projeto que:**
- ✅ **Funciona** desde o início
- ✅ **Não repete** erros anteriores
- ✅ **Respeita** todos os envolvidos
- ✅ **Aprende** continuamente
- ✅ **Entrega** valor rapidamente

---

**Lembre-se:** Estas regras são **OBRIGATÓRIAS** e **NÃO NEGOCIÁVEIS**. Elas existem para garantir o sucesso do projeto e o respeito entre todos os envolvidos.


## ⚠️ **LIMITAÇÕES E CONSIDERAÇÕES**

### **Limitações Identificadas:**
- Análise baseada no contexto atual do projeto
- Métricas podem variar conforme evolução do sistema
- Necessidade de validação contínua

### **Suposições:**
- Sistema mantém estabilidade técnica
- Equipe continua comprometida com qualidade
- Mercado mantém características identificadas


## 8. REGRA DE EXCEÇÃO TÉCNICA JUSTIFICADA

- Se, após esgotar todas as alternativas dentro do stack aprovado e das dependências permitidas, o problema persistir de forma comprovada:
  - É permitido propor mudanças de arquitetura, inclusão de novas dependências ou alteração de ferramentas de build.
  - A proposta deve ser documentada, justificada tecnicamente e baseada em fontes reconhecidas (documentação oficial, comunidade, projetos de referência).
  - Todas as tentativas anteriores devem ser listadas e documentadas.
  - A decisão deve ser registrada e aprovada pelo responsável técnico, PO ou pelo próprio usuário, conforme o caso.
  - O objetivo é garantir a evolução do projeto sem comprometer a qualidade, a segurança ou a rastreabilidade.

### Protocolo de Escalada Técnica

1. **Relatar o problema** com logs, prints e contexto detalhado.
2. **Listar todas as tentativas** feitas dentro do stack e dependências aprovadas.
3. **Apresentar a solução alternativa** com base em fontes confiáveis e exemplos de mercado.
4. **Solicitar avaliação/validação** do responsável técnico ou PO.
5. **Registrar a decisão** e o racional para futuras auditorias e aprendizado do time.

> **Nota:** O uso desta exceção é restrito a casos comprovadamente insolúveis com o stack atual e deve ser sempre documentado e aprovado formalmente.
