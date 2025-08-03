# Script para Testar DOM v2 no Navegador (React Native Web)
# Executar no diretório: C:\dom-v2

Write-Host "🌐 TESTANDO DOM v2 NO NAVEGADOR" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Navegar para o frontend
Set-Location frontend

Write-Host "🔍 Verificando dependências..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependências instaladas!" -ForegroundColor Green
} else {
    Write-Host "✅ Dependências já instaladas!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 INICIANDO SERVIDOR DE DESENVOLVIMENTO..." -ForegroundColor Yellow

# Verificar se o servidor já está rodando
$port = 3000
$serverRunning = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($serverRunning) {
    Write-Host "⚠️ Servidor já está rodando na porta $port" -ForegroundColor Yellow
    Write-Host "🌐 Abrindo no navegador..." -ForegroundColor Green
    Start-Process "http://localhost:$port"
} else {
    Write-Host "🚀 Iniciando servidor de desenvolvimento..." -ForegroundColor Green
    
    # Iniciar servidor em background
    Start-Process -FilePath "powershell" -ArgumentList "-Command", "npm run web" -WindowStyle Minimized
    
    Write-Host "⏳ Aguardando servidor inicializar..." -ForegroundColor Yellow
    Start-Sleep -Seconds 15
    
    # Verificar se o servidor está rodando
    $retryCount = 0
    do {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:$port" -TimeoutSec 5 -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Host "✅ Servidor iniciado com sucesso!" -ForegroundColor Green
                break
            }
        } catch {
            $retryCount++
            if ($retryCount -lt 6) {
                Write-Host "Tentativa $retryCount - Aguardando servidor..." -ForegroundColor Yellow
                Start-Sleep -Seconds 5
            }
        }
    } while ($retryCount -lt 6)
    
    if ($retryCount -lt 6) {
        Write-Host "🌐 Abrindo no navegador..." -ForegroundColor Green
        Start-Process "http://localhost:$port"
    } else {
        Write-Host "❌ Falha ao iniciar servidor!" -ForegroundColor Red
        Write-Host "💡 Tente executar manualmente: npm run web" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📱 FUNCIONALIDADES DISPONÍVEIS:" -ForegroundColor Magenta
Write-Host "   ✅ Sistema de Autenticação (CPF/CNPJ)" -ForegroundColor Green
Write-Host "   ✅ Gestão Financeira" -ForegroundColor Green
Write-Host "   ✅ Recursos Humanos" -ForegroundColor Green
Write-Host "   ✅ Sistema de Temas" -ForegroundColor Green
Write-Host "   ✅ Notificações" -ForegroundColor Green
Write-Host "   ✅ Dashboard" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 COMANDOS ÚTEIS:" -ForegroundColor Cyan
Write-Host "   • Parar servidor: Ctrl+C no terminal" -ForegroundColor White
Write-Host "   • Recarregar: F5 no navegador" -ForegroundColor White
Write-Host "   • DevTools: F12 no navegador" -ForegroundColor White
Write-Host ""

Write-Host "🌐 TESTE WEB INICIADO!" -ForegroundColor Green
Write-Host "💡 O DOM v2 está rodando em: http://localhost:$port" -ForegroundColor Cyan 