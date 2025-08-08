# Padrões de Nomenclatura - Campos do Banco de Dados

## 📋 **DIRETRIZES CRÍTICAS**

### **1. PRINCÍPIO GERAL**
- **Consistência**: Todos os campos seguem o mesmo padrão
- **Clareza**: Nomes autoexplicativos
- **Manutenibilidade**: Fácil de entender e modificar

### **2. PADRÃO INGLÊS ADOTADO**

#### **Campos Técnicos**
```sql
id              -- Identificador único
created_at      -- Data de criação
updated_at      -- Data de atualização
status          -- Status do registro
active          -- Se está ativo
deleted_at      -- Data de exclusão lógica
```

#### **Campos de Domínio**
```sql
name            -- Nome da pessoa/entidade
cpf             -- CPF brasileiro
cnpj            -- CNPJ brasileiro
email           -- Email
phone           -- Telefone
address         -- Endereço
position        -- Cargo/função
salary          -- Salário
description     -- Descrição
category        -- Categoria
```

#### **Relacionamentos**
```sql
user_id         -- ID do usuário
employee_id     -- ID do funcionário
budget_id       -- ID do orçamento
created_by      -- Criado por
updated_by      -- Atualizado por
```

### **3. CONVENÇÕES ESPECÍFICAS**

#### **Datas**
- `data_criacao` → `created_at`
- `data_atualizacao` → `updated_at`
- `data_limite` → `due_date`
- `data_conclusao` → `completed_at`

#### **Valores Monetários**
- `valor` → `amount`
- `gasto` → `spent`
- `salario` → `salary`
- `bonus` → `bonus`

#### **Status**
- `ativo` → `active`
- `status` → `status` (pending, completed, cancelled)

### **4. EXEMPLOS DE APLICAÇÃO**

#### **ANTES (Inconsistente)**
```sql
User: nome, email, cpf, created_at
Employee: name, position, salary, createdAt
Budget: name, amount, spent, startDate
Task: titulo, descricao, data_limite
```

#### **DEPOIS (Padronizado)**
```sql
User: name, email, cpf, created_at
Employee: name, position, salary, created_at
Budget: name, amount, spent, start_date
Task: title, description, due_date
```

### **5. MIGRAÇÃO NECESSÁRIA**

**Fase 1**: Documentar padrão atual
**Fase 2**: Criar script de migração
**Fase 3**: Aplicar mudanças no schema
**Fase 4**: Atualizar seed e código

### **6. VALIDAÇÃO**

- ✅ Todos os campos seguem o padrão
- ✅ Nomes são consistentes entre tabelas
- ✅ Relacionamentos seguem convenção
- ✅ Datas usam formato padrão
- ✅ Status usam enum definido

---

**Responsável**: Equipe DOM v2
**Data**: 2025-08-06
**Versão**: 1.0
