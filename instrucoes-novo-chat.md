# 🚀 INSTRUÇÕES PARA NOVO CHAT - DOM v2

## 📋 **COMANDO INICIAL PARA O NOVO CHAT**

**Copie e cole este comando no novo chat:**

```
Carregue todo o contexto do projeto DOM v2 e continue o desenvolvimento de onde paramos. Aplique pensamento crítico e siga as diretivas do projeto. O projeto está na Fase 5 - 100% concluída, com estratégia de integridade de dados implementada. Próximos passos: corrigir Tasks API (erro UUID), implementar Dashboard funcional, integrar frontend com dados reais.
```

---

## 🎯 **PONTOS CRÍTICOS PARA O NOVO CHAT**

### **✅ ESTADO ATUAL**
- **Estratégia de integridade de dados** implementada com sucesso
- **Seed integrado** funcionando e validado
- **100% de integridade referencial** garantida
- **APIs funcionais** retornando dados reais
- **Documentação completa** criada

### **⚠️ PROBLEMAS PENDENTES**
1. **Tasks API** - Erro de UUID (responsavel_id)
2. **Dashboard API** - Métodos undefined no controller

### **🎯 PRÓXIMOS PASSOS**
1. Corrigir Tasks API
2. Implementar Dashboard funcional
3. Integrar frontend com dados reais
4. Implementar CRUD completo

---

## ⚙️ **COMANDOS ESSENCIAIS**

### **🚀 EXECUTAR SEED INTEGRADO**
```powershell
cd C:\dom-v2\backend
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
npx prisma generate
npx tsc prisma/seed-integrated.ts --outDir dist --target es2020 --module commonjs --esModuleInterop --skipLibCheck
node dist/seed-integrated.js
```

### **🌐 INICIAR SERVIDORES**
```powershell
# Backend
cd C:\dom-v2\backend
$env:DATABASE_URL="postgresql://postgres:FLP*2025@localhost:5432/db_dom"
node dist/server-prisma.js

# Frontend
cd C:\dom-v2\frontend
npm start

# Servidor Web
cd C:\dom-v2\frontend
node server-web.js
```

### **🧪 TESTAR APIS**
```powershell
curl http://localhost:3001/api/budgets
curl http://localhost:3001/api/employees
curl http://localhost:3001/api/payroll
```

---

## 📚 **DOCUMENTAÇÃO ESSENCIAL**

### **📁 ARQUIVOS IMPORTANTES**
- `docs/estrategia-integridade-dados.md` - Estratégia técnica
- `docs/guia-uso-seed-integrado.md` - Guia prático
- `backend/prisma/seed-integrated.ts` - Seed integrado
- `backend/prisma/schema.prisma` - Schema do banco

### **🎯 INFORMAÇÕES CRÍTICAS**
- **PostgreSQL** configurado e funcionando
- **Prisma ORM** implementado e validado
- **Integridade referencial** 100% garantida
- **Zero violações** de constraints

---

## 🧠 **DIRETIVAS FUNDAMENTAIS**

### **🎯 REGRAS OBRIGATÓRIAS**
1. **Sempre usar PowerShell** com diretórios específicos
2. **Aplicar pensamento crítico** antes de implementar
3. **Pesquisar** antes de tomar decisões técnicas
4. **Documentar** todas as mudanças importantes
5. **Testar** após cada implementação

### **🛡️ GARANTIAS**
- ✅ **Zero violações de constraints**
- ✅ **100% de integridade referencial**
- ✅ **Dados sempre em estado válido**
- ✅ **APIs retornando dados reais**

---

## 📊 **DADOS DISPONÍVEIS**

### **👥 USUÁRIOS (2)**
- João Silva (Administrador)
- Maria Santos (Usuário comum)

### **👷 FUNCIONÁRIOS (3)**
- Ana Costa, Pedro Oliveira, Lucia Ferreira

### **💰 DADOS COMPLETOS**
- 3 orçamentos, 3 folhas de pagamento
- 3 pagamentos, 3 compras
- 3 notificações, 3 tarefas

---

## 🎯 **OBJETIVO DO NOVO CHAT**

**Continuar o desenvolvimento mantendo:**
- ✅ **100% de integridade** dos dados
- ✅ **Base sólida** estabelecida
- ✅ **Qualidade** do código
- ✅ **Documentação** atualizada

**Focar em:**
- 🔧 Corrigir Tasks API
- 📊 Implementar Dashboard
- 🎨 Integrar frontend
- 📱 CRUD completo

---

*Instruções criadas em: 2025-01-23*  
*Versão: 1.0.0*  
*Autor: DOM Team v2*  
*Status: ✅ Pronto para Novo Chat* 