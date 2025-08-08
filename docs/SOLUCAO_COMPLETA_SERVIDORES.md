# ✅ Solução Completa: Iniciar Backend + Frontend

## 🎯 **Problema Identificado**

O erro "ERR_CONNECTION_REFUSED" indica que os servidores não estão rodando. Precisamos iniciar **ambos** o backend e frontend.

---

## 🚀 **SOLUÇÃO: Iniciar Ambos os Servidores**

### **1. Terminal 1 - Backend**
```powershell
cd backend
npm install
npm run dev
```

### **2. Terminal 2 - Frontend**
```powershell
cd frontend
npm install
npm run web
```

---

## 📋 **Comandos Detalhados:**

### **Backend (Porta 5000)**
```powershell
# Navegar para backend
cd backend

# Instalar dependências (se necessário)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### **Frontend (Porta 3000)**
```powershell
# Navegar para frontend
cd frontend

# Instalar dependências (se necessário)
npm install

# Iniciar servidor web
npm run dev
```

---

## 🔍 **Verificar se estão rodando:**

```powershell
# Verificar portas ativas
netstat -an | findstr ":3000"
netstat -an | findstr ":5000"

# Ou verificar todas as portas
netstat -an | findstr ":3000\|:5000\|:8000\|:8080"
```

---

## 🌐 **Acessar a aplicação:**

- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000`

---

## ⚠️ **Possíveis Problemas:**

### **1. Dependências não instaladas**
```powershell
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### **2. Portas ocupadas**
```powershell
# Verificar processos nas portas
netstat -ano | findstr ":3000"
netstat -ano | findstr ":5000"

# Matar processo se necessário
taskkill /PID [PID] /F
```

### **3. Erros de TypeScript**
```powershell
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build:dev
```

---

## 🎯 **PRÓXIMO PASSO:**

Execute **ambos** os comandos em terminais separados:

**Terminal 1:**
```powershell
cd backend
npm run dev
```

**Terminal 2:**
```powershell
cd frontend
npm run web
```

---

## 🎉 **Resultado Esperado:**

✅ **Backend rodando na porta 5000**  
✅ **Frontend rodando na porta 3000**  
✅ **Aplicação acessível em http://localhost:3000**  
✅ **API acessível em http://localhost:5000**  

**Agora você poderá testar todas as telas e funcionalidades do DOM v2! 🚀**
