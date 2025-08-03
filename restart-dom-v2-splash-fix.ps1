# Script para reiniciar DOM v2 com correção da tela de splash
Write-Host "🔄 Reiniciando DOM v2 com correção da tela de splash..." -ForegroundColor Green

# 1. Parar processos existentes
Write-Host "1. Parando processos existentes..." -ForegroundColor Yellow
$ports = @(3000, 3001, 8081)
foreach ($port in $ports) {
    try {
        $processes = netstat -ano | Select-String ":$port\s" | ForEach-Object {
            ($_ -split '\s+')[-1]
        }
        foreach ($processId in $processes) {
            if ($processId -and $processId -ne "0") {
                Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
                Write-Host "   Processo $processId na porta $port finalizado" -ForegroundColor Red
            }
        }
    }
    catch {
        Write-Host "   Nenhum processo encontrado na porta $port" -ForegroundColor Gray
    }
}

Start-Sleep -Seconds 3

# 2. Iniciar backend
Write-Host "2. Iniciando backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\backend'; `$env:DATABASE_URL = 'postgresql://postgres:FLP*2025@localhost:5432/db_dom'; npx ts-node src/server-dev.ts" -WindowStyle Normal
Start-Sleep -Seconds 8

# 3. Verificar backend
Write-Host "3. Verificando backend..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method GET -TimeoutSec 10
    Write-Host "   ✅ Backend funcionando: $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Backend não respondeu" -ForegroundColor Red
}

# 4. Iniciar frontend
Write-Host "4. Iniciando frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\dom-v2\frontend'; node server-web-robust.js" -WindowStyle Normal
Start-Sleep -Seconds 5

# 5. Verificar frontend
Write-Host "5. Verificando frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method GET -TimeoutSec 10
    Write-Host "   ✅ Frontend funcionando: $($response.service)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Frontend não respondeu" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Reinicialização concluída!" -ForegroundColor Green
Write-Host "Frontend Web: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Acesse: http://localhost:3000" -ForegroundColor Yellow
Write-Host "A nova tela de splash deve carregar corretamente!" -ForegroundColor Green 