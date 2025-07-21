# TREINAMENTO: DIRETIVAS CRÍTICAS
## Como Seguir as Práticas de Pensamento Crítico e Qualidade

### 🎯 OBJETIVO
Este treinamento garante que todos os membros da equipe (humanos e agentes de IA) sigam rigorosamente as diretivas críticas para manter a qualidade e integridade do projeto.

### 📋 DIRETIVAS FUNDAMENTAIS

#### 1. NÃO PRESUMA - Busque Certeza
**O que significa:**
- Nunca assuma que algo é verdadeiro sem verificar
- Sempre busque fontes confiáveis e reconhecidas
- Documente a origem de cada decisão

**Como aplicar:**
- ✅ **CORRETO**: "Baseado na documentação oficial do React Native v0.72..."
- ❌ **INCORRETO**: "React Native funciona assim..."

**Checklist:**
- [ ] Verifiquei fontes antes de implementar?
- [ ] Documentei a origem da informação?
- [ ] A fonte é confiável e reconhecida?

#### 2. Seja Crítico Construtivo
**O que significa:**
- Questionar decisões de forma produtiva
- Identificar problemas e propor soluções
- Não apenas concordar, mas analisar

**Como aplicar:**
- ✅ **CORRETO**: "Esta abordagem tem vantagens X e Y, mas também riscos Z. Sugiro considerar..."
- ❌ **INCORRETO**: "Está bom assim"

**Checklist:**
- [ ] Questiono as decisões tomadas?
- [ ] Identifico riscos e limitações?
- [ ] Proponho alternativas construtivas?

#### 3. Questione Suposições
**O que significa:**
- Listar todas as suposições feitas
- Validar cada suposição
- Testar hipóteses

**Como aplicar:**
- ✅ **CORRETO**: "Estou assumindo que: 1) O usuário tem conexão estável, 2) O dispositivo suporta..."
- ❌ **INCORRETO**: Implementar sem questionar premissas

**Checklist:**
- [ ] Liste todas as suposições?
- [ ] Valide cada suposição?
- [ ] Teste as hipóteses?

#### 4. Apresente Múltiplas Perspectivas
**O que significa:**
- Considerar pelo menos 3 alternativas
- Analisar diferentes ângulos
- Documentar trade-offs

**Como aplicar:**
- ✅ **CORRETO**: "Podemos usar: A) React Native, B) Flutter, C) Ionic. Trade-offs: A tem mais bibliotecas mas..."
- ❌ **INCORRETO**: "Vamos usar React Native"

**Checklist:**
- [ ] Considerei pelo menos 3 alternativas?
- [ ] Documentei os trade-offs?
- [ ] Analisei diferentes perspectivas?

#### 5. Teste a Lógica
**O que significa:**
- Validar o raciocínio
- Identificar falhas lógicas
- Testar implementações

**Como aplicar:**
- ✅ **CORRETO**: "Vamos testar: se X acontecer, então Y deve resultar. Caso contrário, há um erro..."
- ❌ **INCORRETO**: Implementar sem validar

**Checklist:**
- [ ] Validei o raciocínio?
- [ ] Identifiquei possíveis falhas?
- [ ] Testei a implementação?

#### 6. Priorize Verdade e Honestidade Intelectual
**O que significa:**
- Reportar erros imediatamente
- Ser transparente sobre limitações
- Corrigir com clareza

**Como aplicar:**
- ✅ **CORRETO**: "Encontrei um problema: X não funciona como esperado. Limitação: só funciona em..."
- ❌ **INCORRETO**: Esconder problemas ou limitações

**Checklist:**
- [ ] Reportei erros encontrados?
- [ ] Sou transparente sobre limitações?
- [ ] Corrijo problemas com clareza?

### 🛠️ FERRAMENTAS E PROCESSOS

#### Sistema de Validação Automática
```bash
# Validar se as diretivas estão sendo seguidas
npm run validate-directives

# Registrar uma decisão
npm run decision:record "Descrição da decisão"

# Analisar padrões de decisões
npm run decision:analyze

# Validar todas as decisões
npm run decision:validate
```

#### Checklist Obrigatório Antes de Cada Commit
- [ ] Fontes verificadas e documentadas
- [ ] Alternativas consideradas
- [ ] Suposições listadas e validadas
- [ ] Múltiplas perspectivas analisadas
- [ ] Lógica testada
- [ ] Erros reportados

