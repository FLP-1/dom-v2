# Teste Console Limpo - DOM v2
Write-Host "=== TESTE CONSOLE LIMPO ===" -ForegroundColor Green

# 1. Verificar serviços
Write-Host "1. Verificando serviços..." -ForegroundColor Yellow

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

# 2. Verificar portas
Write-Host "2. Verificando portas..." -ForegroundColor Yellow
$port3000 = netstat -ano | findstr ":3000"
$port3001 = netstat -ano | findstr ":3001"
$port8080 = netstat -ano | findstr ":8080"
$port8081 = netstat -ano | findstr ":8081"

Write-Host "   Porta 3000: $(if($port3000){'EM USO'}else{'LIVRE'})" -ForegroundColor $(if($port3000){'Green'}else{'Red'})
Write-Host "   Porta 3001: $(if($port3001){'EM USO'}else{'LIVRE'})" -ForegroundColor $(if($port3001){'Green'}else{'Red'})
Write-Host "   Porta 8080: $(if($port8080){'EM USO'}else{'LIVRE'})" -ForegroundColor $(if($port8080){'Red'}else{'Green'})
Write-Host "   Porta 8081: $(if($port8081){'EM USO'}else{'LIVRE'})" -ForegroundColor $(if($port8081){'Red'}else{'Green'})

# 3. Testar login
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

Write-Host ""
Write-Host "=== RESULTADO ===" -ForegroundColor Cyan
Write-Host "Acesse: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Login: CPF 12345678901, Senha 123456" -ForegroundColor Yellow
Write-Host "Marque o checkbox de termos!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Problemas corrigidos:" -ForegroundColor Green
Write-Host "  - Caracteres especiais removidos do JSX" -ForegroundColor White
Write-Host "  - TouchableOpacity substituído por Pressable" -ForegroundColor White
Write-Host "  - Cache do Webpack limpo" -ForegroundColor White
Write-Host "  - Servidores web extras removidos" -ForegroundColor White
Write-Host ""
Write-Host "Agora o console deve estar limpo!" -ForegroundColor Green
Write-Host "Verifique o console do navegador (F12)" -ForegroundColor Yellow 