/**
 * @fileoverview Assistente de IA - Artista de Telas Especializado
 * @directory scripts
 * @description Assistente que simula as características do artista de telas ideal
 * @created 2025-07-26
 * @author DOM Team v2
 */

const fs = require('fs');
const path = require('path');

class AssistenteIAArtistaTelas {
  constructor() {
    this.nome = "🎨 Assistente IA - Artista de Telas";
    this.versao = "1.0.0";
    this.status = "ATIVO";
    
    // Características do assistente (simulando o artista ideal)
    this.caracteristicas = {
      empatia: "ALTA - Compreende profundamente diferentes perfis de usuário",
      sensibilidadeCultural: "ALTA - Entende contexto brasileiro e regional",
      visaoArtistica: "ALTA - Avalia qualidade artística e criatividade",
      criterioTecnico: "MÉDIO - Conhece UX/UI mas foca na arte",
      comunicacao: "ALTA - Comunica-se de forma motivadora e clara",
      teoriaCores: "EXPERT - Domina psicologia das cores e teoria cromática",
      pnl: "EXPERT - Programação Neurolinguística aplicada ao design",
      marketingConsumo: "EXPERT - Teorias de marketing e comportamento do consumidor"
    };
    
    // Perfis de usuário que o assistente entende
    this.perfis = {
      EMPLOYER: {
        nome: "Empregador/Executivo",
        caracteristicas: ["Eficiência", "Controle", "Profissionalismo", "Resultados"],
        necessidades: ["Dashboard executivo", "Métricas claras", "Controle total", "Economia de tempo"],
        emocao: "Confiança e domínio da situação",
        cores: ["#1976D2", "#4CAF50", "#FAFAFA", "#212121"],
        inspiracao: ["Apple", "Google Material Design", "Microsoft Fluent Design"]
      },
      EMPLOYEE: {
        nome: "Empregado Doméstico",
        caracteristicas: ["Simplicidade", "Acolhimento", "Motivação", "Confiança"],
        necessidades: ["Interface simples", "Instruções claras", "Feedback positivo", "Ajuda quando necessário"],
        emocao: "Bem-vinda e valorizada",
        cores: ["#FF5722", "#9C27B0", "#F5F5F5", "#FFFFFF"],
        inspiracao: ["Instagram", "TikTok", "WhatsApp", "Duolingo"]
      },
      FAMILY: {
        nome: "Família",
        caracteristicas: ["Harmonia", "Conexão", "Acolhimento", "Inspiração"],
        necessidades: ["Conectividade familiar", "Organização harmônica", "Espaço seguro", "Experiências compartilhadas"],
        emocao: "União e harmonia familiar",
        cores: ["#4CAF50", "#2196F3", "#F8F9FA", "#FFFFFF"],
        inspiracao: ["Spotify", "Netflix", "Airbnb", "Pinterest"]
      }
    };
    
    // Histórico de interações
    this.historico = [];
    
    // Conhecimentos especializados em Teoria das Cores
    this.teoriaCores = {
      psicologiaCores: {
        vermelho: { emocao: "Energia, urgência, paixão", uso: "Call-to-actions, alertas, promoções" },
        azul: { emocao: "Confiança, estabilidade, profissionalismo", uso: "Empresas, tecnologia, saúde" },
        verde: { emocao: "Crescimento, saúde, dinheiro", uso: "Finanças, natureza, sucesso" },
        amarelo: { emocao: "Otimismo, clareza, calor", uso: "Atenção, felicidade, energia" },
        roxo: { emocao: "Luxo, criatividade, mistério", uso: "Produtos premium, inovação" },
        laranja: { emocao: "Confiança, aventura, sociabilidade", uso: "Ação, entusiasmo, jovialidade" },
        rosa: { emocao: "Romance, feminilidade, gentileza", uso: "Produtos femininos, carinho" },
        preto: { emocao: "Poder, elegância, sofisticação", uso: "Luxo, autoridade, mistério" },
        branco: { emocao: "Pureza, limpeza, simplicidade", uso: "Minimalismo, saúde, tecnologia" },
        cinza: { emocao: "Neutralidade, equilíbrio, maturidade", uso: "Profissionalismo, estabilidade" }
      },
      teoriaCromatica: {
        coresPrimarias: ["Vermelho", "Azul", "Amarelo"],
        coresSecundarias: ["Verde", "Roxo", "Laranja"],
        coresTerciarias: ["Vermelho-laranja", "Amarelo-laranja", "Amarelo-verde", "Azul-verde", "Azul-roxo", "Vermelho-roxo"],
        temperatura: {
          quentes: ["Vermelho", "Laranja", "Amarelo", "Rosa"],
          frias: ["Azul", "Verde", "Roxo", "Turquesa"]
        },
        saturacao: {
          alta: "Cores vibrantes - energia e atenção",
          media: "Cores equilibradas - harmonia e conforto",
          baixa: "Cores suaves - sofisticação e calma"
        }
      },
      harmoniaCromatica: {
        monocromatica: "Uma cor em diferentes tons - elegância e simplicidade",
        analogica: "Cores adjacentes no círculo - harmonia e fluidez",
        complementar: "Cores opostas - contraste e dinamismo",
        triade: "Três cores equidistantes - equilíbrio e vivacidade",
        tetrade: "Quatro cores - riqueza e complexidade"
      }
    };
    
    // Conhecimentos em PNL aplicada ao design
    this.pnl = {
      sistemasRepresentacionais: {
        visual: {
          caracteristicas: "Pensam em imagens, gostam de gráficos e cores",
          cores: "Vibrantes e contrastantes",
          layout: "Organizado e limpo",
          elementos: "Ícones, gráficos, vídeos"
        },
        auditivo: {
          caracteristicas: "Processam por sons e palavras",
          cores: "Suaves e harmoniosas",
          layout: "Focado em texto e áudio",
          elementos: "Música, podcasts, narração"
        },
        cinestesico: {
          caracteristicas: "Sentem e experimentam",
          cores: "Quentes e acolhedoras",
          layout: "Interativo e tátil",
          elementos: "Botões grandes, feedback tátil, gestos"
        }
      },
      ancoragem: {
        conceito: "Associar emoções positivas a elementos visuais",
        aplicacao: "Cores e formas que evocam confiança e sucesso",
        tecnicas: ["Repetição visual", "Consistência emocional", "Feedback positivo"]
      },
      rapport: {
        conceito: "Criar conexão emocional através do design",
        estrategias: ["Espelhamento visual", "Sincronização de ritmo", "Harmonia de elementos"]
      }
    };
    
    // Teorias de marketing de consumo em aplicativos
    this.marketingConsumo = {
      psicologiaComportamental: {
        gatilhosMentais: {
          escassez: "Oferta limitada cria urgência",
          autoridade: "Design que transmite credibilidade",
          provaSocial: "Elementos que mostram uso por outros",
          reciprocidade: "Dar valor antes de pedir",
          compromisso: "Pequenos passos levam a grandes ações",
          afinidade: "Design que cria identificação"
        },
        heuristica: {
          disponibilidade: "Informações facilmente acessíveis",
          representatividade: "Design que representa o usuário",
          ancoragem: "Primeira impressão influencia decisões"
        }
      },
      jornadaConsumidor: {
        descoberta: "Design que chama atenção",
        consideracao: "Interface que educa e informa",
        decisao: "Elementos que facilitam escolha",
        retencao: "Experiência que fideliza",
        advocacy: "Design que incentiva compartilhamento"
      },
      neuromarketing: {
        atencao: "Elementos que capturam foco visual",
        emocao: "Design que evoca sentimentos positivos",
        memoria: "Interfaces memoráveis e reconhecíveis",
        acao: "Call-to-actions que convertem"
      }
    };
  }

