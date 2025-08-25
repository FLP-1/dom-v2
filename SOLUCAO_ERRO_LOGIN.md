# 🔧 SOLUÇÃO PARA ERRO DE LOGIN - DOM v2

## **📅 Data: 24/08/2025**

### **❌ PROBLEMA IDENTIFICADO**

Os CPFs estão retornando erro 401 (Unauthorized) no console do navegador, indicando que:
- O backend não está rodando corretamente
- O banco de dados não foi populado
- Há problema na autenticação

---

## **🔍 DIAGNÓSTICO**

### **1. Verificar se o Backend está Rodando**
```powershell
# Verificar se a porta 3001 está em uso
netstat -ano | findstr ":3001"

# Se não estiver rodando, iniciar o backend
cd backend
npm run dev
```

### **2. Verificar se o Banco foi Populado**
```powershell
# Executar o seed do banco
cd backend
npm run seed

# Ou executar diretamente
ts-node scripts/seed-database.ts
```

### **3. Verificar Configurações do Banco**
- Verificar se o arquivo `.env` existe no backend
- Verificar se a URL do banco está correta
- Verificar se o PostgreSQL está rodando

---

## **🛠️ SOLUÇÃO PASSO A PASSO**

### **Passo 1: Verificar e Criar Arquivo .env**

Criar arquivo `backend/.env` com o seguinte conteúdo:

```env
# Configurações do Banco de Dados
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dom_v2"

# Configurações do JWT
JWT_SECRET="dom-v2-secret-key-change-in-production"

# Configurações do Servidor
PORT=3001
NODE_ENV=development
```

### **Passo 2: Verificar PostgreSQL**

```powershell
# Verificar se o PostgreSQL está rodando
netstat -ano | findstr ":5432"

# Se não estiver rodando, iniciar o serviço
# (Depende da instalação do PostgreSQL)
```

### **Passo 3: Limpar e Re-popular o Banco**

```powershell
cd backend

# Limpar o banco
npm run clear

# Popular o banco
npm run seed

# Ou fazer tudo de uma vez
npm run reset
```

### **Passo 4: Iniciar o Backend**

```powershell
cd backend
npm run dev
```

### **Passo 5: Iniciar o Frontend**

```powershell
cd frontend
npm start
```

### **Passo 6: Testar o Login**

1. Acessar `http://localhost:3000`
2. Usar as credenciais:
   - **Admin:** `111.444.777-35` / `admin123`
   - **User:** `123.456.789-09` / `user123`

---

## **🔧 COMANDOS DE VERIFICAÇÃO**

### **Verificar Status dos Serviços**
```powershell
# Backend
netstat -ano | findstr ":3001"

# Frontend
netstat -ano | findstr ":3000"

# PostgreSQL
netstat -ano | findstr ":5432"
```

### **Verificar Logs do Backend**
```powershell
cd backend
npm run dev
# Observar os logs no terminal
```

### **Testar Endpoint de Login**
```powershell
# Usando curl (se disponível)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"cpf":"11144477735","password":"admin123"}'
```

---

## **🐛 POSSÍVEIS CAUSAS DO ERRO**

### **1. Backend não Iniciado**
- **Sintoma:** Erro de conexão recusada
- **Solução:** Iniciar o backend com `npm run dev`

### **2. Banco não Populado**
- **Sintoma:** Usuário não encontrado
- **Solução:** Executar `npm run seed`

### **3. Configuração de Banco Incorreta**
- **Sintoma:** Erro de conexão com banco
- **Solução:** Verificar arquivo `.env` e PostgreSQL

### **4. Problema com Dependências**
- **Sintoma:** Erro de módulo não encontrado
- **Solução:** Executar `npm install`

### **5. Problema com Prisma**
- **Sintoma:** Erro de schema
- **Solução:** Executar `npx prisma db push`

---

## **✅ VERIFICAÇÃO FINAL**

Após seguir todos os passos, verificar:

1. **Backend rodando** na porta 3001
2. **Frontend rodando** na porta 3000
3. **PostgreSQL rodando** na porta 5432
4. **Banco populado** com usuários de teste
5. **Login funcionando** com credenciais válidas

### **Credenciais de Teste:**
- **Admin:** `111.444.777-35` / `admin123`
- **User:** `123.456.789-09` / `user123`

---

## **📞 SUPORTE**

Se o problema persistir:

1. Verificar logs do backend no terminal
2. Verificar console do navegador (F12)
3. Verificar se todas as dependências estão instaladas
4. Verificar se o PostgreSQL está configurado corretamente

---

**🎯 Siga estes passos na ordem para resolver o problema de login!**
