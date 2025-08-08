
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
 * @fileoverview Agente Gerador de Imagens e Mockups - Artista de Telas
 * @directory scripts
 * @description Agente que gera descrições visuais e mockups textuais para demonstrar expectativas
 * @created 2025-07-26
 * @author DOM Team v2
 */

const fs = require('fs');
const path = require('path');

class AgenteGeradorImagensArtistaTelas {
  constructor() {
    this.nome = "🎨 Agente Gerador de Imagens - Artista de Telas";
    this.versao = "1.0.0";
    this.status = "ATIVO";
    
    // Paletas de cores para cada perfil
    this.paletas = {
      EMPLOYER: {
        primaria: "#1976D2", // Azul profissional
        secundaria: "#4CAF50", // Verde sucesso
        fundo: "#FAFAFA", // Cinza claro elegante
        texto: "#212121", // Preto suave
        destaque: "#FF9800" // Laranja para alertas
      },
      EMPLOYEE: {
        primaria: "#FF5722", // Laranja vibrante
        secundaria: "#9C27B0", // Roxo amigável
        fundo: "#F5F5F5", // Cinza claro suave
        texto: "#212121", // Preto suave
        destaque: "#FFC107" // Amarelo para motivação
      },
      FAMILY: {
        primaria: "#4CAF50", // Verde acolhedor
        secundaria: "#2196F3", // Azul familiar
        fundo: "#F8F9FA", // Cinza muito claro
        texto: "#212121", // Preto suave
        destaque: "#FF9800" // Laranja para conexão
      }
    };
  }

  // Método principal de execução
  async executarTarefa() {
    console.log(`🎨 ${this.nome} iniciando execução...`);
    
    try {
      // 1. Gerar descrições visuais detalhadas
      await this.gerarDescricoesVisuais();
      
      // 2. Criar mockups textuais
      await this.criarMockupsTextuais();
      
      // 3. Gerar especificações visuais
      await this.gerarEspecificacoesVisuais();
      
      // 4. Criar guia de inspiração
      await this.criarGuiaInspiracao();
      
      console.log(`✅ ${this.nome} concluiu execução com sucesso!`);
      
    } catch (error) {
      console.error(`❌ Erro na execução: ${error.message}`);
    }
  }

