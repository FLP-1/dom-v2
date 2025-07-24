# 📚 **Documentação Técnica - DOM v2**

## 🏗️ **Arquitetura do Sistema**

### **Visão Geral da Arquitetura**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend Web  │    │   Metro Bundler │    │   Backend API   │
│   (React Native │◄──►│   (Port 8081)   │◄──►│   (Node.js)     │
│   Web)          │    │                 │    │   (Port 3001)   │
│   (Port 3000)   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Polyfills     │    │   Bundle        │    │   PostgreSQL    │
│   (localStorage)│    │   (React Native)│    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Componentes Principais**

#### **1. Frontend (React Native Web)**
- **Tecnologia:** React Native 0.80.1 + TypeScript
- **Plataforma:** Web (React Native Web 0.19.10)
- **Servidor:** Express.js customizado (`server-web-robust.js`)
- **Porta:** 3000

#### **2. Metro Bundler**
- **Função:** Bundle do React Native para web
- **Configuração:** `metro.config.js` customizado
- **Porta:** 8081
- **Hot Reload:** Habilitado

#### **3. Backend (Node.js)**
- **Tecnologia:** Node.js + Express + TypeScript
- **Banco:** PostgreSQL + Prisma ORM
- **Porta:** 3001
- **Servidor:** `server-dev.ts` (desenvolvimento)

## 🔧 **Configurações Técnicas**

### **Polyfills Implementados**

#### **AsyncStorage Polyfill**
```javascript
// Mock completo do AsyncStorage para React Native Web
const AsyncStorageMock = {
  getItem: async (key) => localStorage.getItem(key),
  setItem: async (key, value) => localStorage.setItem(key, value),
  removeItem: async (key) => localStorage.removeItem(key),
  clear: async () => localStorage.clear(),
  // ... outros métodos
};
```

#### **React Native Web Polyfills**
- **DevSettings:** Mock para desenvolvimento
- **TurboModuleRegistry:** Interceptação de módulos nativos
- **NativeModules:** Compatibilidade com módulos nativos
- **Console Warnings:** Supressão de warnings específicos

### **Sistema de Temas**

#### **ThemeProvider**
```typescript
interface ThemeContextType {
  profileType: ProfileType;
  colors: ColorScheme;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  setProfileType: (type: ProfileType) => void;
}
```

#### **Perfis de Usuário**
- **EMPLOYER:** Empregadores (interface profissional)
- **EMPLOYEE:** Empregados (interface simplificada)
- **FAMILY:** Familiares (interface amigável)

### **Sistema de Notificações**

#### **useSimpleNotifications Hook**
```typescript
interface SimpleNotification {
  id: string;
  type: SimpleNotificationType;
  title: string;
  message: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  read: boolean;
}
```

#### **Tipos de Notificação**
- **TASK_REMINDER:** Lembretes de tarefas
- **PAYMENT_DUE:** Pagamentos vencendo
- **SYSTEM_UPDATE:** Atualizações do sistema
- **HELP_TIP:** Dicas de ajuda

## 🗄️ **Banco de Dados**

### **PostgreSQL Configuration**
```sql
-- Banco: db_dom
-- Usuário: postgres
-- Senha: FLP*2025
-- Porta: 5432
```

### **Prisma Schema (Futuro)**
```prisma
model User {
  id        String   @id @default(cuid())
  cpf       String   @unique
  password  String
  profileType ProfileType
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum ProfileType {
  EMPLOYER
  EMPLOYEE
  FAMILY
}
```

## 🔄 **Fluxo de Dados**

### **1. Autenticação**
```
Frontend → Backend API → PostgreSQL
   ↓           ↓            ↓
CPF/CNPJ → Validação → Retorno JWT
```

### **2. Notificações**
```
useSimpleNotifications → AsyncStorage → localStorage
        ↓                      ↓
   React State ← Persistência ← Polyfill
```

### **3. Temas**
```
ThemeProvider → Context → Componentes
     ↓              ↓
Profile Type → Color Scheme
```

## 🛠️ **Scripts de Desenvolvimento**

### **run-dom-v2-stable.ps1**
```powershell
# Funcionalidades:
# - Inicialização coordenada de serviços
# - Monitoramento automático
# - Health checks contínuos
# - Reinicialização automática
# - Logs detalhados
```

### **test-frontend.ps1**
```powershell
# Testes:
# - Frontend Web (Port 3000)
# - Backend API (Port 3001)
# - Metro Bundler (Port 8081)
# - Login API
# - Relatório de status
```

