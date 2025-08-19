# 🏗️ Arquitetura Frontend - DOM v2 (ATUALIZADA)

## 🎯 **DECISÃO ARQUITETURAL DEFINITIVA**

### **✅ ARQUITETURA ESCOLHIDA: HTML NATIVO**

**DECISÃO:** O projeto DOM v2 utiliza **HTML nativo** como tecnologia principal para o frontend.

**JUSTIFICATIVA:**
- Simplicidade extrema (conforme diretrizes do projeto)
- Performance superior
- Manutenção simplificada
- Compatibilidade universal
- Menor curva de aprendizado

---

## 📁 **ESTRUTURA ATUAL DO PROJETO**

### **FRONTEND (HTML NATIVO)**
```
frontend/
├── public/                    # 🎯 PRINCIPAL - HTML Nativo
│   ├── index.html            # Entry point principal
│   ├── payments-management.html  # Tela de pagamentos (implementada)
│   ├── showcase-telas.html   # Demonstração de telas
│   ├── login-screen.html     # Tela de login
│   └── *.html               # Outras telas HTML
├── src/                      # ⚠️ LEGADO - React (será migrado)
│   ├── screens/             # Telas React (obsoletas)
│   ├── components/          # Componentes React (obsoletos)
│   └── hooks/              # Hooks React (obsoletos)
└── package.json             # Dependências (será simplificado)
```

---

## 🔄 **PLANO DE MIGRAÇÃO**

### **FASE 1: Documentação (CONCLUÍDA)**
- ✅ Definir arquitetura definitiva
- ✅ Corrigir documentação
- ✅ Estabelecer diretrizes claras

### **FASE 2: Migração de Telas (EM ANDAMENTO)**
- ✅ `payments-management.html` - Implementada
- 🔄 Migrar telas React para HTML nativo
- 🔄 Remover dependências React desnecessárias

### **FASE 3: Limpeza (PENDENTE)**
- ⏳ Remover código React obsoleto
- ⏳ Simplificar package.json
- ⏳ Atualizar scripts de build

---

## 🎨 **PADRÕES HTML NATIVO**

### **ESTRUTURA DE ARQUIVO**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nome da Tela - DOM v2</title>
    <style>
        /* CSS inline ou referência externa */
    </style>
</head>
<body>
    <div class="container">
        <!-- Conteúdo da tela -->
    </div>
    <script>
        // JavaScript vanilla
    </script>
</body>
</html>
```

### **CONVENÇÕES DE NOMENCLATURA**
- **Arquivos:** `kebab-case.html` (ex: `payments-management.html`)
- **Classes CSS:** `kebab-case` (ex: `summary-card`)
- **IDs:** `camelCase` (ex: `paymentModal`)
- **Funções JS:** `camelCase` (ex: `openPaymentModal`)

### **PADRÕES DE DESIGN**
- **Mobile-first:** Responsividade obrigatória
- **Cards:** Interface baseada em cards
- **Ícones:** Emojis ou ícones simples
- **Cores:** Paleta consistente do projeto

---

## 🚫 **TECNOLOGIAS PROIBIDAS**

### **NÃO USAR:**
- ❌ React/React Native
- ❌ React Native Web
- ❌ Vue.js
- ❌ Angular
- ❌ Frameworks complexos
- ❌ Bundlers desnecessários

### **PERMITIDO:**
- ✅ HTML5 puro
- ✅ CSS3 puro
- ✅ JavaScript vanilla
- ✅ Bibliotecas leves (se necessário)

---

## 📋 **CHECKLIST DE IMPLEMENTAÇÃO**

### **ANTES DE IMPLEMENTAR:**
- [ ] Verificar se a funcionalidade é essencial (MVP)
- [ ] Confirmar que não existe em HTML nativo
- [ ] Seguir padrões estabelecidos
- [ ] Implementar responsividade
- [ ] Testar em múltiplos dispositivos

### **APÓS IMPLEMENTAR:**
- [ ] Documentar a nova tela
- [ ] Atualizar navegação
- [ ] Testar funcionalidades
- [ ] Validar acessibilidade
- [ ] Verificar performance

---

## 🔧 **FERRAMENTAS E SCRIPTS**

### **DESENVOLVIMENTO:**
```bash
# Servidor local simples
python -m http.server 3000
# ou
npx serve public
```

### **BUILD:**
```bash
# Não é necessário build complexo
# Apenas copiar arquivos HTML para produção
```

---

## 📊 **STATUS DAS TELAS**

### **✅ IMPLEMENTADAS EM HTML NATIVO:**
- `payments-management.html` - Gestão de pagamentos (completa)

### **🔄 EM MIGRAÇÃO:**
- Dashboard principal
- Sistema de login
- Gestão de funcionários
- Controle de tarefas

### **⏳ PENDENTES:**
- Todas as demais telas React

---

## 🎯 **DIRETRIZES PARA DESENVOLVEDORES**

### **HUMANOS:**
1. **SEMPRE** implementar em HTML nativo
2. **NUNCA** usar React ou frameworks complexos
3. **SEGUIR** padrões estabelecidos
4. **DOCUMENTAR** todas as decisões
5. **TESTAR** em múltiplos dispositivos

### **IA ASSISTANTS:**
1. **VERIFICAR** arquitetura antes de implementar
2. **USAR** HTML nativo por padrão
3. **SEGUIR** diretrizes do projeto
4. **ALERTAR** se proposta violar regras
5. **DOCUMENTAR** implementações

---

## 🚨 **CONSEQUÊNCIAS DE VIOLAÇÃO**

### **PARA HUMANOS:**
- Rejeição automática de commits
- Revisão obrigatória adicional
- Treinamento adicional obrigatório

### **PARA IA ASSISTANTS:**
- Rejeição automática de respostas
- Correção obrigatória de abordagem
- Feedback contínuo para melhoria

---

## 📚 **REFERÊNCIAS**

### **DOCUMENTAÇÃO:**
- `docs/profiles/perfis-usuarios-detalhados.md`
- `docs/profiles/perfis-enriquecidos.md`
- `docs/development/processo-garantia-diretivas.md`

### **EXEMPLOS:**
- `frontend/public/payments-management.html` - Implementação completa
- `frontend/public/index.html` - Entry point

---

**ÚLTIMA ATUALIZAÇÃO:** 06/08/2025  
**VERSÃO:** 2.0.0  
**STATUS:** DEFINITIVA E OBRIGATÓRIA
