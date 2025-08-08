# Script Único - DOM v2 Web
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== DOM v2 WEB ===" -ForegroundColor Green

# Verificar diretório
if (-not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute no diretório raiz do DOM v2" -ForegroundColor Red
    exit 1
}

# Iniciar Metro
Write-Host "Iniciando Metro..." -ForegroundColor Cyan
Set-Location frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"

Write-Host "Metro iniciado em: http://localhost:8081" -ForegroundColor Green
Write-Host "Aguarde Metro carregar, depois acesse: http://localhost:3000" -ForegroundColor Yellow 