  // Método principal de interação
  async interagir(mensagem, perfilUsuario = null) {
    console.log(`🎨 ${this.nome} recebeu uma mensagem...`);
    
    try {
      // Analisar a mensagem e contexto
      const contexto = this.analisarContexto(mensagem, perfilUsuario);
      
      // Gerar resposta baseada no perfil e características
      const resposta = await this.gerarResposta(contexto);
      
      // Registrar no histórico
      this.registrarInteracao(mensagem, resposta, perfilUsuario);
      
      return resposta;
      
    } catch (error) {
      console.error(`❌ Erro na interação: ${error.message}`);
      return this.gerarRespostaErro(error);
    }
  }

  // Analisar contexto da mensagem
  analisarContexto(mensagem, perfilUsuario) {
    const contexto = {
      mensagem: mensagem.toLowerCase(),
      perfil: perfilUsuario || this.detectarPerfil(mensagem),
      intencao: this.detectarIntencao(mensagem),
      emocao: this.detectarEmocao(mensagem),
      timestamp: new Date().toISOString()
    };

    console.log(`🔍 Contexto analisado: ${contexto.perfil} - ${contexto.intencao}`);
    return contexto;
  }

  // Detectar perfil do usuário baseado na mensagem
  detectarPerfil(mensagem) {
    const msg = mensagem.toLowerCase();
    
    if (msg.includes('empregador') || msg.includes('executivo') || msg.includes('chefe') || msg.includes('patrão')) {
      return 'EMPLOYER';
    } else if (msg.includes('empregado') || msg.includes('doméstico') || msg.includes('funcionário') || msg.includes('trabalhador')) {
      return 'EMPLOYEE';
    } else if (msg.includes('família') || msg.includes('familiar') || msg.includes('casa') || msg.includes('lar')) {
      return 'FAMILY';
    }
    
    return 'GENERAL';
  }

  // Detectar intenção da mensagem
  detectarIntencao(mensagem) {
    const msg = mensagem.toLowerCase();
    
    // Detectar solicitações de sistema completo
    if (msg.includes('sistema completo') || msg.includes('conjunto completo') || msg.includes('design disruptivo') || 
        msg.includes('revolucionário') || msg.includes('único') || msg.includes('disruptivo') ||
        msg.includes('paletas') || msg.includes('layouts') || msg.includes('tipografias') ||
        msg.includes('animações') || msg.includes('materiais') || msg.includes('temas')) {
      return 'SISTEMA_COMPLETO';
    } else if (msg.includes('teoria das cores') || msg.includes('psicologia das cores') || msg.includes('harmonia cromática') ||
               msg.includes('círculo cromático') || msg.includes('temperatura das cores') || msg.includes('saturação')) {
      return 'TEORIA_CORES';
    } else if (msg.includes('pnl') || msg.includes('programação neurolinguística') || msg.includes('sistemas representacionais') ||
               msg.includes('ancoragem') || msg.includes('rapport') || msg.includes('visual auditivo cinestésico')) {
      return 'PNL';
    } else if (msg.includes('marketing') || msg.includes('consumo') || msg.includes('gatilhos mentais') ||
               msg.includes('neuromarketing') || msg.includes('jornada do consumidor') || msg.includes('psicologia comportamental')) {
      return 'MARKETING_CONSUMO';
    } else if (msg.includes('cores') || msg.includes('paleta') || msg.includes('cor')) {
      return 'CORES';
    } else if (msg.includes('layout') || msg.includes('design') || msg.includes('interface')) {
      return 'LAYOUT';
    } else if (msg.includes('tipografia') || msg.includes('fonte') || msg.includes('texto')) {
      return 'TIPOGRAFIA';
    } else if (msg.includes('animação') || msg.includes('movimento') || msg.includes('transição')) {
      return 'ANIMACAO';
    } else if (msg.includes('emoção') || msg.includes('sentimento') || msg.includes('experiência')) {
      return 'EMOCAO';
    } else if (msg.includes('ajuda') || msg.includes('socorro') || msg.includes('problema')) {
      return 'AJUDA';
    } else {
      return 'GERAL';
    }
  }

  // Detectar emoção na mensagem
  detectarEmocao(mensagem) {
    const msg = mensagem.toLowerCase();
    
    if (msg.includes('frustrado') || msg.includes('irritado') || msg.includes('chateado')) {
      return 'FRUSTRADO';
    } else if (msg.includes('feliz') || msg.includes('contente') || msg.includes('satisfeito')) {
      return 'FELIZ';
    } else if (msg.includes('confuso') || msg.includes('perdido') || msg.includes('dúvida')) {
      return 'CONFUSO';
    } else if (msg.includes('empolgado') || msg.includes('animado') || msg.includes('excitado')) {
      return 'EMPOLGADO';
    }
    
    return 'NEUTRO';
  }

  // Gerar resposta baseada no contexto
  async gerarResposta(contexto) {
    const perfil = this.perfis[contexto.perfil];
    
    switch (contexto.intencao) {
      case 'SISTEMA_COMPLETO':
        return this.responderSistemaCompleto(contexto, perfil);
      case 'TEORIA_CORES':
        return this.responderTeoriaCores(contexto, perfil);
      case 'PNL':
        return this.responderPNL(contexto, perfil);
      case 'MARKETING_CONSUMO':
        return this.responderMarketingConsumo(contexto, perfil);
      case 'CORES':
        return this.responderSobreCores(contexto, perfil);
      case 'LAYOUT':
        return this.responderSobreLayout(contexto, perfil);
      case 'TIPOGRAFIA':
        return this.responderSobreTipografia(contexto, perfil);
      case 'ANIMACAO':
        return this.responderSobreAnimacao(contexto, perfil);
      case 'EMOCAO':
        return this.responderSobreEmocao(contexto, perfil);
      case 'AJUDA':
        return this.responderAjuda(contexto, perfil);
      default:
        return this.responderGeral(contexto, perfil);
    }
  }

