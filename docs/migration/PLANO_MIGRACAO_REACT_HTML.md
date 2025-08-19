# 🔄 Plano de Migração: React → HTML Nativo

## 🎯 **OBJETIVO**

Migrar todas as telas React existentes para HTML nativo, seguindo a arquitetura definitiva do projeto DOM v2.

---

## 📊 **INVENTÁRIO ATUAL**

### **TELAS REACT EXISTENTES:**
```
frontend/src/screens/
├── DashboardScreen.tsx          # Dashboard principal
├── TasksScreen.tsx             # Gestão de tarefas
├── FinanceScreen.tsx           # Gestão financeira
├── NotificationsScreen.tsx     # Sistema de notificações
├── HRScreen.tsx               # Recursos humanos
├── ReportsScreen.tsx          # Relatórios
├── ProfileScreen.tsx          # Perfil do usuário
├── UsersScreen.tsx            # Gestão de usuários
├── PaymentIntegrationsScreen.tsx # Integrações de pagamento
├── AdvancedTimeCardScreen.tsx # Ponto avançado
├── CommunicationScreen.tsx    # Comunicação
├── GamificationScreen.tsx     # Gamificação
├── EmployeesScreen.tsx        # Gestão de funcionários
├── PaymentsScreen.tsx         # Pagamentos (obsoleta)
├── TimeClockScreen.tsx        # Controle de ponto
├── BudgetScreen.tsx           # Orçamentos
└── SettingsScreen.tsx         # Configurações
```

### **TELAS HTML NATIVO EXISTENTES:**
```
frontend/public/
├── index.html                 # Entry point
├── payments-management.html   # ✅ Gestão de pagamentos (nova)
├── showcase-telas.html       # Demonstração
├── login-screen.html         # Login
└── *.html                   # Outras telas
```

---

## 🎯 **PRIORIZAÇÃO DE MIGRAÇÃO**

### **PRIORIDADE ALTA (MVP):**
1. **DashboardScreen.tsx** → `dashboard.html`
2. **TasksScreen.tsx** → `tasks-management.html`
3. **EmployeesScreen.tsx** → `employees-management.html`
4. **BudgetScreen.tsx** → `budget-management.html`

### **PRIORIDADE MÉDIA:**
5. **TimeClockScreen.tsx** → `timeclock.html`
6. **NotificationsScreen.tsx** → `notifications.html`
7. **ProfileScreen.tsx** → `profile.html`
8. **SettingsScreen.tsx** → `settings.html`

### **PRIORIDADE BAIXA:**
9. **FinanceScreen.tsx** → `finance.html`
10. **ReportsScreen.tsx** → `reports.html`
11. **HRScreen.tsx** → `hr-management.html`
12. **UsersScreen.tsx** → `users-management.html`

### **FUNCIONALIDADES AVANÇADAS:**
13. **PaymentIntegrationsScreen.tsx** → `payment-integrations.html`
14. **AdvancedTimeCardScreen.tsx** → `advanced-timecard.html`
15. **CommunicationScreen.tsx** → `communication.html`
16. **GamificationScreen.tsx** → `gamification.html`

---

## 🔄 **PROCESSO DE MIGRAÇÃO**

### **FASE 1: ANÁLISE (1-2 dias por tela)**
```bash
# 1. Analisar funcionalidades da tela React
- Identificar componentes principais
- Mapear estado e lógica
- Listar funcionalidades críticas
- Documentar dependências

# 2. Definir estrutura HTML
- Layout responsivo
- Componentes necessários
- Interações JavaScript
- Integração com backend
```

### **FASE 2: IMPLEMENTAÇÃO (2-3 dias por tela)**
```bash
# 1. Criar estrutura HTML
- HTML semântico
- CSS responsivo
- JavaScript vanilla
- Integração com APIs

# 2. Implementar funcionalidades
- Formulários
- Tabelas de dados
- Modais e popups
- Validações
```

### **FASE 3: TESTE E REFINAMENTO (1 dia por tela)**
```bash
# 1. Testes funcionais
- Responsividade
- Funcionalidades
- Integração
- Performance

# 2. Ajustes finais
- Correções de bugs
- Otimizações
- Documentação
```

---

## 📋 **TEMPLATE DE MIGRAÇÃO**

