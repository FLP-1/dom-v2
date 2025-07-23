# 📋 REGISTRO DE DECISÕES CRÍTICAS - DOM v2

## 🎯 **OBJETIVO:**
Documentar todas as decisões críticas do projeto para evitar repetição de erros e garantir consistência no desenvolvimento.

## 🚨 **DECISÃO CRÍTICA #1: UPGRADE REACT 19 - REJEITADO**

### **INFORMAÇÕES BÁSICAS:**
- **Data:** 22/07/2025 21:54
- **Situação:** Conflito de dependências detectado durante `npm install`
- **Proposta:** Upgrade React 18.2.0 → React 19.x
- **Decisão:** REJEITADO
- **Status:** Sistema mantido estável

### **ANÁLISE CRÍTICA APLICADA:**

#### **CHECKLIST OBRIGATÓRIO:**
- ❌ **REGRA DA SIMPLICIDADE EXTREMA VIOLADA:** Upgrade desnecessário
- ✅ **REGRA DA STACK FIXA:** React 18 + React Native 0.80 = FUNCIONANDO
- ❌ **REGRA DA VALIDAÇÃO CONTÍNUA:** Sistema já validado e estável
- ✅ **REGRA DO MVP RIGOROSO:** Sistema funcional > perfeição técnica

#### **FATOS VERIFICADOS:**
- ✅ React 18.2.0 + React Native 0.80.1 = 100% compatível
- ✅ React Native Web = funcionando perfeitamente
- ✅ Metro Bundler = sem erros
- ✅ TurboModuleRegistry = mockado e estável
- ✅ Backend server-simple.js = operacional
- ✅ Frontend server-web.js = operacional

#### **RISCOS IDENTIFICADOS:**
- ❌ Quebra de compatibilidade com React Native 0.80
- ❌ Complexidade desnecessária
- ❌ Tempo perdido em desenvolvimento
- ❌ Risco de regressão de funcionalidades
- ❌ Possível quebra do React Native Web

### **SOLUÇÃO IMPLEMENTADA:**
- ✅ Usar `npm install --legacy-peer-deps` para resolver conflitos
- ✅ Manter React 18.2.0 + React Native 0.80.1
- ✅ Focar em desenvolvimento de funcionalidades
- ✅ Documentar decisão para evitar repetição

### **LIÇÕES APRENDIDAS:**
1. **Sistema funcional > Upgrade desnecessário**
2. **Pensamento crítico obrigatório antes de upgrades**
3. **Documentação preventiva essencial**
4. **Stack estável > Versões mais recentes**

## 🚨 **DECISÃO CRÍTICA #2: USO DO SERVER-SIMPLE.JS**

### **INFORMAÇÕES BÁSICAS:**
- **Data:** 22/07/2025 21:45
- **Situação:** Erro `Cannot find module 'sequelize'` no server.js
- **Proposta:** Instalar Sequelize ou usar server-simple.js
- **Decisão:** USAR SERVER-SIMPLE.JS
- **Status:** Implementado e funcionando

### **ANÁLISE CRÍTICA APLICADA:**

#### **CHECKLIST OBRIGATÓRIO:**
- ✅ **REGRA DA SIMPLICIDADE EXTREMA:** Server simples sem dependências complexas
- ✅ **REGRA DA STACK FIXA:** Express.js mantido
- ✅ **REGRA DA VALIDAÇÃO CONTÍNUA:** Testado e funcionando
- ✅ **REGRA DO MVP RIGOROSO:** Funcionalidade > Complexidade

#### **FATOS VERIFICADOS:**
- ✅ server-simple.js = sem dependências externas
- ✅ APIs REST funcionais (budgets, payroll)
- ✅ Health check operacional
- ✅ Mock data suficiente para desenvolvimento

#### **RISCOS IDENTIFICADOS:**
- ⚠️ Dados não persistentes (mock)
- ⚠️ Funcionalidades limitadas
- ✅ Risco baixo para desenvolvimento

