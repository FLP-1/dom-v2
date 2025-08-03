
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

# 🛡️ GUIA RÁPIDO - DIRETIVAS CRÍTICAS ESSENCIAIS

## 🎯 **3 DIRETIVAS PRINCIPAIS**

### **1. NÃO PRESUMA - BUSQUE CERTEZA**
```typescript
// ❌ ERRADO
function processData(data: any) {
  return data.value * 2; // Presumindo que data.value existe
}

// ✅ CORRETO
function processData(data: any) {
  // Verificar se data e data.value existem
  if (!data || typeof data.value !== 'number') {
    throw new Error('Dados inválidos: data.value deve ser um número');
  }
  return data.value * 2;
}
```

**REGRAS OBRIGATÓRIAS:**
- ✅ Sempre validar entrada de dados
- ✅ Verificar se propriedades existem antes de usar
- ✅ Documentar fontes de informação
- ✅ Tratar casos de erro

### **2. SEJA CRÍTICO CONSTRUTIVO**
```typescript
// ❌ ERRADO
function calculateBudget(income: number) {
  return income * 0.3; // Sem questionar se 30% é apropriado
}

// ✅ CORRETO
function calculateBudget(income: number, category: string) {
  // Questionar: 30% é apropriado para todas as categorias?
  const percentages = {
    'essencial': 0.5,    // 50% para necessidades básicas
    'lazer': 0.2,        // 20% para lazer
    'investimento': 0.3  // 30% para investimentos
  };
  
  const percentage = percentages[category] || 0.3;
  return income * percentage;
}
```

**REGRAS OBRIGATÓRIAS:**
- ✅ Questionar sempre antes de concordar
- ✅ Apresentar argumentos fundamentados
- ✅ Identificar pontos fracos e fortes
- ✅ Sugerir melhorias específicas

### **3. TESTE A LÓGICA**
```typescript
// ❌ ERRADO
function validateCPF(cpf: string) {
  return cpf.length === 11; // Lógica incompleta
}

// ✅ CORRETO
function validateCPF(cpf: string) {
  // Testar diferentes cenários
  if (!cpf || cpf.length !== 11) return false;
  if (cpf === '00000000000') return false; // CPF inválido conhecido
  
  // Validar dígitos verificadores
  const digits = cpf.split('').map(Number);
  const sum1 = digits.slice(0, 9).reduce((acc, digit, index) => 
    acc + digit * (10 - index), 0);
  const digit1 = (sum1 * 10) % 11;
  
  return digit1 === digits[9];
}
```

**REGRAS OBRIGATÓRIAS:**
- ✅ Implementar testes unitários
- ✅ Validar casos extremos
- ✅ Testar cenários de erro
- ✅ Verificar consistência lógica

---

## 🔧 **CHECKLIST RÁPIDO PARA CADA DECISÃO**

### **ANTES DE IMPLEMENTAR:**
- [ ] **Fonte verificada?** Informação tem origem confiável?
- [ ] **Alternativas consideradas?** Outras opções foram avaliadas?
- [ ] **Suposições identificadas?** O que estou assumindo?
- [ ] **Lógica testada?** A solução faz sentido?

### **DURANTE IMPLEMENTAÇÃO:**
- [ ] **Validação de entrada?** Dados são verificados?
- [ ] **Tratamento de erro?** Casos de falha são tratados?
- [ ] **Documentação clara?** Código é auto-explicativo?
- [ ] **Testes implementados?** Funcionalidade é testada?

### **APÓS IMPLEMENTAÇÃO:**
- [ ] **Resultado validado?** Funciona como esperado?
- [ ] **Feedback coletado?** Usuários testaram?
- [ ] **Melhorias identificadas?** O que pode ser melhorado?
- [ ] **Aprendizados documentados?** Lições foram registradas?

---

## 🚨 **ALERTAS CRÍTICOS - AÇÃO IMEDIATA**

### **QUANDO IDENTIFICAR:**
- ❌ **Dados não validados** → Implementar validação
- ❌ **Erros não tratados** → Adicionar try-catch
- ❌ **Lógica não testada** → Criar testes
- ❌ **Documentação ausente** → Adicionar comentários

### **PROCEDIMENTO DE CORREÇÃO:**
1. **PARAR** implementação
2. **DOCUMENTAR** problema encontrado
3. **CORRIGIR** seguindo diretivas
4. **TESTAR** solução
5. **VALIDAR** antes de prosseguir

---

## 📋 **COMANDOS DE VALIDAÇÃO**

