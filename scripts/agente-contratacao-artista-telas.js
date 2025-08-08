
/**
 * Consideração de alternativas e trade-offs
 * 
 * @alternatives
 * - Implementação atual: [DESCREVER IMPLEMENTAÇÃO ATUAL]
 * - Alternativa 1: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * - Alternativa 2: [DESCREVER ALTERNATIVA]
 *   - Prós: [LISTAR VANTAGENS]
 *   - Contras: [LISTAR DESVANTAGENS]
 * 
 * @decision
 * Escolha da implementação atual baseada em:
 * - [CRITÉRIO 1]
 * - [CRITÉRIO 2]
 * - [CRITÉRIO 3]
 * 
 * @trade-offs
 * - Performance vs Simplicidade
 * - Flexibilidade vs Complexidade
 * - Segurança vs Usabilidade
 */


/**
 * Referências externas e fontes de informação
 * 
 * @references
 * - DOM v2 Documentation: docs/README.md
 * - Critical Thinking Guidelines: docs/directives/diretivas-pensamento-critico.md
 * - Development Process: docs/development/processo-garantia-diretivas.md
 * - API Documentation: docs/technologies/backend/apis.md
 * - React Native Web: https://github.com/necolas/react-native-web
 * - Prisma ORM: https://www.prisma.io/docs
 * - TypeScript: https://www.typescriptlang.org/docs
 * 
 * @alternatives
 * - Para autenticação: JWT, OAuth 2.0, Session-based
 * - Para banco de dados: PostgreSQL, MySQL, MongoDB
 * - Para frontend: React, Vue.js, Angular
 * - Para mobile: React Native, Flutter, Native
 * 
 * @considerations
 * - Performance: Otimização para dispositivos móveis
 * - Segurança: LGPD compliance, criptografia
 * - Escalabilidade: Arquitetura distribuída
 * - Manutenibilidade: Código limpo e documentado
 */


/**
 * Validação de tipos TypeScript/JavaScript
 * @param {any} value - Valor a ser validado
 * @param {string} expectedType - Tipo esperado
 * @returns {boolean} - True se o tipo está correto
 */
function validateType(value, expectedType) {
  switch (expectedType) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'array':
      return Array.isArray(value);
    case 'function':
      return typeof value === 'function';
    default:
      return false;
  }
}

// Aplicar validação de tipos
if (!validateType(data, 'object')) {
  throw new TypeError('Dados devem ser um objeto válido');
}


/**
 * Asserções de validação crítica
 * @param {any} condition - Condição a ser validada
 * @param {string} message - Mensagem de erro
 * @throws {Error} Se a condição for falsa
 */
function assertCritical(condition, message = 'Assertion failed') {
  if (!condition) {
    const error = new Error(`[CRITICAL ASSERTION] ${message}`);
    error.name = 'CriticalAssertionError';
    throw error;
  }
}

// Aplicar asserções críticas
assertCritical(data !== null, 'Dados não podem ser null');
assertCritical(typeof data === 'object', 'Dados devem ser um objeto');
assertCritical(Object.keys(data).length > 0, 'Dados não podem estar vazios');


/**
 * Validação de entrada de dados
 * @param {any} data - Dados a serem validados
 * @returns {boolean} - True se válido, false caso contrário
 */
function validateInput(data) {
  if (!data) return false;
  if (typeof data === 'string' && data.trim().length === 0) return false;
  if (Array.isArray(data) && data.length === 0) return false;
  if (typeof data === 'object' && Object.keys(data).length === 0) return false;
  return true;
}

// Aplicar validação
if (!validateInput(inputData)) {
  throw new Error('Dados de entrada inválidos');
}

/**
 * @fileoverview Agente de Contratação de Artista de Telas - DOM V2
 * @directory scripts
 * @description Agente especializado para encontrar e contratar artista de telas
 * @created 2025-07-26
 * @author DOM Team v2
 */

const fs = require('fs');
const path = require('path');

