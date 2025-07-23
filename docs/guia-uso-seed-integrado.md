# 🚀 GUIA PRÁTICO - SEED INTEGRADO DOM v2

## 📋 **VISÃO GERAL**

Este guia prático explica como usar o **Seed Integrado** implementado no DOM v2 para garantir integridade de dados e facilitar o desenvolvimento.

---

## 🎯 **QUANDO USAR O SEED INTEGRADO**

### **✅ CENÁRIOS DE USO**

1. **🆕 Novo Ambiente de Desenvolvimento**
   - Primeira configuração do projeto
   - Setup de ambiente limpo

2. **🔄 Reset de Dados**
   - Limpeza completa do banco
   - Volta ao estado inicial

3. **🧪 Testes de Integridade**
   - Validação de relacionamentos
   - Testes de constraints

4. **📊 Demonstração**
   - Apresentação do sistema
   - Dados de exemplo realistas

5. **🔧 Correção de Inconsistências**
   - Resolução de violações de constraints
   - Reparo de relacionamentos quebrados

---

## ⚙️ **COMO EXECUTAR**

### **🔧 PRÉ-REQUISITOS**

1. **PostgreSQL rodando**
2. **Banco de dados criado**
3. **Prisma configurado**
4. **Node.js instalado**

### **📝 COMANDOS PASSO A PASSO**

#### **PASSO 1: Navegar para o diretório**
```powershell
cd C:\dom-v2\backend
```

#### **PASSO 2: Configurar variável de ambiente**
```powershell
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
```

#### **PASSO 3: Gerar cliente Prisma**
```powershell
npx prisma generate
```

#### **PASSO 4: Compilar seed integrado**
```powershell
npx tsc prisma/seed-integrated.ts --outDir dist --target es2020 --module commonjs --esModuleInterop --skipLibCheck
```

#### **PASSO 5: Executar seed**
```powershell
node dist/seed-integrated.js
```

### **🎯 COMANDO COMPLETO (ONE-LINER)**
```powershell
cd C:\dom-v2\backend; $env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"; npx prisma generate; npx tsc prisma/seed-integrated.ts --outDir dist --target es2020 --module commonjs --esModuleInterop --skipLibCheck; node dist/seed-integrated.js
```

---

## 📊 **O QUE SERÁ CRIADO**

### **👥 DADOS DE USUÁRIOS**
- **2 usuários** com perfis diferentes
- **João Silva** (Administrador)
- **Maria Santos** (Usuário comum)

### **👥 GRUPOS E PERMISSÕES**
- **2 grupos** (Administradores, Usuários)
- **2 relacionamentos** usuário-grupo
- **2 sessões** de usuário

### **👷 FUNCIONALIDADES PRINCIPAIS**
- **3 funcionários** (Ana, Pedro, Lucia)
- **3 orçamentos** (Geral, Alimentação, Transporte)
- **3 folhas de pagamento** (com cálculos reais)
- **3 pagamentos** (pendentes e completados)
- **3 compras** (diferentes categorias)

### **🔔 SISTEMA DE NOTIFICAÇÕES**
- **3 notificações** (info, warning, success)
- **3 tarefas** (limpeza, jardinagem, cozinha)

---

## 🧪 **VALIDAÇÃO DOS DADOS**

### **✅ VERIFICAÇÃO AUTOMÁTICA**

O seed integrado executa verificações automáticas:

```typescript
// Logs de progresso
📝 Criando usuários...
✅ Criados 2 usuários
👥 Criando grupos...
✅ Criados 2 grupos
🔗 Criando relacionamentos usuário-grupo...
✅ Criados 2 relacionamentos usuário-grupo
// ... continua para todas as tabelas
```

### **🔍 VERIFICAÇÃO MANUAL**

#### **1. Testar APIs**
```powershell
# Budgets
curl http://localhost:3001/api/budgets

# Employees
curl http://localhost:3001/api/employees

# Payrolls
curl http://localhost:3001/api/payroll
```

#### **2. Verificar Banco de Dados**
```sql
-- Contar registros por tabela
SELECT 'users' as tabela, COUNT(*) as total FROM users
UNION ALL
SELECT 'employees', COUNT(*) FROM employees
UNION ALL
SELECT 'budgets', COUNT(*) FROM budgets
UNION ALL
SELECT 'payrolls', COUNT(*) FROM payrolls;
```

#### **3. Validar Relacionamentos**
```sql
-- Verificar integridade referencial
SELECT COUNT(*) as violacoes 
FROM budgets b 
LEFT JOIN users u ON b.user_id = u.id 
WHERE u.id IS NULL;
-- Resultado esperado: 0
```

---

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **❌ ERRO: Prisma Client não inicializado**
```bash
Error: @prisma/client did not initialize yet
```

**Solução:**
```powershell
npx prisma generate
```

### **❌ ERRO: UUID inválido**
```bash
Error creating UUID, invalid character
```

