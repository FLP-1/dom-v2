# 🧪 GUIA DE TESTE MANUAL - CONTROLE DE ORÇAMENTO

## 🚀 **PASSO 1: INICIAR O APP**

### **Opção A: Usando o script PowerShell completo (RECOMENDADO)**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2
.\docs\commands\run-dom-v2-powershell-complete.ps1
```

### **Opção B: Usando comandos npm atualizados**
```powershell
# Diretório: C:\dom-v2
Set-Location C:\dom-v2

# Instalar dependências (se necessário)
npm run install-all

# Iniciar desenvolvimento
npm run start-dev
```

### **Opção C: Iniciar serviços separadamente**
```powershell
# Terminal 1 - Backend
Set-Location C:\dom-v2\backend
npm run dev

# Terminal 2 - Frontend
Set-Location C:\dom-v2\frontend
npm run dev
```

### **Opção D: Verificar se está rodando**
```powershell
# Health check via PowerShell
Set-Location C:\dom-v2
.\docs\commands\test-dom-v2-powershell.ps1 -Type health
```

**Ou manualmente:**
- Abra o navegador
- Acesse: `http://localhost:3000` (Frontend Web)
- Acesse: `http://localhost:8081` (Frontend React Native)
- Acesse: `http://localhost:3001/health` (Backend Health)
- Deve aparecer a tela inicial do DOM-V2

---

## 📱 **PASSO 2: ACESSAR AS TELAS DE ORÇAMENTO**

### **2.1 TELA PRINCIPAL (BudgetScreen)**
```
URL: http://localhost:3000/budget
```

**O que verificar:**
- ✅ **Carregamento:** A tela carrega sem erros no console
- ✅ **Título:** "Controle de Orçamento" aparece no topo
- ✅ **Botão "+ Novo":** Está visível e clicável
- ✅ **Filtros de Período:** Semana/Mês/Ano (se implementados)
- ✅ **Gráfico de Progresso:** Aparece (mesmo vazio)
- ✅ **Lista de Orçamentos:** Área para exibir orçamentos
- ✅ **Responsividade:** Funciona em diferentes tamanhos de tela

**Teste de navegação:**
- Clique no botão "+ Novo"
- Deve navegar para a tela de criação

---

### **2.2 TELA DE CRIAÇÃO (BudgetCreateScreen)**
```
URL: http://localhost:3000/budget/create
```

**O que verificar:**
- ✅ **Título:** "Novo Orçamento" aparece
- ✅ **Formulário completo:**
  - Campo "Nome do Orçamento"
  - Campo "Valor Total" (numérico)
  - Seletor de "Categoria"
  - Campos de "Data de Início" e "Data de Fim"
  - Campo "Descrição" (opcional)
  - Botão "Criar Orçamento"

**Testes de validação:**
- ❌ **Tente criar sem preencher campos obrigatórios**
  - Deve mostrar mensagens de erro
- ❌ **Tente valores negativos ou zero**
  - Deve rejeitar valores inválidos
- ❌ **Tente datas inválidas**
  - Data fim anterior à data início
- ✅ **Preencha corretamente e teste criação**

**Dados de teste sugeridos:**
```
Nome: "Orçamento Teste"
Valor: "1000.00"
Categoria: "Alimentação"
Data Início: Data atual
Data Fim: Data atual + 30 dias
Descrição: "Orçamento para testes manuais"
```

---

### **2.3 TELA DE DETALHES (BudgetDetailScreen)**
```
URL: http://localhost:3000/budget/[ID]
```

**Como acessar:**
- Crie um orçamento primeiro
- Clique no orçamento na lista principal
- Ou navegue diretamente (se souber o ID)

**O que verificar:**
- ✅ **Informações do orçamento:**
  - Nome e categoria no cabeçalho
  - Card detalhado com valores
  - Gráfico de progresso
- ✅ **Valores exibidos:**
  - Valor Total
  - Gasto Atual (se houver)
  - Valor Restante
  - Percentual de progresso
- ✅ **Navegação:**
  - Botão voltar funciona
  - Links de edição (se implementados)

---

## 🔧 **PASSO 3: TESTES DE FUNCIONALIDADE**

### **3.1 Teste de Cálculos**
1. **Crie um orçamento de R$ 1000**
2. **Adicione um gasto de R$ 300** (se implementado)
3. **Verifique:**
   - Progresso mostra 30%
   - Valor restante é R$ 700
   - Cores mudam conforme progresso (verde → amarelo → vermelho)

### **3.2 Teste de Categorias**
**Teste todas as categorias disponíveis:**
- Alimentação
- Transporte
- Moradia
- Saúde
- Educação
- Lazer
- Vestuário
- Outros

