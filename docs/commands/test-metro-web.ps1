# Script de Teste Metro Bundler Web
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== TESTE METRO BUNDLER WEB ===" -ForegroundColor Green
Write-Host "Data: $(Get-Date)" -ForegroundColor Yellow

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

Write-Host "`nIniciando Metro Bundler..." -ForegroundColor Cyan
Set-Location frontend
npm start

Write-Host "`nMetro Bundler iniciado!" -ForegroundColor Green
Write-Host "Teste: http://localhost:8081/index.bundle?platform=web&dev=true" -ForegroundColor Yellow 