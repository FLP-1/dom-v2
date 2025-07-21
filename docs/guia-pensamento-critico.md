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
    "PostgreSQL é mais robusto que SQLite para produção",
    "Documentação oficial PostgreSQL vs SQLite",
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
    ['PostgreSQL', 'MySQL', 'SQLite'],
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
    alternatives: ['PostgreSQL', 'MySQL', 'SQLite'],
    assumptions: ['Produção crítica', 'Dados importantes'],
    logic: 'Teste de performance realizado',
    testCases: ['Carga alta', 'Concorrência'],
    contrapoints: ['MySQL é mais rápido', 'SQLite é mais simples']
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
