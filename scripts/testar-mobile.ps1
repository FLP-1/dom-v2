# Script para Testar DOM v2 Mobile (React Native)
# Executar no diretório: C:\dom-v2

Write-Host "📱 TESTANDO DOM v2 MOBILE" -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos no diretório correto
if (-not (Test-Path "DOMv2Android")) {
    Write-Host "❌ Diretório DOMv2Android não encontrado!" -ForegroundColor Red
    Write-Host "💡 Execute este script no diretório: C:\dom-v2" -ForegroundColor Yellow
    exit 1
}

# Navegar para o diretório mobile
Set-Location DOMv2Android

Write-Host "🔍 Verificando dependências do mobile..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências do mobile..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependências instaladas!" -ForegroundColor Green
} else {
    Write-Host "✅ Dependências já instaladas!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 OPÇÕES DE TESTE MOBILE:" -ForegroundColor Magenta
Write-Host ""

Write-Host "1️⃣ TESTE NO NAVEGADOR (Recomendado para início)" -ForegroundColor Green
Write-Host "   • Mais rápido e fácil" -ForegroundColor White
Write-Host "   • Não precisa de emulador" -ForegroundColor White
Write-Host "   • Funcionalidades completas" -ForegroundColor White
Write-Host ""

Write-Host "2️⃣ TESTE NO EMULADOR ANDROID" -ForegroundColor Green
Write-Host "   • Teste real do ambiente mobile" -ForegroundColor White
Write-Host "   • Validação de performance" -ForegroundColor White
Write-Host "   • Teste de gestos touch" -ForegroundColor White
Write-Host ""

Write-Host "3️⃣ TESTE NO DISPOSITIVO FÍSICO" -ForegroundColor Green
Write-Host "   • Teste mais realista" -ForegroundColor White
Write-Host "   • Validação de recursos nativos" -ForegroundColor White
Write-Host "   • Teste de performance real" -ForegroundColor White
Write-Host ""

# Perguntar qual opção o usuário quer
$choice = Read-Host "Escolha uma opção (1, 2 ou 3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🌐 INICIANDO TESTE NO NAVEGADOR..." -ForegroundColor Green
        
        # Verificar se o Metro bundler já está rodando
        $metroPort = 8081
        $metroRunning = Get-NetTCPConnection -LocalPort $metroPort -ErrorAction SilentlyContinue
        
        if ($metroRunning) {
            Write-Host "⚠️ Metro bundler já está rodando na porta $metroPort" -ForegroundColor Yellow
        } else {
            Write-Host "🚀 Iniciando Metro bundler..." -ForegroundColor Green
            Start-Process -FilePath "powershell" -ArgumentList "-Command", "npm start" -WindowStyle Minimized
            Start-Sleep -Seconds 10
        }
        
        Write-Host "🌐 Abrindo no navegador..." -ForegroundColor Green
        Start-Process "http://localhost:8081"
        
        Write-Host ""
        Write-Host "✅ TESTE NO NAVEGADOR INICIADO!" -ForegroundColor Green
        Write-Host "💡 Acesse: http://localhost:8081" -ForegroundColor Cyan
    }
    
    "2" {
        Write-Host ""
        Write-Host "📱 INICIANDO TESTE NO EMULADOR..." -ForegroundColor Green
        Write-Host "💡 Para usar emulador, configure o Android Studio primeiro" -ForegroundColor Yellow
        Write-Host "📖 Consulte: docs/development/guia-teste-mobile.md" -ForegroundColor Cyan
    }
    
    "3" {
        Write-Host ""
        Write-Host "📱 INICIANDO TESTE NO DISPOSITIVO FÍSICO..." -ForegroundColor Green
        Write-Host "💡 Conecte um dispositivo Android via USB" -ForegroundColor Yellow
        Write-Host "📖 Consulte: docs/development/guia-teste-mobile.md" -ForegroundColor Cyan
    }
    
    default {
        Write-Host "❌ Opção inválida!" -ForegroundColor Red
        Write-Host "💡 Execute o script novamente e escolha 1, 2 ou 3" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📱 FUNCIONALIDADES MOBILE DISPONÍVEIS:" -ForegroundColor Magenta
Write-Host "   ✅ Sistema de Autenticação (CPF/CNPJ)" -ForegroundColor Green
Write-Host "   ✅ Gestão Financeira" -ForegroundColor Green
Write-Host "   ✅ Recursos Humanos" -ForegroundColor Green
Write-Host "   ✅ Sistema de Temas" -ForegroundColor Green
Write-Host "   ✅ Notificações" -ForegroundColor Green
Write-Host "   ✅ Dashboard" -ForegroundColor Green
Write-Host "   ✅ Navegação Mobile" -ForegroundColor Green
Write-Host "   ✅ Gestos Touch" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 COMANDOS ÚTEIS:" -ForegroundColor Cyan
Write-Host "   • Parar Metro: Ctrl+C no terminal" -ForegroundColor White
Write-Host "   • Recarregar: R no terminal Metro" -ForegroundColor White
Write-Host "   • Menu de desenvolvimento: Ctrl+M (Android)" -ForegroundColor White
Write-Host "   • Debug: F12 no navegador (web)" -ForegroundColor White
Write-Host ""

Write-Host "📱 TESTE MOBILE INICIADO!" -ForegroundColor Green
Write-Host "💡 Para mais informações, consulte: docs/development/guia-teste-mobile.md" -ForegroundColor Cyan