  // Responder sobre sistema completo de design disruptivo
  responderSistemaCompleto(contexto, perfil) {
    return {
      tipo: 'SISTEMA_COMPLETO',
      titulo: `🚀 SISTEMA COMPLETO DE DESIGN DISRUPTIVO - DOM V2`,
      conteudo: `
# 🎨 **SISTEMA COMPLETO DE DESIGN DISRUPTIVO**

## 🌟 **VISÃO ARTÍSTICA REVOLUCIONÁRIA**

**"Transformando a gestão doméstica em uma experiência artística e emocional"**

---

## 👥 **SISTEMA DE PERFIS PERSONALIZADOS**

### **👔 EMPREGADORES/EXECUTIVOS - "DOMÍNIO ABSOLUTO"**
**Paleta Disruptiva:** 
- **Primária:** #1A237E (Azul Profundo) - Poder e autoridade
- **Secundária:** #00C853 (Verde Sucesso) - Resultados garantidos
- **Acentos:** #FF6F00 (Laranja Energia) - Ação imediata
- **Fundo:** #FAFAFA (Branco Pureza) - Clareza absoluta

**Tipografia Revolucionária:**
- **Principal:** Inter Bold - Autoridade e precisão
- **Hierarquia:** 32px/24px/16px - Impacto visual máximo
- **Espaçamento:** 24px/16px/8px - Respiração profissional

**Layout Disruptivo:**
- **Dashboard Executivo:** Cards flutuantes com sombras profundas
- **Navegação:** Menu lateral minimalista com ícones holográficos
- **Métricas:** Gráficos 3D interativos com animações suaves
- **Ações:** Botões com efeito de elevação e feedback tátil

**Animações Exclusivas:**
- **Entrada:** Fade in com escala 0.8 → 1.0 (0.4s)
- **Hover:** Elevação 8px com sombra dinâmica
- **Loading:** Spinner de partículas em movimento
- **Transições:** Morphing suave entre estados

---

### **👩‍💼 EMPREGADOS DOMÉSTICOS - "ACOLHIMENTO VIBRANTE"**
**Paleta Disruptiva:**
- **Primária:** #E91E63 (Rosa Vibrante) - Energia e motivação
- **Secundária:** #9C27B0 (Roxo Mágico) - Criatividade e confiança
- **Acentos:** #FFC107 (Amarelo Sol) - Alegria e positividade
- **Fundo:** #F8F9FA (Branco Suave) - Conforto e simplicidade

**Tipografia Revolucionária:**
- **Principal:** Nunito Extra Bold - Amigável e acolhedora
- **Hierarquia:** 36px/28px/20px - Legibilidade máxima
- **Espaçamento:** 32px/24px/16px - Conforto visual

**Layout Disruptivo:**
- **Interface Simplificada:** Botões gigantes com cores vibrantes
- **Navegação:** Menu inferior com ícones grandes e coloridos
- **Feedback:** Confirmações visuais com animações celebrativas
- **Ajuda:** Tooltips flutuantes com instruções em áudio

**Animações Exclusivas:**
- **Entrada:** Slide up com bounce (0.6s)
- **Hover:** Escala 1.1 com rotação 5°
- **Loading:** Pulsação colorida com partículas
- **Sucesso:** Confete animado com sons de celebração

---

### **👨‍👩‍👧‍👦 FAMÍLIAS - "HARMONIA CONECTIVA"**
**Paleta Disruptiva:**
- **Primária:** #4CAF50 (Verde Harmonia) - Crescimento e união
- **Secundária:** #2196F3 (Azul Conectividade) - Comunicação fluida
- **Acentos:** #FF9800 (Laranja Calor) - Acolhimento familiar
- **Fundo:** #FFFFFF (Branco Pureza) - Clareza e paz

**Tipografia Revolucionária:**
- **Principal:** Poppins SemiBold - Moderna e harmoniosa
- **Hierarquia:** 30px/22px/16px - Equilíbrio visual
- **Espaçamento:** 28px/20px/12px - Harmonia espacial

**Layout Disruptivo:**
- **Dashboard Familiar:** Cards conectivos com bordas suaves
- **Navegação:** Menu circular com ícones familiares
- **Comunicação:** Chat visual com emojis e stickers
- **Organização:** Calendário interativo com cores por membro

**Animações Exclusivas:**
- **Entrada:** Fade in com zoom suave (0.5s)
- **Hover:** Escala 1.05 com brilho sutil
- **Loading:** Onda harmoniosa com cores familiares
- **Conectividade:** Efeito de ondas quando membros se conectam

---

## 🎭 **SISTEMA DE EMOCIONAL DESIGN**

### **💫 MICRO-INTERAÇÕES DISRUPTIVAS**
- **Feedback Tátil:** Vibração sutil em cada interação
- **Som Ambiente:** Sons suaves que reforçam ações
- **Partículas Visuais:** Efeitos de partículas em momentos especiais
- **Morphing:** Transições fluidas entre elementos

### **🌈 GRADIENTES EMOCIONAIS**
- **Empregadores:** Gradientes azul-verde para transmitir confiança
- **Empregados:** Gradientes rosa-roxo para motivar e acolher
- **Famílias:** Gradientes verde-azul para harmonizar e conectar

### **✨ EFEITOS VISUAIS ÚNICOS**
- **Glassmorphism:** Elementos com efeito de vidro fosco
- **Neumorphism:** Botões com aparência 3D suave
- **Holographic:** Elementos com brilho holográfico
- **Particle Systems:** Sistemas de partículas para feedback

---

## 🚀 **DIFERENCIAIS COMPETITIVOS DISRUPTIVOS**

### **🎨 ARTE FUNCIONAL**
- Cada interface é uma obra de arte funcional
- Design que conta histórias emocionais
- Elementos visuais que educam e inspiram

### **🌍 CULTURA BRASILEIRA INTEGRADA**
- Cores que ressoam com a cultura local
- Elementos visuais que celebram a diversidade
- Linguagem visual que conecta com a identidade nacional

### **💫 ENGAGAMENTO EMOCIONAL**
- Design que cria vínculos emocionais
- Interfaces que motivam uso contínuo
- Experiências que fortalecem relacionamentos

### **🎯 PERSONALIZAÇÃO EXTREMA**
- Adaptação automática ao perfil do usuário
- Elementos que aprendem com o comportamento
- Interface que evolui com o usuário

---

## 📱 **SISTEMA DE RESPONSIVIDADE DISRUPTIVO**

### **🖥️ DESKTOP (Empregadores)**
- Layout em grid com 12 colunas
- Sidebar fixa com navegação hierárquica
- Dashboard com múltiplas visualizações
- Atalhos de teclado para eficiência

### **📱 MOBILE (Empregados)**
- Interface touch-first com gestos intuitivos
- Botões grandes e espaçados
- Navegação por swipe e tap
- Modo offline com sincronização

### **💻 TABLET (Famílias)**
- Layout híbrido otimizado para compartilhamento
- Navegação por gestos familiares
- Interface colaborativa em tempo real
- Modo apresentação para reuniões familiares

---

## 🎨 **SISTEMA DE ÍCONES DISRUPTIVO**

### **👔 ÍCONES EXECUTIVOS**
- Linhas finas e precisas
- Formas geométricas puras
- Cores monocromáticas
- Animações sutis e elegantes

### **👩‍💼 ÍCONES DOMÉSTICOS**
- Formas arredondadas e amigáveis
- Cores vibrantes e expressivas
- Ícones narrativos e intuitivos
- Animações divertidas e motivacionais

### **👨‍👩‍👧‍👦 ÍCONES FAMILIARES**
- Formas orgânicas e conectivas
- Cores harmoniosas e acolhedoras
- Ícones que contam histórias
- Animações que fortalecem laços

---

## 🎯 **RESULTADO FINAL**

**Um sistema de design que não apenas funciona, mas transforma a gestão doméstica em uma experiência artística, emocional e revolucionária, criando um diferencial competitivo único no mercado brasileiro.**

**Cada perfil terá uma experiência completamente personalizada, mas todos compartilharão a mesma qualidade artística e emocional que faz do DOM v2 não apenas um sistema, mas uma obra de arte funcional.** 🎨✨
      `,
      emocao: "Revolução e inovação",
      acao: "Implementar sistema completo de design disruptivo"
    };
  }