### **3.3 Teste de Responsividade**
- **Desktop:** Tela completa (1920x1080)
- **Tablet:** 768px de largura
- **Mobile:** 375px de largura
- **Verifique:** Cards se adaptam, texto não quebra

---

## 🐛 **PASSO 4: TESTES DE ERRO**

### **4.1 Estados de Loading**
- **Desconecte a internet**
- **Tente carregar as telas**
- **Verifique:** Mensagens de erro aparecem

### **4.2 Validação de Formulários**
- **Nome vazio:** Deve mostrar erro
- **Valor zero:** Deve rejeitar
- **Valor negativo:** Deve rejeitar
- **Data inválida:** Deve mostrar erro
- **Categoria não selecionada:** Deve mostrar erro

### **4.3 Navegação**
- **Teste voltar:** Botão voltar funciona
- **Teste refresh:** Dados persistem
- **Teste URLs diretas:** Funcionam corretamente

---

## 📊 **PASSO 5: CHECKLIST DE TESTE**

### **✅ Funcionalidades Básicas**
- [ ] App inicia sem erros
- [ ] Telas carregam corretamente
- [ ] Navegação entre telas funciona
- [ ] Formulários validam dados
- [ ] Cálculos funcionam
- [ ] Dados persistem após refresh

### **✅ Interface**
- [ ] Cards de orçamento exibem informações corretas
- [ ] Gráficos de progresso renderizam
- [ ] Lista de orçamentos funciona
- [ ] Responsividade em diferentes tamanhos
- [ ] Estados de loading/error funcionam

### **✅ Integração**
- [ ] API calls funcionam (se backend rodando)
- [ ] Dados salvam no banco (se implementado)
- [ ] Refresh mantém dados
- [ ] Sincronização funciona

---

## 🔧 **COMANDOS ÚTEIS PARA TESTE**

### **Verificar se o app está rodando:**
```bash
# Verificar porta 3000
netstat -an | findstr :3000

# Verificar processos Node.js
tasklist | findstr node
```

### **Limpar cache se necessário:**
```bash
# Limpar cache do npm
npm cache clean --force

# Reinstalar dependências
cd frontend
rm -rf node_modules
npm install
```

### **Verificar logs:**
```bash
# Ver logs do app
npm run start-dev 2>&1 | tee logs.txt

# Ver console do navegador (F12)
```

---

## 🚨 **PROBLEMAS COMUNS E SOLUÇÕES**

### **❌ Erro: "Cannot find module"**
**Solução:**
```bash
# Reinstalar dependências
cd frontend
npm install

# Ou executar script de implementação
node scripts/implementar-controle-orcamento.js
```

### **❌ Erro: "apiClient is not defined"**
**Solução:**
```bash
# Verificar se api-client existe
ls frontend/src/micro-frontends/shared/utils/core/

# Executar script de integração
node scripts/revisar-integracao-backend.js
```

### **❌ Erro: "Button component not found"**
**Solução:**
```bash
# Verificar shared components
ls frontend/src/micro-frontends/shared/components/ui/

# Executar script de shared
node scripts/estruturar-shared.js
```

### **❌ Tela não carrega**
**Soluções:**
1. Verificar console do navegador (F12)
2. Verificar se rotas estão configuradas
3. Testar acessando diretamente a URL
4. Verificar se o app está rodando na porta correta

---

## 📈 **MÉTRICAS DE SUCESSO**

### **✅ Critérios de Aprovação:**
- App inicia sem erros
- Todas as telas carregam corretamente
- Formulários validam dados adequadamente
- Cálculos funcionam com precisão
- Navegação é fluida e intuitiva
- Interface é responsiva
- Dados persistem após operações
- Performance é adequada

### **📊 Relatório de Teste:**
Após completar os testes, documente:
- ✅ Funcionalidades que funcionaram
- ❌ Problemas encontrados
- 🔧 Soluções aplicadas
- 📝 Sugestões de melhoria

---

## 🎯 **PRÓXIMOS PASSOS APÓS TESTE**

1. **Se tudo funcionar:** Prosseguir para próxima funcionalidade
2. **Se houver problemas:** Corrigir e retestar
3. **Se precisar de ajustes:** Implementar melhorias
4. **Se backend necessário:** Configurar e integrar

---

**✅ TESTE MANUAL CONCLUÍDO!**

Agora você tem um guia completo para testar manualmente todas as telas do controle de orçamento. Siga os passos em ordem e marque o checklist conforme testa cada funcionalidade. 