# Script de Configuracao de Ambiente Limpo - DOM v2
Write-Host "CONFIGURACAO DE AMBIENTE LIMPO - DOM v2" -ForegroundColor Cyan
Write-Host "Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos no diretório correto
if (-not (Test-Path "backend")) {
    Write-Host "Erro: Execute este script na raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

# Criar estrutura de diretórios limpa
Write-Host "Criando estrutura de diretorios limpa..." -ForegroundColor Yellow

$CleanStructure = @(
    "frontend/public",
    "frontend/css",
    "frontend/js", 
    "frontend/components",
    "frontend/assets",
    "frontend/assets/images",
    "frontend/assets/icons",
    "docs/decisions",
    "docs/architecture",
    "docs/development",
    "scripts/quality",
    "scripts/validation",
    "scripts/testing"
)

foreach ($dir in $CleanStructure) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Criado: $dir" -ForegroundColor Green
    } else {
        Write-Host "Ja existe: $dir" -ForegroundColor Yellow
    }
}

# Criar arquivos base do frontend
Write-Host ""
Write-Host "Criando arquivos base do frontend..." -ForegroundColor Yellow

# index.html principal
$IndexContent = @"
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOM v2 - Sistema de Gestao</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <div id="app">
        <header class="main-header">
            <nav class="main-nav">
                <div class="logo">
                    <h1>DOM v2</h1>
                </div>
                <div class="nav-links">
                    <a href="login-screen.html">Login</a>
                    <a href="dashboard.html">Dashboard</a>
                </div>
            </nav>
        </header>
        
        <main class="main-content">
            <section class="hero">
                <h2>Bem-vindo ao DOM v2</h2>
                <p>Sistema de Gestao Empresarial Moderno</p>
                <div class="cta-buttons">
                    <a href="login-screen.html" class="btn btn-primary">Entrar</a>
                    <a href="dashboard.html" class="btn btn-secondary">Dashboard</a>
                </div>
            </section>
        </main>
        
        <footer class="main-footer">
            <p>&copy; 2025 DOM v2 - Todos os direitos reservados</p>
        </footer>
    </div>
    
    <script src="js/main.js"></script>
</body>
</html>
"@

Set-Content -Path "frontend/public/index.html" -Value $IndexContent -Encoding UTF8
Write-Host "Criado: index.html" -ForegroundColor Green

# CSS principal
$MainCSSContent = @"
/* DOM v2 - CSS Principal */
/* Versao: 2.0.0 */
/* Data: 25/01/2025 */

/* Reset e base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

/* Layout principal */
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-header {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.logo h1 {
    color: #667eea;
    font-size: 1.8rem;
    font-weight: 700;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-links a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: #667eea;
}

/* Conteudo principal */
.main-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.hero {
    text-align: center;
    color: white;
    max-width: 600px;
}

.hero h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

/* Botoes */
.cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    display: inline-block;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.btn-primary {
    background: #667eea;
    color: white;
}

.btn-primary:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
}

.btn-secondary {
    background: transparent;
    color: white;
    border-color: white;
}

.btn-secondary:hover {
    background: white;
    color: #667eea;
}

/* Footer */
.main-footer {
    background: rgba(0, 0, 0, 0.1);
    color: white;
    text-align: center;
    padding: 1rem;
    backdrop-filter: blur(10px);
}

/* Utilitarios */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.text-center {
    text-align: center;
}

.mt-2 {
    margin-top: 2rem;
}

.mb-2 {
    margin-bottom: 2rem;
}
"@

Set-Content -Path "frontend/css/main.css" -Value $MainCSSContent -Encoding UTF8
Write-Host "Criado: main.css" -ForegroundColor Green

# CSS responsivo
$ResponsiveCSSContent = @"
/* DOM v2 - CSS Responsivo */
/* Versao: 2.0.0 */
/* Data: 25/01/2025 */

/* Mobile First - Base styles ja sao mobile */

/* Tablet (768px e acima) */
@media (min-width: 768px) {
    .hero h2 {
        font-size: 3.5rem;
    }
    
    .hero p {
        font-size: 1.3rem;
    }
    
    .main-nav {
        padding: 0 1rem;
    }
}

/* Desktop (1024px e acima) */
@media (min-width: 1024px) {
    .hero h2 {
        font-size: 4rem;
    }
    
    .hero p {
        font-size: 1.4rem;
    }
    
    .cta-buttons {
        gap: 1.5rem;
    }
    
    .btn {
        padding: 1.2rem 2.5rem;
        font-size: 1.1rem;
    }
}

/* Large Desktop (1440px e acima) */
@media (min-width: 1440px) {
    .hero h2 {
        font-size: 4.5rem;
    }
    
    .hero p {
        font-size: 1.5rem;
    }
}

/* Mobile especifico (menos de 768px) */
@media (max-width: 767px) {
    .main-header {
        padding: 1rem;
    }
    
    .main-nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-links {
        gap: 1rem;
    }
    
    .hero h2 {
        font-size: 2.5rem;
    }
    
    .hero p {
        font-size: 1.1rem;
    }
    
    .cta-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 100%;
        max-width: 300px;
        text-align: center;
    }
}
"@