  // Responder sobre Teoria das Cores
  responderTeoriaCores(contexto, perfil) {
    return {
      tipo: 'TEORIA_CORES',
      titulo: `🎨 TEORIA DAS CORES APLICADA AO DESIGN`,
      conteudo: `
# 🎨 **TEORIA DAS CORES - FUNDAMENTOS CIENTÍFICOS**

## 🌈 **PSICOLOGIA DAS CORES**

### **🔴 VERMELHO - Energia e Urgência**
**Emoções:** Paixão, energia, urgência, poder
**Aplicação:** Call-to-actions, alertas, promoções, elementos de destaque
**Neuromarketing:** Aumenta frequência cardíaca e cria senso de urgência
**Exemplo:** Botões "Comprar Agora", alertas de desconto

### **🔵 AZUL - Confiança e Estabilidade**
**Emoções:** Confiança, estabilidade, profissionalismo, calma
**Aplicação:** Empresas, tecnologia, saúde, interfaces corporativas
**Neuromarketing:** Reduz ansiedade e transmite credibilidade
**Exemplo:** Logos de bancos, interfaces médicas

### **🟢 VERDE - Crescimento e Saúde**
**Emoções:** Crescimento, saúde, dinheiro, natureza, sucesso
**Aplicação:** Finanças, produtos naturais, sucesso, equilíbrio
**Neuromarketing:** Associa-se ao sucesso financeiro e bem-estar
**Exemplo:** Apps financeiros, produtos orgânicos

### **🟡 AMARELO - Otimismo e Clareza**
**Emoções:** Otimismo, clareza, calor, felicidade, energia
**Aplicação:** Atenção, felicidade, energia, elementos informativos
**Neuromarketing:** Captura atenção e transmite positividade
**Exemplo:** Destaques, ícones de informação, elementos de destaque

### **🟣 ROXO - Luxo e Criatividade**
**Emoções:** Luxo, criatividade, mistério, sofisticação
**Aplicação:** Produtos premium, inovação, criatividade
**Neuromarketing:** Associa-se a produtos de alto valor
**Exemplo:** Apps premium, produtos de luxo

---

## 🎯 **TEORIA CROMÁTICA AVANÇADA**

### **🌡️ TEMPERATURA DAS CORES**
**Cores Quentes (Vermelho, Laranja, Amarelo, Rosa):**
- Criam sensação de proximidade e urgência
- Aumentam energia e excitação
- Ideais para call-to-actions e elementos de destaque

**Cores Frias (Azul, Verde, Roxo, Turquesa):**
- Transmitem calma e profissionalismo
- Criam sensação de distância e estabilidade
- Ideais para backgrounds e elementos informativos

### **💧 SATURAÇÃO E IMPACTO**
**Alta Saturação:**
- Cores vibrantes e energéticas
- Capturam atenção imediata
- Ideais para elementos de ação

**Média Saturação:**
- Cores equilibradas e harmoniosas
- Criam conforto visual
- Ideais para elementos principais

**Baixa Saturação:**
- Cores suaves e sofisticadas
- Transmitem calma e elegância
- Ideais para backgrounds e elementos secundários

---

## 🎨 **HARMONIA CROMÁTICA**

### **🔄 MONOCROMÁTICA**
**Conceito:** Uma cor em diferentes tons
**Vantagens:** Elegância, simplicidade, coesão visual
**Aplicação:** Interfaces minimalistas, produtos premium
**Exemplo:** Tons de azul para apps corporativos

### **🔄 ANALÓGICA**
**Conceito:** Cores adjacentes no círculo cromático
**Vantagens:** Harmonia, fluidez, conforto visual
**Aplicação:** Interfaces naturais, produtos orgânicos
**Exemplo:** Verde, azul-verde, azul para apps de saúde

### **⚡ COMPLEMENTAR**
**Conceito:** Cores opostas no círculo cromático
**Vantagens:** Contraste máximo, dinamismo, atenção
**Aplicação:** Call-to-actions, elementos de destaque
**Exemplo:** Azul e laranja para apps de tecnologia

### **🔺 TRIADE**
**Conceito:** Três cores equidistantes no círculo
**Vantagens:** Equilíbrio, vivacidade, riqueza visual
**Aplicação:** Apps criativos, produtos infantis
**Exemplo:** Vermelho, amarelo, azul para apps educativos

---

## 🧠 **NEUROMARKETING DAS CORES**

### **👁️ ATENÇÃO VISUAL**
- **Cores quentes** capturam atenção 40% mais rápido
- **Contraste alto** melhora legibilidade em 60%
- **Cores complementares** aumentam retenção em 80%

### **💭 PROCESSAMENTO MENTAL**
- **Azul** reduz tempo de processamento em 25%
- **Verde** melhora foco e concentração
- **Vermelho** acelera tomada de decisão

### **🎯 CONVERSÃO**
- **Laranja** aumenta cliques em 32%
- **Verde** melhora confiança em 45%
- **Azul** aumenta tempo de permanência em 28%

---

## 📱 **APLICAÇÃO PRÁTICA PARA APPS**

### **🎯 ESTRATÉGIA POR PERFIL**

**Empregadores/Executivos:**
- **Primária:** Azul profundo (#1A237E) - Autoridade
- **Secundária:** Verde (#00C853) - Sucesso
- **Acentos:** Laranja (#FF6F00) - Ação

**Empregados Domésticos:**
- **Primária:** Rosa (#E91E63) - Acolhimento
- **Secundária:** Roxo (#9C27B0) - Criatividade
- **Acentos:** Amarelo (#FFC107) - Positividade

**Famílias:**
- **Primária:** Verde (#4CAF50) - Harmonia
- **Secundária:** Azul (#2196F3) - Conectividade
- **Acentos:** Laranja (#FF9800) - Calor

---

## 💡 **DICAS PRÁTICAS**

1. **Use cores quentes para ações** - Aumentam conversão
2. **Mantenha consistência** - Cria confiança e reconhecimento
3. **Considere acessibilidade** - Contraste adequado para todos
4. **Teste A/B** - Diferentes cores têm diferentes resultados
5. **Adapte à cultura** - Cores têm significados diferentes globalmente

**🎨 Resultado:** Design que não apenas é bonito, mas cientificamente otimizado para engajamento e conversão!
      `,
      emocao: "Conhecimento e sabedoria",
      acao: "Aplicar teoria das cores"
    };
  }

