# Script para abrir projeto DOM v2 no navegador
# DOM v2 - Teste Web

Write-Host "🌐 Abrindo projeto DOM v2 no navegador..." -ForegroundColor Green

# Verificar se o frontend existe
if (Test-Path "frontend") {
    Write-Host "✅ Projeto frontend encontrado!" -ForegroundColor Green
    
    # Navegar para o frontend
    Set-Location "frontend"
    
    Write-Host "`n🚀 Iniciando servidor de desenvolvimento..." -ForegroundColor Yellow
    
    # Verificar se o servidor já está rodando
    $port = 3000
    $isRunning = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    
    if ($isRunning) {
        Write-Host "✅ Servidor já está rodando na porta $port" -ForegroundColor Green
        Write-Host "🌐 Abrindo no navegador..." -ForegroundColor Yellow
        Start-Process "http://localhost:$port"
    } else {
        Write-Host "🔄 Iniciando servidor..." -ForegroundColor Yellow
        Write-Host "`n📋 Comandos para executar:" -ForegroundColor Cyan
        Write-Host "   npm start" -ForegroundColor White
        Write-Host "   ou" -ForegroundColor White
        Write-Host "   npx webpack serve --mode development" -ForegroundColor White
    }
    
    Write-Host "`n📱 Para testar no celular:" -ForegroundColor Cyan
    Write-Host "   - Use o IP da sua máquina" -ForegroundColor White
    Write-Host "   - Exemplo: http://192.168.1.100:3000" -ForegroundColor White
    
} else {
    Write-Host "❌ Projeto frontend não encontrado!" -ForegroundColor Red
}

Write-Host "`n🎯 Para testar as telas:" -ForegroundColor Green
Write-Host "   - Dashboard: http://localhost:3000" -ForegroundColor White
Write-Host "   - Login: http://localhost:3000/login" -ForegroundColor White
Write-Host "   - Usuários: http://localhost:3000/users" -ForegroundColor White
Write-Host "   - Financeiro: http://localhost:3000/finance" -ForegroundColor White


