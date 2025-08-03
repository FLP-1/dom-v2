# Script para Auditar Funcionalidades Reais do DOM v2
# Executar no diretório: C:\dom-v2

Write-Host "🔍 AUDITORIA DE FUNCIONALIDADES REAIS - DOM v2" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Função para verificar se arquivo existe e tem conteúdo
function Test-FileContent {
    param($path, $description)
    
    if (Test-Path $path) {
        $content = Get-Content $path -Raw
        if ($content -and $content.Length -gt 100) {
            Write-Host "OK $description" -ForegroundColor Green
            return $true
        } else {
            Write-Host "WARNING $description (empty or small file)" -ForegroundColor Yellow
            return $false
        }
    } else {
        Write-Host "ERROR $description (file not found)" -ForegroundColor Red
        return $false
    }
}

# Função para verificar se diretório tem arquivos
function Test-DirectoryContent {
    param($path, $description)
    
    if (Test-Path $path) {
        $files = Get-ChildItem $path -Recurse -File | Where-Object { $_.Extension -match "\.(tsx|ts|js|jsx)$" }
        if ($files.Count -gt 0) {
            Write-Host "OK $description ($($files.Count) files found)" -ForegroundColor Green
            return $true
        } else {
            Write-Host "WARNING $description (empty directory)" -ForegroundColor Yellow
            return $false
        }
    } else {
        Write-Host "❌ $description (diretório não encontrado)" -ForegroundColor Red
        return $false
    }
}

Write-Host "📱 FRONTEND - TELAS E COMPONENTES" -ForegroundColor Magenta
Write-Host "-----------------------------------" -ForegroundColor Magenta

$frontendStatus = @{}

# Verificar telas principais
$frontendStatus["Login"] = Test-FileContent "frontend/src/screens/login-screen.tsx" "Tela de Login"
$frontendStatus["UltraPremiumLogin"] = Test-FileContent "frontend/src/screens/UltraPremiumLoginScreen.tsx" "Login Ultra Premium"
$frontendStatus["Dashboard"] = Test-FileContent "frontend/src/screens/dashboard-screen.tsx" "Dashboard Principal"
$frontendStatus["Tarefas"] = Test-FileContent "frontend/src/screens/tasks-screen.tsx" "Gestão de Tarefas"
$frontendStatus["Funcionarios"] = Test-FileContent "frontend/src/screens/employees-screen.tsx" "Gestão de Funcionários"
$frontendStatus["Compras"] = Test-FileContent "frontend/src/screens/purchases-screen.tsx" "Controle de Compras"
$frontendStatus["Pagamentos"] = Test-FileContent "frontend/src/screens/payments-screen.tsx" "Gestão de Pagamentos"
$frontendStatus["Notificacoes"] = Test-FileContent "frontend/src/screens/notifications-screen.tsx" "Sistema de Notificações"

Write-Host ""
Write-Host "🏗️  BACKEND - APIs E SERVIÇOS" -ForegroundColor Magenta
Write-Host "-------------------------------" -ForegroundColor Magenta

$backendStatus = @{}

# Verificar rotas da API
$backendStatus["Rotas"] = Test-DirectoryContent "backend/src/routes" "Rotas da API"
$backendStatus["Controllers"] = Test-DirectoryContent "backend/src/controllers" "Controllers"
$backendStatus["Database"] = Test-FileContent "backend/src/database.ts" "Configuração do Banco"
$backendStatus["Prisma"] = Test-FileContent "backend/prisma/schema.prisma" "Schema do Banco"

Write-Host ""
Write-Host "🔧 COMPONENTES E UTILITÁRIOS" -ForegroundColor Magenta
Write-Host "-----------------------------" -ForegroundColor Magenta

$componentsStatus = @{}

# Verificar componentes principais
$componentsStatus["CPFCNPJ"] = Test-FileContent "frontend/src/components/CPFCNPJInput.tsx" "Validação CPF/CNPJ"
$componentsStatus["ThemeProvider"] = Test-FileContent "frontend/src/utils/theme-provider.ts" "Sistema de Temas"
$componentsStatus["Notifications"] = Test-FileContent "frontend/src/hooks/useSimpleNotifications.ts" "Sistema de Notificações"
$componentsStatus["Navigation"] = Test-FileContent "frontend/src/navigation/AppNavigator.tsx" "Sistema de Navegação"