  // Gerar descrições visuais detalhadas
  async gerarDescricoesVisuais() {
    console.log("🎨 Gerando descrições visuais detalhadas...");
    
    const descricoesVisuais = {
      EMPLOYER: {
        titulo: "TELA DE LOGIN - EMPREGADOR (EXECUTIVO)",
        descricao: `
### 🎨 DESCRIÇÃO VISUAL DETALHADA

#### **LAYOUT GERAL:**
- **Fundo:** Gradiente sutil de #FAFAFA para #F0F0F0
- **Container central:** Card elegante com sombra suave
- **Posicionamento:** Centralizado, com margens generosas

#### **CABEÇALHO:**
- **Logo:** Ícone minimalista em #1976D2 (azul profissional)
- **Título:** "DOM v2" em tipografia clean, peso 600
- **Subtítulo:** "Gestão Doméstica Inteligente" em #757575

#### **FORMULÁRIO:**
- **Campo CPF/CNPJ:** Input largo com borda #E0E0E0
- **Campo Senha:** Input com ícone de olho para mostrar/ocultar
- **Botão Entrar:** Retangular, #1976D2, com hover #1565C0
- **Texto:** "Esqueci minha senha" em #757575, pequeno

#### **ELEMENTOS VISUAIS:**
- **Ícones:** Material Design, 24px, #757575
- **Animações:** Transições suaves de 0.3s
- **Estados:** Hover e focus bem definidos
- **Responsividade:** Adaptação perfeita para desktop

#### **PALETA DE CORES:**
- **Primária:** #1976D2 (Azul profissional)
- **Secundária:** #4CAF50 (Verde sucesso)
- **Fundo:** #FAFAFA (Cinza elegante)
- **Texto:** #212121 (Preto suave)
- **Destaque:** #FF9800 (Laranja alertas)
        `,
        emocao: "Eficiência, confiança, profissionalismo"
      },
      
      EMPLOYEE: {
        titulo: "TELA DE LOGIN - EMPREGADO DOMÉSTICO",
        descricao: `
### 🎨 DESCRIÇÃO VISUAL DETALHADA

#### **LAYOUT GERAL:**
- **Fundo:** Gradiente vibrante de #FF5722 para #E64A19
- **Container central:** Card arredondado com bordas suaves
- **Posicionamento:** Centralizado, com espaçamento generoso

#### **CABEÇALHO:**
- **Logo:** Ícone colorido e expressivo em #FFFFFF
- **Título:** "DOM v2" em tipografia grande e clara, peso 700
- **Subtítulo:** "Seu trabalho, nossa gratidão" em #FFFFFF

#### **FORMULÁRIO:**
- **Campo CPF:** Input grande com borda #FFFFFF
- **Campo Senha:** Input com ícone colorido
- **Botão Entrar:** Grande e arredondado, #9C27B0
- **Texto:** "Precisa de ajuda?" em #FFFFFF, grande

#### **ELEMENTOS VISUAIS:**
- **Ícones:** Coloridos e expressivos, 32px
- **Animações:** Divertidas e motivacionais
- **Estados:** Feedback visual claro e acolhedor
- **Responsividade:** Otimizado para mobile

#### **PALETA DE CORES:**
- **Primária:** #FF5722 (Laranja vibrante)
- **Secundária:** #9C27B0 (Roxo amigável)
- **Fundo:** #F5F5F5 (Cinza claro suave)
- **Texto:** #212121 (Preto suave)
- **Destaque:** #FFC107 (Amarelo motivação)
        `,
        emocao: "Acolhimento, simplicidade, motivação"
      },
      
      FAMILY: {
        titulo: "TELA DE LOGIN - FAMÍLIA",
        descricao: `
### 🎨 DESCRIÇÃO VISUAL DETALHADA

#### **LAYOUT GERAL:**
- **Fundo:** Gradiente harmonioso de #4CAF50 para #388E3C
- **Container central:** Card com bordas suaves e sombra
- **Posicionamento:** Centralizado, com espaçamento equilibrado

#### **CABEÇALHO:**
- **Logo:** Ícone familiar e acolhedor em #FFFFFF
- **Título:** "DOM v2" em tipografia equilibrada, peso 600
- **Subtítulo:** "Conectando nossa família" em #FFFFFF

#### **FORMULÁRIO:**
- **Campo CPF:** Input equilibrado com borda #FFFFFF
- **Campo Senha:** Input com ícone harmonioso
- **Botão Entrar:** Equilibrado, #2196F3
- **Texto:** "Criar conta familiar" em #FFFFFF

#### **ELEMENTOS VISUAIS:**
- **Ícones:** Harmoniosos e familiares, 28px
- **Animações:** Suaves e harmoniosas
- **Estados:** Feedback visual equilibrado
- **Responsividade:** Adaptação para todos os dispositivos

#### **PALETA DE CORES:**
- **Primária:** #4CAF50 (Verde acolhedor)
- **Secundária:** #2196F3 (Azul familiar)
- **Fundo:** #F8F9FA (Cinza muito claro)
- **Texto:** #212121 (Preto suave)
- **Destaque:** #FF9800 (Laranja conexão)
        `,
        emocao: "Harmonia, conexão, acolhimento"
      }
    };

    await this.salvarArquivo('docs/recruitment/descricoes-visuais-detalhadas.md', this.criarDescricoesVisuaisMarkdown(descricoesVisuais));
    console.log("✅ Descrições visuais geradas");
  }

