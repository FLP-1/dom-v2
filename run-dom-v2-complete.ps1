# Script Completo DOM v2
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== DOM v2 COMPLETO ===" -ForegroundColor Green

# Verificar diretório
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute no diretório raiz do DOM v2" -ForegroundColor Red
    exit 1
}

# 1. Iniciar Backend
Write-Host "1. Iniciando Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"

# 2. Aguardar backend
Write-Host "Aguardando 3 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# 3. Iniciar Metro Bundler
Write-Host "2. Iniciando Metro Bundler..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

# 4. Aguardar Metro
Write-Host "Aguardando 5 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# 5. Iniciar Servidor Web
Write-Host "3. Iniciando Servidor Web..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; node server-web.js"

Write-Host "`n=== TODOS OS SERVIÇOS INICIADOS ===" -ForegroundColor Green
Write-Host "Backend: http://localhost:3001" -ForegroundColor Yellow
Write-Host "Metro: http://localhost:8081" -ForegroundColor Yellow
Write-Host "Frontend Web: http://localhost:3000" -ForegroundColor Yellow 