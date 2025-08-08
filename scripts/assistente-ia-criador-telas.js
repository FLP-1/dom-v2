
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
 * @fileoverview Assistente IA - Criador de Telas Especializado
 * @directory scripts
 * @description Assistente que cria código diretamente para telas do DOM v2
 * @created 2025-07-26
 * @author DOM Team v2
 */

const fs = require('fs');
const path = require('path');

class AssistenteIACriadorTelas {
  constructor() {
    this.nome = "🎨 Assistente IA - Criador de Telas";
    this.versao = "2.0.0";
    this.status = "ATIVO";
    
    // Perfis de usuário com especificações completas
    this.perfis = {
      EMPLOYER: {
        nome: "Empregador/Executivo",
        cores: {
          primaria: "#1A237E",
          secundaria: "#00C853", 
          acentos: "#FF6F00",
          fundo: "#FAFAFA",
          texto: "#212121"
        },
        tipografia: {
          principal: "Inter",
          secundaria: "Roboto",
          tamanhos: { titulo: "32px", subtitulo: "24px", corpo: "16px" }
        },
        layout: "dashboard-executivo",
        animacoes: "profissionais"
      },
      EMPLOYEE: {
        nome: "Empregado Doméstico",
        cores: {
          primaria: "#E91E63",
          secundaria: "#9C27B0",
          acentos: "#FFC107",
          fundo: "#F8F9FA",
          texto: "#FFFFFF"
        },
        tipografia: {
          principal: "Nunito",
          secundaria: "Open Sans",
          tamanhos: { titulo: "36px", subtitulo: "28px", corpo: "20px" }
        },
        layout: "interface-simples",
        animacoes: "motivacionais"
      },
      FAMILY: {
        nome: "Família",
        cores: {
          primaria: "#4CAF50",
          secundaria: "#2196F3",
          acentos: "#FF9800",
          fundo: "#FFFFFF",
          texto: "#333333"
        },
        tipografia: {
          principal: "Poppins",
          secundaria: "Lato",
          tamanhos: { titulo: "30px", subtitulo: "22px", corpo: "16px" }
        },
        layout: "dashboard-familiar",
        animacoes: "harmoniosas"
      }
    };
    
    // Templates de componentes
    this.templates = {
      header: this.getHeaderTemplate(),
      navigation: this.getNavigationTemplate(),
      dashboard: this.getDashboardTemplate(),
      card: this.getCardTemplate(),
      button: this.getButtonTemplate(),
      form: this.getFormTemplate()
    };
  }

  // Template de Header
  getHeaderTemplate() {
    return `
import React from 'react';
import './Header.css';

const Header = ({ perfil, titulo, usuario }) => {
  const config = {
    EMPLOYER: { estilo: 'executivo', icone: '👔' },
    EMPLOYEE: { estilo: 'acolhedor', icone: '👩‍💼' },
    FAMILY: { estilo: 'familiar', icone: '👨‍👩‍👧‍👦' }
  };

  const { estilo, icone } = config[perfil] || config.EMPLOYER;

  return (
    <header className={\`header header-\${estilo}\`}>
      <div className="header-content">
        <div className="header-logo">
          <span className="header-icon">{icone}</span>
          <h1 className="header-title">{titulo}</h1>
        </div>
        <div className="header-user">
          <span className="user-name">{usuario}</span>
          <div className="user-avatar">
            <img src="/avatar-default.png" alt="Avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
    `;
  }

  // Template de Navegação
  getNavigationTemplate() {
    return `
import React from 'react';
import './Navigation.css';

const Navigation = ({ perfil, itens, ativo }) => {
  const config = {
    EMPLOYER: { tipo: 'lateral', estilo: 'executivo' },
    EMPLOYEE: { tipo: 'inferior', estilo: 'simples' },
    FAMILY: { tipo: 'circular', estilo: 'familiar' }
  };

  const { tipo, estilo } = config[perfil] || config.EMPLOYER;

  return (
    <nav className={\`navigation navigation-\${tipo} navigation-\${estilo}\`}>
      {itens.map((item, index) => (
        <div 
          key={index}
          className={\`nav-item \${ativo === item.id ? 'ativo' : ''}\`}
          onClick={() => item.onClick(item.id)}
        >
          <span className="nav-icon">{item.icone}</span>
          <span className="nav-text">{item.texto}</span>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
    `;
  }

