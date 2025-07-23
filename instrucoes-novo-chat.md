# Instruções para Novo Chat - DOM v2

## 🎯 **CONTEXTO RÁPIDO**

**Projeto:** DOM v2 - Sistema empresarial brasileiro  
**Status:** ✅ Sistema funcional e estável  
**Foco:** Expansão da biblioteca de componentes e funcionalidades brasileiras  
**Estratégia:** Simplicidade extrema e foco no mercado brasileiro  

---

## 🚀 **COMANDOS PARA INICIAR**

### **📋 1. VERIFICAR STATUS ATUAL:**
```powershell
# Diretório: C:\dom-v2
cd C:\dom-v2

# Verificar se o sistema está rodando
Get-Process | Where-Object {$_.ProcessName -like "*node*"}
```

### **📋 2. INICIAR SISTEMA COMPLETO:**
```powershell
# Executar sistema completo
.\run-dom-v2.ps1
```

### **📋 3. VERIFICAR SERVIÇOS:**
- **Backend:** http://localhost:3001
- **Frontend Web:** http://localhost:3000
- **Metro Bundler:** http://localhost:8081

---

## 📊 **STATUS ATUAL DO PROJETO**

### **✅ FUNCIONANDO:**
- Backend (Node.js + Express + TypeScript + Prisma + PostgreSQL)
- Frontend Web (React Native Web)
- Frontend Mobile (React Native)
- CI/CD Pipeline
- Banco de Dados
- Micro-frontends (Budget, Payroll, Tasks)

### **🎯 PRÓXIMOS PASSOS PRIORITÁRIOS:**
1. **Expandir Biblioteca de Componentes**
2. **Eliminar Valores Hardcoded**
3. **Implementar Funcionalidades Brasileiras Básicas**

---

## 🛠️ **ESTRUTURA DO PROJETO**

### **📁 DIRETÓRIOS PRINCIPAIS:**
```
dom-v2/
├── backend/          # Node.js + Express + Prisma
├── frontend/         # React Native + React Native Web
├── docs/            # Documentação completa
├── scripts/         # Scripts de automação
└── logs/            # Logs do sistema
```

### **📁 ARQUIVOS IMPORTANTES:**
- `status-atual-novo-chat.md` - Status completo do projeto
- `run-dom-v2.ps1` - Script de execução principal
- `setup-database.ps1` - Configuração do banco
- `docs/` - Toda documentação técnica

---

## 🎯 **PRÓXIMO PASSO IMEDIATO**

### **📋 EXPANDIR BIBLIOTECA DE COMPONENTES:**

#### **Componentes Prioritários:**
1. **TableComponent** - Para exibição de dados
2. **ChartComponent** - Para gráficos e relatórios
3. **ModalComponent** - Para interações
4. **CPFCNPJInput** - Para formulários brasileiros

#### **Localização:**
```
frontend/src/components/ui/
```

#### **Estrutura Recomendada:**
```typescript
// Exemplo de componente
interface TableComponentProps {
  data: any[];
  columns: string[];
  onRowClick?: (row: any) => void;
}

export const TableComponent: React.FC<TableComponentProps> = ({ data, columns, onRowClick }) => {
  // Implementação
};
```

---

## 📋 **CHECKLIST DE VERIFICAÇÃO**

### **✅ ANTES DE COMEÇAR:**
- [ ] Sistema está rodando (backend + frontend)
- [ ] Banco de dados conectado
- [ ] Dependências instaladas
- [ ] Documentação lida

### **✅ AO IMPLEMENTAR:**
- [ ] Seguir padrões existentes
- [ ] Manter simplicidade extrema
- [ ] Testar funcionalidade
- [ ] Documentar mudanças

### **✅ AO FINALIZAR:**
- [ ] Testes funcionais
- [ ] Performance adequada
- [ ] Código limpo
- [ ] Documentação atualizada

---

## 🎯 **ESTRATÉGIA DE DESENVOLVIMENTO**

### **✅ PRINCÍPIOS:**
1. **Simplicidade Extrema** - Não adicionar complexidade desnecessária
2. **Foco no Brasil** - Diferencial competitivo claro
3. **Implementação Gradual** - Uma melhoria por vez
4. **Validação Contínua** - Testar cada mudança

### **❌ EVITAR:**
1. **Arquitetura complexa** - Sistema atual funciona
2. **Cache complexo** - Prematuro para o volume atual
3. **Lazy loading complexo** - Desnecessário agora
4. **Over-engineering** - Manter simplicidade

---

## 📊 **MÉTRICAS DE SUCESSO**

### **🎯 TÉCNICAS:**
- Performance: <2s carregamento
- Bundle Size: <500KB
- Test Coverage: >90%
- Build Time: <5 minutos

### **🎯 NEGÓCIO:**
- Funcionalidades brasileiras: 100% básicas
- Tempo de desenvolvimento: 50% redução
- Qualidade: 80% redução em bugs
- Satisfação: >90% usuários

---

## 🚨 **PROBLEMAS CONHECIDOS**

### **✅ RESOLVIDOS:**
- Conflito React Native Web
- CI/CD Pipeline
- Dependências incompatíveis
- Metro Bundler

### **⚠️ ATENÇÃO:**
- Manter simplicidade extrema
- Não adicionar complexidade desnecessária
- Focar no mercado brasileiro
- Implementar gradualmente

---

## 📞 **SUPORTE**

### **📋 DOCUMENTAÇÃO DISPONÍVEL:**
- `docs/` - Documentação técnica completa
- `status-atual-novo-chat.md` - Status atual
- `README.md` - Documentação principal

### **📋 COMANDOS DE EMERGÊNCIA:**
```powershell
# Parar todos os serviços
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process

# Reiniciar sistema
.\run-dom-v2.ps1
```

---

**Autor:** DOM Team v2  
**Data:** 23 de Julho de 2025  
**Versão:** 2.0.0  
**Status:** ✅ Pronto para Continuidade 