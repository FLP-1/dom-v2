# Script DOM v2 Web - Com Verificação
# Data: 23/07/2025
# Regra: Simplicidade extrema

Write-Host "=== DOM v2 WEB ===" -ForegroundColor Green

# Verificar se Metro já está rodando
$metroProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {$_.CommandLine -like "*metro*" -or $_.CommandLine -like "*react-native*"}

if ($metroProcess) {
    Write-Host "✅ Metro já está rodando!" -ForegroundColor Green
    Write-Host "Acesse: http://localhost:3000" -ForegroundColor Yellow
} else {
    Write-Host "Iniciando Metro..." -ForegroundColor Cyan
    Set-Location frontend
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start"
    Write-Host "Aguarde Metro carregar, depois acesse: http://localhost:3000" -ForegroundColor Yellow
} 