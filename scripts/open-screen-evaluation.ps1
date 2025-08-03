# Script para abrir a página de avaliação de telas
# Autor: DOM Team v2
# Data: 2025-07-26

Write-Host "=== ABRINDO PÁGINA DE AVALIAÇÃO DE TELAS ===" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Verificar se o servidor está rodando
Write-Host "Verificando servidor..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET -TimeoutSec 5
    Write-Host "✅ Servidor funcionando!" -ForegroundColor Green
} catch {
    Write-Host "❌ Servidor não está rodando" -ForegroundColor Red
    Write-Host "Iniciando servidor..." -ForegroundColor Yellow
    
    # Iniciar servidor em background
    Start-Process powershell -ArgumentList "-Command", "cd C:\dom-v2; .\start-dom-v2-webpack.ps1" -WindowStyle Hidden
    
    Write-Host "Aguardando servidor inicializar..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    
    # Verificar novamente
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET -TimeoutSec 5
        Write-Host "✅ Servidor iniciado com sucesso!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Falha ao iniciar servidor" -ForegroundColor Red
        Write-Host "Execute manualmente: .\start-dom-v2-webpack.ps1" -ForegroundColor Yellow
        exit 1
    }
}

# URL da página de avaliação
$evaluationUrl = "http://localhost:3000/screen-evaluation.html"

Write-Host "`n🎯 ABRINDO PÁGINA DE AVALIAÇÃO:" -ForegroundColor Cyan
Write-Host "URL: $evaluationUrl" -ForegroundColor White

# Abrir no navegador padrão
try {
    Start-Process $evaluationUrl
    Write-Host "✅ Página aberta no navegador!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao abrir navegador" -ForegroundColor Red
    Write-Host "Acesse manualmente: $evaluationUrl" -ForegroundColor Yellow
}

Write-Host "`n📋 FUNCIONALIDADES DISPONÍVEIS:" -ForegroundColor Cyan
Write-Host "✅ Visualização de todas as telas" -ForegroundColor Green
Write-Host "✅ Filtros por categoria e pontuação" -ForegroundColor Green
Write-Host "✅ Comparação lado a lado (máx 3 telas)" -ForegroundColor Green
Write-Host "✅ Detalhes completos de cada tela" -ForegroundColor Green
Write-Host "✅ Busca por nome" -ForegroundColor Green
Write-Host "✅ Estatísticas em tempo real" -ForegroundColor Green

Write-Host "`n🔧 COMO USAR:" -ForegroundColor Cyan
Write-Host "1. Use os filtros para encontrar telas específicas" -ForegroundColor White
Write-Host "2. Clique em 'Selecionar' para comparar telas" -ForegroundColor White
Write-Host "3. Clique em 'Comparar Selecionadas' para ver diferenças" -ForegroundColor White
Write-Host "4. Clique em 'Detalhes' para informações completas" -ForegroundColor White

Write-Host "`n🏆 TELA DESTAQUE:" -ForegroundColor Cyan
Write-Host "UltraPremiumLoginScreen.tsx - 155 pontos (TOP)" -ForegroundColor Yellow
Write-Host "Local: frontend/src/screens/UltraPremiumLoginScreen.tsx" -ForegroundColor White

Write-Host "`n🎉 Avaliação pronta! Acesse a página no navegador." -ForegroundColor Green 