  // Template de Dashboard
  getDashboardTemplate() {
    return `
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ perfil, dados }) => {
  const [metricas, setMetricas] = useState(dados.metricas || []);
  const [atividades, setAtividades] = useState(dados.atividades || []);

  const config = {
    EMPLOYER: { layout: 'grid-executivo', cards: 4 },
    EMPLOYEE: { layout: 'lista-simples', cards: 3 },
    FAMILY: { layout: 'grid-familiar', cards: 6 }
  };

  const { layout, cards } = config[perfil] || config.EMPLOYER;

  return (
    <div className={\`dashboard dashboard-\${layout}\`}>
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
        <p className="dashboard-subtitle">Bem-vindo ao seu painel de controle</p>
      </div>
      
      <div className="dashboard-metricas">
        {metricas.slice(0, cards).map((metrica, index) => (
          <div key={index} className="metrica-card">
            <div className="metrica-icon">{metrica.icone}</div>
            <div className="metrica-info">
              <h3 className="metrica-valor">{metrica.valor}</h3>
              <p className="metrica-label">{metrica.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-atividades">
        <h3 className="atividades-title">Atividades Recentes</h3>
        <div className="atividades-lista">
          {atividades.map((atividade, index) => (
            <div key={index} className="atividade-item">
              <span className="atividade-icon">{atividade.icone}</span>
              <div className="atividade-info">
                <p className="atividade-texto">{atividade.texto}</p>
                <span className="atividade-tempo">{atividade.tempo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
    `;
  }

  // Template de Card
  getCardTemplate() {
    return `
import React from 'react';
import './Card.css';

const Card = ({ perfil, titulo, conteudo, acao, icone, cor }) => {
  const config = {
    EMPLOYER: { estilo: 'elegante', sombra: 'profunda' },
    EMPLOYEE: { estilo: 'colorido', sombra: 'suave' },
    FAMILY: { estilo: 'harmonioso', sombra: 'media' }
  };

  const { estilo, sombra } = config[perfil] || config.EMPLOYER;

  return (
    <div className={\`card card-\${estilo} card-\${sombra}\`} style={{ borderColor: cor }}>
      <div className="card-header">
        <span className="card-icon">{icone}</span>
        <h3 className="card-title">{titulo}</h3>
      </div>
      <div className="card-content">
        {conteudo}
      </div>
      {acao && (
        <div className="card-actions">
          <button className="card-button" onClick={acao.onClick}>
            {acao.texto}
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
    `;
  }

  // Template de Botão
  getButtonTemplate() {
    return `
import React from 'react';
import './Button.css';

const Button = ({ perfil, texto, onClick, tipo = 'primario', tamanho = 'medio', icone }) => {
  const config = {
    EMPLOYER: { estilo: 'profissional', animacao: 'sutil' },
    EMPLOYEE: { estilo: 'vibrante', animacao: 'energetica' },
    FAMILY: { estilo: 'acolhedor', animacao: 'suave' }
  };

  const { estilo, animacao } = config[perfil] || config.EMPLOYER;

  return (
    <button 
      className={\`button button-\${estilo} button-\${tipo} button-\${tamanho} button-\${animacao}\`}
      onClick={onClick}
    >
      {icone && <span className="button-icon">{icone}</span>}
      <span className="button-text">{texto}</span>
    </button>
  );
};

export default Button;
    `;
  }

