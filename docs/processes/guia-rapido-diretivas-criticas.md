
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

# GUIA RÁPIDO - DIRETIVAS CRÍTICAS DOM v2
## Referência Simplificada para Uso Diário

### 🎯 **4 DIRETIVAS PRINCIPAIS**

#### **1. NÃO PRESUMA - BUSQUE CERTEZA**
```bash
❌ INCORRETO: "Vou implementar assim porque acho que funciona"
✅ CORRETO: "Vou implementar baseado na documentação oficial e testes"
```

**CHECKLIST OBRIGATÓRIO:**
- [ ] Fontes verificadas e documentadas
- [ ] Alternativas consideradas
- [ ] Validação realizada
- [ ] Limitações identificadas

**EXEMPLO PRÁTICO:**
```javascript
// ❌ INCORRETO
function processData(data) {
    // Assumindo que data sempre tem a estrutura correta
    return data.value * 2;
}

// ✅ CORRETO
function processData(data) {
    // Fonte: Documentação oficial da API
    // Validação: Testes unitários implementados
    // Limitação: Funciona apenas com números positivos
    
    if (!data || typeof data.value !== 'number' || data.value < 0) {
        throw new Error('Dados inválidos - validação baseada em testes');
    }
    
    return data.value * 2;
}
```

---

#### **2. QUESTIONE SUPOSIÇÕES**
```bash
❌ INCORRETO: "Sempre foi assim, então está correto"
✅ CORRETO: "Por que sempre foi assim? Existe uma abordagem melhor?"
```

**CHECKLIST OBRIGATÓRIO:**
- [ ] Suposições listadas e validadas
- [ ] Alternativas consideradas
- [ ] Riscos identificados
- [ ] Limitações documentadas

**EXEMPLO PRÁTICO:**
```javascript
// ❌ INCORRETO
// Supondo que o usuário sempre terá permissão
function deleteUser(userId) {
    return database.delete(userId);
}

// ✅ CORRETO
// Questionando: E se o usuário não tiver permissão?
// Alternativa: Verificar permissões primeiro
// Risco: Exposição de dados sensíveis
function deleteUser(userId, currentUser) {
    // Validação de permissão baseada em regras de negócio
    if (!hasPermission(currentUser, 'DELETE_USER')) {
        throw new Error('Permissão negada - validação de segurança');
    }
    
    return database.delete(userId);
}
```

---

#### **3. PRIORIZE VERDADE E HONESTIDADE**
```bash
❌ INCORRETO: "Está funcionando" (quando há problemas)
✅ CORRETO: "Está funcionando, mas há limitações que precisam ser corrigidas"
```

**CHECKLIST OBRIGATÓRIO:**
- [ ] Erros reportados claramente
- [ ] Limitações documentadas
- [ ] Problemas conhecidos listados
- [ ] Planos de correção definidos

**EXEMPLO PRÁTICO:**
```javascript
// ❌ INCORRETO
function calculateFraudScore(transaction) {
    // "Funciona perfeitamente"
    return transaction.amount > 1000 ? 'HIGH' : 'LOW';
}

// ✅ CORRETO
function calculateFraudScore(transaction) {
    // LIMITAÇÃO: Algoritmo básico, precisa de ML
    // PROBLEMA CONHECIDO: Não considera contexto histórico
    // PLANO: Implementar ML em Fase 5
    
    if (!transaction || typeof transaction.amount !== 'number') {
        throw new Error('Dados de transação inválidos');
    }
    
    return transaction.amount > 1000 ? 'HIGH' : 'LOW';
}
```

---

#### **4. NOMENCLATURA RÍGIDA - SEMPRE INGLÊS E ASCII**
```bash
❌ INCORRETO: "Vou usar nomes em português para facilitar"
✅ CORRETO: "Vou usar nomenclatura padrão internacional"
```

**CHECKLIST OBRIGATÓRIO:**
- [ ] Nomes em inglês (sem acentos)
- [ ] Padrões de nomenclatura seguidos
- [ ] Caracteres ASCII apenas
- [ ] Compatibilidade internacional

