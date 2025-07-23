# Script de Teste Metro Bundler Simples
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== TESTE METRO BUNDLER SIMPLES ===" -ForegroundColor Green
Write-Host "Data: $(Get-Date)" -ForegroundColor Yellow

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

Write-Host "`nVerificando dependências..." -ForegroundColor Cyan
Set-Location frontend

# Verificar se node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependências..." -ForegroundColor Yellow
    npm install
}

Write-Host "`nIniciando Metro Bundler..." -ForegroundColor Cyan
Write-Host "Aguardando Metro inicializar..." -ForegroundColor Yellow
Write-Host "Teste: http://localhost:8081/index.bundle?platform=web&dev=true" -ForegroundColor Green

npm start 