
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

# GUIA PRÁTICO - SISTEMA DE PENSAMENTO CRÍTICO

## 🎯 COMO USAR O SISTEMA

### 1. VALIDAÇÃO AUTOMÁTICA

#### Comando PowerShell para validar:
```powershell
Set-Location C:\dom-v2
npm run validate-critical-thinking
```

#### Comandos alternativos:
```powershell
Set-Location C:\dom-v2
npm run critical-thinking
npm run thinking
```

### 2. FUNÇÕES DISPONÍVEIS

#### Importar funções no frontend:
```javascript
import { 
    validateInformationSource,
    validateAlternatives,
    validateAssumptions,
    validateLogic,
    criticalThinkingChecklist,
    createSystemNotification
} from './utils/generic-functions.js';
```

### 3. EXEMPLOS PRÁTICOS

#### Exemplo 1: Validar fonte de informação
```javascript
// ✅ CORRETO - Com fonte confiável
const validation = validateInformationSource(
    "PostgreSQL é mais robusto para produção",
"Documentação oficial PostgreSQL",
    "official"
);

if (!validation.isValid) {
    console.error('Alerta:', validation.alert);
}

// ❌ INCORRETO - Sem fonte
const badValidation = validateInformationSource(
    "PostgreSQL é melhor",
    "", // Fonte vazia
    "official"
);
// Isso gerará um alerta CRITICAL
```

#### Exemplo 2: Validar alternativas consideradas
```javascript
// ✅ CORRETO - Múltiplas alternativas
const alternatives = validateAlternatives(
    ['PostgreSQL', 'MySQL'],
    'PostgreSQL',
    'Melhor suporte a transações e integridade referencial'
);

// ❌ INCORRETO - Apenas uma alternativa
const badAlternatives = validateAlternatives(
    ['PostgreSQL'], // Apenas uma opção
    'PostgreSQL',
    'É o melhor'
);
// Isso gerará um alerta ALTERNATIVE_MISSING
```

#### Exemplo 3: Validar suposições
```javascript
// ✅ CORRETO - Suposições identificadas e validadas
const assumptions = validateAssumptions(
    [
        'O usuário tem conhecimento técnico',
        'O banco será usado em produção',
        'Performance é crítica'
    ],
    [
        { validated: true, source: 'Documentação de requisitos' },
        { validated: true, source: 'Entrevista com stakeholders' },
        { validated: true, source: 'Testes de performance' }
    ]
);

// ❌ INCORRETO - Suposições não validadas
const badAssumptions = validateAssumptions(
    ['O usuário sabe programar'],
    [] // Validações vazias
);
// Isso gerará um alerta ASSUMPTION_ALERT
```

#### Exemplo 4: Validar lógica
```javascript
// ✅ CORRETO - Lógica testada
const logic = validateLogic(
    'Se usuário está logado, mostrar dashboard',
    [
        { input: 'usuário logado', expected: 'dashboard visível' },
        { input: 'usuário não logado', expected: 'login visível' }
    ],
    [
        { passed: true, result: 'dashboard visível' },
        { passed: true, result: 'login visível' }
    ]
);

// ❌ INCORRETO - Lógica não testada
const badLogic = validateLogic(
    'Se usuário está logado, mostrar dashboard',
    [], // Casos de teste vazios
    []
);
// Isso gerará um alerta LOGIC_ERROR
```

#### Exemplo 5: Checklist completo
```javascript
// ✅ CORRETO - Checklist completo
const decision = {
    source: {
        information: 'PostgreSQL é melhor para produção',
        source: 'Documentação oficial',
        sourceType: 'official'
    },
    alternatives: ['PostgreSQL', 'MySQL'],
    assumptions: ['Produção crítica', 'Dados importantes'],
    logic: 'Teste de performance realizado',
    testCases: ['Carga alta', 'Concorrência'],
    contrapoints: ['MySQL é mais rápido']
};

const checklist = criticalThinkingChecklist(decision);

if (checklist.passed) {
    console.log('✅ Decisão validada pelo pensamento crítico');
} else {
    console.log('❌ Alertas gerados:', checklist.alerts);
}
```

### 4. TIPOS DE ALERTA

#### Alertas Críticos (CRITICAL):
- `CRITICAL_ERROR`: Erro que requer correção imediata
- `LOGIC_ERROR`: Falha lógica identificada

#### Alertas de Validação (HIGH):
- `VALIDATION_NEEDED`: Informação precisa ser verificada
- `ASSUMPTION_ALERT`: Suposição precisa ser questionada
- `SOURCE_MISSING`: Fonte confiável ausente

#### Alertas de Melhoria (MEDIUM):
- `ALTERNATIVE_MISSING`: Outras opções não consideradas

### 5. PROCEDIMENTO OBRIGATÓRIO

#### ANTES DE IMPLEMENTAR QUALQUER FUNCIONALIDADE:

1. **VALIDAR FONTE:**
   ```javascript
   const sourceValidation = validateInformationSource(
       "Informação sobre a funcionalidade",
       "Fonte confiável (documentação, artigo, etc.)",
       "official" // ou academic, community, expert, standard
   );
   ```

