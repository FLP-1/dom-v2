
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

# TREINAMENTO: DIRETIVAS CRÍTICAS
## Como Seguir as Práticas de Pensamento Crítico e Qualidade

### 🎯 OBJETIVO
Este treinamento garante que todos os membros da equipe (humanos e agentes de IA) sigam rigorosamente as diretivas críticas para manter a qualidade e integridade do projeto.

### 📋 DIRETIVAS FUNDAMENTAIS

#### 1. NÃO PRESUMA - Busque Certeza
**O que significa:**
- Nunca assuma que algo é verdadeiro sem verificar
- Sempre busque fontes confiáveis e reconhecidas
- Documente a origem de cada decisão

**Como aplicar:**
- ✅ **CORRETO**: "Baseado na documentação oficial do React Native v0.72..."
- ❌ **INCORRETO**: "React Native funciona assim..."

**Checklist:**
- [ ] Verifiquei fontes antes de implementar?
- [ ] Documentei a origem da informação?
- [ ] A fonte é confiável e reconhecida?

#### 2. Seja Crítico Construtivo
**O que significa:**
- Questionar decisões de forma produtiva
- Identificar problemas e propor soluções
- Não apenas concordar, mas analisar

**Como aplicar:**
- ✅ **CORRETO**: "Esta abordagem tem vantagens X e Y, mas também riscos Z. Sugiro considerar..."
- ❌ **INCORRETO**: "Está bom assim"

**Checklist:**
- [ ] Questiono as decisões tomadas?
- [ ] Identifico riscos e limitações?
- [ ] Proponho alternativas construtivas?

#### 3. Questione Suposições
**O que significa:**
- Listar todas as suposições feitas
- Validar cada suposição
- Testar hipóteses

**Como aplicar:**
- ✅ **CORRETO**: "Estou assumindo que: 1) O usuário tem conexão estável, 2) O dispositivo suporta..."
- ❌ **INCORRETO**: Implementar sem questionar premissas

**Checklist:**
- [ ] Liste todas as suposições?
- [ ] Valide cada suposição?
- [ ] Teste as hipóteses?

#### 4. Apresente Múltiplas Perspectivas
**O que significa:**
- Considerar pelo menos 3 alternativas
- Analisar diferentes ângulos
- Documentar trade-offs

**Como aplicar:**
- ✅ **CORRETO**: "Podemos usar: A) React Native, B) Flutter, C) Ionic. Trade-offs: A tem mais bibliotecas mas..."
- ❌ **INCORRETO**: "Vamos usar React Native"

**Checklist:**
- [ ] Considerei pelo menos 3 alternativas?
- [ ] Documentei os trade-offs?
- [ ] Analisei diferentes perspectivas?

#### 5. Teste a Lógica
**O que significa:**
- Validar o raciocínio
- Identificar falhas lógicas
- Testar implementações

**Como aplicar:**
- ✅ **CORRETO**: "Vamos testar: se X acontecer, então Y deve resultar. Caso contrário, há um erro..."
- ❌ **INCORRETO**: Implementar sem validar

**Checklist:**
- [ ] Validei o raciocínio?
- [ ] Identifiquei possíveis falhas?
- [ ] Testei a implementação?

#### 6. Priorize Verdade e Honestidade Intelectual
**O que significa:**
- Reportar erros imediatamente
- Ser transparente sobre limitações
- Corrigir com clareza

**Como aplicar:**
- ✅ **CORRETO**: "Encontrei um problema: X não funciona como esperado. Limitação: só funciona em..."
- ❌ **INCORRETO**: Esconder problemas ou limitações

**Checklist:**
- [ ] Reportei erros encontrados?
- [ ] Sou transparente sobre limitações?
- [ ] Corrijo problemas com clareza?

### 🛠️ FERRAMENTAS E PROCESSOS

#### Sistema de Validação Automática
```bash
# Validar se as diretivas estão sendo seguidas
npm run validate-directives

# Registrar uma decisão
npm run decision:record "Descrição da decisão"

# Analisar padrões de decisões
npm run decision:analyze

# Validar todas as decisões
npm run decision:validate
```

#### Checklist Obrigatório Antes de Cada Commit
- [ ] Fontes verificadas e documentadas
- [ ] Alternativas consideradas
- [ ] Suposições listadas e validadas
- [ ] Múltiplas perspectivas analisadas
- [ ] Lógica testada
- [ ] Erros reportados

