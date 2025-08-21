
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

# 🏗️ Framework de Decisão Arquitetural - DOM v2

## 📋 VISÃO GERAL

Este framework **OBRIGATÓRIO** deve ser seguido por **TODOS** os desenvolvedores (humanos e IAs) antes de qualquer implementação no DOM v2.

### 🎯 OBJETIVO
Garantir que **100%** das implementações sigam as diretrizes do projeto desde o primeiro commit, eliminando retrabalho e mantendo qualidade arquitetural.

---

## 🔄 PROCESSO OBRIGATÓRIO

### **ANTES DE QUALQUER IMPLEMENTAÇÃO:**

#### **1. 📚 CONSULTA OBRIGATÓRIA (5 min)**
```bash
# Verificar memórias e diretrizes
- Consultar memórias do projeto
- Revisar diretrizes específicas
- Identificar padrões arquiteturais existentes
```

#### **2. 🏗️ AVALIAÇÃO ARQUITETURAL (3 min)**
```typescript
interface AvaliacaoArquitetural {
  reutilizacao: boolean;      // Pode ser reutilizado?
  separacao: boolean;         // Responsabilidades bem definidas?
  testabilidade: boolean;     // Posso testar isoladamente?
  manutencao: boolean;        // Mudanças futuras serão fáceis?
}
```

#### **3. 🚨 CHECKPOINT DE CONFLITO**
```typescript
if (soluçãoProposta.conflitaCom(diretrizes)) {
  // ❌ PARE! NÃO IMPLEMENTE
  alertarUsuário("Conflito técnico identificado!");
  apresentarAlternativas();
  aguardarAprovacao();
  return; // NÃO implementar até resolver
}
```

#### **4. ✅ IMPLEMENTAÇÃO CONSCIENTE**
- Solução **já alinhada** com todas as diretrizes
- **Documentação** do porquê das escolhas
- **Previsão** de impactos futuros

---

## 🎯 PADRÕES ARQUITETURAIS OBRIGATÓRIOS

### **📱 PADRÃO: TELA FUNCIONAL**
```typescript
// ✅ CORRETO - Tela limpa usando hook customizado
const MinhaScreen: React.FC = () => {
  const { data, loading, error, reload } = useMinhaData();
  
  if (loading) return <Loading />;
  
  return <UI data={data} onAction={reload} />;
};
```

```typescript
// ❌ PROIBIDO - Lógica de API na tela
const MinhaScreen: React.FC = () => {
  const [data, setData] = useState([]);
  const API_BASE_URL = 'http://...'; // ❌ VIOLAÇÃO!
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/data`) // ❌ VIOLAÇÃO!
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <UI data={data} />;
};
```

### **🔧 PADRÃO: HOOK CUSTOMIZADO**
```typescript
// ✅ CORRETO - Hook com apiService
export const useMinhaData = () => {
  const [state, setState] = useState(initialState);
  
  const loadData = useCallback(async () => {
    try {
      const data = await apiService.getMinhaData(); // ✅ CENTRALIZADO
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: MOCK_DATA, loading: false, error: 'Fallback' });
    }
  }, []);
  
  return { ...state, reload: loadData };
};
```

### **🌐 PADRÃO: API SERVICE**
```typescript
// ✅ CORRETO - Método no apiService centralizado
class ApiService {
  async getMinhaData(): Promise<MinhaData[]> {
    return this.request<MinhaData[]>('/minha-data');
  }
}
```

---

## 🚨 VALIDAÇÃO AUTOMÁTICA

### **PRÉ-COMMIT HOOKS**
```bash
# Adicionado automaticamente ao package.json
"husky": {
  "hooks": {
    "pre-commit": "npm run validate-architecture"
  }
}
```

### **CI/CD PIPELINE**
```yaml
# .github/workflows/architecture-validation.yml
- name: Validate Architecture
  run: |
    npm run validate-architecture
    if [ $? -ne 0 ]; then
      echo "❌ Arquitetura inválida! Revise o Framework."
      exit 1
    fi
