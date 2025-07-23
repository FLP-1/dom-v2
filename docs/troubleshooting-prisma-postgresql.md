# 🔧 Troubleshooting Prisma PostgreSQL - DOM v2

## 🚨 **PROBLEMAS COMUNS E SOLUÇÕES RÁPIDAS**

### **1. Erro P1000 - Authentication Failed**

#### **Sintomas:**
```
Error: P1000
Authentication failed against database server, the provided database credentials for `postgres` are not valid.
```

#### **Soluções:**
1. **Testar conexão básica primeiro:**
   ```powershell
   $env:PGPASSWORD="senha_original"
   psql -h localhost -p 5432 -U postgres -d banco -c "SELECT version();"
   ```

2. **Usar senha original (sem codificação):**
   ```env
   # ✅ CORRETO
   DATABASE_URL=postgresql://postgres:FLP*2025@localhost:5432/db_dom
   
   # ❌ INCORRETO
   DATABASE_URL=postgresql://postgres:FLP%2A2025@localhost:5432/db_dom
   ```

3. **Definir variável diretamente:**
   ```powershell
   $env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
   ```

### **2. Erro P1012 - Environment Variable Not Found**

#### **Sintomas:**
```
Error: P1012
Environment variable not found: DATABASE_URL.
```

#### **Soluções:**
1. **Verificar arquivo .env:**
   ```powershell
   Get-Content .env
   ```

2. **Criar arquivo .env:**
   ```powershell
   echo "DATABASE_URL=postgresql://postgres:FLP*2025@localhost:5432/db_dom" > .env
   ```

3. **Definir variável de ambiente:**
   ```powershell
   $env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
   ```

### **3. PostgreSQL Não Está Rodando**

#### **Sintomas:**
```
psql: erro: a conexão com o servidor em "localhost" falhou
```

#### **Soluções:**
1. **Verificar serviço:**
   ```powershell
   Get-Service -Name "*postgres*"
   ```

2. **Verificar porta:**
   ```powershell
   netstat -an | findstr :5432
   ```

3. **Iniciar serviço:**
   ```powershell
   Start-Service postgresql-x64-17
   ```

## 📋 **CHECKLIST DE DIAGNÓSTICO**

### **Passo a Passo:**
1. **✅ PostgreSQL rodando?**
   ```powershell
   netstat -an | findstr :5432
   ```

2. **✅ Conexão psql funciona?**
   ```powershell
   $env:PGPASSWORD="senha"
   psql -h localhost -p 5432 -U postgres -d banco
   ```

3. **✅ Arquivo .env existe?**
   ```powershell
   Get-Content .env
   ```

4. **✅ Variável DATABASE_URL definida?**
   ```powershell
   echo $env:DATABASE_URL
   ```

5. **✅ Prisma conecta?**
   ```powershell
   npx prisma db pull
   ```

## 🎯 **SOLUÇÕES RÁPIDAS**

### **Para Erro de Autenticação:**
```powershell
# 1. Testar psql
$env:PGPASSWORD="FLP*2025"
psql -h localhost -p 5432 -U postgres -d db_dom

# 2. Configurar Prisma
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
npx prisma db pull
npx prisma generate
```

### **Para Variável Não Encontrada:**
```powershell
# 1. Criar .env
echo "DATABASE_URL=postgresql://postgres:FLP*2025@localhost:5432/db_dom" > .env

# 2. Definir variável
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"

# 3. Testar
npx prisma db pull
```

### **Para PostgreSQL Parado:**
```powershell
# 1. Verificar serviço
Get-Service -Name "*postgres*"

# 2. Iniciar se necessário
Start-Service postgresql-x64-17

# 3. Verificar porta
netstat -an | findstr :5432
```

## 📚 **REFERÊNCIAS**

- **Documentação completa:** `docs/erro-codificacao-prisma-postgresql.md`
- **Registro de decisões:** `docs/registro-decisoes-criticas.md`
- **Prisma Docs:** https://www.prisma.io/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs

---

**Última atualização:** 23/07/2025  
**Versão:** 1.0.0  
**Status:** ✅ Ativo e Funcional 