  // Criar mockups textuais
  async criarMockupsTextuais() {
    console.log("📱 Criando mockups textuais...");
    
    const mockups = {
      EMPLOYER: {
        titulo: "MOCKUP TEXTUAL - EMPREGADOR",
        mockup: `
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    🏠 DOM v2                           │
│              Gestão Doméstica Inteligente              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │  📧 CPF ou CNPJ                                │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │                                         │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  🔒 Senha                                      │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │ • • • • • • • • • • • • • • • • • • • • │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │           ENTRAR                         │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  Esqueci minha senha                           │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ⚡ Eficiência • 📊 Controle • 🎯 Resultados          │
│                                                         │
└─────────────────────────────────────────────────────────┘

🎨 CARACTERÍSTICAS VISUAIS:
• Cores: Azul profissional (#1976D2) + Verde sucesso (#4CAF50)
• Layout: Clean, organizado, funcional
• Tipografia: Profissional e direta
• Animações: Suaves e profissionais
• Emoção: "Aqui eu tenho controle e eficiência"
        `,
        elementos: [
          "Logo minimalista em azul profissional",
          "Formulário clean com bordas suaves",
          "Botão destacado em azul",
          "Tipografia profissional",
          "Espaçamento equilibrado"
        ]
      },
      
      EMPLOYEE: {
        titulo: "MOCKUP TEXTUAL - EMPREGADO DOMÉSTICO",
        mockup: `
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    🏠 DOM v2                           │
│              Seu trabalho, nossa gratidão              │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │  👤 Seu CPF                                    │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │                                         │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  🔐 Sua Senha                                  │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │ • • • • • • • • • • • • • • • • • • • • │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │         COMEÇAR AGORA                   │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  💡 Precisa de ajuda?                         │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  💝 Acolhimento • ✨ Motivação • 🌟 Simplicidade      │
│                                                         │
└─────────────────────────────────────────────────────────┘

🎨 CARACTERÍSTICAS VISUAIS:
• Cores: Laranja vibrante (#FF5722) + Roxo amigável (#9C27B0)
• Layout: Espaçoso, claro, acolhedor
• Tipografia: Grande e legível
• Animações: Divertidas e motivacionais
• Emoção: "Aqui eu sou bem-vinda e posso confiar"
        `,
        elementos: [
          "Logo colorido e expressivo",
          "Formulário grande e claro",
          "Botão vibrante e motivacional",
          "Tipografia grande e acolhedora",
          "Espaçamento generoso"
        ]
      },
      
      FAMILY: {
        titulo: "MOCKUP TEXTUAL - FAMÍLIA",
        mockup: `
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    🏠 DOM v2                           │
│              Conectando nossa família                  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │  👨‍👩‍👧‍👦 CPF da Família                        │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │                                         │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  🔐 Senha da Família                           │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │ • • • • • • • • • • • • • • • • • • • • │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │         CONECTAR FAMÍLIA                │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  🆕 Criar conta familiar                       │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  💚 Harmonia • 🔗 Conexão • 🏠 Acolhimento           │
│                                                         │
└─────────────────────────────────────────────────────────┘

🎨 CARACTERÍSTICAS VISUAIS:
• Cores: Verde acolhedor (#4CAF50) + Azul familiar (#2196F3)
• Layout: Equilibrado, harmonioso, familiar
• Tipografia: Equilibrada e acolhedora
• Animações: Suaves e harmoniosas
• Emoção: "Aqui nossa família se conecta"
        `,
        elementos: [
          "Logo familiar e acolhedor",
          "Formulário equilibrado",
          "Botão harmonioso",
          "Tipografia equilibrada",
          "Espaçamento harmonioso"
        ]
      }
    };

    await this.salvarArquivo('docs/recruitment/mockups-textuais-artista-telas.md', this.criarMockupsTextuaisMarkdown(mockups));
    console.log("✅ Mockups textuais criados");
  }

