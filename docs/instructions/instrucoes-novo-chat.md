
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

# Instruções para Novo Chat - DOM v2

## 🎯 **CONTEXTO RÁPIDO**

**Projeto:** DOM v2 - Sistema empresarial brasileiro  
**Status:** ✅ Sistema funcional e estável  
**Foco:** Expansão da biblioteca de componentes e funcionalidades brasileiras  
**Estratégia:** Simplicidade extrema e foco no mercado brasileiro  

---

## 🚀 **COMANDOS PARA INICIAR**

### **📋 1. VERIFICAR STATUS ATUAL:**
```powershell
# Diretório: C:\dom-v2
cd C:\dom-v2

# Verificar se o sistema está rodando
Get-Process | Where-Object {$_.ProcessName -like "*node*"}
```

### **📋 2. INICIAR SISTEMA COMPLETO:**
```powershell
# Executar sistema completo
.\run-dom-v2.ps1
```

### **📋 3. VERIFICAR SERVIÇOS:**
- **Backend:** http://localhost:3001
- **Frontend Web:** http://localhost:3000
- **Metro Bundler:** http://localhost:8081

---

## 📊 **STATUS ATUAL DO PROJETO**

### **✅ FUNCIONANDO:**
- Backend (Node.js + Express + TypeScript + Prisma + PostgreSQL)
- Frontend Web (React Native Web)
- Frontend Mobile (React Native)
- CI/CD Pipeline
- Banco de Dados
- Micro-frontends (Budget, Payroll, Tasks)

### **🎯 PRÓXIMOS PASSOS PRIORITÁRIOS:**
1. **Expandir Biblioteca de Componentes**
2. **Eliminar Valores Hardcoded**
3. **Implementar Funcionalidades Brasileiras Básicas**

---

## 🛠️ **ESTRUTURA DO PROJETO**

### **📁 DIRETÓRIOS PRINCIPAIS:**
```
dom-v2/
├── backend/          # Node.js + Express + Prisma
├── frontend/         # React Native + React Native Web
├── docs/            # Documentação completa
├── scripts/         # Scripts de automação
└── logs/            # Logs do sistema
```

### **📁 ARQUIVOS IMPORTANTES:**
- `status-atual-novo-chat.md` - Status completo do projeto
- `run-dom-v2.ps1` - Script de execução principal
- `setup-database.ps1` - Configuração do banco
- `docs/` - Toda documentação técnica

---

## 🎯 **PRÓXIMO PASSO IMEDIATO**

### **📋 EXPANDIR BIBLIOTECA DE COMPONENTES:**

#### **Componentes Prioritários:**
1. **TableComponent** - Para exibição de dados
2. **ChartComponent** - Para gráficos e relatórios
3. **ModalComponent** - Para interações
4. **CPFCNPJInput** - Para formulários brasileiros

#### **Localização:**
```
frontend/src/components/ui/
```

#### **Estrutura Recomendada:**
```typescript
// Exemplo de componente
interface TableComponentProps {
  data: any[];
  columns: string[];
  onRowClick?: (row: any) => void;
}

export const TableComponent: React.FC<TableComponentProps> = ({ data, columns, onRowClick }) => {
  // Implementação
};
```

---

## 📋 **CHECKLIST DE VERIFICAÇÃO**

### **✅ ANTES DE COMEÇAR:**
- [ ] Sistema está rodando (backend + frontend)
- [ ] Banco de dados conectado
- [ ] Dependências instaladas
- [ ] Documentação lida

### **✅ AO IMPLEMENTAR:**
- [ ] Seguir padrões existentes
- [ ] Manter simplicidade extrema
- [ ] Testar funcionalidade
- [ ] Documentar mudanças

### **✅ AO FINALIZAR:**
- [ ] Testes funcionais
- [ ] Performance adequada
- [ ] Código limpo
- [ ] Documentação atualizada

---

## 🎯 **ESTRATÉGIA DE DESENVOLVIMENTO**

### **✅ PRINCÍPIOS:**
1. **Simplicidade Extrema** - Não adicionar complexidade desnecessária
2. **Foco no Brasil** - Diferencial competitivo claro
3. **Implementação Gradual** - Uma melhoria por vez
4. **Validação Contínua** - Testar cada mudança

### **❌ EVITAR:**
1. **Arquitetura complexa** - Sistema atual funciona
2. **Cache complexo** - Prematuro para o volume atual
3. **Lazy loading complexo** - Desnecessário agora
4. **Over-engineering** - Manter simplicidade

---

## 📊 **MÉTRICAS DE SUCESSO**

### **🎯 TÉCNICAS:**
- Performance: <2s carregamento
- Bundle Size: <500KB
- Test Coverage: >90%
- Build Time: <5 minutos

### **🎯 NEGÓCIO:**
- Funcionalidades brasileiras: 100% básicas
- Tempo de desenvolvimento: 50% redução
- Qualidade: 80% redução em bugs
- Satisfação: >90% usuários

---

## 🚨 **PROBLEMAS CONHECIDOS**

### **✅ RESOLVIDOS:**
- Conflito React Native Web
- CI/CD Pipeline
- Dependências incompatíveis
- Metro Bundler

### **⚠️ ATENÇÃO:**
- Manter simplicidade extrema
- Não adicionar complexidade desnecessária
- Focar no mercado brasileiro
- Implementar gradualmente

---

## 📞 **SUPORTE**

### **📋 DOCUMENTAÇÃO DISPONÍVEL:**
- `docs/` - Documentação técnica completa
- `status-atual-novo-chat.md` - Status atual
- `README.md` - Documentação principal

### **📋 COMANDOS DE EMERGÊNCIA:**
```powershell
# Parar todos os serviços
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process

# Reiniciar sistema
.\run-dom-v2.ps1
```

---

**Autor:** DOM Team v2  
**Data:** 23 de Julho de 2025  
**Versão:** 2.0.0  
**Status:** ✅ Pronto para Continuidade 