#### Processo de Revisão por Pares
1. **Revisor deve questionar:**
   - As fontes são confiáveis?
   - Foram consideradas alternativas?
   - Os riscos foram identificados?
   - A lógica foi validada?

2. **Autor deve responder:**
   - Documentar fontes
   - Explicar alternativas consideradas
   - Listar riscos identificados
   - Demonstrar validação

### 📊 MÉTRICAS DE SUCESSO

#### Para Humanos:
- **0%** de implementações sem fonte
- **100%** de decisões documentadas
- **90%+** de cobertura de testes
- **< 1 hora** tempo de resposta a erros

#### Para Agentes de IA:
- **100%** de respostas seguindo prompts estruturados
- **0%** de implementações sem validação
- **100%** de transparência sobre limitações

### 🚨 CONSEQUÊNCIAS DE NÃO SEGUIR

#### Para Humanos:
- Rejeição automática de commits
- Revisão obrigatória adicional
- Treinamento adicional obrigatório
- Suspensão temporária de acesso

#### Para Agentes de IA:
- Rejeição automática de respostas
- Prompts corrigidos automaticamente
- Feedback contínuo para melhoria

### 📚 EXEMPLOS PRÁTICOS

#### Exemplo 1: Escolha de Tecnologia
**❌ INCORRETO:**
```
Vamos usar React Native porque é melhor.
```

**✅ CORRETO:**
```
ANÁLISE CRÍTICA:
- Suposições: Usuários têm smartphones modernos, precisamos de app nativo
- Alternativas: Flutter (melhor performance), Ionic (mais fácil), React Native (mais bibliotecas)
- Riscos: React Native pode ter problemas de performance, Flutter tem menos bibliotecas
- Fontes: Documentação oficial, benchmarks de performance, análise de mercado
- Validação: Teste de performance, análise de bibliotecas necessárias

RECOMENDAÇÃO: React Native
- Justificativa: Maior ecossistema de bibliotecas, equipe já conhece React
- Limitações: Performance pode ser inferior ao Flutter
- Como monitorar: Métricas de performance, feedback de usuários
```

#### Exemplo 2: Implementação de Feature
**❌ INCORRETO:**
```javascript
// Adiciona validação
function validateEmail(email) {
    return email.includes('@');
}
```

**✅ CORRETO:**
```javascript
/**
 * VALIDAÇÃO DE EMAIL
 * 
 * Suposições:
 * - Email deve ter formato válido
 * - Usuários podem cometer erros de digitação
 * 
 * Alternativas consideradas:
 * - Regex simples (rápido mas limitado)
 * - Biblioteca externa (mais robusto mas aumenta bundle)
 * - Validação no servidor (seguro mas lento)
 * 
 * Riscos:
 * - Regex pode não cobrir todos os casos
 * - Biblioteca pode ter vulnerabilidades
 * 
 * Fontes:
 * - RFC 5322 (padrão de email)
 * - Documentação da biblioteca validator.js
 * 
 * Validação:
 * - Teste com emails válidos e inválidos
 * - Medição de performance
 */
function validateEmail(email) {
    // Usando regex baseado em RFC 5322
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Testes
console.assert(validateEmail('test@example.com') === true);
console.assert(validateEmail('invalid-email') === false);
```

### 🔄 PROCESSO DE MELHORIA CONTÍNUA

#### Revisão Mensal
1. Analisar padrões de decisões
2. Identificar áreas de melhoria
3. Ajustar diretivas se necessário
4. Treinar equipe em novas práticas

#### Feedback Loop
1. Coletar feedback sobre diretivas
2. Identificar dificuldades
3. Simplificar processos complexos
4. Adicionar exemplos práticos

### 📞 SUPORTE E DÚVIDAS

#### Quando não souber:
1. **PARE** imediatamente
2. **DOCUMENTE** a dúvida
3. **BUSQUE** fontes confiáveis
4. **CONSULTE** a equipe
5. **VALIDE** antes de prosseguir

#### Contatos:
- **Líder Técnico**: Para dúvidas técnicas
- **Documentação**: Para exemplos e guias
- **Sistema de Auditoria**: Para registrar decisões

---

**Lembre-se: O objetivo não é ser perfeito, mas ser transparente, crítico e sempre buscar a verdade. Erros são aceitáveis, mas não seguir as diretivas não é.** 