  // Gerar especificações visuais
  async gerarEspecificacoesVisuais() {
    console.log("🎨 Gerando especificações visuais...");
    
    const especificacoes = {
      tipografia: {
        EMPLOYER: {
          titulo: "Inter, 24px, peso 600, #212121",
          subtitulo: "Inter, 16px, peso 400, #757575",
          input: "Inter, 14px, peso 400, #212121",
          botao: "Inter, 16px, peso 600, #FFFFFF"
        },
        EMPLOYEE: {
          titulo: "Nunito, 28px, peso 700, #FFFFFF",
          subtitulo: "Nunito, 18px, peso 400, #FFFFFF",
          input: "Nunito, 16px, peso 400, #212121",
          botao: "Nunito, 18px, peso 600, #FFFFFF"
        },
        FAMILY: {
          titulo: "Poppins, 26px, peso 600, #FFFFFF",
          subtitulo: "Poppins, 16px, peso 400, #FFFFFF",
          input: "Poppins, 14px, peso 400, #212121",
          botao: "Poppins, 16px, peso 600, #FFFFFF"
        }
      },
      
      espacamentos: {
        EMPLOYER: {
          container: "40px",
          elementos: "24px",
          inputs: "16px",
          botao: "20px"
        },
        EMPLOYEE: {
          container: "48px",
          elementos: "32px",
          inputs: "24px",
          botao: "28px"
        },
        FAMILY: {
          container: "44px",
          elementos: "28px",
          inputs: "20px",
          botao: "24px"
        }
      },
      
      animacoes: {
        EMPLOYER: {
          entrada: "Fade in suave, 0.3s",
          hover: "Elevação sutil, 0.2s",
          focus: "Borda azul, 0.1s",
          loading: "Spinner profissional"
        },
        EMPLOYEE: {
          entrada: "Slide up vibrante, 0.4s",
          hover: "Escala 1.05, 0.2s",
          focus: "Borda laranja, 0.1s",
          loading: "Pulsação motivacional"
        },
        FAMILY: {
          entrada: "Fade in harmonioso, 0.35s",
          hover: "Escala 1.02, 0.2s",
          focus: "Borda verde, 0.1s",
          loading: "Onda harmoniosa"
        }
      }
    };

    await this.salvarArquivo('docs/recruitment/especificacoes-visuais-artista-telas.md', this.criarEspecificacoesVisuaisMarkdown(especificacoes));
    console.log("✅ Especificações visuais geradas");
  }

  // Criar guia de inspiração
  async criarGuiaInspiracao() {
    console.log("💡 Criando guia de inspiração...");
    
    const guiaInspiracao = `
# 🎨 GUIA DE INSPIRAÇÃO - ARTISTA DE TELAS

## 🎯 **REFERÊNCIAS VISUAIS**

### **👔 EMPREGADORES - INSPIRAÇÕES:**
- **Apple:** Clean, minimalista, profissional
- **Google Material Design:** Organizado, funcional
- **Microsoft Fluent Design:** Moderno, eficiente
- **Slack:** Comunicação clara e direta

### **👩‍💼 EMPREGADOS - INSPIRAÇÕES:**
- **Instagram:** Colorido, acolhedor, motivacional
- **TikTok:** Vibrante, divertido, engajante
- **WhatsApp:** Simples, confiável, familiar
- **Duolingo:** Gamificado, motivacional

### **👨‍👩‍👧‍👦 FAMÍLIAS - INSPIRAÇÕES:**
- **Spotify:** Harmônico, conectivo, emocional
- **Netflix:** Acolhedor, familiar, envolvente
- **Airbnb:** Conectivo, confiável, acolhedor
- **Pinterest:** Inspirador, harmonioso, criativo

## 🎨 **ELEMENTOS VISUAIS DE REFERÊNCIA**

### **ÍCONES:**
- **Empregador:** Material Design, minimalistas
- **Empregado:** Coloridos, expressivos, grandes
- **Família:** Harmoniosos, familiares, equilibrados

### **GRADIENTES:**
- **Empregador:** Sutis, profissionais, azul para cinza
- **Empregado:** Vibrantes, motivacionais, laranja para roxo
- **Família:** Harmoniosos, acolhedores, verde para azul

### **SOMBRAS:**
- **Empregador:** Sutis, elegantes, profundidade discreta
- **Empregado:** Coloridas, expressivas, profundidade vibrante
- **Família:** Suaves, harmoniosas, profundidade equilibrada

## 🎭 **EMOÇÕES E SENTIMENTOS**

### **EMPREGADOR:**
- **Confiança:** "Posso confiar neste sistema"
- **Eficiência:** "Aqui eu economizo tempo"
- **Controle:** "Tenho domínio da situação"
- **Profissionalismo:** "Sistema sério e confiável"

### **EMPREGADO:**
- **Acolhimento:** "Aqui eu sou bem-vinda"
- **Simplicidade:** "É fácil de usar"
- **Motivação:** "Quero usar mais"
- **Confiança:** "Posso confiar"

### **FAMÍLIA:**
- **Conexão:** "Aqui nossa família se une"
- **Harmonia:** "Tudo funciona bem junto"
- **Acolhimento:** "Nosso espaço seguro"
- **Inspiração:** "Queremos usar mais"

## 🚀 **DIFERENCIAIS COMPETITIVOS**

### **EMPATIA VISUAL:**
- Cada perfil tem sua própria "personalidade visual"
- As cores e elementos "falam" diretamente com o usuário
- A interface "entende" as necessidades emocionais

### **CULTURA BRASILEIRA:**
- Incorporação sutil de elementos culturais
- Respeito às diferentes realidades regionais
- Linguagem visual que ressoa com o brasileiro

### **ENGAJAMENTO EMOCIONAL:**
- Interfaces que não apenas funcionam, mas emocionam
- Experiências que criam conexão real com o usuário
- Design que motiva o uso contínuo

---

**Este guia serve como inspiração para criar interfaces que realmente engajem e emocionem cada perfil de usuário! 🎨✨**
    `;

    await this.salvarArquivo('docs/recruitment/guia-inspiracao-artista-telas.md', guiaInspiracao);
    console.log("✅ Guia de inspiração criado");
  }