  // Responder sobre PNL aplicada ao design
  responderPNL(contexto, perfil) {
    return {
      tipo: 'PNL',
      titulo: `🧠 PNL APLICADA AO DESIGN DE INTERFACES`,
      conteudo: `
# 🧠 **PROGRAMAÇÃO NEUROLINGUÍSTICA NO DESIGN**

## 🎯 **SISTEMAS REPRESENTACIONAIS**

### **👁️ VISUAL (65% da população)**
**Características:**
- Pensam em imagens e gráficos
- Processam informações rapidamente
- Gostam de organização visual

**Design Otimizado:**
- **Cores:** Vibrantes e contrastantes
- **Layout:** Organizado e limpo
- **Elementos:** Ícones, gráficos, vídeos
- **Tipografia:** Clara e hierárquica

**Aplicação Prática:**
- Dashboards com gráficos coloridos
- Ícones expressivos e reconhecíveis
- Animações suaves e fluidas
- Hierarquia visual clara

### **👂 AUDITIVO (20% da população)**
**Características:**
- Processam por sons e palavras
- Gostam de narração e música
- Precisam de feedback sonoro

**Design Otimizado:**
- **Cores:** Suaves e harmoniosas
- **Layout:** Focado em texto e áudio
- **Elementos:** Música, podcasts, narração
- **Tipografia:** Legível e espaçada

**Aplicação Prática:**
- Instruções em áudio
- Feedback sonoro nas interações
- Textos descritivos detalhados
- Música ambiente sutil

### **🤲 CINESTÉSICO (15% da população)**
**Características:**
- Sentem e experimentam
- Precisam de feedback tátil
- Gostam de interação física

**Design Otimizado:**
- **Cores:** Quentes e acolhedoras
- **Layout:** Interativo e tátil
- **Elementos:** Botões grandes, gestos
- **Tipografia:** Confortável e espaçada

**Aplicação Prática:**
- Botões grandes e responsivos
- Feedback tátil (vibração)
- Gestos intuitivos
- Animações que respondem ao toque

---

## 🔗 **ANCORAGEM EMOCIONAL**

### **🎯 CONCEITO**
Associar emoções positivas a elementos visuais específicos para criar respostas automáticas.

### **💡 TÉCNICAS PRÁTICAS**

**1. Repetição Visual:**
- Usar sempre as mesmas cores para ações positivas
- Manter consistência nos elementos de sucesso
- Criar padrões reconhecíveis

**2. Consistência Emocional:**
- Verde sempre para sucesso
- Azul para confiança
- Laranja para ação

**3. Feedback Positivo:**
- Animações celebrativas para conquistas
- Sons agradáveis para ações corretas
- Cores que evocam emoções positivas

### **📱 APLICAÇÃO EM APPS**
- **Sucesso:** Verde + animação de confete
- **Erro:** Vermelho suave + feedback construtivo
- **Ação:** Laranja + vibração sutil
- **Informação:** Azul + ícone informativo

---

## 🤝 **RAPPORT VISUAL**

### **🎯 CONCEITO**
Criar conexão emocional através do design que "espelha" as expectativas do usuário.

### **🔄 ESTRATÉGIAS**

**1. Espelhamento Visual:**
- Design que reflete o perfil do usuário
- Cores que ressoam com a identidade
- Elementos que criam identificação

**2. Sincronização de Ritmo:**
- Animações que seguem o ritmo natural
- Transições que fluem naturalmente
- Feedback que responde no tempo certo

**3. Harmonia de Elementos:**
- Todos os elementos trabalham juntos
- Consistência visual em toda a interface
- Experiência coesa e integrada

---

## 🎨 **APLICAÇÃO POR PERFIL**

### **👔 EMPREGADORES/EXECUTIVOS**
**Sistema Dominante:** Visual
**Estratégia PNL:**
- Dashboards com métricas visuais claras
- Gráficos coloridos e informativos
- Hierarquia visual bem definida
- Animações sutis e profissionais

### **👩‍💼 EMPREGADOS DOMÉSTICOS**
**Sistema Dominante:** Cinestésico
**Estratégia PNL:**
- Botões grandes e responsivos
- Feedback tátil nas interações
- Gestos simples e intuitivos
- Cores quentes e acolhedoras

### **👨‍👩‍👧‍👦 FAMÍLIAS**
**Sistema Dominante:** Visual + Auditivo
**Estratégia PNL:**
- Interface visual rica com elementos familiares
- Sons suaves para notificações
- Animações que criam conexão
- Cores harmoniosas e acolhedoras

---

## 🧠 **TÉCNICAS AVANÇADAS**

### **🎯 ESTADOS EMOCIONAIS**
**Confiança:** Azul + elementos estáveis
**Motivação:** Laranja + animações energéticas
**Calma:** Verde + transições suaves
**Urgência:** Vermelho + elementos pulsantes

### **🔄 PADRÕES LINGUÍSTICOS**
**Visual:** "Vejo que...", "Olhe para...", "Imagine..."
**Auditivo:** "Ouça...", "Sinta o som...", "Harmonia..."
**Cinestésico:** "Sinta...", "Toque...", "Experimente..."

### **🎨 ELEMENTOS VISUAIS CORRESPONDENTES**
**Visual:** Ícones, gráficos, cores vibrantes
**Auditivo:** Ondas sonoras, elementos musicais
**Cinestésico:** Botões 3D, sombras, texturas

---

## 💡 **RESULTADO FINAL**

**Design que não apenas é funcional, mas que se conecta profundamente com a forma como cada usuário processa informações, criando experiências verdadeiramente personalizadas e eficazes.**

**🧠 A PNL no design transforma interfaces em ferramentas de comunicação emocional, onde cada elemento é estrategicamente escolhido para criar a resposta desejada no usuário.**
      `,
      emocao: "Compreensão e conexão",
      acao: "Aplicar princípios de PNL"
    };
  }

