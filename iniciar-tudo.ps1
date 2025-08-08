# Script para iniciar Backend e Frontend DOM v2 simultaneamente
Write-Host "=== INICIANDO DOM V2 COMPLETO ===" -ForegroundColor Green
Write-Host ""

# Verificar se o Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERRO: Node.js nao encontrado!" -ForegroundColor Red
    Write-Host "   Instale o Node.js em: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Parar processos existentes
Write-Host "Parando processos existentes..." -ForegroundColor Yellow
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Iniciar Backend em uma nova janela
Write-Host "Iniciando Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\backend'; `$env:DATABASE_URL = 'postgresql://postgres:FLP*2025@localhost:5432/db_dom'; npx ts-node src/server-real-database.ts" -WindowStyle Normal

# Aguardar o backend inicializar
Write-Host "Aguardando backend inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Iniciar Frontend em uma nova janela
Write-Host "Iniciando Frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; npm run web" -WindowStyle Normal

# Aguardar um pouco
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "SERVICOS INICIADOS!" -ForegroundColor Green
Write-Host ""
Write-Host "ACESSOS:" -ForegroundColor Yellow
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host "   API:      http://localhost:3001/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "FUNCIONALIDADES DISPONIVEIS:" -ForegroundColor Yellow
Write-Host "   Dashboard com dados reais" -ForegroundColor White
Write-Host "   Autenticacao completa" -ForegroundColor White
Write-Host "   Gestao de usuarios (CRUD)" -ForegroundColor White
Write-Host "   Gestao financeira" -ForegroundColor White
Write-Host "   Sistema de RH" -ForegroundColor White
Write-Host "   Controle de ponto avancado" -ForegroundColor White
Write-Host "   Integracoes (ViaCEP, eSocial, Stripe, SPTrans)" -ForegroundColor White
Write-Host "   Relatorios" -ForegroundColor White
Write-Host "   Notificacoes push" -ForegroundColor White
Write-Host ""
Write-Host "PROXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host "   1. Abra http://localhost:3000 no navegador" -ForegroundColor White
Write-Host "   2. Teste o login com qualquer credencial" -ForegroundColor White
Write-Host "   3. Navegue pelas funcionalidades" -ForegroundColor White
Write-Host "   4. Aprove as telas implementadas" -ForegroundColor White
Write-Host ""
Write-Host "Para parar os servicos, feche as janelas do PowerShell" -ForegroundColor Red 