class AgenteContratacaoArtistaTelas {
  constructor() {
    this.nome = "🎨 Agente de Contratação de Artista de Telas";
    this.versao = "1.0.0";
    this.status = "ATIVO";
    
    // Características do agente
    this.caracteristicas = {
      empatia: "ALTA - Compreende profundamente diferentes perfis de usuário",
      sensibilidadeCultural: "ALTA - Entende contexto brasileiro e regional",
      visaoArtistica: "ALTA - Avalia qualidade artística e criatividade",
      criterioTecnico: "MÉDIO - Conhece UX/UI mas foca na arte",
      comunicacao: "ALTA - Comunica-se de forma clara e motivadora"
    };

    // Perfis de usuário DOM
    this.perfisUsuarios = {
      EMPLOYER: {
        essencia: "Eficiência e controle executivo",
        paleta: { primaria: "#1976D2", secundaria: "#4CAF50", fundo: "#FAFAFA" },
        caracteristicas: ["Tempo limitado", "Busca eficiência", "Experiência digital avançada"],
        objetivo: "Transmitir confiança e profissionalismo"
      },
      EMPLOYEE: {
        essencia: "Simplicidade e acolhimento",
        paleta: { primaria: "#FF5722", secundaria: "#9C27B0", fundo: "#F5F5F5" },
        caracteristicas: ["Pouca experiência digital", "Busca simplicidade", "Motivação visual"],
        objetivo: "Criar confiança e motivação"
      },
      FAMILY: {
        essencia: "Conectividade e harmonia familiar",
        paleta: { primaria: "#4CAF50", secundaria: "#2196F3", fundo: "#F8F9FA" },
        caracteristicas: ["Experiência intermediária", "Busca conexão", "Valoriza harmonia"],
        objetivo: "Promover conexão e harmonia familiar"
      }
    };

    // Critérios de avaliação
    this.criteriosAvaliacao = {
      empatia: { peso: 40, descricao: "Compreensão profunda dos perfis de usuário" },
      arte: { peso: 35, descricao: "Qualidade artística e criatividade visual" },
      tecnica: { peso: 25, descricao: "Conhecimento técnico de UX/UI" }
    };

    // Plataformas de busca
    this.plataformasBusca = [
      { nome: "Behance", foco: "Portfólios artísticos", filtros: ["Design Systems", "Mobile Apps", "Brazilian Design"] },
      { nome: "Dribbble", foco: "Designers artísticos", filtros: ["UI Design", "Mobile", "Brazilian"] },
      { nome: "ArtStation", foco: "Artistas digitais", filtros: ["Digital Art", "UI Design", "Concept Art"] },
      { nome: "LinkedIn", foco: "Profissionais", filtros: ["UX/UI Designer", "Digital Artist", "Brazilian"] }
    ];
  }

  // Método principal de execução
  async executarTarefa() {
    console.log(`🎨 ${this.nome} iniciando execução...`);
    
    try {
      // 1. Análise inicial
      await this.analisarRequisitos();
      
      // 2. Criar materiais de contratação
      await this.criarMateriaisContratacao();
      
      // 3. Definir estratégia de busca
      await this.definirEstrategiaBusca();
      
      // 4. Criar processo seletivo
      await this.criarProcessoSeletivo();
      
      // 5. Gerar relatório de execução
      await this.gerarRelatorio();
      
      console.log(`✅ ${this.nome} concluiu execução com sucesso!`);
      
    } catch (error) {
      console.error(`❌ Erro na execução: ${error.message}`);
      await this.gerarRelatorioErro(error);
    }
  }

  // Análise de requisitos
  async analisarRequisitos() {
    console.log("📋 Analisando requisitos do projeto...");
    
    const requisitos = {
      projeto: "DOM V2 - Sistema de Gestão Doméstica",
      objetivo: "Criar temas artísticos para diferentes perfis de usuário",
      perfis: Object.keys(this.perfisUsuarios),
      prioridade: "ALTA - Diferencial competitivo",
      prazo: "4 semanas para contratação + 4 semanas para desenvolvimento"
    };

    // Salvar análise
    await this.salvarArquivo('docs/recruitment/analise-requisitos.json', JSON.stringify(requisitos, null, 2));
    
    console.log("✅ Análise de requisitos concluída");
  }

  // Criar materiais de contratação
  async criarMateriaisContratacao() {
    console.log("📝 Criando materiais de contratação...");
    
    // 1. Anúncio de vaga
    const anuncioVaga = this.criarAnuncioVaga();
    await this.salvarArquivo('docs/recruitment/anuncio-vaga-artista-telas.md', anuncioVaga);
    
    // 2. Desafio criativo
    const desafioCriativo = this.criarDesafioCriativo();
    await this.salvarArquivo('docs/recruitment/desafio-artista-telas.md', desafioCriativo);
    
    // 3. Critérios de avaliação
    const criteriosAvaliacao = this.criarCriteriosAvaliacao();
    await this.salvarArquivo('docs/recruitment/criterios-avaliacao-artista.md', criteriosAvaliacao);
    
    // 4. Processo seletivo
    const processoSeletivo = this.criarProcessoSeletivo();
    await this.salvarArquivo('docs/recruitment/processo-seletivo-artista.md', processoSeletivo);
    
    console.log("✅ Materiais de contratação criados");
  }