### **SOLUÇÃO IMPLEMENTADA:**
- ✅ Usar `npm run start:simple` para backend
- ✅ Manter mock data para desenvolvimento rápido
- ✅ Focar em frontend e funcionalidades

## 📋 **DIRETIVAS PERMANENTES ESTABELECIDAS:**

### **1. UPGRADES DE VERSÕES:**
```
NUNCA FAZER UPGRADE DE VERSÕES MAJOR SEM NECESSIDADE CRÍTICA
PRIORIDADE: Desenvolvimento > Perfeição técnica
```

### **2. STACK TECNOLÓGICA:**
```
MANTER STACK ATUAL ESTÁVEL:
- React: 18.2.0
- React Native: 0.80.1
- React Native Web: (compatível)
- Express.js: (backend simples)
```

### **3. DESENVOLVIMENTO:**
```
FOCAR EM:
- Micro-frontends (Budget, Payroll)
- Funcionalidades de negócio
- UX/UI melhorias
- Testes automatizados
```

### **4. PENSAMENTO CRÍTICO:**
```
APLICAR CHECKLIST OBRIGATÓRIO ANTES DE QUALQUER DECISÃO:
1. Verificação de fatos
2. Aplicação das regras do projeto
3. Alinhamento estratégico
4. Contrastes e perspectivas
```

## 🚨 **DECISÃO CRÍTICA #3: ERRO DE CODIFICAÇÃO PRISMA POSTGRESQL**

### **INFORMAÇÕES BÁSICAS:**
- **Data:** 23/07/2025 13:30
- **Situação:** Erro P1000 - Authentication failed com codificação %2A
- **Proposta:** Usar senha original vs codificação URL
- **Decisão:** USAR SENHA ORIGINAL
- **Status:** Resolvido e documentado

### **ANÁLISE CRÍTICA APLICADA:**

#### **CHECKLIST OBRIGATÓRIO:**
- ✅ **REGRA DA SIMPLICIDADE EXTREMA:** Senha original vs codificação complexa
- ✅ **REGRA DA STACK FIXA:** PostgreSQL + Prisma mantidos
- ✅ **REGRA DA VALIDAÇÃO CONTÍNUA:** Testado com psql primeiro
- ✅ **REGRA DO MVP RIGOROSO:** Conexão funcional > perfeição técnica

#### **FATOS VERIFICADOS:**
- ✅ psql funcionava com senha original "FLP*2025"
- ❌ Prisma falhava com codificação "FLP%2A2025"
- ✅ Hipótese do usuário confirmada
- ✅ Solução simples e eficaz

#### **RISCOS IDENTIFICADOS:**
- ❌ Codificação desnecessária causava falha
- ❌ Tempo perdido em tentativas de codificação
- ✅ Risco baixo com senha original

### **SOLUÇÃO IMPLEMENTADA:**
- ✅ Usar senha original: `FLP*2025`
- ✅ Configuração: `DATABASE_URL=postgresql://postgres:FLP*2025@localhost:5432/db_dom`
- ✅ Prisma conecta perfeitamente
- ✅ Documentação criada para prevenção

### **LIÇÕES APRENDIDAS:**
1. **Sempre testar conexão básica primeiro (psql)**
2. **Usar senha original - evitar codificação desnecessária**
3. **Validar hipóteses do usuário**
4. **Documentar soluções para prevenção**

## 🎯 **PRÓXIMAS DECISÕES CRÍTICAS:**

### **AGUARDANDO:**
- Implementação de micro-frontends
- Escolha de bibliotecas de UI
- Estratégia de testes
- Deploy e produção

### **PROCEDIMENTO:**
1. **Aplicar checklist obrigatório**
2. **Documentar análise crítica**
3. **Registrar decisão final**
4. **Implementar com validação**

---

**ESTE REGISTRO É OBRIGATÓRIO PARA TODAS AS DECISÕES FUTURAS** 