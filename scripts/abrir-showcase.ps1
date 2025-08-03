# Script para abrir o Showcase de Telas do DOM v2
# Executar no diretório: C:\dom-v2

Write-Host "Abrindo Showcase de Telas DOM v2..." -ForegroundColor Cyan

# Verificar se o arquivo existe
$showcasePath = "frontend\public\showcase-telas.html"
if (Test-Path $showcasePath) {
    Write-Host "Arquivo encontrado: $showcasePath" -ForegroundColor Green
    
    # Abrir no navegador padrão
    Start-Process $showcasePath
    Write-Host "Showcase aberto no navegador!" -ForegroundColor Green
    Write-Host ""
               Write-Host "Informacoes do Showcase:" -ForegroundColor Yellow
           Write-Host "   • 17 telas catalogadas" -ForegroundColor White
           Write-Host "   • 15 implementadas" -ForegroundColor Green
           Write-Host "   • 1 em desenvolvimento" -ForegroundColor Yellow
           Write-Host "   • 1 planejada" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Dicas:" -ForegroundColor Cyan
    Write-Host "   • Clique nas telas para ver detalhes" -ForegroundColor White
    Write-Host "   • Use os filtros por categoria" -ForegroundColor White
    Write-Host "   • Explore as funcionalidades de cada tela" -ForegroundColor White
} else {
    Write-Host "Arquivo nao encontrado: $showcasePath" -ForegroundColor Red
    Write-Host "Verifique se o arquivo foi criado corretamente." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Magenta
Write-Host "   1. Analise as telas no showcase" -ForegroundColor White
Write-Host "   2. Escolha quais telas incorporar" -ForegroundColor White
Write-Host "   3. Implemente as telas selecionadas" -ForegroundColor White
Write-Host "   4. Teste a funcionalidade" -ForegroundColor White 