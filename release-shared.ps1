# Release Shared Library Script
# Script para fazer release da shared library

Write-Host "🚀 Iniciando release da shared library..." -ForegroundColor Green

Set-Location "frontend/src/micro-frontends/shared"

# Verificar se há mudanças não commitadas
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  Há mudanças não commitadas. Commit as mudanças primeiro." -ForegroundColor Red
    exit 1
}

# Build da library
Write-Host "📦 Buildando shared library..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro no build" -ForegroundColor Red
    exit 1
}

# Testes
Write-Host "🧪 Executando testes..." -ForegroundColor Cyan
npm test

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Testes falharam" -ForegroundColor Red
    exit 1
}

# Lint
Write-Host "🔍 Executando lint..." -ForegroundColor Cyan
npm run lint

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Lint falhou" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Release preparado com sucesso!" -ForegroundColor Green
Write-Host "📝 Próximos passos:" -ForegroundColor Blue
Write-Host "   1. Atualizar CHANGELOG.md" -ForegroundColor Blue
Write-Host "   2. Commit das mudanças" -ForegroundColor Blue
Write-Host "   3. Tag da versão" -ForegroundColor Blue
Write-Host "   4. Push para repositório" -ForegroundColor Blue

Set-Location ../../..