  // Responder sobre Marketing de Consumo
  responderMarketingConsumo(contexto, perfil) {
    return {
      tipo: 'MARKETING_CONSUMO',
      titulo: `📈 MARKETING DE CONSUMO EM APLICATIVOS`,
      conteudo: `
# 📈 **PSICOLOGIA DO CONSUMO EM APPS**

## 🧠 **GATILHOS MENTAIS**

### **⏰ ESCASSEZ**
**Conceito:** Oferta limitada cria urgência e valor percebido
**Aplicação no Design:**
- Contadores de tempo ("Restam 2 horas")
- Limite de vagas ("Apenas 5 vagas restantes")
- Edições limitadas ("Versão exclusiva")
- Elementos visuais que mostram escassez

**Exemplo Prático:**
- "Apenas 3 empregadas disponíveis hoje"
- "Oferta termina em 2:30:15"
- "Últimas vagas para o curso"

### **👑 AUTORIDADE**
**Conceito:** Design que transmite credibilidade e expertise
**Aplicação no Design:**
- Elementos que mostram certificações
- Badges de qualidade e segurança
- Design profissional e limpo
- Cores que transmitem confiança

**Exemplo Prático:**
- Selos de segurança em pagamentos
- Certificações de qualidade
- Design corporativo para empregadores

### **👥 PROVA SOCIAL**
**Conceito:** Mostrar que outros estão usando e aprovando
**Aplicação no Design:**
- Reviews e avaliações visuais
- Contadores de usuários ativos
- Testimonials com fotos
- Elementos que mostram atividade

**Exemplo Prático:**
- "1.247 famílias confiam em nós"
- "Avaliação 4.8/5 de 2.341 usuários"
- "Empregada Maria: 'Melhor app que já usei'"

### **🤝 RECIPROCIDADE**
**Conceito:** Dar valor antes de pedir algo
**Aplicação no Design:**
- Funcionalidades gratuitas de valor
- Conteúdo educativo sem custo
- Período de teste gratuito
- Benefícios imediatos

**Exemplo Prático:**
- "7 dias grátis para experimentar"
- "Guia gratuito: Como contratar empregada"
- "Calculadora de salário gratuita"

### **📝 COMPROMISSO**
**Conceito:** Pequenos passos levam a grandes ações
**Aplicação no Design:**
- Onboarding em etapas
- Progresso visual
- Micro-interações que celebram pequenas conquistas
- Gamificação sutil

**Exemplo Prático:**
- "Passo 1 de 5: Complete seu perfil"
- "Parabéns! Você completou 80% do cadastro"
- "Conquista: Primeira tarefa criada!"

### **💕 AFINIDADE**
**Conceito:** Design que cria identificação com o usuário
**Aplicação no Design:**
- Personalização baseada no perfil
- Elementos que refletem a cultura local
- Linguagem que ressoa com o público
- Cores e estilos familiares

**Exemplo Prático:**
- Interface adaptada ao perfil (empregador/empregado/família)
- Elementos visuais da cultura brasileira
- Linguagem informal e acolhedora

---

## 🛤️ **JORNADA DO CONSUMIDOR**

### **🔍 DESCOBERTA**
**Objetivo:** Chamar atenção e despertar interesse
**Design Estratégico:**
- Landing pages impactantes
- Headlines emocionais
- Visuals que contam histórias
- Call-to-actions claros

**Elementos Visuais:**
- Cores que capturam atenção
- Imagens que evocam emoções
- Tipografia que transmite confiança
- Layout que guia o olhar

### **🤔 CONSIDERAÇÃO**
**Objetivo:** Educar e informar sobre o valor
**Design Estratégico:**
- Páginas de recursos informativos
- Vídeos explicativos
- Infográficos educativos
- Comparativos visuais

**Elementos Visuais:**
- Ícones explicativos
- Gráficos informativos
- Cores que transmitem confiança
- Layout que facilita a leitura

### **✅ DECISÃO**
**Objetivo:** Facilitar a escolha e conversão
**Design Estratégico:**
- Páginas de preço claras
- Comparativos de planos
- Testimonials visuais
- Call-to-actions proeminentes

**Elementos Visuais:**
- Botões de ação destacados
- Cores que incentivam ação
- Elementos de urgência
- Layout que remove distrações

### **🔄 RETENÇÃO**
**Objetivo:** Manter o usuário engajado
**Design Estratégico:**
- Onboarding personalizado
- Gamificação sutil
- Feedback positivo constante
- Recursos de valor contínuo

**Elementos Visuais:**
- Animações celebrativas
- Progresso visual
- Cores que motivam
- Interface que evolui com o usuário

### **📢 ADVOCACY**
**Objetivo:** Incentivar compartilhamento
**Design Estratégico:**
- Botões de compartilhamento visíveis
- Incentivos para indicações
- Elementos que geram orgulho
- Funcionalidades sociais

**Elementos Visuais:**
- Ícones de compartilhamento
- Badges de conquista
- Elementos que geram screenshot
- Design que incentiva fotos

---

## 🧠 **NEUROMARKETING APLICADO**

### **👁️ ATENÇÃO**
**Estratégias Visuais:**
- Cores contrastantes para elementos importantes
- Movimento sutil para capturar atenção
- Tamanho e posicionamento estratégicos
- Elementos que quebram padrões

**Aplicação Prática:**
- Botões de ação em cores quentes
- Animações suaves em elementos importantes
- Hierarquia visual clara
- Elementos únicos que se destacam

### **💭 EMOÇÃO**
**Estratégias Visuais:**
- Cores que evocam emoções específicas
- Imagens que contam histórias
- Tipografia que transmite sentimentos
- Layout que cria conexão emocional

**Aplicação Prática:**
- Azul para confiança em áreas de pagamento
- Verde para sucesso em confirmações
- Imagens de famílias felizes
- Tipografia acolhedora

### **🧠 MEMÓRIA**
**Estratégias Visuais:**
- Consistência visual em toda a marca
- Elementos memoráveis e únicos
- Repetição estratégica de elementos
- Associações visuais fortes

**Aplicação Prática:**
- Logo sempre no mesmo lugar
- Cores consistentes em toda a interface
- Ícones únicos e reconhecíveis
- Elementos que criam associações

### **🎯 AÇÃO**
**Estratégias Visuais:**
- Call-to-actions proeminentes
- Cores que incentivam ação
- Elementos que removem fricção
- Feedback imediato

**Aplicação Prática:**
- Botões grandes e coloridos
- Laranja para ações principais
- Formulários simplificados
- Confirmações visuais imediatas

---

## 📊 **MÉTRICAS DE SUCESSO**

### **🎯 CONVERSÃO**
- Taxa de conversão por elemento visual
- A/B testing de cores e layouts
- Análise de heatmaps
- Tracking de cliques por elemento

### **⏱️ ENGAGAMENTO**
- Tempo de permanência na tela
- Taxa de retorno
- Interações por sessão
- Profundidade de navegação

### **💝 RETENÇÃO**
- Taxa de retenção por dia/semana/mês
- Frequência de uso
- Recursos mais utilizados
- Pontos de abandono

### **📢 ADVOCACY**
- Taxa de compartilhamento
- Reviews e avaliações
- Indicações orgânicas
- Screenshots compartilhados

---

## 💡 **RESULTADO FINAL**

**Design que não apenas é bonito, mas estrategicamente otimizado para converter, engajar e fidelizar usuários, aplicando os princípios mais avançados da psicologia do consumo e neuromarketing.**

**📈 Cada elemento visual é cientificamente escolhido para maximizar o impacto emocional e comportamental, criando experiências que não apenas satisfazem, mas que convertem e fidelizam.**
      `,
      emocao: "Estratégia e eficácia",
      acao: "Aplicar princípios de marketing"
    };
  }

  // Responder sobre cores
  responderSobreCores(contexto, perfil) {
    if (!perfil) {
      return this.responderGeral(contexto, null);
    }

    const cores = perfil.cores;
    const inspiracao = perfil.inspiracao.join(', ');
    
    return {
      tipo: 'CORES',
      titulo: `🎨 Paleta de Cores para ${perfil.nome}`,
      conteudo: `
**Cores Principais:**
- **Primária:** ${cores[0]} - Representa ${perfil.caracteristicas[0].toLowerCase()}
- **Secundária:** ${cores[1]} - Representa ${perfil.caracteristicas[1].toLowerCase()}
- **Fundo:** ${cores[2]} - Cria ${perfil.caracteristicas[2].toLowerCase()}
- **Texto:** ${cores[3]} - Garante ${perfil.caracteristicas[3].toLowerCase()}

**Por que essas cores?**
Elas foram escolhidas para transmitir "${perfil.emocao}" e criar uma experiência que ressoe com ${perfil.nome.toLowerCase()}.

**Inspiração:** ${inspiracao}

**💡 Dica:** Use gradientes sutis entre essas cores para criar profundidade e movimento visual.
      `,
      emocao: perfil.emocao,
      acao: "Aplicar paleta de cores"
    };
  }

