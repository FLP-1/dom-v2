# Script para abrir a página de preview de layouts das telas
# Autor: DOM Team v2
# Data: 2025-07-26

Write-Host "=== ABRINDO PREVIEW DE LAYOUTS ===" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green

# Caminho para o arquivo HTML
$htmlPath = "C:\dom-v2\frontend\public\screen-preview.html"

# Verificar se o arquivo existe
if (Test-Path $htmlPath) {
    Write-Host "Arquivo encontrado: $htmlPath" -ForegroundColor Green
    
    # Converter para URI
    $uri = "file:///" + $htmlPath.Replace("\", "/")
    
    Write-Host "ABRINDO PREVIEW:" -ForegroundColor Cyan
    Write-Host "Arquivo: $htmlPath" -ForegroundColor White
    Write-Host "URI: $uri" -ForegroundColor White
    
    # Abrir no navegador padrão
    try {
        Start-Process $uri
        Write-Host "Preview aberto no navegador!" -ForegroundColor Green
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

Write-Host "FUNCIONALIDADES DO PREVIEW:" -ForegroundColor Cyan
Write-Host "Visualização de layouts por categoria" -ForegroundColor Green
Write-Host "Preview interativo de cada tela" -ForegroundColor Green
Write-Host "Filtros por categoria e pontuação" -ForegroundColor Green
Write-Host "Comparação visual de layouts" -ForegroundColor Green
Write-Host "Design responsivo simulado" -ForegroundColor Green
Write-Host "Indicadores de qualidade visual" -ForegroundColor Green

Write-Host "COMO USAR:" -ForegroundColor Cyan
Write-Host "1. Selecione uma tela da lista à esquerda" -ForegroundColor White
Write-Host "2. Veja o preview do layout à direita" -ForegroundColor White
Write-Host "3. Use os filtros para encontrar telas específicas" -ForegroundColor White
Write-Host "4. Compare diferentes layouts" -ForegroundColor White

Write-Host "LAYOUTS DISPONÍVEIS:" -ForegroundColor Cyan
Write-Host "Login - Formulário de autenticação" -ForegroundColor White
Write-Host "Dashboard - Layout com sidebar e widgets" -ForegroundColor White
Write-Host "Tasks - Lista de tarefas com checkboxes" -ForegroundColor White
Write-Host "Budget - Gráficos e formulários" -ForegroundColor White
Write-Host "Employees - Tabela de funcionários" -ForegroundColor White
Write-Host "Payments - Formulário e histórico" -ForegroundColor White
Write-Host "Notifications - Lista de notificações" -ForegroundColor White

Write-Host "Preview aberto! Visualize os layouts no navegador." -ForegroundColor Green 