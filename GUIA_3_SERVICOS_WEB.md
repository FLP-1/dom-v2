# 🌐 Guia Completo: 3 Serviços para Testar no Navegador Web

## ✅ **Resposta Direta**

**SIM, você precisa dos 3 serviços rodando simultaneamente:**

1. **Backend** (porta 3001) - API e banco de dados
2. **Metro Bundler** (porta 8081) - Compilador React Native
3. **Frontend Web** (porta 3000) - Servidor web

## 🚀 **Script Automático (Recomendado)**

```powershell
.\start-dom-v2-complete.ps1
```

**Este script faz tudo automaticamente:**
- ✅ Para processos existentes
- ✅ Inicia backend
- ✅ Inicia Metro bundler
- ✅ Inicia frontend web
- ✅ Verifica todos os serviços
- ✅ Mostra URLs de acesso

## 🔧 **Inicialização Manual (3 Terminais)**

### **Terminal 1 - Backend**
```powershell
cd C:\dom-v2\backend
$env:DATABASE_URL = "postgresql://postgres:FLP*2025@localhost:5432/db_dom"
npx ts-node src/server-dev.ts
```

**Resultado esperado:**
```
🚀 Servidor de desenvolvimento TypeScript rodando na porta 3001
📊 Health check: http://localhost:3001/health
🔐 Auth API: http://localhost:3001/api/auth/login
```

### **Terminal 2 - Metro Bundler**
```powershell
cd C:\dom-v2\frontend
npx react-native start --port 8081
```

**Resultado esperado:**
```
Metro waiting on exp://192.168.x.x:8081
Scanning for folders to link to your project...
```

### **Terminal 3 - Frontend Web**
```powershell
cd C:\dom-v2\frontend
npm run dev
```

**Resultado esperado:**
```
🌐 Servidor web robusto rodando em http://localhost:3000
📱 HTML + JavaScript disponível
🏥 Health check: http://localhost:3000/health
```

## 📊 **Verificação dos Serviços**

### **1. Verificar Portas**
```powershell
netstat -ano | findstr "3000\|3001\|8081"
```

### **2. Health Checks**
```powershell
# Backend
Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET

# Frontend
Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET

# Metro (opcional)
Invoke-RestMethod -Uri "http://localhost:8081/status" -Method GET
```

### **3. URLs de Acesso**
- **Aplicação:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Metro Bundler:** http://localhost:8081

## 🏗️ **Como Funciona a Arquitetura**

### **Fluxo Completo:**
```
1. Usuário acessa http://localhost:3000
   ↓
2. Frontend Web (porta 3000) serve index.html
   ↓
3. index.html carrega Metro Bundler (porta 8081)
   ↓
4. Metro compila App.tsx e componentes React Native
   ↓
5. Aplicação HTML + JavaScript é renderizada
   ↓
6. App.tsx faz chamadas para Backend (porta 3001)
   ↓
7. Backend responde com dados do banco PostgreSQL
```

### **Responsabilidades de Cada Serviço:**

#### **Backend (porta 3001)**
- ✅ API REST (login, dashboards, dados)
- ✅ Conexão com PostgreSQL
- ✅ Autenticação e autorização
- ✅ Lógica de negócio

#### **Metro Bundler (porta 8081)**
- ✅ Compila código React Native
- ✅ Converte para HTML + JavaScript
- ✅ Hot reload durante desenvolvimento
- ✅ Bundle otimizado para web

#### **Frontend Web (porta 3000)**
- ✅ Servidor web para navegador
- ✅ Serve arquivos estáticos
- ✅ Proxy para Metro Bundler
- ✅ Health checks e monitoramento

## 🎯 **Teste no Navegador**

### **1. Acesse a Aplicação**
```
http://localhost:3000
```

### **2. Você Verá:**
- 🏠 SplashScreen.tsx (tela de carregamento real)
- 📝 Login com CPF/CNPJ
- 🎨 Dashboards por perfil
- 🔔 Sistema de notificações
- 📊 Todas as funcionalidades

### **3. Login de Teste:**
- **CPF:** Qualquer CPF válido (ex: 12345678901)
- **Senha:** 123456

## ⚠️ **Solução de Problemas**

### **Se algum serviço não iniciar:**

#### **Backend não inicia:**
```powershell
# Verificar PostgreSQL
pg_ctl status -D "C:\Program Files\PostgreSQL\14\data"

# Verificar variável de ambiente
echo $env:DATABASE_URL
```

#### **Metro não inicia:**
```powershell
# Limpar cache
cd frontend
npx react-native start --reset-cache --port 8081
```

#### **Frontend não inicia:**
```powershell
# Verificar se Metro está rodando
Invoke-RestMethod -Uri "http://localhost:8081/status" -Method GET
```

### **Se a aplicação não carrega:**
1. **Aguarde** alguns segundos para o Metro compilar
2. **Recarregue** a página (F5)
3. **Verifique** o console do navegador (F12)
4. **Confirme** que todos os 3 serviços estão rodando

## 🎉 **Benefícios dos 3 Serviços**

### **✅ Desenvolvimento Real:**
- Hot reload automático
- Debugging completo
- Logs detalhados
- Performance otimizada

### **✅ Arquitetura Correta:**
- Separação de responsabilidades
- Escalabilidade
- Manutenibilidade
- Testabilidade

### **✅ Experiência Completa:**
- Aplicação HTML + JavaScript real
- Todas as funcionalidades
- Interface adaptativa
- Performance nativa

## 📋 **Checklist de Inicialização**

- [ ] PostgreSQL rodando
- [ ] Backend iniciado (porta 3001)
- [ ] Metro Bundler iniciado (porta 8081)
- [ ] Frontend Web iniciado (porta 3000)
- [ ] Health checks passando
- [ ] Aplicação carregando no navegador

---

**Data:** 25/07/2025  
**Status:** ✅ 3 SERVIÇOS FUNCIONANDO  
**Script:** `.\start-dom-v2-complete.ps1` 