  // Template de Formulário
  getFormTemplate() {
    return `
import React, { useState } from 'react';
import './Form.css';

const Form = ({ perfil, campos, onSubmit, titulo }) => {
  const [formData, setFormData] = useState({});

  const config = {
    EMPLOYER: { estilo: 'eficiente', layout: 'vertical' },
    EMPLOYEE: { estilo: 'simples', layout: 'vertical' },
    FAMILY: { estilo: 'acolhedor', layout: 'horizontal' }
  };

  const { estilo, layout } = config[perfil] || config.EMPLOYER;

  const handleChange = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={\`form form-\${estilo} form-\${layout}\`} onSubmit={handleSubmit}>
      {titulo && <h3 className="form-title">{titulo}</h3>}
      
      {campos.map((campo, index) => (
        <div key={index} className="form-group">
          <label className="form-label">{campo.label}</label>
          <input
            type={campo.tipo}
            className="form-input"
            placeholder={campo.placeholder}
            value={formData[campo.nome] || ''}
            onChange={(e) => handleChange(campo.nome, e.target.value)}
            required={campo.obrigatorio}
          />
        </div>
      ))}
      
      <button type="submit" className="form-submit">
        Enviar
      </button>
    </form>
  );
};

export default Form;
    `;
  }

  // Gerar CSS para um perfil específico
  gerarCSS(perfil) {
    const config = this.perfis[perfil];
    if (!config) return '';

    return `
/* CSS para ${config.nome} - DOM v2 */

:root {
  --cor-primaria: ${config.cores.primaria};
  --cor-secundaria: ${config.cores.secundaria};
  --cor-acentos: ${config.cores.acentos};
  --cor-fundo: ${config.cores.fundo};
  --cor-texto: ${config.cores.texto};
  
  --fonte-principal: '${config.tipografia.principal}', sans-serif;
  --fonte-secundaria: '${config.tipografia.secundaria}', sans-serif;
  
  --tamanho-titulo: ${config.tipografia.tamanhos.titulo};
  --tamanho-subtitulo: ${config.tipografia.tamanhos.subtitulo};
  --tamanho-corpo: ${config.tipografia.tamanhos.corpo};
}

/* Reset e Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--fonte-principal);
  background-color: var(--cor-fundo);
  color: var(--cor-texto);
  line-height: 1.6;
}

/* Header */
.header {
  background: linear-gradient(135deg, var(--cor-primaria), var(--cor-secundaria));
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  font-size: 2rem;
}

.header-title {
  font-size: var(--tamanho-titulo);
  font-weight: bold;
}

/* Navigation */
.navigation {
  padding: 1rem;
  background: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.navigation-inferior {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.nav-item:hover {
  background-color: var(--cor-primaria);
  color: white;
  transform: translateY(-2px);
}

.nav-item.ativo {
  background-color: var(--cor-primaria);
  color: white;
}

/* Dashboard */
.dashboard {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-title {
  font-size: var(--tamanho-titulo);
  color: var(--cor-primaria);
  margin-bottom: 0.5rem;
}

.dashboard-metricas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.metrica-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.metrica-card:hover {
  transform: translateY(-5px);
}

.metrica-icon {
  font-size: 3rem;
  color: var(--cor-primaria);
}

.metrica-valor {
  font-size: 2rem;
  font-weight: bold;
  color: var(--cor-primaria);
}

/* Card */
.card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  border-left: 4px solid var(--cor-primaria);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 2rem;
  color: var(--cor-primaria);
}

.card-title {
  font-size: var(--tamanho-subtitulo);
  color: var(--cor-primaria);
}

/* Button */
.button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-family: var(--fonte-principal);
  font-size: var(--tamanho-corpo);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button-primario {
  background: linear-gradient(135deg, var(--cor-primaria), var(--cor-secundaria));
  color: white;
}

.button-primario:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.button-secundario {
  background: transparent;
  color: var(--cor-primaria);
  border: 2px solid var(--cor-primaria);
}

.button-secundario:hover {
  background: var(--cor-primaria);
  color: white;
}

/* Form */
.form {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  max-width: 500px;
  margin: 0 auto;
}

.form-title {
  font-size: var(--tamanho-subtitulo);
  color: var(--cor-primaria);
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--cor-texto);
}

.form-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-family: var(--fonte-principal);
  font-size: var(--tamanho-corpo);
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--cor-primaria);
}

.form-submit {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--cor-primaria), var(--cor-secundaria));
  color: white;
  border: none;
  border-radius: 12px;
  font-family: var(--fonte-principal);
  font-size: var(--tamanho-corpo);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

/* Responsividade */
@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }
  
  .dashboard-metricas {
    grid-template-columns: 1fr;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Animações */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

.slide-in {
  animation: slideIn 0.4s ease-out;
}

.pulse {
  animation: pulse 2s infinite;
}
    `;
  }

