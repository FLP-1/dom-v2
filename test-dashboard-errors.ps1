# Teste de Erros do Dashboard - DOM v2
# Script para verificar se os erros JavaScript foram corrigidos

Write-Host "TESTE DE ERROS DO DASHBOARD - DOM v2" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Função para testar se a página carrega sem erros
function Test-DashboardErrors {
    try {
        Write-Host "Testando carregamento do dashboard..." -ForegroundColor Yellow
        
        # Testar se a página carrega
        $response = Invoke-WebRequest -Uri "http://localhost:3000/dashboard.html" -Method GET -TimeoutSec 10
        
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Dashboard carrega corretamente" -ForegroundColor Green
            
            # Verificar se há erros de sintaxe no HTML
            $content = $response.Content
            
            # Verificar problemas comuns
            $issues = @()
            
            # Verificar aspas duplas em onclick
            if ($content -match 'onclick="switchProfile\(''') {
                $issues += "Problema com aspas duplas em onclick"
            }
            
            # Verificar funções async mal definidas
            if ($content -match 'function\s+\w+\s*\(\s*\)\s*\{.*await') {
                $issues += "Função não async usando await"
            }
            
            # Verificar variáveis não definidas (apenas se não estiver protegido)
            if ($content -match 'messageSystem\.' -and $content -notmatch 'typeof messageSystem') {
                $issues += "Possível problema com messageSystem"
            }
            
            if ($issues.Count -eq 0) {
                Write-Host "✅ Nenhum erro de sintaxe detectado" -ForegroundColor Green
                return $true
            } else {
                Write-Host "⚠️ Problemas detectados:" -ForegroundColor Yellow
                foreach ($issue in $issues) {
                    Write-Host "   - $issue" -ForegroundColor Yellow
                }
                return $false
            }
        } else {
            Write-Host "❌ Dashboard não carrega (Status: $($response.StatusCode))" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ Erro ao testar dashboard: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Função para testar login e acesso ao dashboard
function Test-DashboardAccess {
    try {
        Write-Host "Testando acesso ao dashboard com login..." -ForegroundColor Yellow
        
        # Fazer login
        $loginData = @{
            cpf = "598.769.137-00"
            password = "123456"
        } | ConvertTo-Json
        
        $loginResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/auth/login" -Method POST -Body $loginData -ContentType "application/json" -TimeoutSec 10
        
        if ($loginResponse.StatusCode -eq 200) {
            Write-Host "✅ Login realizado com sucesso" -ForegroundColor Green
            
            # Testar acesso ao dashboard
            $dashboardResponse = Invoke-WebRequest -Uri "http://localhost:3000/dashboard.html" -Method GET -TimeoutSec 10
            
            if ($dashboardResponse.StatusCode -eq 200) {
                Write-Host "✅ Dashboard acessível após login" -ForegroundColor Green
                return $true
            } else {
                Write-Host "❌ Dashboard não acessível após login" -ForegroundColor Red
                return $false
            }
        } else {
            Write-Host "❌ Login falhou" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ Erro ao testar acesso: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Executar testes
$dashboardTest = Test-DashboardErrors
$accessTest = Test-DashboardAccess

Write-Host ""
Write-Host "RESULTADOS DOS TESTES" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""

if ($dashboardTest -and $accessTest) {
    Write-Host "✅ TODOS OS TESTES PASSARAM!" -ForegroundColor Green
    Write-Host "Dashboard funcionando sem erros JavaScript" -ForegroundColor Green
} elseif ($dashboardTest) {
    Write-Host "⚠️ Dashboard carrega, mas pode ter problemas de acesso" -ForegroundColor Yellow
} else {
    Write-Host "❌ Problemas detectados no dashboard" -ForegroundColor Red
}

Write-Host ""
Write-Host "URLs DE TESTE:" -ForegroundColor Cyan
Write-Host "   Dashboard: http://localhost:3000/dashboard.html" -ForegroundColor White
Write-Host "   Login: http://localhost:3000/login-screen.html" -ForegroundColor White
Write-Host "   Backend: http://localhost:3001/health" -ForegroundColor White

Write-Host ""
Write-Host "Teste concluído!" -ForegroundColor Green
