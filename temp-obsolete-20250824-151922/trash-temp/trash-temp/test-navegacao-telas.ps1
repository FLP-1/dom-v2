# Teste Navegação de Telas - DOM v2
Write-Host "=== TESTE NAVEGAÇÃO DE TELAS ===" -ForegroundColor Green

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
Write-Host "Nova funcionalidade:" -ForegroundColor Green
Write-Host "  - Tela de Navegação Completa criada" -ForegroundColor White
Write-Host "  - Botão '🎯 Navegar Telas' no dashboard" -ForegroundColor White
Write-Host "  - Acesso a todas as telas do sistema" -ForegroundColor White
Write-Host "  - Organização por categorias (Atual, Backup, Premium)" -ForegroundColor White
Write-Host ""
Write-Host "Como usar:" -ForegroundColor Green
Write-Host "  1. Faça login no sistema" -ForegroundColor White
Write-Host "  2. No dashboard, clique em '🎯 Navegar Telas'" -ForegroundColor White
Write-Host "  3. Explore todas as telas disponíveis" -ForegroundColor White
Write-Host "  4. Teste layouts e funcionalidades" -ForegroundColor White
Write-Host ""
Write-Host "Telas disponíveis:" -ForegroundColor Green
Write-Host "  - Atual: 3 telas (Splash, Login, Dashboard)" -ForegroundColor White
Write-Host "  - Backup: 8 telas (versões anteriores)" -ForegroundColor White
Write-Host "  - Premium: 13 telas (funcionalidades avançadas)" -ForegroundColor White
Write-Host ""
Write-Host "Total: 24 telas para testar!" -ForegroundColor Yellow 