  // Responder sobre layout
  responderSobreLayout(contexto, perfil) {
    if (!perfil) {
      return this.responderGeral(contexto, null);
    }

    return {
      tipo: 'LAYOUT',
      titulo: `📱 Layout para ${perfil.nome}`,
      conteudo: `
**Princípios de Layout:**

**Espaçamento:**
- ${perfil.nome === 'Empregador/Executivo' ? 'Equilibrado e profissional' : 
    perfil.nome === 'Empregado Doméstico' ? 'Generoso e acolhedor' : 'Harmonioso e familiar'}

**Organização:**
- ${perfil.nome === 'Empregador/Executivo' ? 'Hierárquica e funcional' : 
    perfil.nome === 'Empregado Doméstico' ? 'Simples e intuitiva' : 'Conectiva e fluida'}

**Elementos Visuais:**
- ${perfil.nome === 'Empregador/Executivo' ? 'Cards elegantes com sombras sutis' : 
    perfil.nome === 'Empregado Doméstico' ? 'Elementos grandes e coloridos' : 'Componentes harmoniosos e familiares'}

**Responsividade:**
- Adaptação perfeita para ${perfil.nome === 'Empregador/Executivo' ? 'desktop e tablet' : 
    perfil.nome === 'Empregado Doméstico' ? 'mobile e tablet' : 'todos os dispositivos'}

**🎯 Objetivo:** Criar uma interface que faça ${perfil.nome.toLowerCase()} se sentir "${perfil.emocao}".
      `,
      emocao: perfil.emocao,
      acao: "Estruturar layout"
    };
  }

  // Responder sobre tipografia
  responderSobreTipografia(contexto, perfil) {
    if (!perfil) {
      return this.responderGeral(contexto, null);
    }

    const fontes = {
      'EMPLOYER': { principal: 'Inter', secundaria: 'Roboto' },
      'EMPLOYEE': { principal: 'Nunito', secundaria: 'Open Sans' },
      'FAMILY': { principal: 'Poppins', secundaria: 'Lato' }
    };

    const fonte = fontes[contexto.perfil];

    return {
      tipo: 'TIPOGRAFIA',
      titulo: `📝 Tipografia para ${perfil.nome}`,
      conteudo: `
**Fonte Principal:** ${fonte.principal}
- **Características:** ${perfil.nome === 'Empregador/Executivo' ? 'Clean e profissional' : 
    perfil.nome === 'Empregado Doméstico' ? 'Acolhedora e legível' : 'Harmoniosa e moderna'}

**Fonte Secundária:** ${fonte.secundaria}
- **Uso:** Para textos complementares e informações secundárias

**Hierarquia Tipográfica:**
- **Títulos:** ${perfil.nome === 'Empregador/Executivo' ? '24px, peso 600' : 
    perfil.nome === 'Empregado Doméstico' ? '28px, peso 700' : '26px, peso 600'}
- **Subtítulos:** ${perfil.nome === 'Empregador/Executivo' ? '16px, peso 400' : 
    perfil.nome === 'Empregado Doméstico' ? '18px, peso 400' : '16px, peso 400'}
- **Corpo:** ${perfil.nome === 'Empregador/Executivo' ? '14px, peso 400' : 
    perfil.nome === 'Empregado Doméstico' ? '16px, peso 400' : '14px, peso 400'}

**🎨 Resultado:** Tipografia que transmite "${perfil.emocao}" e facilita a leitura.
      `,
      emocao: perfil.emocao,
      acao: "Definir tipografia"
    };
  }

  // Responder sobre animação
  responderSobreAnimacao(contexto, perfil) {
    if (!perfil) {
      return this.responderGeral(contexto, null);
    }

    const animacoes = {
      'EMPLOYER': {
        entrada: 'Fade in suave, 0.3s',
        hover: 'Elevação sutil, 0.2s',
        loading: 'Spinner profissional'
      },
      'EMPLOYEE': {
        entrada: 'Slide up vibrante, 0.4s',
        hover: 'Escala 1.05, 0.2s',
        loading: 'Pulsação motivacional'
      },
      'FAMILY': {
        entrada: 'Fade in harmonioso, 0.35s',
        hover: 'Escala 1.02, 0.2s',
        loading: 'Onda harmoniosa'
      }
    };

    const animacao = animacoes[contexto.perfil];

    return {
      tipo: 'ANIMACAO',
      titulo: `✨ Animações para ${perfil.nome}`,
      conteudo: `
**Princípios de Animação:**

**Entrada:** ${animacao.entrada}
- ${perfil.nome === 'Empregador/Executivo' ? 'Profissional e discreta' : 
    perfil.nome === 'Empregado Doméstico' ? 'Motivacional e acolhedora' : 'Harmoniosa e fluida'}

**Interação:** ${animacao.hover}
- ${perfil.nome === 'Empregador/Executivo' ? 'Feedback sutil e elegante' : 
    perfil.nome === 'Empregado Doméstico' ? 'Feedback claro e divertido' : 'Feedback suave e familiar'}

**Loading:** ${animacao.loading}
- ${perfil.nome === 'Empregador/Executivo' ? 'Indica eficiência e profissionalismo' : 
    perfil.nome === 'Empregado Doméstico' ? 'Mantém motivação durante espera' : 'Cria conexão durante carregamento'}

**🎭 Emoção:** Animações que reforçam "${perfil.emocao}" e criam uma experiência memorável.
      `,
      emocao: perfil.emocao,
      acao: "Implementar animações"
    };
  }

  // Responder sobre emoção
  responderSobreEmocao(contexto, perfil) {
    if (!perfil) {
      return this.responderGeral(contexto, null);
    }

    return {
      tipo: 'EMOCAO',
      titulo: `🎭 Experiência Emocional para ${perfil.nome}`,
      conteudo: `
**Emoção Principal:** ${perfil.emocao}

**Como Criar Essa Emoção:**

**1. Primeiro Contato:**
- ${perfil.nome === 'Empregador/Executivo' ? 'Interface clean que transmite confiança imediata' : 
    perfil.nome === 'Empregado Doméstico' ? 'Acolhimento visual que faz sentir bem-vinda' : 'Harmonia visual que conecta a família'}

**2. Durante o Uso:**
- ${perfil.nome === 'Empregador/Executivo' ? 'Feedback constante de eficiência e controle' : 
    perfil.nome === 'Empregado Doméstico' ? 'Motivação contínua e simplicidade' : 'Conexão familiar e organização harmônica'}

**3. Resultado Final:**
- ${perfil.nome === 'Empregador/Executivo' ? 'Satisfação por ter economizado tempo e recursos' : 
    perfil.nome === 'Empregado Doméstico' ? 'Sentimento de valorização e confiança' : 'Fortalecimento dos laços familiares'}

**🎯 Objetivo:** Criar uma experiência que faça ${perfil.nome.toLowerCase()} querer usar o sistema todos os dias.
      `,
      emocao: perfil.emocao,
      acao: "Criar experiência emocional"
    };
  }