```

### **COMANDOS DE VALIDAÇÃO**
```bash
# Validar arquitetura antes do commit
npm run validate-architecture

# Validar arquivo específico
npm run validate-architecture -- --file src/screens/MinhaScreen.tsx

# Gerar relatório completo
npm run validate-architecture -- --report
```

---

## 📊 MÉTRICAS DE CONFORMIDADE

### **DASHBOARD DE QUALIDADE**
```typescript
interface MetricasConformidade {
  conformidade_geral: number;     // % de arquivos conformes
  violacoes_criticas: number;     // Bloqueantes
  violacoes_menores: number;      // Warnings
  tempo_medio_correcao: string;   // SLA para correções
}
```

### **ALERTAS AUTOMÁTICOS**
- 🚨 **Crítico**: Violação bloqueia merge
- ⚠️ **Warning**: Recomendação de melhoria
- 📊 **Métrica**: Acompanhamento de tendências

---

## 🎓 TREINAMENTO E ONBOARDING

### **PARA DESENVOLVEDORES HUMANOS**
1. **Leitura obrigatória** desta documentação
2. **Workshop prático** de 2h sobre o framework
3. **Mentoria** nas primeiras 3 implementações
4. **Certificação** antes de trabalhar sozinho

### **PARA IAs/ASSISTENTES**
1. **Memória permanente** com o framework
2. **Validação automática** em cada resposta
3. **Checkpoint obrigatório** antes de implementar
4. **Feedback loop** para melhoria contínua

---

## 🔧 FERRAMENTAS DE APOIO

### **EXTENSÕES VS CODE**
```json
{
  "recommendations": [
    "dom-v2.architecture-validator",
    "dom-v2.pattern-snippets",
    "dom-v2.decision-helper"
  ]
}
```

### **TEMPLATES AUTOMÁTICOS**
```bash
# Gerar nova tela seguindo o padrão
npm run generate:screen -- --name MinhaScreen

# Gerar novo hook seguindo o padrão  
npm run generate:hook -- --name useMinhaData

# Gerar novo service seguindo o padrão
npm run generate:service -- --name MinhaService
```

---

## 📈 PROCESSO DE MELHORIA CONTÍNUA

### **RETROSPECTIVAS MENSAIS**
- Análise de violações recorrentes
- Ajuste de regras conforme necessário
- Feedback da equipe sobre o framework

### **EVOLUÇÃO DO FRAMEWORK**
- Novas regras baseadas em problemas identificados
- Automação de validações manuais
- Melhoria das mensagens de erro

---

## ⚡ QUICK START

### **PARA DESENVOLVEDORES**
```bash
# 1. Instalar dependências de validação
npm install --save-dev husky glob

# 2. Configurar hooks
npm run setup-architecture-validation

# 3. Validar código existente
npm run validate-architecture

# 4. Implementar nova funcionalidade
npm run generate:screen -- --name MinhaScreen
```

### **PARA IAs**
```typescript
// 1. Consultar framework ANTES de implementar
const framework = await consultFrameworkDecisaoArquitetural();

// 2. Aplicar checkpoint obrigatório
if (temConflito(soluçãoProposta, framework)) {
  apresentarAlternativas();
  return; // NÃO implementar
}

// 3. Implementar com conformidade
implementarComConformidade(soluçãoAprovada);
```

---

## 🎯 COMPROMISSO DA EQUIPE

**TODOS** os membros da equipe (humanos e IAs) se comprometem a:

1. ✅ **Seguir** o framework em 100% das implementações
2. ✅ **Consultar** diretrizes ANTES de implementar
3. ✅ **Alertar** sobre conflitos técnicos
4. ✅ **Documentar** decisões arquiteturais
5. ✅ **Melhorar** continuamente o framework

---

> **"A qualidade não é um acidente. É sempre o resultado de um esforço inteligente."**
> 
> — John Ruskin

**Framework criado em:** Janeiro 2025  
**Última atualização:** Janeiro 2025  
**Status:** OBRIGATÓRIO para todos os desenvolvedores
