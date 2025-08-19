# Script para Testar DOM v2 Mobile (Versao Direta)
# Executar no diretorio: C:\dom-v2

Write-Host "TESTANDO DOM v2 MOBILE - VERSAO DIRETA" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
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
Write-Host "OPCOES DE TESTE:" -ForegroundColor Magenta
Write-Host ""

Write-Host "1. TESTE COM WEBPACK (Recomendado)" -ForegroundColor Green
Write-Host "   - Usa webpack-dev-server" -ForegroundColor White
Write-Host "   - Porta 3000" -ForegroundColor White
Write-Host "   - Interface web otimizada" -ForegroundColor White
Write-Host ""

Write-Host "2. TESTE COM METRO BUNDLER" -ForegroundColor Green
Write-Host "   - Usa React Native Metro" -ForegroundColor White
Write-Host "   - Porta 8081" -ForegroundColor White
Write-Host "   - Interface mobile nativa" -ForegroundColor White
Write-Host ""

# Perguntar qual opcao o usuario quer
$choice = Read-Host "Escolha uma opcao (1 ou 2)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "INICIANDO TESTE COM WEBPACK..." -ForegroundColor Green
        
        # Verificar se a porta 3000 esta livre
        $port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
        if ($port3000) {
            Write-Host "AVISO: Porta 3000 ja esta em uso!" -ForegroundColor Yellow
            Write-Host "Isso pode ser a versao web funcionando." -ForegroundColor Yellow
            Write-Host "Tente a opcao 2 (Metro Bundler) ou pare a versao web primeiro." -ForegroundColor Yellow
            exit 1
        }
        
        Write-Host "Iniciando webpack-dev-server..." -ForegroundColor Green
        Start-Process -FilePath "powershell" -ArgumentList "-Command", "npm run web" -WindowStyle Minimized
        Start-Sleep -Seconds 15
        
        Write-Host "Abrindo no navegador..." -ForegroundColor Green
        Start-Process "http://localhost:3000"
        
        Write-Host ""
        Write-Host "TESTE WEBPACK INICIADO!" -ForegroundColor Green
        Write-Host "Acesse: http://localhost:3000" -ForegroundColor Cyan
    }
    
    "2" {
        Write-Host ""
        Write-Host "INICIANDO TESTE COM METRO BUNDLER..." -ForegroundColor Green
        
        # Verificar se a porta 8081 esta livre
        $port8081 = Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue
        if ($port8081) {
            Write-Host "AVISO: Porta 8081 ja esta em uso!" -ForegroundColor Yellow
            Write-Host "Tente parar o processo primeiro ou use a opcao 1." -ForegroundColor Yellow
            exit 1
        }
        
        Write-Host "Iniciando Metro bundler..." -ForegroundColor Green
        Start-Process -FilePath "powershell" -ArgumentList "-Command", "npm start" -WindowStyle Minimized
        Start-Sleep -Seconds 15
        
        Write-Host "Abrindo no navegador..." -ForegroundColor Green
        Start-Process "http://localhost:8081"
        
        Write-Host ""
        Write-Host "TESTE METRO INICIADO!" -ForegroundColor Green
        Write-Host "Acesse: http://localhost:8081" -ForegroundColor Cyan
    }
    
    default {
        Write-Host "Opcao invalida!" -ForegroundColor Red
        Write-Host "Execute o script novamente e escolha 1 ou 2" -ForegroundColor Yellow
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
Write-Host ""

Write-Host "COMANDOS UTEIS:" -ForegroundColor Cyan
Write-Host "   - Parar servidor: Ctrl+C no terminal" -ForegroundColor White
Write-Host "   - Recarregar: F5 no navegador" -ForegroundColor White
Write-Host "   - Debug: F12 no navegador" -ForegroundColor White
Write-Host ""

Write-Host "TESTE MOBILE INICIADO!" -ForegroundColor Green
Write-Host "IMPORTANTE: Este teste NAO afeta a versao web!" -ForegroundColor Yellow