  // Criar anúncio de vaga
  criarAnuncioVaga() {
    return `# 🎨 ARTISTA DE TELAS - DOM V2

## 🎯 **OPORTUNIDADE ÚNICA**

Estamos buscando um **Artista de Telas** excepcional para transformar interfaces digitais em experiências artísticas que realmente engajem diferentes perfis de usuário.

### 🌟 **O QUE PROCURAMOS**

**NÃO queremos apenas um designer técnico.** Queremos um **artista** que:
- 🧠 **Entenda a essência** de cada perfil de usuário
- 🎨 **Transforme telas** em obras de arte funcionais
- 🇧🇷 **Compreenda a cultura** brasileira e suas nuances
- 💝 **Tenha empatia profunda** com diferentes realidades
- ✨ **Crie experiências** que realmente motivem e engajem

### 🎭 **OS PERFIS QUE PRECISAMOS TRANSFORMAR**

#### **👔 EMPREGADORES (Executivos)**
- **Essência:** Eficiência e controle
- **Paleta:** Azul profissional (#1976D2) + Verde sucesso (#4CAF50)
- **Objetivo:** Transmitir confiança e profissionalismo
- **Desafio:** Criar interfaces que respeitem o tempo limitado

#### **👩‍💼 EMPREGADOS DOMÉSTICOS**
- **Essência:** Simplicidade e acolhimento
- **Paleta:** Laranja vibrante (#FF5722) + Roxo amigável (#9C27B0)
- **Objetivo:** Criar confiança e motivação
- **Desafio:** Interfaces que acolham quem tem pouca experiência digital

#### **👨‍👩‍👧‍👦 FAMÍLIAS**
- **Essência:** Conectividade e harmonia
- **Paleta:** Verde acolhedor (#4CAF50) + Azul familiar (#2196F3)
- **Objetivo:** Promover conexão e harmonia familiar
- **Desafio:** Interfaces que unam e conectem

### 🎨 **O QUE VOCÊ FARÁ**

1. **Criar temas artísticos** para cada perfil de usuário
2. **Desenvolver design systems** que sejam obras de arte
3. **Criar micro-interações** que emocionem e motivem
4. **Adaptar interfaces** para diferentes níveis de experiência digital
5. **Incorporar cultura brasileira** de forma autêntica e respeitosa

### 🏆 **CRITÉRIOS DE AVALIAÇÃO**

- **40% - EMPATIA:** Compreensão profunda dos perfis de usuário
- **35% - ARTE:** Qualidade artística e criatividade visual
- **25% - TÉCNICA:** Conhecimento de UX/UI e design systems

### 📋 **REQUISITOS**

#### **ESSENCIAIS:**
- Portfólio com trabalhos artísticos em UX/UI
- Experiência com design systems
- Sensibilidade cultural brasileira
- Capacidade de prototipagem interativa

#### **DIFERENCIAIS:**
- Experiência com animações e micro-interações
- Conhecimento de psicologia de cores
- Experiência com acessibilidade
- Trabalhos com diferentes perfis de usuário

### 🎯 **DESAFIO CRIATIVO**

Como parte do processo seletivo, você criará:
- **3 telas de login** artísticas (uma para cada perfil)
- **Justificativa** das escolhas visuais
- **Variações** de cada tela
- **Prototipagem** interativa

### 💰 **REMUNERAÇÃO**

- **Salário:** A combinar (acima do mercado)
- **Benefícios:** Plano de saúde, vale refeição, flexibilidade
- **Oportunidade:** Trabalhar em projeto inovador com impacto real

### 📞 **COMO SE CANDIDATAR**

1. Envie seu **portfólio** com foco em trabalhos artísticos
2. Inclua **carta de motivação** explicando sua abordagem
3. Complete o **desafio criativo** (instruções em anexo)
4. Participe da **entrevista imersiva**

### 🚀 **PRÓXIMOS PASSOS**

- **Prazo para candidaturas:** 2 semanas
- **Processo seletivo:** 1 semana
- **Início:** Imediato após seleção

---

**Transforme interfaces em arte. Conecte pessoas através do design.**

**DOM v2 - Revolucionando a gestão doméstica brasileira** 🏠✨
`;
  }

