# Script para testar React Native Web
Write-Host "=== TESTE REACT NATIVE WEB ===" -ForegroundColor Green

# 1. Verificar se os servicos estao rodando
Write-Host "1. Verificando servicos..." -ForegroundColor Yellow

try {
    $backendHealth = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 5
    Write-Host "   Backend: OK - $($backendHealth.message)" -ForegroundColor Green
} catch {
    Write-Host "   Backend: ERRO - Nao responde" -ForegroundColor Red
}

try {
    $frontendResponse = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5
    Write-Host "   Frontend: OK - Status $($frontendResponse.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "   Frontend: ERRO - Nao responde" -ForegroundColor Red
}

# 2. Verificar se o bundle foi gerado
Write-Host "2. Verificando bundle..." -ForegroundColor Yellow

try {
    $bundleResponse = Invoke-WebRequest -Uri "http://localhost:3000/main.js" -Method GET -TimeoutSec 5
    if ($bundleResponse.StatusCode -eq 200) {
        Write-Host "   Bundle: OK - Tamanho: $($bundleResponse.Content.Length) bytes" -ForegroundColor Green
    } else {
        Write-Host "   Bundle: ERRO - Status $($bundleResponse.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "   Bundle: ERRO - Nao encontrado" -ForegroundColor Red
}

# 3. Verificar se a aplicacao carrega no navegador
Write-Host "3. Verificando aplicacao..." -ForegroundColor Yellow

try {
    $appResponse = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5
    if ($appResponse.Content -like "*root*" -and $appResponse.Content -like "*React Native*") {
        Write-Host "   Aplicacao: OK - React Native Web detectado" -ForegroundColor Green
    } else {
        Write-Host "   Aplicacao: AVISO - Estrutura HTML nao esperada" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   Aplicacao: ERRO - Nao carrega" -ForegroundColor Red
}

# 4. Verificar proxy da API
Write-Host "4. Verificando proxy da API..." -ForegroundColor Yellow

try {
    $apiResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method GET -TimeoutSec 5
    if ($apiResponse.StatusCode -eq 200) {
        Write-Host "   Proxy API: OK - Funcionando" -ForegroundColor Green
    } else {
        Write-Host "   Proxy API: AVISO - Status $($apiResponse.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   Proxy API: ERRO - Nao funciona" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== RESULTADO ===" -ForegroundColor Cyan
Write-Host "Acesse: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Se tudo estiver OK, a aplicacao React Native Web deve carregar!" -ForegroundColor Green 