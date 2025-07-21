# 🚀 DOM v2 - Sistema de Gestão Doméstica
## Análise Crítica e Contextualizada do Projeto

### 📋 ANÁLISE CRÍTICA
**Suposições:**
- O mercado de gestão doméstica precisa de uma solução com controle de fraude
- A versão anterior (DOM v1) falhou devido a complexidade excessiva
- A equipe atual tem capacidade de implementar uma solução robusta
- O diferencial de controle de fraude é único no mercado

**Alternativas consideradas:**
- Manter DOM v1 com correções (risco de manter problemas estruturais)
- Criar solução completamente nova (alto custo e tempo)
- Usar solução de terceiros (perda de diferencial competitivo)
- Reescrita completa com regras rígidas (abordagem recomendada)

**Fontes e referências:**
- Análise post-mortem do DOM v1
- Pesquisa de mercado sobre soluções de gestão doméstica
- Documentação oficial: React Native, TypeScript, Node.js
- Estudos sobre complexidade em projetos de software
- Feedback de usuários do DOM v1

**Riscos identificados:**
- Reescrita pode introduzir novos bugs
- Regras rígidas podem limitar inovação
- Diferencial de fraude pode ser copiado
- Equipe pode resistir às mudanças

**Validação:**
- Análise de concorrência no mercado
- Teste com usuários potenciais
- Validação técnica da stack escolhida
- Análise de viabilidade econômica

## 📋 Visão Geral

**DOM v2** é uma versão completamente reescrita do sistema de gestão doméstica, seguindo rigorosamente as regras estabelecidas para evitar os erros do v1.

### 🎯 **PRINCÍPIO FUNDAMENTAL**
- ✅ **NUNCA repetir erros do DOM v1**
- ✅ **Simplicidade extrema** - apenas o essencial
- ✅ **Stack fixa e imutável** - React Native + TypeScript
- ✅ **MVP rigoroso** - Login → Dashboard → Funcionalidade básica
- ✅ **Validação contínua** - testar a cada etapa

## 🏗️ Stack Tecnológica (IMUTÁVEL)

### Frontend
- **React Native** + **TypeScript**
- **Material-UI** para componentes
- **React Navigation** para navegação

### Backend
- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** para banco de dados
- **JWT** para autenticação

## 🚀 Quick Start

### 1. Pré-requisitos
```bash
# Node.js 18+
# React Native CLI
npm install -g @react-native-community/cli

# PostgreSQL
# Android Studio (para desenvolvimento mobile)
```

### 2. Setup do Projeto
```bash
# Clonar repositório
git clone <repository-url>
cd dom-v2

# Instalar dependências do backend
cd backend
npm install

# Instalar dependências do frontend
cd ../frontend
npm install
```

### 3. Executar Desenvolvimento
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npx react-native run-android
# ou
npx react-native run-ios
```

## 📁 Estrutura do Projeto

```
dom-v2/
├── backend/                 # Node.js + Express + TypeScript
│   ├── src/
│   │   └── server.ts       # Servidor principal
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React Native + TypeScript
│   ├── src/
│   ├── App.tsx
│   └── package.json
└── docs/                   # Documentação
    ├── REGRAS_PROJETO_DOM_V2.md
    └── PERFIS_USUARIOS.md
```

## 🎯 Perfis de Usuários

O sistema atende 7 perfis distintos com **personalização completa** da experiência:

### 👥 **Perfis Principais**
1. **Empregadores** - Mulheres 35-50 anos, ocupadas
2. **Empregados Domésticos** - Mulheres 30-60 anos, pouca escolaridade
3. **Familiares** - 15-70 anos, experiência digital variada
4. **Parceiros** - Donos de negócios, experiência avançada
5. **Subordinados** - Funcionários dos parceiros
6. **Administradores** - Desenvolvedores/suporte
7. **Donos** - Fundadores, controle total

### 🎨 **Sistema de Personalização**
- **Temas visuais** específicos por perfil
- **Tipografia adaptada** à experiência digital
- **Navegação otimizada** ao tempo disponível
- **Conteúdo personalizado** por contexto
- **Notificações inteligentes** por perfil

### 📊 **Adaptação Dinâmica**
- **Experiência digital**: Básica, Intermediária, Avançada
- **Dispositivo**: Mobile, Tablet, Desktop
- **Tempo disponível**: Limitado, Flexível, Extensivo
- **Contexto de uso**: Profissional, Familiar, Técnico

📖 **Documentação detalhada**: `docs/PERFIS_USUARIOS_DETALHADOS.md`

## 📋 Regras Obrigatórias

### ✅ **SEMPRE fazer:**
- Implementar apenas o essencial
- Validar cada funcionalidade antes de prosseguir
- Usar apenas dependências comprovadamente necessárias
- Manter código simples e direto
- Focar no MVP primeiro

### ❌ **NUNCA fazer:**
- Adicionar dependências "por precaução"
- Implementar funcionalidades "futuras"
- Usar bibliotecas "trendy" sem necessidade
- Criar abstrações "elegantes" desnecessárias
- Over-engineering antes de validar

## 🧪 Testes

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 📊 Endpoints da API

### Saúde
- `GET /health` - Status do servidor

### Teste
- `GET /api/test` - Endpoint de teste

## 🔧 Scripts Disponíveis

### Backend
```bash
npm run dev    # Desenvolvimento com hot reload
npm run build  # Compilar TypeScript
npm start      # Produção
```

### Frontend
```bash
npx react-native run-android  # Android
npx react-native run-ios      # iOS
npm test                      # Testes
```

## 🚨 Sinais de Alerta

**PARAR IMEDIATAMENTE se aparecer:**
- ❌ Erros de dependências conflitantes
- ❌ Performance degradada
- ❌ Testes falhando constantemente
- ❌ Funcionalidade não funciona
- ❌ Complexidade aumentando
- ❌ Tempo de desenvolvimento explodindo

## 📝 Checklist de Qualidade

### Antes de Cada Commit:
- [ ] Funcionalidade testada manualmente?
- [ ] Testes automatizados passando?
- [ ] Performance aceitável?
- [ ] Código simples e legível?
- [ ] Sem dependências desnecessárias?
- [ ] Documentação atualizada?

## 🎯 Próximos Passos

1. **Fase 1: Setup Mínimo** ✅ (Concluído)
2. **Fase 2: Login Funcional** (Em desenvolvimento)
3. **Fase 3: Dashboard Básico** (Pendente)
4. **Fase 4: Funcionalidades Essenciais** (Pendente)

---

**Status**: ✅ **SETUP MÍNIMO CONCLUÍDO**
**Versão**: 2.0.0
**Data**: 2024-12-19