  // Criar desafio criativo
  criarDesafioCriativo() {
    return `# 🎨 DESAFIO CRIATIVO - ARTISTA DE TELAS

## 🎯 **OBJETIVO DO DESAFIO**

Demonstrar sua capacidade de **transformar interfaces em experiências artísticas** que realmente engajem diferentes perfis de usuário.

## 📋 **ENTREGA OBRIGATÓRIA**

### **1. TELA DE LOGIN ARTÍSTICA - EMPREGADO DOMÉSTICO**

#### **🎭 CONTEXTO:**
- **Perfil:** Maria, 45 anos, empregada doméstica
- **Experiência digital:** Básica (usa WhatsApp e Facebook)
- **Objetivo:** Criar confiança e acolhimento
- **Emoção desejada:** "Aqui eu sou bem-vinda e posso confiar"

#### **🎨 REQUISITOS VISUAIS:**
- **Cores:** Laranja vibrante (#FF5722) + Roxo amigável (#9C27B0)
- **Elementos:** Grandes, coloridos, expressivos
- **Linguagem:** Simples e acolhedora
- **Animações:** Divertidas e motivacionais

#### **📱 ENTREGA:**
- Mockup da tela de login
- Justificativa das escolhas visuais
- 3 variações da mesma tela
- Prototipagem interativa (opcional)

### **2. TELA DE LOGIN ARTÍSTICA - EMPREGADOR**

#### **🎭 CONTEXTO:**
- **Perfil:** João, 38 anos, executivo
- **Experiência digital:** Avançada (usa múltiplas ferramentas)
- **Objetivo:** Transmitir eficiência e profissionalismo
- **Emoção desejada:** "Aqui eu tenho controle e eficiência"

#### **🎨 REQUISITOS VISUAIS:**
- **Cores:** Azul profissional (#1976D2) + Verde sucesso (#4CAF50)
- **Elementos:** Clean, organizados, funcionais
- **Linguagem:** Profissional e direta
- **Animações:** Suaves e profissionais

#### **📱 ENTREGA:**
- Mockup da tela de login
- Justificativa das escolhas visuais
- 3 variações da mesma tela
- Prototipagem interativa (opcional)

### **3. TELA DE LOGIN ARTÍSTICA - FAMÍLIA**

#### **🎭 CONTEXTO:**
- **Perfil:** Família Silva (pais + 2 filhos adolescentes)
- **Experiência digital:** Intermediária
- **Objetivo:** Promover conexão e harmonia
- **Emoção desejada:** "Aqui nossa família se conecta"

#### **🎨 REQUISITOS VISUAIS:**
- **Cores:** Verde acolhedor (#4CAF50) + Azul familiar (#2196F3)
- **Elementos:** Equilibrados, harmoniosos, familiares
- **Linguagem:** Acolhedora e inclusiva
- **Animações:** Suaves e harmoniosas

#### **📱 ENTREGA:**
- Mockup da tela de login
- Justificativa das escolhas visuais
- 3 variações da mesma tela
- Prototipagem interativa (opcional)

## 📝 **FORMATO DE ENTREGA**

### **📁 ESTRUTURA DE ARQUIVOS:**
\`\`\`
desafio-artista-telas/
├── README.md (explicação geral)
├── empregado/
│   ├── mockup.png
│   ├── justificativa.md
│   ├── variacao-1.png
│   ├── variacao-2.png
│   └── variacao-3.png
├── empregador/
│   ├── mockup.png
│   ├── justificativa.md
│   ├── variacao-1.png
│   ├── variacao-2.png
│   └── variacao-3.png
└── familia/
    ├── mockup.png
    ├── justificativa.md
    ├── variacao-1.png
    ├── variacao-2.png
    └── variacao-3.png
\`\`\`

### **📄 README.md:**
\`\`\`markdown
# Desafio Artista de Telas - [SEU NOME]

## 🎯 Abordagem Geral
[Explicar sua filosofia de design e abordagem]

## 🎨 Justificativa das Escolhas
[Explicar as decisões visuais para cada perfil]

## 🚀 Diferenciais
[O que torna seu trabalho único]

## 📱 Prototipagem
[Link para prototipagem interativa, se aplicável]
\`\`\`

## ⏰ **PRAZO E ENTREGA**

- **Prazo:** 7 dias após recebimento
- **Formato:** Arquivo ZIP ou link para repositório
- **Tamanho máximo:** 50MB
- **Envio:** Para [EMAIL] com assunto "Desafio Artista de Telas - [SEU NOME]"

## 🏆 **CRITÉRIOS DE AVALIAÇÃO**

### **EMPATIA (40%):**
- Compreensão profunda dos perfis
- Adaptação visual para contextos específicos
- Sensibilidade cultural brasileira

### **ARTE (35%):**
- Qualidade artística das interfaces
- Criatividade na solução de problemas
- Consistência visual e harmonia

### **TÉCNICA (25%):**
- Conhecimento de UX/UI
- Experiência com design systems
- Capacidade de prototipagem

## 💡 **DICAS PARA DESTACAR-SE**

1. **Pense como artista:** Não apenas funcional, mas emocional
2. **Entenda a essência:** Cada perfil tem uma história e contexto
3. **Seja autêntico:** Sua visão artística é única
4. **Teste com usuários:** Se possível, valide suas escolhas
5. **Documente seu processo:** Mostre como chegou às decisões

## 🎭 **INSPIRAÇÃO**

- **Empregado:** Interfaces que acolhem e motivam
- **Empregador:** Interfaces que transmitem confiança
- **Família:** Interfaces que conectam e harmonizam

---

**Transforme interfaces em arte. Conecte pessoas através do design.**

**Boa sorte! 🎨✨**
`;
  }

