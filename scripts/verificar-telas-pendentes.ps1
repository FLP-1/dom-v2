# Script para verificar telas que ainda não foram atualizadas para usar o sistema de componentes

$frontendPath = "frontend/public"
$htmlFiles = Get-ChildItem -Path $frontendPath -Filter "*.html" | Where-Object { $_.Name -ne "documents-management.html" -and $_.Name -ne "dashboard.html" }

Write-Host "=== VERIFICAÇÃO DE TELAS PENDENTES ===" -ForegroundColor Yellow
Write-Host ""

$telasComComponentes = @()
$telasSemComponentes = @()

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    if ($content -match "components\.css" -or $content -match "components\.js" -or $content -match "initPage") {
        $telasComComponentes += $file.Name
    } else {
        $telasSemComponentes += $file.Name
    }
}

Write-Host "✅ TELAS COM SISTEMA DE COMPONENTES:" -ForegroundColor Green
$telasComComponentes | ForEach-Object { Write-Host "  - $_" -ForegroundColor Green }

Write-Host ""
Write-Host "❌ TELAS SEM SISTEMA DE COMPONENTES:" -ForegroundColor Red
$telasSemComponentes | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }

Write-Host ""
Write-Host "📊 RESUMO:" -ForegroundColor Cyan
Write-Host "  Total de telas: $($htmlFiles.Count + 2)" -ForegroundColor White
Write-Host "  Com componentes: $($telasComComponentes.Count + 2)" -ForegroundColor Green
Write-Host "  Sem componentes: $($telasSemComponentes.Count)" -ForegroundColor Red

if ($telasSemComponentes.Count -gt 0) {
    Write-Host ""
    Write-Host "🔧 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
    Write-Host "  1. Atualizar telas sem componentes para usar o sistema padronizado" -ForegroundColor White
    Write-Host "  2. Remover headers duplicados" -ForegroundColor White
    Write-Host "  3. Adicionar textos motivacionais específicos" -ForegroundColor White
    Write-Host "  4. Verificar responsividade" -ForegroundColor White
}
