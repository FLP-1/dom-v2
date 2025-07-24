# Script para testar o frontend web DOM v2
# Verifica se os erros foram resolvidos

Write-Host "🧪 Testando Frontend Web DOM v2..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# Testar se o frontend web está respondendo
Write-Host "1. Testando servidor frontend web..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET -TimeoutSec 5
    Write-Host "✅ Frontend Web: OK" -ForegroundColor Green
    Write-Host "   - Status: $($response.status)" -ForegroundColor Cyan
    Write-Host "   - Uptime: $([math]::Round($response.uptime))s" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Frontend Web: FALHOU" -ForegroundColor Red
    Write-Host "   - Erro: $($_.Exception.Message)" -ForegroundColor Red
}

# Testar se o backend está respondendo
Write-Host "2. Testando servidor backend..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 5
    Write-Host "✅ Backend: OK" -ForegroundColor Green
    Write-Host "   - Status: $($response.status)" -ForegroundColor Cyan
    Write-Host "   - Versão: $($response.version)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Backend: FALHOU" -ForegroundColor Red
    Write-Host "   - Erro: $($_.Exception.Message)" -ForegroundColor Red
}

# Testar se o Metro bundler está respondendo
Write-Host "3. Testando Metro bundler..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/status" -Method GET -TimeoutSec 5
    Write-Host "✅ Metro Bundler: OK" -ForegroundColor Green
} catch {
    Write-Host "❌ Metro Bundler: FALHOU" -ForegroundColor Red
    Write-Host "   - Erro: $($_.Exception.Message)" -ForegroundColor Red
}

# Testar login
Write-Host "4. Testando API de login..." -ForegroundColor Yellow
try {
    $body = @{ cpf = "12345678901"; password = "123456" } | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" -Method POST -Body $body -ContentType "application/json" -TimeoutSec 5
    Write-Host "✅ Login API: OK" -ForegroundColor Green
    Write-Host "   - Success: $($response.success)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Login API: FALHOU" -ForegroundColor Red
    Write-Host "   - Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🌐 URLs para teste:" -ForegroundColor Green
Write-Host "   - Frontend Web: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   - Backend API: http://localhost:3001" -ForegroundColor Cyan
Write-Host "   - Metro Bundler: http://localhost:8081" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Abra http://localhost:3000 no navegador para testar o frontend" -ForegroundColor Yellow
Write-Host "💡 Verifique o console do navegador para confirmar se os erros foram resolvidos" -ForegroundColor Yellow 