Write-Host ""
Write-Host "📊 RESUMO DA AUDITORIA" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan

$totalFrontend = ($frontendStatus.Values | Where-Object { $_ -eq $true }).Count
$totalBackend = ($backendStatus.Values | Where-Object { $_ -eq $true }).Count
$totalComponents = ($componentsStatus.Values | Where-Object { $_ -eq $true }).Count

Write-Host ""
Write-Host "📱 Frontend: $totalFrontend/8 funcionalidades implementadas" -ForegroundColor White
Write-Host "🏗️  Backend: $totalBackend/4 serviços implementados" -ForegroundColor White
Write-Host "🔧 Componentes: $totalComponents/4 utilitários implementados" -ForegroundColor White

$totalImplementado = $totalFrontend + $totalBackend + $totalComponents
$totalPossivel = 16

$percentual = [math]::Round(($totalImplementado / $totalPossivel) * 100, 1)

Write-Host ""
Write-Host "🎯 STATUS GERAL: $totalImplementado/$totalPossivel ($percentual%)" -ForegroundColor Cyan

if ($percentual -ge 80) {
    Write-Host "✅ SISTEMA BEM IMPLEMENTADO - Focar em refinamento" -ForegroundColor Green
} elseif ($percentual -ge 60) {
    Write-Host "⚠️  SISTEMA PARCIALMENTE IMPLEMENTADO - Priorizar funcionalidades críticas" -ForegroundColor Yellow
} else {
    Write-Host "❌ SISTEMA COM GAPS SIGNIFICATIVOS - Implementar funcionalidades básicas primeiro" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔍 FUNCIONALIDADES CRÍTICAS FALTANTES:" -ForegroundColor Magenta

# Identificar gaps críticos
$gapsCriticos = @()

if (-not $frontendStatus["Tarefas"]) {
    $gapsCriticos += "Gestão de Tarefas Avançada"
}

if (-not $frontendStatus["Compras"]) {
    $gapsCriticos += "Controle de Orçamento Completo"
}

if (-not $componentsStatus["Notifications"]) {
    $gapsCriticos += "Sistema de Notificações"
}

if ($gapsCriticos.Count -gt 0) {
    foreach ($gap in $gapsCriticos) {
        Write-Host "   • $gap" -ForegroundColor Red
    }
} else {
    Write-Host "   ✅ Nenhum gap crítico identificado" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 PRÓXIMOS PASSOS RECOMENDADOS:" -ForegroundColor Cyan

if ($percentual -ge 80) {
    Write-Host "   1. Refinar UX/UI das funcionalidades existentes" -ForegroundColor White
    Write-Host "   2. Implementar testes de usabilidade" -ForegroundColor White
    Write-Host "   3. Criar showcase baseado em funcionalidades reais" -ForegroundColor White
} elseif ($percentual -ge 60) {
    Write-Host "   1. Implementar funcionalidades críticas faltantes" -ForegroundColor White
    Write-Host "   2. Melhorar integração entre frontend e backend" -ForegroundColor White
    Write-Host "   3. Testar fluxos completos de usuário" -ForegroundColor White
} else {
    Write-Host "   1. Implementar funcionalidades básicas primeiro" -ForegroundColor White
    Write-Host "   2. Consolidar arquitetura antes de expandir" -ForegroundColor White
    Write-Host "   3. Focar em MVP funcional" -ForegroundColor White
}

Write-Host ""
Write-Host "💡 RECOMENDAÇÃO ESTRATÉGICA:" -ForegroundColor Yellow
Write-Host "   FOCAR EM FUNCIONALIDADES REAIS em vez de desenvolver novas telas" -ForegroundColor White
Write-Host "   - Melhor ROI e valor para usuários" -ForegroundColor White
Write-Host "   - Aproveita base sólida já implementada" -ForegroundColor White
Write-Host "   - Feedback rápido e iterativo" -ForegroundColor White

Write-Host ""
Write-Host "Auditoria concluída! Verifique os resultados acima." -ForegroundColor Green 