**EXEMPLO PRÁTICO:**
```javascript
// ❌ INCORRETO
function validaçãoUsuário(dadosUsuário) {
    const resultadoValidação = {
        éVálido: true,
        erros: []
    };
    
    if (!dadosUsuário.nomeUsuário) {
        resultadoValidação.erros.push('Nome de usuário obrigatório');
        resultadoValidação.éVálido = false;
    }
    
    return resultadoValidação;
}

// ✅ CORRETO
function validateUser(userData) {
    const validationResult = {
        isValid: true,
        errors: []
    };
    
    if (!userData.username) {
        validationResult.errors.push('Username is required');
        validationResult.isValid = false;
    }
    
    return validationResult;
}
```

**PADRÕES OBRIGATÓRIOS:**
- **Variáveis/Funções:** camelCase (`validateUser`, `userData`)
- **Classes/Interfaces:** PascalCase (`UserValidator`, `ValidationResult`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_RETRY_ATTEMPTS`, `DEFAULT_TIMEOUT`)
- **Arquivos:** kebab-case (`user-validation.js`, `security-manager.js`)
- **Comandos:** lowercase (`npm run validate-user`)
    // PROBLEMA CONHECIDO: Falsos positivos em transações legítimas
    // PLANO: Implementar modelo de ML até Q2/2024
    
    const basicScore = transaction.amount > 1000 ? 'HIGH' : 'LOW';
    
    // TODO: Implementar análise de padrões
    // TODO: Adicionar validação de localização
    // TODO: Integrar com sistema de ML
    
    return basicScore;
}
```

---

### 🔧 **COMANDOS POWERSHELL RÁPIDOS**

#### **VALIDAÇÃO DIÁRIA:**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
npm run validate-enhanced
```

#### **VALIDAÇÃO RÁPIDA:**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
npm run validate-directives
```

#### **AUDITORIA DE DECISÕES:**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
npm run decision:analyze
```

---

### 📋 **CHECKLIST RÁPIDO - ANTES DE CADA COMMIT**

#### **DOCUMENTAÇÃO:**
- [ ] Fontes verificadas e documentadas
- [ ] Limitações identificadas
- [ ] Alternativas consideradas
- [ ] Problemas conhecidos listados

#### **CÓDIGO:**
- [ ] Validações implementadas
- [ ] Tratamento de erros adequado
- [ ] Testes escritos
- [ ] Comentários explicativos

#### **DECISÕES:**
- [ ] Suposições questionadas
- [ ] Múltiplas perspectivas consideradas
- [ ] Riscos avaliados
- [ ] Trade-offs documentados

---

### 🚨 **GATILHOS DE ATENÇÃO**

#### **SE APARECER:**
- ❌ "Acho que funciona"
- ❌ "Sempre foi assim"
- ❌ "Não tem problema"
- ❌ "Está funcionando" (sem validação)

#### **AÇÃO IMEDIATA:**
1. **PARAR** e questionar
2. **BUSCAR** fontes e evidências
3. **VALIDAR** com testes
4. **DOCUMENTAR** limitações

---

### 📊 **MÉTRICAS DE SUCESSO**

#### **DIÁRIAS:**
- ✅ **0%** de suposições não validadas
- ✅ **100%** de fontes documentadas
- ✅ **100%** de limitações identificadas

#### **SEMANAIS:**
- ✅ **Redução de 50%** em bugs críticos
- ✅ **Melhoria de 30%** em qualidade
- ✅ **100%** de conformidade com diretivas

---

### 🎯 **EXEMPLOS PRÁTICOS POR CONTEXTO**

#### **DESENVOLVIMENTO DE FEATURES:**
```javascript
// ANTES DE IMPLEMENTAR
// 1. Buscar certeza: Documentação da API, casos de uso
// 2. Questionar suposições: E se a API mudar? E se o usuário não tiver dados?
// 3. Priorizar verdade: Documentar limitações e planos de melhoria

function implementFeature(data) {
    // FONTE: Documentação oficial da API v2.1
    // VALIDAÇÃO: Testes com dados reais de usuários
    // LIMITAÇÃO: Funciona apenas com dados completos
    // PLANO: Implementar validação parcial até v2.2
    
    if (!validateData(data)) {
        throw new Error('Dados inválidos - validação baseada em testes');
    }
    
    return processData(data);
}
```

#### **REVISÃO DE CÓDIGO:**
```javascript
// PERGUNTAS OBRIGATÓRIAS:
// 1. As fontes estão documentadas?
// 2. As suposições foram questionadas?
// 3. As limitações estão claras?
// 4. Os problemas conhecidos estão listados?

// EXEMPLO DE REVISÃO
function reviewCode(code) {
    const issues = [];
    
    // Verificar fontes
    if (!code.hasDocumentation) {
        issues.push('❌ Fontes não documentadas');
    }
    
    // Verificar suposições
    if (!code.hasValidation) {
        issues.push('❌ Suposições não validadas');
    }
    
    // Verificar honestidade
    if (!code.hasLimitations) {
        issues.push('❌ Limitações não documentadas');
    }
    
    return issues;
}
```

#### **TOMADA DE DECISÕES:**
```javascript
// ESTRUTURA OBRIGATÓRIA:
// 1. CONTEXTO: O que está sendo decidido?
// 2. FONTES: Baseado em quê?
// 3. SUPOSIÇÕES: O que estamos assumindo?
// 4. ALTERNATIVAS: Que outras opções existem?
// 5. RISCOS: Quais são os riscos?
// 6. LIMITAÇÕES: O que não conseguimos fazer?

const decision = {
    context: 'Escolha da tecnologia de banco de dados',
    sources: ['Benchmark oficial', 'Testes de performance', 'Documentação'],
    assumptions: ['Volume de dados < 1TB', 'Latência < 100ms'],
    alternatives: ['PostgreSQL', 'MongoDB', 'Redis'],
    risks: ['Lock-in de vendor', 'Curva de aprendizado'],
    limitations: ['Não suporta transações distribuídas']
};
```

---

### 🔄 **PROCESSO DE MELHORIA CONTÍNUA**

#### **DIÁRIO:**
1. Aplicar diretivas em cada tarefa
2. Documentar aprendizados
3. Identificar melhorias

#### **SEMANAL:**
1. Revisar métricas de qualidade
2. Analisar padrões de problemas
3. Ajustar processos

#### **MENSAL:**
1. Avaliar efetividade das diretivas
2. Coletar feedback da equipe
3. Implementar melhorias

---

### 📞 **SUPORTE E ESCALAÇÃO**

#### **QUANDO DÚVIDA:**
1. **CONSULTAR** documentação completa
2. **PERGUNTAR** para a equipe
3. **ESCALAR** para liderança
4. **DOCUMENTAR** decisão tomada

#### **CONTATOS:**
- **Documentação completa:** `docs/TREINAMENTO_DIRETIVAS_CRITICAS.md`
- **Sistema de validação:** `npm run validate-enhanced`
- **Auditoria de decisões:** `npm run decision:analyze`

---

**ESTE GUIA RÁPIDO GARANTE APLICAÇÃO CONSISTENTE DAS DIRETIVAS CRÍTICAS NO DIA A DIA DO PROJETO DOM v2.** 

## 🚀 **EXCEÇÃO TÉCNICA JUSTIFICADA**

Se, após esgotar todas as alternativas dentro do stack aprovado e dependências permitidas, o problema persistir de forma comprovada:

- É permitido propor mudanças de arquitetura, inclusão de novas dependências ou alteração de ferramentas de build
- A proposta deve ser documentada, justificada tecnicamente e baseada em fontes reconhecidas
- Todas as tentativas anteriores devem ser listadas e documentadas
- A decisão deve ser registrada e aprovada pelo responsável técnico, PO ou pelo próprio usuário

### Protocolo de Escalada Técnica
1. **Relatar o problema** com logs, prints e contexto detalhado
2. **Listar todas as tentativas** feitas dentro do stack e dependências aprovadas
3. **Apresentar a solução alternativa** com base em fontes confiáveis e exemplos de mercado
4. **Solicitar avaliação/validação** do responsável técnico ou PO
5. **Registrar a decisão** e o racional para futuras auditorias e aprendizado do time

> **Nota:** O uso desta exceção é restrito a casos comprovadamente insolúveis com o stack atual e deve ser sempre documentado e aprovado formalmente.

--- 