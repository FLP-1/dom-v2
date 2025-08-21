# Script simples para verificar telas que ainda não foram atualizadas

$frontendPath = "frontend/public"
$htmlFiles = Get-ChildItem -Path $frontendPath -Filter "*.html"

Write-Host "=== VERIFICACAO DE TELAS ===" -ForegroundColor Yellow
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

Write-Host "TELAS COM SISTEMA DE COMPONENTES:" -ForegroundColor Green
$telasComComponentes | ForEach-Object { Write-Host "  - $_" -ForegroundColor Green }

Write-Host ""
Write-Host "TELAS SEM SISTEMA DE COMPONENTES:" -ForegroundColor Red
$telasSemComponentes | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }

Write-Host ""
Write-Host "RESUMO:" -ForegroundColor Cyan
Write-Host "  Total de telas: $($htmlFiles.Count)" -ForegroundColor White
Write-Host "  Com componentes: $($telasComComponentes.Count)" -ForegroundColor Green
Write-Host "  Sem componentes: $($telasSemComponentes.Count)" -ForegroundColor Red
