# Script de Execução DOM v2 - Web
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== EXECUCAO DOM v2 - WEB ===" -ForegroundColor Green
Write-Host "Data: $(Get-Date)" -ForegroundColor Yellow

# Verificar se estamos no diretório correto
if (-not (Test-Path "backend") -or -not (Test-Path "frontend")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto DOM v2" -ForegroundColor Red
    exit 1
}

Write-Host "`nIniciando Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"

Write-Host "Aguardando 3 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "`nIniciando Metro Bundler..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host "Aguardando 8 segundos para Metro inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

Write-Host "`nIniciando Frontend Web..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; node server-web.js"

Write-Host "`n=== SERVICOS WEB INICIADOS ===" -ForegroundColor Green
Write-Host "Backend: http://localhost:3001" -ForegroundColor Yellow
Write-Host "Metro Bundler: http://localhost:8081" -ForegroundColor Yellow
Write-Host "Frontend Web: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Health Check: http://localhost:3001/health" -ForegroundColor Yellow
Write-Host "`nPressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 