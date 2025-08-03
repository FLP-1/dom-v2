# Script para abrir a página de avaliação de telas diretamente
# Autor: DOM Team v2
# Data: 2025-07-26

Write-Host "=== ABRINDO PAGINA DE AVALIACAO DIRETAMENTE ===" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

# Caminho para o arquivo HTML
$htmlPath = "C:\dom-v2\frontend\public\screen-evaluation.html"

# Verificar se o arquivo existe
if (Test-Path $htmlPath) {
    Write-Host "Arquivo encontrado: $htmlPath" -ForegroundColor Green
    
    # Converter para URI
    $uri = "file:///" + $htmlPath.Replace("\", "/")
    
    Write-Host "ABRINDO PAGINA:" -ForegroundColor Cyan
    Write-Host "Arquivo: $htmlPath" -ForegroundColor White
    Write-Host "URI: $uri" -ForegroundColor White
    
    # Abrir no navegador padrão
    try {
        Start-Process $uri
        Write-Host "Página aberta no navegador!" -ForegroundColor Green
    } catch {
        Write-Host "Erro ao abrir navegador" -ForegroundColor Red
        Write-Host "Acesse manualmente: $uri" -ForegroundColor Yellow
    }
} else {
    Write-Host "Arquivo não encontrado: $htmlPath" -ForegroundColor Red
    Write-Host "Verificando arquivos disponíveis..." -ForegroundColor Yellow
    
    # Listar arquivos HTML disponíveis
    $htmlFiles = Get-ChildItem -Path "C:\dom-v2\frontend\public" -Filter "*.html" -Recurse
    if ($htmlFiles) {
        Write-Host "Arquivos HTML encontrados:" -ForegroundColor Cyan
        foreach ($file in $htmlFiles) {
            Write-Host "  - $($file.Name)" -ForegroundColor White
        }
    } else {
        Write-Host "Nenhum arquivo HTML encontrado" -ForegroundColor Red
    }
}

Write-Host "FUNCIONALIDADES DA PAGINA:" -ForegroundColor Cyan
Write-Host "Visualização de todas as telas" -ForegroundColor Green
Write-Host "Filtros por categoria e pontuação" -ForegroundColor Green
Write-Host "Comparação lado a lado (máx 3 telas)" -ForegroundColor Green
Write-Host "Detalhes completos de cada tela" -ForegroundColor Green
Write-Host "Busca por nome" -ForegroundColor Green
Write-Host "Estatísticas em tempo real" -ForegroundColor Green

Write-Host "COMO USAR:" -ForegroundColor Cyan
Write-Host "1. Use os filtros para encontrar telas específicas" -ForegroundColor White
Write-Host "2. Clique em 'Selecionar' para comparar telas" -ForegroundColor White
Write-Host "3. Clique em 'Comparar Selecionadas' para ver diferenças" -ForegroundColor White
Write-Host "4. Clique em 'Detalhes' para informações completas" -ForegroundColor White

Write-Host "TELA DESTAQUE:" -ForegroundColor Cyan
Write-Host "UltraPremiumLoginScreen.tsx - 155 pontos (TOP)" -ForegroundColor Yellow
Write-Host "Local: frontend/src/screens/UltraPremiumLoginScreen.tsx" -ForegroundColor White

Write-Host "Página aberta! Avalie as telas no navegador." -ForegroundColor Green 