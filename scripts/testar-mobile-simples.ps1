# Script para Testar DOM v2 Mobile (React Native)
# Executar no diretorio: C:\dom-v2

Write-Host "TESTANDO DOM v2 MOBILE" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos no diretorio correto
if (-not (Test-Path "DOMv2Android")) {
    Write-Host "ERRO: Diretorio DOMv2Android nao encontrado!" -ForegroundColor Red
    Write-Host "DICA: Execute este script no diretorio: C:\dom-v2" -ForegroundColor Yellow
    exit 1
}

# Navegar para o diretorio mobile
Set-Location DOMv2Android

Write-Host "Verificando dependencias do mobile..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias do mobile..." -ForegroundColor Yellow
    npm install
    Write-Host "Dependencias instaladas!" -ForegroundColor Green
} else {
    Write-Host "Dependencias ja instaladas!" -ForegroundColor Green
}

Write-Host ""
Write-Host "OPCOES DE TESTE MOBILE:" -ForegroundColor Magenta
Write-Host ""

Write-Host "1. TESTE NO NAVEGADOR (Recomendado para inicio)" -ForegroundColor Green
Write-Host "   - Mais rapido e facil" -ForegroundColor White
Write-Host "   - Nao precisa de emulador" -ForegroundColor White
Write-Host "   - Funcionalidades completas" -ForegroundColor White
Write-Host ""

Write-Host "2. TESTE NO EMULADOR ANDROID" -ForegroundColor Green
Write-Host "   - Teste real do ambiente mobile" -ForegroundColor White
Write-Host "   - Validacao de performance" -ForegroundColor White
Write-Host "   - Teste de gestos touch" -ForegroundColor White
Write-Host ""

Write-Host "3. TESTE NO DISPOSITIVO FISICO" -ForegroundColor Green
Write-Host "   - Teste mais realista" -ForegroundColor White
Write-Host "   - Validacao de recursos nativos" -ForegroundColor White
Write-Host "   - Teste de performance real" -ForegroundColor White
Write-Host ""

# Perguntar qual opcao o usuario quer
$choice = Read-Host "Escolha uma opcao (1, 2 ou 3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "INICIANDO TESTE NO NAVEGADOR..." -ForegroundColor Green
        
        # Verificar se o Metro bundler ja esta rodando
        $metroPort = 8081
        $metroRunning = Get-NetTCPConnection -LocalPort $metroPort -ErrorAction SilentlyContinue
        
        if ($metroRunning) {
            Write-Host "Metro bundler ja esta rodando na porta $metroPort" -ForegroundColor Yellow
        } else {
            Write-Host "Iniciando Metro bundler..." -ForegroundColor Green
            Start-Process -FilePath "powershell" -ArgumentList "-Command", "npm start" -WindowStyle Minimized
            Start-Sleep -Seconds 10
        }
        
        Write-Host "Abrindo no navegador..." -ForegroundColor Green
        Start-Process "http://localhost:8081"
        
        Write-Host ""
        Write-Host "TESTE NO NAVEGADOR INICIADO!" -ForegroundColor Green
        Write-Host "Acesse: http://localhost:8081" -ForegroundColor Cyan
    }
    
    "2" {
        Write-Host ""
        Write-Host "INICIANDO TESTE NO EMULADOR..." -ForegroundColor Green
        Write-Host "Para usar emulador, configure o Android Studio primeiro" -ForegroundColor Yellow
        Write-Host "Consulte: docs/development/guia-teste-mobile.md" -ForegroundColor Cyan
    }
    
    "3" {
        Write-Host ""
        Write-Host "INICIANDO TESTE NO DISPOSITIVO FISICO..." -ForegroundColor Green
        Write-Host "Conecte um dispositivo Android via USB" -ForegroundColor Yellow
        Write-Host "Consulte: docs/development/guia-teste-mobile.md" -ForegroundColor Cyan
    }
    
    default {
        Write-Host "Opcao invalida!" -ForegroundColor Red
        Write-Host "Execute o script novamente e escolha 1, 2 ou 3" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "FUNCIONALIDADES MOBILE DISPONIVEIS:" -ForegroundColor Magenta
Write-Host "   - Sistema de Autenticacao (CPF/CNPJ)" -ForegroundColor Green
Write-Host "   - Gestao Financeira" -ForegroundColor Green
Write-Host "   - Recursos Humanos" -ForegroundColor Green
Write-Host "   - Sistema de Temas" -ForegroundColor Green
Write-Host "   - Notificacoes" -ForegroundColor Green
Write-Host "   - Dashboard" -ForegroundColor Green
Write-Host "   - Navegacao Mobile" -ForegroundColor Green
Write-Host "   - Gestos Touch" -ForegroundColor Green
Write-Host ""

Write-Host "COMANDOS UTEIS:" -ForegroundColor Cyan
Write-Host "   - Parar Metro: Ctrl+C no terminal" -ForegroundColor White
Write-Host "   - Recarregar: R no terminal Metro" -ForegroundColor White
Write-Host "   - Menu de desenvolvimento: Ctrl+M (Android)" -ForegroundColor White
Write-Host "   - Debug: F12 no navegador (web)" -ForegroundColor White
Write-Host ""

Write-Host "TESTE MOBILE INICIADO!" -ForegroundColor Green
Write-Host "Para mais informacoes, consulte: docs/development/guia-teste-mobile.md" -ForegroundColor Cyan
