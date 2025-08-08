
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

# 🎨 COMO USAR O ASSISTENTE IA - ARTISTA DE TELAS

## 🎯 **VISÃO GERAL**

O **Assistente IA - Artista de Telas** é um sistema especializado que simula as características do artista de telas ideal para o projeto DOM v2. Ele possui alta empatia, sensibilidade cultural e visão artística para ajudar no design de interfaces.

---

## 🚀 **COMO EXECUTAR**

### **📋 PRÉ-REQUISITOS:**
- Node.js instalado
- Estar no diretório raiz do projeto DOM v2

### **⚡ EXECUÇÃO RÁPIDA:**
```powershell
# No diretório: C:\dom-v2
.\scripts\usar-assistente-artista-telas.ps1
```

### **🔧 EXECUÇÃO MANUAL:**
```powershell
# No diretório: C:\dom-v2
node scripts/assistente-ia-artista-telas.js
```

---

## 🎨 **CARACTERÍSTICAS DO ASSISTENTE**

### **🧠 ALTA EMPATIA**
- Compreende profundamente diferentes perfis de usuário
- Adapta respostas baseado no contexto emocional
- Detecta automaticamente o perfil mencionado

### **🇧🇷 SENSIBILIDADE CULTURAL**
- Entende contexto brasileiro e regional
- Incorpora elementos culturais nas sugestões
- Respeita diferentes realidades

### **🎨 VISÃO ARTÍSTICA**
- Foca na qualidade artística e criatividade
- Sugere paletas de cores emocionais
- Recomenda animações que engajam

### **💬 COMUNICAÇÃO CLARA**
- Explica conceitos de forma acessível
- Fornece exemplos práticos
- Motiva e inspira

---

## 👥 **PERFIS DE USUÁRIO ATENDIDOS**