## 🔍 **Solução de Problemas**

### **Problemas Resolvidos**

#### **1. AsyncStorage is null**
**Sintoma:** `Uncaught Error: [@RNC/AsyncStorage]: NativeModule: AsyncStorage is null`
**Causa:** Módulo nativo não disponível no React Native Web
**Solução:** Polyfill completo em `polyfills-enhanced.js`

#### **2. useTheme Context Error**
**Sintoma:** `useTheme deve ser usado dentro de um ThemeProvider`
**Causa:** Componente usando useTheme sem contexto
**Solução:** ThemeProvider adicionado em `App.tsx`

#### **3. Servidores Instáveis**
**Sintoma:** Serviços se desconectando aleatoriamente
**Causa:** Inicialização não coordenada
**Solução:** Script robusto com monitoramento

#### **4. ConfigSystem Errors**
**Sintoma:** `ConfigSystem.getApiConfig is not a function`
**Causa:** Métodos inexistentes
**Solução:** Uso correto de `getValue()`

### **Problemas Comuns e Soluções**

#### **Porta em Uso**
```powershell
# Verificar processos
netstat -ano | findstr :3000
netstat -ano | findstr :3001
netstat -ano | findstr :8081

# Finalizar processos
taskkill /PID <PID> /F
```

#### **Metro Bundler Não Responde**
```powershell
# Limpar cache
cd frontend
npx react-native start --reset-cache
```

#### **Banco Não Conecta**
```powershell
# Verificar PostgreSQL
pg_isready -h localhost -p 5432

# Verificar variáveis de ambiente
echo $env:DATABASE_URL
```

## 📊 **Monitoramento e Logs**

### **Health Checks**
- **Frontend:** `GET http://localhost:3000/health`
- **Backend:** `GET http://localhost:3001/health`
- **Metro:** `GET http://localhost:8081/status`

### **Logs Importantes**
```javascript
// Frontend
console.log('🎉 App.tsx renderizando - Sistema de Navegação Completo');
console.log('✅ AsyncStorage polyfill aplicado');

// Backend
console.log('✅ Conectado ao banco de dados PostgreSQL');
console.log('🌐 Servidor web robusto rodando em http://localhost:3000');
```

## 🔒 **Segurança**

### **Autenticação**
- **Método:** JWT (JSON Web Tokens)
- **Validação:** CPF/CNPJ com dígitos verificadores
- **Armazenamento:** AsyncStorage (localStorage no web)

### **Validação de Dados**
```typescript
// CPF/CNPJ Validation
function validateCPFCNPJ(value: string): boolean {
  // Implementação de validação com dígitos verificadores
}
```

## 📈 **Performance**

### **Otimizações Implementadas**
- **Bundle Splitting:** Metro Bundler otimizado
- **Polyfills:** Carregamento condicional
- **Caching:** localStorage para persistência
- **Lazy Loading:** Componentes carregados sob demanda

### **Métricas de Performance**
- **Tempo de Carregamento:** < 3 segundos
- **Tamanho do Bundle:** Otimizado para web
- **Memória:** Monitoramento contínuo
- **CPU:** Uso eficiente

## 🧪 **Testes**

### **Testes Automatizados**
```powershell
# Teste de saúde dos serviços
.\test-frontend.ps1

# Teste de API
Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" -Method POST
```

### **Testes Manuais**
- **Login:** CPF 12345678901, Senha 123456
- **Navegação:** Dashboard, Sidebar, Modais
- **Temas:** Mudança de perfil
- **Notificações:** Adição e remoção

## 🔄 **Deploy e Produção**

### **Ambiente de Desenvolvimento**
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001
- **Metro:** http://localhost:8081

### **Ambiente de Produção (Futuro)**
- **Frontend:** CDN + Servidor Web
- **Backend:** Container Docker
- **Banco:** PostgreSQL Cloud
- **Monitoramento:** Health checks + Logs

## 📚 **Referências Técnicas**

### **Documentação Oficial**
- [React Native Web](https://github.com/necolas/react-native-web)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

### **Bibliotecas Utilizadas**
- **React Navigation:** Navegação
- **AsyncStorage:** Persistência local
- **Express:** Servidor web
- **Prisma:** ORM para PostgreSQL

---

**Versão da Documentação:** 2.0.0  
**Última Atualização:** 2024-12-19  
**Status:** ✅ **COMPLETA E ATUALIZADA** 