### **ESTRUTURA PADRÃO:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nome da Tela - DOM v2</title>
    <style>
        /* CSS responsivo e acessível */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #f8fafc;
            color: #1f2937;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Componentes reutilizáveis */
        .card {
            background: white;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        /* Responsividade */
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header da tela -->
        <div class="card">
            <h1>🎯 Nome da Tela</h1>
            <p>Descrição da funcionalidade</p>
        </div>

        <!-- Conteúdo principal -->
        <div class="card">
            <!-- Funcionalidades específicas -->
        </div>
    </div>

    <script>
        // JavaScript vanilla
        // Integração com APIs
        // Funcionalidades específicas
    </script>
</body>
</html>
```

---

## 🔧 **COMPONENTES REUTILIZÁVEIS**

### **COMPONENTES BASE:**
```css
/* Cards */
.card { /* ... */ }
.card-header { /* ... */ }
.card-content { /* ... */ }

/* Botões */
.btn-primary { /* ... */ }
.btn-secondary { /* ... */ }
.btn-danger { /* ... */ }

/* Formulários */
.form-group { /* ... */ }
.form-input { /* ... */ }
.form-select { /* ... */ }

/* Tabelas */
.data-table { /* ... */ }
.table-header { /* ... */ }
.table-row { /* ... */ }

/* Modais */
.modal { /* ... */ }
.modal-content { /* ... */ }
.modal-header { /* ... */ }
```

### **FUNÇÕES JAVASCRIPT:**
```javascript
// API Service
const apiService = {
    get: async (url) => { /* ... */ },
    post: async (url, data) => { /* ... */ },
    put: async (url, data) => { /* ... */ },
    delete: async (url) => { /* ... */ }
};

// Modal Management
const modalManager = {
    open: (modalId) => { /* ... */ },
    close: (modalId) => { /* ... */ }
};

// Form Validation
const formValidator = {
    validate: (form) => { /* ... */ },
    showErrors: (errors) => { /* ... */ }
};
```

---

## 📊 **CRONOGRAMA DE MIGRAÇÃO**

### **SEMANA 1:**
- **Dia 1-2:** DashboardScreen.tsx → `dashboard.html`
- **Dia 3-4:** TasksScreen.tsx → `tasks-management.html`
- **Dia 5:** Testes e ajustes

### **SEMANA 2:**
- **Dia 1-2:** EmployeesScreen.tsx → `employees-management.html`
- **Dia 3-4:** BudgetScreen.tsx → `budget-management.html`
- **Dia 5:** Testes e ajustes

### **SEMANA 3:**
- **Dia 1-2:** TimeClockScreen.tsx → `timeclock.html`
- **Dia 3-4:** NotificationsScreen.tsx → `notifications.html`
- **Dia 5:** Testes e ajustes

### **SEMANA 4:**
- **Dia 1-2:** ProfileScreen.tsx → `profile.html`
- **Dia 3-4:** SettingsScreen.tsx → `settings.html`
- **Dia 5:** Testes e ajustes

---

## 🚨 **PONTOS DE ATENÇÃO**

### **CRÍTICOS:**
- **PERFORMANCE:** Manter carregamento rápido
- **RESPONSIVIDADE:** Funcionar em todos os dispositivos
- **ACESSIBILIDADE:** Seguir padrões WCAG
- **SEGURANÇA:** Validar todas as entradas

### **IMPORTANTES:**
- **CONSISTÊNCIA:** Seguir padrões estabelecidos
- **DOCUMENTAÇÃO:** Documentar todas as decisões
- **TESTES:** Testar em múltiplos navegadores
- **INTEGRAÇÃO:** Manter compatibilidade com backend

---

## ✅ **CRITÉRIOS DE ACEITAÇÃO**

### **FUNCIONAIS:**
- [ ] Todas as funcionalidades da tela React implementadas
- [ ] Formulários funcionando corretamente
- [ ] Integração com APIs funcionando
- [ ] Validações implementadas

### **TÉCNICOS:**
- [ ] HTML semântico e acessível
- [ ] CSS responsivo e otimizado
- [ ] JavaScript limpo e eficiente
- [ ] Performance adequada

### **QUALIDADE:**
- [ ] Código documentado
- [ ] Testes realizados
- [ ] Padrões seguidos
- [ ] Sem bugs críticos

---

## 📚 **RECURSOS E REFERÊNCIAS**

### **EXEMPLOS:**
- `frontend/public/payments-management.html` - Implementação completa
- `frontend/public/index.html` - Entry point

### **DOCUMENTAÇÃO:**
- `docs/architecture/ARQUITETURA_FRONTEND_ATUALIZADA.md`
- `docs/directives/diretivas-pensamento-critico.md`

### **FERRAMENTAS:**
- Validador HTML: https://validator.w3.org/
- Teste de responsividade: Chrome DevTools
- Validador de acessibilidade: axe DevTools

---

**ÚLTIMA ATUALIZAÇÃO:** 06/08/2025  
**VERSÃO:** 1.0.0  
**STATUS:** EM EXECUÇÃO
