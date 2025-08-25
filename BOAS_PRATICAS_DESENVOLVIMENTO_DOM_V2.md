# BOAS PRÁTICAS DE DESENVOLVIMENTO - DOM v2

## 🏗️ ARQUITETURA DO PROJETO

### Frontend (Cliente)
- **Tecnologias Obrigatórias**: HTML5, CSS3, JavaScript vanilla
- **Proibido**: Frameworks como Vue.js, Angular, jQuery
- **Permitido**: React apenas para componentes específicos se necessário
- **Responsividade**: Mobile-first design
- **Acessibilidade**: LGPD compliance, WCAG 2.1

### Backend (Servidor)
- **Tecnologias Obrigatórias**: React + TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Runtime**: Node.js
- **Framework**: Express.js

## 🚫 FRAMEWORKS PROIBIDOS NO FRONTEND
- Vue.js
- Angular
- jQuery (exceto se absolutamente necessário)
- Bootstrap (usar CSS customizado)

## ✅ TECNOLOGIAS OBRIGATÓRIAS
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Backend**: React, TypeScript, Node.js, Express.js, Prisma, PostgreSQL

## 🧠 PENSAMENTO CRÍTICO E BOAS PRÁTICAS

### 1. Validação e Tratamento de Erros
- Implementar try-catch em todas as operações JavaScript
- Validação de dados no frontend e backend
- Tratamento de erros de rede e API
- Logs estruturados para debugging

### 2. Segurança
- Validação de entrada em todos os formulários
- Sanitização de dados
- Autenticação JWT
- Proteção contra XSS e CSRF
- LGPD compliance

### 3. Performance
- Lazy loading de recursos
- Minificação de CSS e JavaScript
- Otimização de imagens
- Cache adequado
- Compressão gzip

### 4. Acessibilidade
- Semântica HTML adequada
- ARIA labels
- Navegação por teclado
- Contraste adequado
- Textos alternativos

## 📁 ESTRUTURA DE DIRETÓRIOS

```
dom-v2/
├── frontend/           # HTML + CSS + JavaScript vanilla
│   ├── public/
│   ├── css/
│   ├── js/
│   ├── components/
│   └── assets/
├── backend/            # React + TypeScript
│   ├── src/
│   ├── components/
│   ├── services/
│   └── types/
├── docs/
│   ├── decisions/
│   ├── architecture/
│   └── development/
└── scripts/
```

## 🔧 COMANDOS POWERSHELL

### Regras para Scripts
- Usar apenas cmdlets PowerShell válidos
- Implementar tratamento de erros (try-catch)
- Usar ErrorAction Stop quando apropriado
- Evitar comandos bash/cmd

### Comandos Válidos
- Get-*, Set-*, New-*, Remove-*, Test-*
- Write-*, Read-*, Move-*, Copy-*
- Invoke-*, Start-*, Stop-*

### Comandos Proibidos
- ls, cp, mv, rm, mkdir, cat (usar equivalentes PowerShell)

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### Antes de Implementar
- [ ] Verificar conformidade arquitetural
- [ ] Documentar decisões técnicas
- [ ] Planejar validações necessárias
- [ ] Definir estrutura de dados

### Durante a Implementação
- [ ] Seguir padrões de nomenclatura (kebab-case)
- [ ] Implementar validações adequadas
- [ ] Adicionar tratamento de erros
- [ ] Testar responsividade
- [ ] Verificar acessibilidade

### Após a Implementação
- [ ] Executar testes de integração
- [ ] Validar performance
- [ ] Verificar segurança
- [ ] Documentar mudanças
- [ ] Atualizar README

## 🎯 VALIDAÇÃO INCREMENTAL

### Para Cada Nova Tela/Componente
1. **Carregamento**: Verificar se carrega corretamente
2. **Navegação**: Testar navegação entre telas
3. **Backend**: Validar integração com API
4. **Responsividade**: Testar em diferentes dispositivos
5. **Acessibilidade**: Verificar compliance WCAG
6. **Performance**: Medir tempo de carregamento

## 📊 MÉTRICAS DE QUALIDADE

### Conformidade Mínima
- **Arquitetura**: 100% (não negociável)
- **Pensamento Crítico**: 80%
- **Comandos PowerShell**: 100%
- **Estrutura**: 90%

### Pontuação Geral
- **Excelente**: 90-100%
- **Bom**: 80-89%
- **Aceitável**: 70-79%
- **Inaceitável**: <70%

## 🔄 PROCESSO DE DESENVOLVIMENTO

### 1. Planejamento
- Definir requisitos
- Documentar arquitetura
- Estabelecer critérios de aceitação

### 2. Implementação
- Seguir boas práticas
- Implementar validações
- Adicionar tratamento de erros

### 3. Validação
- Executar verificador de conformidade
- Testar funcionalidades
- Validar integração

### 4. Documentação
- Atualizar documentação
- Registrar decisões
- Documentar mudanças

## 🚨 VIOLAÇÕES CRÍTICAS

### Bloqueiam o Desenvolvimento
- Uso de frameworks proibidos no frontend
- Falta de tratamento de erros
- Comandos PowerShell inválidos
- Estrutura de diretórios incorreta

### Requerem Correção Imediata
- Falta de validação de dados
- Problemas de segurança
- Violações de acessibilidade
- Performance inadequada

## 📝 DOCUMENTAÇÃO OBRIGATÓRIA

### Para Cada Decisão Técnica
- Data e hora da decisão
- Contexto e problema
- Solução escolhida
- Alternativas consideradas
- Impacto no projeto

### Para Cada Implementação
- Funcionalidade implementada
- Tecnologias utilizadas
- Validações implementadas
- Testes realizados
- Problemas encontrados e soluções

---

**Última atualização**: 24/08/2025
**Versão**: 2.0
**Responsável**: Equipe DOM v2
