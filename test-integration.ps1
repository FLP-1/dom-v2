# Integration Test Script
# Script para testar integração frontend-backend

Write-Host "🧪 Iniciando testes de integração..." -ForegroundColor Green

# Verificar se backend está rodando
Write-Host "🔍 Verificando backend..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend está rodando" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Backend respondeu com status: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Backend não está rodando em http://localhost:3001" -ForegroundColor Red
    Write-Host "💡 Inicie o backend primeiro: cd backend; npm run dev" -ForegroundColor Blue
    exit 1
}

# Verificar se frontend está rodando
Write-Host "🔍 Verificando frontend..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Frontend está rodando" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Frontend respondeu com status: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Frontend não está rodando em http://localhost:3000" -ForegroundColor Red
    Write-Host "💡 Inicie o frontend primeiro: cd frontend; npm run dev" -ForegroundColor Blue
    exit 1
}

# Executar testes de integração
Write-Host "🧪 Executando testes de integração..." -ForegroundColor Cyan
Set-Location frontend
npm run test:integration

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Testes de integração falharam" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "✅ Testes de integração concluídos com sucesso!" -ForegroundColor Green
