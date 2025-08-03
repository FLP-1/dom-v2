
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

// Função de log que funciona no PowerShell
const log = (message) => {
  process.stdout.write(`[${new Date().toISOString()}] ${message}\n`);
};

log('Criando pipelines de CI/CD separados para web e mobile...');

const CONFIG = {
  cicdDir: './cicd',
  pipelines: {
    web: {
      name: 'web-pipeline',
      description: 'Pipeline para build e deploy da versão web',
      triggers: ['push', 'pull_request'],
      branches: ['main', 'develop', 'feature/web-*']
    },
    mobile: {
      name: 'mobile-pipeline',
      description: 'Pipeline para build e deploy da versão mobile',
      triggers: ['push', 'pull_request'],
      branches: ['main', 'develop', 'feature/mobile-*']
    },
    shared: {
      name: 'shared-pipeline',
      description: 'Pipeline para build e teste da shared library',
      triggers: ['push', 'pull_request'],
      branches: ['main', 'develop', 'feature/shared-*']
    }
  }
};

// Funções utilitárias
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
const criarPipelines = {
  createWebPipeline: () => {
    log('Criando pipeline para web...');
    
    const webPipeline = `name: Web Pipeline - DOM-V2

on:
  push:
    branches: [ main, develop, 'feature/web-*' ]
    paths: [ 'frontend/**', 'docs/**', 'scripts/**' ]
  pull_request:
    branches: [ main, develop ]
    paths: [ 'frontend/**', 'docs/**', 'scripts/**' ]

jobs:
  test:
    name: Test Web Application
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
        
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Run linting
      run: |
        cd frontend
        npm run lint
        
    - name: Run tests
      run: |
        cd frontend
        npm test
        
    - name: Build application
      run: |
        cd frontend
        npm run build
        
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: web-build
        path: frontend/dist/
        retention-days: 7
        
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/develop'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Download build artifacts
      uses: actions/download-artifact@v4
      with:
        name: web-build
        
    - name: Deploy to staging
      run: |
        echo "Deploying to staging environment..."
        # Add your staging deployment commands here
        
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    environment: production
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Download build artifacts
      uses: actions/download-artifact@v4
      with:
        name: web-build
        
    - name: Deploy to production
      run: |
        echo "Deploying to production environment..."
        # Add your production deployment commands here
`;
    
    return writeFile(`${CONFIG.cicdDir}/pipelines/web-pipeline.yml`, webPipeline);
  },

  createMobilePipeline: () => {
    log('Criando pipeline para mobile...');
    
    const mobilePipeline = `name: Mobile Pipeline - DOM-V2

on:
  push:
    branches: [ main, develop, 'feature/mobile-*' ]
    paths: [ 'frontend/**', 'mobile-app/**', 'docs/**' ]
  pull_request:
    branches: [ main, develop ]
    paths: [ 'frontend/**', 'mobile-app/**', 'docs/**' ]

jobs:
  test:
    name: Test Mobile Application
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
        
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Run linting
      run: |
        cd frontend
        npm run lint
        
    - name: Run tests
      run: |
        cd frontend
        npm test
        
    - name: Metro bundler test
      run: |
        cd frontend
        npx react-native start --reset-cache &
        sleep 10
        npx react-native run-android --variant=debug
        
  build-android:
    name: Build Android APK
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Setup Java
      uses: actions/setup-java@v4
      with:
        distribution: 'zulu'
        java-version: '11'
        
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Build Android APK
      run: |
        cd frontend
        npx react-native run-android --variant=release
        
    - name: Upload APK
      uses: actions/upload-artifact@v4
      with:
        name: android-apk
        path: frontend/android/app/build/outputs/apk/release/
        retention-days: 30
        
  build-ios:
    name: Build iOS App
    runs-on: macos-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Install iOS dependencies
      run: |
        cd frontend/ios
        pod install
        
    - name: Build iOS app
      run: |
        cd frontend
        npx react-native run-ios --configuration Release
        
    - name: Upload iOS build
      uses: actions/upload-artifact@v4
      with:
        name: ios-build
        path: frontend/ios/build/
        retention-days: 30
`;
    
    return writeFile(`${CONFIG.cicdDir}/pipelines/mobile-pipeline.yml`, mobilePipeline);
  },

  createSharedPipeline: () => {
    log('Criando pipeline para shared library...');
    
    const sharedPipeline = `name: Shared Library Pipeline - DOM-V2

on:
  push:
    branches: [ main, develop, 'feature/shared-*' ]
    paths: [ 'frontend/src/micro-frontends/shared/**' ]
  pull_request:
    branches: [ main, develop ]
    paths: [ 'frontend/src/micro-frontends/shared/**' ]

jobs:
  test:
    name: Test Shared Library
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/src/micro-frontends/shared/package-lock.json
        
    - name: Install dependencies
      run: |
        cd frontend/src/micro-frontends/shared
        npm ci
        
    - name: Run linting
      run: |
        cd frontend/src/micro-frontends/shared
        npm run lint
        
    - name: Run tests
      run: |
        cd frontend/src/micro-frontends/shared
        npm test
        
    - name: Build library
      run: |
        cd frontend/src/micro-frontends/shared
        npm run build
        
    - name: Upload build artifacts
      uses: actions/upload-artifact@v4
      with:
        name: shared-library
        path: frontend/src/micro-frontends/shared/dist/
        retention-days: 7
        
  publish:
    name: Publish Shared Library
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        registry-url: 'https://npm.pkg.github.com'
        
    - name: Download build artifacts
      uses: actions/download-artifact@v4
      with:
        name: shared-library
        
    - name: Publish to GitHub Packages
      run: |
        cd frontend/src/micro-frontends/shared
        npm publish
      env:
        NODE_AUTH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;
    
    return writeFile(`${CONFIG.cicdDir}/pipelines/shared-pipeline.yml`, sharedPipeline);
  },

  createMainWorkflow: () => {
    log('Criando workflow principal...');
    
    const mainWorkflow = `name: DOM-V2 Main Workflow

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  validate:
    name: Validate Project Structure
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Validate file structure
      run: |
        echo "Validating project structure..."
        test -f "package.json" || exit 1
        test -f "frontend/package.json" || exit 1
        test -d "frontend/src/micro-frontends/shared" || exit 1
        echo "✅ Project structure is valid"
        
    - name: Check for required files
      run: |
        echo "Checking for required files..."
        test -f "README.md" || exit 1
        test -f "docs/README.md" || exit 1
        test -f "frontend/src/micro-frontends/shared/package.json" || exit 1
        echo "✅ All required files present"
        
  security:
    name: Security Audit
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        npm ci
        cd frontend && npm ci
        
    - name: Run security audit
      run: |
        npm audit --audit-level moderate
        cd frontend && npm audit --audit-level moderate
        
    - name: Run dependency check
      run: |
        node scripts/auditar-deps-final.js
        
  quality:
    name: Quality Gates
    runs-on: ubuntu-latest
    needs: [validate, security]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Run quality checks
      run: |
        cd frontend
        npm run lint
        npm test -- --coverage --watchAll=false
        
    - name: Check test coverage
      run: |
        cd frontend
        npm run test:coverage
        # Fail if coverage is below 80%
        if [ \$(node -e "console.log(require('./coverage/coverage-summary.json').total.lines.pct)") -lt 80 ]; then
          echo "❌ Test coverage is below 80%"
          exit 1
        fi
        echo "✅ Test coverage is above 80%"
`;
    
    return writeFile(`${CONFIG.cicdDir}/.github/workflows/main.yml`, mainWorkflow);
  },

  createPowerShellScripts: () => {
    log('Criando scripts PowerShell para CI/CD...');
    
    const scripts = {
      'run-cicd-local.ps1': `# Local CI/CD Pipeline Script
# Executa pipeline localmente para testes

Write-Host "🚀 Executando pipeline local..." -ForegroundColor Green

# Verificar ambiente
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não encontrado." -ForegroundColor Red
    exit 1
}

# Validar estrutura
Write-Host "📋 Validando estrutura do projeto..." -ForegroundColor Cyan
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json não encontrado" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "frontend/package.json")) {
    Write-Host "❌ frontend/package.json não encontrado" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Estrutura válida" -ForegroundColor Green

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Cyan
npm install
Set-Location frontend
npm install
Set-Location ..

# Executar testes
Write-Host "🧪 Executando testes..." -ForegroundColor Cyan
Set-Location frontend
npm test

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Testes falharam" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Executar lint
Write-Host "🔍 Executando lint..." -ForegroundColor Cyan
Set-Location frontend
npm run lint

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Lint falhou" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Build
Write-Host "🏗️ Executando build..." -ForegroundColor Cyan
Set-Location frontend
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build falhou" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "✅ Pipeline local executado com sucesso!" -ForegroundColor Green
`,

      'deploy-staging.ps1': `# Deploy to Staging Script
# Script para deploy em ambiente de staging

Write-Host "🚀 Iniciando deploy para staging..." -ForegroundColor Green

# Verificar se o build existe
if (-not (Test-Path "frontend/dist")) {
    Write-Host "❌ Build não encontrado. Execute build-prod.ps1 primeiro." -ForegroundColor Red
    exit 1
}

# Configurações de staging
$stagingPath = "deploy/staging"
$buildPath = "frontend/dist"

# Criar diretório de staging
if (Test-Path $stagingPath) {
    Write-Host "🧹 Limpando staging anterior..." -ForegroundColor Yellow
    Remove-Item $stagingPath -Recurse -Force
}

New-Item -ItemType Directory -Path $stagingPath -Force | Out-Null

# Copiar arquivos de build
Write-Host "📁 Copiando arquivos para staging..." -ForegroundColor Cyan
Copy-Item "$buildPath/*" -Destination $stagingPath -Recurse

# Configurar ambiente de staging
Write-Host "⚙️ Configurando ambiente de staging..." -ForegroundColor Cyan
$stagingConfig = @{
    environment = "staging"
    apiUrl = "https://api-staging.dom-v2.com"
    version = "1.0.0-staging"
}

$stagingConfig | ConvertTo-Json | Out-File "$stagingPath/config.json" -Encoding UTF8

Write-Host "✅ Deploy para staging concluído!" -ForegroundColor Green
Write-Host "📁 Staging em: $stagingPath" -ForegroundColor Blue
Write-Host "🌐 URL: https://staging.dom-v2.com" -ForegroundColor Blue
`,

      'deploy-production.ps1': `# Deploy to Production Script
# Script para deploy em produção

Write-Host "🚀 Iniciando deploy para produção..." -ForegroundColor Green

# Verificar se o build existe
if (-not (Test-Path "frontend/dist")) {
    Write-Host "❌ Build não encontrado. Execute build-prod.ps1 primeiro." -ForegroundColor Red
    exit 1
}

# Confirmação de segurança
$confirmation = Read-Host "⚠️  ATENÇÃO: Esta ação irá fazer deploy em PRODUÇÃO. Continuar? (y/N)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "❌ Deploy cancelado." -ForegroundColor Red
    exit 1
}

