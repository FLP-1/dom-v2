
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
 * @fileoverview contexto-rapido-novo-chat
 * @description Funcionalidade principal
 * @version 1.0.0
 * @author DOM v2 Team
 * @since 2025-07-26
 */

# Contexto Rápido - DOM v2 - Novo Chat

## 🎯 **RESUMO EXECUTIVO**

**Projeto:** DOM v2 - Sistema empresarial brasileiro  
**Status:** ✅ **100% OPERACIONAL**  
**Foco:** Expansão da biblioteca de componentes e funcionalidades brasileiras  
**Estratégia:** Simplicidade extrema e foco no mercado brasileiro  

---

## 🚀 **STATUS ATUAL**

### **✅ SISTEMA FUNCIONANDO:**
- **Backend:** Node.js + Express + TypeScript + Prisma + PostgreSQL
- **Frontend Web:** React Native Web (localhost:3000)
- **Frontend Mobile:** React Native
- **CI/CD Pipeline:** Corrigido e funcionando
- **Banco de Dados:** PostgreSQL configurado e populado
- **Micro-frontends:** Budget, Payroll, Tasks operacionais

### **✅ INFRAESTRUTURA RESOLVIDA:**
- Dependências instaladas e compatíveis
- Scripts de execução funcionais
- Metro Bundler configurado
- Conflitos React Native Web resolvidos

---

## 🎯 **PRÓXIMOS PASSOS PRIORITÁRIOS**

### **1. EXPANDIR BIBLIOTECA DE COMPONENTES**
```typescript
// Componentes Prioritários
interface PriorityComponents {
  table: 'TableComponent';           // Tabelas de dados
  chart: 'ChartComponent';           // Gráficos e relatórios
  modal: 'ModalComponent';           // Modais
  cpfCnpj: 'CPFCNPJInput';           // Input brasileiro
}
```

### **2. ELIMINAR VALORES HARDCODED**
- URLs e endpoints
- Configurações de negócio
- Cores e temas

### **3. FUNCIONALIDADES BRASILEIRAS BÁSICAS**
- Trabalhista (carteira, férias, 13º)
- Fiscal (CPF/CNPJ, CEP)
- Relatórios (RAIS, CAGED)

---

## 🛠️ **COMANDOS ESSENCIAIS**

### **📋 INICIAR SISTEMA:**
```powershell
cd C:\dom-v2
.\run-dom-v2.ps1
```

### **📋 VERIFICAR SERVIÇOS:**
- Backend: http://localhost:3001
- Frontend Web: http://localhost:3000
- Metro: http://localhost:8081

### **📋 ESTRUTURA IMPORTANTE:**
```
dom-v2/
├── backend/          # APIs e banco
├── frontend/         # Interface
├── docs/            # Documentação
└── scripts/         # Automação
```

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

## 📋 **PRIMEIRA AÇÃO RECOMENDADA**

**Implementar TableComponent:**
```typescript
// Localização: frontend/src/components/ui/TableComponent.tsx
interface TableComponentProps {
  data: any[];
  columns: string[];
  onRowClick?: (row: any) => void;
}

export const TableComponent: React.FC<TableComponentProps> = ({ data, columns, onRowClick }) => {
  // Implementação simples e funcional
};
```

**Justificativa:** Base para todas as outras funcionalidades e impacto imediato na produtividade.

---

## 📞 **DOCUMENTAÇÃO DISPONÍVEL**

### **📁 ARQUIVOS IMPORTANTES:**
- `status-atual-novo-chat.md` - Status completo
- `instrucoes-novo-chat.md` - Instruções detalhadas
- `comando-inicial-novo-chat.md` - Comando para novo chat
- `docs/` - Documentação técnica completa

### **📁 ESTRUTURA DO PROJETO:**
- `backend/src/` - Código do backend
- `frontend/src/` - Código do frontend
- `backend/prisma/` - Schema e migrações
- `docs/` - Documentação técnica

---

**Autor:** DOM Team v2  
**Data:** 23 de Julho de 2025  
**Versão:** 2.0.0  
**Status:** ✅ Pronto para Continuidade 