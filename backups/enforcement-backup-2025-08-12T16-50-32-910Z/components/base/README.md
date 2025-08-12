# Biblioteca de Componentes Base - DOM v2

## 🎯 Visão Geral

Esta biblioteca fornece componentes React Native reutilizáveis com foco em:
- **🔍 Acessibilidade**: Suporte completo a screen readers e navegação por teclado
- **📱 Responsividade**: Design mobile-first com breakpoints adaptativos  
- **⚡ Performance**: Otimizações automáticas e lazy loading
- **🎨 Consistência**: Sistema de design unificado
- **🔒 TypeScript**: Tipagem rigorosa para melhor DX

## 🧩 Componentes Disponíveis

### 📱 Layout e Estrutura
- **BaseScreen**: Wrapper base para todas as telas
- **BaseCard**: Cards com elevação e bordas personalizáveis
- **BaseModal**: Sistema de modais acessíveis com animações
- **BaseForm**: Formulários com validação automática

### 🔗 Navegação
- **BaseNavigation**: Sistema completo de navegação (horizontal, vertical, breadcrumb, sidebar)
- **BaseTabs**: Componente de abas com animações e edição

### 📝 Entrada de Dados
- **BaseButton**: Botões com variantes e estados
- **BaseInput**: Inputs avançados com validação, máscaras e formatação
- **BaseTable**: Tabelas responsivas, ordenáveis e virtualizadas

### 🎨 Interface
- **BaseIcon**: Sistema de ícones padronizado com 60+ ícones
- **IconWithBadge**: Ícones com badges numerados
- **IconButton**: Botões de ícone interativos

## 📖 Uso Básico

### 🔲 Componentes Básicos
```tsx
import { BaseButton, BaseCard, BaseIcon, useTheme } from '../components/base';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <BaseCard shadow="md" padding="lg">
      <BaseIcon name="home" size="lg" />
      <BaseButton
        title="Clique aqui"
        variant="solid"
        size="md"
        icon={<BaseIcon name="add" />}
        onPress={() => console.log('Pressionado')}
      />
    </BaseCard>
  );
};
```

### 📝 Formulários Avançados
```tsx
import { BaseInput, BaseModal, BaseButton } from '../components/base';

const FormExample = () => {
  const [visible, setVisible] = useState(false);
  
  return (
    <>
      <BaseInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        validation={{ required: true, email: true }}
        mask="email"
        clearable
      />
      
      <BaseModal
        visible={visible}
        onClose={() => setVisible(false)}
        title="Confirmar Ação"
      >
        <BaseButton title="Confirmar" />
      </BaseModal>
    </>
  );
};
```

### 🗂️ Tabelas e Navegação
```tsx
import { BaseTable, BaseNavigation, BaseTabs } from '../components/base';

const DataExample = () => {
  const columns = [
    { key: 'name', title: 'Nome', sortable: true },
    { key: 'age', title: 'Idade', align: 'center' },
  ];
  
  const navItems = [
    { key: 'home', label: 'Início', icon: <BaseIcon name="home" /> },
    { key: 'profile', label: 'Perfil', icon: <BaseIcon name="user" /> },
  ];
  
  return (
    <>
      <BaseNavigation items={navItems} mode="horizontal" />
      
      <BaseTabs
        items={[
          { key: 'tab1', label: 'Dados', children: <BaseTable data={data} columns={columns} /> },
          { key: 'tab2', label: 'Configurações', children: <SettingsPanel /> },
        ]}
      />
    </>
  );
};
```

## 🎨 Sistema de Temas Dinâmicos

O sistema de temas avançado oferece:
- **Múltiplos temas**: Claro, escuro, alto contraste, personalizado
- **Tema automático**: Segue configurações do sistema
- **Persistência**: Salva preferências do usuário
- **Transições suaves**: Animações entre mudanças de tema
- **Customização completa**: Editor visual de temas

### Configuração Básica

```tsx
import { ThemeProvider } from '../components/base';

const App = () => (
  <ThemeProvider enableSystemTheme={true}>
    <MyApp />
  </ThemeProvider>
);
```

### Usando Temas

```tsx
import { useThemeManager, ThemeSelector } from '../components/base';

const MyComponent = () => {
  const { currentTheme, setTheme, toggleTheme } = useThemeManager();
  
  return (
    <View style={{ backgroundColor: currentTheme.colors.background }}>
      <ThemeSelector showSystemOption={true} />
      <Button title="Alternar Tema" onPress={toggleTheme} />
    </View>
  );
};
```

### Temas Disponíveis