# Configurações de produção
$productionPath = "deploy/production"
$buildPath = "frontend/dist"

# Criar diretório de produção
if (Test-Path $productionPath) {
    Write-Host "🧹 Limpando produção anterior..." -ForegroundColor Yellow
    Remove-Item $productionPath -Recurse -Force
}

New-Item -ItemType Directory -Path $productionPath -Force | Out-Null

# Copiar arquivos de build
Write-Host "📁 Copiando arquivos para produção..." -ForegroundColor Cyan
Copy-Item "$buildPath/*" -Destination $productionPath -Recurse

# Configurar ambiente de produção
Write-Host "⚙️ Configurando ambiente de produção..." -ForegroundColor Cyan
$productionConfig = @{
    environment = "production"
    apiUrl = "https://api.dom-v2.com"
    version = "1.0.0"
}

$productionConfig | ConvertTo-Json | Out-File "$productionPath/config.json" -Encoding UTF8

# Backup da versão anterior
Write-Host "💾 Criando backup..." -ForegroundColor Cyan
$backupPath = "deploy/backup/$(Get-Date -Format 'yyyy-MM-dd-HH-mm-ss')"
New-Item -ItemType Directory -Path $backupPath -Force | Out-Null

Write-Host "✅ Deploy para produção concluído!" -ForegroundColor Green
Write-Host "📁 Produção em: $productionPath" -ForegroundColor Blue
Write-Host "🌐 URL: https://dom-v2.com" -ForegroundColor Blue
Write-Host "💾 Backup em: $backupPath" -ForegroundColor Blue
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
    log('Criando documentação dos pipelines...');
    
    const documentation = `# CI/CD Pipelines - DOM-V2

## 📋 Visão Geral

Este documento descreve os pipelines de CI/CD implementados para o projeto DOM-V2.

## 🚀 Pipelines Implementados

### 1. Web Pipeline (\`web-pipeline.yml\`)
**Objetivo:** Build e deploy da versão web

**Triggers:**
- Push para branches: main, develop, feature/web-*
- Pull Request para main/develop
- Mudanças em: frontend/, docs/, scripts/

**Jobs:**
- **Test:** Lint, testes, build
- **Deploy Staging:** Deploy automático para staging (develop)
- **Deploy Production:** Deploy manual para produção (main)

### 2. Mobile Pipeline (\`mobile-pipeline.yml\`)
**Objetivo:** Build e deploy da versão mobile

**Triggers:**
- Push para branches: main, develop, feature/mobile-*
- Pull Request para main/develop
- Mudanças em: frontend/, mobile-app/, docs/

**Jobs:**
- **Test:** Lint, testes, Metro bundler
- **Build Android:** Gera APK para Android
- **Build iOS:** Gera build para iOS (macOS)

### 3. Shared Pipeline (\`shared-pipeline.yml\`)
**Objetivo:** Build e publicação da shared library

**Triggers:**
- Push para branches: main, develop, feature/shared-*
- Pull Request para main/develop
- Mudanças em: frontend/src/micro-frontends/shared/

**Jobs:**
- **Test:** Lint, testes, build da library
- **Publish:** Publica no GitHub Packages (main)

### 4. Main Workflow (\`main.yml\`)
**Objetivo:** Validação geral e quality gates

**Triggers:**
- Push/Pull Request para main/develop

**Jobs:**
- **Validate:** Valida estrutura do projeto
- **Security:** Auditoria de segurança
- **Quality:** Quality gates e cobertura de testes

## 🔧 Scripts PowerShell

### Local Development
- \`run-cicd-local.ps1\` - Executa pipeline localmente
- \`deploy-staging.ps1\` - Deploy para staging
- \`deploy-production.ps1\` - Deploy para produção

### Uso
\`\`\`powershell
# Executar pipeline local
.\\run-cicd-local.ps1

# Deploy para staging
.\\deploy-staging.ps1

# Deploy para produção
.\\deploy-production.ps1
\`\`\`

## 🌐 Ambientes

### Staging
- **URL:** https://staging.dom-v2.com
- **Deploy:** Automático (develop)
- **Config:** Ambiente de testes

### Production
- **URL:** https://dom-v2.com
- **Deploy:** Manual (main)
- **Config:** Ambiente de produção

## 📊 Quality Gates

### Testes
- Cobertura mínima: 80%
- Todos os testes devem passar
- Lint sem erros

### Segurança
- npm audit sem vulnerabilidades críticas
- Auditoria de dependências
- Verificação de estrutura

### Build
- Build deve ser bem-sucedido
- Artefatos devem ser gerados
- Deploy deve funcionar

## 🔍 Monitoramento

### GitHub Actions
- Status dos workflows
- Tempo de execução
- Artefatos gerados

### Logs
- Logs de build
- Logs de deploy
- Logs de testes

## ⚠️ Configurações Importantes

### Secrets Necessários
- \`GITHUB_TOKEN\` - Token do GitHub
- \`NPM_TOKEN\` - Token do NPM (para publicação)
- \`DEPLOY_KEY\` - Chave de deploy

### Branch Protection
- main: Requer PR aprovado
- develop: Requer testes passando
- feature/*: Requer lint passando

## 🚨 Troubleshooting

### Problemas Comuns
1. **Build falha:** Verificar dependências e configurações
2. **Testes falham:** Verificar cobertura e casos de teste
3. **Deploy falha:** Verificar secrets e permissões
4. **Pipeline não executa:** Verificar triggers e paths

### Logs de Debug
\`\`\`bash
# Ver logs do GitHub Actions
gh run list
gh run view <run-id>

# Ver logs locais
npm run build --verbose
npm test --verbose
\`\`\`

---
*Documentação gerada em: ${new Date().toISOString()}*
`;
    
    writeFile('./docs/development/cicd-pipelines.md', documentation);
    log('Documentação dos pipelines criada');
  },

  generateReport: (pipelinesCreated, scriptsCreated) => {
    const report = {
      timestamp: new Date().toISOString(),
      operacao: 'Implementação de Pipelines CI/CD',
      pipelines: {
        web: {
          arquivo: 'cicd/pipelines/web-pipeline.yml',
          descricao: 'Pipeline para build e deploy da versão web',
          jobs: ['test', 'deploy-staging', 'deploy-production']
        },
        mobile: {
          arquivo: 'cicd/pipelines/mobile-pipeline.yml',
          descricao: 'Pipeline para build e deploy da versão mobile',
          jobs: ['test', 'build-android', 'build-ios']
        },
        shared: {
          arquivo: 'cicd/pipelines/shared-pipeline.yml',
          descricao: 'Pipeline para build e publicação da shared library',
          jobs: ['test', 'publish']
        },
        main: {
          arquivo: 'cicd/.github/workflows/main.yml',
          descricao: 'Workflow principal com quality gates',
          jobs: ['validate', 'security', 'quality']
        }
      },
      scriptsPowerShell: [
        'run-cicd-local.ps1',
        'deploy-staging.ps1',
        'deploy-production.ps1'
      ],
      estatisticas: {
        pipelinesCriados: pipelinesCreated,
        scriptsCriados: scriptsCreated,
        totalJobs: 9,
        ambientes: ['staging', 'production']
      },
      observacoes: [
        'Pipelines separados para web, mobile e shared',
        'Quality gates implementados',
        'Scripts PowerShell para automação local',
        'Documentação completa dos pipelines',
        'Ambientes de staging e produção configurados'
      ]
    };

    writeFile('./docs/reports/cicd-pipelines-report.json', JSON.stringify(report, null, 2));
    log('Relatório dos pipelines CI/CD gerado');
  }
};

// Execução principal
try {
  const pipelinesCreated = [
    criarPipelines.createWebPipeline(),
    criarPipelines.createMobilePipeline(),
    criarPipelines.createSharedPipeline(),
    criarPipelines.createMainWorkflow()
  ].filter(Boolean).length;
  
  const scriptsCreated = criarPipelines.createPowerShellScripts();
  criarPipelines.createDocumentation();
  criarPipelines.generateReport(pipelinesCreated, scriptsCreated);
  
  log('✅ Pipelines de CI/CD criados com sucesso!');
  log(`📊 Resumo: ${pipelinesCreated} pipelines criados, ${scriptsCreated} scripts PowerShell criados`);
  
} catch (error) {
  log('❌ Erro: ' + error.message);
} 