  // Criar tela completa para um perfil
  async criarTela(perfil, nomeTela) {
    const config = this.perfis[perfil];
    if (!config) {
      throw new Error(`Perfil ${perfil} não encontrado`);
    }

    const diretorio = `frontend/src/screens/${perfil.toLowerCase()}`;
    const nomeArquivo = `${nomeTela}.tsx`;
    const caminhoCompleto = path.join(diretorio, nomeArquivo);

    // Criar diretório se não existir
    if (!fs.existsSync(diretorio)) {
      fs.mkdirSync(diretorio, { recursive: true });
    }

    // Gerar código da tela
    const codigoTela = this.gerarCodigoTela(perfil, nomeTela, config);

    // Salvar arquivo
    fs.writeFileSync(caminhoCompleto, codigoTela, 'utf8');

    // Gerar CSS correspondente
    const cssTela = this.gerarCSS(perfil);
    const caminhoCSS = caminhoCompleto.replace('.tsx', '.css');
    fs.writeFileSync(caminhoCSS, cssTela, 'utf8');

    return {
      arquivo: caminhoCompleto,
      css: caminhoCSS,
      perfil: config.nome,
      componentes: ['Header', 'Navigation', 'Dashboard', 'Card', 'Button', 'Form']
    };
  }

  // Gerar código da tela
  gerarCodigoTela(perfil, nomeTela, config) {
    const nomeClasse = nomeTela.charAt(0).toUpperCase() + nomeTela.slice(1);
    
    return `
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Dashboard from '../../components/Dashboard';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Form from '../../components/Form';
import './${nomeTela}.css';

const ${nomeClasse} = () => {
  const [usuario, setUsuario] = useState('Usuário DOM');
  const [dados, setDados] = useState({
    metricas: [
      { icone: '📊', valor: '15', label: 'Tarefas Ativas' },
      { icone: '✅', valor: '8', label: 'Concluídas Hoje' },
      { icone: '⏰', valor: '2h', label: 'Tempo Economizado' },
      { icone: '💰', valor: 'R$ 150', label: 'Economia Mensal' }
    ],
    atividades: [
      { icone: '🧹', texto: 'Limpeza concluída', tempo: '2 min atrás' },
      { icone: '🛒', texto: 'Compras realizadas', tempo: '1 hora atrás' },
      { icone: '👶', texto: 'Cuidado com crianças', tempo: '3 horas atrás' }
    ]
  });

  const itensNavegacao = [
    { id: 'dashboard', icone: '🏠', texto: 'Início', onClick: () => {} },
    { id: 'tarefas', icone: '📋', texto: 'Tarefas', onClick: () => {} },
    { id: 'relatorios', icone: '📊', texto: 'Relatórios', onClick: () => {} },
    { id: 'configuracoes', icone: '⚙️', texto: 'Config', onClick: () => {} }
  ];

  const handleSubmitForm = (formData) => {
    console.log('Dados do formulário:', formData);
    // Implementar lógica de envio
  };

  return (
    <div className="${nomeTela.toLowerCase()}-screen">
      <Header 
        perfil="${perfil}" 
        titulo="DOM v2 - ${config.nome}" 
        usuario={usuario} 
      />
      
      <div className="screen-content">
        <Navigation 
          perfil="${perfil}" 
          itens={itensNavegacao} 
          ativo="dashboard" 
        />
        
        <main className="main-content">
          <Dashboard perfil="${perfil}" dados={dados} />
          
          <div className="cards-section">
            <Card
              perfil="${perfil}"
              titulo="Nova Tarefa"
              icone="➕"
              cor={config.cores.primaria}
              conteudo={
                <Form
                  perfil="${perfil}"
                  titulo="Criar Nova Tarefa"
                  campos={[
                    { nome: 'titulo', label: 'Título', tipo: 'text', placeholder: 'Digite o título', obrigatorio: true },
                    { nome: 'descricao', label: 'Descrição', tipo: 'textarea', placeholder: 'Descreva a tarefa', obrigatorio: false },
                    { nome: 'prioridade', label: 'Prioridade', tipo: 'select', placeholder: 'Selecione a prioridade', obrigatorio: true }
                  ]}
                  onSubmit={handleSubmitForm}
                />
              }
            />
            
            <Card
              perfil="${perfil}"
              titulo="Ações Rápidas"
              icone="⚡"
              cor={config.cores.secundaria}
              conteudo={
                <div className="acoes-rapidas">
                  <Button
                    perfil="${perfil}"
                    texto="Nova Tarefa"
                    icone="➕"
                    tipo="primario"
                    onClick={() => console.log('Nova tarefa')}
                  />
                  <Button
                    perfil="${perfil}"
                    texto="Ver Relatórios"
                    icone="📊"
                    tipo="secundario"
                    onClick={() => console.log('Ver relatórios')}
                  />
                </div>
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ${nomeClasse};
    `;
  }