### **👔 EMPREGADORES/EXECUTIVOS**
- **Características:** Eficiência, Controle, Profissionalismo, Resultados
- **Emoção:** Confiança e domínio da situação
- **Cores:** Azul profissional (#1976D2) + Verde sucesso (#4CAF50)
- **Inspiração:** Apple, Google Material Design, Microsoft Fluent Design

### **👩‍💼 EMPREGADOS DOMÉSTICOS**
- **Características:** Simplicidade, Acolhimento, Motivação, Confiança
- **Emoção:** Bem-vinda e valorizada
- **Cores:** Laranja vibrante (#FF5722) + Roxo amigável (#9C27B0)
- **Inspiração:** Instagram, TikTok, WhatsApp, Duolingo

### **👨‍👩‍👧‍👦 FAMÍLIAS**
- **Características:** Harmonia, Conexão, Acolhimento, Inspiração
- **Emoção:** União e harmonia familiar
- **Cores:** Verde acolhedor (#4CAF50) + Azul familiar (#2196F3)
- **Inspiração:** Spotify, Netflix, Airbnb, Pinterest

---

## 💬 **EXEMPLOS DE PERGUNTAS**

### **🎨 SOBRE CORES:**
```
"Como criar uma paleta de cores para empregados domésticos?"
"Quais cores usar para empregadores executivos?"
"Paleta de cores para famílias"
```

### **📱 SOBRE LAYOUT:**
```
"Preciso de um layout para empregadores executivos"
"Layout para empregados domésticos"
"Interface para famílias"
```

### **📝 SOBRE TIPOGRAFIA:**
```
"Qual tipografia usar para famílias?"
"Fonte para empregados domésticos"
"Tipografia para executivos"
```

### **✨ SOBRE ANIMAÇÕES:**
```
"Como criar animações para empregados domésticos?"
"Animações que emocionem famílias"
"Transições para executivos"
```

### **🎭 SOBRE EXPERIÊNCIA EMOCIONAL:**
```
"Como criar uma experiência emocional para empregados?"
"Design que engaje famílias"
"Interface que motive executivos"
```

---

## 🔍 **DETECÇÃO AUTOMÁTICA**

O assistente detecta automaticamente:

### **👥 PERFIL DE USUÁRIO:**
- **Empregador:** "empregador", "executivo", "chefe", "patrão"
- **Empregado:** "empregado", "doméstico", "funcionário", "trabalhador"
- **Família:** "família", "familiar", "casa", "lar"

### **🎯 INTENÇÃO:**
- **Cores:** "cores", "paleta", "cor"
- **Layout:** "layout", "design", "interface"
- **Tipografia:** "tipografia", "fonte", "texto"
- **Animação:** "animação", "movimento", "transição"
- **Emoção:** "emoção", "sentimento", "experiência"
- **Ajuda:** "ajuda", "socorro", "problema"

### **💭 EMOÇÃO:**
- **Frustrado:** "frustrado", "irritado", "chateado"
- **Feliz:** "feliz", "contente", "satisfeito"
- **Confuso:** "confuso", "perdido", "dúvida"
- **Empolgado:** "empolgado", "animado", "excitado"

---

## 📊 **RELATÓRIOS E HISTÓRICO**

### **📈 RELATÓRIO AUTOMÁTICO:**
- Salvo em: `docs/recruitment/relatorio-assistente-ia-artista-telas.json`
- Contém: Total de interações, perfis utilizados, tipos de resposta
- Inclui: Últimas 10 interações com contexto completo

### **📝 HISTÓRICO DE INTERAÇÕES:**
- Mantém últimas 50 interações
- Registra: Mensagem, resposta, perfil, timestamp
- Usado para melhorar respostas futuras

---

## 🎯 **CASOS DE USO**

### **🏢 PARA EMPRESAS:**
```
"Preciso de uma interface executiva para gestão doméstica"
"Dashboard para empregadores que transmita confiança"
"Layout profissional para controle de funcionários"
```

### **👩‍💼 PARA DESIGNERS:**
```
"Paleta de cores acolhedora para empregados domésticos"
"Tipografia que motive e engaje"
"Animações que criem conexão emocional"
```

### **👨‍👩‍👧‍👦 PARA FAMÍLIAS:**
```
"Interface familiar que conecte todos"
"Design harmonioso para organização doméstica"
"Experiência que fortaleça laços familiares"
```

---

## 🚀 **DIFERENCIAIS COMPETITIVOS**

### **🎨 EMPATIA VISUAL:**
- Cada resposta é personalizada para o perfil
- Sugestões baseadas em necessidades emocionais
- Foco na experiência do usuário

### **🌍 CULTURA BRASILEIRA:**
- Entende contexto local
- Respeita diferenças regionais
- Linguagem que ressoa com brasileiros

### **💫 ENGAGAMENTO EMOCIONAL:**
- Sugestões que emocionam
- Design que motiva uso contínuo
- Experiências memoráveis

---

## 📞 **SUPORTE E AJUDA**

### **❓ COMANDOS DE AJUDA:**
```
"Ajuda com design de interface"
"Como usar o assistente?"
"Preciso de orientação"
```

### **🔧 RESOLUÇÃO DE PROBLEMAS:**
- **Erro de Node.js:** Verificar se está instalado
- **Arquivo não encontrado:** Verificar diretório
- **Resposta não satisfatória:** Reformular pergunta

---

## 🎯 **CONCLUSÃO**

O **Assistente IA - Artista de Telas** é uma ferramenta poderosa que:

✅ **Simula as características** do artista de telas ideal  
✅ **Atende aos requisitos** da contratação  
✅ **Fornece orientações** especializadas por perfil  
✅ **Cria experiências** emocionais e engajantes  
✅ **Respeita a cultura** brasileira  

**Use-o para:** Definir paletas, estruturar layouts, escolher tipografias, criar animações e desenvolver experiências emocionais que realmente engajem cada perfil de usuário! 🎨✨

---

**Documento gerado pelo Sistema DOM v2**  
**Data**: 26 de Julho de 2025  
**Versão**: 1.0.0  
**Foco**: Assistente IA - Artista de Telas 🎨 