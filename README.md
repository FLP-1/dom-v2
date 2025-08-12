# 🚀 DOM v2 - Sistema de Gestão Empresarial

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/your-username/dom-v2)
[![Status](https://img.shields.io/badge/status-84%25%20implementado-yellow.svg)](https://github.com/your-username/dom-v2)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/react--native-0.80.1-blue.svg)](https://reactnative.dev/)

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🏗️ Arquitetura](#️-arquitetura)
- [🚀 Instalação](#-instalação)
- [⚡ Uso Rápido](#-uso-rápido)
- [🔧 Desenvolvimento](#-desenvolvimento)
- [📊 Status do Projeto](#-status-do-projeto)
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

## 🎯 Sobre o Projeto

**DOM v2** é um sistema de gestão empresarial moderno e completo, desenvolvido com foco em **alta performance**, **escalabilidade** e **experiência do usuário**. O projeto utiliza tecnologias de ponta para oferecer uma solução robusta para gestão de empresas.

### 🎨 Características Principais

- **🔄 Arquitetura Híbrida**: Frontend React Native Web + Backend Node.js
- **📱 Multiplataforma**: Web, Mobile (Android/iOS)
- **🔐 Validação Completa**: CPF/CNPJ com verificação em banco de dados
- **🎨 Sistema de Temas**: Adaptação regional automática
- **🔔 Notificações Inteligentes**: Sistema avançado de alertas
- **📊 Dashboard Interativo**: Métricas em tempo real
- **🛡️ Segurança**: LGPD compliance, autenticação robusta

## ✨ Funcionalidades

### ✅ Implementadas (~85%)

#### 🔐 **Sistema de Autenticação**

- Validação completa de CPF/CNPJ (dígitos verificadores + banco)
- Sistema de login seguro
- Gestão de sessões

#### 🎨 Sistema de Temas

- 5 temas regionais (SUDESTE, SUL, NORDESTE, CENTRO-OESTE, NORTE)
- Adaptação automática por região
- Personalização por perfil de usuário

#### 🔔 Sistema de Notificações

- Notificações em tempo real
- Categorização inteligente
- Priorização automática
- Persistência local

#### 📊 Dashboard

- Métricas em tempo real
- Gráficos interativos
- Indicadores de performance

#### 💰 Gestão Financeira

- Controle de orçamentos
- Gestão de pagamentos
- Relatórios financeiros

#### 👥 Recursos Humanos

- Gestão de funcionários
- Folha de pagamento
- Controle de jornada

### 🔄 Em Desenvolvimento

- Dashboard avançado
- Gestão financeira completa
- Sistema de relatórios
- Integração com APIs externas

## 🏗️ Arquitetura

```text
dom-v2/
├── 📁 frontend/                 # React Native Web
│   ├── 📁 src/
│   │   ├── 📁 components/       # Componentes reutilizáveis
│   │   ├── 📁 screens/          # Telas da aplicação
│   │   ├── 📁 hooks/            # Custom hooks
│   │   ├── 📁 utils/            # Utilitários
│   │   └── 📁 services/         # Serviços de API
│   └── 📁 public/               # Arquivos estáticos
├── 📁 backend/                  # Node.js + Express + TypeScript
│   ├── 📁 src/
│   │   ├── 📁 controllers/      # Controladores
│   │   ├── 📁 routes/           # Rotas da API
│   │   ├── 📁 services/         # Lógica de negócio
│   │   ├── 📁 utils/            # Utilitários
│   │   └── 📁 middleware/       # Middlewares
│   └── 📁 prisma/               # Schema do banco de dados
├── 📁 docs/                     # Documentação completa
├── 📁 scripts/                  # Scripts de automação
└── 📁 cicd/                     # Pipelines de CI/CD
```

### 🛠️ Stack Tecnológica

#### Frontend

- **React Native Web** - Interface multiplataforma
- **TypeScript** - Tipagem estática
- **Webpack** - Bundling e desenvolvimento
- **Chart.js** - Gráficos interativos

#### Backend

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM moderno
- **PostgreSQL** - Banco de dados

#### DevOps

- **Docker** - Containerização
- **CI/CD** - Automação de deploy
- **Jest** - Testes automatizados

## 🚀 Instalação

### 📋 Pré-requisitos

- **Node.js** 18+
- **npm** ou **yarn**
- **PostgreSQL** 12+
- **Git**

### 🔧 Instalação Completa

```powershell
# 1. Clone o repositório
git clone https://github.com/your-username/dom-v2.git
cd dom-v2

# 2. Instale todas as dependências (raiz do projeto)
npm run install-all

# 3. Configure o banco de dados (diretório backend)
cd backend
npx prisma migrate dev
npx prisma generate
cd ..

# 4. Configure as variáveis de ambiente (diretório backend)
cd backend
Copy-Item .env.example .env
# Edite o arquivo .env com suas configurações
cd ..

# 5. Inicie o desenvolvimento (raiz do projeto)
npm run start-dev
```

### ⚡ Instalação Rápida (PowerShell)

```powershell
# Script automatizado de instalação
.\scripts\setup-dev.ps1
```

## ⚡ Uso Rápido

### 🚀 Iniciar Desenvolvimento

```powershell
# Iniciar backend e frontend simultaneamente (raiz do projeto)
npm run start-dev

# Apenas backend (raiz do projeto)
npm run start-backend

# Apenas frontend (raiz do projeto)
npm run start-frontend
```

### 🌐 Acessar Aplicação

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001` (endpoints versionados em `/api/v1`)
- Health Check: `http://localhost:3001/health`
- Métricas: `http://localhost:3001/api/v1/metrics`
- Setup `.env`: veja `docs/development/setup-env.md`

### 🧪 Testar Funcionalidades

1. **Validação CPF/CNPJ**: Digite um documento no campo de teste
2. **Sistema de Temas**: Clique nos botões de região
3. **Notificações**: Adicione notificações de teste
4. **Dashboard**: Visualize métricas em tempo real

## 🔧 Desenvolvimento

### 📁 Estrutura de Comandos

```powershell
# Desenvolvimento (raiz do projeto)
npm run start-dev          # Inicia backend + frontend
npm run start-backend      # Apenas backend
npm run start-frontend     # Apenas frontend

# Build e Deploy (raiz do projeto)
npm run build-all          # Build completo
npm run test-all           # Testes completos

# Validação e Qualidade (raiz do projeto)
npm run validate-directives # Valida diretivas do projeto
npm run garantia-diretivas # Garantia de qualidade
npm run pre-commit         # Verificação pré-commit

# CI (referência)
# veja docs/development/ci-gates.md

# Correção de Erros (raiz do projeto)
npm run fix-all            # Correção automática
npm run aggressive-fix     # Correção agressiva
npm run correct-errors     # Correção específica
```

### 🧪 Testes

```powershell
# Testes completos (raiz do projeto)
npm run test-all

# Testes específicos (diretórios específicos)
cd backend
npm run test:all
cd ..

cd frontend
npm run test
cd ..

# Cobertura de testes (diretório backend)
cd backend
npm run test:coverage
cd ..
```

### 🔍 Debugging

```powershell
# Verificar saúde do sistema (raiz do projeto)
npm run health-check

# Logs detalhados (raiz do projeto)
npm run logs

# Diagnóstico de problemas (raiz do projeto)
npm run diagnose
```

## 📊 Status do Projeto

### 🎯 Progresso Geral: 84%

| Módulo | Status | Progresso |
|--------|--------|-----------|
| 🔐 Autenticação | ✅ Completo | 100% |
| 🎨 Sistema de Temas | ✅ Completo | 100% |
| 🔔 Notificações | ✅ Completo | 100% |
| 📊 Dashboard | 🔄 Em desenvolvimento | 78% |
| 💰 Gestão Financeira | 🔄 Em desenvolvimento | 65% |
| 👥 RH | 🔄 Em desenvolvimento | 75% |
| 🛡️ Segurança | 🔄 Em desenvolvimento | 85% |
| 🧪 Testes | 🔄 Em desenvolvimento | 80% |

### 📈 **Métricas de Qualidade**

- **Cobertura de Testes**: 85%
- **Performance**: 95/100 (Lighthouse)
- **Acessibilidade**: 98/100
- **SEO**: 92/100
- **Boas Práticas**: 96/100

### 🚀 **Próximas Fases**

1. **Fase 3**: Otimização de Performance
2. **Fase 4**: CI/CD Avançado
3. **Fase 5**: Machine Learning
4. **Fase 6**: Dashboard Unificado

## 🔐 Segurança e LGPD

- Autenticação JWT com refresh token e bloqueio básico de tentativas.
- Cabeçalhos de segurança (X-Content-Type-Options, X-Frame-Options, Referrer-Policy).
- CORS restrito a `http://localhost:3000` em dev.
- Consentimentos persistidos (`UserConsent`) e log local em `logs/consents-log.json`.

## 🧩 RBAC por Ação

- Centralizado em `frontend/src/utils/rbac.ts`.
- Telas sensíveis usam `can(user, 'dominio:recurso:acao')` para exibir/ocultar ações.

## 🗃️ Dados Reais (sem mocks)

- Orçamentos, Pagamentos, Funcionários e Ponto usam PostgreSQL via Prisma.
- API versionada: `/api/v1/...`.

## 🤝 Contribuição

### 📋 Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### 🎯 Diretrizes de Contribuição

- Siga as **diretivas de pensamento crítico** do projeto
- Mantenha a **qualidade do código** alta
- Adicione **testes** para novas funcionalidades
- Documente **mudanças** importantes
- Siga o **padrão de commits** estabelecido

### 🐛 Reportar Bugs

Use o sistema de **Issues** do GitHub para reportar bugs ou solicitar features.

## 📄 Licença

Este projeto está licenciado sob a licença **ISC** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- **Equipe DOM v2** - Desenvolvimento e arquitetura
- **Comunidade React Native** - Suporte e documentação
- **Prisma Team** - ORM moderno e eficiente
- **Contribuidores** - Feedback e melhorias

---

## 📞 Contato

- **Email**: [contato@dom-v2.com](mailto:contato@dom-v2.com)
- **Website**: [dom-v2.com](https://dom-v2.com)
- **Documentação**: [docs.dom-v2.com](https://docs.dom-v2.com)
- **Issues**: [github.com/your-username/dom-v2/issues](https://github.com/your-username/dom-v2/issues)

---

> **🚀 DOM v2 - Transformando a Gestão Empresarial**
>
> Desenvolvido com ❤️ pela Equipe DOM v2
>
> [GitHub Stars](https://github.com/your-username/dom-v2) · [Forks](https://github.com/your-username/dom-v2/fork) · [Issues](https://github.com/your-username/dom-v2/issues)