- **Light** (`light`): Tema claro padrão
- **Dark** (`dark`): Tema escuro para economia de bateria
- **High Contrast** (`highContrast`): Alto contraste para acessibilidade
- **Custom** (`custom`): Tema personalizado pelo usuário

### Customização Avançada

```tsx
import { ThemeCustomizer, createCustomTheme } from '../components/base';

const CustomThemeScreen = () => {
  return (
    <ThemeCustomizer
      onSave={(theme) => console.log('Tema salvo:', theme)}
      baseTheme={lightTheme}
    />
  );
};
```

## 📱 Responsividade

Use os hooks de responsividade para adaptar componentes:

```tsx
import { useBreakpoint, responsiveValue } from '../components/base';

const MyComponent = () => {
  const { isMobile, isTablet } = useBreakpoint();
  
  const padding = responsiveValue(
    { mobile: 'sm', tablet: 'md', desktop: 'lg' },
    'md'
  );
  
  return (
    <BaseCard padding={padding}>
      {/* Conteúdo adaptativo */}
    </BaseCard>
  );
};
```

## ♿ Acessibilidade

Todos os componentes incluem:
- aria-labels automáticos
- Navegação por teclado
- Contraste de cores adequado
- Tamanhos de toque apropriados

## ⚡ Performance Otimizada

### 🚀 Otimizações Implementadas
- **React.memo**: Todos os componentes base memoizados
- **useMemo/useCallback**: Hooks otimizados para cálculos e callbacks
- **Lazy loading**: Componentes com carregamento sob demanda
- **Virtual scrolling**: Listas otimizadas para grandes volumes de dados
- **Bundle splitting**: Código dividido inteligentemente
- **Monitoramento**: Sistema de performance em tempo real

### 🎣 Hooks de Performance
```tsx
import { 
  usePerformanceMonitor, 
  useDebouncedCallback, 
  useOptimizedState,
  useMemoizedValue 
} from '../components/base';

const MyComponent = () => {
  const performanceData = usePerformanceMonitor('MyComponent');
  const debouncedSearch = useDebouncedCallback(searchFunction, 300);
  const [state, setState] = useOptimizedState(initialState);
  const memoizedValue = useMemoizedValue(expensiveCalculation);
  
  return <div>Componente otimizado</div>;
};
```

### 📊 Monitoramento de Performance
```tsx
import { performanceMonitor, usePerformanceMetrics } from '../components/base';

// Acessar métricas em tempo real
const metrics = usePerformanceMetrics();

// Gerar relatório de performance
console.log(performanceMonitor.generateReport());

// Benchmark de componentes
await performanceMonitor.benchmarkComponent('MyComponent', testFunction, 100);
```

### 🎛️ Componentes de Alta Performance
- **VirtualizedList**: Para listas com milhares de itens
- **LazyComponent**: Para componentes pesados com carregamento condicional
- **withLazyLoading**: HOC para lazy loading automático

## 🏗️ Estrutura de Arquivos

```
frontend/src/components/base/
├── types/               # Tipos TypeScript
│   ├── ComponentProps.ts
│   ├── StyleTypes.ts
│   └── EventTypes.ts
├── utils/               # Utilitários
│   ├── theme.ts
│   └── responsive.ts
├── BaseCard.tsx         # Componentes
├── BaseButton.tsx
├── index.ts            # Exports principais
└── README.md           # Documentação
```

## 🚀 Próximos Passos

### ✅ Completados
- [x] ~~Sistema de temas dinâmicos~~
- [x] ~~Componentes de seleção e customização de temas~~
- [x] ~~Otimizações de performance com React.memo~~
- [x] ~~Hooks de performance especializados~~
- [x] ~~Sistema de monitoramento de performance~~
- [x] ~~Componentes virtualizados para listas~~
- [x] ~~Lazy loading automático~~
- [x] ~~BaseModal - Sistema de modais acessíveis~~
- [x] ~~BaseInput - Inputs avançados com validação~~
- [x] ~~BaseTable - Tabelas responsivas e ordenáveis~~
- [x] ~~BaseNavigation - Sistema de navegação completo~~
- [x] ~~BaseTabs - Componente de abas~~
- [x] ~~Sistema de ícones padronizado~~

### 📋 Pendentes
- [ ] Implementar testes unitários
- [ ] Criar Storybook para documentação visual
- [ ] Implementar animações avançadas
- [ ] Adicionar suporte a temas sazonais
- [ ] Implementar cache inteligente
- [ ] Adicionar Web Workers para processamento pesado
- [ ] Sistema de notificações push
- [ ] Componentes de data picker
- [ ] Sistema de drag & drop

---

**Gerado em**: 2025-01-27T11:20:00.000Z  
**Versão**: 2.0.0
