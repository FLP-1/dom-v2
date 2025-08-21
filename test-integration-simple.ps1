# Teste de Integracao Completa - DOM v2
# Script para validar funcionamento do sistema

Write-Host "TESTE DE INTEGRACAO COMPLETA - DOM v2" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Funcao para testar endpoint
function Test-Endpoint {
    param(
        [string]$Url,
        [string]$Description,
        [string]$Method = "GET"
    )
    
    try {
        Write-Host "Testando: $Description" -ForegroundColor Yellow
        $response = Invoke-WebRequest -Uri $Url -Method $Method -TimeoutSec 10
        Write-Host "SUCESSO: $Description (Status: $($response.StatusCode))" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "FALHA: $Description" -ForegroundColor Red
        Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Funcao para testar API com dados
function Test-API-Data {
    param(
        [string]$Url,
        [string]$Description
    )
    
    try {
        Write-Host "Testando API: $Description" -ForegroundColor Yellow
        $response = Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 10
        $data = $response.Content | ConvertFrom-Json
        
        if ($data.success -eq $true) {
            Write-Host "SUCESSO: $Description" -ForegroundColor Green
            return $true
        } else {
            Write-Host "FALHA: $Description - API retornou erro" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "FALHA: $Description" -ForegroundColor Red
        Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Contadores de sucesso
$successCount = 0
$totalTests = 0

Write-Host "INICIANDO TESTES DE INTEGRACAO..." -ForegroundColor Magenta
Write-Host ""

# Teste 1: Backend Health Check
$totalTests++
if (Test-Endpoint -Url "http://localhost:3001/health" -Description "Backend Health Check") {
    $successCount++
}

# Teste 2: API Test
$totalTests++
if (Test-Endpoint -Url "http://localhost:3001/api/test" -Description "API Test") {
    $successCount++
}

# Teste 3: Dashboard Metrics
$totalTests++
if (Test-API-Data -Url "http://localhost:3001/api/dashboard/metrics" -Description "Dashboard Metrics") {
    $successCount++
}

# Teste 4: Dashboard Activity
$totalTests++
if (Test-API-Data -Url "http://localhost:3001/api/dashboard/activity" -Description "Dashboard Activity") {
    $successCount++
}

# Teste 5: User Profile
$totalTests++
if (Test-API-Data -Url "http://localhost:3001/api/auth/profile" -Description "User Profile") {
    $successCount++
}

# Teste 6: Documents Stats
$totalTests++
if (Test-API-Data -Url "http://localhost:3001/api/documents/stats" -Description "Documents Stats") {
    $successCount++
}

# Teste 7: Frontend Index
$totalTests++
if (Test-Endpoint -Url "http://localhost:3000" -Description "Frontend Index") {
    $successCount++
}

# Teste 8: Dashboard Page
$totalTests++
if (Test-Endpoint -Url "http://localhost:3000/dashboard.html" -Description "Dashboard Page") {
    $successCount++
}

# Teste 9: Login Page
$totalTests++
if (Test-Endpoint -Url "http://localhost:3000/login-screen.html" -Description "Login Page") {
    $successCount++
}

# Teste 10: Login API (POST)
$totalTests++
try {
    Write-Host "Testando: Login API" -ForegroundColor Yellow
    $loginData = @{
        cpf = "598.769.137-00"
        password = "123456"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/login" -Method POST -Body $loginData -ContentType "application/json" -TimeoutSec 10
    $data = $response.Content | ConvertFrom-Json
    
    if ($data.success -eq $true) {
        Write-Host "SUCESSO: Login API" -ForegroundColor Green
        Write-Host "   Token recebido: $($data.data.token)" -ForegroundColor Gray
        $successCount++
    } else {
        Write-Host "FALHA: Login API - Credenciais invalidas" -ForegroundColor Red
    }
}
catch {
    Write-Host "FALHA: Login API" -ForegroundColor Red
    Write-Host "   Erro: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "RESULTADOS DOS TESTES" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host ""

$successRate = [math]::Round(($successCount / $totalTests) * 100, 2)

Write-Host "Testes Passados: $successCount/$totalTests" -ForegroundColor Green
Write-Host "Taxa de Sucesso: $successRate%" -ForegroundColor Cyan

if ($successRate -eq 100) {
    Write-Host ""
    Write-Host "TODOS OS TESTES PASSARAM!" -ForegroundColor Green
    Write-Host "Sistema DOM v2 esta funcionando perfeitamente!" -ForegroundColor Green
} elseif ($successRate -ge 80) {
    Write-Host ""
    Write-Host "MAIORIA DOS TESTES PASSOU" -ForegroundColor Yellow
    Write-Host "Alguns ajustes podem ser necessarios" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "MUITOS TESTES FALHARAM" -ForegroundColor Red
    Write-Host "Verificacao urgente necessaria" -ForegroundColor Red
}

Write-Host ""
Write-Host "URLs DE ACESSO:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Dashboard: http://localhost:3000/dashboard.html" -ForegroundColor White
Write-Host "   Backend API: http://localhost:3001" -ForegroundColor White
Write-Host "   Health Check: http://localhost:3001/health" -ForegroundColor White

Write-Host ""
Write-Host "CREDENCIAIS DE TESTE:" -ForegroundColor Cyan
Write-Host "   CPF: 598.769.137-00" -ForegroundColor White
Write-Host "   Senha: 123456" -ForegroundColor White

Write-Host ""
Write-Host "Teste de integracao concluido!" -ForegroundColor Green