  // Criar componentes base
  async criarComponentes() {
    const diretorio = 'frontend/src/components';
    
    if (!fs.existsSync(diretorio)) {
      fs.mkdirSync(diretorio, { recursive: true });
    }

    const componentes = [
      { nome: 'Header', codigo: this.templates.header },
      { nome: 'Navigation', codigo: this.templates.navigation },
      { nome: 'Dashboard', codigo: this.templates.dashboard },
      { nome: 'Card', codigo: this.templates.card },
      { nome: 'Button', codigo: this.templates.button },
      { nome: 'Form', codigo: this.templates.form }
    ];

    const resultados = [];

    for (const componente of componentes) {
      const caminhoArquivo = path.join(diretorio, `${componente.nome}.tsx`);
      const caminhoCSS = caminhoArquivo.replace('.tsx', '.css');
      
      fs.writeFileSync(caminhoArquivo, componente.codigo, 'utf8');
      
      // Gerar CSS básico para o componente
      const cssComponente = this.gerarCSSComponente(componente.nome);
      fs.writeFileSync(caminhoCSS, cssComponente, 'utf8');
      
      resultados.push({
        componente: componente.nome,
        arquivo: caminhoArquivo,
        css: caminhoCSS
      });
    }

    return resultados;
  }

  // Gerar CSS para componente específico
  gerarCSSComponente(nomeComponente) {
    const cssBase = `
/* CSS para ${nomeComponente} - DOM v2 */

.${nomeComponente.toLowerCase()} {
  /* Estilos base do componente */
}

/* Responsividade */
@media (max-width: 768px) {
  .${nomeComponente.toLowerCase()} {
    /* Ajustes para mobile */
  }
}
    `;

    return cssBase;
  }