#### Processo de Revisão por Pares
1. **Revisor deve questionar:**
   - As fontes são confiáveis?
   - Foram consideradas alternativas?
   - Os riscos foram identificados?
   - A lógica foi validada?

2. **Autor deve responder:**
   - Documentar fontes
   - Explicar alternativas consideradas
   - Listar riscos identificados
   - Demonstrar validação

### 📊 MÉTRICAS DE SUCESSO

#### Para Humanos:
- **0%** de implementações sem fonte
- **100%** de decisões documentadas
- **90%+** de cobertura de testes
- **< 1 hora** tempo de resposta a erros

#### Para Agentes de IA:
- **100%** de respostas seguindo prompts estruturados
- **0%** de implementações sem validação
- **100%** de transparência sobre limitações

### 🚨 CONSEQUÊNCIAS DE NÃO SEGUIR

#### Para Humanos:
- Rejeição automática de commits
- Revisão obrigatória adicional
- Treinamento adicional obrigatório
- Suspensão temporária de acesso

#### Para Agentes de IA:
- Rejeição automática de respostas
- Prompts corrigidos automaticamente
- Feedback contínuo para melhoria

### 📚 EXEMPLOS PRÁTICOS

#### Exemplo 1: Escolha de Tecnologia
**❌ INCORRETO:**
```
Vamos usar React Native porque é melhor.
```

**✅ CORRETO:**
```
ANÁLISE CRÍTICA:
- Suposições: Usuários têm smartphones modernos, precisamos de app nativo
- Alternativas: Flutter (melhor performance), Ionic (mais fácil), React Native (mais bibliotecas)
- Riscos: React Native pode ter problemas de performance, Flutter tem menos bibliotecas
- Fontes: Documentação oficial, benchmarks de performance, análise de mercado
- Validação: Teste de performance, análise de bibliotecas necessárias

RECOMENDAÇÃO: React Native
- Justificativa: Maior ecossistema de bibliotecas, equipe já conhece React
- Limitações: Performance pode ser inferior ao Flutter
- Como monitorar: Métricas de performance, feedback de usuários
```

#### Exemplo 2: Implementação de Feature
**❌ INCORRETO:**
```javascript
// Adiciona validação
function validateEmail(email) {
    return email.includes('@');
}
```

**✅ CORRETO:**
```javascript
/**
 * VALIDAÇÃO DE EMAIL
 * 
 * Suposições:
 * - Email deve ter formato válido
 * - Usuários podem cometer erros de digitação
 * 
 * Alternativas consideradas:
 * - Regex simples (rápido mas limitado)
 * - Biblioteca externa (mais robusto mas aumenta bundle)
 * - Validação no servidor (seguro mas lento)
 * 
 * Riscos:
 * - Regex pode não cobrir todos os casos
 * - Biblioteca pode ter vulnerabilidades
 * 
 * Fontes:
 * - RFC 5322 (padrão de email)
 * - Documentação da biblioteca validator.js
 * 
 * Validação:
 * - Teste com emails válidos e inválidos
 * - Medição de performance
 */
function validateEmail(email) {
    // Usando regex baseado em RFC 5322
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Testes
console.assert(validateEmail('test@example.com') === true);
console.assert(validateEmail('invalid-email') === false);
```

### 🔄 PROCESSO DE MELHORIA CONTÍNUA

#### Revisão Mensal
1. Analisar padrões de decisões
2. Identificar áreas de melhoria
3. Ajustar diretivas se necessário
4. Treinar equipe em novas práticas

#### Feedback Loop
1. Coletar feedback sobre diretivas
2. Identificar dificuldades
3. Simplificar processos complexos
4. Adicionar exemplos práticos

### 📞 SUPORTE E DÚVIDAS

#### Quando não souber:
1. **PARE** imediatamente
2. **DOCUMENTE** a dúvida
3. **BUSQUE** fontes confiáveis
4. **CONSULTE** a equipe
5. **VALIDE** antes de prosseguir

#### Contatos:
- **Líder Técnico**: Para dúvidas técnicas
- **Documentação**: Para exemplos e guias
- **Sistema de Auditoria**: Para registrar decisões

---

**Lembre-se: O objetivo não é ser perfeito, mas ser transparente, crítico e sempre buscar a verdade. Erros são aceitáveis, mas não seguir as diretivas não é.** 