Set-Content -Path "frontend/css/responsive.css" -Value $ResponsiveCSSContent -Encoding UTF8
Write-Host "Criado: responsive.css" -ForegroundColor Green

# JavaScript principal
$MainJSContent = @"
/**
 * DOM v2 - JavaScript Principal
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-25
 * 
 * @description
 * Script principal do sistema DOM v2
 * Implementa funcionalidades basicas e navegacao
 * 
 * @dependencies
 * - Nenhuma dependencia externa
 * 
 * @usage
 * Carregado automaticamente em todas as paginas
 */

// Configuracoes globais
const DOM_CONFIG = {
    API_BASE_URL: 'http://localhost:3001',
    VERSION: '2.0.0',
    DEBUG: true
};

// Sistema de logging
function log(level, message, data = {}) {
    if (DOM_CONFIG.DEBUG) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data);
    }
}

// Validacao de entrada
function validateInput(data, type = 'string') {
    if (!data) return false;
    
    switch (type) {
        case 'string':
            return typeof data === 'string' && data.trim().length > 0;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(data);
        case 'cpf':
            // Implementar validacao de CPF
            return data.replace(/\D/g, '').length === 11;
        default:
            return true;
    }
}

// Navegacao
function navigateTo(page) {
    try {
        window.location.href = page;
        log('info', `Navegando para: ${page}`);
    } catch (error) {
        log('error', `Erro na navegacao: ${error.message}`);
    }
}

// Inicializacao
document.addEventListener('DOMContentLoaded', function() {
    log('info', 'DOM v2 inicializado', { version: DOM_CONFIG.VERSION });
    
    // Adicionar listeners de navegacao
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                log('info', `Navegacao clicada: ${href}`);
            }
        });
    });
    
    // Adicionar listeners de botoes
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                log('info', `Botao clicado: ${href}`);
            }
        });
    });
});

// Exportar funcoes para uso global
window.DOMv2 = {
    config: DOM_CONFIG,
    log: log,
    validate: validateInput,
    navigate: navigateTo
};
"@

Set-Content -Path "frontend/js/main.js" -Value $MainJSContent -Encoding UTF8
Write-Host "Criado: main.js" -ForegroundColor Green

# Criar documentacao de decisoes
$DecisionsContent = @"
# Decisoes de Desenvolvimento - DOM v2

## Decisao: Novo Desenvolvimento Frontend

**Data:** 25/01/2025  
**Status:** APROVADA  
**Responsavel:** Sistema DOM v2

### Contexto
- Frontend corrompido por scripts automaticos
- Problemas de encoding e caracteres invalidos
- Multiplas tentativas de correcao falharam
- Backend funcional e estavel

### Analise Critica

#### Suposicoes Identificadas:
1. Restauracao seria mais rapida que novo desenvolvimento
2. Scripts automaticos poderiam corrigir problemas
3. Problemas eram superficiais e corrigiveis

#### Alternativas Consideradas:
1. **Restauracao de backups** - Rejeitada (alto risco de problemas ocultos)
2. **Correcao incremental** - Rejeitada (tempo maior que novo desenvolvimento)
3. **Novo desenvolvimento** - Aprovada (codigo limpo e controlado)

#### Evidencias:
- Backend 100% funcional
- Conhecimentos adquiridos preservados
- Documentacao completa disponivel
- Boas praticas estabelecidas

### Decisao Final
**PROSSEGUIR COM NOVO DESENVOLVIMENTO FRONTEND**

### Justificativa
- Mais eficiente em tempo (8-12 dias vs 10-15 dias)
- Qualidade superior garantida
- Menos riscos de bugs ocultos
- Melhor ROI
- Segue rigorosamente as boas praticas

### Proximos Passos
1. Isolamento de desenvolvimentos obsoletos
2. Configuracao de ambiente limpo
3. Desenvolvimento incremental
4. Sistema de qualidade implementado

### Revisao
Esta decisao sera revisada a cada milestone do desenvolvimento.

---
*Documentacao gerada automaticamente*
"@

Set-Content -Path "docs/decisions/novo-desenvolvimento-frontend.md" -Value $DecisionsContent -Encoding UTF8
Write-Host "Criado: documentacao de decisoes" -ForegroundColor Green

# Criar arquivo de arquitetura
$ArchitectureContent = @"
# Arquitetura do Novo Desenvolvimento - DOM v2

## Visao Geral

### Frontend (HTML Nativo)
```
frontend/
├── public/           # Paginas HTML
├── css/             # Estilos CSS
├── js/              # JavaScript vanilla
├── components/      # Componentes reutilizaveis
└── assets/          # Imagens, icones, etc.
```

### Backend (Mantido)
```
backend/             # Node.js + TypeScript + Prisma
├── src/
├── prisma/
└── package.json
```

## Padroes de Desenvolvimento

### HTML
- HTML5 semantico
- Estrutura limpa e acessivel
- Mobile-first
- LGPD compliance

### CSS
- CSS3 puro
- Mobile-first responsive
- Variaveis CSS para temas
- Organizacao modular