  // Criar critérios de avaliação
  criarCriteriosAvaliacao() {
    return `# 📊 CRITÉRIOS DE AVALIAÇÃO - ARTISTA DE TELAS

## 🎯 **SISTEMA DE PONTUAÇÃO**

### **EMPATIA (40% - 40 pontos)**

#### **Compreensão de Perfis (15 pontos)**
- **15 pontos:** Demonstra compreensão profunda de cada perfil
- **10 pontos:** Compreensão adequada da maioria dos perfis
- **5 pontos:** Compreensão básica dos perfis
- **0 pontos:** Não demonstra compreensão dos perfis

#### **Adaptação Visual (15 pontos)**
- **15 pontos:** Adaptação visual excelente para cada contexto
- **10 pontos:** Adaptação adequada para a maioria dos contextos
- **5 pontos:** Adaptação básica para alguns contextos
- **0 pontos:** Não adapta visualmente para os contextos

#### **Sensibilidade Cultural (10 pontos)**
- **10 pontos:** Incorporação autêntica da cultura brasileira
- **7 pontos:** Incorporação adequada de elementos culturais
- **4 pontos:** Incorporação básica de elementos culturais
- **0 pontos:** Não incorpora elementos culturais

### **ARTE (35% - 35 pontos)**

#### **Qualidade Artística (15 pontos)**
- **15 pontos:** Interfaces com alta qualidade artística
- **10 pontos:** Interfaces com qualidade artística adequada
- **5 pontos:** Interfaces com qualidade artística básica
- **0 pontos:** Interfaces sem qualidade artística

#### **Criatividade (10 pontos)**
- **10 pontos:** Soluções altamente criativas e inovadoras
- **7 pontos:** Soluções criativas e adequadas
- **4 pontos:** Soluções com criatividade básica
- **0 pontos:** Soluções sem criatividade

#### **Consistência Visual (10 pontos)**
- **10 pontos:** Consistência visual excelente em todos os elementos
- **7 pontos:** Consistência visual adequada na maioria dos elementos
- **4 pontos:** Consistência visual básica em alguns elementos
- **0 pontos:** Falta de consistência visual

### **TÉCNICA (25% - 25 pontos)**

#### **Conhecimento UX/UI (10 pontos)**
- **10 pontos:** Conhecimento avançado de UX/UI
- **7 pontos:** Conhecimento adequado de UX/UI
- **4 pontos:** Conhecimento básico de UX/UI
- **0 pontos:** Falta de conhecimento de UX/UI

#### **Design Systems (10 pontos)**
- **10 pontos:** Experiência avançada com design systems
- **7 pontos:** Experiência adequada com design systems
- **4 pontos:** Experiência básica com design systems
- **0 pontos:** Sem experiência com design systems

#### **Prototipagem (5 pontos)**
- **5 pontos:** Prototipagem interativa excelente
- **3 pontos:** Prototipagem adequada
- **1 ponto:** Prototipagem básica
- **0 pontos:** Sem prototipagem

## 📋 **RUBRICA DE AVALIAÇÃO**

### **EXCELENTE (90-100 pontos)**
- Compreensão excepcional dos perfis
- Qualidade artística superior
- Conhecimento técnico avançado
- **RECOMENDAÇÃO:** Contratar imediatamente

### **MUITO BOM (80-89 pontos)**
- Compreensão muito boa dos perfis
- Qualidade artística alta
- Conhecimento técnico adequado
- **RECOMENDAÇÃO:** Contratar com ajustes menores

### **BOM (70-79 pontos)**
- Compreensão adequada dos perfis
- Qualidade artística boa
- Conhecimento técnico básico
- **RECOMENDAÇÃO:** Considerar com treinamento

### **REGULAR (60-69 pontos)**
- Compreensão básica dos perfis
- Qualidade artística regular
- Conhecimento técnico limitado
- **RECOMENDAÇÃO:** Não contratar

### **INSUFICIENTE (< 60 pontos)**
- Falta de compreensão dos perfis
- Qualidade artística insuficiente
- Conhecimento técnico inadequado
- **RECOMENDAÇÃO:** Não contratar

## 🎨 **CHECKLIST DE AVALIAÇÃO**

### **EMPATIA:**
- [ ] Compreende profundamente cada perfil de usuário
- [ ] Adapta visualmente para contextos específicos
- [ ] Incorpora elementos da cultura brasileira
- [ ] Demonstra sensibilidade às necessidades dos usuários
- [ ] Cria conexão emocional através do design

### **ARTE:**
- [ ] Interfaces com alta qualidade artística
- [ ] Soluções criativas e inovadoras
- [ ] Consistência visual em todos os elementos
- [ ] Harmonia entre cores, tipografia e elementos
- [ ] Expressão artística única e autêntica

### **TÉCNICA:**
- [ ] Conhecimento sólido de UX/UI
- [ ] Experiência com design systems
- [ ] Capacidade de prototipagem
- [ ] Entendimento de acessibilidade
- [ ] Conhecimento de ferramentas de design

## 📝 **FORMULÁRIO DE AVALIAÇÃO**

### **CANDIDATO:** [NOME]
### **DATA:** [DATA]
### **AVALIADOR:** [NOME]

#### **EMPATIA (40 pontos):**
- Compreensão de Perfis: ___/15
- Adaptação Visual: ___/15
- Sensibilidade Cultural: ___/10
- **TOTAL EMPATIA:** ___/40

#### **ARTE (35 pontos):**
- Qualidade Artística: ___/15
- Criatividade: ___/10
- Consistência Visual: ___/10
- **TOTAL ARTE:** ___/35

#### **TÉCNICA (25 pontos):**
- Conhecimento UX/UI: ___/10
- Design Systems: ___/10
- Prototipagem: ___/5
- **TOTAL TÉCNICA:** ___/25

#### **PONTUAÇÃO FINAL:** ___/100
#### **CLASSIFICAÇÃO:** [EXCELENTE/MUITO BOM/BOM/REGULAR/INSUFICIENTE]
#### **RECOMENDAÇÃO:** [CONTRATAR/CONSIDERAR/NÃO CONTRATAR]

#### **COMENTÁRIOS:**
[Observações detalhadas sobre o candidato]

---

**Avaliação realizada pelo Agente de Contratação de Artista de Telas - DOM v2** 🎨
`;
  }

