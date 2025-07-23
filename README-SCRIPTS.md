# 📋 SCRIPTS DE INSTALAÇÃO DOM v2

## 🎯 **SCRIPTS DISPONÍVEIS**

### **1. `install-dom-v2.ps1`**
**Função:** Instalar dependências e compilar o projeto
```powershell
.\install-dom-v2.ps1
```

### **2. `setup-database.ps1`**
**Função:** Configurar banco de dados PostgreSQL
```powershell
.\setup-database.ps1
```

### **3. `run-dom-v2.ps1`**
**Função:** Executar serviços backend e frontend
```powershell
.\run-dom-v2.ps1
```

### **4. `run-dom-v2-web.ps1`**
**Função:** Executar serviços backend e frontend web
```powershell
.\run-dom-v2-web.ps1
```

### **5. `run-dom-v2-web-fixed.ps1`**
**Função:** Executar serviços web com Metro bundler corrigido
```powershell
.\run-dom-v2-web-fixed.ps1
```

### **6. `test-metro-web.ps1`**
**Função:** Testar Metro bundler web
```powershell
.\test-metro-web.ps1
```

### **7. `test-metro-simple.ps1`**
**Função:** Teste simples do Metro bundler
```powershell
.\test-metro-simple.ps1
```

### **8. `debug-metro-web.ps1`**
**Função:** Debug completo do Metro bundler web
```powershell
.\debug-metro-web.ps1
```

### **9. `test-bundle-web.ps1`**
**Função:** Testar build do bundle web
```powershell
.\test-bundle-web.ps1
```

### **10. `run-dom-v2-web-simple.ps1`**
**Função:** Execução web simples (recomendado)
```powershell
.\run-dom-v2-web-simple.ps1
```

### **11. `test-metro-only.ps1`**
**Função:** Teste apenas do Metro bundler
```powershell
.\test-metro-only.ps1
```

---

## 🚀 **SEQUÊNCIA DE INSTALAÇÃO**

### **PASSO 1: Instalar dependências**
```powershell
.\install-dom-v2.ps1
```

### **PASSO 2: Configurar banco**
```powershell
.\setup-database.ps1
```

### **PASSO 3: Executar serviços**
```powershell
# Para React Native (padrão):
.\run-dom-v2.ps1

# Para Web:
.\run-dom-v2-web.ps1
```

---

## 🌐 **URLS DOS SERVIÇOS**

- **Backend:** http://localhost:3001
- **Frontend React Native:** http://localhost:8081
- **Frontend Web:** http://localhost:3000
- **Metro Bundler:** http://localhost:8081
- **Health Check:** http://localhost:3001/health
- **Dashboard:** http://localhost:3001/api/dashboard

---

## ⚠️ **PRÉ-REQUISITOS**

- **Node.js 18+** instalado
- **PostgreSQL** instalado e rodando
- **Banco:** db_dom
- **Usuário:** postgres
- **Senha:** FLP*2025

---

## 🔧 **COMANDOS MANUAIS**

### **Backend:**
```powershell
cd backend
npm install
npx tsc
npm start
```

### **Frontend:**
```powershell
cd frontend
npm install
npm start
```

### **Frontend Web:**
```powershell
cd frontend
npm install
node server-web.js
```

---

**Status:** ✅ **SCRIPTS PRONTOS PARA USO** 