### JavaScript
- Vanilla JavaScript ES6+
- Modulos organizados
- Validacao robusta
- Tratamento de erros

## Integracao

### API REST
- Backend mantido intacto
- Endpoints documentados
- Autenticacao JWT
- Validacao de dados

### Banco de Dados
- PostgreSQL mantido
- Prisma ORM
- Migrations preservadas
- Dados existentes mantidos

## Responsividade

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px - 1439px
- Large: >= 1440px

### Adaptacao
- Layout flexivel
- Imagens responsivas
- Touch-friendly
- Performance otimizada

## Seguranca

### Frontend
- Validacao client-side
- Sanitizacao de entrada
- HTTPS obrigatorio
- Headers de seguranca

### Backend (Mantido)
- JWT authentication
- Rate limiting
- Input validation
- SQL injection protection

## Performance

### Otimizacoes
- CSS/JS minificado
- Imagens otimizadas
- Lazy loading
- Cache estrategico

### Metricas
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms

---
*Arquitetura definida em 25/01/2025*
"@

Set-Content -Path "docs/architecture/nova-arquitetura.md" -Value $ArchitectureContent -Encoding UTF8
Write-Host "Criado: documentacao de arquitetura" -ForegroundColor Green

# Criar README do projeto limpo
$ReadmeContent = @"
# DOM v2 - Sistema de Gestao Empresarial

## Sobre o Projeto

DOM v2 e um sistema de gestao empresarial moderno desenvolvido com tecnologias web nativas, focado em simplicidade, performance e manutenibilidade.

## Arquitetura

### Frontend
- **HTML5** - Estrutura semantica
- **CSS3** - Estilizacao moderna e responsiva
- **JavaScript Vanilla** - Interatividade e logica

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estatica
- **Express.js** - Framework web
- **Prisma ORM** - Banco de dados
- **PostgreSQL** - Banco de dados

## Inicio Rapido

### Pre-requisitos
- Node.js 18+
- PostgreSQL 12+
- PowerShell (Windows)

### Instalacao

1. **Clone o repositorio**
```powershell
git clone <repository-url>
cd dom-v2
```

2. **Configure o backend**
```powershell
cd backend
npm install
npx prisma migrate dev
npx prisma generate
```

3. **Configure variaveis de ambiente**
```powershell
Copy-Item .env.example .env
# Edite o arquivo .env com suas configuracoes
```

4. **Inicie o desenvolvimento**
```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (servidor simples)
cd frontend/public
python -m http.server 3000
# ou
node ../../simple-server.js
```

5. **Acesse a aplicacao**
```
http://localhost:3000
```

## Estrutura do Projeto

```
dom-v2/
├── frontend/           # Frontend HTML nativo
│   ├── public/        # Paginas HTML
│   ├── css/          # Estilos CSS
│   ├── js/           # JavaScript
│   └── components/   # Componentes
├── backend/           # Backend Node.js
├── docs/             # Documentacao
├── scripts/          # Scripts de automacao
└── legacy/           # Desenvolvimentos obsoletos
```

## Testes

### Frontend
```powershell
# Teste de responsividade
.\scripts\testing\test-responsive.ps1

# Teste de acessibilidade
.\scripts\testing\test-accessibility.ps1
```

### Backend
```powershell
cd backend
npm test
```

## Documentacao

- [Arquitetura](docs/architecture/)
- [Decisoes](docs/decisions/)
- [Desenvolvimento](docs/development/)
- [Boas Praticas](BOAS_PRATICAS_DESENVOLVIMENTO_DOM_V2.md)

## Contribuicao

1. Leia as [boas praticas](BOAS_PRATICAS_DESENVOLVIMENTO_DOM_V2.md)
2. Siga as [diretrizes de pensamento critico](docs/directives/)
3. Execute os testes antes de contribuir
4. Documente suas decisoes

## Licenca

Este projeto esta sob a licenca MIT.

---

**Versao:** 2.0.0  
**Data:** 25/01/2025  
**Status:** Em desenvolvimento
"@

Set-Content -Path "README.md" -Value $ReadmeContent -Encoding UTF8
Write-Host "Criado: README.md" -ForegroundColor Green

# Resumo final
Write-Host ""
Write-Host "RESUMO DA CONFIGURACAO" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host "Estrutura de diretorios criada" -ForegroundColor Green
Write-Host "Arquivos base do frontend criados" -ForegroundColor Green
Write-Host "Documentacao inicial criada" -ForegroundColor Green
Write-Host "README atualizado" -ForegroundColor Green

Write-Host ""
Write-Host "AMBIENTE LIMPO CONFIGURADO!" -ForegroundColor Green
Write-Host "Proximos passos:" -ForegroundColor Cyan
Write-Host "   1. Executar compliance-checker.ps1" -ForegroundColor Cyan
Write-Host "   2. Implementar sistema de qualidade" -ForegroundColor Cyan
Write-Host "   3. Comecar desenvolvimento incremental" -ForegroundColor Cyan
Write-Host "   4. Testar integracao com backend" -ForegroundColor Cyan
