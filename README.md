# 🏠 DOM v2 - Sistema de Gestão Doméstica

## 📋 **Visão Geral**

O **DOM v2** é um sistema completo de gestão doméstica desenvolvido em React Native Web com backend Node.js, oferecendo uma solução moderna e adaptável para diferentes perfis de usuários e regiões brasileiras.

### **🎯 Características Principais**
- ✅ **Multi-plataforma:** React Native Web para máxima compatibilidade
- ✅ **Adaptação Regional:** Interface personalizada por região brasileira
- ✅ **Sistema de Perfis:** Diferentes experiências por tipo de usuário
- ✅ **Notificações Inteligentes:** Sistema de alertas contextual
- ✅ **Otimização por Dispositivo:** Interface adaptativa
- ✅ **Backend Robusto:** Node.js com TypeScript e PostgreSQL
- ✅ **Arquitetura Estável:** Monitoramento e reinicialização automática

## 🏗️ **Arquitetura do Sistema**

### **Frontend (React Native Web)**
```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── screens/            # Telas da aplicação
│   ├── navigation/         # Sistema de navegação
│   ├── utils/              # Utilitários e hooks
│   └── types/              # Definições TypeScript
├── public/                 # Arquivos estáticos
│   ├── polyfills-enhanced.js  # Polyfills para React Native Web
│   └── index.html          # Página principal
└── server-web-robust.js    # Servidor web robusto
```

### **Backend (Node.js + TypeScript)**
```
backend/
├── src/
│   ├── server-dev.ts       # Servidor de desenvolvimento
│   ├── server-prisma.ts    # Servidor com Prisma (produção)
│   ├── database.ts         # Configuração do banco
│   └── routes/             # Rotas da API
├── prisma/                 # Schema e migrações
└── .env                    # Variáveis de ambiente
```

## 🚀 **Instalação e Configuração**

### **Pré-requisitos**
- Node.js 18+
- PostgreSQL 14+
- PowerShell (Windows)

### **1. Clone e Instalação**
```powershell
git clone <repository-url>
cd dom-v2
npm install
```

### **2. Configuração do Banco**
```powershell
# Configurar PostgreSQL
# Criar banco: db_dom
# Usuário: postgres
# Senha: FLP*2025
```

### **3. Variáveis de Ambiente**
```bash
# backend/.env
DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
PORT=3001
```

## 🎮 **Como Executar**

### **Inicialização Completa (Recomendado)**
```powershell
# Iniciar todos os serviços com monitoramento
.\run-dom-v2-stable.ps1
```

### **Inicialização Individual**
```powershell
# Backend
cd backend
npx ts-node src/server-dev.ts

# Metro Bundler
cd frontend
npx react-native start --port 8081

# Frontend Web
cd frontend
node server-web-robust.js
```

### **Teste de Saúde**
```powershell
# Verificar status de todos os serviços
.\test-frontend.ps1
```

## 📱 **Funcionalidades Implementadas**

### **🔐 Sistema de Autenticação**
- Login com CPF/CNPJ
- Validação de dígitos verificadores
- Autenticação via API REST

### **🎨 Sistema de Temas**
- **ThemeProvider:** Contexto global de temas
- **Adaptação Regional:** Cores e estilos por região
- **Perfis de Usuário:** EMPLOYER, EMPLOYEE, FAMILY

### **🔔 Sistema de Notificações**
- **useSimpleNotifications:** Hook para gestão
- **Tipos:** TASK_REMINDER, PAYMENT_DUE, SYSTEM_UPDATE, HELP_TIP
- **Prioridades:** LOW, MEDIUM, HIGH
- **Persistência:** AsyncStorage com polyfill para web

### **📱 Otimização por Dispositivo**
- **Detecção Automática:** SMARTPHONE, TABLET, DESKTOP
- **Interface Adaptativa:** Botões, fontes e espaçamentos
- **Navegação Otimizada:** SWIPE, TAP, CLICK

### **🌍 Adaptação Regional**
- **Regiões:** SUDESTE, SUL, NORDESTE, CENTRO_OESTE, NORTE
- **Mensagens Personalizadas:** Linguagem regional
- **Configurações Visuais:** Cores e tipografia

