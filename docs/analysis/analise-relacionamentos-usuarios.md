# 🔗 Análise dos Relacionamentos entre Usuários - DOM v2

## 🎯 **PROBLEMA IDENTIFICADO**

### **Situação Atual:**
O banco de dados atual **NÃO reflete** a complexidade real das relações domésticas. O modelo é muito simplificado e não permite que um usuário tenha múltiplos perfis em diferentes contextos.

### **Realidade que Devemos Suportar:**
Um usuário (CPF) pode ser:
1. **Empregador** na sua própria família
2. **Familiar** na família dos seus pais
3. **Empregado** em famílias de terceiros
4. **Parceiro** do sistema
5. **Funcionário** de um parceiro
6. **Dono** do sistema (você)

---

## 📊 **ANÁLISE DO SCHEMA ATUAL**

### **Problemas Identificados:**

#### **1. Modelo Simplificado**
```sql
-- Atual: Um usuário tem apenas UM perfil
users.profile = 'employer' | 'employee' | 'family' | 'partner'
```

#### **2. Relacionamentos Faltantes**
- ❌ Não há relacionamento entre empregadores e empregados
- ❌ Não há relacionamento entre parceiros e empregadores
- ❌ Não há relacionamento entre familiares e empregadores
- ❌ Não há suporte para múltiplos perfis por usuário

#### **3. Dados de Teste Limitados**
- ✅ Apenas 1 empregador
- ✅ 3 funcionários vinculados ao mesmo empregador
- ❌ Não há cenários complexos de relacionamentos

---

## 🏗️ **PROPOSTA DE SOLUÇÃO**

### **1. Novo Modelo de Relacionamentos**