**Solução:**
- Verificar formato dos IDs
- Remover campos opcionais problemáticos
- Reexecutar seed

### **❌ ERRO: Chave estrangeira violada**
```bash
Foreign key constraint failed
```

**Solução:**
- Verificar ordem de criação
- Limpar banco antes de reexecutar
- Validar dados de entrada

### **❌ ERRO: Conexão com banco**
```bash
Connection refused
```

**Solução:**
- Verificar se PostgreSQL está rodando
- Validar DATABASE_URL
- Testar conexão manualmente

---

## 🔄 **RESET COMPLETO**

### **🔄 LIMPAR E RECRIAR TUDO**

#### **PASSO 1: Parar servidor**
```powershell
# Ctrl+C no terminal do servidor
```

#### **PASSO 2: Reset do banco**
```powershell
cd C:\dom-v2\backend
npx prisma migrate reset --force
```

#### **PASSO 3: Aplicar migrações**
```powershell
npx prisma migrate deploy
```

#### **PASSO 4: Executar seed integrado**
```powershell
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
npx prisma generate
npx tsc prisma/seed-integrated.ts --outDir dist --target es2020 --module commonjs --esModuleInterop --skipLibCheck
node dist/seed-integrated.js
```

#### **PASSO 5: Reiniciar servidor**
```powershell
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
node dist/server-prisma.js
```

---

## 📈 **MONITORAMENTO**

### **📊 LOGS ESPERADOS**

```bash
🌱 Iniciando seed integrado do banco de dados...
📝 Criando usuários...
✅ Criados 2 usuários
👥 Criando grupos...
✅ Criados 2 grupos
🔗 Criando relacionamentos usuário-grupo...
✅ Criados 2 relacionamentos usuário-grupo
👷 Criando funcionários...
✅ Criados 3 funcionários
💰 Criando orçamentos...
✅ Criados 3 orçamentos
💼 Criando folhas de pagamento...
✅ Criados 3 registros de folha de pagamento
💳 Criando pagamentos...
✅ Criados 3 pagamentos
🛒 Criando compras...
✅ Criados 3 compras
🔔 Criando notificações...
✅ Criadas 3 notificações
📋 Criando tarefas...
✅ Criadas 3 tarefas
🔐 Criando sessões de usuário...
✅ Criadas 2 sessões de usuário
🎉 Seed integrado concluído com sucesso!
```

### **📊 RESUMO FINAL**
```
📊 Resumo dos dados criados:
   - 2 usuários
   - 2 grupos
   - 2 relacionamentos usuário-grupo
   - 3 funcionários
   - 3 orçamentos
   - 3 folhas de pagamento
   - 3 pagamentos
   - 3 compras
   - 3 notificações
   - 3 tarefas
   - 2 sessões de usuário
```

---

## 🎯 **BEST PRACTICES**

### **✅ RECOMENDAÇÕES**

1. **🔄 Sempre fazer backup antes**
   - Dados importantes podem ser perdidos
   - Use `pg_dump` se necessário

2. **🧪 Testar em ambiente isolado**
   - Use banco de desenvolvimento
   - Evite executar em produção

3. **📝 Documentar mudanças**
   - Registre modificações no seed
   - Mantenha histórico de versões

4. **🔍 Validar após execução**
   - Teste APIs principais
   - Verifique relacionamentos

5. **⚡ Otimizar para performance**
   - Use transações quando possível
   - Evite operações desnecessárias

### **❌ EVITAR**

1. **🚫 Executar em produção sem backup**
2. **🚫 Modificar seed sem testar**
3. **🚫 Ignorar logs de erro**
4. **🚫 Executar sem verificar pré-requisitos**
5. **🚫 Usar dados sensíveis no seed**

---

## 🔮 **PRÓXIMOS PASSOS**

### **🎯 APÓS EXECUTAR O SEED**

1. **🧪 Testar todas as APIs**
   ```powershell
   curl http://localhost:3001/api/budgets
   curl http://localhost:3001/api/employees
   curl http://localhost:3001/api/payroll
   ```

2. **🎨 Integrar com frontend**
   - Conectar micro-frontends
   - Testar interface

3. **📊 Implementar dashboard**
   - Usar dados integrados
   - Criar visualizações

4. **🔧 Corrigir problemas identificados**
   - Tasks API (erro UUID)
   - Dashboard API

---

## 📞 **SUPORTE**

### **🔗 DOCUMENTAÇÃO RELACIONADA**
- [Estratégia de Integridade de Dados](./estrategia-integridade-dados.md)
- [Schema Prisma](../backend/prisma/schema.prisma)
- [Seed Integrado](../backend/prisma/seed-integrated.ts)

### **🚨 EM CASO DE PROBLEMAS**
1. Verificar logs de erro
2. Validar pré-requisitos
3. Consultar documentação
4. Executar reset completo se necessário

---

*Guia criado em: 2025-01-23*  
*Versão: 1.0.0*  
*Autor: DOM Team v2*  
*Status: ✅ Ativo e Funcional* 