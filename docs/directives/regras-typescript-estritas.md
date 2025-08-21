
/**
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Documentação
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - TypeScript
 * 
 * @usage
 * Ver documentação específica para detalhes de uso
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

# Regras TypeScript Estritas - DOM v2

## 🚨 **VIOLAÇÃO GRAVE DETECTADA**

O projeto DOM v2 tem **regras estritas** que **NUNCA** devem ser violadas:

### **❌ PROIBIDO ABSOLUTAMENTE**

1. **Código JavaScript Puro**
   - `require()` statements
   - `module.exports`
   - `exports.`
   - `__filename`, `__dirname`
   - `arguments.callee`
   - `fs.existsSync`, `path.join` (em arquivos frontend)

2. **Funções Problemáticas**
   - `logStructured()`
   - `validateType()`
   - `assertCritical()`
   - `handleError()`
   - `validateInput()`

3. **Comentários JSDoc Problemáticos**
   - `@alternatives`
   - `@decision`
   - `@trade-offs`
   - `@references`
   - `@considerations`

4. **Sintaxe Corrompida**
   - Funções sem fechamento
   - Imports quebrados
   - Exports quebrados

### **✅ OBRIGATÓRIO**

1. **TypeScript Puro**
   - `import` statements
   - `export` statements
   - Type annotations
   - Interface definitions

2. **Arquitetura Limpa**
   - Separação de responsabilidades
   - Hooks customizados
   - Componentes reutilizáveis

## 🛡️ **Sistema de Proteção**

### **1. Pre-Commit Hook**
```bash
# Executar antes de cada commit
node scripts/pre-commit-hook.js
```

### **2. Enforcement Automático**
```bash
# Detectar e corrigir violações
node scripts/enforce-typescript-rules.js
```

### **3. Validação Contínua**
```bash
# Validar sintaxe
npx tsc --noEmit

# Executar testes
npm test
```

## 📋 **Checklist de Conformidade**

Antes de qualquer commit, verificar:

- [ ] Nenhum código JavaScript puro
- [ ] Nenhuma função problemática
- [ ] Nenhum comentário JSDoc problemático
- [ ] Sintaxe TypeScript válida
- [ ] Testes passando
- [ ] Arquitetura respeitada

## 🚨 **Consequências de Violação**

1. **Commit Bloqueado**: Pre-commit hook impede commits com violações
2. **Rollback Automático**: Sistema restaura backup em caso de erro
3. **Log de Violações**: Todas as violações são registradas
4. **Correção Obrigatória**: Violações devem ser corrigidas antes de prosseguir

## 🔧 **Como Corrigir Violações**

1. **Detectar**: `node scripts/enforce-typescript-rules.js`
2. **Corrigir**: Remover código JavaScript problemático
3. **Validar**: `npx tsc --noEmit`
4. **Testar**: `npm test`
5. **Commit**: Apenas após todas as validações passarem

## 📊 **Métricas de Qualidade**

- **Taxa de Conformidade**: 100% obrigatório
- **Violações Detectadas**: 0 tolerado
- **Tempo de Correção**: Máximo 1 hora
- **Impacto no Desenvolvimento**: Mínimo

## 🎯 **Objetivos**

1. **Prevenção Total**: Nenhuma violação deve ser introduzida
2. **Detecção Automática**: Sistema identifica violações instantaneamente
3. **Correção Automática**: Violações são corrigidas automaticamente quando possível
4. **Educação Contínua**: Equipe aprende a evitar violações

## 📞 **Suporte**

Em caso de dúvidas sobre as regras:
1. Consultar esta documentação
2. Executar scripts de validação
3. Contatar a equipe de arquitetura
4. Revisar diretrizes do projeto

---

**⚠️ IMPORTANTE**: Estas regras são **NÃO NEGOCIÁVEIS**. Qualquer violação deve ser corrigida imediatamente.