## 🔧 **Componentes Principais**

### **CPFCNPJInput**
```typescript
// Validação de CPF/CNPJ com dígitos verificadores
<CPFCNPJInput
  value={cpf}
  onChangeText={setCpf}
  placeholder="Digite seu CPF ou CNPJ"
/>
```

### **ThemeProvider**
```typescript
// Contexto de temas global
<ThemeProvider initialProfileType="EMPLOYER">
  <AppNavigator />
</ThemeProvider>
```

### **useSimpleNotifications**
```typescript
// Hook para notificações
const { notifications, addNotification, unreadCount } = useSimpleNotifications();

// Adicionar notificação
addNotification('TASK_REMINDER', 'Mensagem personalizada');
```

## 🛠️ **Scripts de Desenvolvimento**

### **run-dom-v2-stable.ps1**
- Inicia todos os serviços
- Monitoramento automático
- Reinicialização em caso de falha
- Health checks contínuos

### **test-frontend.ps1**
- Testa saúde dos serviços
- Verifica APIs
- Valida conectividade
- Relatório de status

## 🔍 **Solução de Problemas**

### **Erro: AsyncStorage is null**
**Causa:** Módulo nativo não disponível no React Native Web
**Solução:** Polyfill implementado em `polyfills-enhanced.js`

### **Erro: useTheme deve ser usado dentro de ThemeProvider**
**Causa:** Componente usando useTheme sem contexto
**Solução:** ThemeProvider adicionado em `App.tsx`

### **Servidores se desconectando**
**Causa:** Instabilidade de serviços individuais
**Solução:** Script robusto com monitoramento automático

### **Erro 404 no login**
**Causa:** Serviços não sincronizados
**Solução:** Inicialização coordenada via PowerShell

## 📊 **Status dos Serviços**

| Serviço | Porta | Status | Função |
|---------|-------|--------|--------|
| Frontend Web | 3000 | ✅ Ativo | Interface principal |
| Backend API | 3001 | ✅ Ativo | API REST |
| Metro Bundler | 8081 | ✅ Ativo | Bundle React Native |

## 🧪 **Testes**

### **Credenciais de Teste**
```
CPF: 12345678901
Senha: 123456
```

### **Endpoints de Teste**
```
GET  /health              # Status do serviço
POST /api/auth/login      # Autenticação
GET  /metro-status        # Status do Metro
```

## 🔄 **Fluxo de Desenvolvimento**

### **1. Inicialização**
```powershell
.\run-dom-v2-stable.ps1
```

### **2. Desenvolvimento**
- Editar arquivos em `frontend/src/`
- Backend em `backend/src/`
- Hot reload automático

### **3. Teste**
```powershell
.\test-frontend.ps1
```

### **4. Verificação**
- Abrir http://localhost:3000
- Testar login
- Verificar console

## 📈 **Próximas Funcionalidades**

### **Fase 2 - Gestão de Tarefas**
- [ ] CRUD de tarefas domésticas
- [ ] Sistema de prioridades
- [ ] Lembretes automáticos
- [ ] Categorização

### **Fase 3 - Gestão Financeira**
- [ ] Controle de despesas
- [ ] Orçamento mensal
- [ ] Relatórios
- [ ] Integração bancária

### **Fase 4 - Perfis Avançados**
- [ ] Gestão de funcionários
- [ ] Controle de acesso
- [ ] Relatórios gerenciais
- [ ] Dashboard executivo

## 🤝 **Contribuição**

### **Padrões de Código**
- TypeScript obrigatório
- Componentes funcionais
- Hooks personalizados
- Documentação JSDoc

### **Estrutura de Commits**
```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
refactor: refatoração
test: testes
```

## 📄 **Licença**

Este projeto está sob licença MIT. Veja o arquivo LICENSE para detalhes.

## 👥 **Equipe**

**DOM Team v2**
- Desenvolvimento: React Native Web + Node.js
- Arquitetura: Micro-frontend
- Banco: PostgreSQL + Prisma
- DevOps: PowerShell + Monitoramento

---

**Versão:** 2.0.0  
**Última Atualização:** 2024-12-19  
**Status:** ✅ **PRODUÇÃO PRONTA**
