# Script para abrir a tela de showcase dos IconCards - DOM v2
# Executado em: C:\dom-v2

Write-Host "🎨 Abrindo IconCards Showcase..." -ForegroundColor Cyan

# Verificar se estamos no diretório correto
if (-not (Test-Path "frontend\src\screens\IconCardsShowcase.tsx")) {
    Write-Host "❌ Erro: Tela IconCardsShowcase não encontrada!" -ForegroundColor Red
    Write-Host "Certifique-se de estar no diretório raiz do projeto (C:\dom-v2)" -ForegroundColor Yellow
    exit 1
}

# Verificar se os componentes existem
$components = @(
    "frontend\src\components\ui\IconCard.tsx",
    "frontend\src\components\ui\IconCardGrid.tsx"
)

foreach ($component in $components) {
    if (-not (Test-Path $component)) {
        Write-Host "❌ Erro: Componente não encontrado: $component" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Componentes verificados com sucesso!" -ForegroundColor Green

# Mostrar informações sobre a implementação
Write-Host ""
Write-Host "📊 Resumo da Implementação:" -ForegroundColor Yellow
Write-Host "   - IconCard: Card clicável com ícones" -ForegroundColor White
Write-Host "   - IconCardGrid: Grid responsivo" -ForegroundColor White
Write-Host "   - 6 variantes de cor disponíveis" -ForegroundColor White
Write-Host "   - 3 tamanhos (small, medium, large)" -ForegroundColor White
Write-Host "   - Estados: loading, disabled, badges" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Para visualizar o showcase:" -ForegroundColor Cyan
Write-Host "   1. Inicie o servidor de desenvolvimento" -ForegroundColor White
Write-Host "   2. Navegue para a tela IconCardsShowcase" -ForegroundColor White
Write-Host "   3. Teste as diferentes variações" -ForegroundColor White

Write-Host ""
Write-Host "📁 Arquivos criados:" -ForegroundColor Yellow
Write-Host "   • frontend\src\components\ui\IconCard.tsx" -ForegroundColor White
Write-Host "   • frontend\src\components\ui\IconCardGrid.tsx" -ForegroundColor White
Write-Host "   • frontend\src\screens\IconCardsShowcase.tsx" -ForegroundColor White

Write-Host ""
Write-Host "📋 Scripts disponíveis:" -ForegroundColor Yellow
Write-Host "   • scripts\refactor-screens-to-icon-cards.js" -ForegroundColor White
Write-Host "   • scripts\test-icon-cards.js" -ForegroundColor White

Write-Host ""
Write-Host "📚 Documentação:" -ForegroundColor Yellow
Write-Host "   • docs\REFATORACAO_ICON_CARDS_COMPLETA.md" -ForegroundColor White
Write-Host "   • docs\RELATORIO_TESTE_ICON_CARDS.md" -ForegroundColor White

Write-Host ""
Write-Host "🚀 IconCards Showcase pronto para uso!" -ForegroundColor Green
Write-Host "Execute 'npm start' ou 'yarn start' para iniciar o servidor" -ForegroundColor Cyan
