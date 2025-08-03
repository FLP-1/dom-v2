# Script simples para resolver tela de splash travada
Write-Host "🔧 Corrigindo tela de splash travada..." -ForegroundColor Green

# 1. Parar todos os processos
Write-Host "1. Parando processos..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*node*" -or $_.ProcessName -like "*ts-node*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# 2. Limpar cache do Metro
Write-Host "2. Limpando cache..." -ForegroundColor Yellow
if (Test-Path "frontend\node_modules\.cache") {
    Remove-Item "frontend\node_modules\.cache" -Recurse -Force
}

# 3. Iniciar backend
Write-Host "3. Iniciando backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\backend'; `$env:DATABASE_URL = 'postgresql://postgres:FLP*2025@localhost:5432/db_dom'; npx ts-node src/server-dev.ts"

# 4. Aguardar backend
Start-Sleep -Seconds 10

# 5. Iniciar frontend
Write-Host "4. Iniciando frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; node server-web-robust.js"

Write-Host ""
Write-Host "✅ Pronto! Acesse: http://localhost:3000" -ForegroundColor Green 