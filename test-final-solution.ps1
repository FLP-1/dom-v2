# Script para testar a solução final
Write-Host "=== TESTE SOLUCAO FINAL ===" -ForegroundColor Green

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

# 3. Testar login com dados corretos
Write-Host "3. Testando login..." -ForegroundColor Yellow

try {
    $loginData = @{
        cpf = "12345678901"
        password = "123456"
        termsAccepted = $true
        privacyAccepted = $true
        marketingAccepted = $false
        rememberMe = $false
        biometricUsed = $false
    }

    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3001/api/auth/login" -Method POST -Body ($loginData | ConvertTo-Json) -ContentType "application/json" -TimeoutSec 10
    
    if ($loginResponse.user) {
        Write-Host "   Login: OK - Usuario: $($loginResponse.user.name)" -ForegroundColor Green
    } else {
        Write-Host "   Login: AVISO - Resposta inesperada" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   Login: ERRO - $($_.Exception.Message)" -ForegroundColor Red
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
Write-Host "Login de teste: CPF 12345678901, Senha 123456" -ForegroundColor Yellow
Write-Host "Nao esqueça de marcar 'Aceito os termos'" -ForegroundColor Yellow
Write-Host ""
Write-Host "Se tudo estiver OK, a aplicacao deve funcionar!" -ForegroundColor Green 