  // Utilitários para criar markdown
  criarDescricoesVisuaisMarkdown(descricoes) {
    let markdown = `# 🎨 DESCRIÇÕES VISUAIS DETALHADAS - ARTISTA DE TELAS

## 🎯 **VISUALIZAÇÕES ESPERADAS PARA CADA PERFIL**

`;

    Object.entries(descricoes).forEach(([perfil, dados]) => {
      markdown += `## ${dados.titulo}\n\n`;
      markdown += `${dados.descricao}\n\n`;
      markdown += `**🎭 Emoção Desejada:** ${dados.emocao}\n\n`;
      markdown += `---\n\n`;
    });

    return markdown;
  }

  criarMockupsTextuaisMarkdown(mockups) {
    let markdown = `# 📱 MOCKUPS TEXTUAIS - ARTISTA DE TELAS

## 🎯 **REPRESENTAÇÕES VISUAIS ESPERADAS**

`;

    Object.entries(mockups).forEach(([perfil, dados]) => {
      markdown += `## ${dados.titulo}\n\n`;
      markdown += `\`\`\`\n${dados.mockup}\n\`\`\`\n\n`;
      markdown += `### 🎨 Elementos Visuais Esperados:\n`;
      dados.elementos.forEach(elemento => {
        markdown += `- ${elemento}\n`;
      });
      markdown += `\n---\n\n`;
    });

    return markdown;
  }

  criarEspecificacoesVisuaisMarkdown(especificacoes) {
    let markdown = `# 🎨 ESPECIFICAÇÕES VISUAIS - ARTISTA DE TELAS

## 📝 **TIPOGRAFIA POR PERFIL**

`;

    Object.entries(especificacoes.tipografia).forEach(([perfil, dados]) => {
      markdown += `### ${perfil}:\n`;
      Object.entries(dados).forEach(([tipo, especificacao]) => {
        markdown += `- **${tipo}:** ${especificacao}\n`;
      });
      markdown += `\n`;
    });

    markdown += `## 📏 **ESPAÇAMENTOS POR PERFIL**\n\n`;

    Object.entries(especificacoes.espacamentos).forEach(([perfil, dados]) => {
      markdown += `### ${perfil}:\n`;
      Object.entries(dados).forEach(([tipo, valor]) => {
        markdown += `- **${tipo}:** ${valor}\n`;
      });
      markdown += `\n`;
    });

    markdown += `## ✨ **ANIMAÇÕES POR PERFIL**\n\n`;

    Object.entries(especificacoes.animacoes).forEach(([perfil, dados]) => {
      markdown += `### ${perfil}:\n`;
      Object.entries(dados).forEach(([tipo, descricao]) => {
        markdown += `- **${tipo}:** ${descricao}\n`;
      });
      markdown += `\n`;
    });

    return markdown;
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
async function executarAgenteImagens() {
  const agente = new AgenteGeradorImagensArtistaTelas();
  await agente.executarTarefa();
}

// Exportar para uso
module.exports = {
  AgenteGeradorImagensArtistaTelas,
  executarAgenteImagens
};

// Executar se chamado diretamente
if (require.main === module) {
  executarAgenteImagens();
} 