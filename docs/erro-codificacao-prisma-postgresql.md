# Erro de Codificação Prisma PostgreSQL - DOM v2

## 🚨 **PROBLEMA IDENTIFICADO**

### **Descrição do Erro:**
- **Erro:** P1000 - Authentication failed against database server
- **Causa:** Codificação incorreta do caractere especial na senha
- **Data:** 23/07/2025
- **Versão Prisma:** 6.12.0

### **Sintomas:**
```
✖ Introspecting based on datasource defined in prisma\schema.prisma
Error: P1000
Authentication failed against database server, the provided database credentials for `postgres` are not valid.
```

### **Configuração Problemática:**
```env
# ❌ INCORRETO - Causava erro de autenticação
DATABASE_URL=postgresql://postgres:FLP%2A2025@localhost:5432/db_dom
```

## ✅ **SOLUÇÃO ENCONTRADA**

### **Configuração Correta:**
```env
# ✅ CORRETO - Funciona perfeitamente
DATABASE_URL=postgresql://postgres:FLP*2025@localhost:5432/db_dom
```

### **Hipótese Confirmada:**
- **Problema:** Codificação `%2A` para asterisco estava causando falha
- **Solução:** Usar asterisco original `*` diretamente na senha
- **Validação:** psql funcionava com asterisco original

## 🔍 **ANÁLISE TÉCNICA**

### **Por que funcionou:**
1. **psql aceita asterisco original** - Sem necessidade de codificação
2. **Prisma interpreta corretamente** - Asterisco na URL de conexão
3. **PostgreSQL não requer codificação** - Para caracteres especiais básicos
4. **Variável de ambiente carregou** - Após definir diretamente

### **Comandos de Teste:**
```powershell
# Teste de conexão psql (funcionou)
$env:PGPASSWORD="FLP*2025"
psql -h localhost -p 5432 -U postgres -d db_dom -c "SELECT version();"

# Teste Prisma (funcionou após correção)
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
npx prisma db pull
```

## 📋 **CHECKLIST DE PREVENÇÃO**

### **Antes de configurar Prisma:**
- [ ] Testar conexão via psql primeiro
- [ ] Usar senha original (sem codificação)
- [ ] Verificar se PostgreSQL aceita caracteres especiais
- [ ] Definir variável de ambiente diretamente se .env falhar

### **Sinais de alerta:**
- [ ] Erro P1000 de autenticação
- [ ] Senha com caracteres especiais codificados
- [ ] psql funciona mas Prisma falha
- [ ] Variável DATABASE_URL não carrega

## 🛠️ **PROCEDIMENTO DE RESOLUÇÃO**

### **Passo a Passo:**
1. **Testar conexão básica:**
   ```powershell
   $env:PGPASSWORD="senha_original"
   psql -h localhost -p 5432 -U postgres -d banco
   ```

2. **Configurar .env:**
   ```env
   DATABASE_URL=postgresql://usuario:senha_original@localhost:5432/banco
   ```

3. **Definir variável de ambiente:**
   ```powershell
   $env:DATABASE_URL="postgresql://usuario:senha_original@localhost:5432/banco"
   ```

4. **Testar Prisma:**
   ```powershell
   npx prisma db pull
   npx prisma generate
   ```

## 📚 **REFERÊNCIAS TÉCNICAS**

### **Documentação Prisma:**
- [Prisma Connection URLs](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Environment Variables](https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-url)

### **PostgreSQL:**
- [Connection Strings](https://www.postgresql.org/docs/current/libpq-connect.html)
- [Special Characters](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

## 🎯 **LIÇÕES APRENDIDAS**

### **Princípios:**
1. **Sempre testar conexão básica primeiro** - psql antes do Prisma
2. **Usar senha original** - Evitar codificação desnecessária
3. **Validar hipóteses** - Testar sugestões do usuário
4. **Documentar soluções** - Prevenir reincidência

### **Pensamento Crítico Aplicado:**
- ✅ **Verificação de fatos:** psql funcionava, Prisma falhava
- ✅ **Aplicação das regras:** Simplicidade extrema
- ✅ **Alinhamento estratégico:** Foco na solução
- ✅ **Contrastes e perspectivas:** Codificação vs original

## 📝 **REGISTRO DE DECISÃO**

### **Decisão Crítica:**
- **Problema:** Codificação %2A causava falha de autenticação
- **Decisão:** Usar senha original FLP*2025
- **Justificativa:** psql funcionava com asterisco original
- **Consequências:** Prisma conecta perfeitamente

### **Impacto:**
- **Tempo economizado:** Evita tentativas de codificação
- **Desenvolvimento:** Prisma funcional para substituir mocks
- **Conhecimento:** Documentado para equipe
- **Prevenção:** Evita erros futuros similares

---

**Autor:** Equipe DOM v2  
**Data:** 23/07/2025  
**Versão:** 1.0.0  
**Status:** ✅ Resolvido e Documentado 