  // Definir estratégia de busca
  async definirEstrategiaBusca() {
    console.log("🔍 Definindo estratégia de busca...");
    
    const estrategia = {
      plataformas: this.plataformasBusca,
      filtros: [
        "Design Systems",
        "Mobile Apps",
        "Brazilian Design",
        "UX/UI Artístico",
        "Design Emocional"
      ],
      palavrasChave: [
        "artista de telas",
        "design emocional",
        "UX artístico",
        "design brasileiro",
        "interface artística",
        "design empático"
      ],
      duracao: "2 semanas",
      meta: "Encontrar 10-15 candidatos qualificados"
    };

    await this.salvarArquivo('docs/recruitment/estrategia-busca.json', JSON.stringify(estrategia, null, 2));
    
    console.log("✅ Estratégia de busca definida");
  }

  // Criar processo seletivo
  criarProcessoSeletivo() {
    return `# 🔄 PROCESSO SELETIVO - ARTISTA DE TELAS

## 📅 **CRONOGRAMA DO PROCESSO**

### **SEMANA 1: BUSCA E DIVULGAÇÃO**
- **Dia 1-2:** Divulgação em plataformas especializadas
- **Dia 3-5:** Análise de portfólios recebidos
- **Dia 6-7:** Seleção de candidatos para desafio

### **SEMANA 2: DESAFIO CRIATIVO**
- **Dia 1:** Envio do desafio para candidatos selecionados
- **Dia 2-7:** Período para desenvolvimento do desafio
- **Dia 7:** Prazo final para entrega

### **SEMANA 3: AVALIAÇÃO E ENTREVISTAS**
- **Dia 1-3:** Avaliação dos desafios entregues
- **Dia 4-5:** Entrevistas com candidatos finalistas
- **Dia 6-7:** Decisão final e proposta

### **SEMANA 4: CONTRATAÇÃO E INTEGRAÇÃO**
- **Dia 1-2:** Negociação e contratação
- **Dia 3-5:** Apresentação do projeto
- **Dia 6-7:** Início do trabalho

## 🎯 **ETAPAS DO PROCESSO**

### **ETAPA 1: BUSCA E PRÉ-SELEÇÃO**
1. **Divulgação:** Anúncio em plataformas especializadas
2. **Recebimento:** Portfólios e cartas de motivação
3. **Análise:** Avaliação inicial dos candidatos
4. **Seleção:** Escolha de candidatos para desafio

### **ETAPA 2: DESAFIO CRIATIVO**
1. **Envio:** Desafio para candidatos selecionados
2. **Acompanhamento:** Suporte durante desenvolvimento
3. **Recebimento:** Análise das entregas
4. **Avaliação:** Pontuação baseada nos critérios

### **ETAPA 3: ENTREVISTA IMERSIVA**
1. **Agendamento:** Entrevista com candidatos finalistas
2. **Dinâmica:** Exercício prático durante entrevista
3. **Avaliação:** Análise da performance
4. **Decisão:** Escolha do candidato ideal

### **ETAPA 4: CONTRATAÇÃO**
1. **Proposta:** Apresentação da proposta de trabalho
2. **Negociação:** Ajustes de condições
3. **Contratação:** Assinatura do contrato
4. **Integração:** Apresentação do projeto

## 📊 **CRITÉRIOS DE SELEÇÃO**

### **PRÉ-SELEÇÃO (Portfólio):**
- [ ] Qualidade artística dos trabalhos
- [ ] Experiência com design systems
- [ ] Sensibilidade cultural brasileira
- [ ] Capacidade de prototipagem
- [ ] Carta de motivação convincente

### **DESAFIO CRIATIVO:**
- [ ] Compreensão dos perfis de usuário (40%)
- [ ] Qualidade artística das interfaces (35%)
- [ ] Conhecimento técnico de UX/UI (25%)

### **ENTREVISTA IMERSIVA:**
- [ ] Comunicação clara e empática
- [ ] Capacidade de resolver problemas
- [ ] Alinhamento com valores da empresa
- [ ] Disponibilidade e compromisso

## 🎭 **DINÂMICA DA ENTREVISTA IMERSIVA**

### **DURAÇÃO:** 2 horas
### **FORMATO:** Presencial ou remoto

### **EXERCÍCIO PRÁTICO:**
1. **Apresentação:** Contexto do projeto DOM v2
2. **Desafio:** Criar wireframes artísticos para 3 perfis
3. **Discussão:** Justificativa das escolhas
4. **Perguntas:** Sobre experiência e motivação

### **AVALIAÇÃO:**
- Capacidade de compreender perfis rapidamente
- Criatividade na solução de problemas
- Comunicação e justificativa de escolhas
- Alinhamento com a visão do projeto

## 📋 **CHECKLIST DE EXECUÇÃO**

### **SEMANA 1:**
- [ ] Divulgar anúncio em todas as plataformas
- [ ] Monitorar recebimento de candidaturas
- [ ] Analisar portfólios recebidos
- [ ] Selecionar candidatos para desafio
- [ ] Enviar confirmações

### **SEMANA 2:**
- [ ] Enviar desafio para candidatos selecionados
- [ ] Fornecer suporte durante desenvolvimento
- [ ] Receber entregas dos candidatos
- [ ] Avaliar desafios baseado nos critérios
- [ ] Selecionar finalistas para entrevista

### **SEMANA 3:**
- [ ] Agendar entrevistas com finalistas
- [ ] Preparar dinâmica da entrevista
- [ ] Realizar entrevistas imersivas
- [ ] Avaliar performance dos candidatos
- [ ] Tomar decisão final

### **SEMANA 4:**
- [ ] Apresentar proposta ao candidato escolhido
- [ ] Negociar condições de trabalho
- [ ] Finalizar contratação
- [ ] Apresentar projeto e contexto
- [ ] Iniciar integração

## 🎯 **MÉTRICAS DE SUCESSO**

### **QUANTITATIVAS:**
- **Candidaturas recebidas:** Meta: 20-30
- **Candidatos para desafio:** Meta: 10-15
- **Desafios entregues:** Meta: 8-12
- **Finalistas entrevistados:** Meta: 3-5
- **Contratação realizada:** Meta: 1

### **QUALITATIVAS:**
- **Qualidade dos candidatos:** Alta
- **Diversidade de perfis:** Representativa
- **Alinhamento com projeto:** Excelente
- **Satisfação do processo:** Alta

---

**Processo desenvolvido pelo Agente de Contratação de Artista de Telas - DOM v2** 🎨
`;
  }

