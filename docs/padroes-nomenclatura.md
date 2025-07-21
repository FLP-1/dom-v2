# 📝 PADRÕES DE NOMENCLATURA - DOM v2
## Regras Rígidas para Nomenclatura de Código e Arquivos

### 🎯 **PRINCÍPIO FUNDAMENTAL**
**NUNCA usar acentos, caracteres especiais ou nomenclatura em português. SEMPRE usar inglês e ASCII.**

---

## 🚨 **REGRAS OBRIGATÓRIAS**

### **1. PROIBIÇÃO ABSOLUTA**
```bash
# NUNCA fazer:
❌ function validaçãoUsuário() {}
❌ const dadosUsuário = {}
❌ class ValidaçãoDocumentação {}
❌ interface DadosUsuário {}
❌ arquivo validação-segurança.js
❌ pasta validações/
❌ const CONFIGURAÇÃO_GERAL = {}
❌ npm run validação-rápida
```

### **2. OBRIGAÇÃO ABSOLUTA**
```bash
# SEMPRE fazer:
✅ function validateUser() {}
✅ const userData = {}
✅ class DocumentValidation {}
✅ interface UserData {}
✅ arquivo validate-security.js
✅ pasta validations/
✅ const GENERAL_CONFIG = {}
✅ npm run quick-validate
```

---

## 📋 **PADRÕES DE NOMENCLATURA**

### **1. Variáveis e Funções (camelCase)**
```javascript
// ✅ CORRETO
const userName = 'john_doe';
const userEmail = 'john@example.com';
const isUserActive = true;
const getUserData = () => {};
const validateUserInput = () => {};
const calculateTotalPrice = () => {};

// ❌ INCORRETO
const nomeUsuário = 'john_doe';
const emailUsuário = 'john@example.com';
const usuárioAtivo = true;
const obterDadosUsuário = () => {};
const validarEntradaUsuário = () => {};
const calcularPreçoTotal = () => {};
```

### **2. Classes e Interfaces (PascalCase)**
```javascript
// ✅ CORRETO
class UserValidation {}
class DocumentProcessor {}
class SecurityManager {}
interface UserData {}
interface ValidationResult {}
interface ProcessConfig {}

// ❌ INCORRETO
class validaçãoUsuário {}
class processadorDocumento {}
class gerenciadorSegurança {}
interface dadosUsuário {}
interface resultadoValidação {}
interface configuraçãoProcesso {}
```

### **3. Constantes (UPPER_SNAKE_CASE)**
```javascript
// ✅ CORRETO
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT = 5000;
const API_BASE_URL = 'https://api.example.com';
const VALIDATION_RULES = {};

// ❌ INCORRETO
const tentativasMáximas = 3;
const timeoutPadrão = 5000;
const urlBaseApi = 'https://api.example.com';
const regrasValidação = {};
```

### **4. Nomes de Arquivos (kebab-case)**
```bash
# ✅ CORRETO
validate-user.js
user-authentication.js
document-processor.js
security-manager.js
validation-rules.js
api-endpoints.js

# ❌ INCORRETO
validação-usuário.js
autenticação-usuário.js
processador-documento.js
gerenciador-segurança.js
regras-validação.js
endpoints-api.js
```

### **5. Pastas e Diretórios (kebab-case)**
```bash
# ✅ CORRETO
src/
├── components/
├── validations/
├── user-management/
├── security-checks/
├── api-endpoints/
└── utils/

# ❌ INCORRETO
src/
├── componentes/
├── validações/
├── gerenciamento-usuário/
├── verificações-segurança/
├── endpoints-api/
└── utilitários/
```

### **6. Comandos npm (lowercase)**
```json
{
  "scripts": {
    "validate-user": "node scripts/validate-user.js",
    "quick-check": "node scripts/quick-check.js",
    "security-scan": "node scripts/security-scan.js",
    "performance-test": "node scripts/performance-test.js"
  }
}
```

---

## 🔧 **EXEMPLOS PRÁTICOS**

### **Exemplo 1: Validação de Usuário**
```javascript
// ✅ CORRETO
class UserValidator {
  constructor() {
    this.validationRules = {
      minLength: 3,
      maxLength: 50,
      allowedChars: /^[a-zA-Z0-9_]+$/
    };
  }

  validateUserInput(userData) {
    const validationResult = {
      isValid: true,
      errors: []
    };

    if (!this.isValidUsername(userData.username)) {
      validationResult.errors.push('Invalid username format');
      validationResult.isValid = false;
    }

    return validationResult;
  }

  isValidUsername(username) {
    return this.validationRules.allowedChars.test(username) &&
           username.length >= this.validationRules.minLength &&
           username.length <= this.validationRules.maxLength;
  }
}

// ❌ INCORRETO
class ValidadorUsuário {
  constructor() {
    this.regrasValidação = {
      comprimentoMínimo: 3,
      comprimentoMáximo: 50,
      caracteresPermitidos: /^[a-zA-Z0-9_]+$/
    };
  }

  validarEntradaUsuário(dadosUsuário) {
    const resultadoValidação = {
      éVálido: true,
      erros: []
    };

    if (!this.éNomeUsuárioVálido(dadosUsuário.nomeUsuário)) {
      resultadoValidação.erros.push('Formato de nome de usuário inválido');
      resultadoValidação.éVálido = false;
    }

    return resultadoValidação;
  }

  éNomeUsuárioVálido(nomeUsuário) {
    return this.regrasValidação.caracteresPermitidos.test(nomeUsuário) &&
           nomeUsuário.length >= this.regrasValidação.comprimentoMínimo &&
           nomeUsuário.length <= this.regrasValidação.comprimentoMáximo;
  }
}
```

