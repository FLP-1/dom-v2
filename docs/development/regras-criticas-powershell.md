
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



// Validação de entrada de dados
function validateInput(data: any): boolean {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  return true;
}

// Validação de tipos
function validateType(value: any, expectedType: string): boolean {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null;
    case 'array':
      return Array.isArray(value);
    default:
      return false;
  }
}



// Tratamento de erros centralizado
function handleError(error: Error, context: string): void {
  console.error(`[ERROR] ${context}:`, error.message);
  // Implementar logging, notificação, etc.
}

// Wrapper para funções com tratamento de erro
function safeExecute(fn: Function, context: string): any {
  try {
    return fn();
  } catch (error) {
    handleError(error as Error, context);
    throw error;
  }
}

/**
 * @fileoverview regras-criticas-powershell
 * @description Funcionalidade principal
 * @version 1.0.0
 * @author DOM v2 Team
 * @since 2025-07-26
 */

# DIRETIVAS CRÍTICAS - SISTEMA DE VALIDAÇÃO E CONTROLE

## 1. PRINCÍPIOS FUNDAMENTAIS

### 1.1 Não Presuma - Busque Certeza
- **OBRIGATÓRIO**: Sempre verificar fontes antes de implementar
- **VALIDAÇÃO**: Documentar origem de cada decisão técnica
- **CONTROLE**: Checklist obrigatório antes de cada commit

### 1.2 Pensamento Crítico Construtivo
- **OBRIGATÓRIO**: Questionar TODAS as decisões
- **VALIDAÇÃO**: Documentar alternativas consideradas
- **CONTROLE**: Revisão obrigatória por pares

### 1.3 Questionamento de Suposições
- **OBRIGATÓRIO**: Listar todas as suposições
- **VALIDAÇÃO**: Testar cada suposição
- **CONTROLE**: Validação automática via testes

### 1.4 Múltiplas Perspectivas
- **OBRIGATÓRIO**: Considerar pelo menos 3 alternativas
- **VALIDAÇÃO**: Documentar trade-offs
- **CONTROLE**: Matriz de decisão obrigatória

### 1.5 Teste de Lógica
- **OBRIGATÓRIO**: Validação lógica de cada implementação
- **VALIDAÇÃO**: Testes unitários e de integração
- **CONTROLE**: Cobertura mínima de 90%

### 1.6 Verdade e Honestidade Intelectual
- **OBRIGATÓRIO**: Reportar erros imediatamente
- **VALIDAÇÃO**: Sistema de logs detalhados
- **CONTROLE**: Auditoria automática

## 2. SISTEMAS DE GARANTIA

### 2.1 Validação Automática (Scripts)
```powershell
# Script de validação pré-commit
# Verifica se todas as diretivas foram seguidas
```

### 2.2 Checklists Obrigatórios
- [ ] Fontes verificadas e documentadas
- [ ] Alternativas consideradas
- [ ] Suposições listadas e validadas
- [ ] Múltiplas perspectivas analisadas
- [ ] Lógica testada
- [ ] Erros reportados

### 2.3 Sistema de Auditoria
- Logs detalhados de todas as decisões
- Rastreabilidade completa
- Validação automática de qualidade

## 3. IMPLEMENTAÇÃO PRÁTICA

### 3.1 Para Humanos
- Treinamento obrigatório nas diretivas
- Checklist físico/digital obrigatório
- Revisão por pares sistemática

### 3.2 Para Agentes de IA
- Prompts estruturados com validação
- Verificação automática de fontes
- Sistema de feedback contínuo

### 3.3 Para o Código
- Testes automatizados
- Documentação obrigatória
- Validação de qualidade

## 4. MÉTRICAS DE SUCESSO

- 0% de implementações sem fonte
- 100% de decisões documentadas
- 90%+ cobertura de testes
- Tempo de resposta a erros < 1 hora

## 5. CONSEQUÊNCIAS DE NÃO SEGUIR

- Rejeição automática de commits
- Revisão obrigatória adicional
- Treinamento adicional obrigatório
- Suspensão temporária de acesso

## 6. REVISÃO CONTÍNUA

- Avaliação mensal do sistema
- Ajustes baseados em feedback
- Melhoria contínua das diretivas 

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

## ⚠️ **LIMITAÇÕES E CONSIDERAÇÕES**

### **Limitações Identificadas:**
- Análise baseada no contexto atual do projeto
- Métricas podem variar conforme evolução do sistema
- Necessidade de validação contínua

### **Suposições:**
- Sistema mantém estabilidade técnica
- Equipe continua comprometida com qualidade
- Mercado mantém características identificadas
