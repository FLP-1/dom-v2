# Script de Execução DOM v2
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== EXECUCAO DOM v2 ===" -ForegroundColor Green
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

Write-Host "`nIniciando Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host "`n=== SERVICOS INICIADOS ===" -ForegroundColor Green
Write-Host "Backend: http://localhost:3001" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:8081" -ForegroundColor Yellow
Write-Host "Health Check: http://localhost:3001/health" -ForegroundColor Yellow
Write-Host "`nPressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 