### **Validação Rápida:**
```bash
npm run validate-directives
```

### **Validação Completa:**
```bash
npm run check-diretivas
```

### **Garantia de Qualidade:**
```bash
npm run garantia-diretivas
```

---

## 💡 **EXEMPLOS PRÁTICOS**

### **Validação de Entrada:**
```typescript
// ✅ Padrão recomendado
function processUserData(user: any) {
  // 1. VALIDAR ENTRADA
  if (!user || typeof user !== 'object') {
    throw new Error('Usuário deve ser um objeto válido');
  }
  
  if (!user.name || typeof user.name !== 'string') {
    throw new Error('Nome do usuário é obrigatório e deve ser string');
  }
  
  // 2. PROCESSAR DADOS
  const processedUser = {
    name: user.name.trim(),
    email: user.email?.toLowerCase(),
    age: user.age ? parseInt(user.age) : null
  };
  
  // 3. VALIDAR RESULTADO
  if (processedUser.age && (processedUser.age < 0 || processedUser.age > 150)) {
    throw new Error('Idade deve estar entre 0 e 150');
  }
  
  return processedUser;
}
```

### **Tratamento de Erros:**
```typescript
// ✅ Padrão recomendado
async function fetchUserData(userId: string) {
  try {
    // 1. VALIDAR PARÂMETROS
    if (!userId || typeof userId !== 'string') {
      throw new Error('ID do usuário é obrigatório');
    }
    
    // 2. EXECUTAR OPERAÇÃO
    const response = await api.get(`/users/${userId}`);
    
    // 3. VALIDAR RESPOSTA
    if (!response.data) {
      throw new Error('Dados do usuário não encontrados');
    }
    
    return response.data;
    
  } catch (error) {
    // 4. TRATAR ERROS
    console.error('Erro ao buscar usuário:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Usuário não encontrado');
    }
    
    throw new Error('Erro interno do servidor');
  }
}
```

### **Testes Unitários:**
```typescript
// ✅ Padrão recomendado
describe('processUserData', () => {
  test('deve processar usuário válido', () => {
    const user = { name: 'João', email: 'joao@email.com', age: '25' };
    const result = processUserData(user);
    
    expect(result.name).toBe('João');
    expect(result.email).toBe('joao@email.com');
    expect(result.age).toBe(25);
  });
  
  test('deve rejeitar usuário sem nome', () => {
    const user = { email: 'joao@email.com' };
    
    expect(() => processUserData(user)).toThrow('Nome do usuário é obrigatório');
  });
  
  test('deve rejeitar idade inválida', () => {
    const user = { name: 'João', age: '200' };
    
    expect(() => processUserData(user)).toThrow('Idade deve estar entre 0 e 150');
  });
});
```

---

## 🎯 **MÉTRICAS DE SUCESSO**

### **Qualidade do Código:**
- ✅ **90%+** de arquivos com validação adequada
- ✅ **0** bugs críticos em produção
- ✅ **100%** de cobertura de testes para funções críticas

### **Processo de Desenvolvimento:**
- ✅ **< 5 minutos** para validação automática
- ✅ **100%** de conformidade com diretivas
- ✅ **0** violações de segurança

---

## 🔄 **INTEGRAÇÃO COM FLUXO DE DESENVOLVIMENTO**

### **Git Hooks:**
```bash
# Pre-commit hook
npm run pre-commit
```

### **CI/CD Pipeline:**
```yaml
# .github/workflows/validate.yml
- name: Validar Diretivas Críticas
  run: npm run validate-directives
```

### **IDE Integration:**
```json
// .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "typescript.preferences.includePackageJsonAutoImports": "on"
}
```

---

## 📚 **RECURSOS ADICIONAIS**

### **Documentação Completa:**
- [Diretivas Detalhadas](./diretivas-pensamento-critico.md)
- [Sistema de Validação](../systems/sistema-garantia-diretivas-implementado.md)
- [Guia de Testes](../development/guia-testes-completo.md)

### **Ferramentas de Apoio:**
- `npm run validate-directives` - Validação automática
- `npm run check-diretivas` - Verificação manual
- `npm run garantia-diretivas` - Garantia de qualidade

### **Suporte:**
- 📧 Equipe de desenvolvimento
- 📖 Documentação técnica
- 🧪 Ambiente de testes

---

**🎯 LEMBRE-SE: As diretivas críticas não são burocracia, são garantia de qualidade e confiabilidade do sistema DOM v2.** 