
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

# 🎨 Exemplo de Personalização - DOM v2
## Análise Crítica e Contextualizada do Sistema de Personalização

### 📋 ANÁLISE CRÍTICA
**Suposições:**
- A personalização é essencial para adoção do sistema
- Os 7 perfis de usuário são suficientes para cobrir o mercado
- A mudança dinâmica de perfil é uma funcionalidade desejada
- O sistema de temas é a melhor abordagem para personalização

**Alternativas consideradas:**
- Interface única para todos (risco de não atender necessidades específicas)
- Personalização baseada em machine learning (complexidade excessiva)
- Personalização manual por usuário (trabalho excessivo)
- Sistema de temas com perfis predefinidos (abordagem recomendada)

**Fontes e referências:**
- Estudos de UX sobre personalização de interfaces
- Documentação oficial do React Native
- Análise de apps similares no mercado
- Feedback de usuários sobre preferências de interface
- Pesquisa sobre comportamento digital por perfil

**Riscos identificados:**
- Sistema pode ficar complexo demais
- Performance pode ser afetada
- Manutenção pode ser trabalhosa
- Usuários podem se confundir com muitas opções

**Validação:**
- Teste de usabilidade com diferentes perfis
- Análise de performance com temas dinâmicos
- Feedback de desenvolvedores sobre complexidade
- Comparação com soluções similares no mercado

**Arquivo:** `docs/EXEMPLO_PERSONALIZACAO.md`
**Diretório:** `docs/`
**Descrição:** Exemplos práticos de uso do sistema de personalização
**Data de Criação:** 2024-12-19
**Última Alteração:** 2024-12-19
**Autor:** DOM Team

---

## 🚀 **Como Usar o Sistema de Personalização**

### **1. Configuração Básica**

```typescript
// App.tsx
import { ThemeProvider } from './src/utils/themeProvider';

function App() {
  return (
    <ThemeProvider initialProfileType="EMPLOYER">
      <YourApp />
    </ThemeProvider>
  );
}
```

### **2. Usando em Componentes**

```typescript
// DashboardScreen.tsx
import { useTheme, useStyles, ThemedView, ThemedText, ThemedButton } from '../utils/themeProvider';
import { MESSAGES } from '../utils/messages';

export function DashboardScreen() {
  const { profile } = useTheme();
  const styles = useStyles();
  
  // Mensagem personalizada por perfil
  const welcomeMessage = MESSAGES.PROFILE_ADAPTED[profile.type].welcome;
  
  return (
    <ThemedView>
      <ThemedText variant="xlarge">
        {welcomeMessage}
      </ThemedText>
      
      <div style={styles.layout.card}>
        <ThemedText variant="large">
          {MESSAGES.PROFILE_ADAPTED[profile.type].dashboard}
        </ThemedText>
        
        <ThemedButton 
          variant="primary" 
          onPress={() => console.log('Ação executada')}
        >
          {MESSAGES.PROFILE_ADAPTED[profile.type].quickActions}
        </ThemedButton>
      </div>
    </ThemedView>
  );
}
```

### **3. Mudança Dinâmica de Perfil**

```typescript
// ProfileSelector.tsx
import { useTheme } from '../utils/themeProvider';
import { UserProfileType } from '../utils/userProfiles';

export function ProfileSelector() {
  const { profile, updateProfile } = useTheme();
  
  const profiles: UserProfileType[] = [
    'EMPLOYER', 'EMPLOYEE', 'FAMILY', 'PARTNER', 
    'SUBORDINATE', 'ADMIN', 'OWNER'
  ];
  
  return (
    <div>
      <h3>Selecione seu perfil:</h3>
      {profiles.map((profileType) => (
        <button
          key={profileType}
          onClick={() => updateProfile(profileType)}
          style={{
            backgroundColor: profile.type === profileType ? '#007AFF' : '#F0F0F0',
            color: profile.type === profileType ? 'white' : 'black',
            padding: '10px 20px',
            margin: '5px',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          {profileType}
        </button>
      ))}
    </div>
  );
}
```

---

## 🎯 **Exemplos por Perfil**

### **Empregador (EMPLOYER)**
```typescript
// Interface: Clean, profissional, rápida
// Cores: Azul profissional (#1976D2), Verde sucesso (#4CAF50)
// Navegação: Poucos cliques, atalhos
// Tempo: Máximo 5 min por sessão

const employerConfig = {
  theme: {
    colors: {
      primary: '#1976D2',      // Azul profissional
      secondary: '#4CAF50',    // Verde sucesso
    },
    typography: {
      fontSize: { small: 12, medium: 14, large: 16, xlarge: 18 },
    },
    layout: {
      density: 'comfortable',
      navigation: 'shortcut',
    },
  },
  content: {
    language: 'STANDARD',
    detail: 'MINIMAL',
    help: 'BASIC',
  },
  notifications: {
    frequency: 'MINIMAL',
    detail: 'SUMMARY',
  },
};
```

