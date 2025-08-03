# DOM-V2 Production Build Script
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