  // Criar estrutura completa do projeto
  async criarEstruturaCompleta() {
    console.log('🎨 Criando estrutura completa do DOM v2...\n');

    // 1. Criar componentes base
    console.log('📦 Criando componentes base...');
    const componentes = await this.criarComponentes();
    console.log(`✅ ${componentes.length} componentes criados`);

    // 2. Criar telas para cada perfil
    console.log('\n📱 Criando telas para cada perfil...');
    const telas = [];
    
    for (const perfil of Object.keys(this.perfis)) {
      const tela = await this.criarTela(perfil, 'Dashboard');
      telas.push(tela);
      console.log(`✅ Tela criada para ${this.perfis[perfil].nome}`);
    }

    // 3. Criar arquivo de rotas
    console.log('\n🛣️ Criando sistema de rotas...');
    const rotas = this.gerarRotas();
    const caminhoRotas = 'frontend/src/routes/AppRoutes.tsx';
    
    if (!fs.existsSync(path.dirname(caminhoRotas))) {
      fs.mkdirSync(path.dirname(caminhoRotas), { recursive: true });
    }
    
    fs.writeFileSync(caminhoRotas, rotas, 'utf8');
    console.log('✅ Sistema de rotas criado');

    // 4. Criar arquivo principal App.tsx
    console.log('\n🚀 Criando arquivo principal...');
    const appPrincipal = this.gerarAppPrincipal();
    const caminhoApp = 'frontend/src/App.tsx';
    fs.writeFileSync(caminhoApp, appPrincipal, 'utf8');
    console.log('✅ Arquivo principal criado');

    // 5. Gerar relatório
    console.log('\n📊 Gerando relatório...');
    const relatorio = {
      timestamp: new Date().toISOString(),
      componentes: componentes.length,
      telas: telas.length,
      perfis: Object.keys(this.perfis),
      estrutura: {
        componentes: componentes.map(c => c.componente),
        telas: telas.map(t => t.arquivo),
        rotas: caminhoRotas,
        app: caminhoApp
      }
    };

    const caminhoRelatorio = 'docs/recruitment/relatorio-criador-telas.json';
    fs.writeFileSync(caminhoRelatorio, JSON.stringify(relatorio, null, 2), 'utf8');
    console.log('✅ Relatório salvo');

    return {
      componentes,
      telas,
      rotas: caminhoRotas,
      app: caminhoApp,
      relatorio: caminhoRelatorio
    };
  }

  // Gerar sistema de rotas
  gerarRotas() {
    return `
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar telas
import DashboardEmployer from '../screens/employer/Dashboard';
import DashboardEmployee from '../screens/employee/Dashboard';
import DashboardFamily from '../screens/family/Dashboard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/employer" replace />} />
        <Route path="/employer" element={<DashboardEmployer />} />
        <Route path="/employee" element={<DashboardEmployee />} />
        <Route path="/family" element={<DashboardFamily />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
    `;
  }

  // Gerar arquivo principal App.tsx
  gerarAppPrincipal() {
    return `
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
    `;
  }
}

// Função para demonstrar o criador de telas
async function demonstrarCriadorTelas() {
  const criador = new AssistenteIACriadorTelas();
  
  console.log(`🎨 ${criador.nome} - Demonstração\n`);
  
  try {
    const resultado = await criador.criarEstruturaCompleta();
    
    console.log('\n🎯 RESULTADO FINAL:');
    console.log(`📦 ${resultado.componentes.length} componentes criados`);
    console.log(`📱 ${resultado.telas.length} telas criadas`);
    console.log(`🛣️ Sistema de rotas configurado`);
    console.log(`🚀 Arquivo principal criado`);
    console.log(`📊 Relatório salvo em: ${resultado.relatorio}`);
    
    console.log('\n✨ Estrutura criada com sucesso!');
    console.log('💡 Para executar: cd frontend && npm start');
    
  } catch (error) {
    console.error('❌ Erro ao criar estrutura:', error.message);
  }
}

// Exportar para uso
module.exports = {
  AssistenteIACriadorTelas,
  demonstrarCriadorTelas
};

// Executar demonstração se chamado diretamente
if (require.main === module) {
  demonstrarCriadorTelas();
} 