### **Empregado Doméstico (EMPLOYEE)**
```typescript
// Interface: Simples, colorida, amigável
// Cores: Laranja vibrante (#FF5722), Roxo amigável (#9C27B0)
// Navegação: Linear, passo a passo
// Tempo: Pode usar durante trabalho

const employeeConfig = {
  theme: {
    colors: {
      primary: '#FF5722',      // Laranja vibrante
      secondary: '#9C27B0',    // Roxo amigável
    },
    typography: {
      fontSize: { small: 14, medium: 16, large: 18, xlarge: 20 },
    },
    layout: {
      density: 'spacious',
      navigation: 'linear',
    },
  },
  content: {
    language: 'SIMPLE',
    detail: 'STANDARD',
    help: 'EXTENSIVE',
  },
  notifications: {
    frequency: 'FREQUENT',
    type: 'BOTH',
  },
};
```

### **Familiar (FAMILY)**
```typescript
// Interface: Adaptável por idade
// Cores: Verde acolhedor (#4CAF50), Azul familiar (#2196F3)
// Navegação: Intuitiva, familiar
// Tempo: Flexível

const familyConfig = {
  theme: {
    colors: {
      primary: '#4CAF50',      // Verde acolhedor
      secondary: '#2196F3',    // Azul familiar
    },
    typography: {
      fontSize: { small: 13, medium: 15, large: 17, xlarge: 19 },
    },
    layout: {
      density: 'comfortable',
      navigation: 'hierarchical',
    },
  },
  content: {
    language: 'STANDARD',
    detail: 'STANDARD',
    help: 'BASIC',
  },
  notifications: {
    frequency: 'STANDARD',
    type: 'VISUAL',
  },
};
```

---

## 🎨 **Adaptação por Experiência Digital**

### **Básica (EMPLOYEE)**
```typescript
// Fontes maiores, ícones coloridos, mais ajuda
const basicAdjustments = {
  typography: { 
    fontSize: { small: 14, medium: 16, large: 18, xlarge: 20 } 
  },
  icons: { 
    size: { small: 20, medium: 28, large: 36 } 
  },
  content: { 
    help: 'EXTENSIVE' 
  },
};
```

### **Intermediária (FAMILY)**
```typescript
// Fontes padrão, ícones normais, ajuda básica
const intermediateAdjustments = {
  typography: { 
    fontSize: { small: 12, medium: 14, large: 16, xlarge: 18 } 
  },
  icons: { 
    size: { small: 16, medium: 24, large: 32 } 
  },
  content: { 
    help: 'BASIC' 
  },
};
```

### **Avançada (EMPLOYER, PARTNER, ADMIN, OWNER)**
```typescript
// Fontes menores, ícones minimalistas, sem ajuda
const advancedAdjustments = {
  typography: { 
    fontSize: { small: 10, medium: 12, large: 14, xlarge: 16 } 
  },
  icons: { 
    size: { small: 12, medium: 16, large: 20 } 
  },
  content: { 
    help: 'NONE' 
  },
};
```

---

## 📱 **Adaptação por Dispositivo**

### **Mobile**
```typescript
// Touch-friendly, botões grandes, navegação simples
const mobileAdjustments = {
  typography: { 
    fontSize: { small: 14, medium: 16, large: 18, xlarge: 20 } 
  },
  icons: { 
    size: { small: 20, medium: 28, large: 36 } 
  },
  layout: { 
    density: 'spacious' 
  },
};
```

### **Tablet**
```typescript
// Híbrida, touch + mouse, funcionalidades completas
const tabletAdjustments = {
  typography: { 
    fontSize: { small: 12, medium: 14, large: 16, xlarge: 18 } 
  },
  icons: { 
    size: { small: 16, medium: 24, large: 32 } 
  },
  layout: { 
    density: 'comfortable' 
  },
};
```

### **Desktop**
```typescript
// Mouse-friendly, atalhos, funcionalidades avançadas
const desktopAdjustments = {
  typography: { 
    fontSize: { small: 10, medium: 12, large: 14, xlarge: 16 } 
  },
  icons: { 
    size: { small: 12, medium: 16, large: 20 } 
  },
  layout: { 
    density: 'compact' 
  },
};
```

---

