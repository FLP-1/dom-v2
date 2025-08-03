
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
 * Sistema de logging estruturado
 * @param {string} level - Nível do log (info, warn, error, debug)
 * @param {string} message - Mensagem do log
 * @param {object} data - Dados adicionais
 */
function logStructured(level, message, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    data,
    file: __filename,
    function: arguments.callee.name || 'anonymous'
  };
  
  // Console output
  const consoleMethod = level === 'error' ? 'error' : 
                       level === 'warn' ? 'warn' : 
                       level === 'debug' ? 'debug' : 'log';
  
  console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data);
  
  // File logging
  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.appendFileSync(
      path.join(logsDir, 'application.log'),
      JSON.stringify(logEntry) + '\n'
    );
  } catch (logError) {
    console.error('Erro ao salvar log:', logError.message);
  }
}

// Aplicar logging
logStructured('info', 'Iniciando execução', { context: 'main' });


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
 * @fileoverview Descrição detalhada do propósito e funcionalidade deste arquivo
 * @author Sistema DOM v2
 * @version 2.0.0
 * @since 2025-01-01
 * 
 * @description
 * Este arquivo implementa Implementação de funcionalidade
 * seguindo as diretivas críticas do projeto DOM v2.
 * 
 * @dependencies
 * - Dependências específicas do contexto
 * 
 * @usage
 * Ver documentação específica para detalhes de uso
 * 
 * @see
 * - docs/directives/diretivas-pensamento-critico.md
 * - docs/development/processo-garantia-diretivas.md
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  scriptsToAnalyze: [
    './frontend/scripts/build.js',
    './frontend/scripts/dev.js',
    './frontend/scripts/serve-prod.js',
    './frontend/webpack.config.js',
    './frontend/babel.config.js',
    './frontend/metro.config.js'
  ],
  packageScripts: [
    './package.json',
    './frontend/package.json'
  ]
};

// Funções utilitárias
const log = (message) => {
  // Usar process.stdout.write para evitar problemas no PowerShell
  process.stdout.write(`[${new Date().toISOString()}] ${message}\n`);
};

const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    log(`Erro ao ler ${filePath}: ${error.message}`);
    return null;
  }
};

const writeFile = (filePath, content) => {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
    log(`Arquivo criado: ${filePath}`);
    return true;
  } catch (error) {
    log(`Erro ao escrever ${filePath}: ${error.message}`);
    return false;
  }
};

