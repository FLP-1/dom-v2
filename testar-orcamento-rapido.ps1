# Teste Rapido do Controle de Orcamento
Write-Host "TESTE RAPIDO - CONTROLE DE ORCAMENTO" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# 1. Verificar se os arquivos foram criados
Write-Host "`nVerificando arquivos criados..." -ForegroundColor Yellow

$arquivosEsperados = @(
    "frontend/src/screens/budget/BudgetScreen.tsx",
    "frontend/src/screens/budget/BudgetCreateScreen.tsx", 
    "frontend/src/screens/budget/BudgetDetailScreen.tsx",
    "frontend/src/components/budget/BudgetCard.tsx",
    "frontend/src/components/budget/BudgetForm.tsx",
    "frontend/src/components/budget/BudgetChart.tsx",
    "frontend/src/components/budget/BudgetList.tsx",
    "frontend/src/hooks/useBudget.ts",
    "frontend/src/hooks/useBudgetAnalytics.ts",
    "frontend/src/utils/budget-calculations.ts",
    "frontend/src/utils/budget-validation.ts"
)

$arquivosExistentes = 0
foreach ($arquivo in $arquivosEsperados) {
    if (Test-Path $arquivo) {
        $tamanho = (Get-Item $arquivo).Length
        Write-Host "  OK $arquivo ($tamanho bytes)" -ForegroundColor Green
        $arquivosExistentes++
    } else {
        Write-Host "  ERRO $arquivo (nao encontrado)" -ForegroundColor Red
    }
}

Write-Host "`nResumo: $arquivosExistentes/$($arquivosEsperados.Count) arquivos criados" -ForegroundColor Cyan

# 2. Verificar dependencias
Write-Host "`nVerificando dependencias..." -ForegroundColor Yellow

$dependencias = @(
    "frontend/src/micro-frontends/shared/components/ui/Button.tsx",
    "frontend/src/micro-frontends/shared/utils/core/api-client.ts",
    "frontend/src/navigation/AppNavigator.tsx"
)

foreach ($dep in $dependencias) {
    if (Test-Path $dep) {
        Write-Host "  OK $dep" -ForegroundColor Green
    } else {
        Write-Host "  ERRO $dep (nao encontrado)" -ForegroundColor Red
    }
}

# 3. Verificar se o app pode ser iniciado
Write-Host "`nVerificando se o app pode ser iniciado..." -ForegroundColor Yellow

if (Test-Path "frontend/package.json") {
    Write-Host "  OK package.json encontrado" -ForegroundColor Green
    
    # Verificar se as dependencias estao instaladas
    if (Test-Path "frontend/node_modules") {
        Write-Host "  OK node_modules encontrado" -ForegroundColor Green
    } else {
        Write-Host "  ATENCAO node_modules nao encontrado - execute: cd frontend; npm install" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ERRO package.json nao encontrado" -ForegroundColor Red
}

# 4. Instrucoes de teste
Write-Host "`nINSTRUCOES PARA TESTAR:" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

Write-Host "`n1. INICIAR O APP:" -ForegroundColor Yellow
Write-Host "   npm run start-dev" -ForegroundColor White
Write-Host "   ou" -ForegroundColor White
Write-Host "   cd frontend; npm start" -ForegroundColor White

Write-Host "`n2. ACESSAR AS TELAS:" -ForegroundColor Yellow
Write-Host "   - Tela Principal: http://localhost:3000/budget" -ForegroundColor White
Write-Host "   - Tela de Criacao: http://localhost:3000/budget/create" -ForegroundColor White
Write-Host "   - Tela de Detalhes: http://localhost:3000/budget/[id]" -ForegroundColor White

Write-Host "`n3. TESTES MANUAIS:" -ForegroundColor Yellow
Write-Host "   OK Verificar se as telas carregam sem erros" -ForegroundColor White
Write-Host "   OK Testar criacao de orcamento" -ForegroundColor White
Write-Host "   OK Verificar calculos de progresso" -ForegroundColor White
Write-Host "   OK Testar validacao de formularios" -ForegroundColor White
Write-Host "   OK Verificar responsividade" -ForegroundColor White

Write-Host "`n4. TESTES DE INTEGRACAO:" -ForegroundColor Yellow
Write-Host "   OK Iniciar backend: cd backend; npm run dev" -ForegroundColor White
Write-Host "   OK Testar salvamento no banco" -ForegroundColor White
Write-Host "   OK Verificar persistencia de dados" -ForegroundColor White

# 5. Comandos uteis
Write-Host "`nCOMANDOS UTEIS:" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan

Write-Host "`n# Verificar arquivos:" -ForegroundColor Yellow
Write-Host "ls frontend/src/screens/budget/" -ForegroundColor White
Write-Host "ls frontend/src/components/budget/" -ForegroundColor White
Write-Host "ls frontend/src/hooks/ | findstr Budget" -ForegroundColor White

Write-Host "`n# Executar testes:" -ForegroundColor Yellow
Write-Host "npm test" -ForegroundColor White
Write-Host "node scripts/testar-controle-orcamento.js" -ForegroundColor White

Write-Host "`n# Limpar cache:" -ForegroundColor Yellow
Write-Host "npm run clean" -ForegroundColor White
Write-Host "Remove-Item -Recurse -Force frontend/node_modules; cd frontend; npm install" -ForegroundColor White

# 6. Status final
Write-Host "`nSTATUS FINAL:" -ForegroundColor Cyan
Write-Host "================" -ForegroundColor Cyan

$percentual = [math]::Round(($arquivosExistentes / $arquivosEsperados.Count) * 100, 1)

if ($percentual -ge 90) {
    Write-Host "OK IMPLEMENTACAO CONCLUIDA ($percentual%)" -ForegroundColor Green
    Write-Host "   Pronto para testes manuais!" -ForegroundColor Green
} elseif ($percentual -ge 70) {
    Write-Host "ATENCAO IMPLEMENTACAO PARCIAL ($percentual%)" -ForegroundColor Yellow
    Write-Host "   Alguns arquivos podem estar faltando" -ForegroundColor Yellow
} else {
    Write-Host "ERRO IMPLEMENTACAO INCOMPLETA ($percentual%)" -ForegroundColor Red
    Write-Host "   Execute: node scripts/implementar-controle-orcamento.js" -ForegroundColor Red
}

Write-Host "`nPara mais detalhes, consulte:" -ForegroundColor Cyan
Write-Host "   - docs/testes/guia-teste-orcamento.md" -ForegroundColor White
Write-Host "   - docs/reports/teste-orcamento-report.json" -ForegroundColor White

Write-Host "`nTeste rapido concluido!" -ForegroundColor Green 