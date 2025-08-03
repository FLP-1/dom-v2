# Script Simples para Auditar Funcionalidades do DOM v2
# Executar no diretório: C:\dom-v2

Write-Host "AUDITORIA DE FUNCIONALIDADES - DOM v2" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar arquivos principais
$status = @{}

# Frontend - Telas
Write-Host "FRONTEND - TELAS:" -ForegroundColor Magenta
Write-Host "-----------------" -ForegroundColor Magenta

$telas = @(
    @{path="frontend/src/screens/login-screen.tsx"; name="Login"}
    @{path="frontend/src/screens/UltraPremiumLoginScreen.tsx"; name="Login Ultra Premium"}
    @{path="frontend/src/screens/dashboard-screen.tsx"; name="Dashboard"}
    @{path="frontend/src/screens/tasks-screen.tsx"; name="Tarefas"}
    @{path="frontend/src/screens/employees-screen.tsx"; name="Funcionarios"}
    @{path="frontend/src/screens/purchases-screen.tsx"; name="Compras"}
    @{path="frontend/src/screens/payments-screen.tsx"; name="Pagamentos"}
    @{path="frontend/src/screens/notifications-screen.tsx"; name="Notificacoes"}
)

foreach ($tela in $telas) {
    if (Test-Path $tela.path) {
        $content = Get-Content $tela.path -Raw
        if ($content -and $content.Length -gt 100) {
            Write-Host "OK $($tela.name)" -ForegroundColor Green
            $status[$tela.name] = $true
        } else {
            Write-Host "WARNING $($tela.name) - arquivo pequeno" -ForegroundColor Yellow
            $status[$tela.name] = $false
        }
    } else {
        Write-Host "ERROR $($tela.name) - nao encontrado" -ForegroundColor Red
        $status[$tela.name] = $false
    }
}

Write-Host ""
Write-Host "BACKEND - SERVICOS:" -ForegroundColor Magenta
Write-Host "-------------------" -ForegroundColor Magenta

# Backend
$backend = @(
    @{path="backend/src/routes"; name="Rotas API"}
    @{path="backend/src/controllers"; name="Controllers"}
    @{path="backend/src/database.ts"; name="Database"}
    @{path="backend/prisma/schema.prisma"; name="Schema Prisma"}
)

foreach ($item in $backend) {
    if (Test-Path $item.path) {
        if ((Get-Item $item.path) -is [System.IO.DirectoryInfo]) {
            $files = Get-ChildItem $item.path -Recurse -File | Where-Object { $_.Extension -match "\.(ts|js)$" }
            if ($files.Count -gt 0) {
                Write-Host "OK $($item.name) - $($files.Count) arquivos" -ForegroundColor Green
                $status[$item.name] = $true
            } else {
                Write-Host "WARNING $($item.name) - diretorio vazio" -ForegroundColor Yellow
                $status[$item.name] = $false
            }
        } else {
            $content = Get-Content $item.path -Raw
            if ($content -and $content.Length -gt 100) {
                Write-Host "OK $($item.name)" -ForegroundColor Green
                $status[$item.name] = $true
            } else {
                Write-Host "WARNING $($item.name) - arquivo pequeno" -ForegroundColor Yellow
                $status[$item.name] = $false
            }
        }
    } else {
        Write-Host "ERROR $($item.name) - nao encontrado" -ForegroundColor Red
        $status[$item.name] = $false
    }
}

Write-Host ""
Write-Host "COMPONENTES:" -ForegroundColor Magenta
Write-Host "-------------" -ForegroundColor Magenta

# Componentes
$componentes = @(
    @{path="frontend/src/components/CPFCNPJInput.tsx"; name="CPF/CNPJ Input"}
    @{path="frontend/src/utils/theme-provider.ts"; name="Theme Provider"}
    @{path="frontend/src/hooks/useSimpleNotifications.ts"; name="Notifications Hook"}
    @{path="frontend/src/navigation/AppNavigator.tsx"; name="Navigation"}
)

foreach ($comp in $componentes) {
    if (Test-Path $comp.path) {
        $content = Get-Content $comp.path -Raw
        if ($content -and $content.Length -gt 100) {
            Write-Host "OK $($comp.name)" -ForegroundColor Green
            $status[$comp.name] = $true
        } else {
            Write-Host "WARNING $($comp.name) - arquivo pequeno" -ForegroundColor Yellow
            $status[$comp.name] = $false
        }
    } else {
        Write-Host "ERROR $($comp.name) - nao encontrado" -ForegroundColor Red
        $status[$comp.name] = $false
    }
}

# Resumo
Write-Host ""
Write-Host "RESUMO:" -ForegroundColor Cyan
Write-Host "=======" -ForegroundColor Cyan

$total = $status.Count
$implementado = ($status.Values | Where-Object { $_ -eq $true }).Count
$percentual = [math]::Round(($implementado / $total) * 100, 1)

Write-Host "Total: $total funcionalidades" -ForegroundColor White
Write-Host "Implementado: $implementado" -ForegroundColor White
Write-Host "Percentual: $percentual%" -ForegroundColor White

Write-Host ""
Write-Host "RECOMENDACAO:" -ForegroundColor Yellow
if ($percentual -ge 80) {
    Write-Host "SISTEMA BEM IMPLEMENTADO - Focar em refinamento" -ForegroundColor Green
} elseif ($percentual -ge 60) {
    Write-Host "SISTEMA PARCIALMENTE IMPLEMENTADO - Priorizar funcionalidades criticas" -ForegroundColor Yellow
} else {
    Write-Host "SISTEMA COM GAPS - Implementar funcionalidades basicas primeiro" -ForegroundColor Red
}

Write-Host ""
Write-Host "ESTRATEGIA RECOMENDADA:" -ForegroundColor Cyan
Write-Host "FOCAR EM FUNCIONALIDADES REAIS em vez de novas telas" -ForegroundColor White
Write-Host "- Melhor ROI e valor para usuarios" -ForegroundColor White
Write-Host "- Aproveita base solida ja implementada" -ForegroundColor White
Write-Host "- Feedback rapido e iterativo" -ForegroundColor White 