# Script para iniciar o Backend DOM v2
Write-Host "=== INICIANDO BACKEND DOM V2 ===" -ForegroundColor Green
Write-Host ""

# Navegar para o diretório do backend
Set-Location "C:\dom-v2\backend"

# Verificar se o Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERRO: Node.js nao encontrado!" -ForegroundColor Red
    Write-Host "   Instale o Node.js em: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar se as dependências estão instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

# Parar processos que possam estar usando a porta 3001
Write-Host "Parando processos na porta 3001..." -ForegroundColor Yellow
$processes = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
if ($processes) {
    Stop-Process -Id $processes -Force -ErrorAction SilentlyContinue
}

# Iniciar o servidor
Write-Host "Iniciando servidor backend na porta 3001..." -ForegroundColor Green
Write-Host "   URL: http://localhost:3001" -ForegroundColor Cyan
Write-Host "   API: http://localhost:3001/api" -ForegroundColor Cyan
Write-Host ""

try {
    npx ts-node src/server-simple-dashboard.ts
} catch {
    Write-Host "ERRO ao iniciar o backend:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "SOLUCOES:" -ForegroundColor Yellow
    Write-Host "   1. Verifique se o Node.js esta instalado" -ForegroundColor White
    Write-Host "   2. Execute: npm install" -ForegroundColor White
    Write-Host "   3. Verifique se a porta 3001 esta livre" -ForegroundColor White
} 