### **Exemplo 2: Estrutura de Arquivos**
```bash
# ✅ CORRETO
src/
├── components/
│   ├── user-profile.tsx
│   ├── validation-form.tsx
│   └── security-check.tsx
├── services/
│   ├── user-service.ts
│   ├── validation-service.ts
│   └── security-service.ts
├── utils/
│   ├── validation-helpers.ts
│   ├── security-utils.ts
│   └── format-helpers.ts
└── types/
    ├── user-types.ts
    ├── validation-types.ts
    └── security-types.ts

# ❌ INCORRETO
src/
├── componentes/
│   ├── perfil-usuário.tsx
│   ├── formulário-validação.tsx
│   └── verificação-segurança.tsx
├── serviços/
│   ├── serviço-usuário.ts
│   ├── serviço-validação.ts
│   └── serviço-segurança.ts
├── utilitários/
│   ├── ajudantes-validação.ts
│   ├── utilitários-segurança.ts
│   └── ajudantes-formatação.ts
└── tipos/
    ├── tipos-usuário.ts
    ├── tipos-validação.ts
    └── tipos-segurança.ts
```

---

## 🚨 **SINAIS DE ALERTA**

### **Se encontrar no código:**
- ❌ **Acentos** em nomes de variáveis/funções
- ❌ **Caracteres especiais** (ç, ã, õ, etc.)
- ❌ **Nomes em português** em código
- ❌ **Arquivos com acentos** no nome
- ❌ **Pastas com caracteres especiais**

### **Ação imediata:**
1. **PARAR** o desenvolvimento
2. **RENOMEAR** imediatamente
3. **ATUALIZAR** todas as referências
4. **TESTAR** se tudo ainda funciona
5. **COMMIT** das correções
6. **DOCUMENTAR** a correção

---

## 📊 **CHECKLIST DE VALIDAÇÃO**

### **Antes de cada commit:**
- [ ] **Nomes de variáveis** em inglês e sem acentos?
- [ ] **Nomes de funções** em inglês e sem acentos?
- [ ] **Nomes de classes** em inglês e sem acentos?
- [ ] **Nomes de arquivos** em kebab-case e sem acentos?
- [ ] **Nomes de pastas** em kebab-case e sem acentos?
- [ ] **Comandos npm** em lowercase e sem acentos?
- [ ] **Constantes** em UPPER_SNAKE_CASE e sem acentos?

### **Antes de criar novo arquivo:**
- [ ] **Nome do arquivo** segue kebab-case?
- [ ] **Nome do arquivo** sem acentos?
- [ ] **Nome do arquivo** em inglês?
- [ ] **Extensão** correta (.js, .ts, .tsx)?

### **Antes de criar nova função:**
- [ ] **Nome da função** em camelCase?
- [ ] **Nome da função** em inglês?
- [ ] **Nome da função** sem acentos?
- [ ] **Parâmetros** seguem as mesmas regras?

---

## 🔄 **PROCESSO DE CORREÇÃO**

### **1. Identificar Problemas**
```bash
# Usar ferramentas de busca
grep -r "validação\|usuário\|segurança" src/
find . -name "*validação*" -o -name "*usuário*"
```

### **2. Renomear Sistematicamente**
```bash
# Exemplo de correção
# ANTES: validação-usuário.js
# DEPOIS: user-validation.js

# ANTES: function validarUsuário() {}
# DEPOIS: function validateUser() {}
```

### **3. Atualizar Referências**
```bash
# Atualizar imports
# Atualizar require statements
# Atualizar documentação
# Atualizar testes
```

### **4. Testar Completamente**
```bash
# Executar todos os testes
# Verificar se tudo funciona
# Validar build
# Testar deploy
```

---

## 📚 **GLOSSÁRIO DE TRADUÇÕES**

### **Termos Comuns:**
| Português | Inglês |
|-----------|--------|
| validação | validation |
| usuário | user |
| autenticação | authentication |
| autorização | authorization |
| segurança | security |
| documento | document |
| configuração | configuration |
| processamento | processing |
| verificação | verification |
| gerenciamento | management |
| utilitário | utility |
| ajudante | helper |
| serviço | service |
| componente | component |
| interface | interface |
| tipo | type |
| constante | constant |
| variável | variable |
| função | function |
| classe | class |

---

## 🎯 **OBJETIVO**

**Garantir que todo o código do projeto DOM v2 siga padrões internacionais de nomenclatura, facilitando manutenção, colaboração e escalabilidade.**

---

**Lembre-se:** Estas regras são **OBRIGATÓRIAS** e **NÃO NEGOCIÁVEIS**. Elas existem para garantir qualidade profissional e compatibilidade internacional. 

## ⚠️ **LIMITAÇÕES E CONSIDERAÇÕES**

### **Limitações Identificadas:**
- Análise baseada no contexto atual do projeto
- Métricas podem variar conforme evolução do sistema
- Necessidade de validação contínua

### **Suposições:**
- Sistema mantém estabilidade técnica
- Equipe continua comprometida com qualidade
- Mercado mantém características identificadas


## 🔄 **MÚLTIPLAS PERSPECTIVAS**

### **Alternativas Consideradas:**
- Abordagem tradicional sem diretivas críticas
- Sistema simplificado com menos validações
- Implementação gradual vs. completa

### **Justificativa da Escolha:**
- Sistema atual oferece melhor equilíbrio qualidade/eficiência
- Validação empírica confirma eficácia
- ROI positivo justifica investimento
