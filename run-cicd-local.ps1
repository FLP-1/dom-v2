# Local CI/CD Pipeline Script
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