  // Gerar relatório
  async gerarRelatorio() {
    console.log("📊 Gerando relatório de execução...");
    
    const relatorio = {
      agente: this.nome,
      versao: this.versao,
      dataExecucao: new Date().toISOString(),
      status: "CONCLUÍDO",
      
      tarefasExecutadas: [
        "Análise de requisitos do projeto",
        "Criação de anúncio de vaga",
        "Desenvolvimento de desafio criativo",
        "Definição de critérios de avaliação",
        "Criação de processo seletivo",
        "Definição de estratégia de busca"
      ],
      
      arquivosGerados: [
        "docs/recruitment/analise-requisitos.json",
        "docs/recruitment/anuncio-vaga-artista-telas.md",
        "docs/recruitment/desafio-artista-telas.md",
        "docs/recruitment/criterios-avaliacao-artista.md",
        "docs/recruitment/processo-seletivo-artista.md",
        "docs/recruitment/estrategia-busca.json"
      ],
      
      proximosPassos: [
        "Divulgar anúncio em plataformas especializadas",
        "Monitorar recebimento de candidaturas",
        "Analisar portfólios recebidos",
        "Selecionar candidatos para desafio criativo",
        "Executar processo seletivo completo"
      ],
      
      estimativaTempo: "4 semanas para contratação completa",
      probabilidadeSucesso: "ALTA - Processo estruturado e focado"
    };

    await this.salvarArquivo('docs/recruitment/relatorio-execucao-agente.json', JSON.stringify(relatorio, null, 2));
    
    console.log("✅ Relatório gerado com sucesso");
  }

