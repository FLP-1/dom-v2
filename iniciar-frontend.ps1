# Script para iniciar o Frontend DOM v2
Write-Host "=== INICIANDO FRONTEND DOM V2 ===" -ForegroundColor Green
Write-Host ""

# Navegar para o diretório do frontend
Set-Location "C:\dom-v2\frontend"

# Verificar se o Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERRO: Node.js nao encontrado!" -ForegroundColor Red
    Write-Host "   Instale o Node.js em: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar se as dependências estão instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
}

# Parar processos que possam estar usando a porta 3000
Write-Host "Parando processos na porta 3000..." -ForegroundColor Yellow
$processes = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
if ($processes) {
    Stop-Process -Id $processes -Force -ErrorAction SilentlyContinue
}

# Iniciar o servidor de desenvolvimento
Write-Host "Iniciando servidor frontend na porta 3000..." -ForegroundColor Green
Write-Host "   URL: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Interface: React Native Web" -ForegroundColor Cyan
Write-Host ""

try {
    npm run web
} catch {
    Write-Host "ERRO ao iniciar o frontend:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "SOLUCOES:" -ForegroundColor Yellow
    Write-Host "   1. Verifique se o Node.js esta instalado" -ForegroundColor White
    Write-Host "   2. Execute: npm install --legacy-peer-deps" -ForegroundColor White
    Write-Host "   3. Verifique se a porta 3000 esta livre" -ForegroundColor White
    Write-Host "   4. Tente: npm run start" -ForegroundColor White
} 