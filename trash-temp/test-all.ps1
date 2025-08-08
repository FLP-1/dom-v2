# DOM-V2 Test Script
# PowerShell script para executar todos os testes

Write-Host "🧪 Iniciando testes do DOM-V2..." -ForegroundColor Green

# Testes do frontend
Write-Host "🎨 Testando frontend..." -ForegroundColor Cyan
Set-Location frontend
npm test

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Testes do frontend falharam" -ForegroundColor Red
    exit 1
}

Set-Location ..

# Testes do backend (se existir)
if (Test-Path "backend") {
    Write-Host "🔧 Testando backend..." -ForegroundColor Cyan
    Set-Location backend
    if (Test-Path "package.json") {
        npm test
    }
    Set-Location ..
}

# Testes de integração
Write-Host "🔗 Testando integração..." -ForegroundColor Cyan
node scripts/test-integration.js

Write-Host "✅ Todos os testes concluídos!" -ForegroundColor Green