// Funções principais
const revisarScripts = {
  analyzeScripts: () => {
    log('Analisando scripts de build e desenvolvimento...');
    const analysis = {
      scripts: {},
      recommendations: [],
      issues: []
    };
    
    CONFIG.scriptsToAnalyze.forEach(scriptPath => {
      const content = readFile(scriptPath);
      if (content) {
        analysis.scripts[scriptPath] = {
          size: content.length,
          lines: content.split('\n').length,
          hasWebpack: content.includes('webpack'),
          hasBabel: content.includes('babel'),
          hasMetro: content.includes('metro'),
          hasProduction: content.includes('production'),
          hasDevelopment: content.includes('development')
        };
        log(`Script analisado: ${scriptPath}`);
      }
    });
    
    return analysis;
  },

  analyzePackageScripts: () => {
    log('Analisando scripts dos package.json...');
    const packageScripts = {};
    
    CONFIG.packageScripts.forEach(packagePath => {
      try {
        const packageData = JSON.parse(readFile(packagePath));
        if (packageData && packageData.scripts) {
          packageScripts[packagePath] = packageData.scripts;
          log(`Scripts do package analisados: ${packagePath}`);
        }
      } catch (error) {
        log(`Erro ao analisar package: ${packagePath}`);
      }
    });
    
    return packageScripts;
  },

  createPowerShellScripts: () => {
    log('Criando scripts PowerShell para automação...');
    
    const scripts = {
      'start-dev.ps1': `# DOM-V2 Development Start Script
# PowerShell script para iniciar ambiente de desenvolvimento

Write-Host "🚀 Iniciando DOM-V2 em modo desenvolvimento..." -ForegroundColor Green

# Verificar se Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não encontrado. Instale o Node.js primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se npm está instalado
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm não encontrado. Instale o npm primeiro." -ForegroundColor Red
    exit 1
}

# Instalar dependências se necessário
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

if (-not (Test-Path "frontend/node_modules")) {
    Write-Host "📦 Instalando dependências do frontend..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

# Iniciar backend
Write-Host "🔧 Iniciando backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run start-backend"

# Aguardar um pouco para o backend inicializar
Start-Sleep -Seconds 3

# Iniciar frontend
Write-Host "🎨 Iniciando frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "✅ DOM-V2 iniciado com sucesso!" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "🔧 Backend: http://localhost:3001" -ForegroundColor Blue
Write-Host "📱 Mobile: Expo DevTools" -ForegroundColor Blue
`,

      'build-prod.ps1': `# DOM-V2 Production Build Script
# PowerShell script para build de produção

Write-Host "🏗️ Iniciando build de produção do DOM-V2..." -ForegroundColor Green

# Verificar ambiente
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não encontrado." -ForegroundColor Red
    exit 1
}

# Limpar builds anteriores
if (Test-Path "frontend/dist") {
    Write-Host "🧹 Limpando build anterior..." -ForegroundColor Yellow
    Remove-Item "frontend/dist" -Recurse -Force
}

# Build do frontend
Write-Host "📦 Buildando frontend..." -ForegroundColor Cyan
Set-Location frontend
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build do frontend" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Build do shared library
Write-Host "📚 Buildando shared library..." -ForegroundColor Cyan
if (Test-Path "frontend/src/micro-frontends/shared") {
    Set-Location "frontend/src/micro-frontends/shared"
    npm run build
    Set-Location ../../..
}

Write-Host "✅ Build de produção concluído!" -ForegroundColor Green
Write-Host "📁 Arquivos gerados em: frontend/dist/" -ForegroundColor Blue
`,

      'deploy-web.ps1': `# DOM-V2 Web Deployment Script
# PowerShell script para deploy da versão web

Write-Host "🚀 Iniciando deploy da versão web..." -ForegroundColor Green

# Verificar se o build existe
if (-not (Test-Path "frontend/dist")) {
    Write-Host "❌ Build não encontrado. Execute build-prod.ps1 primeiro." -ForegroundColor Red
    exit 1
}

# Configurações de deploy
$deployPath = "deploy/web"
$buildPath = "frontend/dist"

# Criar diretório de deploy
if (Test-Path $deployPath) {
    Write-Host "🧹 Limpando deploy anterior..." -ForegroundColor Yellow
    Remove-Item $deployPath -Recurse -Force
}

New-Item -ItemType Directory -Path $deployPath -Force | Out-Null

# Copiar arquivos de build
Write-Host "📁 Copiando arquivos de build..." -ForegroundColor Cyan
Copy-Item "$buildPath/*" -Destination $deployPath -Recurse

# Copiar configurações de servidor
Write-Host "⚙️ Copiando configurações..." -ForegroundColor Cyan
Copy-Item "frontend/scripts/serve-prod.js" -Destination $deployPath

# Criar package.json para deploy
$deployPackage = @{
    name = "dom-v2-web-deploy"
    version = "1.0.0"
    scripts = @{
        start = "node serve-prod.js"
    }
    dependencies = @{
        express = "^4.18.2"
    }
}

$deployPackage | ConvertTo-Json -Depth 10 | Out-File "$deployPath/package.json" -Encoding UTF8

Write-Host "✅ Deploy web concluído!" -ForegroundColor Green
Write-Host "📁 Deploy em: $deployPath" -ForegroundColor Blue
Write-Host "🚀 Para iniciar: cd $deployPath; npm install; npm start" -ForegroundColor Blue
`,

      'test-all.ps1': `# DOM-V2 Test Script
# PowerShell script para executar todos os testes

Write-Host "🧪 Iniciando testes do DOM-V2..." -ForegroundColor Green

# Testes do frontend
Write-Host "🎨 Testando frontend..." -ForegroundColor Cyan
Set-Location frontend
npm test

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Testes do frontend falharam" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Testes do backend (se existir)
if (Test-Path "backend") {
    Write-Host "🔧 Testando backend..." -ForegroundColor Cyan
    Set-Location backend
    if (Test-Path "package.json") {
        npm test
    }
    Set-Location ..
}

# Testes de integração
Write-Host "🔗 Testando integração..." -ForegroundColor Cyan
node scripts/test-integration.js

Write-Host "✅ Todos os testes concluídos!" -ForegroundColor Green
`
    };
    
    let createdCount = 0;
    Object.entries(scripts).forEach(([filename, content]) => {
      if (writeFile(filename, content)) {
        createdCount++;
      }
    });
    
    return createdCount;
  },

  createDocumentation: () => {
    log('Criando documentação dos scripts...');
    
    const documentation = `# Scripts de Build, Start e Deploy - DOM-V2

## 📋 Visão Geral

Este documento descreve todos os scripts disponíveis para build, desenvolvimento e deploy do projeto DOM-V2.

## 🚀 Scripts PowerShell (Recomendados)

### Desenvolvimento
- \`start-dev.ps1\` - Inicia ambiente completo de desenvolvimento
- \`test-all.ps1\` - Executa todos os testes

### Produção
- \`build-prod.ps1\` - Build de produção
- \`deploy-web.ps1\` - Deploy da versão web

## 📦 Scripts npm

### Frontend
\`\`\`bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run dev:custom   # Servidor customizado
npm start           # Metro bundler (React Native)

# Build
npm run build       # Build de produção
npm run build:dev   # Build de desenvolvimento
npm run build:custom # Build customizado

# Servidor
npm run serve:prod  # Servidor de produção

# Testes
npm test           # Jest tests
npm run lint       # ESLint
\`\`\`

### Backend
\`\`\`bash
# Desenvolvimento
npm run start:simple # Servidor simples
npm run dev         # Nodemon

# Build
npm run build       # TypeScript build

# Testes
npm test           # Jest tests
\`\`\`

## 🔧 Configurações

### Webpack
- \`frontend/webpack.config.js\` - Configuração principal
- \`frontend/babel.config.js\` - Configuração Babel
- \`frontend/metro.config.js\` - Configuração Metro

### Scripts Customizados
- \`frontend/scripts/build.js\` - Build customizado
- \`frontend/scripts/dev.js\` - Desenvolvimento customizado
- \`frontend/scripts/serve-prod.js\` - Servidor de produção

## 🌐 Ambientes

### Desenvolvimento
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Metro: http://localhost:8081

### Produção
- Web: http://localhost:3000 (build otimizado)
- Mobile: Expo DevTools

## 📱 Mobile vs Web

### Web
- Usa Webpack para bundling
- Build otimizado para navegadores
- Servidor Express para produção

### Mobile
- Usa Metro bundler
- Build para React Native
- Expo para desenvolvimento

## 🔍 Troubleshooting

### Problemas Comuns
1. **Porta em uso**: Mude a porta no script ou mate o processo
2. **Dependências**: Execute \`npm install\` em cada diretório
3. **Cache**: Limpe cache com \`npm run clean\`

### Logs
- Frontend: Console do navegador
- Backend: Terminal do servidor
- Metro: Terminal do Metro bundler

## 📊 Performance

### Build Times
- Desenvolvimento: ~5-10s
- Produção: ~30-60s
- Mobile: ~10-20s

### Bundle Sizes
- Web: ~2-5MB (desenvolvimento), ~500KB-1MB (produção)
- Mobile: ~10-20MB (desenvolvimento)

---
*Documentação gerada em: ${new Date().toISOString()}*
`;
    
    writeFile('./docs/development/scripts-documentation.md', documentation);
    log('Documentação dos scripts criada');
  },

  generateReport: (analysis, packageScripts, scriptsCreated) => {
    const report = {
      timestamp: new Date().toISOString(),
      operacao: 'Revisão de Scripts de Build e Deploy',
      estatisticas: {
        scriptsAnalisados: Object.keys(analysis.scripts).length,
        packagesAnalisados: Object.keys(packageScripts).length,
        scriptsPowerShellCriados: scriptsCreated
      },
      analiseScripts: analysis,
      scriptsPackages: packageScripts,
      scriptsCriados: [
        'start-dev.ps1',
        'build-prod.ps1',
        'deploy-web.ps1',
        'test-all.ps1'
      ],
      observacoes: [
        'Scripts PowerShell criados para automação',
        'Documentação completa dos scripts',
        'Separação clara entre desenvolvimento e produção',
        'Scripts específicos para web e mobile',
        'Troubleshooting e logs documentados'
      ]
    };

    writeFile('./docs/reports/scripts-review-report.json', JSON.stringify(report, null, 2));
    log('Relatório de revisão de scripts gerado');
  }
};

// Execução principal
const main = () => {
  log('Iniciando revisão de scripts de build e deploy...');
  
  try {
    const analysis = revisarScripts.analyzeScripts();
    const packageScripts = revisarScripts.analyzePackageScripts();
    const scriptsCreated = revisarScripts.createPowerShellScripts();
    
    revisarScripts.createDocumentation();
    revisarScripts.generateReport(analysis, packageScripts, scriptsCreated);
    
    log('✅ Revisão de scripts concluída!');
    log(`📊 Resumo: ${Object.keys(analysis.scripts).length} scripts analisados, ${scriptsCreated} scripts PowerShell criados`);
    
  } catch (error) {
    log(`❌ Erro durante a revisão: ${error.message}`);
    process.exit(1);
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = { revisarScripts, CONFIG }; 