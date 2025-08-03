# Script de Teste Bundle Web
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== TESTE BUNDLE WEB ===" -ForegroundColor Green
Write-Host "Data: $(Get-Date)" -ForegroundColor Yellow

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

Write-Host "`n1. Verificando dependências..." -ForegroundColor Cyan
Set-Location frontend

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependências..." -ForegroundColor Yellow
    npm install
}

Write-Host "`n2. Testando build web..." -ForegroundColor Cyan
Write-Host "Executando: npm run build:web" -ForegroundColor Yellow

npm run build:web

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Build web executado com sucesso!" -ForegroundColor Green
    Write-Host "Verifique a pasta web-build/" -ForegroundColor Yellow
} else {
    Write-Host "`n❌ Erro no build web" -ForegroundColor Red
} 