#### **Tabela: `user_roles` (Novos Perfis)**
```sql
CREATE TABLE user_roles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  role_type VARCHAR(50), -- 'employer', 'employee', 'family', 'partner', 'system_owner'
  context_id UUID, -- ID do contexto (família, empresa, etc.)
  context_type VARCHAR(50), -- 'family', 'business', 'system'
  permissions JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **Tabela: `domestic_contexts` (Contextos Domésticos)**
```sql
CREATE TABLE domestic_contexts (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  type VARCHAR(50), -- 'family', 'business', 'partnership'
  owner_id UUID REFERENCES users(id),
  members JSONB, -- Lista de membros e seus papéis
  settings JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **Tabela: `employment_relationships` (Relacionamentos de Trabalho)**
```sql
CREATE TABLE employment_relationships (
  id UUID PRIMARY KEY,
  employer_id UUID REFERENCES users(id),
  employee_id UUID REFERENCES users(id),
  context_id UUID REFERENCES domestic_contexts(id),
  position VARCHAR(100),
  salary DECIMAL(10,2),
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'active',
  contract_type VARCHAR(50), -- 'formal', 'informal', 'temporary'
  permissions JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **Tabela: `family_relationships` (Relacionamentos Familiares)**
```sql
CREATE TABLE family_relationships (
  id UUID PRIMARY KEY,
  family_context_id UUID REFERENCES domestic_contexts(id),
  member_id UUID REFERENCES users(id),
  relationship_type VARCHAR(50), -- 'spouse', 'child', 'parent', 'sibling'
  permissions JSONB,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎭 **CENÁRIOS COMPLEXOS SUPORTADOS**

### **Cenário 1: Maria - Múltiplos Papéis**
```json
{
  "user": {
    "id": "user_maria_123",
    "name": "Maria Santos",
    "cpf": "12345678901"
  },
  "roles": [
    {
      "role_type": "employer",
      "context": "Família Silva",
      "permissions": ["manage_employees", "view_finances", "manage_tasks"]
    },
    {
      "role_type": "family",
      "context": "Família Santos (pais)",
      "permissions": ["view_tasks", "participate_chat"]
    },
    {
      "role_type": "employee",
      "context": "Casa da Dona Rosa",
      "permissions": ["view_my_tasks", "clock_in_out"],
      "position": "Babá"
    }
  ]
}
```

### **Cenário 2: João - Empregador e Parceiro**
```json
{
  "user": {
    "id": "user_joao_456",
    "name": "João Silva",
    "cpf": "98765432100"
  },
  "roles": [
    {
      "role_type": "employer",
      "context": "Família Silva",
      "permissions": ["admin", "financeiro", "rh"]
    },
    {
      "role_type": "partner",
      "context": "Sistema DOM v2",
      "permissions": ["manage_clients", "view_commissions", "white_label"]
    }
  ]
}
```

### **Cenário 3: Ana - Funcionária e Cliente**
```json
{
  "user": {
    "id": "user_ana_789",
    "name": "Ana Costa",
    "cpf": "11122233344"
  },
  "roles": [
    {
      "role_type": "employee",
      "context": "Família Silva",
      "permissions": ["view_my_tasks", "clock_in_out"],
      "position": "Empregada Doméstica"
    },
    {
      "role_type": "employer",
      "context": "Família Costa",
      "permissions": ["manage_employees", "view_finances"],
      "employees": ["babá_maria", "jardineiro_carlos"]
    }
  ]
}
```

---

## 🔧 **IMPLEMENTAÇÃO TÉCNICA**

### **1. Migração do Schema**
```typescript
// Nova estrutura no Prisma
model UserRole {
  id          String   @id @default(cuid())
  userId      String   @db.Uuid
  roleType    String   @db.VarChar(50)
  contextId   String?  @db.Uuid
  contextType String?  @db.VarChar(50)
  permissions Json     @default("{}")
  active      Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now())
  
  user        users    @relation(fields: [userId], references: [id])
  context     DomesticContext? @relation(fields: [contextId], references: [id])
  
  @@unique([userId, roleType, contextId])
}

model DomesticContext {
  id        String   @id @default(cuid())
  name      String   @db.VarChar(255)
  type      String   @db.VarChar(50)
  ownerId   String   @db.Uuid
  members   Json     @default("[]")
  settings  Json     @default("{}")
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  
  owner     users      @relation(fields: [ownerId], references: [id])
  roles     UserRole[]
  employments EmploymentRelationship[]
  families   FamilyRelationship[]
}

model EmploymentRelationship {
  id           String   @id @default(cuid())
  employerId   String   @db.Uuid
  employeeId   String   @db.Uuid
  contextId    String   @db.Uuid
  position     String   @db.VarChar(100)
  salary       Decimal  @db.Decimal(10, 2)
  startDate    DateTime @db.Date
  endDate      DateTime? @db.Date
  status       String   @default("active") @db.VarChar(20)
  contractType String   @db.VarChar(50)
  permissions  Json     @default("{}")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @default(now())
  
  employer    users            @relation("EmploymentEmployer", fields: [employerId], references: [id])
  employee    users            @relation("EmploymentEmployee", fields: [employeeId], references: [id])
  context     DomesticContext  @relation(fields: [contextId], references: [id])
  
  @@unique([employerId, employeeId, contextId])
}

model FamilyRelationship {
  id               String   @id @default(cuid())
  familyContextId  String   @db.Uuid
  memberId         String   @db.Uuid
  relationshipType String   @db.VarChar(50)
  permissions      Json     @default("{}")
  active           Boolean  @default(true)
  createdAt        DateTime @default(now())
  
  familyContext    DomesticContext @relation(fields: [familyContextId], references: [id])
  member           users           @relation(fields: [memberId], references: [id])
  
  @@unique([familyContextId, memberId])
}
```

### **2. Atualização do Modelo Users**
```typescript
model users {
  // ... campos existentes ...
  
  // Novos relacionamentos
  roles                    UserRole[]
  ownedContexts           DomesticContext[]
  employmentAsEmployer    EmploymentRelationship[] @relation("EmploymentEmployer")
  employmentAsEmployee    EmploymentRelationship[] @relation("EmploymentEmployee")
  familyMemberships       FamilyRelationship[]
}
```

---

## 📈 **DADOS DE TESTE COMPLEXOS**

### **Seed Avançado com Cenários Reais**
```typescript
// Cenário 1: Família Silva (Empregadores)
const familiaSilva = await prisma.domesticContext.create({
  data: {
    name: "Família Silva",
    type: "family",
    ownerId: joaoSilva.id,
    members: [
      { userId: joaoSilva.id, role: "owner" },
      { userId: mariaSilva.id, role: "spouse" },
      { userId: pedroSilva.id, role: "child" }
    ]
  }
});

// Cenário 2: Ana Costa trabalha para Silva mas é empregadora
const anaCosta = await prisma.users.create({
  data: {
    name: "Ana Costa",
    cpf: "11122233344",
    profile: "employee" // Perfil principal
  }
});

// Ana como funcionária da Família Silva
await prisma.employmentRelationship.create({
  data: {
    employerId: joaoSilva.id,
    employeeId: anaCosta.id,
    contextId: familiaSilva.id,
    position: "Empregada Doméstica",
    salary: 1500.00,
    startDate: new Date("2024-01-01"),
    contractType: "formal"
  }
});

// Ana como empregadora da Família Costa
const familiaCosta = await prisma.domesticContext.create({
  data: {
    name: "Família Costa",
    type: "family",
    ownerId: anaCosta.id
  }
});

// Ana contrata uma babá
const babáMaria = await prisma.users.create({
  data: {
    name: "Maria da Babá",
    cpf: "55566677788",
    profile: "employee"
  }
});

await prisma.employmentRelationship.create({
  data: {
    employerId: anaCosta.id,
    employeeId: babáMaria.id,
    contextId: familiaCosta.id,
    position: "Babá",
    salary: 800.00,
    startDate: new Date("2024-06-01"),
    contractType: "informal"
  }
});
```

---

## 🎯 **BENEFÍCIOS DA NOVA ESTRUTURA**

### **1. Flexibilidade Total**
- ✅ Um usuário pode ter múltiplos perfis
- ✅ Relacionamentos complexos suportados
- ✅ Contextos isolados e seguros

### **2. Segurança e Permissões**
- ✅ Controle granular de permissões por contexto
- ✅ Isolamento de dados entre famílias
- ✅ Auditoria completa de relacionamentos

### **3. Escalabilidade**
- ✅ Suporte a múltiplas famílias
- ✅ Parcerias e white label
- ✅ Crescimento do sistema

### **4. Experiência do Usuário**
- ✅ Interface adaptativa baseada no contexto
- ✅ Funcionalidades específicas por perfil
- ✅ Navegação intuitiva entre contextos

---

## 🚀 **PLANO DE IMPLEMENTAÇÃO**

### **Fase 1: Estrutura Base**
1. Criar novas tabelas no schema
2. Migrar dados existentes
3. Atualizar modelos Prisma

### **Fase 2: Lógica de Negócio**
1. Sistema de detecção de contexto
2. Controle de permissões
3. Interface adaptativa

### **Fase 3: Dados de Teste**
1. Criar seed complexo
2. Testar cenários reais
3. Validar relacionamentos

### **Fase 4: Interface**
1. Adaptar telas para contexto
2. Implementar navegação entre perfis
3. Testar experiência do usuário

---

## ✅ **CONCLUSÃO**

A implementação desta nova estrutura de relacionamentos permitirá que o DOM v2 suporte **cenários reais e complexos** do mundo doméstico brasileiro, onde as pessoas frequentemente assumem múltiplos papéis em diferentes contextos.

**Esta é uma evolução fundamental** que transformará o sistema de uma ferramenta simples para uma **plataforma completa de gestão doméstica** que reflete a realidade das famílias brasileiras.

---

**Status:** 📋 **ANÁLISE COMPLETA**  
**Próximo:** 🚀 **IMPLEMENTAÇÃO**  
**Prioridade:** 🔥 **ALTA**