2. **CONSIDERAR ALTERNATIVAS:**
   ```javascript
   const alternativesValidation = validateAlternatives(
       ['Opção A', 'Opção B', 'Opção C'],
       'Opção A',
       'Motivo fundamentado da escolha'
   );
   ```

3. **IDENTIFICAR SUPOSIÇÕES:**
   ```javascript
   const assumptionsValidation = validateAssumptions(
       ['Suposição 1', 'Suposição 2'],
       [
           { validated: true, source: 'Evidência 1' },
           { validated: true, source: 'Evidência 2' }
       ]
   );
   ```

4. **TESTAR LÓGICA:**
   ```javascript
   const logicValidation = validateLogic(
       'Lógica da funcionalidade',
       [
           { input: 'Caso 1', expected: 'Resultado 1' },
           { input: 'Caso 2', expected: 'Resultado 2' }
       ],
       [
           { passed: true, result: 'Resultado 1' },
           { passed: true, result: 'Resultado 2' }
       ]
   );
   ```

5. **APRESENTAR CONTRAPONTOS:**
   ```javascript
   const contrapoints = [
       'Ponto de vista alternativo 1',
       'Ponto de vista alternativo 2',
       'Possíveis problemas identificados'
   ];
   ```

6. **EXECUTAR CHECKLIST:**
   ```javascript
   const decision = {
       source: sourceValidation,
       alternatives: alternativesValidation,
       assumptions: assumptionsValidation,
       logic: logicValidation,
       contrapoints: contrapoints
   };

   const checklist = criticalThinkingChecklist(decision);
   
   if (!checklist.passed) {
       console.error('❌ Decisão não aprovada pelo pensamento crítico');
       checklist.alerts.forEach(alert => console.error(alert));
       return; // PARAR IMPLEMENTAÇÃO
   }
   ```

### 6. INTEGRAÇÃO COM SISTEMA DE NOTIFICAÇÕES

#### Alertas aparecem automaticamente no dashboard:
```javascript
// Alertas críticos aparecem com prioridade máxima
createSystemNotification('CRITICAL_ERROR', 'Descrição do erro crítico');
createSystemNotification('LOGIC_ERROR', 'Descrição do erro lógico');
createSystemNotification('SOURCE_MISSING', 'Descrição da fonte ausente');
```

### 7. DOCUMENTAÇÃO OBRIGATÓRIA

#### Todas as decisões devem ser documentadas:
```javascript
const decisionDocument = {
    timestamp: new Date().toISOString(),
    decision: 'Escolha da tecnologia X',
    source: sourceValidation,
    alternatives: alternativesValidation,
    assumptions: assumptionsValidation,
    logic: logicValidation,
    contrapoints: contrapoints,
    checklist: checklist,
    approved: checklist.passed
};
```

### 8. COMANDOS ESSENCIAIS

#### Validação contínua:
```powershell
# Validar pensamento crítico
Set-Location C:\dom-v2
npm run validate-critical-thinking

# Validar tudo (incluindo pensamento crítico)
Set-Location C:\dom-v2
npm run quality-check
```

---

## 🚨 LEMBRE-SE

**O objetivo não é discordar por discordar, mas sim:**
- Garantir decisões fundamentadas
- Evitar suposições não validadas
- Identificar problemas antes da implementação
- Melhorar a qualidade do código
- Documentar o raciocínio

**SEMPRE especifique o diretório nos comandos PowerShell!** 

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


## ⚠️ **LIMITAÇÕES E CONSIDERAÇÕES**

### **Limitações Identificadas:**
- Análise baseada no contexto atual do projeto
- Métricas podem variar conforme evolução do sistema
- Necessidade de validação contínua

### **Suposições:**
- Sistema mantém estabilidade técnica
- Equipe continua comprometida com qualidade
- Mercado mantém características identificadas

---

## 9. EXCEÇÃO TÉCNICA JUSTIFICADA E ESCALADA

Se, após esgotar todas as alternativas dentro do stack e dependências aprovadas, o problema persistir:
- É permitido propor mudanças de arquitetura, dependências ou ferramentas.
- A proposta deve ser documentada, justificada tecnicamente e baseada em fontes reconhecidas.
- Todas as tentativas anteriores devem ser listadas e documentadas.
- A decisão deve ser registrada e aprovada pelo responsável técnico, PO ou usuário.

### Protocolo de Escalada Técnica
1. Relatar o problema com logs, prints e contexto detalhado.
2. Listar todas as tentativas feitas dentro do stack e dependências aprovadas.
3. Apresentar a solução alternativa com base em fontes confiáveis e exemplos de mercado.
4. Solicitar avaliação/validação do responsável técnico ou PO.
5. Registrar a decisão e o racional para futuras auditorias e aprendizado do time.

> **Nota:** O uso desta exceção é restrito a casos comprovadamente insolúveis com o stack atual e deve ser sempre documentado e aprovado formalmente.
