# 🚀 CONTEXTO RÁPIDO - PROJETO DOM v2
**COPIE E COLE ESTE TEXTO NO INÍCIO DO NOVO CHAT**

---

## 📋 INFORMAÇÕES CRÍTICAS

**PROJETO:** DOM v2 - Sistema de Gestão Doméstica  
**DIRETÓRIO:** C:\dom-v2  
**STATUS:** ✅ VALIDAÇÃO COMPLETAMENTE APROVADA (30 sucessos, 0 erros, 0 avisos)  
**ÚLTIMA ATUALIZAÇÃO:** 19/12/2024  

## 🚨 REGRAS OBRIGATÓRIAS (CRÍTICAS)

### 1. COMANDOS TERMINAL
- **SEMPRE usar PowerShell** (não bash/cmd)
- **SEMPRE informar diretório** onde o comando deve ser executado
- **SEMPRE usar Set-Location** para navegação
- **SEMPRE validar diretório** antes de qualquer comando

### 2. VALIDAÇÕES OBRIGATÓRIAS
- **SEMPRE executar `npm run validate`** antes de implementar
- **SEMPRE corrigir erros** antes de continuar
- **SEMPRE verificar diretório** C:\dom-v2

### 3. EXEMPLOS DE COMANDOS CORRETOS
```powershell
# ✅ CORRETO
Set-Location C:\dom-v2
npm run validate

# ❌ INCORRETO
cd /c/dom-v2
npm run validate
```

## 🏗️ STACK TECNOLÓGICA

- **Backend:** Node.js + Express + TypeScript + Prisma + PostgreSQL
- **Frontend:** React Native + TypeScript
- **Validação:** Scripts automatizados de qualidade

## 👥 PERFIS DE USUÁRIO (7 TIPOS)

1. **EMPLOYER** - Empregadores (mulheres 35-50 anos)
2. **EMPLOYEE** - Empregados Domésticos (mulheres 30-60 anos)
3. **FAMILY** - Familiares (15-70 anos)
4. **PARTNER** - Parceiros (donos de negócios)
5. **SUBORDINATE** - Subordinados (funcionários dos parceiros)
6. **ADMIN** - Administradores (suporte técnico)
7. **OWNER** - Donos (fundadores)

## ✅ IMPLEMENTAÇÕES CONCLUÍDAS

### Estrutura do Projeto
- ✅ Todos os diretórios obrigatórios criados
- ✅ Cabeçalhos JSDoc em todos os arquivos
- ✅ TypeScript rigoroso (sem `any`)
- ✅ Prisma configurado com schema completo
- ✅ Banco de dados PostgreSQL configurado

### Frontend
- ✅ App.tsx com perfis de usuário tipados
- ✅ LoginScreen com tooltips e mensagens centralizadas
- ✅ TasksScreen com tooltips e mensagens centralizadas
- ✅ Sistema de mensagens centralizadas (`frontend/src/utils/messages.ts`)

### Backend
- ✅ Server.ts configurado
- ✅ Database.ts com Prisma Client
- ✅ Schema do banco com todos os modelos
- ✅ Modelos para os 7 perfis de usuário

### Validação
- ✅ Script de validação funcionando
- ✅ 30 verificações passando
- ✅ 0 erros, 0 avisos

## 📁 ESTRUTURA DE ARQUIVOS IMPORTANTES

```
dom-v2/
├── backend/
│   ├── src/
│   │   ├── server.ts ✅
│   │   └── database.ts ✅
│   └── prisma/
│       └── schema.prisma ✅
├── frontend/
│   ├── App.tsx ✅
│   └── src/
│       ├── screens/
│       │   ├── LoginScreen.tsx ✅
│       │   └── TasksScreen.tsx ✅
│       └── utils/
│           └── messages.ts ✅
├── docs/
│   ├── REGRAS_CRITICAS_POWERSHELL.md ✅
│   └── STATUS_ATUAL_PROJETO.md ✅
└── scripts/
    └── validate-rules.js ✅
```

## 🚀 PRÓXIMOS PASSOS SUGERIDOS

### Prioridade Alta
1. Configurar banco de dados PostgreSQL local
2. Implementar APIs RESTful no backend
3. Implementar autenticação JWT
4. Conectar frontend com backend

### Prioridade Média
1. Implementar funcionalidades específicas por perfil
2. Criar sistema de notificações
3. Implementar validações de formulário
4. Criar testes automatizados

## ⚠️ GATILHOS DE PARADA

- ❌ Diretório incorreto
- ❌ Validação falhou
- ❌ Comando não-PowerShell usado
- ❌ Regras violadas

## 📞 COMANDOS DE VERIFICAÇÃO RÁPIDA

```powershell
# 1. Verificar diretório
Set-Location C:\dom-v2
Get-Location

# 2. Executar validação
npm run validate

# 3. Verificar estrutura
Get-ChildItem -Directory

# 4. Verificar status do projeto
Get-Content docs/STATUS_ATUAL_PROJETO.md
```

---

**🎯 OBJETIVO:** Continuar desenvolvimento mantendo 100% de conformidade com as regras estabelecidas.

**📋 CHECKLIST ANTES DE IMPLEMENTAR:**
1. [ ] Validar diretório (C:\dom-v2)
2. [ ] Executar `npm run validate`
3. [ ] Corrigir TODOS os erros
4. [ ] Verificar avisos
5. [ ] Implementar seguindo regras
6. [ ] Testar funcionalidade
7. [ ] Documentar mudanças

---

**💡 DICA:** Sempre comece executando `npm run validate` para verificar o status atual do projeto! 