## ⏰ **Adaptação por Tempo Disponível**

### **Limitado (EMPLOYER, PARTNER, OWNER)**
```typescript
// Navegação rápida, notificações resumidas, conteúdo mínimo
const limitedAdjustments = {
  layout: { 
    navigation: 'shortcut' 
  },
  notifications: { 
    frequency: 'MINIMAL', 
    detail: 'SUMMARY' 
  },
  content: { 
    detail: 'MINIMAL' 
  },
};
```

### **Flexível (FAMILY, SUBORDINATE)**
```typescript
// Navegação hierárquica, notificações padrão, conteúdo padrão
const flexibleAdjustments = {
  layout: { 
    navigation: 'hierarchical' 
  },
  notifications: { 
    frequency: 'STANDARD', 
    detail: 'STANDARD' 
  },
  content: { 
    detail: 'STANDARD' 
  },
};
```

### **Extensivo (EMPLOYEE, ADMIN)**
```typescript
// Navegação linear, notificações frequentes, conteúdo detalhado
const extensiveAdjustments = {
  layout: { 
    navigation: 'linear' 
  },
  notifications: { 
    frequency: 'FREQUENT', 
    detail: 'DETAILED' 
  },
  content: { 
    detail: 'DETAILED' 
  },
};
```

---

## 🔧 **Implementação Avançada**

### **Hook Personalizado**
```typescript
// hooks/useProfileAdaptation.ts
import { useTheme } from '../utils/themeProvider';
import { MESSAGES } from '../utils/messages';

export function useProfileAdaptation() {
  const { profile, config } = useTheme();
  
  const getMessage = (key: string, fallback: string) => {
    return MESSAGES.PROFILE_ADAPTED[profile.type][key] || fallback;
  };
  
  const getStyle = (baseStyle: any) => {
    return {
      ...baseStyle,
      fontSize: config.theme.typography.fontSize.medium,
      color: config.theme.colors.text,
    };
  };
  
  const shouldShowHelp = () => {
    return config.content.help !== 'NONE';
  };
  
  const shouldShowDetailedContent = () => {
    return config.content.detail === 'DETAILED';
  };
  
  return {
    profile,
    config,
    getMessage,
    getStyle,
    shouldShowHelp,
    shouldShowDetailedContent,
  };
}
```

### **Componente Adaptativo**
```typescript
// components/AdaptiveCard.tsx
import { useProfileAdaptation } from '../hooks/useProfileAdaptation';

interface AdaptiveCardProps {
  title: string;
  content: string;
  showHelp?: boolean;
  showDetails?: boolean;
}

export function AdaptiveCard({ title, content, showHelp, showDetails }: AdaptiveCardProps) {
  const { getMessage, getStyle, shouldShowHelp, shouldShowDetailedContent } = useProfileAdaptation();
  
  const displayHelp = showHelp && shouldShowHelp();
  const displayDetails = showDetails && shouldShowDetailedContent();
  
  return (
    <div style={getStyle({ padding: '16px', border: '1px solid #ccc' })}>
      <h3>{getMessage(title, title)}</h3>
      <p>{content}</p>
      
      {displayHelp && (
        <div style={{ backgroundColor: '#f0f0f0', padding: '8px', marginTop: '8px' }}>
          <small>💡 Dica: {getMessage('help', 'Clique para mais informações')}</small>
        </div>
      )}
      
      {displayDetails && (
        <div style={{ marginTop: '8px' }}>
          <details>
            <summary>Ver detalhes</summary>
            <p>Informações detalhadas aqui...</p>
          </details>
        </div>
      )}
    </div>
  );
}
```

---

## 📊 **Métricas de Sucesso**

### **Por Perfil**
- **Tempo de conclusão** de tarefas
- **Taxa de erro** na navegação
- **Satisfação** com interface
- **Frequência** de uso
- **Retenção** de usuários

### **Por Personalização**
- **Redução** de tempo de uso
- **Aumento** de satisfação
- **Diminuição** de suporte
- **Melhoria** de produtividade
- **Aumento** de engajamento

---

**Nota:** Este sistema de personalização é flexível e pode ser expandido conforme necessário. Mantenha sempre o foco na simplicidade e na experiência do usuário. 

## ⚠️ **LIMITAÇÕES E CONSIDERAÇÕES**

### **Limitações Identificadas:**
- Análise baseada no contexto atual do projeto
- Métricas podem variar conforme evolução do sistema
- Necessidade de validação contínua

### **Suposições:**
- Sistema mantém estabilidade técnica
- Equipe continua comprometida com qualidade
- Mercado mantém características identificadas