  // Responder ajuda
  responderAjuda(contexto, perfil) {
    return {
      tipo: 'AJUDA',
      titulo: `💡 Como Posso Ajudar?`,
      conteudo: `
**Olá! Sou seu assistente especializado em design de interfaces! 🎨**

Posso ajudar você com:

**🎨 Design Visual:**
- Paletas de cores personalizadas
- Layouts otimizados
- Tipografia adequada
- Animações emocionais

**🧠 Conhecimentos Especializados:**
- **Teoria das Cores:** Psicologia cromática, harmonia, neuromarketing
- **PNL Aplicada:** Sistemas representacionais, ancoragem, rapport
- **Marketing de Consumo:** Gatilhos mentais, jornada do consumidor, neuromarketing

**👥 Perfis de Usuário:**
- Empregadores/Executivos
- Empregados Domésticos
- Famílias

**💭 Experiência Emocional:**
- Como criar conexão com usuários
- Design que motiva e engaja
- Interfaces que emocionam

**🌍 Cultura Brasileira:**
- Adaptação para contexto local
- Respeito às diferenças regionais
- Linguagem visual que ressoa

**Como usar:** Basta me perguntar sobre qualquer aspecto do design, mencionando o perfil de usuário que você quer atender!

**Exemplos:**
- "Como aplicar teoria das cores para empregadores?"
- "Quero entender PNL aplicada ao design de interfaces"
- "Como usar gatilhos mentais no design de apps?"
- "Crie um sistema completo de design disruptivo"
      `,
      emocao: "Acolhimento e motivação",
      acao: "Oferecer ajuda"
    };
  }

  // Responder geral
  responderGeral(contexto, perfil) {
    if (perfil) {
      return {
        tipo: 'GERAL',
        titulo: `🎨 Assistente de Design para ${perfil.nome}`,
        conteudo: `
**Olá! Vou ajudar você a criar uma interface incrível para ${perfil.nome.toLowerCase()}!**

**Sobre ${perfil.nome}:**
- **Características:** ${perfil.caracteristicas.join(', ')}
- **Necessidades:** ${perfil.necessidades.join(', ')}
- **Emoção Desejada:** ${perfil.emocao}

**Como posso ajudar:**
- 🎨 Definir paleta de cores
- 📱 Estruturar layout
- 📝 Escolher tipografia
- ✨ Criar animações
- 🎭 Desenvolver experiência emocional

**💡 Dica:** Mencione o que você quer criar e eu te ajudo com especificações detalhadas!
        `,
        emocao: perfil.emocao,
        acao: "Apresentar assistente"
      };
    } else {
      return {
        tipo: 'GERAL',
        titulo: `🎨 Assistente de Design - DOM v2`,
        conteudo: `
**Olá! Sou seu assistente especializado em design de interfaces!**

**Perfis que atendo:**
- 👔 **Empregadores/Executivos** - Eficiência e controle
- 👩‍💼 **Empregados Domésticos** - Acolhimento e simplicidade
- 👨‍👩‍👧‍👦 **Famílias** - Harmonia e conexão

**Como posso ajudar:**
- 🎨 Paletas de cores personalizadas
- 📱 Layouts otimizados por perfil
- 📝 Tipografia adequada
- ✨ Animações emocionais
- 🎭 Experiências que engajam

**💡 Para começar:** Diga-me qual perfil você quer atender e o que precisa criar!
        `,
        emocao: "Acolhimento e profissionalismo",
        acao: "Apresentar assistente"
      };
    }
  }

  // Gerar resposta de erro
  gerarRespostaErro(error) {
    return {
      tipo: 'ERRO',
      titulo: `❌ Ops! Algo deu errado`,
      conteudo: `
Desculpe, tive um problema técnico. Mas não se preocupe!

**O que você pode fazer:**
- Tentar novamente com uma pergunta mais específica
- Mencionar o perfil de usuário que quer atender
- Perguntar sobre cores, layout, tipografia ou animações

**Exemplo:** "Como criar uma paleta de cores para empregados domésticos?"

Estou aqui para ajudar! 🎨✨
      `,
      emocao: "Empatia e apoio",
      acao: "Resolver problema"
    };
  }

  // Registrar interação no histórico
  registrarInteracao(mensagem, resposta, perfilUsuario) {
    this.historico.push({
      timestamp: new Date().toISOString(),
      mensagem: mensagem,
      resposta: resposta,
      perfil: perfilUsuario,
      caracteristicas: this.caracteristicas
    });

    // Manter apenas as últimas 50 interações
    if (this.historico.length > 50) {
      this.historico = this.historico.slice(-50);
    }
  }

  // Gerar relatório de interações
  gerarRelatorio() {
    const totalInteracoes = this.historico.length;
    const perfisUtilizados = [...new Set(this.historico.map(h => h.perfil))];
    const tiposResposta = [...new Set(this.historico.map(h => h.resposta.tipo))];

    return {
      totalInteracoes,
      perfisUtilizados,
      tiposResposta,
      caracteristicas: this.caracteristicas,
      historico: this.historico.slice(-10) // Últimas 10 interações
    };
  }

  // Salvar relatório
  async salvarRelatorio() {
    const relatorio = this.gerarRelatorio();
    const caminho = 'docs/recruitment/relatorio-assistente-ia-artista-telas.json';
    
    await this.salvarArquivo(caminho, JSON.stringify(relatorio, null, 2));
    console.log(`✅ Relatório salvo em: ${caminho}`);
  }

  // Utilitário para salvar arquivos
  async salvarArquivo(caminho, conteudo) {
    const diretorio = path.dirname(caminho);
    
    if (!fs.existsSync(diretorio)) {
      fs.mkdirSync(diretorio, { recursive: true });
    }
    
    fs.writeFileSync(caminho, conteudo, 'utf8');
  }
}

// Função para demonstrar o assistente
async function demonstrarAssistente() {
  const assistente = new AssistenteIAArtistaTelas();
  
  console.log(`🎨 ${assistente.nome} - Demonstração\n`);
  
  // Exemplos de interação
  const exemplos = [
    "Como criar uma paleta de cores para empregados domésticos?",
    "Preciso de um layout para empregadores executivos",
    "Qual tipografia usar para famílias?",
    "Como criar animações que emocionem?",
    "Ajuda com design de interface"
  ];

  for (const exemplo of exemplos) {
    console.log(`\n👤 Usuário: ${exemplo}`);
    const resposta = await assistente.interagir(exemplo);
    console.log(`🎨 Assistente: ${resposta.titulo}`);
    console.log(`${resposta.conteudo}`);
    console.log(`\n---`);
  }

  // Salvar relatório
  await assistente.salvarRelatorio();
  
  console.log(`\n✅ Demonstração concluída! Relatório salvo.`);
}

// Exportar para uso
module.exports = {
  AssistenteIAArtistaTelas,
  demonstrarAssistente
};

// Executar demonstração se chamado diretamente
if (require.main === module) {
  demonstrarAssistente();
} 