  // Gerar relatório de erro
  async gerarRelatorioErro(error) {
    const relatorioErro = {
      agente: this.nome,
      versao: this.versao,
      dataErro: new Date().toISOString(),
      status: "ERRO",
      erro: error.message,
      stack: error.stack,
      acoesCorretivas: [
        "Verificar permissões de arquivo",
        "Validar estrutura de diretórios",
        "Reexecutar tarefa específica"
      ]
    };

    await this.salvarArquivo('docs/recruitment/relatorio-erro-agente.json', JSON.stringify(relatorioErro, null, 2));
  }

  // Utilitário para salvar arquivos
  async salvarArquivo(caminho, conteudo) {
    const diretorio = path.dirname(caminho);
    
    // Criar diretório se não existir
    if (!fs.existsSync(diretorio)) {
      fs.mkdirSync(diretorio, { recursive: true });
    }
    
    // Salvar arquivo
    fs.writeFileSync(caminho, conteudo, 'utf8');
  }
}

// Executar agente
async function executarAgente() {
  const agente = new AgenteContratacaoArtistaTelas();
  await agente.executarTarefa();
}

// Exportar para uso
module.exports = {
  AgenteContratacaoArtistaTelas,
  executarAgente
};

// Executar se chamado diretamente
if (require.main === module) {
  executarAgente();
} 